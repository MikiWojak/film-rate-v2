import { Outlet } from 'react-router-dom';

import Header from '@/components/organisms/layout/Header';

const Default = () => (
    <div>
        <Header />

        <main className="w-full min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] p-4 font-roboto">
            <div className="md:max-w-250 mx-auto">
                <Outlet />
            </div>
        </main>
    </div>
);

export default Default;
