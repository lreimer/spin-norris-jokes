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

## Maintainer

M.-Leander Reimer (@lreimer), <mario-leander.reimer@qaware.de>

## License

This software is provided under the MIT open source license, read the `LICENSE`
file for details.
