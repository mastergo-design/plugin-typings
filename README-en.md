**English** | [中文](./README.md)

# MasterGo Plugin Typings
This project is the ts declaration file of the MasterGo plugin API.

## Install

1. npm install
    ```sh
    npm i --save-dev @mastergo/plugin-typings
    # or yarn
    yarn add -D @mastergo/plugin-typings
    ```

2. configure `tsconfig.json`
    ```js
    {
        "compilerOptions": {
            "typeRoots": [
                "./node_modules/@types",
                "./node_modules/@mastergo"
            ]
        }
    }
    ```
