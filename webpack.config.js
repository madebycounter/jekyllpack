const WatchExternalFilesPlugin = require("webpack-watch-files-plugin").default;
const WebpackJekyllPlugin = require("./webpack-jekyll-plugin.js");
const path = require("path");
const jekyllpackConfig = require("./jekyllpack.config.json");

module.exports = {
    mode: jekyllpackConfig.mode,
    devtool: "source-map",
    entry: ["./src/_script/main.ts", "./src/_style/main.scss"],
    output: {
        library: jekyllpackConfig.library,
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
        port: jekyllpackConfig.port,
    },
    plugins: [
        new WatchExternalFilesPlugin({
            files: ["./src/**", "!./src/assets/js/bundle.js"],
        }),
        new WebpackJekyllPlugin(
            jekyllpackConfig.platform == "windows"
                ? "buildJekyll.bat"
                : "buildJekyll.sh"
        ),
    ],
};
