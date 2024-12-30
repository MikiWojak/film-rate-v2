import { store } from '@/redux';
import { filmApiSlice } from '@/redux/film/filmApiSlice';

import type { IFilm } from '@/types/api/film';

export const indexLoader = async (): Promise<IFilm[] | null> => {
    const response = await store
        .dispatch(filmApiSlice.endpoints.index.initiate())
        .unwrap();

    return response;
};
