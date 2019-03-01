import { Spinner } from 'react-bootstrap';
import OrderProgressBar from '../../components/order-progress/order-progress-bar';
import useFetch from '../../hooks/fetch';
import { loadBookingDetails } from '../../services/checkout/services';
import CheckoutDetails from './components/checkout-details/checkout-details';

/**
 * This component completes the booking that is stored in the client's session.
 * 
 * The checkout system is responsible for
 *    1. Collecting user's payment details as input and uses Stripe to fulfill their booking
 *    2. Display the user's booking details currently stored in their session
 *    3. call the `booking/book` endpoint in order for the booking and payment to be processed
 */

function Checkout() {
    let checkoutState = <></>;
    const { loading, error, data } = useFetch(loadBookingDetails, { withDispatch: false });

    if (loading)
        checkoutState = (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        )
    else if (error)
        checkoutState = <p className='text-center text-danger'>{error}</p>

    else if (data)
        checkoutState = <CheckoutDetails bookingDetails={data} />

    return (
        <>
            <OrderProgressBar paymentDetails />
            {checkoutState}
        </>
    )

}

export default Checkout;