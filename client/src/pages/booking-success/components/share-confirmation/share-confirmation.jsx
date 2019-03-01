import React, { useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


import Button from '../../../../components/button/button';
import Loader from '../../../../components/loader/loader';

import valsFromRefs from '../../../../helpers/values-from-refs';
import { sendConfirmations as sendConfirmationsService } from '../../../../services/booking-success/services';
import useMutate from '../../../../hooks/mutate';

import './share-confirmation.scss';

function ShareConfirmation() {
    const firstInput = React.createRef();
    const [inputs, setInputs] = useState([firstInput]);
    const [sendConfirmations, { loading, errors, data }] = useMutate(sendConfirmationsService, { withDispatch: false });
    let didSend = <></>;

    const appendInput = () => {
        const ref = React.createRef();
        setInputs([...inputs, ref]);
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        const emails = valsFromRefs(inputs);
        await sendConfirmations(emails);
    }


    if (Object.keys(errors).length > 0)
        didSend = <p className='text-danger text-center mb-0'>Failed to send</p>
    else if (data === true)
        didSend = <p className='text-success text-center mb-0'>Sent</p>


    return (
        <section id='share-confirmation'>
            <Loader show={loading} />
            <form onSubmit={handleSubmit}>
                {
                    inputs.map((ref, i) => {
                        return (
                            <Row>
                                <Col md={11}>
                                    <Form.Control required placeholder='Email Address' type='email' ref={ref} />
                                </Col>
                                {i === 0 ?
                                    <Col md={11} lg={1}>
                                        <FontAwesomeIcon size={'2x'} style={{ color: '#FA7580' }} onClick={appendInput} icon={faPlus} />
                                    </Col>
                                    : <></>
                                }
                            </Row>
                        )
                    })
                }
                {didSend}
                <Row className='justify-content-center'>
                    <Col lg={4}>
                        <Button isButton={true} secondary={true}>Send Confirmation</Button>
                    </Col>
                </Row>
            </form>
        </section>
    );
}


export default ShareConfirmation;