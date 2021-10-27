import React from "react";

interface URLContext {
    hostName: string;
    locale: string | null;
    uaParam: string | null;
    continueParam: string | null;
    testing: boolean;
}

const URLContext = React.createContext<URLContext | undefined>(undefined);

export function useURLContext () {
    const context = React.useContext(URLContext);
    if (context === undefined) {
        throw new Error(`useURLContext must be used within a URLContext.Provider`);
    }
    return context;
}

export const URLContextProvider = URLContext.Provider;
