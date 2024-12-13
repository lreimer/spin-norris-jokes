# Spin Norris Jokes

Spin WASM application to serve the Chuck Norris Jokes API as caching proxy.

## Setup and Install requirements 

```bash
# install required tools via Brewfile
brew bundle
task dependencies
```

## Building and Running locally

```bash
# use either of the following two commands
spin up --build
spin watch

# call the endpoints
http get http://127.0.0.1:3000/api/jokes/categories
http get http://127.0.0.1:3000/api/jokes/random
http get http://127.0.0.1:3000/api/jokes/random category==explicit
http get http://127.0.0.1:3000/api/jokes/search query==Germany
```

## Deploy to Fermyon Cloud

```bash
# we need to K/V stores
spin cloud key-value create default
spin cloud key-value create jokes

# we need to link the store to our app
spin cloud link key-value --app spin-norris-jokes --store default default
spin cloud link key-value --app spin-norris-jokes --store jokes jokes

# now we can deploy the application
spin cloud deploy

Uploading spin-norris-jokes version 0.2.0 to Fermyon Cloud...
Deploying...
Waiting for application to become ready................... ready

View application:   https://spin-norris-jokes-p5vlld6w.fermyon.app/
  Routes:
  - random: https://spin-norris-jokes-p5vlld6w.fermyon.app/api/jokes/random
  - categories: https://spin-norris-jokes-p5vlld6w.fermyon.app/api/jokes/categories
  - search: https://spin-norris-jokes-p5vlld6w.fermyon.app/api/jokes/search
Manage application: https://cloud.fermyon.com/app/spin-norris-jokes
```

## Maintainer

M.-Leander Reimer (@lreimer), <mario-leander.reimer@qaware.de>

## License

This software is provided under the MIT open source license, read the `LICENSE`
file for details.
