import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../redux/slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

// Helper function to parse query parameters
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const planFromQuery = query.get("plan");

    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [passwordError, setPasswordError] = useState("");

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/choose-plan");
        }
        // Clear any errors when component mounts
        dispatch(clearError());
    }, [isAuthenticated, navigate, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear password match error when typing
        if ((name === "password" || name === "confirmPassword") && passwordError) {
            setPasswordError("");
        }
    };

    const validateForm = () => {
        if (formData.password !== formData.confirmPassword) {
            setPasswordError("Passwords do not match");
            return false;
        }
        if (formData.password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // Remove confirmPassword before sending to API
        const { confirmPassword, ...signupData } = formData;

        const result = await dispatch(registerUser(signupData));
        if (result.meta.requestStatus === "fulfilled") {
            if (planFromQuery) {
                // If plan is specified in URL, navigate to onboarding with that plan
                navigate(`/onboarding?plan=${planFromQuery}`);
            } else {
                navigate("/choose-plan");
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card
                className="w-full max-w-md"
                title="Sign Up"
            >
                <div className="mb-4 text-center">
                    <Link to="/" className="text-[#0061A1] hover:underline">
                        ← Back to home
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                        label="Full Name"
                        id="fullname"
                        name="fullname"
                        value={formData.fullname}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                    />

                    <FormInput
                        label="Email"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                        required
                    />

                    <FormInput
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
                        error={passwordError}
                        required
                    />

                    <FormInput
                        label="Confirm Password"
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        error={passwordError}
                        required
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <Link to="/login" className="text-[#0061A1] hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Signup;
