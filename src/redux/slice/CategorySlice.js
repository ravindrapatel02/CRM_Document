import { API_URL } from "@/src/api";
import jwtAxios from "@/src/services/auth";
// import { API_URL } from "../API";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const getCategory = createAsyncThunk('getCategory', async (data, thunkApi) => {
    try {
        //open when api create in post method
        // const response = await axios.post(
        //   FAQ_API_URL,data
        //End
        const response = await jwtAxios.post(API_URL.CATEGORY_LIST, data);
        const result = response.data;
        return result;
    } catch (error) { 
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }

})
const InitialValue = {
    data: [],
    loading: true,
    error: null,
    message:''
}

const categorySlice = createSlice({
    name: 'category',
    initialState: InitialValue,
    extraReducers: (builder) => {
        builder.addCase(getCategory.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload.data,
            state.message =action.payload.message
        });
        builder.addCase(getCategory.rejected, (state, action) => {
            state.loading = false;
            state.message=action.payload;
            state.data=[]
            state.error=action.payload
        });
    }
});

export default categorySlice.reducer