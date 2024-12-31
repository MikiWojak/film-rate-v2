import { apiSlice } from '@/redux/apiSlice';

import { IFilm, IBaseFilm } from '@/types/api/film';

export const filmApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        index: builder.query<IBaseFilm[], void>({
            query: () => '/v1/films'
        }),
        show: builder.query<IFilm, string | undefined>({
            query: id => `/v1/films/${id}`
        })
    })
});
