import React from 'react'
import { Form } from 'react-bootstrap'
import { useState } from 'react';

import useMutate from '../../../../../../../hooks/mutate';
import Button from '../../../../../../../components/button/button'
import Loader from '../../../../../../../components/loader/loader'
import EditSchedule from './components/edit-schedule/edit-schedule';
import { updateClass } from '../../../../../../../services/chef/services';

import './edit-class.scss'
import { useSelector } from 'react-redux';



function EditClass() {
    const classData = useSelector(state => state.chef.currentClass);
    const [classDataState, setClassDataState] = useState(classData)
    const [update, { errors, loading }] = useMutate(updateClass, { withDispatch: false })

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await update(classDataState);
    }

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setClassDataState((prev) => ({ ...prev, [name]: value }))
    }


    const handleCheckBoxChange = (evt) => {
        const { name } = evt.target;
        const value = !classDataState[name];
        setClassDataState((prev) => ({ ...prev, [name]: value }))
    }

    const handleFileUploadChange = (evt) => {
        const file = evt.target.files[0];
        const { name } = evt.target;
        setClassDataState((prev) => ({ ...prev, [name]: file }))
    }


    return (
        <>
            <section id='edit-class'>
                <Loader show={loading} />
                <form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control onChange={handleChange} type='text' name='title' value={classDataState.title} />
                        <span className='text-danger'>{errors['title']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Description</Form.Label>
                        <Form.Control onChange={handleChange} type='text' as='textarea' name='description' value={classDataState.description} />
                        <span className='text-danger'>{errors['description']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Thumbnail</Form.Label>
                        <Form.Control type='file' name='thumbnail' onChange={handleFileUploadChange} />
                        <span className='text-danger'>{errors['thumbnail']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Duration</Form.Label>
                        <Form.Control onChange={handleChange} type='number' name='duration' value={classDataState.duration} />
                        <span className='text-danger'>{errors['duration']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Cost Per Device</Form.Label>
                        <Form.Control onChange={handleChange} type='number' name='costPerDevice' value={classDataState.costPerDevice} />
                        <span className='text-danger'>{errors['costPerDevice']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Meal Kit Cost</Form.Label>
                        <Form.Control onChange={handleChange} type='number' name='mealKitCost' value={classDataState.mealKitCost} />
                        <span className='text-danger'>{errors['mealKitCost']}</span>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Offers Meal Kit</Form.Label>
                        <Form.Check onChange={handleCheckBoxChange} name='hasMealKit' checked={classDataState.hasMealKit} />
                        <span className='text-danger'>{errors['hasMealKit']}</span>
                    </Form.Group>
                    <div className='w-100'>
                        <span className='text-danger d-block text-center'>{errors['error']}</span>
                    </div>
                    <Button type='submit' isButton={true} className='p-3 w-100'>Update</Button>
                </form>
            </section>
            <section className='mt-4'>
                <EditSchedule classData={classData} />
            </section>
        </>
    )
}



export default EditClass;