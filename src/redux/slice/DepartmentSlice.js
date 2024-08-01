import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getDepartment = createAsyncThunk(
  "getDepartment",
  async (data, thunkApi) => {
    try {
      //open when api create in post method

      const response = await jwtAxios.get(API_URL.GET_DEPARTMENT);
      const result = response.data;
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  deptData: [],
  loading: true,
  error: null,
  message: "",
};

const departmentSlice = createSlice({
  name: "departmentData",
  initialState: InitialValue,
  extraReducers: (builder) => {
    builder.addCase(getDepartment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getDepartment.fulfilled, (state, action) => {
      state.loading = false;
      (state.deptData = action.payload.data),
        (state.message = action.payload.message);
    });
    builder.addCase(getDepartment.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.deptData = [];
      state.error = action.payload;
    });
  },
});

export default departmentSlice.reducer;
