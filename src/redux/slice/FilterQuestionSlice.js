import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

 
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const getFilterQuestion = createAsyncThunk('getFilterQuestion', async (data, thunkApi) => {
    try {
        //open when api create in post method
        // const response = await axios.post(
        //   FAQ_API_URL,data
        //End
        const response = await jwtAxios.get(API_URL.GET_FILTER);
        const result = response.data;
        return result;
    } catch (error) { 
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }

})
const InitialValue = {
    filterData: [],
    loading: true,
    error: null,
    message:''
}

const filterQuestionSlice = createSlice({
    name: 'filter',
    initialState: InitialValue,
    extraReducers: (builder) => {
        builder.addCase(getFilterQuestion.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getFilterQuestion.fulfilled, (state, action) => {
            state.loading = false;
            state.filterData = action.payload.data,
            state.message =action.payload.message
        });
        builder.addCase(getFilterQuestion.rejected, (state, action) => {
            state.loading = false;
            state.message=action.payload;
            state.filterData=[]
            state.error=action.payload
        });
    }
});

export default filterQuestionSlice.reducer