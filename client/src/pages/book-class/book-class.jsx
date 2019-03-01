import React from 'react';

import OrderProgressBar from '../../components/order-progress/order-progress-bar';

import Booking from './components/booking/booking';


/**
 * This component gathers the information needed to start a booking.
 * 
 * This system is responsible for
 *    1. Collecting user's booking details as input
 *    2. Displaying the user's current entered booking details
 *    3. Call the `booking/init-session` endpoint in order for the inputted booking
 *       details to be added to the client's session for future use
 * 
 * A session is a way to persistently store data belonging to a client on the server.
 * @link https://en.wikipedia.org/wiki/Session_(computer_science)
 */


export default function BookClass(props) {
    return (
        <>
            <OrderProgressBar bookingDetails />
            <Booking classId={props.match.params.id} />
        </>
    )
}