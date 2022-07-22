import create from "zustand";

export interface PreserveRedirectLocale {
  hostName: string;
  uaParam: string | null;
  continueParam: string | null;
  testing: boolean;
  locale: string;
}
const preserveRedirectLocale: PreserveRedirectLocale = {
    hostName: ``,
    continueParam: ``,
    uaParam: ``,
    locale: `en_us`,
    testing: false,
};
export const useAuthfeStore = create(() => ({
    ...preserveRedirectLocale,
}));
