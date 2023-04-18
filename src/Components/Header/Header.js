import React from 'react'
import { NavLink } from "react-router-dom";

import '../css/bootstrap.min.css'
import '../css/magnific-popup.css'
import '../css/nice-select.css'
import '../css/slicknav.min.css'
import '../css/style.css'
import '../css/style.css.map'
import '../css/slicknav.min.css'
import './Header.css'

function Header() {
      return (
            <header className="header">
                  <div className="header__top">
                        <div className="container">
                              <div className="row">
                                    <div className="col-lg-6 col-md-7">
                                          <div className="header__top__left">
                                                <p>Chào mừng đến với Shop của chúng tôi</p>
                                          </div>
                                    </div>
                                    <div className="col-lg-6 col-md-7">
                                          <div className="header__top__right">
                                                <div className="header__top__links">
                                                      <NavLink exact activeStyle={{
                                                            backgroundColor: 'white',
                                                            color: 'red'
                                                      }} to="/login" className="my-link">Đăng nhập</NavLink>
                                                </div>
                                                <div className="header__top__hover">
                                                      <span>Phan Công Tú</span>
                                                      <ul>
                                                            <li className='user-option'>Chỉnh sửa tài khoản</li>
                                                            <li className='user-option'>Giỏ hàng</li>
                                                            <li className='user-option'>Lịch sử mua hàng</li>
                                                            <li className='user-option'><strong>Đăng suất</strong></li>
                                                      </ul>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className="container">
                        <nav className="header__menu mobile-menu">
                              <ul>
                                    <li className="active"><a href="./index.html">Home</a></li>
                                    <li><a href="./shop.html">Shop</a></li>
                                    <li><a href="./shop.html">Pages</a></li>
                                    <li><a href="./blog.html">Blog</a></li>
                                    <li><a href="./contact.html">Contacts</a></li>
                              </ul>
                        </nav>
                  </div>
            </header >
      )
}

export default Header
