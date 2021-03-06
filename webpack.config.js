﻿const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const assign = require("object-assign");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const tag_compiler = "compiler ";
const tag_compiler_error = "ERR!";
const tag_compiler_tests = "TEST";

//#region PRODUCTION DEVELOPMENT
if (!process.env.NODE_ENV) process.env.NODE_ENV = "development";
else process.env.NODE_ENV = process.env.NODE_ENV.trim().toLowerCase();
const production = (process.env.NODE_ENV) ? process.env.NODE_ENV === 'production' : false;
console.log(tag_compiler, "Export en mode " + process.env.NODE_ENV.toUpperCase());
//#endregion


var outFolder = path.resolve(__dirname, "./dist");
var webpackConfig = {
    cache: false,
    node: {
        fs: "empty"
    }
};

// **********************
// ENTRIES
// **********************
webpackConfig.entry = {
    "main": [
        "./doc/index.tsx",
        'webpack-dev-server/client?http://localhost:3000',
        'webpack/hot/only-dev-server'
    ]
};

// **********************
// OUTPUT
// **********************
webpackConfig.output = {
    path: outFolder,
    filename: "js/[name].js",
    publicPath: (!production) ? 'http://localhost:3000/static/' : undefined
};

// **********************
// RESOLVE MODULE
// **********************
webpackConfig.resolve = {
    modules: [
        path.resolve(__dirname, "./doc"),
        path.resolve(__dirname, "./src"),
        "node_modules"
    ],
    extensions: [".webpack.js", ".js", ".ts", ".tsx"]
};

// **********************
// DEV SERVER
// **********************
webpackConfig.devServer = {
    headers: { "Access-Control-Allow-Origin": "*" },
    port : 3000
};

// **********************
// PLUGINS
// **********************
if (!webpackConfig.plugins) webpackConfig.plugins = [];

//Environnement
webpackConfig.plugins.push(new webpack.DefinePlugin({
    PRODUCTION: JSON.stringify(production),
    'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
}));

//Hot module replacement plugin
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

//Compression
if (production) {
    //webpackConfig.plugins.push(new webpack.optimize.OccurenceOrderPlugin());
    webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false, // suppression des warnings
        },
    }));
}




// **********************
// DEV TOOL
// **********************
webpackConfig.devtool = (production) ? false : 'source-map';
webpackConfig.plugins.push(new webpack.LoaderOptionsPlugin({ debug: !production }));

// **********************
// MODULES
// **********************
if (!webpackConfig.module) webpackConfig.module = {};
if (!webpackConfig.module.loaders) webpackConfig.module.loaders = [];

//Typescript
webpackConfig.module.loaders.push(
    { test: /\.tsx?$/, loaders: ['react-hot-loader', 'ts-loader'] }
);

//Sass Css
const extractCss = new ExtractTextPlugin({
    filename: "css/[name].css",
    disable: !production
});

webpackConfig.module.loaders.push(
    {
        test: /\.s?css$/,
        loader: extractCss.extract({
            fallback: 'style-loader',
            use: [
                { loader: 'css-loader' },
                { loader: 'sass-loader'},
                { loader: path.resolve(__dirname, "./__scripts__/loaders/inject-global-scss") }
            ]
        })
    }
);

//externalisation du css
webpackConfig.plugins.push(
    extractCss
);




//Images
webpackConfig.module.loaders.push(
    {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        query: {
            name: "img/img-[hash:6].[ext]",
            limit: 50
        }
    }
);

//Fonts
webpackConfig.module.loaders.push(
    {
        test: /\.(ttf|eot|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
            name: "fonts/[name].[ext]",
            publicPath: (!production) ? undefined : "../",
            limit: 10000
        }
    }
);

//template html files
const HtmlWebpackPlugin = require('html-webpack-plugin');
webpackConfig.plugins.push(new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "doc/index.html"),
    hash: false,
    //favicon: path.resolve(__dirname, ""),
    filename: "index.html",
    inject: "body",
    minify: {
        collapseWhitespace: (production) ? true : false
    }
}));



module.exports = webpackConfig;
