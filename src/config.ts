import {
    cleanLocale,
    Locale,
} from "@/locale";
import {
    Configuration,
    LogLevel as MsalLogLevel,
} from "@azure/msal-browser";
import { ILoggerCallback } from "@azure/msal-common";
import { brandingConfig } from "@branding/index";
import { BrandingOptions } from "kidsloop-branding";

const BASE_URL = window.location.origin;

const ENVIRONMENTS = [ `production`, `development` ] as const;

type Environment = typeof ENVIRONMENTS[number];

interface Config {
    env: Environment;
    defaultLocale: Locale | undefined;
    endpoints: {
        hub: string;
    };
    branding: BrandingOptions;
    server: {
        domain: string;
    };
    azureB2C: {
        enabled: boolean;
        clientId: string | undefined;
        domain: string | undefined;
        tenantId: string | undefined;
        policy: string | undefined;
        authServerApplicationId: string | undefined;
    };
}

const cleanNodeEnv = (env: string | undefined): Environment | undefined => {
    if (env === undefined || !ENVIRONMENTS.includes(env as Environment))
        return undefined;
    return env as Environment;
};

const config: Config = {
    env: cleanNodeEnv(process.env.NODE_ENV) ?? `production`,
    defaultLocale: cleanLocale(process.env.DEFAULT_LOCALE),
    endpoints: {
        hub: process.env.HUB_ENDPOINT ?? `https://hub.kidsloop.live`,
    },
    branding: brandingConfig,
    server: {
        domain:
            process.env.SLD && process.env.TLD
                ? `${process.env.SLD}.${process.env.TLD}`
                : `kidsloop.net`,
    },
    azureB2C: {
        clientId: process.env.AZURE_B2C_CLIENT_ID,
        enabled: process.env.AZURE_B2C_ENABLED === `true`,
        domain: process.env.AZURE_B2C_DOMAIN,
        tenantId: process.env.AZURE_B2C_TENANT_ID,
        policy: process.env.AZURE_B2C_POLICY,
        authServerApplicationId: process.env.AZURE_B2C_AUTH_SERVER_APPLICATION_ID,
    },
};

const msalLogger: ILoggerCallback = (level: MsalLogLevel,
    message: string,
    containsPii: boolean) => {
    if (containsPii) return;

    switch (level) {
    case MsalLogLevel.Error:
        console.error(message);
        return;
    case MsalLogLevel.Info:
        console.info(message);
        return;
    case MsalLogLevel.Verbose:
        console.debug(message);
        return;
    case MsalLogLevel.Warning:
        console.warn(message);
        return;
    }
};

export const msalConfig: Configuration = {
    auth: {
        clientId: config.azureB2C.clientId ?? ``,
        authority: `https://${config.azureB2C.domain}/${config.azureB2C.tenantId}/${config.azureB2C.policy}`,
        knownAuthorities: config.azureB2C.domain !== undefined ? [ config.azureB2C.domain ]: undefined,
        redirectUri: `${BASE_URL}/authentication-callback`,
        postLogoutRedirectUri: `${BASE_URL}`,
    },
    system: {
        loggerOptions: {
            logLevel:
                config.env === `production`
                    ? MsalLogLevel.Warning
                    : MsalLogLevel.Info,
            loggerCallback: msalLogger,
        },
    },
};

export const b2cScopes = [ `https://${config.azureB2C.domain}/${config.azureB2C.authServerApplicationId}/tasks.write` ];

export default config;
