import { Suspense } from 'react';
import { Await, useLoaderData } from 'react-router-dom';

import AsyncError from '@/components/organisms/router/AsyncError';

import type { IProfileResponse, IProfileLoaderData } from '@/types/api/auth';

const Profile = () => {
    const loaderData = useLoaderData() as IProfileLoaderData;

    const renderProfileData = (profile: IProfileResponse) => {
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
            <h1 className="mb-4 text-2xl text-center font-medium">Profile</h1>

            <Suspense fallback={<h1>Loading...</h1>}>
                <Await
                    resolve={loaderData.profile}
                    errorElement={<AsyncError />}
                >
                    {renderProfileData}
                </Await>
            </Suspense>
        </div>
    );
};

export default Profile;
