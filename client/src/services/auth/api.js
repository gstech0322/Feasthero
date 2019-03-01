import { LOGOUT, OAUTH_REGISTER, STANDARD_LOGIN, STANDARD_REGISTER, OAUTH_LOGIN, PUT_ACCOUNT_IN_SESSION } from '../../constants/api-constants';
import feastHeroAxios from '../axios/feast-hero-axios';

export async function register(data) {
    const response = await feastHeroAxios.post(
        STANDARD_REGISTER, {
        regData: {
            firstName: data.firstName, lastName: data.lastName, email: data.email,
            passwordOne: data.passwordOne, passwordTwo: data.passwordTwo,
        },

    },
        {
            withCredentials: true
        })
        .then((response) => response)
        .catch((err) => ({ error: err.response }));

    return response;
}

export async function putAccountInSession(account) {
    const response = await feastHeroAxios.post(
        PUT_ACCOUNT_IN_SESSION,
        { account: account },
        { withCredentials: true }
    )
    .then((response) => response)
    .catch((err) => ({ error: err.response }));

    return response;
}

export async function login(email, password) {
    const response = await feastHeroAxios.post(
        STANDARD_LOGIN,
        { loginData: { email: email, password: password } },
        { withCredentials: true },
    )
        .then((response) => response)
        .catch((err) => ({ error: err.response }));

    return response;
}

export async function logout() {
    const response = await feastHeroAxios.get(LOGOUT, { withCredentials: true })
        .then((response) => response)
        .catch((_) => ({ error: true }));

    return !response.error;
}

export async function oAuthRegister(token, accountType) {
    const response = await feastHeroAxios.post(OAUTH_REGISTER, { token: token, accountType: accountType }, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: err.response }));

    return response;
}

export async function oAuthLogin(token) {
    const response = await feastHeroAxios.post(OAUTH_LOGIN, { token: token }, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: err.response }));

    return response;
}