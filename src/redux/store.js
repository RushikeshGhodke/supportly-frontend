import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import authReducer from "./slices/authSlice";
import planReducer from "./slices/planSlice";
import onboardingReducer from "./slices/onboardingSlice";
import otpReducer from "./slices/otpSlice";
import teamReducer from "./slices/teamSlice";
import complaintsReducer from "./slices/complaintsSlice";

// Persist configuration
const persistConfig = {
    key: "root", // key for the localStorage object
    storage, // storage engine (localStorage by default)
    // Optionally, you can whitelist or blacklist specific reducers
    // whitelist: ['auth'], // only persist the auth reducer
    // blacklist: ['otp'], // don't persist the otp reducer
};

// Wrap each reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedPlanReducer = persistReducer(persistConfig, planReducer);
const persistedOnboardingReducer = persistReducer(persistConfig, onboardingReducer);
const persistedOtpReducer = persistReducer(persistConfig, otpReducer);
const persistedTeamReducer = persistReducer(persistConfig, teamReducer);
const persistedComplaintsReducer = persistReducer(persistConfig, complaintsReducer);

// Create the store
export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        plan: persistedPlanReducer,
        onboarding: persistedOnboardingReducer,
        otp: persistedOtpReducer,
        team: persistedTeamReducer,
        complaints: persistedComplaintsReducer,
    },
    // Optional: Add middleware if needed
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST"], // Ignore redux-persist actions
            },
        }),
});


// Create the persistor
export const persistor = persistStore(store);

persistor.subscribe(() => {
    console.log('Current State:', store.getState());
    console.log('Persisted State:', JSON.parse(localStorage.getItem('persist:root')));
});

export default store;