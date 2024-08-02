import React from 'react';
import { Breadcrumb } from 'antd';
import { useLocation, Link } from 'react-router-dom';
import './BreadcrumbTrail.css';

const getRoute = (pathnames, count) => {
    return {
        name: pathnames[count - 2],
        url: `/${pathnames.slice(0, count).join('/')}`,
    };
};

const getRoutes = (pathnames) => {
    if (pathnames != null && pathnames.length == 3) {
        return [getRoute(pathnames, pathnames.length)];
    } else if (pathnames != null && pathnames.length == 6) {
        let counter = 3,
            routes = [];
        while (counter <= pathnames.length) {
            routes.push(getRoute(pathnames, counter));
            counter = counter + 3;
        }
        return routes;
    }
};

const BreadcrumbTrail = ({ children }) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbRoutes = getRoutes(pathnames);

    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>
                    <Link to="/">Home</Link>
                </Breadcrumb.Item>
                {breadcrumbRoutes.map((breadcrumbRoute) => {
                    return (
                        <Breadcrumb.Item key={breadcrumbRoute.url}>
                            <Link to={breadcrumbRoute.url}>
                                {breadcrumbRoute.name.charAt(0).toUpperCase() +
                                    breadcrumbRoute.name.slice(1)}
                            </Link>
                        </Breadcrumb.Item>
                    );
                })}
            </Breadcrumb>
            {children}
        </>
    );
};

export default BreadcrumbTrail;
