import { redirect } from 'react-router-dom';

import { store } from '@/redux';

const requireGuest = async () => {
    const { loggedIn } = store.getState().auth;

    if (loggedIn) {
        const response = redirect(`/`);

        throw response;
    }

    return null;
};

export default requireGuest;
