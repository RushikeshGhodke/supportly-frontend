import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import FormInput from "../components/ui/FormInput";
import FormTextarea from "../components/ui/FormTextarea";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const ComplaintForm = () => {
    const navigate = useNavigate();
    const { organizationId } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        customerName: "",
        email: "",
        complaint: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // In a real implementation, you would send this to your backend
            // For demo purposes, we'll simulate success after a delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate API call
            // const response = await axios.post(`/api/v1/complaints/register/${organizationId}`, formData);

            setSuccess(true);
            setFormData({
                customerName: "",
                email: "",
                complaint: ""
            });

            // Redirect or show success message
            setTimeout(() => {
                navigate("/");
            }, 3000);

        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit complaint");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4 sm:p-6 md:p-8">
            <Card
                className="w-full max-w-md"
                title="Submit Your Complaint"
            >
                {success ? (
                    <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
                        <p className="text-center">Your complaint has been submitted successfully!</p>
                        <p className="text-center text-sm mt-2">Redirecting to home page...</p>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FormInput
                                label="Your Name"
                                id="customerName"
                                name="customerName"
                                value={formData.customerName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                            />

                            <FormInput
                                label="Email Address"
                                id="email"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email address"
                                required
                            />

                            <FormTextarea
                                label="Describe Your Issue"
                                id="complaint"
                                name="complaint"
                                value={formData.complaint}
                                onChange={handleChange}
                                placeholder="Please provide details about your issue"
                                rows={5}
                                required
                            />

                            <Button
                                type="submit"
                                disabled={loading}
                                fullWidth
                            >
                                {loading ? "Submitting..." : "Submit Complaint"}
                            </Button>

                            <div className="text-center mt-4">
                                <Link to="/" className="text-[#0061A1] text-sm hover:underline">
                                    Back to home
                                </Link>
                            </div>
                        </form>
                    </>
                )}
            </Card>
        </div>
    );
};

export default ComplaintForm;
