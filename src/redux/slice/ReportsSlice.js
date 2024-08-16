import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getReports = createAsyncThunk(
  "getReports",
  async (data, thunkApi) => {
    try {
      //open when api create in post method
      const response = await jwtAxios.post(API_URL.REPORTS , data);
      const result = response.data;
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  reportData: [],
  loading: true,
  error: null,
  message: "",
};

const reportsSlice = createSlice({
  name: "reports",
  initialState: InitialValue,
  extraReducers: (builder) => {
    builder.addCase(getReports.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getReports.fulfilled, (state, action) => {
      state.loading = false;
      (state.reportData = action.payload.data),
        (state.message = action.payload.message);
    });
    builder.addCase(getReports.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.reportData = [];
      state.error = action.payload;
    });
  },
});

export default reportsSlice.reducer;
