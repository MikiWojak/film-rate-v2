import { toast } from 'react-toastify';

import { store } from '@/redux';
import { authApiSlice } from '@/redux/auth/authApiSlice';

import type { IMeResponse } from '@/types/api/auth';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { StatusCodes as HTTP } from 'http-status-codes/build/cjs/status-codes';
import { redirect } from 'react-router-dom';

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
            return redirect('/login');
        }

        toast.error("Error while fetching logged user's profile");

        return null;
    }
};
