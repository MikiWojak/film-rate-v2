import { apiSlice } from '@/redux/apiSlice';

import { IFilm } from '@/types/api/film.ts';

export const filmApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        index: builder.query<IFilm[], void>({
            query: () => ({
                url: '/v1/films'
            })
        })
    })
});
