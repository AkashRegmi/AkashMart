import React from 'react'
import Navbar from '../components/Navbar'
import Carousel from "../pages/Carousel"
import Products from './Products'
import FeaturedProducts from './FeaturedProducts'

const Home = () => {
  return (
  <>
  <Navbar/>
  <Carousel/>
  <FeaturedProducts/>
  </>
  )
}

export default Home
