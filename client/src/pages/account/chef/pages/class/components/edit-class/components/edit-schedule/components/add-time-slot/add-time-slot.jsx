import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import DateTimePicker from 'react-datetime-picker';

import Button from '../../../../../../../../../../../components/button/button';
import useMutate from '../../../../../../../../../../../hooks/mutate';
import { addTimeSlot } from '../../../../../../../../../../../services/chef/actions'

import './add-time-slot.scss';


function AddTimeSlot({ classData }) {
    const [showModal, setShowModal] = useState(false);
    const [classDateTime, setClassDateTime] = useState(null);
    const [add, { loading, errors }] = useMutate(addTimeSlot, { withDispatch: true });

    const onDateTimeChange = (evt) => {
        setClassDateTime(evt)
    }

    const handleAdd = async () => {
        const classId = classData._id;
        await add(classId, classDateTime);
        setShowModal(false);
    }

    return (
        <div id='add-time-slot'>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title>Add Time Slot</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='d-flex justify-content-center'>
                        <DateTimePicker value={classDateTime} onChange={onDateTimeChange} />
                    </div>
                    <span className='text-danger d-block text-center'>{errors['error']}</span>

                    {
                        loading
                            ?
                            <div className='d-flex mt-2 justify-content-center'>
                                <Spinner animation='border' />
                            </div>
                            :
                            <></>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button className='modal-btn' secondary onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                    <Button type='submit' onClick={handleAdd} className='modal-btn'>
                        Add Schedule
                    </Button>
                </Modal.Footer>
            </Modal>
            <div id='add-time-slot-btn' onClick={() => setShowModal(true)}>
                <FontAwesomeIcon className='plus' icon={faPlus} />
            </div>
        </div>
    );
}

export default AddTimeSlot;