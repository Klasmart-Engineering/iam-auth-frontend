# Local Build

## Dependencies

There are the following dependencies:
- git submodule pointing at 
 a895c6e739265295be7e287d53630761b05f274b src/pages/account/kidsloop-pass-frontend (remotes/origin/kidsloop/master)

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
> npm install ssh://git@bitbucket.org/calmisland/kidsloop-px.git#1.0.8 --verbose
```

Once the prerequisites are sorted, you can successfully run an npm install.

