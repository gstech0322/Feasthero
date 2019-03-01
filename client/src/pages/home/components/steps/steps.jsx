import React from 'react';
import { Col, Row, Image } from 'react-bootstrap';

import Title from '../../../../components/title/title';

import bookingdetails from '../../../../assets/icons/booking-details.png';
import chooseClass from '../../../../assets/icons/select-class.png'
import reviewandpay from '../../../../assets/icons/review-and-pay.png';

import './steps.scss';

function Steps() {
    return (
        <section id='how-it-works'>
            <div id='steps-to-start'>
                <Title>
                    3 Easy Steps to Start
                </Title>
                <Row className='justify-content-around'>
                    <Col sm={9} md={3}>
                        <Image src={chooseClass} />
                        <h4>Select a Class</h4>
                        <p>
                            Select from a variety of classes taught by
                            various chefs and from a range of delicious
                            and easy to create meals
                        </p>
                    </Col>
                    <Col sm={10} md={3}>
                        <Image src={bookingdetails} />
                        <h4>Enter Booking Details</h4>
                        <p>
                            Enter booking details and select the
                            option of including pre packaged
                            ingredients for your class
                        </p>
                    </Col>
                    <Col sm={10} md={3}>
                        <Image src={reviewandpay} />
                        <h4>Review and Pay</h4>
                        <p>
                            Review all booking details and get
                            ready for a fun event that your team
                            will love virtually
                        </p>

                    </Col>
                </Row>
            </div>
        </section>
    );
}

export default Steps;