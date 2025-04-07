import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/slices/authSlice";

// Components and Pages
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/landingPage/LandingPage";
import PrivateRoute from "./pages/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import VerifyOTP from "./pages/VerifyOTP";
import Onboarding from "./pages/Onboarding";
import ChoosePlan from "./pages/ChoosePlan";
import ComplaintForm from "./pages/ComplaintForm";
// Import other components as needed

function App() {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
                <Route path="/complaint/:organizationId" element={<ComplaintForm />} />

                {/* Private Routes wrapped with Layout */}
                <Route path="/" element={<Layout />}>
                    <Route path="dashboard" element={
                        <PrivateRoute>
                            <Dashboard />
                        </PrivateRoute>
                    } />
                    <Route path="verify-otp" element={
                        <PrivateRoute>
                            <VerifyOTP />
                        </PrivateRoute>
                    } />
                    <Route path="onboarding" element={
                        <PrivateRoute>
                            <Onboarding />
                        </PrivateRoute>
                    } />
                    <Route path="choose-plan" element={
                        <PrivateRoute>
                            <ChoosePlan />
                        </PrivateRoute>
                    } />

                    {/* Add other private routes here */}
                </Route>

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;