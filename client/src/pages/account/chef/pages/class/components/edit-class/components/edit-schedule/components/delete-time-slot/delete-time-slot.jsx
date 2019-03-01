import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import Loader from '../../../../../../../../../../../components/loader/loader';
import useMutate from '../../../../../../../../../../../hooks/mutate';
import { deleteTimeSlot as deleteTimeSlotAction } from '../../../../../../../../../../../services/chef/actions';

import './delete-time-slot.scss';

function DeleteTimeSlot({ id, classId }) {
    const [deleteTimeSlot, { loading, errors }] = useMutate(deleteTimeSlotAction, { withDispatch: true });

    const handleDelete = async () => {
        await deleteTimeSlot(id, classId);
    }

    return (
        <>
            <Loader show={loading} />
            <div className='delete-time-slot'>
                <FontAwesomeIcon className='trash' onClick={handleDelete} icon={faTrash} />
                <span className='text-danger d-block'>{errors['error']}</span>
            </div>
        </>
    );
}

export default DeleteTimeSlot;