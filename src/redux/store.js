import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import planReducer from "./slices/planSlice";
import onboardingReducer from "./slices/onboardingSlice";
import otpReducer from "./slices/otpSlice";
import teamReducer from "./slices/teamSlice";
import complaintsReducer from "./slices/complaintsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        plan: planReducer,
        onboarding: onboardingReducer,
        otp: otpReducer,
        team: teamReducer,
        complaints: complaintsReducer,
    },
});

export default store;
