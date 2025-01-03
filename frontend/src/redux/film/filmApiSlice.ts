import { apiSlice } from '@/redux/apiSlice';

import { IFilm, IBaseFilm } from '@/types/api/film';

export const filmApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFilms: builder.query<IBaseFilm[], void>({
            query: () => '/v1/films'
        }),
        getFilmById: builder.query<IFilm, string>({
            query: id => `/v1/films/${id}`
        })
    }),
    overrideExisting: 'throw'
});
