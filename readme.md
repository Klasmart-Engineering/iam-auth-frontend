# Local Build

## Dependencies

There are the following dependencies:
- git submodule pointing at `src/pages/account/kidsloop-pass-frontend` (remotes/origin/kidsloop/master)

- npm package dependency on package json on 
  "kidsloop-px": "bitbucket:calmisland/kidsloop-px#1.0.8",

### Windows

install WSL2, ubuntu 20+ and carry on with the rest.

### Linix/Osx

Enable submodule configuration

```
> git submodule update --init --recursive --force
```

Assuming you have an ssh key with passphrase, running NPM successfully can be tricky.
Test the following lines by replacing your current ssh key

```
> eval `ssh-agent -s`
> ssh-add ~/.ssh/id_ecdsa
> npm install --no-progress ssh://git@bitbucket.org/calmisland/kidsloop-px.git#1.0.8 --verbose
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

Following example is a full build for India

```
# basic dependencies installation
npm ci --no-progress

# config hack and package build
API_ENDPOINT="https://api.kidsloop.in/" \
AUTH_ENDPOINT="https://auth.kidsloop.in/" \
REDIRECT_LINK="https://hub.kidsloop.in/" \
ACCOUNT_ENDPOINT_BADANAMU="https://ams-account.badanamu.net" \
AUTH_ENDPOINT_BADANAMU="https://ams-auth.badanamu.net" \
SLD="kidsloop" \
TLD="in" \
npm run build:prod

# install deps for deps
pushd src/pages/account/kidsloop-pass-frontend/client
npm ci --no-progress
npm run build:prod
popd

# bundle deps build and main build
mv src/pages/account/kidsloop-pass-frontend/client/dist ./dist/account
```

Now you have a full build in the dist folder for the India region with a production build.
