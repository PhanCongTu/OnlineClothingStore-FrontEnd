import React, { useEffect, useState } from 'react'
import '../../css/bootstrap.min.css'
import '../../css/magnific-popup.css'
import '../../css/nice-select.css'
import '../../css/slicknav.min.css'
import '../../css/style.css'
import '../../css/style.css.map'
import '../../css/slicknav.min.css'
import './MyOrder.css'
import Header from '../../Components/Header/Header'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function MyOrder() {
      const navigate = useNavigate();
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      const [data, setData] = useState([])
      useEffect(() => {
            let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: 'http://localhost:8282/api/order/my-order',
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
                        navigate('/login')
                  });
      }, [])
      return (
            <div>
                  <Header />
                  <section className="intro_cart" >
                        <h4 className='intro_name'>Lịch sử mua hàng của tôi</h4>
                  </section>
                  <section className="shopping-cart spad">
                        <div className="container ">
                              {data.length > 0 ? data?.map((order) => {
                                    var myDate = new Date(order.createAt);
                                    var final_date = myDate.getHours() + ":" + myDate.getMinutes() + " " + myDate.getDate() + "-" + (myDate.getMonth() + 1) + "-" + myDate.getFullYear();
                                    return (
                                          <div className="row ">
                                                <div>
                                                      <div className='order-item-header'>
                                                            <div>
                                                                  <h5 ><span className='order-item-header-text'>Địa chỉ:</span> {order.address}</h5>
                                                                  <h5 ><span className='order-item-header-text'>Ghi chú:</span> {order.note} </h5>
                                                                  <h5 ><span className='order-item-header-text'>Số điện thoại:</span> {order.phoneNumber}</h5>
                                                            </div>
                                                            <div>
                                                                  <h5 ><span className='order-item-header-text'>Tổng tiền:</span> {order.total} VNĐ</h5>
                                                                  <h5 ><span className='order-item-header-text'>Trạng thái:</span> {order.status}</h5>
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
                                                                  {order.orderItems?.map((item) => {
                                                                        return (
                                                                              <tr className='tr-text'>
                                                                                    <td className="product__cart__item">
                                                                                          <div className="product__cart__item__pic">
                                                                                                <img className='product_img' src={item.product?.productImages[0].image} alt="" />
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
                                    )
                              })
                                    :
                                    <h3>Bạn chưa có lịch sử mua hàng!</h3>
                              }

                        </div>
                  </section>
            </div>
      )
}

export default MyOrder
