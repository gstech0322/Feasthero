import { ALL_CLASSES_FOR_CURRENT_CHEF, FIND_CLASS_FOR_CHEF_PREFIX } from '../../constants/api-constants';
import feastHeroAxios from '../axios/feast-hero-axios';

export async function allChefsClasses() {
    const response = await feastHeroAxios.get(ALL_CLASSES_FOR_CURRENT_CHEF, { withCredentials: true })
        .then((response) => response.data)
        .catch((err) => ({ error: err }));

    return response;
}

export async function getClassForChef(classId) {
    const response = await feastHeroAxios.get(`${FIND_CLASS_FOR_CHEF_PREFIX}/${classId}`, { withCredentials: true })
        .then((response) => response.data)
        .catch((err) => ({ error: err }));

    return response;
}
