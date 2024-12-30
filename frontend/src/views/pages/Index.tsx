import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import FilmTile from '@/components/molecules/films/Tile';
import { IBaseFilm, IFilmIndexLoaderData } from '@/types/api/film.ts';

const Index = () => {
    const loaderData = useLoaderData() as IFilmIndexLoaderData;

    const renderFilmsList = (films: IBaseFilm[]) =>
        films.map(film => <FilmTile key={film.id} film={film} />);

    return (
        <main className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={loaderData.films}>{renderFilmsList}</Await>
            </Suspense>
        </main>
    );
};

export default Index;
