import { client } from "@/utils/azureB2C";
import { MsalProvider } from "@azure/msal-react";
import React from "react";

export default function AzureB2CProvider ({ children }: {children: React.ReactNode}) {
    return <MsalProvider instance={client}>{children}</MsalProvider>;
}
