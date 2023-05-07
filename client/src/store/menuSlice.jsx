import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: 'menu',
    initialState: {},
    reducers: {
        _Condtion: (state, action) => { 
            state.condition = action.payload.condtion;
            state.data = action.payload.data;
        },
        getMenu: (state, action) => {
            state.list = action.payload;
        },
        failGetInfo: (state, action) => {
            state.error = action.payload;
        }
    }
})
export const { getMenu, failGetInfo } = menuSlice.actions;
export default menuSlice.reducer;