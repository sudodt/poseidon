
import { useRef, useState, useEffect } from 'react';

export const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState();
    const timer = useRef(null);
    useEffect(() => {
        timer.current = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => clearTimeout(timer.current);
    }, [value, delay]);

    return debouncedValue;
};