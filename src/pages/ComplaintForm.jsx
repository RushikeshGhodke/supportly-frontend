import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ComplaintForm = () => {
    const [searchParams] = useSearchParams(); // Extract query params
    const [tenantId, setTenantId] = useState("");
    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        complaint: "",
    });

    useEffect(() => {
        // Get the tenant_id from the URL query parameter (t)
        const tenantFromURL = searchParams.get("t");
        if (tenantFromURL) {
            setTenantId(tenantFromURL); // Set the tenantId state from the query string
        }
    }, [searchParams]); // Dependency on searchParams, so it updates if the query changes

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tenantId) {
            alert("Invalid organization link!"); // If no tenantId, show an error
            return;
        }

        try {
            console.log(formData,tenantId)
            const response = await axios.post("http://localhost:3000/api/v1/complaints/registerComplaint", {
                ...formData,
                tenantId,
            });

            console.log(response);

            alert("Complaint Registered Successfully!");
            setFormData({ customerName: "", email: "", complaint: "" });
        } catch (error) {
            console.error("Error submitting complaint:", error);
            alert("Failed to register complaint.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-16 w-max bg-white border rounded-xl p-10 mx-auto">
            <h1 className="text-[#0061A1] text-2xl font-semibold mb-10">Register Complaint</h1>

            {tenantId ? (
                <p className="text-[#0061A1] text-lg mb-6">Filing for: <strong>{tenantId}</strong></p>
            ) : (
                <p className="text-red-600 text-lg mb-6">Invalid URL</p>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-6 w-80">
                {/* Customer Name Field */}
                <div className="flex flex-col gap-2 w-full relative">
                    <label className="text-[#7D7D7D] text-sm">Customer Name</label>
                    <input
                        className="w-full p-2 pr-10 border-2 border-[#DAD7D7] rounded-[5px] text-[16px]"
                        type="text"
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-2 w-full relative">
                    <label className="text-[#7D7D7D] text-sm">Email</label>
                    <input
                        className="w-full p-2 pr-10 border-2 border-[#DAD7D7] rounded-[5px] text-[16px]"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Complaint Field */}
                <div className="flex flex-col gap-2 w-full relative">
                    <label className="text-[#7D7D7D] text-sm">Complaint</label>
                    <textarea
                        className="w-full p-2 pr-10 border-2 border-[#DAD7D7] rounded-[5px] text-[16px]"
                        name="complaint"
                        value={formData.complaint}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-[#0061A1] text-white py-2 px-2 rounded w-full text-center cursor-pointer"
                    disabled={!tenantId}
                >
                    Submit Complaint
                </button>
            </form>
        </div>
    );
};

export default ComplaintForm;
