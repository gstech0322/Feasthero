export default function formDataFromObject(obj) {
    var formData = new FormData();

    for (let key in obj) {
        formData.append(key, obj[key]);
    }

    return formData;
}