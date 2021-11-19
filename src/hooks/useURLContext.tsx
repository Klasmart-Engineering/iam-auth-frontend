import React from "react";

export interface URLContext {
    hostName: string;
    locale: string | null;
    uaParam: string | null;
    continueParam: string | null;
    testing: boolean;
}

const urlContext = React.createContext<URLContext | undefined>(undefined);

export function useURLContext () {
    const context = React.useContext(urlContext);
    if (context === undefined) {
        throw new Error(`useURLContext must be used within a URLContext.Provider`);
    }
    return context;
}

export const URLContextProvider = urlContext.Provider;
