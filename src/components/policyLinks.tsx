import useMediaQuery from "@material-ui/core/useMediaQuery";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Dialog from "@material-ui/core/Dialog";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";
import Link from "@material-ui/core/Link";
import {
    createStyles,
    makeStyles,
    Theme,
    useTheme,
} from "@material-ui/core/styles";
import { TransitionProps } from "@material-ui/core/transitions";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import DialogAppBar from "./dialogAppBar";
import { PrivacyPolicy } from "@branding";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        links: {
            padding: theme.spacing(2, 0),
            textAlign: "right",
            [theme.breakpoints.down("sm")]: {
                textAlign: "center",
            },
        },
    })
);

function LinkContainer({ children }: { children: React.ReactNode }) {
    const classes = useStyles();
    return (
        <Grid
            container
            spacing={2}
            justify="flex-end"
            className={classes.links}
        >
            {children}
        </Grid>
    );
}

const Motion = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>
) {
    return <Grow style={{ transformOrigin: "0 0 0" }} ref={ref} {...props} />;
});

export default function PolicyLinks() {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState("Privacy Notice");
    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef<HTMLElement>(null);
    useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    if (PrivacyPolicy.variant === "link") {
        return (
            <LinkContainer>
                <Grid item xs={4}>
                    <PrivacyPolicy color="inherit" variant="caption">
                        <FormattedMessage id="privacy_privacyLink" />
                    </PrivacyPolicy>
                </Grid>
            </LinkContainer>
        );
    }

    return (
        <>
            <LinkContainer>
                <Grid item xs={4}>
                    <Link
                        color="inherit"
                        variant="caption"
                        onClick={() => {
                            setOpen(true);
                            setTitle("Privacy Notice");
                        }}
                        style={{ cursor: "pointer" }}
                    >
                        <FormattedMessage id="privacy_privacyLink" />
                    </Link>
                </Grid>
            </LinkContainer>
            <Dialog
                aria-labelledby="policy-external-link"
                fullScreen={useMediaQuery(theme.breakpoints.down("sm"))}
                open={open}
                onClose={handleClose}
                scroll="paper"
                TransitionComponent={Motion}
            >
                <DialogAppBar handleClose={handleClose} titleID={title} />
                <DialogContent dividers>
                    <DialogContentText
                        id="scroll-content"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <PrivacyPolicy />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}
