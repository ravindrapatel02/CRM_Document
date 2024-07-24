 
import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";
// import { API_URL } from "../API";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const getAllSeat = createAsyncThunk('getAllSeat', async (data, thunkApi) => {
    try {
        //open when api create in post method
       
        const response = await jwtAxios.get(API_URL.GET_ALL_SEAT +`?location=${data.location}&building=${data.building}&floor=${data.floor}`);
        const result = response.data;
        return result;
    } catch (error) { 
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }

})
const InitialValue = {
  allSeatData: [],
    loading: true,
    error: null,
    message:''
}

const AllSeatSlice = createSlice({
    name: 'allSeat',
    initialState: InitialValue,
    extraReducers: (builder) => {
        builder.addCase(getAllSeat.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAllSeat.fulfilled, (state, action) => {
            state.loading = false;
            state.allSeatData = action.payload.data,
            state.message =action.payload.message
        });
        builder.addCase(getAllSeat.rejected, (state, action) => {
            state.loading = false;
            state.message=action.payload;
            state.allSeatData=[]
            state.error=action.payload
        });
    }
});

export default AllSeatSlice.reducer