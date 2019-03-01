function cleanErrors(errors) {
    for (var error in errors) {
        if (errors[error] === null || errors[error] === undefined) {
            delete errors[error];
        }
    }
    return errors
}

module.exports = cleanErrors;