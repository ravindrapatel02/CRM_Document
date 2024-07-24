import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getSurveyTitle = createAsyncThunk(
  "getSurveyTitle",
  async (data, thunkApi) => {
    try {
      //open when api create in post method
      // const response = await axios.post(
      //   FAQ_API_URL,data
      //End
      const response = await jwtAxios.post(API_URL.SURVEY_TITLE, {});
      const result = response.data;
      return result;
    } catch (error) {
      const message = error.message;
      return thunkApi.rejectWithValue(message);
    }
  }
);
const InitialValue = {
  surveyTitle: [],
  surveyLoading: true,
  surveyError: null,
  surveyMessage: "",
};

const surveyTitleSlice = createSlice({
  name: "surveyTitle",
  initialState: InitialValue,
  extraReducers: (builder) => {
    builder.addCase(getSurveyTitle.pending, (state, action) => {
      state.surveyLoading = true;
    });
    builder.addCase(getSurveyTitle.fulfilled, (state, action) => {
      state.surveyLoading = false;
      (state.surveyTitle = action.payload.data),
        (state.surveyMessage = action.payload.message);
    });
    builder.addCase(getSurveyTitle.rejected, (state, action) => {
      state.surveyLoading = false;
      state.surveyMessage = action.payload;
      state.surveyTitle = [];
      state.surveyError = action.payload;
    });
  },
});

export default surveyTitleSlice.reducer;
