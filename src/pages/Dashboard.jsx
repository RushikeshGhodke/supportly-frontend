import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import Card from "../components/ui/Card";
import { FiAlertCircle, FiAlertTriangle, FiCheckCircle, FiUsers } from "react-icons/fi";

const Dashboard = () => {
    const { stats, list } = useSelector((state) => state.complaints);
    const { business } = useSelector((state) => state.onboarding);
    const [recentComplaints, setRecentComplaints] = useState([]);

    // Sort complaints by date (newest first) and take the first 5
    useEffect(() => {
        if (list && list.length) {
            const sorted = [...list].sort((a, b) => {
                return new Date(b.timestamp) - new Date(a.timestamp);
            }).slice(0, 5);
            setRecentComplaints(sorted);
        }
    }, [list]);

    // Chart data for complaints by priority
    const chartData = {
        labels: ["High", "Medium", "Low"],
        datasets: [
            {
                label: "Complaints by Priority",
                data: [stats?.highPriority || 0, stats?.mediumPriority || 0, stats?.lowPriority || 0],
                backgroundColor: ["#ef4444", "#f59e0b", "#10b981"],
            },
        ],
    };

    return (
        <section className="w-full mt-16 min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-[#0061A1]">
                    Welcome, {business?.data?.newOrganization?.businessname || "User"}
                </h1>
                <p className="text-gray-600">
                    Here's an overview of your customer support activities
                </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                <StatCard
                    title="Total Complaints"
                    value={stats?.total || 0}
                    icon={<FiUsers />}
                    color="blue"
                />
                <StatCard
                    title="Pending"
                    value={stats?.pending || 0}
                    icon={<FiAlertTriangle />}
                    color="yellow"
                />
                <StatCard
                    title="High Priority"
                    value={stats?.highPriority || 0}
                    icon={<FiAlertCircle />}
                    color="red"
                />
                <StatCard
                    title="Resolved"
                    value={stats?.resolved || 0}
                    icon={<FiCheckCircle />}
                    color="green"
                />
            </div>

            {/* Main Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recent Complaints */}
                <Card className="lg:col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold">Recent Complaints</h2>
                        <Link to="/complaintsDashboard" className="text-blue-600 hover:underline">
                            View All
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">ID</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Customer</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 hidden md:table-cell">Issue</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Priority</th>
                                    <th className="px-4 py-2 text-left text-sm font-medium text-gray-500">Status</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {recentComplaints.length > 0 ? (
                                    recentComplaints.map((complaint) => (
                                        <tr key={complaint.id}>
                                            <td className="px-4 py-2 whitespace-nowrap">{complaint.id}</td>
                                            <td className="px-4 py-2 whitespace-nowrap">{complaint.customerName}</td>
                                            <td className="px-4 py-2 hidden md:table-cell">
                                                {complaint.issue.length > 30
                                                    ? `${complaint.issue.substring(0, 30)}...`
                                                    : complaint.issue}
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${complaint.priorityScore >= 4 ? "bg-red-100 text-red-800" :
                                                        complaint.priorityScore >= 2 ? "bg-yellow-100 text-yellow-800" :
                                                            "bg-green-100 text-green-800"
                                                    }`}>
                                                    {complaint.priorityScore >= 4 ? "High" :
                                                        complaint.priorityScore >= 2 ? "Medium" : "Low"}
                                                </span>
                                            </td>
                                            <td className="px-4 py-2 whitespace-nowrap">
                                                <span className={`px-2 py-1 text-xs rounded-full ${complaint.status === "Resolved" ? "bg-green-100 text-green-800" :
                                                        complaint.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                                                            "bg-red-100 text-red-800"
                                                    }`}>
                                                    {complaint.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                                            No complaints found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                {/* Chart */}
                <Card>
                    <h2 className="text-xl font-semibold mb-4">Complaints by Priority</h2>
                    <div className="h-64">
                        <Bar
                            data={chartData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                            }}
                        />
                    </div>
                </Card>
            </div>
        </section>
    );
};

// Stat Card Component
const StatCard = ({ title, value, icon, color }) => {
    const colorClasses = {
        blue: "border-blue-500 text-blue-600",
        green: "border-green-500 text-green-600",
        yellow: "border-yellow-500 text-yellow-600",
        red: "border-red-500 text-red-600",
    };

    return (
        <div className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${colorClasses[color] || colorClasses.blue}`}>
            <div className="flex justify-between items-start">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
                    <p className="text-3xl font-bold mt-2">{value}</p>
                </div>
                <div className={`text-2xl ${colorClasses[color] || colorClasses.blue}`}>
                    {icon}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
