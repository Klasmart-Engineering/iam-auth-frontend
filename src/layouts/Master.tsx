import React from "react";
import config from "@/config";
import { Theme, Paper, Box, Stack, Container, useTheme } from "@mui/material";
import { Policy } from "@/components/Policy";
import { LanguageSelect } from "@/components/LanguageSelect";
import BackgroundImage from "@/assets/img/background.png";
import PrimaryLogo from "@branding/assets/img/primary_logo.svg";
interface LayoutProps {
    logo?: boolean;
    centered?: boolean;
    children: React.ReactNode;
    maxWidth: false | "xs" | "sm" | "md" | "lg" | "xl" | undefined;
}

export function Master ({
    logo = true,
    centered,
    children,
    maxWidth
}: LayoutProps) {
    const theme = useTheme<Theme>();

    return (
        <Box sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            ":before": {
                content: `''`,
                position: `absolute`,
                left: 0,
                right: 0,
                zIndex: -999,
                width: `100%`,
                height: `100%`,
                background: `url(${BackgroundImage}) no-repeat center`,
                backgroundSize: `cover`,
                filter: `blur(8px)`,
                WebkitFilter: `blur(8px)`,
                [theme.breakpoints.down(`xs`)]: {
                    background: `white`,
                }, 
            }
        }}>
            <Container
                sx={{
                    m: "auto",
                }}
                component={Stack}
                spacing={2}
                maxWidth={maxWidth}
            >
                <Stack
                    component={Paper}
                    sx={{
                        boxShadow: theme.shadows[2],
                        paddingTop: theme.spacing(6),
                        paddingBottom: theme.spacing(6),
                        paddingLeft: theme.spacing(5),
                        paddingRight: theme.spacing(5),
                        [theme.breakpoints.down(`sm`)]: {
                            paddingTop: theme.spacing(3),
                            paddingBottom: theme.spacing(3),
                            paddingLeft: theme.spacing(2),
                            paddingRight: theme.spacing(2),
                        },
                    }}
                    spacing={4}
                    alignItems={centered ? "center" : "flex-start"}
                    textAlign={centered ? "center" : "left"}
                >
                    {logo && (
                        <Box
                            component="img"
                            sx={{
                                height: 50,
                                alignSelf: centered ? "center" : "flex-start"
                            }}
                            src={PrimaryLogo}
                            alt={`${config.branding.company.name} Logo`}
                        />
                    )}
                    {children}
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                >
                    <LanguageSelect />
                    <Policy />
                </Stack>
            </Container>
        </Box>
    );
}
