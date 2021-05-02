/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/awesome-qr/lib/awesome-qr.js":
/*!***************************************************!*\
  !*** ./node_modules/awesome-qr/lib/awesome-qr.js ***!
  \***************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AwesomeQR = void 0;
var canvas_1 = __webpack_require__(/*! canvas */ "./node_modules/canvas/browser.js");
var gifuct_js_1 = __webpack_require__(/*! ./gifuct-js */ "./node_modules/awesome-qr/lib/gifuct-js/index.js");
var qrcode_1 = __webpack_require__(/*! ./qrcode */ "./node_modules/awesome-qr/lib/qrcode.js");
var GIFEncoder_1 = __importDefault(__webpack_require__(/*! ./gif.js/GIFEncoder */ "./node_modules/awesome-qr/lib/gif.js/GIFEncoder.js"));
var defaultScale = 0.4;
var AwesomeQR = /** @class */ (function () {
    function AwesomeQR(options) {
        var _options = Object.assign({}, options);
        Object.keys(AwesomeQR.defaultOptions).forEach(function (k) {
            if (!(k in _options)) {
                Object.defineProperty(_options, k, { value: AwesomeQR.defaultOptions[k], enumerable: true, writable: true });
            }
        });
        if (!_options.components) {
            _options.components = AwesomeQR.defaultComponentOptions;
        }
        else if (typeof _options.components === "object") {
            Object.keys(AwesomeQR.defaultComponentOptions).forEach(function (k) {
                if (!(k in _options.components)) {
                    Object.defineProperty(_options.components, k, {
                        value: AwesomeQR.defaultComponentOptions[k],
                        enumerable: true,
                        writable: true,
                    });
                }
                else {
                    Object.defineProperty(_options.components, k, {
                        value: __assign(__assign({}, AwesomeQR.defaultComponentOptions[k]), _options.components[k]),
                        enumerable: true,
                        writable: true,
                    });
                }
            });
        }
        if (_options.dotScale !== null && _options.dotScale !== undefined) {
            if (_options.dotScale <= 0 || _options.dotScale > 1) {
                throw new Error("dotScale should be in range (0, 1].");
            }
            _options.components.data.scale = _options.dotScale;
            _options.components.timing.scale = _options.dotScale;
            _options.components.alignment.scale = _options.dotScale;
        }
        this.options = _options;
        this.canvas = canvas_1.createCanvas(options.size, options.size);
        this.canvasContext = this.canvas.getContext("2d");
        this.qrCode = new qrcode_1.QRCodeModel(-1, this.options.correctLevel);
        if (Number.isInteger(this.options.maskPattern)) {
            this.qrCode.maskPattern = this.options.maskPattern;
        }
        if (Number.isInteger(this.options.version)) {
            this.qrCode.typeNumber = this.options.version;
        }
        this.qrCode.addData(this.options.text);
        this.qrCode.make();
    }
    AwesomeQR.prototype.draw = function () {
        var _this = this;
        return new Promise(function (resolve) { return _this._draw().then(resolve); });
    };
    AwesomeQR.prototype._clear = function () {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    AwesomeQR._prepareRoundedCornerClip = function (canvasContext, x, y, w, h, r) {
        canvasContext.beginPath();
        canvasContext.moveTo(x, y);
        canvasContext.arcTo(x + w, y, x + w, y + h, r);
        canvasContext.arcTo(x + w, y + h, x, y + h, r);
        canvasContext.arcTo(x, y + h, x, y, r);
        canvasContext.arcTo(x, y, x + w, y, r);
        canvasContext.closePath();
    };
    AwesomeQR._getAverageRGB = function (image) {
        var blockSize = 5;
        var defaultRGB = {
            r: 0,
            g: 0,
            b: 0,
        };
        var width, height;
        var i = -4;
        var rgb = {
            r: 0,
            g: 0,
            b: 0,
        };
        var count = 0;
        height = image.naturalHeight || image.height;
        width = image.naturalWidth || image.width;
        var canvas = canvas_1.createCanvas(width, height);
        var context = canvas.getContext("2d");
        if (!context) {
            return defaultRGB;
        }
        context.drawImage(image, 0, 0);
        var data;
        try {
            data = context.getImageData(0, 0, width, height);
        }
        catch (e) {
            return defaultRGB;
        }
        while ((i += blockSize * 4) < data.data.length) {
            if (data.data[i] > 200 || data.data[i + 1] > 200 || data.data[i + 2] > 200)
                continue;
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i + 1];
            rgb.b += data.data[i + 2];
        }
        rgb.r = ~~(rgb.r / count);
        rgb.g = ~~(rgb.g / count);
        rgb.b = ~~(rgb.b / count);
        return rgb;
    };
    AwesomeQR._drawDot = function (canvasContext, centerX, centerY, nSize, xyOffset, dotScale) {
        if (xyOffset === void 0) { xyOffset = 0; }
        if (dotScale === void 0) { dotScale = 1; }
        canvasContext.fillRect((centerX + xyOffset) * nSize, (centerY + xyOffset) * nSize, dotScale * nSize, dotScale * nSize);
    };
    AwesomeQR._drawAlignProtector = function (canvasContext, centerX, centerY, nSize) {
        canvasContext.clearRect((centerX - 2) * nSize, (centerY - 2) * nSize, 5 * nSize, 5 * nSize);
        canvasContext.fillRect((centerX - 2) * nSize, (centerY - 2) * nSize, 5 * nSize, 5 * nSize);
    };
    AwesomeQR._drawAlign = function (canvasContext, centerX, centerY, nSize, xyOffset, dotScale, colorDark, hasProtector) {
        if (xyOffset === void 0) { xyOffset = 0; }
        if (dotScale === void 0) { dotScale = 1; }
        var oldFillStyle = canvasContext.fillStyle;
        canvasContext.fillStyle = colorDark;
        new Array(4).fill(0).map(function (_, i) {
            AwesomeQR._drawDot(canvasContext, centerX - 2 + i, centerY - 2, nSize, xyOffset, dotScale);
            AwesomeQR._drawDot(canvasContext, centerX + 2, centerY - 2 + i, nSize, xyOffset, dotScale);
            AwesomeQR._drawDot(canvasContext, centerX + 2 - i, centerY + 2, nSize, xyOffset, dotScale);
            AwesomeQR._drawDot(canvasContext, centerX - 2, centerY + 2 - i, nSize, xyOffset, dotScale);
        });
        AwesomeQR._drawDot(canvasContext, centerX, centerY, nSize, xyOffset, dotScale);
        if (!hasProtector) {
            canvasContext.fillStyle = "rgba(255, 255, 255, 0.6)";
            new Array(2).fill(0).map(function (_, i) {
                AwesomeQR._drawDot(canvasContext, centerX - 1 + i, centerY - 1, nSize, xyOffset, dotScale);
                AwesomeQR._drawDot(canvasContext, centerX + 1, centerY - 1 + i, nSize, xyOffset, dotScale);
                AwesomeQR._drawDot(canvasContext, centerX + 1 - i, centerY + 1, nSize, xyOffset, dotScale);
                AwesomeQR._drawDot(canvasContext, centerX - 1, centerY + 1 - i, nSize, xyOffset, dotScale);
            });
        }
        canvasContext.fillStyle = oldFillStyle;
    };
    AwesomeQR.prototype._draw = function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u;
        return __awaiter(this, void 0, void 0, function () {
            var nCount, rawSize, rawMargin, margin, rawViewportSize, whiteMargin, backgroundDimming, nSize, viewportSize, size, mainCanvas, mainCanvasContext, backgroundCanvas, backgroundCanvasContext, parsedGIFBackground, gifFrames, gif, r, g, b, count, i, c, backgroundImage, avgRGB, alignmentPatternCenters, dataScale, dataXyOffset, row, col, bIsDark, isBlkPosCtr, isTiming, isProtected, i, nLeft, nTop, inAgnRange, cornerAlignmentCenter, protectorStyle, i, j, agnX, agnY, timingScale, timingXyOffset, i, cornerAlignmentScale, cornerAlignmentXyOffset, alignmentScale, alignmentXyOffset, i, j, agnX, agnY, logoImage, logoScale, logoMargin, logoCornerRadius, logoSize, x, y, oldGlobalCompositeOperation, gifOutput_1, backgroundCanvas_1, backgroundCanvasContext_1, patchCanvas_1, patchCanvasContext_1, patchData_1, u8array, binary, outCanvas, outCanvasContext;
            return __generator(this, function (_v) {
                switch (_v.label) {
                    case 0:
                        nCount = (_a = this.qrCode) === null || _a === void 0 ? void 0 : _a.moduleCount;
                        rawSize = this.options.size;
                        rawMargin = this.options.margin;
                        if (rawMargin < 0 || rawMargin * 2 >= rawSize) {
                            rawMargin = 0;
                        }
                        margin = Math.ceil(rawMargin);
                        rawViewportSize = rawSize - 2 * rawMargin;
                        whiteMargin = this.options.whiteMargin;
                        backgroundDimming = this.options.backgroundDimming;
                        nSize = Math.ceil(rawViewportSize / nCount);
                        viewportSize = nSize * nCount;
                        size = viewportSize + 2 * margin;
                        mainCanvas = canvas_1.createCanvas(size, size);
                        mainCanvasContext = mainCanvas.getContext("2d");
                        this._clear();
                        // Translate to make the top and left margins off the viewport
                        mainCanvasContext.save();
                        mainCanvasContext.translate(margin, margin);
                        backgroundCanvas = canvas_1.createCanvas(size, size);
                        backgroundCanvasContext = backgroundCanvas.getContext("2d");
                        parsedGIFBackground = null;
                        gifFrames = [];
                        if (!!!this.options.gifBackground) return [3 /*break*/, 1];
                        gif = gifuct_js_1.parseGIF(this.options.gifBackground);
                        parsedGIFBackground = gif;
                        gifFrames = gifuct_js_1.decompressFrames(gif, true);
                        if (this.options.autoColor) {
                            r = 0, g = 0, b = 0;
                            count = 0;
                            for (i = 0; i < gifFrames[0].colorTable.length; i++) {
                                c = gifFrames[0].colorTable[i];
                                if (c[0] > 200 || c[1] > 200 || c[2] > 200)
                                    continue;
                                if (c[0] === 0 && c[1] === 0 && c[2] === 0)
                                    continue;
                                count++;
                                r += c[0];
                                g += c[1];
                                b += c[2];
                            }
                            r = ~~(r / count);
                            g = ~~(g / count);
                            b = ~~(b / count);
                            this.options.colorDark = "rgb(" + r + "," + g + "," + b + ")";
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        if (!!!this.options.backgroundImage) return [3 /*break*/, 3];
                        return [4 /*yield*/, canvas_1.loadImage(this.options.backgroundImage)];
                    case 2:
                        backgroundImage = _v.sent();
                        if (this.options.autoColor) {
                            avgRGB = AwesomeQR._getAverageRGB(backgroundImage);
                            this.options.colorDark = "rgb(" + avgRGB.r + "," + avgRGB.g + "," + avgRGB.b + ")";
                        }
                        backgroundCanvasContext.drawImage(backgroundImage, 0, 0, backgroundImage.width, backgroundImage.height, 0, 0, size, size);
                        backgroundCanvasContext.rect(0, 0, size, size);
                        backgroundCanvasContext.fillStyle = backgroundDimming;
                        backgroundCanvasContext.fill();
                        return [3 /*break*/, 4];
                    case 3:
                        backgroundCanvasContext.rect(0, 0, size, size);
                        backgroundCanvasContext.fillStyle = this.options.colorLight;
                        backgroundCanvasContext.fill();
                        _v.label = 4;
                    case 4:
                        alignmentPatternCenters = qrcode_1.QRUtil.getPatternPosition(this.qrCode.typeNumber);
                        dataScale = ((_c = (_b = this.options.components) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.scale) || defaultScale;
                        dataXyOffset = (1 - dataScale) * 0.5;
                        for (row = 0; row < nCount; row++) {
                            for (col = 0; col < nCount; col++) {
                                bIsDark = this.qrCode.isDark(row, col);
                                isBlkPosCtr = (col < 8 && (row < 8 || row >= nCount - 8)) || (col >= nCount - 8 && row < 8);
                                isTiming = (row == 6 && col >= 8 && col <= nCount - 8) || (col == 6 && row >= 8 && row <= nCount - 8);
                                isProtected = isBlkPosCtr || isTiming;
                                for (i = 1; i < alignmentPatternCenters.length - 1; i++) {
                                    isProtected =
                                        isProtected ||
                                            (row >= alignmentPatternCenters[i] - 2 &&
                                                row <= alignmentPatternCenters[i] + 2 &&
                                                col >= alignmentPatternCenters[i] - 2 &&
                                                col <= alignmentPatternCenters[i] + 2);
                                }
                                nLeft = col * nSize + (isProtected ? 0 : dataXyOffset * nSize);
                                nTop = row * nSize + (isProtected ? 0 : dataXyOffset * nSize);
                                mainCanvasContext.strokeStyle = bIsDark ? this.options.colorDark : this.options.colorLight;
                                mainCanvasContext.lineWidth = 0.5;
                                mainCanvasContext.fillStyle = bIsDark ? this.options.colorDark : "rgba(255, 255, 255, 0.6)";
                                if (alignmentPatternCenters.length === 0) {
                                    if (!isProtected) {
                                        mainCanvasContext.fillRect(nLeft, nTop, (isProtected ? (isBlkPosCtr ? 1 : 1) : dataScale) * nSize, (isProtected ? (isBlkPosCtr ? 1 : 1) : dataScale) * nSize);
                                    }
                                }
                                else {
                                    inAgnRange = col < nCount - 4 && col >= nCount - 4 - 5 && row < nCount - 4 && row >= nCount - 4 - 5;
                                    if (!isProtected && !inAgnRange) {
                                        // if align pattern list is empty, then it means that we don't need to leave room for the align patterns
                                        mainCanvasContext.fillRect(nLeft, nTop, (isProtected ? (isBlkPosCtr ? 1 : 1) : dataScale) * nSize, (isProtected ? (isBlkPosCtr ? 1 : 1) : dataScale) * nSize);
                                    }
                                }
                            }
                        }
                        cornerAlignmentCenter = alignmentPatternCenters[alignmentPatternCenters.length - 1];
                        protectorStyle = "rgba(255, 255, 255, 0.6)";
                        // - FINDER PROTECTORS
                        mainCanvasContext.fillStyle = protectorStyle;
                        mainCanvasContext.fillRect(0, 0, 8 * nSize, 8 * nSize);
                        mainCanvasContext.fillRect(0, (nCount - 8) * nSize, 8 * nSize, 8 * nSize);
                        mainCanvasContext.fillRect((nCount - 8) * nSize, 0, 8 * nSize, 8 * nSize);
                        // - TIMING PROTECTORS
                        if ((_e = (_d = this.options.components) === null || _d === void 0 ? void 0 : _d.timing) === null || _e === void 0 ? void 0 : _e.protectors) {
                            mainCanvasContext.fillRect(8 * nSize, 6 * nSize, (nCount - 8 - 8) * nSize, nSize);
                            mainCanvasContext.fillRect(6 * nSize, 8 * nSize, nSize, (nCount - 8 - 8) * nSize);
                        }
                        // - CORNER ALIGNMENT PROTECTORS
                        if ((_g = (_f = this.options.components) === null || _f === void 0 ? void 0 : _f.cornerAlignment) === null || _g === void 0 ? void 0 : _g.protectors) {
                            AwesomeQR._drawAlignProtector(mainCanvasContext, cornerAlignmentCenter, cornerAlignmentCenter, nSize);
                        }
                        // - ALIGNMENT PROTECTORS
                        if ((_j = (_h = this.options.components) === null || _h === void 0 ? void 0 : _h.alignment) === null || _j === void 0 ? void 0 : _j.protectors) {
                            for (i = 0; i < alignmentPatternCenters.length; i++) {
                                for (j = 0; j < alignmentPatternCenters.length; j++) {
                                    agnX = alignmentPatternCenters[j];
                                    agnY = alignmentPatternCenters[i];
                                    if (agnX === 6 && (agnY === 6 || agnY === cornerAlignmentCenter)) {
                                        continue;
                                    }
                                    else if (agnY === 6 && (agnX === 6 || agnX === cornerAlignmentCenter)) {
                                        continue;
                                    }
                                    else if (agnX === cornerAlignmentCenter && agnY === cornerAlignmentCenter) {
                                        continue;
                                    }
                                    else {
                                        AwesomeQR._drawAlignProtector(mainCanvasContext, agnX, agnY, nSize);
                                    }
                                }
                            }
                        }
                        // - FINDER
                        mainCanvasContext.fillStyle = this.options.colorDark;
                        mainCanvasContext.fillRect(0, 0, 7 * nSize, nSize);
                        mainCanvasContext.fillRect((nCount - 7) * nSize, 0, 7 * nSize, nSize);
                        mainCanvasContext.fillRect(0, 6 * nSize, 7 * nSize, nSize);
                        mainCanvasContext.fillRect((nCount - 7) * nSize, 6 * nSize, 7 * nSize, nSize);
                        mainCanvasContext.fillRect(0, (nCount - 7) * nSize, 7 * nSize, nSize);
                        mainCanvasContext.fillRect(0, (nCount - 7 + 6) * nSize, 7 * nSize, nSize);
                        mainCanvasContext.fillRect(0, 0, nSize, 7 * nSize);
                        mainCanvasContext.fillRect(6 * nSize, 0, nSize, 7 * nSize);
                        mainCanvasContext.fillRect((nCount - 7) * nSize, 0, nSize, 7 * nSize);
                        mainCanvasContext.fillRect((nCount - 7 + 6) * nSize, 0, nSize, 7 * nSize);
                        mainCanvasContext.fillRect(0, (nCount - 7) * nSize, nSize, 7 * nSize);
                        mainCanvasContext.fillRect(6 * nSize, (nCount - 7) * nSize, nSize, 7 * nSize);
                        mainCanvasContext.fillRect(2 * nSize, 2 * nSize, 3 * nSize, 3 * nSize);
                        mainCanvasContext.fillRect((nCount - 7 + 2) * nSize, 2 * nSize, 3 * nSize, 3 * nSize);
                        mainCanvasContext.fillRect(2 * nSize, (nCount - 7 + 2) * nSize, 3 * nSize, 3 * nSize);
                        timingScale = ((_l = (_k = this.options.components) === null || _k === void 0 ? void 0 : _k.timing) === null || _l === void 0 ? void 0 : _l.scale) || defaultScale;
                        timingXyOffset = (1 - timingScale) * 0.5;
                        for (i = 0; i < nCount - 8; i += 2) {
                            AwesomeQR._drawDot(mainCanvasContext, 8 + i, 6, nSize, timingXyOffset, timingScale);
                            AwesomeQR._drawDot(mainCanvasContext, 6, 8 + i, nSize, timingXyOffset, timingScale);
                        }
                        cornerAlignmentScale = ((_o = (_m = this.options.components) === null || _m === void 0 ? void 0 : _m.cornerAlignment) === null || _o === void 0 ? void 0 : _o.scale) || defaultScale;
                        cornerAlignmentXyOffset = (1 - cornerAlignmentScale) * 0.5;
                        AwesomeQR._drawAlign(mainCanvasContext, cornerAlignmentCenter, cornerAlignmentCenter, nSize, cornerAlignmentXyOffset, cornerAlignmentScale, this.options.colorDark, ((_q = (_p = this.options.components) === null || _p === void 0 ? void 0 : _p.cornerAlignment) === null || _q === void 0 ? void 0 : _q.protectors) || false);
                        alignmentScale = ((_s = (_r = this.options.components) === null || _r === void 0 ? void 0 : _r.alignment) === null || _s === void 0 ? void 0 : _s.scale) || defaultScale;
                        alignmentXyOffset = (1 - alignmentScale) * 0.5;
                        for (i = 0; i < alignmentPatternCenters.length; i++) {
                            for (j = 0; j < alignmentPatternCenters.length; j++) {
                                agnX = alignmentPatternCenters[j];
                                agnY = alignmentPatternCenters[i];
                                if (agnX === 6 && (agnY === 6 || agnY === cornerAlignmentCenter)) {
                                    continue;
                                }
                                else if (agnY === 6 && (agnX === 6 || agnX === cornerAlignmentCenter)) {
                                    continue;
                                }
                                else if (agnX === cornerAlignmentCenter && agnY === cornerAlignmentCenter) {
                                    continue;
                                }
                                else {
                                    AwesomeQR._drawAlign(mainCanvasContext, agnX, agnY, nSize, alignmentXyOffset, alignmentScale, this.options.colorDark, ((_u = (_t = this.options.components) === null || _t === void 0 ? void 0 : _t.alignment) === null || _u === void 0 ? void 0 : _u.protectors) || false);
                                }
                            }
                        }
                        // Fill the margin
                        if (whiteMargin) {
                            mainCanvasContext.fillStyle = "#FFFFFF";
                            mainCanvasContext.fillRect(-margin, -margin, size, margin);
                            mainCanvasContext.fillRect(-margin, viewportSize, size, margin);
                            mainCanvasContext.fillRect(viewportSize, -margin, margin, size);
                            mainCanvasContext.fillRect(-margin, -margin, margin, size);
                        }
                        if (!!!this.options.logoImage) return [3 /*break*/, 6];
                        return [4 /*yield*/, canvas_1.loadImage(this.options.logoImage)];
                    case 5:
                        logoImage = _v.sent();
                        logoScale = this.options.logoScale;
                        logoMargin = this.options.logoMargin;
                        logoCornerRadius = this.options.logoCornerRadius;
                        if (logoScale <= 0 || logoScale >= 1.0) {
                            logoScale = 0.2;
                        }
                        if (logoMargin < 0) {
                            logoMargin = 0;
                        }
                        if (logoCornerRadius < 0) {
                            logoCornerRadius = 0;
                        }
                        logoSize = viewportSize * logoScale;
                        x = 0.5 * (size - logoSize);
                        y = x;
                        // Restore the canvas
                        // After restoring, the top and left margins should be taken into account
                        mainCanvasContext.restore();
                        // Clean the area that the logo covers (including margins)
                        mainCanvasContext.fillStyle = "#FFFFFF";
                        mainCanvasContext.save();
                        AwesomeQR._prepareRoundedCornerClip(mainCanvasContext, x - logoMargin, y - logoMargin, logoSize + 2 * logoMargin, logoSize + 2 * logoMargin, logoCornerRadius + logoMargin);
                        mainCanvasContext.clip();
                        oldGlobalCompositeOperation = mainCanvasContext.globalCompositeOperation;
                        mainCanvasContext.globalCompositeOperation = "destination-out";
                        mainCanvasContext.fill();
                        mainCanvasContext.globalCompositeOperation = oldGlobalCompositeOperation;
                        mainCanvasContext.restore();
                        // Draw logo image
                        mainCanvasContext.save();
                        AwesomeQR._prepareRoundedCornerClip(mainCanvasContext, x, y, logoSize, logoSize, logoCornerRadius);
                        mainCanvasContext.clip();
                        mainCanvasContext.drawImage(logoImage, x, y, logoSize, logoSize);
                        mainCanvasContext.restore();
                        // Re-translate the canvas to translate the top and left margins into invisible area
                        mainCanvasContext.save();
                        mainCanvasContext.translate(margin, margin);
                        _v.label = 6;
                    case 6:
                        if (!!parsedGIFBackground) {
                            gifFrames.forEach(function (frame) {
                                if (!gifOutput_1) {
                                    gifOutput_1 = new GIFEncoder_1.default(rawSize, rawSize);
                                    gifOutput_1.setDelay(frame.delay);
                                    gifOutput_1.setRepeat(0);
                                }
                                var _a = frame.dims, width = _a.width, height = _a.height;
                                if (!backgroundCanvas_1) {
                                    backgroundCanvas_1 = canvas_1.createCanvas(width, height);
                                    backgroundCanvasContext_1 = backgroundCanvas_1.getContext("2d");
                                    backgroundCanvasContext_1.rect(0, 0, backgroundCanvas_1.width, backgroundCanvas_1.height);
                                    backgroundCanvasContext_1.fillStyle = "#ffffff";
                                    backgroundCanvasContext_1.fill();
                                }
                                if (!patchCanvas_1 || !patchData_1 || width !== patchCanvas_1.width || height !== patchCanvas_1.height) {
                                    patchCanvas_1 = canvas_1.createCanvas(width, height);
                                    patchCanvasContext_1 = patchCanvas_1.getContext("2d");
                                    patchData_1 = patchCanvasContext_1.createImageData(width, height);
                                }
                                patchData_1.data.set(frame.patch);
                                patchCanvasContext_1.putImageData(patchData_1, 0, 0);
                                backgroundCanvasContext_1.drawImage(patchCanvas_1, frame.dims.left, frame.dims.top);
                                var unscaledCanvas = canvas_1.createCanvas(size, size);
                                var unscaledCanvasContext = unscaledCanvas.getContext("2d");
                                unscaledCanvasContext.drawImage(backgroundCanvas_1, 0, 0, size, size);
                                unscaledCanvasContext.rect(0, 0, size, size);
                                unscaledCanvasContext.fillStyle = backgroundDimming;
                                unscaledCanvasContext.fill();
                                unscaledCanvasContext.drawImage(mainCanvas, 0, 0, size, size);
                                // Scale the final image
                                var outCanvas = canvas_1.createCanvas(rawSize, rawSize);
                                var outCanvasContext = outCanvas.getContext("2d");
                                outCanvasContext.drawImage(unscaledCanvas, 0, 0, rawSize, rawSize);
                                gifOutput_1.addFrame(outCanvasContext.getImageData(0, 0, outCanvas.width, outCanvas.height).data);
                            });
                            if (!gifOutput_1) {
                                throw new Error("No frames.");
                            }
                            gifOutput_1.finish();
                            if (isElement(this.canvas)) {
                                u8array = gifOutput_1.stream().toFlattenUint8Array();
                                binary = u8array.reduce(function (bin, u8) { return bin + String.fromCharCode(u8); }, "");
                                return [2 /*return*/, Promise.resolve("data:image/gif;base64," + window.btoa(binary))];
                            }
                            return [2 /*return*/, Promise.resolve(Buffer.from(gifOutput_1.stream().toFlattenUint8Array()))];
                        }
                        else {
                            // Swap and merge the foreground and the background
                            backgroundCanvasContext.drawImage(mainCanvas, 0, 0, size, size);
                            mainCanvasContext.drawImage(backgroundCanvas, -margin, -margin, size, size);
                            outCanvas = canvas_1.createCanvas(rawSize, rawSize);
                            outCanvasContext = outCanvas.getContext("2d");
                            outCanvasContext.drawImage(mainCanvas, 0, 0, rawSize, rawSize);
                            this.canvas = outCanvas;
                            if (isElement(this.canvas)) {
                                return [2 /*return*/, Promise.resolve(this.canvas.toDataURL())];
                            }
                            return [2 /*return*/, Promise.resolve(this.canvas.toBuffer())];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AwesomeQR.CorrectLevel = qrcode_1.QRErrorCorrectLevel;
    AwesomeQR.defaultComponentOptions = {
        data: {
            scale: 0.4,
        },
        timing: {
            scale: 0.5,
            protectors: false,
        },
        alignment: {
            scale: 0.5,
            protectors: false,
        },
        cornerAlignment: {
            scale: 0.5,
            protectors: true,
        },
    };
    AwesomeQR.defaultOptions = {
        text: "",
        size: 400,
        margin: 20,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: qrcode_1.QRErrorCorrectLevel.M,
        backgroundImage: undefined,
        backgroundDimming: "rgba(0,0,0,0)",
        logoImage: undefined,
        logoScale: 0.2,
        logoMargin: 4,
        logoCornerRadius: 8,
        whiteMargin: true,
        components: AwesomeQR.defaultComponentOptions,
        autoColor: true,
    };
    return AwesomeQR;
}());
exports.AwesomeQR = AwesomeQR;
function isElement(obj) {
    try {
        //Using W3 DOM2 (works for FF, Opera and Chrome)
        return obj instanceof HTMLElement;
    }
    catch (e) {
        //Browsers not supporting W3 DOM2 don't have HTMLElement and
        //an exception is thrown and we end up here. Testing some
        //properties that all elements have (works on IE7)
        return (typeof obj === "object" &&
            obj.nodeType === 1 &&
            typeof obj.style === "object" &&
            typeof obj.ownerDocument === "object");
    }
}


/***/ }),

/***/ "./node_modules/awesome-qr/lib/gif.js/GIFEncoder.js":
/*!**********************************************************!*\
  !*** ./node_modules/awesome-qr/lib/gif.js/GIFEncoder.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/*
  GIFEncoder.js

  Authors
  Kevin Weiner (original Java version - kweiner@fmsware.com)
  Thibault Imbert (AS3 version - bytearray.org)
  Johan Nordberg (JS version - code@johan-nordberg.com)
  Makito (Optimized for AwesomeQR - sumimakito@hotmail,com)
*/
var NeuQuant = __webpack_require__(/*! ./TypedNeuQuant.js */ "./node_modules/awesome-qr/lib/gif.js/TypedNeuQuant.js");
var LZWEncoder = __webpack_require__(/*! ./LZWEncoder.js */ "./node_modules/awesome-qr/lib/gif.js/LZWEncoder.js");
function ByteArray() {
    this.page = -1;
    this.pages = [];
    this.newPage();
}
ByteArray.pageSize = 4096;
ByteArray.charMap = {};
for (var i = 0; i < 256; i++)
    ByteArray.charMap[i] = String.fromCharCode(i);
ByteArray.prototype.newPage = function () {
    this.pages[++this.page] = new Uint8Array(ByteArray.pageSize);
    this.cursor = 0;
};
ByteArray.prototype.getData = function () {
    var rv = "";
    for (var p = 0; p < this.pages.length; p++) {
        for (var i = 0; i < ByteArray.pageSize; i++) {
            rv += ByteArray.charMap[this.pages[p][i]];
        }
    }
    return rv;
};
ByteArray.prototype.toFlattenUint8Array = function () {
    var chunks = [];
    for (var p = 0; p < this.pages.length; p++) {
        if (p === this.pages.length - 1) {
            var chunk = Uint8Array.from(this.pages[p].slice(0, this.cursor));
            chunks.push(chunk);
        }
        else {
            chunks.push(this.pages[p]);
        }
    }
    var flatten = new Uint8Array(chunks.reduce(function (acc, chunk) { return acc + chunk.length; }, 0));
    chunks.reduce(function (lastLength, chunk) {
        flatten.set(chunk, lastLength);
        return lastLength + chunk.length;
    }, 0);
    return flatten;
};
ByteArray.prototype.writeByte = function (val) {
    if (this.cursor >= ByteArray.pageSize)
        this.newPage();
    this.pages[this.page][this.cursor++] = val;
};
ByteArray.prototype.writeUTFBytes = function (string) {
    for (var l = string.length, i = 0; i < l; i++)
        this.writeByte(string.charCodeAt(i));
};
ByteArray.prototype.writeBytes = function (array, offset, length) {
    for (var l = length || array.length, i = offset || 0; i < l; i++)
        this.writeByte(array[i]);
};
function GIFEncoder(width, height) {
    // image size
    this.width = ~~width;
    this.height = ~~height;
    // transparent color if given
    this.transparent = null;
    // transparent index in color table
    this.transIndex = 0;
    // -1 = no repeat, 0 = forever. anything else is repeat count
    this.repeat = -1;
    // frame delay (hundredths)
    this.delay = 0;
    this.image = null; // current frame
    this.pixels = null; // BGR byte array from frame
    this.indexedPixels = null; // converted frame indexed to palette
    this.colorDepth = null; // number of bit planes
    this.colorTab = null; // RGB palette
    this.neuQuant = null; // NeuQuant instance that was used to generate this.colorTab.
    this.usedEntry = new Array(); // active palette entries
    this.palSize = 7; // color table size (bits-1)
    this.dispose = -1; // disposal code (-1 = use default)
    this.firstFrame = true;
    this.sample = 10; // default sample interval for quantizer
    this.dither = false; // default dithering
    this.globalPalette = false;
    this.out = new ByteArray();
}
/*
  Sets the delay time between each frame, or changes it for subsequent frames
  (applies to last frame added)
*/
GIFEncoder.prototype.setDelay = function (milliseconds) {
    this.delay = Math.round(milliseconds / 10);
};
/*
  Sets frame rate in frames per second.
*/
GIFEncoder.prototype.setFrameRate = function (fps) {
    this.delay = Math.round(100 / fps);
};
/*
  Sets the GIF frame disposal code for the last added frame and any
  subsequent frames.

  Default is 0 if no transparent color has been set, otherwise 2.
*/
GIFEncoder.prototype.setDispose = function (disposalCode) {
    if (disposalCode >= 0)
        this.dispose = disposalCode;
};
/*
  Sets the number of times the set of GIF frames should be played.

  -1 = play once
  0 = repeat indefinitely

  Default is -1

  Must be invoked before the first image is added
*/
GIFEncoder.prototype.setRepeat = function (repeat) {
    this.repeat = repeat;
};
/*
  Sets the transparent color for the last added frame and any subsequent
  frames. Since all colors are subject to modification in the quantization
  process, the color in the final palette for each frame closest to the given
  color becomes the transparent color for that frame. May be set to null to
  indicate no transparent color.
*/
GIFEncoder.prototype.setTransparent = function (color) {
    this.transparent = color;
};
/*
  Adds next GIF frame. The frame is not written immediately, but is
  actually deferred until the next frame is received so that timing
  data can be inserted.  Invoking finish() flushes all frames.
*/
GIFEncoder.prototype.addFrame = function (imageData) {
    this.image = imageData;
    this.colorTab = this.globalPalette && this.globalPalette.slice ? this.globalPalette : null;
    this.getImagePixels(); // convert to correct format if necessary
    this.analyzePixels(); // build color table & map pixels
    if (this.globalPalette === true)
        this.globalPalette = this.colorTab;
    if (this.firstFrame) {
        this.writeHeader();
        this.writeLSD(); // logical screen descriptior
        this.writePalette(); // global color table
        if (this.repeat >= 0) {
            // use NS app extension to indicate reps
            this.writeNetscapeExt();
        }
    }
    this.writeGraphicCtrlExt(); // write graphic control extension
    this.writeImageDesc(); // image descriptor
    if (!this.firstFrame && !this.globalPalette)
        this.writePalette(); // local color table
    this.writePixels(); // encode and write pixel data
    this.firstFrame = false;
};
/*
  Adds final trailer to the GIF stream, if you don't call the finish method
  the GIF stream will not be valid.
*/
GIFEncoder.prototype.finish = function () {
    this.out.writeByte(0x3b); // gif trailer
};
/*
  Sets quality of color quantization (conversion of images to the maximum 256
  colors allowed by the GIF specification). Lower values (minimum = 1)
  produce better colors, but slow processing significantly. 10 is the
  default, and produces good color mapping at reasonable speeds. Values
  greater than 20 do not yield significant improvements in speed.
*/
GIFEncoder.prototype.setQuality = function (quality) {
    if (quality < 1)
        quality = 1;
    this.sample = quality;
};
/*
  Sets dithering method. Available are:
  - FALSE no dithering
  - TRUE or FloydSteinberg
  - FalseFloydSteinberg
  - Stucki
  - Atkinson
  You can add '-serpentine' to use serpentine scanning
*/
GIFEncoder.prototype.setDither = function (dither) {
    if (dither === true)
        dither = "FloydSteinberg";
    this.dither = dither;
};
/*
  Sets global palette for all frames.
  You can provide TRUE to create global palette from first picture.
  Or an array of r,g,b,r,g,b,...
*/
GIFEncoder.prototype.setGlobalPalette = function (palette) {
    this.globalPalette = palette;
};
/*
  Returns global palette used for all frames.
  If setGlobalPalette(true) was used, then this function will return
  calculated palette after the first frame is added.
*/
GIFEncoder.prototype.getGlobalPalette = function () {
    return (this.globalPalette && this.globalPalette.slice && this.globalPalette.slice(0)) || this.globalPalette;
};
/*
  Writes GIF file header
*/
GIFEncoder.prototype.writeHeader = function () {
    this.out.writeUTFBytes("GIF89a");
};
/*
  Analyzes current frame colors and creates color map.
*/
GIFEncoder.prototype.analyzePixels = function () {
    if (!this.colorTab) {
        this.neuQuant = new NeuQuant(this.pixels, this.sample);
        this.neuQuant.buildColormap(); // create reduced palette
        this.colorTab = this.neuQuant.getColormap();
    }
    // map image pixels to new palette
    if (this.dither) {
        this.ditherPixels(this.dither.replace("-serpentine", ""), this.dither.match(/-serpentine/) !== null);
    }
    else {
        this.indexPixels();
    }
    this.pixels = null;
    this.colorDepth = 8;
    this.palSize = 7;
    // get closest match to transparent color if specified
    if (this.transparent !== null) {
        this.transIndex = this.findClosest(this.transparent, true);
    }
};
/*
  Index pixels, without dithering
*/
GIFEncoder.prototype.indexPixels = function (imgq) {
    var nPix = this.pixels.length / 3;
    this.indexedPixels = new Uint8Array(nPix);
    var k = 0;
    for (var j = 0; j < nPix; j++) {
        var index = this.findClosestRGB(this.pixels[k++] & 0xff, this.pixels[k++] & 0xff, this.pixels[k++] & 0xff);
        this.usedEntry[index] = true;
        this.indexedPixels[j] = index;
    }
};
/*
  Taken from http://jsbin.com/iXofIji/2/edit by PAEz
*/
GIFEncoder.prototype.ditherPixels = function (kernel, serpentine) {
    var kernels = {
        FalseFloydSteinberg: [
            [3 / 8, 1, 0],
            [3 / 8, 0, 1],
            [2 / 8, 1, 1],
        ],
        FloydSteinberg: [
            [7 / 16, 1, 0],
            [3 / 16, -1, 1],
            [5 / 16, 0, 1],
            [1 / 16, 1, 1],
        ],
        Stucki: [
            [8 / 42, 1, 0],
            [4 / 42, 2, 0],
            [2 / 42, -2, 1],
            [4 / 42, -1, 1],
            [8 / 42, 0, 1],
            [4 / 42, 1, 1],
            [2 / 42, 2, 1],
            [1 / 42, -2, 2],
            [2 / 42, -1, 2],
            [4 / 42, 0, 2],
            [2 / 42, 1, 2],
            [1 / 42, 2, 2],
        ],
        Atkinson: [
            [1 / 8, 1, 0],
            [1 / 8, 2, 0],
            [1 / 8, -1, 1],
            [1 / 8, 0, 1],
            [1 / 8, 1, 1],
            [1 / 8, 0, 2],
        ],
    };
    if (!kernel || !kernels[kernel]) {
        throw "Unknown dithering kernel: " + kernel;
    }
    var ds = kernels[kernel];
    var index = 0, height = this.height, width = this.width, data = this.pixels;
    var direction = serpentine ? -1 : 1;
    this.indexedPixels = new Uint8Array(this.pixels.length / 3);
    for (var y = 0; y < height; y++) {
        if (serpentine)
            direction = direction * -1;
        for (var x = direction == 1 ? 0 : width - 1, xend = direction == 1 ? width : 0; x !== xend; x += direction) {
            index = y * width + x;
            // Get original colour
            var idx = index * 3;
            var r1 = data[idx];
            var g1 = data[idx + 1];
            var b1 = data[idx + 2];
            // Get converted colour
            idx = this.findClosestRGB(r1, g1, b1);
            this.usedEntry[idx] = true;
            this.indexedPixels[index] = idx;
            idx *= 3;
            var r2 = this.colorTab[idx];
            var g2 = this.colorTab[idx + 1];
            var b2 = this.colorTab[idx + 2];
            var er = r1 - r2;
            var eg = g1 - g2;
            var eb = b1 - b2;
            for (var i = direction == 1 ? 0 : ds.length - 1, end = direction == 1 ? ds.length : 0; i !== end; i += direction) {
                var x1 = ds[i][1]; // *direction;  //  Should this by timesd by direction?..to make the kernel go in the opposite direction....got no idea....
                var y1 = ds[i][2];
                if (x1 + x >= 0 && x1 + x < width && y1 + y >= 0 && y1 + y < height) {
                    var d = ds[i][0];
                    idx = index + x1 + y1 * width;
                    idx *= 3;
                    data[idx] = Math.max(0, Math.min(255, data[idx] + er * d));
                    data[idx + 1] = Math.max(0, Math.min(255, data[idx + 1] + eg * d));
                    data[idx + 2] = Math.max(0, Math.min(255, data[idx + 2] + eb * d));
                }
            }
        }
    }
};
/*
  Returns index of palette color closest to c
*/
GIFEncoder.prototype.findClosest = function (c, used) {
    return this.findClosestRGB((c & 0xff0000) >> 16, (c & 0x00ff00) >> 8, c & 0x0000ff, used);
};
GIFEncoder.prototype.findClosestRGB = function (r, g, b, used) {
    if (this.colorTab === null)
        return -1;
    if (this.neuQuant && !used) {
        return this.neuQuant.lookupRGB(r, g, b);
    }
    var c = b | (g << 8) | (r << 16);
    var minpos = 0;
    var dmin = 256 * 256 * 256;
    var len = this.colorTab.length;
    for (var i = 0, index = 0; i < len; index++) {
        var dr = r - (this.colorTab[i++] & 0xff);
        var dg = g - (this.colorTab[i++] & 0xff);
        var db = b - (this.colorTab[i++] & 0xff);
        var d = dr * dr + dg * dg + db * db;
        if ((!used || this.usedEntry[index]) && d < dmin) {
            dmin = d;
            minpos = index;
        }
    }
    return minpos;
};
/*
  Extracts image pixels into byte array pixels
  (removes alphachannel from canvas imagedata)
*/
GIFEncoder.prototype.getImagePixels = function () {
    var w = this.width;
    var h = this.height;
    this.pixels = new Uint8Array(w * h * 3);
    var data = this.image;
    var srcPos = 0;
    var count = 0;
    for (var i = 0; i < h; i++) {
        for (var j = 0; j < w; j++) {
            this.pixels[count++] = data[srcPos++];
            this.pixels[count++] = data[srcPos++];
            this.pixels[count++] = data[srcPos++];
            srcPos++;
        }
    }
};
/*
  Writes Graphic Control Extension
*/
GIFEncoder.prototype.writeGraphicCtrlExt = function () {
    this.out.writeByte(0x21); // extension introducer
    this.out.writeByte(0xf9); // GCE label
    this.out.writeByte(4); // data block size
    var transp, disp;
    if (this.transparent === null) {
        transp = 0;
        disp = 0; // dispose = no action
    }
    else {
        transp = 1;
        disp = 2; // force clear if using transparent color
    }
    if (this.dispose >= 0) {
        disp = this.dispose & 7; // user override
    }
    disp <<= 2;
    // packed fields
    this.out.writeByte(0 | // 1:3 reserved
        disp | // 4:6 disposal
        0 | // 7 user input - 0 = none
        transp // 8 transparency flag
    );
    this.writeShort(this.delay); // delay x 1/100 sec
    this.out.writeByte(this.transIndex); // transparent color index
    this.out.writeByte(0); // block terminator
};
/*
  Writes Image Descriptor
*/
GIFEncoder.prototype.writeImageDesc = function () {
    this.out.writeByte(0x2c); // image separator
    this.writeShort(0); // image position x,y = 0,0
    this.writeShort(0);
    this.writeShort(this.width); // image size
    this.writeShort(this.height);
    // packed fields
    if (this.firstFrame || this.globalPalette) {
        // no LCT - GCT is used for first (or only) frame
        this.out.writeByte(0);
    }
    else {
        // specify normal LCT
        this.out.writeByte(0x80 | // 1 local color table 1=yes
            0 | // 2 interlace - 0=no
            0 | // 3 sorted - 0=no
            0 | // 4-5 reserved
            this.palSize // 6-8 size of color table
        );
    }
};
/*
  Writes Logical Screen Descriptor
*/
GIFEncoder.prototype.writeLSD = function () {
    // logical screen size
    this.writeShort(this.width);
    this.writeShort(this.height);
    // packed fields
    this.out.writeByte(0x80 | // 1 : global color table flag = 1 (gct used)
        0x70 | // 2-4 : color resolution = 7
        0x00 | // 5 : gct sort flag = 0
        this.palSize // 6-8 : gct size
    );
    this.out.writeByte(0); // background color index
    this.out.writeByte(0); // pixel aspect ratio - assume 1:1
};
/*
  Writes Netscape application extension to define repeat count.
*/
GIFEncoder.prototype.writeNetscapeExt = function () {
    this.out.writeByte(0x21); // extension introducer
    this.out.writeByte(0xff); // app extension label
    this.out.writeByte(11); // block size
    this.out.writeUTFBytes("NETSCAPE2.0"); // app id + auth code
    this.out.writeByte(3); // sub-block size
    this.out.writeByte(1); // loop sub-block id
    this.writeShort(this.repeat); // loop count (extra iterations, 0=repeat forever)
    this.out.writeByte(0); // block terminator
};
/*
  Writes color table
*/
GIFEncoder.prototype.writePalette = function () {
    this.out.writeBytes(this.colorTab);
    var n = 3 * 256 - this.colorTab.length;
    for (var i = 0; i < n; i++)
        this.out.writeByte(0);
};
GIFEncoder.prototype.writeShort = function (pValue) {
    this.out.writeByte(pValue & 0xff);
    this.out.writeByte((pValue >> 8) & 0xff);
};
/*
  Encodes and writes pixel data
*/
GIFEncoder.prototype.writePixels = function () {
    var enc = new LZWEncoder(this.width, this.height, this.indexedPixels, this.colorDepth);
    enc.encode(this.out);
};
/*
  Retrieves the GIF stream
*/
GIFEncoder.prototype.stream = function () {
    return this.out;
};
module.exports = GIFEncoder;


/***/ }),

/***/ "./node_modules/awesome-qr/lib/gif.js/LZWEncoder.js":
/*!**********************************************************!*\
  !*** ./node_modules/awesome-qr/lib/gif.js/LZWEncoder.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";

/*
  LZWEncoder.js

  Authors
  Kevin Weiner (original Java version - kweiner@fmsware.com)
  Thibault Imbert (AS3 version - bytearray.org)
  Johan Nordberg (JS version - code@johan-nordberg.com)

  Acknowledgements
  GIFCOMPR.C - GIF Image compression routines
  Lempel-Ziv compression based on 'compress'. GIF modifications by
  David Rowley (mgardi@watdcsu.waterloo.edu)
  GIF Image compression - modified 'compress'
  Based on: compress.c - File compression ala IEEE Computer, June 1984.
  By Authors: Spencer W. Thomas (decvax!harpo!utah-cs!utah-gr!thomas)
  Jim McKie (decvax!mcvax!jim)
  Steve Davies (decvax!vax135!petsd!peora!srd)
  Ken Turkowski (decvax!decwrl!turtlevax!ken)
  James A. Woods (decvax!ihnp4!ames!jaw)
  Joe Orost (decvax!vax135!petsd!joe)
*/
var EOF = -1;
var BITS = 12;
var HSIZE = 5003; // 80% occupancy
var masks = [0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F,
    0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF,
    0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF];
function LZWEncoder(width, height, pixels, colorDepth) {
    var initCodeSize = Math.max(2, colorDepth);
    var accum = new Uint8Array(256);
    var htab = new Int32Array(HSIZE);
    var codetab = new Int32Array(HSIZE);
    var cur_accum, cur_bits = 0;
    var a_count;
    var free_ent = 0; // first unused entry
    var maxcode;
    // block compression parameters -- after all codes are used up,
    // and compression rate changes, start over.
    var clear_flg = false;
    // Algorithm: use open addressing double hashing (no chaining) on the
    // prefix code / next character combination. We do a variant of Knuth's
    // algorithm D (vol. 3, sec. 6.4) along with G. Knott's relatively-prime
    // secondary probe. Here, the modular division first probe is gives way
    // to a faster exclusive-or manipulation. Also do block compression with
    // an adaptive reset, whereby the code table is cleared when the compression
    // ratio decreases, but after the table fills. The variable-length output
    // codes are re-sized at this point, and a special CLEAR code is generated
    // for the decompressor. Late addition: construct the table according to
    // file size for noticeable speed improvement on small files. Please direct
    // questions about this implementation to ames!jaw.
    var g_init_bits, ClearCode, EOFCode;
    var remaining, curPixel, n_bits;
    // Add a character to the end of the current packet, and if it is 254
    // characters, flush the packet to disk.
    function char_out(c, outs) {
        accum[a_count++] = c;
        if (a_count >= 254)
            flush_char(outs);
    }
    // Clear out the hash table
    // table clear for block compress
    function cl_block(outs) {
        cl_hash(HSIZE);
        free_ent = ClearCode + 2;
        clear_flg = true;
        output(ClearCode, outs);
    }
    // Reset code table
    function cl_hash(hsize) {
        for (var i = 0; i < hsize; ++i)
            htab[i] = -1;
    }
    function compress(init_bits, outs) {
        var fcode, c, i, ent, disp, hsize_reg, hshift;
        // Set up the globals: g_init_bits - initial number of bits
        g_init_bits = init_bits;
        // Set up the necessary values
        clear_flg = false;
        n_bits = g_init_bits;
        maxcode = MAXCODE(n_bits);
        ClearCode = 1 << (init_bits - 1);
        EOFCode = ClearCode + 1;
        free_ent = ClearCode + 2;
        a_count = 0; // clear packet
        ent = nextPixel();
        hshift = 0;
        for (fcode = HSIZE; fcode < 65536; fcode *= 2)
            ++hshift;
        hshift = 8 - hshift; // set hash code range bound
        hsize_reg = HSIZE;
        cl_hash(hsize_reg); // clear hash table
        output(ClearCode, outs);
        outer_loop: while ((c = nextPixel()) != EOF) {
            fcode = (c << BITS) + ent;
            i = (c << hshift) ^ ent; // xor hashing
            if (htab[i] === fcode) {
                ent = codetab[i];
                continue;
            }
            else if (htab[i] >= 0) { // non-empty slot
                disp = hsize_reg - i; // secondary hash (after G. Knott)
                if (i === 0)
                    disp = 1;
                do {
                    if ((i -= disp) < 0)
                        i += hsize_reg;
                    if (htab[i] === fcode) {
                        ent = codetab[i];
                        continue outer_loop;
                    }
                } while (htab[i] >= 0);
            }
            output(ent, outs);
            ent = c;
            if (free_ent < 1 << BITS) {
                codetab[i] = free_ent++; // code -> hashtable
                htab[i] = fcode;
            }
            else {
                cl_block(outs);
            }
        }
        // Put out the final code.
        output(ent, outs);
        output(EOFCode, outs);
    }
    function encode(outs) {
        outs.writeByte(initCodeSize); // write "initial code size" byte
        remaining = width * height; // reset navigation variables
        curPixel = 0;
        compress(initCodeSize + 1, outs); // compress and write the pixel data
        outs.writeByte(0); // write block terminator
    }
    // Flush the packet to disk, and reset the accumulator
    function flush_char(outs) {
        if (a_count > 0) {
            outs.writeByte(a_count);
            outs.writeBytes(accum, 0, a_count);
            a_count = 0;
        }
    }
    function MAXCODE(n_bits) {
        return (1 << n_bits) - 1;
    }
    // Return the next pixel from the image
    function nextPixel() {
        if (remaining === 0)
            return EOF;
        --remaining;
        var pix = pixels[curPixel++];
        return pix & 0xff;
    }
    function output(code, outs) {
        cur_accum &= masks[cur_bits];
        if (cur_bits > 0)
            cur_accum |= (code << cur_bits);
        else
            cur_accum = code;
        cur_bits += n_bits;
        while (cur_bits >= 8) {
            char_out((cur_accum & 0xff), outs);
            cur_accum >>= 8;
            cur_bits -= 8;
        }
        // If the next entry is going to be too big for the code size,
        // then increase it, if possible.
        if (free_ent > maxcode || clear_flg) {
            if (clear_flg) {
                maxcode = MAXCODE(n_bits = g_init_bits);
                clear_flg = false;
            }
            else {
                ++n_bits;
                if (n_bits == BITS)
                    maxcode = 1 << BITS;
                else
                    maxcode = MAXCODE(n_bits);
            }
        }
        if (code == EOFCode) {
            // At EOF, write the rest of the buffer.
            while (cur_bits > 0) {
                char_out((cur_accum & 0xff), outs);
                cur_accum >>= 8;
                cur_bits -= 8;
            }
            flush_char(outs);
        }
    }
    this.encode = encode;
}
module.exports = LZWEncoder;


/***/ }),

/***/ "./node_modules/awesome-qr/lib/gif.js/TypedNeuQuant.js":
/*!*************************************************************!*\
  !*** ./node_modules/awesome-qr/lib/gif.js/TypedNeuQuant.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";

/* NeuQuant Neural-Net Quantization Algorithm
 * ------------------------------------------
 *
 * Copyright (c) 1994 Anthony Dekker
 *
 * NEUQUANT Neural-Net quantization algorithm by Anthony Dekker, 1994.
 * See "Kohonen neural networks for optimal colour quantization"
 * in "Network: Computation in Neural Systems" Vol. 5 (1994) pp 351-367.
 * for a discussion of the algorithm.
 * See also  http://members.ozemail.com.au/~dekker/NEUQUANT.HTML
 *
 * Any party obtaining a copy of these files from the author, directly or
 * indirectly, is granted, free of charge, a full and unrestricted irrevocable,
 * world-wide, paid up, royalty-free, nonexclusive right and license to deal
 * in this software and documentation files (the "Software"), including without
 * limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons who receive
 * copies from any such party to do so, with the only requirement being
 * that this copyright notice remain intact.
 *
 * (JavaScript port 2012 by Johan Nordberg)
 */
var ncycles = 100; // number of learning cycles
var netsize = 256; // number of colors used
var maxnetpos = netsize - 1;
// defs for freq and bias
var netbiasshift = 4; // bias for colour values
var intbiasshift = 16; // bias for fractions
var intbias = (1 << intbiasshift);
var gammashift = 10;
var gamma = (1 << gammashift);
var betashift = 10;
var beta = (intbias >> betashift); /* beta = 1/1024 */
var betagamma = (intbias << (gammashift - betashift));
// defs for decreasing radius factor
var initrad = (netsize >> 3); // for 256 cols, radius starts
var radiusbiasshift = 6; // at 32.0 biased by 6 bits
var radiusbias = (1 << radiusbiasshift);
var initradius = (initrad * radiusbias); //and decreases by a
var radiusdec = 30; // factor of 1/30 each cycle
// defs for decreasing alpha factor
var alphabiasshift = 10; // alpha starts at 1.0
var initalpha = (1 << alphabiasshift);
var alphadec; // biased by 10 bits
/* radbias and alpharadbias used for radpower calculation */
var radbiasshift = 8;
var radbias = (1 << radbiasshift);
var alpharadbshift = (alphabiasshift + radbiasshift);
var alpharadbias = (1 << alpharadbshift);
// four primes near 500 - assume no image has a length so large that it is
// divisible by all four primes
var prime1 = 499;
var prime2 = 491;
var prime3 = 487;
var prime4 = 503;
var minpicturebytes = (3 * prime4);
/*
  Constructor: NeuQuant

  Arguments:

  pixels - array of pixels in RGB format
  samplefac - sampling factor 1 to 30 where lower is better quality

  >
  > pixels = [r, g, b, r, g, b, r, g, b, ..]
  >
*/
function NeuQuant(pixels, samplefac) {
    var network; // int[netsize][4]
    var netindex; // for network lookup - really 256
    // bias and freq arrays for learning
    var bias;
    var freq;
    var radpower;
    /*
      Private Method: init
  
      sets up arrays
    */
    function init() {
        network = [];
        netindex = new Int32Array(256);
        bias = new Int32Array(netsize);
        freq = new Int32Array(netsize);
        radpower = new Int32Array(netsize >> 3);
        var i, v;
        for (i = 0; i < netsize; i++) {
            v = (i << (netbiasshift + 8)) / netsize;
            network[i] = new Float64Array([v, v, v, 0]);
            //network[i] = [v, v, v, 0]
            freq[i] = intbias / netsize;
            bias[i] = 0;
        }
    }
    /*
      Private Method: unbiasnet
  
      unbiases network to give byte values 0..255 and record position i to prepare for sort
    */
    function unbiasnet() {
        for (var i = 0; i < netsize; i++) {
            network[i][0] >>= netbiasshift;
            network[i][1] >>= netbiasshift;
            network[i][2] >>= netbiasshift;
            network[i][3] = i; // record color number
        }
    }
    /*
      Private Method: altersingle
  
      moves neuron *i* towards biased (b,g,r) by factor *alpha*
    */
    function altersingle(alpha, i, b, g, r) {
        network[i][0] -= (alpha * (network[i][0] - b)) / initalpha;
        network[i][1] -= (alpha * (network[i][1] - g)) / initalpha;
        network[i][2] -= (alpha * (network[i][2] - r)) / initalpha;
    }
    /*
      Private Method: alterneigh
  
      moves neurons in *radius* around index *i* towards biased (b,g,r) by factor *alpha*
    */
    function alterneigh(radius, i, b, g, r) {
        var lo = Math.abs(i - radius);
        var hi = Math.min(i + radius, netsize);
        var j = i + 1;
        var k = i - 1;
        var m = 1;
        var p, a;
        while ((j < hi) || (k > lo)) {
            a = radpower[m++];
            if (j < hi) {
                p = network[j++];
                p[0] -= (a * (p[0] - b)) / alpharadbias;
                p[1] -= (a * (p[1] - g)) / alpharadbias;
                p[2] -= (a * (p[2] - r)) / alpharadbias;
            }
            if (k > lo) {
                p = network[k--];
                p[0] -= (a * (p[0] - b)) / alpharadbias;
                p[1] -= (a * (p[1] - g)) / alpharadbias;
                p[2] -= (a * (p[2] - r)) / alpharadbias;
            }
        }
    }
    /*
      Private Method: contest
  
      searches for biased BGR values
    */
    function contest(b, g, r) {
        /*
          finds closest neuron (min dist) and updates freq
          finds best neuron (min dist-bias) and returns position
          for frequently chosen neurons, freq[i] is high and bias[i] is negative
          bias[i] = gamma * ((1 / netsize) - freq[i])
        */
        var bestd = ~(1 << 31);
        var bestbiasd = bestd;
        var bestpos = -1;
        var bestbiaspos = bestpos;
        var i, n, dist, biasdist, betafreq;
        for (i = 0; i < netsize; i++) {
            n = network[i];
            dist = Math.abs(n[0] - b) + Math.abs(n[1] - g) + Math.abs(n[2] - r);
            if (dist < bestd) {
                bestd = dist;
                bestpos = i;
            }
            biasdist = dist - ((bias[i]) >> (intbiasshift - netbiasshift));
            if (biasdist < bestbiasd) {
                bestbiasd = biasdist;
                bestbiaspos = i;
            }
            betafreq = (freq[i] >> betashift);
            freq[i] -= betafreq;
            bias[i] += (betafreq << gammashift);
        }
        freq[bestpos] += beta;
        bias[bestpos] -= betagamma;
        return bestbiaspos;
    }
    /*
      Private Method: inxbuild
  
      sorts network and builds netindex[0..255]
    */
    function inxbuild() {
        var i, j, p, q, smallpos, smallval, previouscol = 0, startpos = 0;
        for (i = 0; i < netsize; i++) {
            p = network[i];
            smallpos = i;
            smallval = p[1]; // index on g
            // find smallest in i..netsize-1
            for (j = i + 1; j < netsize; j++) {
                q = network[j];
                if (q[1] < smallval) { // index on g
                    smallpos = j;
                    smallval = q[1]; // index on g
                }
            }
            q = network[smallpos];
            // swap p (i) and q (smallpos) entries
            if (i != smallpos) {
                j = q[0];
                q[0] = p[0];
                p[0] = j;
                j = q[1];
                q[1] = p[1];
                p[1] = j;
                j = q[2];
                q[2] = p[2];
                p[2] = j;
                j = q[3];
                q[3] = p[3];
                p[3] = j;
            }
            // smallval entry is now in position i
            if (smallval != previouscol) {
                netindex[previouscol] = (startpos + i) >> 1;
                for (j = previouscol + 1; j < smallval; j++)
                    netindex[j] = i;
                previouscol = smallval;
                startpos = i;
            }
        }
        netindex[previouscol] = (startpos + maxnetpos) >> 1;
        for (j = previouscol + 1; j < 256; j++)
            netindex[j] = maxnetpos; // really 256
    }
    /*
      Private Method: inxsearch
  
      searches for BGR values 0..255 and returns a color index
    */
    function inxsearch(b, g, r) {
        var a, p, dist;
        var bestd = 1000; // biggest possible dist is 256*3
        var best = -1;
        var i = netindex[g]; // index on g
        var j = i - 1; // start at netindex[g] and work outwards
        while ((i < netsize) || (j >= 0)) {
            if (i < netsize) {
                p = network[i];
                dist = p[1] - g; // inx key
                if (dist >= bestd)
                    i = netsize; // stop iter
                else {
                    i++;
                    if (dist < 0)
                        dist = -dist;
                    a = p[0] - b;
                    if (a < 0)
                        a = -a;
                    dist += a;
                    if (dist < bestd) {
                        a = p[2] - r;
                        if (a < 0)
                            a = -a;
                        dist += a;
                        if (dist < bestd) {
                            bestd = dist;
                            best = p[3];
                        }
                    }
                }
            }
            if (j >= 0) {
                p = network[j];
                dist = g - p[1]; // inx key - reverse dif
                if (dist >= bestd)
                    j = -1; // stop iter
                else {
                    j--;
                    if (dist < 0)
                        dist = -dist;
                    a = p[0] - b;
                    if (a < 0)
                        a = -a;
                    dist += a;
                    if (dist < bestd) {
                        a = p[2] - r;
                        if (a < 0)
                            a = -a;
                        dist += a;
                        if (dist < bestd) {
                            bestd = dist;
                            best = p[3];
                        }
                    }
                }
            }
        }
        return best;
    }
    /*
      Private Method: learn
  
      "Main Learning Loop"
    */
    function learn() {
        var i;
        var lengthcount = pixels.length;
        var alphadec = 30 + ((samplefac - 1) / 3);
        var samplepixels = lengthcount / (3 * samplefac);
        var delta = ~~(samplepixels / ncycles);
        var alpha = initalpha;
        var radius = initradius;
        var rad = radius >> radiusbiasshift;
        if (rad <= 1)
            rad = 0;
        for (i = 0; i < rad; i++)
            radpower[i] = alpha * (((rad * rad - i * i) * radbias) / (rad * rad));
        var step;
        if (lengthcount < minpicturebytes) {
            samplefac = 1;
            step = 3;
        }
        else if ((lengthcount % prime1) !== 0) {
            step = 3 * prime1;
        }
        else if ((lengthcount % prime2) !== 0) {
            step = 3 * prime2;
        }
        else if ((lengthcount % prime3) !== 0) {
            step = 3 * prime3;
        }
        else {
            step = 3 * prime4;
        }
        var b, g, r, j;
        var pix = 0; // current pixel
        i = 0;
        while (i < samplepixels) {
            b = (pixels[pix] & 0xff) << netbiasshift;
            g = (pixels[pix + 1] & 0xff) << netbiasshift;
            r = (pixels[pix + 2] & 0xff) << netbiasshift;
            j = contest(b, g, r);
            altersingle(alpha, j, b, g, r);
            if (rad !== 0)
                alterneigh(rad, j, b, g, r); // alter neighbours
            pix += step;
            if (pix >= lengthcount)
                pix -= lengthcount;
            i++;
            if (delta === 0)
                delta = 1;
            if (i % delta === 0) {
                alpha -= alpha / alphadec;
                radius -= radius / radiusdec;
                rad = radius >> radiusbiasshift;
                if (rad <= 1)
                    rad = 0;
                for (j = 0; j < rad; j++)
                    radpower[j] = alpha * (((rad * rad - j * j) * radbias) / (rad * rad));
            }
        }
    }
    /*
      Method: buildColormap
  
      1. initializes network
      2. trains it
      3. removes misconceptions
      4. builds colorindex
    */
    function buildColormap() {
        init();
        learn();
        unbiasnet();
        inxbuild();
    }
    this.buildColormap = buildColormap;
    /*
      Method: getColormap
  
      builds colormap from the index
  
      returns array in the format:
  
      >
      > [r, g, b, r, g, b, r, g, b, ..]
      >
    */
    function getColormap() {
        var map = [];
        var index = [];
        for (var i = 0; i < netsize; i++)
            index[network[i][3]] = i;
        var k = 0;
        for (var l = 0; l < netsize; l++) {
            var j = index[l];
            map[k++] = (network[j][0]);
            map[k++] = (network[j][1]);
            map[k++] = (network[j][2]);
        }
        return map;
    }
    this.getColormap = getColormap;
    /*
      Method: lookupRGB
  
      looks for the closest *r*, *g*, *b* color in the map and
      returns its index
    */
    this.lookupRGB = inxsearch;
}
module.exports = NeuQuant;


/***/ }),

/***/ "./node_modules/awesome-qr/lib/gifuct-js/deinterlace.js":
/*!**************************************************************!*\
  !*** ./node_modules/awesome-qr/lib/gifuct-js/deinterlace.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * Deinterlace function from https://github.com/shachaf/jsgif
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deinterlace = void 0;
exports.deinterlace = function (pixels, width) {
    var newPixels = new Array(pixels.length);
    var rows = pixels.length / width;
    var cpRow = function (toRow, fromRow) {
        var fromPixels = pixels.slice(fromRow * width, (fromRow + 1) * width);
        newPixels.splice.apply(newPixels, [toRow * width, width].concat(fromPixels));
    };
    // See appendix E.
    var offsets = [0, 4, 2, 1];
    var steps = [8, 8, 4, 2];
    var fromRow = 0;
    for (var pass = 0; pass < 4; pass++) {
        for (var toRow = offsets[pass]; toRow < rows; toRow += steps[pass]) {
            cpRow(toRow, fromRow);
            fromRow++;
        }
    }
    return newPixels;
};


/***/ }),

/***/ "./node_modules/awesome-qr/lib/gifuct-js/index.js":
/*!********************************************************!*\
  !*** ./node_modules/awesome-qr/lib/gifuct-js/index.js ***!
  \********************************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decompressFrames = exports.decompressFrame = exports.parseGIF = void 0;
var gif_1 = __importDefault(__webpack_require__(/*! js-binary-schema-parser/lib/schemas/gif */ "./node_modules/js-binary-schema-parser/lib/schemas/gif.js"));
var js_binary_schema_parser_1 = __webpack_require__(/*! js-binary-schema-parser */ "./node_modules/js-binary-schema-parser/lib/index.js");
var uint8_1 = __webpack_require__(/*! js-binary-schema-parser/lib/parsers/uint8 */ "./node_modules/js-binary-schema-parser/lib/parsers/uint8.js");
var deinterlace_1 = __webpack_require__(/*! ./deinterlace */ "./node_modules/awesome-qr/lib/gifuct-js/deinterlace.js");
var lzw_1 = __webpack_require__(/*! ./lzw */ "./node_modules/awesome-qr/lib/gifuct-js/lzw.js");
exports.parseGIF = function (arrayBuffer) {
    var byteData = new Uint8Array(arrayBuffer);
    return js_binary_schema_parser_1.parse(uint8_1.buildStream(byteData), gif_1.default);
};
var generatePatch = function (image) {
    var totalPixels = image.pixels.length;
    var patchData = new Uint8ClampedArray(totalPixels * 4);
    for (var i = 0; i < totalPixels; i++) {
        var pos = i * 4;
        var colorIndex = image.pixels[i];
        var color = image.colorTable[colorIndex];
        patchData[pos] = color[0];
        patchData[pos + 1] = color[1];
        patchData[pos + 2] = color[2];
        patchData[pos + 3] = colorIndex !== image.transparentIndex ? 255 : 0;
    }
    return patchData;
};
exports.decompressFrame = function (frame, gct, buildImagePatch) {
    if (!frame.image) {
        console.warn('gif frame does not have associated image.');
        return;
    }
    var image = frame.image;
    // get the number of pixels
    var totalPixels = image.descriptor.width * image.descriptor.height;
    // do lzw decompression
    var pixels = lzw_1.lzw(image.data.minCodeSize, image.data.blocks, totalPixels);
    // deal with interlacing if necessary
    if (image.descriptor.lct.interlaced) {
        pixels = deinterlace_1.deinterlace(pixels, image.descriptor.width);
    }
    var resultImage = {
        pixels: pixels,
        dims: {
            top: frame.image.descriptor.top,
            left: frame.image.descriptor.left,
            width: frame.image.descriptor.width,
            height: frame.image.descriptor.height
        }
    };
    // color table
    if (image.descriptor.lct && image.descriptor.lct.exists) {
        resultImage.colorTable = image.lct;
    }
    else {
        resultImage.colorTable = gct;
    }
    // add per frame relevant gce information
    if (frame.gce) {
        resultImage.delay = (frame.gce.delay || 10) * 10; // convert to ms
        resultImage.disposalType = frame.gce.extras.disposal;
        // transparency
        if (frame.gce.extras.transparentColorGiven) {
            resultImage.transparentIndex = frame.gce.transparentColorIndex;
        }
    }
    // create canvas usable imagedata if desired
    if (buildImagePatch) {
        resultImage.patch = generatePatch(resultImage);
    }
    return resultImage;
};
exports.decompressFrames = function (parsedGif, buildImagePatches) {
    return parsedGif.frames
        .filter(function (f) { return f.image; })
        .map(function (f) { return exports.decompressFrame(f, parsedGif.gct, buildImagePatches); });
};


/***/ }),

/***/ "./node_modules/awesome-qr/lib/gifuct-js/lzw.js":
/*!******************************************************!*\
  !*** ./node_modules/awesome-qr/lib/gifuct-js/lzw.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

/**
 * javascript port of java LZW decompression
 * Original java author url: https://gist.github.com/devunwired/4479231
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.lzw = void 0;
exports.lzw = function (minCodeSize, data, pixelCount) {
    var MAX_STACK_SIZE = 4096;
    var nullCode = -1;
    var npix = pixelCount;
    var available, clear, code_mask, code_size, end_of_information, in_code, old_code, bits, code, i, datum, data_size, first, top, bi, pi;
    var dstPixels = new Array(pixelCount);
    var prefix = new Array(MAX_STACK_SIZE);
    var suffix = new Array(MAX_STACK_SIZE);
    var pixelStack = new Array(MAX_STACK_SIZE + 1);
    // Initialize GIF data stream decoder.
    data_size = minCodeSize;
    clear = 1 << data_size;
    end_of_information = clear + 1;
    available = clear + 2;
    old_code = nullCode;
    code_size = data_size + 1;
    code_mask = (1 << code_size) - 1;
    for (code = 0; code < clear; code++) {
        prefix[code] = 0;
        suffix[code] = code;
    }
    // Decode GIF pixel stream.
    var datum, bits, count, first, top, pi, bi;
    datum = bits = count = first = top = pi = bi = 0;
    for (i = 0; i < npix;) {
        if (top === 0) {
            if (bits < code_size) {
                // get the next byte
                datum += data[bi] << bits;
                bits += 8;
                bi++;
                continue;
            }
            // Get the next code.
            code = datum & code_mask;
            datum >>= code_size;
            bits -= code_size;
            // Interpret the code
            if (code > available || code == end_of_information) {
                break;
            }
            if (code == clear) {
                // Reset decoder.
                code_size = data_size + 1;
                code_mask = (1 << code_size) - 1;
                available = clear + 2;
                old_code = nullCode;
                continue;
            }
            if (old_code == nullCode) {
                pixelStack[top++] = suffix[code];
                old_code = code;
                first = code;
                continue;
            }
            in_code = code;
            if (code == available) {
                pixelStack[top++] = first;
                code = old_code;
            }
            while (code > clear) {
                pixelStack[top++] = suffix[code];
                code = prefix[code];
            }
            first = suffix[code] & 0xff;
            pixelStack[top++] = first;
            // add a new string to the table, but only if space is available
            // if not, just continue with current table until a clear code is found
            // (deferred clear code implementation as per GIF spec)
            if (available < MAX_STACK_SIZE) {
                prefix[available] = old_code;
                suffix[available] = first;
                available++;
                if ((available & code_mask) === 0 && available < MAX_STACK_SIZE) {
                    code_size++;
                    code_mask += available;
                }
            }
            old_code = in_code;
        }
        // Pop a pixel off the pixel stack.
        top--;
        dstPixels[pi++] = pixelStack[top];
        i++;
    }
    for (i = pi; i < npix; i++) {
        dstPixels[i] = 0; // clear missing pixels
    }
    return dstPixels;
};


/***/ }),

/***/ "./node_modules/awesome-qr/lib/index.js":
/*!**********************************************!*\
  !*** ./node_modules/awesome-qr/lib/index.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(/*! ./qrcode */ "./node_modules/awesome-qr/lib/qrcode.js"), exports);
var awesome_qr_1 = __webpack_require__(/*! ./awesome-qr */ "./node_modules/awesome-qr/lib/awesome-qr.js");
Object.defineProperty(exports, "AwesomeQR", ({ enumerable: true, get: function () { return awesome_qr_1.AwesomeQR; } }));


/***/ }),

/***/ "./node_modules/awesome-qr/lib/qrcode.js":
/*!***********************************************!*\
  !*** ./node_modules/awesome-qr/lib/qrcode.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
// Re-written in TypeScript by Makito <sumimakito@hotmail.com>
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QRMath = exports.QRUtil = exports.QRMaskPattern = exports.QRErrorCorrectLevel = exports.QRCodeModel = void 0;
function checkQRVersion(version, sText, nCorrectLevel) {
    var length = _getUTF8Length(sText);
    var i = version - 1;
    var nLimit = 0;
    switch (nCorrectLevel) {
        case exports.QRErrorCorrectLevel.L:
            nLimit = QRCodeLimitLength[i][0];
            break;
        case exports.QRErrorCorrectLevel.M:
            nLimit = QRCodeLimitLength[i][1];
            break;
        case exports.QRErrorCorrectLevel.Q:
            nLimit = QRCodeLimitLength[i][2];
            break;
        case exports.QRErrorCorrectLevel.H:
            nLimit = QRCodeLimitLength[i][3];
            break;
    }
    return length <= nLimit;
}
function _getTypeNumber(sText, nCorrectLevel) {
    var nType = 1;
    var length = _getUTF8Length(sText);
    for (var i = 0, len = QRCodeLimitLength.length; i < len; i++) {
        var nLimit = 0;
        switch (nCorrectLevel) {
            case exports.QRErrorCorrectLevel.L:
                nLimit = QRCodeLimitLength[i][0];
                break;
            case exports.QRErrorCorrectLevel.M:
                nLimit = QRCodeLimitLength[i][1];
                break;
            case exports.QRErrorCorrectLevel.Q:
                nLimit = QRCodeLimitLength[i][2];
                break;
            case exports.QRErrorCorrectLevel.H:
                nLimit = QRCodeLimitLength[i][3];
                break;
        }
        if (length <= nLimit) {
            break;
        }
        else {
            nType++;
        }
    }
    if (nType > QRCodeLimitLength.length) {
        throw new Error("Too long data");
    }
    return nType;
}
function _getUTF8Length(sText) {
    var replacedText = encodeURI(sText)
        .toString()
        .replace(/\%[0-9a-fA-F]{2}/g, "a");
    return replacedText.length + (replacedText.length != Number(sText) ? 3 : 0);
}
var QR8bitByte = /** @class */ (function () {
    function QR8bitByte(data) {
        this.mode = QRMode.MODE_8BIT_BYTE;
        this.parsedData = [];
        this.data = data;
        var byteArrays = [];
        // Added to support UTF-8 Characters
        for (var i = 0, l = this.data.length; i < l; i++) {
            var byteArray = [];
            var code = this.data.charCodeAt(i);
            if (code > 0x10000) {
                byteArray[0] = 0xf0 | ((code & 0x1c0000) >>> 18);
                byteArray[1] = 0x80 | ((code & 0x3f000) >>> 12);
                byteArray[2] = 0x80 | ((code & 0xfc0) >>> 6);
                byteArray[3] = 0x80 | (code & 0x3f);
            }
            else if (code > 0x800) {
                byteArray[0] = 0xe0 | ((code & 0xf000) >>> 12);
                byteArray[1] = 0x80 | ((code & 0xfc0) >>> 6);
                byteArray[2] = 0x80 | (code & 0x3f);
            }
            else if (code > 0x80) {
                byteArray[0] = 0xc0 | ((code & 0x7c0) >>> 6);
                byteArray[1] = 0x80 | (code & 0x3f);
            }
            else {
                byteArray[0] = code;
            }
            byteArrays.push(byteArray);
        }
        this.parsedData = Array.prototype.concat.apply([], byteArrays);
        if (this.parsedData.length != this.data.length) {
            this.parsedData.unshift(191);
            this.parsedData.unshift(187);
            this.parsedData.unshift(239);
        }
    }
    QR8bitByte.prototype.getLength = function () {
        return this.parsedData.length;
    };
    QR8bitByte.prototype.write = function (buffer) {
        for (var i = 0, l = this.parsedData.length; i < l; i++) {
            buffer.put(this.parsedData[i], 8);
        }
    };
    return QR8bitByte;
}());
var QRCodeModel = /** @class */ (function () {
    function QRCodeModel(typeNumber, errorCorrectLevel) {
        if (typeNumber === void 0) { typeNumber = -1; }
        if (errorCorrectLevel === void 0) { errorCorrectLevel = exports.QRErrorCorrectLevel.L; }
        this.moduleCount = 0;
        this.dataList = [];
        this.typeNumber = typeNumber;
        this.errorCorrectLevel = errorCorrectLevel;
        this.moduleCount = 0;
        this.dataList = [];
    }
    QRCodeModel.prototype.addData = function (data) {
        if (this.typeNumber <= 0) {
            this.typeNumber = _getTypeNumber(data, this.errorCorrectLevel);
        }
        else if (this.typeNumber > 40) {
            throw new Error("Invalid QR version: " + this.typeNumber);
        }
        else {
            if (!checkQRVersion(this.typeNumber, data, this.errorCorrectLevel)) {
                throw new Error("Data is too long for QR version: " + this.typeNumber);
            }
        }
        var newData = new QR8bitByte(data);
        this.dataList.push(newData);
        this.dataCache = undefined;
    };
    QRCodeModel.prototype.isDark = function (row, col) {
        if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
            throw new Error(row + "," + col);
        }
        return this.modules[row][col];
    };
    QRCodeModel.prototype.getModuleCount = function () {
        return this.moduleCount;
    };
    QRCodeModel.prototype.make = function () {
        this.makeImpl(false, this.getBestMaskPattern());
    };
    QRCodeModel.prototype.makeImpl = function (test, maskPattern) {
        this.moduleCount = this.typeNumber * 4 + 17;
        this.modules = new Array(this.moduleCount);
        for (var row = 0; row < this.moduleCount; row++) {
            this.modules[row] = new Array(this.moduleCount);
            for (var col = 0; col < this.moduleCount; col++) {
                this.modules[row][col] = null;
            }
        }
        this.setupPositionProbePattern(0, 0);
        this.setupPositionProbePattern(this.moduleCount - 7, 0);
        this.setupPositionProbePattern(0, this.moduleCount - 7);
        this.setupPositionAdjustPattern();
        this.setupTimingPattern();
        this.setupTypeInfo(test, maskPattern);
        if (this.typeNumber >= 7) {
            this.setupTypeNumber(test);
        }
        if (this.dataCache == null) {
            this.dataCache = QRCodeModel.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
        }
        this.mapData(this.dataCache, maskPattern);
    };
    QRCodeModel.prototype.setupPositionProbePattern = function (row, col) {
        for (var r = -1; r <= 7; r++) {
            if (row + r <= -1 || this.moduleCount <= row + r)
                continue;
            for (var c = -1; c <= 7; c++) {
                if (col + c <= -1 || this.moduleCount <= col + c)
                    continue;
                if ((0 <= r && r <= 6 && (c == 0 || c == 6)) ||
                    (0 <= c && c <= 6 && (r == 0 || r == 6)) ||
                    (2 <= r && r <= 4 && 2 <= c && c <= 4)) {
                    this.modules[row + r][col + c] = true;
                }
                else {
                    this.modules[row + r][col + c] = false;
                }
            }
        }
    };
    QRCodeModel.prototype.getBestMaskPattern = function () {
        if (Number.isInteger(this.maskPattern) && Object.values(exports.QRMaskPattern).includes(this.maskPattern)) {
            return this.maskPattern;
        }
        var minLostPoint = 0;
        var pattern = 0;
        for (var i = 0; i < 8; i++) {
            this.makeImpl(true, i);
            var lostPoint = QRUtil.getLostPoint(this);
            if (i == 0 || minLostPoint > lostPoint) {
                minLostPoint = lostPoint;
                pattern = i;
            }
        }
        return pattern;
    };
    QRCodeModel.prototype.setupTimingPattern = function () {
        for (var r = 8; r < this.moduleCount - 8; r++) {
            if (this.modules[r][6] != null) {
                continue;
            }
            this.modules[r][6] = r % 2 == 0;
        }
        for (var c = 8; c < this.moduleCount - 8; c++) {
            if (this.modules[6][c] != null) {
                continue;
            }
            this.modules[6][c] = c % 2 == 0;
        }
    };
    QRCodeModel.prototype.setupPositionAdjustPattern = function () {
        var pos = QRUtil.getPatternPosition(this.typeNumber);
        for (var i = 0; i < pos.length; i++) {
            for (var j = 0; j < pos.length; j++) {
                var row = pos[i];
                var col = pos[j];
                if (this.modules[row][col] != null) {
                    continue;
                }
                for (var r = -2; r <= 2; r++) {
                    for (var c = -2; c <= 2; c++) {
                        if (r == -2 || r == 2 || c == -2 || c == 2 || (r == 0 && c == 0)) {
                            this.modules[row + r][col + c] = true;
                        }
                        else {
                            this.modules[row + r][col + c] = false;
                        }
                    }
                }
            }
        }
    };
    QRCodeModel.prototype.setupTypeNumber = function (test) {
        var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
        for (var i = 0; i < 18; i++) {
            var mod = !test && ((bits >> i) & 1) == 1;
            this.modules[Math.floor(i / 3)][(i % 3) + this.moduleCount - 8 - 3] = mod;
        }
        for (var i = 0; i < 18; i++) {
            var mod = !test && ((bits >> i) & 1) == 1;
            this.modules[(i % 3) + this.moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
        }
    };
    QRCodeModel.prototype.setupTypeInfo = function (test, maskPattern) {
        var data = (this.errorCorrectLevel << 3) | maskPattern;
        var bits = QRUtil.getBCHTypeInfo(data);
        for (var i = 0; i < 15; i++) {
            var mod = !test && ((bits >> i) & 1) == 1;
            if (i < 6) {
                this.modules[i][8] = mod;
            }
            else if (i < 8) {
                this.modules[i + 1][8] = mod;
            }
            else {
                this.modules[this.moduleCount - 15 + i][8] = mod;
            }
        }
        for (var i = 0; i < 15; i++) {
            var mod = !test && ((bits >> i) & 1) == 1;
            if (i < 8) {
                this.modules[8][this.moduleCount - i - 1] = mod;
            }
            else if (i < 9) {
                this.modules[8][15 - i - 1 + 1] = mod;
            }
            else {
                this.modules[8][15 - i - 1] = mod;
            }
        }
        this.modules[this.moduleCount - 8][8] = !test;
    };
    QRCodeModel.prototype.mapData = function (data, maskPattern) {
        var inc = -1;
        var row = this.moduleCount - 1;
        var bitIndex = 7;
        var byteIndex = 0;
        for (var col = this.moduleCount - 1; col > 0; col -= 2) {
            if (col == 6)
                col--;
            while (true) {
                for (var c = 0; c < 2; c++) {
                    if (this.modules[row][col - c] == null) {
                        var dark = false;
                        if (byteIndex < data.length) {
                            dark = ((data[byteIndex] >>> bitIndex) & 1) == 1;
                        }
                        var mask = QRUtil.getMask(maskPattern, row, col - c);
                        if (mask) {
                            dark = !dark;
                        }
                        this.modules[row][col - c] = dark;
                        bitIndex--;
                        if (bitIndex == -1) {
                            byteIndex++;
                            bitIndex = 7;
                        }
                    }
                }
                row += inc;
                if (row < 0 || this.moduleCount <= row) {
                    row -= inc;
                    inc = -inc;
                    break;
                }
            }
        }
    };
    QRCodeModel.createData = function (typeNumber, errorCorrectLevel, dataList) {
        var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
        var buffer = new QRBitBuffer();
        for (var i = 0; i < dataList.length; i++) {
            var data = dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
        }
        var totalDataCount = 0;
        for (var i = 0; i < rsBlocks.length; i++) {
            totalDataCount += rsBlocks[i].dataCount;
        }
        if (buffer.getLengthInBits() > totalDataCount * 8) {
            throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
        }
        if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
            buffer.put(0, 4);
        }
        while (buffer.getLengthInBits() % 8 != 0) {
            buffer.putBit(false);
        }
        while (true) {
            if (buffer.getLengthInBits() >= totalDataCount * 8) {
                break;
            }
            buffer.put(QRCodeModel.PAD0, 8);
            if (buffer.getLengthInBits() >= totalDataCount * 8) {
                break;
            }
            buffer.put(QRCodeModel.PAD1, 8);
        }
        return QRCodeModel.createBytes(buffer, rsBlocks);
    };
    QRCodeModel.createBytes = function (buffer, rsBlocks) {
        var offset = 0;
        var maxDcCount = 0;
        var maxEcCount = 0;
        var dcdata = new Array(rsBlocks.length);
        var ecdata = new Array(rsBlocks.length);
        for (var r = 0; r < rsBlocks.length; r++) {
            var dcCount = rsBlocks[r].dataCount;
            var ecCount = rsBlocks[r].totalCount - dcCount;
            maxDcCount = Math.max(maxDcCount, dcCount);
            maxEcCount = Math.max(maxEcCount, ecCount);
            dcdata[r] = new Array(dcCount);
            for (var i = 0; i < dcdata[r].length; i++) {
                dcdata[r][i] = 0xff & buffer.buffer[i + offset];
            }
            offset += dcCount;
            var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
            var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
            var modPoly = rawPoly.mod(rsPoly);
            ecdata[r] = new Array(rsPoly.getLength() - 1);
            for (var i = 0; i < ecdata[r].length; i++) {
                var modIndex = i + modPoly.getLength() - ecdata[r].length;
                ecdata[r][i] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
            }
        }
        var totalCodeCount = 0;
        for (var i = 0; i < rsBlocks.length; i++) {
            totalCodeCount += rsBlocks[i].totalCount;
        }
        var data = new Array(totalCodeCount);
        var index = 0;
        for (var i = 0; i < maxDcCount; i++) {
            for (var r = 0; r < rsBlocks.length; r++) {
                if (i < dcdata[r].length) {
                    data[index++] = dcdata[r][i];
                }
            }
        }
        for (var i = 0; i < maxEcCount; i++) {
            for (var r = 0; r < rsBlocks.length; r++) {
                if (i < ecdata[r].length) {
                    data[index++] = ecdata[r][i];
                }
            }
        }
        return data;
    };
    QRCodeModel.PAD0 = 0xec;
    QRCodeModel.PAD1 = 0x11;
    return QRCodeModel;
}());
exports.QRCodeModel = QRCodeModel;
exports.QRErrorCorrectLevel = { L: 1, M: 0, Q: 3, H: 2 };
var QRMode = { MODE_NUMBER: 1 << 0, MODE_ALPHA_NUM: 1 << 1, MODE_8BIT_BYTE: 1 << 2, MODE_KANJI: 1 << 3 };
exports.QRMaskPattern = {
    PATTERN000: 0,
    PATTERN001: 1,
    PATTERN010: 2,
    PATTERN011: 3,
    PATTERN100: 4,
    PATTERN101: 5,
    PATTERN110: 6,
    PATTERN111: 7,
};
var QRUtil = /** @class */ (function () {
    function QRUtil() {
    }
    QRUtil.getBCHTypeInfo = function (data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
            d ^= QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15));
        }
        return ((data << 10) | d) ^ QRUtil.G15_MASK;
    };
    QRUtil.getBCHTypeNumber = function (data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
            d ^= QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18));
        }
        return (data << 12) | d;
    };
    QRUtil.getBCHDigit = function (data) {
        var digit = 0;
        while (data != 0) {
            digit++;
            data >>>= 1;
        }
        return digit;
    };
    QRUtil.getPatternPosition = function (typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    };
    QRUtil.getMask = function (maskPattern, i, j) {
        switch (maskPattern) {
            case exports.QRMaskPattern.PATTERN000:
                return (i + j) % 2 == 0;
            case exports.QRMaskPattern.PATTERN001:
                return i % 2 == 0;
            case exports.QRMaskPattern.PATTERN010:
                return j % 3 == 0;
            case exports.QRMaskPattern.PATTERN011:
                return (i + j) % 3 == 0;
            case exports.QRMaskPattern.PATTERN100:
                return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;
            case exports.QRMaskPattern.PATTERN101:
                return ((i * j) % 2) + ((i * j) % 3) == 0;
            case exports.QRMaskPattern.PATTERN110:
                return (((i * j) % 2) + ((i * j) % 3)) % 2 == 0;
            case exports.QRMaskPattern.PATTERN111:
                return (((i * j) % 3) + ((i + j) % 2)) % 2 == 0;
            default:
                throw new Error("bad maskPattern:" + maskPattern);
        }
    };
    QRUtil.getErrorCorrectPolynomial = function (errorCorrectLength) {
        var a = new QRPolynomial([1], 0);
        for (var i = 0; i < errorCorrectLength; i++) {
            a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
        }
        return a;
    };
    QRUtil.getLengthInBits = function (mode, type) {
        if (1 <= type && type < 10) {
            switch (mode) {
                case QRMode.MODE_NUMBER:
                    return 10;
                case QRMode.MODE_ALPHA_NUM:
                    return 9;
                case QRMode.MODE_8BIT_BYTE:
                    return 8;
                case QRMode.MODE_KANJI:
                    return 8;
                default:
                    throw new Error("mode:" + mode);
            }
        }
        else if (type < 27) {
            switch (mode) {
                case QRMode.MODE_NUMBER:
                    return 12;
                case QRMode.MODE_ALPHA_NUM:
                    return 11;
                case QRMode.MODE_8BIT_BYTE:
                    return 16;
                case QRMode.MODE_KANJI:
                    return 10;
                default:
                    throw new Error("mode:" + mode);
            }
        }
        else if (type < 41) {
            switch (mode) {
                case QRMode.MODE_NUMBER:
                    return 14;
                case QRMode.MODE_ALPHA_NUM:
                    return 13;
                case QRMode.MODE_8BIT_BYTE:
                    return 16;
                case QRMode.MODE_KANJI:
                    return 12;
                default:
                    throw new Error("mode:" + mode);
            }
        }
        else {
            throw new Error("type:" + type);
        }
    };
    QRUtil.getLostPoint = function (qrCode) {
        var moduleCount = qrCode.getModuleCount();
        var lostPoint = 0;
        for (var row = 0; row < moduleCount; row++) {
            for (var col = 0; col < moduleCount; col++) {
                var sameCount = 0;
                var dark = qrCode.isDark(row, col);
                for (var r = -1; r <= 1; r++) {
                    if (row + r < 0 || moduleCount <= row + r) {
                        continue;
                    }
                    for (var c = -1; c <= 1; c++) {
                        if (col + c < 0 || moduleCount <= col + c) {
                            continue;
                        }
                        if (r == 0 && c == 0) {
                            continue;
                        }
                        if (dark == qrCode.isDark(row + r, col + c)) {
                            sameCount++;
                        }
                    }
                }
                if (sameCount > 5) {
                    lostPoint += 3 + sameCount - 5;
                }
            }
        }
        for (var row = 0; row < moduleCount - 1; row++) {
            for (var col = 0; col < moduleCount - 1; col++) {
                var count = 0;
                if (qrCode.isDark(row, col))
                    count++;
                if (qrCode.isDark(row + 1, col))
                    count++;
                if (qrCode.isDark(row, col + 1))
                    count++;
                if (qrCode.isDark(row + 1, col + 1))
                    count++;
                if (count == 0 || count == 4) {
                    lostPoint += 3;
                }
            }
        }
        for (var row = 0; row < moduleCount; row++) {
            for (var col = 0; col < moduleCount - 6; col++) {
                if (qrCode.isDark(row, col) &&
                    !qrCode.isDark(row, col + 1) &&
                    qrCode.isDark(row, col + 2) &&
                    qrCode.isDark(row, col + 3) &&
                    qrCode.isDark(row, col + 4) &&
                    !qrCode.isDark(row, col + 5) &&
                    qrCode.isDark(row, col + 6)) {
                    lostPoint += 40;
                }
            }
        }
        for (var col = 0; col < moduleCount; col++) {
            for (var row = 0; row < moduleCount - 6; row++) {
                if (qrCode.isDark(row, col) &&
                    !qrCode.isDark(row + 1, col) &&
                    qrCode.isDark(row + 2, col) &&
                    qrCode.isDark(row + 3, col) &&
                    qrCode.isDark(row + 4, col) &&
                    !qrCode.isDark(row + 5, col) &&
                    qrCode.isDark(row + 6, col)) {
                    lostPoint += 40;
                }
            }
        }
        var darkCount = 0;
        for (var col = 0; col < moduleCount; col++) {
            for (var row = 0; row < moduleCount; row++) {
                if (qrCode.isDark(row, col)) {
                    darkCount++;
                }
            }
        }
        var ratio = Math.abs((100 * darkCount) / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;
        return lostPoint;
    };
    QRUtil.PATTERN_POSITION_TABLE = [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170],
    ];
    QRUtil.G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
    QRUtil.G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
    QRUtil.G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);
    return QRUtil;
}());
exports.QRUtil = QRUtil;
var QRMath = /** @class */ (function () {
    function QRMath() {
    }
    QRMath.glog = function (n) {
        if (n < 1) {
            throw new Error("glog(" + n + ")");
        }
        return QRMath.LOG_TABLE[n];
    };
    QRMath.gexp = function (n) {
        while (n < 0) {
            n += 255;
        }
        while (n >= 256) {
            n -= 255;
        }
        return QRMath.EXP_TABLE[n];
    };
    QRMath.EXP_TABLE = new Array(256);
    QRMath.LOG_TABLE = new Array(256);
    QRMath._constructor = (function () {
        for (var i = 0; i < 8; i++) {
            QRMath.EXP_TABLE[i] = 1 << i;
        }
        for (var i = 8; i < 256; i++) {
            QRMath.EXP_TABLE[i] =
                QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
        }
        for (var i = 0; i < 255; i++) {
            QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
        }
    })();
    return QRMath;
}());
exports.QRMath = QRMath;
var QRPolynomial = /** @class */ (function () {
    function QRPolynomial(num, shift) {
        if (num.length == undefined) {
            throw new Error(num.length + "/" + shift);
        }
        var offset = 0;
        while (offset < num.length && num[offset] == 0) {
            offset++;
        }
        this.num = new Array(num.length - offset + shift);
        for (var i = 0; i < num.length - offset; i++) {
            this.num[i] = num[i + offset];
        }
    }
    QRPolynomial.prototype.get = function (index) {
        return this.num[index];
    };
    QRPolynomial.prototype.getLength = function () {
        return this.num.length;
    };
    QRPolynomial.prototype.multiply = function (e) {
        var num = new Array(this.getLength() + e.getLength() - 1);
        for (var i = 0; i < this.getLength(); i++) {
            for (var j = 0; j < e.getLength(); j++) {
                num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i)) + QRMath.glog(e.get(j)));
            }
        }
        return new QRPolynomial(num, 0);
    };
    QRPolynomial.prototype.mod = function (e) {
        if (this.getLength() - e.getLength() < 0) {
            return this;
        }
        var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
        var num = new Array(this.getLength());
        for (var i = 0; i < this.getLength(); i++) {
            num[i] = this.get(i);
        }
        for (var i = 0; i < e.getLength(); i++) {
            num[i] ^= QRMath.gexp(QRMath.glog(e.get(i)) + ratio);
        }
        return new QRPolynomial(num, 0).mod(e);
    };
    return QRPolynomial;
}());
var QRRSBlock = /** @class */ (function () {
    function QRRSBlock(totalCount, dataCount) {
        this.totalCount = totalCount;
        this.dataCount = dataCount;
    }
    QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
        var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
        if (rsBlock == undefined) {
            throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
        }
        var length = rsBlock.length / 3;
        var list = [];
        for (var i = 0; i < length; i++) {
            var count = rsBlock[i * 3 + 0];
            var totalCount = rsBlock[i * 3 + 1];
            var dataCount = rsBlock[i * 3 + 2];
            for (var j = 0; j < count; j++) {
                list.push(new QRRSBlock(totalCount, dataCount));
            }
        }
        return list;
    };
    QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
        switch (errorCorrectLevel) {
            case exports.QRErrorCorrectLevel.L:
                return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
            case exports.QRErrorCorrectLevel.M:
                return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
            case exports.QRErrorCorrectLevel.Q:
                return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
            case exports.QRErrorCorrectLevel.H:
                return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
            default:
                return undefined;
        }
    };
    QRRSBlock.RS_BLOCK_TABLE = [
        [1, 26, 19],
        [1, 26, 16],
        [1, 26, 13],
        [1, 26, 9],
        [1, 44, 34],
        [1, 44, 28],
        [1, 44, 22],
        [1, 44, 16],
        [1, 70, 55],
        [1, 70, 44],
        [2, 35, 17],
        [2, 35, 13],
        [1, 100, 80],
        [2, 50, 32],
        [2, 50, 24],
        [4, 25, 9],
        [1, 134, 108],
        [2, 67, 43],
        [2, 33, 15, 2, 34, 16],
        [2, 33, 11, 2, 34, 12],
        [2, 86, 68],
        [4, 43, 27],
        [4, 43, 19],
        [4, 43, 15],
        [2, 98, 78],
        [4, 49, 31],
        [2, 32, 14, 4, 33, 15],
        [4, 39, 13, 1, 40, 14],
        [2, 121, 97],
        [2, 60, 38, 2, 61, 39],
        [4, 40, 18, 2, 41, 19],
        [4, 40, 14, 2, 41, 15],
        [2, 146, 116],
        [3, 58, 36, 2, 59, 37],
        [4, 36, 16, 4, 37, 17],
        [4, 36, 12, 4, 37, 13],
        [2, 86, 68, 2, 87, 69],
        [4, 69, 43, 1, 70, 44],
        [6, 43, 19, 2, 44, 20],
        [6, 43, 15, 2, 44, 16],
        [4, 101, 81],
        [1, 80, 50, 4, 81, 51],
        [4, 50, 22, 4, 51, 23],
        [3, 36, 12, 8, 37, 13],
        [2, 116, 92, 2, 117, 93],
        [6, 58, 36, 2, 59, 37],
        [4, 46, 20, 6, 47, 21],
        [7, 42, 14, 4, 43, 15],
        [4, 133, 107],
        [8, 59, 37, 1, 60, 38],
        [8, 44, 20, 4, 45, 21],
        [12, 33, 11, 4, 34, 12],
        [3, 145, 115, 1, 146, 116],
        [4, 64, 40, 5, 65, 41],
        [11, 36, 16, 5, 37, 17],
        [11, 36, 12, 5, 37, 13],
        [5, 109, 87, 1, 110, 88],
        [5, 65, 41, 5, 66, 42],
        [5, 54, 24, 7, 55, 25],
        [11, 36, 12],
        [5, 122, 98, 1, 123, 99],
        [7, 73, 45, 3, 74, 46],
        [15, 43, 19, 2, 44, 20],
        [3, 45, 15, 13, 46, 16],
        [1, 135, 107, 5, 136, 108],
        [10, 74, 46, 1, 75, 47],
        [1, 50, 22, 15, 51, 23],
        [2, 42, 14, 17, 43, 15],
        [5, 150, 120, 1, 151, 121],
        [9, 69, 43, 4, 70, 44],
        [17, 50, 22, 1, 51, 23],
        [2, 42, 14, 19, 43, 15],
        [3, 141, 113, 4, 142, 114],
        [3, 70, 44, 11, 71, 45],
        [17, 47, 21, 4, 48, 22],
        [9, 39, 13, 16, 40, 14],
        [3, 135, 107, 5, 136, 108],
        [3, 67, 41, 13, 68, 42],
        [15, 54, 24, 5, 55, 25],
        [15, 43, 15, 10, 44, 16],
        [4, 144, 116, 4, 145, 117],
        [17, 68, 42],
        [17, 50, 22, 6, 51, 23],
        [19, 46, 16, 6, 47, 17],
        [2, 139, 111, 7, 140, 112],
        [17, 74, 46],
        [7, 54, 24, 16, 55, 25],
        [34, 37, 13],
        [4, 151, 121, 5, 152, 122],
        [4, 75, 47, 14, 76, 48],
        [11, 54, 24, 14, 55, 25],
        [16, 45, 15, 14, 46, 16],
        [6, 147, 117, 4, 148, 118],
        [6, 73, 45, 14, 74, 46],
        [11, 54, 24, 16, 55, 25],
        [30, 46, 16, 2, 47, 17],
        [8, 132, 106, 4, 133, 107],
        [8, 75, 47, 13, 76, 48],
        [7, 54, 24, 22, 55, 25],
        [22, 45, 15, 13, 46, 16],
        [10, 142, 114, 2, 143, 115],
        [19, 74, 46, 4, 75, 47],
        [28, 50, 22, 6, 51, 23],
        [33, 46, 16, 4, 47, 17],
        [8, 152, 122, 4, 153, 123],
        [22, 73, 45, 3, 74, 46],
        [8, 53, 23, 26, 54, 24],
        [12, 45, 15, 28, 46, 16],
        [3, 147, 117, 10, 148, 118],
        [3, 73, 45, 23, 74, 46],
        [4, 54, 24, 31, 55, 25],
        [11, 45, 15, 31, 46, 16],
        [7, 146, 116, 7, 147, 117],
        [21, 73, 45, 7, 74, 46],
        [1, 53, 23, 37, 54, 24],
        [19, 45, 15, 26, 46, 16],
        [5, 145, 115, 10, 146, 116],
        [19, 75, 47, 10, 76, 48],
        [15, 54, 24, 25, 55, 25],
        [23, 45, 15, 25, 46, 16],
        [13, 145, 115, 3, 146, 116],
        [2, 74, 46, 29, 75, 47],
        [42, 54, 24, 1, 55, 25],
        [23, 45, 15, 28, 46, 16],
        [17, 145, 115],
        [10, 74, 46, 23, 75, 47],
        [10, 54, 24, 35, 55, 25],
        [19, 45, 15, 35, 46, 16],
        [17, 145, 115, 1, 146, 116],
        [14, 74, 46, 21, 75, 47],
        [29, 54, 24, 19, 55, 25],
        [11, 45, 15, 46, 46, 16],
        [13, 145, 115, 6, 146, 116],
        [14, 74, 46, 23, 75, 47],
        [44, 54, 24, 7, 55, 25],
        [59, 46, 16, 1, 47, 17],
        [12, 151, 121, 7, 152, 122],
        [12, 75, 47, 26, 76, 48],
        [39, 54, 24, 14, 55, 25],
        [22, 45, 15, 41, 46, 16],
        [6, 151, 121, 14, 152, 122],
        [6, 75, 47, 34, 76, 48],
        [46, 54, 24, 10, 55, 25],
        [2, 45, 15, 64, 46, 16],
        [17, 152, 122, 4, 153, 123],
        [29, 74, 46, 14, 75, 47],
        [49, 54, 24, 10, 55, 25],
        [24, 45, 15, 46, 46, 16],
        [4, 152, 122, 18, 153, 123],
        [13, 74, 46, 32, 75, 47],
        [48, 54, 24, 14, 55, 25],
        [42, 45, 15, 32, 46, 16],
        [20, 147, 117, 4, 148, 118],
        [40, 75, 47, 7, 76, 48],
        [43, 54, 24, 22, 55, 25],
        [10, 45, 15, 67, 46, 16],
        [19, 148, 118, 6, 149, 119],
        [18, 75, 47, 31, 76, 48],
        [34, 54, 24, 34, 55, 25],
        [20, 45, 15, 61, 46, 16],
    ];
    return QRRSBlock;
}());
var QRBitBuffer = /** @class */ (function () {
    function QRBitBuffer() {
        this.buffer = [];
        this.length = 0;
    }
    QRBitBuffer.prototype.get = function (index) {
        var bufIndex = Math.floor(index / 8);
        return ((this.buffer[bufIndex] >>> (7 - (index % 8))) & 1) == 1;
    };
    QRBitBuffer.prototype.put = function (num, length) {
        for (var i = 0; i < length; i++) {
            this.putBit(((num >>> (length - i - 1)) & 1) == 1);
        }
    };
    QRBitBuffer.prototype.getLengthInBits = function () {
        return this.length;
    };
    QRBitBuffer.prototype.putBit = function (bit) {
        var bufIndex = Math.floor(this.length / 8);
        if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
        }
        if (bit) {
            this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
        }
        this.length++;
    };
    return QRBitBuffer;
}());
var QRCodeLimitLength = [
    [17, 14, 11, 7],
    [32, 26, 20, 14],
    [53, 42, 32, 24],
    [78, 62, 46, 34],
    [106, 84, 60, 44],
    [134, 106, 74, 58],
    [154, 122, 86, 64],
    [192, 152, 108, 84],
    [230, 180, 130, 98],
    [271, 213, 151, 119],
    [321, 251, 177, 137],
    [367, 287, 203, 155],
    [425, 331, 241, 177],
    [458, 362, 258, 194],
    [520, 412, 292, 220],
    [586, 450, 322, 250],
    [644, 504, 364, 280],
    [718, 560, 394, 310],
    [792, 624, 442, 338],
    [858, 666, 482, 382],
    [929, 711, 509, 403],
    [1003, 779, 565, 439],
    [1091, 857, 611, 461],
    [1171, 911, 661, 511],
    [1273, 997, 715, 535],
    [1367, 1059, 751, 593],
    [1465, 1125, 805, 625],
    [1528, 1190, 868, 658],
    [1628, 1264, 908, 698],
    [1732, 1370, 982, 742],
    [1840, 1452, 1030, 790],
    [1952, 1538, 1112, 842],
    [2068, 1628, 1168, 898],
    [2188, 1722, 1228, 958],
    [2303, 1809, 1283, 983],
    [2431, 1911, 1351, 1051],
    [2563, 1989, 1423, 1093],
    [2699, 2099, 1499, 1139],
    [2809, 2213, 1579, 1219],
    [2953, 2331, 1663, 1273],
];


/***/ }),

/***/ "./node_modules/canvas/browser.js":
/*!****************************************!*\
  !*** ./node_modules/canvas/browser.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* globals document, ImageData */

const parseFont = __webpack_require__(/*! ./lib/parse-font */ "./node_modules/canvas/lib/parse-font.js")

exports.parseFont = parseFont

exports.createCanvas = function (width, height) {
  return Object.assign(document.createElement('canvas'), { width: width, height: height })
}

exports.createImageData = function (array, width, height) {
  // Browser implementation of ImageData looks at the number of arguments passed
  switch (arguments.length) {
    case 0: return new ImageData()
    case 1: return new ImageData(array)
    case 2: return new ImageData(array, width)
    default: return new ImageData(array, width, height)
  }
}

exports.loadImage = function (src, options) {
  return new Promise(function (resolve, reject) {
    const image = Object.assign(document.createElement('img'), options)

    function cleanup () {
      image.onload = null
      image.onerror = null
    }

    image.onload = function () { cleanup(); resolve(image) }
    image.onerror = function () { cleanup(); reject(new Error('Failed to load the image "' + src + '"')) }

    image.src = src
  })
}


/***/ }),

/***/ "./node_modules/canvas/lib/parse-font.js":
/*!***********************************************!*\
  !*** ./node_modules/canvas/lib/parse-font.js ***!
  \***********************************************/
/***/ ((module) => {

"use strict";


/**
 * Font RegExp helpers.
 */

const weights = 'bold|bolder|lighter|[1-9]00'
  , styles = 'italic|oblique'
  , variants = 'small-caps'
  , stretches = 'ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded'
  , units = 'px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q'
  , string = '\'([^\']+)\'|"([^"]+)"|[\\w\\s-]+'

// [ [ <‘font-style’> || <font-variant-css21> || <‘font-weight’> || <‘font-stretch’> ]?
//    <‘font-size’> [ / <‘line-height’> ]? <‘font-family’> ]
// https://drafts.csswg.org/css-fonts-3/#font-prop
const weightRe = new RegExp('(' + weights + ') +', 'i')
const styleRe = new RegExp('(' + styles + ') +', 'i')
const variantRe = new RegExp('(' + variants + ') +', 'i')
const stretchRe = new RegExp('(' + stretches + ') +', 'i')
const sizeFamilyRe = new RegExp(
  '([\\d\\.]+)(' + units + ') *'
  + '((?:' + string + ')( *, *(?:' + string + '))*)')

/**
 * Cache font parsing.
 */

const cache = {}

const defaultHeight = 16 // pt, common browser default

/**
 * Parse font `str`.
 *
 * @param {String} str
 * @return {Object} Parsed font. `size` is in device units. `unit` is the unit
 *   appearing in the input string.
 * @api private
 */

module.exports = function (str) {
  // Cached
  if (cache[str]) return cache[str]

  // Try for required properties first.
  const sizeFamily = sizeFamilyRe.exec(str)
  if (!sizeFamily) return // invalid

  // Default values and required properties
  const font = {
    weight: 'normal',
    style: 'normal',
    stretch: 'normal',
    variant: 'normal',
    size: parseFloat(sizeFamily[1]),
    unit: sizeFamily[2],
    family: sizeFamily[3].replace(/["']/g, '').replace(/ *, */g, ',')
  }

  // Optional, unordered properties.
  let weight, style, variant, stretch
  // Stop search at `sizeFamily.index`
  let substr = str.substring(0, sizeFamily.index)
  if ((weight = weightRe.exec(substr))) font.weight = weight[1]
  if ((style = styleRe.exec(substr))) font.style = style[1]
  if ((variant = variantRe.exec(substr))) font.variant = variant[1]
  if ((stretch = stretchRe.exec(substr))) font.stretch = stretch[1]

  // Convert to device units. (`font.unit` is the original unit)
  // TODO: ch, ex
  switch (font.unit) {
    case 'pt':
      font.size /= 0.75
      break
    case 'pc':
      font.size *= 16
      break
    case 'in':
      font.size *= 96
      break
    case 'cm':
      font.size *= 96.0 / 2.54
      break
    case 'mm':
      font.size *= 96.0 / 25.4
      break
    case '%':
      // TODO disabled because existing unit tests assume 100
      // font.size *= defaultHeight / 100 / 0.75
      break
    case 'em':
    case 'rem':
      font.size *= defaultHeight / 0.75
      break
    case 'q':
      font.size *= 96 / 25.4 / 4
      break
  }

  return (cache[str] = font)
}


/***/ }),

/***/ "./node_modules/js-binary-schema-parser/lib/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/js-binary-schema-parser/lib/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.loop = exports.conditional = exports.parse = void 0;

var parse = function parse(stream, schema) {
  var result = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var parent = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : result;

  if (Array.isArray(schema)) {
    schema.forEach(function (partSchema) {
      return parse(stream, partSchema, result, parent);
    });
  } else if (typeof schema === 'function') {
    schema(stream, result, parent, parse);
  } else {
    var key = Object.keys(schema)[0];

    if (Array.isArray(schema[key])) {
      parent[key] = {};
      parse(stream, schema[key], result, parent[key]);
    } else {
      parent[key] = schema[key](stream, result, parent, parse);
    }
  }

  return result;
};

exports.parse = parse;

var conditional = function conditional(schema, conditionFunc) {
  return function (stream, result, parent, parse) {
    if (conditionFunc(stream, result, parent)) {
      parse(stream, schema, result, parent);
    }
  };
};

exports.conditional = conditional;

var loop = function loop(schema, continueFunc) {
  return function (stream, result, parent, parse) {
    var arr = [];

    while (continueFunc(stream, result, parent)) {
      var newParent = {};
      parse(stream, schema, result, newParent);
      arr.push(newParent);
    }

    return arr;
  };
};

exports.loop = loop;

/***/ }),

/***/ "./node_modules/js-binary-schema-parser/lib/parsers/uint8.js":
/*!*******************************************************************!*\
  !*** ./node_modules/js-binary-schema-parser/lib/parsers/uint8.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.readBits = exports.readArray = exports.readUnsigned = exports.readString = exports.peekBytes = exports.readBytes = exports.peekByte = exports.readByte = exports.buildStream = void 0;

// Default stream and parsers for Uint8TypedArray data type
var buildStream = function buildStream(uint8Data) {
  return {
    data: uint8Data,
    pos: 0
  };
};

exports.buildStream = buildStream;

var readByte = function readByte() {
  return function (stream) {
    return stream.data[stream.pos++];
  };
};

exports.readByte = readByte;

var peekByte = function peekByte() {
  var offset = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return function (stream) {
    return stream.data[stream.pos + offset];
  };
};

exports.peekByte = peekByte;

var readBytes = function readBytes(length) {
  return function (stream) {
    return stream.data.subarray(stream.pos, stream.pos += length);
  };
};

exports.readBytes = readBytes;

var peekBytes = function peekBytes(length) {
  return function (stream) {
    return stream.data.subarray(stream.pos, stream.pos + length);
  };
};

exports.peekBytes = peekBytes;

var readString = function readString(length) {
  return function (stream) {
    return Array.from(readBytes(length)(stream)).map(function (value) {
      return String.fromCharCode(value);
    }).join('');
  };
};

exports.readString = readString;

var readUnsigned = function readUnsigned(littleEndian) {
  return function (stream) {
    var bytes = readBytes(2)(stream);
    return littleEndian ? (bytes[1] << 8) + bytes[0] : (bytes[0] << 8) + bytes[1];
  };
};

exports.readUnsigned = readUnsigned;

var readArray = function readArray(byteSize, totalOrFunc) {
  return function (stream, result, parent) {
    var total = typeof totalOrFunc === 'function' ? totalOrFunc(stream, result, parent) : totalOrFunc;
    var parser = readBytes(byteSize);
    var arr = new Array(total);

    for (var i = 0; i < total; i++) {
      arr[i] = parser(stream);
    }

    return arr;
  };
};

exports.readArray = readArray;

var subBitsTotal = function subBitsTotal(bits, startIndex, length) {
  var result = 0;

  for (var i = 0; i < length; i++) {
    result += bits[startIndex + i] && Math.pow(2, length - i - 1);
  }

  return result;
};

var readBits = function readBits(schema) {
  return function (stream) {
    var _byte = readByte()(stream); // convert the byte to bit array


    var bits = new Array(8);

    for (var i = 0; i < 8; i++) {
      bits[7 - i] = !!(_byte & 1 << i);
    } // convert the bit array to values based on the schema


    return Object.keys(schema).reduce(function (res, key) {
      var def = schema[key];

      if (def.length) {
        res[key] = subBitsTotal(bits, def.index, def.length);
      } else {
        res[key] = bits[def.index];
      }

      return res;
    }, {});
  };
};

exports.readBits = readBits;

/***/ }),

/***/ "./node_modules/js-binary-schema-parser/lib/schemas/gif.js":
/*!*****************************************************************!*\
  !*** ./node_modules/js-binary-schema-parser/lib/schemas/gif.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.default = void 0;

var _ = __webpack_require__(/*! ../ */ "./node_modules/js-binary-schema-parser/lib/index.js");

var _uint = __webpack_require__(/*! ../parsers/uint8 */ "./node_modules/js-binary-schema-parser/lib/parsers/uint8.js");

// a set of 0x00 terminated subblocks
var subBlocksSchema = {
  blocks: function blocks(stream) {
    var terminator = 0x00;
    var chunks = [];
    var streamSize = stream.data.length;
    var total = 0;

    for (var size = (0, _uint.readByte)()(stream); size !== terminator; size = (0, _uint.readByte)()(stream)) {
      // catch corrupted files with no terminator
      if (stream.pos + size >= streamSize) {
        var availableSize = streamSize - stream.pos;
        chunks.push((0, _uint.readBytes)(availableSize)(stream));
        total += availableSize;
        break;
      }

      chunks.push((0, _uint.readBytes)(size)(stream));
      total += size;
    }

    var result = new Uint8Array(total);
    var offset = 0;

    for (var i = 0; i < chunks.length; i++) {
      result.set(chunks[i], offset);
      offset += chunks[i].length;
    }

    return result;
  }
}; // global control extension

var gceSchema = (0, _.conditional)({
  gce: [{
    codes: (0, _uint.readBytes)(2)
  }, {
    byteSize: (0, _uint.readByte)()
  }, {
    extras: (0, _uint.readBits)({
      future: {
        index: 0,
        length: 3
      },
      disposal: {
        index: 3,
        length: 3
      },
      userInput: {
        index: 6
      },
      transparentColorGiven: {
        index: 7
      }
    })
  }, {
    delay: (0, _uint.readUnsigned)(true)
  }, {
    transparentColorIndex: (0, _uint.readByte)()
  }, {
    terminator: (0, _uint.readByte)()
  }]
}, function (stream) {
  var codes = (0, _uint.peekBytes)(2)(stream);
  return codes[0] === 0x21 && codes[1] === 0xf9;
}); // image pipeline block

var imageSchema = (0, _.conditional)({
  image: [{
    code: (0, _uint.readByte)()
  }, {
    descriptor: [{
      left: (0, _uint.readUnsigned)(true)
    }, {
      top: (0, _uint.readUnsigned)(true)
    }, {
      width: (0, _uint.readUnsigned)(true)
    }, {
      height: (0, _uint.readUnsigned)(true)
    }, {
      lct: (0, _uint.readBits)({
        exists: {
          index: 0
        },
        interlaced: {
          index: 1
        },
        sort: {
          index: 2
        },
        future: {
          index: 3,
          length: 2
        },
        size: {
          index: 5,
          length: 3
        }
      })
    }]
  }, (0, _.conditional)({
    lct: (0, _uint.readArray)(3, function (stream, result, parent) {
      return Math.pow(2, parent.descriptor.lct.size + 1);
    })
  }, function (stream, result, parent) {
    return parent.descriptor.lct.exists;
  }), {
    data: [{
      minCodeSize: (0, _uint.readByte)()
    }, subBlocksSchema]
  }]
}, function (stream) {
  return (0, _uint.peekByte)()(stream) === 0x2c;
}); // plain text block

var textSchema = (0, _.conditional)({
  text: [{
    codes: (0, _uint.readBytes)(2)
  }, {
    blockSize: (0, _uint.readByte)()
  }, {
    preData: function preData(stream, result, parent) {
      return (0, _uint.readBytes)(parent.text.blockSize)(stream);
    }
  }, subBlocksSchema]
}, function (stream) {
  var codes = (0, _uint.peekBytes)(2)(stream);
  return codes[0] === 0x21 && codes[1] === 0x01;
}); // application block

var applicationSchema = (0, _.conditional)({
  application: [{
    codes: (0, _uint.readBytes)(2)
  }, {
    blockSize: (0, _uint.readByte)()
  }, {
    id: function id(stream, result, parent) {
      return (0, _uint.readString)(parent.blockSize)(stream);
    }
  }, subBlocksSchema]
}, function (stream) {
  var codes = (0, _uint.peekBytes)(2)(stream);
  return codes[0] === 0x21 && codes[1] === 0xff;
}); // comment block

var commentSchema = (0, _.conditional)({
  comment: [{
    codes: (0, _uint.readBytes)(2)
  }, subBlocksSchema]
}, function (stream) {
  var codes = (0, _uint.peekBytes)(2)(stream);
  return codes[0] === 0x21 && codes[1] === 0xfe;
});
var schema = [{
  header: [{
    signature: (0, _uint.readString)(3)
  }, {
    version: (0, _uint.readString)(3)
  }]
}, {
  lsd: [{
    width: (0, _uint.readUnsigned)(true)
  }, {
    height: (0, _uint.readUnsigned)(true)
  }, {
    gct: (0, _uint.readBits)({
      exists: {
        index: 0
      },
      resolution: {
        index: 1,
        length: 3
      },
      sort: {
        index: 4
      },
      size: {
        index: 5,
        length: 3
      }
    })
  }, {
    backgroundColorIndex: (0, _uint.readByte)()
  }, {
    pixelAspectRatio: (0, _uint.readByte)()
  }]
}, (0, _.conditional)({
  gct: (0, _uint.readArray)(3, function (stream, result) {
    return Math.pow(2, result.lsd.gct.size + 1);
  })
}, function (stream, result) {
  return result.lsd.gct.exists;
}), // content frames
{
  frames: (0, _.loop)([gceSchema, applicationSchema, commentSchema, imageSchema, textSchema], function (stream) {
    var nextCode = (0, _uint.peekByte)()(stream); // rather than check for a terminator, we should check for the existence
    // of an ext or image block to avoid infinite loops
    //var terminator = 0x3B;
    //return nextCode !== terminator;

    return nextCode === 0x21 || nextCode === 0x2c;
  })
}];
var _default = schema;
exports.default = _default;

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

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
Object.defineProperty(exports, "__esModule", ({ value: true }));
var awesome_qr_1 = __webpack_require__(/*! awesome-qr */ "./node_modules/awesome-qr/lib/index.js");
var maiar_logo_1 = __webpack_require__(/*! ./maiar-logo */ "./src/maiar-logo.ts");
var url_builder_1 = __webpack_require__(/*! ./url-builder */ "./src/url-builder.ts");
window['MaiarPayments'] = {
    generatePaymentsQR: function (_a) {
        var paymentId = _a.paymentId, paymentRouterAddress = _a.paymentRouterAddress, _b = _a.size, size = _b === void 0 ? 256 : _b, tokenAmount = _a.tokenAmount, tokenIdentifier = _a.tokenIdentifier;
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_c) {
                return [2 /*return*/, new awesome_qr_1.AwesomeQR({
                        text: url_builder_1.buildPaymentUrl({ paymentId: paymentId, paymentRouterAddress: paymentRouterAddress, tokenAmount: tokenAmount, tokenIdentifier: tokenIdentifier }),
                        size: size,
                        logoImage: maiar_logo_1.MAIAR_LOGO
                    }).draw()];
            });
        });
    }
};


/***/ }),

/***/ "./src/maiar-logo.ts":
/*!***************************!*\
  !*** ./src/maiar-logo.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MAIAR_LOGO = void 0;
exports.MAIAR_LOGO = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAACTUExURUdwTA0ysBlEwQ0ysBpFwgEgnhpFwhlEwhhCwBU+uxpFwhlEwhlFwgAgngUlowQlowAfnRE4tQYopRM7uAAfnRpFwgEhnwMjoQ0ysAswrg81sxE4tgcqqBQ9uxM7uQcppgktqhlDwQQlogUnpAYopRdAvgQmowsvrAksqRhCwBY/vQouqwEgnRI6txA3tA40sQYopc0lDiAAAAAVdFJOUwDw/Pny+faADAn08XkQgfCKcm7xkzFGJ54AAAcfSURBVHja1d2JcuI4EAbgZobEdrKQ2c2YQBIOh3AEcrz/261kg/GhoyW1jMUDkK+6/m6rKEcNUQyBfeIIhqGp42gIaWBqZk4hDUvNzRwdkjo35+j0LkrCMCfRXXpGh6I+mU9opo5DyEZhPqNDyHVpLtHpfd/VRQ/W0X1XV8wVNFMnYZir6D7PkKTMcxPd326Ma+Y6uq+Tr2FuoPvZjbU8C9Dp/T9x780tdDrsm7ptbqOZOunv3JCh09s+qWOBWYRO7/qTEKFZiO5PrsVmMbovM0TQgwp0P9QyswzN1ElPs6FAs25M+jfrdOhrq+V1VqGvO0NUZhX6mt0o7UEt+npqtVmNvtYM0Zg16OucnhJVnhHoa8yQWGfWorufIXqzHt11N+ryjEN3q8aYMeguZwjKjEJ3p070eUaju5ohSDMS3Y06Rpqx6C66EW1Go/2rcT1ohvbdjQZmA/Qvr2oTswHaa60TdJ5N0f7UsZHZDO1LbWg2Q2eZlxlilGdTdJZlHx5qbWw2QWccvSFXm5sN0Ln5g1ydGObZBJ2dzZv58N/kumYjdG7ebA6PdOrYxoxFV82Hwz2V2s6MRF/MjHyYz4lqbdGDeHS9zvP5nCYhtmYUumWezxcEamszBi0yL9zViV2ecehmngvz4stRHdub9WhxnRdfX25qF7MWLTe/vDio7fOMQEvMC27+/rZWu5k1aFWdHdSOZjVabWbo54GNOnHJsw7dNi/KbBTmZxt17GpWofV1frZRu5sVaJz558dQTWCWo1Vzo2qeTo3Urj2oQme6uXExG6lJzCq0Nhs/hXm6Q6spsiFF47PBPrPZbPBf0smsU6GxPXg2z44oNVGdxWhj8263Q6jJzCK0jfm40qppelCCtjIfVzo1obmNlp35RbOual4tlWpKcwttW+f9fr98kKsTsjwL0Mbm2anO+/3r60qqjknNDbTpfK6Z2UeiJjbX0U51Zp+lOCGkeW6i3c3v7wI1ubmKNs7Grm1et9X05graNs/7qnm93jbUCXGea2iKbHDz9q2m9mEu0a5z42J+e6qoYx/mM5quzgx9Ufsxn9DGz25FndlnclJ76MELmmRulHVm6M9c7cucox3OG2LzJFd7M3O0JBtGPfheN08+mdpPnvn7EKDJhnGeczNDfw5ufZkHQDjr3irmye9f3sw3YFrnHarOXs0TIO9B/2aGpnumdGWeQGh5Zn/hCZDmGX5uTH5nfs0MTV9nr2b2h96A7tndSTa4eQuB9SA3ryGwHuTmd9i4njeeOje/A22evffgdr1+XwLhGcn/rMvrvHwFg2f3det8Mb9CWHMjN++B5MzfrXkFLr8VdG5e5maODmA+P1XrfDzCwmTWLaXZyDozr447oOnBrLM8H4+7GYQ1N3idZyd0MHOD13k2hUDmRqXO0ykEl41pjnbMRqdzIzf/QCjnjXOemfkZgpl1ZZ2fC3RIeWbmb9BkY39t87ptZujvgGZdYX6BfudZUGcWDQisB7n5C/o5n5XmBYQ1N3Jzge71mf9k/il6kJvnIDAfe3Su29fnRm7m6H7mWTSfT2aGDmpu5OYDBFPni3kD+jpvOzdvlXXebKCvv9cpzB+gmxvba+V5LzXn6H6e+eXmDNQ9WK/zpzfzrbgHZ41ZdzhwM0Pjf+e/+evrxYK7aHyDrnOWAr7ON39Hnl7hGEZxPH7QPlPO5gItNdfrPPL0skx+bS1TY3qQm3M0qgdzsxf16apdptY8U85mjjYxe3gBrLzUmKkx2cjRqGd3aSZXVy5iZmp5nQ8XcwqmZuKXGmsXdSfjB0SdOdrUTKoe1i8XT8YDhDkFxLO7YSbsxtZ11/F4oO7BExrfg+RqwRXdTK01p2CaDcJuFF7hztTiZ3daQ1uYSdSSC9yZWl1njjbMM5laesE/U8t7sEDrzkgjT/+6olhKkEQDVZ052rAHibpRuZIgjh5V5hSU5j8jT/+OpbnafxQ9KswFWtaDarODWruOgKmFc+OCbpqfkGbrbkQsfmAJkdU5R8vmht5sqUYtq2BqmTmFpYvZaoYgl5mwb5aYOdqmBx1qPYzw//osNjO0m9m4Gw1WgsgvgrebG9ZqozUm0iv3nc1GCTFccyNbbrB2NhuojZfcSNZIiOaG8UV+SLXFEiTxwg5BnS0uH0RNPqvFTcLVKM7ZQHej5Soh0RIaGjNCbb3+SLDuZ0tj1ubaYWVTe7FS/cxvb9aonZZjtVZYOfcgSu240Ku5LIzOrFA7L3xrrGUjNEvVw4j2cj0ozQ8ueVbOEJK1abVVg2WdxwRmoZpo1Vt1qSOtWZAQslWAlfWZZzPZxcENNeEiwMuiUmoz/+5bwrkhmiFAbq7Vehj5uNgX+NwYE18qXarJ1y2e1hxz8wjAx3f7WBFZLJSmmxutWntZIZqv7r4Ze1lawNSeFojyJeljT4sWRpGv9aFx9D8UT546WJD27wAAAABJRU5ErkJggg==";


/***/ }),

/***/ "./src/url-builder.ts":
/*!****************************!*\
  !*** ./src/url-builder.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.buildPaymentUrl = void 0;
// const PROTOCOL = 'maiar:'
var PROTOCOL = 'https://localhost:5000/';
var BEGIN_PAYMENT_PATH = 'payment';
var AUTHORIZE_SUBSCRIPTION_PATH = 'subscribe';
var AUTHORIZE_CARD_PATH = 'card';
var buildPaymentUrl = function (_a) {
    var paymentId = _a.paymentId, paymentRouterAddress = _a.paymentRouterAddress, tokenAmount = _a.tokenAmount, tokenIdentifier = _a.tokenIdentifier;
    var params = {
        address: paymentRouterAddress,
        amount: tokenAmount,
        paymentId: paymentId,
        token: tokenIdentifier
    };
    return PROTOCOL + BEGIN_PAYMENT_PATH + '?' + Object.keys(params).map(function (k) { return k + '=' + params[k]; }).join('&');
};
exports.buildPaymentUrl = buildPaymentUrl;


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYXltZW50cy1xci1idWlsZGVyLy4vbm9kZV9tb2R1bGVzL2F3ZXNvbWUtcXIvbGliL2F3ZXNvbWUtcXIuanMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL25vZGVfbW9kdWxlcy9hd2Vzb21lLXFyL2xpYi9naWYuanMvR0lGRW5jb2Rlci5qcyIsIndlYnBhY2s6Ly9wYXltZW50cy1xci1idWlsZGVyLy4vbm9kZV9tb2R1bGVzL2F3ZXNvbWUtcXIvbGliL2dpZi5qcy9MWldFbmNvZGVyLmpzIiwid2VicGFjazovL3BheW1lbnRzLXFyLWJ1aWxkZXIvLi9ub2RlX21vZHVsZXMvYXdlc29tZS1xci9saWIvZ2lmLmpzL1R5cGVkTmV1UXVhbnQuanMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL25vZGVfbW9kdWxlcy9hd2Vzb21lLXFyL2xpYi9naWZ1Y3QtanMvZGVpbnRlcmxhY2UuanMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL25vZGVfbW9kdWxlcy9hd2Vzb21lLXFyL2xpYi9naWZ1Y3QtanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL25vZGVfbW9kdWxlcy9hd2Vzb21lLXFyL2xpYi9naWZ1Y3QtanMvbHp3LmpzIiwid2VicGFjazovL3BheW1lbnRzLXFyLWJ1aWxkZXIvLi9ub2RlX21vZHVsZXMvYXdlc29tZS1xci9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL25vZGVfbW9kdWxlcy9hd2Vzb21lLXFyL2xpYi9xcmNvZGUuanMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL25vZGVfbW9kdWxlcy9jYW52YXMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9wYXltZW50cy1xci1idWlsZGVyLy4vbm9kZV9tb2R1bGVzL2NhbnZhcy9saWIvcGFyc2UtZm9udC5qcyIsIndlYnBhY2s6Ly9wYXltZW50cy1xci1idWlsZGVyLy4vbm9kZV9tb2R1bGVzL2pzLWJpbmFyeS1zY2hlbWEtcGFyc2VyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9wYXltZW50cy1xci1idWlsZGVyLy4vbm9kZV9tb2R1bGVzL2pzLWJpbmFyeS1zY2hlbWEtcGFyc2VyL2xpYi9wYXJzZXJzL3VpbnQ4LmpzIiwid2VicGFjazovL3BheW1lbnRzLXFyLWJ1aWxkZXIvLi9ub2RlX21vZHVsZXMvanMtYmluYXJ5LXNjaGVtYS1wYXJzZXIvbGliL3NjaGVtYXMvZ2lmLmpzIiwid2VicGFjazovL3BheW1lbnRzLXFyLWJ1aWxkZXIvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL3NyYy9tYWlhci1sb2dvLnRzIiwid2VicGFjazovL3BheW1lbnRzLXFyLWJ1aWxkZXIvLi9zcmMvdXJsLWJ1aWxkZXIudHMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wYXltZW50cy1xci1idWlsZGVyL3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYjtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBYSw2QkFBNkIsMEJBQTBCLGFBQWEsRUFBRSxxQkFBcUI7QUFDeEcsZ0JBQWdCLHFEQUFxRCxvRUFBb0UsYUFBYSxFQUFFO0FBQ3hKLHNCQUFzQixzQkFBc0IscUJBQXFCLEdBQUc7QUFDcEU7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MkNBQTJDLHdDQUF3QztBQUNuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLG9DQUFvQztBQUMzRSwyQ0FBMkMsb0NBQW9DO0FBQy9FO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxnQkFBZ0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyxvQ0FBb0M7QUFDdkUsdUNBQXVDLG9DQUFvQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixZQUFZO0FBQy9CO0FBQ0E7QUFDQSx1RkFBdUYsWUFBWTtBQUNuRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0dBQWtHLFdBQVc7QUFDN0csa0NBQWtDLGVBQWU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFD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QixzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixhQUFhO0FBQ3BDO0FBQ0E7QUFDQSx1QkFBdUIsYUFBYTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNB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QzdDO0FBQ0E7QUFDQSx1QkFBdUIsbUJBQW1CO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFlBQVk7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFdBQVc7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFFQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUMsRUFBRTs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBLENBQUMsRUFBRTs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQyxFQUFFOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDLEVBQUU7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQSxlQUFrQixZOzs7Ozs7Ozs7OztBQ3ZOTDtBQUNiO0FBQ0EsMkJBQTJCLCtEQUErRCxnQkFBZ0IsRUFBRSxFQUFFO0FBQzlHO0FBQ0EsbUNBQW1DLE1BQU0sNkJBQTZCLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDakcsa0NBQWtDLE1BQU0saUNBQWlDLEVBQUUsWUFBWSxXQUFXLEVBQUU7QUFDcEcsK0JBQStCLHFGQUFxRjtBQUNwSDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBYSw2QkFBNkIsMEJBQTBCLGFBQWEsRUFBRSxxQkFBcUI7QUFDeEcsZ0JBQWdCLHFEQUFxRCxvRUFBb0UsYUFBYSxFQUFFO0FBQ3hKLHNCQUFzQixzQkFBc0IscUJBQXFCLEdBQUc7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDLGtDQUFrQyxTQUFTO0FBQzNDLGtDQUFrQyxXQUFXLFVBQVU7QUFDdkQseUNBQXlDLGNBQWM7QUFDdkQ7QUFDQSw2R0FBNkcsT0FBTyxVQUFVO0FBQzlILGdGQUFnRixpQkFBaUIsT0FBTztBQUN4Ryx3REFBd0QsZ0JBQWdCLFFBQVEsT0FBTztBQUN2Riw4Q0FBOEMsZ0JBQWdCLGdCQUFnQixPQUFPO0FBQ3JGO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQSxTQUFTLFlBQVksYUFBYSxPQUFPLEVBQUUsVUFBVSxXQUFXO0FBQ2hFLG1DQUFtQyxTQUFTO0FBQzVDO0FBQ0E7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsbUJBQW1CLG1CQUFPLENBQUMsMERBQVk7QUFDdkMsbUJBQW1CLG1CQUFPLENBQUMseUNBQWM7QUFDekMsb0JBQW9CLG1CQUFPLENBQUMsMkNBQWU7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELCtIQUErSDtBQUM1TDtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTs7Ozs7Ozs7Ozs7O0FDdERhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQixrQkFBa0IsbUJBQW1COzs7Ozs7Ozs7Ozs7QUNIeEI7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUZBQXVGLDRCQUE0QixFQUFFO0FBQ3JIO0FBQ0EsdUJBQXVCOzs7Ozs7O1VDbEJ2QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VDdEJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXNzaWduID0gKHRoaXMgJiYgdGhpcy5fX2Fzc2lnbikgfHwgZnVuY3Rpb24gKCkge1xuICAgIF9fYXNzaWduID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbih0KSB7XG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGZvciAodmFyIHAgaW4gcykgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzLCBwKSlcbiAgICAgICAgICAgICAgICB0W3BdID0gc1twXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdDtcbiAgICB9O1xuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLkF3ZXNvbWVRUiA9IHZvaWQgMDtcbnZhciBjYW52YXNfMSA9IHJlcXVpcmUoXCJjYW52YXNcIik7XG52YXIgZ2lmdWN0X2pzXzEgPSByZXF1aXJlKFwiLi9naWZ1Y3QtanNcIik7XG52YXIgcXJjb2RlXzEgPSByZXF1aXJlKFwiLi9xcmNvZGVcIik7XG52YXIgR0lGRW5jb2Rlcl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCIuL2dpZi5qcy9HSUZFbmNvZGVyXCIpKTtcbnZhciBkZWZhdWx0U2NhbGUgPSAwLjQ7XG52YXIgQXdlc29tZVFSID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEF3ZXNvbWVRUihvcHRpb25zKSB7XG4gICAgICAgIHZhciBfb3B0aW9ucyA9IE9iamVjdC5hc3NpZ24oe30sIG9wdGlvbnMpO1xuICAgICAgICBPYmplY3Qua2V5cyhBd2Vzb21lUVIuZGVmYXVsdE9wdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIGlmICghKGsgaW4gX29wdGlvbnMpKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9vcHRpb25zLCBrLCB7IHZhbHVlOiBBd2Vzb21lUVIuZGVmYXVsdE9wdGlvbnNba10sIGVudW1lcmFibGU6IHRydWUsIHdyaXRhYmxlOiB0cnVlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFfb3B0aW9ucy5jb21wb25lbnRzKSB7XG4gICAgICAgICAgICBfb3B0aW9ucy5jb21wb25lbnRzID0gQXdlc29tZVFSLmRlZmF1bHRDb21wb25lbnRPcHRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiBfb3B0aW9ucy5jb21wb25lbnRzID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICBPYmplY3Qua2V5cyhBd2Vzb21lUVIuZGVmYXVsdENvbXBvbmVudE9wdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgICAgICBpZiAoIShrIGluIF9vcHRpb25zLmNvbXBvbmVudHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfb3B0aW9ucy5jb21wb25lbnRzLCBrLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogQXdlc29tZVFSLmRlZmF1bHRDb21wb25lbnRPcHRpb25zW2tdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShfb3B0aW9ucy5jb21wb25lbnRzLCBrLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX19hc3NpZ24oX19hc3NpZ24oe30sIEF3ZXNvbWVRUi5kZWZhdWx0Q29tcG9uZW50T3B0aW9uc1trXSksIF9vcHRpb25zLmNvbXBvbmVudHNba10pLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoX29wdGlvbnMuZG90U2NhbGUgIT09IG51bGwgJiYgX29wdGlvbnMuZG90U2NhbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKF9vcHRpb25zLmRvdFNjYWxlIDw9IDAgfHwgX29wdGlvbnMuZG90U2NhbGUgPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZG90U2NhbGUgc2hvdWxkIGJlIGluIHJhbmdlICgwLCAxXS5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfb3B0aW9ucy5jb21wb25lbnRzLmRhdGEuc2NhbGUgPSBfb3B0aW9ucy5kb3RTY2FsZTtcbiAgICAgICAgICAgIF9vcHRpb25zLmNvbXBvbmVudHMudGltaW5nLnNjYWxlID0gX29wdGlvbnMuZG90U2NhbGU7XG4gICAgICAgICAgICBfb3B0aW9ucy5jb21wb25lbnRzLmFsaWdubWVudC5zY2FsZSA9IF9vcHRpb25zLmRvdFNjYWxlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IF9vcHRpb25zO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGNhbnZhc18xLmNyZWF0ZUNhbnZhcyhvcHRpb25zLnNpemUsIG9wdGlvbnMuc2l6ZSk7XG4gICAgICAgIHRoaXMuY2FudmFzQ29udGV4dCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy5xckNvZGUgPSBuZXcgcXJjb2RlXzEuUVJDb2RlTW9kZWwoLTEsIHRoaXMub3B0aW9ucy5jb3JyZWN0TGV2ZWwpO1xuICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcih0aGlzLm9wdGlvbnMubWFza1BhdHRlcm4pKSB7XG4gICAgICAgICAgICB0aGlzLnFyQ29kZS5tYXNrUGF0dGVybiA9IHRoaXMub3B0aW9ucy5tYXNrUGF0dGVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcih0aGlzLm9wdGlvbnMudmVyc2lvbikpIHtcbiAgICAgICAgICAgIHRoaXMucXJDb2RlLnR5cGVOdW1iZXIgPSB0aGlzLm9wdGlvbnMudmVyc2lvbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnFyQ29kZS5hZGREYXRhKHRoaXMub3B0aW9ucy50ZXh0KTtcbiAgICAgICAgdGhpcy5xckNvZGUubWFrZSgpO1xuICAgIH1cbiAgICBBd2Vzb21lUVIucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXR1cm4gX3RoaXMuX2RyYXcoKS50aGVuKHJlc29sdmUpOyB9KTtcbiAgICB9O1xuICAgIEF3ZXNvbWVRUi5wcm90b3R5cGUuX2NsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNhbnZhc0NvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuICAgIH07XG4gICAgQXdlc29tZVFSLl9wcmVwYXJlUm91bmRlZENvcm5lckNsaXAgPSBmdW5jdGlvbiAoY2FudmFzQ29udGV4dCwgeCwgeSwgdywgaCwgcikge1xuICAgICAgICBjYW52YXNDb250ZXh0LmJlZ2luUGF0aCgpO1xuICAgICAgICBjYW52YXNDb250ZXh0Lm1vdmVUbyh4LCB5KTtcbiAgICAgICAgY2FudmFzQ29udGV4dC5hcmNUbyh4ICsgdywgeSwgeCArIHcsIHkgKyBoLCByKTtcbiAgICAgICAgY2FudmFzQ29udGV4dC5hcmNUbyh4ICsgdywgeSArIGgsIHgsIHkgKyBoLCByKTtcbiAgICAgICAgY2FudmFzQ29udGV4dC5hcmNUbyh4LCB5ICsgaCwgeCwgeSwgcik7XG4gICAgICAgIGNhbnZhc0NvbnRleHQuYXJjVG8oeCwgeSwgeCArIHcsIHksIHIpO1xuICAgICAgICBjYW52YXNDb250ZXh0LmNsb3NlUGF0aCgpO1xuICAgIH07XG4gICAgQXdlc29tZVFSLl9nZXRBdmVyYWdlUkdCID0gZnVuY3Rpb24gKGltYWdlKSB7XG4gICAgICAgIHZhciBibG9ja1NpemUgPSA1O1xuICAgICAgICB2YXIgZGVmYXVsdFJHQiA9IHtcbiAgICAgICAgICAgIHI6IDAsXG4gICAgICAgICAgICBnOiAwLFxuICAgICAgICAgICAgYjogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHdpZHRoLCBoZWlnaHQ7XG4gICAgICAgIHZhciBpID0gLTQ7XG4gICAgICAgIHZhciByZ2IgPSB7XG4gICAgICAgICAgICByOiAwLFxuICAgICAgICAgICAgZzogMCxcbiAgICAgICAgICAgIGI6IDAsXG4gICAgICAgIH07XG4gICAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICAgIGhlaWdodCA9IGltYWdlLm5hdHVyYWxIZWlnaHQgfHwgaW1hZ2UuaGVpZ2h0O1xuICAgICAgICB3aWR0aCA9IGltYWdlLm5hdHVyYWxXaWR0aCB8fCBpbWFnZS53aWR0aDtcbiAgICAgICAgdmFyIGNhbnZhcyA9IGNhbnZhc18xLmNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0UkdCO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcbiAgICAgICAgdmFyIGRhdGE7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBkYXRhID0gY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0UkdCO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICgoaSArPSBibG9ja1NpemUgKiA0KSA8IGRhdGEuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmRhdGFbaV0gPiAyMDAgfHwgZGF0YS5kYXRhW2kgKyAxXSA+IDIwMCB8fCBkYXRhLmRhdGFbaSArIDJdID4gMjAwKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgKytjb3VudDtcbiAgICAgICAgICAgIHJnYi5yICs9IGRhdGEuZGF0YVtpXTtcbiAgICAgICAgICAgIHJnYi5nICs9IGRhdGEuZGF0YVtpICsgMV07XG4gICAgICAgICAgICByZ2IuYiArPSBkYXRhLmRhdGFbaSArIDJdO1xuICAgICAgICB9XG4gICAgICAgIHJnYi5yID0gfn4ocmdiLnIgLyBjb3VudCk7XG4gICAgICAgIHJnYi5nID0gfn4ocmdiLmcgLyBjb3VudCk7XG4gICAgICAgIHJnYi5iID0gfn4ocmdiLmIgLyBjb3VudCk7XG4gICAgICAgIHJldHVybiByZ2I7XG4gICAgfTtcbiAgICBBd2Vzb21lUVIuX2RyYXdEb3QgPSBmdW5jdGlvbiAoY2FudmFzQ29udGV4dCwgY2VudGVyWCwgY2VudGVyWSwgblNpemUsIHh5T2Zmc2V0LCBkb3RTY2FsZSkge1xuICAgICAgICBpZiAoeHlPZmZzZXQgPT09IHZvaWQgMCkgeyB4eU9mZnNldCA9IDA7IH1cbiAgICAgICAgaWYgKGRvdFNjYWxlID09PSB2b2lkIDApIHsgZG90U2NhbGUgPSAxOyB9XG4gICAgICAgIGNhbnZhc0NvbnRleHQuZmlsbFJlY3QoKGNlbnRlclggKyB4eU9mZnNldCkgKiBuU2l6ZSwgKGNlbnRlclkgKyB4eU9mZnNldCkgKiBuU2l6ZSwgZG90U2NhbGUgKiBuU2l6ZSwgZG90U2NhbGUgKiBuU2l6ZSk7XG4gICAgfTtcbiAgICBBd2Vzb21lUVIuX2RyYXdBbGlnblByb3RlY3RvciA9IGZ1bmN0aW9uIChjYW52YXNDb250ZXh0LCBjZW50ZXJYLCBjZW50ZXJZLCBuU2l6ZSkge1xuICAgICAgICBjYW52YXNDb250ZXh0LmNsZWFyUmVjdCgoY2VudGVyWCAtIDIpICogblNpemUsIChjZW50ZXJZIC0gMikgKiBuU2l6ZSwgNSAqIG5TaXplLCA1ICogblNpemUpO1xuICAgICAgICBjYW52YXNDb250ZXh0LmZpbGxSZWN0KChjZW50ZXJYIC0gMikgKiBuU2l6ZSwgKGNlbnRlclkgLSAyKSAqIG5TaXplLCA1ICogblNpemUsIDUgKiBuU2l6ZSk7XG4gICAgfTtcbiAgICBBd2Vzb21lUVIuX2RyYXdBbGlnbiA9IGZ1bmN0aW9uIChjYW52YXNDb250ZXh0LCBjZW50ZXJYLCBjZW50ZXJZLCBuU2l6ZSwgeHlPZmZzZXQsIGRvdFNjYWxlLCBjb2xvckRhcmssIGhhc1Byb3RlY3Rvcikge1xuICAgICAgICBpZiAoeHlPZmZzZXQgPT09IHZvaWQgMCkgeyB4eU9mZnNldCA9IDA7IH1cbiAgICAgICAgaWYgKGRvdFNjYWxlID09PSB2b2lkIDApIHsgZG90U2NhbGUgPSAxOyB9XG4gICAgICAgIHZhciBvbGRGaWxsU3R5bGUgPSBjYW52YXNDb250ZXh0LmZpbGxTdHlsZTtcbiAgICAgICAgY2FudmFzQ29udGV4dC5maWxsU3R5bGUgPSBjb2xvckRhcms7XG4gICAgICAgIG5ldyBBcnJheSg0KS5maWxsKDApLm1hcChmdW5jdGlvbiAoXywgaSkge1xuICAgICAgICAgICAgQXdlc29tZVFSLl9kcmF3RG90KGNhbnZhc0NvbnRleHQsIGNlbnRlclggLSAyICsgaSwgY2VudGVyWSAtIDIsIG5TaXplLCB4eU9mZnNldCwgZG90U2NhbGUpO1xuICAgICAgICAgICAgQXdlc29tZVFSLl9kcmF3RG90KGNhbnZhc0NvbnRleHQsIGNlbnRlclggKyAyLCBjZW50ZXJZIC0gMiArIGksIG5TaXplLCB4eU9mZnNldCwgZG90U2NhbGUpO1xuICAgICAgICAgICAgQXdlc29tZVFSLl9kcmF3RG90KGNhbnZhc0NvbnRleHQsIGNlbnRlclggKyAyIC0gaSwgY2VudGVyWSArIDIsIG5TaXplLCB4eU9mZnNldCwgZG90U2NhbGUpO1xuICAgICAgICAgICAgQXdlc29tZVFSLl9kcmF3RG90KGNhbnZhc0NvbnRleHQsIGNlbnRlclggLSAyLCBjZW50ZXJZICsgMiAtIGksIG5TaXplLCB4eU9mZnNldCwgZG90U2NhbGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgQXdlc29tZVFSLl9kcmF3RG90KGNhbnZhc0NvbnRleHQsIGNlbnRlclgsIGNlbnRlclksIG5TaXplLCB4eU9mZnNldCwgZG90U2NhbGUpO1xuICAgICAgICBpZiAoIWhhc1Byb3RlY3Rvcikge1xuICAgICAgICAgICAgY2FudmFzQ29udGV4dC5maWxsU3R5bGUgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KVwiO1xuICAgICAgICAgICAgbmV3IEFycmF5KDIpLmZpbGwoMCkubWFwKGZ1bmN0aW9uIChfLCBpKSB7XG4gICAgICAgICAgICAgICAgQXdlc29tZVFSLl9kcmF3RG90KGNhbnZhc0NvbnRleHQsIGNlbnRlclggLSAxICsgaSwgY2VudGVyWSAtIDEsIG5TaXplLCB4eU9mZnNldCwgZG90U2NhbGUpO1xuICAgICAgICAgICAgICAgIEF3ZXNvbWVRUi5fZHJhd0RvdChjYW52YXNDb250ZXh0LCBjZW50ZXJYICsgMSwgY2VudGVyWSAtIDEgKyBpLCBuU2l6ZSwgeHlPZmZzZXQsIGRvdFNjYWxlKTtcbiAgICAgICAgICAgICAgICBBd2Vzb21lUVIuX2RyYXdEb3QoY2FudmFzQ29udGV4dCwgY2VudGVyWCArIDEgLSBpLCBjZW50ZXJZICsgMSwgblNpemUsIHh5T2Zmc2V0LCBkb3RTY2FsZSk7XG4gICAgICAgICAgICAgICAgQXdlc29tZVFSLl9kcmF3RG90KGNhbnZhc0NvbnRleHQsIGNlbnRlclggLSAxLCBjZW50ZXJZICsgMSAtIGksIG5TaXplLCB4eU9mZnNldCwgZG90U2NhbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FudmFzQ29udGV4dC5maWxsU3R5bGUgPSBvbGRGaWxsU3R5bGU7XG4gICAgfTtcbiAgICBBd2Vzb21lUVIucHJvdG90eXBlLl9kcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX2EsIF9iLCBfYywgX2QsIF9lLCBfZiwgX2csIF9oLCBfaiwgX2ssIF9sLCBfbSwgX28sIF9wLCBfcSwgX3IsIF9zLCBfdCwgX3U7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodGhpcywgdm9pZCAwLCB2b2lkIDAsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBuQ291bnQsIHJhd1NpemUsIHJhd01hcmdpbiwgbWFyZ2luLCByYXdWaWV3cG9ydFNpemUsIHdoaXRlTWFyZ2luLCBiYWNrZ3JvdW5kRGltbWluZywgblNpemUsIHZpZXdwb3J0U2l6ZSwgc2l6ZSwgbWFpbkNhbnZhcywgbWFpbkNhbnZhc0NvbnRleHQsIGJhY2tncm91bmRDYW52YXMsIGJhY2tncm91bmRDYW52YXNDb250ZXh0LCBwYXJzZWRHSUZCYWNrZ3JvdW5kLCBnaWZGcmFtZXMsIGdpZiwgciwgZywgYiwgY291bnQsIGksIGMsIGJhY2tncm91bmRJbWFnZSwgYXZnUkdCLCBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVycywgZGF0YVNjYWxlLCBkYXRhWHlPZmZzZXQsIHJvdywgY29sLCBiSXNEYXJrLCBpc0Jsa1Bvc0N0ciwgaXNUaW1pbmcsIGlzUHJvdGVjdGVkLCBpLCBuTGVmdCwgblRvcCwgaW5BZ25SYW5nZSwgY29ybmVyQWxpZ25tZW50Q2VudGVyLCBwcm90ZWN0b3JTdHlsZSwgaSwgaiwgYWduWCwgYWduWSwgdGltaW5nU2NhbGUsIHRpbWluZ1h5T2Zmc2V0LCBpLCBjb3JuZXJBbGlnbm1lbnRTY2FsZSwgY29ybmVyQWxpZ25tZW50WHlPZmZzZXQsIGFsaWdubWVudFNjYWxlLCBhbGlnbm1lbnRYeU9mZnNldCwgaSwgaiwgYWduWCwgYWduWSwgbG9nb0ltYWdlLCBsb2dvU2NhbGUsIGxvZ29NYXJnaW4sIGxvZ29Db3JuZXJSYWRpdXMsIGxvZ29TaXplLCB4LCB5LCBvbGRHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24sIGdpZk91dHB1dF8xLCBiYWNrZ3JvdW5kQ2FudmFzXzEsIGJhY2tncm91bmRDYW52YXNDb250ZXh0XzEsIHBhdGNoQ2FudmFzXzEsIHBhdGNoQ2FudmFzQ29udGV4dF8xLCBwYXRjaERhdGFfMSwgdThhcnJheSwgYmluYXJ5LCBvdXRDYW52YXMsIG91dENhbnZhc0NvbnRleHQ7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF92KSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChfdi5sYWJlbCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBuQ291bnQgPSAoX2EgPSB0aGlzLnFyQ29kZSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLm1vZHVsZUNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmF3U2l6ZSA9IHRoaXMub3B0aW9ucy5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmF3TWFyZ2luID0gdGhpcy5vcHRpb25zLm1hcmdpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyYXdNYXJnaW4gPCAwIHx8IHJhd01hcmdpbiAqIDIgPj0gcmF3U2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhd01hcmdpbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXJnaW4gPSBNYXRoLmNlaWwocmF3TWFyZ2luKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJhd1ZpZXdwb3J0U2l6ZSA9IHJhd1NpemUgLSAyICogcmF3TWFyZ2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpdGVNYXJnaW4gPSB0aGlzLm9wdGlvbnMud2hpdGVNYXJnaW47XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kRGltbWluZyA9IHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kRGltbWluZztcbiAgICAgICAgICAgICAgICAgICAgICAgIG5TaXplID0gTWF0aC5jZWlsKHJhd1ZpZXdwb3J0U2l6ZSAvIG5Db3VudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3cG9ydFNpemUgPSBuU2l6ZSAqIG5Db3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgPSB2aWV3cG9ydFNpemUgKyAyICogbWFyZ2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhcyA9IGNhbnZhc18xLmNyZWF0ZUNhbnZhcyhzaXplLCBzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0ID0gbWFpbkNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jbGVhcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJhbnNsYXRlIHRvIG1ha2UgdGhlIHRvcCBhbmQgbGVmdCBtYXJnaW5zIG9mZiB0aGUgdmlld3BvcnRcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LnRyYW5zbGF0ZShtYXJnaW4sIG1hcmdpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2FudmFzID0gY2FudmFzXzEuY3JlYXRlQ2FudmFzKHNpemUsIHNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENhbnZhc0NvbnRleHQgPSBiYWNrZ3JvdW5kQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcnNlZEdJRkJhY2tncm91bmQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2lmRnJhbWVzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISEhdGhpcy5vcHRpb25zLmdpZkJhY2tncm91bmQpIHJldHVybiBbMyAvKmJyZWFrKi8sIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2lmID0gZ2lmdWN0X2pzXzEucGFyc2VHSUYodGhpcy5vcHRpb25zLmdpZkJhY2tncm91bmQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkR0lGQmFja2dyb3VuZCA9IGdpZjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdpZkZyYW1lcyA9IGdpZnVjdF9qc18xLmRlY29tcHJlc3NGcmFtZXMoZ2lmLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuYXV0b0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgciA9IDAsIGcgPSAwLCBiID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGdpZkZyYW1lc1swXS5jb2xvclRhYmxlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBnaWZGcmFtZXNbMF0uY29sb3JUYWJsZVtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNbMF0gPiAyMDAgfHwgY1sxXSA+IDIwMCB8fCBjWzJdID4gMjAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjWzBdID09PSAwICYmIGNbMV0gPT09IDAgJiYgY1syXSA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByICs9IGNbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcgKz0gY1sxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYiArPSBjWzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByID0gfn4ociAvIGNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnID0gfn4oZyAvIGNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiID0gfn4oYiAvIGNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuY29sb3JEYXJrID0gXCJyZ2IoXCIgKyByICsgXCIsXCIgKyBnICsgXCIsXCIgKyBiICsgXCIpXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhIXRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kSW1hZ2UpIHJldHVybiBbMyAvKmJyZWFrKi8sIDNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY2FudmFzXzEubG9hZEltYWdlKHRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kSW1hZ2UpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZEltYWdlID0gX3Yuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdmdSR0IgPSBBd2Vzb21lUVIuX2dldEF2ZXJhZ2VSR0IoYmFja2dyb3VuZEltYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9wdGlvbnMuY29sb3JEYXJrID0gXCJyZ2IoXCIgKyBhdmdSR0IuciArIFwiLFwiICsgYXZnUkdCLmcgKyBcIixcIiArIGF2Z1JHQi5iICsgXCIpXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2FudmFzQ29udGV4dC5kcmF3SW1hZ2UoYmFja2dyb3VuZEltYWdlLCAwLCAwLCBiYWNrZ3JvdW5kSW1hZ2Uud2lkdGgsIGJhY2tncm91bmRJbWFnZS5oZWlnaHQsIDAsIDAsIHNpemUsIHNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENhbnZhc0NvbnRleHQucmVjdCgwLCAwLCBzaXplLCBzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDYW52YXNDb250ZXh0LmZpbGxTdHlsZSA9IGJhY2tncm91bmREaW1taW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENhbnZhc0NvbnRleHQuZmlsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFszIC8qYnJlYWsqLywgNF07XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDYW52YXNDb250ZXh0LnJlY3QoMCwgMCwgc2l6ZSwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2FudmFzQ29udGV4dC5maWxsU3R5bGUgPSB0aGlzLm9wdGlvbnMuY29sb3JMaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDYW52YXNDb250ZXh0LmZpbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF92LmxhYmVsID0gNDtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50UGF0dGVybkNlbnRlcnMgPSBxcmNvZGVfMS5RUlV0aWwuZ2V0UGF0dGVyblBvc2l0aW9uKHRoaXMucXJDb2RlLnR5cGVOdW1iZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVNjYWxlID0gKChfYyA9IChfYiA9IHRoaXMub3B0aW9ucy5jb21wb25lbnRzKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZGF0YSkgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLnNjYWxlKSB8fCBkZWZhdWx0U2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhWHlPZmZzZXQgPSAoMSAtIGRhdGFTY2FsZSkgKiAwLjU7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHJvdyA9IDA7IHJvdyA8IG5Db3VudDsgcm93KyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGNvbCA9IDA7IGNvbCA8IG5Db3VudDsgY29sKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYklzRGFyayA9IHRoaXMucXJDb2RlLmlzRGFyayhyb3csIGNvbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzQmxrUG9zQ3RyID0gKGNvbCA8IDggJiYgKHJvdyA8IDggfHwgcm93ID49IG5Db3VudCAtIDgpKSB8fCAoY29sID49IG5Db3VudCAtIDggJiYgcm93IDwgOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzVGltaW5nID0gKHJvdyA9PSA2ICYmIGNvbCA+PSA4ICYmIGNvbCA8PSBuQ291bnQgLSA4KSB8fCAoY29sID09IDYgJiYgcm93ID49IDggJiYgcm93IDw9IG5Db3VudCAtIDgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Byb3RlY3RlZCA9IGlzQmxrUG9zQ3RyIHx8IGlzVGltaW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAxOyBpIDwgYWxpZ25tZW50UGF0dGVybkNlbnRlcnMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Byb3RlY3RlZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNQcm90ZWN0ZWQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHJvdyA+PSBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyc1tpXSAtIDIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA8PSBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyc1tpXSArIDIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbCA+PSBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyc1tpXSAtIDIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbCA8PSBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyc1tpXSArIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5MZWZ0ID0gY29sICogblNpemUgKyAoaXNQcm90ZWN0ZWQgPyAwIDogZGF0YVh5T2Zmc2V0ICogblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuVG9wID0gcm93ICogblNpemUgKyAoaXNQcm90ZWN0ZWQgPyAwIDogZGF0YVh5T2Zmc2V0ICogblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5zdHJva2VTdHlsZSA9IGJJc0RhcmsgPyB0aGlzLm9wdGlvbnMuY29sb3JEYXJrIDogdGhpcy5vcHRpb25zLmNvbG9yTGlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmxpbmVXaWR0aCA9IDAuNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFN0eWxlID0gYklzRGFyayA/IHRoaXMub3B0aW9ucy5jb2xvckRhcmsgOiBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWxpZ25tZW50UGF0dGVybkNlbnRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWlzUHJvdGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QobkxlZnQsIG5Ub3AsIChpc1Byb3RlY3RlZCA/IChpc0Jsa1Bvc0N0ciA/IDEgOiAxKSA6IGRhdGFTY2FsZSkgKiBuU2l6ZSwgKGlzUHJvdGVjdGVkID8gKGlzQmxrUG9zQ3RyID8gMSA6IDEpIDogZGF0YVNjYWxlKSAqIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluQWduUmFuZ2UgPSBjb2wgPCBuQ291bnQgLSA0ICYmIGNvbCA+PSBuQ291bnQgLSA0IC0gNSAmJiByb3cgPCBuQ291bnQgLSA0ICYmIHJvdyA+PSBuQ291bnQgLSA0IC0gNTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNQcm90ZWN0ZWQgJiYgIWluQWduUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBpZiBhbGlnbiBwYXR0ZXJuIGxpc3QgaXMgZW1wdHksIHRoZW4gaXQgbWVhbnMgdGhhdCB3ZSBkb24ndCBuZWVkIHRvIGxlYXZlIHJvb20gZm9yIHRoZSBhbGlnbiBwYXR0ZXJuc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KG5MZWZ0LCBuVG9wLCAoaXNQcm90ZWN0ZWQgPyAoaXNCbGtQb3NDdHIgPyAxIDogMSkgOiBkYXRhU2NhbGUpICogblNpemUsIChpc1Byb3RlY3RlZCA/IChpc0Jsa1Bvc0N0ciA/IDEgOiAxKSA6IGRhdGFTY2FsZSkgKiBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJBbGlnbm1lbnRDZW50ZXIgPSBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyc1thbGlnbm1lbnRQYXR0ZXJuQ2VudGVycy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3RlY3RvclN0eWxlID0gXCJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNilcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC0gRklOREVSIFBST1RFQ1RPUlNcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxTdHlsZSA9IHByb3RlY3RvclN0eWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoMCwgMCwgOCAqIG5TaXplLCA4ICogblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoMCwgKG5Db3VudCAtIDgpICogblNpemUsIDggKiBuU2l6ZSwgOCAqIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KChuQ291bnQgLSA4KSAqIG5TaXplLCAwLCA4ICogblNpemUsIDggKiBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAtIFRJTUlORyBQUk9URUNUT1JTXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKF9lID0gKF9kID0gdGhpcy5vcHRpb25zLmNvbXBvbmVudHMpID09PSBudWxsIHx8IF9kID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZC50aW1pbmcpID09PSBudWxsIHx8IF9lID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZS5wcm90ZWN0b3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoOCAqIG5TaXplLCA2ICogblNpemUsIChuQ291bnQgLSA4IC0gOCkgKiBuU2l6ZSwgblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KDYgKiBuU2l6ZSwgOCAqIG5TaXplLCBuU2l6ZSwgKG5Db3VudCAtIDggLSA4KSAqIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC0gQ09STkVSIEFMSUdOTUVOVCBQUk9URUNUT1JTXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKF9nID0gKF9mID0gdGhpcy5vcHRpb25zLmNvbXBvbmVudHMpID09PSBudWxsIHx8IF9mID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZi5jb3JuZXJBbGlnbm1lbnQpID09PSBudWxsIHx8IF9nID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZy5wcm90ZWN0b3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXdlc29tZVFSLl9kcmF3QWxpZ25Qcm90ZWN0b3IobWFpbkNhbnZhc0NvbnRleHQsIGNvcm5lckFsaWdubWVudENlbnRlciwgY29ybmVyQWxpZ25tZW50Q2VudGVyLCBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAtIEFMSUdOTUVOVCBQUk9URUNUT1JTXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKF9qID0gKF9oID0gdGhpcy5vcHRpb25zLmNvbXBvbmVudHMpID09PSBudWxsIHx8IF9oID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfaC5hbGlnbm1lbnQpID09PSBudWxsIHx8IF9qID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfai5wcm90ZWN0b3JzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFsaWdubWVudFBhdHRlcm5DZW50ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWduWCA9IGFsaWdubWVudFBhdHRlcm5DZW50ZXJzW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWduWSA9IGFsaWdubWVudFBhdHRlcm5DZW50ZXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFnblggPT09IDYgJiYgKGFnblkgPT09IDYgfHwgYWduWSA9PT0gY29ybmVyQWxpZ25tZW50Q2VudGVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYWduWSA9PT0gNiAmJiAoYWduWCA9PT0gNiB8fCBhZ25YID09PSBjb3JuZXJBbGlnbm1lbnRDZW50ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhZ25YID09PSBjb3JuZXJBbGlnbm1lbnRDZW50ZXIgJiYgYWduWSA9PT0gY29ybmVyQWxpZ25tZW50Q2VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBBd2Vzb21lUVIuX2RyYXdBbGlnblByb3RlY3RvcihtYWluQ2FudmFzQ29udGV4dCwgYWduWCwgYWduWSwgblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gLSBGSU5ERVJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5jb2xvckRhcms7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCgwLCAwLCA3ICogblNpemUsIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KChuQ291bnQgLSA3KSAqIG5TaXplLCAwLCA3ICogblNpemUsIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KDAsIDYgKiBuU2l6ZSwgNyAqIG5TaXplLCBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCgobkNvdW50IC0gNykgKiBuU2l6ZSwgNiAqIG5TaXplLCA3ICogblNpemUsIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KDAsIChuQ291bnQgLSA3KSAqIG5TaXplLCA3ICogblNpemUsIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KDAsIChuQ291bnQgLSA3ICsgNikgKiBuU2l6ZSwgNyAqIG5TaXplLCBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCgwLCAwLCBuU2l6ZSwgNyAqIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KDYgKiBuU2l6ZSwgMCwgblNpemUsIDcgKiBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCgobkNvdW50IC0gNykgKiBuU2l6ZSwgMCwgblNpemUsIDcgKiBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCgobkNvdW50IC0gNyArIDYpICogblNpemUsIDAsIG5TaXplLCA3ICogblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoMCwgKG5Db3VudCAtIDcpICogblNpemUsIG5TaXplLCA3ICogblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoNiAqIG5TaXplLCAobkNvdW50IC0gNykgKiBuU2l6ZSwgblNpemUsIDcgKiBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCgyICogblNpemUsIDIgKiBuU2l6ZSwgMyAqIG5TaXplLCAzICogblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoKG5Db3VudCAtIDcgKyAyKSAqIG5TaXplLCAyICogblNpemUsIDMgKiBuU2l6ZSwgMyAqIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KDIgKiBuU2l6ZSwgKG5Db3VudCAtIDcgKyAyKSAqIG5TaXplLCAzICogblNpemUsIDMgKiBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1pbmdTY2FsZSA9ICgoX2wgPSAoX2sgPSB0aGlzLm9wdGlvbnMuY29tcG9uZW50cykgPT09IG51bGwgfHwgX2sgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9rLnRpbWluZykgPT09IG51bGwgfHwgX2wgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9sLnNjYWxlKSB8fCBkZWZhdWx0U2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1pbmdYeU9mZnNldCA9ICgxIC0gdGltaW5nU2NhbGUpICogMC41O1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG5Db3VudCAtIDg7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF3ZXNvbWVRUi5fZHJhd0RvdChtYWluQ2FudmFzQ29udGV4dCwgOCArIGksIDYsIG5TaXplLCB0aW1pbmdYeU9mZnNldCwgdGltaW5nU2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF3ZXNvbWVRUi5fZHJhd0RvdChtYWluQ2FudmFzQ29udGV4dCwgNiwgOCArIGksIG5TaXplLCB0aW1pbmdYeU9mZnNldCwgdGltaW5nU2NhbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyQWxpZ25tZW50U2NhbGUgPSAoKF9vID0gKF9tID0gdGhpcy5vcHRpb25zLmNvbXBvbmVudHMpID09PSBudWxsIHx8IF9tID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfbS5jb3JuZXJBbGlnbm1lbnQpID09PSBudWxsIHx8IF9vID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfby5zY2FsZSkgfHwgZGVmYXVsdFNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29ybmVyQWxpZ25tZW50WHlPZmZzZXQgPSAoMSAtIGNvcm5lckFsaWdubWVudFNjYWxlKSAqIDAuNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIEF3ZXNvbWVRUi5fZHJhd0FsaWduKG1haW5DYW52YXNDb250ZXh0LCBjb3JuZXJBbGlnbm1lbnRDZW50ZXIsIGNvcm5lckFsaWdubWVudENlbnRlciwgblNpemUsIGNvcm5lckFsaWdubWVudFh5T2Zmc2V0LCBjb3JuZXJBbGlnbm1lbnRTY2FsZSwgdGhpcy5vcHRpb25zLmNvbG9yRGFyaywgKChfcSA9IChfcCA9IHRoaXMub3B0aW9ucy5jb21wb25lbnRzKSA9PT0gbnVsbCB8fCBfcCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3AuY29ybmVyQWxpZ25tZW50KSA9PT0gbnVsbCB8fCBfcSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX3EucHJvdGVjdG9ycykgfHwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50U2NhbGUgPSAoKF9zID0gKF9yID0gdGhpcy5vcHRpb25zLmNvbXBvbmVudHMpID09PSBudWxsIHx8IF9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfci5hbGlnbm1lbnQpID09PSBudWxsIHx8IF9zID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcy5zY2FsZSkgfHwgZGVmYXVsdFNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxpZ25tZW50WHlPZmZzZXQgPSAoMSAtIGFsaWdubWVudFNjYWxlKSAqIDAuNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVycy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ25YID0gYWxpZ25tZW50UGF0dGVybkNlbnRlcnNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnblkgPSBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFnblggPT09IDYgJiYgKGFnblkgPT09IDYgfHwgYWduWSA9PT0gY29ybmVyQWxpZ25tZW50Q2VudGVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYWduWSA9PT0gNiAmJiAoYWduWCA9PT0gNiB8fCBhZ25YID09PSBjb3JuZXJBbGlnbm1lbnRDZW50ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhZ25YID09PSBjb3JuZXJBbGlnbm1lbnRDZW50ZXIgJiYgYWduWSA9PT0gY29ybmVyQWxpZ25tZW50Q2VudGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF3ZXNvbWVRUi5fZHJhd0FsaWduKG1haW5DYW52YXNDb250ZXh0LCBhZ25YLCBhZ25ZLCBuU2l6ZSwgYWxpZ25tZW50WHlPZmZzZXQsIGFsaWdubWVudFNjYWxlLCB0aGlzLm9wdGlvbnMuY29sb3JEYXJrLCAoKF91ID0gKF90ID0gdGhpcy5vcHRpb25zLmNvbXBvbmVudHMpID09PSBudWxsIHx8IF90ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdC5hbGlnbm1lbnQpID09PSBudWxsIHx8IF91ID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfdS5wcm90ZWN0b3JzKSB8fCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBGaWxsIHRoZSBtYXJnaW5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh3aGl0ZU1hcmdpbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRkZGRlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KC1tYXJnaW4sIC1tYXJnaW4sIHNpemUsIG1hcmdpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoLW1hcmdpbiwgdmlld3BvcnRTaXplLCBzaXplLCBtYXJnaW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KHZpZXdwb3J0U2l6ZSwgLW1hcmdpbiwgbWFyZ2luLCBzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCgtbWFyZ2luLCAtbWFyZ2luLCBtYXJnaW4sIHNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCEhIXRoaXMub3B0aW9ucy5sb2dvSW1hZ2UpIHJldHVybiBbMyAvKmJyZWFrKi8sIDZdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFs0IC8qeWllbGQqLywgY2FudmFzXzEubG9hZEltYWdlKHRoaXMub3B0aW9ucy5sb2dvSW1hZ2UpXTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nb0ltYWdlID0gX3Yuc2VudCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nb1NjYWxlID0gdGhpcy5vcHRpb25zLmxvZ29TY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ29NYXJnaW4gPSB0aGlzLm9wdGlvbnMubG9nb01hcmdpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ29Db3JuZXJSYWRpdXMgPSB0aGlzLm9wdGlvbnMubG9nb0Nvcm5lclJhZGl1cztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2dvU2NhbGUgPD0gMCB8fCBsb2dvU2NhbGUgPj0gMS4wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nb1NjYWxlID0gMC4yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvZ29NYXJnaW4gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9nb01hcmdpbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9nb0Nvcm5lclJhZGl1cyA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dvQ29ybmVyUmFkaXVzID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZ29TaXplID0gdmlld3BvcnRTaXplICogbG9nb1NjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgeCA9IDAuNSAqIChzaXplIC0gbG9nb1NpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgeSA9IHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZXN0b3JlIHRoZSBjYW52YXNcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFmdGVyIHJlc3RvcmluZywgdGhlIHRvcCBhbmQgbGVmdCBtYXJnaW5zIHNob3VsZCBiZSB0YWtlbiBpbnRvIGFjY291bnRcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIENsZWFuIHRoZSBhcmVhIHRoYXQgdGhlIGxvZ28gY292ZXJzIChpbmNsdWRpbmcgbWFyZ2lucylcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxTdHlsZSA9IFwiI0ZGRkZGRlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQXdlc29tZVFSLl9wcmVwYXJlUm91bmRlZENvcm5lckNsaXAobWFpbkNhbnZhc0NvbnRleHQsIHggLSBsb2dvTWFyZ2luLCB5IC0gbG9nb01hcmdpbiwgbG9nb1NpemUgKyAyICogbG9nb01hcmdpbiwgbG9nb1NpemUgKyAyICogbG9nb01hcmdpbiwgbG9nb0Nvcm5lclJhZGl1cyArIGxvZ29NYXJnaW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuY2xpcCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgb2xkR2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gbWFpbkNhbnZhc0NvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gXCJkZXN0aW5hdGlvbi1vdXRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IG9sZEdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LnJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERyYXcgbG9nbyBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgQXdlc29tZVFSLl9wcmVwYXJlUm91bmRlZENvcm5lckNsaXAobWFpbkNhbnZhc0NvbnRleHQsIHgsIHksIGxvZ29TaXplLCBsb2dvU2l6ZSwgbG9nb0Nvcm5lclJhZGl1cyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5jbGlwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5kcmF3SW1hZ2UobG9nb0ltYWdlLCB4LCB5LCBsb2dvU2l6ZSwgbG9nb1NpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmUtdHJhbnNsYXRlIHRoZSBjYW52YXMgdG8gdHJhbnNsYXRlIHRoZSB0b3AgYW5kIGxlZnQgbWFyZ2lucyBpbnRvIGludmlzaWJsZSBhcmVhXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC50cmFuc2xhdGUobWFyZ2luLCBtYXJnaW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3YubGFiZWwgPSA2O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISFwYXJzZWRHSUZCYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2lmRnJhbWVzLmZvckVhY2goZnVuY3Rpb24gKGZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZ2lmT3V0cHV0XzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdpZk91dHB1dF8xID0gbmV3IEdJRkVuY29kZXJfMS5kZWZhdWx0KHJhd1NpemUsIHJhd1NpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2lmT3V0cHV0XzEuc2V0RGVsYXkoZnJhbWUuZGVsYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2lmT3V0cHV0XzEuc2V0UmVwZWF0KDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBfYSA9IGZyYW1lLmRpbXMsIHdpZHRoID0gX2Eud2lkdGgsIGhlaWdodCA9IF9hLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFiYWNrZ3JvdW5kQ2FudmFzXzEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDYW52YXNfMSA9IGNhbnZhc18xLmNyZWF0ZUNhbnZhcyh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDYW52YXNDb250ZXh0XzEgPSBiYWNrZ3JvdW5kQ2FudmFzXzEuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENhbnZhc0NvbnRleHRfMS5yZWN0KDAsIDAsIGJhY2tncm91bmRDYW52YXNfMS53aWR0aCwgYmFja2dyb3VuZENhbnZhc18xLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2FudmFzQ29udGV4dF8xLmZpbGxTdHlsZSA9IFwiI2ZmZmZmZlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENhbnZhc0NvbnRleHRfMS5maWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFwYXRjaENhbnZhc18xIHx8ICFwYXRjaERhdGFfMSB8fCB3aWR0aCAhPT0gcGF0Y2hDYW52YXNfMS53aWR0aCB8fCBoZWlnaHQgIT09IHBhdGNoQ2FudmFzXzEuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRjaENhbnZhc18xID0gY2FudmFzXzEuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hDYW52YXNDb250ZXh0XzEgPSBwYXRjaENhbnZhc18xLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoRGF0YV8xID0gcGF0Y2hDYW52YXNDb250ZXh0XzEuY3JlYXRlSW1hZ2VEYXRhKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoRGF0YV8xLmRhdGEuc2V0KGZyYW1lLnBhdGNoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hDYW52YXNDb250ZXh0XzEucHV0SW1hZ2VEYXRhKHBhdGNoRGF0YV8xLCAwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENhbnZhc0NvbnRleHRfMS5kcmF3SW1hZ2UocGF0Y2hDYW52YXNfMSwgZnJhbWUuZGltcy5sZWZ0LCBmcmFtZS5kaW1zLnRvcCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB1bnNjYWxlZENhbnZhcyA9IGNhbnZhc18xLmNyZWF0ZUNhbnZhcyhzaXplLCBzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVuc2NhbGVkQ2FudmFzQ29udGV4dCA9IHVuc2NhbGVkQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5zY2FsZWRDYW52YXNDb250ZXh0LmRyYXdJbWFnZShiYWNrZ3JvdW5kQ2FudmFzXzEsIDAsIDAsIHNpemUsIHNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnNjYWxlZENhbnZhc0NvbnRleHQucmVjdCgwLCAwLCBzaXplLCBzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5zY2FsZWRDYW52YXNDb250ZXh0LmZpbGxTdHlsZSA9IGJhY2tncm91bmREaW1taW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnNjYWxlZENhbnZhc0NvbnRleHQuZmlsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnNjYWxlZENhbnZhc0NvbnRleHQuZHJhd0ltYWdlKG1haW5DYW52YXMsIDAsIDAsIHNpemUsIHNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTY2FsZSB0aGUgZmluYWwgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG91dENhbnZhcyA9IGNhbnZhc18xLmNyZWF0ZUNhbnZhcyhyYXdTaXplLCByYXdTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG91dENhbnZhc0NvbnRleHQgPSBvdXRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRDYW52YXNDb250ZXh0LmRyYXdJbWFnZSh1bnNjYWxlZENhbnZhcywgMCwgMCwgcmF3U2l6ZSwgcmF3U2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdpZk91dHB1dF8xLmFkZEZyYW1lKG91dENhbnZhc0NvbnRleHQuZ2V0SW1hZ2VEYXRhKDAsIDAsIG91dENhbnZhcy53aWR0aCwgb3V0Q2FudmFzLmhlaWdodCkuZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnaWZPdXRwdXRfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJObyBmcmFtZXMuXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnaWZPdXRwdXRfMS5maW5pc2goKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbGVtZW50KHRoaXMuY2FudmFzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1OGFycmF5ID0gZ2lmT3V0cHV0XzEuc3RyZWFtKCkudG9GbGF0dGVuVWludDhBcnJheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaW5hcnkgPSB1OGFycmF5LnJlZHVjZShmdW5jdGlvbiAoYmluLCB1OCkgeyByZXR1cm4gYmluICsgU3RyaW5nLmZyb21DaGFyQ29kZSh1OCk7IH0sIFwiXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZXNvbHZlKFwiZGF0YTppbWFnZS9naWY7YmFzZTY0LFwiICsgd2luZG93LmJ0b2EoYmluYXJ5KSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZXNvbHZlKEJ1ZmZlci5mcm9tKGdpZk91dHB1dF8xLnN0cmVhbSgpLnRvRmxhdHRlblVpbnQ4QXJyYXkoKSkpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN3YXAgYW5kIG1lcmdlIHRoZSBmb3JlZ3JvdW5kIGFuZCB0aGUgYmFja2dyb3VuZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDYW52YXNDb250ZXh0LmRyYXdJbWFnZShtYWluQ2FudmFzLCAwLCAwLCBzaXplLCBzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5kcmF3SW1hZ2UoYmFja2dyb3VuZENhbnZhcywgLW1hcmdpbiwgLW1hcmdpbiwgc2l6ZSwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0Q2FudmFzID0gY2FudmFzXzEuY3JlYXRlQ2FudmFzKHJhd1NpemUsIHJhd1NpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dENhbnZhc0NvbnRleHQgPSBvdXRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dENhbnZhc0NvbnRleHQuZHJhd0ltYWdlKG1haW5DYW52YXMsIDAsIDAsIHJhd1NpemUsIHJhd1NpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzID0gb3V0Q2FudmFzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0VsZW1lbnQodGhpcy5jYW52YXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlc29sdmUodGhpcy5jYW52YXMudG9EYXRhVVJMKCkpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVzb2x2ZSh0aGlzLmNhbnZhcy50b0J1ZmZlcigpKV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qL107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQXdlc29tZVFSLkNvcnJlY3RMZXZlbCA9IHFyY29kZV8xLlFSRXJyb3JDb3JyZWN0TGV2ZWw7XG4gICAgQXdlc29tZVFSLmRlZmF1bHRDb21wb25lbnRPcHRpb25zID0ge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBzY2FsZTogMC40LFxuICAgICAgICB9LFxuICAgICAgICB0aW1pbmc6IHtcbiAgICAgICAgICAgIHNjYWxlOiAwLjUsXG4gICAgICAgICAgICBwcm90ZWN0b3JzOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgYWxpZ25tZW50OiB7XG4gICAgICAgICAgICBzY2FsZTogMC41LFxuICAgICAgICAgICAgcHJvdGVjdG9yczogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIGNvcm5lckFsaWdubWVudDoge1xuICAgICAgICAgICAgc2NhbGU6IDAuNSxcbiAgICAgICAgICAgIHByb3RlY3RvcnM6IHRydWUsXG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBBd2Vzb21lUVIuZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgICAgIHRleHQ6IFwiXCIsXG4gICAgICAgIHNpemU6IDQwMCxcbiAgICAgICAgbWFyZ2luOiAyMCxcbiAgICAgICAgY29sb3JEYXJrOiBcIiMwMDAwMDBcIixcbiAgICAgICAgY29sb3JMaWdodDogXCIjZmZmZmZmXCIsXG4gICAgICAgIGNvcnJlY3RMZXZlbDogcXJjb2RlXzEuUVJFcnJvckNvcnJlY3RMZXZlbC5NLFxuICAgICAgICBiYWNrZ3JvdW5kSW1hZ2U6IHVuZGVmaW5lZCxcbiAgICAgICAgYmFja2dyb3VuZERpbW1pbmc6IFwicmdiYSgwLDAsMCwwKVwiLFxuICAgICAgICBsb2dvSW1hZ2U6IHVuZGVmaW5lZCxcbiAgICAgICAgbG9nb1NjYWxlOiAwLjIsXG4gICAgICAgIGxvZ29NYXJnaW46IDQsXG4gICAgICAgIGxvZ29Db3JuZXJSYWRpdXM6IDgsXG4gICAgICAgIHdoaXRlTWFyZ2luOiB0cnVlLFxuICAgICAgICBjb21wb25lbnRzOiBBd2Vzb21lUVIuZGVmYXVsdENvbXBvbmVudE9wdGlvbnMsXG4gICAgICAgIGF1dG9Db2xvcjogdHJ1ZSxcbiAgICB9O1xuICAgIHJldHVybiBBd2Vzb21lUVI7XG59KCkpO1xuZXhwb3J0cy5Bd2Vzb21lUVIgPSBBd2Vzb21lUVI7XG5mdW5jdGlvbiBpc0VsZW1lbnQob2JqKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgLy9Vc2luZyBXMyBET00yICh3b3JrcyBmb3IgRkYsIE9wZXJhIGFuZCBDaHJvbWUpXG4gICAgICAgIHJldHVybiBvYmogaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgLy9Ccm93c2VycyBub3Qgc3VwcG9ydGluZyBXMyBET00yIGRvbid0IGhhdmUgSFRNTEVsZW1lbnQgYW5kXG4gICAgICAgIC8vYW4gZXhjZXB0aW9uIGlzIHRocm93biBhbmQgd2UgZW5kIHVwIGhlcmUuIFRlc3Rpbmcgc29tZVxuICAgICAgICAvL3Byb3BlcnRpZXMgdGhhdCBhbGwgZWxlbWVudHMgaGF2ZSAod29ya3Mgb24gSUU3KVxuICAgICAgICByZXR1cm4gKHR5cGVvZiBvYmogPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIG9iai5ub2RlVHlwZSA9PT0gMSAmJlxuICAgICAgICAgICAgdHlwZW9mIG9iai5zdHlsZSA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgdHlwZW9mIG9iai5vd25lckRvY3VtZW50ID09PSBcIm9iamVjdFwiKTtcbiAgICB9XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qXG4gIEdJRkVuY29kZXIuanNcblxuICBBdXRob3JzXG4gIEtldmluIFdlaW5lciAob3JpZ2luYWwgSmF2YSB2ZXJzaW9uIC0ga3dlaW5lckBmbXN3YXJlLmNvbSlcbiAgVGhpYmF1bHQgSW1iZXJ0IChBUzMgdmVyc2lvbiAtIGJ5dGVhcnJheS5vcmcpXG4gIEpvaGFuIE5vcmRiZXJnIChKUyB2ZXJzaW9uIC0gY29kZUBqb2hhbi1ub3JkYmVyZy5jb20pXG4gIE1ha2l0byAoT3B0aW1pemVkIGZvciBBd2Vzb21lUVIgLSBzdW1pbWFraXRvQGhvdG1haWwsY29tKVxuKi9cbnZhciBOZXVRdWFudCA9IHJlcXVpcmUoXCIuL1R5cGVkTmV1UXVhbnQuanNcIik7XG52YXIgTFpXRW5jb2RlciA9IHJlcXVpcmUoXCIuL0xaV0VuY29kZXIuanNcIik7XG5mdW5jdGlvbiBCeXRlQXJyYXkoKSB7XG4gICAgdGhpcy5wYWdlID0gLTE7XG4gICAgdGhpcy5wYWdlcyA9IFtdO1xuICAgIHRoaXMubmV3UGFnZSgpO1xufVxuQnl0ZUFycmF5LnBhZ2VTaXplID0gNDA5NjtcbkJ5dGVBcnJheS5jaGFyTWFwID0ge307XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgaSsrKVxuICAgIEJ5dGVBcnJheS5jaGFyTWFwW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZShpKTtcbkJ5dGVBcnJheS5wcm90b3R5cGUubmV3UGFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnBhZ2VzWysrdGhpcy5wYWdlXSA9IG5ldyBVaW50OEFycmF5KEJ5dGVBcnJheS5wYWdlU2l6ZSk7XG4gICAgdGhpcy5jdXJzb3IgPSAwO1xufTtcbkJ5dGVBcnJheS5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcnYgPSBcIlwiO1xuICAgIGZvciAodmFyIHAgPSAwOyBwIDwgdGhpcy5wYWdlcy5sZW5ndGg7IHArKykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IEJ5dGVBcnJheS5wYWdlU2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBydiArPSBCeXRlQXJyYXkuY2hhck1hcFt0aGlzLnBhZ2VzW3BdW2ldXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcnY7XG59O1xuQnl0ZUFycmF5LnByb3RvdHlwZS50b0ZsYXR0ZW5VaW50OEFycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjaHVua3MgPSBbXTtcbiAgICBmb3IgKHZhciBwID0gMDsgcCA8IHRoaXMucGFnZXMubGVuZ3RoOyBwKyspIHtcbiAgICAgICAgaWYgKHAgPT09IHRoaXMucGFnZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdmFyIGNodW5rID0gVWludDhBcnJheS5mcm9tKHRoaXMucGFnZXNbcF0uc2xpY2UoMCwgdGhpcy5jdXJzb3IpKTtcbiAgICAgICAgICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNodW5rcy5wdXNoKHRoaXMucGFnZXNbcF0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBmbGF0dGVuID0gbmV3IFVpbnQ4QXJyYXkoY2h1bmtzLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBjaHVuaykgeyByZXR1cm4gYWNjICsgY2h1bmsubGVuZ3RoOyB9LCAwKSk7XG4gICAgY2h1bmtzLnJlZHVjZShmdW5jdGlvbiAobGFzdExlbmd0aCwgY2h1bmspIHtcbiAgICAgICAgZmxhdHRlbi5zZXQoY2h1bmssIGxhc3RMZW5ndGgpO1xuICAgICAgICByZXR1cm4gbGFzdExlbmd0aCArIGNodW5rLmxlbmd0aDtcbiAgICB9LCAwKTtcbiAgICByZXR1cm4gZmxhdHRlbjtcbn07XG5CeXRlQXJyYXkucHJvdG90eXBlLndyaXRlQnl0ZSA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICBpZiAodGhpcy5jdXJzb3IgPj0gQnl0ZUFycmF5LnBhZ2VTaXplKVxuICAgICAgICB0aGlzLm5ld1BhZ2UoKTtcbiAgICB0aGlzLnBhZ2VzW3RoaXMucGFnZV1bdGhpcy5jdXJzb3IrK10gPSB2YWw7XG59O1xuQnl0ZUFycmF5LnByb3RvdHlwZS53cml0ZVVURkJ5dGVzID0gZnVuY3Rpb24gKHN0cmluZykge1xuICAgIGZvciAodmFyIGwgPSBzdHJpbmcubGVuZ3RoLCBpID0gMDsgaSA8IGw7IGkrKylcbiAgICAgICAgdGhpcy53cml0ZUJ5dGUoc3RyaW5nLmNoYXJDb2RlQXQoaSkpO1xufTtcbkJ5dGVBcnJheS5wcm90b3R5cGUud3JpdGVCeXRlcyA9IGZ1bmN0aW9uIChhcnJheSwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgICBmb3IgKHZhciBsID0gbGVuZ3RoIHx8IGFycmF5Lmxlbmd0aCwgaSA9IG9mZnNldCB8fCAwOyBpIDwgbDsgaSsrKVxuICAgICAgICB0aGlzLndyaXRlQnl0ZShhcnJheVtpXSk7XG59O1xuZnVuY3Rpb24gR0lGRW5jb2Rlcih3aWR0aCwgaGVpZ2h0KSB7XG4gICAgLy8gaW1hZ2Ugc2l6ZVxuICAgIHRoaXMud2lkdGggPSB+fndpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gfn5oZWlnaHQ7XG4gICAgLy8gdHJhbnNwYXJlbnQgY29sb3IgaWYgZ2l2ZW5cbiAgICB0aGlzLnRyYW5zcGFyZW50ID0gbnVsbDtcbiAgICAvLyB0cmFuc3BhcmVudCBpbmRleCBpbiBjb2xvciB0YWJsZVxuICAgIHRoaXMudHJhbnNJbmRleCA9IDA7XG4gICAgLy8gLTEgPSBubyByZXBlYXQsIDAgPSBmb3JldmVyLiBhbnl0aGluZyBlbHNlIGlzIHJlcGVhdCBjb3VudFxuICAgIHRoaXMucmVwZWF0ID0gLTE7XG4gICAgLy8gZnJhbWUgZGVsYXkgKGh1bmRyZWR0aHMpXG4gICAgdGhpcy5kZWxheSA9IDA7XG4gICAgdGhpcy5pbWFnZSA9IG51bGw7IC8vIGN1cnJlbnQgZnJhbWVcbiAgICB0aGlzLnBpeGVscyA9IG51bGw7IC8vIEJHUiBieXRlIGFycmF5IGZyb20gZnJhbWVcbiAgICB0aGlzLmluZGV4ZWRQaXhlbHMgPSBudWxsOyAvLyBjb252ZXJ0ZWQgZnJhbWUgaW5kZXhlZCB0byBwYWxldHRlXG4gICAgdGhpcy5jb2xvckRlcHRoID0gbnVsbDsgLy8gbnVtYmVyIG9mIGJpdCBwbGFuZXNcbiAgICB0aGlzLmNvbG9yVGFiID0gbnVsbDsgLy8gUkdCIHBhbGV0dGVcbiAgICB0aGlzLm5ldVF1YW50ID0gbnVsbDsgLy8gTmV1UXVhbnQgaW5zdGFuY2UgdGhhdCB3YXMgdXNlZCB0byBnZW5lcmF0ZSB0aGlzLmNvbG9yVGFiLlxuICAgIHRoaXMudXNlZEVudHJ5ID0gbmV3IEFycmF5KCk7IC8vIGFjdGl2ZSBwYWxldHRlIGVudHJpZXNcbiAgICB0aGlzLnBhbFNpemUgPSA3OyAvLyBjb2xvciB0YWJsZSBzaXplIChiaXRzLTEpXG4gICAgdGhpcy5kaXNwb3NlID0gLTE7IC8vIGRpc3Bvc2FsIGNvZGUgKC0xID0gdXNlIGRlZmF1bHQpXG4gICAgdGhpcy5maXJzdEZyYW1lID0gdHJ1ZTtcbiAgICB0aGlzLnNhbXBsZSA9IDEwOyAvLyBkZWZhdWx0IHNhbXBsZSBpbnRlcnZhbCBmb3IgcXVhbnRpemVyXG4gICAgdGhpcy5kaXRoZXIgPSBmYWxzZTsgLy8gZGVmYXVsdCBkaXRoZXJpbmdcbiAgICB0aGlzLmdsb2JhbFBhbGV0dGUgPSBmYWxzZTtcbiAgICB0aGlzLm91dCA9IG5ldyBCeXRlQXJyYXkoKTtcbn1cbi8qXG4gIFNldHMgdGhlIGRlbGF5IHRpbWUgYmV0d2VlbiBlYWNoIGZyYW1lLCBvciBjaGFuZ2VzIGl0IGZvciBzdWJzZXF1ZW50IGZyYW1lc1xuICAoYXBwbGllcyB0byBsYXN0IGZyYW1lIGFkZGVkKVxuKi9cbkdJRkVuY29kZXIucHJvdG90eXBlLnNldERlbGF5ID0gZnVuY3Rpb24gKG1pbGxpc2Vjb25kcykge1xuICAgIHRoaXMuZGVsYXkgPSBNYXRoLnJvdW5kKG1pbGxpc2Vjb25kcyAvIDEwKTtcbn07XG4vKlxuICBTZXRzIGZyYW1lIHJhdGUgaW4gZnJhbWVzIHBlciBzZWNvbmQuXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuc2V0RnJhbWVSYXRlID0gZnVuY3Rpb24gKGZwcykge1xuICAgIHRoaXMuZGVsYXkgPSBNYXRoLnJvdW5kKDEwMCAvIGZwcyk7XG59O1xuLypcbiAgU2V0cyB0aGUgR0lGIGZyYW1lIGRpc3Bvc2FsIGNvZGUgZm9yIHRoZSBsYXN0IGFkZGVkIGZyYW1lIGFuZCBhbnlcbiAgc3Vic2VxdWVudCBmcmFtZXMuXG5cbiAgRGVmYXVsdCBpcyAwIGlmIG5vIHRyYW5zcGFyZW50IGNvbG9yIGhhcyBiZWVuIHNldCwgb3RoZXJ3aXNlIDIuXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuc2V0RGlzcG9zZSA9IGZ1bmN0aW9uIChkaXNwb3NhbENvZGUpIHtcbiAgICBpZiAoZGlzcG9zYWxDb2RlID49IDApXG4gICAgICAgIHRoaXMuZGlzcG9zZSA9IGRpc3Bvc2FsQ29kZTtcbn07XG4vKlxuICBTZXRzIHRoZSBudW1iZXIgb2YgdGltZXMgdGhlIHNldCBvZiBHSUYgZnJhbWVzIHNob3VsZCBiZSBwbGF5ZWQuXG5cbiAgLTEgPSBwbGF5IG9uY2VcbiAgMCA9IHJlcGVhdCBpbmRlZmluaXRlbHlcblxuICBEZWZhdWx0IGlzIC0xXG5cbiAgTXVzdCBiZSBpbnZva2VkIGJlZm9yZSB0aGUgZmlyc3QgaW1hZ2UgaXMgYWRkZWRcbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5zZXRSZXBlYXQgPSBmdW5jdGlvbiAocmVwZWF0KSB7XG4gICAgdGhpcy5yZXBlYXQgPSByZXBlYXQ7XG59O1xuLypcbiAgU2V0cyB0aGUgdHJhbnNwYXJlbnQgY29sb3IgZm9yIHRoZSBsYXN0IGFkZGVkIGZyYW1lIGFuZCBhbnkgc3Vic2VxdWVudFxuICBmcmFtZXMuIFNpbmNlIGFsbCBjb2xvcnMgYXJlIHN1YmplY3QgdG8gbW9kaWZpY2F0aW9uIGluIHRoZSBxdWFudGl6YXRpb25cbiAgcHJvY2VzcywgdGhlIGNvbG9yIGluIHRoZSBmaW5hbCBwYWxldHRlIGZvciBlYWNoIGZyYW1lIGNsb3Nlc3QgdG8gdGhlIGdpdmVuXG4gIGNvbG9yIGJlY29tZXMgdGhlIHRyYW5zcGFyZW50IGNvbG9yIGZvciB0aGF0IGZyYW1lLiBNYXkgYmUgc2V0IHRvIG51bGwgdG9cbiAgaW5kaWNhdGUgbm8gdHJhbnNwYXJlbnQgY29sb3IuXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuc2V0VHJhbnNwYXJlbnQgPSBmdW5jdGlvbiAoY29sb3IpIHtcbiAgICB0aGlzLnRyYW5zcGFyZW50ID0gY29sb3I7XG59O1xuLypcbiAgQWRkcyBuZXh0IEdJRiBmcmFtZS4gVGhlIGZyYW1lIGlzIG5vdCB3cml0dGVuIGltbWVkaWF0ZWx5LCBidXQgaXNcbiAgYWN0dWFsbHkgZGVmZXJyZWQgdW50aWwgdGhlIG5leHQgZnJhbWUgaXMgcmVjZWl2ZWQgc28gdGhhdCB0aW1pbmdcbiAgZGF0YSBjYW4gYmUgaW5zZXJ0ZWQuICBJbnZva2luZyBmaW5pc2goKSBmbHVzaGVzIGFsbCBmcmFtZXMuXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuYWRkRnJhbWUgPSBmdW5jdGlvbiAoaW1hZ2VEYXRhKSB7XG4gICAgdGhpcy5pbWFnZSA9IGltYWdlRGF0YTtcbiAgICB0aGlzLmNvbG9yVGFiID0gdGhpcy5nbG9iYWxQYWxldHRlICYmIHRoaXMuZ2xvYmFsUGFsZXR0ZS5zbGljZSA/IHRoaXMuZ2xvYmFsUGFsZXR0ZSA6IG51bGw7XG4gICAgdGhpcy5nZXRJbWFnZVBpeGVscygpOyAvLyBjb252ZXJ0IHRvIGNvcnJlY3QgZm9ybWF0IGlmIG5lY2Vzc2FyeVxuICAgIHRoaXMuYW5hbHl6ZVBpeGVscygpOyAvLyBidWlsZCBjb2xvciB0YWJsZSAmIG1hcCBwaXhlbHNcbiAgICBpZiAodGhpcy5nbG9iYWxQYWxldHRlID09PSB0cnVlKVxuICAgICAgICB0aGlzLmdsb2JhbFBhbGV0dGUgPSB0aGlzLmNvbG9yVGFiO1xuICAgIGlmICh0aGlzLmZpcnN0RnJhbWUpIHtcbiAgICAgICAgdGhpcy53cml0ZUhlYWRlcigpO1xuICAgICAgICB0aGlzLndyaXRlTFNEKCk7IC8vIGxvZ2ljYWwgc2NyZWVuIGRlc2NyaXB0aW9yXG4gICAgICAgIHRoaXMud3JpdGVQYWxldHRlKCk7IC8vIGdsb2JhbCBjb2xvciB0YWJsZVxuICAgICAgICBpZiAodGhpcy5yZXBlYXQgPj0gMCkge1xuICAgICAgICAgICAgLy8gdXNlIE5TIGFwcCBleHRlbnNpb24gdG8gaW5kaWNhdGUgcmVwc1xuICAgICAgICAgICAgdGhpcy53cml0ZU5ldHNjYXBlRXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy53cml0ZUdyYXBoaWNDdHJsRXh0KCk7IC8vIHdyaXRlIGdyYXBoaWMgY29udHJvbCBleHRlbnNpb25cbiAgICB0aGlzLndyaXRlSW1hZ2VEZXNjKCk7IC8vIGltYWdlIGRlc2NyaXB0b3JcbiAgICBpZiAoIXRoaXMuZmlyc3RGcmFtZSAmJiAhdGhpcy5nbG9iYWxQYWxldHRlKVxuICAgICAgICB0aGlzLndyaXRlUGFsZXR0ZSgpOyAvLyBsb2NhbCBjb2xvciB0YWJsZVxuICAgIHRoaXMud3JpdGVQaXhlbHMoKTsgLy8gZW5jb2RlIGFuZCB3cml0ZSBwaXhlbCBkYXRhXG4gICAgdGhpcy5maXJzdEZyYW1lID0gZmFsc2U7XG59O1xuLypcbiAgQWRkcyBmaW5hbCB0cmFpbGVyIHRvIHRoZSBHSUYgc3RyZWFtLCBpZiB5b3UgZG9uJ3QgY2FsbCB0aGUgZmluaXNoIG1ldGhvZFxuICB0aGUgR0lGIHN0cmVhbSB3aWxsIG5vdCBiZSB2YWxpZC5cbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5maW5pc2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKDB4M2IpOyAvLyBnaWYgdHJhaWxlclxufTtcbi8qXG4gIFNldHMgcXVhbGl0eSBvZiBjb2xvciBxdWFudGl6YXRpb24gKGNvbnZlcnNpb24gb2YgaW1hZ2VzIHRvIHRoZSBtYXhpbXVtIDI1NlxuICBjb2xvcnMgYWxsb3dlZCBieSB0aGUgR0lGIHNwZWNpZmljYXRpb24pLiBMb3dlciB2YWx1ZXMgKG1pbmltdW0gPSAxKVxuICBwcm9kdWNlIGJldHRlciBjb2xvcnMsIGJ1dCBzbG93IHByb2Nlc3Npbmcgc2lnbmlmaWNhbnRseS4gMTAgaXMgdGhlXG4gIGRlZmF1bHQsIGFuZCBwcm9kdWNlcyBnb29kIGNvbG9yIG1hcHBpbmcgYXQgcmVhc29uYWJsZSBzcGVlZHMuIFZhbHVlc1xuICBncmVhdGVyIHRoYW4gMjAgZG8gbm90IHlpZWxkIHNpZ25pZmljYW50IGltcHJvdmVtZW50cyBpbiBzcGVlZC5cbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5zZXRRdWFsaXR5ID0gZnVuY3Rpb24gKHF1YWxpdHkpIHtcbiAgICBpZiAocXVhbGl0eSA8IDEpXG4gICAgICAgIHF1YWxpdHkgPSAxO1xuICAgIHRoaXMuc2FtcGxlID0gcXVhbGl0eTtcbn07XG4vKlxuICBTZXRzIGRpdGhlcmluZyBtZXRob2QuIEF2YWlsYWJsZSBhcmU6XG4gIC0gRkFMU0Ugbm8gZGl0aGVyaW5nXG4gIC0gVFJVRSBvciBGbG95ZFN0ZWluYmVyZ1xuICAtIEZhbHNlRmxveWRTdGVpbmJlcmdcbiAgLSBTdHVja2lcbiAgLSBBdGtpbnNvblxuICBZb3UgY2FuIGFkZCAnLXNlcnBlbnRpbmUnIHRvIHVzZSBzZXJwZW50aW5lIHNjYW5uaW5nXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuc2V0RGl0aGVyID0gZnVuY3Rpb24gKGRpdGhlcikge1xuICAgIGlmIChkaXRoZXIgPT09IHRydWUpXG4gICAgICAgIGRpdGhlciA9IFwiRmxveWRTdGVpbmJlcmdcIjtcbiAgICB0aGlzLmRpdGhlciA9IGRpdGhlcjtcbn07XG4vKlxuICBTZXRzIGdsb2JhbCBwYWxldHRlIGZvciBhbGwgZnJhbWVzLlxuICBZb3UgY2FuIHByb3ZpZGUgVFJVRSB0byBjcmVhdGUgZ2xvYmFsIHBhbGV0dGUgZnJvbSBmaXJzdCBwaWN0dXJlLlxuICBPciBhbiBhcnJheSBvZiByLGcsYixyLGcsYiwuLi5cbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5zZXRHbG9iYWxQYWxldHRlID0gZnVuY3Rpb24gKHBhbGV0dGUpIHtcbiAgICB0aGlzLmdsb2JhbFBhbGV0dGUgPSBwYWxldHRlO1xufTtcbi8qXG4gIFJldHVybnMgZ2xvYmFsIHBhbGV0dGUgdXNlZCBmb3IgYWxsIGZyYW1lcy5cbiAgSWYgc2V0R2xvYmFsUGFsZXR0ZSh0cnVlKSB3YXMgdXNlZCwgdGhlbiB0aGlzIGZ1bmN0aW9uIHdpbGwgcmV0dXJuXG4gIGNhbGN1bGF0ZWQgcGFsZXR0ZSBhZnRlciB0aGUgZmlyc3QgZnJhbWUgaXMgYWRkZWQuXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuZ2V0R2xvYmFsUGFsZXR0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gKHRoaXMuZ2xvYmFsUGFsZXR0ZSAmJiB0aGlzLmdsb2JhbFBhbGV0dGUuc2xpY2UgJiYgdGhpcy5nbG9iYWxQYWxldHRlLnNsaWNlKDApKSB8fCB0aGlzLmdsb2JhbFBhbGV0dGU7XG59O1xuLypcbiAgV3JpdGVzIEdJRiBmaWxlIGhlYWRlclxuKi9cbkdJRkVuY29kZXIucHJvdG90eXBlLndyaXRlSGVhZGVyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3V0LndyaXRlVVRGQnl0ZXMoXCJHSUY4OWFcIik7XG59O1xuLypcbiAgQW5hbHl6ZXMgY3VycmVudCBmcmFtZSBjb2xvcnMgYW5kIGNyZWF0ZXMgY29sb3IgbWFwLlxuKi9cbkdJRkVuY29kZXIucHJvdG90eXBlLmFuYWx5emVQaXhlbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCF0aGlzLmNvbG9yVGFiKSB7XG4gICAgICAgIHRoaXMubmV1UXVhbnQgPSBuZXcgTmV1UXVhbnQodGhpcy5waXhlbHMsIHRoaXMuc2FtcGxlKTtcbiAgICAgICAgdGhpcy5uZXVRdWFudC5idWlsZENvbG9ybWFwKCk7IC8vIGNyZWF0ZSByZWR1Y2VkIHBhbGV0dGVcbiAgICAgICAgdGhpcy5jb2xvclRhYiA9IHRoaXMubmV1UXVhbnQuZ2V0Q29sb3JtYXAoKTtcbiAgICB9XG4gICAgLy8gbWFwIGltYWdlIHBpeGVscyB0byBuZXcgcGFsZXR0ZVxuICAgIGlmICh0aGlzLmRpdGhlcikge1xuICAgICAgICB0aGlzLmRpdGhlclBpeGVscyh0aGlzLmRpdGhlci5yZXBsYWNlKFwiLXNlcnBlbnRpbmVcIiwgXCJcIiksIHRoaXMuZGl0aGVyLm1hdGNoKC8tc2VycGVudGluZS8pICE9PSBudWxsKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRoaXMuaW5kZXhQaXhlbHMoKTtcbiAgICB9XG4gICAgdGhpcy5waXhlbHMgPSBudWxsO1xuICAgIHRoaXMuY29sb3JEZXB0aCA9IDg7XG4gICAgdGhpcy5wYWxTaXplID0gNztcbiAgICAvLyBnZXQgY2xvc2VzdCBtYXRjaCB0byB0cmFuc3BhcmVudCBjb2xvciBpZiBzcGVjaWZpZWRcbiAgICBpZiAodGhpcy50cmFuc3BhcmVudCAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLnRyYW5zSW5kZXggPSB0aGlzLmZpbmRDbG9zZXN0KHRoaXMudHJhbnNwYXJlbnQsIHRydWUpO1xuICAgIH1cbn07XG4vKlxuICBJbmRleCBwaXhlbHMsIHdpdGhvdXQgZGl0aGVyaW5nXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuaW5kZXhQaXhlbHMgPSBmdW5jdGlvbiAoaW1ncSkge1xuICAgIHZhciBuUGl4ID0gdGhpcy5waXhlbHMubGVuZ3RoIC8gMztcbiAgICB0aGlzLmluZGV4ZWRQaXhlbHMgPSBuZXcgVWludDhBcnJheShuUGl4KTtcbiAgICB2YXIgayA9IDA7XG4gICAgZm9yICh2YXIgaiA9IDA7IGogPCBuUGl4OyBqKyspIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5maW5kQ2xvc2VzdFJHQih0aGlzLnBpeGVsc1trKytdICYgMHhmZiwgdGhpcy5waXhlbHNbaysrXSAmIDB4ZmYsIHRoaXMucGl4ZWxzW2srK10gJiAweGZmKTtcbiAgICAgICAgdGhpcy51c2VkRW50cnlbaW5kZXhdID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5pbmRleGVkUGl4ZWxzW2pdID0gaW5kZXg7XG4gICAgfVxufTtcbi8qXG4gIFRha2VuIGZyb20gaHR0cDovL2pzYmluLmNvbS9pWG9mSWppLzIvZWRpdCBieSBQQUV6XG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuZGl0aGVyUGl4ZWxzID0gZnVuY3Rpb24gKGtlcm5lbCwgc2VycGVudGluZSkge1xuICAgIHZhciBrZXJuZWxzID0ge1xuICAgICAgICBGYWxzZUZsb3lkU3RlaW5iZXJnOiBbXG4gICAgICAgICAgICBbMyAvIDgsIDEsIDBdLFxuICAgICAgICAgICAgWzMgLyA4LCAwLCAxXSxcbiAgICAgICAgICAgIFsyIC8gOCwgMSwgMV0sXG4gICAgICAgIF0sXG4gICAgICAgIEZsb3lkU3RlaW5iZXJnOiBbXG4gICAgICAgICAgICBbNyAvIDE2LCAxLCAwXSxcbiAgICAgICAgICAgIFszIC8gMTYsIC0xLCAxXSxcbiAgICAgICAgICAgIFs1IC8gMTYsIDAsIDFdLFxuICAgICAgICAgICAgWzEgLyAxNiwgMSwgMV0sXG4gICAgICAgIF0sXG4gICAgICAgIFN0dWNraTogW1xuICAgICAgICAgICAgWzggLyA0MiwgMSwgMF0sXG4gICAgICAgICAgICBbNCAvIDQyLCAyLCAwXSxcbiAgICAgICAgICAgIFsyIC8gNDIsIC0yLCAxXSxcbiAgICAgICAgICAgIFs0IC8gNDIsIC0xLCAxXSxcbiAgICAgICAgICAgIFs4IC8gNDIsIDAsIDFdLFxuICAgICAgICAgICAgWzQgLyA0MiwgMSwgMV0sXG4gICAgICAgICAgICBbMiAvIDQyLCAyLCAxXSxcbiAgICAgICAgICAgIFsxIC8gNDIsIC0yLCAyXSxcbiAgICAgICAgICAgIFsyIC8gNDIsIC0xLCAyXSxcbiAgICAgICAgICAgIFs0IC8gNDIsIDAsIDJdLFxuICAgICAgICAgICAgWzIgLyA0MiwgMSwgMl0sXG4gICAgICAgICAgICBbMSAvIDQyLCAyLCAyXSxcbiAgICAgICAgXSxcbiAgICAgICAgQXRraW5zb246IFtcbiAgICAgICAgICAgIFsxIC8gOCwgMSwgMF0sXG4gICAgICAgICAgICBbMSAvIDgsIDIsIDBdLFxuICAgICAgICAgICAgWzEgLyA4LCAtMSwgMV0sXG4gICAgICAgICAgICBbMSAvIDgsIDAsIDFdLFxuICAgICAgICAgICAgWzEgLyA4LCAxLCAxXSxcbiAgICAgICAgICAgIFsxIC8gOCwgMCwgMl0sXG4gICAgICAgIF0sXG4gICAgfTtcbiAgICBpZiAoIWtlcm5lbCB8fCAha2VybmVsc1trZXJuZWxdKSB7XG4gICAgICAgIHRocm93IFwiVW5rbm93biBkaXRoZXJpbmcga2VybmVsOiBcIiArIGtlcm5lbDtcbiAgICB9XG4gICAgdmFyIGRzID0ga2VybmVsc1trZXJuZWxdO1xuICAgIHZhciBpbmRleCA9IDAsIGhlaWdodCA9IHRoaXMuaGVpZ2h0LCB3aWR0aCA9IHRoaXMud2lkdGgsIGRhdGEgPSB0aGlzLnBpeGVscztcbiAgICB2YXIgZGlyZWN0aW9uID0gc2VycGVudGluZSA/IC0xIDogMTtcbiAgICB0aGlzLmluZGV4ZWRQaXhlbHMgPSBuZXcgVWludDhBcnJheSh0aGlzLnBpeGVscy5sZW5ndGggLyAzKTtcbiAgICBmb3IgKHZhciB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgICAgIGlmIChzZXJwZW50aW5lKVxuICAgICAgICAgICAgZGlyZWN0aW9uID0gZGlyZWN0aW9uICogLTE7XG4gICAgICAgIGZvciAodmFyIHggPSBkaXJlY3Rpb24gPT0gMSA/IDAgOiB3aWR0aCAtIDEsIHhlbmQgPSBkaXJlY3Rpb24gPT0gMSA/IHdpZHRoIDogMDsgeCAhPT0geGVuZDsgeCArPSBkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGluZGV4ID0geSAqIHdpZHRoICsgeDtcbiAgICAgICAgICAgIC8vIEdldCBvcmlnaW5hbCBjb2xvdXJcbiAgICAgICAgICAgIHZhciBpZHggPSBpbmRleCAqIDM7XG4gICAgICAgICAgICB2YXIgcjEgPSBkYXRhW2lkeF07XG4gICAgICAgICAgICB2YXIgZzEgPSBkYXRhW2lkeCArIDFdO1xuICAgICAgICAgICAgdmFyIGIxID0gZGF0YVtpZHggKyAyXTtcbiAgICAgICAgICAgIC8vIEdldCBjb252ZXJ0ZWQgY29sb3VyXG4gICAgICAgICAgICBpZHggPSB0aGlzLmZpbmRDbG9zZXN0UkdCKHIxLCBnMSwgYjEpO1xuICAgICAgICAgICAgdGhpcy51c2VkRW50cnlbaWR4XSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmluZGV4ZWRQaXhlbHNbaW5kZXhdID0gaWR4O1xuICAgICAgICAgICAgaWR4ICo9IDM7XG4gICAgICAgICAgICB2YXIgcjIgPSB0aGlzLmNvbG9yVGFiW2lkeF07XG4gICAgICAgICAgICB2YXIgZzIgPSB0aGlzLmNvbG9yVGFiW2lkeCArIDFdO1xuICAgICAgICAgICAgdmFyIGIyID0gdGhpcy5jb2xvclRhYltpZHggKyAyXTtcbiAgICAgICAgICAgIHZhciBlciA9IHIxIC0gcjI7XG4gICAgICAgICAgICB2YXIgZWcgPSBnMSAtIGcyO1xuICAgICAgICAgICAgdmFyIGViID0gYjEgLSBiMjtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBkaXJlY3Rpb24gPT0gMSA/IDAgOiBkcy5sZW5ndGggLSAxLCBlbmQgPSBkaXJlY3Rpb24gPT0gMSA/IGRzLmxlbmd0aCA6IDA7IGkgIT09IGVuZDsgaSArPSBkaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgeDEgPSBkc1tpXVsxXTsgLy8gKmRpcmVjdGlvbjsgIC8vICBTaG91bGQgdGhpcyBieSB0aW1lc2QgYnkgZGlyZWN0aW9uPy4udG8gbWFrZSB0aGUga2VybmVsIGdvIGluIHRoZSBvcHBvc2l0ZSBkaXJlY3Rpb24uLi4uZ290IG5vIGlkZWEuLi4uXG4gICAgICAgICAgICAgICAgdmFyIHkxID0gZHNbaV1bMl07XG4gICAgICAgICAgICAgICAgaWYgKHgxICsgeCA+PSAwICYmIHgxICsgeCA8IHdpZHRoICYmIHkxICsgeSA+PSAwICYmIHkxICsgeSA8IGhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZCA9IGRzW2ldWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZHggPSBpbmRleCArIHgxICsgeTEgKiB3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgaWR4ICo9IDM7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaWR4XSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgZGF0YVtpZHhdICsgZXIgKiBkKSk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaWR4ICsgMV0gPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIGRhdGFbaWR4ICsgMV0gKyBlZyAqIGQpKTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtpZHggKyAyXSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgZGF0YVtpZHggKyAyXSArIGViICogZCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG4vKlxuICBSZXR1cm5zIGluZGV4IG9mIHBhbGV0dGUgY29sb3IgY2xvc2VzdCB0byBjXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuZmluZENsb3Nlc3QgPSBmdW5jdGlvbiAoYywgdXNlZCkge1xuICAgIHJldHVybiB0aGlzLmZpbmRDbG9zZXN0UkdCKChjICYgMHhmZjAwMDApID4+IDE2LCAoYyAmIDB4MDBmZjAwKSA+PiA4LCBjICYgMHgwMDAwZmYsIHVzZWQpO1xufTtcbkdJRkVuY29kZXIucHJvdG90eXBlLmZpbmRDbG9zZXN0UkdCID0gZnVuY3Rpb24gKHIsIGcsIGIsIHVzZWQpIHtcbiAgICBpZiAodGhpcy5jb2xvclRhYiA9PT0gbnVsbClcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIGlmICh0aGlzLm5ldVF1YW50ICYmICF1c2VkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5ldVF1YW50Lmxvb2t1cFJHQihyLCBnLCBiKTtcbiAgICB9XG4gICAgdmFyIGMgPSBiIHwgKGcgPDwgOCkgfCAociA8PCAxNik7XG4gICAgdmFyIG1pbnBvcyA9IDA7XG4gICAgdmFyIGRtaW4gPSAyNTYgKiAyNTYgKiAyNTY7XG4gICAgdmFyIGxlbiA9IHRoaXMuY29sb3JUYWIubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbmRleCA9IDA7IGkgPCBsZW47IGluZGV4KyspIHtcbiAgICAgICAgdmFyIGRyID0gciAtICh0aGlzLmNvbG9yVGFiW2krK10gJiAweGZmKTtcbiAgICAgICAgdmFyIGRnID0gZyAtICh0aGlzLmNvbG9yVGFiW2krK10gJiAweGZmKTtcbiAgICAgICAgdmFyIGRiID0gYiAtICh0aGlzLmNvbG9yVGFiW2krK10gJiAweGZmKTtcbiAgICAgICAgdmFyIGQgPSBkciAqIGRyICsgZGcgKiBkZyArIGRiICogZGI7XG4gICAgICAgIGlmICgoIXVzZWQgfHwgdGhpcy51c2VkRW50cnlbaW5kZXhdKSAmJiBkIDwgZG1pbikge1xuICAgICAgICAgICAgZG1pbiA9IGQ7XG4gICAgICAgICAgICBtaW5wb3MgPSBpbmRleDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWlucG9zO1xufTtcbi8qXG4gIEV4dHJhY3RzIGltYWdlIHBpeGVscyBpbnRvIGJ5dGUgYXJyYXkgcGl4ZWxzXG4gIChyZW1vdmVzIGFscGhhY2hhbm5lbCBmcm9tIGNhbnZhcyBpbWFnZWRhdGEpXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuZ2V0SW1hZ2VQaXhlbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHcgPSB0aGlzLndpZHRoO1xuICAgIHZhciBoID0gdGhpcy5oZWlnaHQ7XG4gICAgdGhpcy5waXhlbHMgPSBuZXcgVWludDhBcnJheSh3ICogaCAqIDMpO1xuICAgIHZhciBkYXRhID0gdGhpcy5pbWFnZTtcbiAgICB2YXIgc3JjUG9zID0gMDtcbiAgICB2YXIgY291bnQgPSAwO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaDsgaSsrKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdzsgaisrKSB7XG4gICAgICAgICAgICB0aGlzLnBpeGVsc1tjb3VudCsrXSA9IGRhdGFbc3JjUG9zKytdO1xuICAgICAgICAgICAgdGhpcy5waXhlbHNbY291bnQrK10gPSBkYXRhW3NyY1BvcysrXTtcbiAgICAgICAgICAgIHRoaXMucGl4ZWxzW2NvdW50KytdID0gZGF0YVtzcmNQb3MrK107XG4gICAgICAgICAgICBzcmNQb3MrKztcbiAgICAgICAgfVxuICAgIH1cbn07XG4vKlxuICBXcml0ZXMgR3JhcGhpYyBDb250cm9sIEV4dGVuc2lvblxuKi9cbkdJRkVuY29kZXIucHJvdG90eXBlLndyaXRlR3JhcGhpY0N0cmxFeHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKDB4MjEpOyAvLyBleHRlbnNpb24gaW50cm9kdWNlclxuICAgIHRoaXMub3V0LndyaXRlQnl0ZSgweGY5KTsgLy8gR0NFIGxhYmVsXG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKDQpOyAvLyBkYXRhIGJsb2NrIHNpemVcbiAgICB2YXIgdHJhbnNwLCBkaXNwO1xuICAgIGlmICh0aGlzLnRyYW5zcGFyZW50ID09PSBudWxsKSB7XG4gICAgICAgIHRyYW5zcCA9IDA7XG4gICAgICAgIGRpc3AgPSAwOyAvLyBkaXNwb3NlID0gbm8gYWN0aW9uXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB0cmFuc3AgPSAxO1xuICAgICAgICBkaXNwID0gMjsgLy8gZm9yY2UgY2xlYXIgaWYgdXNpbmcgdHJhbnNwYXJlbnQgY29sb3JcbiAgICB9XG4gICAgaWYgKHRoaXMuZGlzcG9zZSA+PSAwKSB7XG4gICAgICAgIGRpc3AgPSB0aGlzLmRpc3Bvc2UgJiA3OyAvLyB1c2VyIG92ZXJyaWRlXG4gICAgfVxuICAgIGRpc3AgPDw9IDI7XG4gICAgLy8gcGFja2VkIGZpZWxkc1xuICAgIHRoaXMub3V0LndyaXRlQnl0ZSgwIHwgLy8gMTozIHJlc2VydmVkXG4gICAgICAgIGRpc3AgfCAvLyA0OjYgZGlzcG9zYWxcbiAgICAgICAgMCB8IC8vIDcgdXNlciBpbnB1dCAtIDAgPSBub25lXG4gICAgICAgIHRyYW5zcCAvLyA4IHRyYW5zcGFyZW5jeSBmbGFnXG4gICAgKTtcbiAgICB0aGlzLndyaXRlU2hvcnQodGhpcy5kZWxheSk7IC8vIGRlbGF5IHggMS8xMDAgc2VjXG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKHRoaXMudHJhbnNJbmRleCk7IC8vIHRyYW5zcGFyZW50IGNvbG9yIGluZGV4XG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKDApOyAvLyBibG9jayB0ZXJtaW5hdG9yXG59O1xuLypcbiAgV3JpdGVzIEltYWdlIERlc2NyaXB0b3JcbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS53cml0ZUltYWdlRGVzYyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUoMHgyYyk7IC8vIGltYWdlIHNlcGFyYXRvclxuICAgIHRoaXMud3JpdGVTaG9ydCgwKTsgLy8gaW1hZ2UgcG9zaXRpb24geCx5ID0gMCwwXG4gICAgdGhpcy53cml0ZVNob3J0KDApO1xuICAgIHRoaXMud3JpdGVTaG9ydCh0aGlzLndpZHRoKTsgLy8gaW1hZ2Ugc2l6ZVxuICAgIHRoaXMud3JpdGVTaG9ydCh0aGlzLmhlaWdodCk7XG4gICAgLy8gcGFja2VkIGZpZWxkc1xuICAgIGlmICh0aGlzLmZpcnN0RnJhbWUgfHwgdGhpcy5nbG9iYWxQYWxldHRlKSB7XG4gICAgICAgIC8vIG5vIExDVCAtIEdDVCBpcyB1c2VkIGZvciBmaXJzdCAob3Igb25seSkgZnJhbWVcbiAgICAgICAgdGhpcy5vdXQud3JpdGVCeXRlKDApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gc3BlY2lmeSBub3JtYWwgTENUXG4gICAgICAgIHRoaXMub3V0LndyaXRlQnl0ZSgweDgwIHwgLy8gMSBsb2NhbCBjb2xvciB0YWJsZSAxPXllc1xuICAgICAgICAgICAgMCB8IC8vIDIgaW50ZXJsYWNlIC0gMD1ub1xuICAgICAgICAgICAgMCB8IC8vIDMgc29ydGVkIC0gMD1ub1xuICAgICAgICAgICAgMCB8IC8vIDQtNSByZXNlcnZlZFxuICAgICAgICAgICAgdGhpcy5wYWxTaXplIC8vIDYtOCBzaXplIG9mIGNvbG9yIHRhYmxlXG4gICAgICAgICk7XG4gICAgfVxufTtcbi8qXG4gIFdyaXRlcyBMb2dpY2FsIFNjcmVlbiBEZXNjcmlwdG9yXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUud3JpdGVMU0QgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gbG9naWNhbCBzY3JlZW4gc2l6ZVxuICAgIHRoaXMud3JpdGVTaG9ydCh0aGlzLndpZHRoKTtcbiAgICB0aGlzLndyaXRlU2hvcnQodGhpcy5oZWlnaHQpO1xuICAgIC8vIHBhY2tlZCBmaWVsZHNcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUoMHg4MCB8IC8vIDEgOiBnbG9iYWwgY29sb3IgdGFibGUgZmxhZyA9IDEgKGdjdCB1c2VkKVxuICAgICAgICAweDcwIHwgLy8gMi00IDogY29sb3IgcmVzb2x1dGlvbiA9IDdcbiAgICAgICAgMHgwMCB8IC8vIDUgOiBnY3Qgc29ydCBmbGFnID0gMFxuICAgICAgICB0aGlzLnBhbFNpemUgLy8gNi04IDogZ2N0IHNpemVcbiAgICApO1xuICAgIHRoaXMub3V0LndyaXRlQnl0ZSgwKTsgLy8gYmFja2dyb3VuZCBjb2xvciBpbmRleFxuICAgIHRoaXMub3V0LndyaXRlQnl0ZSgwKTsgLy8gcGl4ZWwgYXNwZWN0IHJhdGlvIC0gYXNzdW1lIDE6MVxufTtcbi8qXG4gIFdyaXRlcyBOZXRzY2FwZSBhcHBsaWNhdGlvbiBleHRlbnNpb24gdG8gZGVmaW5lIHJlcGVhdCBjb3VudC5cbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS53cml0ZU5ldHNjYXBlRXh0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3V0LndyaXRlQnl0ZSgweDIxKTsgLy8gZXh0ZW5zaW9uIGludHJvZHVjZXJcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUoMHhmZik7IC8vIGFwcCBleHRlbnNpb24gbGFiZWxcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUoMTEpOyAvLyBibG9jayBzaXplXG4gICAgdGhpcy5vdXQud3JpdGVVVEZCeXRlcyhcIk5FVFNDQVBFMi4wXCIpOyAvLyBhcHAgaWQgKyBhdXRoIGNvZGVcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUoMyk7IC8vIHN1Yi1ibG9jayBzaXplXG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKDEpOyAvLyBsb29wIHN1Yi1ibG9jayBpZFxuICAgIHRoaXMud3JpdGVTaG9ydCh0aGlzLnJlcGVhdCk7IC8vIGxvb3AgY291bnQgKGV4dHJhIGl0ZXJhdGlvbnMsIDA9cmVwZWF0IGZvcmV2ZXIpXG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKDApOyAvLyBibG9jayB0ZXJtaW5hdG9yXG59O1xuLypcbiAgV3JpdGVzIGNvbG9yIHRhYmxlXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUud3JpdGVQYWxldHRlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3V0LndyaXRlQnl0ZXModGhpcy5jb2xvclRhYik7XG4gICAgdmFyIG4gPSAzICogMjU2IC0gdGhpcy5jb2xvclRhYi5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspXG4gICAgICAgIHRoaXMub3V0LndyaXRlQnl0ZSgwKTtcbn07XG5HSUZFbmNvZGVyLnByb3RvdHlwZS53cml0ZVNob3J0ID0gZnVuY3Rpb24gKHBWYWx1ZSkge1xuICAgIHRoaXMub3V0LndyaXRlQnl0ZShwVmFsdWUgJiAweGZmKTtcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUoKHBWYWx1ZSA+PiA4KSAmIDB4ZmYpO1xufTtcbi8qXG4gIEVuY29kZXMgYW5kIHdyaXRlcyBwaXhlbCBkYXRhXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUud3JpdGVQaXhlbHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVuYyA9IG5ldyBMWldFbmNvZGVyKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCB0aGlzLmluZGV4ZWRQaXhlbHMsIHRoaXMuY29sb3JEZXB0aCk7XG4gICAgZW5jLmVuY29kZSh0aGlzLm91dCk7XG59O1xuLypcbiAgUmV0cmlldmVzIHRoZSBHSUYgc3RyZWFtXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuc3RyZWFtID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLm91dDtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IEdJRkVuY29kZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qXG4gIExaV0VuY29kZXIuanNcblxuICBBdXRob3JzXG4gIEtldmluIFdlaW5lciAob3JpZ2luYWwgSmF2YSB2ZXJzaW9uIC0ga3dlaW5lckBmbXN3YXJlLmNvbSlcbiAgVGhpYmF1bHQgSW1iZXJ0IChBUzMgdmVyc2lvbiAtIGJ5dGVhcnJheS5vcmcpXG4gIEpvaGFuIE5vcmRiZXJnIChKUyB2ZXJzaW9uIC0gY29kZUBqb2hhbi1ub3JkYmVyZy5jb20pXG5cbiAgQWNrbm93bGVkZ2VtZW50c1xuICBHSUZDT01QUi5DIC0gR0lGIEltYWdlIGNvbXByZXNzaW9uIHJvdXRpbmVzXG4gIExlbXBlbC1aaXYgY29tcHJlc3Npb24gYmFzZWQgb24gJ2NvbXByZXNzJy4gR0lGIG1vZGlmaWNhdGlvbnMgYnlcbiAgRGF2aWQgUm93bGV5IChtZ2FyZGlAd2F0ZGNzdS53YXRlcmxvby5lZHUpXG4gIEdJRiBJbWFnZSBjb21wcmVzc2lvbiAtIG1vZGlmaWVkICdjb21wcmVzcydcbiAgQmFzZWQgb246IGNvbXByZXNzLmMgLSBGaWxlIGNvbXByZXNzaW9uIGFsYSBJRUVFIENvbXB1dGVyLCBKdW5lIDE5ODQuXG4gIEJ5IEF1dGhvcnM6IFNwZW5jZXIgVy4gVGhvbWFzIChkZWN2YXghaGFycG8hdXRhaC1jcyF1dGFoLWdyIXRob21hcylcbiAgSmltIE1jS2llIChkZWN2YXghbWN2YXghamltKVxuICBTdGV2ZSBEYXZpZXMgKGRlY3ZheCF2YXgxMzUhcGV0c2QhcGVvcmEhc3JkKVxuICBLZW4gVHVya293c2tpIChkZWN2YXghZGVjd3JsIXR1cnRsZXZheCFrZW4pXG4gIEphbWVzIEEuIFdvb2RzIChkZWN2YXghaWhucDQhYW1lcyFqYXcpXG4gIEpvZSBPcm9zdCAoZGVjdmF4IXZheDEzNSFwZXRzZCFqb2UpXG4qL1xudmFyIEVPRiA9IC0xO1xudmFyIEJJVFMgPSAxMjtcbnZhciBIU0laRSA9IDUwMDM7IC8vIDgwJSBvY2N1cGFuY3lcbnZhciBtYXNrcyA9IFsweDAwMDAsIDB4MDAwMSwgMHgwMDAzLCAweDAwMDcsIDB4MDAwRiwgMHgwMDFGLFxuICAgIDB4MDAzRiwgMHgwMDdGLCAweDAwRkYsIDB4MDFGRiwgMHgwM0ZGLCAweDA3RkYsXG4gICAgMHgwRkZGLCAweDFGRkYsIDB4M0ZGRiwgMHg3RkZGLCAweEZGRkZdO1xuZnVuY3Rpb24gTFpXRW5jb2Rlcih3aWR0aCwgaGVpZ2h0LCBwaXhlbHMsIGNvbG9yRGVwdGgpIHtcbiAgICB2YXIgaW5pdENvZGVTaXplID0gTWF0aC5tYXgoMiwgY29sb3JEZXB0aCk7XG4gICAgdmFyIGFjY3VtID0gbmV3IFVpbnQ4QXJyYXkoMjU2KTtcbiAgICB2YXIgaHRhYiA9IG5ldyBJbnQzMkFycmF5KEhTSVpFKTtcbiAgICB2YXIgY29kZXRhYiA9IG5ldyBJbnQzMkFycmF5KEhTSVpFKTtcbiAgICB2YXIgY3VyX2FjY3VtLCBjdXJfYml0cyA9IDA7XG4gICAgdmFyIGFfY291bnQ7XG4gICAgdmFyIGZyZWVfZW50ID0gMDsgLy8gZmlyc3QgdW51c2VkIGVudHJ5XG4gICAgdmFyIG1heGNvZGU7XG4gICAgLy8gYmxvY2sgY29tcHJlc3Npb24gcGFyYW1ldGVycyAtLSBhZnRlciBhbGwgY29kZXMgYXJlIHVzZWQgdXAsXG4gICAgLy8gYW5kIGNvbXByZXNzaW9uIHJhdGUgY2hhbmdlcywgc3RhcnQgb3Zlci5cbiAgICB2YXIgY2xlYXJfZmxnID0gZmFsc2U7XG4gICAgLy8gQWxnb3JpdGhtOiB1c2Ugb3BlbiBhZGRyZXNzaW5nIGRvdWJsZSBoYXNoaW5nIChubyBjaGFpbmluZykgb24gdGhlXG4gICAgLy8gcHJlZml4IGNvZGUgLyBuZXh0IGNoYXJhY3RlciBjb21iaW5hdGlvbi4gV2UgZG8gYSB2YXJpYW50IG9mIEtudXRoJ3NcbiAgICAvLyBhbGdvcml0aG0gRCAodm9sLiAzLCBzZWMuIDYuNCkgYWxvbmcgd2l0aCBHLiBLbm90dCdzIHJlbGF0aXZlbHktcHJpbWVcbiAgICAvLyBzZWNvbmRhcnkgcHJvYmUuIEhlcmUsIHRoZSBtb2R1bGFyIGRpdmlzaW9uIGZpcnN0IHByb2JlIGlzIGdpdmVzIHdheVxuICAgIC8vIHRvIGEgZmFzdGVyIGV4Y2x1c2l2ZS1vciBtYW5pcHVsYXRpb24uIEFsc28gZG8gYmxvY2sgY29tcHJlc3Npb24gd2l0aFxuICAgIC8vIGFuIGFkYXB0aXZlIHJlc2V0LCB3aGVyZWJ5IHRoZSBjb2RlIHRhYmxlIGlzIGNsZWFyZWQgd2hlbiB0aGUgY29tcHJlc3Npb25cbiAgICAvLyByYXRpbyBkZWNyZWFzZXMsIGJ1dCBhZnRlciB0aGUgdGFibGUgZmlsbHMuIFRoZSB2YXJpYWJsZS1sZW5ndGggb3V0cHV0XG4gICAgLy8gY29kZXMgYXJlIHJlLXNpemVkIGF0IHRoaXMgcG9pbnQsIGFuZCBhIHNwZWNpYWwgQ0xFQVIgY29kZSBpcyBnZW5lcmF0ZWRcbiAgICAvLyBmb3IgdGhlIGRlY29tcHJlc3Nvci4gTGF0ZSBhZGRpdGlvbjogY29uc3RydWN0IHRoZSB0YWJsZSBhY2NvcmRpbmcgdG9cbiAgICAvLyBmaWxlIHNpemUgZm9yIG5vdGljZWFibGUgc3BlZWQgaW1wcm92ZW1lbnQgb24gc21hbGwgZmlsZXMuIFBsZWFzZSBkaXJlY3RcbiAgICAvLyBxdWVzdGlvbnMgYWJvdXQgdGhpcyBpbXBsZW1lbnRhdGlvbiB0byBhbWVzIWphdy5cbiAgICB2YXIgZ19pbml0X2JpdHMsIENsZWFyQ29kZSwgRU9GQ29kZTtcbiAgICB2YXIgcmVtYWluaW5nLCBjdXJQaXhlbCwgbl9iaXRzO1xuICAgIC8vIEFkZCBhIGNoYXJhY3RlciB0byB0aGUgZW5kIG9mIHRoZSBjdXJyZW50IHBhY2tldCwgYW5kIGlmIGl0IGlzIDI1NFxuICAgIC8vIGNoYXJhY3RlcnMsIGZsdXNoIHRoZSBwYWNrZXQgdG8gZGlzay5cbiAgICBmdW5jdGlvbiBjaGFyX291dChjLCBvdXRzKSB7XG4gICAgICAgIGFjY3VtW2FfY291bnQrK10gPSBjO1xuICAgICAgICBpZiAoYV9jb3VudCA+PSAyNTQpXG4gICAgICAgICAgICBmbHVzaF9jaGFyKG91dHMpO1xuICAgIH1cbiAgICAvLyBDbGVhciBvdXQgdGhlIGhhc2ggdGFibGVcbiAgICAvLyB0YWJsZSBjbGVhciBmb3IgYmxvY2sgY29tcHJlc3NcbiAgICBmdW5jdGlvbiBjbF9ibG9jayhvdXRzKSB7XG4gICAgICAgIGNsX2hhc2goSFNJWkUpO1xuICAgICAgICBmcmVlX2VudCA9IENsZWFyQ29kZSArIDI7XG4gICAgICAgIGNsZWFyX2ZsZyA9IHRydWU7XG4gICAgICAgIG91dHB1dChDbGVhckNvZGUsIG91dHMpO1xuICAgIH1cbiAgICAvLyBSZXNldCBjb2RlIHRhYmxlXG4gICAgZnVuY3Rpb24gY2xfaGFzaChoc2l6ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhzaXplOyArK2kpXG4gICAgICAgICAgICBodGFiW2ldID0gLTE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbXByZXNzKGluaXRfYml0cywgb3V0cykge1xuICAgICAgICB2YXIgZmNvZGUsIGMsIGksIGVudCwgZGlzcCwgaHNpemVfcmVnLCBoc2hpZnQ7XG4gICAgICAgIC8vIFNldCB1cCB0aGUgZ2xvYmFsczogZ19pbml0X2JpdHMgLSBpbml0aWFsIG51bWJlciBvZiBiaXRzXG4gICAgICAgIGdfaW5pdF9iaXRzID0gaW5pdF9iaXRzO1xuICAgICAgICAvLyBTZXQgdXAgdGhlIG5lY2Vzc2FyeSB2YWx1ZXNcbiAgICAgICAgY2xlYXJfZmxnID0gZmFsc2U7XG4gICAgICAgIG5fYml0cyA9IGdfaW5pdF9iaXRzO1xuICAgICAgICBtYXhjb2RlID0gTUFYQ09ERShuX2JpdHMpO1xuICAgICAgICBDbGVhckNvZGUgPSAxIDw8IChpbml0X2JpdHMgLSAxKTtcbiAgICAgICAgRU9GQ29kZSA9IENsZWFyQ29kZSArIDE7XG4gICAgICAgIGZyZWVfZW50ID0gQ2xlYXJDb2RlICsgMjtcbiAgICAgICAgYV9jb3VudCA9IDA7IC8vIGNsZWFyIHBhY2tldFxuICAgICAgICBlbnQgPSBuZXh0UGl4ZWwoKTtcbiAgICAgICAgaHNoaWZ0ID0gMDtcbiAgICAgICAgZm9yIChmY29kZSA9IEhTSVpFOyBmY29kZSA8IDY1NTM2OyBmY29kZSAqPSAyKVxuICAgICAgICAgICAgKytoc2hpZnQ7XG4gICAgICAgIGhzaGlmdCA9IDggLSBoc2hpZnQ7IC8vIHNldCBoYXNoIGNvZGUgcmFuZ2UgYm91bmRcbiAgICAgICAgaHNpemVfcmVnID0gSFNJWkU7XG4gICAgICAgIGNsX2hhc2goaHNpemVfcmVnKTsgLy8gY2xlYXIgaGFzaCB0YWJsZVxuICAgICAgICBvdXRwdXQoQ2xlYXJDb2RlLCBvdXRzKTtcbiAgICAgICAgb3V0ZXJfbG9vcDogd2hpbGUgKChjID0gbmV4dFBpeGVsKCkpICE9IEVPRikge1xuICAgICAgICAgICAgZmNvZGUgPSAoYyA8PCBCSVRTKSArIGVudDtcbiAgICAgICAgICAgIGkgPSAoYyA8PCBoc2hpZnQpIF4gZW50OyAvLyB4b3IgaGFzaGluZ1xuICAgICAgICAgICAgaWYgKGh0YWJbaV0gPT09IGZjb2RlKSB7XG4gICAgICAgICAgICAgICAgZW50ID0gY29kZXRhYltpXTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGh0YWJbaV0gPj0gMCkgeyAvLyBub24tZW1wdHkgc2xvdFxuICAgICAgICAgICAgICAgIGRpc3AgPSBoc2l6ZV9yZWcgLSBpOyAvLyBzZWNvbmRhcnkgaGFzaCAoYWZ0ZXIgRy4gS25vdHQpXG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IDApXG4gICAgICAgICAgICAgICAgICAgIGRpc3AgPSAxO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpIC09IGRpc3ApIDwgMClcbiAgICAgICAgICAgICAgICAgICAgICAgIGkgKz0gaHNpemVfcmVnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaHRhYltpXSA9PT0gZmNvZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudCA9IGNvZGV0YWJbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZSBvdXRlcl9sb29wO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoaHRhYltpXSA+PSAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dHB1dChlbnQsIG91dHMpO1xuICAgICAgICAgICAgZW50ID0gYztcbiAgICAgICAgICAgIGlmIChmcmVlX2VudCA8IDEgPDwgQklUUykge1xuICAgICAgICAgICAgICAgIGNvZGV0YWJbaV0gPSBmcmVlX2VudCsrOyAvLyBjb2RlIC0+IGhhc2h0YWJsZVxuICAgICAgICAgICAgICAgIGh0YWJbaV0gPSBmY29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGNsX2Jsb2NrKG91dHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFB1dCBvdXQgdGhlIGZpbmFsIGNvZGUuXG4gICAgICAgIG91dHB1dChlbnQsIG91dHMpO1xuICAgICAgICBvdXRwdXQoRU9GQ29kZSwgb3V0cyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVuY29kZShvdXRzKSB7XG4gICAgICAgIG91dHMud3JpdGVCeXRlKGluaXRDb2RlU2l6ZSk7IC8vIHdyaXRlIFwiaW5pdGlhbCBjb2RlIHNpemVcIiBieXRlXG4gICAgICAgIHJlbWFpbmluZyA9IHdpZHRoICogaGVpZ2h0OyAvLyByZXNldCBuYXZpZ2F0aW9uIHZhcmlhYmxlc1xuICAgICAgICBjdXJQaXhlbCA9IDA7XG4gICAgICAgIGNvbXByZXNzKGluaXRDb2RlU2l6ZSArIDEsIG91dHMpOyAvLyBjb21wcmVzcyBhbmQgd3JpdGUgdGhlIHBpeGVsIGRhdGFcbiAgICAgICAgb3V0cy53cml0ZUJ5dGUoMCk7IC8vIHdyaXRlIGJsb2NrIHRlcm1pbmF0b3JcbiAgICB9XG4gICAgLy8gRmx1c2ggdGhlIHBhY2tldCB0byBkaXNrLCBhbmQgcmVzZXQgdGhlIGFjY3VtdWxhdG9yXG4gICAgZnVuY3Rpb24gZmx1c2hfY2hhcihvdXRzKSB7XG4gICAgICAgIGlmIChhX2NvdW50ID4gMCkge1xuICAgICAgICAgICAgb3V0cy53cml0ZUJ5dGUoYV9jb3VudCk7XG4gICAgICAgICAgICBvdXRzLndyaXRlQnl0ZXMoYWNjdW0sIDAsIGFfY291bnQpO1xuICAgICAgICAgICAgYV9jb3VudCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gTUFYQ09ERShuX2JpdHMpIHtcbiAgICAgICAgcmV0dXJuICgxIDw8IG5fYml0cykgLSAxO1xuICAgIH1cbiAgICAvLyBSZXR1cm4gdGhlIG5leHQgcGl4ZWwgZnJvbSB0aGUgaW1hZ2VcbiAgICBmdW5jdGlvbiBuZXh0UGl4ZWwoKSB7XG4gICAgICAgIGlmIChyZW1haW5pbmcgPT09IDApXG4gICAgICAgICAgICByZXR1cm4gRU9GO1xuICAgICAgICAtLXJlbWFpbmluZztcbiAgICAgICAgdmFyIHBpeCA9IHBpeGVsc1tjdXJQaXhlbCsrXTtcbiAgICAgICAgcmV0dXJuIHBpeCAmIDB4ZmY7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG91dHB1dChjb2RlLCBvdXRzKSB7XG4gICAgICAgIGN1cl9hY2N1bSAmPSBtYXNrc1tjdXJfYml0c107XG4gICAgICAgIGlmIChjdXJfYml0cyA+IDApXG4gICAgICAgICAgICBjdXJfYWNjdW0gfD0gKGNvZGUgPDwgY3VyX2JpdHMpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBjdXJfYWNjdW0gPSBjb2RlO1xuICAgICAgICBjdXJfYml0cyArPSBuX2JpdHM7XG4gICAgICAgIHdoaWxlIChjdXJfYml0cyA+PSA4KSB7XG4gICAgICAgICAgICBjaGFyX291dCgoY3VyX2FjY3VtICYgMHhmZiksIG91dHMpO1xuICAgICAgICAgICAgY3VyX2FjY3VtID4+PSA4O1xuICAgICAgICAgICAgY3VyX2JpdHMgLT0gODtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgbmV4dCBlbnRyeSBpcyBnb2luZyB0byBiZSB0b28gYmlnIGZvciB0aGUgY29kZSBzaXplLFxuICAgICAgICAvLyB0aGVuIGluY3JlYXNlIGl0LCBpZiBwb3NzaWJsZS5cbiAgICAgICAgaWYgKGZyZWVfZW50ID4gbWF4Y29kZSB8fCBjbGVhcl9mbGcpIHtcbiAgICAgICAgICAgIGlmIChjbGVhcl9mbGcpIHtcbiAgICAgICAgICAgICAgICBtYXhjb2RlID0gTUFYQ09ERShuX2JpdHMgPSBnX2luaXRfYml0cyk7XG4gICAgICAgICAgICAgICAgY2xlYXJfZmxnID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICArK25fYml0cztcbiAgICAgICAgICAgICAgICBpZiAobl9iaXRzID09IEJJVFMpXG4gICAgICAgICAgICAgICAgICAgIG1heGNvZGUgPSAxIDw8IEJJVFM7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBtYXhjb2RlID0gTUFYQ09ERShuX2JpdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb2RlID09IEVPRkNvZGUpIHtcbiAgICAgICAgICAgIC8vIEF0IEVPRiwgd3JpdGUgdGhlIHJlc3Qgb2YgdGhlIGJ1ZmZlci5cbiAgICAgICAgICAgIHdoaWxlIChjdXJfYml0cyA+IDApIHtcbiAgICAgICAgICAgICAgICBjaGFyX291dCgoY3VyX2FjY3VtICYgMHhmZiksIG91dHMpO1xuICAgICAgICAgICAgICAgIGN1cl9hY2N1bSA+Pj0gODtcbiAgICAgICAgICAgICAgICBjdXJfYml0cyAtPSA4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmx1c2hfY2hhcihvdXRzKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmVuY29kZSA9IGVuY29kZTtcbn1cbm1vZHVsZS5leHBvcnRzID0gTFpXRW5jb2RlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyogTmV1UXVhbnQgTmV1cmFsLU5ldCBRdWFudGl6YXRpb24gQWxnb3JpdGhtXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDE5OTQgQW50aG9ueSBEZWtrZXJcbiAqXG4gKiBORVVRVUFOVCBOZXVyYWwtTmV0IHF1YW50aXphdGlvbiBhbGdvcml0aG0gYnkgQW50aG9ueSBEZWtrZXIsIDE5OTQuXG4gKiBTZWUgXCJLb2hvbmVuIG5ldXJhbCBuZXR3b3JrcyBmb3Igb3B0aW1hbCBjb2xvdXIgcXVhbnRpemF0aW9uXCJcbiAqIGluIFwiTmV0d29yazogQ29tcHV0YXRpb24gaW4gTmV1cmFsIFN5c3RlbXNcIiBWb2wuIDUgKDE5OTQpIHBwIDM1MS0zNjcuXG4gKiBmb3IgYSBkaXNjdXNzaW9uIG9mIHRoZSBhbGdvcml0aG0uXG4gKiBTZWUgYWxzbyAgaHR0cDovL21lbWJlcnMub3plbWFpbC5jb20uYXUvfmRla2tlci9ORVVRVUFOVC5IVE1MXG4gKlxuICogQW55IHBhcnR5IG9idGFpbmluZyBhIGNvcHkgb2YgdGhlc2UgZmlsZXMgZnJvbSB0aGUgYXV0aG9yLCBkaXJlY3RseSBvclxuICogaW5kaXJlY3RseSwgaXMgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIGEgZnVsbCBhbmQgdW5yZXN0cmljdGVkIGlycmV2b2NhYmxlLFxuICogd29ybGQtd2lkZSwgcGFpZCB1cCwgcm95YWx0eS1mcmVlLCBub25leGNsdXNpdmUgcmlnaHQgYW5kIGxpY2Vuc2UgdG8gZGVhbFxuICogaW4gdGhpcyBzb2Z0d2FyZSBhbmQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIGluY2x1ZGluZyB3aXRob3V0XG4gKiBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLFxuICogYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHdobyByZWNlaXZlXG4gKiBjb3BpZXMgZnJvbSBhbnkgc3VjaCBwYXJ0eSB0byBkbyBzbywgd2l0aCB0aGUgb25seSByZXF1aXJlbWVudCBiZWluZ1xuICogdGhhdCB0aGlzIGNvcHlyaWdodCBub3RpY2UgcmVtYWluIGludGFjdC5cbiAqXG4gKiAoSmF2YVNjcmlwdCBwb3J0IDIwMTIgYnkgSm9oYW4gTm9yZGJlcmcpXG4gKi9cbnZhciBuY3ljbGVzID0gMTAwOyAvLyBudW1iZXIgb2YgbGVhcm5pbmcgY3ljbGVzXG52YXIgbmV0c2l6ZSA9IDI1NjsgLy8gbnVtYmVyIG9mIGNvbG9ycyB1c2VkXG52YXIgbWF4bmV0cG9zID0gbmV0c2l6ZSAtIDE7XG4vLyBkZWZzIGZvciBmcmVxIGFuZCBiaWFzXG52YXIgbmV0Ymlhc3NoaWZ0ID0gNDsgLy8gYmlhcyBmb3IgY29sb3VyIHZhbHVlc1xudmFyIGludGJpYXNzaGlmdCA9IDE2OyAvLyBiaWFzIGZvciBmcmFjdGlvbnNcbnZhciBpbnRiaWFzID0gKDEgPDwgaW50Ymlhc3NoaWZ0KTtcbnZhciBnYW1tYXNoaWZ0ID0gMTA7XG52YXIgZ2FtbWEgPSAoMSA8PCBnYW1tYXNoaWZ0KTtcbnZhciBiZXRhc2hpZnQgPSAxMDtcbnZhciBiZXRhID0gKGludGJpYXMgPj4gYmV0YXNoaWZ0KTsgLyogYmV0YSA9IDEvMTAyNCAqL1xudmFyIGJldGFnYW1tYSA9IChpbnRiaWFzIDw8IChnYW1tYXNoaWZ0IC0gYmV0YXNoaWZ0KSk7XG4vLyBkZWZzIGZvciBkZWNyZWFzaW5nIHJhZGl1cyBmYWN0b3JcbnZhciBpbml0cmFkID0gKG5ldHNpemUgPj4gMyk7IC8vIGZvciAyNTYgY29scywgcmFkaXVzIHN0YXJ0c1xudmFyIHJhZGl1c2JpYXNzaGlmdCA9IDY7IC8vIGF0IDMyLjAgYmlhc2VkIGJ5IDYgYml0c1xudmFyIHJhZGl1c2JpYXMgPSAoMSA8PCByYWRpdXNiaWFzc2hpZnQpO1xudmFyIGluaXRyYWRpdXMgPSAoaW5pdHJhZCAqIHJhZGl1c2JpYXMpOyAvL2FuZCBkZWNyZWFzZXMgYnkgYVxudmFyIHJhZGl1c2RlYyA9IDMwOyAvLyBmYWN0b3Igb2YgMS8zMCBlYWNoIGN5Y2xlXG4vLyBkZWZzIGZvciBkZWNyZWFzaW5nIGFscGhhIGZhY3RvclxudmFyIGFscGhhYmlhc3NoaWZ0ID0gMTA7IC8vIGFscGhhIHN0YXJ0cyBhdCAxLjBcbnZhciBpbml0YWxwaGEgPSAoMSA8PCBhbHBoYWJpYXNzaGlmdCk7XG52YXIgYWxwaGFkZWM7IC8vIGJpYXNlZCBieSAxMCBiaXRzXG4vKiByYWRiaWFzIGFuZCBhbHBoYXJhZGJpYXMgdXNlZCBmb3IgcmFkcG93ZXIgY2FsY3VsYXRpb24gKi9cbnZhciByYWRiaWFzc2hpZnQgPSA4O1xudmFyIHJhZGJpYXMgPSAoMSA8PCByYWRiaWFzc2hpZnQpO1xudmFyIGFscGhhcmFkYnNoaWZ0ID0gKGFscGhhYmlhc3NoaWZ0ICsgcmFkYmlhc3NoaWZ0KTtcbnZhciBhbHBoYXJhZGJpYXMgPSAoMSA8PCBhbHBoYXJhZGJzaGlmdCk7XG4vLyBmb3VyIHByaW1lcyBuZWFyIDUwMCAtIGFzc3VtZSBubyBpbWFnZSBoYXMgYSBsZW5ndGggc28gbGFyZ2UgdGhhdCBpdCBpc1xuLy8gZGl2aXNpYmxlIGJ5IGFsbCBmb3VyIHByaW1lc1xudmFyIHByaW1lMSA9IDQ5OTtcbnZhciBwcmltZTIgPSA0OTE7XG52YXIgcHJpbWUzID0gNDg3O1xudmFyIHByaW1lNCA9IDUwMztcbnZhciBtaW5waWN0dXJlYnl0ZXMgPSAoMyAqIHByaW1lNCk7XG4vKlxuICBDb25zdHJ1Y3RvcjogTmV1UXVhbnRcblxuICBBcmd1bWVudHM6XG5cbiAgcGl4ZWxzIC0gYXJyYXkgb2YgcGl4ZWxzIGluIFJHQiBmb3JtYXRcbiAgc2FtcGxlZmFjIC0gc2FtcGxpbmcgZmFjdG9yIDEgdG8gMzAgd2hlcmUgbG93ZXIgaXMgYmV0dGVyIHF1YWxpdHlcblxuICA+XG4gID4gcGl4ZWxzID0gW3IsIGcsIGIsIHIsIGcsIGIsIHIsIGcsIGIsIC4uXVxuICA+XG4qL1xuZnVuY3Rpb24gTmV1UXVhbnQocGl4ZWxzLCBzYW1wbGVmYWMpIHtcbiAgICB2YXIgbmV0d29yazsgLy8gaW50W25ldHNpemVdWzRdXG4gICAgdmFyIG5ldGluZGV4OyAvLyBmb3IgbmV0d29yayBsb29rdXAgLSByZWFsbHkgMjU2XG4gICAgLy8gYmlhcyBhbmQgZnJlcSBhcnJheXMgZm9yIGxlYXJuaW5nXG4gICAgdmFyIGJpYXM7XG4gICAgdmFyIGZyZXE7XG4gICAgdmFyIHJhZHBvd2VyO1xuICAgIC8qXG4gICAgICBQcml2YXRlIE1ldGhvZDogaW5pdFxuICBcbiAgICAgIHNldHMgdXAgYXJyYXlzXG4gICAgKi9cbiAgICBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICBuZXR3b3JrID0gW107XG4gICAgICAgIG5ldGluZGV4ID0gbmV3IEludDMyQXJyYXkoMjU2KTtcbiAgICAgICAgYmlhcyA9IG5ldyBJbnQzMkFycmF5KG5ldHNpemUpO1xuICAgICAgICBmcmVxID0gbmV3IEludDMyQXJyYXkobmV0c2l6ZSk7XG4gICAgICAgIHJhZHBvd2VyID0gbmV3IEludDMyQXJyYXkobmV0c2l6ZSA+PiAzKTtcbiAgICAgICAgdmFyIGksIHY7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuZXRzaXplOyBpKyspIHtcbiAgICAgICAgICAgIHYgPSAoaSA8PCAobmV0Ymlhc3NoaWZ0ICsgOCkpIC8gbmV0c2l6ZTtcbiAgICAgICAgICAgIG5ldHdvcmtbaV0gPSBuZXcgRmxvYXQ2NEFycmF5KFt2LCB2LCB2LCAwXSk7XG4gICAgICAgICAgICAvL25ldHdvcmtbaV0gPSBbdiwgdiwgdiwgMF1cbiAgICAgICAgICAgIGZyZXFbaV0gPSBpbnRiaWFzIC8gbmV0c2l6ZTtcbiAgICAgICAgICAgIGJpYXNbaV0gPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qXG4gICAgICBQcml2YXRlIE1ldGhvZDogdW5iaWFzbmV0XG4gIFxuICAgICAgdW5iaWFzZXMgbmV0d29yayB0byBnaXZlIGJ5dGUgdmFsdWVzIDAuLjI1NSBhbmQgcmVjb3JkIHBvc2l0aW9uIGkgdG8gcHJlcGFyZSBmb3Igc29ydFxuICAgICovXG4gICAgZnVuY3Rpb24gdW5iaWFzbmV0KCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ldHNpemU7IGkrKykge1xuICAgICAgICAgICAgbmV0d29ya1tpXVswXSA+Pj0gbmV0Ymlhc3NoaWZ0O1xuICAgICAgICAgICAgbmV0d29ya1tpXVsxXSA+Pj0gbmV0Ymlhc3NoaWZ0O1xuICAgICAgICAgICAgbmV0d29ya1tpXVsyXSA+Pj0gbmV0Ymlhc3NoaWZ0O1xuICAgICAgICAgICAgbmV0d29ya1tpXVszXSA9IGk7IC8vIHJlY29yZCBjb2xvciBudW1iZXJcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKlxuICAgICAgUHJpdmF0ZSBNZXRob2Q6IGFsdGVyc2luZ2xlXG4gIFxuICAgICAgbW92ZXMgbmV1cm9uICppKiB0b3dhcmRzIGJpYXNlZCAoYixnLHIpIGJ5IGZhY3RvciAqYWxwaGEqXG4gICAgKi9cbiAgICBmdW5jdGlvbiBhbHRlcnNpbmdsZShhbHBoYSwgaSwgYiwgZywgcikge1xuICAgICAgICBuZXR3b3JrW2ldWzBdIC09IChhbHBoYSAqIChuZXR3b3JrW2ldWzBdIC0gYikpIC8gaW5pdGFscGhhO1xuICAgICAgICBuZXR3b3JrW2ldWzFdIC09IChhbHBoYSAqIChuZXR3b3JrW2ldWzFdIC0gZykpIC8gaW5pdGFscGhhO1xuICAgICAgICBuZXR3b3JrW2ldWzJdIC09IChhbHBoYSAqIChuZXR3b3JrW2ldWzJdIC0gcikpIC8gaW5pdGFscGhhO1xuICAgIH1cbiAgICAvKlxuICAgICAgUHJpdmF0ZSBNZXRob2Q6IGFsdGVybmVpZ2hcbiAgXG4gICAgICBtb3ZlcyBuZXVyb25zIGluICpyYWRpdXMqIGFyb3VuZCBpbmRleCAqaSogdG93YXJkcyBiaWFzZWQgKGIsZyxyKSBieSBmYWN0b3IgKmFscGhhKlxuICAgICovXG4gICAgZnVuY3Rpb24gYWx0ZXJuZWlnaChyYWRpdXMsIGksIGIsIGcsIHIpIHtcbiAgICAgICAgdmFyIGxvID0gTWF0aC5hYnMoaSAtIHJhZGl1cyk7XG4gICAgICAgIHZhciBoaSA9IE1hdGgubWluKGkgKyByYWRpdXMsIG5ldHNpemUpO1xuICAgICAgICB2YXIgaiA9IGkgKyAxO1xuICAgICAgICB2YXIgayA9IGkgLSAxO1xuICAgICAgICB2YXIgbSA9IDE7XG4gICAgICAgIHZhciBwLCBhO1xuICAgICAgICB3aGlsZSAoKGogPCBoaSkgfHwgKGsgPiBsbykpIHtcbiAgICAgICAgICAgIGEgPSByYWRwb3dlclttKytdO1xuICAgICAgICAgICAgaWYgKGogPCBoaSkge1xuICAgICAgICAgICAgICAgIHAgPSBuZXR3b3JrW2orK107XG4gICAgICAgICAgICAgICAgcFswXSAtPSAoYSAqIChwWzBdIC0gYikpIC8gYWxwaGFyYWRiaWFzO1xuICAgICAgICAgICAgICAgIHBbMV0gLT0gKGEgKiAocFsxXSAtIGcpKSAvIGFscGhhcmFkYmlhcztcbiAgICAgICAgICAgICAgICBwWzJdIC09IChhICogKHBbMl0gLSByKSkgLyBhbHBoYXJhZGJpYXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoayA+IGxvKSB7XG4gICAgICAgICAgICAgICAgcCA9IG5ldHdvcmtbay0tXTtcbiAgICAgICAgICAgICAgICBwWzBdIC09IChhICogKHBbMF0gLSBiKSkgLyBhbHBoYXJhZGJpYXM7XG4gICAgICAgICAgICAgICAgcFsxXSAtPSAoYSAqIChwWzFdIC0gZykpIC8gYWxwaGFyYWRiaWFzO1xuICAgICAgICAgICAgICAgIHBbMl0gLT0gKGEgKiAocFsyXSAtIHIpKSAvIGFscGhhcmFkYmlhcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKlxuICAgICAgUHJpdmF0ZSBNZXRob2Q6IGNvbnRlc3RcbiAgXG4gICAgICBzZWFyY2hlcyBmb3IgYmlhc2VkIEJHUiB2YWx1ZXNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGNvbnRlc3QoYiwgZywgcikge1xuICAgICAgICAvKlxuICAgICAgICAgIGZpbmRzIGNsb3Nlc3QgbmV1cm9uIChtaW4gZGlzdCkgYW5kIHVwZGF0ZXMgZnJlcVxuICAgICAgICAgIGZpbmRzIGJlc3QgbmV1cm9uIChtaW4gZGlzdC1iaWFzKSBhbmQgcmV0dXJucyBwb3NpdGlvblxuICAgICAgICAgIGZvciBmcmVxdWVudGx5IGNob3NlbiBuZXVyb25zLCBmcmVxW2ldIGlzIGhpZ2ggYW5kIGJpYXNbaV0gaXMgbmVnYXRpdmVcbiAgICAgICAgICBiaWFzW2ldID0gZ2FtbWEgKiAoKDEgLyBuZXRzaXplKSAtIGZyZXFbaV0pXG4gICAgICAgICovXG4gICAgICAgIHZhciBiZXN0ZCA9IH4oMSA8PCAzMSk7XG4gICAgICAgIHZhciBiZXN0Ymlhc2QgPSBiZXN0ZDtcbiAgICAgICAgdmFyIGJlc3Rwb3MgPSAtMTtcbiAgICAgICAgdmFyIGJlc3RiaWFzcG9zID0gYmVzdHBvcztcbiAgICAgICAgdmFyIGksIG4sIGRpc3QsIGJpYXNkaXN0LCBiZXRhZnJlcTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5ldHNpemU7IGkrKykge1xuICAgICAgICAgICAgbiA9IG5ldHdvcmtbaV07XG4gICAgICAgICAgICBkaXN0ID0gTWF0aC5hYnMoblswXSAtIGIpICsgTWF0aC5hYnMoblsxXSAtIGcpICsgTWF0aC5hYnMoblsyXSAtIHIpO1xuICAgICAgICAgICAgaWYgKGRpc3QgPCBiZXN0ZCkge1xuICAgICAgICAgICAgICAgIGJlc3RkID0gZGlzdDtcbiAgICAgICAgICAgICAgICBiZXN0cG9zID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpYXNkaXN0ID0gZGlzdCAtICgoYmlhc1tpXSkgPj4gKGludGJpYXNzaGlmdCAtIG5ldGJpYXNzaGlmdCkpO1xuICAgICAgICAgICAgaWYgKGJpYXNkaXN0IDwgYmVzdGJpYXNkKSB7XG4gICAgICAgICAgICAgICAgYmVzdGJpYXNkID0gYmlhc2Rpc3Q7XG4gICAgICAgICAgICAgICAgYmVzdGJpYXNwb3MgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmV0YWZyZXEgPSAoZnJlcVtpXSA+PiBiZXRhc2hpZnQpO1xuICAgICAgICAgICAgZnJlcVtpXSAtPSBiZXRhZnJlcTtcbiAgICAgICAgICAgIGJpYXNbaV0gKz0gKGJldGFmcmVxIDw8IGdhbW1hc2hpZnQpO1xuICAgICAgICB9XG4gICAgICAgIGZyZXFbYmVzdHBvc10gKz0gYmV0YTtcbiAgICAgICAgYmlhc1tiZXN0cG9zXSAtPSBiZXRhZ2FtbWE7XG4gICAgICAgIHJldHVybiBiZXN0Ymlhc3BvcztcbiAgICB9XG4gICAgLypcbiAgICAgIFByaXZhdGUgTWV0aG9kOiBpbnhidWlsZFxuICBcbiAgICAgIHNvcnRzIG5ldHdvcmsgYW5kIGJ1aWxkcyBuZXRpbmRleFswLi4yNTVdXG4gICAgKi9cbiAgICBmdW5jdGlvbiBpbnhidWlsZCgpIHtcbiAgICAgICAgdmFyIGksIGosIHAsIHEsIHNtYWxscG9zLCBzbWFsbHZhbCwgcHJldmlvdXNjb2wgPSAwLCBzdGFydHBvcyA9IDA7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBuZXRzaXplOyBpKyspIHtcbiAgICAgICAgICAgIHAgPSBuZXR3b3JrW2ldO1xuICAgICAgICAgICAgc21hbGxwb3MgPSBpO1xuICAgICAgICAgICAgc21hbGx2YWwgPSBwWzFdOyAvLyBpbmRleCBvbiBnXG4gICAgICAgICAgICAvLyBmaW5kIHNtYWxsZXN0IGluIGkuLm5ldHNpemUtMVxuICAgICAgICAgICAgZm9yIChqID0gaSArIDE7IGogPCBuZXRzaXplOyBqKyspIHtcbiAgICAgICAgICAgICAgICBxID0gbmV0d29ya1tqXTtcbiAgICAgICAgICAgICAgICBpZiAocVsxXSA8IHNtYWxsdmFsKSB7IC8vIGluZGV4IG9uIGdcbiAgICAgICAgICAgICAgICAgICAgc21hbGxwb3MgPSBqO1xuICAgICAgICAgICAgICAgICAgICBzbWFsbHZhbCA9IHFbMV07IC8vIGluZGV4IG9uIGdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBxID0gbmV0d29ya1tzbWFsbHBvc107XG4gICAgICAgICAgICAvLyBzd2FwIHAgKGkpIGFuZCBxIChzbWFsbHBvcykgZW50cmllc1xuICAgICAgICAgICAgaWYgKGkgIT0gc21hbGxwb3MpIHtcbiAgICAgICAgICAgICAgICBqID0gcVswXTtcbiAgICAgICAgICAgICAgICBxWzBdID0gcFswXTtcbiAgICAgICAgICAgICAgICBwWzBdID0gajtcbiAgICAgICAgICAgICAgICBqID0gcVsxXTtcbiAgICAgICAgICAgICAgICBxWzFdID0gcFsxXTtcbiAgICAgICAgICAgICAgICBwWzFdID0gajtcbiAgICAgICAgICAgICAgICBqID0gcVsyXTtcbiAgICAgICAgICAgICAgICBxWzJdID0gcFsyXTtcbiAgICAgICAgICAgICAgICBwWzJdID0gajtcbiAgICAgICAgICAgICAgICBqID0gcVszXTtcbiAgICAgICAgICAgICAgICBxWzNdID0gcFszXTtcbiAgICAgICAgICAgICAgICBwWzNdID0gajtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHNtYWxsdmFsIGVudHJ5IGlzIG5vdyBpbiBwb3NpdGlvbiBpXG4gICAgICAgICAgICBpZiAoc21hbGx2YWwgIT0gcHJldmlvdXNjb2wpIHtcbiAgICAgICAgICAgICAgICBuZXRpbmRleFtwcmV2aW91c2NvbF0gPSAoc3RhcnRwb3MgKyBpKSA+PiAxO1xuICAgICAgICAgICAgICAgIGZvciAoaiA9IHByZXZpb3VzY29sICsgMTsgaiA8IHNtYWxsdmFsOyBqKyspXG4gICAgICAgICAgICAgICAgICAgIG5ldGluZGV4W2pdID0gaTtcbiAgICAgICAgICAgICAgICBwcmV2aW91c2NvbCA9IHNtYWxsdmFsO1xuICAgICAgICAgICAgICAgIHN0YXJ0cG9zID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBuZXRpbmRleFtwcmV2aW91c2NvbF0gPSAoc3RhcnRwb3MgKyBtYXhuZXRwb3MpID4+IDE7XG4gICAgICAgIGZvciAoaiA9IHByZXZpb3VzY29sICsgMTsgaiA8IDI1NjsgaisrKVxuICAgICAgICAgICAgbmV0aW5kZXhbal0gPSBtYXhuZXRwb3M7IC8vIHJlYWxseSAyNTZcbiAgICB9XG4gICAgLypcbiAgICAgIFByaXZhdGUgTWV0aG9kOiBpbnhzZWFyY2hcbiAgXG4gICAgICBzZWFyY2hlcyBmb3IgQkdSIHZhbHVlcyAwLi4yNTUgYW5kIHJldHVybnMgYSBjb2xvciBpbmRleFxuICAgICovXG4gICAgZnVuY3Rpb24gaW54c2VhcmNoKGIsIGcsIHIpIHtcbiAgICAgICAgdmFyIGEsIHAsIGRpc3Q7XG4gICAgICAgIHZhciBiZXN0ZCA9IDEwMDA7IC8vIGJpZ2dlc3QgcG9zc2libGUgZGlzdCBpcyAyNTYqM1xuICAgICAgICB2YXIgYmVzdCA9IC0xO1xuICAgICAgICB2YXIgaSA9IG5ldGluZGV4W2ddOyAvLyBpbmRleCBvbiBnXG4gICAgICAgIHZhciBqID0gaSAtIDE7IC8vIHN0YXJ0IGF0IG5ldGluZGV4W2ddIGFuZCB3b3JrIG91dHdhcmRzXG4gICAgICAgIHdoaWxlICgoaSA8IG5ldHNpemUpIHx8IChqID49IDApKSB7XG4gICAgICAgICAgICBpZiAoaSA8IG5ldHNpemUpIHtcbiAgICAgICAgICAgICAgICBwID0gbmV0d29ya1tpXTtcbiAgICAgICAgICAgICAgICBkaXN0ID0gcFsxXSAtIGc7IC8vIGlueCBrZXlcbiAgICAgICAgICAgICAgICBpZiAoZGlzdCA+PSBiZXN0ZClcbiAgICAgICAgICAgICAgICAgICAgaSA9IG5ldHNpemU7IC8vIHN0b3AgaXRlclxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgMClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3QgPSAtZGlzdDtcbiAgICAgICAgICAgICAgICAgICAgYSA9IHBbMF0gLSBiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYSA8IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBhID0gLWE7XG4gICAgICAgICAgICAgICAgICAgIGRpc3QgKz0gYTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3QgPCBiZXN0ZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYSA9IHBbMl0gLSByO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEgPCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgPSAtYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3QgKz0gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgYmVzdGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0ZCA9IGRpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdCA9IHBbM107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaiA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcCA9IG5ldHdvcmtbal07XG4gICAgICAgICAgICAgICAgZGlzdCA9IGcgLSBwWzFdOyAvLyBpbngga2V5IC0gcmV2ZXJzZSBkaWZcbiAgICAgICAgICAgICAgICBpZiAoZGlzdCA+PSBiZXN0ZClcbiAgICAgICAgICAgICAgICAgICAgaiA9IC0xOyAvLyBzdG9wIGl0ZXJcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgai0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0ID0gLWRpc3Q7XG4gICAgICAgICAgICAgICAgICAgIGEgPSBwWzBdIC0gYjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGEgPCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgYSA9IC1hO1xuICAgICAgICAgICAgICAgICAgICBkaXN0ICs9IGE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgYmVzdGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGEgPSBwWzJdIC0gcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhIDwgMClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhID0gLWE7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0ICs9IGE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8IGJlc3RkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdGQgPSBkaXN0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3QgPSBwWzNdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZXN0O1xuICAgIH1cbiAgICAvKlxuICAgICAgUHJpdmF0ZSBNZXRob2Q6IGxlYXJuXG4gIFxuICAgICAgXCJNYWluIExlYXJuaW5nIExvb3BcIlxuICAgICovXG4gICAgZnVuY3Rpb24gbGVhcm4oKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgbGVuZ3RoY291bnQgPSBwaXhlbHMubGVuZ3RoO1xuICAgICAgICB2YXIgYWxwaGFkZWMgPSAzMCArICgoc2FtcGxlZmFjIC0gMSkgLyAzKTtcbiAgICAgICAgdmFyIHNhbXBsZXBpeGVscyA9IGxlbmd0aGNvdW50IC8gKDMgKiBzYW1wbGVmYWMpO1xuICAgICAgICB2YXIgZGVsdGEgPSB+fihzYW1wbGVwaXhlbHMgLyBuY3ljbGVzKTtcbiAgICAgICAgdmFyIGFscGhhID0gaW5pdGFscGhhO1xuICAgICAgICB2YXIgcmFkaXVzID0gaW5pdHJhZGl1cztcbiAgICAgICAgdmFyIHJhZCA9IHJhZGl1cyA+PiByYWRpdXNiaWFzc2hpZnQ7XG4gICAgICAgIGlmIChyYWQgPD0gMSlcbiAgICAgICAgICAgIHJhZCA9IDA7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCByYWQ7IGkrKylcbiAgICAgICAgICAgIHJhZHBvd2VyW2ldID0gYWxwaGEgKiAoKChyYWQgKiByYWQgLSBpICogaSkgKiByYWRiaWFzKSAvIChyYWQgKiByYWQpKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIGlmIChsZW5ndGhjb3VudCA8IG1pbnBpY3R1cmVieXRlcykge1xuICAgICAgICAgICAgc2FtcGxlZmFjID0gMTtcbiAgICAgICAgICAgIHN0ZXAgPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChsZW5ndGhjb3VudCAlIHByaW1lMSkgIT09IDApIHtcbiAgICAgICAgICAgIHN0ZXAgPSAzICogcHJpbWUxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChsZW5ndGhjb3VudCAlIHByaW1lMikgIT09IDApIHtcbiAgICAgICAgICAgIHN0ZXAgPSAzICogcHJpbWUyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKChsZW5ndGhjb3VudCAlIHByaW1lMykgIT09IDApIHtcbiAgICAgICAgICAgIHN0ZXAgPSAzICogcHJpbWUzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgc3RlcCA9IDMgKiBwcmltZTQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGIsIGcsIHIsIGo7XG4gICAgICAgIHZhciBwaXggPSAwOyAvLyBjdXJyZW50IHBpeGVsXG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSAoaSA8IHNhbXBsZXBpeGVscykge1xuICAgICAgICAgICAgYiA9IChwaXhlbHNbcGl4XSAmIDB4ZmYpIDw8IG5ldGJpYXNzaGlmdDtcbiAgICAgICAgICAgIGcgPSAocGl4ZWxzW3BpeCArIDFdICYgMHhmZikgPDwgbmV0Ymlhc3NoaWZ0O1xuICAgICAgICAgICAgciA9IChwaXhlbHNbcGl4ICsgMl0gJiAweGZmKSA8PCBuZXRiaWFzc2hpZnQ7XG4gICAgICAgICAgICBqID0gY29udGVzdChiLCBnLCByKTtcbiAgICAgICAgICAgIGFsdGVyc2luZ2xlKGFscGhhLCBqLCBiLCBnLCByKTtcbiAgICAgICAgICAgIGlmIChyYWQgIT09IDApXG4gICAgICAgICAgICAgICAgYWx0ZXJuZWlnaChyYWQsIGosIGIsIGcsIHIpOyAvLyBhbHRlciBuZWlnaGJvdXJzXG4gICAgICAgICAgICBwaXggKz0gc3RlcDtcbiAgICAgICAgICAgIGlmIChwaXggPj0gbGVuZ3RoY291bnQpXG4gICAgICAgICAgICAgICAgcGl4IC09IGxlbmd0aGNvdW50O1xuICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgaWYgKGRlbHRhID09PSAwKVxuICAgICAgICAgICAgICAgIGRlbHRhID0gMTtcbiAgICAgICAgICAgIGlmIChpICUgZGVsdGEgPT09IDApIHtcbiAgICAgICAgICAgICAgICBhbHBoYSAtPSBhbHBoYSAvIGFscGhhZGVjO1xuICAgICAgICAgICAgICAgIHJhZGl1cyAtPSByYWRpdXMgLyByYWRpdXNkZWM7XG4gICAgICAgICAgICAgICAgcmFkID0gcmFkaXVzID4+IHJhZGl1c2JpYXNzaGlmdDtcbiAgICAgICAgICAgICAgICBpZiAocmFkIDw9IDEpXG4gICAgICAgICAgICAgICAgICAgIHJhZCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IHJhZDsgaisrKVxuICAgICAgICAgICAgICAgICAgICByYWRwb3dlcltqXSA9IGFscGhhICogKCgocmFkICogcmFkIC0gaiAqIGopICogcmFkYmlhcykgLyAocmFkICogcmFkKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLypcbiAgICAgIE1ldGhvZDogYnVpbGRDb2xvcm1hcFxuICBcbiAgICAgIDEuIGluaXRpYWxpemVzIG5ldHdvcmtcbiAgICAgIDIuIHRyYWlucyBpdFxuICAgICAgMy4gcmVtb3ZlcyBtaXNjb25jZXB0aW9uc1xuICAgICAgNC4gYnVpbGRzIGNvbG9yaW5kZXhcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGJ1aWxkQ29sb3JtYXAoKSB7XG4gICAgICAgIGluaXQoKTtcbiAgICAgICAgbGVhcm4oKTtcbiAgICAgICAgdW5iaWFzbmV0KCk7XG4gICAgICAgIGlueGJ1aWxkKCk7XG4gICAgfVxuICAgIHRoaXMuYnVpbGRDb2xvcm1hcCA9IGJ1aWxkQ29sb3JtYXA7XG4gICAgLypcbiAgICAgIE1ldGhvZDogZ2V0Q29sb3JtYXBcbiAgXG4gICAgICBidWlsZHMgY29sb3JtYXAgZnJvbSB0aGUgaW5kZXhcbiAgXG4gICAgICByZXR1cm5zIGFycmF5IGluIHRoZSBmb3JtYXQ6XG4gIFxuICAgICAgPlxuICAgICAgPiBbciwgZywgYiwgciwgZywgYiwgciwgZywgYiwgLi5dXG4gICAgICA+XG4gICAgKi9cbiAgICBmdW5jdGlvbiBnZXRDb2xvcm1hcCgpIHtcbiAgICAgICAgdmFyIG1hcCA9IFtdO1xuICAgICAgICB2YXIgaW5kZXggPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuZXRzaXplOyBpKyspXG4gICAgICAgICAgICBpbmRleFtuZXR3b3JrW2ldWzNdXSA9IGk7XG4gICAgICAgIHZhciBrID0gMDtcbiAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBuZXRzaXplOyBsKyspIHtcbiAgICAgICAgICAgIHZhciBqID0gaW5kZXhbbF07XG4gICAgICAgICAgICBtYXBbaysrXSA9IChuZXR3b3JrW2pdWzBdKTtcbiAgICAgICAgICAgIG1hcFtrKytdID0gKG5ldHdvcmtbal1bMV0pO1xuICAgICAgICAgICAgbWFwW2srK10gPSAobmV0d29ya1tqXVsyXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcDtcbiAgICB9XG4gICAgdGhpcy5nZXRDb2xvcm1hcCA9IGdldENvbG9ybWFwO1xuICAgIC8qXG4gICAgICBNZXRob2Q6IGxvb2t1cFJHQlxuICBcbiAgICAgIGxvb2tzIGZvciB0aGUgY2xvc2VzdCAqciosICpnKiwgKmIqIGNvbG9yIGluIHRoZSBtYXAgYW5kXG4gICAgICByZXR1cm5zIGl0cyBpbmRleFxuICAgICovXG4gICAgdGhpcy5sb29rdXBSR0IgPSBpbnhzZWFyY2g7XG59XG5tb2R1bGUuZXhwb3J0cyA9IE5ldVF1YW50O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIERlaW50ZXJsYWNlIGZ1bmN0aW9uIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL3NoYWNoYWYvanNnaWZcbiAqL1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWludGVybGFjZSA9IHZvaWQgMDtcbmV4cG9ydHMuZGVpbnRlcmxhY2UgPSBmdW5jdGlvbiAocGl4ZWxzLCB3aWR0aCkge1xuICAgIHZhciBuZXdQaXhlbHMgPSBuZXcgQXJyYXkocGl4ZWxzLmxlbmd0aCk7XG4gICAgdmFyIHJvd3MgPSBwaXhlbHMubGVuZ3RoIC8gd2lkdGg7XG4gICAgdmFyIGNwUm93ID0gZnVuY3Rpb24gKHRvUm93LCBmcm9tUm93KSB7XG4gICAgICAgIHZhciBmcm9tUGl4ZWxzID0gcGl4ZWxzLnNsaWNlKGZyb21Sb3cgKiB3aWR0aCwgKGZyb21Sb3cgKyAxKSAqIHdpZHRoKTtcbiAgICAgICAgbmV3UGl4ZWxzLnNwbGljZS5hcHBseShuZXdQaXhlbHMsIFt0b1JvdyAqIHdpZHRoLCB3aWR0aF0uY29uY2F0KGZyb21QaXhlbHMpKTtcbiAgICB9O1xuICAgIC8vIFNlZSBhcHBlbmRpeCBFLlxuICAgIHZhciBvZmZzZXRzID0gWzAsIDQsIDIsIDFdO1xuICAgIHZhciBzdGVwcyA9IFs4LCA4LCA0LCAyXTtcbiAgICB2YXIgZnJvbVJvdyA9IDA7XG4gICAgZm9yICh2YXIgcGFzcyA9IDA7IHBhc3MgPCA0OyBwYXNzKyspIHtcbiAgICAgICAgZm9yICh2YXIgdG9Sb3cgPSBvZmZzZXRzW3Bhc3NdOyB0b1JvdyA8IHJvd3M7IHRvUm93ICs9IHN0ZXBzW3Bhc3NdKSB7XG4gICAgICAgICAgICBjcFJvdyh0b1JvdywgZnJvbVJvdyk7XG4gICAgICAgICAgICBmcm9tUm93Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ld1BpeGVscztcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZGVjb21wcmVzc0ZyYW1lcyA9IGV4cG9ydHMuZGVjb21wcmVzc0ZyYW1lID0gZXhwb3J0cy5wYXJzZUdJRiA9IHZvaWQgMDtcbnZhciBnaWZfMSA9IF9faW1wb3J0RGVmYXVsdChyZXF1aXJlKFwianMtYmluYXJ5LXNjaGVtYS1wYXJzZXIvbGliL3NjaGVtYXMvZ2lmXCIpKTtcbnZhciBqc19iaW5hcnlfc2NoZW1hX3BhcnNlcl8xID0gcmVxdWlyZShcImpzLWJpbmFyeS1zY2hlbWEtcGFyc2VyXCIpO1xudmFyIHVpbnQ4XzEgPSByZXF1aXJlKFwianMtYmluYXJ5LXNjaGVtYS1wYXJzZXIvbGliL3BhcnNlcnMvdWludDhcIik7XG52YXIgZGVpbnRlcmxhY2VfMSA9IHJlcXVpcmUoXCIuL2RlaW50ZXJsYWNlXCIpO1xudmFyIGx6d18xID0gcmVxdWlyZShcIi4vbHp3XCIpO1xuZXhwb3J0cy5wYXJzZUdJRiA9IGZ1bmN0aW9uIChhcnJheUJ1ZmZlcikge1xuICAgIHZhciBieXRlRGF0YSA9IG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKTtcbiAgICByZXR1cm4ganNfYmluYXJ5X3NjaGVtYV9wYXJzZXJfMS5wYXJzZSh1aW50OF8xLmJ1aWxkU3RyZWFtKGJ5dGVEYXRhKSwgZ2lmXzEuZGVmYXVsdCk7XG59O1xudmFyIGdlbmVyYXRlUGF0Y2ggPSBmdW5jdGlvbiAoaW1hZ2UpIHtcbiAgICB2YXIgdG90YWxQaXhlbHMgPSBpbWFnZS5waXhlbHMubGVuZ3RoO1xuICAgIHZhciBwYXRjaERhdGEgPSBuZXcgVWludDhDbGFtcGVkQXJyYXkodG90YWxQaXhlbHMgKiA0KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsUGl4ZWxzOyBpKyspIHtcbiAgICAgICAgdmFyIHBvcyA9IGkgKiA0O1xuICAgICAgICB2YXIgY29sb3JJbmRleCA9IGltYWdlLnBpeGVsc1tpXTtcbiAgICAgICAgdmFyIGNvbG9yID0gaW1hZ2UuY29sb3JUYWJsZVtjb2xvckluZGV4XTtcbiAgICAgICAgcGF0Y2hEYXRhW3Bvc10gPSBjb2xvclswXTtcbiAgICAgICAgcGF0Y2hEYXRhW3BvcyArIDFdID0gY29sb3JbMV07XG4gICAgICAgIHBhdGNoRGF0YVtwb3MgKyAyXSA9IGNvbG9yWzJdO1xuICAgICAgICBwYXRjaERhdGFbcG9zICsgM10gPSBjb2xvckluZGV4ICE9PSBpbWFnZS50cmFuc3BhcmVudEluZGV4ID8gMjU1IDogMDtcbiAgICB9XG4gICAgcmV0dXJuIHBhdGNoRGF0YTtcbn07XG5leHBvcnRzLmRlY29tcHJlc3NGcmFtZSA9IGZ1bmN0aW9uIChmcmFtZSwgZ2N0LCBidWlsZEltYWdlUGF0Y2gpIHtcbiAgICBpZiAoIWZyYW1lLmltYWdlKSB7XG4gICAgICAgIGNvbnNvbGUud2FybignZ2lmIGZyYW1lIGRvZXMgbm90IGhhdmUgYXNzb2NpYXRlZCBpbWFnZS4nKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgaW1hZ2UgPSBmcmFtZS5pbWFnZTtcbiAgICAvLyBnZXQgdGhlIG51bWJlciBvZiBwaXhlbHNcbiAgICB2YXIgdG90YWxQaXhlbHMgPSBpbWFnZS5kZXNjcmlwdG9yLndpZHRoICogaW1hZ2UuZGVzY3JpcHRvci5oZWlnaHQ7XG4gICAgLy8gZG8gbHp3IGRlY29tcHJlc3Npb25cbiAgICB2YXIgcGl4ZWxzID0gbHp3XzEubHp3KGltYWdlLmRhdGEubWluQ29kZVNpemUsIGltYWdlLmRhdGEuYmxvY2tzLCB0b3RhbFBpeGVscyk7XG4gICAgLy8gZGVhbCB3aXRoIGludGVybGFjaW5nIGlmIG5lY2Vzc2FyeVxuICAgIGlmIChpbWFnZS5kZXNjcmlwdG9yLmxjdC5pbnRlcmxhY2VkKSB7XG4gICAgICAgIHBpeGVscyA9IGRlaW50ZXJsYWNlXzEuZGVpbnRlcmxhY2UocGl4ZWxzLCBpbWFnZS5kZXNjcmlwdG9yLndpZHRoKTtcbiAgICB9XG4gICAgdmFyIHJlc3VsdEltYWdlID0ge1xuICAgICAgICBwaXhlbHM6IHBpeGVscyxcbiAgICAgICAgZGltczoge1xuICAgICAgICAgICAgdG9wOiBmcmFtZS5pbWFnZS5kZXNjcmlwdG9yLnRvcCxcbiAgICAgICAgICAgIGxlZnQ6IGZyYW1lLmltYWdlLmRlc2NyaXB0b3IubGVmdCxcbiAgICAgICAgICAgIHdpZHRoOiBmcmFtZS5pbWFnZS5kZXNjcmlwdG9yLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBmcmFtZS5pbWFnZS5kZXNjcmlwdG9yLmhlaWdodFxuICAgICAgICB9XG4gICAgfTtcbiAgICAvLyBjb2xvciB0YWJsZVxuICAgIGlmIChpbWFnZS5kZXNjcmlwdG9yLmxjdCAmJiBpbWFnZS5kZXNjcmlwdG9yLmxjdC5leGlzdHMpIHtcbiAgICAgICAgcmVzdWx0SW1hZ2UuY29sb3JUYWJsZSA9IGltYWdlLmxjdDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJlc3VsdEltYWdlLmNvbG9yVGFibGUgPSBnY3Q7XG4gICAgfVxuICAgIC8vIGFkZCBwZXIgZnJhbWUgcmVsZXZhbnQgZ2NlIGluZm9ybWF0aW9uXG4gICAgaWYgKGZyYW1lLmdjZSkge1xuICAgICAgICByZXN1bHRJbWFnZS5kZWxheSA9IChmcmFtZS5nY2UuZGVsYXkgfHwgMTApICogMTA7IC8vIGNvbnZlcnQgdG8gbXNcbiAgICAgICAgcmVzdWx0SW1hZ2UuZGlzcG9zYWxUeXBlID0gZnJhbWUuZ2NlLmV4dHJhcy5kaXNwb3NhbDtcbiAgICAgICAgLy8gdHJhbnNwYXJlbmN5XG4gICAgICAgIGlmIChmcmFtZS5nY2UuZXh0cmFzLnRyYW5zcGFyZW50Q29sb3JHaXZlbikge1xuICAgICAgICAgICAgcmVzdWx0SW1hZ2UudHJhbnNwYXJlbnRJbmRleCA9IGZyYW1lLmdjZS50cmFuc3BhcmVudENvbG9ySW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gY3JlYXRlIGNhbnZhcyB1c2FibGUgaW1hZ2VkYXRhIGlmIGRlc2lyZWRcbiAgICBpZiAoYnVpbGRJbWFnZVBhdGNoKSB7XG4gICAgICAgIHJlc3VsdEltYWdlLnBhdGNoID0gZ2VuZXJhdGVQYXRjaChyZXN1bHRJbWFnZSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRJbWFnZTtcbn07XG5leHBvcnRzLmRlY29tcHJlc3NGcmFtZXMgPSBmdW5jdGlvbiAocGFyc2VkR2lmLCBidWlsZEltYWdlUGF0Y2hlcykge1xuICAgIHJldHVybiBwYXJzZWRHaWYuZnJhbWVzXG4gICAgICAgIC5maWx0ZXIoZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGYuaW1hZ2U7IH0pXG4gICAgICAgIC5tYXAoZnVuY3Rpb24gKGYpIHsgcmV0dXJuIGV4cG9ydHMuZGVjb21wcmVzc0ZyYW1lKGYsIHBhcnNlZEdpZi5nY3QsIGJ1aWxkSW1hZ2VQYXRjaGVzKTsgfSk7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIGphdmFzY3JpcHQgcG9ydCBvZiBqYXZhIExaVyBkZWNvbXByZXNzaW9uXG4gKiBPcmlnaW5hbCBqYXZhIGF1dGhvciB1cmw6IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2RldnVud2lyZWQvNDQ3OTIzMVxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmx6dyA9IHZvaWQgMDtcbmV4cG9ydHMubHp3ID0gZnVuY3Rpb24gKG1pbkNvZGVTaXplLCBkYXRhLCBwaXhlbENvdW50KSB7XG4gICAgdmFyIE1BWF9TVEFDS19TSVpFID0gNDA5NjtcbiAgICB2YXIgbnVsbENvZGUgPSAtMTtcbiAgICB2YXIgbnBpeCA9IHBpeGVsQ291bnQ7XG4gICAgdmFyIGF2YWlsYWJsZSwgY2xlYXIsIGNvZGVfbWFzaywgY29kZV9zaXplLCBlbmRfb2ZfaW5mb3JtYXRpb24sIGluX2NvZGUsIG9sZF9jb2RlLCBiaXRzLCBjb2RlLCBpLCBkYXR1bSwgZGF0YV9zaXplLCBmaXJzdCwgdG9wLCBiaSwgcGk7XG4gICAgdmFyIGRzdFBpeGVscyA9IG5ldyBBcnJheShwaXhlbENvdW50KTtcbiAgICB2YXIgcHJlZml4ID0gbmV3IEFycmF5KE1BWF9TVEFDS19TSVpFKTtcbiAgICB2YXIgc3VmZml4ID0gbmV3IEFycmF5KE1BWF9TVEFDS19TSVpFKTtcbiAgICB2YXIgcGl4ZWxTdGFjayA9IG5ldyBBcnJheShNQVhfU1RBQ0tfU0laRSArIDEpO1xuICAgIC8vIEluaXRpYWxpemUgR0lGIGRhdGEgc3RyZWFtIGRlY29kZXIuXG4gICAgZGF0YV9zaXplID0gbWluQ29kZVNpemU7XG4gICAgY2xlYXIgPSAxIDw8IGRhdGFfc2l6ZTtcbiAgICBlbmRfb2ZfaW5mb3JtYXRpb24gPSBjbGVhciArIDE7XG4gICAgYXZhaWxhYmxlID0gY2xlYXIgKyAyO1xuICAgIG9sZF9jb2RlID0gbnVsbENvZGU7XG4gICAgY29kZV9zaXplID0gZGF0YV9zaXplICsgMTtcbiAgICBjb2RlX21hc2sgPSAoMSA8PCBjb2RlX3NpemUpIC0gMTtcbiAgICBmb3IgKGNvZGUgPSAwOyBjb2RlIDwgY2xlYXI7IGNvZGUrKykge1xuICAgICAgICBwcmVmaXhbY29kZV0gPSAwO1xuICAgICAgICBzdWZmaXhbY29kZV0gPSBjb2RlO1xuICAgIH1cbiAgICAvLyBEZWNvZGUgR0lGIHBpeGVsIHN0cmVhbS5cbiAgICB2YXIgZGF0dW0sIGJpdHMsIGNvdW50LCBmaXJzdCwgdG9wLCBwaSwgYmk7XG4gICAgZGF0dW0gPSBiaXRzID0gY291bnQgPSBmaXJzdCA9IHRvcCA9IHBpID0gYmkgPSAwO1xuICAgIGZvciAoaSA9IDA7IGkgPCBucGl4Oykge1xuICAgICAgICBpZiAodG9wID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoYml0cyA8IGNvZGVfc2l6ZSkge1xuICAgICAgICAgICAgICAgIC8vIGdldCB0aGUgbmV4dCBieXRlXG4gICAgICAgICAgICAgICAgZGF0dW0gKz0gZGF0YVtiaV0gPDwgYml0cztcbiAgICAgICAgICAgICAgICBiaXRzICs9IDg7XG4gICAgICAgICAgICAgICAgYmkrKztcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEdldCB0aGUgbmV4dCBjb2RlLlxuICAgICAgICAgICAgY29kZSA9IGRhdHVtICYgY29kZV9tYXNrO1xuICAgICAgICAgICAgZGF0dW0gPj49IGNvZGVfc2l6ZTtcbiAgICAgICAgICAgIGJpdHMgLT0gY29kZV9zaXplO1xuICAgICAgICAgICAgLy8gSW50ZXJwcmV0IHRoZSBjb2RlXG4gICAgICAgICAgICBpZiAoY29kZSA+IGF2YWlsYWJsZSB8fCBjb2RlID09IGVuZF9vZl9pbmZvcm1hdGlvbikge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvZGUgPT0gY2xlYXIpIHtcbiAgICAgICAgICAgICAgICAvLyBSZXNldCBkZWNvZGVyLlxuICAgICAgICAgICAgICAgIGNvZGVfc2l6ZSA9IGRhdGFfc2l6ZSArIDE7XG4gICAgICAgICAgICAgICAgY29kZV9tYXNrID0gKDEgPDwgY29kZV9zaXplKSAtIDE7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlID0gY2xlYXIgKyAyO1xuICAgICAgICAgICAgICAgIG9sZF9jb2RlID0gbnVsbENvZGU7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2xkX2NvZGUgPT0gbnVsbENvZGUpIHtcbiAgICAgICAgICAgICAgICBwaXhlbFN0YWNrW3RvcCsrXSA9IHN1ZmZpeFtjb2RlXTtcbiAgICAgICAgICAgICAgICBvbGRfY29kZSA9IGNvZGU7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBjb2RlO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5fY29kZSA9IGNvZGU7XG4gICAgICAgICAgICBpZiAoY29kZSA9PSBhdmFpbGFibGUpIHtcbiAgICAgICAgICAgICAgICBwaXhlbFN0YWNrW3RvcCsrXSA9IGZpcnN0O1xuICAgICAgICAgICAgICAgIGNvZGUgPSBvbGRfY29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlIChjb2RlID4gY2xlYXIpIHtcbiAgICAgICAgICAgICAgICBwaXhlbFN0YWNrW3RvcCsrXSA9IHN1ZmZpeFtjb2RlXTtcbiAgICAgICAgICAgICAgICBjb2RlID0gcHJlZml4W2NvZGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZmlyc3QgPSBzdWZmaXhbY29kZV0gJiAweGZmO1xuICAgICAgICAgICAgcGl4ZWxTdGFja1t0b3ArK10gPSBmaXJzdDtcbiAgICAgICAgICAgIC8vIGFkZCBhIG5ldyBzdHJpbmcgdG8gdGhlIHRhYmxlLCBidXQgb25seSBpZiBzcGFjZSBpcyBhdmFpbGFibGVcbiAgICAgICAgICAgIC8vIGlmIG5vdCwganVzdCBjb250aW51ZSB3aXRoIGN1cnJlbnQgdGFibGUgdW50aWwgYSBjbGVhciBjb2RlIGlzIGZvdW5kXG4gICAgICAgICAgICAvLyAoZGVmZXJyZWQgY2xlYXIgY29kZSBpbXBsZW1lbnRhdGlvbiBhcyBwZXIgR0lGIHNwZWMpXG4gICAgICAgICAgICBpZiAoYXZhaWxhYmxlIDwgTUFYX1NUQUNLX1NJWkUpIHtcbiAgICAgICAgICAgICAgICBwcmVmaXhbYXZhaWxhYmxlXSA9IG9sZF9jb2RlO1xuICAgICAgICAgICAgICAgIHN1ZmZpeFthdmFpbGFibGVdID0gZmlyc3Q7XG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlKys7XG4gICAgICAgICAgICAgICAgaWYgKChhdmFpbGFibGUgJiBjb2RlX21hc2spID09PSAwICYmIGF2YWlsYWJsZSA8IE1BWF9TVEFDS19TSVpFKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvZGVfc2l6ZSsrO1xuICAgICAgICAgICAgICAgICAgICBjb2RlX21hc2sgKz0gYXZhaWxhYmxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9sZF9jb2RlID0gaW5fY29kZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBQb3AgYSBwaXhlbCBvZmYgdGhlIHBpeGVsIHN0YWNrLlxuICAgICAgICB0b3AtLTtcbiAgICAgICAgZHN0UGl4ZWxzW3BpKytdID0gcGl4ZWxTdGFja1t0b3BdO1xuICAgICAgICBpKys7XG4gICAgfVxuICAgIGZvciAoaSA9IHBpOyBpIDwgbnBpeDsgaSsrKSB7XG4gICAgICAgIGRzdFBpeGVsc1tpXSA9IDA7IC8vIGNsZWFyIG1pc3NpbmcgcGl4ZWxzXG4gICAgfVxuICAgIHJldHVybiBkc3RQaXhlbHM7XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19jcmVhdGVCaW5kaW5nID0gKHRoaXMgJiYgdGhpcy5fX2NyZWF0ZUJpbmRpbmcpIHx8IChPYmplY3QuY3JlYXRlID8gKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XG59KSA6IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XG4gICAgb1trMl0gPSBtW2tdO1xufSkpO1xudmFyIF9fZXhwb3J0U3RhciA9ICh0aGlzICYmIHRoaXMuX19leHBvcnRTdGFyKSB8fCBmdW5jdGlvbihtLCBleHBvcnRzKSB7XG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIWV4cG9ydHMuaGFzT3duUHJvcGVydHkocCkpIF9fY3JlYXRlQmluZGluZyhleHBvcnRzLCBtLCBwKTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5fX2V4cG9ydFN0YXIocmVxdWlyZShcIi4vcXJjb2RlXCIpLCBleHBvcnRzKTtcbnZhciBhd2Vzb21lX3FyXzEgPSByZXF1aXJlKFwiLi9hd2Vzb21lLXFyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiQXdlc29tZVFSXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhd2Vzb21lX3FyXzEuQXdlc29tZVFSOyB9IH0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUVJDb2RlIGZvciBKYXZhU2NyaXB0XG4vL1xuLy8gQ29weXJpZ2h0IChjKSAyMDA5IEthenVoaWtvIEFyYXNlXG4vLyBSZS13cml0dGVuIGluIFR5cGVTY3JpcHQgYnkgTWFraXRvIDxzdW1pbWFraXRvQGhvdG1haWwuY29tPlxuLy9cbi8vIFVSTDogaHR0cDovL3d3dy5kLXByb2plY3QuY29tL1xuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTpcbi8vICAgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbi8vXG4vLyBUaGUgd29yZCBcIlFSIENvZGVcIiBpcyByZWdpc3RlcmVkIHRyYWRlbWFyayBvZlxuLy8gREVOU08gV0FWRSBJTkNPUlBPUkFURURcbi8vICAgaHR0cDovL3d3dy5kZW5zby13YXZlLmNvbS9xcmNvZGUvZmFxcGF0ZW50LWUuaHRtbFxuLy9cbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlFSTWF0aCA9IGV4cG9ydHMuUVJVdGlsID0gZXhwb3J0cy5RUk1hc2tQYXR0ZXJuID0gZXhwb3J0cy5RUkVycm9yQ29ycmVjdExldmVsID0gZXhwb3J0cy5RUkNvZGVNb2RlbCA9IHZvaWQgMDtcbmZ1bmN0aW9uIGNoZWNrUVJWZXJzaW9uKHZlcnNpb24sIHNUZXh0LCBuQ29ycmVjdExldmVsKSB7XG4gICAgdmFyIGxlbmd0aCA9IF9nZXRVVEY4TGVuZ3RoKHNUZXh0KTtcbiAgICB2YXIgaSA9IHZlcnNpb24gLSAxO1xuICAgIHZhciBuTGltaXQgPSAwO1xuICAgIHN3aXRjaCAobkNvcnJlY3RMZXZlbCkge1xuICAgICAgICBjYXNlIGV4cG9ydHMuUVJFcnJvckNvcnJlY3RMZXZlbC5MOlxuICAgICAgICAgICAgbkxpbWl0ID0gUVJDb2RlTGltaXRMZW5ndGhbaV1bMF07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBleHBvcnRzLlFSRXJyb3JDb3JyZWN0TGV2ZWwuTTpcbiAgICAgICAgICAgIG5MaW1pdCA9IFFSQ29kZUxpbWl0TGVuZ3RoW2ldWzFdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZXhwb3J0cy5RUkVycm9yQ29ycmVjdExldmVsLlE6XG4gICAgICAgICAgICBuTGltaXQgPSBRUkNvZGVMaW1pdExlbmd0aFtpXVsyXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGV4cG9ydHMuUVJFcnJvckNvcnJlY3RMZXZlbC5IOlxuICAgICAgICAgICAgbkxpbWl0ID0gUVJDb2RlTGltaXRMZW5ndGhbaV1bM107XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIGxlbmd0aCA8PSBuTGltaXQ7XG59XG5mdW5jdGlvbiBfZ2V0VHlwZU51bWJlcihzVGV4dCwgbkNvcnJlY3RMZXZlbCkge1xuICAgIHZhciBuVHlwZSA9IDE7XG4gICAgdmFyIGxlbmd0aCA9IF9nZXRVVEY4TGVuZ3RoKHNUZXh0KTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gUVJDb2RlTGltaXRMZW5ndGgubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIG5MaW1pdCA9IDA7XG4gICAgICAgIHN3aXRjaCAobkNvcnJlY3RMZXZlbCkge1xuICAgICAgICAgICAgY2FzZSBleHBvcnRzLlFSRXJyb3JDb3JyZWN0TGV2ZWwuTDpcbiAgICAgICAgICAgICAgICBuTGltaXQgPSBRUkNvZGVMaW1pdExlbmd0aFtpXVswXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5RUkVycm9yQ29ycmVjdExldmVsLk06XG4gICAgICAgICAgICAgICAgbkxpbWl0ID0gUVJDb2RlTGltaXRMZW5ndGhbaV1bMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuUVJFcnJvckNvcnJlY3RMZXZlbC5ROlxuICAgICAgICAgICAgICAgIG5MaW1pdCA9IFFSQ29kZUxpbWl0TGVuZ3RoW2ldWzJdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBleHBvcnRzLlFSRXJyb3JDb3JyZWN0TGV2ZWwuSDpcbiAgICAgICAgICAgICAgICBuTGltaXQgPSBRUkNvZGVMaW1pdExlbmd0aFtpXVszXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAobGVuZ3RoIDw9IG5MaW1pdCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBuVHlwZSsrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChuVHlwZSA+IFFSQ29kZUxpbWl0TGVuZ3RoLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUb28gbG9uZyBkYXRhXCIpO1xuICAgIH1cbiAgICByZXR1cm4gblR5cGU7XG59XG5mdW5jdGlvbiBfZ2V0VVRGOExlbmd0aChzVGV4dCkge1xuICAgIHZhciByZXBsYWNlZFRleHQgPSBlbmNvZGVVUkkoc1RleHQpXG4gICAgICAgIC50b1N0cmluZygpXG4gICAgICAgIC5yZXBsYWNlKC9cXCVbMC05YS1mQS1GXXsyfS9nLCBcImFcIik7XG4gICAgcmV0dXJuIHJlcGxhY2VkVGV4dC5sZW5ndGggKyAocmVwbGFjZWRUZXh0Lmxlbmd0aCAhPSBOdW1iZXIoc1RleHQpID8gMyA6IDApO1xufVxudmFyIFFSOGJpdEJ5dGUgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUVI4Yml0Qnl0ZShkYXRhKSB7XG4gICAgICAgIHRoaXMubW9kZSA9IFFSTW9kZS5NT0RFXzhCSVRfQllURTtcbiAgICAgICAgdGhpcy5wYXJzZWREYXRhID0gW107XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHZhciBieXRlQXJyYXlzID0gW107XG4gICAgICAgIC8vIEFkZGVkIHRvIHN1cHBvcnQgVVRGLTggQ2hhcmFjdGVyc1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMuZGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBieXRlQXJyYXkgPSBbXTtcbiAgICAgICAgICAgIHZhciBjb2RlID0gdGhpcy5kYXRhLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgICAgICBpZiAoY29kZSA+IDB4MTAwMDApIHtcbiAgICAgICAgICAgICAgICBieXRlQXJyYXlbMF0gPSAweGYwIHwgKChjb2RlICYgMHgxYzAwMDApID4+PiAxOCk7XG4gICAgICAgICAgICAgICAgYnl0ZUFycmF5WzFdID0gMHg4MCB8ICgoY29kZSAmIDB4M2YwMDApID4+PiAxMik7XG4gICAgICAgICAgICAgICAgYnl0ZUFycmF5WzJdID0gMHg4MCB8ICgoY29kZSAmIDB4ZmMwKSA+Pj4gNik7XG4gICAgICAgICAgICAgICAgYnl0ZUFycmF5WzNdID0gMHg4MCB8IChjb2RlICYgMHgzZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb2RlID4gMHg4MDApIHtcbiAgICAgICAgICAgICAgICBieXRlQXJyYXlbMF0gPSAweGUwIHwgKChjb2RlICYgMHhmMDAwKSA+Pj4gMTIpO1xuICAgICAgICAgICAgICAgIGJ5dGVBcnJheVsxXSA9IDB4ODAgfCAoKGNvZGUgJiAweGZjMCkgPj4+IDYpO1xuICAgICAgICAgICAgICAgIGJ5dGVBcnJheVsyXSA9IDB4ODAgfCAoY29kZSAmIDB4M2YpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29kZSA+IDB4ODApIHtcbiAgICAgICAgICAgICAgICBieXRlQXJyYXlbMF0gPSAweGMwIHwgKChjb2RlICYgMHg3YzApID4+PiA2KTtcbiAgICAgICAgICAgICAgICBieXRlQXJyYXlbMV0gPSAweDgwIHwgKGNvZGUgJiAweDNmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ5dGVBcnJheVswXSA9IGNvZGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBieXRlQXJyYXlzLnB1c2goYnl0ZUFycmF5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBhcnNlZERhdGEgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0LmFwcGx5KFtdLCBieXRlQXJyYXlzKTtcbiAgICAgICAgaWYgKHRoaXMucGFyc2VkRGF0YS5sZW5ndGggIT0gdGhpcy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5wYXJzZWREYXRhLnVuc2hpZnQoMTkxKTtcbiAgICAgICAgICAgIHRoaXMucGFyc2VkRGF0YS51bnNoaWZ0KDE4Nyk7XG4gICAgICAgICAgICB0aGlzLnBhcnNlZERhdGEudW5zaGlmdCgyMzkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFFSOGJpdEJ5dGUucHJvdG90eXBlLmdldExlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VkRGF0YS5sZW5ndGg7XG4gICAgfTtcbiAgICBRUjhiaXRCeXRlLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLnBhcnNlZERhdGEubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBidWZmZXIucHV0KHRoaXMucGFyc2VkRGF0YVtpXSwgOCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBRUjhiaXRCeXRlO1xufSgpKTtcbnZhciBRUkNvZGVNb2RlbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBRUkNvZGVNb2RlbCh0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCkge1xuICAgICAgICBpZiAodHlwZU51bWJlciA9PT0gdm9pZCAwKSB7IHR5cGVOdW1iZXIgPSAtMTsgfVxuICAgICAgICBpZiAoZXJyb3JDb3JyZWN0TGV2ZWwgPT09IHZvaWQgMCkgeyBlcnJvckNvcnJlY3RMZXZlbCA9IGV4cG9ydHMuUVJFcnJvckNvcnJlY3RMZXZlbC5MOyB9XG4gICAgICAgIHRoaXMubW9kdWxlQ291bnQgPSAwO1xuICAgICAgICB0aGlzLmRhdGFMaXN0ID0gW107XG4gICAgICAgIHRoaXMudHlwZU51bWJlciA9IHR5cGVOdW1iZXI7XG4gICAgICAgIHRoaXMuZXJyb3JDb3JyZWN0TGV2ZWwgPSBlcnJvckNvcnJlY3RMZXZlbDtcbiAgICAgICAgdGhpcy5tb2R1bGVDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZGF0YUxpc3QgPSBbXTtcbiAgICB9XG4gICAgUVJDb2RlTW9kZWwucHJvdG90eXBlLmFkZERhdGEgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBpZiAodGhpcy50eXBlTnVtYmVyIDw9IDApIHtcbiAgICAgICAgICAgIHRoaXMudHlwZU51bWJlciA9IF9nZXRUeXBlTnVtYmVyKGRhdGEsIHRoaXMuZXJyb3JDb3JyZWN0TGV2ZWwpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMudHlwZU51bWJlciA+IDQwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIFFSIHZlcnNpb246IFwiICsgdGhpcy50eXBlTnVtYmVyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghY2hlY2tRUlZlcnNpb24odGhpcy50eXBlTnVtYmVyLCBkYXRhLCB0aGlzLmVycm9yQ29ycmVjdExldmVsKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkRhdGEgaXMgdG9vIGxvbmcgZm9yIFFSIHZlcnNpb246IFwiICsgdGhpcy50eXBlTnVtYmVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3RGF0YSA9IG5ldyBRUjhiaXRCeXRlKGRhdGEpO1xuICAgICAgICB0aGlzLmRhdGFMaXN0LnB1c2gobmV3RGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YUNhY2hlID0gdW5kZWZpbmVkO1xuICAgIH07XG4gICAgUVJDb2RlTW9kZWwucHJvdG90eXBlLmlzRGFyayA9IGZ1bmN0aW9uIChyb3csIGNvbCkge1xuICAgICAgICBpZiAocm93IDwgMCB8fCB0aGlzLm1vZHVsZUNvdW50IDw9IHJvdyB8fCBjb2wgPCAwIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gY29sKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Iocm93ICsgXCIsXCIgKyBjb2wpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm1vZHVsZXNbcm93XVtjb2xdO1xuICAgIH07XG4gICAgUVJDb2RlTW9kZWwucHJvdG90eXBlLmdldE1vZHVsZUNvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5tb2R1bGVDb3VudDtcbiAgICB9O1xuICAgIFFSQ29kZU1vZGVsLnByb3RvdHlwZS5tYWtlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm1ha2VJbXBsKGZhbHNlLCB0aGlzLmdldEJlc3RNYXNrUGF0dGVybigpKTtcbiAgICB9O1xuICAgIFFSQ29kZU1vZGVsLnByb3RvdHlwZS5tYWtlSW1wbCA9IGZ1bmN0aW9uICh0ZXN0LCBtYXNrUGF0dGVybikge1xuICAgICAgICB0aGlzLm1vZHVsZUNvdW50ID0gdGhpcy50eXBlTnVtYmVyICogNCArIDE3O1xuICAgICAgICB0aGlzLm1vZHVsZXMgPSBuZXcgQXJyYXkodGhpcy5tb2R1bGVDb3VudCk7XG4gICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IHRoaXMubW9kdWxlQ291bnQ7IHJvdysrKSB7XG4gICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93XSA9IG5ldyBBcnJheSh0aGlzLm1vZHVsZUNvdW50KTtcbiAgICAgICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IHRoaXMubW9kdWxlQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW3Jvd11bY29sXSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXR1cFBvc2l0aW9uUHJvYmVQYXR0ZXJuKDAsIDApO1xuICAgICAgICB0aGlzLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4odGhpcy5tb2R1bGVDb3VudCAtIDcsIDApO1xuICAgICAgICB0aGlzLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4oMCwgdGhpcy5tb2R1bGVDb3VudCAtIDcpO1xuICAgICAgICB0aGlzLnNldHVwUG9zaXRpb25BZGp1c3RQYXR0ZXJuKCk7XG4gICAgICAgIHRoaXMuc2V0dXBUaW1pbmdQYXR0ZXJuKCk7XG4gICAgICAgIHRoaXMuc2V0dXBUeXBlSW5mbyh0ZXN0LCBtYXNrUGF0dGVybik7XG4gICAgICAgIGlmICh0aGlzLnR5cGVOdW1iZXIgPj0gNykge1xuICAgICAgICAgICAgdGhpcy5zZXR1cFR5cGVOdW1iZXIodGVzdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuZGF0YUNhY2hlID09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YUNhY2hlID0gUVJDb2RlTW9kZWwuY3JlYXRlRGF0YSh0aGlzLnR5cGVOdW1iZXIsIHRoaXMuZXJyb3JDb3JyZWN0TGV2ZWwsIHRoaXMuZGF0YUxpc3QpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFwRGF0YSh0aGlzLmRhdGFDYWNoZSwgbWFza1BhdHRlcm4pO1xuICAgIH07XG4gICAgUVJDb2RlTW9kZWwucHJvdG90eXBlLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4gPSBmdW5jdGlvbiAocm93LCBjb2wpIHtcbiAgICAgICAgZm9yICh2YXIgciA9IC0xOyByIDw9IDc7IHIrKykge1xuICAgICAgICAgICAgaWYgKHJvdyArIHIgPD0gLTEgfHwgdGhpcy5tb2R1bGVDb3VudCA8PSByb3cgKyByKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgZm9yICh2YXIgYyA9IC0xOyBjIDw9IDc7IGMrKykge1xuICAgICAgICAgICAgICAgIGlmIChjb2wgKyBjIDw9IC0xIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gY29sICsgYylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKCgwIDw9IHIgJiYgciA8PSA2ICYmIChjID09IDAgfHwgYyA9PSA2KSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKDAgPD0gYyAmJiBjIDw9IDYgJiYgKHIgPT0gMCB8fCByID09IDYpKSB8fFxuICAgICAgICAgICAgICAgICAgICAoMiA8PSByICYmIHIgPD0gNCAmJiAyIDw9IGMgJiYgYyA8PSA0KSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY10gPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBRUkNvZGVNb2RlbC5wcm90b3R5cGUuZ2V0QmVzdE1hc2tQYXR0ZXJuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoTnVtYmVyLmlzSW50ZWdlcih0aGlzLm1hc2tQYXR0ZXJuKSAmJiBPYmplY3QudmFsdWVzKGV4cG9ydHMuUVJNYXNrUGF0dGVybikuaW5jbHVkZXModGhpcy5tYXNrUGF0dGVybikpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1hc2tQYXR0ZXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtaW5Mb3N0UG9pbnQgPSAwO1xuICAgICAgICB2YXIgcGF0dGVybiA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICAgICAgICB0aGlzLm1ha2VJbXBsKHRydWUsIGkpO1xuICAgICAgICAgICAgdmFyIGxvc3RQb2ludCA9IFFSVXRpbC5nZXRMb3N0UG9pbnQodGhpcyk7XG4gICAgICAgICAgICBpZiAoaSA9PSAwIHx8IG1pbkxvc3RQb2ludCA+IGxvc3RQb2ludCkge1xuICAgICAgICAgICAgICAgIG1pbkxvc3RQb2ludCA9IGxvc3RQb2ludDtcbiAgICAgICAgICAgICAgICBwYXR0ZXJuID0gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGF0dGVybjtcbiAgICB9O1xuICAgIFFSQ29kZU1vZGVsLnByb3RvdHlwZS5zZXR1cFRpbWluZ1BhdHRlcm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAodmFyIHIgPSA4OyByIDwgdGhpcy5tb2R1bGVDb3VudCAtIDg7IHIrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kdWxlc1tyXVs2XSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1vZHVsZXNbcl1bNl0gPSByICUgMiA9PSAwO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGMgPSA4OyBjIDwgdGhpcy5tb2R1bGVDb3VudCAtIDg7IGMrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMubW9kdWxlc1s2XVtjXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm1vZHVsZXNbNl1bY10gPSBjICUgMiA9PSAwO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBRUkNvZGVNb2RlbC5wcm90b3R5cGUuc2V0dXBQb3NpdGlvbkFkanVzdFBhdHRlcm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwb3MgPSBRUlV0aWwuZ2V0UGF0dGVyblBvc2l0aW9uKHRoaXMudHlwZU51bWJlcik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcG9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHBvcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciByb3cgPSBwb3NbaV07XG4gICAgICAgICAgICAgICAgdmFyIGNvbCA9IHBvc1tqXTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2R1bGVzW3Jvd11bY29sXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gLTI7IHIgPD0gMjsgcisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAtMjsgYyA8PSAyOyBjKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyID09IC0yIHx8IHIgPT0gMiB8fCBjID09IC0yIHx8IGMgPT0gMiB8fCAociA9PSAwICYmIGMgPT0gMCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY10gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW3JvdyArIHJdW2NvbCArIGNdID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFFSQ29kZU1vZGVsLnByb3RvdHlwZS5zZXR1cFR5cGVOdW1iZXIgPSBmdW5jdGlvbiAodGVzdCkge1xuICAgICAgICB2YXIgYml0cyA9IFFSVXRpbC5nZXRCQ0hUeXBlTnVtYmVyKHRoaXMudHlwZU51bWJlcik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG1vZCA9ICF0ZXN0ICYmICgoYml0cyA+PiBpKSAmIDEpID09IDE7XG4gICAgICAgICAgICB0aGlzLm1vZHVsZXNbTWF0aC5mbG9vcihpIC8gMyldWyhpICUgMykgKyB0aGlzLm1vZHVsZUNvdW50IC0gOCAtIDNdID0gbW9kO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG1vZCA9ICF0ZXN0ICYmICgoYml0cyA+PiBpKSAmIDEpID09IDE7XG4gICAgICAgICAgICB0aGlzLm1vZHVsZXNbKGkgJSAzKSArIHRoaXMubW9kdWxlQ291bnQgLSA4IC0gM11bTWF0aC5mbG9vcihpIC8gMyldID0gbW9kO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBRUkNvZGVNb2RlbC5wcm90b3R5cGUuc2V0dXBUeXBlSW5mbyA9IGZ1bmN0aW9uICh0ZXN0LCBtYXNrUGF0dGVybikge1xuICAgICAgICB2YXIgZGF0YSA9ICh0aGlzLmVycm9yQ29ycmVjdExldmVsIDw8IDMpIHwgbWFza1BhdHRlcm47XG4gICAgICAgIHZhciBiaXRzID0gUVJVdGlsLmdldEJDSFR5cGVJbmZvKGRhdGEpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDE1OyBpKyspIHtcbiAgICAgICAgICAgIHZhciBtb2QgPSAhdGVzdCAmJiAoKGJpdHMgPj4gaSkgJiAxKSA9PSAxO1xuICAgICAgICAgICAgaWYgKGkgPCA2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW2ldWzhdID0gbW9kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaSA8IDgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbaSArIDFdWzhdID0gbW9kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW3RoaXMubW9kdWxlQ291bnQgLSAxNSArIGldWzhdID0gbW9kO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTU7IGkrKykge1xuICAgICAgICAgICAgdmFyIG1vZCA9ICF0ZXN0ICYmICgoYml0cyA+PiBpKSAmIDEpID09IDE7XG4gICAgICAgICAgICBpZiAoaSA8IDgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbOF1bdGhpcy5tb2R1bGVDb3VudCAtIGkgLSAxXSA9IG1vZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGkgPCA5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzWzhdWzE1IC0gaSAtIDEgKyAxXSA9IG1vZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlc1s4XVsxNSAtIGkgLSAxXSA9IG1vZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZHVsZXNbdGhpcy5tb2R1bGVDb3VudCAtIDhdWzhdID0gIXRlc3Q7XG4gICAgfTtcbiAgICBRUkNvZGVNb2RlbC5wcm90b3R5cGUubWFwRGF0YSA9IGZ1bmN0aW9uIChkYXRhLCBtYXNrUGF0dGVybikge1xuICAgICAgICB2YXIgaW5jID0gLTE7XG4gICAgICAgIHZhciByb3cgPSB0aGlzLm1vZHVsZUNvdW50IC0gMTtcbiAgICAgICAgdmFyIGJpdEluZGV4ID0gNztcbiAgICAgICAgdmFyIGJ5dGVJbmRleCA9IDA7XG4gICAgICAgIGZvciAodmFyIGNvbCA9IHRoaXMubW9kdWxlQ291bnQgLSAxOyBjb2wgPiAwOyBjb2wgLT0gMikge1xuICAgICAgICAgICAgaWYgKGNvbCA9PSA2KVxuICAgICAgICAgICAgICAgIGNvbC0tO1xuICAgICAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gMDsgYyA8IDI7IGMrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5tb2R1bGVzW3Jvd11bY29sIC0gY10gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRhcmsgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChieXRlSW5kZXggPCBkYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcmsgPSAoKGRhdGFbYnl0ZUluZGV4XSA+Pj4gYml0SW5kZXgpICYgMSkgPT0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXNrID0gUVJVdGlsLmdldE1hc2sobWFza1BhdHRlcm4sIHJvdywgY29sIC0gYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobWFzaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhcmsgPSAhZGFyaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3ddW2NvbCAtIGNdID0gZGFyaztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJpdEluZGV4LS07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYml0SW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBieXRlSW5kZXgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXRJbmRleCA9IDc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcm93ICs9IGluYztcbiAgICAgICAgICAgICAgICBpZiAocm93IDwgMCB8fCB0aGlzLm1vZHVsZUNvdW50IDw9IHJvdykge1xuICAgICAgICAgICAgICAgICAgICByb3cgLT0gaW5jO1xuICAgICAgICAgICAgICAgICAgICBpbmMgPSAtaW5jO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFFSQ29kZU1vZGVsLmNyZWF0ZURhdGEgPSBmdW5jdGlvbiAodHlwZU51bWJlciwgZXJyb3JDb3JyZWN0TGV2ZWwsIGRhdGFMaXN0KSB7XG4gICAgICAgIHZhciByc0Jsb2NrcyA9IFFSUlNCbG9jay5nZXRSU0Jsb2Nrcyh0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCk7XG4gICAgICAgIHZhciBidWZmZXIgPSBuZXcgUVJCaXRCdWZmZXIoKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBkYXRhTGlzdFtpXTtcbiAgICAgICAgICAgIGJ1ZmZlci5wdXQoZGF0YS5tb2RlLCA0KTtcbiAgICAgICAgICAgIGJ1ZmZlci5wdXQoZGF0YS5nZXRMZW5ndGgoKSwgUVJVdGlsLmdldExlbmd0aEluQml0cyhkYXRhLm1vZGUsIHR5cGVOdW1iZXIpKTtcbiAgICAgICAgICAgIGRhdGEud3JpdGUoYnVmZmVyKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG90YWxEYXRhQ291bnQgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJzQmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0b3RhbERhdGFDb3VudCArPSByc0Jsb2Nrc1tpXS5kYXRhQ291bnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSA+IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY29kZSBsZW5ndGggb3ZlcmZsb3cuIChcIiArIGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSArIFwiPlwiICsgdG90YWxEYXRhQ291bnQgKiA4ICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCkgKyA0IDw9IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgICAgICAgYnVmZmVyLnB1dCgwLCA0KTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoYnVmZmVyLmdldExlbmd0aEluQml0cygpICUgOCAhPSAwKSB7XG4gICAgICAgICAgICBidWZmZXIucHV0Qml0KGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgaWYgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSA+PSB0b3RhbERhdGFDb3VudCAqIDgpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ1ZmZlci5wdXQoUVJDb2RlTW9kZWwuUEFEMCwgOCk7XG4gICAgICAgICAgICBpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID49IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVmZmVyLnB1dChRUkNvZGVNb2RlbC5QQUQxLCA4KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUVJDb2RlTW9kZWwuY3JlYXRlQnl0ZXMoYnVmZmVyLCByc0Jsb2Nrcyk7XG4gICAgfTtcbiAgICBRUkNvZGVNb2RlbC5jcmVhdGVCeXRlcyA9IGZ1bmN0aW9uIChidWZmZXIsIHJzQmxvY2tzKSB7XG4gICAgICAgIHZhciBvZmZzZXQgPSAwO1xuICAgICAgICB2YXIgbWF4RGNDb3VudCA9IDA7XG4gICAgICAgIHZhciBtYXhFY0NvdW50ID0gMDtcbiAgICAgICAgdmFyIGRjZGF0YSA9IG5ldyBBcnJheShyc0Jsb2Nrcy5sZW5ndGgpO1xuICAgICAgICB2YXIgZWNkYXRhID0gbmV3IEFycmF5KHJzQmxvY2tzLmxlbmd0aCk7XG4gICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgcnNCbG9ja3MubGVuZ3RoOyByKyspIHtcbiAgICAgICAgICAgIHZhciBkY0NvdW50ID0gcnNCbG9ja3Nbcl0uZGF0YUNvdW50O1xuICAgICAgICAgICAgdmFyIGVjQ291bnQgPSByc0Jsb2Nrc1tyXS50b3RhbENvdW50IC0gZGNDb3VudDtcbiAgICAgICAgICAgIG1heERjQ291bnQgPSBNYXRoLm1heChtYXhEY0NvdW50LCBkY0NvdW50KTtcbiAgICAgICAgICAgIG1heEVjQ291bnQgPSBNYXRoLm1heChtYXhFY0NvdW50LCBlY0NvdW50KTtcbiAgICAgICAgICAgIGRjZGF0YVtyXSA9IG5ldyBBcnJheShkY0NvdW50KTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGNkYXRhW3JdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZGNkYXRhW3JdW2ldID0gMHhmZiAmIGJ1ZmZlci5idWZmZXJbaSArIG9mZnNldF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvZmZzZXQgKz0gZGNDb3VudDtcbiAgICAgICAgICAgIHZhciByc1BvbHkgPSBRUlV0aWwuZ2V0RXJyb3JDb3JyZWN0UG9seW5vbWlhbChlY0NvdW50KTtcbiAgICAgICAgICAgIHZhciByYXdQb2x5ID0gbmV3IFFSUG9seW5vbWlhbChkY2RhdGFbcl0sIHJzUG9seS5nZXRMZW5ndGgoKSAtIDEpO1xuICAgICAgICAgICAgdmFyIG1vZFBvbHkgPSByYXdQb2x5Lm1vZChyc1BvbHkpO1xuICAgICAgICAgICAgZWNkYXRhW3JdID0gbmV3IEFycmF5KHJzUG9seS5nZXRMZW5ndGgoKSAtIDEpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlY2RhdGFbcl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kSW5kZXggPSBpICsgbW9kUG9seS5nZXRMZW5ndGgoKSAtIGVjZGF0YVtyXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZWNkYXRhW3JdW2ldID0gbW9kSW5kZXggPj0gMCA/IG1vZFBvbHkuZ2V0KG1vZEluZGV4KSA6IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRvdGFsQ29kZUNvdW50ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByc0Jsb2Nrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdG90YWxDb2RlQ291bnQgKz0gcnNCbG9ja3NbaV0udG90YWxDb3VudDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0YSA9IG5ldyBBcnJheSh0b3RhbENvZGVDb3VudCk7XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4RGNDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHJzQmxvY2tzLmxlbmd0aDsgcisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBkY2RhdGFbcl0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaW5kZXgrK10gPSBkY2RhdGFbcl1baV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWF4RWNDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHJzQmxvY2tzLmxlbmd0aDsgcisrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCBlY2RhdGFbcl0ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaW5kZXgrK10gPSBlY2RhdGFbcl1baV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH07XG4gICAgUVJDb2RlTW9kZWwuUEFEMCA9IDB4ZWM7XG4gICAgUVJDb2RlTW9kZWwuUEFEMSA9IDB4MTE7XG4gICAgcmV0dXJuIFFSQ29kZU1vZGVsO1xufSgpKTtcbmV4cG9ydHMuUVJDb2RlTW9kZWwgPSBRUkNvZGVNb2RlbDtcbmV4cG9ydHMuUVJFcnJvckNvcnJlY3RMZXZlbCA9IHsgTDogMSwgTTogMCwgUTogMywgSDogMiB9O1xudmFyIFFSTW9kZSA9IHsgTU9ERV9OVU1CRVI6IDEgPDwgMCwgTU9ERV9BTFBIQV9OVU06IDEgPDwgMSwgTU9ERV84QklUX0JZVEU6IDEgPDwgMiwgTU9ERV9LQU5KSTogMSA8PCAzIH07XG5leHBvcnRzLlFSTWFza1BhdHRlcm4gPSB7XG4gICAgUEFUVEVSTjAwMDogMCxcbiAgICBQQVRURVJOMDAxOiAxLFxuICAgIFBBVFRFUk4wMTA6IDIsXG4gICAgUEFUVEVSTjAxMTogMyxcbiAgICBQQVRURVJOMTAwOiA0LFxuICAgIFBBVFRFUk4xMDE6IDUsXG4gICAgUEFUVEVSTjExMDogNixcbiAgICBQQVRURVJOMTExOiA3LFxufTtcbnZhciBRUlV0aWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUVJVdGlsKCkge1xuICAgIH1cbiAgICBRUlV0aWwuZ2V0QkNIVHlwZUluZm8gPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgZCA9IGRhdGEgPDwgMTA7XG4gICAgICAgIHdoaWxlIChRUlV0aWwuZ2V0QkNIRGlnaXQoZCkgLSBRUlV0aWwuZ2V0QkNIRGlnaXQoUVJVdGlsLkcxNSkgPj0gMCkge1xuICAgICAgICAgICAgZCBePSBRUlV0aWwuRzE1IDw8IChRUlV0aWwuZ2V0QkNIRGlnaXQoZCkgLSBRUlV0aWwuZ2V0QkNIRGlnaXQoUVJVdGlsLkcxNSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoKGRhdGEgPDwgMTApIHwgZCkgXiBRUlV0aWwuRzE1X01BU0s7XG4gICAgfTtcbiAgICBRUlV0aWwuZ2V0QkNIVHlwZU51bWJlciA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBkID0gZGF0YSA8PCAxMjtcbiAgICAgICAgd2hpbGUgKFFSVXRpbC5nZXRCQ0hEaWdpdChkKSAtIFFSVXRpbC5nZXRCQ0hEaWdpdChRUlV0aWwuRzE4KSA+PSAwKSB7XG4gICAgICAgICAgICBkIF49IFFSVXRpbC5HMTggPDwgKFFSVXRpbC5nZXRCQ0hEaWdpdChkKSAtIFFSVXRpbC5nZXRCQ0hEaWdpdChRUlV0aWwuRzE4KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChkYXRhIDw8IDEyKSB8IGQ7XG4gICAgfTtcbiAgICBRUlV0aWwuZ2V0QkNIRGlnaXQgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICB2YXIgZGlnaXQgPSAwO1xuICAgICAgICB3aGlsZSAoZGF0YSAhPSAwKSB7XG4gICAgICAgICAgICBkaWdpdCsrO1xuICAgICAgICAgICAgZGF0YSA+Pj49IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRpZ2l0O1xuICAgIH07XG4gICAgUVJVdGlsLmdldFBhdHRlcm5Qb3NpdGlvbiA9IGZ1bmN0aW9uICh0eXBlTnVtYmVyKSB7XG4gICAgICAgIHJldHVybiBRUlV0aWwuUEFUVEVSTl9QT1NJVElPTl9UQUJMRVt0eXBlTnVtYmVyIC0gMV07XG4gICAgfTtcbiAgICBRUlV0aWwuZ2V0TWFzayA9IGZ1bmN0aW9uIChtYXNrUGF0dGVybiwgaSwgaikge1xuICAgICAgICBzd2l0Y2ggKG1hc2tQYXR0ZXJuKSB7XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuUVJNYXNrUGF0dGVybi5QQVRURVJOMDAwOlxuICAgICAgICAgICAgICAgIHJldHVybiAoaSArIGopICUgMiA9PSAwO1xuICAgICAgICAgICAgY2FzZSBleHBvcnRzLlFSTWFza1BhdHRlcm4uUEFUVEVSTjAwMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAlIDIgPT0gMDtcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5RUk1hc2tQYXR0ZXJuLlBBVFRFUk4wMTA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGogJSAzID09IDA7XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuUVJNYXNrUGF0dGVybi5QQVRURVJOMDExOlxuICAgICAgICAgICAgICAgIHJldHVybiAoaSArIGopICUgMyA9PSAwO1xuICAgICAgICAgICAgY2FzZSBleHBvcnRzLlFSTWFza1BhdHRlcm4uUEFUVEVSTjEwMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gKE1hdGguZmxvb3IoaSAvIDIpICsgTWF0aC5mbG9vcihqIC8gMykpICUgMiA9PSAwO1xuICAgICAgICAgICAgY2FzZSBleHBvcnRzLlFSTWFza1BhdHRlcm4uUEFUVEVSTjEwMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gKChpICogaikgJSAyKSArICgoaSAqIGopICUgMykgPT0gMDtcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5RUk1hc2tQYXR0ZXJuLlBBVFRFUk4xMTA6XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoKGkgKiBqKSAlIDIpICsgKChpICogaikgJSAzKSkgJSAyID09IDA7XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuUVJNYXNrUGF0dGVybi5QQVRURVJOMTExOlxuICAgICAgICAgICAgICAgIHJldHVybiAoKChpICogaikgJSAzKSArICgoaSArIGopICUgMikpICUgMiA9PSAwO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYWQgbWFza1BhdHRlcm46XCIgKyBtYXNrUGF0dGVybik7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFFSVXRpbC5nZXRFcnJvckNvcnJlY3RQb2x5bm9taWFsID0gZnVuY3Rpb24gKGVycm9yQ29ycmVjdExlbmd0aCkge1xuICAgICAgICB2YXIgYSA9IG5ldyBRUlBvbHlub21pYWwoWzFdLCAwKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlcnJvckNvcnJlY3RMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYSA9IGEubXVsdGlwbHkobmV3IFFSUG9seW5vbWlhbChbMSwgUVJNYXRoLmdleHAoaSldLCAwKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGE7XG4gICAgfTtcbiAgICBRUlV0aWwuZ2V0TGVuZ3RoSW5CaXRzID0gZnVuY3Rpb24gKG1vZGUsIHR5cGUpIHtcbiAgICAgICAgaWYgKDEgPD0gdHlwZSAmJiB0eXBlIDwgMTApIHtcbiAgICAgICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfTlVNQkVSOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTA7XG4gICAgICAgICAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV9BTFBIQV9OVU06XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA5O1xuICAgICAgICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfOEJJVF9CWVRFOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX0tBTkpJOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gODtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtb2RlOlwiICsgbW9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA8IDI3KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX05VTUJFUjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEyO1xuICAgICAgICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTE7XG4gICAgICAgICAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV84QklUX0JZVEU6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxNjtcbiAgICAgICAgICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX0tBTkpJOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTA7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibW9kZTpcIiArIG1vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGUgPCA0MSkge1xuICAgICAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV9OVU1CRVI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxNDtcbiAgICAgICAgICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX0FMUEhBX05VTTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEzO1xuICAgICAgICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfOEJJVF9CWVRFOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTY7XG4gICAgICAgICAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV9LQU5KSTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDEyO1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm1vZGU6XCIgKyBtb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInR5cGU6XCIgKyB0eXBlKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUVJVdGlsLmdldExvc3RQb2ludCA9IGZ1bmN0aW9uIChxckNvZGUpIHtcbiAgICAgICAgdmFyIG1vZHVsZUNvdW50ID0gcXJDb2RlLmdldE1vZHVsZUNvdW50KCk7XG4gICAgICAgIHZhciBsb3N0UG9pbnQgPSAwO1xuICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBtb2R1bGVDb3VudDsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50OyBjb2wrKykge1xuICAgICAgICAgICAgICAgIHZhciBzYW1lQ291bnQgPSAwO1xuICAgICAgICAgICAgICAgIHZhciBkYXJrID0gcXJDb2RlLmlzRGFyayhyb3csIGNvbCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgciA9IC0xOyByIDw9IDE7IHIrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocm93ICsgciA8IDAgfHwgbW9kdWxlQ291bnQgPD0gcm93ICsgcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IC0xOyBjIDw9IDE7IGMrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbCArIGMgPCAwIHx8IG1vZHVsZUNvdW50IDw9IGNvbCArIGMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyID09IDAgJiYgYyA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGFyayA9PSBxckNvZGUuaXNEYXJrKHJvdyArIHIsIGNvbCArIGMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtZUNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNhbWVDb3VudCA+IDUpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9zdFBvaW50ICs9IDMgKyBzYW1lQ291bnQgLSA1O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBtb2R1bGVDb3VudCAtIDE7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudCAtIDE7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICBpZiAocXJDb2RlLmlzRGFyayhyb3csIGNvbCkpXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgaWYgKHFyQ29kZS5pc0Rhcmsocm93ICsgMSwgY29sKSlcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICBpZiAocXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDEpKVxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIGlmIChxckNvZGUuaXNEYXJrKHJvdyArIDEsIGNvbCArIDEpKVxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PSAwIHx8IGNvdW50ID09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9zdFBvaW50ICs9IDM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50OyByb3crKykge1xuICAgICAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgbW9kdWxlQ291bnQgLSA2OyBjb2wrKykge1xuICAgICAgICAgICAgICAgIGlmIChxckNvZGUuaXNEYXJrKHJvdywgY29sKSAmJlxuICAgICAgICAgICAgICAgICAgICAhcXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDEpICYmXG4gICAgICAgICAgICAgICAgICAgIHFyQ29kZS5pc0Rhcmsocm93LCBjb2wgKyAyKSAmJlxuICAgICAgICAgICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdywgY29sICsgMykgJiZcbiAgICAgICAgICAgICAgICAgICAgcXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDQpICYmXG4gICAgICAgICAgICAgICAgICAgICFxckNvZGUuaXNEYXJrKHJvdywgY29sICsgNSkgJiZcbiAgICAgICAgICAgICAgICAgICAgcXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDYpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxvc3RQb2ludCArPSA0MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgbW9kdWxlQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBtb2R1bGVDb3VudCAtIDY7IHJvdysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHFyQ29kZS5pc0Rhcmsocm93LCBjb2wpICYmXG4gICAgICAgICAgICAgICAgICAgICFxckNvZGUuaXNEYXJrKHJvdyArIDEsIGNvbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgcXJDb2RlLmlzRGFyayhyb3cgKyAyLCBjb2wpICYmXG4gICAgICAgICAgICAgICAgICAgIHFyQ29kZS5pc0Rhcmsocm93ICsgMywgY29sKSAmJlxuICAgICAgICAgICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdyArIDQsIGNvbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgIXFyQ29kZS5pc0Rhcmsocm93ICsgNSwgY29sKSAmJlxuICAgICAgICAgICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdyArIDYsIGNvbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9zdFBvaW50ICs9IDQwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZGFya0NvdW50ID0gMDtcbiAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgbW9kdWxlQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciByb3cgPSAwOyByb3cgPCBtb2R1bGVDb3VudDsgcm93KyspIHtcbiAgICAgICAgICAgICAgICBpZiAocXJDb2RlLmlzRGFyayhyb3csIGNvbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGFya0NvdW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciByYXRpbyA9IE1hdGguYWJzKCgxMDAgKiBkYXJrQ291bnQpIC8gbW9kdWxlQ291bnQgLyBtb2R1bGVDb3VudCAtIDUwKSAvIDU7XG4gICAgICAgIGxvc3RQb2ludCArPSByYXRpbyAqIDEwO1xuICAgICAgICByZXR1cm4gbG9zdFBvaW50O1xuICAgIH07XG4gICAgUVJVdGlsLlBBVFRFUk5fUE9TSVRJT05fVEFCTEUgPSBbXG4gICAgICAgIFtdLFxuICAgICAgICBbNiwgMThdLFxuICAgICAgICBbNiwgMjJdLFxuICAgICAgICBbNiwgMjZdLFxuICAgICAgICBbNiwgMzBdLFxuICAgICAgICBbNiwgMzRdLFxuICAgICAgICBbNiwgMjIsIDM4XSxcbiAgICAgICAgWzYsIDI0LCA0Ml0sXG4gICAgICAgIFs2LCAyNiwgNDZdLFxuICAgICAgICBbNiwgMjgsIDUwXSxcbiAgICAgICAgWzYsIDMwLCA1NF0sXG4gICAgICAgIFs2LCAzMiwgNThdLFxuICAgICAgICBbNiwgMzQsIDYyXSxcbiAgICAgICAgWzYsIDI2LCA0NiwgNjZdLFxuICAgICAgICBbNiwgMjYsIDQ4LCA3MF0sXG4gICAgICAgIFs2LCAyNiwgNTAsIDc0XSxcbiAgICAgICAgWzYsIDMwLCA1NCwgNzhdLFxuICAgICAgICBbNiwgMzAsIDU2LCA4Ml0sXG4gICAgICAgIFs2LCAzMCwgNTgsIDg2XSxcbiAgICAgICAgWzYsIDM0LCA2MiwgOTBdLFxuICAgICAgICBbNiwgMjgsIDUwLCA3MiwgOTRdLFxuICAgICAgICBbNiwgMjYsIDUwLCA3NCwgOThdLFxuICAgICAgICBbNiwgMzAsIDU0LCA3OCwgMTAyXSxcbiAgICAgICAgWzYsIDI4LCA1NCwgODAsIDEwNl0sXG4gICAgICAgIFs2LCAzMiwgNTgsIDg0LCAxMTBdLFxuICAgICAgICBbNiwgMzAsIDU4LCA4NiwgMTE0XSxcbiAgICAgICAgWzYsIDM0LCA2MiwgOTAsIDExOF0sXG4gICAgICAgIFs2LCAyNiwgNTAsIDc0LCA5OCwgMTIyXSxcbiAgICAgICAgWzYsIDMwLCA1NCwgNzgsIDEwMiwgMTI2XSxcbiAgICAgICAgWzYsIDI2LCA1MiwgNzgsIDEwNCwgMTMwXSxcbiAgICAgICAgWzYsIDMwLCA1NiwgODIsIDEwOCwgMTM0XSxcbiAgICAgICAgWzYsIDM0LCA2MCwgODYsIDExMiwgMTM4XSxcbiAgICAgICAgWzYsIDMwLCA1OCwgODYsIDExNCwgMTQyXSxcbiAgICAgICAgWzYsIDM0LCA2MiwgOTAsIDExOCwgMTQ2XSxcbiAgICAgICAgWzYsIDMwLCA1NCwgNzgsIDEwMiwgMTI2LCAxNTBdLFxuICAgICAgICBbNiwgMjQsIDUwLCA3NiwgMTAyLCAxMjgsIDE1NF0sXG4gICAgICAgIFs2LCAyOCwgNTQsIDgwLCAxMDYsIDEzMiwgMTU4XSxcbiAgICAgICAgWzYsIDMyLCA1OCwgODQsIDExMCwgMTM2LCAxNjJdLFxuICAgICAgICBbNiwgMjYsIDU0LCA4MiwgMTEwLCAxMzgsIDE2Nl0sXG4gICAgICAgIFs2LCAzMCwgNTgsIDg2LCAxMTQsIDE0MiwgMTcwXSxcbiAgICBdO1xuICAgIFFSVXRpbC5HMTUgPSAoMSA8PCAxMCkgfCAoMSA8PCA4KSB8ICgxIDw8IDUpIHwgKDEgPDwgNCkgfCAoMSA8PCAyKSB8ICgxIDw8IDEpIHwgKDEgPDwgMCk7XG4gICAgUVJVdGlsLkcxOCA9ICgxIDw8IDEyKSB8ICgxIDw8IDExKSB8ICgxIDw8IDEwKSB8ICgxIDw8IDkpIHwgKDEgPDwgOCkgfCAoMSA8PCA1KSB8ICgxIDw8IDIpIHwgKDEgPDwgMCk7XG4gICAgUVJVdGlsLkcxNV9NQVNLID0gKDEgPDwgMTQpIHwgKDEgPDwgMTIpIHwgKDEgPDwgMTApIHwgKDEgPDwgNCkgfCAoMSA8PCAxKTtcbiAgICByZXR1cm4gUVJVdGlsO1xufSgpKTtcbmV4cG9ydHMuUVJVdGlsID0gUVJVdGlsO1xudmFyIFFSTWF0aCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBRUk1hdGgoKSB7XG4gICAgfVxuICAgIFFSTWF0aC5nbG9nID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgaWYgKG4gPCAxKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnbG9nKFwiICsgbiArIFwiKVwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUVJNYXRoLkxPR19UQUJMRVtuXTtcbiAgICB9O1xuICAgIFFSTWF0aC5nZXhwID0gZnVuY3Rpb24gKG4pIHtcbiAgICAgICAgd2hpbGUgKG4gPCAwKSB7XG4gICAgICAgICAgICBuICs9IDI1NTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAobiA+PSAyNTYpIHtcbiAgICAgICAgICAgIG4gLT0gMjU1O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBRUk1hdGguRVhQX1RBQkxFW25dO1xuICAgIH07XG4gICAgUVJNYXRoLkVYUF9UQUJMRSA9IG5ldyBBcnJheSgyNTYpO1xuICAgIFFSTWF0aC5MT0dfVEFCTEUgPSBuZXcgQXJyYXkoMjU2KTtcbiAgICBRUk1hdGguX2NvbnN0cnVjdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIFFSTWF0aC5FWFBfVEFCTEVbaV0gPSAxIDw8IGk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDg7IGkgPCAyNTY7IGkrKykge1xuICAgICAgICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpXSA9XG4gICAgICAgICAgICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpIC0gNF0gXiBRUk1hdGguRVhQX1RBQkxFW2kgLSA1XSBeIFFSTWF0aC5FWFBfVEFCTEVbaSAtIDZdIF4gUVJNYXRoLkVYUF9UQUJMRVtpIC0gOF07XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTU7IGkrKykge1xuICAgICAgICAgICAgUVJNYXRoLkxPR19UQUJMRVtRUk1hdGguRVhQX1RBQkxFW2ldXSA9IGk7XG4gICAgICAgIH1cbiAgICB9KSgpO1xuICAgIHJldHVybiBRUk1hdGg7XG59KCkpO1xuZXhwb3J0cy5RUk1hdGggPSBRUk1hdGg7XG52YXIgUVJQb2x5bm9taWFsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFFSUG9seW5vbWlhbChudW0sIHNoaWZ0KSB7XG4gICAgICAgIGlmIChudW0ubGVuZ3RoID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKG51bS5sZW5ndGggKyBcIi9cIiArIHNoaWZ0KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb2Zmc2V0ID0gMDtcbiAgICAgICAgd2hpbGUgKG9mZnNldCA8IG51bS5sZW5ndGggJiYgbnVtW29mZnNldF0gPT0gMCkge1xuICAgICAgICAgICAgb2Zmc2V0Kys7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5udW0gPSBuZXcgQXJyYXkobnVtLmxlbmd0aCAtIG9mZnNldCArIHNoaWZ0KTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW0ubGVuZ3RoIC0gb2Zmc2V0OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubnVtW2ldID0gbnVtW2kgKyBvZmZzZXRdO1xuICAgICAgICB9XG4gICAgfVxuICAgIFFSUG9seW5vbWlhbC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLm51bVtpbmRleF07XG4gICAgfTtcbiAgICBRUlBvbHlub21pYWwucHJvdG90eXBlLmdldExlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtLmxlbmd0aDtcbiAgICB9O1xuICAgIFFSUG9seW5vbWlhbC5wcm90b3R5cGUubXVsdGlwbHkgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICB2YXIgbnVtID0gbmV3IEFycmF5KHRoaXMuZ2V0TGVuZ3RoKCkgKyBlLmdldExlbmd0aCgpIC0gMSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGUuZ2V0TGVuZ3RoKCk7IGorKykge1xuICAgICAgICAgICAgICAgIG51bVtpICsgal0gXj0gUVJNYXRoLmdleHAoUVJNYXRoLmdsb2codGhpcy5nZXQoaSkpICsgUVJNYXRoLmdsb2coZS5nZXQoaikpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFFSUG9seW5vbWlhbChudW0sIDApO1xuICAgIH07XG4gICAgUVJQb2x5bm9taWFsLnByb3RvdHlwZS5tb2QgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICBpZiAodGhpcy5nZXRMZW5ndGgoKSAtIGUuZ2V0TGVuZ3RoKCkgPCAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmF0aW8gPSBRUk1hdGguZ2xvZyh0aGlzLmdldCgwKSkgLSBRUk1hdGguZ2xvZyhlLmdldCgwKSk7XG4gICAgICAgIHZhciBudW0gPSBuZXcgQXJyYXkodGhpcy5nZXRMZW5ndGgoKSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAgICAgICBudW1baV0gPSB0aGlzLmdldChpKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGUuZ2V0TGVuZ3RoKCk7IGkrKykge1xuICAgICAgICAgICAgbnVtW2ldIF49IFFSTWF0aC5nZXhwKFFSTWF0aC5nbG9nKGUuZ2V0KGkpKSArIHJhdGlvKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFFSUG9seW5vbWlhbChudW0sIDApLm1vZChlKTtcbiAgICB9O1xuICAgIHJldHVybiBRUlBvbHlub21pYWw7XG59KCkpO1xudmFyIFFSUlNCbG9jayA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBRUlJTQmxvY2sodG90YWxDb3VudCwgZGF0YUNvdW50KSB7XG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHRvdGFsQ291bnQ7XG4gICAgICAgIHRoaXMuZGF0YUNvdW50ID0gZGF0YUNvdW50O1xuICAgIH1cbiAgICBRUlJTQmxvY2suZ2V0UlNCbG9ja3MgPSBmdW5jdGlvbiAodHlwZU51bWJlciwgZXJyb3JDb3JyZWN0TGV2ZWwpIHtcbiAgICAgICAgdmFyIHJzQmxvY2sgPSBRUlJTQmxvY2suZ2V0UnNCbG9ja1RhYmxlKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsKTtcbiAgICAgICAgaWYgKHJzQmxvY2sgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJiYWQgcnMgYmxvY2sgQCB0eXBlTnVtYmVyOlwiICsgdHlwZU51bWJlciArIFwiL2Vycm9yQ29ycmVjdExldmVsOlwiICsgZXJyb3JDb3JyZWN0TGV2ZWwpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsZW5ndGggPSByc0Jsb2NrLmxlbmd0aCAvIDM7XG4gICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjb3VudCA9IHJzQmxvY2tbaSAqIDMgKyAwXTtcbiAgICAgICAgICAgIHZhciB0b3RhbENvdW50ID0gcnNCbG9ja1tpICogMyArIDFdO1xuICAgICAgICAgICAgdmFyIGRhdGFDb3VudCA9IHJzQmxvY2tbaSAqIDMgKyAyXTtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY291bnQ7IGorKykge1xuICAgICAgICAgICAgICAgIGxpc3QucHVzaChuZXcgUVJSU0Jsb2NrKHRvdGFsQ291bnQsIGRhdGFDb3VudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH07XG4gICAgUVJSU0Jsb2NrLmdldFJzQmxvY2tUYWJsZSA9IGZ1bmN0aW9uICh0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCkge1xuICAgICAgICBzd2l0Y2ggKGVycm9yQ29ycmVjdExldmVsKSB7XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuUVJFcnJvckNvcnJlY3RMZXZlbC5MOlxuICAgICAgICAgICAgICAgIHJldHVybiBRUlJTQmxvY2suUlNfQkxPQ0tfVEFCTEVbKHR5cGVOdW1iZXIgLSAxKSAqIDQgKyAwXTtcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5RUkVycm9yQ29ycmVjdExldmVsLk06XG4gICAgICAgICAgICAgICAgcmV0dXJuIFFSUlNCbG9jay5SU19CTE9DS19UQUJMRVsodHlwZU51bWJlciAtIDEpICogNCArIDFdO1xuICAgICAgICAgICAgY2FzZSBleHBvcnRzLlFSRXJyb3JDb3JyZWN0TGV2ZWwuUTpcbiAgICAgICAgICAgICAgICByZXR1cm4gUVJSU0Jsb2NrLlJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyIC0gMSkgKiA0ICsgMl07XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuUVJFcnJvckNvcnJlY3RMZXZlbC5IOlxuICAgICAgICAgICAgICAgIHJldHVybiBRUlJTQmxvY2suUlNfQkxPQ0tfVEFCTEVbKHR5cGVOdW1iZXIgLSAxKSAqIDQgKyAzXTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUVJSU0Jsb2NrLlJTX0JMT0NLX1RBQkxFID0gW1xuICAgICAgICBbMSwgMjYsIDE5XSxcbiAgICAgICAgWzEsIDI2LCAxNl0sXG4gICAgICAgIFsxLCAyNiwgMTNdLFxuICAgICAgICBbMSwgMjYsIDldLFxuICAgICAgICBbMSwgNDQsIDM0XSxcbiAgICAgICAgWzEsIDQ0LCAyOF0sXG4gICAgICAgIFsxLCA0NCwgMjJdLFxuICAgICAgICBbMSwgNDQsIDE2XSxcbiAgICAgICAgWzEsIDcwLCA1NV0sXG4gICAgICAgIFsxLCA3MCwgNDRdLFxuICAgICAgICBbMiwgMzUsIDE3XSxcbiAgICAgICAgWzIsIDM1LCAxM10sXG4gICAgICAgIFsxLCAxMDAsIDgwXSxcbiAgICAgICAgWzIsIDUwLCAzMl0sXG4gICAgICAgIFsyLCA1MCwgMjRdLFxuICAgICAgICBbNCwgMjUsIDldLFxuICAgICAgICBbMSwgMTM0LCAxMDhdLFxuICAgICAgICBbMiwgNjcsIDQzXSxcbiAgICAgICAgWzIsIDMzLCAxNSwgMiwgMzQsIDE2XSxcbiAgICAgICAgWzIsIDMzLCAxMSwgMiwgMzQsIDEyXSxcbiAgICAgICAgWzIsIDg2LCA2OF0sXG4gICAgICAgIFs0LCA0MywgMjddLFxuICAgICAgICBbNCwgNDMsIDE5XSxcbiAgICAgICAgWzQsIDQzLCAxNV0sXG4gICAgICAgIFsyLCA5OCwgNzhdLFxuICAgICAgICBbNCwgNDksIDMxXSxcbiAgICAgICAgWzIsIDMyLCAxNCwgNCwgMzMsIDE1XSxcbiAgICAgICAgWzQsIDM5LCAxMywgMSwgNDAsIDE0XSxcbiAgICAgICAgWzIsIDEyMSwgOTddLFxuICAgICAgICBbMiwgNjAsIDM4LCAyLCA2MSwgMzldLFxuICAgICAgICBbNCwgNDAsIDE4LCAyLCA0MSwgMTldLFxuICAgICAgICBbNCwgNDAsIDE0LCAyLCA0MSwgMTVdLFxuICAgICAgICBbMiwgMTQ2LCAxMTZdLFxuICAgICAgICBbMywgNTgsIDM2LCAyLCA1OSwgMzddLFxuICAgICAgICBbNCwgMzYsIDE2LCA0LCAzNywgMTddLFxuICAgICAgICBbNCwgMzYsIDEyLCA0LCAzNywgMTNdLFxuICAgICAgICBbMiwgODYsIDY4LCAyLCA4NywgNjldLFxuICAgICAgICBbNCwgNjksIDQzLCAxLCA3MCwgNDRdLFxuICAgICAgICBbNiwgNDMsIDE5LCAyLCA0NCwgMjBdLFxuICAgICAgICBbNiwgNDMsIDE1LCAyLCA0NCwgMTZdLFxuICAgICAgICBbNCwgMTAxLCA4MV0sXG4gICAgICAgIFsxLCA4MCwgNTAsIDQsIDgxLCA1MV0sXG4gICAgICAgIFs0LCA1MCwgMjIsIDQsIDUxLCAyM10sXG4gICAgICAgIFszLCAzNiwgMTIsIDgsIDM3LCAxM10sXG4gICAgICAgIFsyLCAxMTYsIDkyLCAyLCAxMTcsIDkzXSxcbiAgICAgICAgWzYsIDU4LCAzNiwgMiwgNTksIDM3XSxcbiAgICAgICAgWzQsIDQ2LCAyMCwgNiwgNDcsIDIxXSxcbiAgICAgICAgWzcsIDQyLCAxNCwgNCwgNDMsIDE1XSxcbiAgICAgICAgWzQsIDEzMywgMTA3XSxcbiAgICAgICAgWzgsIDU5LCAzNywgMSwgNjAsIDM4XSxcbiAgICAgICAgWzgsIDQ0LCAyMCwgNCwgNDUsIDIxXSxcbiAgICAgICAgWzEyLCAzMywgMTEsIDQsIDM0LCAxMl0sXG4gICAgICAgIFszLCAxNDUsIDExNSwgMSwgMTQ2LCAxMTZdLFxuICAgICAgICBbNCwgNjQsIDQwLCA1LCA2NSwgNDFdLFxuICAgICAgICBbMTEsIDM2LCAxNiwgNSwgMzcsIDE3XSxcbiAgICAgICAgWzExLCAzNiwgMTIsIDUsIDM3LCAxM10sXG4gICAgICAgIFs1LCAxMDksIDg3LCAxLCAxMTAsIDg4XSxcbiAgICAgICAgWzUsIDY1LCA0MSwgNSwgNjYsIDQyXSxcbiAgICAgICAgWzUsIDU0LCAyNCwgNywgNTUsIDI1XSxcbiAgICAgICAgWzExLCAzNiwgMTJdLFxuICAgICAgICBbNSwgMTIyLCA5OCwgMSwgMTIzLCA5OV0sXG4gICAgICAgIFs3LCA3MywgNDUsIDMsIDc0LCA0Nl0sXG4gICAgICAgIFsxNSwgNDMsIDE5LCAyLCA0NCwgMjBdLFxuICAgICAgICBbMywgNDUsIDE1LCAxMywgNDYsIDE2XSxcbiAgICAgICAgWzEsIDEzNSwgMTA3LCA1LCAxMzYsIDEwOF0sXG4gICAgICAgIFsxMCwgNzQsIDQ2LCAxLCA3NSwgNDddLFxuICAgICAgICBbMSwgNTAsIDIyLCAxNSwgNTEsIDIzXSxcbiAgICAgICAgWzIsIDQyLCAxNCwgMTcsIDQzLCAxNV0sXG4gICAgICAgIFs1LCAxNTAsIDEyMCwgMSwgMTUxLCAxMjFdLFxuICAgICAgICBbOSwgNjksIDQzLCA0LCA3MCwgNDRdLFxuICAgICAgICBbMTcsIDUwLCAyMiwgMSwgNTEsIDIzXSxcbiAgICAgICAgWzIsIDQyLCAxNCwgMTksIDQzLCAxNV0sXG4gICAgICAgIFszLCAxNDEsIDExMywgNCwgMTQyLCAxMTRdLFxuICAgICAgICBbMywgNzAsIDQ0LCAxMSwgNzEsIDQ1XSxcbiAgICAgICAgWzE3LCA0NywgMjEsIDQsIDQ4LCAyMl0sXG4gICAgICAgIFs5LCAzOSwgMTMsIDE2LCA0MCwgMTRdLFxuICAgICAgICBbMywgMTM1LCAxMDcsIDUsIDEzNiwgMTA4XSxcbiAgICAgICAgWzMsIDY3LCA0MSwgMTMsIDY4LCA0Ml0sXG4gICAgICAgIFsxNSwgNTQsIDI0LCA1LCA1NSwgMjVdLFxuICAgICAgICBbMTUsIDQzLCAxNSwgMTAsIDQ0LCAxNl0sXG4gICAgICAgIFs0LCAxNDQsIDExNiwgNCwgMTQ1LCAxMTddLFxuICAgICAgICBbMTcsIDY4LCA0Ml0sXG4gICAgICAgIFsxNywgNTAsIDIyLCA2LCA1MSwgMjNdLFxuICAgICAgICBbMTksIDQ2LCAxNiwgNiwgNDcsIDE3XSxcbiAgICAgICAgWzIsIDEzOSwgMTExLCA3LCAxNDAsIDExMl0sXG4gICAgICAgIFsxNywgNzQsIDQ2XSxcbiAgICAgICAgWzcsIDU0LCAyNCwgMTYsIDU1LCAyNV0sXG4gICAgICAgIFszNCwgMzcsIDEzXSxcbiAgICAgICAgWzQsIDE1MSwgMTIxLCA1LCAxNTIsIDEyMl0sXG4gICAgICAgIFs0LCA3NSwgNDcsIDE0LCA3NiwgNDhdLFxuICAgICAgICBbMTEsIDU0LCAyNCwgMTQsIDU1LCAyNV0sXG4gICAgICAgIFsxNiwgNDUsIDE1LCAxNCwgNDYsIDE2XSxcbiAgICAgICAgWzYsIDE0NywgMTE3LCA0LCAxNDgsIDExOF0sXG4gICAgICAgIFs2LCA3MywgNDUsIDE0LCA3NCwgNDZdLFxuICAgICAgICBbMTEsIDU0LCAyNCwgMTYsIDU1LCAyNV0sXG4gICAgICAgIFszMCwgNDYsIDE2LCAyLCA0NywgMTddLFxuICAgICAgICBbOCwgMTMyLCAxMDYsIDQsIDEzMywgMTA3XSxcbiAgICAgICAgWzgsIDc1LCA0NywgMTMsIDc2LCA0OF0sXG4gICAgICAgIFs3LCA1NCwgMjQsIDIyLCA1NSwgMjVdLFxuICAgICAgICBbMjIsIDQ1LCAxNSwgMTMsIDQ2LCAxNl0sXG4gICAgICAgIFsxMCwgMTQyLCAxMTQsIDIsIDE0MywgMTE1XSxcbiAgICAgICAgWzE5LCA3NCwgNDYsIDQsIDc1LCA0N10sXG4gICAgICAgIFsyOCwgNTAsIDIyLCA2LCA1MSwgMjNdLFxuICAgICAgICBbMzMsIDQ2LCAxNiwgNCwgNDcsIDE3XSxcbiAgICAgICAgWzgsIDE1MiwgMTIyLCA0LCAxNTMsIDEyM10sXG4gICAgICAgIFsyMiwgNzMsIDQ1LCAzLCA3NCwgNDZdLFxuICAgICAgICBbOCwgNTMsIDIzLCAyNiwgNTQsIDI0XSxcbiAgICAgICAgWzEyLCA0NSwgMTUsIDI4LCA0NiwgMTZdLFxuICAgICAgICBbMywgMTQ3LCAxMTcsIDEwLCAxNDgsIDExOF0sXG4gICAgICAgIFszLCA3MywgNDUsIDIzLCA3NCwgNDZdLFxuICAgICAgICBbNCwgNTQsIDI0LCAzMSwgNTUsIDI1XSxcbiAgICAgICAgWzExLCA0NSwgMTUsIDMxLCA0NiwgMTZdLFxuICAgICAgICBbNywgMTQ2LCAxMTYsIDcsIDE0NywgMTE3XSxcbiAgICAgICAgWzIxLCA3MywgNDUsIDcsIDc0LCA0Nl0sXG4gICAgICAgIFsxLCA1MywgMjMsIDM3LCA1NCwgMjRdLFxuICAgICAgICBbMTksIDQ1LCAxNSwgMjYsIDQ2LCAxNl0sXG4gICAgICAgIFs1LCAxNDUsIDExNSwgMTAsIDE0NiwgMTE2XSxcbiAgICAgICAgWzE5LCA3NSwgNDcsIDEwLCA3NiwgNDhdLFxuICAgICAgICBbMTUsIDU0LCAyNCwgMjUsIDU1LCAyNV0sXG4gICAgICAgIFsyMywgNDUsIDE1LCAyNSwgNDYsIDE2XSxcbiAgICAgICAgWzEzLCAxNDUsIDExNSwgMywgMTQ2LCAxMTZdLFxuICAgICAgICBbMiwgNzQsIDQ2LCAyOSwgNzUsIDQ3XSxcbiAgICAgICAgWzQyLCA1NCwgMjQsIDEsIDU1LCAyNV0sXG4gICAgICAgIFsyMywgNDUsIDE1LCAyOCwgNDYsIDE2XSxcbiAgICAgICAgWzE3LCAxNDUsIDExNV0sXG4gICAgICAgIFsxMCwgNzQsIDQ2LCAyMywgNzUsIDQ3XSxcbiAgICAgICAgWzEwLCA1NCwgMjQsIDM1LCA1NSwgMjVdLFxuICAgICAgICBbMTksIDQ1LCAxNSwgMzUsIDQ2LCAxNl0sXG4gICAgICAgIFsxNywgMTQ1LCAxMTUsIDEsIDE0NiwgMTE2XSxcbiAgICAgICAgWzE0LCA3NCwgNDYsIDIxLCA3NSwgNDddLFxuICAgICAgICBbMjksIDU0LCAyNCwgMTksIDU1LCAyNV0sXG4gICAgICAgIFsxMSwgNDUsIDE1LCA0NiwgNDYsIDE2XSxcbiAgICAgICAgWzEzLCAxNDUsIDExNSwgNiwgMTQ2LCAxMTZdLFxuICAgICAgICBbMTQsIDc0LCA0NiwgMjMsIDc1LCA0N10sXG4gICAgICAgIFs0NCwgNTQsIDI0LCA3LCA1NSwgMjVdLFxuICAgICAgICBbNTksIDQ2LCAxNiwgMSwgNDcsIDE3XSxcbiAgICAgICAgWzEyLCAxNTEsIDEyMSwgNywgMTUyLCAxMjJdLFxuICAgICAgICBbMTIsIDc1LCA0NywgMjYsIDc2LCA0OF0sXG4gICAgICAgIFszOSwgNTQsIDI0LCAxNCwgNTUsIDI1XSxcbiAgICAgICAgWzIyLCA0NSwgMTUsIDQxLCA0NiwgMTZdLFxuICAgICAgICBbNiwgMTUxLCAxMjEsIDE0LCAxNTIsIDEyMl0sXG4gICAgICAgIFs2LCA3NSwgNDcsIDM0LCA3NiwgNDhdLFxuICAgICAgICBbNDYsIDU0LCAyNCwgMTAsIDU1LCAyNV0sXG4gICAgICAgIFsyLCA0NSwgMTUsIDY0LCA0NiwgMTZdLFxuICAgICAgICBbMTcsIDE1MiwgMTIyLCA0LCAxNTMsIDEyM10sXG4gICAgICAgIFsyOSwgNzQsIDQ2LCAxNCwgNzUsIDQ3XSxcbiAgICAgICAgWzQ5LCA1NCwgMjQsIDEwLCA1NSwgMjVdLFxuICAgICAgICBbMjQsIDQ1LCAxNSwgNDYsIDQ2LCAxNl0sXG4gICAgICAgIFs0LCAxNTIsIDEyMiwgMTgsIDE1MywgMTIzXSxcbiAgICAgICAgWzEzLCA3NCwgNDYsIDMyLCA3NSwgNDddLFxuICAgICAgICBbNDgsIDU0LCAyNCwgMTQsIDU1LCAyNV0sXG4gICAgICAgIFs0MiwgNDUsIDE1LCAzMiwgNDYsIDE2XSxcbiAgICAgICAgWzIwLCAxNDcsIDExNywgNCwgMTQ4LCAxMThdLFxuICAgICAgICBbNDAsIDc1LCA0NywgNywgNzYsIDQ4XSxcbiAgICAgICAgWzQzLCA1NCwgMjQsIDIyLCA1NSwgMjVdLFxuICAgICAgICBbMTAsIDQ1LCAxNSwgNjcsIDQ2LCAxNl0sXG4gICAgICAgIFsxOSwgMTQ4LCAxMTgsIDYsIDE0OSwgMTE5XSxcbiAgICAgICAgWzE4LCA3NSwgNDcsIDMxLCA3NiwgNDhdLFxuICAgICAgICBbMzQsIDU0LCAyNCwgMzQsIDU1LCAyNV0sXG4gICAgICAgIFsyMCwgNDUsIDE1LCA2MSwgNDYsIDE2XSxcbiAgICBdO1xuICAgIHJldHVybiBRUlJTQmxvY2s7XG59KCkpO1xudmFyIFFSQml0QnVmZmVyID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFFSQml0QnVmZmVyKCkge1xuICAgICAgICB0aGlzLmJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLmxlbmd0aCA9IDA7XG4gICAgfVxuICAgIFFSQml0QnVmZmVyLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgdmFyIGJ1ZkluZGV4ID0gTWF0aC5mbG9vcihpbmRleCAvIDgpO1xuICAgICAgICByZXR1cm4gKCh0aGlzLmJ1ZmZlcltidWZJbmRleF0gPj4+ICg3IC0gKGluZGV4ICUgOCkpKSAmIDEpID09IDE7XG4gICAgfTtcbiAgICBRUkJpdEJ1ZmZlci5wcm90b3R5cGUucHV0ID0gZnVuY3Rpb24gKG51bSwgbGVuZ3RoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucHV0Qml0KCgobnVtID4+PiAobGVuZ3RoIC0gaSAtIDEpKSAmIDEpID09IDEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBRUkJpdEJ1ZmZlci5wcm90b3R5cGUuZ2V0TGVuZ3RoSW5CaXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5sZW5ndGg7XG4gICAgfTtcbiAgICBRUkJpdEJ1ZmZlci5wcm90b3R5cGUucHV0Qml0ID0gZnVuY3Rpb24gKGJpdCkge1xuICAgICAgICB2YXIgYnVmSW5kZXggPSBNYXRoLmZsb29yKHRoaXMubGVuZ3RoIC8gOCk7XG4gICAgICAgIGlmICh0aGlzLmJ1ZmZlci5sZW5ndGggPD0gYnVmSW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuYnVmZmVyLnB1c2goMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJpdCkge1xuICAgICAgICAgICAgdGhpcy5idWZmZXJbYnVmSW5kZXhdIHw9IDB4ODAgPj4+IHRoaXMubGVuZ3RoICUgODtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxlbmd0aCsrO1xuICAgIH07XG4gICAgcmV0dXJuIFFSQml0QnVmZmVyO1xufSgpKTtcbnZhciBRUkNvZGVMaW1pdExlbmd0aCA9IFtcbiAgICBbMTcsIDE0LCAxMSwgN10sXG4gICAgWzMyLCAyNiwgMjAsIDE0XSxcbiAgICBbNTMsIDQyLCAzMiwgMjRdLFxuICAgIFs3OCwgNjIsIDQ2LCAzNF0sXG4gICAgWzEwNiwgODQsIDYwLCA0NF0sXG4gICAgWzEzNCwgMTA2LCA3NCwgNThdLFxuICAgIFsxNTQsIDEyMiwgODYsIDY0XSxcbiAgICBbMTkyLCAxNTIsIDEwOCwgODRdLFxuICAgIFsyMzAsIDE4MCwgMTMwLCA5OF0sXG4gICAgWzI3MSwgMjEzLCAxNTEsIDExOV0sXG4gICAgWzMyMSwgMjUxLCAxNzcsIDEzN10sXG4gICAgWzM2NywgMjg3LCAyMDMsIDE1NV0sXG4gICAgWzQyNSwgMzMxLCAyNDEsIDE3N10sXG4gICAgWzQ1OCwgMzYyLCAyNTgsIDE5NF0sXG4gICAgWzUyMCwgNDEyLCAyOTIsIDIyMF0sXG4gICAgWzU4NiwgNDUwLCAzMjIsIDI1MF0sXG4gICAgWzY0NCwgNTA0LCAzNjQsIDI4MF0sXG4gICAgWzcxOCwgNTYwLCAzOTQsIDMxMF0sXG4gICAgWzc5MiwgNjI0LCA0NDIsIDMzOF0sXG4gICAgWzg1OCwgNjY2LCA0ODIsIDM4Ml0sXG4gICAgWzkyOSwgNzExLCA1MDksIDQwM10sXG4gICAgWzEwMDMsIDc3OSwgNTY1LCA0MzldLFxuICAgIFsxMDkxLCA4NTcsIDYxMSwgNDYxXSxcbiAgICBbMTE3MSwgOTExLCA2NjEsIDUxMV0sXG4gICAgWzEyNzMsIDk5NywgNzE1LCA1MzVdLFxuICAgIFsxMzY3LCAxMDU5LCA3NTEsIDU5M10sXG4gICAgWzE0NjUsIDExMjUsIDgwNSwgNjI1XSxcbiAgICBbMTUyOCwgMTE5MCwgODY4LCA2NThdLFxuICAgIFsxNjI4LCAxMjY0LCA5MDgsIDY5OF0sXG4gICAgWzE3MzIsIDEzNzAsIDk4MiwgNzQyXSxcbiAgICBbMTg0MCwgMTQ1MiwgMTAzMCwgNzkwXSxcbiAgICBbMTk1MiwgMTUzOCwgMTExMiwgODQyXSxcbiAgICBbMjA2OCwgMTYyOCwgMTE2OCwgODk4XSxcbiAgICBbMjE4OCwgMTcyMiwgMTIyOCwgOTU4XSxcbiAgICBbMjMwMywgMTgwOSwgMTI4MywgOTgzXSxcbiAgICBbMjQzMSwgMTkxMSwgMTM1MSwgMTA1MV0sXG4gICAgWzI1NjMsIDE5ODksIDE0MjMsIDEwOTNdLFxuICAgIFsyNjk5LCAyMDk5LCAxNDk5LCAxMTM5XSxcbiAgICBbMjgwOSwgMjIxMywgMTU3OSwgMTIxOV0sXG4gICAgWzI5NTMsIDIzMzEsIDE2NjMsIDEyNzNdLFxuXTtcbiIsIi8qIGdsb2JhbHMgZG9jdW1lbnQsIEltYWdlRGF0YSAqL1xuXG5jb25zdCBwYXJzZUZvbnQgPSByZXF1aXJlKCcuL2xpYi9wYXJzZS1mb250JylcblxuZXhwb3J0cy5wYXJzZUZvbnQgPSBwYXJzZUZvbnRcblxuZXhwb3J0cy5jcmVhdGVDYW52YXMgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICByZXR1cm4gT2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKSwgeyB3aWR0aDogd2lkdGgsIGhlaWdodDogaGVpZ2h0IH0pXG59XG5cbmV4cG9ydHMuY3JlYXRlSW1hZ2VEYXRhID0gZnVuY3Rpb24gKGFycmF5LCB3aWR0aCwgaGVpZ2h0KSB7XG4gIC8vIEJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgSW1hZ2VEYXRhIGxvb2tzIGF0IHRoZSBudW1iZXIgb2YgYXJndW1lbnRzIHBhc3NlZFxuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBuZXcgSW1hZ2VEYXRhKClcbiAgICBjYXNlIDE6IHJldHVybiBuZXcgSW1hZ2VEYXRhKGFycmF5KVxuICAgIGNhc2UgMjogcmV0dXJuIG5ldyBJbWFnZURhdGEoYXJyYXksIHdpZHRoKVxuICAgIGRlZmF1bHQ6IHJldHVybiBuZXcgSW1hZ2VEYXRhKGFycmF5LCB3aWR0aCwgaGVpZ2h0KVxuICB9XG59XG5cbmV4cG9ydHMubG9hZEltYWdlID0gZnVuY3Rpb24gKHNyYywgb3B0aW9ucykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIGNvbnN0IGltYWdlID0gT2JqZWN0LmFzc2lnbihkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKSwgb3B0aW9ucylcblxuICAgIGZ1bmN0aW9uIGNsZWFudXAgKCkge1xuICAgICAgaW1hZ2Uub25sb2FkID0gbnVsbFxuICAgICAgaW1hZ2Uub25lcnJvciA9IG51bGxcbiAgICB9XG5cbiAgICBpbWFnZS5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7IGNsZWFudXAoKTsgcmVzb2x2ZShpbWFnZSkgfVxuICAgIGltYWdlLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7IGNsZWFudXAoKTsgcmVqZWN0KG5ldyBFcnJvcignRmFpbGVkIHRvIGxvYWQgdGhlIGltYWdlIFwiJyArIHNyYyArICdcIicpKSB9XG5cbiAgICBpbWFnZS5zcmMgPSBzcmNcbiAgfSlcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG4vKipcbiAqIEZvbnQgUmVnRXhwIGhlbHBlcnMuXG4gKi9cblxuY29uc3Qgd2VpZ2h0cyA9ICdib2xkfGJvbGRlcnxsaWdodGVyfFsxLTldMDAnXG4gICwgc3R5bGVzID0gJ2l0YWxpY3xvYmxpcXVlJ1xuICAsIHZhcmlhbnRzID0gJ3NtYWxsLWNhcHMnXG4gICwgc3RyZXRjaGVzID0gJ3VsdHJhLWNvbmRlbnNlZHxleHRyYS1jb25kZW5zZWR8Y29uZGVuc2VkfHNlbWktY29uZGVuc2VkfHNlbWktZXhwYW5kZWR8ZXhwYW5kZWR8ZXh0cmEtZXhwYW5kZWR8dWx0cmEtZXhwYW5kZWQnXG4gICwgdW5pdHMgPSAncHh8cHR8cGN8aW58Y218bW18JXxlbXxleHxjaHxyZW18cSdcbiAgLCBzdHJpbmcgPSAnXFwnKFteXFwnXSspXFwnfFwiKFteXCJdKylcInxbXFxcXHdcXFxccy1dKydcblxuLy8gWyBbIDzigJhmb250LXN0eWxl4oCZPiB8fCA8Zm9udC12YXJpYW50LWNzczIxPiB8fCA84oCYZm9udC13ZWlnaHTigJk+IHx8IDzigJhmb250LXN0cmV0Y2jigJk+IF0/XG4vLyAgICA84oCYZm9udC1zaXpl4oCZPiBbIC8gPOKAmGxpbmUtaGVpZ2h04oCZPiBdPyA84oCYZm9udC1mYW1pbHnigJk+IF1cbi8vIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtZm9udHMtMy8jZm9udC1wcm9wXG5jb25zdCB3ZWlnaHRSZSA9IG5ldyBSZWdFeHAoJygnICsgd2VpZ2h0cyArICcpICsnLCAnaScpXG5jb25zdCBzdHlsZVJlID0gbmV3IFJlZ0V4cCgnKCcgKyBzdHlsZXMgKyAnKSArJywgJ2knKVxuY29uc3QgdmFyaWFudFJlID0gbmV3IFJlZ0V4cCgnKCcgKyB2YXJpYW50cyArICcpICsnLCAnaScpXG5jb25zdCBzdHJldGNoUmUgPSBuZXcgUmVnRXhwKCcoJyArIHN0cmV0Y2hlcyArICcpICsnLCAnaScpXG5jb25zdCBzaXplRmFtaWx5UmUgPSBuZXcgUmVnRXhwKFxuICAnKFtcXFxcZFxcXFwuXSspKCcgKyB1bml0cyArICcpIConXG4gICsgJygoPzonICsgc3RyaW5nICsgJykoICosICooPzonICsgc3RyaW5nICsgJykpKiknKVxuXG4vKipcbiAqIENhY2hlIGZvbnQgcGFyc2luZy5cbiAqL1xuXG5jb25zdCBjYWNoZSA9IHt9XG5cbmNvbnN0IGRlZmF1bHRIZWlnaHQgPSAxNiAvLyBwdCwgY29tbW9uIGJyb3dzZXIgZGVmYXVsdFxuXG4vKipcbiAqIFBhcnNlIGZvbnQgYHN0cmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fSBQYXJzZWQgZm9udC4gYHNpemVgIGlzIGluIGRldmljZSB1bml0cy4gYHVuaXRgIGlzIHRoZSB1bml0XG4gKiAgIGFwcGVhcmluZyBpbiB0aGUgaW5wdXQgc3RyaW5nLlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyKSB7XG4gIC8vIENhY2hlZFxuICBpZiAoY2FjaGVbc3RyXSkgcmV0dXJuIGNhY2hlW3N0cl1cblxuICAvLyBUcnkgZm9yIHJlcXVpcmVkIHByb3BlcnRpZXMgZmlyc3QuXG4gIGNvbnN0IHNpemVGYW1pbHkgPSBzaXplRmFtaWx5UmUuZXhlYyhzdHIpXG4gIGlmICghc2l6ZUZhbWlseSkgcmV0dXJuIC8vIGludmFsaWRcblxuICAvLyBEZWZhdWx0IHZhbHVlcyBhbmQgcmVxdWlyZWQgcHJvcGVydGllc1xuICBjb25zdCBmb250ID0ge1xuICAgIHdlaWdodDogJ25vcm1hbCcsXG4gICAgc3R5bGU6ICdub3JtYWwnLFxuICAgIHN0cmV0Y2g6ICdub3JtYWwnLFxuICAgIHZhcmlhbnQ6ICdub3JtYWwnLFxuICAgIHNpemU6IHBhcnNlRmxvYXQoc2l6ZUZhbWlseVsxXSksXG4gICAgdW5pdDogc2l6ZUZhbWlseVsyXSxcbiAgICBmYW1pbHk6IHNpemVGYW1pbHlbM10ucmVwbGFjZSgvW1wiJ10vZywgJycpLnJlcGxhY2UoLyAqLCAqL2csICcsJylcbiAgfVxuXG4gIC8vIE9wdGlvbmFsLCB1bm9yZGVyZWQgcHJvcGVydGllcy5cbiAgbGV0IHdlaWdodCwgc3R5bGUsIHZhcmlhbnQsIHN0cmV0Y2hcbiAgLy8gU3RvcCBzZWFyY2ggYXQgYHNpemVGYW1pbHkuaW5kZXhgXG4gIGxldCBzdWJzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIHNpemVGYW1pbHkuaW5kZXgpXG4gIGlmICgod2VpZ2h0ID0gd2VpZ2h0UmUuZXhlYyhzdWJzdHIpKSkgZm9udC53ZWlnaHQgPSB3ZWlnaHRbMV1cbiAgaWYgKChzdHlsZSA9IHN0eWxlUmUuZXhlYyhzdWJzdHIpKSkgZm9udC5zdHlsZSA9IHN0eWxlWzFdXG4gIGlmICgodmFyaWFudCA9IHZhcmlhbnRSZS5leGVjKHN1YnN0cikpKSBmb250LnZhcmlhbnQgPSB2YXJpYW50WzFdXG4gIGlmICgoc3RyZXRjaCA9IHN0cmV0Y2hSZS5leGVjKHN1YnN0cikpKSBmb250LnN0cmV0Y2ggPSBzdHJldGNoWzFdXG5cbiAgLy8gQ29udmVydCB0byBkZXZpY2UgdW5pdHMuIChgZm9udC51bml0YCBpcyB0aGUgb3JpZ2luYWwgdW5pdClcbiAgLy8gVE9ETzogY2gsIGV4XG4gIHN3aXRjaCAoZm9udC51bml0KSB7XG4gICAgY2FzZSAncHQnOlxuICAgICAgZm9udC5zaXplIC89IDAuNzVcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncGMnOlxuICAgICAgZm9udC5zaXplICo9IDE2XG4gICAgICBicmVha1xuICAgIGNhc2UgJ2luJzpcbiAgICAgIGZvbnQuc2l6ZSAqPSA5NlxuICAgICAgYnJlYWtcbiAgICBjYXNlICdjbSc6XG4gICAgICBmb250LnNpemUgKj0gOTYuMCAvIDIuNTRcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnbW0nOlxuICAgICAgZm9udC5zaXplICo9IDk2LjAgLyAyNS40XG4gICAgICBicmVha1xuICAgIGNhc2UgJyUnOlxuICAgICAgLy8gVE9ETyBkaXNhYmxlZCBiZWNhdXNlIGV4aXN0aW5nIHVuaXQgdGVzdHMgYXNzdW1lIDEwMFxuICAgICAgLy8gZm9udC5zaXplICo9IGRlZmF1bHRIZWlnaHQgLyAxMDAgLyAwLjc1XG4gICAgICBicmVha1xuICAgIGNhc2UgJ2VtJzpcbiAgICBjYXNlICdyZW0nOlxuICAgICAgZm9udC5zaXplICo9IGRlZmF1bHRIZWlnaHQgLyAwLjc1XG4gICAgICBicmVha1xuICAgIGNhc2UgJ3EnOlxuICAgICAgZm9udC5zaXplICo9IDk2IC8gMjUuNCAvIDRcbiAgICAgIGJyZWFrXG4gIH1cblxuICByZXR1cm4gKGNhY2hlW3N0cl0gPSBmb250KVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmxvb3AgPSBleHBvcnRzLmNvbmRpdGlvbmFsID0gZXhwb3J0cy5wYXJzZSA9IHZvaWQgMDtcblxudmFyIHBhcnNlID0gZnVuY3Rpb24gcGFyc2Uoc3RyZWFtLCBzY2hlbWEpIHtcbiAgdmFyIHJlc3VsdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDoge307XG4gIHZhciBwYXJlbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IHJlc3VsdDtcblxuICBpZiAoQXJyYXkuaXNBcnJheShzY2hlbWEpKSB7XG4gICAgc2NoZW1hLmZvckVhY2goZnVuY3Rpb24gKHBhcnRTY2hlbWEpIHtcbiAgICAgIHJldHVybiBwYXJzZShzdHJlYW0sIHBhcnRTY2hlbWEsIHJlc3VsdCwgcGFyZW50KTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc2NoZW1hID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc2NoZW1hKHN0cmVhbSwgcmVzdWx0LCBwYXJlbnQsIHBhcnNlKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIga2V5ID0gT2JqZWN0LmtleXMoc2NoZW1hKVswXTtcblxuICAgIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYVtrZXldKSkge1xuICAgICAgcGFyZW50W2tleV0gPSB7fTtcbiAgICAgIHBhcnNlKHN0cmVhbSwgc2NoZW1hW2tleV0sIHJlc3VsdCwgcGFyZW50W2tleV0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJlbnRba2V5XSA9IHNjaGVtYVtrZXldKHN0cmVhbSwgcmVzdWx0LCBwYXJlbnQsIHBhcnNlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuZXhwb3J0cy5wYXJzZSA9IHBhcnNlO1xuXG52YXIgY29uZGl0aW9uYWwgPSBmdW5jdGlvbiBjb25kaXRpb25hbChzY2hlbWEsIGNvbmRpdGlvbkZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHJlc3VsdCwgcGFyZW50LCBwYXJzZSkge1xuICAgIGlmIChjb25kaXRpb25GdW5jKHN0cmVhbSwgcmVzdWx0LCBwYXJlbnQpKSB7XG4gICAgICBwYXJzZShzdHJlYW0sIHNjaGVtYSwgcmVzdWx0LCBwYXJlbnQpO1xuICAgIH1cbiAgfTtcbn07XG5cbmV4cG9ydHMuY29uZGl0aW9uYWwgPSBjb25kaXRpb25hbDtcblxudmFyIGxvb3AgPSBmdW5jdGlvbiBsb29wKHNjaGVtYSwgY29udGludWVGdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyZWFtLCByZXN1bHQsIHBhcmVudCwgcGFyc2UpIHtcbiAgICB2YXIgYXJyID0gW107XG5cbiAgICB3aGlsZSAoY29udGludWVGdW5jKHN0cmVhbSwgcmVzdWx0LCBwYXJlbnQpKSB7XG4gICAgICB2YXIgbmV3UGFyZW50ID0ge307XG4gICAgICBwYXJzZShzdHJlYW0sIHNjaGVtYSwgcmVzdWx0LCBuZXdQYXJlbnQpO1xuICAgICAgYXJyLnB1c2gobmV3UGFyZW50KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyO1xuICB9O1xufTtcblxuZXhwb3J0cy5sb29wID0gbG9vcDsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMucmVhZEJpdHMgPSBleHBvcnRzLnJlYWRBcnJheSA9IGV4cG9ydHMucmVhZFVuc2lnbmVkID0gZXhwb3J0cy5yZWFkU3RyaW5nID0gZXhwb3J0cy5wZWVrQnl0ZXMgPSBleHBvcnRzLnJlYWRCeXRlcyA9IGV4cG9ydHMucGVla0J5dGUgPSBleHBvcnRzLnJlYWRCeXRlID0gZXhwb3J0cy5idWlsZFN0cmVhbSA9IHZvaWQgMDtcblxuLy8gRGVmYXVsdCBzdHJlYW0gYW5kIHBhcnNlcnMgZm9yIFVpbnQ4VHlwZWRBcnJheSBkYXRhIHR5cGVcbnZhciBidWlsZFN0cmVhbSA9IGZ1bmN0aW9uIGJ1aWxkU3RyZWFtKHVpbnQ4RGF0YSkge1xuICByZXR1cm4ge1xuICAgIGRhdGE6IHVpbnQ4RGF0YSxcbiAgICBwb3M6IDBcbiAgfTtcbn07XG5cbmV4cG9ydHMuYnVpbGRTdHJlYW0gPSBidWlsZFN0cmVhbTtcblxudmFyIHJlYWRCeXRlID0gZnVuY3Rpb24gcmVhZEJ5dGUoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgcmV0dXJuIHN0cmVhbS5kYXRhW3N0cmVhbS5wb3MrK107XG4gIH07XG59O1xuXG5leHBvcnRzLnJlYWRCeXRlID0gcmVhZEJ5dGU7XG5cbnZhciBwZWVrQnl0ZSA9IGZ1bmN0aW9uIHBlZWtCeXRlKCkge1xuICB2YXIgb2Zmc2V0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAwO1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgIHJldHVybiBzdHJlYW0uZGF0YVtzdHJlYW0ucG9zICsgb2Zmc2V0XTtcbiAgfTtcbn07XG5cbmV4cG9ydHMucGVla0J5dGUgPSBwZWVrQnl0ZTtcblxudmFyIHJlYWRCeXRlcyA9IGZ1bmN0aW9uIHJlYWRCeXRlcyhsZW5ndGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICByZXR1cm4gc3RyZWFtLmRhdGEuc3ViYXJyYXkoc3RyZWFtLnBvcywgc3RyZWFtLnBvcyArPSBsZW5ndGgpO1xuICB9O1xufTtcblxuZXhwb3J0cy5yZWFkQnl0ZXMgPSByZWFkQnl0ZXM7XG5cbnZhciBwZWVrQnl0ZXMgPSBmdW5jdGlvbiBwZWVrQnl0ZXMobGVuZ3RoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgcmV0dXJuIHN0cmVhbS5kYXRhLnN1YmFycmF5KHN0cmVhbS5wb3MsIHN0cmVhbS5wb3MgKyBsZW5ndGgpO1xuICB9O1xufTtcblxuZXhwb3J0cy5wZWVrQnl0ZXMgPSBwZWVrQnl0ZXM7XG5cbnZhciByZWFkU3RyaW5nID0gZnVuY3Rpb24gcmVhZFN0cmluZyhsZW5ndGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShyZWFkQnl0ZXMobGVuZ3RoKShzdHJlYW0pKS5tYXAoZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSh2YWx1ZSk7XG4gICAgfSkuam9pbignJyk7XG4gIH07XG59O1xuXG5leHBvcnRzLnJlYWRTdHJpbmcgPSByZWFkU3RyaW5nO1xuXG52YXIgcmVhZFVuc2lnbmVkID0gZnVuY3Rpb24gcmVhZFVuc2lnbmVkKGxpdHRsZUVuZGlhbikge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgIHZhciBieXRlcyA9IHJlYWRCeXRlcygyKShzdHJlYW0pO1xuICAgIHJldHVybiBsaXR0bGVFbmRpYW4gPyAoYnl0ZXNbMV0gPDwgOCkgKyBieXRlc1swXSA6IChieXRlc1swXSA8PCA4KSArIGJ5dGVzWzFdO1xuICB9O1xufTtcblxuZXhwb3J0cy5yZWFkVW5zaWduZWQgPSByZWFkVW5zaWduZWQ7XG5cbnZhciByZWFkQXJyYXkgPSBmdW5jdGlvbiByZWFkQXJyYXkoYnl0ZVNpemUsIHRvdGFsT3JGdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyZWFtLCByZXN1bHQsIHBhcmVudCkge1xuICAgIHZhciB0b3RhbCA9IHR5cGVvZiB0b3RhbE9yRnVuYyA9PT0gJ2Z1bmN0aW9uJyA/IHRvdGFsT3JGdW5jKHN0cmVhbSwgcmVzdWx0LCBwYXJlbnQpIDogdG90YWxPckZ1bmM7XG4gICAgdmFyIHBhcnNlciA9IHJlYWRCeXRlcyhieXRlU2l6ZSk7XG4gICAgdmFyIGFyciA9IG5ldyBBcnJheSh0b3RhbCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsOyBpKyspIHtcbiAgICAgIGFycltpXSA9IHBhcnNlcihzdHJlYW0pO1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG4gIH07XG59O1xuXG5leHBvcnRzLnJlYWRBcnJheSA9IHJlYWRBcnJheTtcblxudmFyIHN1YkJpdHNUb3RhbCA9IGZ1bmN0aW9uIHN1YkJpdHNUb3RhbChiaXRzLCBzdGFydEluZGV4LCBsZW5ndGgpIHtcbiAgdmFyIHJlc3VsdCA9IDA7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHJlc3VsdCArPSBiaXRzW3N0YXJ0SW5kZXggKyBpXSAmJiBNYXRoLnBvdygyLCBsZW5ndGggLSBpIC0gMSk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxudmFyIHJlYWRCaXRzID0gZnVuY3Rpb24gcmVhZEJpdHMoc2NoZW1hKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgdmFyIF9ieXRlID0gcmVhZEJ5dGUoKShzdHJlYW0pOyAvLyBjb252ZXJ0IHRoZSBieXRlIHRvIGJpdCBhcnJheVxuXG5cbiAgICB2YXIgYml0cyA9IG5ldyBBcnJheSg4KTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKSB7XG4gICAgICBiaXRzWzcgLSBpXSA9ICEhKF9ieXRlICYgMSA8PCBpKTtcbiAgICB9IC8vIGNvbnZlcnQgdGhlIGJpdCBhcnJheSB0byB2YWx1ZXMgYmFzZWQgb24gdGhlIHNjaGVtYVxuXG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc2NoZW1hKS5yZWR1Y2UoZnVuY3Rpb24gKHJlcywga2V5KSB7XG4gICAgICB2YXIgZGVmID0gc2NoZW1hW2tleV07XG5cbiAgICAgIGlmIChkZWYubGVuZ3RoKSB7XG4gICAgICAgIHJlc1trZXldID0gc3ViQml0c1RvdGFsKGJpdHMsIGRlZi5pbmRleCwgZGVmLmxlbmd0aCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNba2V5XSA9IGJpdHNbZGVmLmluZGV4XTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlcztcbiAgICB9LCB7fSk7XG4gIH07XG59O1xuXG5leHBvcnRzLnJlYWRCaXRzID0gcmVhZEJpdHM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IHZvaWQgMDtcblxudmFyIF8gPSByZXF1aXJlKFwiLi4vXCIpO1xuXG52YXIgX3VpbnQgPSByZXF1aXJlKFwiLi4vcGFyc2Vycy91aW50OFwiKTtcblxuLy8gYSBzZXQgb2YgMHgwMCB0ZXJtaW5hdGVkIHN1YmJsb2Nrc1xudmFyIHN1YkJsb2Nrc1NjaGVtYSA9IHtcbiAgYmxvY2tzOiBmdW5jdGlvbiBibG9ja3Moc3RyZWFtKSB7XG4gICAgdmFyIHRlcm1pbmF0b3IgPSAweDAwO1xuICAgIHZhciBjaHVua3MgPSBbXTtcbiAgICB2YXIgc3RyZWFtU2l6ZSA9IHN0cmVhbS5kYXRhLmxlbmd0aDtcbiAgICB2YXIgdG90YWwgPSAwO1xuXG4gICAgZm9yICh2YXIgc2l6ZSA9ICgwLCBfdWludC5yZWFkQnl0ZSkoKShzdHJlYW0pOyBzaXplICE9PSB0ZXJtaW5hdG9yOyBzaXplID0gKDAsIF91aW50LnJlYWRCeXRlKSgpKHN0cmVhbSkpIHtcbiAgICAgIC8vIGNhdGNoIGNvcnJ1cHRlZCBmaWxlcyB3aXRoIG5vIHRlcm1pbmF0b3JcbiAgICAgIGlmIChzdHJlYW0ucG9zICsgc2l6ZSA+PSBzdHJlYW1TaXplKSB7XG4gICAgICAgIHZhciBhdmFpbGFibGVTaXplID0gc3RyZWFtU2l6ZSAtIHN0cmVhbS5wb3M7XG4gICAgICAgIGNodW5rcy5wdXNoKCgwLCBfdWludC5yZWFkQnl0ZXMpKGF2YWlsYWJsZVNpemUpKHN0cmVhbSkpO1xuICAgICAgICB0b3RhbCArPSBhdmFpbGFibGVTaXplO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY2h1bmtzLnB1c2goKDAsIF91aW50LnJlYWRCeXRlcykoc2l6ZSkoc3RyZWFtKSk7XG4gICAgICB0b3RhbCArPSBzaXplO1xuICAgIH1cblxuICAgIHZhciByZXN1bHQgPSBuZXcgVWludDhBcnJheSh0b3RhbCk7XG4gICAgdmFyIG9mZnNldCA9IDA7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNodW5rcy5sZW5ndGg7IGkrKykge1xuICAgICAgcmVzdWx0LnNldChjaHVua3NbaV0sIG9mZnNldCk7XG4gICAgICBvZmZzZXQgKz0gY2h1bmtzW2ldLmxlbmd0aDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59OyAvLyBnbG9iYWwgY29udHJvbCBleHRlbnNpb25cblxudmFyIGdjZVNjaGVtYSA9ICgwLCBfLmNvbmRpdGlvbmFsKSh7XG4gIGdjZTogW3tcbiAgICBjb2RlczogKDAsIF91aW50LnJlYWRCeXRlcykoMilcbiAgfSwge1xuICAgIGJ5dGVTaXplOiAoMCwgX3VpbnQucmVhZEJ5dGUpKClcbiAgfSwge1xuICAgIGV4dHJhczogKDAsIF91aW50LnJlYWRCaXRzKSh7XG4gICAgICBmdXR1cmU6IHtcbiAgICAgICAgaW5kZXg6IDAsXG4gICAgICAgIGxlbmd0aDogM1xuICAgICAgfSxcbiAgICAgIGRpc3Bvc2FsOiB7XG4gICAgICAgIGluZGV4OiAzLFxuICAgICAgICBsZW5ndGg6IDNcbiAgICAgIH0sXG4gICAgICB1c2VySW5wdXQ6IHtcbiAgICAgICAgaW5kZXg6IDZcbiAgICAgIH0sXG4gICAgICB0cmFuc3BhcmVudENvbG9yR2l2ZW46IHtcbiAgICAgICAgaW5kZXg6IDdcbiAgICAgIH1cbiAgICB9KVxuICB9LCB7XG4gICAgZGVsYXk6ICgwLCBfdWludC5yZWFkVW5zaWduZWQpKHRydWUpXG4gIH0sIHtcbiAgICB0cmFuc3BhcmVudENvbG9ySW5kZXg6ICgwLCBfdWludC5yZWFkQnl0ZSkoKVxuICB9LCB7XG4gICAgdGVybWluYXRvcjogKDAsIF91aW50LnJlYWRCeXRlKSgpXG4gIH1dXG59LCBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gIHZhciBjb2RlcyA9ICgwLCBfdWludC5wZWVrQnl0ZXMpKDIpKHN0cmVhbSk7XG4gIHJldHVybiBjb2Rlc1swXSA9PT0gMHgyMSAmJiBjb2Rlc1sxXSA9PT0gMHhmOTtcbn0pOyAvLyBpbWFnZSBwaXBlbGluZSBibG9ja1xuXG52YXIgaW1hZ2VTY2hlbWEgPSAoMCwgXy5jb25kaXRpb25hbCkoe1xuICBpbWFnZTogW3tcbiAgICBjb2RlOiAoMCwgX3VpbnQucmVhZEJ5dGUpKClcbiAgfSwge1xuICAgIGRlc2NyaXB0b3I6IFt7XG4gICAgICBsZWZ0OiAoMCwgX3VpbnQucmVhZFVuc2lnbmVkKSh0cnVlKVxuICAgIH0sIHtcbiAgICAgIHRvcDogKDAsIF91aW50LnJlYWRVbnNpZ25lZCkodHJ1ZSlcbiAgICB9LCB7XG4gICAgICB3aWR0aDogKDAsIF91aW50LnJlYWRVbnNpZ25lZCkodHJ1ZSlcbiAgICB9LCB7XG4gICAgICBoZWlnaHQ6ICgwLCBfdWludC5yZWFkVW5zaWduZWQpKHRydWUpXG4gICAgfSwge1xuICAgICAgbGN0OiAoMCwgX3VpbnQucmVhZEJpdHMpKHtcbiAgICAgICAgZXhpc3RzOiB7XG4gICAgICAgICAgaW5kZXg6IDBcbiAgICAgICAgfSxcbiAgICAgICAgaW50ZXJsYWNlZDoge1xuICAgICAgICAgIGluZGV4OiAxXG4gICAgICAgIH0sXG4gICAgICAgIHNvcnQ6IHtcbiAgICAgICAgICBpbmRleDogMlxuICAgICAgICB9LFxuICAgICAgICBmdXR1cmU6IHtcbiAgICAgICAgICBpbmRleDogMyxcbiAgICAgICAgICBsZW5ndGg6IDJcbiAgICAgICAgfSxcbiAgICAgICAgc2l6ZToge1xuICAgICAgICAgIGluZGV4OiA1LFxuICAgICAgICAgIGxlbmd0aDogM1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1dXG4gIH0sICgwLCBfLmNvbmRpdGlvbmFsKSh7XG4gICAgbGN0OiAoMCwgX3VpbnQucmVhZEFycmF5KSgzLCBmdW5jdGlvbiAoc3RyZWFtLCByZXN1bHQsIHBhcmVudCkge1xuICAgICAgcmV0dXJuIE1hdGgucG93KDIsIHBhcmVudC5kZXNjcmlwdG9yLmxjdC5zaXplICsgMSk7XG4gICAgfSlcbiAgfSwgZnVuY3Rpb24gKHN0cmVhbSwgcmVzdWx0LCBwYXJlbnQpIHtcbiAgICByZXR1cm4gcGFyZW50LmRlc2NyaXB0b3IubGN0LmV4aXN0cztcbiAgfSksIHtcbiAgICBkYXRhOiBbe1xuICAgICAgbWluQ29kZVNpemU6ICgwLCBfdWludC5yZWFkQnl0ZSkoKVxuICAgIH0sIHN1YkJsb2Nrc1NjaGVtYV1cbiAgfV1cbn0sIGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgcmV0dXJuICgwLCBfdWludC5wZWVrQnl0ZSkoKShzdHJlYW0pID09PSAweDJjO1xufSk7IC8vIHBsYWluIHRleHQgYmxvY2tcblxudmFyIHRleHRTY2hlbWEgPSAoMCwgXy5jb25kaXRpb25hbCkoe1xuICB0ZXh0OiBbe1xuICAgIGNvZGVzOiAoMCwgX3VpbnQucmVhZEJ5dGVzKSgyKVxuICB9LCB7XG4gICAgYmxvY2tTaXplOiAoMCwgX3VpbnQucmVhZEJ5dGUpKClcbiAgfSwge1xuICAgIHByZURhdGE6IGZ1bmN0aW9uIHByZURhdGEoc3RyZWFtLCByZXN1bHQsIHBhcmVudCkge1xuICAgICAgcmV0dXJuICgwLCBfdWludC5yZWFkQnl0ZXMpKHBhcmVudC50ZXh0LmJsb2NrU2l6ZSkoc3RyZWFtKTtcbiAgICB9XG4gIH0sIHN1YkJsb2Nrc1NjaGVtYV1cbn0sIGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgdmFyIGNvZGVzID0gKDAsIF91aW50LnBlZWtCeXRlcykoMikoc3RyZWFtKTtcbiAgcmV0dXJuIGNvZGVzWzBdID09PSAweDIxICYmIGNvZGVzWzFdID09PSAweDAxO1xufSk7IC8vIGFwcGxpY2F0aW9uIGJsb2NrXG5cbnZhciBhcHBsaWNhdGlvblNjaGVtYSA9ICgwLCBfLmNvbmRpdGlvbmFsKSh7XG4gIGFwcGxpY2F0aW9uOiBbe1xuICAgIGNvZGVzOiAoMCwgX3VpbnQucmVhZEJ5dGVzKSgyKVxuICB9LCB7XG4gICAgYmxvY2tTaXplOiAoMCwgX3VpbnQucmVhZEJ5dGUpKClcbiAgfSwge1xuICAgIGlkOiBmdW5jdGlvbiBpZChzdHJlYW0sIHJlc3VsdCwgcGFyZW50KSB7XG4gICAgICByZXR1cm4gKDAsIF91aW50LnJlYWRTdHJpbmcpKHBhcmVudC5ibG9ja1NpemUpKHN0cmVhbSk7XG4gICAgfVxuICB9LCBzdWJCbG9ja3NTY2hlbWFdXG59LCBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gIHZhciBjb2RlcyA9ICgwLCBfdWludC5wZWVrQnl0ZXMpKDIpKHN0cmVhbSk7XG4gIHJldHVybiBjb2Rlc1swXSA9PT0gMHgyMSAmJiBjb2Rlc1sxXSA9PT0gMHhmZjtcbn0pOyAvLyBjb21tZW50IGJsb2NrXG5cbnZhciBjb21tZW50U2NoZW1hID0gKDAsIF8uY29uZGl0aW9uYWwpKHtcbiAgY29tbWVudDogW3tcbiAgICBjb2RlczogKDAsIF91aW50LnJlYWRCeXRlcykoMilcbiAgfSwgc3ViQmxvY2tzU2NoZW1hXVxufSwgZnVuY3Rpb24gKHN0cmVhbSkge1xuICB2YXIgY29kZXMgPSAoMCwgX3VpbnQucGVla0J5dGVzKSgyKShzdHJlYW0pO1xuICByZXR1cm4gY29kZXNbMF0gPT09IDB4MjEgJiYgY29kZXNbMV0gPT09IDB4ZmU7XG59KTtcbnZhciBzY2hlbWEgPSBbe1xuICBoZWFkZXI6IFt7XG4gICAgc2lnbmF0dXJlOiAoMCwgX3VpbnQucmVhZFN0cmluZykoMylcbiAgfSwge1xuICAgIHZlcnNpb246ICgwLCBfdWludC5yZWFkU3RyaW5nKSgzKVxuICB9XVxufSwge1xuICBsc2Q6IFt7XG4gICAgd2lkdGg6ICgwLCBfdWludC5yZWFkVW5zaWduZWQpKHRydWUpXG4gIH0sIHtcbiAgICBoZWlnaHQ6ICgwLCBfdWludC5yZWFkVW5zaWduZWQpKHRydWUpXG4gIH0sIHtcbiAgICBnY3Q6ICgwLCBfdWludC5yZWFkQml0cykoe1xuICAgICAgZXhpc3RzOiB7XG4gICAgICAgIGluZGV4OiAwXG4gICAgICB9LFxuICAgICAgcmVzb2x1dGlvbjoge1xuICAgICAgICBpbmRleDogMSxcbiAgICAgICAgbGVuZ3RoOiAzXG4gICAgICB9LFxuICAgICAgc29ydDoge1xuICAgICAgICBpbmRleDogNFxuICAgICAgfSxcbiAgICAgIHNpemU6IHtcbiAgICAgICAgaW5kZXg6IDUsXG4gICAgICAgIGxlbmd0aDogM1xuICAgICAgfVxuICAgIH0pXG4gIH0sIHtcbiAgICBiYWNrZ3JvdW5kQ29sb3JJbmRleDogKDAsIF91aW50LnJlYWRCeXRlKSgpXG4gIH0sIHtcbiAgICBwaXhlbEFzcGVjdFJhdGlvOiAoMCwgX3VpbnQucmVhZEJ5dGUpKClcbiAgfV1cbn0sICgwLCBfLmNvbmRpdGlvbmFsKSh7XG4gIGdjdDogKDAsIF91aW50LnJlYWRBcnJheSkoMywgZnVuY3Rpb24gKHN0cmVhbSwgcmVzdWx0KSB7XG4gICAgcmV0dXJuIE1hdGgucG93KDIsIHJlc3VsdC5sc2QuZ2N0LnNpemUgKyAxKTtcbiAgfSlcbn0sIGZ1bmN0aW9uIChzdHJlYW0sIHJlc3VsdCkge1xuICByZXR1cm4gcmVzdWx0LmxzZC5nY3QuZXhpc3RzO1xufSksIC8vIGNvbnRlbnQgZnJhbWVzXG57XG4gIGZyYW1lczogKDAsIF8ubG9vcCkoW2djZVNjaGVtYSwgYXBwbGljYXRpb25TY2hlbWEsIGNvbW1lbnRTY2hlbWEsIGltYWdlU2NoZW1hLCB0ZXh0U2NoZW1hXSwgZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgIHZhciBuZXh0Q29kZSA9ICgwLCBfdWludC5wZWVrQnl0ZSkoKShzdHJlYW0pOyAvLyByYXRoZXIgdGhhbiBjaGVjayBmb3IgYSB0ZXJtaW5hdG9yLCB3ZSBzaG91bGQgY2hlY2sgZm9yIHRoZSBleGlzdGVuY2VcbiAgICAvLyBvZiBhbiBleHQgb3IgaW1hZ2UgYmxvY2sgdG8gYXZvaWQgaW5maW5pdGUgbG9vcHNcbiAgICAvL3ZhciB0ZXJtaW5hdG9yID0gMHgzQjtcbiAgICAvL3JldHVybiBuZXh0Q29kZSAhPT0gdGVybWluYXRvcjtcblxuICAgIHJldHVybiBuZXh0Q29kZSA9PT0gMHgyMSB8fCBuZXh0Q29kZSA9PT0gMHgyYztcbiAgfSlcbn1dO1xudmFyIF9kZWZhdWx0ID0gc2NoZW1hO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBfZGVmYXVsdDsiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2F3YWl0ZXIgPSAodGhpcyAmJiB0aGlzLl9fYXdhaXRlcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGFkb3B0KHZhbHVlKSB7IHJldHVybiB2YWx1ZSBpbnN0YW5jZW9mIFAgPyB2YWx1ZSA6IG5ldyBQKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJlc29sdmUodmFsdWUpOyB9KTsgfVxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHJlamVjdGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yW1widGhyb3dcIl0odmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XG4gICAgfSk7XG59O1xudmFyIF9fZ2VuZXJhdG9yID0gKHRoaXMgJiYgdGhpcy5fX2dlbmVyYXRvcikgfHwgZnVuY3Rpb24gKHRoaXNBcmcsIGJvZHkpIHtcbiAgICB2YXIgXyA9IHsgbGFiZWw6IDAsIHNlbnQ6IGZ1bmN0aW9uKCkgeyBpZiAodFswXSAmIDEpIHRocm93IHRbMV07IHJldHVybiB0WzFdOyB9LCB0cnlzOiBbXSwgb3BzOiBbXSB9LCBmLCB5LCB0LCBnO1xuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxuICAgIGZ1bmN0aW9uIHN0ZXAob3ApIHtcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcbiAgICAgICAgICAgIGlmIChmID0gMSwgeSAmJiAodCA9IG9wWzBdICYgMiA/IHlbXCJyZXR1cm5cIl0gOiBvcFswXSA/IHlbXCJ0aHJvd1wiXSB8fCAoKHQgPSB5W1wicmV0dXJuXCJdKSAmJiB0LmNhbGwoeSksIDApIDogeS5uZXh0KSAmJiAhKHQgPSB0LmNhbGwoeSwgb3BbMV0pKS5kb25lKSByZXR1cm4gdDtcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcbiAgICAgICAgICAgICAgICBjYXNlIDA6IGNhc2UgMTogdCA9IG9wOyBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBjYXNlIDc6IG9wID0gXy5vcHMucG9wKCk7IF8udHJ5cy5wb3AoKTsgY29udGludWU7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gMyAmJiAoIXQgfHwgKG9wWzFdID4gdFswXSAmJiBvcFsxXSA8IHRbM10pKSkgeyBfLmxhYmVsID0gb3BbMV07IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0WzJdKSBfLm9wcy5wb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wID0gYm9keS5jYWxsKHRoaXNBcmcsIF8pO1xuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xuICAgIH1cbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG52YXIgYXdlc29tZV9xcl8xID0gcmVxdWlyZShcImF3ZXNvbWUtcXJcIik7XG52YXIgbWFpYXJfbG9nb18xID0gcmVxdWlyZShcIi4vbWFpYXItbG9nb1wiKTtcbnZhciB1cmxfYnVpbGRlcl8xID0gcmVxdWlyZShcIi4vdXJsLWJ1aWxkZXJcIik7XG53aW5kb3dbJ01haWFyUGF5bWVudHMnXSA9IHtcbiAgICBnZW5lcmF0ZVBheW1lbnRzUVI6IGZ1bmN0aW9uIChfYSkge1xuICAgICAgICB2YXIgcGF5bWVudElkID0gX2EucGF5bWVudElkLCBwYXltZW50Um91dGVyQWRkcmVzcyA9IF9hLnBheW1lbnRSb3V0ZXJBZGRyZXNzLCBfYiA9IF9hLnNpemUsIHNpemUgPSBfYiA9PT0gdm9pZCAwID8gMjU2IDogX2IsIHRva2VuQW1vdW50ID0gX2EudG9rZW5BbW91bnQsIHRva2VuSWRlbnRpZmllciA9IF9hLnRva2VuSWRlbnRpZmllcjtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih2b2lkIDAsIHZvaWQgMCwgdm9pZCAwLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX19nZW5lcmF0b3IodGhpcywgZnVuY3Rpb24gKF9jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIG5ldyBhd2Vzb21lX3FyXzEuQXdlc29tZVFSKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHVybF9idWlsZGVyXzEuYnVpbGRQYXltZW50VXJsKHsgcGF5bWVudElkOiBwYXltZW50SWQsIHBheW1lbnRSb3V0ZXJBZGRyZXNzOiBwYXltZW50Um91dGVyQWRkcmVzcywgdG9rZW5BbW91bnQ6IHRva2VuQW1vdW50LCB0b2tlbklkZW50aWZpZXI6IHRva2VuSWRlbnRpZmllciB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemU6IHNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dvSW1hZ2U6IG1haWFyX2xvZ29fMS5NQUlBUl9MT0dPXG4gICAgICAgICAgICAgICAgICAgIH0pLmRyYXcoKV07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5NQUlBUl9MT0dPID0gdm9pZCAwO1xuZXhwb3J0cy5NQUlBUl9MT0dPID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUxRQUFBQzBDQU1BQUFBS0UvWUFBQUFBQkdkQlRVRUFBTEdQQy94aEJRQUFBQUZ6VWtkQ0FLN09IT2tBQUFDVFVFeFVSVWR3VEEweXNCbEV3UTB5c0JwRndnRWduaHBGd2hsRXdoaEN3QlUrdXhwRndobEV3aGxGd2dBZ25nVWxvd1Fsb3dBZm5SRTR0UVlvcFJNN3VBQWZuUnBGd2dFaG53TWpvUTB5c0Fzd3JnODFzeEU0dGdjcXFCUTl1eE03dVFjcHBna3RxaGxEd1FRbG9nVW5wQVlvcFJkQXZnUW1vd3N2ckFrc3FSaEN3QlkvdlFvdXF3RWduUkk2dHhBM3RBNDBzUVlvcGMwbERpQUFBQUFWZEZKT1V3RHcvUG55K2ZhQURBbjA4WGtRZ2ZDS2NtN3hrekZHSjU0QUFBY2ZTVVJCVkhqYTFkMkpjdUk0RUFiZ1pvYkVkcktRMmMyWVFCSU9oM0FFY3J6LzI2MWtnL0dob3lXMWpNVURrSys2L202cktFY05VUXlCZmVJSWhxR3A0MmdJYVdCcVprNGhEVXZOelJ3ZGtqbzM1K2owTGtyQ01DZlJYWHBHaDZJK21VOW9wbzVEeUVaaFBxTkR5SFZwTHRIcGZkL1ZSUS9XMFgxWFY4d1ZORk1uWVppcjZEN1BrS1RNY3hQZDMyNk1hK1k2dXErVHIyRnVvUHZaamJVOEM5RHAvVDl4NzgwdGREcnNtN3B0YnFPWk91bnYzSkNoMDlzK3FXT0JXWVJPNy9xVEVLRlppTzVQcnNWbU1ib3ZNMFRRZ3dwMFA5UXlzd3pOMUVsUHM2RkFzMjVNK2pmcmRPaHJxK1YxVnFHdk8wTlVaaFg2bXQwbzdVRXQrbnBxdFZtTnZ0WU0wWmcxNk91Y25oSlZuaEhvYTh5UVdHZldvcnVmSVhxekh0MTFOK3J5akVOM3E4YVlNZWd1WndqS2pFSjNwMDcwZVVhanU1b2hTRE1TM1kwNlJwcXg2QzY2RVcxR28vMnJjVDFvaHZiZGpRWm1BL1F2cjJvVHN3SGFhNjBUZEo1TjBmN1VzWkhaRE8xTGJXZzJRMmVabHhsaWxHZFRkSlpsSHg1cWJXdzJRV2NjdlNGWG01c04wTG41ZzF5ZEdPYlpCSjJkelp2NThOL2t1bVlqZEc3ZWJBNlBkT3JZeG94RlY4Mkh3ejJWMnM2TVJGL01qSHlZejRscWJkR0RlSFM5enZQNW5DWWh0bVlVdW1XZXp4Y0VhbXN6QmkweUw5elZpVjJlY2VobW5ndno0c3RSSGR1YjlXaHhuUmRmWDI1cUY3TVdMVGUvdkRpbzdmT01RRXZNQzI3Ky9yWld1NWsxYUZXZEhkU09aalZhYldibzU0R05PbkhKc3c3ZE5pL0tiQlRtWnh0MTdHcFdvZlYxZnJaUnU1c1ZhSno1NThkUVRXQ1dvMVZ6bzJxZVRvM1VyajJvUW1lNnVYRXhHNmxKekNxME5ocy9oWG02UTZzcHNpRkY0N1BCUHJQWmJQQmYwc21zVTZHeFBYZzJ6NDRvTlZHZHhXaGo4MjYzUTZqSnpDSzBqZm00MHFwcGVsQ0N0aklmVnpvMW9ibU5scDM1UmJPdWFsNHRsV3BLY3d0dFcrZjlmcjk4a0tzVHNqd0wwTWJtMmFuTysvM3I2MHFxamtuTkRiVHBmSzZaMlVlaUpqYlgwVTUxWnArbE9DR2tlVzZpM2Mzdjd3STF1Ym1LTnM3R3JtMWV0OVgwNWdyYU5zLzdxbm05M2piVUNYR2VhMmlLYkhEejlxMm05bUV1MGE1ejQySitlNnFvWXgvbU01cXV6Z3g5VWZzeG45REd6MjVGbmRsbmNsSjc2TUVMbW1SdWxIVm02TTljN2N1Y294M09HMkx6SkZkN00zTzBKQnRHUGZoZU4wOCttZHBQbnZuN0VLREpobkdlY3pORGZ3NXVmWmtIUURqcjNpcm15ZTlmM3N3M1lGcm5IYXJPWHMwVElPOUIvMmFHcG51bWRHV2VRR2g1Wm4vaENaRG1HWDV1VEg1bmZzME1UVjlucjJiMmg5NkE3dG5kU1RhNGVRdUI5U0EzcnlHd0h1VG1kOWk0bmplZU9qZS9BMjJldmZmZ2RyMStYd0xoR2NuL3JNdnJ2SHdGZzJmM2RldDhNYjlDV0hNak4rK0I1TXpmclhrRkxyOFZkRzVlNW1hT0RtQStQMVhyZkR6Q3dtVFdMYVhaeURvenI0NDdvT25CckxNOEg0KzdHWVExTjNpZFp5ZDBNSE9EMTNrMmhVRG1ScVhPMHlrRWw0MXBqbmJNUnFkekl6Zi9RQ2pualhPZW1ma1pncGwxWloyZkMzUkllV2JtYjlCa1kzOXQ4N3B0WnVqdmdHWmRZWDZCZnVkWlVHY1dEUWlzQjduNUMvbzVuNVhtQllRMU4zSnpnZTcxbWY5ay9pbDZrSnZuSURBZmUzU3UyOWZuUm03bTZIN21XVFNmVDJhR0RtcHU1T1lEQkZQbmkza0QranB2T3pkdmxYWGViS0N2djljcHpCK2dteHZiYStWNUx6WG42SDZlK2VYbUROUTlXSy96cHpmenJiZ0haNDFaZHpod00wUGpmK2UvK2V2cnhZSzdhSHlEcm5PV0FyN09OMzlIbmw3aEdFWnhQSDdRUGxQTzVnSXROZGZyUFBMMHNreCtiUzFUWTNxUW0zTTBxZ2R6c3hmMTZhcGRwdFk4VTg1bWpqWXhlM2dCckx6VW1La3gyY2pScUdkM2FTWlhWeTVpWm1wNW5ROFhjd3FtWnVLWEdtc1hkU2ZqQjBTZE9kclVUS29lMWk4WFQ4WURoRGtGeExPN1lTYnN4dFoxMS9GNG9PN0JFeHJmZytScXdSWGRUSzAxcDJDYURjSnVGRjdoenRUaVozZGFRMXVZU2RTU0M5eVpXbDFuampiTU01bGFlc0UvVTh0N3NFRHJ6a2dqVC8rNm9saEtrRVFEVlowNTJyQUhpYnBSdVpJZ2poNVY1aFNVNWo4alQvK09wYm5hZnhROUtzd0ZXdGFEYXJPRFdydU9nS21GYytPQ2JwcWZrR2JyYmtRc2ZtQUprZFU1Ujh2bWh0NXNxVVl0cTJCcW1UbUZwWXZaYW9ZZ2w1bXdiNWFZT2RxbUJ4MXFQWXp3Ly9vc05qTzBtOW00R3cxV2dzZ3ZncmViRzlacW96VW0waXYzbmMxR0NURmNjeU5iYnJCMk5odW9qWmZjU05aSWlPYUc4VVYrU0xYRkVpVHh3ZzVCblMwdUgwUk5QcXZGVGNMVktNN1pRSGVqNVNvaDBSSWFHak5DYmIzK1NMRHVaMHRqMXViYVlXVlRlN0ZTL2N4dmI5YW9uWlpqdFZaWU9mY2dTdTI0MEt1NUxJek9yRkE3TDN4cnJHVWpORXZWdzRqMmNqMG96UTh1ZVZiT0VKSzFhYlZWZzJXZHh3Um1vWnBvMVZ0MXFTT3RXWkFRc2xXQWxmV1paelBaeGNFTk5lRWl3TXVpVW1vei8rNWJ3cmtobWlGQWJxN1ZlaGo1dU5nWCtOd1lFMThxWGFySjF5MmUxaHh6OHdqQXgzZjdXQkZaTEpTbW14dXRXbnRaSVpxdjdyNFplMWxhd05TZUZvanlKZWxqVDRzV1JwR3Y5YUZ4OUQ4VVQ1NDZXSkQyN3dBQUFBQkpSVTVFcmtKZ2dnPT1cIjtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5idWlsZFBheW1lbnRVcmwgPSB2b2lkIDA7XG4vLyBjb25zdCBQUk9UT0NPTCA9ICdtYWlhcjonXG52YXIgUFJPVE9DT0wgPSAnaHR0cHM6Ly9sb2NhbGhvc3Q6NTAwMC8nO1xudmFyIEJFR0lOX1BBWU1FTlRfUEFUSCA9ICdwYXltZW50JztcbnZhciBBVVRIT1JJWkVfU1VCU0NSSVBUSU9OX1BBVEggPSAnc3Vic2NyaWJlJztcbnZhciBBVVRIT1JJWkVfQ0FSRF9QQVRIID0gJ2NhcmQnO1xudmFyIGJ1aWxkUGF5bWVudFVybCA9IGZ1bmN0aW9uIChfYSkge1xuICAgIHZhciBwYXltZW50SWQgPSBfYS5wYXltZW50SWQsIHBheW1lbnRSb3V0ZXJBZGRyZXNzID0gX2EucGF5bWVudFJvdXRlckFkZHJlc3MsIHRva2VuQW1vdW50ID0gX2EudG9rZW5BbW91bnQsIHRva2VuSWRlbnRpZmllciA9IF9hLnRva2VuSWRlbnRpZmllcjtcbiAgICB2YXIgcGFyYW1zID0ge1xuICAgICAgICBhZGRyZXNzOiBwYXltZW50Um91dGVyQWRkcmVzcyxcbiAgICAgICAgYW1vdW50OiB0b2tlbkFtb3VudCxcbiAgICAgICAgcGF5bWVudElkOiBwYXltZW50SWQsXG4gICAgICAgIHRva2VuOiB0b2tlbklkZW50aWZpZXJcbiAgICB9O1xuICAgIHJldHVybiBQUk9UT0NPTCArIEJFR0lOX1BBWU1FTlRfUEFUSCArICc/JyArIE9iamVjdC5rZXlzKHBhcmFtcykubWFwKGZ1bmN0aW9uIChrKSB7IHJldHVybiBrICsgJz0nICsgcGFyYW1zW2tdOyB9KS5qb2luKCcmJyk7XG59O1xuZXhwb3J0cy5idWlsZFBheW1lbnRVcmwgPSBidWlsZFBheW1lbnRVcmw7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXgudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9