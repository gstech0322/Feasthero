import React from 'react'

import Button from '../../../../../../../components/button/button'
import Loader from '../../../../../../../components/loader/loader';

import useMutate from '../../../../../../../hooks/mutate';
import { deleteClass as deleteClassAction } from '../../../../../../../services/chef/actions';

function DeleteClass({ id }) {
    const [deleteClass, { loading, errors }] = useMutate(deleteClassAction, { withDispatch: true });

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await deleteClass(id);
    }

    return (
        <>
            <Loader show={loading} />
            <div className='mt-5'>
                <Button className='w-100 py-3' onClick={handleSubmit} secondary>Delete</Button>
                <span className='text-danger d-block mt-2'>{errors['error']}</span>
            </div>
        </>
    )
}

export default DeleteClass;