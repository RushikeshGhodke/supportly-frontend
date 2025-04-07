import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to verify OTP
export const verifyOTP = createAsyncThunk(
    "otp/verifyOTP",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/organization/otpverification", { email, otp });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Verification failed" });
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
    },
    reducers: {
        setOtpSent: (state, action) => {
            state.otpSent = action.payload;
        },
        resetOtpState: (state) => {
            state.otpSent = false;
            state.otpVerified = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
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
                state.error = action.payload?.message || "Verification failed";
            });
    },
});

export const { setOtpSent, resetOtpState } = otpSlice.actions;
export default otpSlice.reducer;
