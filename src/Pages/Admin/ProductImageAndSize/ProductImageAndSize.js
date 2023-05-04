import React, { useEffect, useState } from 'react'
import AdminHeader from '../../../Components/AdminHeader/AdminHeader'
import '../../../css/bootstrap.min.css'
import '../../../css/magnific-popup.css'
import '../../../css/nice-select.css'
import '../../../css/slicknav.min.css'
import '../../../css/style.css'
import '../../../css/style.css.map'
import '../../../css/slicknav.min.css'
import './ProductImageAndSize.css'
import { useLocation } from 'react-router-dom'
import defaultAvatar from '../../../Image/default-avatar.png'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
function ProductImageAndSize() {
      let location = useLocation();
      let LoginedUser = JSON.parse(sessionStorage.getItem('LoginedUser'));
      if (!LoginedUser) {
            LoginedUser = JSON.parse(localStorage.getItem('LoginedUser'));
      }
      const { productId } = location.state
      const [images, setImages] = useState([])
      const [sizes, setSizes] = useState([])
      const [newSize, setNewSize] = useState('')
      const [message, setMessage] = useState('')
      const [newPImage, setNewPImage] = useState('')
      const [rerenderImage, setrerenderImage] = useState(true)
      const [rerenderSize, setrerenderSize] = useState(true)

      const handleNewSize = (e) => {
            setNewSize(e.target.value)
      }
      useEffect(() => {
            let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/product-image/product/${productId}`,
                  headers: {}
            };

            axios.request(config)
                  .then((response) => {
                        setImages(response.data)
                  })
                  .catch((error) => {
                        alert(error.message);
                  });
      }, [rerenderImage])
      useEffect(() => {
            let config = {
                  method: 'get',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/product-size/product/${productId}`,
                  headers: {}
            };

            axios.request(config)
                  .then((response) => {
                        setSizes(response.data)
                  })
                  .catch((error) => {
                        alert(error.message);
                  });
      }, [rerenderSize])
      const handleUploadFile = (e) => {
            // Nhớ chỉnh lại thẻ <img> nếu có thay đổi phương thức upload
            // cloud upload
            // let url = 'http://localhost:8282/files/cloud/upload';
            // local upload
            let url = 'http://localhost:8282/files/local/upload';


            const data = new FormData()
            data.append('file', e.target.files[0])

            axios.post(url, data, {
            })
                  .then(res => {
                        setNewPImage(res.data)
                  })
                  .catch((error) => {
                        alert(error.message);
                  })

      }
      const handleAddImage = () => {
            let data = JSON.stringify({
                  "image": `${newPImage}`
            });

            let config = {
                  method: 'post',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/product-image/add/${productId}`,
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${LoginedUser.token}`
                  },
                  data: data
            };

            axios.request(config)
                  .then((response) => {
                        setrerenderImage((prev) => !prev)
                        setNewPImage('')
                  })
                  .catch((error) => {
                        alert(error.message);
                  });
      }
      const handleAddSize = () => {
            if (newSize == '') {
                  setMessage('Không được bỏ trống')
            }
            else {
                  let data = JSON.stringify({
                        "size": `${newSize}`
                  });

                  let config = {
                        method: 'post',
                        maxBodyLength: Infinity,
                        url: `http://localhost:8282/api/product-size/add/${productId}`,
                        headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${LoginedUser.token}`
                        },
                        data: data
                  };

                  axios.request(config)
                        .then((response) => {
                              setrerenderSize((prev) => !prev)
                              setNewSize('')
                        })
                        .catch((error) => {
                              alert(error.message);
                        });
            }

      }
      const handleDeleteImage = (imageId) => {
            let config = {
                  method: 'delete',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/product-image/delete/${imageId}`,
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };

            axios.request(config)
                  .then((response) => {
                        setrerenderImage(pre => !pre)
                  })
                  .catch((error) => {
                        console.log(error);
                  });
      }
      const handleDeleteSize = (sizeId) => {
            let config = {
                  method: 'delete',
                  maxBodyLength: Infinity,
                  url: `http://localhost:8282/api/product-size/delete/${sizeId}`,
                  headers: {
                        'Authorization': `Bearer ${LoginedUser.token}`
                  }
            };

            axios.request(config)
                  .then((response) => {
                        setrerenderSize(pre => !pre)
                  })
                  .catch((error) => {
                        console.log(error);
                  });
      }
      return (
            <div>
                  <AdminHeader />
                  <h1 className='d-flex justify-content-center'>Chỉnh sửa ảnh</h1>
                  <div className="image-container" >
                        < div className="" style={{}} >
                              {images.length > 0 ? images?.map((image, index) => {
                                    if (image.image.includes('uploads')) {
                                          return (
                                                <span key={index} style={{ position: 'relative' }}>

                                                      <img className='product-image' src={`http://${image.image}`} alt='' />
                                                      <FontAwesomeIcon size='xl' onClick={() => handleDeleteImage(image.id)} className='delete' icon={faXmark} />
                                                </span>
                                          )
                                    }
                                    else {
                                          return (
                                                <span key={index} style={{ position: 'relative' }}>
                                                      <img className='product-image' src={image.image} alt='' />
                                                      <FontAwesomeIcon size='xl' onClick={() => handleDeleteImage(image.id)} className='delete' icon={faXmark} />
                                                </span>
                                          )
                                    }

                              })
                                    :
                                    <></>
                              }
                        </div>

                  </div>
                  < div className="d-flex justify-content-center align-items-center p-3" >
                        {newPImage.includes('uploads') ?
                              <img className='product-image' src={newPImage !== null ? `http://${newPImage}` : defaultAvatar} alt='' />
                              :
                              <img className='product-image' src={newPImage !== null ? newPImage : defaultAvatar} alt='' />
                        }

                        <input type='file' name="file" onChange={(e) => handleUploadFile(e)} />
                        <div className='btn btn-success' onClick={handleAddImage}>Thêm ảnh</div>
                  </div>
                  <br></br> <br></br>
                  <hr></hr>
                  <h1 className='d-flex justify-content-center'>Chỉnh sửa các loại kích cỡ</h1>
                  <div className="input-group justify-content-center p-3">

                        <div className="form-outline">
                              <input type="search" id="form1"
                                    value={newSize}
                                    onChange={(e) => handleNewSize(e)}
                                    autocomplete="off"
                                    className="form-control" placeholder='Nhập kích cỡ' />
                        </div>
                        <div className="btn btn-success" onClick={handleAddSize}>
                              Thêm kích cỡ
                        </div>
                  </div>
                  <div className="size-container" >

                        <table className="table table-hover col-8 ">
                              <thead>
                                    <tr className="d-flex ">
                                          <th className="col d-flex justify-content-center ">Số thứ tự</th>
                                          <th className="col d-flex justify-content-center">Tên kích cỡ</th>
                                          <th className="col d-flex justify-content-center ">Xóa</th>
                                    </tr>
                              </thead>
                              <tbody>
                                    {sizes.length > 0 ? sizes?.map((size, key) => {
                                          return (
                                                <tr key={key} className="d-flex ">
                                                      <td className="col d-flex justify-content-center ">{key}</td>

                                                      <td className="col d-flex justify-content-center text-success">{size.size}</td>

                                                      <td className="col d-flex justify-content-center"
                                                            onClick={() => handleDeleteSize(size.id)}
                                                      >
                                                            <div className='btn btn-danger'>Xóa</div>
                                                      </td>
                                                </tr>
                                          )
                                    })
                                          : <></>}



                              </tbody>
                        </table>
                  </div>
                  <br></br> <br></br><br></br> <br></br><br></br> <br></br>
            </div >
      )
}

export default ProductImageAndSize
