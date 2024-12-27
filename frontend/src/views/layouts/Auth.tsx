import { Link, Outlet } from 'react-router-dom';

const Auth = () => (
    <div>
        <div className="w-screen flex justify-center sm:h-screen sm:items-center">
            <main className="w-full p-8 sm:max-w-128 sm:m-4 sm:rounded-2xl sm:shadow-2xl">
                <div className="text-center">
                    <Link
                        to="/"
                        className="text-2xl font-bold text-violet-500 hover:text-violet-600"
                    >
                        Film Rate
                    </Link>
                </div>

                <Outlet />
            </main>
        </div>
    </div>
);

export default Auth;
