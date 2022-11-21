import React, { useState, useEffect} from 'react'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav';
import Cart from './views/Cart';
import Home from './views/Home';
import IndividualProduct from './views/IndividualProduct';
import Login from './views/Login';
import SignUp from './views/SignUp';

export default function App() {

  const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL

  const [user, setUser] = useState({})
  const [message, setMessage] = useState({})
  const [cart, setCart] = useState([])
  const [token, setToken] = useState()



  // const foundUser = localStorage.getItem('user')

  // if (foundUser) {
  //   setUser(JSON.parse(foundUser),[])
  // } else {
  //   setUser({},[])
  // };

  const getCart = async (user) => {
    
    const res = await fetch ('http://localhost:5000/api/cart', {
      method: "GET",
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    });
    const data = await res.json();

    if (data.status === 'ok') {
      setCart(data.data)
      console.log('cart found') // infinite loop need help
      
    }
  };

  const addToCart = async (product) => {
    setCart([...cart, product])
    if (token) {
      const res = await fetch ('http://localhost:5000/api/cart/add', {
        method: "POST",
        body: JSON.stringify({'prod_id': product.id}),
        headers: {
          "Content-Type" : "application/json",
          "Authorization":`Bearer ${token}`
        }
      });
      // const data = await res.json();
    }
    
  };

  const removeFromCart = (product) => {
    const new_cart = [...cart];
    for (let i = new_cart.length-1; i >= 0; i--) {
      if (product.id === new_cart[i].id) {
        new_cart.splice(i, 1)
        break
      }
    }
    setCart(new_cart)
  }

  const addMessageToHeader = (msg, category) => {
    setMessage({message: msg, category: category})
  };

  const logInUser = (user) => {
    setUser({user},[])
    setToken(user.token)
    // localStorage.setItem('user', JSON.stringify(user)) need to figure out why this is not working
    getCart(user)
  };

  const logOutUser = (user) => {
    setUser({})
    setToken("")
    setCart("")
  };

  useEffect(() => {
    if (token) {
      getCart(user)
    }
  });

  

  return (
    <Router>
      <div>
        <Nav user={user} logOutUser={logOutUser} cart={cart}/>
        <p className={`bg-${message.category}`}>{message.message}</p>

        <Routes>
          <Route path='/' element={<Home addToCart={addToCart} addMessageToHeader={addMessageToHeader}/>} />
          <Route path='/login' element={<Login addMessageToHeader={addMessageToHeader} logInUser={logInUser} />} />
          <Route path='/signup' element={<SignUp addMessageToHeader={addMessageToHeader}/>} />
          <Route path='/cart' element={<Cart addMessageToHeader={addMessageToHeader} cart={cart} removeFromCart={removeFromCart}/>}  />
          <Route path='/product/:prodID' element={<IndividualProduct addMessageToHeader={addMessageToHeader}/>}  />
        </Routes>
      </div>
    </Router>
  )
}
