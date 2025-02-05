import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getProgressStatus = createAsyncThunk(
  "getProgressStatus",
  async (data, thunkApi) => {
    try {
      //open when api create in post method
      const response = await jwtAxios.get(API_URL.GET_PROGRESS_STATUS+`?crmCode=${data.id}`);
      const result = response.data;
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  progressData: [],
  loading: true,
  error: null,
  message: "",
};

const myProgressstatusSlice = createSlice({
  name: "myProgressStatus",
  initialState: InitialValue,
  reducers: {
    // Reset function to set the state back to the initial value
    resetState: (state) => {
      state.progressData = InitialValue.progressData;
      state.loading = InitialValue.loading;
      state.error = InitialValue.error;
      state.message = InitialValue.message;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getProgressStatus.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getProgressStatus.fulfilled, (state, action) => {
      state.loading = false;
      (state.progressData = (action.payload.data).reverse()),
        (state.message = action.payload.message);
    });
    builder.addCase(getProgressStatus.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.progressData = [];
      state.error = action.payload;
    });
  },
});
export const resetMyProgressstatusSlice = myProgressstatusSlice.actions;
export default myProgressstatusSlice.reducer;
