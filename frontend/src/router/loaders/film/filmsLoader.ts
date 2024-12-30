import { toast } from 'react-toastify';

import { store } from '@/redux';
import { filmApiSlice } from '@/redux/film/filmApiSlice';

import type { IFilm } from '@/types/api/film';

export const filmsLoader = async (): Promise<IFilm[] | null> => {
    try {
        const response = await store
            .dispatch(filmApiSlice.endpoints.index.initiate())
            .unwrap();

        return response;
    } catch {
        toast.error('Error while fetching films');

        return null;
    }
};
