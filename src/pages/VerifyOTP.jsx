import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP } from "../redux/slices/otpSlice";
import { useNavigate } from "react-router-dom";

const VerifyOTP = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); // Fetch email from Redux
    const { loading, otpVerified, error } = useSelector((state) => state.otp);

    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(verifyOTP({ email: user.email, otp }));
        if (result.payload) navigate("/setup-company");
        navigate("/setup-company");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Verify OTP</h2>
                <p className="text-center text-gray-600 mb-4">
                    Enter the OTP sent to <strong>{user.email}</strong>
                </p>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="otp"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                        className="w-full p-2 border rounded text-center"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded"
                        disabled={loading}
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </button>
                </form>
                {otpVerified && (
                    <p className="text-green-500 text-center mt-4">
                        OTP Verified! Redirecting...
                    </p>
                )}
            </div>
        </div>
    );
};

export default VerifyOTP;
