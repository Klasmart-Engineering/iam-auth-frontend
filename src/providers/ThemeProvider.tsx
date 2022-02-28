import React from "react";
import "node-source-han-sans-sc/SourceHanSansSC-Regular-all.css";
import "typeface-nanum-square-round";
import "inter-ui";
import { Locale } from "@/locale";
import { Components, PaletteOptions, responsiveFontSizes, createTheme, Theme, ThemeProvider as MUIThemeProvider, useTheme } from "@mui/material";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { get } from "lodash-es";

interface ThemeProviderProps {
    children?: React.ReactNode;
    locale: Locale;
}

export default function ThemeProvider ({ children, locale }: ThemeProviderProps) {
    return (
        <MUIThemeProvider theme={buildTheme(locale)}>
            {children}
        </MUIThemeProvider>
    );
};

const buildTheme = (locale: Locale): Theme => {
    const theme = useTheme<Theme>();

    const components: Components = {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: `#fafafa`,
                },
            }
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    styleOverrides: {
                        backgroundColor: `#fff`,
                    }
                },
            }
        },
        MuiTableCell: {
            styleOverrides: {
                stickyHeader: {
                    backgroundColor: `#fafafa`,
                },
            }
        },
        MuiTabs: {
            styleOverrides: {
                root: {
                    backgroundColor: `#FFF`,
                },
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    backgroundColor: `#fafafa`,
                },
            }
        },
        MuiIconButton: {
            styleOverrides: {
                colorPrimary: {
                    color:`#0E78D5`,
                    backgroundColor: `#f6fafe`,
                },
            }
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: `#1B365D`,
                    backgroundColor: `#FFF`,
                    "&:hover": {
                        "-webkit-transition": `all .4s ease`,
                        color: `#FFF`,
                        backgroundColor: `#1B365D`,
                        "box-shadow": `0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)`,
                        transition: `all .4s ease`,
                    },
                },
            }
        }
    };

    const typography: TypographyOptions = {
        button: {
            textTransform: `none`,
        },
        fontFamily: [
            get({
                "en": `Inter`,
                "ko": `NanumSquareRound`,
                "zh-CN": `Source Han Sans SC`
            }, locale, `Inter`),
            `-apple-system`,
            `Segoe UI`,
            `Helvetica`,
            `sans-serif`
        ].join(`,`),
        fontWeightLight: 400,
        fontWeightMedium: 600,
        fontWeightBold: 700,
        fontWeightRegular: get({
            "en": 500,
            "ko": 600,
        }, locale, 500),
    };

    const palette: PaletteOptions = {
        background: {
            default: `#fff`,
            paper: `#FFF`,
        },
        primary: {
            contrastText: `#FFF`,
            dark: `#1896ea`,
            light: `#0E78D5`,
            main: `#0E78D5`,
        },
    };

    return responsiveFontSizes(createTheme({
        components,
        palette,
        typography
    }));
};
