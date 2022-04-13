# kidsloop-auth-frontend

Frontend counterpart to backend [iam-auth-server](https://github.com/KL-Engineering/iam-auth-server).

Contains pages:

-   region select
-   sign in
-   select profile
-   edit profile (set birthday and name)

Includes git submodule of [kidsloop-pass-frontend](https://github.com/KL-Engineering/kidsloop-pass-frontend),
which contains pages:

-   creating an account
-   forgot/reset password

## Prerequisites

### Installation

-   Install Node.js v14.x.x
-   Install Npm v6.x.x
-   Install the dependencies: `npm install`

### Configuration

1.  Configure environment variables

    -   Create `.env` (which is gitignored)
    -   Copy the contents of `.env.example` into `.env`, making changes as required

#### General

| Variable               | Example                          | Explanation                                                                                                        |
| ---------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| API_ENDPOINT           | https://api.alpha.kidsloop.net/  | Base URL for user-service instance (NB: no `/user` URL suffix required)                                            |
| AUTH_ENDPOINT          | https://auth.alpha.kidsloop.net/ | Base URL for `auth-server` instance (i.e backend counterpart to this frontend)                                     |
| HUB_ENDPOINT           | https://hub.alpha.kidsloop.net/  | Base URL for `hub-frontend` instance, which will be redirected to upon logging in and selecting a User             |
| AUTH_ENDPOINT_BADANAMU | https://ams-auth.badanamu.net    | Base URL for "AMS" instance, which holds account credentials                                                       |
| SLD                    | alpha.kidsloop                   | [Second Level Domain](https://en.wikipedia.org/wiki/Second-level_domain) (NB: used with TLD to form cookie domain) |
| TLD                    | net                              | [Top Level Domain](https://en.wikipedia.org/wiki/Top-level_domain) (NB: see above)                                 |
| DEFAULT_LANGUAGE       | en                               | Default language code if no `locale` cookie, and user has no `navigator.languages` set                             |
| DEV_SERVER_DOMAIN      | fe.alpha.kidsloop.net            | Webpack dev server domain                                                                                          |
| DEV_SERVER_PORT        | 8081                             | Webpack dev server port                                                                                            |

Note, generally you will want all `_ENDPOINT` and domain related variables to point to the same base domain. This is to prevent issues with CORS, and also to ensure your authentication cookies allow you to access the correct downstream services (e.g. you will need authentication cookies for the `kidsloop.net` domain to successfully talk to the `user-service` on `api.kidsloop.net`).

#### B2C specific

| Variable                             | Example                              | Explanation                                                                                                             |
| ------------------------------------ | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| AZURE_B2C_ENABLED                    | true                                 | Azure B2C feature flag (if false, uses `AMS` for authentication)                                                        |
| AZURE_B2C_CLIENT_ID                  | 3c75ad44-010c-4b2e-88c3-8148abf00d21 | Client ID of the "Hub" Azure application                                                                                |
| AZURE_B2C_TENANT_ID                  | 8dc632b7-4df1-4904-a155-7c4663e345bb | Tenant ID                                                                                                               |
| AZURE_B2C_DOMAIN                     | login.sso.kidsloop.live              | B2C [custom domain](https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-domain?pivots=b2c-custom-policy) |
| AZURE_B2C_POLICY                     | B2C_1A_RELYING_PARTY_SIGN_UP_LOG_IN  | Name of target B2C policy                                                                                               |
| AZURE_B2C_AUTH_SERVER_APPLICATION_ID | 010eb29e-d42b-4ca3-9c16-1961a528ce77 | Client ID of `auth-server` Azure application                                                                            |

Note, all variables will need to be from the same B2C tenant, and to avoid issues with CORS, should use the same domain as the `_ENDPOINT` environment variables.
Additionally, if you're using a local version of [iam-auth-server](https://github.com/KL-Engineering/iam-auth-server), ensure the `AZURE_B2C_CLIENT_ID` environment variable for that service matches the `AZURE_B2C_AUTH_SERVER_APPLICATION_ID` here, otherwise all access tokens will be rejected due to the mismatched `scopes` property.

2.  Map `DEV_SERVER_DOMAIN` environment variable (defaults to `fe.alpha.kidsloop.net`) to `localhost` by editing your hosts file [manually](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/),
    or on Mac/Linux run the following command (replacing `fe.alpha.kidsloop.net` with your desired domain)

```sh
sudo -- sh -c -e "echo '127.0.0.1\tfe.alpha.kidsloop.net' >> /etc/hosts";
```

## Description

High level responsibilities are:

-   region selection
-   initial language selection
-   entrypoint to Azure B2C (including SSO) - or if `AZURE_B2C_ENABLED=false`, with AMS
-   authentication for Kidsloop mobile app (with some mobile specific behaviour)
-   transferring the resulting `access_token` from B2C/AMS issued to Kidsloop issued
-   profile (user) selection
-   birthday/name setting
-   logout

### Region Selection

Each flag on the [RegionSelect](./src/pages/RegionSelect.tsx) page is a hardcoded hyperlink to a production deployment of this project.
The "Can't find your country or region?" button maps to the deployment you're currently on, so would be used for internal environments such as "alpha" or "staging".

### Language

This project acts as the entrypoint for Kidsloop.
As such, it's probably when the user's `locale` cookie is set.

The hierarchy of language determination is:

1. "?locale=" QueryParam (used for first load from mobile app)
2. "locale" cookie
3. User's language browser preference
4. Default locale for the deployment
5. English

NB: 3-5 will only be relevant for the first load by a user, after which the `locale` cookie will be set

### B2C

The main authentication provider is [Azure AD B2C](https://docs.microsoft.com/en-us/azure/active-directory-b2c/overview).
This replaces the [AMS](https://calmisland.atlassian.net/wiki/spaces/SRE/pages/2148171898/AMS+Service).

This project is responsible for initiating the B2C journey, and consuming the output of the B2C journey.

Interaction with B2C uses the official Microsoft JS libraries:

-   https://www.npmjs.com/package/@azure/msal-react
-   https://www.npmjs.com/package/@azure/msal-browser

[Overall flow](docs/images/login.jpg)

The `/signin` route involves the [Login](src/pages/azureB2C/Login.tsx) and [LoggedIn](src/pages/azureB2C/LoggedIn.tsx) components.

The `Login` component ensures the user has an active B2C session, before loading the `LoggedIn` component.

The `LoggedIn` component is responsible for fetching an `access_token` if necessary.
If the user has just logged in, we will already have an access token.
If the user already had an active session, we will instead silently fetch an access token.

Note, we include the `platform` (i.e. if the current user is authenticating for the web, or for the mobile app) in the OAuth [state](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1) parameter.
This is because the login process involves a full redirect, which means all application state is lost.
Therefore we need to re-initialise the state after we return to the application (i.e. ensure the mobile specific functionality is switched back on after we return to the application).

We also include an extra query parameter of `ui_locales`, which is set to the current language in the Kidsloop application.
The Kidsloop language codes are the same as the B2C language codes, except for Chinese (see [locale.ts](src/utils/azureB2C/locale.ts) for details).
Once login is complete, the `access_token` (fetched either from a fresh login, or silently acquired for an existing session) contains a `locale` claim, which is set to the user's chosen language in B2C (in case the user changed languages while in B2C).
This allows us to persist/mirror any language change from B2C in our application.

Once the access token is fetched, we either:

-   for the mobile app, show the [Continue](src/pages/continue.tsx) page
-   for web, transfer the B2C access token to a Kidsloop token by calling the [iam-auth-server](https://github.com/KL-Engineering/iam-auth-server) `/transfer` endpoint, then show the [SelectUser](src/pages/selectUser.tsx) component

#### SSO

Currently the B2C policies support a single federated identity provider - MyClassBoard (MCB).

To enable MCB SSO, we require that the MCB website/mobile app open the Kidsloop application using the URL format of https://auth.alpha.kidsloop.net/signin?idp=mcb.
If this `idp` query parameter is present, we pass additional query parameters in the B2C login request (both set to the value of `idp`):

-   `idps`
-   `domainHint`

This way, we avoid hardcoding any provider-specific logic.

This logic is abstracted in the [useRedirectRequest](src/hooks/azureB2C/useRedirectRequest.tsx) hook.

#### Points of interest

##### Routing

In order to be compatable with the OAuth2 [PKCE](https://auth0.com/docs/get-started/authentication-and-authorization-flow/authorization-code-flow-with-proof-key-for-code-exchange-pkce), we need to expose a `redirect_uri` on completion of the B2C login.
The code is exposed in the hash fragment portion of the URL on return to the application, which is the recommended (more secure) approach.

This means we can't use the standard [HashRouter](https://v5.reactrouter.com/web/api/HashRouter), and instead must use the [BrowserRouter](https://v5.reactrouter.com/web/api/BrowserRouter), to avoid conflicts with the hash.

##### State

In order to be compatable with mobile, we use the "redirect" APIs from [@azure/msal-browser](https://www.npmjs.com/package/@azure/msal-browser), instead of the "popup" APIs.

This means we lose any application state on login and logout.

Currently the only global state is:

-   "ua" query parameter - i.e. is the user on the mobile app, or on the web
-   "continue" query parameter - i.e. the hub URL a user was on when they logged out/tried to access while unauthenticated

which is saved on the `URLContextProvider`.

We also have a hacky [createPreserveQueryHistory](src/utils/createPreserveQueryHistory.ts), which "saves" these query parameters when navigating through the app.

If any global state library is added to the project, it would either:

-   need to be serialized as the OAuth `state` parameter in any "redirect" API request, and re-initialised on returning to the application
-   saved to persistent storage e.g. `LocalStorage`

### Mobile Authentication

The Kidsloop [mobile app](https://github.com/KL-Engineering/kidsloop-live-frontend) opens this project on the region select page in a WebView to acquire an `access_token`.
When opening the WebView, it specifies "locale" and "ua" Query Parameters.
The "locale" parameter is used to override the "locale" cookie.
The "ua" parameter is set to "cordovaios", which enables some specific behaviour (previously "cordova" for Android and "cordovaios" for iOS respectively, but this has since been commonised).

Once an `access_token` is acquired, the mobile app is reopened, passing the following query parameters:

-   "locale" - current language setting (in case of an update)
-   "iso" - same as above, present for backwards compatability
-   "token" - raw `access_token` from B2C/AMS i.e. NOT transferred to "Kidsloop" issued
-   "region" - current region (as the mobile app opens the region select page, the user could change regions from the one initially opened)

#### Mobile specific functionality

##### Token acquisition

The [LoggedIn](src/pages/azureB2C/LoggedIn.tsx) component is responsible for consuming the output from B2C after a login.

For standard browser users, this involves "/transfer" of the B2C `access_token` followed by showing a profile selection page.
Because the mobile app implements its own "transfer" logic, we instead show a custom [Continue](src/pages/continue.tsx) page without any countdown timer.
Once the user clicks "Continue", the app is reopened and the newly acquired `access_token` is fetched.

No timer is shown because iOS requires some user interaction for opening an app (rather than an automated redirect after a countdown).
The `access_token` is transferred using [history.state](https://developer.mozilla.org/en-US/docs/Web/API/History/state)

##### Logout

The `RegionSelect` page includes a [useConditionalLogoutFromB2C](src/hooks/azureB2C/useConditionalLogoutFromB2C.tsx) `useEffect` hook.

This is purely for mobile because they have their own logout implementation (which we were told we could not modify), which only ends the "Kidsloop" session.
This is a problem, because the corresponding B2C session will still be active - on the next login attempt, they won't be prompted for credentials and an `access_token` will be fetched for the still-active account (essentially preventing a new user from logging in).

The hack to resolve this session misalignment (without changing the mobile app) was to check for an expired Kidsloop session and active B2C session: if this condition is met, we immediately perform a logout from B2C.

### Profile Selection

The [SelectUser](src/pages/selectUser.tsx) component fetches a list of `User`s from the [user-service](https://github.com/KL-Engineering/user-service) associated with the current account.

Once a profile is clicked, the "/switch" endpoint on the auth-server is called with the selected `User` UUID.
If successful, new Kidsloop issued "access" and "refresh" JWTs/cookies are generated, and the authentication journey is now complete.
The user is then redirected to the `?continue` Query Param if set (i.e. the user was unauthenticated and tried to access a link to Hub, then they'll be redirected back to that page), otherwise defaulting to the `HUB_ENDPOINT` environment variable.

### Birthday/Name setting

If the name or birthday are not set, they can be filled in by the User on the `SelectUser` page.

NB: This functionality is most likely part of a legacy User flow, as the latest "Create User" functionality has given and family names as required fields, and also allows setting a birthday.

### Logout

The [Logout](src/pages/logout/index.tsx) component centralises all logout logic.

First, the Kidsloop session is cleared (`access` and `refresh` cookies are unset).
Next, a B2C logout is initiated: this performs a full redirect to the `end_session` endpoint, as per [here](https://docs.microsoft.com/en-us/azure/active-directory-b2c/session-behavior?pivots=b2c-custom-policy#sign-out).
The `post_logout_redirect_uri` is set to `/` (RegionSelect) for Kidsloop accounts, and `/logout/success` for federated accounts ([this](src/pages/logout/Success.tsx) component).
The `identityProvider` is included in the OAuth [state](https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.1) parameter of the `end_session` request, and is read by the `/logout/success` component to customise the messages in the UI.

Any failure in this process shows an [Error](src/components/logout/Error.tsx) component with a "Retry" button.

## Branding

Branded assets and React components, such as the `PrivacyPolicy` component and logo,
are imported from the `@kl-engineering/kidsloop-branding` package.

Any brand specific text, assets, components etc. should not be added to this repository,
and instead should be added to the `kidsloop-branding` package and imported from there.

For background information, see [kidsloop-branding](https://github.com/KL-Engineering/kidsloop-branding).

To see non-Kidsloop branding, set the `BRAND` environment variable to the desired brand e.g.

```shell
BRAND=RUMAH_KISAH npm run start
```

## Local Build

### Dependencies

There are the following dependencies:

-   git submodule pointing at `src/pages/account/kidsloop-pass-frontend` (remotes/origin/kidsloop/master)

-   internal GitHub npm packages
    -   `@kl-engineering/kidsloop-branding`
    -   `@kl-engineering/eslint-config`

To install the private npm packages:

1. On Github go to Settings > Developer settings (at the bottom) > Personal access tokens, create a new Github Access Token (your token must have the `repo` and `read:packages` scopes). Make sure to authorize SSO on it so that you can use it with the KidsLoop org

2. In a terminal, login to the private npm registry by running

```shell
npm login --scope=@kl-engineering --registry=https://npm.pkg.github.com
```

and enter your username, Github Access token for password, and work email when prompted.

#### kidsloop-px

Copies of the components/utilities we actually use from `kidsloop-px` (our frontend utility library) can be found [here](./src/lib/kidsloop-px/), based on the 1.1.0 release (which is the version we were using previously).
The only change from the original is replacing "lodash" with "lodash-es" (an ESM tree-shakeable version of lodash), which reduces the stat bundle size by 500kb.

This is a temporary measure to reduce bundle size, as using `kidsloop-px` increased the stat bundle size (before minification) by 4MB, as the library cannot be tree-shaken.
The root cause of blocked tree-shaking appears to be Material UI's [useStyles](https://mui.com/styles/basics/#hook-api), which is used extensively, and fixing this would involve moving to a different styling solution (i.e. a significant rewrite).

### Windows

install WSL2, ubuntu 20+ and carry on with the rest.

### Linux/Osx

Enable submodule configuration

```
> git submodule update --init --recursive --force
```

As of now you will require on ubuntu:

```
> sudo apt-get install autoconf automake g++ make
```

This is the minimum set of packages required from a fresh install to build successfully all the dependencies at the time of writing.

### Building

This is a bit of a convoluted process, we will need to build the main project, followed by the `kidsloop-pass-frontend`.

Following example is a full build for India (production)

```
# basic dependencies installation
npm ci --no-progress
cp deploy/config/in/.env.prod ./.env
npm run build

# install deps for deps
pushd src/pages/account/kidsloop-pass-frontend/client
npm ci --no-progress
npm run build:prod
popd

# bundle deps build and main build
mv src/pages/account/kidsloop-pass-frontend/client/dist ./dist/account
```

Now you have a full build in the dist folder for the India region with a production build.

# Run Cypress tests

```
npm install
npm test:sso
```
