import React from 'react'
import '../../css/bootstrap.min.css'
import '../../css/magnific-popup.css'
import '../../css/nice-select.css'
import '../../css/slicknav.min.css'
import '../../css/style.css'
import '../../css/style.css.map'
import '../../css/slicknav.min.css'
import './ProductDetail.css'
import { NavLink, useLocation } from 'react-router-dom'
import Header from '../../Components/Header/Header'

function ProductDetail() {
      // let location = useLocation();
      // const { productId } = location.state
      return (
            <div>
                  <Header />
                  <section class="shop-details">
                        <div class="product__details__pic">
                              <div class="container">
                                    <div class="row">
                                          <div class="col-lg-12">
                                                <div class="product__details__breadcrumb">
                                                      <a href="./index.html">Home</a>
                                                      <a href="./shop.html">Shop</a>
                                                      <span>Product Details</span>
                                                </div>
                                          </div>
                                    </div>
                                    <div class="row">
                                          <div class="col-lg-3 col-md-3">
                                                <ul class="nav nav-tabs" role="tablist">
                                                      <li class="nav-item">
                                                            <a class="nav-link active" data-toggle="tab" href="#tabs-1" role="tab">
                                                                  <div class="product__thumb__pic set-bg" style={{
                                                                        backgroundSize: 'contain',
                                                                        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png)`,
                                                                  }}>
                                                                  </div>
                                                            </a>
                                                      </li>
                                                      <li class="nav-item">
                                                            <a class="nav-link" data-toggle="tab" href="#tabs-2" role="tab">
                                                                  <div class="product__thumb__pic set-bg" style={{
                                                                        backgroundSize: 'contain',
                                                                        backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhe9_SmsEdtmiXEfb5AnKRvAS08_m2X8TbOGavWOXcUg&s)`,
                                                                  }}>
                                                                  </div>
                                                            </a>
                                                      </li>
                                                      <li class="nav-item">
                                                            <a class="nav-link" data-toggle="tab" href="#tabs-3" role="tab">
                                                                  <div class="product__thumb__pic set-bg" style={{
                                                                        backgroundSize: 'contain',
                                                                        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png)`,
                                                                  }}>
                                                                  </div>
                                                            </a>
                                                      </li>
                                                      <li class="nav-item">
                                                            <a class="nav-link" data-toggle="tab" href="#tabs-4" role="tab">
                                                                  <div class="product__thumb__pic set-bg" style={{
                                                                        backgroundSize: 'contain',
                                                                        backgroundImage: `url(https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png)`,
                                                                  }}>
                                                                  </div>
                                                            </a>
                                                      </li>
                                                </ul>
                                          </div>
                                          <div class="col-lg-6 col-md-9">
                                                <div class="tab-content">
                                                      <div class="tab-pane active" id="tabs-1" role="tabpanel">
                                                            <div class="product__details__pic__item">
                                                                  <img src="https://upload.wikimedia.org/wikipedia/en/b/bd/Doraemon_character.png" alt="" />
                                                            </div>
                                                      </div>

                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <div class="product__details__content">
                              <div class="container">
                                    <div class="row d-flex justify-content-center">
                                          <div class="col-lg-8">
                                                <div class="product__details__text">
                                                      <h4>Doraemon</h4>

                                                      <h3>27000 VND</h3>
                                                      <p>Coat with quilted lining and an adjustable hood. Featuring long sleeves with adjustable
                                                            cuff tabs, adjustable asymmetric hem with elastic side tabs and a front zip fastening
                                                            with placket.</p>
                                                      <div class="product__details__option">
                                                            <div class="product__details__option__size">
                                                                  <span>Size:</span>
                                                                  <label for="xxl">xxl
                                                                        <input type="radio" id="xxl" />
                                                                  </label>
                                                                  <label class="active" for="xl">xl
                                                                        <input type="radio" id="xl" />
                                                                  </label>
                                                                  <label for="l">l
                                                                        <input type="radio" id="l" />
                                                                  </label>
                                                                  <label for="sm">s
                                                                        <input type="radio" id="sm" />
                                                                  </label>
                                                            </div>
                                                      </div>
                                                      <div class="product__details__cart__option">
                                                            <div class="quantity">
                                                                  <div class="pro-qty">
                                                                        <input type="text" value="1" />
                                                                  </div>
                                                            </div>
                                                            <NavLink class="primary-btn">add to cart</NavLink>
                                                      </div>
                                                      <div class="product__details__last__option">
                                                            <h5><span>Guaranteed Safe Checkout</span></h5>
                                                            <ul>
                                                                  <li><span>Đã bán: </span> 3812912</li>
                                                                  <li><span>Còn: </span> 3812912</li>
                                                                  <li><span>Categories:</span> Clothes</li>
                                                            </ul>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>
            </div>
      )
}

export default ProductDetail
