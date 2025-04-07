import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { FiBell, FiUser, FiSettings, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { logoutUser } from '../redux/slices/authSlice';
import Gatepass from '../assets/Gatepass.png';

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.auth);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef(null);

    const handleLogout = async () => {
        if (window.confirm('Are you sure you want to log out?')) {
            await dispatch(logoutUser());
            navigate('/');
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setShowUserMenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [userMenuRef]);

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

                {/* User Profile Dropdown */}
                <div className="relative" ref={userMenuRef}>
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => setShowUserMenu(!showUserMenu)}
                    >
                        <div className="bg-[#0061A1] text-white rounded-full h-8 w-8 flex items-center justify-center">
                            <FiUser />
                        </div>
                        <span className="text-gray-700 font-medium hidden sm:inline">{user?.fullname || 'User'}</span>
                        <FiChevronDown className={`text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                    </div>

                    {/* Dropdown Menu */}
                    {showUserMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                            <div className="px-4 py-2 border-b">
                                <p className="text-sm font-medium">{user?.fullname}</p>
                                <p className="text-xs text-gray-500">{user?.email}</p>
                            </div>
                            <Link
                                to="/profile"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setShowUserMenu(false)}
                            >
                                Your Profile
                            </Link>
                            <Link
                                to="/settings"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={() => setShowUserMenu(false)}
                            >
                                Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                Sign out
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;