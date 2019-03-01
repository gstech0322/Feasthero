import React from 'react';
import { Card, Accordion, Container } from 'react-bootstrap';
import Title from '../../components/title/title';

import './faq.scss';

function Faq() {
    return (
        <>
            <section id='faq'>
                <div>
                    <Container>
                        <Title className='text-center mb-4'>FAQ's</Title>
                        <Accordion>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    Can I cancel my class?
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        To request a refund, please email bookings@feasthero.com. Cancellations must be made at least 72 hours before the start of your class. We are unable to issue a refund for any cancellations within 72 hours before the class.
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    Can I reschedule my class?
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>If you would like to reschedule your booking, please email bookings@feasthero.com. Rescheduling can be done any time up to 72 hours before the start of your class. We cannot reschedule your class if it falls within the 72 hour window.</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="2">
                                    Why do I have to cancel/reschedule 72 hours in advance?
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>In order for you to receive your mealkits on time, we ship them out to you within 72 hours of your class start time. We require advance notice if we need to cancel your shipments. Our chefs set aside time in their schedules to prepare for, and teach each class. Cancelling on short notice does not provide us an opportunity to reschedule a new class for them.</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </Container>

                </div>
            </section>
        </>
    );
}

export default Faq;