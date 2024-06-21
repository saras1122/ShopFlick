import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { FaTrophy, FaCalendarAlt } from 'react-icons/fa';
import AOS from 'aos';
import displayINRCurrency from '../helpers/displayCurrency'
import 'aos/dist/aos.css';

const CategroyWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [delay, setDelay] = useState(true);
    const loadingList = new Array(13).fill(null)


    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
    }

    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setTimeout(() => setDelay(false), 100);
        //console.log("horizontal data", categoryProduct.data)
        setData(categoryProduct?.data)
    }

    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true,
        });
        fetchData();
    }, []);

    useEffect(() => {
        if (!loading && !delay) {
            AOS.refresh(); // Refresh AOS animations after data is loaded and delay has passed
        }
    }, [loading, delay]);
    return (
        <div className='container mx-auto px-4 relative'>
            <h1 className='text-4xl font-semibold py-4 md:ml-[89px] text-center' style={{ fontFamily: "Josefin Sans",color: "#152f37cc" }}>{heading}</h1>
            <div className='grid grid-cols-1 md:grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-10 md:gap-8 px-4 md:px-[89px] mt-3' data-aos="slide-up">
                {loading ? (
                    loadingList.map((product, index) => (
                        <div key={index} className='w-full bg-white rounded-lg shadow p-4'>
                            <div className='bg-slate-200 h-48 rounded-lg flex justify-center items-center animate-pulse'></div>
                            <div className='mt-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200' style={{ fontFamily: "Josefin Sans" }}></h2>
                                <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                    <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                                </div>
                                <button className='text-sm text-white px-3 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                            </div>
                        </div>
                    ))
                ) : (
                    data.slice(0, 6).map((product, index) => (
                        <Link to={"/product/" + product?._id} key={index} className='w-full bg-white rounded-lg custom-strong-shadow p-4'>
                            <div className='bg-slate-200 h-52 p-4 rounded-lg flex justify-center items-center'>
                                <img src={product.productImage[0]} className='object-cover h-full hover:scale-110 transition-all mix-blend-multiply rounded-lg' alt={product.productName} />
                            </div>
                            <div className='mt-4 grid gap-2'>
                                <div className="flex items-center text-gray-500">
                                    <FaCalendarAlt className="mr-2" />
                                    <h2 className='text-gray-500' >By {product?.brandName}</h2>
                                </div>
                                <p className='capitalize text-md font-semibold' style={{ fontFamily: "Josefin Sans",  }}>{product?.productName}</p>
                                <div className='flex gap-3'>
                                    <p className='text-800 font-bold' style={{color:"blueviolet"}}>{displayINRCurrency(product?.sellingPrice)}</p>
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


    )
}

export default CategroyWiseProductDisplay