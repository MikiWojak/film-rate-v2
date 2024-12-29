import { toast } from 'react-toastify';
import { StatusCodes as HTTP } from 'http-status-codes';
import { redirect, ActionFunctionArgs } from 'react-router-dom';

import { store } from '@/redux';
import { setCredentials } from '@/redux/auth/authSlice';
import { authApiSlice } from '@/redux/auth/authApiSlice';

import type { ILoginRequest } from '@/types/api/auth';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const loginAction = async ({
    request
}: ActionFunctionArgs<ILoginRequest>): Promise<Response | null> => {
    const formData = await request.formData();

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const loginPayload: ILoginRequest = {
        email,
        password
    };

    try {
        const response = await store
            .dispatch(authApiSlice.endpoints.login.initiate(loginPayload))
            .unwrap();

        store.dispatch(setCredentials(response));

        toast.success("You've been logged in successfully");

        return redirect('/');
    } catch (error) {
        const fetchError = error as FetchBaseQueryError;

        if (fetchError?.status === HTTP.BAD_REQUEST) {
            toast.error('Recheck your form');

            return null;
        }

        if (fetchError?.status === HTTP.UNAUTHORIZED) {
            toast.error('Mismatching credentials');

            return null;
        }

        toast.error('Something went wrong...');

        return null;
    }
};
