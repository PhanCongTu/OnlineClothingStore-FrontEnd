import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

function Login() {
      const navigate = useNavigate();
      const [rememberMe, setRememberMe] = useState(true);
      const [login, setLogin] = useState({
            username: '',
            password: ''
      });
      const [loginFlase, setLoginFlase] = useState(false);
      const handleChange = (e) => {
            const { name, value } = e.target
            setLogin({ ...login, [name]: value })
      }
      const handleRememberMe = (e) => {
            setRememberMe(!rememberMe)
      }
      const handleSubmit = () => {
            let data = JSON.stringify(login);
            console.log(data);

            let config = {
                  method: 'post',
                  maxBodyLength: Infinity,
                  url: 'http://localhost:8282/api/login',
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  data: data
            };

            axios.request(config)
                  .then((response) => {
                        navigate('/');
                        if (rememberMe) localStorage.setItem('LoginedUser', JSON.stringify(response.data));
                        else sessionStorage.setItem('LoginedUser', JSON.stringify(response.data));
                        //  console.log(response.data);
                  })
                  .catch((error) => {
                        setLoginFlase(true)
                  });
      }
      return (
            <section className="vh-100">
                  <div className="container py-5 h-100">
                        <div className="row d-flex align-items-center justify-content-center h-100">
                              <div className="col-md-8 col-lg-7 col-xl-6">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                                          className="img-fluid" alt="Phone" />
                              </div>
                              <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                                    <h1 className="d-flex justify-content-around align-items-center mb-4">Chào mừng trở lại</h1>
                                    <form>
                                          <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="Username">Tên đăng nhập</label>
                                                <input type="email" id="Username" className="form-control form-control-lg"
                                                      value={login.username}
                                                      name="username"
                                                      style={{ width: '100%' }}
                                                      onChange={e => handleChange(e)} />
                                          </div>

                                          <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form1Example23">Mật khẩu</label>
                                                <input type="password" id="form1Example23" className="form-control form-control-lg"
                                                      value={login.password}
                                                      name="password"
                                                      style={{ width: '100%' }}
                                                      onChange={e => handleChange(e)} />
                                          </div>

                                          <div className="d-flex justify-content-around align-items-center mb-4">
                                                <div className="form-check">
                                                      <input className="form-check-input" type="checkbox" value="" id="form1Example3"
                                                            onChange={handleRememberMe}
                                                            checked={rememberMe}
                                                      />
                                                      <label className="form-check-label" htmlFor="form1Example3"> Ghi nhớ tài khoản</label>
                                                </div>
                                          </div>
                                          {loginFlase ?
                                                <div className="d-flex justify-content-around align-items-center  ">
                                                      <h6 style={{ color: 'red' }}>Tên đăn nhập hoặc mật khẩu không đúng</h6>
                                                </div>
                                                : <></>}

                                          <div className="d-flex justify-content-center align-items-center mb-4">
                                                <h3 onClick={handleSubmit} className=" btn btn-success btn-lg btn-block">Đăng nhập</h3>
                                          </div>
                                    </form>
                                    <div className="d-flex justify-content-center align-items-center mb-4">
                                          <NavLink style={{ textDecoration: 'none' }} to="/register" className="my-link">
                                                Chưa có tài khoản? Đăng ký ngay
                                          </NavLink>
                                    </div>

                                    <div className="float-right">
                                          <NavLink style={{ textDecoration: 'none', color: '#ff0000', fontSize: '18px' }} to="/" className="my-link">
                                                Trở về trang chủ <FontAwesomeIcon icon={faArrowRight} />
                                          </NavLink>
                                    </div>
                              </div>
                        </div>
                  </div >
            </section >
      )
}

export default Login
