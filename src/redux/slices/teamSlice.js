import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

// Send team invitations
export const inviteTeamMembers = createAsyncThunk(
    "team/inviteTeamMembers",
    async ({ organizationId, members }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("Authentication required");
            }

            const response = await axios.post(
                `${API_URL}/organization/invite/${organizationId}`,
                { emails: members.map(m => m.email), role: members[0].role },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to send invitations"
            );
        } F
    }
);

// Join organization using invite code
export const joinOrganization = createAsyncThunk(
    "team/joinOrganization",
    async ({ inviteToken, inviteCode, organizationId }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("Authentication required");
            }

            const response = await axios.post(
                `${API_URL}/organization/join`,
                { inviteToken, inviteCode, organizationId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to join organization"
            );
        }
    }
);

// Get organization info (including invite code)
export const getOrganizationInfo = createAsyncThunk(
    "team/getOrganizationInfo",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("Authentication required");
            }

            const response = await axios.get(
                `${API_URL}/organization/info`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to get organization info"
            );
        }
    }
);

const teamSlice = createSlice({
    name: "team",
    initialState: {
        teamMembers: [{ email: "", role: "Member" }],
        loading: false,
        error: null,
        invitationResults: null,
        organizationInfo: null,
        infoLoading: false,
        infoError: null,
        joinLoading: false,
        joinError: null,
        joinedOrganization: null
    },
    reducers: {
        addMemberRow: (state) => {
            state.teamMembers.push({ email: "", role: "Member" });
        },
        updateMember: (state, action) => {
            const { index, key, value } = action.payload;
            state.teamMembers[index][key] = value;
        },
        removeMemberRow: (state, action) => {
            if (state.teamMembers.length > 1) {
                state.teamMembers.splice(action.payload, 1);
            }
        },
        resetInvitationResults: (state) => {
            state.invitationResults = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // Invite team members
            .addCase(inviteTeamMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(inviteTeamMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.invitationResults = action.payload.results;
            })
            .addCase(inviteTeamMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to send invitations";
            })
            // Get organization info
            .addCase(getOrganizationInfo.pending, (state) => {
                state.infoLoading = true;
                state.infoError = null;
            })
            .addCase(getOrganizationInfo.fulfilled, (state, action) => {
                state.infoLoading = false;
                state.organizationInfo = action.payload.organization;
            })
            .addCase(getOrganizationInfo.rejected, (state, action) => {
                state.infoLoading = false;
                state.infoError = action.payload || "Failed to get organization info";
            })
            // Join organization
            .addCase(joinOrganization.pending, (state) => {
                state.joinLoading = true;
                state.joinError = null;
            })
            .addCase(joinOrganization.fulfilled, (state, action) => {
                state.joinLoading = false;
                state.joinedOrganization = action.payload.organization;
            })
            .addCase(joinOrganization.rejected, (state, action) => {
                state.joinLoading = false;
                state.joinError = action.payload || "Failed to join organization";
            });
    }
});

export const {
    addMemberRow,
    updateMember,
    removeMemberRow,
    resetInvitationResults
} = teamSlice.actions;

export default teamSlice.reducer;
