import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to verify OTP
export const verifyOTP = createAsyncThunk(
    "otp/verifyOTP",
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/verify-otp", { email, otp });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const otpSlice = createSlice({
    name: "otp",
    initialState: {
        otpSent: false, // Can be updated if we track OTP sending
        otpVerified: false,
        loading: false,
        error: null,
    },
    reducers: {
        setOtpSent: (state, action) => {
            state.otpSent = action.payload;
        },
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
                state.otpVerified = false;
                state.error = action.payload;
            });
    },
});

export const { setOtpSent } = otpSlice.actions;
export default otpSlice.reducer;
