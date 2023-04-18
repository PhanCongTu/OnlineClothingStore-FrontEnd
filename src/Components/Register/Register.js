import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './Register.css'
function Register() {
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
                                                <label className="form-label" for="Username">Họ và tên</label>
                                                <input type="email" id="Username" className="form-control form-control-lg" />
                                                <label className="form-label" for="Username">Tên đăng nhập*</label>
                                                <input type="email" id="Username" className="form-control form-control-lg" />
                                                <label className="form-label" for="Username">Mật khẩu*</label>
                                                <input type="email" id="Username" className="form-control form-control-lg" />
                                                <label className="form-label" for="Username">Số điện thoại</label>
                                                <input type="email" id="Username" className="form-control form-control-lg" />
                                                <label className="form-label" for="Username">Email</label>
                                                <input type="email" id="Username" className="form-control form-control-lg" />
                                          </div>

                                          <div className="d-flex justify-content-center align-items-center mb-4">
                                                <button type="submit" className=" btn btn-success btn-lg btn-block">Đăng ký</button>
                                          </div>
                                    </form>
                                    <a href="hello" style={{}} className="d-flex justify-content-around align-items-center mb-4">Đã có tài khoản? Đăng nhập</a>
                              </div>
                        </div>
                  </div>
            </section>
      )
}

export default Register
