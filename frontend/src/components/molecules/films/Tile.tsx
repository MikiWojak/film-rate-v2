import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

import getFullImagePath from '@/helpers/getFullImagePath';

import type { IFilm } from '@/types/api/film';
import type { MouseEventHandler, MouseEvent } from 'react';

type ItemProps = {
    film: IFilm;
};

export const Tile = ({ film }: ItemProps) => {
    const { id, title, posterUrl, avgRate } = film;

    const fullPosterUrl = getFullImagePath(posterUrl);

    const onRateButtonClick: MouseEventHandler<HTMLButtonElement> | void = (
        event: MouseEvent
    ) => {
        event.preventDefault();
        event.stopPropagation();

        alert('Rate film');
    };

    return (
        <Link
            to={`/films/${id}`}
            className="flex flex-col min-h-64 shadow-md rounded-xl hover:shadow-2xl p-2 md:p-4 md:min-h-96"
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
                    <div className="flex items-center gap-1 md:gap-2">
                        <StarIcon className="size-5 text-yellow-400 md:size-8" />
                        <span>{avgRate.toFixed(2)}</span>
                    </div>

                    <button
                        onClick={onRateButtonClick}
                        className="group flex items-center gap-1 md:gap-2"
                    >
                        <StarOutlineIcon className="size-5 text-gray-300 group-hover:text-gray-400 md:size-8" />
                        <span className="group-hover:underline">Rate</span>
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default Tile;
