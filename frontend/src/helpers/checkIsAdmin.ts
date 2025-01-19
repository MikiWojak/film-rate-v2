import { jwtDecode } from 'jwt-decode';

import { Role } from '@/enums/auth';
import type { IDecodedToken } from '@/types/api/auth';

const checkIsAdmin = () => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        return false;
    }

    const decoded: IDecodedToken = jwtDecode(accessToken);

    return decoded.roles.some(role => role === Role.ADMIN);
};

export default checkIsAdmin;
