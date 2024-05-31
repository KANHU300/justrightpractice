import React from 'react'
import Header from '../../Component/Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../../Component/Footer/Footer'

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout