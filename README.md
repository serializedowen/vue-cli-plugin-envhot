# vue-cli-plugin-envhot

Seamlessly add hot reloading support for your vue-cli based projects. Never worry about rebooting webpack-dev-server again.


## Features & Tips
1. Modify .env files in runtime and have it dynamically injected into your application
2. Support modification, addtion, deletion of field in .env files
3. Only works in development mode.
4. Priority of file is ```[".env.development.local", ".env.development", ".env.local", ".env"]```, i.e., value with same key defined in '.env.local' will overwrite value defined in '.env'

## Installation 

```bash
yarn add vue-cli-plugin-envhot
```

OR
```bash
npm install -S vue-cli-plugin-envhot
```





