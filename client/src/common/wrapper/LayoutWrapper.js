import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'
import Header from '../header/Header'

const LayoutWrapper = () => {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default LayoutWrapper