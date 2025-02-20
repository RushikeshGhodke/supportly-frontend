import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API call to save onboarding details
export const saveOnboardingDetails = createAsyncThunk(
    "onboarding/saveDetails",
    async (businessData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/onboarding", businessData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const onboardingSlice = createSlice({
    name: "onboarding",
    initialState: { business: null, loading: false, error: null },
    reducers: {
        setBusinessDetails: (state, action) => {
            state.business = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(saveOnboardingDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(saveOnboardingDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.business = action.payload;
            })
            .addCase(saveOnboardingDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { setBusinessDetails } = onboardingSlice.actions;
export default onboardingSlice.reducer;
