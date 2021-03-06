const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AutoPrefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  name: 'ReactUI',
  target: 'web',
  devServer: {
    host: '0.0.0.0',
    port: '9090',
    historyApiFallback: true,
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'src/index.js',
    libraryTarget: 'umd',
  },
  entry: './src/index.js',
  resolve: {
    extensions: ['', '.js', '.jsx', '.less'],
    modulesDirectories: ['node_modules'],
    fallback: path.join(__dirname, 'node_modules'),
    alias: { // Note - had to add this to get Draggable to work //
      TweenLite: 'gsap/src/uncompressed/TweenLite',
      CSSPlugin: 'gsap/src/uncompressed/plugins/CSSPlugin',
    },
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: [/src/],
        exclude: /node_modules/,
        query:
          {
            presets: [
              require.resolve('babel-preset-es2015-loose'),
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-stage-0'),
            ],
            plugins: [
              require.resolve('babel-plugin-transform-object-assign'),
            ],
          },
      },
      {
        extractTextPlugin: true,
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader!less',
        { publicPath: '../' }),
      },
      {
        test: /\.(svg|png|gif|cur|jpg)$/,
        loader: 'file?name=images/[name]__[hash:base64:5].[ext]!' +
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
      },
      {
        test: /\.(woff|eot|ttf|svg)$/,
        loader: 'file-loader?name=fonts/[name]_[hash:base64:5].[ext]',
      },
      {
        test: /\.(wav|mp3|ogg)$/,
        loader: 'file',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
    preLoaders: [
      { test: /\.js$/,
        loader: 'eslint-loader',
      },
    ],
  },
  postcss: [
    AutoPrefixer,
  ],
  plugins: [
    new ExtractTextPlugin('style/style.css', { allChunks: true }),
    new HtmlWebpackPlugin({
      css: 'styles/styles.css',
      title: 'ReactUI',
      favicon: './resources/images/favicon.png',
      template: './resources/templates/template.ejs',
      inject: 'body',
      hash: true,
    }),
  ],
};

module.exports = config;
