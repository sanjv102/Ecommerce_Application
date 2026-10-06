import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {authFetch} from '../utils/auth.js'
import {useCart} from '../context/CartContext.jsx'

const Checkout = () => {

    const BASEURL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const {clearCart} = useCart();
    const [form, setForm] = useState({
        name:"",
        address:"",
        phone:"",
        payment_method:"COD"
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try{
            const response = await authFetch(`${BASEURL}/api/orders/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });
            const data = await response.json();
            //alert(response.status);
            if (response.ok) {
                setMessage("Order placed successfully!");
                authFetch(`${BASEURL}/api/cart/`)
                clearCart();
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setMessage(data.error || "Failed to place order.");
            }
        } catch (error) {
            setMessage("An error occurred while placing the order.");
        } 
    }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
            <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>


            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <input type="text" name="address" placeholder="Full Address" value={form.address} onChange={handleChange} required className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <input type="tel" name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <select name="payment_method" value={form.payment_method} onChange={handleChange} required className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="COD">Cash on Delivery</option>
                    <option value="Credit Card">Credit Card</option>
                </select>

                <button type="submit" disabled={loading} className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50">
                    {loading ? 'Placing Order...' : 'Place Order'}
                </button>
                {message && <p className="text-center mt-4 text-green-600 font-semibold">{message}</p>}
            </form>
        </div>    
    </div>
  )
}

export default Checkout
