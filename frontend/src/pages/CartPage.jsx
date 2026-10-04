import React from 'react'
import {useCart} from '../context/CartContext.jsx'


const CartPage = () => {

    const BASEURL = import.meta.env.VITE_API_URL;
    const { cartItems, total, removeFromCart, updateQuantity } = useCart();
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);


    return (
        <div className='pt-20 min-h-screen bg-gray-100 p-8'>
            <h1 className='text-3xl font-bold text-gray-800 mb-6 text-center'>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className='text-center text-gray-600'>Your cart is empty.</p>
            ) : (
                <div className='max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6'>
                    {cartItems.map((item) => (
                        <div key={item.id} className='flex items-center justify-between mb-4'>
                            <div className='flex items-center gap-4'>
                                <img src={`${BASEURL}${item.product_image}`} alt={item.product_name} className='w-20 h-20 object-cover rounded-md'/>
                            </div>
                            <div className='flex items-center gap-4'>
                                <h2 className='text-lg font-semibold text-gray-800'>{item.product_name}</h2>
                                <p className='text-gray-600'>${item.product_price}</p>
                            </div>
                            <div className='flex items-center gap-3'>
                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className='bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400'>
                                    -
                                </button>
                                <span className='text-lg font-semibold'>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className='bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400'>
                                    +
                                </button>
                                <button onClick={() => removeFromCart(item.id)} className='bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600'>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className='border-t border-gray-300 mt-6 pt-4 flex justify-between items-center'>
                        <h2 className='text-xl font-bold'>Total:</h2>
                        <p className='text-xl font-semibold'>{total}</p>
                    </div>
                </div>
            )}
    </div>
    )
}

export default CartPage