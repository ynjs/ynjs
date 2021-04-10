"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var ynserve = /** @class */ (function () {
    function ynserve(serv) {
        this.handles = [];
        this.serv = serv;
    }
    ynserve.prototype.use = function (a) {
        var handles = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            handles[_i - 1] = arguments[_i];
        }
        if (typeof a === "function") {
            handles = [a].concat(handles);
            a = undefined;
        }
        this.handles.push({
            match: a,
            handle: handles
        });
    };
    ynserve.prototype.listen = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        (_a = this.serv).listen.apply(_a, args);
    };
    return ynserve;
}());
function createServer() {
    var servers = http_1.default.createServer(function root(req, res) {
        var over = false;
        res.send = function (s) {
            if (over) {
                return;
            }
            over = true;
            res.end(s);
        };
        for (var i = 0; i < app.handles.length; i++) {
            for (var m = 0; m < app.handles[i].handle.length; m++) {
                app.handles[i].handle[m](req, res);
                if (over) {
                    break;
                }
            }
        }
    });
    var app = new ynserve(servers);
    return app;
}
exports.default = createServer;
