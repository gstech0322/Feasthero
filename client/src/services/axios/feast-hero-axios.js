import axios from 'axios';
import { initSettings, settings } from '../../settings';

initSettings();

const feastHeroAxios = axios.create({
    baseURL: settings.SERVER_ORIGIN,
})

export default feastHeroAxios;