import React, { useEffect, useState } from 'react'
import '../../css/bootstrap.min.css'
import '../../css/magnific-popup.css'
import '../../css/nice-select.css'
import '../../css/slicknav.min.css'
import '../../css/style.css'
import '../../css/style.css.map'
import '../../css/slicknav.min.css'
import './Cart.css'
import Header from '../../Components/Header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faTruck, faXmark } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
function Cart() {
      const navigate = useNavigate();
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      const [data, setData] = useState([])
      const [updateSwitch, setUpdateSwitch] = useState(true)


      const handleDeleteCart = (cartId) => {
            let config = {
                  method: 'delete',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/cart/delete/${cartId}`,
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };

            axios.request(config)
                  .then((response) => {
                        document.getElementById(`id-${cartId}`).remove();
                  })
                  .catch((error) => {
                        alert(error.message);
                  });

      }
      const handleDecrease = (cartItem) => {
            let config = {
                  method: 'post',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/cart/add-update?productId=${cartItem.product.id}&quantity=${-1}&size=${cartItem.size}`,
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };

            axios.request(config)
                  .then((response) => {
                        setUpdateSwitch((pre) => !pre)
                  })
                  .catch((error) => {
                        alert(error.message);
                  });
      }
      const handleIncrease = (cartItem) => {
            let config = {
                  method: 'post',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/cart/add-update?productId=${cartItem.product.id}&quantity=${1}&size=${cartItem.size}`,
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };

            axios.request(config)
                  .then((response) => {
                        setUpdateSwitch((pre) => !pre)
                  })
                  .catch((error) => {
                        // console.log(error);
                        alert(error.message);
                  });
      }
      useEffect(() => {
            let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: 'http://localhost:8282/api/cart/my-cart',
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };

            axios.request(config)
                  .then((response) => {
                        setData(response.data)
                  })
                  .catch((error) => {
                        alert(error.message);
                  });
      }, [updateSwitch])
      return (
            <div>
                  <Header />
                  <section className="intro_cart" >
                        <h4 className='intro_name'>Giỏ hàng</h4>
                  </section>
                  <section className="shopping-cart spad">
                        <div className="container">
                              <div className="row">
                                    <div className="col-lg-8">
                                          <div className="shopping__cart__table">
                                                <table>
                                                      <thead>
                                                            <tr>
                                                                  <th>Sản phẩm</th>
                                                                  <th>Số lượng</th>
                                                                  <th>Size</th>
                                                                  <th>Tổng tiền</th>
                                                                  <th></th>
                                                            </tr>
                                                      </thead>
                                                      <tbody>
                                                            {data.length > 0 ? data?.map((cartItem, index) => {
                                                                  // 
                                                                  return (
                                                                        <tr key={index} id={`id-${cartItem.id}`} >
                                                                              <td className="product__cart__item">
                                                                                    <div className="product__cart__item__pic">
                                                                                          <img className='product_img' src={`${cartItem.product.productImages[0].image}`} alt="" />
                                                                                    </div>
                                                                                    <div className="product__cart__item__text">
                                                                                          {/* <h6>{cartItem.product.productName}</h6> */}
                                                                                          <NavLink className='product_item_name' to="/product" state={{ productId: cartItem.product.id }} >{cartItem.product.productName}</NavLink>
                                                                                          <h5>{cartItem.product.price} VND</h5>
                                                                                    </div>
                                                                              </td>
                                                                              <td className="quantity__item">

                                                                                    <div className="pro-qty-2">
                                                                                          {cartItem.quantity > 1 ?
                                                                                                <FontAwesomeIcon onClick={() => handleDecrease(cartItem)} className='ajust_quantity' icon={faAngleLeft} />
                                                                                                :
                                                                                                <FontAwesomeIcon className='ajust_quantity' icon={faAngleLeft} />
                                                                                          }
                                                                                          <span className='span-quantity'  >{cartItem.quantity}</span>
                                                                                          {cartItem.quantity < cartItem.product.quantity ?
                                                                                                <FontAwesomeIcon onClick={() => handleIncrease(cartItem)} className='ajust_quantity' icon={faAngleRight} />
                                                                                                :
                                                                                                <FontAwesomeIcon className='ajust_quantity' icon={faAngleRight} />
                                                                                          }

                                                                                    </div>

                                                                              </td>
                                                                              <td className="cart__size">{cartItem.size}</td>
                                                                              <td className="cart__price">{cartItem.quantity * cartItem.product.price} VND</td>
                                                                              <td className="cart__close"><FontAwesomeIcon className='icon_delete' icon={faXmark} size='xl' onClick={() => handleDeleteCart(cartItem.id)} /></td>
                                                                        </tr>
                                                                  )

                                                            })
                                                                  :
                                                                  <h1>Giỏ hàng trống !</h1>
                                                            }

                                                      </tbody>
                                                </table>
                                          </div>
                                          <div className="row">
                                                <div className="col-lg-6 col-md-6 col-sm-6" >
                                                      <div className="continue__btn" onClick={() => (navigate('/shop'))}>
                                                            <div  >Tiếp tục mua sắm</div>
                                                      </div>
                                                </div>

                                          </div>
                                    </div>
                                    <div className="col-lg-4">
                                          <div className="cart__total">
                                                <h6>Tổng số tiền</h6>
                                                <ul>
                                                      <li>Tổng <span>{data.length > 0 ? data.reduce(
                                                            (accumulator, currentValue) =>
                                                                  accumulator + currentValue.quantity * currentValue.product.price,
                                                            0
                                                      ) : '0'} VND</span></li>
                                                </ul>
                                                {data.length > 0 ?
                                                      <div className="continue__btn update__btn" onClick={() => navigate('/checkout')}>
                                                            <div ><FontAwesomeIcon icon={faTruck} /> Tiến hành đặt hàng</div>
                                                      </div>
                                                      : <></>}

                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section >
            </div >
      )
}

export default Cart
