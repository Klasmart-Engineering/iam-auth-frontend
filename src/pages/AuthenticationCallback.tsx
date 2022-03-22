import Loading from '@/components/Loading';
import { useMsal } from '@azure/msal-react';
import React,
{ useEffect } from 'react';

const AuthenticationCallback = () => {
    const { instance: msalClient } = useMsal();

    useEffect(() => {
        msalClient.handleRedirectPromise().then(() => console.log(`logged in`));
    }, [ msalClient ]);

    return <Loading />;
};

export default AuthenticationCallback;
