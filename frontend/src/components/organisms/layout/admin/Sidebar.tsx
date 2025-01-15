import { NavLink } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';
import { FilmIcon } from '@heroicons/react/24/outline';

const Sidebar = () => {
    // @TODO Some distinction between header and sidebar
    // @TODO Admin panel info - show in Header
    return (
        <nav className="flex flex-col w-full bg-violet-500 sm:max-w-52 text-white md:w-52">
            <div className="flex items-center justify-center p-4 font-bold text-lg">
                Admin panel
            </div>
            <NavLink
                to="/admin"
                className="flex items-center gap-2 p-4 hover:bg-violet-600"
            >
                <HomeIcon className="size-6" />
                <div>Dashboard</div>
            </NavLink>
            <NavLink
                to="/admin/films"
                className="flex items-center gap-2 p-4 hover:bg-violet-600"
            >
                <FilmIcon className="size-6" />
                <div>Films</div>
            </NavLink>
        </nav>
    );
};

export default Sidebar;
