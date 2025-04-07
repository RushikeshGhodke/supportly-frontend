import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiMenu, FiX } from 'react-icons/fi';
import Button from '../components/ui/Button';

const LandingNavbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when navigating or clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isMenuOpen && !e.target.closest('.navbar-container')) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [isMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMenuOpen]);

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-300 navbar-container
            ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center z-20">
                        <Link to="/" className={`text-xl font-bold ${scrolled ? 'text-[#0061A1]' : 'text-[#0061A1]'}`}>
                            AI Support
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link
                            to="/#features"
                            className={`${scrolled ? 'text-gray-700' : 'text-gray-800'} hover:text-[#0061A1] transition`}
                        >
                            Features
                        </Link>
                        <Link
                            to="/#pricing"
                            className={`${scrolled ? 'text-gray-700' : 'text-gray-800'} hover:text-[#0061A1] transition`}
                        >
                            Pricing
                        </Link>
                        <Link
                            to="/blog"
                            className={`${scrolled ? 'text-gray-700' : 'text-gray-800'} hover:text-[#0061A1] transition`}
                        >
                            Blog
                        </Link>
                        <Link
                            to="/documentation"
                            className={`${scrolled ? 'text-gray-700' : 'text-gray-800'} hover:text-[#0061A1] transition`}
                        >
                            Docs
                        </Link>

                        {isAuthenticated ? (
                            <Button
                                onClick={() => navigate('/dashboard')}
                                variant="primary"
                                size="sm"
                                className="ml-4"
                            >
                                Dashboard
                            </Button>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Button
                                    onClick={() => navigate('/login')}
                                    variant="secondary"
                                    size="sm"
                                >
                                    Sign In
                                </Button>
                                <Button
                                    onClick={() => navigate('/signup')}
                                    variant="primary"
                                    size="sm"
                                >
                                    Start Free
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-700 p-2 z-20"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <FiX size={24} className={scrolled ? 'text-gray-700' : 'text-gray-800'} />
                        ) : (
                            <FiMenu size={24} className={scrolled ? 'text-gray-700' : 'text-gray-800'} />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`md:hidden fixed inset-0 bg-white z-10 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full pt-20 px-6">
                    <Link
                        to="/#features"
                        className="py-4 text-lg border-b border-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Features
                    </Link>
                    <Link
                        to="/#pricing"
                        className="py-4 text-lg border-b border-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Pricing
                    </Link>
                    <Link
                        to="/blog"
                        className="py-4 text-lg border-b border-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Blog
                    </Link>
                    <Link
                        to="/documentation"
                        className="py-4 text-lg border-b border-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Documentation
                    </Link>

                    <div className="mt-8 flex flex-col gap-4">
                        {isAuthenticated ? (
                            <Button
                                onClick={() => {
                                    setIsMenuOpen(false);
                                    navigate('/dashboard');
                                }}
                                fullWidth
                            >
                                Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        navigate('/login');
                                    }}
                                    variant="secondary"
                                    fullWidth
                                >
                                    Sign In
                                </Button>
                                <Button
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        navigate('/signup');
                                    }}
                                    fullWidth
                                >
                                    Start Free Trial
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default LandingNavbar;