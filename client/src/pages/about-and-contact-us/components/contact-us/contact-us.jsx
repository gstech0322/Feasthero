import React, { useState, useRef, useEffect } from 'react';
import { Col, Form, Row, Modal } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";

import Title from '../../../../components/title/title';
import Button from '../../../../components/button/button';
import Loader from '../../../../components/loader/loader';
import { settings } from '../../../../settings';
import useMutate from '../../../../hooks/mutate';
import { contact } from '../../../../services/contact/services';

import './contact-us.scss';


export default function ContactUs() {
  const [formState, setFormState] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const reCaptchaRef = useRef();
  const [email, { loading, errors, data }] = useMutate(contact, { withDispatch: false });

  const handleSubmit = async (event) => {
    event.preventDefault();
    await email(formState, reCaptchaRef.current.value);
  }

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (data === true)
      setShowSuccessModal(true);
  }, [data])

  return (
    <>
      <section id='contact-us'>
        <Loader show={loading} />
        <Modal
          backdropClassName='p-5'
          contentClassName='text-center p-5'
          centered
          onHide={() => setShowSuccessModal(false)}
          show={showSuccessModal}
        >
          <h4 className='text-success'>Sent! We will get back to you shortly...</h4>
        </Modal>
        <Row className='justify-content-center'>
          <Col lg={8}>
            <div className='heading'>
              <Title>
                Let's Talk
              </Title>
              <h5 className='text-muted'>
                Want to get in touch? We'd love to hear from you, please fill out the form and we'll get back to you promptly.
              </h5>
            </div>
            <form onSubmit={handleSubmit}>
              <Row>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Control
                      onChange={handleFormChange}
                      value={formState.email} name='email'
                      required size='lg' type='email'
                      placeholder='Email...' />
                    <span className='text-danger'>{errors['email']}</span>
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group>
                    <Form.Control
                      onChange={handleFormChange}
                      value={formState.name} name='name'
                      required size='lg' type='text'
                      placeholder='Name...' />
                    <span className='text-danger'>{errors['name']}</span>
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Control
                  onChange={handleFormChange}
                  value={formState.subject} name='subject'
                  required size='lg' type='text'
                  placeholder='Subject...' />
                <span className='text-danger'>{errors['subject']}</span>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  onChange={handleFormChange}
                  value={formState.message} name='message'
                  required size='lg' as='textarea'
                  placeholder='Your Message...' />
                <span className='text-danger'>{errors['message']}</span>
              </Form.Group>
              <Form.Group>
                <ReCAPTCHA
                  ref={reCaptchaRef}
                  sitekey={settings.RECAPTCHA_SITE_KEY}
                />
                <span className='text-danger'>{errors['recaptcha']}</span>
              </Form.Group>
              <span className='text-danger'>{errors['error']}</span>
              <Button isButton={true} type='submit'>Send</Button>
            </form>
          </Col>
        </Row>
      </section>
    </>
  )
}