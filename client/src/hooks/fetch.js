import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const useFetch = (asyncCallback, { withDispatch }, ...args) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [data, setData] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            try {
                if (withDispatch)
                    setData(await dispatch(asyncCallback(...args)));
                else
                    setData(await asyncCallback(...args));
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        }
        fetch();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { loading, error, data };
}

export default useFetch;