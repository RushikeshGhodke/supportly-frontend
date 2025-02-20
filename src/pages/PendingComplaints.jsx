import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoIosStats } from "react-icons/io";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

const PendingComplaints = () => {
    const { list } = useSelector((state) => state.complaints);
    const [currentPage, setCurrentPage] = useState(1);
    const complaintsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState("");
    const [customerFilter, setCustomerFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    // Convert Priority Score to Category
    const getPriorityCategory = (score) => {
        if (score >= 1 && score <= 2) return "Low";
        if (score >= 3 && score <= 4) return "Medium";
        return "High";
    };

    // Filter complaints (Only Pending)
    const filteredComplaints = list.filter((complaint) => {
        if (complaint.status !== "Pending") return false;
        if (searchTerm && !complaint.issue.toLowerCase().includes(searchTerm.toLowerCase())) return false;
        if (customerFilter && complaint.customerName !== customerFilter) return false;
        if (dateFilter && complaint.timestamp.split(" ")[0] !== dateFilter) return false;
        return true;
    });

    // Pagination Logic
    const indexOfLastComplaint = currentPage * complaintsPerPage;
    const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
    const currentComplaints = filteredComplaints.slice(indexOfFirstComplaint, indexOfLastComplaint);
    const totalPages = Math.ceil(filteredComplaints.length / complaintsPerPage);

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
                {/* Header with Export & Search */}
                <div className="flex justify-between items-center mb-7">
                    <h1 className="text-[#0061A1] text-2xl font-semibold">Pending Complaints</h1>
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

                {/* Filters */}
                <div className="flex space-x-4 mb-6">
                    <input type="date" className="border px-4 py-2 rounded-md" onChange={(e) => setDateFilter(e.target.value)} />
                    <select className="border px-4 py-2 rounded-md" onChange={(e) => setCustomerFilter(e.target.value)}>
                        <option value="">All Customers</option>
                        {[...new Set(list.map((c) => c.customerName))].map((customer, index) => (
                            <option key={index} value={customer}>
                                {customer}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Complaints Table */}
                <div className="bg-gray-100 p-4 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 flex items-center">
                        <IoIosStats className="mr-2 text-blue-500" /> Pending Complaints
                    </h2>

                    {currentComplaints.length === 0 ? (
                        <p className="text-gray-500">No pending complaints found.</p>
                    ) : (
                        <>
                            <table className="w-full border-collapse border border-gray-200">
                                <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">ID</th>
                                    <th className="border p-2">Issue</th>
                                    <th className="border p-2">Priority</th>
                                    <th className="border p-2">Customer</th>
                                    <th className="border p-2">Date</th>
                                    <th className="border p-2">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {currentComplaints.map((complaint) => {
                                    const priorityCategory = getPriorityCategory(complaint.priorityScore);
                                    return (
                                        <tr key={complaint.id} className="text-center">
                                            <td className="border p-2">{complaint.id}</td>
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
                                            <td className="border p-2">{complaint.customerName}</td>
                                            <td className="border p-2">{complaint.timestamp}</td>
                                            <td className="border p-2">
                                                <Link to={`/complaints/${complaint.id}`} className="text-blue-500 underline">
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
                                <button onClick={prevPage} disabled={currentPage === 1} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                                    Previous
                                </button>
                                <span className="text-lg font-semibold">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button onClick={nextPage} disabled={currentPage === totalPages} className="px-4 py-2 bg-blue-600 text-white rounded-md">
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

export default PendingComplaints;
