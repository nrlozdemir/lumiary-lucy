const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const neat = require("node-neat");
const bourbon = require("bourbon");
const sassVars = require("@epegzz/sass-vars-loader");

const static_url = "//s3.amazonaws.com/quickframe-static/";
const media_url = "//s3.amazonaws.com/quickframe-media";
const S3Plugin = require("webpack-s3-plugin");

const s3_region = "us-east-1";
const s3_bucket = "quickframe-static";
const s3_path = "bundles/lumiere";
const breakpoints = {
  xsmall: 320,
  small: 414,
  medium: 768,
  large: 1024,
  xlarge: 1280,
  slarge: 1440
};

module.exports = {
  context: __dirname,
  entry: ["@babel/polyfill", "../client/index"],

  output: {
    path: path.resolve(__dirname, "..", "build"),
    filename: "[name].[chunkhash].js",
    publicPath: `${static_url}bundles/lumiere/`
  },

  devtool: "source-map",

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        STATIC_URL: JSON.stringify(static_url),
        MEDIA_URL: JSON.stringify(media_url),
        BASENAME: JSON.stringify("/"),
        API_ROOT: JSON.stringify(process.env.API_ROOT),
        API_VERSION: JSON.stringify(process.env.API_VERSION),
        QAPI_ROOT: JSON.stringify(process.env.QAPI_ROOT),
        QAPI_VERSION: JSON.stringify(process.env.QAPI_VERSION),
        BREAKPOINTS: breakpoints,

        INSTAGRAM_CLIENT_ID: JSON.stringify(process.env.INSTAGRAM_CLIENT_ID),
        INSTAGRAM_CLIENT_SECRET: JSON.stringify(process.env.INSTAGRAM_CLIENT_SECRET),
        INSTAGRAM_RESPONSE_TYPE: JSON.stringify(process.env.INSTAGRAM_RESPONSE_TYPE),
        INSTAGRAM_REDIRECT_URI: JSON.stringify(process.env.INSTAGRAM_REDIRECT_URI),
        INSTAGRAM_GRANT_TYPE: JSON.stringify(process.env.INSTAGRAM_GRANT_TYPE),

        GOOGLE_CLIENT_ID: JSON.stringify(process.env.GOOGLE_CLIENT_ID),
        GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
        GOOGLE_SCOPE: JSON.stringify(process.env.GOOGLE_SCOPE),
        GOOGLE_DISCOVERY_DOCS: JSON.stringify(process.env.GOOGLE_DISCOVERY_DOCS),

        FACEBOOK_APP_ID: JSON.stringify(process.env.FACEBOOK_APP_ID),
        FACEBOOK_SCOPES: JSON.stringify(process.env.FACEBOOK_SCOPES),
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      filename: "vendor.[chunkhash].js",
      children: false,
      minChunks(module) {
        return module.context && module.context.indexOf("node_modules") >= 0;
      }
    }),
    new ExtractTextPlugin("bundle.min.css", { allChunks: false }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
      test: /\.(js|jsx)$/i,
      uglifyOptions: {
        warnings: false, // Suppress uglification warnings
        mangle: true,
        compress: {
          pure_getters: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        ie8: false,
        output: {
          comments: false
        }
      },
      exclude: [/\.min\.js$/gi] // skip pre-minified libs
    }),
    new webpack.HashedModuleIdsPlugin(),

    new S3Plugin({
      include: /.*\.(css|js)/,
      s3Options: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_DEFAULT_REGION
      },

      s3UploadOptions: {
        Bucket: s3_bucket
      },
      basePath: s3_path
    }),

    function() {
      this.plugin("done", statsData => {
        const stats = statsData.toJson();
        const tmpl = path.join(__dirname, "../server/views", "index.tmpl");
        const pug = path.join(__dirname, "../server/views", "index.pug");

        console.log(stats.assetsByChunkName);

        if (!stats.errors.length) {
          var html = fs.readFileSync(tmpl, "utf8");

          var htmlOutput = html
            .replace(
              "bundle.min.js",
              `${static_url}bundles/lumiere/${stats.assetsByChunkName.main[0]}`
            )
            .replace(
              "vendor.min.js",
              `${static_url}bundles/lumiere/${stats.assetsByChunkName.vendor}`
            )
            .replace(
              "bundle.min.css",
              `${static_url}bundles/lumiere/${stats.assetsByChunkName.main[1]}`
            );

          fs.writeFileSync(pug, htmlOutput);
        } else {
          console.log(stats.errors);
          throw new Error(stats.errors);
        }
      });
    }
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }]
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                minimize: true,
                importLoaders: 2,
                modules: true,
                localIdentName: "[path][name]__[local]---[hash:base64:5]"
              }
            },
            {
              loader: "sass-loader",
              //query: { sourceMap: false },
              options: {
                includePaths: [
                  neat.includePaths,
                  bourbon.includePaths,
                  path.join(__dirname, "../client/scss")
                ]
              }
            },
            {
              loader: "@epegzz/sass-vars-loader",
              options: {
                vars: {
                  staticUrl: `"${static_url}"`,
                  breakpointxsmall: `"${breakpoints.xsmall}"`,
                  breakpointsmall: `"${breakpoints.small}"`,
                  breakpointmedium: `"${breakpoints.medium}"`,
                  breakpointlarge: `"${breakpoints.large}"`,
                  breakpointxlarge: `"${breakpoints.xlarge}"`,
                  breakpointslarge: `"${breakpoints.slarge}"`
                }
              }
            },
            {
              loader: "sass-resources-loader",
              options: {
                resources: [
                  path.resolve(__dirname, "../client/scss/variables.scss"),
                  path.resolve(__dirname, "../client/scss/fonts.scss"),
                  path.resolve(__dirname, "../client/scss/_misc/misc.scss")
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(ttf|eot|woff|woff2|gif|svg|png|jpeg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [{ loader: "file-loader" }]
      }
    ]
  },

  resolve: {
    modules: ["node_modules", "bower_components"],
    extensions: [".js", ".jsx", ".scss"]
  }
};
