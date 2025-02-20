import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoIosStats } from "react-icons/io";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ComplaintsDashboard = () => {
    const { list, stats } = useSelector((state) => state.complaints);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const complaintsPerPage = 5;
    const [filter, setFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [customerFilter, setCustomerFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    // Function to convert priorityScore to categories
    const getPriorityCategory = (score) => {
        if (score >= 1 && score <= 2) return "Low";
        if (score >= 3 && score <= 4) return "Medium";
        return "High";
    };

    // Filtering complaints
    const filteredComplaints = list.filter((complaint) => {
        if (filter !== "All" && complaint.status !== filter) return false;
        if (priorityFilter !== "All" && getPriorityCategory(complaint.priorityScore) !== priorityFilter) return false;
        if (searchTerm && !complaint.issue.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        if (customerFilter && complaint.customerName !== customerFilter) return false;
        if (dateFilter && !complaint.timestamp.includes(dateFilter)) return false;
        return true;
    });

    const indexOfLastComplaint = currentPage * complaintsPerPage;
    const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
    const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);
    const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

    // Pagination Functions
    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };
    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    // Function to Download as Excel
    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredComplaints);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Pending Complaints");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        saveAs(data, "pending_complaints.xlsx");
    };

    // Function to Download as PDF
    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text("Pending Complaints Report", 14, 10);
        const tableData = filteredComplaints.map((complaint) => [
            complaint.id,
            complaint.issue,
            getPriorityCategory(complaint.priorityScore),
            complaint.customerName,
            complaint.timestamp,
        ]);
        doc.autoTable({
            head: [["ID", "Issue", "Priority", "Customer", "Date"]],
            body: tableData,
        });
        doc.save("pending_complaints.pdf");
    };

    return (
        <section className="w-full mt-16 flex justify-center items-start bg-gray-100">
            <div className="bg-white rounded-xl shadow-lg w-full p-10">

                {/* HEADER: Download & Search */}
                <div className="flex justify-between items-center mb-7">
                    <h1 className="text-[#0061A1] text-2xl font-semibold">All Complaints</h1>
                    <div className="flex gap-4">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md" onClick={downloadPDF}>
                            Download PDF
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md" onClick={downloadExcel}>
                            Download Excel
                        </button>
                        <input
                            type="text"
                            placeholder="Search complaints..."
                            className="border px-4 py-2 rounded-md"
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* FILTERS */}
                <div className="flex space-x-4 mb-6">
                    <input type="date" className="border px-4 py-2 rounded-md"
                           onChange={(e) => setDateFilter(e.target.value)}/>
                    <select className="border px-4 py-2 rounded-md" onChange={(e) => setCustomerFilter(e.target.value)}>
                        <option value="">All Customers</option>
                        {[...new Set(list.map((c) => c.customerName))].map((customer, index) => (
                            <option key={index} value={customer}>
                                {customer}
                            </option>
                        ))}
                    </select>
                    <select className="border px-4 py-2 rounded-md" onChange={(e) => setPriorityFilter(e.target.value)}>
                        <option value="All">All Priorities</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>

                {/* KPI CARDS */}
                <div className="grid grid-cols-3 gap-6 mb-6">
                    <div
                        className={`cursor-pointer p-4 rounded-md shadow ${
                            filter === "Pending" ? "bg-yellow-300" : "bg-yellow-100"
                        }`}
                        onClick={() => setFilter(filter === "Pending" ? "All" : "Pending")}
                    >
                        <h2 className="text-lg font-semibold">Pending Complaints</h2>
                        <p className="text-xl font-bold">{stats.pending || 0}</p>
                    </div>
                    <div
                        className={`cursor-pointer p-4 rounded-md shadow ${
                            filter === "Resolved" ? "bg-green-300" : "bg-green-100"
                        }`}
                        onClick={() => setFilter(filter === "Resolved" ? "All" : "Resolved")}
                    >
                        <h2 className="text-lg font-semibold">Resolved Complaints</h2>
                        <p className="text-xl font-bold">{stats.resolved || 0}</p>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <IoIosStats className="mr-2 text-blue-500" /> {filter === "All" ? "All Complaints" : `${filter} Complaints`}
                    </h2>

                    {currentComplaints.length === 0 ? (
                        <p className="text-gray-500">No complaints found.</p>
                    ) : (
                        <>
                            <table className="w-full border-collapse border border-gray-200">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">ID</th>
                                    <th className="border p-2">Customer</th>
                                    <th className="border p-2">Type</th>
                                    <th className="border p-2">Issue</th>
                                    <th className="border p-2">Priority</th>
                                    <th className="border p-2">Status</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentComplaints.map((complaint) => (
                                    <tr key={complaint.id}>
                                        <td className="border p-2">{complaint.id}</td>
                                        <td className="border p-2">{complaint.customerName}</td>
                                        <td className="border p-2">{complaint.type}</td>
                                        <td className="border p-2">{complaint.issue}</td>
                                        <td className="border p-2">{getPriorityCategory(complaint.priorityScore)}</td>
                                        <td className="border p-2">{complaint.status}</td>
                                        <td className="border p-2">
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded-md"
                                                onClick={() => navigate(`/complaints/${complaint.id}`)}
                                            >
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            {/* PAGINATION CONTROLS */}
                            <div className="flex justify-between items-center mt-4">
                                <button onClick={prevPage} disabled={currentPage === 1} className="bg-blue-600 text-white px-4 py-2 rounded-md">
                                    Previous
                                </button>
                                <span className="text-lg font-semibold">Page {currentPage} of {totalPages}</span>
                                <button onClick={nextPage} disabled={currentPage === totalPages} className="bg-blue-600 text-white px-4 py-2 rounded-md">
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

export default ComplaintsDashboard;
