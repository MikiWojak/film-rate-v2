import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import FilmTile from '@/components/molecules/films/Tile';
import AsyncError from '@/components/organisms/router/AsyncError';

import { IBaseFilm, IFilmIndexLoaderData } from '@/types/api/film';

const Index = () => {
    const loaderData = useLoaderData() as IFilmIndexLoaderData;

    const renderFilmTiles = (films: IBaseFilm[]) =>
        films.map(film => <FilmTile key={film.id} film={film} />);

    return (
        <main className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={loaderData.films} errorElement={<AsyncError />}>
                    {renderFilmTiles}
                </Await>
            </Suspense>
        </main>
    );
};

export default Index;
