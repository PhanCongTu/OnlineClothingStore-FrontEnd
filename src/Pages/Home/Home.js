import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../css/bootstrap.min.css'
import '../../css/magnific-popup.css'
import '../../css/nice-select.css'
import '../../css/slicknav.min.css'
import '../../css/style.css'
import '../../css/style.css.map'
import '../../css/slicknav.min.css'

import Header from '../../Components/Header/Header'
import { faHeart } from '@fortawesome/free-solid-svg-icons';

// m dang o home.js  ./ là lấy thư mục hiện tại,   ../ lùi lại 1 thư mục  -> page ../../ -> src trong src có css pages cùng cấp thì trỏ để
// đến css bằng ../../css hoặc m chơi đường dẫn  tuyệt đối
function Home() {
      return (
            <div>
                  <Header />
                  <section className="product spad">
                        <div className="container">
                              <div className="row">
                                    <div className="col-lg-12">
                                          <ul className="filter__controls">
                                                <li className="active" data-filter="*">Best Sellers</li>
                                                <li data-filter=".new-arrivals">New Arrivals</li>
                                          </ul>
                                    </div>
                              </div>
                              <div className="row product__filter">
                                    <div className="col-lg-3 col-md-6 col-sm-6 col-md-6 col-sm-6 mix new-arrivals">
                                          <div className="product__item">
                                                <div className="product__item__pic set-bg" style={{
                                                      backgroundImage: `url("https://vnw-img-cdn.popsww.com/api/v2/containers/file2/cms_topic/doraemons9_05_seriesdetailimagemobile-80424f74d030-1609395371290-iZgELVcX.png?v=0")`,
                                                }} >
                                                      <ul className="product__hover">
                                                            <li><a href="/"><FontAwesomeIcon icon={faHeart} style={{ color: "#ff0000", }} /></a></li>
                                                      </ul>
                                                </div>
                                                <div className="product__item__text">
                                                      <h6>Piqué Biker Jacket</h6>
                                                      <a href="/" className="add-cart">Xem chi tiết</a>
                                                      <div className="rating">
                                                            <i className="fa fa-star"></i>
                                                      </div>
                                                      <h5>$67.24</h5>

                                                </div>
                                          </div>
                                    </div>
                              </div>
                        </div>
                  </section>
            </div>
      )
}

export default Home
