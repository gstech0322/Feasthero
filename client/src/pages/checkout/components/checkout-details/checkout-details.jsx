import React from 'react'
import { Elements } from "@stripe/react-stripe-js";
import { Row, Col } from 'react-bootstrap';
import { loadStripe } from "@stripe/stripe-js";

import { settings } from '../../../../settings';

import InjectedPaymentForm from '../payment/payment';
import BookingSummary from '../booking-summary/booking-summary';

import './checkout-details.scss';


function CheckoutDetails({ bookingDetails }) {
    const stripe = loadStripe(settings.STRIPE_PUBLISHABLE_KEY);

    return (
        <>
            <Row className='justify-content-around'>
                <Col lg={4} id='payment-col'>
                    <Elements stripe={stripe}>
                        <InjectedPaymentForm bookingDetails={bookingDetails} />
                    </Elements>
                </Col>
                <Col lg={5}>
                    <BookingSummary bookingDetails={bookingDetails} />
                </Col>
            </Row>
        </>
    );
}


export default CheckoutDetails;