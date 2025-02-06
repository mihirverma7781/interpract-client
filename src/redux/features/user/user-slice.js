// slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// api call
export const fetchUsers = createAsyncThunk(
    "users/getAllUsers",
    async (data, {}) => {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        
        return response;
    }
);

const initialState = {
    users: [],
    loading: false,
    error: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = "";
        });

        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        });

        builder.addCase(fetchUsers.pending, (state, action) => {
            state.loading = true;
        });
    },
});

export const { increment } = userSlice.actions;
export default userSlice.reducer;
