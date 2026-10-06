import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { clearTokens, getAccessToken } from '../utils/auth.js'

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!getAccessToken();
    const { cartItems } = useCart();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        clearTokens();
        navigate('/login');
    }

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50">
            <Link to="/" className="text-2xl font-bold text-gray-800">E-Commerce</Link>
            <div className="flex items-center space-x-4">
                {isLoggedIn ? (
                    <>
                        <button onClick={handleLogout} className="text-gray-800 hover:text-gray-600 font-medium">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="text-gray-800 hover:text-gray-600 font-medium">
                            Login
                        </Link>
                        <Link to="/signup" className="text-gray-800 hover:text-gray-600 font-medium">
                            Signup
                        </Link>
                    </>
                )}

                <Link to="/cart" className="relative text-gray-800 hover:text-gray-600 font-medium">
                    Cart{cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 py-1 text-xs">{cartCount}</span>
                    )}
                </Link>
            </div>

        </nav>
    )
}

export default Navbar;