# vue-cli-plugin-envhot

Seamlessly add .env file hot reloading support for your vue-cli based projects. Never worry about rebooting webpack-dev-server again.

## Features & Tips

1. Reference [Here](https://cli.vuejs.org/guide/mode-and-env.html) for usage of .env file.
1. Modify .env files in runtime and have it dynamically injected into your application
1. Support modification, addtion, deletion of field in .env files
1. Only works in development mode. In production mode you won't need hot reload anyway.
1. Priority of file is `[".env.development.local", ".env.development", ".env.local", ".env"]`, i.e., value with same key defined in '.env.local' will overwrite value defined in '.env'

## Installation

```bash
yarn add vue-cli-plugin-envhot
```

OR

```bash
npm install -S vue-cli-plugin-envhot
```
