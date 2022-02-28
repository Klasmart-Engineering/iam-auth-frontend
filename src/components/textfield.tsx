import {
    createStyles,
    makeStyles,
} from "@mui/styles";
import { Theme } from "@mui/material/styles"
import TextField,
{ StandardTextFieldProps } from "@mui/material/TextField";
import * as React from "react";

type Props = Omit<StandardTextFieldProps, "children" | "className">

const useStyles = makeStyles((theme: Theme) => createStyles({
    cssFocused: {
        "&$cssFocused": {
            color: `#1896ea`, // focused
        },
        color: `#1896ea`,
    },
    cssLabel: {},
    cssOutlinedInput: {
        "&$cssFocused $notchedOutline": {
            borderColor: `#1896ea`, // focused
        },
        "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
            borderColor: `#7c8084`, // hovered
        },
        "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
            borderColor: `#c9caca`, // default
        },
    },
    disabled: {},
    error: {},
    notchedOutline: {},
    txtfield: {
        "& fieldset": {
            borderRadius: 12,
        },
        borderColor: `black`,
        paddingBottom: theme.spacing(1),
    },
}));

export default function StyledTextField (props: Props) {
    const classes = useStyles();
    const {
        type,
        ...other
    } = props;

    return (
        <>
            <TextField
                {...other}
                className={classes.txtfield}
                inputProps={type === `number` ? {
                    min: 0,
                    max: 9999,
                } : {
                    maxLength: 200,
                }}
                InputLabelProps={{
                    classes: {
                        focused: classes.cssFocused,
                        root: classes.cssLabel,
                    },
                }}
                InputProps={{
                    classes: {
                        focused: classes.cssFocused,
                        notchedOutline: classes.notchedOutline,
                        root: classes.cssOutlinedInput,
                    },
                }}
                type={type}
                variant="outlined"
                onInput={type === `number` ? (e) => {
                    (e.target as HTMLTextAreaElement).value = Math.max(0, parseInt((e.target as HTMLTextAreaElement).value)).toString().slice(0, 4);
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                } : () => { }}
            />
        </>
    );
}
