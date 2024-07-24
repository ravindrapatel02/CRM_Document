import { API_URL } from "src/api";
import jwtAxios from "src/services/auth";

 
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const getEntity = createAsyncThunk('getEntity', async (data, thunkApi) => {
    try {
        //open when api create in post method
        // const response = await axios.post(
        //   FAQ_API_URL,data
        //End
        const response = await jwtAxios.post(API_URL.GEt_ENTITY, data);
        const result = response.data;
        return result;
    } catch (error) { 
        const message = error.message;
        return thunkApi.rejectWithValue(message);
    }

})
const InitialValue = {
    entityData: [],
    loading: true,
    error: null,
    message:''
}

const entitySlice = createSlice({
    name: 'entity',
    initialState: InitialValue,
    extraReducers: (builder) => {
        builder.addCase(getEntity.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getEntity.fulfilled, (state, action) => {
            state.loading = false;
            state.entityData = action.payload.data,
            state.message =action.payload.message
        });
        builder.addCase(getEntity.rejected, (state, action) => {
            state.loading = false;
            state.message=action.payload;
            state.entityData=[]
            state.error=action.payload
        });
    }
});

export default entitySlice.reducer