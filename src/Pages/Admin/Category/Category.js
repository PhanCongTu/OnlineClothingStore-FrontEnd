import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../Components/AdminHeader/AdminHeader'
import '../../../css/bootstrap.min.css'
import '../../../css/magnific-popup.css'
import '../../../css/nice-select.css'
import '../../../css/slicknav.min.css'
import '../../../css/style.css'
import '../../../css/style.css.map'
import '../../../css/slicknav.min.css'
import './Category.css'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Category() {
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      const [data, setData] = useState([])
      const [searchText, setSearchText] = useState('')
      const [pageNumber, setPageNumber] = useState(0)
      const [totalPages, setTotalPages] = useState(0)
      const [totalElements, setTotalElements] = useState(0)
      const [sortType, setSortType] = useState(0)
      const [name, setName] = useState('')
      const [rerender, serRerender] = useState(true)

      const handleSearchText = (e) => {
            setSearchText(e.target.value)
      }
      const handleSortType = () => {
            if (sortType === 0)
                  setSortType(1)
            else
                  setSortType(0)
      }
      const handlePage = (number) => {
            console.log(number)
            setPageNumber(number)
      }
      const handleName = (e) => {
            setName(e.target.value)
      }

      useEffect(() => {
            let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/category?searchText=${searchText}&page=${pageNumber}&sortType=${sortType}`,
                  headers: {}
            };

            axios.request(config)
                  .then((response) => {
                        // console.log(JSON.stringify(response.data));
                        setData(response.data.content);
                        setPageNumber(response.data.number)
                        setTotalPages(response.data.totalPages)
                        setTotalElements(response.data.totalElements)
                  })
                  .catch((error) => {
                        alert(error.message);
                  });
      }, [searchText, sortType, pageNumber, rerender])
      const AddNewCategory = () => {
            let data = JSON.stringify({
                  "name": `${name}`
            });

            let config = {
                  method: 'post',
                  maxBodyLength: Infinity,
                  url: 'http://localhost:8282/api/category/add',
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${LoginedUser.token}`
                  },
                  data: data
            };

            axios.request(config)
                  .then((response) => {
                        // alert('Thanh cong')
                        setName('')
                        serRerender((prev) => !prev)
                  })
                  .catch((error) => {
                        alert(error.message)
                  });
      }
      const ChangeStatus = (catId) => {

            let config = {
                  method: 'put',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/category/change-status/${catId}`,
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };

            axios.request(config)
                  .then((response) => {
                        // console.log(JSON.stringify(response.data));
                        serRerender((prev) => !prev)
                  })
                  .catch((error) => {
                        alert(error.message)
                  });
      }
      return (
            <div>
                  <AdminHeader />
                  <div className="container">
                        <div className="input-group justify-content-start p-3">
                              <div className='new_cat_label' >Thêm danh mục mới</div>
                              <div className="form-outline">
                                    <input onChange={(e) => handleName(e)} type="search" id="form1"
                                          value={name}
                                          className="form-control" placeholder='Tên danh mục' />
                              </div>
                              <div onClick={() => AddNewCategory()} className="btn btn-success">
                                    Thêm
                              </div>
                        </div>
                        <div className="input-group justify-content-end p-3">
                              <div className="form-outline">
                                    <input onChange={(e) => handleSearchText(e)} type="search"
                                          value={searchText}
                                          id="form1" className="form-control" placeholder='Tên danh mục' />
                              </div>
                              <button type="button" className="btn btn-primary">
                                    search
                              </button>
                        </div>
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
                                                      <option value="0" >Hoạt động</option>
                                                      <option value="1" >Không khả dụng</option>
                                                </select>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <table className="table table-hover">
                              <thead>
                                    <tr className="d-flex ">
                                          <th className="col-1 d-flex justify-content-center ">Số thứ tự</th>
                                          <th className="col-6 d-flex justify-content-center">Tên</th>
                                          <th className="col-3 d-flex justify-content-center ">Trạng thái</th>
                                          <th className="col-2 d-flex justify-content-center ">Hành động</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {data?.map((category, index) => {
                                          return (
                                                <tr key={index} className="d-flex ">
                                                      <td className="col-1 d-flex justify-content-center ">{index + 1}</td>
                                                      <td className="col-6 d-flex justify-content-center">{category.name}</td>
                                                      {
                                                            category.isDeleted === false ?
                                                                  <td className="col-3 d-flex justify-content-center text-success">Hoạt động</td>
                                                                  :
                                                                  <td className="col-3 d-flex justify-content-center text-danger">Không khả dụng</td>


                                                      }
                                                      <td className="col-2 d-flex justify-content-center change-status "
                                                            onClick={() => ChangeStatus(category.id)}
                                                      >Đổi trạng thái</td>
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

export default Category
