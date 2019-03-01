export default function errorsAreEmpty(errors) {
    return Object.values(errors).every(error => error === null);
}