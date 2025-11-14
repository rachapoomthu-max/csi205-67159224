import { useState, useEffect } from 'react'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Calculator from './pages/Calculator.jsx'
import Animation from './pages/Animetion.jsx'
import Component from './pages/Component.jsx'
import Products from './pages/Products.jsx'
import Carts from './pages/Carts.jsx'
import { fetchProducts } from './pages/data/products.jsx'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Todo from './pages/Todo/Todo.jsx'
import Login from './pages/Login/Login.jsx'

const App = () => {
  const [token, setToken] = useState('')
  const [role, setRole] = useState('')


  const [products, setProducts] = useState([])
  const [carts, setCarts] = useState([])

  useEffect(() => {
    setProducts(fetchProducts())
  }, [])
  useEffect(() => console.log(products), [products])

  if (token === '') {
    return <Login setToken = {setToken} setRole = {setRole}/>
  } else {
    return (
      <BrowserRouter basename='/csi205-67159224/'>
        <Routes>
          <Route element={<Layout products={products} carts={carts} setToken={setToken}/>}>
            <Route path="/" element={<Home />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/animation" element={<Animation />} />
            <Route path="/component" element={<Component />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/products" element={<Products products={products} carts={carts} setCarts={setCarts} />} />
            <Route path="/carts" element={<Carts carts={carts} setCarts={setCarts} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App
