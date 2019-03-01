import React from 'react';
import { Row, Col, Tooltip, OverlayTrigger, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux';

import { validBookingSizes, selectDropDownStyle } from '../../../../constants/app-constants';
import { submitBooking as submitBookingAction, updateBookingDetails } from '../../../../services/booking/actions';
import Button from '../../../../components/button/button';
import datesTimesAsOption from '../../../../helpers/dates-times-as-options';
import { selectBookingErrors, selectCurrentClass } from '../../../../services/booking/selectors';
import useMutate from '../../../../hooks/mutate';

import './booking-details.scss';


function BookingDetails() {

    const bookingSize = useSelector(state => state.booking.bookingDetails.bookingSize);
    const customerFirstName = useSelector(state => state.booking.bookingDetails.customerFirstName);
    const customerLastName = useSelector(state => state.booking.bookingDetails.customerLastName);
    const customerEmail = useSelector(state => state.booking.bookingDetails.customerEmail);
    const selectedClassDateTime = useSelector(state => state.booking.bookingDetails.selectedClassDateTime);
    const companyName = useSelector(state => state.booking.bookingDetails.companyName);


    const classData = useSelector(selectCurrentClass);
    const errors = useSelector(selectBookingErrors)
    const dispatch = useDispatch();
    const scheduleOptions = datesTimesAsOption(classData.schedule);
    const [submitBooking, { loading }] = useMutate(submitBookingAction, { withDispatch: true });

    const handleFormChange = (evt) => {
        const { value, name } = evt.target;
        dispatch(updateBookingDetails({ [name]: value }));
    }

    const handleBookingSizeChange = (evt) => {
        dispatch(updateBookingDetails({ bookingSize: evt.target.value }));
    }

    const handleDateTimeChange = (evt) => {
        const { value, id } = evt.target;
        dispatch(updateBookingDetails({ selectedClassDateTime: value, timeSlotId: id }));
    }

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await submitBooking();
    }


    const renderBookingSizeTooltip = (props) => (
        <Tooltip {...props}>
            <span id='booking-size-tooltip-content'>
                The number of screens that will be attending the class
            </span>
        </Tooltip>
    );


    return (
        <div id='booking-details-container'>
            <h1>Booking Details</h1>
            <form onSubmit={handleSubmit}>
                <Form.Group>
                    <Row className='justify-content-around' id='number-of-devices-for-booking'>
                        <Col xs={1} className='text-center' id='info-icon-container'>
                            <OverlayTrigger
                                placement='top'
                                overlay={renderBookingSizeTooltip}
                            >
                                <FontAwesomeIcon id='info-icon' icon={faInfoCircle} />
                            </OverlayTrigger>
                        </Col>

                        <Col xs={9} lg={7} className='text-right'>
                            <h5>Number of devices for booking</h5>
                        </Col>
                        <Col sm={12} lg={4}>
                            <Select
                                styles={selectDropDownStyle}
                                onChange={handleBookingSizeChange}
                                value={validBookingSizes.filter((option) => option.target.value === bookingSize)}
                                options={validBookingSizes}
                            />
                            <span className='text-danger'>{errors['bookingSize']}</span>
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group>
                    <Select
                        required
                        styles={selectDropDownStyle}
                        onChange={handleDateTimeChange}
                        value={scheduleOptions.filter((option) => option.target.value === selectedClassDateTime)}
                        placeholder='Select Date & Time'
                        options={scheduleOptions}
                    />
                    <span className='text-danger'>{errors['classDateTime']}</span>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        value={customerFirstName} onChange={handleFormChange}
                        required type='text' placeholder='First Name'
                        name='customerFirstName'
                    />
                    <span className='text-danger'>{errors['customerFirstName']}</span>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        value={customerLastName} onChange={handleFormChange}
                        required type='text' placeholder='Last Name'
                        name='customerLastName'
                    />
                    <span className='text-danger'>{errors['customerLastName']}</span>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        value={companyName} onChange={handleFormChange}
                        required type='text' placeholder='Company Name'
                        name='companyName'
                    />
                    <span className='text-danger'>{errors['companyName']}</span>
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        value={customerEmail} onChange={handleFormChange}
                        required type='email' placeholder='Email Address'
                        name='customerEmail'
                    />
                    <span className='text-danger'>{errors['customerEmail']}</span>
                </Form.Group>
                <span className='text-danger'>{errors['error']}</span>
                <Row>
                    <Col md={6}>
                        <Button primary={true} type='submit'
                            className='d-flex justify-content-center'
                            isButton={true}>
                            {loading ? <div className="loader"></div> : <span>Proceed to Payment</span>}
                        </Button>
                    </Col>
                </Row>
            </form>
        </div>
    );
}


export default BookingDetails;