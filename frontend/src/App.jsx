import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import ProductList from "./pages/ProductList";
import ProductDetails from './pages/ProductDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList/>}/>
        <Route path="/product/:id" element={<ProductDetails/>}/>
      </Routes>
    </Router>
  )
}

export default App

