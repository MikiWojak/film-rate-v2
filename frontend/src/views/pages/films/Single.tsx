import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Suspense, useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { Await, useLoaderData } from 'react-router-dom';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

import { RootState } from '@/redux';
import getFullImagePath from '@/helpers/getFullImagePath';
import BackButton from '@/components/atoms/common/BackButton';
import AsyncError from '@/components/organisms/router/AsyncError';
import RateFilmModal from '@/components/organisms/films/RateModal';

import type { IFilm, IFilmShowLoaderData } from '@/types/api/film';

const Single = () => {
    const navigate = useNavigate();
    const loaderData = useLoaderData() as IFilmShowLoaderData;

    const [rateFilmModalVisible, setRateFilmModalVisible] = useState(false);

    const { loggedIn } = useSelector((state: RootState) => state.auth);

    const showRateFilmModal = () => {
        if (!loggedIn) {
            toast.error('You must login first!');

            navigate('/login');

            return;
        }

        setRateFilmModalVisible(true);
    };

    // @TODO Refresh on success
    const closeRateFilmModal = () => {
        setRateFilmModalVisible(false);
    };

    const renderFilmData = (film: IFilm) => {
        const { title, posterUrl, description, avgRate, releaseDate } = film;

        const fullPosterUrl = getFullImagePath(posterUrl);
        const formattedReleaseDate = dayjs(releaseDate).format('DD.MM.YYYY');

        return (
            <>
                <header>
                    <h1 className="text-3xl font-bold text-center">{title}</h1>
                </header>

                <div className="flex flex-col md:flex-row gap-4 w-3/4 mx-auto md:w-1/2">
                    <img
                        src={fullPosterUrl}
                        alt={title}
                        className="block rounded-xl md:w-1/2"
                    />

                    <div className="flex flex-col md:justify-between md:items-start">
                        <div className="flex items-center justify-between md:flex-col">
                            <div className="flex items-center gap-1 md:gap-2">
                                <StarIcon className="size-6 text-yellow-400" />
                                <span>{avgRate.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={showRateFilmModal}
                                className="group flex items-center gap-1 md:gap-2"
                            >
                                <StarOutlineIcon className="size-6 text-gray-300 group-hover:text-gray-400" />
                                <span className="group-hover:underline">
                                    Rate
                                </span>
                            </button>
                        </div>

                        <div className="hidden md:block">
                            <span>Release date: </span>
                            <b>{formattedReleaseDate}</b>
                        </div>
                    </div>
                </div>

                <div className="md:hidden">
                    <span>Release date: </span>
                    <b>{formattedReleaseDate}</b>
                </div>

                <div className="whitespace-pre-line">{description}</div>

                {rateFilmModalVisible &&
                    createPortal(
                        <RateFilmModal
                            film={film}
                            onClose={closeRateFilmModal}
                        />,
                        document.body
                    )}
            </>
        );
    };

    return (
        <main className="flex flex-col gap-4">
            <BackButton />

            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={loaderData.film} errorElement={<AsyncError />}>
                    {renderFilmData}
                </Await>
            </Suspense>
        </main>
    );
};

export default Single;
