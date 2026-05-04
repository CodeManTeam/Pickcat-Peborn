(self["webpackChunknemo"] = self["webpackChunknemo"] || []).push([["src_webview_debug_custom_vconsole_ts"],{

/***/ "./src/webview/debug/custom_vconsole.ts":
/*!**********************************************!*\
  !*** ./src/webview/debug/custom_vconsole.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get_custom_vconsole": function() { return /* binding */ get_custom_vconsole; }
/* harmony export */ });
/* harmony import */ var vconsole__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vconsole */ "./node_modules/vconsole/dist/vconsole.min.js");
/* harmony import */ var vconsole__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vconsole__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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

function get_custom_vconsole() {
    var _this = this;
    var plugin = new (vconsole__WEBPACK_IMPORTED_MODULE_0___default().VConsolePlugin)('nemo_custom', 'Nemo 自定义');
    plugin.on('renderTab', function (callback) {
        callback('Nemo自定义测试');
    });
    plugin.on('addTopBar', function (callback) {
        var btn_redirect = {
            name: '跳转到线上页面',
            onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    window.location.href = 'http://192.168.108.44:4000';
                    return [2 /*return*/];
                });
            }); },
        };
        var btn_init_mock_plugin = {
            name: '初始化demo插件',
            onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                var bridge, res;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            bridge = window.nemo_plugin_bridge;
                            return [4 /*yield*/, bridge.init_plugin({
                                    plugin_name: 'mock_plugin',
                                    plugin: './plugin.js',
                                })];
                        case 1:
                            res = _a.sent();
                            console.log('init plugin res: ', res);
                            return [2 /*return*/];
                    }
                });
            }); },
        };
        callback([
            btn_redirect,
            btn_init_mock_plugin,
        ]);
    });
    var vconsole = new (vconsole__WEBPACK_IMPORTED_MODULE_0___default())();
    vconsole.addPlugin(plugin);
}


/***/ })

}]);
//# sourceMappingURL=531fd9e5eaa8f4a6c388.chunk.js.map