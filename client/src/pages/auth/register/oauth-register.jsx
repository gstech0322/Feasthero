import GoogleLogin from 'react-google-login';
import Loader from '../../../components/loader/loader';

import useMutate from '../../../hooks/mutate';
import { oAuthRegister as oAuthRegisterRequest } from '../../../services/auth/actions';

export default function OAuthRegister() {
    const [register, { loading, errors }] = useMutate(oAuthRegisterRequest, { withDispatch: true });

    const oAuthRegister = async (oAuthData) => {
        await register(oAuthData);
    }

    return (
        <>
            <Loader show={loading} />
            <GoogleLogin
                className='sign-up-with-google'
                buttonText='Sign up with Google'
                clientId={process.env.REACT_APP_OAUTH_CLIENT_ID}
                onSuccess={oAuthRegister}
                cookiePolicy={'single_host_origin'}
            />
            <span className='text-danger'>{errors['error']}</span>
        </>
    )
}