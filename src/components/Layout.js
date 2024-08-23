import React from 'react'
import Header from './helper/Header'
import Sidebar from './helper/Sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
     <Header/>
     <Sidebar/>
     <Outlet/>
    </>
  )
}

export default Layout;