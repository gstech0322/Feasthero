import React, { useState } from 'react';
import { CardElement, ElementsConsumer } from '@stripe/react-stripe-js';
import { Col, Form, Row, Image } from 'react-bootstrap';
import ReCAPTCHA from 'react-google-recaptcha';

import { settings } from '../../../../settings';
import poweredbystripe from '../../../../assets/resources/images/powered-by-stripe.png';

import { checkout as checkoutService } from '../../../../services/checkout/services';
import history from '../../../../history';
import useMutate from '../../../../hooks/mutate';

import './payment.scss';


const InjectedPaymentForm = (props) => {
    return (
        <ElementsConsumer>
            {({ elements, stripe }) => (
                <Payment elements={elements} stripe={stripe} {...props} />
            )}
        </ElementsConsumer>
    );
};

function Payment(props) {
    const [cardError, setCardError] = useState('');
    const recaptchaRef = React.createRef();
    const [checkout, { loading, errors }] = useMutate(checkoutService, { withDispatch: false });

    const { stripe, elements } = props;

    const bookingDetails = props.bookingDetails;

    const handleChange = ({ error }) => {
        if (error)
            setCardError(error.message);
        else
            setCardError('');
    }


    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (cardError)
            return;

        if (stripeIsUninitialized())
            return;

        const card = elements.getElement(CardElement);

        await checkout(card, stripe, recaptchaRef.current.getValue());
    }

    const stripeIsUninitialized = () => {
        return !stripe || !elements;
    }

    const cardElementOptions = () => {
        return {
            hidePostalCode: true,
            style: {
                base: {
                    color: '#303238',
                    fontSize: '16px',
                    fontSmoothing: 'antialiased',
                    '::placeholder': {
                        color: '#CFD7DF',
                    },
                },
                invalid: {
                    color: '#e5424d',
                    ':focus': {
                        color: '#303238',
                    },
                },
            },
        };
    }

    return (
        <div id='payment'>
            <Form onSubmit={handleSubmit}>
                <div id='card-element-container'>
                    <p className='text-center'>Pay with card</p>
                    <Form.Group>
                        <CardElement className='mb-3' onChange={handleChange} options={cardElementOptions()} />
                        <span className='text-danger'>{cardError}</span>
                        <div className='my-4'>
                            <div className='d-flex justify-content-center'>
                                <ReCAPTCHA
                                    ref={recaptchaRef}
                                    sitekey={settings.RECAPTCHA_SITE_KEY}
                                />
                            </div>
                            <span className='text-danger d-block text-center'>{errors['recaptcha']}</span>
                        </div>

                        <button className='pay-btn mat-btn' type='submit' disabled={!stripe}>
                            {
                                loading ? <div className='loader'></div> : <p>Pay ${bookingDetails.grandTotal}</p>

                            }
                        </button>
                        <button className='pay-btn mat-btn mt-3 danger' onClick={() => history.push('/')} type='submit' disabled={!stripe}>
                            Cancel
                        </button>
                        <span className='text-danger d-block text-center'>{errors['payment']}</span>
                        <span className='text-danger d-block text-center'>{errors['booking']}</span>
                    </Form.Group>
                    <Row className='secure-checkout'>
                        <Col md={8} xs={8}>
                            <h5>Guaranteed safe &#38; secure checkout</h5>
                        </Col>
                        <Col md={3} sm={3} xs={4}>
                            <a rel="noreferrer" target='_blank' href='https://www.stripe.com'><Image src={poweredbystripe} width='90%' /></a>
                        </Col>
                    </Row>
                </div>
            </Form>
        </div>
    );
}

export default InjectedPaymentForm;