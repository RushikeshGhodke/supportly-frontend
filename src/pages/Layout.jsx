import React from 'react';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import './Layout.css'
import { Outlet } from 'react-router-dom';

const Layout = () => {
    // const { isAuthenticated } = useSelector((state) => state.auth);
    const isAuthenticated = true

    return (
        <div className="layout-container">
            {isAuthenticated && <Sidebar />}
            <div className="main-content">
                {isAuthenticated && <Navbar />}
                <div className="content-area bg-green-600">
                    <Outlet/>
                </div>
            </div>
        </div>
    );
};

export default Layout;
