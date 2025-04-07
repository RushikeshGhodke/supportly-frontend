import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// Verify OTP
export const verifyOTP = createAsyncThunk(
    "otp/verifyOTP",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/organization/otpverification`, { email, otp });
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "OTP verification failed"
            );
        }
    }
);

// Resend OTP
export const resendOTP = createAsyncThunk(
    "otp/resendOTP",
    async ({ email }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/organization/resend-otp`, { email });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to resend OTP"
            );
        }
    }
);

const otpSlice = createSlice({
    name: "otp",
    initialState: {
        otpSent: false,
        otpVerified: false,
        loading: false,
        error: null,
        resendLoading: false,
        resendSuccess: false,
        resendError: null
    },
    reducers: {
        setOtpSent: (state, action) => {
            state.otpSent = action.payload;
        },
        resetOtpState: (state) => {
            state.otpSent = false;
            state.otpVerified = false;
            state.error = null;
            state.resendSuccess = false;
            state.resendError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Verify OTP
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOTP.fulfilled, (state) => {
                state.loading = false;
                state.otpVerified = true;
            })
            .addCase(verifyOTP.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Verification failed";
            })
            // Resend OTP
            .addCase(resendOTP.pending, (state) => {
                state.resendLoading = true;
                state.resendError = null;
                state.resendSuccess = false;
            })
            .addCase(resendOTP.fulfilled, (state) => {
                state.resendLoading = false;
                state.resendSuccess = true;
            })
            .addCase(resendOTP.rejected, (state, action) => {
                state.resendLoading = false;
                state.resendError = action.payload || "Failed to resend OTP";
            });
    }
});

export const { setOtpSent, resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;
