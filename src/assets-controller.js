'use strict';

var fs = require('fs');
var child_process = require('child_process');

/**
 * @class AssetsController
 * @param {grunt} grunt
 * @param {Object} config
 * @property {grunt} _grunt
 * @property {Object} _config
 * @constructor
 */
var AssetsController = function (grunt, config) {
    this._grunt = grunt;
    this._options = config['options'];

    if (typeof this._options['branch'] === 'undefined') {
        this._options['branch'] = 'master';
    }
};

AssetsController.prototype.pull = function () {
    if (!fs.existsSync(this._options['dest'])) {
        this._clone();
    }

    var change = child_process.execSync(
        "git --git-dir " + this._options['dest'] + "/.git --work-tree " + this._options['dest'] + " status --porcelain"
    );

    if (change.length) {
        this._add();
        this._commit();
        this._pull();
    } else {
        this._pull();
    }
};

AssetsController.prototype.push = function () {
    if (!fs.existsSync(this._options['dest'])) {
        this._clone();
    }

    var change = child_process.execSync(
        "git --git-dir " + this._options['dest'] + "/.git --work-tree " + this._options['dest'] + " status --porcelain"
    );

    if (change.length) {
        this._add();
        this._commit();
        this._pull();
        this._push();
    } else {
        this._pull();
        this._push();
    }
};

AssetsController.prototype._clone = function () {
    child_process.execSync(
        "git clone -b " + this._options['branch'] + " " + this._options['repository'] + " " + this._options['dest'] + " &> /dev/null"
    );
};

AssetsController.prototype._add = function () {
    child_process.execSync(
        "git --git-dir " + this._options['dest'] + "/.git --work-tree " + this._options['dest'] +
        " add .  &> /dev/null"
    );
};

AssetsController.prototype._commit = function () {
    child_process.execSync(
        "git --git-dir " + this._options['dest'] + "/.git --work-tree " + this._options['dest'] +
        " commit -m \"Updates by grunt-assets\"  &> /dev/null"
    );
};

AssetsController.prototype._pull = function () {
    child_process.execSync(
        "git --git-dir " + this._options['dest'] + "/.git --work-tree " + this._options['dest'] +
        " pull  &> /dev/null"
    );
};

AssetsController.prototype._push = function () {
    child_process.execSync(
        "git --git-dir " + this._options['dest'] + "/.git --work-tree " + this._options['dest'] +
        " push  &> /dev/null"
    );
};

/* global module:false */
module.exports = AssetsController;
