import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getSPOCList = createAsyncThunk(
  "getSPOCList",
  async (data, thunkApi) => {
    try {
      //open when api create in post method

      const response = await jwtAxios.post(API_URL.GET_USER_LIST , data);
      const result = response.data;
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  spocData: [],
  loading: true,
  error: null,
  message: "",
};

const spocListSlice = createSlice({
  name: "spocList",
  initialState: InitialValue,
  extraReducers: (builder) => {
    builder.addCase(getSPOCList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getSPOCList.fulfilled, (state, action) => {
      state.loading = false;
      (state.spocData = action.payload.data),
        (state.message = action.payload.message);
    });
    builder.addCase(getSPOCList.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.spocData = [];
      state.error = action.payload;
    });
  },
});

export default spocListSlice.reducer;
