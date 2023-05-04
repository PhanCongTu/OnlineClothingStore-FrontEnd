import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../Components/AdminHeader/AdminHeader'
import '../../../css/bootstrap.min.css'
import '../../../css/magnific-popup.css'
import '../../../css/nice-select.css'
import '../../../css/slicknav.min.css'
import '../../../css/style.css'
import '../../../css/style.css.map'
import '../../../css/slicknav.min.css'
import './Product.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
function Product() {
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      // Dùng để xem sản phẩm
      const [data, setData] = useState([])
      const [categoryId, setCategoryId] = useState(0);
      const [listCat, setListCat] = useState([]);
      const [searchText, setSearchText] = useState('')
      const [pageNumber, setPageNumber] = useState(0)
      const [totalPages, setTotalPages] = useState(0)
      const [totalElements, setTotalElements] = useState(0)
      const [sortType, setSortType] = useState(0)
      const [reRender, setReRender] = useState(true)
      const [message, setMessage] = useState({
            message: '',
            success: true
      })
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
      // Dùng để tạo sản phẩm
      const [cPName, setCPName] = useState('')
      const [cPQuantity, setCPQuantity] = useState()
      const [cPDescription, setCPDescription] = useState('')
      const [cPPrice, setCPPrice] = useState()
      const [cPCategoryId, setCPCategoryId] = useState()
      const handleCPName = (e) => {
            setCPName(e.target.value)
      }
      const handleCPQuantity = (e) => {
            setCPQuantity(e.target.value)
      }
      const handleCPDescription = (e) => {
            setCPDescription(e.target.value)
      }
      const handleCPPrice = (e) => {
            setCPPrice(e.target.value)
      }
      const handleCPCategory = (e) => {
            setCPCategoryId(e.target.value)
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
                        setCPCategoryId(response.data?.content[0]?.id)
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
                        // console.log(response.data);
                        setData(response.data.content)
                        setPageNumber(response.data.number)
                        setTotalPages(response.data.totalPages)
                        setTotalElements(response.data.totalElements)
                  })
                  .catch((error) => {
                        alert(error.message);
                  });

      }, [searchText, categoryId, pageNumber, sortType, reRender])
      const AddNewProduct = () => {
            if (cPName === '' || cPQuantity === '' || cPPrice === '' || cPQuantity == null || cPPrice == null) {
                  setMessage({
                        message: 'Không được bỏ trống tên, số lượng và giá',
                        success: false
                  })
                  setTimeout(() => {
                        setMessage({
                              message: '',
                              success: false
                        })
                  }, 2000)
            }
            else if (cPQuantity < 0 || cPPrice < 0) {
                  setMessage(
                        {
                              message: 'Số lượng và giá không hợp lệ',
                              success: false
                        }
                  )
                  setTimeout(() => {
                        setMessage({
                              message: '',
                              success: false
                        })
                  }, 3000)
            }

            else {
                  let data = JSON.stringify({
                        "productName": `${cPName}`,
                        "quantity": cPQuantity,
                        "description": `${cPDescription}`,
                        "price": cPPrice,
                        "category": {
                              "id": cPCategoryId
                        }
                  });

                  let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: 'http://localhost:8282/api/product/add',
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${LoginedUser.token}`
                        },
                        data: data
                  };

                  axios.request(config)
                        .then((response) => {
                              setReRender((Prev) => !Prev)
                              setCPName('')
                              setCPPrice('')
                              setCPQuantity('')
                              setCPDescription('')
                              setMessage(
                                    {
                                          message: 'Thêm thành công',
                                          success: true
                                    })
                              setTimeout(() => {
                                    setMessage({
                                          message: '',
                                          success: false
                                    })
                              }, 2000)
                        })
                        .catch((error) => {
                              console.log(error);
                        });
            }

      }
      const DeleteProduct = (productId) => {
            let config = {
                  method: 'delete',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/product/change-status/${productId}`,
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };

            axios.request(config)
                  .then((response) => {
                        // console.log(JSON.stringify(response.data));
                        setReRender((prev) => !prev)
                  })
                  .catch((error) => {
                        alert(error.message);
                  });
      }
      return (
            <div>
                  <AdminHeader />
                  <div className="container">
                        <div className='new_cat_label' >Thêm sản phẩm mới</div>
                        <div className="input-group justify-content-start p-3">
                              <div className='new_product_label' >Tên * </div>

                              <div className="form-outline">
                                    <input type="search" id="form1"
                                          value={cPName}
                                          onChange={(e) => handleCPName(e)}
                                          autocomplete="off"
                                          className="form-control" placeholder='Tên sản phẩm' />

                              </div>
                              <div className='new_product_label' >Số lượng * </div>

                              <div className="form-outline">
                                    <input type="search" id="form1"
                                          value={cPQuantity}
                                          onChange={(e) => handleCPQuantity(e)}
                                          autocomplete="off"
                                          className="form-control" placeholder='Số lượng sản phẩm' />

                              </div>
                              <div className='new_product_label' >Giá * </div>

                              <div className="form-outline">
                                    <input type="search" id="form1"
                                          value={cPPrice}
                                          onChange={(e) => handleCPPrice(e)}
                                          autocomplete="off"
                                          className="form-control" placeholder='Giá sản phẩm' />

                              </div>
                              {/* <div className="btn btn-success">
                                    Thêm
                              </div> */}
                        </div>
                        <div className="input-group justify-content-start p-3">
                              <div className='new_product_label' >Mô tả </div>

                              <div className="form-outline">
                                    <input type="search" id="form1"
                                          value={cPDescription}
                                          onChange={(e) => handleCPDescription(e)}
                                          autocomplete="off"
                                          className="form-control" placeholder='Mô tả sản phẩm' />

                              </div>
                              <div className='new_product_label' >Danh mục * </div>

                              <div className="shop__product__option__right d-flex" style={{ width: '350px' }}>
                                    <select className='select-sort' style={{ width: '300px' }} onChange={(e) => handleCPCategory(e)} >
                                          {listCat.map((cat, index) => {
                                                if (!cat.isDeleted) {
                                                      return (
                                                            <option key={index} value={cat.id} >{cat.name}</option>
                                                      )
                                                }
                                          })}
                                    </select>
                              </div>

                              <div className="btn btn-success" style={{ width: '200px', borderRadius: '5px' }} onClick={AddNewProduct} >
                                    Thêm
                              </div>
                              {message.success ?
                                    <p className='m-2 text-success'>{message.message}</p>
                                    :
                                    <p className='m-2 text-danger'>{message.message}</p>}

                        </div>

                        <div className="input-group justify-content-end p-3">
                              <div className="form-outline">
                                    <input type="search"
                                          value={searchText}
                                          onChange={(e) => handleSearch(e.target.value)}
                                          id="form1" className="form-control" placeholder='Tên sản phẩm' />
                              </div>
                              <button type="button" className="btn btn-primary">
                                    search
                              </button>
                        </div>
                        <div className="shop__product__option">
                              <div className="row">
                                    <div className="col-lg-4 col-md-6 col-sm-6">
                                          <div className="shop__product__option__left">
                                                <p>Tìm thấy {totalElements} kết quả ({totalPages} trang)</p>
                                          </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6">
                                          <div className="shop__product__option__right">
                                                <p>Danh mục: </p>
                                                <select className='select-sort' onChange={(e) => handleCategory(e.target.value)}  >
                                                      <option value={0}  >Tất cả sản phẩm</option>
                                                      {listCat.map((cat, index) => {
                                                            return (
                                                                  <option key={index} value={cat.id} >{cat.name}</option>
                                                            )
                                                      })}

                                                </select>
                                          </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6">
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
                        <table className="table table-hover">
                              <thead>
                                    <tr className="d-flex ">
                                          <th className="col-3 d-flex justify-content-center align-items-center align-items-center">Tên</th>
                                          <th className="col-1 d-flex justify-content-center align-items-center ">Giá</th>
                                          <th className="col-2 d-flex justify-content-center align-items-center ">Mô tả</th>
                                          <th className="col-2 d-flex justify-content-center align-items-center ">Danh mục</th>
                                          <th className="col-1 d-flex justify-content-center align-items-center">Còn lại</th>
                                          <th className="col-1 d-flex justify-content-center align-items-center ">Đã bán</th>
                                          <th className="col-1 d-flex justify-content-center align-items-center ">Ảnh và <br />kích thước </th>
                                          <th className="col-1 d-flex justify-content-center align-items-center ">Xóa</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {data?.map((product, index) => {
                                          return (
                                                <tr key={index} className="d-flex ">
                                                      <td className="col-3 d-flex justify-content-center align-items-center ">{product.productName}</td>
                                                      <td className="col-1 d-flex justify-content-center align-items-center ">{product.price} VNĐ</td>
                                                      <td className="col-2 d-flex justify-content-center align-items-center">{product.description}</td>
                                                      <td className="col-2 d-flex justify-content-center align-items-center">{product?.category.name}</td>
                                                      <td className="col-1 d-flex justify-content-center align-items-center ">{product.quantity}</td>
                                                      <td className="col-1 d-flex justify-content-center align-items-center ">{product.sold}</td>
                                                      <td className="col-1 d-flex justify-content-center align-items-center">
                                                            <div className='btn btn-success'>
                                                                  <NavLink className='' style={{ textDecoration: 'none', color: 'white' }} to="/product-image-size" state={{ productId: product.id }} >Sửa</NavLink>
                                                            </div>
                                                      </td>
                                                      <td className="col-1 d-flex justify-content-center align-items-center" onClick={() => DeleteProduct(product.id)}>
                                                            <div className='btn btn-danger'>Xóa</div>
                                                      </td>
                                                </tr>
                                          )
                                    })}



                              </tbody>
                        </table>
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
      )
}

export default Product
