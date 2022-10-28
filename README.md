# MasterGo插件API声明文件
本项目为MasterGo插件API的ts声明文件。

## 安装

1. 通过npm安装
    ```sh
    npm i --save-dev @mastergo/plugin-typings
    # 或者使用yarn
    yarn add -D @mastergo/plugin-typings
    ```

2. 配置 _tsconfig.json_
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
