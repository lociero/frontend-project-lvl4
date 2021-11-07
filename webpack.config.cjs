const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  mode,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
  },
  devServer: {
    static: {
      // directory: '/assets/',
      publicPath: '/assets/',
    },
    compress: true,
    // port: 8080,
    // host: '0.0.0.0',
    // publicPath: '/assets/',
    historyApiFallback: true,
    open: {
      target: 'http://localhost:5000',
    },
  },
  plugins: [
    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        // type: 'asset',
        use: [
          {
            loader: 'url-loader',
            options: {
              // limit: 8192,
            },
          },
        ],
      },
    ],
  },
};
