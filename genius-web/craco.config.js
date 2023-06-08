/*
 * @Description:
 * @Version: 2.0
 * @Autor: jinglin.gao
 * @Date: 2022-06-13 14:24:04
 * @LastEditors: jinglin.gao
 * @LastEditTime: 2023-04-25 08:48:14
 * @Author: jinglin.gao
 */
const CracoLessPlugin = require("craco-less");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);
const env = process.env.NODE_ENV;
module.exports = {
  webpack: {
    alias: {
      // @映射src路径
      "@": resolve("src"),
      components: resolve("src/components"),
    },
    configure: (webpackConfig, {
      env,
      paths
    }) => {
      // 修改build的生成文件名称
      paths.appBuild = "base_web";
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, "base_web"),
        publicPath: "/",
      };
      // 设置可以从src外部通过相对路径的方式引入其他文件
      webpackConfig.resolve.plugins = webpackConfig.resolve.plugins.filter(
        (plugin) => !(plugin instanceof ModuleScopePlugin)
      );
      return webpackConfig;
    },
  },
  plugins: [{
    plugin: CracoLessPlugin,
    options: {
      lessLoaderOptions: {
        lessOptions: {
          modifyVars: {
            "@primary-color": "#1DA57A"
          },
          javascriptEnabled: true,
        },
      },
    },
  }, ],
  devServer: {
    open: true,
    host: "0.0.0.0",
    port: 8888,
    https: false,
    hot: true,
    proxy: {
      "/api": {
        target: "你的ip,或者域名",
        changeOrigin: true,
        secure: false,
      },
    },
  },
};