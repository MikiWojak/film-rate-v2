import { useLoaderData } from 'react-router';

import type { IMeResponse } from '@/types/api/auth';

const Profile = () => {
    const profile = useLoaderData() as IMeResponse;

    return (
        <div className="max-w-96 mx-auto">
            <h1 className="mb-4 text-xl text-center font-medium">Profile</h1>

            <div>
                Username: <b>{profile?.username ? profile.username : '-'}</b>
            </div>
            <div>
                Email: <b>{profile?.email ? profile.email : '-'}</b>
            </div>
        </div>
    );
};

export default Profile;
