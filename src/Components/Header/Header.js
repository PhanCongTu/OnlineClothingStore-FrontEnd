import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

import '../../css/bootstrap.min.css'
import '../../css/magnific-popup.css'
import '../../css/nice-select.css'
import '../../css/slicknav.min.css'
import '../../css/style.css'
import '../../css/style.css.map'
import '../../css/slicknav.min.css'
import './Header.css'

function Header() {
      const navigate = useNavigate();
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      const handleLogout = () => {
            sessionStorage.removeItem('LoginedUser')
            localStorage.removeItem('LoginedUser')
            navigate('/');
      }
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
                                    <div className="col-lg-5 col-md-7">
                                          <div className="header__top__right">
                                                {LoginedUser ?
                                                      <div className="header__top__hover pr-5">
                                                            <span className='username'>{LoginedUser.fullName}</span>
                                                            <ul>
                                                                  <li className='user-option'>Chỉnh sửa tài khoản</li>
                                                                  <li className='user-option' onClick={() => (navigate('/cart'))}>Giỏ hàng</li>
                                                                  <li className='user-option' onClick={() => (navigate('/myorder'))}>Lịch sử mua hàng</li>
                                                                  <li className='user-option' onClick={handleLogout}><strong>Đăng suất</strong></li>
                                                            </ul>
                                                      </div>
                                                      :
                                                      <div className="header__top__links">
                                                            <NavLink style={{ textDecoration: 'none' }} to="/login" className="my-link">Đăng nhập</NavLink>
                                                      </div>
                                                }


                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className="container">
                        <nav className="header__menu mobile-menu">
                              <ul>
                                    <li>
                                          <NavLink style={({ isActive }) => ({
                                                textDecoration: 'none',
                                                color: isActive ? 'red' : 'black',
                                                borderBottom: isActive ? '3px solid red' : ''
                                          })} to="/">Home</NavLink>
                                    </li>
                                    <li>
                                          <NavLink style={({ isActive }) => ({
                                                textDecoration: 'none',
                                                color: isActive ? 'red' : 'black',
                                                borderBottom: isActive ? '3px solid red' : ''
                                          })} to="/shop">Shop</NavLink>
                                    </li>
                                    {/* <li>
                                          <NavLink style={({ isActive }) => ({
                                                textDecoration: 'none',
                                                color: isActive ? 'red' : 'black',
                                                borderBottom: isActive ? '3px solid red' : ''
                                          })} to={{ pathname: "/product" }} state={{ productId: 1 }} >ProductDetail</NavLink>
                                    </li> */}
                              </ul>
                        </nav>
                  </div>
            </header >
      )
}

export default Header
