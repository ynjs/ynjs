/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ynui"] = factory();
	else
		root["ynui"] = factory();
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Base.ts":
/*!*********************!*\
  !*** ./src/Base.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _util_src_EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/src/EventEmitter */ \"../util/src/EventEmitter.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar CID = Date.now();\r\nvar INDEX = 0;\r\nvar DefaultBaseOption = /** @class */ (function () {\r\n    function DefaultBaseOption() {\r\n        this.readonly = false;\r\n        this.disabled = false;\r\n    }\r\n    return DefaultBaseOption;\r\n}());\r\nvar Base = /** @class */ (function (_super) {\r\n    __extends(Base, _super);\r\n    function Base(root, option) {\r\n        var _this = _super.call(this) || this;\r\n        _this.name = \"Base\";\r\n        // 已渲染\r\n        _this.rendered = false;\r\n        _this.option = new DefaultBaseOption();\r\n        _this.setOption(option, false);\r\n        _this.root = root;\r\n        return _this;\r\n    }\r\n    Base.prototype.render = function () {\r\n        this.rendered = true;\r\n        this.disable(this.option.disabled);\r\n    };\r\n    Base.prototype.destroy = function () {\r\n        console.log(\"销毁\");\r\n    };\r\n    Base.prototype.disable = function (disabled, emit) {\r\n        if (disabled === void 0) { disabled = true; }\r\n        if (emit === void 0) { emit = true; }\r\n        if (disabled) {\r\n            this.root.classList.add(\"disabled\");\r\n        }\r\n        else {\r\n            this.root.classList.remove(\"disabled\");\r\n        }\r\n    };\r\n    Base.prototype.setOption = function (option, emit) {\r\n        if (emit === void 0) { emit = true; }\r\n        this.option = Object.assign(this.option, option);\r\n        if (emit) {\r\n            this.emit(\"optionChange\");\r\n        }\r\n    };\r\n    Base.genid = function (s, e) {\r\n        if (s === void 0) { s = \"\"; }\r\n        if (e === void 0) { e = \"\"; }\r\n        return s + CID + (INDEX++).toString() + e;\r\n    };\r\n    return Base;\r\n}(_util_src_EventEmitter__WEBPACK_IMPORTED_MODULE_0__.default));\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Base);\r\n\n\n//# sourceURL=webpack://ynui/./src/Base.ts?");

/***/ }),

/***/ "./src/InputBase.ts":
/*!**************************!*\
  !*** ./src/InputBase.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ \"./src/Base.ts\");\nvar __extends = (undefined && undefined.__extends) || (function () {\r\n    var extendStatics = function (d, b) {\r\n        extendStatics = Object.setPrototypeOf ||\r\n            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||\r\n            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };\r\n        return extendStatics(d, b);\r\n    };\r\n    return function (d, b) {\r\n        if (typeof b !== \"function\" && b !== null)\r\n            throw new TypeError(\"Class extends value \" + String(b) + \" is not a constructor or null\");\r\n        extendStatics(d, b);\r\n        function __() { this.constructor = d; }\r\n        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());\r\n    };\r\n})();\r\n\r\nvar InputBase = /** @class */ (function (_super) {\r\n    __extends(InputBase, _super);\r\n    function InputBase(root, option) {\r\n        var _this = _super.call(this, root, option) || this;\r\n        _this.root = root;\r\n        return _this;\r\n    }\r\n    InputBase.prototype.render = function () {\r\n        _super.prototype.render.call(this);\r\n    };\r\n    InputBase.prototype.value = function (value) {\r\n        if (!arguments.length) {\r\n            return this.root.value;\r\n        }\r\n        else {\r\n            this.root.value = value;\r\n        }\r\n    };\r\n    return InputBase;\r\n}(_Base__WEBPACK_IMPORTED_MODULE_0__.default));\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (InputBase);\r\n\n\n//# sourceURL=webpack://ynui/./src/InputBase.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Base\": () => (/* reexport safe */ _Base__WEBPACK_IMPORTED_MODULE_0__.default),\n/* harmony export */   \"InputBase\": () => (/* reexport safe */ _InputBase__WEBPACK_IMPORTED_MODULE_1__.default)\n/* harmony export */ });\n/* harmony import */ var _Base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Base */ \"./src/Base.ts\");\n/* harmony import */ var _InputBase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./InputBase */ \"./src/InputBase.ts\");\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://ynui/./src/index.ts?");

/***/ }),

/***/ "../util/src/EventEmitter.ts":
/*!***********************************!*\
  !*** ../util/src/EventEmitter.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar __spreadArray = (undefined && undefined.__spreadArray) || function (to, from) {\r\n    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)\r\n        to[j] = from[i];\r\n    return to;\r\n};\r\nvar EventEmitter = /** @class */ (function () {\r\n    function EventEmitter() {\r\n        this._events = new Map();\r\n    }\r\n    EventEmitter.prototype.offAll = function () {\r\n        this._events.clear();\r\n    };\r\n    //监听event事件，触发时调用callback函数\r\n    EventEmitter.prototype.on = function (eventName, callback, context, time) {\r\n        if (time === void 0) { time = -1; }\r\n        if (!eventName) {\r\n            return this;\r\n        }\r\n        var evnets = this._events.get(eventName);\r\n        if (!evnets) {\r\n            evnets = [];\r\n            this._events.set(eventName, evnets);\r\n        }\r\n        evnets.push({\r\n            time: time,\r\n            context: context,\r\n            handler: callback\r\n        });\r\n        return this;\r\n    };\r\n    EventEmitter.prototype.off = function (eventName, callback) {\r\n        if (!eventName) {\r\n            return this;\r\n        }\r\n        if (!callback) {\r\n            this._events.delete(eventName);\r\n            return this;\r\n        }\r\n        var events = this._events.get(eventName);\r\n        if (events) {\r\n            this._events.set(eventName, events.filter(function (item) { return item.handler === callback; }));\r\n        }\r\n        return this;\r\n    };\r\n    EventEmitter.prototype.getEvents = function (eventName) {\r\n        return this._events.get(eventName) || [];\r\n    };\r\n    // 触发事件，并把参数传给事件的处理函数\r\n    EventEmitter.prototype.emit = function (eventName) {\r\n        var _this = this;\r\n        var params = [];\r\n        for (var _i = 1; _i < arguments.length; _i++) {\r\n            params[_i - 1] = arguments[_i];\r\n        }\r\n        var arr = eventName.split(\":\");\r\n        arr.forEach(function (_, i) {\r\n            return _this._emitEvent.apply(_this, __spreadArray([arr.slice(0, arr.length - i).join(\":\"), true], params));\r\n        });\r\n        return this;\r\n    };\r\n    // 触发事件，并把参数传给事件的处理函数\r\n    EventEmitter.prototype._emitEvent = function (eventName, removeTime0) {\r\n        var _this = this;\r\n        if (removeTime0 === void 0) { removeTime0 = true; }\r\n        var params = [];\r\n        for (var _i = 2; _i < arguments.length; _i++) {\r\n            params[_i - 2] = arguments[_i];\r\n        }\r\n        var events = this.getEvents(eventName);\r\n        var removes = [];\r\n        events.forEach(function (item, i) {\r\n            if (item.time === 0) {\r\n                return;\r\n            } // 触发时生于次数为0，认为是暂停\r\n            if (item.time > 0) {\r\n                item.time--;\r\n            }\r\n            if (item.time === 0) {\r\n                removes.push(i);\r\n            } // 待移除\r\n            item.handler.apply(item.handler || _this, params);\r\n        });\r\n        // 移除次数为0的\r\n        if (removeTime0) {\r\n            this._events.set(eventName, events.filter(function (item) { return item.time !== 0; }));\r\n        }\r\n        return this;\r\n    };\r\n    EventEmitter.prototype.once = function (event, callback, context) {\r\n        this.on(event, callback, context, 1);\r\n        return this;\r\n    };\r\n    return EventEmitter;\r\n}());\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EventEmitter);\r\n\n\n//# sourceURL=webpack://ynui/../util/src/EventEmitter.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});