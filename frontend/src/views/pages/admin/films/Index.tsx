import { Link } from 'react-router-dom';
import { PlusCircleIcon } from '@heroicons/react/24/outline';

import FilmsTable from '@/components/molecules/films/Table';
import FilmMobileItem from '@/components/molecules/films/MobileItem';

import type { IBaseFilm } from '@/types/api/film';

const Index = () => {
    // @TODO TEMP - get from API!
    const films: IBaseFilm[] = [];

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between md:gap-0">
                <h1 className="text-2xl font-medium">Films</h1>

                <Link
                    to="/admin/films/add"
                    className="flex items-center gap-1 p-2 bg-violet-500 rounded-lg text-white font-medium hover:bg-violet-600 md:py-1"
                >
                    <PlusCircleIcon className="size-6 stroke-2" />
                    <div>Add new</div>
                </Link>
            </div>

            {films?.length > 0 ? (
                <>
                    <div className="flex flex-col gap-4 md:hidden">
                        {films.map(film => (
                            <FilmMobileItem key={film.id} film={film} />
                        ))}
                    </div>

                    <div className="hidden md:block">
                        <FilmsTable films={films} />
                    </div>
                </>
            ) : (
                <div className="text-center">No films found</div>
            )}
        </div>
    );
};

export default Index;
