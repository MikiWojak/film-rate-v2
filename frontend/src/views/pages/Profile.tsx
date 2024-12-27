import { useLoaderData } from 'react-router';

import { IMeResponse } from '@/types/api/auth.ts';

const Profile = () => {
    const profile = useLoaderData() as IMeResponse;

    return (
        <div className="max-w-96 mx-auto">
            <h1 className="mb-4 text-lg text-center font-medium sm:text-xl">
                Profile
            </h1>

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
