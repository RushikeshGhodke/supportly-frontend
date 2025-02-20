import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async function to send invitations
export const inviteTeamMembers = createAsyncThunk(
    "team/inviteTeamMembers",
    async (teamData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/invite-team", teamData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

const generateOrgCode = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const teamSlice = createSlice({
    name: "team",
    initialState: { teamMembers: [{ email: "", role: "Support Agent" }], orgCode: generateOrgCode(), loading: false, error: null },
    reducers: {
        addMemberRow: (state) => {
            state.teamMembers.push({ email: "", role: "Support Agent" });
        },
        updateMember: (state, action) => {
            const { index, key, value } = action.payload;
            state.teamMembers[index][key] = value;
        },
        removeMemberRow: (state, action) => {
            state.teamMembers.splice(action.payload, 1);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(inviteTeamMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(inviteTeamMembers.fulfilled, (state, action) => {
                state.loading = false;
                state.teamMembers = action.payload;
            })
            .addCase(inviteTeamMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { addMemberRow, updateMember, removeMemberRow } = teamSlice.actions;
export default teamSlice.reducer;
