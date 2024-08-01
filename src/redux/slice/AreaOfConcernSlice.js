import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getAreaOfConcern = createAsyncThunk(
  "getAreaOfConcern",
  async (data, thunkApi) => {
    try {
      //open when api create in post method

      const response = await jwtAxios.get(API_URL.GET_AREA_CONCERN_LIST);
      const result = response.data;
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  areaConcernData: [],
  loading: true,
  error: null,
  message: "",
};

const areaOfConcernSlice = createSlice({
  name: "areaOfConcernSlice",
  initialState: InitialValue,
  extraReducers: (builder) => {
    builder.addCase(getAreaOfConcern.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAreaOfConcern.fulfilled, (state, action) => {
      state.loading = false;
      (state.areaConcernData = action.payload.data),
        (state.message = action.payload.message);
    });
    builder.addCase(getAreaOfConcern.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.areaConcernData = [];
      state.error = action.payload;
    });
  },
});

export default areaOfConcernSlice.reducer;
