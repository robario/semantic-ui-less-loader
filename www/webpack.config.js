'use strict';
// core
const path = require('path');

// your semantic.less
const entry = './semantic.less';

// or default semantic.less
// const entry = path.join(path.dirname(require.resolve('semantic-ui-less/package.json')), 'semantic.less');

const webpackConfig = {
    context: __dirname,
    entry: entry,
    output: {
        path: __dirname,
        filename: 'bundle.js',
    },
    module: {
        loaders: [
            {
                test: /[.]less$/,
                loader: `style-loader!css-loader!../index.js?sourceMap`,
            },
         ],
    },
    semanticUILessLoader: {
        siteFolder: path.join(__dirname, 'site'),
        themeConfigPath:  path.join(__dirname, 'theme.config'),
    },
};

module.exports = webpackConfig;
