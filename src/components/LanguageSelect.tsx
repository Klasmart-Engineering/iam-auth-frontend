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
    Typography,
    Stack
} from "@mui/material";
import {
    createStyles,
    makeStyles,
    withStyles,
} from "@mui/styles";
import { Theme } from "@mui/material/styles"
import {
    ExpandMore as ExpandMoreIcon,
    Translate as TranslateIcon,
} from "@mui/icons-material";
import clsx from "clsx";
import React,
{ useState, MouseEvent } from "react";

interface Language {
    code: Locale;
    text: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    expand: {
        transform: `rotate(0deg)`,
        transition: theme.transitions.create(`transform`, {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: `rotate(180deg)`,
    },
}));

export const LanguageSelect = () => {
    const classes = useStyles();
    const [ locale, setLocale ] = useLocale();
    const [ languageMenuElement, setLanguageMenuElement ] = useState<null | HTMLElement>(null);

    return (
        <>
            <Tooltip title={`Change Language`}>
                <Button
                    color="inherit"
                    aria-owns={languageMenuElement ? `language-menu` : undefined}
                    aria-haspopup="true"
                    startIcon={<TranslateIcon />}
                    endIcon={<ExpandMoreIcon
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: Boolean(languageMenuElement)
                        })}
                    />}
                    onClick={(e: MouseEvent<HTMLButtonElement>) => setLanguageMenuElement(e.currentTarget)}
                >
                    {LANGUAGES.find(l => l.code === locale)?.text ?? ``}
                </Button>
            </Tooltip>
            <Menu
                keepMounted
                id="language-menu"
                elevation={4}
                anchorOrigin={{
                    vertical: `bottom`,
                    horizontal: `center`,
                }}
                transformOrigin={{
                    vertical: `top`,
                    horizontal: `center`,
                }}
                anchorEl={languageMenuElement}
                open={Boolean(languageMenuElement)}
                onClose={() => setLanguageMenuElement(null)}
            >
                {
                    LANGUAGES.map(({ code, text }, index) => (
                        <MenuItem
                            key={index}
                            selected={locale === code}
                            onClick={() => {
                                setLocale(code);
                                setLanguageMenuElement(null);
                            }}
                        >
                            {text}
                        </MenuItem>
                    ))
                }
            </Menu>
        </>
    );
}
