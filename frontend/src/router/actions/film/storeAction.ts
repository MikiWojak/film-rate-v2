import { toast } from 'react-toastify';
import { StatusCodes as HTTP } from 'http-status-codes';
import { redirect, ActionFunctionArgs } from 'react-router-dom';

import { store } from '@/redux';
import { filmApiSlice } from '@/redux/film/filmApiSlice';

import type { IStoreFilmRequest } from '@/types/api/film';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { IErrorResponse } from '@/types/api/common.ts';

export const storeAction = async ({
    request
}: ActionFunctionArgs<IStoreFilmRequest>): Promise<
    Response | string[] | null
> => {
    const formData = await request.formData();

    try {
        await store
            .dispatch(filmApiSlice.endpoints.adminStoreFilm.initiate(formData))
            .unwrap();

        toast.success('Film has been added');

        return redirect('/admin/films');
    } catch (error) {
        const fetchError = error as FetchBaseQueryError;

        if (fetchError?.status === HTTP.BAD_REQUEST) {
            const apiErrorResponse = fetchError.data as IErrorResponse;
            const { message } = apiErrorResponse;

            toast.error('Recheck your form');

            return Array.isArray(message) ? message : [message];
        }
        if (fetchError?.status === HTTP.UNAUTHORIZED) {
            toast.error('Unauthorized');

            return null;
        }

        if (fetchError?.status === HTTP.FORBIDDEN) {
            toast.error('Forbidden');

            return null;
        }

        toast.error('Something went wrong...');

        return null;
    }
};
