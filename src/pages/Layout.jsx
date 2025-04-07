import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from '../redux/slices/authSlice';
import Sidebar from '../components/Sidebar.jsx';
import Navbar from '../components/Navbar.jsx';
import './Layout.css';
import { Outlet, useNavigate } from 'react-router-dom';

const Layout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuth())
            .unwrap()
            .catch(() => {
                navigate('/login');
            });
    }, [dispatch, navigate]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0061A1]"></div>
            </div>
        );
    }

    return (
        <div className="layout-container">
            {isAuthenticated && <Sidebar />}
            <div className="main-content">
                {isAuthenticated && <Navbar />}
                <div className="content-area">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
