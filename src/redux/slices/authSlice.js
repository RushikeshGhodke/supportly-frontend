import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register user
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/register", userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Registration failed" });
        }
    }
);

// Login user
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/login", userData);
            localStorage.setItem("token", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || { message: "Login failed" });
        }
    }
);

// Logout user
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            return null;
        } catch (error) {
            return rejectWithValue({ message: "Logout failed" });
        }
    }
);

// Check if user is authenticated
export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return null;
            }
            
            // Verify token validity with backend
            const response = await axios.get("http://localhost:3000/api/v1/user/verify-token", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            return rejectWithValue({ message: "Authentication failed" });
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: { 
        user: null, 
        loading: false, 
        error: null,
        isAuthenticated: false 
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Register cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data.user;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Registration failed";
            })
            // Login cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Login failed";
            })
            // Logout cases
            .addCase(logoutUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Logout failed";
            })
            // Auth check cases
            .addCase(checkAuth.pending, (state) => {
                state.loading = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                } else {
                    state.isAuthenticated = false;
                }
            })
            .addCase(checkAuth.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
