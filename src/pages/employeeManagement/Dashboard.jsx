import React from 'react'
import { FiPlus, FiPlusCircle, FiUser } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {

  const navigate = useNavigate();

  return (
    <div>
      <div className='flex justify-between items-end'>

        {/* Infocard */}
        <div className='bg-[#0061A1] text-white px-4 py-2 rounded-md flex gap-2 items-start w-max'>
          <FiUser size={38} />
          <div className='flex flex-col items-end'>
            <p className='text-3xl font-semibold'>150</p>
            <p className='text-base'>All Employees</p>
          </div>
        </div>

        <div>
          <button className='cursor-pointer flex items-center text-[#0061A1] text-base font-semibold gap-2 border-2 p-3 rounded-lg' onClick={() => navigate('/addEmployee')}> <FiPlusCircle size={20} /> Add Employee</button>
        </div>
      </div>
    </div>
  )
}

export default Dashboard