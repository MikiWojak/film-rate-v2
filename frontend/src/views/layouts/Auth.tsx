import { Link, Outlet } from 'react-router-dom';
import { FilmIcon } from '@heroicons/react/24/outline';

const Auth = () => (
    <div>
        <div className="w-screen flex justify-center sm:h-screen sm:items-center">
            <main className="w-full p-8 sm:max-w-128 sm:m-4 sm:rounded-2xl sm:shadow-2xl">
                <div className="flex items-center justify-center">
                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2.5 grow-0 text-2xl font-bold text-violet-500 hover:text-violet-600 md:text-4xl"
                    >
                        <FilmIcon className="size-8 md:size-10" />
                        Film Rate
                    </Link>
                </div>

                <Outlet />
            </main>
        </div>
    </div>
);

export default Auth;
