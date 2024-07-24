import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

 
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getBookingDetails = createAsyncThunk(
  "getBookingDetails",
  async (data, thunkApi) => {
    try {
      //open when api create in post method

      const response = await jwtAxios.get(
        API_URL.BOOKING_DETAILS +
          `?userId=${data.userId}`
      );
      const result = response.data;
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  bookingData: [],
  loading: true,
  error: null,
  message: "",
};

const BookingDetailsSlice = createSlice({
  name: "bookingDetails",
  initialState: InitialValue,
  extraReducers: (builder) => {
    builder.addCase(getBookingDetails.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getBookingDetails.fulfilled, (state, action) => {
      state.loading = false;
      (state.bookingData = action.payload.data),
        (state.message = action.payload.message);
    });
    builder.addCase(getBookingDetails.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.bookingData = [];
      state.error = action.payload;
    });
  },
});

export default BookingDetailsSlice.reducer;
