import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { selectAccount } from '../services/auth/selectors';

const ShouldRedirectToAccount = WrappedComponent => {
    const NewComponent = (props) => {
        const account = useSelector(selectAccount);

        if (account)
            return <Redirect to='/account' />

        if (!account)
            return <WrappedComponent {...props} />

        return <></>
    }

    return NewComponent;
}

export default ShouldRedirectToAccount;