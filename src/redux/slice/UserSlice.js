import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getUserList = createAsyncThunk(
  "getUserList",
  async (data, thunkApi) => {
    try {
      //open when api create in post method
      const response = await jwtAxios.get(API_URL.GET__MASTER_USER , data);
      const result = response.data;
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  userData: [],
  loading: true,
  error: null,
  message: "",
};

const muserSlice = createSlice({
  name: "muser",
  initialState: InitialValue,
  extraReducers: (builder) => {
    builder.addCase(getUserList.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getUserList.fulfilled, (state, action) => {
      state.loading = false;
      (state.userData = action.payload.data),
        (state.message = action.payload.message);
    });
    builder.addCase(getUserList.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.userData = [];
      state.error = action.payload;
    });
  },
});

export default muserSlice.reducer;
