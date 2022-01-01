import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UnProtectedRoutes = () => {
    const user = useSelector((state) => state.auth);

    return (
            user ? <Navigate to='/' /> : <Outlet />
    )
}

export default UnProtectedRoutes
