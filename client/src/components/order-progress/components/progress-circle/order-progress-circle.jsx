import React from 'react';

import './order-progress-circle.scss';

function OrderProgressCircle(props) {
    return (
        <div>
            <div className={`circle ${props.active ? 'active' : 'inactive'}`}>
                <span>{props.number}</span>
            </div>
            <p className='text-center'>{props.step}</p>
        </div>
    );
}

export default OrderProgressCircle