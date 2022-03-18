import {
    Body,
    Title,
} from '@/components/banadamu';
import Pogo from '@/components/banadamu/backgrounds/Pogo';
import React from 'react';
import { useIntl } from 'react-intl';

const LogoutSuccess = () => {
    const intl = useIntl();

    return (
        <Pogo>
            <Title
                data-testid="success-title"
                text={intl.formatMessage({
                    id: `signOut.success.title`,
                })}
            />
            <Body
                data-testid="success-body"
                text={intl.formatMessage({
                    id: `signOut.success.body`,
                })}
            />
        </Pogo>
    );
};

export default LogoutSuccess;
