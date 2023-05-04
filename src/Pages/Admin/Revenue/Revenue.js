import React, { useEffect, useState } from 'react'

import '../../../css/bootstrap.min.css'
import '../../../css/magnific-popup.css'
import '../../../css/nice-select.css'
import '../../../css/slicknav.min.css'
import '../../../css/style.css'
import '../../../css/style.css.map'
import '../../../css/slicknav.min.css'
import './Revenue.css'
import AdminHeader from '../../../Components/AdminHeader/AdminHeader'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { Button, Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function Revenue() {
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      const navigate = useNavigate();
      const [data, setData] = useState([])
      const [pageNumber, setPageNumber] = useState(0)
      const [totalPages, setTotalPages] = useState(0)
      const [totalElements, setTotalElements] = useState(0)
      const [rerender, setRerender] = useState(true)
      var defaultStartDate = new Date();
      defaultStartDate.setDate(defaultStartDate.getDate() - 6)
      var defaultEndDate = new Date();
      defaultEndDate.setDate(defaultEndDate.getDate())
      const [startDate, setStartDate] = useState({
            day: defaultStartDate.getDate(),
            month: defaultStartDate.getMonth() + 1,
            year: defaultStartDate.getFullYear()
      })
      const [endDate, setEndDate] = useState({
            day: defaultEndDate.getDate(),
            month: defaultEndDate.getMonth() + 1,
            year: defaultEndDate.getFullYear()
      })
      const handleStartDate = (value) => {
            var myDate = new Date(value);
            setStartDate({
                  day: myDate.getDate(),
                  month: myDate.getMonth() + 1,
                  year: myDate.getFullYear()
            })
      }
      const handleEndDate = (value) => {
            var myDate = new Date(value);
            setEndDate({
                  day: myDate.getDate(),
                  month: myDate.getMonth() + 1,
                  year: myDate.getFullYear()
            })
      }
      const handlePage = (number) => {
            setPageNumber(number)
      }
      useEffect(() => {
            let data = JSON.stringify({
                  "thoiGianBatDau": `${startDate.day}-${startDate.month}-${startDate.year}`,
                  "thoiGianKetThuc": `${endDate.day + 1}-${endDate.month}-${endDate.year}`
            });

            let config = {
                  method: 'post',
                  maxBodyLength: Infinity,
                  url: 'http://localhost:8282/api/order/revenue',
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${LoginedUser.token}`
                  },
                  data: data
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
      }, [startDate, endDate])
      const totalMoney = data.reduce(
            (accumulator, currentValue) => accumulator + currentValue.total,
            0
      );
      return (
            <>
                  <AdminHeader />
                  <div className="revenue-container">

                        <h2 className='p-3'>Doanh thu</h2>


                        <div className=" date-container ">
                              <div className='start-time row' >
                                    <label htmlFor="start-date" className="col-3 col-form-label"><b>Từ ngày: </b></label>
                                    <input type="date"
                                          defaultValue={defaultStartDate.toISOString().substring(0, 10)}

                                          onChange={(e) => handleStartDate(e.target.value)}
                                          className="form-control" id="start-date" />

                              </div>
                              <div className='end-time row' >

                                    <label htmlFor="end-date" className="col-3 col-form-label"><b>Đến ngày: </b></label>
                                    <input type="date"
                                          // value="2013-01-08"
                                          defaultValue={defaultEndDate.toISOString().substring(0, 10)}
                                          onChange={(e) => handleEndDate(e.target.value)}
                                          className="form-control" id="end-date" />

                              </div>
                              <div className='btn btn-success btn-submit'
                              >Tìm </div>
                        </div>
                  </div>

                  <div className="order-container row">

                        <div className='pl-5 pt-4 pb-2'>
                              <h5>Tổng doanh thu từ ngày <b> {startDate.day} - {startDate.month} - {startDate.year} </b>
                                    đến ngày <b> {endDate.day} - {endDate.month} - {endDate.year} </b>  là
                                    <span style={{ color: 'red' }}> {totalMoney} VND </span>
                              </h5>
                        </div>

                        <h4 className="p-4" >Danh sách cách đơn hàng đã bán từ ngày <b> {startDate.day} - {startDate.month} - {startDate.year} </b>
                              đến ngày <b> {endDate.day} - {endDate.month} - {endDate.year} </b></h4>

                        <div className="shop__product__option">
                              <div className="row">
                                    <div className="col-lg-4 col-md-6 col-sm-6">
                                          <div className="shop__product__option__left">
                                                <p>Tìm thấy {totalElements} kết quả ({totalPages} trang)</p>
                                          </div>
                                    </div>
                              </div>
                        </div>

                        <table className="table table-hover">
                              <thead>
                                    <tr className="d-flex ">
                                          <th className="col-3 d-flex justify-content-center align-items-center  ">Tên khách hàng</th>
                                          <th className="col-1 d-flex justify-content-center align-items-center ">SĐT</th>
                                          <th className="col-3 d-flex justify-content-center align-items-center  ">Địa chỉ</th>
                                          <th className="col-1 d-flex justify-content-center align-items-center  ">Ghi chú</th>
                                          <th className="col-2 d-flex justify-content-center align-items-center  ">Tổng số tiền</th>
                                          <th className="col-1 d-flex justify-content-center align-items-center  ">Ngày đặt</th>
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
                                                            <td className="col-3 d-flex justify-content-center align-items-center  ">{order.user?.name}</td>
                                                            <td className="col-1 d-flex justify-content-center align-items-center  ">{order.phoneNumber}</td>
                                                            <td className="col-3 d-flex justify-content-center align-items-center  ">{order.address}</td>
                                                            <td className="col-1 d-flex justify-content-center align-items-center  ">{order.note}</td>
                                                            <td className="col-2 d-flex justify-content-center align-items-center  ">{order.total} VNĐ</td>
                                                            <td className="col-1 d-flex justify-content-center align-items-center  ">{final_time} <br /> {final_date}</td>
                                                            <td className="col-1 d-flex justify-content-center align-items-center  ">
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
            </>


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
                        Xem
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
export default Revenue
