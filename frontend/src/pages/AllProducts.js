import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'
import AOS from 'aos';
import 'aos/dist/aos.css';

const AllProducts = () => {
  const [openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct] = useState([])

  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data",dataResponse)

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    AOS.init({
      duration:2000,
    });
    fetchAllProduct();
  }, []);
  
  return (
    <div>
        <div className='bg-white py-2 mt-1 px-4 rounded-lg flex justify-between items-center customShadow1'>
            <h2 className='font-bold text-lg'>All Product</h2>
            <button  className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
        </div>

        <div className='grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] py-2 mt-5 gap-6 md:gap-8 h-[calc(100vh-190px)] px-[19px] overflow-y-scroll' data-aos="zoom-in">
          {
            allProduct.map((product,index)=>{
              return(
                <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
                
              )
            })
          }
        </div>
        {/**upload prouct component */}
        {
          openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchdata={fetchAllProduct}/>
          )
        }
    </div>
  )
}

export default AllProducts