import React from 'react'
import AdminSidebar from '@/components/UI/AdminSidebar'
import AdminHeader from '@/components/UI/AdminHeader'
import { Breadcrumb } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import './AdminLayout.css';
const AdminLayout = ({ children }) => {
    const location = useLocation();
    const path = location.pathname.split('/'); // Split path into segments

    const breadcrumbs = path.reduce((acc, segment, index) => {
        if (segment) { // Exclude empty segments
            const label = segment.charAt(0).toUpperCase() + segment.slice(1);
            const link = `/${path.slice(0, index + 1).join('/')}`; // Build link
            acc.push({ label, link });
        }
        return acc;
    }, []);
    return (
        <div className="main-wrapper">
            <AdminHeader />
            <AdminSidebar />
            <div className="page-wrapper">
                <div className="content container-fluid">
                    <div className="page-header">
                        <div className="row">
                            <div className="col-sm-12">
                                <h3 className="page-title">Welcome Admin!</h3>
                                <Breadcrumb
                                    items={breadcrumbs.map(breadcrumb => ({ title: <Link href={breadcrumb.link}>{breadcrumb.label}</Link> }))}
                                />
                            </div>
                        </div>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout