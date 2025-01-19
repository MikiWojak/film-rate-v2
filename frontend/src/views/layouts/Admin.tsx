import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/organisms/layout/Header';
import AdminSidebar from '@/components/organisms/layout/admin/Sidebar';

const Admin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(value => !value);
    };

    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    return (
        <div>
            <Header adminHeader onHamburgerMenuIconClick={toggleSidebar} />

            <div className="flex min-h-[calc(100vh-64px)] md:min-h-[calc(100vh-80px)]">
                {sidebarOpen && <AdminSidebar onClose={closeSidebar} />}

                <main
                    className={`${sidebarOpen ? 'hidden ' : ''}w-full p-4 sm:block`}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Admin;
