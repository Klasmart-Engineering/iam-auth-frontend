import { loadBrandingOptions, BrandingOptions } from "kidsloop-branding";

const config: {
    branding: BrandingOptions;
} = {
    branding: loadBrandingOptions(process.env.BRAND),
};

export default config;
