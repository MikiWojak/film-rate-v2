import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useRevalidator } from 'react-router-dom';

import { store } from '@/redux';
import { apiSlice } from '@/redux/apiSlice';
import { logoutUser } from '@/redux/auth/authSlice';

interface MenuProps {
    closeMenu: () => void;
}

const Menu = ({ closeMenu }: MenuProps) => {
    const dispatch = useDispatch();
    const { revalidate } = useRevalidator();

    const doLogout = () => {
        dispatch(logoutUser());

        toast.success("You've been logged out");

        store.dispatch(apiSlice.util.invalidateTags(['Film']));

        revalidate();
    };

    return (
        <div className="absolute right-0 flex flex-col items-center gap-2 p-3 mt-2 w-72 bg-white rounded-b-2xl shadow-lg text-black">
            {/*// @TODO Show for admin only!*/}
            <Link
                to="/admin"
                className="w-48 p-2 bg-gray-200 text-center rounded-2xl hover:bg-gray-300"
                onClick={closeMenu}
            >
                Admin Panel
            </Link>
            <Link
                to="/profile"
                className="w-48 p-2 bg-gray-200 text-center rounded-2xl hover:bg-gray-300"
                onClick={closeMenu}
            >
                Profile
            </Link>
            <button
                className="w-48 p-2 bg-gray-200 rounded-2xl hover:bg-gray-300"
                onClick={doLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default Menu;
