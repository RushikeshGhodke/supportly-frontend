import React from 'react'
import { FiUser } from 'react-icons/fi'
import Gatepass from '../assets/Gatepass.png'

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center pl-16 pr-5 py-2 shadow-md bg-white fixed w-full z-8'>
            <img src={Gatepass} width={120} alt="Gatepass" />
            <FiUser size={38} className='bg-[#0061A1] rounded-full text-white p-2'/>
        </nav>
    )
}

export default Navbar