import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../assets/Gatepass.png'; // Assuming this is your logo

const LandingNavbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <nav className="bg-white shadow-sm py-4 px-6 fixed w-full top-0 z-50">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    {/* <img src={Logo} alt="AI Support" className="h-8 w-auto" /> */}
                    <span className="text-xl font-bold text-[#0061A1]">AI Support</span>
                </div>
                
                <div className="flex items-center space-x-6">
                    <Link to="/" className="text-gray-700 hover:text-[#0061A1]">Home</Link>
                    <Link to="#features" className="text-gray-700 hover:text-[#0061A1]">Features</Link>
                    <Link to="#pricing" className="text-gray-700 hover:text-[#0061A1]">Pricing</Link>
                    
                    {isAuthenticated ? (
                        <button 
                            onClick={() => navigate('/dashboard')} 
                            className="bg-[#0061A1] text-white px-4 py-2 rounded-md hover:bg-[#004b7c] transition"
                        >
                            Dashboard
                        </button>
                    ) : (
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={() => navigate('/login')} 
                                className="text-[#0061A1] border border-[#0061A1] px-4 py-2 rounded-md hover:bg-[#0061A1] hover:text-white transition"
                            >
                                Sign In
                            </button>
                            <button 
                                onClick={() => navigate('/signup')} 
                                className="bg-[#0061A1] text-white px-4 py-2 rounded-md hover:bg-[#004b7c] transition"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default LandingNavbar;