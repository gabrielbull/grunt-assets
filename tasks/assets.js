/* global module:false */
/* global process:false */
/** @param {Object} grunt Grunt. */
module.exports = function(grunt) {
    grunt.registerTask('assets:pull', function () {
        var AssetsController = require('./../src/assets-controller');
        var config;
        if (typeof this.args[0] !== 'undefined') {
            config = grunt.config.get('assets')[this.args[0]];
        } else {
            config = grunt.config.get('assets');
        }
        new AssetsController(grunt, config).pull();
    });
    grunt.registerTask('assets:push', function () {
        var AssetsController = require('./../src/assets-controller');
        var config;
        if (typeof this.args[0] !== 'undefined') {
            config = grunt.config.get('assets')[this.args[0]];
        } else {
            config = grunt.config.get('assets');
        }
        new AssetsController(grunt, config).push();
    });
};
