import { store } from '@/redux';
import { defer } from 'react-router-dom';

import { authApiSlice } from '@/redux/auth/authApiSlice';

export const profileLoader = () => {
    const responsePromise = store
        .dispatch(
            authApiSlice.endpoints.me.initiate(undefined, {
                forceRefetch: true
            })
        )
        .unwrap();

    return defer({
        profile: responsePromise
    });
};
