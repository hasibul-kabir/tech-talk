import { createSlice } from "@reduxjs/toolkit";

export const dmodeSlice = createSlice({
    name: 'dmode',
    initialState: {
        value: false
    },
    reducers: {
        dmode: (state) => {
            state.value = !state.value
        }
    }
})

export const { dmode } = dmodeSlice.actions;
export default dmodeSlice.reducer