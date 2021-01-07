import Button from "@material-ui/core/Button";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import LanguageIcon from "@material-ui/icons/Translate";
import { useState } from "react";
import * as React from "react";
import clsx from "clsx";
import { useCookies } from "react-cookie";

export interface LanguageSelectLocalization {
    select?: string;
    tooltip?: string;
}

export interface Language {
    code: string;
    text: string;
}

interface Props {
    cookieDomain?: string;
    languages: Language[];
    localization?: LanguageSelectLocalization;
    noIcon?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        expand: {
            transform: 'rotate(0deg)',
            transition: theme.transitions.create("transform", {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: "rotate(180deg)",
        },
        language: {
            margin: theme.spacing(0, 1),
            display: "block",
        }
    }),
);

const StyledMenu = withStyles({})((props: MenuProps) => (
    <Menu
        elevation={4}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "center",
        }}
        {...props}
    />
));

export default function LanguageSelect(props: Props) {
    const classes = useStyles();
    let {
        languages
    } = props;
    const {
        cookieDomain,
        localization,
        noIcon,
        ...other
    } = props;

    if (languages.length === 0) {
        languages = [{
            code: "en",
            text: "English",
        }]
    }
    const localeCodes = languages.map(l => l.code);

    function getDefaultLanguageCode() {
        const browserLanguages = navigator.languages || [
            (navigator as any).language,
            (navigator as any).browerLanguage,
            (navigator as any).userLanguage,
            (navigator as any).systemLanguage,
        ];

        for (const l of browserLanguages) {
            if (localeCodes.indexOf(l) !== -1) {
                return l;
            }
        }
        return "en";
    }

    const url = new URL(window.location.href);
    const localeParam = url.searchParams.get("iso");
    const [cookies, setCookies] = useCookies(["locale"]);

    const locale = localeParam || cookies.locale || getDefaultLanguageCode();

    if (!cookies.locale) {
        setCookies("locale", locale, { path: "/", domain: cookieDomain || "kidsloop.net" });
    }

    const language = languages.find((l) => l.code === locale) || { code: "en", text: "English" };
    const [languageText, setLanguageText] = useState<string>(language.text);
    const [languageMenuElement, setLanguageMenuElement] = useState<null | HTMLElement>(null);

    function languageSelect(language: Language) {
        setCookies('locale', language.code, { path: "/", domain: cookieDomain || "kidsloop.net" });
        setLanguageText(language.text);
        setLanguageMenuElement(null);
    }

    return(
        <React.Fragment>
            <Tooltip title={localization?.tooltip ?? "Change Language"} enterDelay={300}>
                <Button
                    color="inherit"
                    aria-owns={languageMenuElement ? "language-menu" : undefined}
                    aria-haspopup="true"
                    onClick={(e) => setLanguageMenuElement(e.currentTarget)}
                    size="small"
                >
                    { !noIcon && <LanguageIcon fontSize="inherit" />}
                    <span className={classes.language}>
                        { locale === "" ?
                            (localization?.select ?? "Select Language") :
                            languageText
                        }
                    </span>
                    <ExpandMoreIcon
                        fontSize="small"
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: languageMenuElement !== null,
                        })}
                    />
                </Button>
            </Tooltip>
            <StyledMenu
                id="language-menu"
                anchorEl={languageMenuElement}
                keepMounted
                open={Boolean(languageMenuElement)}
                onClose={() => setLanguageMenuElement(null)}
            >
                {
                    languages.map((l) => (
                        <MenuItem
                            key={l.code}
                            selected={locale === l.code}
                            onClick={() => languageSelect(l)}
                        >
                            {l.text}
                        </MenuItem>
                    ))
                }
            </StyledMenu>
        </React.Fragment>
    );
}
