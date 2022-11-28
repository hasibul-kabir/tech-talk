import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import notificationReducer from "./notificationBadgeSlice";
import dmodeReducer from "./dmodeSlice";

export default configureStore({
    reducer: {
        activeChat: chatReducer,
        notification: notificationReducer,
        dmode: dmodeReducer
    }
})