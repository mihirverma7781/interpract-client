// slices/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../../utils/axios-instance";

export const googleUserLogin = createAsyncThunk(
  "user/googleLogin",
  async (data, thunkAPI) => {
    try {
      const response = await apiInstance.post("/auth/google", {
        auth_code: data.auth_code,
      });

      return response.data;
    } catch (error) {
      console.log("[Error | user/googleLogin]: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message,
      );
    }
  },
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (thunkAPI) => {
    try {
      const response = await apiInstance.get("/user/me");
      return response.data;
    } catch (error) {
      console.log("[Error | user/fetchUser]: ", error);
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message,
      );
    }
  },
);

const initialState = {
  entities: {},
  loading: false,
  errors: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(googleUserLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = { user: action.payload.data };
      state.errors = [];
    });

    builder.addCase(googleUserLogin.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.errors = action.payload[0].message;
    });

    builder.addCase(googleUserLogin.pending, (state, action) => {
      state.loading = true;
    });

    // FETCH USER
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.entities = { user: action.payload.data };
      state.errors = [];
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.errors = action.payload[0].message;
    });

    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
