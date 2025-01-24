import {
    Await,
    useNavigate,
    useLoaderData,
    useRevalidator
} from 'react-router-dom';
import { toast } from 'react-toastify';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { Suspense, useState } from 'react';

import { RootState } from '@/redux';
import FilmTile from '@/components/molecules/films/Tile';
import AsyncError from '@/components/organisms/router/AsyncError';
import RateFilmModal from '@/components/organisms/films/RateModal';

import type { IBaseFilm, IFilmIndexLoaderData } from '@/types/api/film';

const Index = () => {
    const navigate = useNavigate();
    const { revalidate } = useRevalidator();
    const loaderData = useLoaderData() as IFilmIndexLoaderData;

    const [rateFilmModalVisible, setRateFilmModalVisible] = useState(false);
    const [selectedFilm, setSelectedFilm] = useState<IBaseFilm | null>(null);

    const { loggedIn } = useSelector((state: RootState) => state.auth);

    const showRateFilmModal = (film: IBaseFilm) => {
        if (!loggedIn) {
            toast.error('You must login first!');

            navigate('/login');

            return;
        }

        setSelectedFilm(film);
        setRateFilmModalVisible(true);
    };

    const closeRateFilmModal = () => {
        setRateFilmModalVisible(false);
        setSelectedFilm(null);

        revalidate();
    };

    const renderFilmTiles = (films: IBaseFilm[]) =>
        films.length > 0 ? (
            films.map(film => (
                <FilmTile
                    key={film.id}
                    film={film}
                    onRateButtonClick={showRateFilmModal}
                />
            ))
        ) : (
            <div className="col-span-2 md:col-span-4 text-center">
                No films found
            </div>
        );

    return (
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
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
        </div>
    );
};

export default Index;
