import GoogleLogin from "react-google-login";
import Loader from "../../../components/loader/loader";

import useMutate from "../../../hooks/mutate";
import { oAuthLogin as oAuthLoginRequest } from '../../../services/auth/actions';

export default function OAuthLogin() {
    const [oAuthLogin, { loading, errors }] = useMutate(oAuthLoginRequest, { withDispatch: true });
    const handleLogin = async (oAuthData) => {
        await oAuthLogin(oAuthData);
    }

    return (
        <>
            <Loader show={loading} />

            <GoogleLogin
                className='sign-in-with-google'
                clientId='585615552509-ve5qcffqars3nnrg10d2o6do4jhnp7ep.apps.googleusercontent.com'
                onSuccess={handleLogin}
                cookiePolicy={'single_host_origin'}
            />
            <span className='text-danger'>{errors['error']}</span>
        </>
    )
}