import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async function to fetch complaints
export const fetchComplaints = createAsyncThunk(
    "complaints/fetchComplaints",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/complaints");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// const complaintsSlice = createSlice({
//     name: "complaints",
//     initialState: { list: [], stats: {}, loading: false, error: null },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchComplaints.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchComplaints.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.list = action.payload.complaints;
//                 state.stats = action.payload.stats;
//             })
//             .addCase(fetchComplaints.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.payload;
//             });
//     },
// });

const complaintsSlice = createSlice({
    name: "complaints",
    initialState: {
        list: [
            {
                id: "CMP001",
                customerName: "John Doe",
                issue: "Late delivery of product",
                priority: "High",
                status: "Pending",
            },
            {
                id: "CMP002",
                customerName: "Alice Smith",
                issue: "Received damaged item",
                priority: "Medium",
                status: "Resolved",
            },
            {
                id: "CMP003",
                customerName: "Robert Johnson",
                issue: "Refund not processed",
                priority: "High",
                status: "Pending",
            },
            {
                id: "CMP004",
                customerName: "Sophia Brown",
                issue: "Incorrect order received",
                priority: "Low",
                status: "Resolved",
            },

        ],
        stats: {
            total: 4,
            highPriority: 2,
            resolved: 2,
            pending: 2,
        },
        loading: false,
        error: null,
    },
    reducers: {},
});

export default complaintsSlice.reducer;
