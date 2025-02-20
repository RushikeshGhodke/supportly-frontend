import './Sidebar.css'
import {
    FiMenu,
    FiClipboard,
    FiBriefcase,
    FiUser,
    FiChevronDown,
    FiChevronUp,
} from 'react-icons/fi'
import { Link, useNavigate } from 'react-router-dom'
import { BsTicket } from 'react-icons/bs'
import { PiOfficeChair } from 'react-icons/pi'
import { MdBook, MdOutlineModelTraining } from 'react-icons/md'
import { useState } from 'react'
import { FaChalkboardTeacher, FaUserAlt } from 'react-icons/fa'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { IoIosGrid } from 'react-icons/io'
import { GiSkills } from 'react-icons/gi'
import { TbSubtask } from 'react-icons/tb'
import { BsListTask } from 'react-icons/bs'
import { GrOverview } from "react-icons/gr"
import { SiSimpleanalytics } from "react-icons/si";
import { FaArrowTrendUp } from "react-icons/fa6";
import { TbAutomation } from "react-icons/tb";
import { FiSettings } from "react-icons/fi";
import { TbReportSearch } from "react-icons/tb";
import { AiOutlineTeam } from "react-icons/ai";
import { GrIntegration } from "react-icons/gr";
import { IoMdHelp } from "react-icons/io";
import { MdOutlineSpaceDashboard } from "react-icons/md";


// Utility to map icon strings to actual icon components
const iconMap = {
    FiClipboard: <FiClipboard size={22} color="white" />,
    FiBriefcase: <FiBriefcase size={22} color="white" />,
    FiUser: <FiUser size={22} color="white" />,
    BsTicket: <BsTicket size={22} color="white" />,
    PiOfficeChair: <PiOfficeChair size={22} color="white" />,
    MdOutlineModelTraining: <MdOutlineModelTraining size={22} color="white" />,
    MdBook: <MdBook size={22} color="white" />,
    FaUserAlt: <FaUserAlt size={22} color="white" />,
    FaChalkboardTeacher: <FaChalkboardTeacher size={22} color="white" />,
    GiSkills: <GiSkills size={22} color="white" />,
    AiOutlineCheckCircle: <AiOutlineCheckCircle size={22} color="white" />,
    IoIosGrid: <IoIosGrid size={22} color="white" />,
    TbSubtask: <TbSubtask size={22} color="white" />,
    BsListTask: <BsListTask size={22} color="white" />,
    GrOverview: <GrOverview size={22} color="white" />,
    SiSimpleanalytics: <SiSimpleanalytics size={18} color="white" />,
    FaArrowTrendUp: <FaArrowTrendUp size={22} color="white" />,
    TbAutomation : <TbAutomation  size={22} color="white" />,
    FiSettings: <FiSettings size={22} color="white" />,
    TbReportSearch: <TbReportSearch size={22} color="white" />,
    AiOutlineTeam: <AiOutlineTeam size={22} color="white" />,
    GrIntegration: <GrIntegration size={18} color="white" />,
    IoMdHelp: <IoMdHelp size={18} color="white" />,
    MdOutlineSpaceDashboard: <MdOutlineSpaceDashboard size={22} color="white" />,
}

