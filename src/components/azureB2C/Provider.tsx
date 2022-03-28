import { client } from "@/utils/azureB2C";
import { MsalProvider } from "@azure/msal-react";
import React from "react";

export default function AzureB2CProvider ({ children }: {children: React.ReactNode}) {

    // TODO: reimplement custom NavigationClient ATH-733
    // Temporarily removed to resolve ATH-724 and ATH-726

    // const history = useHistory();
    // // One-time initialization of `NavigationClient`
    // const [ instance ] = useState(() => {
    //     const navigationClient = new NavigationClient(history);
    //     client.setNavigationClient(navigationClient);
    //     return client;
    // });

    return <MsalProvider instance={client}>{children}</MsalProvider>;
}
