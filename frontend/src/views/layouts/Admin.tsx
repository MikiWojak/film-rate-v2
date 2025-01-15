import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/organisms/layout/Header';
import AdminSidebar from '@/components/organisms/layout/admin/Sidebar';

const Admin = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true);
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false);
    };

    return (
        <div>
            {/*// @TODO Add switch (burger), especially for mobile*/}
            <Header />

            <div className="flex min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
                <div className="flex">
                    {isSidebarOpen && <AdminSidebar />}

                    <main className="p-4">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Admin;
