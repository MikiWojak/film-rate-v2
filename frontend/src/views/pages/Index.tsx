import { createPortal } from 'react-dom';
import { Suspense, useState } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import FilmTile from '@/components/molecules/films/Tile';
import AsyncError from '@/components/organisms/router/AsyncError';
import RateFilmModal from '@/components/organisms/films/RateModal';

import type { IBaseFilm, IFilmIndexLoaderData } from '@/types/api/film';

const Index = () => {
    const loaderData = useLoaderData() as IFilmIndexLoaderData;

    const [rateFilmModalVisible, setRateFilmModalVisible] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState<IBaseFilm | null>(null);

    const showRateFilmModal = (film: IBaseFilm) => {
        setSelectedFilm(film);
        setRateFilmModalVisible(true);
    };

    const closeRateFilmModal = () => {
        setRateFilmModalVisible(false);
        setSelectedFilm(null);
    };

    const renderFilmTiles = (films: IBaseFilm[]) =>
        films.map(film => (
            <FilmTile
                key={film.id}
                film={film}
                onRateButtonClick={showRateFilmModal}
            />
        ));

    return (
        <main className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={loaderData.films} errorElement={<AsyncError />}>
                    {renderFilmTiles}
                </Await>
            </Suspense>

            {rateFilmModalVisible &&
                createPortal(
                    <RateFilmModal
                        film={selectedFilm}
                        onClose={closeRateFilmModal}
                    />,
                    document.body
                )}
        </main>
    );
};

export default Index;
