import { store } from '@/redux';
import { defer } from 'react-router-dom';

import { filmApiSlice } from '@/redux/film/filmApiSlice.ts';
import requireAuth from '@/utils/requireAuth.ts';

export const indexLoader = async () => {
    await requireAuth(true);

    const responsePromise = store
        .dispatch(
            filmApiSlice.endpoints.adminGetFilms.initiate(undefined, {
                forceRefetch: true
            })
        )
        .unwrap();

    return defer({
        films: responsePromise
    });
};
