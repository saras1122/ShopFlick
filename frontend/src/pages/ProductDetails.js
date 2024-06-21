import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import VerticalCardProduct from '../components/VerticalCardProduct';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';
import displayINRCurrency from '../helpers/displayCurrency'
import { CiDeliveryTruck } from "react-icons/ci";
import { GiCardExchange } from "react-icons/gi";
//countToAddToCart
const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0
  })
  const [zoomImage, setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  const navigate = useNavigate()

  const fetchProductDetails = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        productId: params?.id
      })
    })
    setLoading(false)
    const dataReponse = await response.json()

    setData(dataReponse?.data)
    setActiveImage(dataReponse?.data?.productImage[0])

  }

  console.log("data", data)

  useEffect(() => {
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    console.log("coordinate", left, top, width, height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  }, [zoomImageCoordinate])

  const handleLeaveImageZoom = () => {
    setZoomImage(false)
  }


  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    //fetchUserAddToCart()
  }

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id)
    //fetchUserAddToCart()
    navigate("/cart")

  }

  return (
    <div className='container mx-auto p-4'>

      <div className='min-h-[200px] flex flex-col lg:flex-row gap-4 md:mx-[89px]'>
        {/***product Image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

          <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2 '>
            <img src={activeImage} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

            {/**product zoom */}
            {
              zoomImage && (
                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                  <div
                    className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                    style={{
                      background: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `

                    }}
                  >

                  </div>
                </div>
              )
            }

          </div>

          <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage" + index}>
                        </div>
                      )
                    })
                  }
                </div>

              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imgURL, index) => {
                      return (
                        <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgURL}>
                          <img src={imgURL} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imgURL)} onClick={() => handleMouseEnterProduct(imgURL)} />
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>
        </div>

        {/***product details */}
        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
              <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
              <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

              <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>

              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
                <p className='text-red-600 bg-slate-200 w-full'></p>
                <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
              </div>

              <div className='flex items-center gap-3 my-2 w-full'>
                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
                <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
              </div>

              <div className='w-full'>
                <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
                <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
              </div>
            </div>
          ) :
            (
              <div className='flex flex-col gap-2 md:ml-[100px]'>
                <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <hr className='border-[1px] border-gray-300 mt-5' />
                <p className='capitalize text-slate-400 mt-1'>{data?.category}</p>

                <div className='text-red-600 flex items-center gap-1'>
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalf />
                </div>

                <div className='flex items-center gap-2 font-medium'>
                  <p className='text-slate-400 text-2xl line-through'>{displayINRCurrency(data?.price)}</p>
                  <p className='text-600 text-4xl ml-6 font-extrabold' >{displayINRCurrency(data?.sellingPrice)}</p>
                </div>
                <hr className='border-[1px] border-gray-300 my-4' />
                <div className='flex items-center gap-3 justify-between'>
                  <button className='border-2 border-black rounded px-3 py-1 w-1/2 font-medium text-black hover:text-white hover:bg-black hover-style1' onClick={(e) => handleAddToCart(e, data?._id)}>Add To Cart</button>
                  <button className='border-2 rounded px-3 py-1 w-1/2 bg-black text-white font-medium hover-style ' onClick={(e) => handleBuyProduct(e, data?._id)}>Buy</button>
                </div>
                <hr className='border-[1px] border-gray-300 mt-4' />
                <div className='space-y-2'>
                  <h2 className='font-bold' style={{ fontFamily: "Josefin Sans" }}>Delivery OPTIONS</h2>
                  <p style={{ fontFamily: "Josefin Sans" }}>Select to see availability to <b>your location</b></p>
                  <p className='text-green-600 font-extrabold' style={{ fontFamily: "Josefin Sans" }}>Express Delivery available</p>
                  <div className='flex justify-between bg-slate-300 p-1 mt-3'>
                    <p className='text-sm flex items-center' style={{ fontFamily: "Josefin Sans", color: "#152f37cc" }}>
                      <CiDeliveryTruck className="mr-1" style={{ color: "#000" }} size={28} />FREE DELIVERY
                    </p>
                    <p className='text-sm flex items-center' style={{ fontFamily: "Josefin Sans", color: "#152f37cc" }}>
                      <GiCardExchange className="mr-1" style={{ color: "#000" }} size={24} />15 DAYS FREE RETURN & EXCHANGE*
                    </p>
                  </div>
                </div>
                <hr className='border-[1px] border-gray-300 mt-5' />
                <div>
                  <p className='text-slate-600 font-medium my-2'>Description : </p>
                  <p>Introducing the Van Heusen navy textured Nehru jacket! Perfect for
                    every party occasion, our slim-fit design flatters every man`s body type.
                    This jacket`s unique 5-button front opening adds a touch of sophistication
                    to your wardrobe. Crafted from Polyester, its premium textured fabric is soft
                    and comfortable for all-day wear. Own the night with Van Heusen superior
                    quality and design.</p>
                </div>
              </div>
            )
        }

      </div>



      {
        data.category && (
          <VerticalCardProduct category={data?.category} heading={"Recommended Product"} />
        )
      }




    </div>
  )
}

export default ProductDetails