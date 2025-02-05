import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getComplaintViewRequest = createAsyncThunk(
  "getComplaintViewRequest",
  async (data, thunkApi) => {
    try {
      //open when api create in post method

      const response = await jwtAxios.post(API_URL.GET_COMPLAINT_REQUEST , data);
      // const result = response.data;
      const result = response.data;
      const newArray = result.data;

      const newList = newArray.sort((a, b) =>
        parseInt(b.complNumb.substring(4)) - parseInt(a.complNumb.substring(4))
      );
      return {
        ...result,
        data: newList
      };
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  complaintList: [],
  loading: true,
  error: null,
  message: "",
};

const complaintViewRequestSlice = createSlice({
  name: "complaintViewRequestSlice",
  initialState: InitialValue,
  extraReducers: (builder) => {
    builder.addCase(getComplaintViewRequest.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getComplaintViewRequest.fulfilled, (state, action) => {
      state.loading = false;
      (state.complaintList = action.payload.data),
        (state.message = action.payload.message);
    });
    builder.addCase(getComplaintViewRequest.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.complaintList = [];
      state.error = action.payload;
    });
  },
});

export default complaintViewRequestSlice.reducer;
