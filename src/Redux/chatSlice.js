import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: 'activeChat',
    initialState: {
        value: null
    },
    reducers: {
        activeChat: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { activeChat } = chatSlice.actions;
export default chatSlice.reducer