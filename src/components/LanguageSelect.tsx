import { useLocale } from "@/hooks";
import {
    LANGUAGES,
    Locale,
} from "@/locale";
import {
    Button,
    Menu,
    MenuItem,
    MenuProps,
    Tooltip,
} from "@material-ui/core";
import {
    createStyles,
    makeStyles,
    Theme,
    withStyles,
} from "@material-ui/core/styles";
import {
    ExpandMore as ExpandMoreIcon,
    Translate as LanguageIcon,
} from "@material-ui/icons";
import clsx from "clsx";
import React,
{ useState } from "react";

interface Language {
    code: Locale;
    text: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        expand: {
            transform: `rotate(0deg)`,
            transition: theme.transitions.create(`transform`, {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: `rotate(180deg)`,
        },
        language: {
            margin: theme.spacing(0, 1),
            display: `block`,
        },
    }));

const StyledMenu = withStyles({})((props: MenuProps) => (
    <Menu
        elevation={4}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: `bottom`,
            horizontal: `center`,
        }}
        transformOrigin={{
            vertical: `top`,
            horizontal: `center`,
        }}
        {...props}
    />
));

const getLanguageText = (locale: Locale): string =>  {
    return LANGUAGES.find(l => l.code === locale)?.text ?? ``;
};

/**
 * Modified version of kidsloop-px LanguageSelect component.
 * Changes:
 * - replace cookie setting in component body with `setLocale` from `useLocale` hook
 * - replace default locale determination with `locale` from `useLocale`, as we have different requirements
 * - remove unused customization props (localization, noIcon, languages)
 */
export default function LanguageSelect () {
    const classes = useStyles();
    const [ locale, setLocale ] = useLocale();
    const [ languageMenuElement, setLanguageMenuElement ] = useState<null | HTMLElement>(null);

    const languageSelect = (language: Language) => {
        setLocale(language.code);
        setLanguageMenuElement(null);
    };

    return (
        <>
            <Tooltip
                title={`Change Language`}
                enterDelay={300}>
                <Button
                    color="inherit"
                    aria-owns={languageMenuElement ? `language-menu` : undefined}
                    aria-haspopup="true"
                    size="small"
                    onClick={(e) => setLanguageMenuElement(e.currentTarget)}
                >
                    <LanguageIcon fontSize="inherit" />
                    <span className={classes.language}>
                        {getLanguageText(locale)}
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
                keepMounted
                id="language-menu"
                anchorEl={languageMenuElement}
                open={Boolean(languageMenuElement)}
                onClose={() => setLanguageMenuElement(null)}
            >
                {
                    LANGUAGES.map((l: Language) => (
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
        </>
    );
}
