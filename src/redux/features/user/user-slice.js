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
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message,
      );
    }
  },
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, thunkAPI) => {
    try {
      const response = await apiInstance.get("/user/me");
      return response.data;
    } catch (error) {
      console.log("[Error | user/fetchUser]: ", error);
      const compiledErrors = error.response?.data?.errors.map((err) => {
        return err.message;
      });
      console.log("Compiled Errors: ", compiledErrors);
      return thunkAPI.rejectWithValue(compiledErrors);
    }
  },
);

export const onboardUser = createAsyncThunk(
  "user/onboardUser",
  async (data, thunkAPI) => {
    try {
      const response = await apiInstance.patch("/user/onboard", data);
      return response.data;
    } catch (error) {
      console.log("[Error | user/onboardUser]: ", error);
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
      state.entities.user = action.payload.data;
      state.errors = [];
    });

    builder.addCase(googleUserLogin.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload || ["An unknown error occurred"];
    });

    builder.addCase(googleUserLogin.pending, (state, action) => {
      state.loading = true;
    });

    // FETCH USER
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.entities.user = action.payload.data;
      state.errors = [];
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });

    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true;
    });

    // ONBOARD USER
    builder.addCase(onboardUser.fulfilled, (state, action) => {
      state.loading = false;
      state.entities.user = action.payload.data;
      state.errors = [];
    });

    builder.addCase(onboardUser.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload || ["An unknown error occurred"];
    });

    builder.addCase(onboardUser.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;
