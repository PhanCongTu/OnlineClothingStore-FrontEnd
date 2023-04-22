import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Shop from './Pages/Shop/Shop';
import ProductDetail from './Pages/ProductDetail/ProductDetail';
import Cart from './Pages/Cart/Cart';
import CheckOut from './Pages/CheckOut/CheckOut';
import MyOrder from './Pages/MyOrder/MyOrder';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/shop' element={<Shop />} />
          <Route path="/product" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/myorder" element={<MyOrder />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
