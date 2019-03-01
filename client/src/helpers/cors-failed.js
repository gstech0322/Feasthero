export default function didCorsFail(error) {
    if (error.response)
        return error.response;
    return 500;
}