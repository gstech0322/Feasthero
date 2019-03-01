import React, { useEffect, useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import Button from '../../../components/button/button';

import { useDispatch } from 'react-redux';
import useMutate from '../../../hooks/mutate';
import { atLoginPage, leftLoginPage, login as loginRequest } from '../../../services/auth/actions';
import Loader from '../../../components/loader/loader';
import ShouldRedirectToAccount from '../../../hoc/should-redirect-to-account';
import OAuthLogin from './oauth-login';

import './login.scss';
import '../auth.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, { loading, errors }] = useMutate(loginRequest, { withDispatch: true });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(atLoginPage());

        return () => {
            dispatch(leftLoginPage());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmitStandardLogin = async (evt) => {
        evt.preventDefault();
        await login(email, password);
    }

    return (
        <section id='login'>
            <Loader show={loading} />
            <Container>
                <form onSubmit={handleSubmitStandardLogin}>
                    <div className='mb-3'>
                        <Form.Control
                            onChange={e => setEmail(e.target.value)}
                            value={email}
                            name='email' required
                            type='email' placeholder='Email'
                        />
                        <span className='text-danger'>{errors['email']}</span>
                    </div>
                    <div className='mb-3'>
                        <Form.Control
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                            name='password' required
                            type='password' placeholder='Password'
                        />
                        <span className='text-danger'>{errors['password']}</span>
                    </div>

                    <Row className='justify-content-center'>
                        <Col md={12} className='text-center'>
                            <Button isButton={true}>Sign In</Button>
                            <span className='text-danger'>{errors['error']}</span>
                            <div className="strike-through my-3">
                                <span className='text-muted'>or sign in with google</span>
                            </div>
                            <OAuthLogin />
                        </Col>
                    </Row>
                </form>
            </Container>
        </section>
    )
}

export default ShouldRedirectToAccount(Login);