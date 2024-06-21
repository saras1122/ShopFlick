import React, { useEffect } from 'react'
import image2 from '../assest/banner/banner5.jfif'
import AOS from 'aos';
import 'aos/dist/aos.css';
const HomePage1 = () => {
  useEffect(() => {
    AOS.init({
        duration: 1500,
        once: true,
    });
}, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center h-full px-4 md:ml-[89px] md:mr-[89px]">
      <div className="flex-1 md:flex-[2] flex items-center justify-center">
        <div className="relative w-full" data-aos="fade-right">
          <img src={image2} alt="Dinos" className="w-full h-auto object-cover"/>
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-white text-5xl font-bold transform rotate-90 md:rotate-0">DINOS</h1>
          </div>
        </div>
      </div>
      <div className="flex-1 md:flex-[1] p-6 text-center" data-aos="fade-left">
        <h2 className="text-3xl font-semibold mb-4">DINOS</h2>
        <p className="text-base mb-6 px-5">Experience the perfect blend of denim style<br /> and chino comfort</p>
        {/* <a href="/shop" className="text-blue-500 underline">Shop Now</a> */}
      </div>
    </div>
  )
}

export default HomePage1
