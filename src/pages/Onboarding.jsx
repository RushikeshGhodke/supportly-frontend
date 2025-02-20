import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessDetails, saveOnboardingDetails } from "../redux/slices/onboardingSlice";
import { useNavigate } from "react-router-dom";

const industries = ["E-commerce", "Banking", "Education", "Healthcare", "Manufacturing"];

const Onboarding = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); // Fetch email & password from Redux
    const { loading, error } = useSelector((state) => state.onboarding);

    const [formData, setFormData] = useState({
        businessName: "",
        industry: industries[0],
        email: user?.email || "", // Prefill from signup
        password: user?.password || "", // Prefill from signup
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // dispatch(setBusinessDetails(formData));
        // const result = await dispatch(saveOnboardingDetails(formData));
        // if (result.payload) navigate("/verify-otp");
        navigate("/verify-otp");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Business Onboarding</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="businessName"
                        placeholder="Business Name"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border rounded"
                    />
                    <select
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    >
                        {industries.map((industry) => (
                            <option key={industry} value={industry}>
                                {industry}
                            </option>
                        ))}
                    </select>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full p-2 border rounded bg-gray-200"
                    />
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        disabled
                        className="w-full p-2 border rounded bg-gray-200"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Next"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Onboarding;
