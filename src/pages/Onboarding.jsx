import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBusinessDetails, saveOnboardingDetails } from "../redux/slices/onboardingSlice";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
import FormSelect from "../components/ui/FormSelect";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const industries = ["E-commerce", "Banking", "Education", "Healthcare", "Manufacturing"];

const Onboarding = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const { selectedPlan } = useSelector((state) => state.plan);
    const { loading, error } = useSelector((state) => state.onboarding);

    const [formData, setFormData] = useState({
        businessname: "",
        industrytype: industries[0],
        email: user?.email || "",
        password: user?.password || "",
        selectedPlan: selectedPlan || "Free",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Clear error when field is being edited
        if (errors[name]) {
            setErrors({ ...errors, [name]: "" });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.businessname.trim()) newErrors.businessname = "Business name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        if (!formData.password.trim()) newErrors.password = "Password is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            dispatch(setBusinessDetails(formData));
            const result = await dispatch(saveOnboardingDetails(formData));

            if (result.meta.requestStatus === "fulfilled") {
                navigate("/verify-otp");
            }
        } catch (err) {
            console.error("Onboarding failed:", err);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
            <Card
                className="w-full max-w-md"
                title="Create your organization"
            >
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                        label="Business Name"
                        id="businessname"
                        name="businessname"
                        value={formData.businessname}
                        onChange={handleChange}
                        placeholder="Enter your business name"
                        error={errors.businessname}
                        required
                    />

                    <FormSelect
                        label="Industry"
                        id="industrytype"
                        name="industrytype"
                        value={formData.industrytype}
                        onChange={handleChange}
                        options={industries}
                    />

                    <FormInput
                        label="Email"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        error={errors.email}
                        readOnly={user?.email}
                        required
                    />

                    <div className="mb-6">
                        <p className="text-gray-600 mb-2">Selected Plan: <span className="font-medium">{formData.selectedPlan}</span></p>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? "Processing..." : "Continue"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default Onboarding;
