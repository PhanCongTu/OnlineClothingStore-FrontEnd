import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../Components/AdminHeader/AdminHeader'
import '../../../css/bootstrap.min.css'
import '../../../css/magnific-popup.css'
import '../../../css/nice-select.css'
import '../../../css/slicknav.min.css'
import '../../../css/style.css'
import '../../../css/style.css.map'
import '../../../css/slicknav.min.css'
import './Order.css'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
function Order() {
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      const navigate = useNavigate();
      const [data, setData] = useState([])
      const [searchText, setSearchText] = useState('')
      const [pageNumber, setPageNumber] = useState(0)
      const [totalPages, setTotalPages] = useState(0)
      const [totalElements, setTotalElements] = useState(0)
      const [status, setstatus] = useState(4)
      const [rerender, setRerender] = useState(true)
      const [sortType, setSortType] = useState(0)
      // Dành cho popup
      const callbackFunction = () => {
            setRerender((prev) => !prev)
      }
      ///
      const handleStatus = (num) => {
            if (num == 0)
                  setstatus(0)
            else if (num == 1)
                  setstatus(1)
            else if (num == 2)
                  setstatus(2)
            else if (num == 3)
                  setstatus(3)
            else
                  setstatus(4)
      }
      const handleSortType = () => {
            if (sortType === 0)
                  setSortType(1)
            else
                  setSortType(0)
      }
      const handleSearchText = (e) => {
            setSearchText(e.target.value)
      }
      const handlePage = (number) => {
            // console.log(number)
            setPageNumber(number)
      }
      useEffect(() => {
            let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/order?Istatus=${status}&searchText=${searchText}&page=${pageNumber}&sortType=${sortType}`,
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };

            axios.request(config)
                  .then((response) => {
                        setData(response.data.content)
                        setPageNumber(response.data.number)
                        setTotalPages(response.data.totalPages)
                        setTotalElements(response.data.totalElements)
                  })
                  .catch((error) => {
                        navigate('/login')
                  });

      }, [rerender, status, sortType, searchText])
      return (
            <div>
                  <AdminHeader />
                  <div className="order-container">
                        <div className="input-group justify-content-end p-3">
                              <div className="form-outline">
                                    <input onChange={(e) => handleSearchText(e)} type="search"
                                          value={searchText}
                                          style={{ width: '300px' }}
                                          id="form1" className="form-control" placeholder='Số điện thoại, địa chỉ' />
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
                                                <p>Trạng thái:</p>
                                                <select className='select-sort' onChange={(e) => handleStatus(e.target.value)} >
                                                      <option value="4" >Tất cả</option>
                                                      <option value="0" >Chờ xác nhận</option>
                                                      <option value="1" >Đã chuyển hàng</option>
                                                      <option value="2" >Đã nhận</option>
                                                      <option value="3" >Đã Hủy</option>
                                                </select>
                                          </div>
                                    </div>
                                    <div className="col-lg-4 col-md-6 col-sm-6">
                                          <div className="shop__product__option__right">
                                                <p>Thời gian: </p>
                                                <select className='select-sort' onChange={(e) => handleSortType(e.target.value)} >
                                                      <option value="0" >Xa đến gần</option>
                                                      <option value="1" >Gần đến xa</option>
                                                </select>
                                          </div>
                                    </div>
                              </div>
                        </div>
                        <table className="table table-hover">
                              <thead>
                                    <tr className="d-flex ">
                                          <th className="col-2 d-flex justify-content-center align-items-center  ">Tên khách hàng</th>
                                          <th className="col-1 d-flex justify-content-center align-items-center ">SĐT</th>
                                          <th className="col-2 d-flex justify-content-center align-items-center  ">Địa chỉ</th>
                                          <th className="col-1 d-flex justify-content-center align-items-center  ">Ghi chú</th>
                                          <th className="col-2 d-flex justify-content-center align-items-center  ">Tổng số tiền</th>
                                          <th className="col-1 d-flex justify-content-center align-items-center  ">Ngày đặt</th>
                                          <th className="col-2 d-flex justify-content-center align-items-center  ">Trạng thái</th>
                                          <th className="col-1 d-flex justify-content-center align-items-center  ">Hành động</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {data.length > 0 ?
                                          data.map((order, index) => {
                                                var myDate = new Date(order.createAt);
                                                var final_time = myDate.getHours() + ":" + myDate.getMinutes();
                                                var final_date = myDate.getDate() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getFullYear();
                                                return (

                                                      <tr key={index} className="d-flex ">

                                                            <td className="col-2 d-flex justify-content-center align-items-center  ">{order.user?.name}</td>
                                                            <td className="col-1 d-flex justify-content-center align-items-center  ">{order.phoneNumber}</td>
                                                            <td className="col-2 d-flex justify-content-center align-items-center  ">{order.address}</td>
                                                            <td className="col-1 d-flex justify-content-center align-items-center  ">{order.note}</td>
                                                            <td className="col-2 d-flex justify-content-center align-items-center  ">{order.total} VNĐ</td>
                                                            <td className="col-1 d-flex justify-content-center align-items-center  ">{final_time} <br /> {final_date}</td>
                                                            <td className="col-2 d-flex justify-content-center align-items-center  ">{order.status}</td>
                                                            <td className="col-1 d-flex justify-content-center align-items-center   " >
                                                                  <ChangeStatusPopup userName={order.user?.name}
                                                                        orderId={order.id} status={order.status}
                                                                        parentCallback={callbackFunction}
                                                                  />
                                                                  <OrderDetailPopup orderId={order.id} />
                                                            </td>
                                                      </tr>

                                                )
                                          })
                                          : <></>}



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


const ChangeStatusPopup = ({ userName, orderId, status, parentCallback }) => {

      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      const [show, setShow] = useState(false);
      const [newstatus, setsNewtatus] = useState(0)
      const handleClose = () => {
            setShow(false)
      };
      const handleSave = () => {
            setShow(false)
            let config = {
                  method: 'put',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/order/update?orderId=${orderId}&Istatus=${newstatus}`,
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };

            axios.request(config)
                  .then((response) => {
                        parentCallback()
                        setsNewtatus(0)
                  })
                  .catch((error) => {
                        alert(error.message);
                  });
            setShow(false)
      };
      const handleShow = () => setShow(true);
      const handleNewStatus = (num) => {
            if (num == 0)
                  setsNewtatus(0)
            else if (num == 1)
                  setsNewtatus(1)
            else if (num == 2)
                  setsNewtatus(2)
            else if (num == 3)
                  setsNewtatus(3)
      }
      return (
            <div>
                  <Button variant="success" onClick={handleShow}>
                        Đổi
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                              <Modal.Title>Cập nhật trạng thái </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                              <h6>Tên khách hàng: {userName}</h6>
                              <h6>Mã đơn hàng: {orderId}</h6>
                              <h6>Trạng thái hiện tại: {status}</h6>
                              <div className=" d-flex justify-content-center align-items-center p-3">
                                    <div className="shop__product__option__right">
                                          <p style={{ fontSize: '18px' }} className='p-2'>Trạng thái mới: </p>
                                          <select style={{ fontSize: '18px' }} className='select-sort' onChange={(e) => handleNewStatus(e.target.value)}>
                                                <option value="0" >Chờ xác nhận</option>
                                                <option value="1" >Đã chuyển hàng</option>
                                                <option value="2" >Đã nhận</option>
                                                <option value="3" >Đã Hủy</option>
                                          </select>
                                    </div>
                              </div>

                        </Modal.Body>

                        <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                    Đóng
                              </Button>

                              <Button variant="primary" onClick={handleSave}>
                                    Lưu thay đổi
                              </Button>
                        </Modal.Footer>
                  </Modal>
            </div>
      )
}

