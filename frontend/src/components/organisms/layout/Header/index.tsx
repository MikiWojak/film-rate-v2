import {
    FilmIcon,
    Bars3Icon,
    UserCircleIcon,
    ArrowRightEndOnRectangleIcon
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useOnClickOutside } from 'usehooks-ts';

import Menu from './Menu';
import { RootState } from '@/redux';

const Header = () => {
    const profileRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { loggedIn } = useSelector((state: RootState) => state.auth);

    const openMenu = () => {
        setIsMenuOpen(true);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useOnClickOutside(profileRef, closeMenu);

    return (
        <header className="flex justify-between items-center w-full h-16 p-4 bg-violet-500 text-white md:h-20 md:p-5">
            <div className="flex gap-2.5">
                <button>
                    <Bars3Icon className="size-8 md:size-10" />
                </button>

                <Link
                    to="/"
                    className="flex items-center gap-2.5 hover:text-gray-200"
                >
                    <FilmIcon className="size-8 md:size-10" />

                    <div className="hidden md:block text-4xl font-bold">
                        Film Rate
                    </div>
                </Link>
            </div>

            <div className="flex gap-2.5">
                {loggedIn ? (
                    <div ref={profileRef} className="relative">
                        <button
                            className="flex items-center hover:text-gray-200"
                            onClick={openMenu}
                        >
                            <UserCircleIcon className="size-8 md:size-10" />
                        </button>

                        {isMenuOpen && <Menu closeMenu={closeMenu} />}
                    </div>
                ) : (
                    <Link
                        to="login"
                        className="flex items-center hover:text-gray-200"
                    >
                        <ArrowRightEndOnRectangleIcon className="size-8 md:size-10" />
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
