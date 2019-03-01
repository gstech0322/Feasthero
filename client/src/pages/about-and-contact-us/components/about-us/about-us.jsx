import React from 'react'
import { Container, Image, Row } from 'react-bootstrap';
import { Bounce, Fade } from 'react-awesome-reveal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';

import Title from '../../../../components/title/title';

import logofull from '../../../../assets/resources/images/logo-full.png';

import './about-us.scss';

function AboutUs() {
    return (
        <div id='about-us'>
            <Bounce triggerOnce>
                <Container>
                    <Title>Who we are</Title>
                    <p>
                        Hey there! We're FeastHero, a brand new start-up in Toronto that offers online group cooking classes by local chefs primarily
                        to organizations that are looking for virtual team engagement opprotunites for their remove workforce
                    </p>
                    <p className='mt-4 mb-4'>
                        We're also available for private groups of 5 or more if you and your friends are looking for something fun to do together in
                        te comfort of your own home
                    </p>
                    <Fade triggerOnce delay={1000}>
                        <Image src={logofull} />
                        <Row className='icons'>
                            <a rel='noreferrer' target='_blank' href='https://ca.linkedin.com/company/feasthero'>
                                <FontAwesomeIcon icon={faLinkedin} size={'2x'} />
                            </a>
                            <a rel='noreferrer' target='_blank' href='https://www.instagram.com/feasthero/'>
                                <FontAwesomeIcon icon={faInstagram} size={'2x'} />
                            </a>
                            <a rel='noreferrer' target='_blank' href='https://www.facebook.com/feasthero'>
                                <FontAwesomeIcon icon={faFacebook} size={'2x'} />
                            </a>
                        </Row>
                    </Fade>
                </Container>
            </Bounce>
        </div>
    );
}

export default AboutUs;