import React from "react";
import Header from "./NavigationBar/Header/Header";
import Footer from "./NavigationBar/Footer/Footer";
import {Outlet} from 'react-router-dom'

function Layout() {
    return (
        <>
        <Header />
         <Outlet />
        <Footer />
        
        </>
    )
}

export default Layout;  