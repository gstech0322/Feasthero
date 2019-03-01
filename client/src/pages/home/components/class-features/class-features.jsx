import React from 'react';

import { Col, Row, Image } from 'react-bootstrap';

import broccoli from '../../../../assets/resources/images/home-img-gallery/broccoli.png';
import cook from '../../../../assets/resources/images/home-img-gallery/cook.png';
import cooks from '../../../../assets/resources/images/home-img-gallery/cooks.png';
import mariana from '../../../../assets/resources/images/home-img-gallery/mariana.png';
import skip from '../../../../assets/icons/skip.png';
import laptopconnected from '../../../../assets/icons/laptop-connected.png';
import forkknife from '../../../../assets/icons/fork-knife.png';

import './class-features.scss';

function ClassFeatures() {
    return (
        <section id='class-features'>
            <Row noGutters className='justify-content-center'>
                <Col className='align-self-center' xl={6}>
                    <Row noGutters id='class-features-imgs'>
                        <Col md={4}>
                            <Image src={cook} />
                            <Image src={mariana} />
                        </Col>
                        <Col md={4}>
                            <Image src={broccoli} />
                            <Image src={cooks} />
                        </Col>
                    </Row>
                </Col>
                <Col id='class-features-content' className='align-self-end' xl={6}>
                    <h2 className='small-section-title'>Try new meals and learn <br /> from experienced chefs</h2>
                    <div>
                        <Row>
                            <Col md={2}>
                                <Image fluid src={skip} />
                            </Col>
                            <Col md={6}>
                                <h3>Skip The Grocery Store</h3>
                                <p>
                                    Select the option to have ingredients for your class
                                    shipped to you for convenience.
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}>
                                <Image fluid src={laptopconnected} />
                            </Col>
                            <Col md={6}>
                                <h3>Create Connections Virtually</h3>
                                <p>
                                    Connecting virtually can be hard. Creating together
                                    allows teams and groups to enjoy a fun evening.
                                </p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={2}>
                                <Image fluid src={forkknife} />
                            </Col>
                            <Col md={6}>
                                <h3>Learn a New Skill</h3>
                                <p>
                                    It doesn’t matter what your knife skills are! Our
                                    cooking classes are made for any skill level.
                                </p>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </section>
    );
}

export default ClassFeatures;