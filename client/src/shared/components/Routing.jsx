import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Layout from './Layout';

function Routing() {
    // get location
    const location = useSelector(state => state.router.location);

    // get navigate
    const navigate = useNavigate();

    // watch for location change and navigate
    useEffect(() => {
        navigate(location);
    }, [navigate, location])
    return (
        <Layout />
    )
}

export default Routing