import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

 
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const getQuestion = createAsyncThunk('getQuestion', async (data, thunkApi) => {
    try {
        //open when api create in post method
    
        const response = await jwtAxios.post(API_URL.GET_QUESTION, {});
        const result = response.data;
        return result;
    } catch (error) {
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }

})
const InitialValue = {
    questionData: [],
    loading: true,
    error: null,
    message:'',
}

const questionSlice = createSlice({
    name: 'question',
    initialState: InitialValue,
    extraReducers: (builder) => {
        builder.addCase(getQuestion.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getQuestion.fulfilled, (state, action) => {
            state.loading = false;
            state.questionData = action.payload.data
            state.message=action.payload.message
        });
        builder.addCase(getQuestion.rejected, (state, action) => {
            state.loading = false;
            state.questionData=[]
            state.message=action.payload;
            state.error=action.payload
        });
    }
});

export default questionSlice.reducer