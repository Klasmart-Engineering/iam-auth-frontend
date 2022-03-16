import {
    Body,
    Title,
} from "@/components/banadamu";
import { BadanamuLookBackground } from "@/components/banadamu/backgrounds";
import StyledButton from "@/components/button";
import { makeStyles } from "@mui/styles";
import React,
{ MouseEventHandler } from "react";
import { useIntl } from "react-intl";

interface Props {
    onRetryClick: MouseEventHandler<HTMLButtonElement>;
}

interface RetryButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const useButtonStyles = makeStyles({
    button: {
        margin: `24px auto`,
    },
});

const RetryButton = (props: RetryButtonProps) => {
    const { onClick } = props;

    const styles = useButtonStyles();
    const intl = useIntl();

    return (
        <StyledButton
        extendedOnly
        data-testid="retry-button"
        size="medium"
        type="button"
        className={styles.button}
        onClick={onClick}
        >
            {intl.formatMessage({
                id:`generic.retry`,
            })}
        </StyledButton>
    );
};

const Error = (props: Props) => {
    const { onRetryClick } = props;
    const intl = useIntl();
    return (
        <BadanamuLookBackground>
            <Title
                data-testid="error-title"
                text={intl.formatMessage({
                    id: `generic.oops`,
                })}
            />
            <Body
                data-testid="error-body"
                text={intl.formatMessage({
                    id: `signOut.error`,
                })}
            />
            <RetryButton onClick={onRetryClick} />
        </BadanamuLookBackground>
    );
};

export default Error;
