import { IdTokenClaims } from '@/utils/azureB2C/claims';
import { useAccount } from '@azure/msal-react';
import React,
{ useMemo } from 'react';

const useClaim = <Claim extends keyof IdTokenClaims>(claim: Claim): IdTokenClaims[Claim] | undefined => {
    const activeAccount = useAccount();

    return useMemo( () => (activeAccount?.idTokenClaims as IdTokenClaims | undefined)?.[claim], [ activeAccount, claim ]);
};

export default useClaim;
