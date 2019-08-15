const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const neat = require('node-neat')
const bourbon = require('bourbon')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const sassVars = require('@epegzz/sass-vars-loader')

const static_url = 'https://s3.amazonaws.com/quickframe-static-dev/'
const media_url = 'https://s3.amazonaws.com/quickframe-media-staging';

const breakpoints = {
  xsmall: 320,
  small: 414,
  medium: 768,
  large: 1024,
  xlarge: 1280,
  slarge: 1440,
}

module.exports = {
  context: __dirname,
  entry: [
    '@babel/polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?https://lumiary-local.quickframe.com:9090',
    'webpack/hot/only-dev-server',
    '../client/index',
  ],

  devServer: {
    hot: true,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },

  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true,
  },

  output: {
    path: path.resolve(__dirname, '..', 'build'),
    filename: 'bundle.js',
    publicPath: 'https://lumiary-local.quickframe.com:9090/dist/',
  },

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        STATIC_URL: JSON.stringify(static_url),
        MEDIA_URL: JSON.stringify(media_url),
        BASENAME: JSON.stringify('/'),
        API_ROOT: JSON.stringify(process.env.API_ROOT),
        API_VERSION: JSON.stringify(process.env.API_VERSION),
        QAPI_ROOT: JSON.stringify(process.env.QAPI_ROOT),
        QAPI_VERSION: JSON.stringify(process.env.QAPI_VERSION),
        BREAKPOINTS: breakpoints,
        FEATURE_CONTACT: JSON.stringify(true),
        FEATURE_EXPLORE: JSON.stringify(true),
        FEATURE_LOGIN: JSON.stringify(true),
        FEATURE_SIGNUP: JSON.stringify(true),
        INSTAGRAM_CLIENT_ID: JSON.stringify(process.env.INSTAGRAM_CLIENT_ID),
        INSTAGRAM_REDIRECT_URI: JSON.stringify(process.env.INSTAGRAM_REDIRECT_URI),
        INSTAGRAM_RESPONSE_TYPE: JSON.stringify(process.env.INSTAGRAM_RESPONSE_TYPE),
        GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
        GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
        GOOGLE_SCOPE: JSON.stringify(process.env.GOOGLE_SCOPE),
        GOOGLE_DISCOVERY_DOCS: JSON.stringify(process.env.GOOGLE_DISCOVERY_DOCS),
        FACEBOOK_APP_ID: JSON.stringify(process.env.FACEBOOK_APP_ID),
        TWITTER_OAUTH_NONCE: JSON.stringify(process.env.TWITTER_OAUTH_NONCE),
        TWITTER_OAUTH_CALLBACK: JSON.stringify(process.env.TWITTER_OAUTH_CALLBACK),
        TWITTER_OAUTH_SIGNATURE_METHOD: JSON.stringify(process.env.TWITTER_OAUTH_SIGNATURE_METHOD),
        TWITTER_OAUTH_TIMESTAMP: JSON.stringify(process.env.TWITTER_OAUTH_TIMESTAMP),
        TWITTER_OAUTH_CONSUMER_KEY: JSON.stringify(process.env.TWITTER_OAUTH_CONSUMER_KEY),
        TWITTER_OAUTH_SIGNATURE: JSON.stringify(process.env.TWITTER_OAUTH_SIGNATURE),
        TWITTER_OAUTH_VERSION: JSON.stringify(process.env.TWITTER_OAUTH_VERSION),
      },
    }),

    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      children: true,
      minChunks: 3,
    }),
    new CaseSensitivePathsPlugin(),
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../build/library/library.json'),
    }),
    // , new BundleAnalyzerPlugin({
    //   analyzerMode: 'server',
    //   generateStatsFile: true,
    //   statsOptions: { source: false }
    // })
    function() {
      this.plugin('done', (statsData) => {
        const stats = statsData.toJson()
        const tmpl = path.join(__dirname, '../server/views', 'index.tmpl')
        const pug = path.join(__dirname, '../server/views', 'index.pug')

        console.log(stats.assetsByChunkName)

        if (!stats.errors.length) {
          var html = fs.readFileSync(tmpl, 'utf8')

          fs.createReadStream(tmpl).pipe(fs.createWriteStream(pug))
        }
      })
    },
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        //exclude: /node_modules/,
        include: path.resolve(__dirname, '..', 'client'),
        loader: require.resolve('babel-loader'),
        options: {
          cacheDirectory: true,
          plugins: ['react-hot-loader/babel'],
        },
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, '..', 'client'),

        use: [
          { loader: 'react-hot-loader/webpack' },
          {
            loader: 'style-loader',
            options: {
              singleton: true,
              hmr: false,
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: true,
              localIdentName: '[path][name]__[local]---[hash:base64:5]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                //neat.includePaths[0],
                //bourbon.includePaths[0],
                //path.join(__dirname, '../client/scss')
              ],
            },
          },
          {
            loader: '@epegzz/sass-vars-loader',
            options: {
              vars: {
                staticUrl: `"${static_url}"`,
                breakpointxsmall: `"${breakpoints.xsmall}"`,
                breakpointsmall: `"${breakpoints.small}"`,
                breakpointmedium: `"${breakpoints.medium}"`,
                breakpointlarge: `"${breakpoints.large}"`,
                breakpointxlarge: `"${breakpoints.xlarge}"`,
                breakpointslarge: `"${breakpoints.slarge}"`,
              },
            },
          },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: [
                path.resolve(__dirname, '../client/scss/variables.scss'),
                // path.resolve(__dirname, '../client/scss/fonts.scss'),
                // path.resolve(__dirname, '../client/scss/_misc/misc.scss'),
                path.resolve(
                  __dirname,
                  '../../node_modules/bourbon/app/assets/stylesheets/_bourbon.scss'
                ),
                path.resolve(
                  __dirname,
                  '../../node_modules/bourbon-neat/core/_neat.scss'
                ),
              ],
            },
          },

          //{ loader: "postcss-loader" }
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2|gif|svg|png|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        exclude: [
          /\.js$/,
          /\.html$/,
          /\.json$/,
          /\.ejs$/,
          /\.pug$/,
          /node_modules/,
        ],
        use: [{ loader: 'file-loader' }],
      },
    ],
  },

  resolve: {
    modules: ['node_modules', 'bower_components'],
    extensions: ['.js', '.jsx', 'scss'],
  },
}
