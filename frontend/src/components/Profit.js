import React, { useEffect, useState } from 'react';
import {
    PieChart,
    Pie,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
} from "recharts";
import SummaryApi from '../common';
import productCategory from '../helpers/dateAnalysis';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { dummyData } from '../helpers/dateAnalysis';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Profit = () => {
    const [data1, setData] = useState([]);
    const [selectCategory, setSelectCategory] = useState("sevendays");

    useEffect(() => {
        AOS.init({
          duration:2000,
        });
        fetchData();
      }, []);

    const fetchData = async () => {
        const response = await fetch(SummaryApi.adminOrder.url, {
            method: SummaryApi.adminOrder.method,
            headers: {
                "content-type": 'application/json'
            },
        });

        const responseData = await response.json();
        console.log(responseData);
        if (responseData.success) {
            setData(responseData?.data);
        }
    };

    const groupDataByDate = (data) => {
        return data.reduce((acc, curr) => {
            const date = curr.createdAt.split('T')[0];
            if (!acc[date]) {
                acc[date] = { date: date, count: curr.productId?.sellingPrice };
            }
            acc[date].count=acc[date].count+curr.productId?.sellingPrice;
            return acc;
        }, {});
    };
    const groupedData = groupDataByDate(data1);

    const handleSelectCategory = (e) => {
        const { value } = e.target;
        setSelectCategory(value);
    };
    const transformedData = Object.entries(groupedData).map(([date, { count }]) => ({
        name: date,
        users: count,
    }));

    const filteredData = selectCategory === 'sevendays'
        ? transformedData
        : dummyData[selectCategory];
    return (
        <div>
            <div className='bg-white py-2 mt-1 px-4 rounded-lg flex justify-between items-center customShadow1'>
                <h2 className='font-bold text-lg'>Analysis of Sales</h2>
            </div>
            <div className='flex justify-between w-full px-5'>
                <aside className='ml-2 mt-[10px] bg-white rounded-lg p-2 h-[170px]  w-[190px] customShadow'>
                    <div>
                        <div className=''>
                            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                            <form className='text-sm flex flex-col gap-2 py-2'>
                                {
                                    productCategory.map((categoryName, index) => (
                                        <div key={index} className='flex items-center gap-3'>
                                            <input
                                                type='radio'
                                                name={"category"}
                                                checked={selectCategory === categoryName?.label}
                                                value={categoryName?.label}
                                                id={categoryName?.label}
                                                onChange={handleSelectCategory}
                                            />
                                            <label htmlFor={categoryName?.label}>{categoryName?.value}</label>
                                        </div>
                                    ))
                                }
                            </form>
                        </div>
                    </div>
                </aside>
                <div>
                    {selectCategory && (
                        <div>
                            <div className=' py-2 mt-1 px-4 flex justify-center items-center'>
                                <h1 className='font-bold text-lg capitalize'>{selectCategory} Sales</h1>
                            </div>

                            <div className='flex justify-between mt-5' data-aos="flip-left">
                                <PieChart width={400} height={400} >
                                    <Pie
                                        dataKey="users"
                                        isAnimationActive={false}
                                        data={filteredData}
                                        cx={200}
                                        cy={200}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label
                                    />
                                    <Tooltip />
                                </PieChart>
                                <BarChart
                                    width={500}
                                    height={300}
                                    data={filteredData}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 80,
                                        bottom: 5,
                                    }}
                                    barSize={20}
                                >
                                    <XAxis
                                        dataKey="name"
                                        scale="point"
                                        padding={{ left: 10, right: 10 }}
                                    />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <Bar dataKey="users" fill="#8884d8" background={{ fill: "#eee" }} />
                                </BarChart>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Profit
