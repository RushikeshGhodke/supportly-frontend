import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../redux/slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

// Helper function to parse query parameters
const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const query = useQuery();
    const redirectPath = query.get("redirect");

    const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Redirect if already logged in
    useEffect(() => {
        if (isAuthenticated) {
            // Redirect to the specified path or dashboard
            navigate(redirectPath || "/dashboard");
        }

        // Clear any errors when component mounts
        dispatch(clearError());
    }, [isAuthenticated, navigate, dispatch, redirectPath]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(loginUser(formData));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <Card
                className="w-full max-w-md"
                title="Log In"
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
                        label="Email"
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />

                    <FormInput
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 text-[#0061A1] focus:ring-[#0061A1] border-gray-300 rounded"
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <Link to="/forgot-password" className="text-[#0061A1] hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? "Logging in..." : "Log In"}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/signup" className="text-[#0061A1] hover:underline">
                            Sign up
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default Login;