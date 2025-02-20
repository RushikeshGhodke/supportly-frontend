import { createSlice } from "@reduxjs/toolkit";

const planSlice = createSlice({
    name: "plan",
    initialState: { selectedPlan: null },
    reducers: {
        selectPlan: (state, action) => {
            state.selectedPlan = action.payload;
        },
    },
});

export const { selectPlan } = planSlice.actions;
export default planSlice.reducer;
