import {
    Route,
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
import AdminDashboard from '@/views/pages/admin/Dashboard';
import AdminFilmsIndex from '@/views/pages/admin/films/Index';
import { loginAction } from '@/router/actions/auth/loginAction';
import { profileLoader } from '@/router/loaders/auth/profileLoader';
import { registerAction } from '@/router/actions/auth/registerAction';
import AnonymousRoute from '@/components/organisms/router/AnonymousRoute';
import ProtectedRoute from '@/components/organisms/router/ProtectedRoute';
import { showLoader as filmShowLoader } from '@/router/loaders/film/showLoader';
import { indexLoader as filmIndexLoader } from '@/router/loaders/film/indexLoader';

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

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="profile"
                        element={<Profile />}
                        loader={profileLoader}
                    />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>

            {/*// @TODO Change layout*/}
            {/*// @TODO Restrict access to admin only!*/}
            <Route element={<ProtectedRoute />}>
                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />

                    <Route path="films" element={<AdminFilmsIndex />} />
                </Route>
            </Route>

            <Route element={<AnonymousRoute />}>
                <Route path="/" element={<AuthLayout />}>
                    <Route
                        path="login"
                        element={<Login />}
                        action={loginAction}
                    />

                    <Route
                        path="register"
                        element={<Register />}
                        action={registerAction}
                    />
                </Route>
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
