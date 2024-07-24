import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

 
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const getSector = createAsyncThunk('getSector', async (data, thunkApi) => {
    try {
        //open when api create in post method
        // const response = await axios.post(
        //   FAQ_API_URL,data
        //End
        const response = await jwtAxios.get(API_URL.GET_SECTOR);
        const result = response.data;
        return result;
    } catch (error) { 
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }

})
const InitialValue = {
    sectorData: [],
    loading: true,
    error: null,
    message:''
}

const SectorSlice = createSlice({
    name: 'sector',
    initialState: InitialValue,
    extraReducers: (builder) => {
        builder.addCase(getSector.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getSector.fulfilled, (state, action) => {
            state.loading = false;
            state.sectorData = action.payload.data,
            state.message =action.payload.message
        });
        builder.addCase(getSector.rejected, (state, action) => {
            state.loading = false;
            state.message=action.payload;
            state.sectorData=[]
            state.error=action.payload
        });
    }
});

export default SectorSlice.reducer