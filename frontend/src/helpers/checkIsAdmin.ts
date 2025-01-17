import { jwtDecode } from 'jwt-decode';

import { Role } from '@/enums/auth';
import type { IDecodedToken } from '@/types/api/auth';

const checkIsAdmin = () => {
    const token = localStorage.getItem('accessToken');

    if (!token) {
        return false;
    }

    const decoded: IDecodedToken = jwtDecode(token);

    return decoded.roles.some(role => role === Role.ADMIN);
};

export default checkIsAdmin;
