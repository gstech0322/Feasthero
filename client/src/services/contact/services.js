import { email as sendEmailRequest } from './api';
import errorsAreEmpty from '../../helpers/no-errors-in-map';
import requestErrorHasAdditionalInfo from '../../helpers/request-error-has-additional-info'
import * as validators from '../../validators';

export async function contact(contactDetails, reCaptcha) {
    const { name, email, subject, message } = contactDetails;

    const validate = () => {
        let errors = {};

        errors['name'] = validators.NameValidator.validate(name)
        errors['email'] = validators.EmailValidator.validate(email);
        errors['subject'] = validators.NotEmptyValidator.validate(subject);
        errors['message'] = validators.NotEmptyValidator.validate(message);

        return errors;
    }

    const errors = validate();
    if (!errorsAreEmpty(errors))
        throw errors;

    const response = await sendEmailRequest(name, email, subject, message, reCaptcha);
    if (response.error) {
        if (requestErrorHasAdditionalInfo(response.error))
            throw response.error.data['errors'];
        else {
            const error = { error: 'Failed to send email' };
            throw error;
        }
    }

    return true;
}