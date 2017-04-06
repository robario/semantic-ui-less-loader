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
        rules: [
            {
                test: /[.]less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: '../index.js',
                        options: {
                            siteFolder: path.join(__dirname, 'site'),
                            themeConfigPath:  path.join(__dirname, 'theme.config'),
                        },
                    },
                ],
            },
         ],
    },
};

module.exports = webpackConfig;
