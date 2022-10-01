import { createSlice } from "@reduxjs/toolkit";

export const dmodeSlice = createSlice({
    name: 'dmode',
    initialState: {
        value: null
    },
    reducers: {
        dmode: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { dmode } = dmodeSlice.actions;
export default dmodeSlice.reducer