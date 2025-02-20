import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const Reports = () => {
    const { stats, list } = useSelector((state) => state.complaints);
    const [activeTab, setActiveTab] = useState("priority"); // Default tab: Priority Distribution

    // Bar Chart Data (Priority-wise Complaints)
    const barData = {
        labels: ["High Priority", "Medium Priority", "Low Priority"],
        datasets: [
            {
                label: "Complaints by Priority",
                data: [stats.highPriority || 0, stats.mediumPriority || 0, stats.lowPriority || 0],
                backgroundColor: ["#EF4444", "#FACC15", "#22C55E"],
                borderWidth: 1,
            },
        ],
    };

    // Pie Chart Data (Status-wise Complaints)
    const pieData = {
        labels: ["Resolved", "Pending", "In Progress"],
        datasets: [
            {
                label: "Complaints Status",
                data: [stats.resolved || 0, stats.pending || 0, stats.inProgress || 0],
                backgroundColor: ["#22C55E", "#EF4444", "#3B82F6"],
                hoverOffset: 4,
            },
        ],
    };

    // Complaint Trends Data (Top 3 Most Reported Complaint Types)
    const complaintTypeCounts = list.reduce((acc, complaint) => {
        acc[complaint.type] = (acc[complaint.type] || 0) + 1;
        return acc;
    }, {});

    const sortedComplaintTypes = Object.entries(complaintTypeCounts)
        .sort((a, b) => b[1] - a[1]) // Sort by highest count
        .slice(0, 3); // Get top 3

    const trendsData = {
        labels: sortedComplaintTypes.map(([type]) => type),
        datasets: [
            {
                label: "Top Complaint Types",
                data: sortedComplaintTypes.map(([, count]) => count),
                backgroundColor: ["#F87171", "#FB923C", "#60A5FA"],
            },
        ],
    };

    return (
        <section className="w-full mt-16 flex justify-center items-start bg-gray-100">
            <div className="bg-white rounded-xl shadow-lg w-full p-10">
                <h1 className="text-[#0061A1] text-2xl font-semibold mb-7">Reports & Charts</h1>

                {/* Tabs */}
                <div className="flex border-b mb-4">
                    <button
                        className={`py-2 px-4 text-lg font-semibold ${
                            activeTab === "priority" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("priority")}
                    >
                        Priority Distribution
                    </button>
                    <button
                        className={`py-2 px-4 text-lg font-semibold ${
                            activeTab === "status" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("status")}
                    >
                        Status Distribution
                    </button>
                    <button
                        className={`py-2 px-4 text-lg font-semibold ${
                            activeTab === "trends" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                        }`}
                        onClick={() => setActiveTab("trends")}
                    >
                        Complaint Trends
                    </button>
                </div>

                {/* Tab Content - Merged Complaint Overview & Charts */}
                <div className="bg-gray-100 p-6 rounded-md shadow flex items-start">
                    {/* Text Overview (50%) */}
                    <div className="w-1/2 pr-6">
                        {activeTab === "priority" ? (
                            <>
                                <h2 className="text-xl font-semibold mb-4">Priority Overview</h2>
                                <p className="text-lg"><strong>Total Complaints:</strong> {stats.total || 0}</p>
                                <p className="text-lg"><strong>High Priority:</strong> {stats.highPriority || 0}</p>
                                <p className="text-lg"><strong>Medium Priority:</strong> {stats.mediumPriority || 0}</p>
                                <p className="text-lg"><strong>Low Priority:</strong> {stats.lowPriority || 0}</p>
                            </>
                        ) : activeTab === "status" ? (
                            <>
                                <h2 className="text-xl font-semibold mb-4">Status Overview</h2>
                                <p className="text-lg"><strong>Total Complaints:</strong> {stats.total || 0}</p>
                                <p className="text-lg"><strong>Resolved:</strong> {stats.resolved || 0}</p>
                                <p className="text-lg"><strong>Pending:</strong> {stats.pending || 0}</p>
                                <p className="text-lg"><strong>In Progress:</strong> {stats.inProgress || 0}</p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-xl font-semibold mb-4">Complaint Trends</h2>
                                {sortedComplaintTypes.length === 0 ? (
                                    <p className="text-lg">No complaints recorded yet.</p>
                                ) : (
                                    sortedComplaintTypes.map(([type, count], index) => (
                                        <p key={index} className="text-lg">
                                            <strong>{type}:</strong> {count} complaints
                                        </p>
                                    ))
                                )}
                            </>
                        )}
                    </div>

                    {/* Chart (50%) */}
                    <div className="w-1/2 flex justify-center">
                        {activeTab === "priority" ? (
                            <Bar data={barData} />
                        ) : activeTab === "status" ? (
                            <div className="w-72 h-72">
                                <Pie data={pieData} />
                            </div>
                        ) : (
                            <div className="w-80 h-60">
                                <Bar data={trendsData} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Reports;
