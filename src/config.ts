import { brandingConfig } from "@branding";
import { BrandingOptions } from "kidsloop-branding";

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
                : `kidsloop.net`,
    },
};

export default config;
