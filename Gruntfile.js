'use strict';

var path = require('path');

module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            test: ['.tmp']
        },
        unzip: {
            '.tmp/repos': 'test/fixtures/repos/config1.git.zip'
        },
        assets: {
            config1: {
                options: {
                    repository: path.resolve('.tmp/repos/config1.git'),
                    dest: path.resolve('.tmp/clones/config1')
                }
            },
            config2: {
                options: {
                    repository: path.resolve('.tmp/repos/config1.git'),
                    dest: path.resolve('.tmp/clones/config2')
                }
            }
        },
        shell: {
            options: {
                stderr: false
            },
            target: {
                command: 'touch .tmp/clones/config1/example2'
            }
        },
        nodeunit: {
            tests: ['test/test.js']
        }
    });

    grunt.loadTasks('tasks');

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('test', [
        'unzip',
        'assets:pull:config1',
        'shell',
        'assets:push:config1',
        'assets:pull:config2',
        'nodeunit',
        'clean'
    ]);

    grunt.registerTask('default', ['test', 'build-contrib']);
};
