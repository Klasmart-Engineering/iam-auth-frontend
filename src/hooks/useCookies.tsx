import {
    createContext,
    useContext,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import Cookies, {
    Cookie,
    CookieSetOptions,
} from 'universal-cookie';

const isInBrowser = () => {
    return (
        typeof window !== `undefined` &&
      typeof window.document !== `undefined` &&
      typeof window.document.createElement !== `undefined`
    );
};

const CookiesContext = createContext(new Cookies());

export function useCookies<T extends string, U = { [K in T]?: any }> (dependencies?: T[]): [
  U,
  (name: T, value: Cookie, options?: CookieSetOptions) => void,
  (name: T, options?: CookieSetOptions) => void
] {

    const cookies = useContext(CookiesContext);
    if (!cookies) {
        throw new Error(`Missing <CookiesProvider>`);
    }

    const initialCookies = Object.fromEntries(new URLSearchParams(document.cookie.replace(/; /g, `&`))) as any;

    const [ allCookies, setCookies ] = useState(initialCookies);
    const previousCookiesRef = useRef(allCookies);

    if (isInBrowser()) {
        useLayoutEffect(() => {
            function onChange () {
                const newCookies = Object.fromEntries(new URLSearchParams(document.cookie.replace(/; /g, `&`)));

                if (
                    shouldUpdate(dependencies || null, newCookies, previousCookiesRef.current)
                ) {
                    setCookies(newCookies);
                }

                previousCookiesRef.current = newCookies;
            }

            cookies.addChangeListener(onChange);

            return () => {
                cookies.removeChangeListener(onChange);
            };
        }, [ cookies ]);
    }

    const setCookie = useMemo(() => cookies.set.bind(cookies), [ cookies ]);
    const removeCookie = useMemo(() => cookies.remove.bind(cookies), [ cookies ]);

    return [
        allCookies,
        setCookie,
        removeCookie,
    ];
}

function shouldUpdate<U = { [K: string]: any }> (dependencies: Array<keyof U> | null,
    newCookies: U,
    oldCookies: U) {
    if (!dependencies) {
        return true;
    }

    for (const dependency of dependencies) {
        if (newCookies[dependency] !== oldCookies[dependency]) {
            return true;
        }
    }

    return false;
}
