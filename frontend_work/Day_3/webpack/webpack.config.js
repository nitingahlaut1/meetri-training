const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.{js|ts}x$/,
        exclude: /node_modules/,
        use: [{
          loader: "babel-loader"
        }
    ],
      },
    ],
  },
};
