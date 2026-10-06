import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const BASEURL = import.meta.env.VITE_API_URL;
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  })
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => setForm({...form, [e.target.name]: e.target.value})
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    // Handle signup logic here
    try{
        const response = await fetch(`${BASEURL}/api/register/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const data = await response.json()
        if (response.ok) {
            setMessage('Account created successfully! Please log in.')
            setTimeout(() => {
                navigate('/login')
            }, 2000)
        } else {
            setMessage(data.username || data.password || JSON.stringify(data));
        }
    } catch (error) {
        console.error('Error occurred while signing up:', error)
        setMessage('Error occurred while signing up')
    }
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            {message && <p className="mb-4 text-center text-red-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-4">
                    
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="Enter your username"
                        value={form.username}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                    
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-6">
                   
                    <input
                        type="password"
                        name="password2"
                        placeholder="Confirm your password"
                        value={form.password2}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Sign Up
                    </button>
                </div>
            </form>
        </div>    
    </div>  
  )
}

export default Signup