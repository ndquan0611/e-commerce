import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as appService from '~/api/appService';

const initialState = {
    categories: null,
    isLoading: false,
};

const fetchGetCategories = createAsyncThunk('app/categories', async () => {
    const res = await appService.apiGetCategories();
    return res.data;
});

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(fetchGetCategories.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchGetCategories.fulfilled, (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.categories = action.payload;
        });

        builder.addCase(fetchGetCategories.rejected, (state, action) => {
            state.isLoading = false;
            state.errorMessage = action.payload.message;
        });
    },
});

export { fetchGetCategories };

export default appSlice.reducer;
