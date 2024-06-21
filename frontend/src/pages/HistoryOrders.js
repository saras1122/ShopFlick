import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import { MdDelete } from "react-icons/md";
import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import SHipping from '../components/SHipping';
import Delivered from '../components/Delivered';

const HistoryOrders = () => {
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
        navigate('shipped')
    }, [navigate])


    const Book = () => {
        navigate("/booking")
    }
    // const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    // const totalPrice = data.reduce((preve, curr) => preve + (curr.quantity * curr?.productId?.sellingPrice), 0)
    return (
        <div className="mx-[50px]">
            <div className='flex text-black mt-6'>
                <h1 className='font-bold text-xl'>MY ORDERS</h1>

            </div>
            <div className='w-full rounded-[65px] bg-slate-300 flex justify-between p-2 text-xl mt-4 gap-1'>
                <NavLink
                    to="shipped"
                    className={({ isActive }) =>
                        isActive
                            ? 'w-1/2 py-2 bg-slate-100 rounded-[65px] flex justify-center'
                            : 'w-1/2 px-2 py-2 hover:bg-slate-100 rounded-[65px] flex justify-center'
                    }
                >
                    On Shipping
                </NavLink>
                <NavLink
                    to="delivered"
                    className={({ isActive }) =>
                        isActive
                            ? 'w-1/2 py-2 bg-slate-100 rounded-[65px] flex justify-center'
                            : 'w-1/2 px-2 py-2 hover:bg-slate-100 rounded-[65px] flex justify-center'
                    }
                >
                    Delivered
                </NavLink>
            </div>
            <div className="mt-4">
                <Routes>
                    <Route path="/shipped" element={<SHipping />} />
                    <Route path="/delivered" element={<Delivered />} />
                    <Route path="/cancelled" element={<SHipping />} />
                </Routes>
            </div>
        </div>

    )
}

export default HistoryOrders
