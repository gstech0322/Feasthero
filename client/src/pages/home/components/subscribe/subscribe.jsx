import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Form, Modal } from 'react-bootstrap';

import Button from '../../../../components/button/button';
import Loader from '../../../../components/loader/loader';

import { subscribe as subscribeService } from '../../../../services/subscribe/services';
import useMutate from '../../../../hooks/mutate';

import './subscribe.scss';

function Subscribe() {
    const [email, setEmail] = useState('');
    const [showSubscribedModal, setShowSubscribedModal] = useState(false);
    const [subscribe, { errors, loading, data: didSubscribe }] = useMutate(subscribeService, { withDispatch: false });

    const handleChange = (evt) => {
        const { value } = evt.target;
        setEmail(value);
    }

    const handleSubscribe = async (evt) => {
        evt.preventDefault();
        await subscribe(email);
    }

    useEffect(() => {
        if (didSubscribe === true)
            setShowSubscribedModal(true)

    }, [didSubscribe]);


    return (
        <section id='subscribe-section'>
            <Loader show={loading} />
            <Modal
                backdropClassName='p-5'
                contentClassName='text-center p-5'
                centered
                onHide={() => setShowSubscribedModal(false)}
                show={showSubscribedModal}
            >
                <h4 className='text-success'>Thank you for subscribing!</h4>
            </Modal>
            <Container>
                <Row className='w-100' id='subscribe-content'>
                    <Col lg={4} id='subscribe-text'>
                        <h4>Stay in the loop</h4>
                        <p>
                            Be the first to find out about new classes and updates.
                        </p>
                    </Col>
                    <Col lg={6} md={7} >
                        <form onSubmit={handleSubscribe}>
                            <Form.Group>
                                <Row>
                                    <Col xl={8} >
                                        <Form.Control
                                            required
                                            value={email}
                                            type='email'
                                            name='email'
                                            onChange={handleChange}
                                            placeholder='mail@example.com'
                                        />
                                        <span className='text-danger'>{errors['error']}</span>
                                    </Col>
                                    <Col xl={4} lg={6}>
                                        <Button className='w-100' type='submit' isButton={true} secondary={true}>Stay Connected</Button>
                                    </Col>
                                </Row>
                            </Form.Group>

                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    )

}

export default Subscribe;