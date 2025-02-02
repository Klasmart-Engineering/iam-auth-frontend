# kidsloop-auth-frontend

Frontend counterpart to backend [kidsloop-auth-server](https://bitbucket.org/calmisland/kidsloop-auth-server/).

Contains pages:

-   region select
-   sign in
-   select profile
-   edit profile (set birthday and name)

Includes git submodule of [kidsloop-pass-frontend](https://bitbucket.org/calmisland/kidsloop-pass-frontend),
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

| Variable               | Example                          | Explanation                                                                                                        |
| :--------------------- | -------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| API_ENDPOINT           | https://api.alpha.kidsloop.net/  | Base URL for user-service instance (NB: no `/user` URL suffix required)                                            |
| AUTH_ENDPOINT          | https://auth.alpha.kidsloop.net/ | Base URL for `auth-server` instance (i.e backend counterpart to this frontend)                                     |
| HUB_ENDPOINT           | https://hub.alpha.kidsloop.net/  | Base URL for `hub-frontend` instance, which will be redirected to upon logging in and selecting a User             |
| AUTH_ENDPOINT_BADANAMU | https://ams-auth.badanamu.net    | Base URL for "AMS" instance, which holds account credentials                                                       |
| SLD                    | alpha.kidsloop                   | [Second Level Domain](https://en.wikipedia.org/wiki/Second-level_domain) (NB: used with TLD to form cookie domain) |
| TLD                    | net                              | [Top Level Domain](https://en.wikipedia.org/wiki/Top-level_domain) (NB: see above)                                 |
| DEV_SERVER_DOMAIN      | fe.alpha.kidsloop.net            | Webpack dev server domain                                                                                          |
| DEV_SERVER_PORT        | 8081                             | Webpack dev server port                                                                                            |

Note, generally you will want all `_ENDPOINT` and domain related variables to point to the same base domain. This is to prevent issues with CORS, and also to ensure your authentication cookies allow you to access the correct downstream services (e.g. you will need authentication cookies for the `kidsloop.net` domain to successfully talk to the `user-service` on `api.kidsloop.net`).

2.  Map `DEV_SERVER_DOMAIN` environment variable (defaults to `fe.alpha.kidsloop.net`) to `localhost` by editing your hosts file [manually](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/),
    or on Mac/Linux run the following command (replacing `fe.alpha.kidsloop.net` with your desired domain)

```sh
sudo -- sh -c -e "echo '127.0.0.1\tfe.alpha.kidsloop.net' >> /etc/hosts";
```

## Branding

Branded assets and React components, such as the `PrivacyPolicy` component and logo,
are imported from the `kidsloop-branding` package.

Any brand specific text, assets, components etc. should not be added to this repository,
and instead should be added to the `kidsloop-branding` package and imported from there.

For background information, see [kidsloop-branding](https://bitbucket.org/calmisland/kidsloop-branding).

To see non-Kidsloop branding, set the `BRAND` environment variable to the desired brand e.g.

```shell
BRAND=RUMAH_KISAH npm run start
```

## Local Build

### Dependencies

There are the following dependencies:

-   git submodule pointing at `src/pages/account/kidsloop-pass-frontend` (remotes/origin/kidsloop/master)

-   npm package dependency on package json on:
    -   "kidsloop-branding": "bitbucket:calmisland/kidsloop-branding"
    -   "@kidsloop/eslint-config": "bitbucket:calmisland/kidsloop-eslint-config"

Both packages are not on NPM, and only available on Bitbucket.
To install these successfully, you will need to setup SSH keys.

NB: If you haven't already setup SSH keys with Bitbucket, follow the Bitbucket [instructions](https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/).

#### kidsloop-px

Copies of the components/utilities we actually use from `kidsloop-px` (our frontend utility library) can be found [here](./src/lib/kidsloop-px/), based on the 1.1.0 release (which is the version we were using previously).
The only change from the original is replacing "lodash" with "lodash-es" (an ESM tree-shakeable version of lodash), which reduces the stat bundle size by 500kb.

This is a temporary measure to reduce bundle size, as using `kidsloop-px` increased the stat bundle size (before minification) by 4MB, as the library cannot be tree-shaken.
The root cause of blocked tree-shaking appears to be Material UI's [useStyles](https://mui.com/styles/basics/#hook-api), which is used extensively, and fixing this would involve moving to a different styling solution (i.e. a significant rewrite).

### Windows

install WSL2, ubuntu 20+ and carry on with the rest.

### Linix/Osx

Enable submodule configuration

```
> git submodule update --init --recursive --force
```

Assuming you have an ssh key with passphrase, running NPM successfully can be tricky.
Test the following lines by replacing your current ssh key,
and add the desired tag (prefixed with "#") after the `.git` links for each kidsloop package e.g. `...kidsloop-branding.git#1.0.0`.

```shell
eval `ssh-agent -s`
ssh-add ~/.ssh/id_ecdsa
npm install --no-progress ssh://git@bitbucket.org/calmisland/kidsloop-px.git --verbose
npm install --no-progress ssh://git@bitbucket.org/calmisland/kidsloop-branding.git --verbose
```

Once the prerequisites are sorted, you can successfully run an npm install.
Npm install will trigger some post install script.
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
