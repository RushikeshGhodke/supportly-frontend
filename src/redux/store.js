import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Import reducers
import authReducer from "./slices/authSlice";
import planReducer from "./slices/planSlice";
import onboardingReducer from "./slices/onboardingSlice";
import otpReducer from "./slices/otpSlice";
import teamReducer from "./slices/teamSlice";
import complaintsReducer from "./slices/complaintsSlice";

// Configure persist for auth
const authPersistConfig = {
    key: "auth",
    storage,
    whitelist: ["user", "isAuthenticated"],
};

// Configure persist for onboarding
const onboardingPersistConfig = {
    key: "onboarding",
    storage,
};

// Configure persist for plan
const planPersistConfig = {
    key: "plan",
    storage,
};

// Root reducer with persistence
const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authReducer),
    plan: persistReducer(planPersistConfig, planReducer),
    onboarding: persistReducer(onboardingPersistConfig, onboardingReducer),
    otp: otpReducer,
    team: teamReducer,
    complaints: complaintsReducer,
});

// Create store
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };