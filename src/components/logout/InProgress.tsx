import Spinner from '@/components/banadamu/Spinner';
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from 'react';
import { useIntl } from 'react-intl';

const useStyles = makeStyles({
    container: {
        minHeight: `100vh`,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
    },
    text: {
        color: `#193756`,
        fontWeight: 400,
        marginTop: `1.25rem`,
    },
});

const InProgress = () => {
    const styles = useStyles();
    const intl = useIntl();

    return (
        <div className={styles.container}>
            <Spinner/>
            <Typography className={styles.text}>{intl.formatMessage({
                id: `signOut.inProgress`,
            })}</Typography>
        </div>
    );
};

export default InProgress;
