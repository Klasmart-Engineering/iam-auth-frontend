import useClaim from '@/hooks/azureB2C/useClaim';
import { isKidsloopIdp } from '@/utils/azureB2C';

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
