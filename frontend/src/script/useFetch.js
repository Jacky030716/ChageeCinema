import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get(url)
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.error('Fetched data is not an array:', response.data);
                    setError('Fetched data is not an array');
                }
            })
            .catch((error) => {
                console.error(error);
                setError(error);
            });
    }, [url]);

    return { data, error };
};