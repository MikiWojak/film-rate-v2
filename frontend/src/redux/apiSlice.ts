import {
    createApi,
    FetchArgs,
    BaseQueryFn,
    fetchBaseQuery,
    FetchBaseQueryError
} from '@reduxjs/toolkit/query/react';
import { StatusCodes as HTTP } from 'http-status-codes';

import config from '@/config';
import { logoutUser } from '@/redux/auth/authSlice';

import type { RootState } from '@/redux';

const baseQuery = fetchBaseQuery({
    baseUrl: config.apiUrl,
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken;

        if (accessToken) {
            headers.set('Authorization', `Bearer ${accessToken}`);
        }

        return headers;
    }
});

const baseQueryWithLogout: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, store, extraOptions) => {
    const result = await baseQuery(args, store, extraOptions);

    if (result?.error?.status === HTTP.UNAUTHORIZED) {
        store.dispatch(logoutUser());
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithLogout,
    endpoints: () => ({})
});
