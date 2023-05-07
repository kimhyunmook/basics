import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        login: false,
        loading: false,
        last_operation: ''
    },
    reducers: {
        _Login: (state, action) => {
            state.loading = true;
            state.last_operation = action.type
        },
        _Logout: (state, action) => {
            state.loading = true;
            state.last_operation = action.type
        },
        _Edit: (state, action) => {
            state.loading = false;
            state.last_operation = action.type
            state.edit = action.payload.edit;
        },
        _Delete: (state, action) => {
            state.loading = false;
            state.login = false;
            state.last_operation = action.type
            state.data = {};
        },
        getUser: (state, action) => {
            state.loading = false;
            state.data = action.payload.data;
            state.login = action.payload.login;
        },
        failedGetUser(state, action) {
            state.error = action.payload;
            state.loading = false;
            state.login = false;
        }
    }
});


export const {
    getUser,
    failedGetUser,
    _Login,
    _Logout,
    _Edit,
    _Delete,
} = userSlice.actions;
export default userSlice.reducer;