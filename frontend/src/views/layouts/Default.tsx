import { Outlet } from 'react-router-dom';

import Header from '@/components/organisms/layout/Header';

const Default = () => (
    <div>
        <Header />

        <div className="min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)] p-4">
            <main className="md:max-w-250 mx-auto">
                <Outlet />
            </main>
        </div>
    </div>
);

export default Default;
