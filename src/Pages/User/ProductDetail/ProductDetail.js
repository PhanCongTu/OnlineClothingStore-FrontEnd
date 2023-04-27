import React, { useEffect, useState } from 'react'
import '../../../css/bootstrap.min.css'
import '../../../css/magnific-popup.css'
import '../../../css/nice-select.css'
import '../../../css/slicknav.min.css'
import '../../../css/style.css'
import '../../../css/style.css.map'
import '../../../css/slicknav.min.css'
import './ProductDetail.css'
import Header from '../../../Components/Header/Header'
import Footer from '../../../Components/Footer/Footer'
import { NavLink, useLocation } from 'react-router-dom'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function ProductDetail() {
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      const checkUser = (role) => role == 'ROLE_USER'
      let location = useLocation();
      const { productId } = location.state
      const [data, setData] = useState({})
      const [size, setSize] = useState('')
      const [productQuantity, setProductQuantity] = useState(0)
      const [quantity, setQuantity] = useState(1)
      const [mainImage, setMainImage] = useState('')
      const [success, setSuccess] = useState(false)
      const handleMainImage = (ulr) => {
            setMainImage(ulr)
      }
      const handleQuantity = (num) => {
            if (num > 0 && num <= productQuantity) {
                  setQuantity(num)
            }
      }
      const handleSize = (size) => {
            console.log(size)
            setSize(size)
      }
      useEffect(() => {
            let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/product/${productId}`,
                  headers: {}
            };

            axios.request(config)
                  .then((response) => {
                        setData(response.data)
                        setSize(response.data.productSizes[0].size)
                        setProductQuantity(response.data.quantity)
                        setMainImage(response.data.productImages[0].image)
                  })
                  .catch((error) => {
                        alert(error);
                  });
      }, [productId])
      const handleAddCart = () => {

            let config = {
                  method: 'post',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/cart/add-update?productId=${productId}&quantity=${quantity}&size=${size}`,
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };

            axios.request(config)
                  .then((response) => {
                        setSuccess(true)
                        setTimeout(() => {
                              setSuccess(false)
                        }, 1000);
                  })
                  .catch((error) => {
                        // console.log(error);
                        alert(error.message);
                  });
      }
      return (
            <div>
                  <Header />
                  <section className="shop-details">
                        <div className="product__details__pic">
                              <div className="container">
                                    <div className="row">
                                          <div className="col-lg-12 pb-5">
                                                <h2>Chi tiết sản phẩm</h2>
                                                <h3>{data.productName}</h3>
                                          </div>
                                    </div>
                                    <div className="row">
                                          <div className="col-lg-3 col-md-3 " style={{ overflowY: 'scroll', height: '550px' }}>
                                                <div className="nav nav-tabs" role="tablist">
                                                      {data.productImages?.map((imageItem, index) => {
                                                            if (imageItem.image.includes('uploads')) {
                                                                  return (
                                                                        <div key={index} className="nav-item" onClick={() => handleMainImage(imageItem.image)}>
                                                                              < div className="nav-link" >
                                                                                    <div className="product__thumb__pic set-bg" style={{
                                                                                          backgroundSize: 'contain',
                                                                                          backgroundImage: `url(http://${imageItem.image})`,
                                                                                    }}>
                                                                                    </div>
                                                                              </div>
                                                                        </div>
                                                                  )
                                                            }
                                                            else {
                                                                  return (
                                                                        <div key={index} className="nav-item" onClick={() => handleMainImage(imageItem.image)}>
                                                                              < div className="nav-link" >
                                                                                    <div className="product__thumb__pic set-bg" style={{
                                                                                          backgroundSize: 'contain',
                                                                                          backgroundImage: `url(${imageItem.image})`,
                                                                                    }}>
                                                                                    </div>
                                                                              </div>
                                                                        </div>
                                                                  )
                                                            }

                                                      })}
                                                </div>
                                          </div>
                                          <div className="col-lg-6 col-md-9">
                                                <div className="tab-content">
                                                      <div className="tab-pane active" id="tabs-1" role="tabpanel">
                                                            <div className="product__details__pic__item">
                                                                  {mainImage.includes('uploads') ?
                                                                        <img src={`http://${mainImage}`} alt='' />
                                                                        :
                                                                        <img src={mainImage} alt='' />
                                                                  }
                                                                  {/* <img src={mainImage} alt="" /> */}
                                                            </div>
                                                      </div>

                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div >
                        <div className="product__details__content">
                              <div className="container">
                                    <div className="row d-flex justify-content-center">
                                          <div className="col-lg-8">
                                                <div className="product__details__text">


                                                      <h3> Giá: {data.price} VND</h3>
                                                      <div className="product__details__last__option p-3">
                                                            <h5><span>Chi tiết</span></h5>
                                                            <h6>{data.description}</h6>
                                                            <h6><span>Đã bán: </span> {data.sold}</h6>
                                                            <h6><span>Còn: </span> {data.quantity}</h6>
                                                            <h6><span>Categories:</span> {data.category?.name}</h6>
                                                      </div>
                                                      <div className="product__details__option">
                                                            <div className="product__details__option__size">
                                                                  <span>Size:</span>
                                                                  {
                                                                        data.productSizes?.map((sizeItem, index) => {
                                                                              return (
                                                                                    <label key={index} htmlFor={sizeItem.size}
                                                                                          className={size === sizeItem.size ? 'active' : ''}>
                                                                                          <input type="radio" id={sizeItem.size} value={sizeItem.size}
                                                                                                onClick={(e) => handleSize(e.target.value)}
                                                                                          />{sizeItem.size}
                                                                                    </label>
                                                                              )
                                                                        })}

                                                            </div>
                                                      </div>

                                                      <div className="quantity_number">
                                                            <div className='qn_item'>Số lượng</div>
                                                            <FontAwesomeIcon icon={faArrowLeft} className='qn_item arrow' onClick={() => handleQuantity(quantity - 1)} />
                                                            <div className='qn_item' id="quantity" >{quantity}</div>
                                                            <FontAwesomeIcon icon={faArrowRight} className='qn_item arrow' onClick={() => handleQuantity(quantity + 1)} />
                                                      </div>
                                                      {success ?
                                                            <div className='success'>Thêm vào giỏ hàng hành công</div>
                                                            :
                                                            <></>
                                                      }

                                                      {LoginedUser?.roles.some(checkUser) ?
                                                            <div><p className="primary-btn add_cart" onClick={handleAddCart}>Thêm vào giỏ hàng</p></div>
                                                            :
                                                            <div><NavLink to="/login" style={{ textDecoration: 'none' }} className="primary-btn add_cart">Bạn phải đăng nhập để đặt hàng</NavLink></div>
                                                      }
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section >
                  <Footer />
            </div >
      )
}

export default ProductDetail
