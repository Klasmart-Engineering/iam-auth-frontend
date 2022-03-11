import { baseStyles } from "./common";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import React from "react";

interface Props {
    text: string;
    className?: string;
    "data-testid"?: string;
}

const useStyles = makeStyles({
    body: {
        ...baseStyles,
        lineHeight: `2rem`,
        fontSize: `1.25rem`,
        whiteSpace: `pre-wrap`,
        margin: `auto`,
        maxWidth: 500,
    },
});

export const Body = (props: Props): JSX.Element => {
    const {
        className,
        text,
        "data-testid": testId,
    } = props;

    const styles = useStyles();

    return <Typography
        className={clsx(styles.body, className)}
        align="center"
        data-testid={testId}>{text}</Typography>;
};
