import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../../utils/axios-instance";

export const fetchAllAnswers = createAsyncThunk(
  "answer/fetchAllAnswers",
  async (data, thunkAPI) => {
    try {
      const response = await apiInstance.get(`/answer/${data.id}`);
      return response.data;
    } catch (error) {
      console.log("[Error | answer/fetchAllAnswers]: ", error);
      const compiledErrors = error.response?.data?.errors.map((err) => {
        return err.message;
      });
      console.log("Compiled Errors: ", compiledErrors);
      return thunkAPI.rejectWithValue(compiledErrors);
    }
  },
);

export const saveAnswer = createAsyncThunk(
  "answer/saveAnswer",
  async (data, thunkAPI) => {
    try {
      const response = await apiInstance.post("/answer/save", data);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors || error.message,
      );
    }
  },
);

const initialState = {
  answers: [],
  loading: false,
  errors: [],
};

const answerSlice = createSlice({
  name: "interview",
  initialState,
  reducers: {
    resetActiveAnswers: (state) => {
      state.activeInterview = {
        data: null,
        loading: false,
        errors: [],
      };
    },
  },
  extraReducers: (builder) => {
    // FETCH ALL ANSWERS
    builder.addCase(fetchAllAnswers.fulfilled, (state, action) => {
      state.loading = false;
      state.answers = action.payload.data;
      state.errors = [];
    });

    builder.addCase(fetchAllAnswers.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });

    builder.addCase(fetchAllAnswers.pending, (state, action) => {
      state.loading = true;
    });

    // SAVE ANSWERS
    builder.addCase(saveAnswer.fulfilled, (state, action) => {
      state.loading = false;
      state.answers = [...state.answers, action.payload.data];
      state.errors = [];
    });

    builder.addCase(saveAnswer.rejected, (state, action) => {
      state.loading = false;
      state.errors = action.payload;
    });

    builder.addCase(saveAnswer.pending, (state, action) => {
      state.loading = true;
    });
  },
});

export const { resetActiveAnswers } = answerSlice.actions;
export default answerSlice.reducer;
