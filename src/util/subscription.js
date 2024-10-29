"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFollow = exports.isLike = exports.isRepost = exports.isPost = exports.getOpsByType = exports.FirehoseSubscriptionBase = void 0;
var xrpc_server_1 = require("@atproto/xrpc-server");
var repo_1 = require("@atproto/repo");
var lexicon_1 = require("@atproto/lexicon");
var lexicons_1 = require("../lexicon/lexicons");
var subscribeRepos_1 = require("../lexicon/types/com/atproto/sync/subscribeRepos");
var FirehoseSubscriptionBase = /** @class */ (function () {
    function FirehoseSubscriptionBase(db, service) {
        var _this = this;
        this.db = db;
        this.service = service;
        this.sub = new xrpc_server_1.Subscription({
            service: service,
            method: lexicons_1.ids.ComAtprotoSyncSubscribeRepos,
            getParams: function () { return _this.getCursor(); },
            validate: function (value) {
                try {
                    return lexicons_1.lexicons.assertValidXrpcMessage(lexicons_1.ids.ComAtprotoSyncSubscribeRepos, value);
                }
                catch (err) {
                    console.error('repo subscription skipped invalid message', err);
                }
            },
        });
    }
    FirehoseSubscriptionBase.prototype.run = function (subscriptionReconnectDelay) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, evt, err_1, e_1_1, err_2;
            var _this = this;
            var _d, e_1, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 18, , 19]);
                        _g.label = 1;
                    case 1:
                        _g.trys.push([1, 11, 12, 17]);
                        _a = true, _b = __asyncValues(this.sub);
                        _g.label = 2;
                    case 2: return [4 /*yield*/, _b.next()];
                    case 3:
                        if (!(_c = _g.sent(), _d = _c.done, !_d)) return [3 /*break*/, 10];
                        _f = _c.value;
                        _a = false;
                        evt = _f;
                        _g.label = 4;
                    case 4:
                        _g.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, this.handleEvent(evt)];
                    case 5:
                        _g.sent();
                        return [3 /*break*/, 7];
                    case 6:
                        err_1 = _g.sent();
                        console.error('repo subscription could not handle message', err_1);
                        return [3 /*break*/, 7];
                    case 7:
                        if (!((0, subscribeRepos_1.isCommit)(evt) && evt.seq % 20 === 0)) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.updateCursor(evt.seq)];
                    case 8:
                        _g.sent();
                        _g.label = 9;
                    case 9:
                        _a = true;
                        return [3 /*break*/, 2];
                    case 10: return [3 /*break*/, 17];
                    case 11:
                        e_1_1 = _g.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 17];
                    case 12:
                        _g.trys.push([12, , 15, 16]);
                        if (!(!_a && !_d && (_e = _b.return))) return [3 /*break*/, 14];
                        return [4 /*yield*/, _e.call(_b)];
                    case 13:
                        _g.sent();
                        _g.label = 14;
                    case 14: return [3 /*break*/, 16];
                    case 15:
                        if (e_1) throw e_1.error;
                        return [7 /*endfinally*/];
                    case 16: return [7 /*endfinally*/];
                    case 17: return [3 /*break*/, 19];
                    case 18:
                        err_2 = _g.sent();
                        console.error('repo subscription errored', err_2);
                        setTimeout(function () { return _this.run(subscriptionReconnectDelay); }, subscriptionReconnectDelay);
                        return [3 /*break*/, 19];
                    case 19: return [2 /*return*/];
                }
            });
        });
    };
    FirehoseSubscriptionBase.prototype.updateCursor = function (cursor) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db
                            .updateTable('sub_state')
                            .set({ cursor: cursor })
                            .where('service', '=', this.service)
                            .execute()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FirehoseSubscriptionBase.prototype.getCursor = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.db
                            .selectFrom('sub_state')
                            .selectAll()
                            .where('service', '=', this.service)
                            .executeTakeFirst()];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res ? { cursor: res.cursor } : {}];
                }
            });
        });
    };
    return FirehoseSubscriptionBase;
}());
exports.FirehoseSubscriptionBase = FirehoseSubscriptionBase;
var getOpsByType = function (evt) { return __awaiter(void 0, void 0, void 0, function () {
    var car, opsByType, _i, _a, op, uri, collection, recordBytes, record, create;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, (0, repo_1.readCar)(evt.blocks)];
            case 1:
                car = _b.sent();
                opsByType = {
                    posts: { creates: [], deletes: [] },
                    reposts: { creates: [], deletes: [] },
                    likes: { creates: [], deletes: [] },
                    follows: { creates: [], deletes: [] },
                };
                for (_i = 0, _a = evt.ops; _i < _a.length; _i++) {
                    op = _a[_i];
                    uri = "at://".concat(evt.repo, "/").concat(op.path);
                    collection = op.path.split('/')[0];
                    if (op.action === 'update')
                        continue; // updates not supported yet
                    if (op.action === 'create') {
                        if (!op.cid)
                            continue;
                        recordBytes = car.blocks.get(op.cid);
                        if (!recordBytes)
                            continue;
                        record = (0, repo_1.cborToLexRecord)(recordBytes);
                        create = { uri: uri, cid: op.cid.toString(), author: evt.repo };
                        if (collection === lexicons_1.ids.AppBskyFeedPost && (0, exports.isPost)(record)) {
                            opsByType.posts.creates.push(__assign({ record: record }, create));
                        }
                        else if (collection === lexicons_1.ids.AppBskyFeedRepost && (0, exports.isRepost)(record)) {
                            opsByType.reposts.creates.push(__assign({ record: record }, create));
                        }
                        else if (collection === lexicons_1.ids.AppBskyFeedLike && (0, exports.isLike)(record)) {
                            opsByType.likes.creates.push(__assign({ record: record }, create));
                        }
                        else if (collection === lexicons_1.ids.AppBskyGraphFollow && (0, exports.isFollow)(record)) {
                            opsByType.follows.creates.push(__assign({ record: record }, create));
                        }
                    }
                    if (op.action === 'delete') {
                        if (collection === lexicons_1.ids.AppBskyFeedPost) {
                            opsByType.posts.deletes.push({ uri: uri });
                        }
                        else if (collection === lexicons_1.ids.AppBskyFeedRepost) {
                            opsByType.reposts.deletes.push({ uri: uri });
                        }
                        else if (collection === lexicons_1.ids.AppBskyFeedLike) {
                            opsByType.likes.deletes.push({ uri: uri });
                        }
                        else if (collection === lexicons_1.ids.AppBskyGraphFollow) {
                            opsByType.follows.deletes.push({ uri: uri });
                        }
                    }
                }
                return [2 /*return*/, opsByType];
        }
    });
}); };
exports.getOpsByType = getOpsByType;
var isPost = function (obj) {
    return isType(obj, lexicons_1.ids.AppBskyFeedPost);
};
exports.isPost = isPost;
var isRepost = function (obj) {
    return isType(obj, lexicons_1.ids.AppBskyFeedRepost);
};
exports.isRepost = isRepost;
var isLike = function (obj) {
    return isType(obj, lexicons_1.ids.AppBskyFeedLike);
};
exports.isLike = isLike;
var isFollow = function (obj) {
    return isType(obj, lexicons_1.ids.AppBskyGraphFollow);
};
exports.isFollow = isFollow;
var isType = function (obj, nsid) {
    try {
        lexicons_1.lexicons.assertValidRecord(nsid, fixBlobRefs(obj));
        return true;
    }
    catch (err) {
        return false;
    }
};
// @TODO right now record validation fails on BlobRefs
// simply because multiple packages have their own copy
// of the BlobRef class, causing instanceof checks to fail.
// This is a temporary solution.
var fixBlobRefs = function (obj) {
    if (Array.isArray(obj)) {
        return obj.map(fixBlobRefs);
    }
    if (obj && typeof obj === 'object') {
        if (obj.constructor.name === 'BlobRef') {
            var blob = obj;
            return new lexicon_1.BlobRef(blob.ref, blob.mimeType, blob.size, blob.original);
        }
        return Object.entries(obj).reduce(function (acc, _a) {
            var _b;
            var key = _a[0], val = _a[1];
            return Object.assign(acc, (_b = {}, _b[key] = fixBlobRefs(val), _b));
        }, {});
    }
    return obj;
};
