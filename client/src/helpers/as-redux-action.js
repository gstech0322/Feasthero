export default function asAction(type, value) {
    return {
        type: type,
        value: value,
    }
}