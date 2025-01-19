import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

import { store } from '@/redux';

const requireAuth = async (adminRoute = false) => {
    const { loggedIn, isAdmin } = store.getState().auth;

    if (!loggedIn) {
        const response = redirect(`/login`);

        throw response;
    }

    if (adminRoute && !isAdmin) {
        toast.error('Access denied');

        const response = redirect(`/`);

        throw response;
    }

    return null;
};

export default requireAuth;
