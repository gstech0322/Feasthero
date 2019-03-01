import React from 'react';

import AddClass from './components/add-class/add-class';
import Classes from './components/classes/classes';

import './chef-account.scss';

function ChefAccount() {
    return (
        <>
            <Classes />
            <AddClass />
        </>
    );
}

export default ChefAccount;