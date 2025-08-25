import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    userDetails: [],
    tempDetails: [],
    loading: false,
    currentUser: JSON.parse(localStorage.getItem('user')) || null,
    currentRole: (JSON.parse(localStorage.getItem('user')) || {}).role || null,
    error: null,
    response: null,
    darkMode: true
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        authRequest: (state) => {
            state.status = 'loading';
            state.error = null;
            state.response = null;
        },
        underControl: (state) => {
            state.status = 'idle';
            state.response = null;
            state.error = null;
        },
        stuffAdded: (state, action) => {
            state.status = 'added';
            state.response = null;
            state.error = null;
            state.tempDetails = action.payload;
        },
        authSuccess: (state, action) => {
            state.status = 'success';
            state.currentUser = action.payload;
            state.currentRole = action.payload.role;
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.response = null;
            state.error = null;
        },
        authFailed: (state, action) => {
            state.status = 'failed';
            state.response = typeof action.payload === 'string' ? action.payload : 'Login failed.';
            state.error = null;
        },
        authError: (state, action) => {
            state.status = 'error';
            state.error = typeof action.payload === 'string'
                ? action.payload
                : 'An unexpected error occurred during authentication.';
        },
        authLogout: (state) => {
            localStorage.removeItem('user');
            state.currentUser = null;
            state.currentRole = null;
            state.status = 'idle';
            state.error = null;
            state.response = null;
        },

        doneSuccess: (state, action) => {
            state.userDetails = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getDeleteSuccess: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
        },

        getRequest: (state) => {
            state.loading = true;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = typeof action.payload === 'string' ? action.payload : 'Action failed.';
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.loading = false;
            state.error = typeof action.payload === 'string'
                ? action.payload
                : 'An unexpected error occurred.';
        },
        toggleDarkMode: (state) => {
            state.darkMode = !state.darkMode;
        }
    },
});

export const {
    authRequest,
    underControl,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
    toggleDarkMode
} = userSlice.actions;

export const userReducer = userSlice.reducer;
