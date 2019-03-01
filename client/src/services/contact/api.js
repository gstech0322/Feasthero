import didCorsFail from '../../helpers/cors-failed';

import feastHeroAxios from '../axios/feast-hero-axios';

import { EMAIL } from '../../constants/api-constants';

export async function email(name, email, subject, message, recaptchaData) {
    const response = await feastHeroAxios.post(EMAIL, { name: name, subject: subject, email: email, message: message, recaptchaData: recaptchaData })
        .then((response) => response)
        .catch((err) => ({ error: didCorsFail(err) }));
    
    return response;
}