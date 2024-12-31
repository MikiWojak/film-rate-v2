import { toast } from 'react-toastify';
import { StatusCodes as HTTP } from 'http-status-codes';
import { redirect, ActionFunctionArgs } from 'react-router-dom';

import { store } from '@/redux';
import { authApiSlice } from '@/redux/auth/authApiSlice';

import type { IRegisterRequest } from '@/types/api/auth';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

export const registerAction = async ({
    request
}: ActionFunctionArgs<IRegisterRequest>): Promise<Response | null> => {
    const formData = await request.formData();

    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    const registerPayload: IRegisterRequest = {
        username,
        email,
        password,
        confirmPassword
    };

    try {
        await store
            .dispatch(authApiSlice.endpoints.register.initiate(registerPayload))
            .unwrap();

        toast.success("You've been registered successfully");

        return redirect('/login');
    } catch (error) {
        const fetchError = error as FetchBaseQueryError;

        if (fetchError?.status === HTTP.BAD_REQUEST) {
            toast.error('Recheck your form');

            return null;
        }

        toast.error('Something went wrong...');

        return null;
    }
};
