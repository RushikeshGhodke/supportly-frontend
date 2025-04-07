import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP } from "../redux/slices/otpSlice";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const VerifyOTP = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.otp);
    const { business } = useSelector((state) => state.onboarding);
    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.length !== 4) {
            alert("Please enter a valid 4-digit OTP");
            return;
        }

        try {
            const result = await dispatch(verifyOTP({
                email: business?.email || "",
                otp
            }));

            if (result.meta.requestStatus === "fulfilled") {
                navigate("/setup-company");
            }
        } catch (error) {
            console.error("OTP verification failed:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <Card
                className="w-full max-w-md"
                title="Verify OTP"
                subtitle="We sent a verification code to your email. Please enter it below."
            >
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <FormInput
                        label="OTP Code"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter 4-digit OTP"
                        maxLength="4"
                        required
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        fullWidth
                    >
                        {loading ? "Verifying..." : "Verify OTP"}
                    </Button>
                </form>
            </Card>
        </div>
    );
};

export default VerifyOTP;
