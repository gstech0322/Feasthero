import React from 'react';

import { Col, Row } from 'react-bootstrap';

import './booking-summary.scss';


function BookingSummary({ bookingDetails }) {
    return (
        <section id='payment-booking-summary'>
            <h4>Booking Summary</h4>
            <div className='summary-divider' />

            {
                bookingDetails.mealKitsBooked
                    ?
                    <>
                        <Row>
                            <Col xs={6}>
                                <h5>Meal Kits</h5>
                            </Col>
                            <Col xs={6}>
                                <h5>${bookingDetails.mealKitsTotal}</h5>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <h5>Number of Meal Kits</h5>
                            </Col>
                            <Col xs={6}>
                                <h5>{bookingDetails.bookingSize}</h5>
                            </Col>
                        </Row>
                        <div className='summary-divider' />
                    </>
                    :
                    <></>
            }

            <Row>
                <Col xs={6}>
                    <h5>Devices</h5>
                </Col>
                <Col xs={6}>
                    <h5>${bookingDetails.devicesTotal}</h5>
                </Col>
            </Row>

            <Row>
                <Col xs={6}>
                    <h5>Number of Devices</h5>
                </Col>
                <Col xs={6}>
                    <h5>{bookingDetails.bookingSize}</h5>
                </Col>
            </Row>
            <div className='summary-divider' />
            <Row>
                <Col xs={6}>
                    <h5>Tax</h5>
                </Col>
                <Col xs={6}>
                    <h5>${bookingDetails.tax}</h5>
                </Col>
            </Row>

            <Row>
                <Col xs={6}>
                    <h5><b>Grand Total</b></h5>
                </Col>
                <Col xs={6}>
                    <h5><b>${bookingDetails.grandTotal}</b></h5>
                </Col>
            </Row>
        </section>
    );

}

export default BookingSummary;