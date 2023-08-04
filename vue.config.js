const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const { DefinePlugin } = require("webpack");
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
      mainFiles: ["index"],
      extensions: [".ts", ".js", ".vue"],
    },
    plugins: [
      new DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: ["sass-loader"],
        },
      ],
    },
  },
  devServer: {
    port: process.env.PORT || 9528,
  },
  chainWebpack: (config) => {
    config.module
      .rule("svg")
      .exclude.add(path.resolve(__dirname, "src/icons"))
      .end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, "src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },
});
