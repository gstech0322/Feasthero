import React from 'react';
import { Col, Row } from 'react-bootstrap';

import dateTimeToString from '../../../../helpers/date-time-to-string';
import getChefFullName from '../../../../helpers/get-chef-full-name';

import './confirmation-details.scss';

function ConfirmationDetails({ classData, bookingDetails }) {
    return (
        <section id='confirmation-details'>
            <h2>Order Confirmation</h2>
            <h3>{classData.title} with {getChefFullName(classData.chefs[0])}</h3>
            <Row>
                <Col xs={6}>
                    <h5>First Name:</h5>
                </Col>
                <Col xs={6}>
                    <h5>{bookingDetails.customerFirstName}</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <h5>Last Name</h5>
                </Col>
                <Col xs={6}>
                    <h5>{bookingDetails.customerLastName}</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <h5>Company Name</h5>
                </Col>
                <Col xs={6}>
                    <h5>{bookingDetails.companyName}</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <h5>Email</h5>
                </Col>
                <Col xs={6}>
                    <h5>{bookingDetails.customerEmail}</h5>
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
            <Row>
                <Col xs={6}>
                    <h5>Number of Meal Kits</h5>
                </Col>
                <Col xs={6}>
                    <h5>{bookingDetails.bookingSize}</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <h5>Date and Time</h5>
                </Col>
                <Col xs={6}>
                    <h5>{dateTimeToString(bookingDetails.selectedClassDateTime)}</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <h5>Class Zoom Link</h5>
                </Col>
                <Col xs={6}>
                    <h5><a href={classData.chefs[0].profile.zoom}>{classData.chefs[0].profile.zoom}</a></h5>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <h5>Order ID</h5>
                </Col>
                <Col xs={6}>
                    <h5>{bookingDetails._id}</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <h5>Total Cost</h5>
                </Col>
                <Col xs={6}>
                    <h5>${bookingDetails.grandTotal}</h5>
                </Col>
            </Row>
        </section>
    );
}

export default ConfirmationDetails;