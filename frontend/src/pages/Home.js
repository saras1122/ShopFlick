import React, { useEffect } from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'
import VerticalCard from '../components/VerticalCard'
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import Customer from '../components/Customers'
import AOS from 'aos';
import 'aos/dist/aos.css';
import HomePage1 from '../components/HomePage1'
import HomePage2 from '../components/HomePage2'

const Home = () => {

  return (
    <div className='customcolor'>
      <BannerProduct/>
      <CategoryList/>
      <HomePage1/>
      <HomePage2/>
      <br/>
      {/* <HorizontalCardProduct category={"earphones"} heading={"Top airphones"}/> */}
      <CategroyWiseProductDisplay category={"shoes"} heading={"Top Shoes"}/>
      <VerticalCardProduct category={"shoes"} heading={"Top airphones"}/>
      <Customer/>
      <br/>
    </div>
  )
}

export default Home
