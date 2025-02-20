import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// Async function to fetch complaints
export const fetchComplaints = createAsyncThunk(
    "complaints/fetchComplaints",
    async (_, {rejectWithValue}) => {
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
                customerName: "Robert Johnson",
                type: "Delivery Issues",
                issue: "Late delivery",
                priorityScore: 4,
                status: "Pending",
                timestamp: "2025-02-20 10:30:00"
            },
            {
                id: "CMP002",
                customerName: "Robert Johnson",
                type: "Payment Issues",
                issue: "Refund not received",
                priorityScore: 3,
                status: "Resolved",
                timestamp: "2025-02-19 14:15:00"
            },
            {
                id: "CMP003",
                customerName: "Robert Johnson",
                type: "Product Issues",
                issue: "Received damaged item",
                priorityScore: 5,
                status: "Pending",
                timestamp: "2025-02-18 09:45:00"
            },
            {
                id: "CMP004",
                customerName: "Robert Johnson",
                type: "Customer Support",
                issue: "No response from support",
                priorityScore: 1,
                status: "Pending",
                timestamp: "2025-02-17 18:00:00"
            },
            {
                id: "CMP005",
                customerName: "Rushikesh Ghodke",
                type: "Delivery Issues",
                issue: "Pickup for Return Delayed",
                priorityScore: 3,
                status: "Escalated",
                timestamp: "2025-02-20 12:00:00"
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
