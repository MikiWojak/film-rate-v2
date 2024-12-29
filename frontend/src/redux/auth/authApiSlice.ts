import { apiSlice } from '@/redux/apiSlice';

import type {
    IMeResponse,
    ILoginRequest,
    ITokenResponse
} from '@/types/api/auth';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<ITokenResponse, ILoginRequest>({
            query: body => ({
                url: '/v1/auth/login',
                method: 'POST',
                body
            })
        }),
        me: builder.query<IMeResponse, void>({
            query: () => ({
                url: '/v1/auth/me'
            })
        })
    })
});
