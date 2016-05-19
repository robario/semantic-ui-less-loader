'use strict';
// core
const path = require('path');
// node_modules
const lessLoader = require('less-loader');
const loaderUtils = require('loader-utils');

const themeConfigPattern = new RegExp('^' + '../../theme.config'.replace(/[.]/g, '[.]') + '$');
const themePattern = new RegExp('^[.]/theme.less$');
const folderPattern = new RegExp('^[.]/(site|definitions|themes)(?=/)');

module.exports = function (source) {
    if (this.cacheable) {
        this.cacheable();
    }

    let config = loaderUtils.getLoaderConfig(this, 'semanticUILessLoader');
    config.defaultFolder = config.defaultFolder || path.dirname(require.resolve('semantic-ui-less/package.json'));
    config = Object.assign({
        definitionsFolder: path.join(config.defaultFolder, 'definitions'),
        siteFolder: path.join(config.defaultFolder, '_site'),
        themeConfigPath: path.join(config.defaultFolder, 'theme.config.example'),
        themePath: path.join(config.defaultFolder, 'theme.less'),
        themesFolder: path.join(config.defaultFolder, 'themes'),
    }, config);

    const originalResolve = this.resolve;
    this.resolve = function (context, moduleRequest, callback) {
        moduleRequest = moduleRequest
            .replace(themeConfigPattern, () => config.themeConfigPath)
            .replace(themePattern, () => config.themePath)
            .replace(folderPattern, ($0, dir) => config[`${dir}Folder`]);
        return originalResolve.call(this, context, moduleRequest, callback);
    };
    return lessLoader.call(this, source);
};
