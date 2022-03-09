import { client } from "@/utils/azureB2C";
import { NavigationClient } from "@/utils/azureB2C/navigation";
import { MsalProvider } from "@azure/msal-react";
import React,
{ useState } from "react";
import { useHistory } from "react-router-dom";

export default function AzureB2CProvider ({ children }: {children: React.ReactNode}) {
    const history = useHistory();
    // One-time initialization of `NavigationClient`
    const [ instance ] = useState(() => {
        const navigationClient = new NavigationClient(history);
        client.setNavigationClient(navigationClient);
        return client;
    });

    return <MsalProvider instance={instance}>{children}</MsalProvider>;
}
