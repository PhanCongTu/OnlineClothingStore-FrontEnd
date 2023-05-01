import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals';

import Home from './Pages/User/Home/Home';
import Login from './Pages/User/Login/Login';
import Register from './Pages/User/Register/Register';
import Shop from './Pages/User/Shop/Shop';
import ProductDetail from './Pages/User/ProductDetail/ProductDetail';
import Cart from './Pages/User/Cart/Cart';
import CheckOut from './Pages/User/CheckOut/CheckOut';
import MyOrder from './Pages/User/MyOrder/MyOrder';
import MyProfile from './Pages/User/MyProfile/MyProfile';
import Category from './Pages/Admin/Category/Category';
import Product from './Pages/Admin/Product/Product';
import ProductImageAndSize from './Pages/Admin/ProductImageAndSize/ProductImageAndSize';
import Order from './Pages/Admin/Order/Order';
import User from './Pages/Admin/User/User';
import Revenue from './Pages/Admin/Revenue/Revenue';

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
          <Route path="/product-detail" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/myorder" element={<MyOrder />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/category" element={<Category />} />
          <Route path="/product" element={<Product />} />
          <Route path="/product-image-size" element={<ProductImageAndSize />} />
          <Route path="/order" element={<Order />} />
          <Route path="/user" element={<User />} />
          <Route path="/revenue" element={<Revenue />} />


        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
