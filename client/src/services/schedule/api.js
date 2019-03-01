import { ADD_TIME_SLOT, DELETE_TIME_SLOT } from "../../constants/api-constants";
import feastHeroAxios from "../axios/feast-hero-axios";

async function addTimeSlot(classId, dateTime) {
    const response = await feastHeroAxios.post(ADD_TIME_SLOT, { dateTime: dateTime, classId: classId }, { withCredentials: true })
        .then((response) => response.data)
        .catch((err) => { console.log(err); return { error: true } });

    return response;
}

async function deleteTimeSlot(timeSlotId, classId) {
    const response = await feastHeroAxios.delete(DELETE_TIME_SLOT(classId, timeSlotId), { withCredentials: true })
        .then((response) => response)
        .catch((error) => ({ error: error.response }));

    return response;
}

export { addTimeSlot, deleteTimeSlot }