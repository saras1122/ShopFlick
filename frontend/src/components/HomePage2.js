import React, { useEffect } from 'react'
import image2 from '../assest/banner/banner6.jfif'
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage2 = () => {
    useEffect(() => {
        AOS.init({
            duration: 1500,
            once: true,
        });
    }, []);
    return (
        <div className="flex flex-col md:flex-row items-center justify-center h-full px-4 md:ml-[89px] mt-[50px] md:mr-[89px]">
            <div className="flex-1 md:flex-[1] p-6 text-center" data-aos="fade-right">
                <p className="text-base mb-6 px-5">Buy 1, Get 1 Free! The best value offers of<br /> this season!</p>
                {/* <a href="/shop" className="text-blue-500 underline">Shop Now</a> */}
            </div>
            <div className="flex-1 md:flex-[2] flex items-center justify-center">
                <div className="relative w-full" data-aos="fade-left">
                    <img src={image2} alt="Dinos" className="w-full h-auto object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <h1 className="text-white text-5xl font-bold transform rotate-90 md:rotate-0">DINOS</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage2
