import useClaim from '@/hooks/azureB2C/useClaim';
import React from 'react';

/**
 * Return IDP from ID Token of active B2C session, or `undefined` if no active B2C session
 */
const useIdentityProvider = (): string | undefined => {
    const idp = useClaim(`idp`);

    // Temporary conversion for existing sessions based on old `identityProvider` value
    // TODO: ATH-759 remove this temporary measure;
    return idp === `MyClassBoard` ? `MCB`: idp;
};

export default useIdentityProvider;
