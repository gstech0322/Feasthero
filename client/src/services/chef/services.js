import errorsAreEmpty from "../../helpers/no-errors-in-map";
import requestErrorHasAdditionalInfo from "../../helpers/request-error-has-additional-info";
import { updateClass as updateClassRequest } from "../classes/api";
import * as validators from '../../validators';


export async function updateClass(classData) {
    const validate = () => {
        let errors = {};

        errors['title'] = validators.NotEmptyValidator.validate(classData.description);
        errors['description'] = validators.NotEmptyValidator.validate(classData.description);
        errors['costPerDevice'] = validators.NumberValidator.validate(classData.costPerDevice);
        errors['duration'] = validators.NumberValidator.validate(classData.duration);
        errors['mealKitCost'] = validators.NumberValidator.validate(classData.mealKitCost);
        errors['hasMealKit'] = validators.BooleanValidator.validate(classData.hasMealKit);

        return errors
    }

    const validationErrors = validate()
    if (!errorsAreEmpty(validationErrors))
        throw validationErrors

    const response = await updateClassRequest(classData._id, classData);
    if (response.error) {
        if (requestErrorHasAdditionalInfo(response.error))
            throw response.error.data['errors'];
        else {
            const error = { error: 'Failed to update, please try again' };
            throw error;
        }
    }
}