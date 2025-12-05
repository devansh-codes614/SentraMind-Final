import React from 'react'
import { Outlet } from "react-router";
import Footer from "./Components/Footer/Footer"
import Navbar from './Components/Navbar/Navbar'
import Disclaimer from './Components/Home/Disclaimer';
import Header from "./Components/Home/header"
import Blog from './Components/Home/Blog'
import Cards from "./Components/Home/Cards"
import Sentiment from './Components/Sentiment/Sentiment';
import Possibility from './Components/Home/Possibility/Possibility';



const Layout = () => {
  return (
    <>
        <Navbar/>
        
        <div id='home'><Header /></div>
        <div id='sentiment'><Sentiment/></div>
        <Outlet/>
        <Possibility/>
        <div id='cards'><Cards/></div>
        <Blog/>
        <Disclaimer/>
        <Footer/>
    </>
  )
}

export default Layout