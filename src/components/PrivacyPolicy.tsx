import React, { useEffect, useState } from 'react'
import languageSelectIcon from "@/../assets/img/language-select-icon.svg";
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
import { useCookies } from 'react-cookie';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        links: {
            padding: theme.spacing(2, 0),
            textAlign: `right`,
            [theme.breakpoints.down(`sm`)]: {
                textAlign: `center`,
            },
        },
        languageSelect: {
            background: `none`,
            border: `none`,
            borderRadius: `2px`,
            color: `#666`,
            fontSize: `18px`,
            fontWeight: 400,
            lineHeight: `30px`,
            textAlign: `right`,
        },
        languageSelectIcon:{
            marginLeft: `0.8em`,
        },
    }));
const localeMapping = {
    "en": `en-us`,
    "es": `en-us`, 
    "zh-CN": `zh-cn`, 
    "ko": `ko-kr`, 
    "vi": `vi-vn`, 
    "id": `id-id`, 
    "th": `th-th`,
}
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

interface OneTrust {
	NoticeApi: {
            Initialized: () => Promise<boolean>,
            LoadNotices: (policyUrls: string[], recordPageEvent?: boolean, language?: string, display?: boolean) => void
        }
}

type WindowWithOneTrust = typeof globalThis &
    Window & {
        OneTrust: OneTrust    
};

const PrivacyPolicy = () => {
    const classes = useStyles();
    const [ cookies ] = useCookies([ `locale` ]);
    const languageCode:string = cookies.locale;
    const [ open, setOpen ] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            (window as WindowWithOneTrust).OneTrust.NoticeApi.Initialized.then(() =>  {
                (window as WindowWithOneTrust).OneTrust.NoticeApi.LoadNotices(["https://privacyportal-uk-cdn.onetrust.com/812c79ab-b3bb-419e-b08c-2faecc2c78d4/privacy-notices/203699be-5ce4-49be-937d-fa95ecff3043.json"],false,localeMapping[languageCode]);
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
                        <select id="otnotice-language-dropdown" aria-label="language selector" className={classes.languageSelect}></select><img src={languageSelectIcon} className={classes.languageSelectIcon}/>
                    </div>
                        
                    <div id="otnotice-203699be-5ce4-49be-937d-fa95ecff3043" className="otnotice"></div>
                </DialogContent>
            </Dialog>
        </>
      );
}

export default PrivacyPolicy
