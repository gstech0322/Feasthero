import { GET_ACCOUNT as GET_ACCOUNT_URL } from '../../constants/api-constants';
import feastHeroAxios from '../axios/feast-hero-axios';
import didCorsFail from '../../helpers/cors-failed';

export async function getAccount() {
    const response = await feastHeroAxios.get(GET_ACCOUNT_URL, { withCredentials: true })
        .then((response) => response)
        .catch((err) => ({ error: didCorsFail(err) }))

    return response;
}