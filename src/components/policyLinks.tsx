import DialogAppBar from "./dialogAppBar";
import { PrivacyPolicy } from "@branding/index";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
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
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as React from "react";
import {
    useEffect,
    useRef,
    useState,
} from "react";
import { FormattedMessage } from "react-intl";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        links: {
            padding: theme.spacing(2, 0),
            textAlign: `right`,
            [theme.breakpoints.down(`sm`)]: {
                textAlign: `center`,
            },
        },
    }));

function LinkContainer ({ children }: { children: React.ReactNode }) {
    const classes = useStyles();
    return (
        <Grid
            container
            spacing={2}
            justifyContent="flex-end"
            className={classes.links}
        >
            {children}
        </Grid>
    );
}

const Motion = React.forwardRef(function Transition (props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>) {
    return <Grow
        ref={ref}
        style={{
            transformOrigin: `0 0 0`,
        }}
        {...props} />;
});

export default function PolicyLinks () {
    const theme = useTheme();
    const isSmDown = useMediaQuery(theme.breakpoints.down(`sm`));

    const [ open, setOpen ] = useState(false);
    const [ title, setTitle ] = useState(`Privacy Notice`);
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
    }, [ open ]);

    if (PrivacyPolicy.variant === `link`) {
        return (
            <LinkContainer>
                <Grid
                    item
                    xs={4}>
                    <PrivacyPolicy>
                        <FormattedMessage id="privacy_privacyLink" />
                    </PrivacyPolicy>
                </Grid>
            </LinkContainer>
        );
    }

    return (
        <>
            <LinkContainer>
                <Grid
                    item
                    xs={4}>
                    <Link
                        color="inherit"
                        variant="caption"
                        style={{
                            cursor: `pointer`,
                        }}
                        onClick={() => {
                            setOpen(true);
                            setTitle(`Privacy Notice`);
                        }}
                    >
                        <FormattedMessage id="privacy_privacyLink" />
                    </Link>
                </Grid>
            </LinkContainer>
            <Dialog
                aria-labelledby="policy-external-link"
                fullScreen={isSmDown}
                open={open}
                scroll="paper"
                TransitionComponent={Motion}
                onClose={handleClose}
            >
                <DialogAppBar
                    handleClose={handleClose}
                    titleID={title} />
                <DialogContent dividers>
                    <DialogContentText
                        ref={descriptionElementRef}
                        id="scroll-content"
                        tabIndex={-1}
                    >
                        <PrivacyPolicy />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    );
}
