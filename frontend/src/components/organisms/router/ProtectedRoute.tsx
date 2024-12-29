import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

import type { RootState } from '@/redux';

const ProtectedRoute = () => {
    const { loggedIn } = useSelector((state: RootState) => state.auth);

    return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
