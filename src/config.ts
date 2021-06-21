import { BrandingOptions } from "kidsloop-branding";
import { brandingConfig } from "@branding";

const config: {
    branding: BrandingOptions;
    server: {
        domain: string;
    };
} = {
    branding: brandingConfig,
    server: {
        domain:
            process.env.SLD && process.env.TLD
                ? `${process.env.SLD}.${process.env.TLD}`
                : "kidsloop.net",
    },
};

export default config;
