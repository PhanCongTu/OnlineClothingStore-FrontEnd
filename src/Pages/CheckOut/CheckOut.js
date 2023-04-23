import React, { useEffect, useState } from 'react'
import '../../css/bootstrap.min.css'
import '../../css/magnific-popup.css'
import '../../css/nice-select.css'
import '../../css/slicknav.min.css'
import '../../css/style.css'
import '../../css/style.css.map'
import '../../css/slicknav.min.css'
import './CheckOut.css'
import Header from '../../Components/Header/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function CheckOut() {
      const navigate = useNavigate();
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      const [name, setName] = useState('')
      const [phoneNumber, setPhoneNumber] = useState('')
      const [email, setEmail] = useState('')
      const [avatar, setAvatar] = useState('')
      const [address, setAddress] = useState('')
      const [note, setNote] = useState('')
      const [listCart, setListCart] = useState([])
      const [empty, setEmpty] = useState(true)
      const handleChangeName = (e) => {
            if (e.target.value === '') setEmpty(true)
            else setEmpty(false)
            setName(e.target.value)
      }
      const handleChangeAddress = (e) => {
            if (e.target.value === '') setEmpty(true)
            else setEmpty(false)
            setAddress(e.target.value)
      }
      const handleChangePhoneNumber = (e) => {
            if (e.target.value === '') setEmpty(true)
            else setEmpty(false)
            setPhoneNumber(e.target.value)
      }
      const handleChangeNote = (e) => {
            if (e.target.value === '') setEmpty(true)
            else setEmpty(false)
            setNote(e.target.value)
      }
      const handleChangeEmail = (e) => {
            if (e.target.value === '') setEmpty(true)
            else setEmpty(false)
            setEmail(e.target.value)
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
            let config2 = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: 'http://localhost:8282/api/cart/my-cart',
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };
            axios.request(config)
                  .then((response) => {
                        console.log(response.data);
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
            axios.request(config2)
                  .then((response) => {
                        setListCart(response.data)
                  })
                  .catch((error) => {
                        alert(error.message);
                  });
      }, [])
      const handleOrder = () => {
            /// Update lại thông tin user
            let data = JSON.stringify({
                  "name": `${name}`,
                  "avatar": `${avatar}`,
                  "phoneNumber": `${phoneNumber}`,
                  "email": `${email}`
            });

            let config = {
                  method: 'put',
                  maxBodyLength: Infinity,
                  url: 'http://localhost:8282/api/user/update',
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${LoginedUser.token}`
                  },
                  data: data
            };

            axios.request(config)
                  .then((response) => {
                        navigate('/')
                  })
                  .catch((error) => {
                        alert(error.message);
                        // navigate('/login')
                  });
            let data2 = JSON.stringify({
                  "address": `${address}`,
                  "note": `${note}`,
                  "phoneNumber": `${phoneNumber}`,
                  "idCarts": []
            });

            let config2 = {
                  method: 'post',
                  maxBodyLength: Infinity,
                  url: 'http://localhost:8282/api/order/add',
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${LoginedUser.token}`
                  },
                  data: data2
            };

            axios.request(config2)
                  .then((response) => {
                        navigate('/myorder')
                  })
                  .catch((error) => {
                        alert(error.message);
                        navigate('/login')
                  });
      }
      return (
            <div>
                  <Header />
                  <section className="intro_cart" >
                        <h4 className='intro_name'>Đặt hàng</h4>
                  </section>
                  <section className="checkout spad">
                        <div className="container">
                              <div className="checkout__form">
                                    <form action="#">
                                          <div className="row">
                                                <div className="col-lg-8 col-md-6">

                                                      <h6 className="checkout__title">Chi tiết hóa đơn</h6>
                                                      <div className="row">
                                                            <div className="col-lg-6">
                                                                  <div className="checkout__input" >
                                                                        <p>Họ và tên<span>*</span></p>
                                                                        <input className='input_text' type="text" name="name" value={name}
                                                                              onChange={(e) => handleChangeName(e)}
                                                                              placeholder="Vui lòng nhập họ và tên" />
                                                                  </div>
                                                            </div>
                                                            <div className="col-lg-6">
                                                                  <div className="checkout__input">
                                                                        <p>Số điện thoại<span>*</span></p>
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
                                                      <div className="checkout__input">
                                                            <p>Địa chỉ<span>*</span></p>
                                                            <input type="text" name='address' value={address}
                                                                  onChange={(e) => handleChangeAddress(e)}
                                                                  placeholder="Vui lòng nhập địa chỉ" className="checkout__input__add input_text" />
                                                      </div>

                                                      <div className="checkout__input">
                                                            <p>Ghi chú</p>
                                                            <input className='input_text' type="text" value={note} name='note'
                                                                  onChange={(e) => handleChangeNote(e)}
                                                                  placeholder="Ghi chú dành cho chủ cửa hàng và shiper" />
                                                      </div>
                                                </div>
                                                <div className="col-lg-4 col-md-6">
                                                      <div className="checkout__order">
                                                            <h4 className="order__title">Đơn hàng của bạn</h4>
                                                            <div className="checkout__order__products">Sản phẩm <span>Tổng</span></div>
                                                            <ul className="checkout__total__products">
                                                                  {listCart.length > 0 ? listCart?.map((cartItem, index) => {
                                                                        return <li key={index}>{index + 1}. {cartItem.product.productName} ({cartItem.quantity}) <span>{cartItem.quantity * cartItem.product.price} VNĐ</span></li>
                                                                  })
                                                                        :
                                                                        <h3>Giỏ hàng trống!</h3>
                                                                  }


                                                            </ul>
                                                            <ul className="checkout__total__all">
                                                                  <li>Tổng số tiền <span>{listCart.length > 0 ? listCart?.reduce(
                                                                        (accumulator, currentValue) =>
                                                                              accumulator + currentValue.quantity * currentValue.product.price,
                                                                        0
                                                                  ) : '0'} VNĐ</span></li>
                                                            </ul>

                                                            <p>Hiện tại shop chỉ có phương thức thanh toán khi giao hàng (COD).</p>
                                                            <div className="checkout__input__checkbox">
                                                                  <input type="radio" id="html" name="fav_language" value="COD" defaultChecked="true" />
                                                                  <label htmlFor="html">Thanh toán khi nhận hàng</label>
                                                            </div>
                                                            {empty ? <p className='empty'>Không được bỏ trống!</p> : <></>}

                                                            {listCart.length > 0 && empty !== true ?
                                                                  <div onClick={handleOrder} className="site-btn btn_dat_hang">Đặt hàng</div>
                                                                  :
                                                                  <></>
                                                            }

                                                      </div>
                                                </div>
                                          </div>
                                    </form>
                              </div>
                        </div>


                  </section >
            </div >
      )
}

export default CheckOut
