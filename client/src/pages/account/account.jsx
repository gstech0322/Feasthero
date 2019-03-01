import React from 'react';
import { useSelector } from 'react-redux';

import Logout from '../auth/logout/logout';
import WithAuth from '../../hoc/with-auth';
import { CHEF, CUSTOMER } from '../../constants/app-constants';
import { selectAccount } from '../../services/auth/selectors';

import ChefAccount from './chef/chef-account';
import CustomerAccount from './customer/customer-account';

import './account.scss';

function Account() {
    const account = useSelector(selectAccount);
    let accountComponent;

    if (account.type === CHEF)
        accountComponent = <ChefAccount account={account} />
    if (account.type === CUSTOMER)
        accountComponent = <CustomerAccount account={account} />

    return (
        <>
            {accountComponent}
            <Logout />
        </>
    );
}


export default WithAuth(Account);