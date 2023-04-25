import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";

import '../../css/bootstrap.min.css'
import '../../css/magnific-popup.css'
import '../../css/nice-select.css'
import '../../css/slicknav.min.css'
import '../../css/style.css'
import '../../css/style.css.map'
import '../../css/slicknav.min.css'
import './AdminHeader.css'

function AdminHeader() {
      const navigate = useNavigate();
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      return (
            <header className="header">
                  <div className="header__top_admin">
                        <div className="container">
                              <div className="row">
                                    <div className="col-lg-6 col-md-7">
                                          <div className="header__top__left">
                                                <p>Trang dành cho quản trị viên</p>
                                          </div>
                                    </div>
                                    <div className="col-lg-5 col-md-7">
                                          <div className="header__top__right">
                                                <div className="header__top__hover pr-5">
                                                      <span className='username_admin'>{LoginedUser.fullName}</span>
                                                      <ul>
                                                            <li className='user-option' onClick={() => navigate('/')}><strong>Thoát</strong></li>
                                                      </ul>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </div>
                  <div className="container">
                        <nav className="header__menu ">
                              {/* <ul>
                                    <li>
                                          <h3 className="dropbtn">Category</h3>
                                          <div className="dropdown">
                                                <div className="dropdown-content">
                                                      <div className='nav_el' onClick={() => (navigate(''))}  >Link 1</div>
                                                      <div className='nav_el' onClick={() => (navigate(''))} >Link 2</div>
                                                      <div className='nav_el' onClick={() => (navigate(''))} >Link 3</div>
                                                </div>
                                          </div>
                                    </li>


                              </ul> */}
                              <ul>
                                    <li>
                                          <NavLink style={({ isActive }) => ({
                                                textDecoration: 'none',
                                                color: isActive ? 'red' : 'black',
                                                borderBottom: isActive ? '3px solid red' : ''
                                          })} to="/category">Danh mục</NavLink>
                                    </li>
                                    <li>
                                          <NavLink style={({ isActive }) => ({
                                                textDecoration: 'none',
                                                color: isActive ? 'red' : 'black',
                                                borderBottom: isActive ? '3px solid red' : ''
                                          })} to="/product">Sản phẩm</NavLink>
                                    </li>
                                    <li>
                                          <NavLink style={({ isActive }) => ({
                                                textDecoration: 'none',
                                                color: isActive ? 'red' : 'black',
                                                borderBottom: isActive ? '3px solid red' : ''
                                          })} to="/order">Đơn hàng</NavLink>
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

export default AdminHeader
