import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getMyTaskList = createAsyncThunk(
  "getMyTaskList",
  async (data, thunkApi) => {
    try {
      //open when api create in post method
      const response = await jwtAxios.post(API_URL.MY_TASK_LIST , data);
      const result = response.data;
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  taskData: [],
  loading: true,
  error: null,
  message: "",
};

const myTaskSlice = createSlice({
  name: "myTask",
  initialState: InitialValue,
  extraReducers: (builder) => {
    builder.addCase(getMyTaskList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getMyTaskList.fulfilled, (state, action) => {
      state.loading = false;
      (state.taskData = action.payload.data),
        (state.message = action.payload.message);
    });
    builder.addCase(getMyTaskList.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.taskData = [];
      state.error = action.payload;
    });
  },
});

export default myTaskSlice.reducer;
