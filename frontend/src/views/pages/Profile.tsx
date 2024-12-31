import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import AwaitError from '@/components/organisms/router/AsyncError';

import type { IMeResponse, IProfileLoaderData } from '@/types/api/auth';

const Profile = () => {
    const loaderData = useLoaderData() as IProfileLoaderData;

    const renderProfileData = (profile: IMeResponse) => {
        const { username, email } = profile;

        return (
            <>
                <div>
                    Username: <b>{username}</b>
                </div>
                <div>
                    Email: <b>{email}</b>
                </div>
            </>
        );
    };

    return (
        <div>
            <h1 className="mb-4 text-xl text-center font-medium">Profile</h1>

            <Suspense fallback={<h1>Loading...</h1>}>
                <Await
                    resolve={loaderData.profile}
                    errorElement={<AwaitError />}
                >
                    {renderProfileData}
                </Await>
            </Suspense>
        </div>
    );
};

export default Profile;
