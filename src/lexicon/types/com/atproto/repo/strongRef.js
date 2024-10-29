"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMain = isMain;
exports.validateMain = validateMain;
var lexicons_1 = require("../../../../lexicons");
var util_1 = require("../../../../util");
function isMain(v) {
    return ((0, util_1.isObj)(v) &&
        (0, util_1.hasProp)(v, '$type') &&
        (v.$type === 'com.atproto.repo.strongRef#main' ||
            v.$type === 'com.atproto.repo.strongRef'));
}
function validateMain(v) {
    return lexicons_1.lexicons.validate('com.atproto.repo.strongRef#main', v);
}
