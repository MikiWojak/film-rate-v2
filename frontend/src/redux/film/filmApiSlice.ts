import { apiSlice } from '@/redux/apiSlice';

import { IFilm, IBaseFilm, IRateFilmRequest } from '@/types/api/film';

export const filmApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getFilms: builder.query<IBaseFilm[], void>({
            query: () => '/v1/films',
            providesTags: ['Film']
        }),
        getFilmById: builder.query<IFilm, string>({
            query: id => `/v1/films/${id}`,
            providesTags: ['Film']
        }),
        rateFilm: builder.mutation<void, IRateFilmRequest>({
            query: ({ id, body }) => ({
                url: `/v1/films/${id}/rate`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['Film']
        }),
        removeRateFromFilm: builder.mutation<void, string>({
            query: id => ({
                url: `/v1/films/${id}/rate`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Film']
        }),
        adminGetFilms: builder.query<IBaseFilm[], void>({
            query: () => '/v1/admin/films'
        })
    }),
    overrideExisting: 'throw'
});

export const { useRateFilmMutation, useRemoveRateFromFilmMutation } =
    filmApiSlice;
