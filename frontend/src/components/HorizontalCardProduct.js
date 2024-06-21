import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import Context from '../context'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'

const HorizontalCardProduct = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()


    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        //await addToCart(e,id)
        //fetchUserAddToCart()
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        //console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }


    return (
        <div className='container px-4 my-6 relative'>
            <h1 className='text-4xl font-semibold py-4 md:ml-[89px] text-center' style={{ fontFamily: "Josefin Sans",color: "#152f37cc" }}>{heading}</h1>
            <div className='relative flex items-center'>
                <button className='bg-white shadow-md rounded-full p-1 absolute md:left-[87px] text-lg hidden md:block z-10' onClick={scrollLeft}>
                    <FaAngleLeft />
                </button>
                {/* Right scroll button */}
                <button className='bg-white shadow-md rounded-full p-1 absolute md:right-[87px] text-lg hidden md:block z-10' onClick={scrollRight}>
                    <FaAngleRight />
                </button>
                <div ref={scrollElement} className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all md:mx-[89px]'>
                    {loading ? (
                        loadingList.map((product, index) => (
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'></div>
                                <div className='p-4 grid w-full gap-2'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                    <div className='flex gap-3 w-full'>
                                        <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    </div>
                                    <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                                </div>
                            </div>
                        ))
                    ) : (
                        data.map((product, index) => (
                            <Link key={product?._id} to={"product/" + product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                    <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all' />
                                </div>
                                <div className='p-4 grid'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                    <p className='capitalize text-slate-500'>{product?.category}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-600 font-medium' style={{color:"blueviolet"}}>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    {product?.currentQuantity > 0 ? (
                                        <button
                                            className='text-sm hover:bg-cyan-700 text-white px-3 py-0.5 rounded-full' style={{background:"blueviolet"}}
                                            onClick={(e) => handleAddToCart(e, product?._id)}
                                        >
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <p className='text-red-800 text-1.5xl font-bold'>Not Available</p>
                                    )}
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default HorizontalCardProduct