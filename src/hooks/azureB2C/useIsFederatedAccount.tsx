import useClaim from '@/hooks/azureB2C/useClaim';
import { IdTokenClaims } from '@/utils/azureB2C/claims';
import React from 'react';

const isKidsloopIdp = (idp: IdTokenClaims["idp"]) => idp.toLowerCase().startsWith(`kidsloop`);

/**
 * Check IDP in ID Token of active B2C session:
 *
 * Federated account (3rd party IDP such as MCB) - returns `true`
 *
 * Local account (KidsLoop IDP) - returns `false`
 *
 * No active B2C session - returns `undefined`
 */
const useIsFederatedAccount = (): boolean | undefined => {
    const claim = useClaim(`idp`);

    return claim ? !isKidsloopIdp(claim): undefined;
};

export default useIsFederatedAccount;
