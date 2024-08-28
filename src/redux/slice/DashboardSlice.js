import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getDashboard = createAsyncThunk(
  "getDashboard",
  async (data, thunkApi) => {
    try {
      //open when api create in post method

      const response = await jwtAxios.post(API_URL.DASHBOARD , data);
      const result = response.data;
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  dashboardData: [],
  loading: true,
  error: null,
  message: "",
};

const dashboardSlice = createSlice({
  name: "dashboardSlice",
  initialState: InitialValue,
  extraReducers: (builder) => {
    builder.addCase(getDashboard.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDashboard.fulfilled, (state, action) => {
      state.loading = false;
      (state.dashboardData = action.payload.data),
        (state.message = action.payload.message);
    });
    builder.addCase(getDashboard.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.dashboardData = [];
      state.error = action.payload;
    });
  },
});

export default dashboardSlice.reducer;