const Sidebar = () => {
    const navigate = useNavigate()
    const [openSection, setOpenSection] = useState(null)
    const [employeeAccess1, setEmployeeAccess1] = useState('0')
    const [trainerAccess, setTrainerAccess] = useState('0')

    //   const access = useSelector(
    //     (state) => state?.auth?.user?.employeeAccess
    //   ).split(',')

    const access = '11111111111111111111111111111111,11111111111111111111111111111111,11111111111111111111111111111111,11111111111111111111111111111111'.split(',')


    const HRManagementAccess = access[0]
    const ProjectManagementAccess = access[1]
    const TrainingManagementAccess = access[2]
    const TicketManagementAccess = access[3]

    const toggleSection = (section) => {
        setOpenSection((prev) => (prev === section ? null : section))
    }

    const closeSubmenus = () => {
        setOpenSection(null)
    }

    const navItems = [
        {
            name: 'Dashboard',
            access: HRManagementAccess[0],
            icon: 'MdOutlineSpaceDashboard',
            children: [
                {
                    name: 'Overview',
                    slug: '/employees',
                    icon: 'GrOverview',
                    access: HRManagementAccess[1],
                },
                {
                    name: 'Analytics & Insights',
                    slug: '/departments',
                    icon: 'SiSimpleanalytics',
                    access: HRManagementAccess[2],
                },
                {
                    name: 'Complaint Trends',
                    slug: '/designations',
                    icon: 'FaArrowTrendUp',
                    access: HRManagementAccess[3],
                },
            ],
        },
        {
            name: 'Complaints Management',
            access: ProjectManagementAccess[0],
            icon: 'TbSubtask',
            children: [
                {
                    name: 'All Complaints',
                    slug: '/manageEmployees',
                    icon: 'BsListTask',
                    access: ProjectManagementAccess[0],
                },
                {
                    name: 'Search & Filters',
                    slug: '/allProjects',
                    icon: 'BsListTask',
                    access: ProjectManagementAccess[0],
                },
                {
                    name: 'Pending Complaints',
                    slug: '/allProjects',
                    icon: 'BsListTask',
                    access: ProjectManagementAccess[0],
                },
                {
                    name: 'Resolved Complaints',
                    slug: '/allProjects',
                    icon: 'BsListTask',
                    access: ProjectManagementAccess[0],
                },
                {
                    name: 'High-Priority Complaints',
                    slug: '/allProjects',
                    icon: 'BsListTask',
                    access: ProjectManagementAccess[0],
                },
            ],
        },
        {
            name: 'AI & Automation',
            icon: 'TbAutomation',
            access: TicketManagementAccess[0],
            children: [
                {
                    name: 'AI Complaint Classification',
                    slug: '/createTicket',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'AI Suggested Replies',
                    slug: '/tickettracking',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'Priority Assignment',
                    slug: '/dashboard/1',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'AI Configuration',
                    slug: '/dashboard/2',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[1],
                },
            ],
        },
        {
            name: 'Channels & Integrations',
            icon: 'GrIntegration',
            access: TicketManagementAccess[0],
            children: [
                {
                    name: 'Web Form',
                    slug: '/createTicket',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'Email Support',
                    slug: '/createTicket',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'WhatsApp',
                    slug: '/tickettracking',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'Chatbot',
                    slug: '/dashboard/1',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'CRM API',
                    slug: '/dashboard/2',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[1],
                },
            ],
        },
        {
            name: 'Agents & Teams',
            icon: 'AiOutlineTeam',
            access: TicketManagementAccess[0],
            children: [
                {
                    name: 'Manage Support Agents',
                    slug: '/createTicket',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'Assign Complaints',
                    slug: '/createTicket',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'Escalation Rules',
                    slug: '/tickettracking',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
            ],
        },
        {
            name: 'Reports & Logs',
            icon: 'TbReportSearch',
            access: TicketManagementAccess[0],
            children: [
                {
                    name: 'Monthly Performance Reports',
                    slug: '/createTicket',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'Complaint Resolution Time',
                    slug: '/createTicket',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'Audit Logs',
                    slug: '/tickettracking',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
            ],
        },
        {
            name: 'Settings',
            icon: 'FiSettings',
            access: TicketManagementAccess[0],
            children: [
                {
                    name: 'User Roles & Permissions',
                    slug: '/createTicket',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'API Keys & Webhooks',
                    slug: '/createTicket',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'Localization & Language',
                    slug: '/tickettracking',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
            ],
        },
        {
            name: 'Documentation & Help',
            icon: 'IoMdHelp',
            access: TicketManagementAccess[0],
            children: [
                {
                    name: 'API Docs',
                    slug: '/createTicket',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'User Guide',
                    slug: '/createTicket',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
                {
                    name: 'Contact Support',
                    slug: '/tickettracking',
                    icon: 'BsTicket',
                    access: TicketManagementAccess[0],
                },
            ],
        },
    ]

    return (
        <div className="sidebar" onMouseLeave={closeSubmenus}>
            <div>
                <FiMenu className="menu-icon" size={22} color="white" />
                <div className="menu">
                    {navItems.map(
                        (item) =>
                            item.access === '1' && (
                                <div key={item.name}>
                                    <div
                                        className="icon-container main-item"
                                        onClick={() => item.children && toggleSection(item.name)}
                                    >
                                        <div className="main-item-content">
                                            {iconMap[item.icon]}
                                            <span className="menu-text">{item.name}</span>
                                        </div>
                                        {item.children && (
                                            <span className="chevron">
                                                {openSection === item.name ? (
                                                    <FiChevronUp size={18} color="white" />
                                                ) : (
                                                    <FiChevronDown size={18} color="white" />
                                                )}
                                            </span>
                                        )}
                                    </div>
                                    {item.children && (
                                        <div
                                            className={`submenu ${openSection === item.name ? 'expanded' : ''
                                                }`}
                                        >
                                            {item.children.map(
                                                (child) =>
                                                    child.access === '1' && (
                                                        <Link
                                                            key={child.name}
                                                            to={child.slug}
                                                            className="icon-container"
                                                        >
                                                            {iconMap[child.icon]}
                                                            <span className="menu-text">{child.name}</span>
                                                        </Link>
                                                    )
                                            )}
                                        </div>
                                    )}
                                </div>
                            )
                    )}
                </div>
            </div>
            <div>
                {/* <LogoutButton /> */}
            </div>
        </div>
    )
}

export default Sidebar