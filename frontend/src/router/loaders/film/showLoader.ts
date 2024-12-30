import { store } from '@/redux';
import { filmApiSlice } from '@/redux/film/filmApiSlice';

import type { IFilm } from '@/types/api/film';
import type { LoaderFunctionArgs } from 'react-router';

export const showLoader = async ({
    params
}: LoaderFunctionArgs): Promise<IFilm> => {
    const { id } = params;

    const response = await store
        .dispatch(filmApiSlice.endpoints.show.initiate(id))
        .unwrap();

    return response;
};
