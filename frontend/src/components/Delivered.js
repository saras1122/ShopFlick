import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import { NavLink, useNavigate } from 'react-router-dom';
import EditStatus from './EditStatus';
import displayINRCurrency from '../helpers/displayCurrency'

const Delivered = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const loadingCart = new Array(4).fill(null)



    const fetchData = async () => {

        const response = await fetch(SummaryApi.history1.url, {
            method: SummaryApi.history1.method,
            credentials: 'include',
            headers: {
                "content-type": 'application/json'
            },
        })


        const responseData = await response.json()
        console.log(responseData)
        if (responseData.success) {
            const groupedData = groupProductsByTimestamp(responseData.data);
            setData(groupedData);
        }


    }
    const groupProductsByTimestamp = (products) => {
        const grouped = {};

        products.forEach(product => {
            const roundedTimestamp = product.createdAt.slice(0, 16);
            if (!grouped[roundedTimestamp]) {
                grouped[roundedTimestamp] = [];
            }
            grouped[roundedTimestamp].push(product);
        });

        return grouped;
    };

    const handleLoading = async () => {
        await fetchData()
    }
    const navigate = useNavigate()
    useEffect(() => {
        handleLoading()
    }, [navigate])
    return (
        <div>
            <div className='container mx-auto'>

                <div className='text-center text-lg my-3'>
                    {
                        Object.keys(data).length === 0 && !loading && (
                            <p className='bg-white py-5'>No Data</p>
                        )
                    }
                </div>

                <div className=''>
                    <div className=''>
                        {
                            loading ? (
                                loadingCart.map((el, index) => {
                                    return (
                                        <div key={el + "Add To Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='grid grid-cols-2 sm:grid-cols-2 py-2 mt-5 gap-6 md:gap-8  px-[19px]'>
                                    {Object.entries(data).map(([timestamp, products], index) => {
                                        // Filter products where product.status === 'delivered'
                                        const deliveredProducts = products.filter(product => product.status === 'Delivered');

                                        // Only render if there are delivered products
                                        if (deliveredProducts.length > 0) {
                                            return (
                                                <div key={timestamp} className='border-slate-800 rounded bg-white my-4 p-3'>
                                                    <h2 className='text-black font-extrabold p-2'>{timestamp}</h2>

                                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                                                        {deliveredProducts.slice(0, 2).map((product) => (
                                                            <div key={product?._id + "Add To Cart Loading"} className='w-full bg-slate-100 h-32 my-2 border rounded grid grid-cols-[128px,1fr]'>
                                                                <div className='w-32 h-32 bg-slate-200'>
                                                                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply' alt={product.productName} />
                                                                </div>
                                                                <div className='px-4 py-2 relative'>
                                                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 font-bold'>{product.productName}</h2>
                                                                    <div className='flex items-center gap-3 mt-1'>
                                                                        <span>Quantity: <b>{product?.quantity} </b></span>
                                                                    </div>
                                                                    <div className='flex items-center justify-between'>
                                                                        <p className='text-red-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className='flex items-center justify-center'>
                                                        <div className='text-center font-bold'>
                                                        <h2 className='font-extrabold' style={{ color: 'green' }}>Delivered</h2>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center justify-between mt-2 border border-gray-300 rounded-lg p-2'>
                                                        <div className='flex-1 text-center'>
                                                            <p className='text-sm text-gray-500'>Order Status:</p>
                                                            <p className='font-extrabold ' >Delivered</p>
                                                        </div>
                                                        <div className='flex-1 text-center'>
                                                            <p className='text-sm text-gray-500'>Total Items:</p>
                                                            <p className='font-bold text-black'>{deliveredProducts.length}</p>
                                                        </div>
                                                        <div className='flex-1 text-center'>
                                                            <p className='text-sm text-gray-500'>Order no.:</p>
                                                            <p className='font-bold text-black'>841</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return null; // Don't render anything if there are no delivered products
                                        }
                                    })}


                                </div>
                            )
                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Delivered
