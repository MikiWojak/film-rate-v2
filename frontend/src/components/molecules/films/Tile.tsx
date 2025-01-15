import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';
import getFullImagePath from '@/helpers/getFullImagePath';

import type { MouseEventHandler, MouseEvent } from 'react';
import type { IBaseFilm, IFilm2User } from '@/types/api/film';

type ItemProps = {
    film: IBaseFilm;
    onRateButtonClick: (film: IBaseFilm) => void;
};

export const Tile = ({ film, onRateButtonClick }: ItemProps) => {
    const { id, title, posterUrl, avgRate, film2Users } = film;
    const film2User: IFilm2User | undefined = film2Users?.[0];
    const rate = film2User?.rate ?? null;

    const fullPosterUrl = getFullImagePath(posterUrl);

    const doOnRateButtonClick: MouseEventHandler<HTMLButtonElement> | void = (
        event: MouseEvent
    ) => {
        event.preventDefault();
        event.stopPropagation();

        onRateButtonClick(film);
    };

    return (
        <Link
            to={`/films/${id}`}
            className="flex flex-col min-h-64 p-2 shadow-md rounded-xl hover:shadow-2xl md:p-4 md:min-h-96"
        >
            <img
                src={fullPosterUrl}
                alt={title}
                className="block w-full h-2/3 object-cover rounded-xl md:h-3/4"
            />

            <div className="flex flex-col justify-between h-1/3 md:h-1/4">
                <div className="font-bold text-center line-clamp-2 mt-1 md:mt-2">
                    {title}
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5 md:gap-2">
                        <StarIcon className="size-6 text-yellow-400" />
                        <span>{avgRate.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={doOnRateButtonClick}
                        className="group flex items-center gap-0.5 md:gap-2"
                    >
                        {rate ? (
                            <StarIcon className="size-6 text-gray-300 group-hover:text-gray-400" />
                        ) : (
                            <StarOutlineIcon className="size-6 text-gray-300 group-hover:text-gray-400" />
                        )}

                        <span className="group-hover:underline">
                            {rate ? rate.toFixed(2) : 'Rate'}
                        </span>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default Tile;
