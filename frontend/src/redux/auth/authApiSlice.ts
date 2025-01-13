import { apiSlice } from '@/redux/apiSlice';

import type {
    ILoginRequest,
    ITokenResponse,
    IProfileResponse,
    IRegisterRequest
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
        register: builder.mutation<IProfileResponse, IRegisterRequest>({
            query: body => ({
                url: '/v1/auth/register',
                method: 'POST',
                body
            })
        }),
        me: builder.query<IProfileResponse, void>({
            query: () => '/v1/auth/me'
        })
    }),
    overrideExisting: 'throw'
});
