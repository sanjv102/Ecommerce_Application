import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductList from "./pages/ProductList";
import ProductDetails from './pages/ProductDetails';
import Navbar from './components/Navbar';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import PrivateRouter from './components/PrivateRouter';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route element={<PrivateRouter/>}>
          <Route path="/checkout" element={<Checkout/>}/>
        </Route>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App

