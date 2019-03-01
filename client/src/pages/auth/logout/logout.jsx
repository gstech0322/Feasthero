import React, { useState } from 'react';

import { logout as logoutAction } from '../../../services/auth/actions.js';
import Button from '../../../components/button/button';
import Loader from '../../../components/loader/loader';
import { useDispatch } from 'react-redux';

function Logout() {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const logout = () => {
        setLoading(true);
        dispatch(logoutAction());
        setLoading(false);
    }

    return (
        <>
            <Loader show={loading} />
            <Button secondary className='w-100 py-3 d-block mt-5' isButton={true} onClick={logout}>Logout</Button>
        </>
    )
}

export default Logout;