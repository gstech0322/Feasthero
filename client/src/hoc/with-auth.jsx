import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { selectAccount } from '../services/auth/selectors';

const WithAuth = WrappedComponent => {
    const NewComponent = (props) => {
        const account = useSelector(selectAccount);

        if (!account)
            return <Redirect to='/auth/login' />

        return <WrappedComponent {...props} />
    }

    return NewComponent;
}

export default WithAuth;