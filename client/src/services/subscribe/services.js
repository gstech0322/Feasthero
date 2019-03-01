import { subscribe as subscribeRequest } from "./api";
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info'

export async function subscribe(email) {
    const response = await subscribeRequest(email);
    if (response.error) {
        if (requestErrorHasAdditionalInfo(response.error))
            throw response.error.data['errors']
        else {
            const error = { error: 'Failed to subscribe' };
            throw error;
        }
    }

    return true;
}