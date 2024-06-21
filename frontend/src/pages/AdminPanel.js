import React, { useEffect } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user);
    const navigate = useNavigate();

    useEffect(() => {
        navigate('all-users');
    }, [navigate]);

    return (
        <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
            <aside className='ml-2 mt-5 bg-white min-h-full rounded-lg w-full max-w-60 customShadow'>
                <div className='h-32 bg-cyan-500 rounded-lg flex justify-center items-center flex-col'>
                    <div className='text-5xl cursor-pointer relative flex justify-center'>
                        <FaRegUserCircle />
                    </div>

                    <p className='capitalize text-lg font-semibold'>
                        {user?.name}
                    </p>
                    <p className='text-sm text-pretty'>
                        ADMIN
                    </p>
                </div>
                <div>
                    <nav className='grid p-4'>
                        <NavLink
                            to="all-users"
                            className={({ isActive }) => isActive ? 'px-2 py-1 bg-slate-300' : 'px-2 py-1 hover:bg-slate-100'}
                        >
                            All Users
                        </NavLink>
                        <NavLink
                            to="all-products"
                            className={({ isActive }) => isActive ? 'px-2 py-1 bg-slate-300' : 'px-2 py-1 hover:bg-slate-100'}
                        >
                            All Products
                        </NavLink>
                        <NavLink
                            to="edit-productStatus"
                            className={({ isActive }) => isActive ? 'px-2 py-1 bg-slate-300' : 'px-2 py-1 hover:bg-slate-100'}
                        >
                            Product Status
                        </NavLink>
                        <NavLink
                            to="charts"
                            className={({ isActive }) => isActive ? 'px-2 py-1 bg-slate-300' : 'px-2 py-1 hover:bg-slate-100'}
                        >
                            Sales Analysis
                        </NavLink>
                        <NavLink
                            to="delivery-analysis"
                            className={({ isActive }) => isActive ? 'px-2 py-1 bg-slate-300' : 'px-2 py-1 hover:bg-slate-100'}
                        >
                            CityWise Analysis
                        </NavLink>
                        <NavLink
                            to="category-analysis"
                            className={({ isActive }) => isActive ? 'px-2 py-1 bg-slate-300' : 'px-2 py-1 hover:bg-slate-100'}
                        >
                            Category Analysis
                        </NavLink>
                        <NavLink
                            to="profit"
                            className={({ isActive }) => isActive ? 'px-2 py-1 bg-slate-300' : 'px-2 py-1 hover:bg-slate-100'}
                        >
                            Profit Analysis
                        </NavLink>
                    </nav>
                </div>
            </aside>

            <main className='w-full h-full p-4'>
                <Outlet />
            </main>
        </div>
    );
}

export default AdminPanel;
