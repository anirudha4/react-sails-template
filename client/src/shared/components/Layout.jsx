import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'

function Layout() {
    const isCoreInitializing = useSelector(state => state.core.isCoreInitializing);
    if (isCoreInitializing) {
        return <div>Loading</div>
    }
    return (
        <div className="app-layout">
            <Outlet />
        </div>
    )
}

export default Layout