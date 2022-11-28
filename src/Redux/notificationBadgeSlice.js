import { createSlice } from "@reduxjs/toolkit";

export const notificationBadgeSlice = createSlice({
    name: 'notificationBadge',
    initialState: {
        value: 0
    },
    reducers: {
        notification: (state, action) => {
            state.value = action.payload
        }
    }
})

export const { notification } = notificationBadgeSlice.actions;
export default notificationBadgeSlice.reducer;