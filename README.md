# Spin Norris Jokes

Spin WASM application to serve the Chuck Norris Jokes API as caching proxy.

## Setup and Install requirements 

```bash
cd random
npm install

cd categories
npm install
```

## Building and Running locally

```
spin up --build
spin watch

http get http://127.0.0.1:3000/api/jokes/random
http get http://127.0.0.1:3000/api/jokes/categories
```

## Maintainer

M.-Leander Reimer (@lreimer), <mario-leander.reimer@qaware.de>

## License

This software is provided under the MIT open source license, read the `LICENSE`
file for details.
