import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { verifyOTP, resendOTP } from "../redux/slices/otpSlice";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

const VerifyOTP = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, resendLoading, resendSuccess, resendError } = useSelector((state) => state.otp);
    const { business } = useSelector((state) => state.onboarding);
    const [otp, setOtp] = useState("");
    const [countdown, setCountdown] = useState(60);

    // Start countdown when component mounts or after successful resend
    useEffect(() => {
        setCountdown(60);
    }, [resendSuccess]);

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleChange = (e) => {
        const value = e.target.value;
        // Only allow numbers and limit to 4 digits
        if (/^\d*$/.test(value) && value.length <= 4) {
            setOtp(value);
        }
    };

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

    const handleResendOTP = async () => {
        if (countdown > 0) return;

        await dispatch(resendOTP({ email: business?.email || "" }));
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

                {resendSuccess && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
                        A new verification code has been sent to your email.
                    </div>
                )}

                {resendError && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {resendError}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col items-center">
                        <FormInput
                            label="Verification Code"
                            id="otp"
                            name="otp"
                            value={otp}
                            onChange={handleChange}
                            placeholder="Enter 4-digit code"
                            maxLength="4"
                            className="text-center text-lg tracking-widest"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={loading || otp.length !== 4}
                        fullWidth
                    >
                        {loading ? "Verifying..." : "Verify Code"}
                    </Button>

                    <div className="flex justify-center mt-4">
                        <button
                            type="button"
                            onClick={handleResendOTP}
                            disabled={countdown > 0 || resendLoading}
                            className={`text-sm ${countdown > 0 || resendLoading
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-[#0061A1] hover:underline cursor-pointer'
                                }`}
                        >
                            {resendLoading
                                ? "Sending..."
                                : countdown > 0
                                    ? `Resend code in ${countdown}s`
                                    : "Resend verification code"}
                        </button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default VerifyOTP;
