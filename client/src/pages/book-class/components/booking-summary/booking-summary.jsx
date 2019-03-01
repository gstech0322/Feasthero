import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';


import CalculateTotals from '../../../../helpers/calculate-totals';
import { updateBookingDetails } from '../../../../services/booking/actions';
import IncludeMealKits from './components/include-meal-kits/include-meal-kits';
import { selectCurrentClass } from '../../../../services/booking/selectors';

import './booking-summary.scss';


function BookingSummary() {
    const bookingSize = useSelector(state => state.booking.bookingDetails.bookingSize);
    const mealKitsBooked = useSelector(state => state.booking.bookingDetails.mealKitsBooked);
    const grandTotal = useSelector(state => state.booking.bookingDetails.grandTotal);
    const tax = useSelector(state => state.booking.bookingDetails.tax);
    const mealKitsTotal = useSelector(state => state.booking.bookingDetails.mealKitsTotal);

    const classData = useSelector(selectCurrentClass);
    const dispatch = useDispatch();


    useEffect(() => {
        const getValuesForCostCalculation = () => {
            let { mealKitCost, costPerDevice } = classData;

            return {
                bookingSize: bookingSize,
                costPerDevice: costPerDevice,
                mealKitCost: mealKitCost,
                bookingSizeWithMealKit: bookingSize,
                mealKitsBooked: mealKitsBooked,
            }
        }

        const calculateTotals = () => {
            return CalculateTotals.totals(...Object.values(getValuesForCostCalculation()))
        }

        dispatch(updateBookingDetails({ ...calculateTotals() }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mealKitsBooked, bookingSize]);


    return (
        <section id='booking-summary'>
            <h4>
                ${classData.costPerDevice} per device
            </h4>
            {
                classData.hasMealKit
                    ?
                    <IncludeMealKits />
                    :
                    <></>
            }
            <div className='summary-divider' />
            <Row>
                <Col xs={6}>
                    <h5>Meal Kits</h5>
                </Col>
                <Col xs={6}>
                    <h5 className='dollar-amount'>${mealKitsTotal}</h5>
                </Col>
            </Row>
            <Row>
                <Col xs={6}>
                    <h5>Tax</h5>
                </Col>
                <Col xs={6}>
                    <h5 className='dollar-amount'>${tax}</h5>
                </Col>
            </Row>
            <div className='summary-divider' />
            <Row>
                <Col xs={6}>
                    <h5>Grand Total</h5>
                </Col>
                <Col xs={6}>
                    <h5 className='dollar-amount'>${grandTotal}</h5>
                </Col>
            </Row>
        </section>
    );
}

export default BookingSummary;