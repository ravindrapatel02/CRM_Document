import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getBookedSeat = createAsyncThunk(
  "getBookedSeat",
  async (data, thunkApi) => {
    try {
      //open when api create in post method

      const response = await jwtAxios.post(API_URL.SEAT_DATA, data);
      const result = response.data;
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  data: [],
  loading2: true,
  error: null,
  message: "",
};

const seatSlice = createSlice({
  name: "bookedSeat",
  initialState: InitialValue,
  extraReducers: (builder) => {
    builder.addCase(getBookedSeat.pending, (state, action) => {
      state.loading2 = true;
    });
    builder.addCase(getBookedSeat.fulfilled, (state, action) => {
      state.loading2 = false;
      (state.data = action.payload.data),
        (state.message = action.payload.message);
    });
    builder.addCase(getBookedSeat.rejected, (state, action) => {
      state.loading2 = false;
      state.message = action.payload;
      state.data = [];
      state.error = action.payload;
    });
  },
});

export default seatSlice.reducer;
