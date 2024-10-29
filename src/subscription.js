"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirehoseSubscription = void 0;
var subscribeRepos_1 = require("./lexicon/types/com/atproto/sync/subscribeRepos");
var subscription_1 = require("./util/subscription");
var FirehoseSubscription = /** @class */ (function (_super) {
    __extends(FirehoseSubscription, _super);
    function FirehoseSubscription() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FirehoseSubscription.prototype.handleEvent = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var ops, postsToDelete, postsToCreate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(0, subscribeRepos_1.isCommit)(evt))
                            return [2 /*return*/];
                        return [4 /*yield*/, (0, subscription_1.getOpsByType)(evt)
                            // This logs the text of every post off the firehose.
                            // Just for fun :)
                            // Delete before actually using
                            //for (const post of ops.posts.creates) {
                            //  console.log(post.record.text)
                            //}
                        ];
                    case 1:
                        ops = _a.sent();
                        postsToDelete = ops.posts.deletes.map(function (del) { return del.uri; });
                        postsToCreate = ops.posts.creates
                            .filter(function (create) {
                            // only くろのあとりえ-related posts
                            return create.record.text.toLowerCase().includes('#くろのあとりえ');
                        })
                            .map(function (create) {
                            // map くろのあとりえ-related posts to a db row
                            return {
                                uri: create.uri,
                                cid: create.cid,
                                indexedAt: new Date().toISOString(),
                            };
                        });
                        if (!(postsToDelete.length > 0)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.db
                                .deleteFrom('post')
                                .where('uri', 'in', postsToDelete)
                                .execute()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!(postsToCreate.length > 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.db
                                .insertInto('post')
                                .values(postsToCreate)
                                .onConflict(function (oc) { return oc.doNothing(); })
                                .execute()];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return FirehoseSubscription;
}(subscription_1.FirehoseSubscriptionBase));
exports.FirehoseSubscription = FirehoseSubscription;
