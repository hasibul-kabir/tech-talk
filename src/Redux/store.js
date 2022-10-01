import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import dmodeReducer from "./dmodeSlice";

export default configureStore({
    reducer: {
        activeChat: chatReducer,
        dmode: dmodeReducer
    }
})