import GenericError from "@/components/GenericError";
import { useIsFederatedAccount } from "@/hooks";
import React from "react";

export function Error () {
    const isFederatedAccount = useIsFederatedAccount();

    return <GenericError hideHomeButton={isFederatedAccount} />;
}
