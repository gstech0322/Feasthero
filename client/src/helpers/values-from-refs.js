export default function valsFromRefs(refs) {
    let vals = [];
    refs.forEach(ref => {
        if (ref.current.value)
            vals.push(ref.current.value);
    })
    return vals;
}