import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!url) {
                return; // If URL is not defined, do not proceed with fetching data
            }

            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message || 'An error occurred');
            }
        };

        fetchData();
    }, [url]);

    return { data, error };
};
