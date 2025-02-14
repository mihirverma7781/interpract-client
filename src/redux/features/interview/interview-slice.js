import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../../utils/axios-instance";

export const createInterview = createAsyncThunk(
  "interview/createInterview",
  async (data, thunkAPI) => {
    try {
      const response = await apiInstance.post("/interview", data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message,
      );
    }
  },
);

export const fetchAllInterviews = createAsyncThunk(
  "interview/fetchAllInterviews",
  async (_, thunkAPI) => {
    try {
      const response = await apiInstance.get("/interview");
      return response.data;
    } catch (error) {
      console.log("[Error | interview/fetchAllInterviews]: ", error);
      const compiledErrors = error.response?.data?.errors.map((err) => {
        return err.message;
      });
      console.log("Compiled Errors: ", compiledErrors);
      return thunkAPI.rejectWithValue(compiledErrors);
    }
  },
);

export const fetchCurrentInterview = createAsyncThunk(
  "interview/fetchCurrentInterview",
  async (id, thunkAPI) => {
    try {
      const response = await apiInstance.get(`/interview/${id}`);
      return response.data;
    } catch (error) {
      console.log("[Error | interview/fetchCurrentInterview]: ", error);
      const compiledErrors = error.response?.data?.errors.map((err) => {
        return err.message;
      });
      console.log("Compiled Errors: ", compiledErrors);
      return thunkAPI.rejectWithValue(compiledErrors);
    }
  },
);

const initialState = {
  interviews: [],
  loading: false,
  errors: [],
  activeInterview: {
    data: null,
    loading: false,
    errors: [],
  },
  createInterview: {
    data: null,
    loading: false,
    errors: [],
  },
};

const interviewSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    resetActiveInterview: (state) => {
      state.activeInterview = {
        data: null,
        loading: false,
        errors: [],
      };
    },
  },
  extraReducers: (builder) => {
    // FETCH ALL INTERVIEWS
    builder.addCase(fetchAllInterviews.fulfilled, (state, action) => {
      state.loading = false;
      state.interviews = action.payload.data;
      state.errors = [];
    });

    builder.addCase(fetchAllInterviews.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });

    builder.addCase(fetchAllInterviews.pending, (state, action) => {
      state.loading = true;
    });

    // FETCH CURRENT INTERVIEW
    builder.addCase(fetchCurrentInterview.fulfilled, (state, action) => {
      state.activeInterview.loading = false;
      state.activeInterview.data = action.payload.data;
      state.activeInterview.errors = [];
    });

    builder.addCase(fetchCurrentInterview.rejected, (state, action) => {
      state.activeInterview.loading = false;
      state.activeInterview.errors = action.payload;
    });

    builder.addCase(fetchCurrentInterview.pending, (state, action) => {
      state.activeInterview.loading = true;
    });

    // CREATE INTERVIEW
    builder.addCase(createInterview.fulfilled, (state, action) => {
      state.createInterview.loading = false;
      state.createInterview.data = action.payload.data;
      state.createInterview.errors = [];
    });

    builder.addCase(createInterview.rejected, (state, action) => {
      state.createInterview.loading = false;
      state.createInterview.errors = action.payload;
    });

    builder.addCase(createInterview.pending, (state, action) => {
      state.createInterview.loading = true;
    });
  },
});

export const { resetActiveInterview } = interviewSlice.actions;
export default interviewSlice.reducer;
