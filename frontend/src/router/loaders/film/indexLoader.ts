import { store } from '@/redux';
import { defer } from 'react-router-dom';

import { filmApiSlice } from '@/redux/film/filmApiSlice';

export const indexLoader = () => {
    const responsePromise = store
        .dispatch(filmApiSlice.endpoints.getFilms.initiate())
        .unwrap();

    return defer({
        films: responsePromise
    });
};
