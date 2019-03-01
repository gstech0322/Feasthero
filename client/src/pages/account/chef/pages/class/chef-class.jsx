import React from 'react'
import { Spinner } from 'react-bootstrap'

import EditClass from './components/edit-class/edit-class'
import DeleteClass from './components/delete-class/delete-class'

import { loadClass } from '../../../../../services/chef/actions'
import useFetch from '../../../../../hooks/fetch'


function ChefClass(props) {
    const { loading, error, data } = useFetch(loadClass, { withDispatch: true }, props.match.params.id);

    if (data) {
        if (error)
            return <p className='text-danger text-center'>Error loading class</p>
        else
            return (
                <>
                    <EditClass />
                    <DeleteClass id={data._id} />
                </>
            )
    }

    if (loading)
        return (
            <div className='d-flex justify-content-center'>
                <Spinner animation='border' />
            </div>
        );

    return <></>
}


export default ChefClass;