import feastHeroAxios from '../axios/feast-hero-axios';
import { SUBSCRIBE } from '../../constants/api-constants';

export async function subscribe(email) {
    const response = await feastHeroAxios.post(SUBSCRIBE, { 'email': email })
        .then((response) => response)
        .catch((err) => ({ error: err.response }));


    return response;
}