const OrderDetailPopup = ({ orderId }) => {
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      const [show, setShow] = useState(false);
      const [order, setOrder] = useState();
      const loadOrderInf = (orderId) => {
            let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/order/${orderId}`,
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };

            axios.request(config)
                  .then((response) => {
                        setOrder(response.data)
                  })
                  .catch((error) => {
                        console.log(error);
                  });
      }
      var myDate = new Date(order?.createAt);
      var final_date = myDate.getHours() + ":" + myDate.getMinutes() + " " + myDate.getDate() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getFullYear();
      return (
            <>
                  <Button variant=" btn-info ml-1" onClick={() => (
                        setShow(true),
                        loadOrderInf(orderId)
                  )}>
                        xem
                  </Button>

                  <Modal
                        show={show}
                        onHide={() => setShow(false)}
                        // dialogClassName="modal-150w"
                        size='xl'
                        aria-labelledby="example-custom-modal-styling-title"
                  >
                        <Modal.Header closeButton>
                              <Modal.Title id="example-custom-modal-styling-title">
                                    Chi tiết đơn hàng
                              </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                              <div className="row ">
                                    <div>
                                          <div className='order-item-header'>
                                                <div>
                                                      <h5 ><span className='order-item-header-text'>Địa chỉ:</span> {order?.address}</h5>
                                                      <h5 ><span className='order-item-header-text'>Ghi chú:</span> {order?.note} </h5>
                                                      <h5 ><span className='order-item-header-text'>Số điện thoại:</span> {order?.phoneNumber}</h5>
                                                </div>
                                                <div>
                                                      <h5 ><span className='order-item-header-text'>Tổng tiền:</span> {order?.total} VNĐ</h5>
                                                      <h5 ><span className='order-item-header-text'>Trạng thái:</span> {order?.status}</h5>
                                                      <h5 ><span className='order-item-header-text'>Ngày đặt hàng:</span> {final_date}</h5>
                                                </div>
                                          </div>
                                    </div>
                                    <div className="shopping__cart__table order" >
                                          <table className='table'>
                                                <thead className='thead'>
                                                      <tr>
                                                            <th>Sản phẩm</th>
                                                            <th>Số lượng</th>
                                                            <th>Kích thước</th>
                                                            <th>Tổng tiền</th>
                                                      </tr>
                                                </thead>
                                                <tbody>
                                                      {order?.orderItems?.map((item, index) => {
                                                            return (
                                                                  <tr key={index} className='tr-text'>
                                                                        <td className="product__cart__item">
                                                                              <div className="product__cart__item__pic">
                                                                                    {item.product?.productImages[0].image.includes('uploads') ?
                                                                                          <img className='product_img' src={`http://${item.product?.productImages[0].image}`} alt='' />
                                                                                          :
                                                                                          <img className='product_img' src={`${item.product?.productImages[0].image}`} alt='' />
                                                                                    }
                                                                                    {/* <img className='product_img' src={item.product?.productImages[0].image} alt="" /> */}
                                                                              </div>
                                                                              <div className="product__cart__item__text">
                                                                                    <h6>{item.product.productName}</h6>
                                                                                    <h5>{item.product.price} VNĐ</h5>
                                                                              </div>
                                                                        </td>
                                                                        <td className="td-text">
                                                                              {item.quantity}
                                                                        </td>
                                                                        <td className="td-text">
                                                                              {item.size}
                                                                        </td>
                                                                        <td className="td-text">
                                                                              {item.quantity * item.product.price} VNĐ
                                                                        </td>
                                                                  </tr>
                                                            )
                                                      })}

                                                </tbody>
                                          </table>
                                    </div>
                              </div>

                        </Modal.Body>
                  </Modal>
            </>
      );
}
export default Order
