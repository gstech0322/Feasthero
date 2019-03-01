import React from 'react';

import './customer-account.scss';

function CustomerAccount(props) {
    return (
        <>
            <p>Hello {props.account.firstName}! Thank you for joining FeastHero! The accounts feature is not quite ready yet so sit tight!</p>
        </>
    );
}

export default CustomerAccount;