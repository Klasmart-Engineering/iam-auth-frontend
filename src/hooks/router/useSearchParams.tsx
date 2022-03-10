// Simplified backport of react-router v6's `useSearchParams`
// https://github.com/remix-run/react-router/blob/7dca9dc38c837ed94796325b1e0582aa72a9313f/packages/react-router-dom/index.tsx#L425

import React,
{ useMemo } from 'react';
import { useLocation } from 'react-router';

const useSearchParams = (): [ URLSearchParams ] => {
    const location = useLocation();

    const searchParams = useMemo(() => {
        return new URLSearchParams(location.search);
    }, [ location.search ]);

    return [ searchParams ];
};

export default useSearchParams;
