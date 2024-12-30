import dayjs from 'dayjs';
import { Suspense } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { Await, useLoaderData } from 'react-router-dom';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

import getFullImagePath from '@/helpers/getFullImagePath';
import BackButton from '@/components/atoms/common/BackButton';

import type { IFilm, IFilmShowLoaderData } from '@/types/api/film';

const Index = () => {
    const loaderData = useLoaderData() as IFilmShowLoaderData;

    const onRateButtonClick = () => {
        alert('Rate film');
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
                                <StarIcon className="size-5 text-yellow-400 md:size-8" />
                                <span>{avgRate.toFixed(2)}</span>
                            </div>

                            <button
                                onClick={onRateButtonClick}
                                className="group flex items-center gap-1 md:gap-2"
                            >
                                <StarOutlineIcon className="size-5 text-gray-300 group-hover:text-gray-400 md:size-8" />
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
            </>
        );
    };

    return (
        <main className="flex flex-col gap-4">
            <BackButton />

            <Suspense fallback={<h1>Loading...</h1>}>
                <Await resolve={loaderData.film}>{renderFilmData}</Await>
            </Suspense>
        </main>
    );
};

export default Index;
