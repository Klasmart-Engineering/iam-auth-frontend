import config from "@/config";

type RedirectUri = "/" | "/signin"

// IAM-906
// Restore QueryParam state (e.g. `ua`/`continue`) after we logout and
// are redirected from B2C back to our application
//
// TODO: implement with OAuth state once we use a proper global state library to manage `ua`/`continue` etc.
// Ideally here we would use the `state` parameter of the B2C request to encode
// this information, then parse it after we return to the application
// This means we can hardcode our `postLogoutRedirectUri`, and enable the
// B2C policy setting that only our whitelisted Uri can be used
//
// However, this doesn't really work with our current state management
// with `QueryParam`s and `createPreserveQueryHistory`
export const buildB2CRedirectUri = (path: RedirectUri = `/`): URL => {
    const redirectUri = new URL(`${config.server.origin}${path}`);
    const search = new URL(window.location.href).search;

    if (search) {
        redirectUri.search = search;
    }

    return redirectUri;
};
