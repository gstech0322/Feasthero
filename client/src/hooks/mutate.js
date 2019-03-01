import { useDispatch } from 'react-redux';
import { useState } from 'react';

const useMutate = (asyncCallback, { withDispatch }) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    const callback = async (...args) => {
        setLoading(true);
        try {
            if (withDispatch)
                setData(await dispatch(asyncCallback(...args)));
            else
                setData(await asyncCallback(...args));
        } catch (e) {
            setErrors(e);
        }
        setLoading(false);
    }

    return [callback, { loading, errors, data }];
}

export default useMutate;