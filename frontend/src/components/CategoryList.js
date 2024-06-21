import React, { useEffect, useRef, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])
    const scrollRef = useRef(null);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -scrollRef.current.offsetWidth, // Scroll left by one image width
                behavior: 'smooth' // Smooth scrolling animation
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: scrollRef.current.offsetWidth, // Scroll right by one image width
                behavior: 'smooth' // Smooth scrolling animation
            });
        }
    };

    return (
        <div className='flex flex-col md:flex-row items-center justify-center h-full px-4 py-8 md:ml-[89px]'>
            <h2 className='text-2xl font-semibold mb-6' style={{ fontFamily: 'Josefin Sans' }}>SHOP BY CATEGORY</h2>
            <div ref={scrollRef} className='flex items-center gap-4 overflow-x-scroll scrollbar-none ml-[89px] transition-all'>
                    <button className='bg-white  shadow-md rounded-full left-[316px] p-2 absolute text-lg hidden md:block mb-7' onClick={scrollLeft}><FaAngleLeft /></button>
                    <button className='bg-white shadow-md rounded-full p-2 absolute right-0 text-lg hidden md:block mb-7' onClick={scrollRight}><FaAngleRight /></button>
                
                {/* Loading state */}
                {loading ? (
                    categoryLoading.map((el, index) => (
                        <div className='h-20 w-20 md:w-32 md:h-32 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading" + index}></div>
                    ))
                ) : (
                    // Displaying category products
                    categoryProduct.map((product, index) => (
                        <Link to={`/product-category?category=${product?.category}`} className='cursor-pointer flex-shrink-0' key={product?.category}>
                            <div className='w-32 h-32 md:w-40 md:h-36 border-3 overflow-hidden bg-zinc-200 rounded-lg flex items-center justify-center'>
                                <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all' />
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                        </Link>
                    ))
                )}
            </div>
        </div>
    )
}

export default CategoryList