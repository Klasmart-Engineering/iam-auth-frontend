import {
    useEffect,
    useRef,
} from 'react';

// Adapted from https://overreacted.io/making-setinterval-declarative-with-react-hooks/
export const useInterval = (callback: () => void, delay: number | null) => {
    const savedCallback = useRef(callback);

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback;
    }, [ callback ]);

    // Set up the interval.
    useEffect(() => {
        if (!delay) return;

        const id = setInterval(() => savedCallback.current(), delay);

        return () => clearInterval(id);
    }, [ delay ]);
};
