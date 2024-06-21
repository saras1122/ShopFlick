import React, { useContext } from 'react'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaCalendarAlt } from 'react-icons/fa'

const VerticalCard = ({ loading, data = [] }) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async (e, id) => {
        await addToCart(e, id)
        fetchUserAddToCart()
    }

    return (
        <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-center md:justify-between md:gap-6 transition-all'>
            {

                loading ? (
                    loadingList.map((product, index) => {
                        return (
                            <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                                <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                                </div>
                                <div className='p-4 grid gap-3'>
                                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                                    <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                                    <div className='flex gap-3'>
                                        <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                        <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                    </div>
                                    <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    data.map((product, index) => {
                        return (
                            <Link to={"/product/" + product?._id} key={index} className='w-full bg-white rounded-lg custom-strong-shadow p-4'>
                                <div className='bg-slate-200 h-52 p-4 rounded-lg flex justify-center items-center'>
                                    <img src={product.productImage[0]} className='object-cover h-full hover:scale-110 transition-all mix-blend-multiply rounded-lg' alt={product.productName} />
                                </div>
                                <div className='p-4 grid gap-2'>
                                    <div className="flex items-center text-gray-500">
                                        <FaCalendarAlt className="mr-2" />
                                        <h2 className='text-gray-500' >By {product?.brandName}</h2>
                                    </div>
                                    <p className='capitalize text-md font-semibold' style={{
                                        fontFamily: "Josefin Sans", whiteSpace: "nowrap",
                                        overflow: "hidden",
                                        textOverflow: "ellipsis"
                                    }}>{product?.productName}</p>
                                    <div className='flex gap-3'>
                                        <p className='text-600 font-medium' style={{ color: "blueviolet" }}>{displayINRCurrency(product?.sellingPrice)}</p>
                                        <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                                    </div>
                                    {product?.currentQuantity > 0 ? (
                                        <button
                                            className='text-sm hover:bg-cyan-700 text-white px-3 py-0.5 rounded-full' style={{ background: "blueviolet" }}
                                            onClick={(e) => handleAddToCart(e, product?._id)}
                                        >
                                            Add to Cart
                                        </button>
                                    ) : (
                                        <p className='text-red-800 text-1.5xl font-bold'>Not Available</p>
                                    )}
                                </div>
                            </Link>
                        )
                    })
                )

            }
        </div>
    )
}

export default VerticalCard