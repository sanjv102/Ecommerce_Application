import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {saveTokens} from '../utils/auth.js'

const Login = () => {

    const BASEURL = import.meta.env.VITE_API_URL;
    const [form, setForm] = useState({username:"", password:""});
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form,[e.target.name]: e.target.value,});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        
        try{
            const response = await fetch(`${BASEURL}/api/token/`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify(form),
            });
            
            const data = await response.json();
            if(response.ok){
                saveTokens(data);
                setMessage("Login Successfully! Redirecting...");
                setTimeout(()=>{
                    navigate("/")
                }, 1000);
            }else{
                setMessage(data.detail || "Login failed. Please try again.")
            }
        }catch(error){
            setMessage("An error occurred. Please try again.")
        }
    }

  return (
    <div className="min-h-screen flex justify-center items-center p-6">
        <div className="bg-white shadow-lg rounded p-8 max-w-md w-full">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>

                <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                
                <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Login</button> 
            </form> 
            {message && <p className="mt-3 text-sm">{message}</p>}
            <div className="mt-4 text-sm">
                Don't have an account?{" "}
                <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a> 
            </div>   
        </div>
    </div>
  )
}

export default Login
