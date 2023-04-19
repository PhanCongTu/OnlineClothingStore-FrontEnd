import React, { useEffect, useRef, useState } from 'react'
import '../../css/bootstrap.min.css'
import '../../css/magnific-popup.css'
import '../../css/nice-select.css'
import '../../css/slicknav.min.css'
import '../../css/style.css'
import '../../css/style.css.map'
import '../../css/slicknav.min.css'
import './Shop.css'
import Header from '../../Components/Header/Header'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faListUl, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
function Shop() {
      const [data, setData] = useState([])
      const [categoryId, setCategoryId] = useState(0);
      const [listCart, setListCart] = useState([]);

      const handleCategory = () => {

      }

      useEffect(() => {
            let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: 'http://localhost:8282/api/category',
                  headers: {}
            };

            axios.request(config)
                  .then((response) => {
                        console.log(response.data.content);
                        setListCart(response.data.content);
                  })
                  .catch((error) => {
                        console.log(error);
                  });
      }, [categoryId])

      return (
            <div>
                  <Header />
                  <section >
                        <div className="container">
                              <div className="row">
                                    <div className="col-lg-3">
                                          <div className="shop__sidebar">
                                                <div className="shop__sidebar__search" >
                                                      <form action="/">
                                                            <input type="text" placeholder="Tìm kiếm..." />
                                                            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                                      </form>
                                                </div>
                                                <div className="shop__sidebar__accordion">
                                                      <div className="accordion" id="accordionExample">
                                                            <div className="card">
                                                                  <h3><FontAwesomeIcon icon={faListUl} />  Categories</h3>
                                                                  <div id="collapseOne" className="collapse show" data-parent="/accordionExample">
                                                                        <div className="card-body">
                                                                              <div className="shop__sidebar__categories">
                                                                                    <ul className="nice-scroll">
                                                                                          {listCart.map((cart, index) => {
                                                                                                return <li className='cat-item' key={index} ><p className='cat-item'><FontAwesomeIcon icon={faCircle} style={{ color: "#000000", }} />   {cart.name}</p></li>
                                                                                          })}
                                                                                          <li ><p className='cat-item'> <FontAwesomeIcon icon={faCircle} style={{ color: "#000000", }} /> Tất cả sản phẩm</p></li>
                                                                                    </ul>
                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="col-lg-9">
                                          <div className="shop__product__option">
                                                <div className="row">
                                                      <div className="col-lg-6 col-md-6 col-sm-6">
                                                            <div className="shop__product__option__left">
                                                                  <p>Tìm thấy 100 kết quả</p>
                                                            </div>
                                                      </div>
                                                      <div className="col-lg-6 col-md-6 col-sm-6">
                                                            <div className="shop__product__option__right">
                                                                  <p>Sắp xếp theo:</p>
                                                                  <select className='select-sort'>
                                                                        <option value="">Tăng dần</option>
                                                                        <option value="">Giảm dần</option>
                                                                  </select>
                                                            </div>
                                                      </div>
                                                </div>
                                          </div>
                                          <div className="row">
                                                {data.length === 0 ?
                                                      <h2>Không tìm thấy sản phẩm!</h2>
                                                      :
                                                      data.map((item, key) => {
                                                            return (
                                                                  <div key={key} classNameName="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix">
                                                                        <div classNameName="product__item">
                                                                              <div classNameName="product__item__pic set-bg" style={{
                                                                                    backgroundSize: 'contain',
                                                                                    backgroundImage: `url(${item && item.productImages[0] && item.productImages[0].image ? item.productImages[0].image : ''})`,
                                                                              }} >
                                                                                    {/* <ul classNameName="product__hover">
                                                                              <li><FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000", }} /></li>
                                                                        </ul> */}
                                                                              </div>
                                                                              <div classNameName="product__item__text">
                                                                                    <h5 style={{ padding: '20px' }}>{item.productName}</h5>
                                                                                    <NavLink classNameName='see-detail' to="/" >Xem chi tiết</NavLink>
                                                                                    {/* <div classNameName="rating">
                                                                              <h6>5   <FontAwesomeIcon icon={faStar} style={{ color: "#f5e000", }} /></h6>
                                                                        </div> */}
                                                                                    <div classNameName='product_detail' >
                                                                                          <h5 classNameName='product_price' >{item.price} VND </h5>
                                                                                          <h5 classNameName='product_sold' >{item.sold} đã bán</h5>
                                                                                    </div>

                                                                              </div>
                                                                        </div>
                                                                  </div>
                                                            )
                                                      })

                                                }
                                          </div>
                                          <div className="row">
                                                <div className="col-lg-12">
                                                      <div className="product__pagination">
                                                            <p className='page-number'>1</p>
                                                            <p className='page-number active'>2</p>
                                                      </div>
                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section >
            </div >
      )
}

export default Shop
