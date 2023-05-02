import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'
function Register() {
      const navigate = useNavigate();
      // declaring initial state
      const [state, setState] = useState({
            name: '',
            userName: '',
            password: '',
            phoneNumber: '',
            email: ''
      });
      const [login, setLogin] = useState({
            username: '',
            password: ''
      })
      const handleChange = (e) => {
            const { name, value } = e.target
            setState({ ...state, [name]: value })

      }
      const handleSubmit = () => {
            // if (name === '' ||
            //       userName === '' ||
            //       password === '')
            login.username = state.userName
            login.password = state.password
            console.log(login)
            let data = JSON.stringify(state);

            let config = {
                  method: 'post',
                  maxBodyLength: Infinity,
                  url: 'http://localhost:8282/api/signup',
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  data: data
            };

            axios.request(config)
                  .then((response) => {

                        console.log(JSON.stringify(response.data));
                        // this.props.history.replace('/logiAnalyserNode
                        let dataLogin = JSON.stringify(login);
                        let config = {
                              method: 'post',
                              maxBodyLength: Infinity,
                              url: 'http://localhost:8282/api/login',
                              headers: {
                                    'Content-Type': 'application/json'
                              },
                              data: dataLogin
                        };

                        axios.request(config)
                              .then((response) => {
                                    navigate('/');
                                    sessionStorage.setItem('LoginedUser', JSON.stringify(response.data));
                                    //  console.log(response.data);
                              })
                              .catch((error) => {
                                    console.log(error);
                              });

                  })
                  .catch((error) => {
                        console.log(error);
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


                                    <h1 className="d-flex justify-content-around align-items-center mb-4">Đăng ký tài khoản</h1>
                                    <form>
                                          <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="name">Họ và tên*</label>
                                                <input type="text" id="name" className="form-control form-control-lg"
                                                      value={state.name}
                                                      name="name"
                                                      style={{ width: '100%' }}
                                                      onChange={e => handleChange(e)} />

                                                <label className="form-label" htmlFor="Username">Tên đăng nhập* </label>
                                                <input type="text" id="Username" className="form-control form-control-lg"
                                                      value={state.userName}
                                                      name="userName"
                                                      style={{ width: '100%' }}
                                                      onChange={e => handleChange(e)} />

                                                <label className="form-label" htmlFor="password">Mật khẩu* </label>
                                                <input type="password" id="password" className="form-control form-control-lg"
                                                      value={state.password}
                                                      name="password"
                                                      style={{ width: '100%' }}
                                                      onChange={e => handleChange(e)} />

                                                <label className="form-label" htmlFor="phoneNumber">Số điện thoại </label>
                                                <input type="number" id="phoneNumber" className="form-control form-control-lg"
                                                      value={state.phoneNumber}
                                                      name="phoneNumber"
                                                      style={{ width: '100%' }}
                                                      onChange={e => handleChange(e)} />

                                                <label className="form-label" htmlFor="email">Email </label>
                                                <input type="email" id="email" className="form-control form-control-lg"
                                                      value={state.email}
                                                      name="email"
                                                      style={{ width: '100%' }}
                                                      onChange={e => handleChange(e)} />
                                          </div>

                                          <div className="d-flex justify-content-center align-items-center mb-4">

                                                <h3 onClick={handleSubmit} className=" btn btn-success btn-lg btn-block">Đăng ký</h3>
                                          </div>
                                    </form>

                                    <div className="d-flex justify-content-center align-items-center mb-4">
                                          <NavLink style={{ textDecoration: 'none' }} to="/login" className="my-link">
                                                Đã có tài khoản? Đăng nhập
                                          </NavLink>
                                    </div>
                                    <div className="float-right">
                                          <NavLink style={{ textDecoration: 'none', color: '#ff0000', fontSize: '18px' }} to="/" className="my-link">
                                                Trở về trang chủ <FontAwesomeIcon icon={faArrowRight} />
                                          </NavLink>

                                    </div>
                              </div>
                        </div>
                  </div>
            </section>
      )
}

export default Register
