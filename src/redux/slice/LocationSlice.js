import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getLocation = createAsyncThunk(
  "getLocation",
  async (data, thunkApi) => {
    try {
      //open when api create in post method
      const response = await jwtAxios.get(API_URL.GET_LOCATION);
      const result = response.data;
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  locationData: [],
  loading: true,
  error: null,
  message: "",
};

const locationSlice = createSlice({
  name: "location",
  initialState: InitialValue,
  extraReducers: (builder) => {
    builder.addCase(getLocation.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getLocation.fulfilled, (state, action) => {
      state.loading = false;
      (state.locationData = action.payload.data),
        (state.message = action.payload.message);
    });
    builder.addCase(getLocation.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.locationData = [];
      state.error = action.payload;
    });
  },
});

export default locationSlice.reducer;
