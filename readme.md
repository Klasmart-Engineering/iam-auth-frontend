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

- Install Node.js v14.x.x
- Install Npm v6.x.x
- Install the dependencies: `npm install`

### Configuration

- Map `fe.alpha.kidsloop.net` to `localhost` by [editing your hosts file](https://www.howtogeek.com/howto/27350/beginner-geek-how-to-edit-your-hosts-file/)
- Configure environment variables
  - Create `.env` (which is gitignored)
  - Copy the contents of `.env.example` into `.env`, making changes as required

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
    -   "kidsloop-px": "bitbucket:calmisland/kidsloop-px"
    -   "kidsloop-branding": "bitbucket:calmisland/kidsloop-branding"

Both packages are not on NPM, and only available on Bitbucket.
To install these successfully, you will need to setup SSH keys.

NB: If you haven't already setup SSH keys with Bitbucket, follow the Bitbucket [instructions](https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/).

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
