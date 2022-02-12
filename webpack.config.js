const WatchExternalFilesPlugin = require("webpack-watch-files-plugin").default;
const WebpackJekyllPlugin = require("./webpack-jekyll-plugin.js");
const path = require("path");

module.exports = {
    mode: "none",
    entry: ["./src/_script/main.ts", "./src/_style/main.scss"],
    output: {
        library: "TS",
        path: path.resolve(__dirname, "src/assets/js"),
        filename: "bundle.js",
        publicPath: "/assets/js/",
    },
    module: {
        rules: [
            {
                include: [path.resolve(__dirname, "src/_style/")],
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                include: [path.resolve(__dirname, "src/_script/")],
                loader: "ts-loader",
            },
        ],
    },
    devServer: {
        port: 4000,
    },
    plugins: [
        new WatchExternalFilesPlugin({
            files: ["./src/**", "!./src/assets/js/bundle.js"],
        }),
        new WebpackJekyllPlugin(),
    ],
};
