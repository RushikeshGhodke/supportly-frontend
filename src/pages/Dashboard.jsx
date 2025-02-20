import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosStats } from "react-icons/io";

const Dashboard = () => {
    const { list, stats } = useSelector((state) => state.complaints);
    const [currentPage, setCurrentPage] = useState(1);
    const complaintsPerPage = 5;

    // Function to Convert Priority Score to Category
    const getPriorityCategory = (score) => {
        if (score >= 1 && score <= 2) return "Low";
        if (score >= 3 && score <= 4) return "Medium";
        return "High";
    };

    // Pagination
    const indexOfLastComplaint = currentPage * complaintsPerPage;
    const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
    const currentComplaints = list.slice(indexOfFirstComplaint, indexOfLastComplaint);
    const totalPages = Math.ceil(list.length / complaintsPerPage);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <section className="w-full mt-16 flex justify-center items-start bg-gray-100">
            <div className="bg-white rounded-xl shadow-lg w-full p-10">
                {/* Dashboard Title & Actions */}
                <div className="flex justify-between items-center mb-7">
                    <h1 className="text-[#0061A1] text-2xl font-semibold">Dashboard</h1>
                    <div className="flex gap-4">
                        {/*<Link to="/complaints/new" className="bg-[#0061A1] text-white py-2 px-4 rounded-md">*/}
                        {/*    + New Complaint*/}
                        {/*</Link>*/}
                        <Link to="/reports" className="bg-gray-800 text-white py-2 px-4 rounded-md">
                            View Reports
                        </Link>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-4 gap-6 mb-6">
                    <div className="bg-blue-100 p-4 rounded-md shadow">
                        <h2 className="text-lg font-semibold">Total Complaints</h2>
                        <p className="text-xl font-bold">{stats.total || 0}</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded-md shadow">
                        <h2 className="text-lg font-semibold">High Priority</h2>
                        <p className="text-xl font-bold">{stats.highPriority || 0}</p>
                    </div>
                    <div className="bg-green-100 p-4 rounded-md shadow">
                        <h2 className="text-lg font-semibold">Resolved</h2>
                        <p className="text-xl font-bold">{stats.resolved || 0}</p>
                    </div>
                    <div className="bg-red-100 p-4 rounded-md shadow">
                        <h2 className="text-lg font-semibold">Pending</h2>
                        <p className="text-xl font-bold">{stats.pending || 0}</p>
                    </div>
                </div>

                {/* Complaints Table with Pagination */}
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <IoIosStats className="mr-2 text-blue-500" /> Recent Complaints
                    </h2>

                    {list.length === 0 ? (
                        <p className="text-gray-500">No complaints found.</p>
                    ) : (
                        <>
                            <table className="w-full border-collapse border border-gray-200">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">Customer</th>
                                    <th className="border p-2">Type</th>
                                    <th className="border p-2">Issue</th>
                                    <th className="border p-2">Priority</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentComplaints.map((complaint, index) => {
                                    const priorityCategory = getPriorityCategory(complaint.priorityScore);

                                    return (
                                        <tr key={index} className="text-center">
                                            <td className="border p-2">{complaint.customerName}</td>
                                            <td className="border p-2">{complaint.type}</td>
                                            <td className="border p-2">{complaint.issue}</td>
                                            <td className="border p-2">
                                                    <span
                                                        className={`px-2 py-1 rounded-md ${
                                                            priorityCategory === "High"
                                                                ? "bg-[#FF7B79] text-[#A22F2E]"
                                                                : priorityCategory === "Medium"
                                                                    ? "bg-[#FFE978] text-[#9B8D0A]"
                                                                    : "bg-[#AEFFC0] text-[#12A70F]"
                                                        }`}
                                                    >
                                                        {priorityCategory}
                                                    </span>
                                            </td>
                                            <td className="border p-2">
                                                    <span
                                                        className={`px-2 py-1 rounded-md ${
                                                            complaint.status === "Resolved"
                                                                ? "bg-[#AEFFC0] text-[#12A70F]"
                                                                : "bg-[#FF7B79] text-[#A22F2E]"
                                                        }`}
                                                    >
                                                        {complaint.status}
                                                    </span>
                                            </td>
                                            <td className="border p-2">
                                                <Link
                                                    to={`/complaints/${complaint.id}`}
                                                    className="text-blue-500 underline"
                                                >
                                                    View
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>

                            {/* Pagination Controls */}
                            <div className="flex justify-between items-center mt-4">
                                <button
                                    onClick={prevPage}
                                    disabled={currentPage === 1}
                                    className={`px-4 py-2 text-white rounded-md ${
                                        currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                >
                                    Previous
                                </button>
                                <span className="text-lg font-semibold">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={nextPage}
                                    disabled={currentPage === totalPages}
                                    className={`px-4 py-2 text-white rounded-md ${
                                        currentPage === totalPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
                                    }`}
                                >
                                    Next
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
