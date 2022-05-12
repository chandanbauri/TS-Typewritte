"use strict";
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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
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
var TsTypeWritter = /** @class */ (function () {
    function TsTypeWritter(element, writtingSpeed, deletingSpeed, loop) {
        if (writtingSpeed === void 0) { writtingSpeed = 50; }
        if (deletingSpeed === void 0) { deletingSpeed = 50; }
        if (loop === void 0) { loop = false; }
        this.TSTQueue = [];
        this.TSTwrittingSpeed = 50;
        this.TSTdeletingSpeed = 50;
        this.loop = false;
        this.TSTElement = document.createElement("div");
        element.appendChild(this.TSTElement);
        this.TSTwrittingSpeed = writtingSpeed;
        this.TSTdeletingSpeed = deletingSpeed;
        this.loop = loop;
    }
    TsTypeWritter.prototype.push = function (cb) {
        this.TSTQueue.push(cb);
    };
    TsTypeWritter.prototype.exec = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cb;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.TSTQueue.length) {
                            this.write(""); // Message If chaining is wrong
                            return [2 /*return*/];
                        }
                        cb = this.TSTQueue.shift();
                        _a.label = 1;
                    case 1:
                        if (!cb) return [3 /*break*/, 3];
                        return [4 /*yield*/, cb()];
                    case 2:
                        _a.sent();
                        if (this.loop) {
                            this.TSTQueue.push(cb);
                        }
                        cb = this.TSTQueue.shift();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    TsTypeWritter.prototype.write = function (sentence) {
        var _this = this;
        this.push(function () {
            return new Promise(function (resolve, reject) {
                var count = 0;
                var writeId = setInterval(function () {
                    _this.TSTElement.innerText += sentence[count];
                    count++;
                    if (sentence.length == count) {
                        clearInterval(writeId);
                        resolve();
                    }
                }, _this.TSTwrittingSpeed);
            });
        });
        return this;
    };
    TsTypeWritter.prototype.pause = function (duration) {
        this.push(function () {
            return new Promise(function (resolve, reject) {
                var pauseId = setTimeout(function () {
                    clearTimeout(pauseId);
                    resolve();
                }, duration);
            });
        });
        return this;
    };
    TsTypeWritter.prototype.delete = function (positions) {
        var _this = this;
        this.push(function () {
            return new Promise(function (resolve, reject) {
                var count = 0;
                var deleteId = setInterval(function () {
                    var existingText = _this.TSTElement.innerText;
                    _this.TSTElement.innerText = existingText.substring(0, existingText.length - 1);
                    count++;
                    if (positions == count) {
                        clearInterval(deleteId);
                        resolve();
                    }
                }, _this.TSTdeletingSpeed);
            });
        });
        return this;
    };
    TsTypeWritter.prototype.deleteAll = function (deletespeed) {
        var _this = this;
        if (deletespeed === void 0) { deletespeed = 0; }
        if (deletespeed) {
            this.TSTdeletingSpeed = deletespeed;
        }
        this.push(function () {
            return new Promise(function (resolve, reject) {
                var count = 0;
                var deleteId = setInterval(function () {
                    var existingText = _this.TSTElement.innerText;
                    _this.TSTElement.innerText = existingText.substring(0, existingText.length - 1);
                    if (!existingText.length) {
                        clearInterval(deleteId);
                        resolve();
                    }
                }, _this.TSTdeletingSpeed);
            });
        });
        return this;
    };
    TsTypeWritter.prototype.start = function () {
        this.exec();
    };
    return TsTypeWritter;
}());
var container = document.querySelector(".typewritter-container");
var typewritter = new TsTypeWritter(container, 250, 100, true);
typewritter
    .write("Hello world")
    .pause(2000)
    .write("\n\nWellcome to TS typewritter")
    .delete(28)
    .write("\n\nDid you have fun ?")
    .pause(2900)
    .deleteAll()
    .start();
