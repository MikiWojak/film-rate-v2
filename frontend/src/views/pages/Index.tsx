import { useLoaderData } from 'react-router';

import FilmTile from '@/components/molecules/films/Tile';

import type { IFilm } from '@/types/api/film';

// @TODO Loader
const Index = () => {
    const films = useLoaderData() as IFilm[];

    const filmsList = films.map(film => <FilmTile key={film.id} film={film} />);

    return (
        <div className="md:max-w-[1000px] mx-auto">
            <main className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
                {filmsList}
            </main>
        </div>
    );
};

export default Index;
