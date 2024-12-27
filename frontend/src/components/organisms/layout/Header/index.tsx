import {
    FilmIcon,
    UserIcon,
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
        <header className="flex justify-between items-center w-full h-16 px-4 py-3 bg-violet-500 text-white">
            <div className="flex gap-2.5">
                <Link
                    to="/"
                    className="flex items-center justify-between gap-2.5"
                >
                    <FilmIcon className="h-5 w-5" />

                    <div className="hidden md:block">Film Rate</div>
                </Link>
            </div>

            <div className="flex gap-2.5">
                {loggedIn ? (
                    <div ref={profileRef} className="relative">
                        <button
                            className="flex items-center justify-between gap-2.5"
                            onClick={openMenu}
                        >
                            <UserIcon className="h-5 w-5" />
                        </button>

                        {isMenuOpen && <Menu closeMenu={closeMenu} />}
                    </div>
                ) : (
                    <Link
                        to="login"
                        className="flex items-center justify-between gap-2.5"
                    >
                        <ArrowRightEndOnRectangleIcon className="h-5 w-5" />
                    </Link>
                )}
            </div>
        </header>
    );
};

export default Header;
