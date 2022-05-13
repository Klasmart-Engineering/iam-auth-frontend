import languageSelectIcon from "@/../assets/img/language-select-icon.svg";
import {
    Dialog,
    DialogContent,
    Grid,
    Link,
    Theme,
} from '@mui/material';
import {
    createStyles,
    makeStyles,
} from "@mui/styles";
import React,
{
    useEffect,
    useState,
} from 'react';
import { useCookies } from 'react-cookie';
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
        languageSelectIcon: {
            marginLeft: `0.8em`,
        },
    }));
interface LocaleMappingType {
    [key: string]: string;
}
const localeMapping: LocaleMappingType = {
    en: `en-us`,
    es: `en-us`,
    "zh-CN": `zh-cn`,
    ko: `ko-kr`,
    vi: `vi-vn`,
    id: `id-id`,
    th: `th-th`,
};
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
};

interface OneTrust {
    NoticeApi: {
        Initialized: () => Promise<boolean>;
        LoadNotices: (policyUrls: string[], recordPageEvent?: boolean, language?: string, display?: boolean) => void;
    };
}

type WindowWithOneTrust = typeof globalThis &
    Window & {
        OneTrust: OneTrust;
    };

const PrivacyPolicy = () => {
    const classes = useStyles();
    const [ cookies ] = useCookies([ `locale` ]);
    const languageCode: string = cookies.locale;
    const [ open, setOpen ] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (open) {
            (window as any).OneTrust.NoticeApi.Initialized.then(() => {
                (window as WindowWithOneTrust).OneTrust.NoticeApi.LoadNotices([ `https://privacyportal-uk-cdn.onetrust.com/812c79ab-b3bb-419e-b08c-2faecc2c78d4/privacy-notices/203699be-5ce4-49be-937d-fa95ecff3043.json` ], false, localeMapping[languageCode]);
            });
        }
    }, [ open ]);

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
            <Dialog
                fullWidth
                open={open}
                maxWidth="xl"
                onClose={handleClose}
            >
                <DialogContent>
                    <div className="otnotice-language-dropdown-container">
                        <select
                            id="otnotice-language-dropdown"
                            aria-label="language selector"
                            className={classes.languageSelect}
                        />
                        <img
                            src={languageSelectIcon}
                            className={classes.languageSelectIcon}
                            alt=""
                        />
                    </div>
                    <div
                        id="otnotice-203699be-5ce4-49be-937d-fa95ecff3043"
                        className="otnotice"
                    />
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PrivacyPolicy;
