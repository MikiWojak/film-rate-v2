import { store } from '@/redux';
import { defer } from 'react-router-dom';

import { filmApiSlice } from '@/redux/film/filmApiSlice';

import type { LoaderFunctionArgs } from 'react-router';

export const showLoader = async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;

    const responsePromise = store
        .dispatch(filmApiSlice.endpoints.show.initiate(id))
        .unwrap();

    return defer({
        film: responsePromise
    });
};
