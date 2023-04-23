import React, { useEffect, useState } from 'react'
import '../../css/bootstrap.min.css'
import '../../css/magnific-popup.css'
import '../../css/nice-select.css'
import '../../css/slicknav.min.css'
import '../../css/style.css'
import '../../css/style.css.map'
import '../../css/slicknav.min.css'
import './MyProfile.css'
import Header from '../../Components/Header/Header'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import defaultAvatar from '../../Image/default-avatar.png'
function MyProfile() {
      const navigate = useNavigate();
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      const [name, setName] = useState('')
      const [phoneNumber, setPhoneNumber] = useState('')
      const [email, setEmail] = useState('')
      const [avatar, setAvatar] = useState('')
      const [oldPassword, setOldPassword] = useState('')
      const [newPassword, setNewPassword] = useState('')
      const [renewPassword, setRenewPassword] = useState('')
      const [empty, setEmpty] = useState(false)
      const [failPassword, setFailPassword] = useState('')
      const handleChangeName = (e) => {
            if (e.target.value === '') setEmpty(true)
            else setEmpty(false)
            setName(e.target.value)
      }

      const handleChangePhoneNumber = (e) => {
            setPhoneNumber(e.target.value)
      }
      const handleChangeEmail = (e) => {
            setEmail(e.target.value)
      }
      const handleChangeOldPassword = (e) => {
            setOldPassword(e.target.value)
      }
      const handleChangeNewPassword = (e) => {
            setNewPassword(e.target.value)
      }
      const handleChangeRenewPassword = (e) => {
            setRenewPassword(e.target.value)
      }
      const ChangePassword = () => {
            if (oldPassword === '' || newPassword === '' || renewPassword === '')
                  setFailPassword('Không Được bỏ trống')
            else if (newPassword !== renewPassword)
                  setFailPassword('Mật khẩu mới không trùng khớp')
            else {
                  let data = JSON.stringify({
                        "oldPassword": `${oldPassword}`,
                        "newPassword": `${newPassword}`
                  });

                  let config = {
                        method: 'put',
                        maxBodyLength: Infinity,
                        url: 'http://localhost:8282/api/user/change-password',
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${LoginedUser.token}`
                        },
                        data: data
                  };

                  axios.request(config)
                        .then((response) => {
                              setFailPassword('Đổi mật khẩu thành công')
                        })
                        .catch((error) => {
                              setFailPassword('Mật khẩu không chính xác')
                        });
            }
      }
      useEffect(() => {
            let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: 'http://localhost:8282/api/user/me',
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };
            axios.request(config)
                  .then((response) => {
                        console.log(response.data)
                        const userInf = response.data;
                        setName(userInf.name);
                        setPhoneNumber(userInf.phoneNumber);
                        setEmail(userInf.email);
                        setAvatar(userInf.avatar);
                  })
                  .catch((error) => {
                        alert(error.message);
                        navigate('/login')
                  });

      }, [])
      return (
            <div>
                  <Header />
                  <section className="intro_cart" >
                        <h4 className='intro_name'>Thông tin cá nhân</h4>
                  </section>
                  <section className="checkout spad">
                        <div className="container">
                              <div className="checkout__form">
                                    <form action="#">
                                          <div className="row">
                                                <div className="col-lg-8 col-md-6">

                                                      <h5 className="checkout__title">Thông tin cơ bản</h5>
                                                      <div className="row">
                                                            <div className="col-lg-6">
                                                                  <div className="checkout__input" >
                                                                        <p>Họ và tên<span>*</span></p>
                                                                        {empty ?
                                                                              <p style={{ color: 'red' }} >Không được bỏ trống họ và tến</p>
                                                                              :
                                                                              <></>}
                                                                        <input className='input_text' type="text" name="name" value={name}
                                                                              onChange={(e) => handleChangeName(e)}
                                                                              placeholder="Vui lòng nhập họ và tên" />
                                                                  </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                  <div className="checkout__input">
                                                                        <p>Số điện thoại</p>
                                                                        <input className='input_text' type="number" name="phoneNumber" value={phoneNumber}
                                                                              onChange={(e) => handleChangePhoneNumber(e)}
                                                                              placeholder="Vui lòng nhập số điện thoại" />
                                                                  </div>
                                                            </div>
                                                      </div>
                                                      <div className="checkout__input">
                                                            <p>Email</p>
                                                            <input className='input_text' type="text" name='email' value={email}
                                                                  onChange={(e) => handleChangeEmail(e)}
                                                                  placeholder="Vui lòng nhập email" />
                                                      </div>
                                                      <br></br>
                                                      <br></br>
                                                      <h5 className="checkout__title">Đổi mật khẩu</h5>
                                                      {failPassword !== '' ?
                                                            <p style={{ color: 'red' }} >{failPassword}</p>
                                                            :
                                                            <></>}
                                                      <div className="checkout__input">
                                                            <p>Mật khẩu cũ<span>*</span></p>
                                                            <input type="text" name='address' value={oldPassword}
                                                                  onChange={(e) => handleChangeOldPassword(e)}
                                                                  placeholder="Nhập mật khẩu cũ" className="checkout__input__add input_text" />
                                                      </div>

                                                      <div className="checkout__input">
                                                            <p>Mật khẩu mới<span>*</span></p>
                                                            <input className='input_text' type="text" value={newPassword} name='note'
                                                                  onChange={(e) => handleChangeNewPassword(e)}
                                                                  placeholder="Nhập mật khẩu mới" />
                                                      </div>
                                                      <div className="checkout__input">
                                                            <p>Nhập lại mật khẩu mới<span>*</span></p>
                                                            <input className='input_text' type="text" value={renewPassword} name='note'
                                                                  onChange={(e) => handleChangeRenewPassword(e)}
                                                                  placeholder="Nhập lại mật khẩu mới" />
                                                      </div>
                                                      <div className="site-btn btn_dat_hang" onClick={ChangePassword}>Đổi mật khẩu</div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                      <div className="checkout__order">
                                                            <h4 className="order__title">Ảnh đại diện</h4>
                                                            <div>
                                                                  <img className='avatar' src={avatar !== 'null' ? avatar : defaultAvatar} alt='' />
                                                            </div>
                                                            <input type='file' />
                                                            {!empty ?
                                                                  <div className="site-btn btn_dat_hang">Chỉnh sửa</div>
                                                                  :
                                                                  <p>Không được bỏ trống họ và tên</p>}



                                                      </div>
                                                </div>
                                          </div>
                                    </form>
                              </div>
                        </div>


                  </section >
            </div>
      )
}

export default MyProfile
