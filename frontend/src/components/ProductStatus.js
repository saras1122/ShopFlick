import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { MdModeEditOutline } from 'react-icons/md'
import UploadProduct from './UploadProduct'
import EditStatus from './EditStatus'
import AOS from 'aos';
import 'aos/dist/aos.css';

const ProductStatus = () => {
  const [data, setData] = useState([])
  const [editProduct, setEditProduct] = useState(false)
  const fetchData = async () => {

    const response = await fetch(SummaryApi.adminOrder.url, {
      method: SummaryApi.adminOrder.method,
      headers: {
        "content-type": 'application/json'
      },
    })


    const responseData = await response.json()
    console.log(responseData)
    if (responseData.success) {
      setData(responseData?.data)
    }
  }
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditProduct(true);
  };
  useEffect(() => {
    AOS.init({
      duration:2000,
    });
    fetchData();
  }, []);
  return (
    <div>
      {/* <h1 className='flex items-center w-full' onClick={fetchData}>Click me</h1> */}
      <div className='bg-white py-2 mt-1 px-4 rounded-lg flex justify-between items-center customShadow1'>
        <h2 className='font-bold text-lg'>Product Status</h2>
      </div>
      <div className='grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] py-2 mt-5 gap-6 md:gap-8 h-[calc(100vh-190px)] px-[19px] overflow-y-scroll' 
      data-aos="flip-down">
        {data.map((product, index) => (
          <div key={index} className='bg-white p-4 rounded customShadow1 flex'>
            <div className='w-1/3'>
              <div className='h-32 flex justify-center items-center'>
                <img
                  src={product?.productId.productImage[0]}
                  className='mx-auto object-cover h-full'
                  alt='Product'
                />
              </div>
            </div>
            <div className='w-2/3 pl-4'>
              <h1 className='truncate text-xl text-gray-900 font-semibold mb-2'>{product.productName}</h1>
              <div className='flex justify-between mt-1'>
                <p >
                  City: <span className='text-gray-900 font-bold'>{product.city}</span>
                </p>
                <p>
                  Pincode: <span className='text-gray-900 font-bold'>{product.pincode}</span>
                </p>
              </div>
              <div className='mt-1'>
                <p>
                  Quantity: <span className='text-gray-900 font-bold'>{product.quantity}</span>
                </p>
              </div>
              <div className='mt-1'>
                <p>
                  UserId: <span className='text-gray-900 font-bold'>{product.userId}</span>
                </p>
              </div>
              <div className='mt-1'>
                <p>
                  ProductId:  <span className='text-gray-900 font-bold'>{product?.productId._id}</span>
                </p>
              </div>
              <div className='mt-1 flex justify-between'>
                <p>
                  Status: <span className='text-cyan-700 font-bold'>{product?.status}</span>
                </p>
                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer'
                  onClick={() => handleEditClick(product)}>
                  <MdModeEditOutline />
                </div>
              </div>
            </div>
            {
              editProduct && (
                <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-slate-200 bg-opacity-75'>
                  <EditStatus productData={selectedProduct} onClose={() => setEditProduct(false)} />
                </div>
              )
            }
          </div>
        ))}
      </div>


    </div>
  )
}

export default ProductStatus
