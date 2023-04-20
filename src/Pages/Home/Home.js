import React, { useEffect, useState } from 'react'
import '../../css/bootstrap.min.css'
import '../../css/magnific-popup.css'
import '../../css/nice-select.css'
import '../../css/slicknav.min.css'
import '../../css/style.css'
import '../../css/style.css.map'
import '../../css/slicknav.min.css'
import './Home.css'
import Header from '../../Components/Header/Header'
import axios from 'axios';
import { NavLink } from 'react-router-dom'

// m dang o home.js  ./ là lấy thư mục hiện tại,   ../ lùi lại 1 thư mục  -> page ../../ -> src trong src có css pages cùng cấp thì trỏ để
// đến css bằng ../../css hoặc m chơi đường dẫn  tuyệt đối
function Home() {
      const [option, setOption] = useState('best-selling');
      const handleOption = (choose) => {
            setOption(choose)
      }
      const [data, setData] = useState([])
      useEffect(() => {
            let data = '';
            let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/product/${option}`,
                  headers: {},
                  data: data
            };

            axios.request(config)
                  .then((response) => {
                        console.log(response.data);
                        setData(response.data);
                  })
                  .catch((error) => {
                        alert(error.message)
                        // console.log(error);
                  });
      }, [option]);
      return (
            <div>
                  <Header />
                  <section className="product spad">
                        <div className="container">
                              <div className="row">
                                    <div className="col-lg-12">
                                          <ul className="filter__controls">
                                                <li className={option === 'best-selling' ? 'active' : ''} name='best-selling' onClick={() => handleOption('best-selling')} >Best Sellers</li>
                                                <li className={option === 'new' ? 'active' : ''} name='new' onClick={() => handleOption('new')} >New Arrivals</li>
                                          </ul>
                                    </div>
                              </div>
                              <div className="row product__filter">
                                    {data.length !== 0 ?
                                          data.map((item, key) => {
                                                return (
                                                      <div key={key} className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix">
                                                            <div className="product__item">
                                                                  <div className="product__item__pic set-bg" style={{
                                                                        backgroundSize: 'contain',
                                                                        backgroundImage: `url(${item && item.productImages[0] && item.productImages[0].image ? item.productImages[0].image : ''})`,
                                                                  }} >

                                                                  </div>
                                                                  <div className="product__item__text">
                                                                        <h5 style={{ padding: '20px' }}>{item.productName}</h5>
                                                                        <NavLink className='see-detail' to="/product" state={{ productId: item.id }} >Xem chi tiết</NavLink>

                                                                        <div className='product_detail' >
                                                                              <h5 className='product_price' >{item.price} VND </h5>
                                                                              <h5 className='product_sold' >{item.sold} đã bán</h5>
                                                                        </div>

                                                                  </div>
                                                            </div>
                                                      </div>
                                                )
                                          })
                                          :
                                          <h2>Không tìm thấy sản phẩm!</h2>
                                    }


                              </div>
                        </div>
                  </section >
            </div >
      )
}

export default Home
