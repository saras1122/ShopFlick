import React, { useContext, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import { RiFolderHistoryLine } from "react-icons/ri";
import { TbHexagonLetterS } from "react-icons/tb";
import Context from '../context';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  }

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  }

  const handleClick = (e) => {
    if (user?.role === 'ADMIN') {
      // Allow navigation
      navigate('/admin-panel');
    } else {
      // Prevent default link action and show toast
      e.preventDefault();
      toast.error("You do not have permission to access this page.");
    }
  };

  return (
    <header className='h-16 shadow-md bg-black fixed w-full z-40'>
      <div className='container mx-auto flex items-center px-4 md:px-6 justify-between'>
        <div className='flex items-center'>
          <TbHexagonLetterS size={63} style={{ fill: '#E6990B' }} />
          <p className='font-extrabold text-2xl ml-1' style={{ fontFamily: "Hansen", lineHeight: '70px', letterSpacing: '2px', color: "#E6990B" }}>
            SHOPFLICK
          </p>
        </div>
        <div className='hidden md:flex items-center gap-10'>
          <Link to={"/"} className='text-white hover-style3' style={{ fontFamily: "Hansen", letterSpacing: '2px' }}>
            HOME
          </Link>
          <Link to={"/history"} className='text-white hover-style3' style={{ fontFamily: "Hansen", letterSpacing: '2px' }}>
            ORDERS
          </Link>
          <Link to={"/cart"} className='text-white hover-style3' style={{ fontFamily: "Hansen", letterSpacing: '2px' }}>
            CART
          </Link>
          <Link to="/admin-panel" className='text-white hover-style3' style={{ fontFamily: "Hansen", letterSpacing: '2px' }}>
            SHOES
          </Link>
          <Link
            to="/admin-panel"
            onClick={handleClick}
            className='text-white hover-style3'
            style={{ fontFamily: "Hansen", letterSpacing: '2px' }}
          >
            ADMIN
          </Link>
        </div>
        <div className='flex items-center lg:w-1/3 max-w-sm border rounded-full focus-within:shadow-md pl-2 lg:flex'>
          <input className='w-full outline-none bg-black text-white' type='text' placeholder='Search here...' onChange={handleSearch} value={search} />
          <div className='text-lg min-w-[50px] h-8 flex items-center justify-center rounded-r-full text-white' style={{ background: '#E6990B' }}>
            <FaSearch />
          </div>
        </div>
        <div className='flex items-center'>
          {user?._id ? (
            <button onClick={handleLogout} className='px-6 py-1 rounded-full text-white font-semibold hover-style2 border border-white mr-3' style={{ fontFamily: "Hansen", letterSpacing: '2px' }}>
              Logout
            </button>
          ) : (
            <Link to={"/login"} className='px-6 py-1 rounded-full text-white font-semibold hover-style2 border border-white mr-3' style={{ fontFamily: "Hansen", letterSpacing: '2px' }}>Login</Link>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header;
