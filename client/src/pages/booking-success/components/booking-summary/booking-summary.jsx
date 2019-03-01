import React from 'react';
import Checkmark from '../checkmark/checkmark';
import ShareConfirmation from '../share-confirmation/share-confirmation';
import ConfirmationDetails from '../confirmation-details/confirmation-details';

import { Spinner, Container } from 'react-bootstrap';
import { verifyBookingSuccess } from '../../../../services/booking-success/services';
import useFetch from '../../../../hooks/fetch';

function BookingSummary() {
    const { loading, error, data } = useFetch(verifyBookingSuccess, { withDispatch: false });

    if (error)
        return <p className='text-center text-danger'>{error}</p>

    if (loading)
        return (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        )

    if (data)
        return (
            <div id='booking-success'>
                <div className='text-center'>
                    <Checkmark />
                    <h2 className='mt-2'>Class Booked Successfully!</h2>
                    <p>An email will be sent shortly with your booking confirmation</p>
                </div>
                <Container id='booking-success-container'>
                    <ConfirmationDetails classData={data.classData} bookingDetails={data.bookingDetails} />
                    <ShareConfirmation />
                </Container>
            </div>
        )

    return <></>
}

export default BookingSummary;