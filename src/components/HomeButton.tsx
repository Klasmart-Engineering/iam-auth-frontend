import StyledButton from '@/components/button';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useHistory } from 'react-router';

interface Props {
    className?: string;
}

const HomeButton = (props: Props) => {
    const { className } = props;
    const history = useHistory();

    return (
        <StyledButton
        extendedOnly
        data-testid="home-button"
        size="medium"
        type="submit"
        className={className}
        onClick={() => { history.push(`/`);}}
        >
            <FormattedMessage id="button_home" />
        </StyledButton>
    );
};

export default HomeButton;
