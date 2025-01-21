import {
    Route,
    Outlet,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Index from '@/views/pages/Index';
import Login from '@/views/pages/Login';
import Profile from '@/views/pages/Profile';
import AuthLayout from '@/views/layouts/Auth';
import NotFound from '@/views/pages/NotFound';
import Register from '@/views/pages/Register';
import AdminLayout from '@/views/layouts/Admin';
import DefaultLayout from '@/views/layouts/Default';
import SingleFilm from '@/views/pages/films/Single';
import requireAuth from '@/router/loaders/requireAuth';
import AdminAddFilm from '@/views/pages/admin/films/Add';
import requireGuest from '@/router/loaders/requireGuest';
import AdminDashboard from '@/views/pages/admin/Dashboard';
import AdminFilmsIndex from '@/views/pages/admin/films/Index';
import { loginAction } from '@/router/actions/auth/loginAction';
import { profileLoader } from '@/router/loaders/auth/profileLoader';
import { registerAction } from '@/router/actions/auth/registerAction';
import { showLoader as filmShowLoader } from '@/router/loaders/film/showLoader';
import { storeAction as storeFilmAction } from '@/router/actions/film/storeAction';
import { indexLoader as filmIndexLoader } from '@/router/loaders/film/indexLoader';
import { indexLoader as adminFilmIndexLoader } from '@/router/loaders/admin/film/indexLoader';

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Index />} loader={filmIndexLoader} />

                <Route
                    path="films/:id"
                    element={<SingleFilm />}
                    loader={filmShowLoader}
                />

                <Route
                    path="profile"
                    element={<Profile />}
                    loader={async () => {
                        await requireAuth();

                        return profileLoader();
                    }}
                />

                <Route path="*" element={<NotFound />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
                <Route
                    index
                    element={<AdminDashboard />}
                    loader={async () => requireAuth(true)}
                />

                <Route path="films" element={<Outlet />}>
                    <Route
                        index
                        element={<AdminFilmsIndex />}
                        loader={async () => {
                            await requireAuth(true);

                            return adminFilmIndexLoader();
                        }}
                    />

                    <Route
                        path="add"
                        element={<AdminAddFilm />}
                        loader={async () => requireAuth(true)}
                        action={storeFilmAction}
                    />
                </Route>
            </Route>

            <Route path="/" element={<AuthLayout />}>
                <Route
                    path="login"
                    element={<Login />}
                    loader={requireGuest}
                    action={loginAction}
                />

                <Route
                    path="register"
                    element={<Register />}
                    loader={requireGuest}
                    action={registerAction}
                />
            </Route>
        </>
    )
);

const App = () => (
    <>
        <RouterProvider router={router} />

        <ToastContainer position="bottom-center" theme="colored" />
    </>
);

export default App;
