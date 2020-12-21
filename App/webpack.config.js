var glob = require("glob");
var path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const entryArray = glob.sync('./root/*.js');
var entryObject = entryArray.reduce((acc, item) => {
    const name = item.split('/').pop().replace('.js','');
    acc[name] = item;
    return acc;
}, {});

if(!entryObject){
  entryObject = []
}


module.exports = (env, argv) => {
  const isDev = argv.mode == 'development' ? true : false;

  return {
    entry: entryObject,
    output: {
      path: path.dirname(__dirname) + "/assets",
      filename: "js/[name].min.js",
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/[name].min.css",
      }),
    ],
    resolve: {
      alias: {
        "@sass": path.resolve(__dirname, "src/sass"),
        "@components": path.resolve(__dirname, "components"),
        "@pages": path.resolve(__dirname, "pages"),
        "@redux": path.resolve(__dirname, "redux"),
      },
    },
    externals: {
      "react": "React",
      "react-dom": "ReactDOM",
      "jquery": "jQuery"
    },
    module: {
      rules: [
        {
          test: /.js$/,
          loader: "babel-loader",
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          exclude: /node_modules/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
          ],
        },
      ],
    },
  };
};
