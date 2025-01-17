import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import checkIsAdmin from '@/helpers/checkIsAdmin';

import type { ITokenResponse } from '@/types/api/auth';

const initialState = {
    loggedIn: !!localStorage.getItem('accessToken'),
    isAdmin: checkIsAdmin(),
    accessToken: localStorage.getItem('accessToken')
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<ITokenResponse>) => {
            const { accessToken } = action.payload;

            localStorage.setItem('accessToken', accessToken);

            state.loggedIn = true;
            state.isAdmin = checkIsAdmin();
            state.accessToken = accessToken;
        },
        logoutUser: state => {
            localStorage.removeItem('accessToken');
            state.loggedIn = false;
            state.isAdmin = false;
            state.accessToken = null;
        }
    }
});

export const { setCredentials, logoutUser } = authSlice.actions;

export default authSlice.reducer;
