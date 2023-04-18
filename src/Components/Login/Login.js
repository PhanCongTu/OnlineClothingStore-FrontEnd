import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css'

function Login() {
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
                                                <label className="form-label" for="Username">Username</label>
                                                <input type="email" id="Username" className="form-control form-control-lg" />
                                          </div>

                                          <div className="form-outline mb-4">
                                                <label className="form-label" for="form1Example23">Password</label>
                                                <input type="password" id="form1Example23" className="form-control form-control-lg" />
                                          </div>

                                          <div className="d-flex justify-content-around align-items-center mb-4">
                                                <div className="form-check">
                                                      <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                                      <label className="form-check-label" for="form1Example3"> Remember me </label>
                                                </div>
                                          </div>
                                          <div className="d-flex justify-content-center align-items-center mb-4">
                                                <button type="submit" className=" btn btn-success btn-lg btn-block">Sign in</button>
                                          </div>
                                    </form>
                                    <a href="hello" style={{}} className="d-flex justify-content-around align-items-center mb-4">Chưa có tài khoản? Đăng ký ngay</a>
                              </div>
                        </div>
                  </div>
            </section>
      )
}

export default Login
