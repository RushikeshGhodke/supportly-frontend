import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import planReducer from "./slices/planSlice";
import onboardingReducer from "./slices/onboardingSlice";
import otpReducer from "./slices/otpSlice";
import teamReducer from "./slices/teamSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        plan: planReducer,
        onboarding: onboardingReducer,
        otp: otpReducer,
        team: teamReducer,
    },
});

export default store;
