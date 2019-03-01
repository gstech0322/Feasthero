import React, { useState } from 'react'
import { Form, Modal, Spinner } from 'react-bootstrap';

import useMutate from '../../../../../hooks/mutate';
import { addClass as addClassAction } from '../../../../../services/chef/actions';

import Button from '../../../../../components/button/button';

import './add-class.scss'
import { useEffect } from 'react';


function AddClass() {
    const [classData, setClassData] = useState({ hasMealKit: false });
    const [addClass, { loading, errors, data }] = useMutate(addClassAction, { withDispatch: true });
    const [shouldShowModal, setShowModal] = useState(false);

    useEffect(() => {
        if (data)
            setShowModal(false);
    }, [data, setShowModal]);

    const handleSubmit = async (evt) => {
        evt.preventDefault();
        await addClass(classData);
    }

    const handleChange = (evt) => {
        const { name, value } = evt.target;

        setClassData((prev) => ({ ...prev, [name]: value }))
    }

    const handleCheckBoxChange = (evt) => {
        const { name } = evt.target;
        let value = !classData[name];
        setClassData((prev) => ({ ...prev, [name]: value }))
    }


    const handleFileUploadChange = (evt) => {
        const file = evt.target.files[0];
        const { name } = evt.target;

        setClassData((prev) => ({ ...prev, [name]: file }))
    }

    return (
        <div id='add-class' className='mt-5'>
            <Button className='mb-4 p-3' onClick={() => setShowModal(true)}>Add Class</Button>
            <Modal size='lg' id='add-class-modal' show={shouldShowModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title>Add Class</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Control
                                onChange={handleChange}
                                value={classData.title}
                                type='text'
                                placeholder='title'
                                name='title'
                            />
                            <span className='text-danger'>{errors['title']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                onChange={handleChange}
                                value={classData.description}
                                type='text'
                                as='textarea'
                                placeholder='description'
                                name='description'
                            />
                            <span className='text-danger'>{errors['description']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                type='file'
                                name='thumbnail'
                                onChange={handleFileUploadChange}
                            />
                            <span className='text-danger'>{errors['thumbnail']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                onChange={handleChange}
                                value={classData.duration}
                                type='number'
                                placeholder='duration'
                                name='duration'
                            />
                            <span className='text-danger'>{errors['duration']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                onChange={handleChange}
                                value={classData.costPerDevice}
                                type='number'
                                placeholder='cost per device'
                                name='costPerDevice'
                            />
                            <span className='text-danger'>{errors['costPerDevice']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Control
                                onChange={handleChange}
                                value={classData.mealKitCost}
                                type='number'
                                placeholder='meal kit cost'
                                name='mealKitCost'
                            />
                            <span className='text-danger'>{errors['mealKitCost']}</span>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Offers Meal Kit</Form.Label>
                            <Form.Check
                                onChange={handleCheckBoxChange}
                                value={classData.hasMealKit}
                                name='hasMealKit'
                            />
                            <span className='text-danger'>{errors['hasMealKit']}</span>
                        </Form.Group>

                        <span className='text-danger d-block text-center'>{errors['error']}</span>

                        {
                            loading
                                ?
                                <div className='d-flex justify-content-center'>
                                    <Spinner animation='border' />
                                </div>
                                :
                                <></>
                        }


                        <Modal.Footer>
                            <Button className='modal-btn' secondary onClick={() => setShowModal(false)}>
                                Close
                            </Button>
                            <Button type='submit' isButton={true} className='modal-btn'>
                                Add Class
                            </Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>

            </Modal>
        </div>
    );
}


export default AddClass;