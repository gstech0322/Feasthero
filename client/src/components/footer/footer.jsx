import React from "react";
import { Col, Container, Row } from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';

import './footer.scss';

function Footer() {
  return (
    <Container fluid id='footer'>
      <Row className='justify-content-end'>
        <Col className='align-self-center' md={5}>
          <h3 className='content-color'>
            © 2021 FeastHero.
            <br />
            All rights reserved.
          </h3>
        </Col>
        <Col md={2}>
          <h5>Social</h5>
          <ul>
            <li>
              <a rel='noreferrer' target='_blank' href="https://www.facebook.com/feasthero">Facebook</a>
            </li>
            <li>
              <a rel='noreferrer' target='_blank' href="https://www.instagram.com/feasthero/">Instagram</a>
            </li>
            <li>
              <a rel='noreferrer' target='_blank' href="https://twitter.com/FeastHero">Twitter</a>
            </li>
          </ul>
        </Col>
        <Col md={2}>
          <h5>Discover</h5>
          <ul>
            <li>
              <Link smooth to="/#classes">All Classes</Link>
            </li>
            <li>
              <Link smooth to="/contact#about-us">About Us</Link>
            </li>
            <li>
              <Link smooth to="/contact#contact-us">Contact Us</Link>
            </li>
          </ul>
        </Col>
        <Col md={2}>
          <h5>Legal</h5>
          <ul>
            <li>
              <Link smooth to="/faq">FAQ</Link>
            </li>
            <li>
              <Link smooth to="/#">Terms</Link>
            </li>
            <li>
              <Link smooth to="/#">Privacy Policy</Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer;