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
import NotFound from '@/views/pages/NotFound';
import AuthLayout from '@/views/layouts/Auth';
import DefaultLayout from '@/views/layouts/Default';
import { filmsLoader } from '@/router/loaders/film/filmsLoader';
import { loginAction } from '@/router/actions/auth/loginAction';
import { profileLoader } from '@/router/loaders/auth/profileLoader';
import AnonymousRoute from '@/components/organisms/router/AnonymousRoute';
import ProtectedRoute from '@/components/organisms/router/ProtectedRoute';

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Index />} loader={filmsLoader} />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="profile"
                        element={<Profile />}
                        loader={profileLoader}
                    />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Route>

            <Route element={<AnonymousRoute />}>
                <Route path="/" element={<AuthLayout />}>
                    <Route
                        path="login"
                        element={<Login />}
                        action={loginAction}
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
