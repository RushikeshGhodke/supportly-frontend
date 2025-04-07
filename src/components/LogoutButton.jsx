import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(state => state.auth);

  const handleLogout = async () => {
    if (window.confirm('Are you sure you want to log out?')) {
      await dispatch(logoutUser());
      navigate('/login');
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="flex items-center text-white py-2 px-4 rounded-md hover:bg-[#004b7c] transition"
    >
      <FiLogOut size={18} className="mr-2" />
      <span className="menu-text">Logout</span>
    </button>
  );
};

export default LogoutButton;