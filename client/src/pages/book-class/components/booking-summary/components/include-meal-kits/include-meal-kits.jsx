import React from 'react'
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { updateBookingDetails } from '../../../../../../services/booking/actions';
import { selectBookingErrors, selectCurrentClass } from '../../../../../../services/booking/selectors';

function IncludeMealKits() {
    const dispatch = useDispatch();
    const mealKitsBooked = useSelector(state => state.booking.bookingDetails.mealKitsBooked);
    const classData = useSelector(selectCurrentClass);
    const errors = useSelector(selectBookingErrors);

    const toggleIncludeMealKits = () => {
        dispatch(updateBookingDetails({ mealKitsBooked: !mealKitsBooked }));
    }

    return (
        <form>
            <Form.Group>
                <Form.Check
                    onChange={toggleIncludeMealKits} type='checkbox'
                    defaultChecked={mealKitsBooked}
                    value={mealKitsBooked}
                    label={<p>Include pre-portioned ingredient kit for class. (4 servings per kit) <span>Additional ${classData.mealKitCost}/device.</span></p>}
                />
                <span className='text-danger error'>{errors['mealKitsBooked']}</span>
            </Form.Group>
        </form>
    )
}

export default IncludeMealKits;