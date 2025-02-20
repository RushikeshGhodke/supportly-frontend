import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

const ComplaintDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const complaints = useSelector((state) => state.complaints.list);
    const { selectedPlan } = useSelector((state) => state.plan); // Fetch user's plan from Redux

    // Find complaint by ID
    const complaint = complaints.find((c) => c.id === id);

    const [reply, setReply] = useState("");
    const [replies, setReplies] = useState(complaint?.replies || []);
    const [loadingAI, setLoadingAI] = useState(false);

    // If complaint is not found
    if (!complaint) {
        return (
            <div className="w-full flex justify-center items-center h-screen">
                <h2 className="text-2xl font-semibold text-red-500">Complaint Not Found</h2>
            </div>
        );
    }

    // Convert priorityScore to category
    const getPriorityCategory = (score) => {
        if (score >= 1 && score <= 2) return "Low";
        if (score >= 3 && score <= 4) return "Medium";
        return "High";
    };

    const priorityCategory = getPriorityCategory(complaint.priorityScore);

    // Enable AI Response Only for Low Priority & Pro/Custom Plan
    const isAIEnabled = priorityCategory === "Low" && (selectedPlan === "Pro" || selectedPlan === "Custom");

    // Check if Complaint is Resolved
    const isResolved = complaint.status === "Resolved";

    // Function to Fetch AI-Generated Reply (Mock API, Replace with Real AI API)
    const generateAIReply = async () => {
        setLoadingAI(true);
        setTimeout(() => {
            const aiReply = `Thank you for reaching out. We understand your concern regarding "${complaint.issue}". Our team will look into this and provide you with an update shortly.`;
            setReply(aiReply);
            setLoadingAI(false);
        }, 2000); // Simulate AI response delay
    };

    // Submit Reply
    const handleReplySubmit = () => {
        if (!reply.trim()) return;

        const newReplies = [...replies, { text: reply, timestamp: new Date().toLocaleString() }];
        setReplies(newReplies);
        setReply(""); // Clear input

        // Update Redux Store (Later, integrate API call)
        dispatch({
            type: "ADD_COMPLAINT_REPLY",
            payload: { id, replies: newReplies },
        });
    };

    return (
        <section className="w-full mt-16 flex justify-center items-start bg-gray-100">
            <div className="bg-white rounded-xl shadow-lg w-full p-10">
                <h1 className="text-[#0061A1] text-2xl font-semibold mb-7">Complaint Details</h1>

                {/* Responsive Table - Horizontal for PC, Vertical for Mobile */}
                <div className="bg-gray-100 p-6 rounded-md shadow">
                    <div className="hidden md:block"> {/* Show Table on Large Screens */}
                        <table className="w-full border-collapse border border-gray-200">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-3">Complaint ID</th>
                                <th className="border p-3">Customer Name</th>
                                <th className="border p-3">Type</th>
                                <th className="border p-3">Issue</th>
                                <th className="border p-3">Priority</th>
                                <th className="border p-3">Status</th>
                                <th className="border p-3">Timestamp</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td className="border p-3">{complaint.id}</td>
                                <td className="border p-3">{complaint.customerName}</td>
                                <td className="border p-3">{complaint.type}</td>
                                <td className="border p-3">{complaint.issue}</td>
                                <td className="border p-3">
                                        <span
                                            className={`px-2 py-1 rounded-md ${
                                                priorityCategory === "High"
                                                    ? "bg-red-300 text-red-700"
                                                    : priorityCategory === "Medium"
                                                        ? "bg-yellow-300 text-yellow-700"
                                                        : "bg-green-300 text-green-700"
                                            }`}
                                        >
                                            {priorityCategory}
                                        </span>
                                </td>
                                <td className="border p-3">
                                        <span
                                            className={`px-2 py-1 rounded-md ${
                                                isResolved
                                                    ? "bg-green-300 text-green-700"
                                                    : "bg-red-300 text-red-700"
                                            }`}
                                        >
                                            {complaint.status}
                                        </span>
                                </td>
                                <td className="border p-3">{complaint.timestamp}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Reply Section (Hidden if Resolved) */}
                {!isResolved && (
                    <div className="mt-4 bg-gray-100 p-6 rounded-md shadow">
                        <h2 className="text-xl font-semibold mb-3">Reply to Customer</h2>
                        <textarea
                            className="w-full border p-2 rounded-md resize-none"
                            rows="3"
                            placeholder="Type your reply..."
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                        ></textarea>

                        {/* Buttons */}
                        <div className="flex gap-4 mt-2">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                onClick={handleReplySubmit}
                            >
                                Send Reply
                            </button>
                            {isAIEnabled && (
                                <button
                                    className={`bg-gray-600 text-white px-4 py-2 rounded-md ${loadingAI ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-700"}`}
                                    onClick={generateAIReply}
                                    disabled={loadingAI}
                                >
                                    {loadingAI ? "Generating..." : "Generate with AI"}
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Previous Replies */}
                {replies.length > 0 && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Previous Replies</h3>
                        <ul className="bg-white p-4 rounded-md shadow-md">
                            {replies.map((r, index) => (
                                <li key={index} className="border-b py-2">
                                    <p className="text-gray-700">{r.text}</p>
                                    <p className="text-sm text-gray-500">{r.timestamp}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        onClick={() => navigate("/dashboard")}
                    >
                        Back to Dashboard
                    </button>
                    {!isResolved && (
                        <div className="flex gap-4">
                            <button
                                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                                onClick={() => dispatch({
                                    type: "UPDATE_COMPLAINT_STATUS",
                                    payload: {id, status: "Resolved"}
                                })}
                            >
                                Mark as Resolved
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                                onClick={() => dispatch({type: "ESCALATE_COMPLAINT", payload: id})}
                            >
                                Escalate Complaint
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ComplaintDetails;
