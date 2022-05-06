import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    Grid,
    Link,
    Theme
} from '@mui/material'
import {
    createStyles,
    makeStyles,
} from "@mui/styles";
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

const LinkContainer = ({ children }: { children: React.ReactNode }) => {
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

const OneTrustPolicy = () => {
    const [ open, setOpen ] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            (window as any).OneTrust.NoticeApi.Initialized.then(() =>  {
                (window as any).OneTrust.NoticeApi.LoadNotices(["https://privacyportal-uk-cdn.onetrust.com/812c79ab-b3bb-419e-b08c-2faecc2c78d4/privacy-notices/203699be-5ce4-49be-937d-fa95ecff3043.json"]);
            })
        }
    }, [open])

    return (
        <>
            <LinkContainer>
                <Grid
                    item
                    sx={{
                        a: {
                            textDecoration: `none`,
                            "&:hover": {
                                textDecoration: `underline`,
                            },
                        },
                    }}
                    xs={4}
                >
                    <Link
                        color="inherit"
                        variant="caption"
                        style={{
                            cursor: `pointer`,
                        }}
                        onClick={() => {
                            setOpen(true);
                        }}
                    >
                        <FormattedMessage id="privacy_privacyLink" />
                    </Link>
                </Grid>
            </LinkContainer>
            <Dialog onClose={handleClose} open={open} fullWidth maxWidth="xl">
                <DialogContent>
                    <div className="otnotice-language-dropdown-container">
                        <select id="otnotice-language-dropdown" aria-label="language selector"></select>
                    </div>
                        
                    <div id="otnotice-203699be-5ce4-49be-937d-fa95ecff3043" className="otnotice"></div>
                </DialogContent>
            </Dialog>
        </>
      );
}

export default OneTrustPolicy