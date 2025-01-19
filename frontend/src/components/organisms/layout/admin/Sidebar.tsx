import { NavLink } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';
import { FilmIcon } from '@heroicons/react/24/outline';

type Props = {
    onClose: () => void;
};

// @TODO Is there a way to close menu on mobile only?
const Sidebar = ({ onClose }: Props) => {
    // @TODO Some distinction between header and sidebar
    return (
        <nav className="flex flex-col w-full bg-violet-500 sm:max-w-52 text-white">
            <NavLink
                to="/admin"
                className="flex items-center gap-2 p-4 hover:bg-violet-600"
                onClick={onClose}
            >
                <HomeIcon className="size-6" />
                <div>Dashboard</div>
            </NavLink>
            <NavLink
                to="/admin/films"
                className="flex items-center gap-2 p-4 hover:bg-violet-600"
                onClick={onClose}
            >
                <FilmIcon className="size-6" />
                <div>Films</div>
            </NavLink>
        </nav>
    );
};

export default Sidebar;
