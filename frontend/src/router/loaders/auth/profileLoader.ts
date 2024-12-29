import { toast } from 'react-toastify';
import { StatusCodes as HTTP } from 'http-status-codes';

import { store } from '@/redux';
import { authApiSlice } from '@/redux/auth/authApiSlice';

import type { IMeResponse } from '@/types/api/auth';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const profileLoader = async (): Promise<
    IMeResponse | Response | null
> => {
    try {
        const response = await store
            .dispatch(
                authApiSlice.endpoints.me.initiate(undefined, {
                    forceRefetch: true
                })
            )
            .unwrap();

        return response;
    } catch (error) {
        const fetchError = error as FetchBaseQueryError;

        if (fetchError?.status === HTTP.UNAUTHORIZED) {
            return null;
        }

        toast.error("Error while fetching logged user's profile");

        return null;
    }
};
