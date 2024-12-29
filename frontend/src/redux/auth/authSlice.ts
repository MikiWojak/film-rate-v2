import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { ITokenResponse } from '@/types/api/auth';

const initialState = {
    loggedIn: !!localStorage.getItem('accessToken'),
    accessToken: localStorage.getItem('accessToken')
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<ITokenResponse>) => {
            localStorage.setItem('accessToken', action.payload.accessToken);
            state.loggedIn = true;
            state.accessToken = action.payload.accessToken;
        },
        logoutUser: state => {
            localStorage.removeItem('accessToken');
            state.loggedIn = false;
            state.accessToken = null;
        }
    }
});

export const { setCredentials, logoutUser } = authSlice.actions;

export default authSlice.reducer;
