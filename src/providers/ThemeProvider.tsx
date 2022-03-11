import "node-source-han-sans-sc/SourceHanSansSC-Regular-all.css";
import "typeface-nanum-square-round/nanumsquareround.css";
import "inter-ui/inter.css";
import { Locale } from "@/locale";
import {
    Components,
    createTheme,
    PaletteOptions,
    responsiveFontSizes,
    Theme,
    ThemeProvider as MUIThemeProvider,
} from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import React from "react";

interface Props {
    children?: React.ReactNode;
    locale: Locale;
}

export default function ThemeProvider ({ children, locale }: Props) {
    return <MUIThemeProvider theme={buildTheme(locale)}>{ children }</MUIThemeProvider>;
}

const buildTheme = (locale: Locale): Theme => {
    // TODO remove themeMode conditionals, as currently we don't support any kind of theme switching/dark mode
    const themeMode = `light`;

    function setTypography () {
        let localeFontFamily = `Inter`;
        const localeWeightLight = 400;
        const localeWeightMedium = 600;
        let localeWeightRegular = 500;
        const localeWeightBold = 700;

        switch (locale) {
        case `en`:
            localeFontFamily = `Inter`;
            localeWeightRegular = 500;
            break;
        case `ko`:
            localeFontFamily = `NanumSquareRound`;
            localeWeightRegular = 600;
            break;
        case `zh-CN`:
            localeFontFamily = `Source Han Sans SC`;
            break;
        default:
            break;
        }
        localeFontFamily = [
            localeFontFamily,
            `-apple-system`,
            `Segoe UI`,
            `Helvetica`,
            `sans-serif`,
        ].join(`,`);
        return {
            localeFontFamily,
            localeWeightLight,
            localeWeightMedium,
            localeWeightRegular,
            localeWeightBold,
        };
    }

    const localeTypography = setTypography();
    const typography: TypographyOptions = {
        button: {
            textTransform: `none`,
        },
        fontFamily: localeTypography.localeFontFamily,
        fontWeightBold: localeTypography.localeWeightBold,
        fontWeightLight: localeTypography.localeWeightLight,
        fontWeightMedium: localeTypography.localeWeightMedium,
        fontWeightRegular: localeTypography.localeWeightRegular,
    };

    const components: Components = {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: themeMode === `light` ? `#fafafa` : `#041125`,
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    backgroundColor: themeMode === `light` ? `#fff` : `#05152e`,
                },
            },
        },
        MuiTableCell: {
            styleOverrides: {
                stickyHeader: {
                    backgroundColor: themeMode === `light` ? `#fafafa` : `#041125`,
                },
            },
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    backgroundColor: themeMode === `light` ? `#FFF` : `#030D1C`,
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    backgroundColor: themeMode === `light` ? `#fafafa` : `#030D1C !important`,
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                colorPrimary: {
                    color: themeMode === `light` ? `#0E78D5` : `#fafafa !important`, // TODO: Confirm color
                    backgroundColor: themeMode === `light` ? `#f6fafe` : `#0E78D5 !important`, // TODO: Confirm color
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: themeMode === `light` ? `#1B365D` : `#FFF`,
                    backgroundColor: themeMode === `light` ? `#FFF` : `#1B365D`,
                    "&:hover": {
                        "-webkit-transition": `all .4s ease`,
                        color: themeMode === `light` ? `#FFF` : `#030D1C`,
                        backgroundColor: themeMode === `light` ? `#1B365D` : `#FFF`,
                        "box-shadow": `0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)`,
                        transition: `all .4s ease`,
                    },
                },
            },
        },
    };

    const palette: PaletteOptions = {
        background: {
            default: themeMode === `light` ? `#fafafa` : `#030D1C`,
            paper: themeMode === `light` ? `#FFF` : `#030D1C`,
        },
        primary: {
            contrastText: `#FFF`,
            dark: `#1896ea`,
            light: `#0E78D5`,
            main: `#0E78D5`,
        },
    };

    let theme: Theme;
    if (themeMode === `light`) {
        palette.background = {
            default: `#FFF`,
        };
        theme = createTheme({
            components,
            palette,
            typography,
        });
    } else {
        theme = createTheme({
            components,
            palette,
            typography: {
                fontSize: 12,
            },
        });
    }

    return responsiveFontSizes(theme);
};
