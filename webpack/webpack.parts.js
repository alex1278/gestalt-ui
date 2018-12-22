const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { execSync } = require('child_process');
const pkg = require('../package.json');
const config = require('../config.json');

exports.appEntryDevelopment = ({ srcPath }) => (
  [
    // The main app entry point
    `${srcPath}/Root.jsx`
  ]
);

exports.appEntryProduction = ({ srcPath }) => (
  [
    // The main app entry point
    `${srcPath}/Root.jsx`
  ]
);

exports.sourceMaps = sourcemap => (
  {
    devtool: sourcemap,
  }
);

exports.externals = () => (
  {
    externals: {
      cheerio: 'window',
      'react/addons': 'react',
      'react/lib/ExecutionEnvironment': 'react',
      'react/lib/ReactContext': 'react',
    }
  }
);

exports.babelConfig = ({ srcPath, options }) => (
  {
    module: {
      rules: [{
        test: /(\.js|\.jsx)$/,
        loader: 'babel-loader',
        include: srcPath,
        options,
      }]
    }
  }
);

exports.esLintConfig = () => (
  {
    module: {
      rules: [{
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
      }]
    }
  }
);

exports.scssConfig = ({ plugins = [], options = {}, srcPath }) => (
  {
    module: {
      rules: [{
        test: /(\.scss|\.css)$/,
        include: srcPath,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 1,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss-loader',
                plugins,
              },
            },
            {
              loader: 'sass-loader',
              options,
            }
          ]
        })
      }]
    }
  }
);

exports.fontConfig = ({ srcPath }) => (
  {
    module: {
      rules: [{
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        include: [srcPath, /material-design-icons/],
      }],
    },
  }
);

exports.icoConfig = ({ srcPath }) => (
  {
    module: {
      rules: [{
        test: /\.(ico)$/,
        loader: 'raw-loader',
        include: srcPath,
      }]
    }
  }
);

exports.svgConfig = ({ srcPath }) => (
  {
    module: {
      rules: [{
        test: /\.(svg)$/,
        loader: 'file-loader',
        include: srcPath,
      }]
    }
  }
);

exports.imageConfig = ({ srcPath }) => (
  {
    module: {
      rules: [{
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=10000', // inline base64 URLs for <=8k images, direct URLs for the rest
        include: srcPath,
      }]
    }
  }
);

exports.yamlConfig = ({ srcPath }) => (
  {
    module: {
      rules: [{
        test: /\.(yaml|yml)$/,
        loader: 'yaml-loader',
        include: srcPath,
      }]
    }
  }
);

exports.generateConstants = env => (
  new webpack.DefinePlugin({
    $$API_URL$$: JSON.stringify(config[env].API_URL),
    $$SEC_API_URL$$: JSON.stringify(config[env].SEC_API_URL),
    $$API_TIMEOUT$$: JSON.stringify(config[env].API_TIMEOUT),
    $$API_RETRIES$$: JSON.stringify(config[env].API_RETRIES),
    $$LICENSE_EXP_THRESHOLD$$: JSON.stringify(config[env].LICENSE_EXP_THRESHOLD),
    $$DEBUG$$: JSON.stringify(config[env].DEBUG),
    $$COMPANY_TITLE$$: JSON.stringify(config[env].COMPANY_TITLE),
    $$COMPANY_URL$$: JSON.stringify(config[env].COMPANY_URL),
    $$APP_TITLE$$: JSON.stringify(config[env].APP_TITLE),
    $$DOCUMENTATION_URL$$: JSON.stringify(config[env].DOCUMENTATION_URL),
    $$ANALYTICS_TRACKING$$: JSON.stringify(config[env].ANALYTICS_TRACKING),
    $$ANALYTICS_TRACKING_ACCT$$: JSON.stringify(config[env].ANALYTICS_TRACKING_ACCT),
    $$REQUIRE_HTTPS_COOKIE$$: JSON.stringify(config[env].REQUIRE_HTTPS_COOKIE),
    $$UI_VERSION$$: JSON.stringify(`${pkg.version}-${execSync('git rev-parse --short=8 HEAD')}`),
    'process.env': {
      NODE_ENV: JSON.stringify(env), // needed by redux and react internally - otherwise not build specific to out codebase
    }
  })
);

exports.devServer = function devServer({ contentBase, compress, ...rest }) {
  return {
    devServer: {
      contentBase,
      compress,
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // enable HMR on the server
      hot: false,
      inline: true,
      https: false,
      ...rest,
    }
  };
};
