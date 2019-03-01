import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

import { loadAccount } from '../services/auth/actions';

const LoadAccount = WrappedComponent => {
    const NewComponent = (props) => {
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(loadAccount());
        }, [dispatch])

        return (
            <>
                <WrappedComponent {...props} />
            </>
        );
    }

    return NewComponent;
}


export default LoadAccount;