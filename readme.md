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
