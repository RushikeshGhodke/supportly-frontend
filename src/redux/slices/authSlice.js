import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// Register user
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/user/register`, userData);
            localStorage.setItem("token", response.data.data.accessToken);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Registration failed"
            );
        }
    }
);

// Login user
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${API_URL}/user/login`, userData);
            localStorage.setItem("token", response.data.data.accessToken);
            localStorage.setItem("refreshToken", response.data.data.refreshToken);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Invalid credentials"
            );
        }
    }
);

// Logout user
export const logoutUser = createAsyncThunk(
    "auth/logoutUser",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                await axios.post(`${API_URL}/user/logout`, {}, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            return null;
        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            return rejectWithValue("Logout failed");
        }
    }
);

// Check if user is authenticated
export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) return null;

            const response = await axios.get(`${API_URL}/user/verify-token`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data.data;
        } catch (error) {
            localStorage.removeItem("token");
            localStorage.removeItem("refreshToken");
            return rejectWithValue("Authentication failed");
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
                state.user = action.payload.user;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Registration failed";
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
                state.error = action.payload || "Login failed";
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
            .addCase(logoutUser.rejected, (state) => {
                state.loading = false;
                state.user = null;
                state.isAuthenticated = false;
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
    }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
