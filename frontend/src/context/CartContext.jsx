import {React, createContext, useContext, useState, useEffect} from 'react'
import {authFetch, getAccessToken} from '../utils/auth.js'

const CartContext = createContext();

export const CartProvider = ({children}) => {

    const BASEURL = import.meta.env.VITE_API_URL;
    const [cartItems, setCartItems] = useState([]);
    const[total, setTotal] = useState(0);

    //Fetch cart items from backend
    const fetchCart = async () => {
        try {
            const response = await authFetch(`${BASEURL}/api/cart/`);
            const data = await response.json();
            setCartItems(data.items || []);
            setTotal(data.total || 0);
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    }

    useEffect(()=>{
        fetchCart();
    }, []);

    //Add product to cart
    const addToCart = async(productid) => {
        try {
            const response = await authFetch(`${BASEURL}/api/cart/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ product_id: productid })
            });
            if (!response.ok) {
                throw new Error("Failed to add product to cart");
            }
            await fetchCart(); // Refresh the cart after adding an item
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    //Remove from cart
    const removeFromCart = async(itemId) =>{
        try {
            const response = await authFetch(`${BASEURL}/api/cart/remove/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item_id: itemId })
            });
            if (!response.ok) {
                throw new Error("Failed to remove product from cart");
            }
            await fetchCart(); // Refresh the cart after removing an item
        } catch (error) {
            console.error('Error removing from cart:', error);
        }
    }

    //Update quantity of product in cart
    const updateQuantity = async (itemId, quantity) => {
        if(quantity < 1){
            await removeFromCart(itemId);
            return;
        }
        try {
            const response = await authFetch(`${BASEURL}/api/cart/update/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ item_id: itemId, quantity: quantity })
            });
            if (!response.ok) {
                throw new Error("Failed to update product quantity in cart");
            }
            await fetchCart(); // Refresh the cart after updating an item
        } catch (error) {
            console.error('Error updating cart quantity:', error);
        }
    };

    const clearCart = () => {
        setCartItems([]);
        setTotal(0);
    }

    return (
        <CartContext.Provider value={{cartItems, total, addToCart, removeFromCart, updateQuantity, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext);
