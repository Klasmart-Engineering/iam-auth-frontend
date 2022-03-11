import { baseStyles } from "./common";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

interface Props {
    text: string;
    "data-testid"?: string;
}

const useStyles = makeStyles({
    title: {
        ...baseStyles,
        fontSize: `9rem`,
        marginTop: `7.5rem`,
        marginBottom: `3.5rem`,
        "@media (max-height: 850px), (max-width: 650px)": {
            fontSize: `6rem`,
            marginTop: `5rem`,
            marginBottom: `3rem`,
        },
        "@media (max-height: 600px), (max-width: 450px)": {
            fontSize: `4rem`,
            marginTop: `4rem`,
            marginBottom: `2.5rem`,
        },
    },
});

export const Title = (props: Props): JSX.Element => {
    const { text, "data-testid": testId } = props;

    const styles = useStyles();

    return <Typography
        className={styles.title}
        variant="h2"
        align="center"
        data-testid={testId}>{text}</Typography>;
};
