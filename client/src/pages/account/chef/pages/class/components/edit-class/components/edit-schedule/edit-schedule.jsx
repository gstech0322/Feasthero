import React from 'react';
import { Col, Row } from 'react-bootstrap';
import dateTimeToString from '../../../../../../../../../helpers/date-time-to-string';

import AddTimeSlot from './components/add-time-slot/add-time-slot';
import DeleteTimeSlot from './components/delete-time-slot/delete-time-slot';

import './edit-schedule.scss';

function EditSchedule({ classData }) {
    return (
        <>
            <h2 className='mt-5 mb-3 text-center'>Schedule</h2>
            <section id='edit-schedule'>
                {
                    classData.schedule?.map((timeSlot, key) => {
                        return (
                            <div key={key} className={`schedule ${timeSlot.available ? '' : 'time-slot-unavailable'}`}>
                                <Row className='justify-content-center pt-2'>
                                    <Col sm={1}>
                                        <DeleteTimeSlot classId={classData._id} id={timeSlot._id} />
                                    </Col>
                                    <Col sm={4}>
                                        <p>{dateTimeToString(timeSlot.dateTime)}</p>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })
                }
            </section>
            <div>
                <AddTimeSlot classData={classData} />
            </div>
        </>
    )
}

export default EditSchedule;