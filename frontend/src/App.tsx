import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements
} from 'react-router-dom';

import Index from '@/views/pages/Index';
import Login from '@/views/pages/Login';
import NotFound from '@/views/pages/NotFound';
import DefaultLayout from '@/views/layouts/Default';

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<DefaultLayout />}>
                <Route index element={<Index />} />

                <Route path="login" element={<Login />} />

                <Route path="*" element={<NotFound />} />
            </Route>
        </>
    )
);

const App = () => <RouterProvider router={router} />;

export default App;
