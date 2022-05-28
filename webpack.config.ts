import * as path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import 'webpack-dev-server';

const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

const cssRule = (withModules = false) => [
  {loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader'},
  {
    loader: 'css-loader',
    options: {
      modules: withModules && {
        localIdentName: isProd ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:5]',
      },
      sourceMap: !isProd,
    },
  },
];

const config = {
  devtool: isProd ? 'source-map' : 'eval-source-map',
  entry: path.resolve(__dirname, 'src/index.tsx'),
  mode: isProd ? 'production' : 'development',
  target: isProd ? 'browserslist' : 'web',
  output: {
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './public/index.html'),}),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:4].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public', 'static'),
          to: path.resolve(__dirname, 'build', 'static')
        },
      ]
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: PORT,
    open: true,
    hot: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  optimization: {
    minimize: isProd,
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
    minimizer: isProd
      ? [
          new TerserPlugin({
            parallel: true,
            terserOptions: {
              sourceMap: true,
            },
          }),
        ]
      : [],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.s?css$/,
        exclude: /\.module\.(s?css|sass)$/,
        use: cssRule(false),
      },
      {
        test: /.(jpg|jpeg|gif|png|ico|svg|pdf|webp)$/,
        type: 'asset',
        generator: {
          filename: 'images/[name].[contenthash:6].[ext]'
        },
        parser: {
          dataUrlCondition: {
            maxSize: 100
          }
        }
      },
    ],
  },
};

export default config;
