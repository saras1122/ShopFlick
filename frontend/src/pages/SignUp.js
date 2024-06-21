import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const SignUp = () => {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    email: "", password: ""
  });
  const pass = (prev) => {
    setShowPassword(!showPassword);
  }
  const confirmpass = (prev) => {
    setShowConfirmPassword(!showConfirmPassword);
  }
  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dataResponse = await fetch(SummaryApi.signUP.url, {
      method: SummaryApi.signUP.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)
    })
    const dataApi = await dataResponse.json()
    if (dataApi.success) {
      toast.success(dataApi.message)
      navigate("/login")
    }
  }

  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>
        <div className='bg-white p-5 w-full max-w-md mx-auto rounded'>
          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcons} alt='login-icons' />
          </div>

          <form onSubmit={handleSubmit}>
            <div className='grid'>
              <label>Name: </label>
              <div className='bg-slate-200 p-2 '>
                <input
                  className='w-full h-full outline-none bg-transparent'
                  name='name'
                  value={data.name}
                  onChange={handleOnChange}
                  type='text' placeholder='Enter Name' />

              </div>
            </div>
            <div className='grid'>
              <label>Email: </label>
              <div className='bg-slate-200 p-2 '>
                <input
                  className='w-full h-full outline-none bg-transparent'
                  name='email'
                  onChange={handleOnChange}
                  value={data.email}
                  type='email' placeholder='Enter Email' />

              </div>
            </div>

            <div>
              <label>Password: </label>
              <div className='bg-slate-200 p-2 flex'>
                <input
                  type={showPassword ? "text" : "password"}
                  value={data.password}
                  name='password'
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent' placeholder='Enter password' />
                <div className='cursor-pointer text-xl' onClick={pass}>
                  <span>
                    {
                      showPassword ? (
                        <FaEyeSlash />
                      )
                        :
                        (
                          <FaEye />
                        )
                    }
                  </span>
                </div>
              </div>
            </div>
            <div>
              <label>Confirm Password: </label>
              <div className='bg-slate-200 p-2 flex'>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={data.confirmpassword}
                  name='confirmpassword'
                  onChange={handleOnChange}
                  className='w-full h-full outline-none bg-transparent' placeholder='Enter password' />
                <div className='cursor-pointer text-xl' onClick={confirmpass}>
                  <span>
                    {
                      showConfirmPassword ? (
                        <FaEyeSlash />
                      )
                        :
                        (
                          <FaEye />
                        )
                    }
                  </span>
                </div>
              </div>
            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>
              Sign Up
            </button>
          </form>

          <p className='my-5'>Already have account ? <Link to={"/login"} className=' text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignUp
