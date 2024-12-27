import { Link, Outlet } from 'react-router-dom';

const Auth = () => (
    <div>
        <div className="w-screen h-screen flex items-center justify-center ">
            <main className="w-full max-w-128 m-4 p-8 bg-white rounded-2xl text-sm sm:text-base shadow-2xl">
                <div className="text-center">
                    <Link
                        to="/"
                        className="text-xl font-bold text-violet-500 hover:text-violet-600 sm:text-2xl"
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
