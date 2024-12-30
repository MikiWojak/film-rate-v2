import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Film from '@/views/pages/Film';
import Index from '@/views/pages/Index';
import Login from '@/views/pages/Login';
import Profile from '@/views/pages/Profile';
import NotFound from '@/views/pages/NotFound';
import AuthLayout from '@/views/layouts/Auth';
import DefaultLayout from '@/views/layouts/Default';
import Error from '@/components/organisms/router/Error';
import { loginAction } from '@/router/actions/auth/loginAction';
import { profileLoader } from '@/router/loaders/auth/profileLoader';
import AnonymousRoute from '@/components/organisms/router/AnonymousRoute';
import ProtectedRoute from '@/components/organisms/router/ProtectedRoute';
import { showLoader as filmShowLoader } from '@/router/loaders/film/showLoader';
import { indexLoader as filmIndexLoader } from '@/router/loaders/film/indexLoader';

import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<DefaultLayout />}>
                <Route
                    index
                    element={<Index />}
                    errorElement={<Error />}
                    loader={filmIndexLoader}
                />

                <Route
                    path="films/:id"
                    element={<Film />}
                    errorElement={<Error />}
                    loader={filmShowLoader}
                />

                <Route element={<ProtectedRoute />}>
                    <Route
                        path="profile"
                        element={<Profile />}
                        errorElement={<Error />}
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
