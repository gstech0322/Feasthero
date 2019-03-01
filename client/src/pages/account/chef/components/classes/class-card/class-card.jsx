import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'

import { selectClassForEdit } from '../../../../../../services/chef/actions';

import Button from '../../../../../../components/button/button';

import './class-card.scss';

function ClassCard(props) {
    const dispatch = useDispatch();
    const classData = props.classData;

    const handleSelect = () => {
        dispatch(selectClassForEdit(classData));
    }

    return (
        <div className='class-container'>
            <Image className='class-container-background' src={classData.thumbnail} />
            <div className='class-container-content'>
                <Container>
                    <Row>
                        <Col className='align-self-center' md={5} lg={5} xl={6}>
                            <h5>{classData.title}</h5>
                            <h6>
                                <span>
                                    {classData.duration} Hrs | ${classData.costPerDevice}
                                </span>{" "}
                                per device
                            </h6>
                        </Col>
                        <Col className='ml-auto align-self-center' md={4} lg={4} xl={4}>
                            <Button to={`account/class/${classData._id}`} onClick={handleSelect} primary={true} >
                                <>
                                    Edit <FontAwesomeIcon size={'sm'} icon={faArrowRight} />
                                </>
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div >
    );
}

export default ClassCard;