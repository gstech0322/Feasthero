import React from 'react';

import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import BookingSummary from './components/booking-summary/booking-summary';


import './booking-success.scss';

/**
 * This component displays the user's full order upon booking success.
 * 
 * This system is responsible for
 *    1. Displaying the user's full order upon booking success
 *    2. Giving the user the option to share their booking confirmation with other emails
 */

export default function BookingSuccess() {
    return (
        <>
            <OrderProgressBar confirmation={true} />
            <BookingSummary />
        </>
    );
}