'use strict';

var fs = require('fs');

exports.graphics = {
    testPull: function (test) {
        test.expect(1);

        test.ok(fs.existsSync(".tmp/clones/config1/example1"));

        test.done();
    },

    testPush: function (test) {
        test.expect(1);

        test.ok(fs.existsSync(".tmp/clones/config2/example2"));

        test.done();
    }
};
