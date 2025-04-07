import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiBell, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { logoutUser } from '../redux/slices/authSlice';
import Gatepass from '../assets/Gatepass.png';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to log out?')) {
            await dispatch(logoutUser());
            navigate('/');
        }
    };

    return (
        <div className="bg-white shadow-sm flex justify-between items-center p-4 fixed top-0 right-0 left-14 z-10 h-16">
            <div>
                <h1 className="text-xl font-semibold text-gray-800">Customer Support Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
                {/* Notifications */}
                <div className="relative">
                    <FiBell className="text-gray-600 w-6 h-6 cursor-pointer hover:text-[#0061A1]" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                        3
                    </span>
                </div>

                {/* User Profile */}
                <div className="flex items-center space-x-2">
                    <div className="bg-[#0061A1] text-white rounded-full h-8 w-8 flex items-center justify-center">
                        <FiUser />
                    </div>
                    <span className="text-gray-700 font-medium">{user?.fullname || 'User'}</span>
                </div>

                {/* Settings */}
                <div>
                    <FiSettings className="text-gray-600 w-6 h-6 cursor-pointer hover:text-[#0061A1]" />
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="flex items-center text-gray-600 hover:text-[#0061A1]"
                    title="Logout"
                >
                    <FiLogOut className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Navbar;