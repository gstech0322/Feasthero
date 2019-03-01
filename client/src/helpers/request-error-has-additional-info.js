export default function requestErrorHasAdditionalInfo(errorResponse) {
    return String(errorResponse.status)[0] === '4' && errorResponse.data['errors'];
}