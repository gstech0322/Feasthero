const cleanErrors = require('../../../helpers/clean_errors');
const NumberValidator = require('../../../validators/number')
const BooleanValidator = require('../../../validators/boolean');
const NotEmptyValidator = require('../../../validators/not_empty');

function validateClassData(classData) {
    let errors = {};

    errors['title'] = NotEmptyValidator.validate(classData.title);
    errors['description'] = NotEmptyValidator.validate(classData.description);
    errors['thumbnail'] = NotEmptyValidator.validate(classData.thumbnail);
    errors['costPerDevice'] = NumberValidator.validate(classData.costPerDevice);
    errors['duration'] = NumberValidator.validate(classData.duration);
    errors['mealKitCost'] = NumberValidator.validate(classData.mealKitCost);
    errors['hasMealKit'] = BooleanValidator.validate(classData.hasMealKit);

    return cleanErrors(errors);
}

module.exports = validateClassData;