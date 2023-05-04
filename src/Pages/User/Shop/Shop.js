import React, { useEffect, useState } from 'react'
import '../../../css/bootstrap.min.css'
import '../../../css/magnific-popup.css'
import '../../../css/nice-select.css'
import '../../../css/slicknav.min.css'
import '../../../css/style.css'
import '../../../css/style.css.map'
import '../../../css/slicknav.min.css'
import './Shop.css'
import Header from '../../../Components/Header/Header'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faCircle, faListUl, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
function Shop() {
      const [data, setData] = useState([])
      const [categoryId, setCategoryId] = useState(0);
      const [listCat, setListCat] = useState([]);
      const [searchText, setSearchText] = useState('')
      const [pageNumber, setPageNumber] = useState(0)
      const [totalPages, setTotalPages] = useState(0)
      const [totalElements, setTotalElements] = useState(0)
      const [sortType, setSortType] = useState(0)
      const handleSortType = (num) => {
            console.log(num)
            setSortType(num)

      }
      const handleCategory = (id) => {
            setCategoryId(id)
            console.log(id)
      }
      const handleSearch = (text) => {
            console.log(text)
            setSearchText(text)
      }
      const handlePage = (number) => {
            console.log(number)
            setPageNumber(number)
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
                        // console.log(response.data.content);
                        setListCat(response.data.content);
                  })
                  .catch((error) => {
                        // 
                        alert(error.message);
                  });
      }, [])
      useEffect(() => {
            let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/product?searchText=${searchText}&categoryId=${categoryId}&page=${pageNumber}&sortType=${sortType}`,
                  headers: {}
            };

            axios.request(config)
                  .then((response) => {
                        console.log(response.data);
                        setData(response.data.content)
                        setPageNumber(response.data.number)
                        setTotalPages(response.data.totalPages)
                        setTotalElements(response.data.totalElements)
                  })
                  .catch((error) => {
                        alert(error.message);
                  });

      }, [searchText, categoryId, pageNumber, sortType])
      return (
            <div>
                  <Header />
                  <section >
                        <div className="container">
                              <div className="row">
                                    <div className="col-lg-3">
                                          <div className="shop__sidebar">
                                                <div className="shop__sidebar__search" >
                                                      <form >
                                                            <input type="text" value={searchText} placeholder="Tìm kiếm..." onChange={(e) => handleSearch(e.target.value)} />
                                                            <button type="submit"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                                                      </form>
                                                </div>
                                                <div className="shop__sidebar__accordion">
                                                      <div className="accordion" id="accordionExample">
                                                            <div className="card">
                                                                  <h3><FontAwesomeIcon icon={faListUl} />  Các danh mục</h3>
                                                                  <div id="collapseOne" className="collapse show" data-parent="/accordionExample">
                                                                        <div className="card-body">
                                                                              <div className="shop__sidebar__categories">
                                                                                    <ul className="nice-scroll">
                                                                                          <li ><p className='cat-item' style={{ color: categoryId == 0 ? 'red' : '' }} onClick={() => handleCategory(0)}> <FontAwesomeIcon icon={faCircle} style={{ color: "#000000", paddingRight: '5px' }} />Tất cả sản phẩm</p></li>
                                                                                          {listCat.map((cart, index) => {
                                                                                                return (
                                                                                                      <li key={index} >

                                                                                                            <p className='cat-item' style={{ color: cart.id == categoryId ? 'red' : '' }} onClick={() => handleCategory(`${cart.id}`)} >
                                                                                                                  <FontAwesomeIcon icon={faCircle} style={{ color: "#000000", paddingRight: '5px' }} />
                                                                                                                  {cart.name}
                                                                                                            </p>
                                                                                                      </li>
                                                                                                )
                                                                                          })}
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
                                                                  <p>Tìm thấy {totalElements} kết quả ({totalPages} trang)</p>
                                                            </div>
                                                      </div>
                                                      <div className="col-lg-6 col-md-6 col-sm-6">
                                                            <div className="shop__product__option__right">
                                                                  <p>Sắp xếp theo:</p>
                                                                  <select className='select-sort' onChange={(e) => handleSortType(e.target.value)} >
                                                                        <option value="0" >Tăng dần</option>
                                                                        <option value="1" >Giảm dần</option>
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
                                                                  <div key={key} className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix">
                                                                        <div className="product__item">
                                                                              <div className="product__item__pic set-bg" style={{
                                                                                    backgroundSize: 'contain',
                                                                                    backgroundImage: `url(${item && item.productImages[0] && item.productImages[0].image ? item.productImages[0].image : ''})`,
                                                                              }}>
                                                                              </div>
                                                                              <div className="product__item__text">
                                                                                    <h5 style={{ padding: '20px' }}>{item.productName}</h5>
                                                                                    <NavLink className='see-detail' to="/product-detail" state={{ productId: item.id }} >Xem chi tiết</NavLink>
                                                                                    <div className='product_detail' >
                                                                                          <h5 className='product_price' >{item.price} VND </h5>
                                                                                          <h5 className='product_sold' >{item.sold} đã bán</h5>
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
                                                      {totalPages > 0 ? <div className="product__pagination">
                                                            {pageNumber != 0 ? <p className='navigate-page' onClick={() => handlePage(0)}><FontAwesomeIcon icon={faArrowLeft} /> Trang đầu</p> : <></>}
                                                            {pageNumber > 1 ? <p className='page-number' onClick={() => handlePage(pageNumber - 2)} >{pageNumber - 1}</p> : <></>}
                                                            {pageNumber > 0 ? <p className='page-number' onClick={() => handlePage(pageNumber - 1)}>{pageNumber}</p> : <></>}
                                                            <p className='page-number active'>{pageNumber + 1}</p>
                                                            {pageNumber + 1 < totalPages ? <p className='page-number' onClick={() => handlePage(pageNumber + 1)}>{pageNumber + 2}</p> : <></>}
                                                            {pageNumber + 2 < totalPages ? <p className='page-number' onClick={() => handlePage(pageNumber + 2)}>{pageNumber + 3}</p> : <></>}
                                                            {pageNumber != totalPages - 1 ? <p className='navigate-page' onClick={() => handlePage(totalPages - 1)} >Trang cuối <FontAwesomeIcon icon={faArrowRight} /></p> : <></>}
                                                      </div> : <></>}

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
