import {
    CircularProgress,
    createStyles,
    makeStyles,
} from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles(() => createStyles({
    loadingContainer: {
        alignItems: `center`,
        display: `flex`,
        height: `100%`,
        justifyContent: `center`,
        left: 0,
        position: `absolute`,
        top: 0,
        width: `100%`,
    },
}));

export const useLoadingStyles = makeStyles(() => createStyles({
    buttonLoading: {
        pointerEvents: `none`,
    },
    buttonLoadingContent: {
        opacity: 0,
    },
}));

interface Props {
    showCancel?: boolean;
}

export default function (props: Props) {
    const { showCancel } = props;
    const classes = useStyles();
    return (
        <>
            <span className={classes.loadingContainer}>
                <CircularProgress
                    size={24}
                    color="inherit"
                />
            </span>
            <span className={classes.loadingContainer}>
                {showCancel && <CloseIcon fontSize="small" />}
            </span>
        </>
    );
}
