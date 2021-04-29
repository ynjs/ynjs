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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import { EventEmitter } from "ynjs-event-emitter";
if (!('WebSocket' in window)) {
    console.error("WebSocket no supper");
}
var ReconnectingWebSocketOption = /** @class */ (function () {
    function ReconnectingWebSocketOption() {
        /** 指定协议 */
        this.protocol = "";
        /** 自动打开 */
        this.autoOpen = true;
        /** 重连间隔时间 */
        this.reconnectInterval = 1000;
        /** 最大重连间隔时间 */
        this.maxReconnectInterval = 30000;
        /** 重新连接延迟的增加速率。允许重新连接尝试在问题持续时退出。 */
        this.reconnectDecay = 1.5;
        /** 在关闭并重试之前等待连接成功的最长时间（毫秒）。 */
        this.timeoutInterval = 2000;
        /** 尝试重新连接的最大次数。如果为空，则不受限制。 */
        this.maxReconnectAttempts = null;
        /** 二进制类型，可能值“blob”或“arraybuffer”，默认值为“blob”。 */
        this.binaryType = 'blob';
    }
    ReconnectingWebSocketOption.prototype.merge = function (newopt) {
        if (!newopt) {
            return this;
        }
        if (newopt.autoOpen === false) {
            this.autoOpen = false;
        }
        if (newopt.autoOpen === true) {
            this.autoOpen = true;
        }
    };
    return ReconnectingWebSocketOption;
}());
var ReconnectingWebSocket = /** @class */ (function (_super) {
    __extends(ReconnectingWebSocket, _super);
    function ReconnectingWebSocket(url, options) {
        var _this = _super.call(this) || this;
        /** 调试模式 */
        _this.isDebug = false;
        _this.protocol = "";
        // 当前重连次数
        _this.reconnectAttempts = 0;
        _this.socket = null;
        _this.option = new ReconnectingWebSocketOption();
        _this.forcedClose = false;
        _this.url = url;
        _this.option.merge(options);
        if (_this.option.autoOpen == true) {
            _this.open();
        }
        return _this;
    }
    // 调试信息
    ReconnectingWebSocket.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.isDebug || ReconnectingWebSocket.debugAll) {
            console.log.apply(console, args);
        }
        else {
            this.emit.apply(this, __spreadArray(["log"], args));
        }
    };
    // 调试信息
    ReconnectingWebSocket.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.isDebug || ReconnectingWebSocket.debugAll) {
            console.debug.apply(console, args);
        }
    };
    ReconnectingWebSocket.prototype.close = function () {
        if (this.socket) {
            this.forcedClose = true;
            this.socket.close(1000, "正常关闭");
            this.once("close", function () {
            });
        }
    };
    ReconnectingWebSocket.prototype.send = function (data) {
        var _this = this;
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.debug('ReconnectingWebSocket', 'send', this.url, data);
            this.socket.send(data);
            return Promise.resolve(this.socket);
        }
        else {
            return this.open()
                .then(function (socket) {
                console.debug('ReconnectingWebSocket', 'send', _this.url, data);
                _this.socket && _this.socket.send(data);
            });
        }
    };
    ReconnectingWebSocket.prototype.sendnow = function (data) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            return this.socket.send(data);
        }
        else {
            throw '发送失败，socket 未准备好';
        }
    };
    ReconnectingWebSocket.prototype.open = function () {
        var _this = this;
        return createSocket(this.url)
            .then(function (socket) {
            _this.socket = socket;
            _this.emit("open");
            socket.onmessage = function (event) {
                _this.emit("message", event);
            };
            socket.onclose = function (event) { return _this.onsocketclose(); };
            socket.onerror = function (event) { return _this.onsocketclose(); };
            return _this.socket;
        });
    };
    // 当连接出现异常，调用此方法
    ReconnectingWebSocket.prototype.onsocketclose = function () {
        var _this = this;
        if (!this.socket) {
            return;
        }
        // 主动断开
        if (this.forcedClose) {
            this.forcedClose = false;
            this.socket.onmessage = null;
            this.socket.onopen = null;
            this.socket.onclose = null;
            this.socket.onerror = null;
            this.socket = null;
            return;
        }
        if (this.socket.readyState === WebSocket.CLOSED) {
            if (this.option.maxReconnectAttempts) {
                if (this.reconnectAttempts > this.option.maxReconnectAttempts) {
                    this.log("超过最大连接次数");
                    return;
                }
                this.reconnectAttempts++;
            }
            this.open().then(function () {
                _this.emit("reconnent");
            });
        }
    };
    ReconnectingWebSocket.debugAll = false;
    return ReconnectingWebSocket;
}(EventEmitter));
export default ReconnectingWebSocket;
function createSocket(url, protocol) {
    return new Promise(function (resolve, reject) {
        try {
            var socket_1 = new WebSocket(url, protocol);
            socket_1.onopen = function (event) {
                console.log("onopen");
                resolve(socket_1);
            };
            socket_1.onclose = function (event) { return console.log("onclose"); };
            socket_1.onmessage = function (event) { return console.log("onmessage"); };
            socket_1.onerror = function (event) { return console.log("onerror"); };
        }
        catch (ex) {
            reject(ex);
        }
    });
}
