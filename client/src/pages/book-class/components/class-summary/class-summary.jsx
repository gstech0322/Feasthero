import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import truncateString from '../../../../helpers/truncate-string';
import { selectCurrentClass } from '../../../../services/booking/selectors';

import './class-summary.scss';

function ClassSummary() {
    const [truncated, setTruncated] = useState(true);
    const classData = useSelector(selectCurrentClass);

    const toggleTruncate = () => {
        setTruncated(!truncated);
    }

    return (
        <div id='class-summary'>
            <Image src={classData.chefs[0].profile.photo} />
            <h1>{classData.title}</h1>
            <p id='content'>
                {
                    truncated
                        ? truncateString(classData.description, 90)
                        : classData.description
                }
            </p>
            <p id='toggle-truncate' onClick={toggleTruncate}>
                {truncated ? 'Learn More' : 'Less'}
            </p>
        </div>
    )
}

export default ClassSummary;