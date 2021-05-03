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
window['MaiarPayments'] = {
    generatePaymentsQR: function (_a) {
        var authorizationId = _a.authorizationId, categoryHint = _a.categoryHint, description = _a.description, iconUrl = _a.iconUrl, _b = _a.size, size = _b === void 0 ? 256 : _b, paymentProcessorAddress = _a.paymentProcessorAddress, _c = _a.protocol, protocol = _c === void 0 ? 'maiar:' : _c, tokenAmount = _a.tokenAmount, tokenIdentifier = _a.tokenIdentifier;
        return __awaiter(void 0, void 0, void 0, function () {
            var params;
            return __generator(this, function (_d) {
                params = {
                    address: paymentProcessorAddress,
                    amount: tokenAmount,
                    category: categoryHint,
                    description: description,
                    iconUrl: iconUrl,
                    id: authorizationId,
                    token: tokenIdentifier
                };
                return [2 /*return*/, new awesome_qr_1.AwesomeQR({
                        logoImage: maiar_logo_1.MAIAR_LOGO,
                        size: size,
                        text: protocol + 'payment?' + Object.keys(params).filter(function (k) { return params[k]; }).map(function (k) { return k + '=' + encodeURIComponent(params[k]); }).join('&')
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
exports.MAIAR_LOGO = "data:image/png;base64,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";


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wYXltZW50cy1xci1idWlsZGVyLy4vbm9kZV9tb2R1bGVzL2F3ZXNvbWUtcXIvbGliL2F3ZXNvbWUtcXIuanMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL25vZGVfbW9kdWxlcy9hd2Vzb21lLXFyL2xpYi9naWYuanMvR0lGRW5jb2Rlci5qcyIsIndlYnBhY2s6Ly9wYXltZW50cy1xci1idWlsZGVyLy4vbm9kZV9tb2R1bGVzL2F3ZXNvbWUtcXIvbGliL2dpZi5qcy9MWldFbmNvZGVyLmpzIiwid2VicGFjazovL3BheW1lbnRzLXFyLWJ1aWxkZXIvLi9ub2RlX21vZHVsZXMvYXdlc29tZS1xci9saWIvZ2lmLmpzL1R5cGVkTmV1UXVhbnQuanMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL25vZGVfbW9kdWxlcy9hd2Vzb21lLXFyL2xpYi9naWZ1Y3QtanMvZGVpbnRlcmxhY2UuanMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL25vZGVfbW9kdWxlcy9hd2Vzb21lLXFyL2xpYi9naWZ1Y3QtanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL25vZGVfbW9kdWxlcy9hd2Vzb21lLXFyL2xpYi9naWZ1Y3QtanMvbHp3LmpzIiwid2VicGFjazovL3BheW1lbnRzLXFyLWJ1aWxkZXIvLi9ub2RlX21vZHVsZXMvYXdlc29tZS1xci9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL25vZGVfbW9kdWxlcy9hd2Vzb21lLXFyL2xpYi9xcmNvZGUuanMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL25vZGVfbW9kdWxlcy9jYW52YXMvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly9wYXltZW50cy1xci1idWlsZGVyLy4vbm9kZV9tb2R1bGVzL2NhbnZhcy9saWIvcGFyc2UtZm9udC5qcyIsIndlYnBhY2s6Ly9wYXltZW50cy1xci1idWlsZGVyLy4vbm9kZV9tb2R1bGVzL2pzLWJpbmFyeS1zY2hlbWEtcGFyc2VyL2xpYi9pbmRleC5qcyIsIndlYnBhY2s6Ly9wYXltZW50cy1xci1idWlsZGVyLy4vbm9kZV9tb2R1bGVzL2pzLWJpbmFyeS1zY2hlbWEtcGFyc2VyL2xpYi9wYXJzZXJzL3VpbnQ4LmpzIiwid2VicGFjazovL3BheW1lbnRzLXFyLWJ1aWxkZXIvLi9ub2RlX21vZHVsZXMvanMtYmluYXJ5LXNjaGVtYS1wYXJzZXIvbGliL3NjaGVtYXMvZ2lmLmpzIiwid2VicGFjazovL3BheW1lbnRzLXFyLWJ1aWxkZXIvLi9zcmMvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci8uL3NyYy9tYWlhci1sb2dvLnRzIiwid2VicGFjazovL3BheW1lbnRzLXFyLWJ1aWxkZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcGF5bWVudHMtcXItYnVpbGRlci93ZWJwYWNrL3N0YXJ0dXAiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhO0FBQ2I7QUFDQTtBQUNBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwrREFBK0QsZ0JBQWdCLEVBQUUsRUFBRTtBQUM5RztBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixxRkFBcUY7QUFDcEg7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQWEsNkJBQTZCLDBCQUEwQixhQUFhLEVBQUUscUJBQXFCO0FBQ3hHLGdCQUFnQixxREFBcUQsb0VBQW9FLGFBQWEsRUFBRTtBQUN4SixzQkFBc0Isc0JBQXNCLHFCQUFxQixHQUFHO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QyxrQ0FBa0MsU0FBUztBQUMzQyxrQ0FBa0MsV0FBVyxVQUFVO0FBQ3ZELHlDQUF5QyxjQUFjO0FBQ3ZEO0FBQ0EsNkdBQTZHLE9BQU8sVUFBVTtBQUM5SCxnRkFBZ0YsaUJBQWlCLE9BQU87QUFDeEcsd0RBQXdELGdCQUFnQixRQUFRLE9BQU87QUFDdkYsOENBQThDLGdCQUFnQixnQkFBZ0IsT0FBTztBQUNyRjtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsU0FBUyxZQUFZLGFBQWEsT0FBTyxFQUFFLFVBQVUsV0FBVztBQUNoRSxtQ0FBbUMsU0FBUztBQUM1QztBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCLGVBQWUsbUJBQU8sQ0FBQyxnREFBUTtBQUMvQixrQkFBa0IsbUJBQU8sQ0FBQyxxRUFBYTtBQUN2QyxlQUFlLG1CQUFPLENBQUMseURBQVU7QUFDakMsbUNBQW1DLG1CQUFPLENBQUMsK0VBQXFCO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0Esb0RBQW9ELHVFQUF1RTtBQUMzSDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0Msb0NBQW9DLEVBQUU7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGNBQWM7QUFDaEQsa0NBQWtDLGNBQWM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MsY0FBYztBQUNoRCxrQ0FBa0MsY0FBYztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLG9DQUFvQztBQUMzRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsY0FBYztBQUNuRCx5Q0FBeUMsY0FBYztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyx3Q0FBd0M7QUFDbkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxvQ0FBb0M7QUFDM0UsMkNBQTJDLG9DQUFvQztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsZ0JBQWdCO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsb0NBQW9DO0FBQ3ZFLHVDQUF1QyxvQ0FBb0M7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRFQUE0RSxzQ0FBc0MsRUFBRTtBQUNwSCxzRkFBc0Y7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2hqQmE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxpRkFBb0I7QUFDM0MsaUJBQWlCLG1CQUFPLENBQUMsMkVBQWlCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVCQUF1QjtBQUMxQyx1QkFBdUIsd0JBQXdCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLHVCQUF1QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLDJCQUEyQixFQUFFO0FBQ25HO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU87QUFDN0M7QUFDQTtBQUNBO0FBQ0EseURBQXlELE9BQU87QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0Qix1QkFBdUI7QUFDdkIsOEJBQThCO0FBQzlCLDJCQUEyQjtBQUMzQix5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCLGlDQUFpQztBQUNqQyxxQkFBcUI7QUFDckIsc0JBQXNCO0FBQ3RCO0FBQ0EscUJBQXFCO0FBQ3JCLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQix5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEIsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0IsMEJBQTBCO0FBQzFCO0FBQ0EsNEJBQTRCO0FBQzVCLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0EsdUZBQXVGLFlBQVk7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtHQUFrRyxXQUFXO0FBQzdHLGtDQUFrQyxlQUFlO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixZQUFZO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixXQUFXO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQSxDQUFDLEVBQUU7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQSxDQUFDLEVBQUU7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUMsRUFBRTs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBO0FBQ0EsQ0FBQyxFQUFFOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0EsZUFBa0IsWTs7Ozs7Ozs7Ozs7QUN2Tkw7QUFDYjtBQUNBLDJCQUEyQiwrREFBK0QsZ0JBQWdCLEVBQUUsRUFBRTtBQUM5RztBQUNBLG1DQUFtQyxNQUFNLDZCQUE2QixFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ2pHLGtDQUFrQyxNQUFNLGlDQUFpQyxFQUFFLFlBQVksV0FBVyxFQUFFO0FBQ3BHLCtCQUErQixxRkFBcUY7QUFDcEg7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQWEsNkJBQTZCLDBCQUEwQixhQUFhLEVBQUUscUJBQXFCO0FBQ3hHLGdCQUFnQixxREFBcUQsb0VBQW9FLGFBQWEsRUFBRTtBQUN4SixzQkFBc0Isc0JBQXNCLHFCQUFxQixHQUFHO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QyxrQ0FBa0MsU0FBUztBQUMzQyxrQ0FBa0MsV0FBVyxVQUFVO0FBQ3ZELHlDQUF5QyxjQUFjO0FBQ3ZEO0FBQ0EsNkdBQTZHLE9BQU8sVUFBVTtBQUM5SCxnRkFBZ0YsaUJBQWlCLE9BQU87QUFDeEcsd0RBQXdELGdCQUFnQixRQUFRLE9BQU87QUFDdkYsOENBQThDLGdCQUFnQixnQkFBZ0IsT0FBTztBQUNyRjtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0EsU0FBUyxZQUFZLGFBQWEsT0FBTyxFQUFFLFVBQVUsV0FBVztBQUNoRSxtQ0FBbUMsU0FBUztBQUM1QztBQUNBO0FBQ0EsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELG1CQUFtQixtQkFBTyxDQUFDLDBEQUFZO0FBQ3ZDLG1CQUFtQixtQkFBTyxDQUFDLHlDQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtGQUErRixrQkFBa0IsRUFBRSxvQkFBb0IsZ0RBQWdELEVBQUU7QUFDekwscUJBQXFCO0FBQ3JCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTs7Ozs7Ozs7Ozs7O0FDL0RhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQixrQkFBa0IsbUJBQW1COzs7Ozs7O1VDSHJDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUN0QkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hc3NpZ24gPSAodGhpcyAmJiB0aGlzLl9fYXNzaWduKSB8fCBmdW5jdGlvbiAoKSB7XG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgZm9yICh2YXIgcywgaSA9IDEsIG4gPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKVxuICAgICAgICAgICAgICAgIHRbcF0gPSBzW3BdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0O1xuICAgIH07XG4gICAgcmV0dXJuIF9fYXNzaWduLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuQXdlc29tZVFSID0gdm9pZCAwO1xudmFyIGNhbnZhc18xID0gcmVxdWlyZShcImNhbnZhc1wiKTtcbnZhciBnaWZ1Y3RfanNfMSA9IHJlcXVpcmUoXCIuL2dpZnVjdC1qc1wiKTtcbnZhciBxcmNvZGVfMSA9IHJlcXVpcmUoXCIuL3FyY29kZVwiKTtcbnZhciBHSUZFbmNvZGVyXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vZ2lmLmpzL0dJRkVuY29kZXJcIikpO1xudmFyIGRlZmF1bHRTY2FsZSA9IDAuNDtcbnZhciBBd2Vzb21lUVIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQXdlc29tZVFSKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIF9vcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG4gICAgICAgIE9iamVjdC5rZXlzKEF3ZXNvbWVRUi5kZWZhdWx0T3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgaWYgKCEoayBpbiBfb3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoX29wdGlvbnMsIGssIHsgdmFsdWU6IEF3ZXNvbWVRUi5kZWZhdWx0T3B0aW9uc1trXSwgZW51bWVyYWJsZTogdHJ1ZSwgd3JpdGFibGU6IHRydWUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIV9vcHRpb25zLmNvbXBvbmVudHMpIHtcbiAgICAgICAgICAgIF9vcHRpb25zLmNvbXBvbmVudHMgPSBBd2Vzb21lUVIuZGVmYXVsdENvbXBvbmVudE9wdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIF9vcHRpb25zLmNvbXBvbmVudHMgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIE9iamVjdC5rZXlzKEF3ZXNvbWVRUi5kZWZhdWx0Q29tcG9uZW50T3B0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgICAgIGlmICghKGsgaW4gX29wdGlvbnMuY29tcG9uZW50cykpIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9vcHRpb25zLmNvbXBvbmVudHMsIGssIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBBd2Vzb21lUVIuZGVmYXVsdENvbXBvbmVudE9wdGlvbnNba10sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KF9vcHRpb25zLmNvbXBvbmVudHMsIGssIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBfX2Fzc2lnbihfX2Fzc2lnbih7fSwgQXdlc29tZVFSLmRlZmF1bHRDb21wb25lbnRPcHRpb25zW2tdKSwgX29wdGlvbnMuY29tcG9uZW50c1trXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChfb3B0aW9ucy5kb3RTY2FsZSAhPT0gbnVsbCAmJiBfb3B0aW9ucy5kb3RTY2FsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoX29wdGlvbnMuZG90U2NhbGUgPD0gMCB8fCBfb3B0aW9ucy5kb3RTY2FsZSA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJkb3RTY2FsZSBzaG91bGQgYmUgaW4gcmFuZ2UgKDAsIDFdLlwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9vcHRpb25zLmNvbXBvbmVudHMuZGF0YS5zY2FsZSA9IF9vcHRpb25zLmRvdFNjYWxlO1xuICAgICAgICAgICAgX29wdGlvbnMuY29tcG9uZW50cy50aW1pbmcuc2NhbGUgPSBfb3B0aW9ucy5kb3RTY2FsZTtcbiAgICAgICAgICAgIF9vcHRpb25zLmNvbXBvbmVudHMuYWxpZ25tZW50LnNjYWxlID0gX29wdGlvbnMuZG90U2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5vcHRpb25zID0gX29wdGlvbnM7XG4gICAgICAgIHRoaXMuY2FudmFzID0gY2FudmFzXzEuY3JlYXRlQ2FudmFzKG9wdGlvbnMuc2l6ZSwgb3B0aW9ucy5zaXplKTtcbiAgICAgICAgdGhpcy5jYW52YXNDb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLnFyQ29kZSA9IG5ldyBxcmNvZGVfMS5RUkNvZGVNb2RlbCgtMSwgdGhpcy5vcHRpb25zLmNvcnJlY3RMZXZlbCk7XG4gICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHRoaXMub3B0aW9ucy5tYXNrUGF0dGVybikpIHtcbiAgICAgICAgICAgIHRoaXMucXJDb2RlLm1hc2tQYXR0ZXJuID0gdGhpcy5vcHRpb25zLm1hc2tQYXR0ZXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHRoaXMub3B0aW9ucy52ZXJzaW9uKSkge1xuICAgICAgICAgICAgdGhpcy5xckNvZGUudHlwZU51bWJlciA9IHRoaXMub3B0aW9ucy52ZXJzaW9uO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucXJDb2RlLmFkZERhdGEodGhpcy5vcHRpb25zLnRleHQpO1xuICAgICAgICB0aGlzLnFyQ29kZS5tYWtlKCk7XG4gICAgfVxuICAgIEF3ZXNvbWVRUi5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7IHJldHVybiBfdGhpcy5fZHJhdygpLnRoZW4ocmVzb2x2ZSk7IH0pO1xuICAgIH07XG4gICAgQXdlc29tZVFSLnByb3RvdHlwZS5fY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2FudmFzQ29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgfTtcbiAgICBBd2Vzb21lUVIuX3ByZXBhcmVSb3VuZGVkQ29ybmVyQ2xpcCA9IGZ1bmN0aW9uIChjYW52YXNDb250ZXh0LCB4LCB5LCB3LCBoLCByKSB7XG4gICAgICAgIGNhbnZhc0NvbnRleHQuYmVnaW5QYXRoKCk7XG4gICAgICAgIGNhbnZhc0NvbnRleHQubW92ZVRvKHgsIHkpO1xuICAgICAgICBjYW52YXNDb250ZXh0LmFyY1RvKHggKyB3LCB5LCB4ICsgdywgeSArIGgsIHIpO1xuICAgICAgICBjYW52YXNDb250ZXh0LmFyY1RvKHggKyB3LCB5ICsgaCwgeCwgeSArIGgsIHIpO1xuICAgICAgICBjYW52YXNDb250ZXh0LmFyY1RvKHgsIHkgKyBoLCB4LCB5LCByKTtcbiAgICAgICAgY2FudmFzQ29udGV4dC5hcmNUbyh4LCB5LCB4ICsgdywgeSwgcik7XG4gICAgICAgIGNhbnZhc0NvbnRleHQuY2xvc2VQYXRoKCk7XG4gICAgfTtcbiAgICBBd2Vzb21lUVIuX2dldEF2ZXJhZ2VSR0IgPSBmdW5jdGlvbiAoaW1hZ2UpIHtcbiAgICAgICAgdmFyIGJsb2NrU2l6ZSA9IDU7XG4gICAgICAgIHZhciBkZWZhdWx0UkdCID0ge1xuICAgICAgICAgICAgcjogMCxcbiAgICAgICAgICAgIGc6IDAsXG4gICAgICAgICAgICBiOiAwLFxuICAgICAgICB9O1xuICAgICAgICB2YXIgd2lkdGgsIGhlaWdodDtcbiAgICAgICAgdmFyIGkgPSAtNDtcbiAgICAgICAgdmFyIHJnYiA9IHtcbiAgICAgICAgICAgIHI6IDAsXG4gICAgICAgICAgICBnOiAwLFxuICAgICAgICAgICAgYjogMCxcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgaGVpZ2h0ID0gaW1hZ2UubmF0dXJhbEhlaWdodCB8fCBpbWFnZS5oZWlnaHQ7XG4gICAgICAgIHdpZHRoID0gaW1hZ2UubmF0dXJhbFdpZHRoIHx8IGltYWdlLndpZHRoO1xuICAgICAgICB2YXIgY2FudmFzID0gY2FudmFzXzEuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIGlmICghY29udGV4dCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRSR0I7XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xuICAgICAgICB2YXIgZGF0YTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGRhdGEgPSBjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRSR0I7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKChpICs9IGJsb2NrU2l6ZSAqIDQpIDwgZGF0YS5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGRhdGEuZGF0YVtpXSA+IDIwMCB8fCBkYXRhLmRhdGFbaSArIDFdID4gMjAwIHx8IGRhdGEuZGF0YVtpICsgMl0gPiAyMDApXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICArK2NvdW50O1xuICAgICAgICAgICAgcmdiLnIgKz0gZGF0YS5kYXRhW2ldO1xuICAgICAgICAgICAgcmdiLmcgKz0gZGF0YS5kYXRhW2kgKyAxXTtcbiAgICAgICAgICAgIHJnYi5iICs9IGRhdGEuZGF0YVtpICsgMl07XG4gICAgICAgIH1cbiAgICAgICAgcmdiLnIgPSB+fihyZ2IuciAvIGNvdW50KTtcbiAgICAgICAgcmdiLmcgPSB+fihyZ2IuZyAvIGNvdW50KTtcbiAgICAgICAgcmdiLmIgPSB+fihyZ2IuYiAvIGNvdW50KTtcbiAgICAgICAgcmV0dXJuIHJnYjtcbiAgICB9O1xuICAgIEF3ZXNvbWVRUi5fZHJhd0RvdCA9IGZ1bmN0aW9uIChjYW52YXNDb250ZXh0LCBjZW50ZXJYLCBjZW50ZXJZLCBuU2l6ZSwgeHlPZmZzZXQsIGRvdFNjYWxlKSB7XG4gICAgICAgIGlmICh4eU9mZnNldCA9PT0gdm9pZCAwKSB7IHh5T2Zmc2V0ID0gMDsgfVxuICAgICAgICBpZiAoZG90U2NhbGUgPT09IHZvaWQgMCkgeyBkb3RTY2FsZSA9IDE7IH1cbiAgICAgICAgY2FudmFzQ29udGV4dC5maWxsUmVjdCgoY2VudGVyWCArIHh5T2Zmc2V0KSAqIG5TaXplLCAoY2VudGVyWSArIHh5T2Zmc2V0KSAqIG5TaXplLCBkb3RTY2FsZSAqIG5TaXplLCBkb3RTY2FsZSAqIG5TaXplKTtcbiAgICB9O1xuICAgIEF3ZXNvbWVRUi5fZHJhd0FsaWduUHJvdGVjdG9yID0gZnVuY3Rpb24gKGNhbnZhc0NvbnRleHQsIGNlbnRlclgsIGNlbnRlclksIG5TaXplKSB7XG4gICAgICAgIGNhbnZhc0NvbnRleHQuY2xlYXJSZWN0KChjZW50ZXJYIC0gMikgKiBuU2l6ZSwgKGNlbnRlclkgLSAyKSAqIG5TaXplLCA1ICogblNpemUsIDUgKiBuU2l6ZSk7XG4gICAgICAgIGNhbnZhc0NvbnRleHQuZmlsbFJlY3QoKGNlbnRlclggLSAyKSAqIG5TaXplLCAoY2VudGVyWSAtIDIpICogblNpemUsIDUgKiBuU2l6ZSwgNSAqIG5TaXplKTtcbiAgICB9O1xuICAgIEF3ZXNvbWVRUi5fZHJhd0FsaWduID0gZnVuY3Rpb24gKGNhbnZhc0NvbnRleHQsIGNlbnRlclgsIGNlbnRlclksIG5TaXplLCB4eU9mZnNldCwgZG90U2NhbGUsIGNvbG9yRGFyaywgaGFzUHJvdGVjdG9yKSB7XG4gICAgICAgIGlmICh4eU9mZnNldCA9PT0gdm9pZCAwKSB7IHh5T2Zmc2V0ID0gMDsgfVxuICAgICAgICBpZiAoZG90U2NhbGUgPT09IHZvaWQgMCkgeyBkb3RTY2FsZSA9IDE7IH1cbiAgICAgICAgdmFyIG9sZEZpbGxTdHlsZSA9IGNhbnZhc0NvbnRleHQuZmlsbFN0eWxlO1xuICAgICAgICBjYW52YXNDb250ZXh0LmZpbGxTdHlsZSA9IGNvbG9yRGFyaztcbiAgICAgICAgbmV3IEFycmF5KDQpLmZpbGwoMCkubWFwKGZ1bmN0aW9uIChfLCBpKSB7XG4gICAgICAgICAgICBBd2Vzb21lUVIuX2RyYXdEb3QoY2FudmFzQ29udGV4dCwgY2VudGVyWCAtIDIgKyBpLCBjZW50ZXJZIC0gMiwgblNpemUsIHh5T2Zmc2V0LCBkb3RTY2FsZSk7XG4gICAgICAgICAgICBBd2Vzb21lUVIuX2RyYXdEb3QoY2FudmFzQ29udGV4dCwgY2VudGVyWCArIDIsIGNlbnRlclkgLSAyICsgaSwgblNpemUsIHh5T2Zmc2V0LCBkb3RTY2FsZSk7XG4gICAgICAgICAgICBBd2Vzb21lUVIuX2RyYXdEb3QoY2FudmFzQ29udGV4dCwgY2VudGVyWCArIDIgLSBpLCBjZW50ZXJZICsgMiwgblNpemUsIHh5T2Zmc2V0LCBkb3RTY2FsZSk7XG4gICAgICAgICAgICBBd2Vzb21lUVIuX2RyYXdEb3QoY2FudmFzQ29udGV4dCwgY2VudGVyWCAtIDIsIGNlbnRlclkgKyAyIC0gaSwgblNpemUsIHh5T2Zmc2V0LCBkb3RTY2FsZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBBd2Vzb21lUVIuX2RyYXdEb3QoY2FudmFzQ29udGV4dCwgY2VudGVyWCwgY2VudGVyWSwgblNpemUsIHh5T2Zmc2V0LCBkb3RTY2FsZSk7XG4gICAgICAgIGlmICghaGFzUHJvdGVjdG9yKSB7XG4gICAgICAgICAgICBjYW52YXNDb250ZXh0LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpXCI7XG4gICAgICAgICAgICBuZXcgQXJyYXkoMikuZmlsbCgwKS5tYXAoZnVuY3Rpb24gKF8sIGkpIHtcbiAgICAgICAgICAgICAgICBBd2Vzb21lUVIuX2RyYXdEb3QoY2FudmFzQ29udGV4dCwgY2VudGVyWCAtIDEgKyBpLCBjZW50ZXJZIC0gMSwgblNpemUsIHh5T2Zmc2V0LCBkb3RTY2FsZSk7XG4gICAgICAgICAgICAgICAgQXdlc29tZVFSLl9kcmF3RG90KGNhbnZhc0NvbnRleHQsIGNlbnRlclggKyAxLCBjZW50ZXJZIC0gMSArIGksIG5TaXplLCB4eU9mZnNldCwgZG90U2NhbGUpO1xuICAgICAgICAgICAgICAgIEF3ZXNvbWVRUi5fZHJhd0RvdChjYW52YXNDb250ZXh0LCBjZW50ZXJYICsgMSAtIGksIGNlbnRlclkgKyAxLCBuU2l6ZSwgeHlPZmZzZXQsIGRvdFNjYWxlKTtcbiAgICAgICAgICAgICAgICBBd2Vzb21lUVIuX2RyYXdEb3QoY2FudmFzQ29udGV4dCwgY2VudGVyWCAtIDEsIGNlbnRlclkgKyAxIC0gaSwgblNpemUsIHh5T2Zmc2V0LCBkb3RTY2FsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBjYW52YXNDb250ZXh0LmZpbGxTdHlsZSA9IG9sZEZpbGxTdHlsZTtcbiAgICB9O1xuICAgIEF3ZXNvbWVRUi5wcm90b3R5cGUuX2RyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfYSwgX2IsIF9jLCBfZCwgX2UsIF9mLCBfZywgX2gsIF9qLCBfaywgX2wsIF9tLCBfbywgX3AsIF9xLCBfciwgX3MsIF90LCBfdTtcbiAgICAgICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIG5Db3VudCwgcmF3U2l6ZSwgcmF3TWFyZ2luLCBtYXJnaW4sIHJhd1ZpZXdwb3J0U2l6ZSwgd2hpdGVNYXJnaW4sIGJhY2tncm91bmREaW1taW5nLCBuU2l6ZSwgdmlld3BvcnRTaXplLCBzaXplLCBtYWluQ2FudmFzLCBtYWluQ2FudmFzQ29udGV4dCwgYmFja2dyb3VuZENhbnZhcywgYmFja2dyb3VuZENhbnZhc0NvbnRleHQsIHBhcnNlZEdJRkJhY2tncm91bmQsIGdpZkZyYW1lcywgZ2lmLCByLCBnLCBiLCBjb3VudCwgaSwgYywgYmFja2dyb3VuZEltYWdlLCBhdmdSR0IsIGFsaWdubWVudFBhdHRlcm5DZW50ZXJzLCBkYXRhU2NhbGUsIGRhdGFYeU9mZnNldCwgcm93LCBjb2wsIGJJc0RhcmssIGlzQmxrUG9zQ3RyLCBpc1RpbWluZywgaXNQcm90ZWN0ZWQsIGksIG5MZWZ0LCBuVG9wLCBpbkFnblJhbmdlLCBjb3JuZXJBbGlnbm1lbnRDZW50ZXIsIHByb3RlY3RvclN0eWxlLCBpLCBqLCBhZ25YLCBhZ25ZLCB0aW1pbmdTY2FsZSwgdGltaW5nWHlPZmZzZXQsIGksIGNvcm5lckFsaWdubWVudFNjYWxlLCBjb3JuZXJBbGlnbm1lbnRYeU9mZnNldCwgYWxpZ25tZW50U2NhbGUsIGFsaWdubWVudFh5T2Zmc2V0LCBpLCBqLCBhZ25YLCBhZ25ZLCBsb2dvSW1hZ2UsIGxvZ29TY2FsZSwgbG9nb01hcmdpbiwgbG9nb0Nvcm5lclJhZGl1cywgbG9nb1NpemUsIHgsIHksIG9sZEdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiwgZ2lmT3V0cHV0XzEsIGJhY2tncm91bmRDYW52YXNfMSwgYmFja2dyb3VuZENhbnZhc0NvbnRleHRfMSwgcGF0Y2hDYW52YXNfMSwgcGF0Y2hDYW52YXNDb250ZXh0XzEsIHBhdGNoRGF0YV8xLCB1OGFycmF5LCBiaW5hcnksIG91dENhbnZhcywgb3V0Q2FudmFzQ29udGV4dDtcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX3YpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKF92LmxhYmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIG5Db3VudCA9IChfYSA9IHRoaXMucXJDb2RlKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubW9kdWxlQ291bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICByYXdTaXplID0gdGhpcy5vcHRpb25zLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICByYXdNYXJnaW4gPSB0aGlzLm9wdGlvbnMubWFyZ2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJhd01hcmdpbiA8IDAgfHwgcmF3TWFyZ2luICogMiA+PSByYXdTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TWFyZ2luID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbiA9IE1hdGguY2VpbChyYXdNYXJnaW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmF3Vmlld3BvcnRTaXplID0gcmF3U2l6ZSAtIDIgKiByYXdNYXJnaW47XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGl0ZU1hcmdpbiA9IHRoaXMub3B0aW9ucy53aGl0ZU1hcmdpbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmREaW1taW5nID0gdGhpcy5vcHRpb25zLmJhY2tncm91bmREaW1taW5nO1xuICAgICAgICAgICAgICAgICAgICAgICAgblNpemUgPSBNYXRoLmNlaWwocmF3Vmlld3BvcnRTaXplIC8gbkNvdW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdwb3J0U2l6ZSA9IG5TaXplICogbkNvdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSA9IHZpZXdwb3J0U2l6ZSArIDIgKiBtYXJnaW47XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzID0gY2FudmFzXzEuY3JlYXRlQ2FudmFzKHNpemUsIHNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQgPSBtYWluQ2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBUcmFuc2xhdGUgdG8gbWFrZSB0aGUgdG9wIGFuZCBsZWZ0IG1hcmdpbnMgb2ZmIHRoZSB2aWV3cG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQudHJhbnNsYXRlKG1hcmdpbiwgbWFyZ2luKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDYW52YXMgPSBjYW52YXNfMS5jcmVhdGVDYW52YXMoc2l6ZSwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2FudmFzQ29udGV4dCA9IGJhY2tncm91bmRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyc2VkR0lGQmFja2dyb3VuZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBnaWZGcmFtZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghISF0aGlzLm9wdGlvbnMuZ2lmQmFja2dyb3VuZCkgcmV0dXJuIFszIC8qYnJlYWsqLywgMV07XG4gICAgICAgICAgICAgICAgICAgICAgICBnaWYgPSBnaWZ1Y3RfanNfMS5wYXJzZUdJRih0aGlzLm9wdGlvbnMuZ2lmQmFja2dyb3VuZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJzZWRHSUZCYWNrZ3JvdW5kID0gZ2lmO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2lmRnJhbWVzID0gZ2lmdWN0X2pzXzEuZGVjb21wcmVzc0ZyYW1lcyhnaWYsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3B0aW9ucy5hdXRvQ29sb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByID0gMCwgZyA9IDAsIGIgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZ2lmRnJhbWVzWzBdLmNvbG9yVGFibGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYyA9IGdpZkZyYW1lc1swXS5jb2xvclRhYmxlW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY1swXSA+IDIwMCB8fCBjWzFdID4gMjAwIHx8IGNbMl0gPiAyMDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNbMF0gPT09IDAgJiYgY1sxXSA9PT0gMCAmJiBjWzJdID09PSAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIgKz0gY1swXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZyArPSBjWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiICs9IGNbMl07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIgPSB+fihyIC8gY291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGcgPSB+fihnIC8gY291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGIgPSB+fihiIC8gY291bnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jb2xvckRhcmsgPSBcInJnYihcIiArIHIgKyBcIixcIiArIGcgKyBcIixcIiArIGIgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMyAvKmJyZWFrKi8sIDRdO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISEhdGhpcy5vcHRpb25zLmJhY2tncm91bmRJbWFnZSkgcmV0dXJuIFszIC8qYnJlYWsqLywgM107XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjYW52YXNfMS5sb2FkSW1hZ2UodGhpcy5vcHRpb25zLmJhY2tncm91bmRJbWFnZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kSW1hZ2UgPSBfdi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5vcHRpb25zLmF1dG9Db2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF2Z1JHQiA9IEF3ZXNvbWVRUi5fZ2V0QXZlcmFnZVJHQihiYWNrZ3JvdW5kSW1hZ2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3B0aW9ucy5jb2xvckRhcmsgPSBcInJnYihcIiArIGF2Z1JHQi5yICsgXCIsXCIgKyBhdmdSR0IuZyArIFwiLFwiICsgYXZnUkdCLmIgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDYW52YXNDb250ZXh0LmRyYXdJbWFnZShiYWNrZ3JvdW5kSW1hZ2UsIDAsIDAsIGJhY2tncm91bmRJbWFnZS53aWR0aCwgYmFja2dyb3VuZEltYWdlLmhlaWdodCwgMCwgMCwgc2l6ZSwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2FudmFzQ29udGV4dC5yZWN0KDAsIDAsIHNpemUsIHNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENhbnZhc0NvbnRleHQuZmlsbFN0eWxlID0gYmFja2dyb3VuZERpbW1pbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2FudmFzQ29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzMgLypicmVhayovLCA0XTtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENhbnZhc0NvbnRleHQucmVjdCgwLCAwLCBzaXplLCBzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDYW52YXNDb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMub3B0aW9ucy5jb2xvckxpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENhbnZhc0NvbnRleHQuZmlsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX3YubGFiZWwgPSA0O1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVycyA9IHFyY29kZV8xLlFSVXRpbC5nZXRQYXR0ZXJuUG9zaXRpb24odGhpcy5xckNvZGUudHlwZU51bWJlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhU2NhbGUgPSAoKF9jID0gKF9iID0gdGhpcy5vcHRpb25zLmNvbXBvbmVudHMpID09PSBudWxsIHx8IF9iID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYi5kYXRhKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Muc2NhbGUpIHx8IGRlZmF1bHRTY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFYeU9mZnNldCA9ICgxIC0gZGF0YVNjYWxlKSAqIDAuNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAocm93ID0gMDsgcm93IDwgbkNvdW50OyByb3crKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoY29sID0gMDsgY29sIDwgbkNvdW50OyBjb2wrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiSXNEYXJrID0gdGhpcy5xckNvZGUuaXNEYXJrKHJvdywgY29sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNCbGtQb3NDdHIgPSAoY29sIDwgOCAmJiAocm93IDwgOCB8fCByb3cgPj0gbkNvdW50IC0gOCkpIHx8IChjb2wgPj0gbkNvdW50IC0gOCAmJiByb3cgPCA4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXNUaW1pbmcgPSAocm93ID09IDYgJiYgY29sID49IDggJiYgY29sIDw9IG5Db3VudCAtIDgpIHx8IChjb2wgPT0gNiAmJiByb3cgPj0gOCAmJiByb3cgPD0gbkNvdW50IC0gOCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJvdGVjdGVkID0gaXNCbGtQb3NDdHIgfHwgaXNUaW1pbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDE7IGkgPCBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVycy5sZW5ndGggLSAxOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzUHJvdGVjdGVkID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpc1Byb3RlY3RlZCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAocm93ID49IGFsaWdubWVudFBhdHRlcm5DZW50ZXJzW2ldIC0gMiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93IDw9IGFsaWdubWVudFBhdHRlcm5DZW50ZXJzW2ldICsgMiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sID49IGFsaWdubWVudFBhdHRlcm5DZW50ZXJzW2ldIC0gMiAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sIDw9IGFsaWdubWVudFBhdHRlcm5DZW50ZXJzW2ldICsgMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbkxlZnQgPSBjb2wgKiBuU2l6ZSArIChpc1Byb3RlY3RlZCA/IDAgOiBkYXRhWHlPZmZzZXQgKiBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5Ub3AgPSByb3cgKiBuU2l6ZSArIChpc1Byb3RlY3RlZCA/IDAgOiBkYXRhWHlPZmZzZXQgKiBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LnN0cm9rZVN0eWxlID0gYklzRGFyayA/IHRoaXMub3B0aW9ucy5jb2xvckRhcmsgOiB0aGlzLm9wdGlvbnMuY29sb3JMaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQubGluZVdpZHRoID0gMC41O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsU3R5bGUgPSBiSXNEYXJrID8gdGhpcy5vcHRpb25zLmNvbG9yRGFyayA6IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbGlnbm1lbnRQYXR0ZXJuQ2VudGVycy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaXNQcm90ZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdChuTGVmdCwgblRvcCwgKGlzUHJvdGVjdGVkID8gKGlzQmxrUG9zQ3RyID8gMSA6IDEpIDogZGF0YVNjYWxlKSAqIG5TaXplLCAoaXNQcm90ZWN0ZWQgPyAoaXNCbGtQb3NDdHIgPyAxIDogMSkgOiBkYXRhU2NhbGUpICogblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5BZ25SYW5nZSA9IGNvbCA8IG5Db3VudCAtIDQgJiYgY29sID49IG5Db3VudCAtIDQgLSA1ICYmIHJvdyA8IG5Db3VudCAtIDQgJiYgcm93ID49IG5Db3VudCAtIDQgLSA1O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1Byb3RlY3RlZCAmJiAhaW5BZ25SYW5nZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIGFsaWduIHBhdHRlcm4gbGlzdCBpcyBlbXB0eSwgdGhlbiBpdCBtZWFucyB0aGF0IHdlIGRvbid0IG5lZWQgdG8gbGVhdmUgcm9vbSBmb3IgdGhlIGFsaWduIHBhdHRlcm5zXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QobkxlZnQsIG5Ub3AsIChpc1Byb3RlY3RlZCA/IChpc0Jsa1Bvc0N0ciA/IDEgOiAxKSA6IGRhdGFTY2FsZSkgKiBuU2l6ZSwgKGlzUHJvdGVjdGVkID8gKGlzQmxrUG9zQ3RyID8gMSA6IDEpIDogZGF0YVNjYWxlKSAqIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvcm5lckFsaWdubWVudENlbnRlciA9IGFsaWdubWVudFBhdHRlcm5DZW50ZXJzW2FsaWdubWVudFBhdHRlcm5DZW50ZXJzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvdGVjdG9yU3R5bGUgPSBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KVwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gLSBGSU5ERVIgUFJPVEVDVE9SU1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFN0eWxlID0gcHJvdGVjdG9yU3R5bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCgwLCAwLCA4ICogblNpemUsIDggKiBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCgwLCAobkNvdW50IC0gOCkgKiBuU2l6ZSwgOCAqIG5TaXplLCA4ICogblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoKG5Db3VudCAtIDgpICogblNpemUsIDAsIDggKiBuU2l6ZSwgOCAqIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC0gVElNSU5HIFBST1RFQ1RPUlNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoX2UgPSAoX2QgPSB0aGlzLm9wdGlvbnMuY29tcG9uZW50cykgPT09IG51bGwgfHwgX2QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9kLnRpbWluZykgPT09IG51bGwgfHwgX2UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9lLnByb3RlY3RvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCg4ICogblNpemUsIDYgKiBuU2l6ZSwgKG5Db3VudCAtIDggLSA4KSAqIG5TaXplLCBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoNiAqIG5TaXplLCA4ICogblNpemUsIG5TaXplLCAobkNvdW50IC0gOCAtIDgpICogblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gLSBDT1JORVIgQUxJR05NRU5UIFBST1RFQ1RPUlNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoX2cgPSAoX2YgPSB0aGlzLm9wdGlvbnMuY29tcG9uZW50cykgPT09IG51bGwgfHwgX2YgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9mLmNvcm5lckFsaWdubWVudCkgPT09IG51bGwgfHwgX2cgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9nLnByb3RlY3RvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBBd2Vzb21lUVIuX2RyYXdBbGlnblByb3RlY3RvcihtYWluQ2FudmFzQ29udGV4dCwgY29ybmVyQWxpZ25tZW50Q2VudGVyLCBjb3JuZXJBbGlnbm1lbnRDZW50ZXIsIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIC0gQUxJR05NRU5UIFBST1RFQ1RPUlNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoX2ogPSAoX2ggPSB0aGlzLm9wdGlvbnMuY29tcG9uZW50cykgPT09IG51bGwgfHwgX2ggPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9oLmFsaWdubWVudCkgPT09IG51bGwgfHwgX2ogPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9qLnByb3RlY3RvcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYWxpZ25tZW50UGF0dGVybkNlbnRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGFsaWdubWVudFBhdHRlcm5DZW50ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ25YID0gYWxpZ25tZW50UGF0dGVybkNlbnRlcnNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZ25ZID0gYWxpZ25tZW50UGF0dGVybkNlbnRlcnNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWduWCA9PT0gNiAmJiAoYWduWSA9PT0gNiB8fCBhZ25ZID09PSBjb3JuZXJBbGlnbm1lbnRDZW50ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhZ25ZID09PSA2ICYmIChhZ25YID09PSA2IHx8IGFnblggPT09IGNvcm5lckFsaWdubWVudENlbnRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFnblggPT09IGNvcm5lckFsaWdubWVudENlbnRlciAmJiBhZ25ZID09PSBjb3JuZXJBbGlnbm1lbnRDZW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEF3ZXNvbWVRUi5fZHJhd0FsaWduUHJvdGVjdG9yKG1haW5DYW52YXNDb250ZXh0LCBhZ25YLCBhZ25ZLCBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyAtIEZJTkRFUlxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5vcHRpb25zLmNvbG9yRGFyaztcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KDAsIDAsIDcgKiBuU2l6ZSwgblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoKG5Db3VudCAtIDcpICogblNpemUsIDAsIDcgKiBuU2l6ZSwgblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoMCwgNiAqIG5TaXplLCA3ICogblNpemUsIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KChuQ291bnQgLSA3KSAqIG5TaXplLCA2ICogblNpemUsIDcgKiBuU2l6ZSwgblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoMCwgKG5Db3VudCAtIDcpICogblNpemUsIDcgKiBuU2l6ZSwgblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoMCwgKG5Db3VudCAtIDcgKyA2KSAqIG5TaXplLCA3ICogblNpemUsIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KDAsIDAsIG5TaXplLCA3ICogblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoNiAqIG5TaXplLCAwLCBuU2l6ZSwgNyAqIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KChuQ291bnQgLSA3KSAqIG5TaXplLCAwLCBuU2l6ZSwgNyAqIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KChuQ291bnQgLSA3ICsgNikgKiBuU2l6ZSwgMCwgblNpemUsIDcgKiBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCgwLCAobkNvdW50IC0gNykgKiBuU2l6ZSwgblNpemUsIDcgKiBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCg2ICogblNpemUsIChuQ291bnQgLSA3KSAqIG5TaXplLCBuU2l6ZSwgNyAqIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KDIgKiBuU2l6ZSwgMiAqIG5TaXplLCAzICogblNpemUsIDMgKiBuU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCgobkNvdW50IC0gNyArIDIpICogblNpemUsIDIgKiBuU2l6ZSwgMyAqIG5TaXplLCAzICogblNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoMiAqIG5TaXplLCAobkNvdW50IC0gNyArIDIpICogblNpemUsIDMgKiBuU2l6ZSwgMyAqIG5TaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWluZ1NjYWxlID0gKChfbCA9IChfayA9IHRoaXMub3B0aW9ucy5jb21wb25lbnRzKSA9PT0gbnVsbCB8fCBfayA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2sudGltaW5nKSA9PT0gbnVsbCB8fCBfbCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2wuc2NhbGUpIHx8IGRlZmF1bHRTY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWluZ1h5T2Zmc2V0ID0gKDEgLSB0aW1pbmdTY2FsZSkgKiAwLjU7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbkNvdW50IC0gODsgaSArPSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXdlc29tZVFSLl9kcmF3RG90KG1haW5DYW52YXNDb250ZXh0LCA4ICsgaSwgNiwgblNpemUsIHRpbWluZ1h5T2Zmc2V0LCB0aW1pbmdTY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQXdlc29tZVFSLl9kcmF3RG90KG1haW5DYW52YXNDb250ZXh0LCA2LCA4ICsgaSwgblNpemUsIHRpbWluZ1h5T2Zmc2V0LCB0aW1pbmdTY2FsZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJBbGlnbm1lbnRTY2FsZSA9ICgoX28gPSAoX20gPSB0aGlzLm9wdGlvbnMuY29tcG9uZW50cykgPT09IG51bGwgfHwgX20gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9tLmNvcm5lckFsaWdubWVudCkgPT09IG51bGwgfHwgX28gPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9vLnNjYWxlKSB8fCBkZWZhdWx0U2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3JuZXJBbGlnbm1lbnRYeU9mZnNldCA9ICgxIC0gY29ybmVyQWxpZ25tZW50U2NhbGUpICogMC41O1xuICAgICAgICAgICAgICAgICAgICAgICAgQXdlc29tZVFSLl9kcmF3QWxpZ24obWFpbkNhbnZhc0NvbnRleHQsIGNvcm5lckFsaWdubWVudENlbnRlciwgY29ybmVyQWxpZ25tZW50Q2VudGVyLCBuU2l6ZSwgY29ybmVyQWxpZ25tZW50WHlPZmZzZXQsIGNvcm5lckFsaWdubWVudFNjYWxlLCB0aGlzLm9wdGlvbnMuY29sb3JEYXJrLCAoKF9xID0gKF9wID0gdGhpcy5vcHRpb25zLmNvbXBvbmVudHMpID09PSBudWxsIHx8IF9wID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcC5jb3JuZXJBbGlnbm1lbnQpID09PSBudWxsIHx8IF9xID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfcS5wcm90ZWN0b3JzKSB8fCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnRTY2FsZSA9ICgoX3MgPSAoX3IgPSB0aGlzLm9wdGlvbnMuY29tcG9uZW50cykgPT09IG51bGwgfHwgX3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9yLmFsaWdubWVudCkgPT09IG51bGwgfHwgX3MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9zLnNjYWxlKSB8fCBkZWZhdWx0U2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGlnbm1lbnRYeU9mZnNldCA9ICgxIC0gYWxpZ25tZW50U2NhbGUpICogMC41O1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFsaWdubWVudFBhdHRlcm5DZW50ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGFsaWdubWVudFBhdHRlcm5DZW50ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFnblggPSBhbGlnbm1lbnRQYXR0ZXJuQ2VudGVyc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWduWSA9IGFsaWdubWVudFBhdHRlcm5DZW50ZXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYWduWCA9PT0gNiAmJiAoYWduWSA9PT0gNiB8fCBhZ25ZID09PSBjb3JuZXJBbGlnbm1lbnRDZW50ZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhZ25ZID09PSA2ICYmIChhZ25YID09PSA2IHx8IGFnblggPT09IGNvcm5lckFsaWdubWVudENlbnRlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFnblggPT09IGNvcm5lckFsaWdubWVudENlbnRlciAmJiBhZ25ZID09PSBjb3JuZXJBbGlnbm1lbnRDZW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQXdlc29tZVFSLl9kcmF3QWxpZ24obWFpbkNhbnZhc0NvbnRleHQsIGFnblgsIGFnblksIG5TaXplLCBhbGlnbm1lbnRYeU9mZnNldCwgYWxpZ25tZW50U2NhbGUsIHRoaXMub3B0aW9ucy5jb2xvckRhcmssICgoX3UgPSAoX3QgPSB0aGlzLm9wdGlvbnMuY29tcG9uZW50cykgPT09IG51bGwgfHwgX3QgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF90LmFsaWdubWVudCkgPT09IG51bGwgfHwgX3UgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF91LnByb3RlY3RvcnMpIHx8IGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEZpbGwgdGhlIG1hcmdpblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHdoaXRlTWFyZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFN0eWxlID0gXCIjRkZGRkZGXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3QoLW1hcmdpbiwgLW1hcmdpbiwgc2l6ZSwgbWFyZ2luKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5maWxsUmVjdCgtbWFyZ2luLCB2aWV3cG9ydFNpemUsIHNpemUsIG1hcmdpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFJlY3Qodmlld3BvcnRTaXplLCAtbWFyZ2luLCBtYXJnaW4sIHNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmZpbGxSZWN0KC1tYXJnaW4sIC1tYXJnaW4sIG1hcmdpbiwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoISEhdGhpcy5vcHRpb25zLmxvZ29JbWFnZSkgcmV0dXJuIFszIC8qYnJlYWsqLywgNl07XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzQgLyp5aWVsZCovLCBjYW52YXNfMS5sb2FkSW1hZ2UodGhpcy5vcHRpb25zLmxvZ29JbWFnZSldO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dvSW1hZ2UgPSBfdi5zZW50KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dvU2NhbGUgPSB0aGlzLm9wdGlvbnMubG9nb1NjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nb01hcmdpbiA9IHRoaXMub3B0aW9ucy5sb2dvTWFyZ2luO1xuICAgICAgICAgICAgICAgICAgICAgICAgbG9nb0Nvcm5lclJhZGl1cyA9IHRoaXMub3B0aW9ucy5sb2dvQ29ybmVyUmFkaXVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxvZ29TY2FsZSA8PSAwIHx8IGxvZ29TY2FsZSA+PSAxLjApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dvU2NhbGUgPSAwLjI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobG9nb01hcmdpbiA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2dvTWFyZ2luID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChsb2dvQ29ybmVyUmFkaXVzIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvZ29Db3JuZXJSYWRpdXMgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nb1NpemUgPSB2aWV3cG9ydFNpemUgKiBsb2dvU2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB4ID0gMC41ICogKHNpemUgLSBsb2dvU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB5ID0geDtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc3RvcmUgdGhlIGNhbnZhc1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQWZ0ZXIgcmVzdG9yaW5nLCB0aGUgdG9wIGFuZCBsZWZ0IG1hcmdpbnMgc2hvdWxkIGJlIHRha2VuIGludG8gYWNjb3VudFxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2xlYW4gdGhlIGFyZWEgdGhhdCB0aGUgbG9nbyBjb3ZlcnMgKGluY2x1ZGluZyBtYXJnaW5zKVxuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbFN0eWxlID0gXCIjRkZGRkZGXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBBd2Vzb21lUVIuX3ByZXBhcmVSb3VuZGVkQ29ybmVyQ2xpcChtYWluQ2FudmFzQ29udGV4dCwgeCAtIGxvZ29NYXJnaW4sIHkgLSBsb2dvTWFyZ2luLCBsb2dvU2l6ZSArIDIgKiBsb2dvTWFyZ2luLCBsb2dvU2l6ZSArIDIgKiBsb2dvTWFyZ2luLCBsb2dvQ29ybmVyUmFkaXVzICsgbG9nb01hcmdpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5jbGlwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbGRHbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBtYWluQ2FudmFzQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBcImRlc3RpbmF0aW9uLW91dFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZmlsbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQuZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gb2xkR2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWFpbkNhbnZhc0NvbnRleHQucmVzdG9yZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRHJhdyBsb2dvIGltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBBd2Vzb21lUVIuX3ByZXBhcmVSb3VuZGVkQ29ybmVyQ2xpcChtYWluQ2FudmFzQ29udGV4dCwgeCwgeSwgbG9nb1NpemUsIGxvZ29TaXplLCBsb2dvQ29ybmVyUmFkaXVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmNsaXAoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmRyYXdJbWFnZShsb2dvSW1hZ2UsIHgsIHksIGxvZ29TaXplLCBsb2dvU2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYWluQ2FudmFzQ29udGV4dC5yZXN0b3JlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZS10cmFuc2xhdGUgdGhlIGNhbnZhcyB0byB0cmFuc2xhdGUgdGhlIHRvcCBhbmQgbGVmdCBtYXJnaW5zIGludG8gaW52aXNpYmxlIGFyZWFcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LnNhdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LnRyYW5zbGF0ZShtYXJnaW4sIG1hcmdpbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfdi5sYWJlbCA9IDY7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghIXBhcnNlZEdJRkJhY2tncm91bmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnaWZGcmFtZXMuZm9yRWFjaChmdW5jdGlvbiAoZnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFnaWZPdXRwdXRfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2lmT3V0cHV0XzEgPSBuZXcgR0lGRW5jb2Rlcl8xLmRlZmF1bHQocmF3U2l6ZSwgcmF3U2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnaWZPdXRwdXRfMS5zZXREZWxheShmcmFtZS5kZWxheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnaWZPdXRwdXRfMS5zZXRSZXBlYXQoMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIF9hID0gZnJhbWUuZGltcywgd2lkdGggPSBfYS53aWR0aCwgaGVpZ2h0ID0gX2EuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWJhY2tncm91bmRDYW52YXNfMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENhbnZhc18xID0gY2FudmFzXzEuY3JlYXRlQ2FudmFzKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENhbnZhc0NvbnRleHRfMSA9IGJhY2tncm91bmRDYW52YXNfMS5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2FudmFzQ29udGV4dF8xLnJlY3QoMCwgMCwgYmFja2dyb3VuZENhbnZhc18xLndpZHRoLCBiYWNrZ3JvdW5kQ2FudmFzXzEuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDYW52YXNDb250ZXh0XzEuZmlsbFN0eWxlID0gXCIjZmZmZmZmXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2FudmFzQ29udGV4dF8xLmZpbGwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhdGNoQ2FudmFzXzEgfHwgIXBhdGNoRGF0YV8xIHx8IHdpZHRoICE9PSBwYXRjaENhbnZhc18xLndpZHRoIHx8IGhlaWdodCAhPT0gcGF0Y2hDYW52YXNfMS5oZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGNoQ2FudmFzXzEgPSBjYW52YXNfMS5jcmVhdGVDYW52YXMod2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRjaENhbnZhc0NvbnRleHRfMSA9IHBhdGNoQ2FudmFzXzEuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hEYXRhXzEgPSBwYXRjaENhbnZhc0NvbnRleHRfMS5jcmVhdGVJbWFnZURhdGEod2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0Y2hEYXRhXzEuZGF0YS5zZXQoZnJhbWUucGF0Y2gpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRjaENhbnZhc0NvbnRleHRfMS5wdXRJbWFnZURhdGEocGF0Y2hEYXRhXzEsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ2FudmFzQ29udGV4dF8xLmRyYXdJbWFnZShwYXRjaENhbnZhc18xLCBmcmFtZS5kaW1zLmxlZnQsIGZyYW1lLmRpbXMudG9wKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHVuc2NhbGVkQ2FudmFzID0gY2FudmFzXzEuY3JlYXRlQ2FudmFzKHNpemUsIHNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdW5zY2FsZWRDYW52YXNDb250ZXh0ID0gdW5zY2FsZWRDYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnNjYWxlZENhbnZhc0NvbnRleHQuZHJhd0ltYWdlKGJhY2tncm91bmRDYW52YXNfMSwgMCwgMCwgc2l6ZSwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuc2NhbGVkQ2FudmFzQ29udGV4dC5yZWN0KDAsIDAsIHNpemUsIHNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bnNjYWxlZENhbnZhc0NvbnRleHQuZmlsbFN0eWxlID0gYmFja2dyb3VuZERpbW1pbmc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuc2NhbGVkQ2FudmFzQ29udGV4dC5maWxsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuc2NhbGVkQ2FudmFzQ29udGV4dC5kcmF3SW1hZ2UobWFpbkNhbnZhcywgMCwgMCwgc2l6ZSwgc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNjYWxlIHRoZSBmaW5hbCBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3V0Q2FudmFzID0gY2FudmFzXzEuY3JlYXRlQ2FudmFzKHJhd1NpemUsIHJhd1NpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb3V0Q2FudmFzQ29udGV4dCA9IG91dENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG91dENhbnZhc0NvbnRleHQuZHJhd0ltYWdlKHVuc2NhbGVkQ2FudmFzLCAwLCAwLCByYXdTaXplLCByYXdTaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2lmT3V0cHV0XzEuYWRkRnJhbWUob3V0Q2FudmFzQ29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgb3V0Q2FudmFzLndpZHRoLCBvdXRDYW52YXMuaGVpZ2h0KS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWdpZk91dHB1dF8xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vIGZyYW1lcy5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdpZk91dHB1dF8xLmZpbmlzaCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0VsZW1lbnQodGhpcy5jYW52YXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHU4YXJyYXkgPSBnaWZPdXRwdXRfMS5zdHJlYW0oKS50b0ZsYXR0ZW5VaW50OEFycmF5KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpbmFyeSA9IHU4YXJyYXkucmVkdWNlKGZ1bmN0aW9uIChiaW4sIHU4KSB7IHJldHVybiBiaW4gKyBTdHJpbmcuZnJvbUNoYXJDb2RlKHU4KTsgfSwgXCJcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlc29sdmUoXCJkYXRhOmltYWdlL2dpZjtiYXNlNjQsXCIgKyB3aW5kb3cuYnRvYShiaW5hcnkpKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBQcm9taXNlLnJlc29sdmUoQnVmZmVyLmZyb20oZ2lmT3V0cHV0XzEuc3RyZWFtKCkudG9GbGF0dGVuVWludDhBcnJheSgpKSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3dhcCBhbmQgbWVyZ2UgdGhlIGZvcmVncm91bmQgYW5kIHRoZSBiYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENhbnZhc0NvbnRleHQuZHJhd0ltYWdlKG1haW5DYW52YXMsIDAsIDAsIHNpemUsIHNpemUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1haW5DYW52YXNDb250ZXh0LmRyYXdJbWFnZShiYWNrZ3JvdW5kQ2FudmFzLCAtbWFyZ2luLCAtbWFyZ2luLCBzaXplLCBzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdXRDYW52YXMgPSBjYW52YXNfMS5jcmVhdGVDYW52YXMocmF3U2l6ZSwgcmF3U2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0Q2FudmFzQ29udGV4dCA9IG91dENhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3V0Q2FudmFzQ29udGV4dC5kcmF3SW1hZ2UobWFpbkNhbnZhcywgMCwgMCwgcmF3U2l6ZSwgcmF3U2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBvdXRDYW52YXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRWxlbWVudCh0aGlzLmNhbnZhcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsyIC8qcmV0dXJuKi8sIFByb21pc2UucmVzb2x2ZSh0aGlzLmNhbnZhcy50b0RhdGFVUkwoKSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWzIgLypyZXR1cm4qLywgUHJvbWlzZS5yZXNvbHZlKHRoaXMuY2FudmFzLnRvQnVmZmVyKCkpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBBd2Vzb21lUVIuQ29ycmVjdExldmVsID0gcXJjb2RlXzEuUVJFcnJvckNvcnJlY3RMZXZlbDtcbiAgICBBd2Vzb21lUVIuZGVmYXVsdENvbXBvbmVudE9wdGlvbnMgPSB7XG4gICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgIHNjYWxlOiAwLjQsXG4gICAgICAgIH0sXG4gICAgICAgIHRpbWluZzoge1xuICAgICAgICAgICAgc2NhbGU6IDAuNSxcbiAgICAgICAgICAgIHByb3RlY3RvcnM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICBhbGlnbm1lbnQ6IHtcbiAgICAgICAgICAgIHNjYWxlOiAwLjUsXG4gICAgICAgICAgICBwcm90ZWN0b3JzOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgY29ybmVyQWxpZ25tZW50OiB7XG4gICAgICAgICAgICBzY2FsZTogMC41LFxuICAgICAgICAgICAgcHJvdGVjdG9yczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIEF3ZXNvbWVRUi5kZWZhdWx0T3B0aW9ucyA9IHtcbiAgICAgICAgdGV4dDogXCJcIixcbiAgICAgICAgc2l6ZTogNDAwLFxuICAgICAgICBtYXJnaW46IDIwLFxuICAgICAgICBjb2xvckRhcms6IFwiIzAwMDAwMFwiLFxuICAgICAgICBjb2xvckxpZ2h0OiBcIiNmZmZmZmZcIixcbiAgICAgICAgY29ycmVjdExldmVsOiBxcmNvZGVfMS5RUkVycm9yQ29ycmVjdExldmVsLk0sXG4gICAgICAgIGJhY2tncm91bmRJbWFnZTogdW5kZWZpbmVkLFxuICAgICAgICBiYWNrZ3JvdW5kRGltbWluZzogXCJyZ2JhKDAsMCwwLDApXCIsXG4gICAgICAgIGxvZ29JbWFnZTogdW5kZWZpbmVkLFxuICAgICAgICBsb2dvU2NhbGU6IDAuMixcbiAgICAgICAgbG9nb01hcmdpbjogNCxcbiAgICAgICAgbG9nb0Nvcm5lclJhZGl1czogOCxcbiAgICAgICAgd2hpdGVNYXJnaW46IHRydWUsXG4gICAgICAgIGNvbXBvbmVudHM6IEF3ZXNvbWVRUi5kZWZhdWx0Q29tcG9uZW50T3B0aW9ucyxcbiAgICAgICAgYXV0b0NvbG9yOiB0cnVlLFxuICAgIH07XG4gICAgcmV0dXJuIEF3ZXNvbWVRUjtcbn0oKSk7XG5leHBvcnRzLkF3ZXNvbWVRUiA9IEF3ZXNvbWVRUjtcbmZ1bmN0aW9uIGlzRWxlbWVudChvYmopIHtcbiAgICB0cnkge1xuICAgICAgICAvL1VzaW5nIFczIERPTTIgKHdvcmtzIGZvciBGRiwgT3BlcmEgYW5kIENocm9tZSlcbiAgICAgICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICAvL0Jyb3dzZXJzIG5vdCBzdXBwb3J0aW5nIFczIERPTTIgZG9uJ3QgaGF2ZSBIVE1MRWxlbWVudCBhbmRcbiAgICAgICAgLy9hbiBleGNlcHRpb24gaXMgdGhyb3duIGFuZCB3ZSBlbmQgdXAgaGVyZS4gVGVzdGluZyBzb21lXG4gICAgICAgIC8vcHJvcGVydGllcyB0aGF0IGFsbCBlbGVtZW50cyBoYXZlICh3b3JrcyBvbiBJRTcpXG4gICAgICAgIHJldHVybiAodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgb2JqLm5vZGVUeXBlID09PSAxICYmXG4gICAgICAgICAgICB0eXBlb2Ygb2JqLnN0eWxlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICB0eXBlb2Ygb2JqLm93bmVyRG9jdW1lbnQgPT09IFwib2JqZWN0XCIpO1xuICAgIH1cbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuLypcbiAgR0lGRW5jb2Rlci5qc1xuXG4gIEF1dGhvcnNcbiAgS2V2aW4gV2VpbmVyIChvcmlnaW5hbCBKYXZhIHZlcnNpb24gLSBrd2VpbmVyQGZtc3dhcmUuY29tKVxuICBUaGliYXVsdCBJbWJlcnQgKEFTMyB2ZXJzaW9uIC0gYnl0ZWFycmF5Lm9yZylcbiAgSm9oYW4gTm9yZGJlcmcgKEpTIHZlcnNpb24gLSBjb2RlQGpvaGFuLW5vcmRiZXJnLmNvbSlcbiAgTWFraXRvIChPcHRpbWl6ZWQgZm9yIEF3ZXNvbWVRUiAtIHN1bWltYWtpdG9AaG90bWFpbCxjb20pXG4qL1xudmFyIE5ldVF1YW50ID0gcmVxdWlyZShcIi4vVHlwZWROZXVRdWFudC5qc1wiKTtcbnZhciBMWldFbmNvZGVyID0gcmVxdWlyZShcIi4vTFpXRW5jb2Rlci5qc1wiKTtcbmZ1bmN0aW9uIEJ5dGVBcnJheSgpIHtcbiAgICB0aGlzLnBhZ2UgPSAtMTtcbiAgICB0aGlzLnBhZ2VzID0gW107XG4gICAgdGhpcy5uZXdQYWdlKCk7XG59XG5CeXRlQXJyYXkucGFnZVNpemUgPSA0MDk2O1xuQnl0ZUFycmF5LmNoYXJNYXAgPSB7fTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyBpKyspXG4gICAgQnl0ZUFycmF5LmNoYXJNYXBbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpO1xuQnl0ZUFycmF5LnByb3RvdHlwZS5uZXdQYWdlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMucGFnZXNbKyt0aGlzLnBhZ2VdID0gbmV3IFVpbnQ4QXJyYXkoQnl0ZUFycmF5LnBhZ2VTaXplKTtcbiAgICB0aGlzLmN1cnNvciA9IDA7XG59O1xuQnl0ZUFycmF5LnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBydiA9IFwiXCI7XG4gICAgZm9yICh2YXIgcCA9IDA7IHAgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQnl0ZUFycmF5LnBhZ2VTaXplOyBpKyspIHtcbiAgICAgICAgICAgIHJ2ICs9IEJ5dGVBcnJheS5jaGFyTWFwW3RoaXMucGFnZXNbcF1baV1dO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBydjtcbn07XG5CeXRlQXJyYXkucHJvdG90eXBlLnRvRmxhdHRlblVpbnQ4QXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNodW5rcyA9IFtdO1xuICAgIGZvciAodmFyIHAgPSAwOyBwIDwgdGhpcy5wYWdlcy5sZW5ndGg7IHArKykge1xuICAgICAgICBpZiAocCA9PT0gdGhpcy5wYWdlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB2YXIgY2h1bmsgPSBVaW50OEFycmF5LmZyb20odGhpcy5wYWdlc1twXS5zbGljZSgwLCB0aGlzLmN1cnNvcikpO1xuICAgICAgICAgICAgY2h1bmtzLnB1c2goY2h1bmspO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2h1bmtzLnB1c2godGhpcy5wYWdlc1twXSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGZsYXR0ZW4gPSBuZXcgVWludDhBcnJheShjaHVua3MucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGNodW5rKSB7IHJldHVybiBhY2MgKyBjaHVuay5sZW5ndGg7IH0sIDApKTtcbiAgICBjaHVua3MucmVkdWNlKGZ1bmN0aW9uIChsYXN0TGVuZ3RoLCBjaHVuaykge1xuICAgICAgICBmbGF0dGVuLnNldChjaHVuaywgbGFzdExlbmd0aCk7XG4gICAgICAgIHJldHVybiBsYXN0TGVuZ3RoICsgY2h1bmsubGVuZ3RoO1xuICAgIH0sIDApO1xuICAgIHJldHVybiBmbGF0dGVuO1xufTtcbkJ5dGVBcnJheS5wcm90b3R5cGUud3JpdGVCeXRlID0gZnVuY3Rpb24gKHZhbCkge1xuICAgIGlmICh0aGlzLmN1cnNvciA+PSBCeXRlQXJyYXkucGFnZVNpemUpXG4gICAgICAgIHRoaXMubmV3UGFnZSgpO1xuICAgIHRoaXMucGFnZXNbdGhpcy5wYWdlXVt0aGlzLmN1cnNvcisrXSA9IHZhbDtcbn07XG5CeXRlQXJyYXkucHJvdG90eXBlLndyaXRlVVRGQnl0ZXMgPSBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgZm9yICh2YXIgbCA9IHN0cmluZy5sZW5ndGgsIGkgPSAwOyBpIDwgbDsgaSsrKVxuICAgICAgICB0aGlzLndyaXRlQnl0ZShzdHJpbmcuY2hhckNvZGVBdChpKSk7XG59O1xuQnl0ZUFycmF5LnByb3RvdHlwZS53cml0ZUJ5dGVzID0gZnVuY3Rpb24gKGFycmF5LCBvZmZzZXQsIGxlbmd0aCkge1xuICAgIGZvciAodmFyIGwgPSBsZW5ndGggfHwgYXJyYXkubGVuZ3RoLCBpID0gb2Zmc2V0IHx8IDA7IGkgPCBsOyBpKyspXG4gICAgICAgIHRoaXMud3JpdGVCeXRlKGFycmF5W2ldKTtcbn07XG5mdW5jdGlvbiBHSUZFbmNvZGVyKHdpZHRoLCBoZWlnaHQpIHtcbiAgICAvLyBpbWFnZSBzaXplXG4gICAgdGhpcy53aWR0aCA9IH5+d2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSB+fmhlaWdodDtcbiAgICAvLyB0cmFuc3BhcmVudCBjb2xvciBpZiBnaXZlblxuICAgIHRoaXMudHJhbnNwYXJlbnQgPSBudWxsO1xuICAgIC8vIHRyYW5zcGFyZW50IGluZGV4IGluIGNvbG9yIHRhYmxlXG4gICAgdGhpcy50cmFuc0luZGV4ID0gMDtcbiAgICAvLyAtMSA9IG5vIHJlcGVhdCwgMCA9IGZvcmV2ZXIuIGFueXRoaW5nIGVsc2UgaXMgcmVwZWF0IGNvdW50XG4gICAgdGhpcy5yZXBlYXQgPSAtMTtcbiAgICAvLyBmcmFtZSBkZWxheSAoaHVuZHJlZHRocylcbiAgICB0aGlzLmRlbGF5ID0gMDtcbiAgICB0aGlzLmltYWdlID0gbnVsbDsgLy8gY3VycmVudCBmcmFtZVxuICAgIHRoaXMucGl4ZWxzID0gbnVsbDsgLy8gQkdSIGJ5dGUgYXJyYXkgZnJvbSBmcmFtZVxuICAgIHRoaXMuaW5kZXhlZFBpeGVscyA9IG51bGw7IC8vIGNvbnZlcnRlZCBmcmFtZSBpbmRleGVkIHRvIHBhbGV0dGVcbiAgICB0aGlzLmNvbG9yRGVwdGggPSBudWxsOyAvLyBudW1iZXIgb2YgYml0IHBsYW5lc1xuICAgIHRoaXMuY29sb3JUYWIgPSBudWxsOyAvLyBSR0IgcGFsZXR0ZVxuICAgIHRoaXMubmV1UXVhbnQgPSBudWxsOyAvLyBOZXVRdWFudCBpbnN0YW5jZSB0aGF0IHdhcyB1c2VkIHRvIGdlbmVyYXRlIHRoaXMuY29sb3JUYWIuXG4gICAgdGhpcy51c2VkRW50cnkgPSBuZXcgQXJyYXkoKTsgLy8gYWN0aXZlIHBhbGV0dGUgZW50cmllc1xuICAgIHRoaXMucGFsU2l6ZSA9IDc7IC8vIGNvbG9yIHRhYmxlIHNpemUgKGJpdHMtMSlcbiAgICB0aGlzLmRpc3Bvc2UgPSAtMTsgLy8gZGlzcG9zYWwgY29kZSAoLTEgPSB1c2UgZGVmYXVsdClcbiAgICB0aGlzLmZpcnN0RnJhbWUgPSB0cnVlO1xuICAgIHRoaXMuc2FtcGxlID0gMTA7IC8vIGRlZmF1bHQgc2FtcGxlIGludGVydmFsIGZvciBxdWFudGl6ZXJcbiAgICB0aGlzLmRpdGhlciA9IGZhbHNlOyAvLyBkZWZhdWx0IGRpdGhlcmluZ1xuICAgIHRoaXMuZ2xvYmFsUGFsZXR0ZSA9IGZhbHNlO1xuICAgIHRoaXMub3V0ID0gbmV3IEJ5dGVBcnJheSgpO1xufVxuLypcbiAgU2V0cyB0aGUgZGVsYXkgdGltZSBiZXR3ZWVuIGVhY2ggZnJhbWUsIG9yIGNoYW5nZXMgaXQgZm9yIHN1YnNlcXVlbnQgZnJhbWVzXG4gIChhcHBsaWVzIHRvIGxhc3QgZnJhbWUgYWRkZWQpXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuc2V0RGVsYXkgPSBmdW5jdGlvbiAobWlsbGlzZWNvbmRzKSB7XG4gICAgdGhpcy5kZWxheSA9IE1hdGgucm91bmQobWlsbGlzZWNvbmRzIC8gMTApO1xufTtcbi8qXG4gIFNldHMgZnJhbWUgcmF0ZSBpbiBmcmFtZXMgcGVyIHNlY29uZC5cbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5zZXRGcmFtZVJhdGUgPSBmdW5jdGlvbiAoZnBzKSB7XG4gICAgdGhpcy5kZWxheSA9IE1hdGgucm91bmQoMTAwIC8gZnBzKTtcbn07XG4vKlxuICBTZXRzIHRoZSBHSUYgZnJhbWUgZGlzcG9zYWwgY29kZSBmb3IgdGhlIGxhc3QgYWRkZWQgZnJhbWUgYW5kIGFueVxuICBzdWJzZXF1ZW50IGZyYW1lcy5cblxuICBEZWZhdWx0IGlzIDAgaWYgbm8gdHJhbnNwYXJlbnQgY29sb3IgaGFzIGJlZW4gc2V0LCBvdGhlcndpc2UgMi5cbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5zZXREaXNwb3NlID0gZnVuY3Rpb24gKGRpc3Bvc2FsQ29kZSkge1xuICAgIGlmIChkaXNwb3NhbENvZGUgPj0gMClcbiAgICAgICAgdGhpcy5kaXNwb3NlID0gZGlzcG9zYWxDb2RlO1xufTtcbi8qXG4gIFNldHMgdGhlIG51bWJlciBvZiB0aW1lcyB0aGUgc2V0IG9mIEdJRiBmcmFtZXMgc2hvdWxkIGJlIHBsYXllZC5cblxuICAtMSA9IHBsYXkgb25jZVxuICAwID0gcmVwZWF0IGluZGVmaW5pdGVseVxuXG4gIERlZmF1bHQgaXMgLTFcblxuICBNdXN0IGJlIGludm9rZWQgYmVmb3JlIHRoZSBmaXJzdCBpbWFnZSBpcyBhZGRlZFxuKi9cbkdJRkVuY29kZXIucHJvdG90eXBlLnNldFJlcGVhdCA9IGZ1bmN0aW9uIChyZXBlYXQpIHtcbiAgICB0aGlzLnJlcGVhdCA9IHJlcGVhdDtcbn07XG4vKlxuICBTZXRzIHRoZSB0cmFuc3BhcmVudCBjb2xvciBmb3IgdGhlIGxhc3QgYWRkZWQgZnJhbWUgYW5kIGFueSBzdWJzZXF1ZW50XG4gIGZyYW1lcy4gU2luY2UgYWxsIGNvbG9ycyBhcmUgc3ViamVjdCB0byBtb2RpZmljYXRpb24gaW4gdGhlIHF1YW50aXphdGlvblxuICBwcm9jZXNzLCB0aGUgY29sb3IgaW4gdGhlIGZpbmFsIHBhbGV0dGUgZm9yIGVhY2ggZnJhbWUgY2xvc2VzdCB0byB0aGUgZ2l2ZW5cbiAgY29sb3IgYmVjb21lcyB0aGUgdHJhbnNwYXJlbnQgY29sb3IgZm9yIHRoYXQgZnJhbWUuIE1heSBiZSBzZXQgdG8gbnVsbCB0b1xuICBpbmRpY2F0ZSBubyB0cmFuc3BhcmVudCBjb2xvci5cbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5zZXRUcmFuc3BhcmVudCA9IGZ1bmN0aW9uIChjb2xvcikge1xuICAgIHRoaXMudHJhbnNwYXJlbnQgPSBjb2xvcjtcbn07XG4vKlxuICBBZGRzIG5leHQgR0lGIGZyYW1lLiBUaGUgZnJhbWUgaXMgbm90IHdyaXR0ZW4gaW1tZWRpYXRlbHksIGJ1dCBpc1xuICBhY3R1YWxseSBkZWZlcnJlZCB1bnRpbCB0aGUgbmV4dCBmcmFtZSBpcyByZWNlaXZlZCBzbyB0aGF0IHRpbWluZ1xuICBkYXRhIGNhbiBiZSBpbnNlcnRlZC4gIEludm9raW5nIGZpbmlzaCgpIGZsdXNoZXMgYWxsIGZyYW1lcy5cbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5hZGRGcmFtZSA9IGZ1bmN0aW9uIChpbWFnZURhdGEpIHtcbiAgICB0aGlzLmltYWdlID0gaW1hZ2VEYXRhO1xuICAgIHRoaXMuY29sb3JUYWIgPSB0aGlzLmdsb2JhbFBhbGV0dGUgJiYgdGhpcy5nbG9iYWxQYWxldHRlLnNsaWNlID8gdGhpcy5nbG9iYWxQYWxldHRlIDogbnVsbDtcbiAgICB0aGlzLmdldEltYWdlUGl4ZWxzKCk7IC8vIGNvbnZlcnQgdG8gY29ycmVjdCBmb3JtYXQgaWYgbmVjZXNzYXJ5XG4gICAgdGhpcy5hbmFseXplUGl4ZWxzKCk7IC8vIGJ1aWxkIGNvbG9yIHRhYmxlICYgbWFwIHBpeGVsc1xuICAgIGlmICh0aGlzLmdsb2JhbFBhbGV0dGUgPT09IHRydWUpXG4gICAgICAgIHRoaXMuZ2xvYmFsUGFsZXR0ZSA9IHRoaXMuY29sb3JUYWI7XG4gICAgaWYgKHRoaXMuZmlyc3RGcmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlSGVhZGVyKCk7XG4gICAgICAgIHRoaXMud3JpdGVMU0QoKTsgLy8gbG9naWNhbCBzY3JlZW4gZGVzY3JpcHRpb3JcbiAgICAgICAgdGhpcy53cml0ZVBhbGV0dGUoKTsgLy8gZ2xvYmFsIGNvbG9yIHRhYmxlXG4gICAgICAgIGlmICh0aGlzLnJlcGVhdCA+PSAwKSB7XG4gICAgICAgICAgICAvLyB1c2UgTlMgYXBwIGV4dGVuc2lvbiB0byBpbmRpY2F0ZSByZXBzXG4gICAgICAgICAgICB0aGlzLndyaXRlTmV0c2NhcGVFeHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLndyaXRlR3JhcGhpY0N0cmxFeHQoKTsgLy8gd3JpdGUgZ3JhcGhpYyBjb250cm9sIGV4dGVuc2lvblxuICAgIHRoaXMud3JpdGVJbWFnZURlc2MoKTsgLy8gaW1hZ2UgZGVzY3JpcHRvclxuICAgIGlmICghdGhpcy5maXJzdEZyYW1lICYmICF0aGlzLmdsb2JhbFBhbGV0dGUpXG4gICAgICAgIHRoaXMud3JpdGVQYWxldHRlKCk7IC8vIGxvY2FsIGNvbG9yIHRhYmxlXG4gICAgdGhpcy53cml0ZVBpeGVscygpOyAvLyBlbmNvZGUgYW5kIHdyaXRlIHBpeGVsIGRhdGFcbiAgICB0aGlzLmZpcnN0RnJhbWUgPSBmYWxzZTtcbn07XG4vKlxuICBBZGRzIGZpbmFsIHRyYWlsZXIgdG8gdGhlIEdJRiBzdHJlYW0sIGlmIHlvdSBkb24ndCBjYWxsIHRoZSBmaW5pc2ggbWV0aG9kXG4gIHRoZSBHSUYgc3RyZWFtIHdpbGwgbm90IGJlIHZhbGlkLlxuKi9cbkdJRkVuY29kZXIucHJvdG90eXBlLmZpbmlzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUoMHgzYik7IC8vIGdpZiB0cmFpbGVyXG59O1xuLypcbiAgU2V0cyBxdWFsaXR5IG9mIGNvbG9yIHF1YW50aXphdGlvbiAoY29udmVyc2lvbiBvZiBpbWFnZXMgdG8gdGhlIG1heGltdW0gMjU2XG4gIGNvbG9ycyBhbGxvd2VkIGJ5IHRoZSBHSUYgc3BlY2lmaWNhdGlvbikuIExvd2VyIHZhbHVlcyAobWluaW11bSA9IDEpXG4gIHByb2R1Y2UgYmV0dGVyIGNvbG9ycywgYnV0IHNsb3cgcHJvY2Vzc2luZyBzaWduaWZpY2FudGx5LiAxMCBpcyB0aGVcbiAgZGVmYXVsdCwgYW5kIHByb2R1Y2VzIGdvb2QgY29sb3IgbWFwcGluZyBhdCByZWFzb25hYmxlIHNwZWVkcy4gVmFsdWVzXG4gIGdyZWF0ZXIgdGhhbiAyMCBkbyBub3QgeWllbGQgc2lnbmlmaWNhbnQgaW1wcm92ZW1lbnRzIGluIHNwZWVkLlxuKi9cbkdJRkVuY29kZXIucHJvdG90eXBlLnNldFF1YWxpdHkgPSBmdW5jdGlvbiAocXVhbGl0eSkge1xuICAgIGlmIChxdWFsaXR5IDwgMSlcbiAgICAgICAgcXVhbGl0eSA9IDE7XG4gICAgdGhpcy5zYW1wbGUgPSBxdWFsaXR5O1xufTtcbi8qXG4gIFNldHMgZGl0aGVyaW5nIG1ldGhvZC4gQXZhaWxhYmxlIGFyZTpcbiAgLSBGQUxTRSBubyBkaXRoZXJpbmdcbiAgLSBUUlVFIG9yIEZsb3lkU3RlaW5iZXJnXG4gIC0gRmFsc2VGbG95ZFN0ZWluYmVyZ1xuICAtIFN0dWNraVxuICAtIEF0a2luc29uXG4gIFlvdSBjYW4gYWRkICctc2VycGVudGluZScgdG8gdXNlIHNlcnBlbnRpbmUgc2Nhbm5pbmdcbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5zZXREaXRoZXIgPSBmdW5jdGlvbiAoZGl0aGVyKSB7XG4gICAgaWYgKGRpdGhlciA9PT0gdHJ1ZSlcbiAgICAgICAgZGl0aGVyID0gXCJGbG95ZFN0ZWluYmVyZ1wiO1xuICAgIHRoaXMuZGl0aGVyID0gZGl0aGVyO1xufTtcbi8qXG4gIFNldHMgZ2xvYmFsIHBhbGV0dGUgZm9yIGFsbCBmcmFtZXMuXG4gIFlvdSBjYW4gcHJvdmlkZSBUUlVFIHRvIGNyZWF0ZSBnbG9iYWwgcGFsZXR0ZSBmcm9tIGZpcnN0IHBpY3R1cmUuXG4gIE9yIGFuIGFycmF5IG9mIHIsZyxiLHIsZyxiLC4uLlxuKi9cbkdJRkVuY29kZXIucHJvdG90eXBlLnNldEdsb2JhbFBhbGV0dGUgPSBmdW5jdGlvbiAocGFsZXR0ZSkge1xuICAgIHRoaXMuZ2xvYmFsUGFsZXR0ZSA9IHBhbGV0dGU7XG59O1xuLypcbiAgUmV0dXJucyBnbG9iYWwgcGFsZXR0ZSB1c2VkIGZvciBhbGwgZnJhbWVzLlxuICBJZiBzZXRHbG9iYWxQYWxldHRlKHRydWUpIHdhcyB1c2VkLCB0aGVuIHRoaXMgZnVuY3Rpb24gd2lsbCByZXR1cm5cbiAgY2FsY3VsYXRlZCBwYWxldHRlIGFmdGVyIHRoZSBmaXJzdCBmcmFtZSBpcyBhZGRlZC5cbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5nZXRHbG9iYWxQYWxldHRlID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAodGhpcy5nbG9iYWxQYWxldHRlICYmIHRoaXMuZ2xvYmFsUGFsZXR0ZS5zbGljZSAmJiB0aGlzLmdsb2JhbFBhbGV0dGUuc2xpY2UoMCkpIHx8IHRoaXMuZ2xvYmFsUGFsZXR0ZTtcbn07XG4vKlxuICBXcml0ZXMgR0lGIGZpbGUgaGVhZGVyXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUud3JpdGVIZWFkZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXQud3JpdGVVVEZCeXRlcyhcIkdJRjg5YVwiKTtcbn07XG4vKlxuICBBbmFseXplcyBjdXJyZW50IGZyYW1lIGNvbG9ycyBhbmQgY3JlYXRlcyBjb2xvciBtYXAuXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuYW5hbHl6ZVBpeGVscyA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXRoaXMuY29sb3JUYWIpIHtcbiAgICAgICAgdGhpcy5uZXVRdWFudCA9IG5ldyBOZXVRdWFudCh0aGlzLnBpeGVscywgdGhpcy5zYW1wbGUpO1xuICAgICAgICB0aGlzLm5ldVF1YW50LmJ1aWxkQ29sb3JtYXAoKTsgLy8gY3JlYXRlIHJlZHVjZWQgcGFsZXR0ZVxuICAgICAgICB0aGlzLmNvbG9yVGFiID0gdGhpcy5uZXVRdWFudC5nZXRDb2xvcm1hcCgpO1xuICAgIH1cbiAgICAvLyBtYXAgaW1hZ2UgcGl4ZWxzIHRvIG5ldyBwYWxldHRlXG4gICAgaWYgKHRoaXMuZGl0aGVyKSB7XG4gICAgICAgIHRoaXMuZGl0aGVyUGl4ZWxzKHRoaXMuZGl0aGVyLnJlcGxhY2UoXCItc2VycGVudGluZVwiLCBcIlwiKSwgdGhpcy5kaXRoZXIubWF0Y2goLy1zZXJwZW50aW5lLykgIT09IG51bGwpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5pbmRleFBpeGVscygpO1xuICAgIH1cbiAgICB0aGlzLnBpeGVscyA9IG51bGw7XG4gICAgdGhpcy5jb2xvckRlcHRoID0gODtcbiAgICB0aGlzLnBhbFNpemUgPSA3O1xuICAgIC8vIGdldCBjbG9zZXN0IG1hdGNoIHRvIHRyYW5zcGFyZW50IGNvbG9yIGlmIHNwZWNpZmllZFxuICAgIGlmICh0aGlzLnRyYW5zcGFyZW50ICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudHJhbnNJbmRleCA9IHRoaXMuZmluZENsb3Nlc3QodGhpcy50cmFuc3BhcmVudCwgdHJ1ZSk7XG4gICAgfVxufTtcbi8qXG4gIEluZGV4IHBpeGVscywgd2l0aG91dCBkaXRoZXJpbmdcbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5pbmRleFBpeGVscyA9IGZ1bmN0aW9uIChpbWdxKSB7XG4gICAgdmFyIG5QaXggPSB0aGlzLnBpeGVscy5sZW5ndGggLyAzO1xuICAgIHRoaXMuaW5kZXhlZFBpeGVscyA9IG5ldyBVaW50OEFycmF5KG5QaXgpO1xuICAgIHZhciBrID0gMDtcbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IG5QaXg7IGorKykge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmZpbmRDbG9zZXN0UkdCKHRoaXMucGl4ZWxzW2srK10gJiAweGZmLCB0aGlzLnBpeGVsc1trKytdICYgMHhmZiwgdGhpcy5waXhlbHNbaysrXSAmIDB4ZmYpO1xuICAgICAgICB0aGlzLnVzZWRFbnRyeVtpbmRleF0gPSB0cnVlO1xuICAgICAgICB0aGlzLmluZGV4ZWRQaXhlbHNbal0gPSBpbmRleDtcbiAgICB9XG59O1xuLypcbiAgVGFrZW4gZnJvbSBodHRwOi8vanNiaW4uY29tL2lYb2ZJamkvMi9lZGl0IGJ5IFBBRXpcbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5kaXRoZXJQaXhlbHMgPSBmdW5jdGlvbiAoa2VybmVsLCBzZXJwZW50aW5lKSB7XG4gICAgdmFyIGtlcm5lbHMgPSB7XG4gICAgICAgIEZhbHNlRmxveWRTdGVpbmJlcmc6IFtcbiAgICAgICAgICAgIFszIC8gOCwgMSwgMF0sXG4gICAgICAgICAgICBbMyAvIDgsIDAsIDFdLFxuICAgICAgICAgICAgWzIgLyA4LCAxLCAxXSxcbiAgICAgICAgXSxcbiAgICAgICAgRmxveWRTdGVpbmJlcmc6IFtcbiAgICAgICAgICAgIFs3IC8gMTYsIDEsIDBdLFxuICAgICAgICAgICAgWzMgLyAxNiwgLTEsIDFdLFxuICAgICAgICAgICAgWzUgLyAxNiwgMCwgMV0sXG4gICAgICAgICAgICBbMSAvIDE2LCAxLCAxXSxcbiAgICAgICAgXSxcbiAgICAgICAgU3R1Y2tpOiBbXG4gICAgICAgICAgICBbOCAvIDQyLCAxLCAwXSxcbiAgICAgICAgICAgIFs0IC8gNDIsIDIsIDBdLFxuICAgICAgICAgICAgWzIgLyA0MiwgLTIsIDFdLFxuICAgICAgICAgICAgWzQgLyA0MiwgLTEsIDFdLFxuICAgICAgICAgICAgWzggLyA0MiwgMCwgMV0sXG4gICAgICAgICAgICBbNCAvIDQyLCAxLCAxXSxcbiAgICAgICAgICAgIFsyIC8gNDIsIDIsIDFdLFxuICAgICAgICAgICAgWzEgLyA0MiwgLTIsIDJdLFxuICAgICAgICAgICAgWzIgLyA0MiwgLTEsIDJdLFxuICAgICAgICAgICAgWzQgLyA0MiwgMCwgMl0sXG4gICAgICAgICAgICBbMiAvIDQyLCAxLCAyXSxcbiAgICAgICAgICAgIFsxIC8gNDIsIDIsIDJdLFxuICAgICAgICBdLFxuICAgICAgICBBdGtpbnNvbjogW1xuICAgICAgICAgICAgWzEgLyA4LCAxLCAwXSxcbiAgICAgICAgICAgIFsxIC8gOCwgMiwgMF0sXG4gICAgICAgICAgICBbMSAvIDgsIC0xLCAxXSxcbiAgICAgICAgICAgIFsxIC8gOCwgMCwgMV0sXG4gICAgICAgICAgICBbMSAvIDgsIDEsIDFdLFxuICAgICAgICAgICAgWzEgLyA4LCAwLCAyXSxcbiAgICAgICAgXSxcbiAgICB9O1xuICAgIGlmICgha2VybmVsIHx8ICFrZXJuZWxzW2tlcm5lbF0pIHtcbiAgICAgICAgdGhyb3cgXCJVbmtub3duIGRpdGhlcmluZyBrZXJuZWw6IFwiICsga2VybmVsO1xuICAgIH1cbiAgICB2YXIgZHMgPSBrZXJuZWxzW2tlcm5lbF07XG4gICAgdmFyIGluZGV4ID0gMCwgaGVpZ2h0ID0gdGhpcy5oZWlnaHQsIHdpZHRoID0gdGhpcy53aWR0aCwgZGF0YSA9IHRoaXMucGl4ZWxzO1xuICAgIHZhciBkaXJlY3Rpb24gPSBzZXJwZW50aW5lID8gLTEgOiAxO1xuICAgIHRoaXMuaW5kZXhlZFBpeGVscyA9IG5ldyBVaW50OEFycmF5KHRoaXMucGl4ZWxzLmxlbmd0aCAvIDMpO1xuICAgIGZvciAodmFyIHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgaWYgKHNlcnBlbnRpbmUpXG4gICAgICAgICAgICBkaXJlY3Rpb24gPSBkaXJlY3Rpb24gKiAtMTtcbiAgICAgICAgZm9yICh2YXIgeCA9IGRpcmVjdGlvbiA9PSAxID8gMCA6IHdpZHRoIC0gMSwgeGVuZCA9IGRpcmVjdGlvbiA9PSAxID8gd2lkdGggOiAwOyB4ICE9PSB4ZW5kOyB4ICs9IGRpcmVjdGlvbikge1xuICAgICAgICAgICAgaW5kZXggPSB5ICogd2lkdGggKyB4O1xuICAgICAgICAgICAgLy8gR2V0IG9yaWdpbmFsIGNvbG91clxuICAgICAgICAgICAgdmFyIGlkeCA9IGluZGV4ICogMztcbiAgICAgICAgICAgIHZhciByMSA9IGRhdGFbaWR4XTtcbiAgICAgICAgICAgIHZhciBnMSA9IGRhdGFbaWR4ICsgMV07XG4gICAgICAgICAgICB2YXIgYjEgPSBkYXRhW2lkeCArIDJdO1xuICAgICAgICAgICAgLy8gR2V0IGNvbnZlcnRlZCBjb2xvdXJcbiAgICAgICAgICAgIGlkeCA9IHRoaXMuZmluZENsb3Nlc3RSR0IocjEsIGcxLCBiMSk7XG4gICAgICAgICAgICB0aGlzLnVzZWRFbnRyeVtpZHhdID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaW5kZXhlZFBpeGVsc1tpbmRleF0gPSBpZHg7XG4gICAgICAgICAgICBpZHggKj0gMztcbiAgICAgICAgICAgIHZhciByMiA9IHRoaXMuY29sb3JUYWJbaWR4XTtcbiAgICAgICAgICAgIHZhciBnMiA9IHRoaXMuY29sb3JUYWJbaWR4ICsgMV07XG4gICAgICAgICAgICB2YXIgYjIgPSB0aGlzLmNvbG9yVGFiW2lkeCArIDJdO1xuICAgICAgICAgICAgdmFyIGVyID0gcjEgLSByMjtcbiAgICAgICAgICAgIHZhciBlZyA9IGcxIC0gZzI7XG4gICAgICAgICAgICB2YXIgZWIgPSBiMSAtIGIyO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGRpcmVjdGlvbiA9PSAxID8gMCA6IGRzLmxlbmd0aCAtIDEsIGVuZCA9IGRpcmVjdGlvbiA9PSAxID8gZHMubGVuZ3RoIDogMDsgaSAhPT0gZW5kOyBpICs9IGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciB4MSA9IGRzW2ldWzFdOyAvLyAqZGlyZWN0aW9uOyAgLy8gIFNob3VsZCB0aGlzIGJ5IHRpbWVzZCBieSBkaXJlY3Rpb24/Li50byBtYWtlIHRoZSBrZXJuZWwgZ28gaW4gdGhlIG9wcG9zaXRlIGRpcmVjdGlvbi4uLi5nb3Qgbm8gaWRlYS4uLi5cbiAgICAgICAgICAgICAgICB2YXIgeTEgPSBkc1tpXVsyXTtcbiAgICAgICAgICAgICAgICBpZiAoeDEgKyB4ID49IDAgJiYgeDEgKyB4IDwgd2lkdGggJiYgeTEgKyB5ID49IDAgJiYgeTEgKyB5IDwgaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkID0gZHNbaV1bMF07XG4gICAgICAgICAgICAgICAgICAgIGlkeCA9IGluZGV4ICsgeDEgKyB5MSAqIHdpZHRoO1xuICAgICAgICAgICAgICAgICAgICBpZHggKj0gMztcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtpZHhdID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBkYXRhW2lkeF0gKyBlciAqIGQpKTtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtpZHggKyAxXSA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgZGF0YVtpZHggKyAxXSArIGVnICogZCkpO1xuICAgICAgICAgICAgICAgICAgICBkYXRhW2lkeCArIDJdID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBkYXRhW2lkeCArIDJdICsgZWIgKiBkKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbi8qXG4gIFJldHVybnMgaW5kZXggb2YgcGFsZXR0ZSBjb2xvciBjbG9zZXN0IHRvIGNcbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5maW5kQ2xvc2VzdCA9IGZ1bmN0aW9uIChjLCB1c2VkKSB7XG4gICAgcmV0dXJuIHRoaXMuZmluZENsb3Nlc3RSR0IoKGMgJiAweGZmMDAwMCkgPj4gMTYsIChjICYgMHgwMGZmMDApID4+IDgsIGMgJiAweDAwMDBmZiwgdXNlZCk7XG59O1xuR0lGRW5jb2Rlci5wcm90b3R5cGUuZmluZENsb3Nlc3RSR0IgPSBmdW5jdGlvbiAociwgZywgYiwgdXNlZCkge1xuICAgIGlmICh0aGlzLmNvbG9yVGFiID09PSBudWxsKVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgaWYgKHRoaXMubmV1UXVhbnQgJiYgIXVzZWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubmV1UXVhbnQubG9va3VwUkdCKHIsIGcsIGIpO1xuICAgIH1cbiAgICB2YXIgYyA9IGIgfCAoZyA8PCA4KSB8IChyIDw8IDE2KTtcbiAgICB2YXIgbWlucG9zID0gMDtcbiAgICB2YXIgZG1pbiA9IDI1NiAqIDI1NiAqIDI1NjtcbiAgICB2YXIgbGVuID0gdGhpcy5jb2xvclRhYi5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDAsIGluZGV4ID0gMDsgaSA8IGxlbjsgaW5kZXgrKykge1xuICAgICAgICB2YXIgZHIgPSByIC0gKHRoaXMuY29sb3JUYWJbaSsrXSAmIDB4ZmYpO1xuICAgICAgICB2YXIgZGcgPSBnIC0gKHRoaXMuY29sb3JUYWJbaSsrXSAmIDB4ZmYpO1xuICAgICAgICB2YXIgZGIgPSBiIC0gKHRoaXMuY29sb3JUYWJbaSsrXSAmIDB4ZmYpO1xuICAgICAgICB2YXIgZCA9IGRyICogZHIgKyBkZyAqIGRnICsgZGIgKiBkYjtcbiAgICAgICAgaWYgKCghdXNlZCB8fCB0aGlzLnVzZWRFbnRyeVtpbmRleF0pICYmIGQgPCBkbWluKSB7XG4gICAgICAgICAgICBkbWluID0gZDtcbiAgICAgICAgICAgIG1pbnBvcyA9IGluZGV4O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtaW5wb3M7XG59O1xuLypcbiAgRXh0cmFjdHMgaW1hZ2UgcGl4ZWxzIGludG8gYnl0ZSBhcnJheSBwaXhlbHNcbiAgKHJlbW92ZXMgYWxwaGFjaGFubmVsIGZyb20gY2FudmFzIGltYWdlZGF0YSlcbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5nZXRJbWFnZVBpeGVscyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgdyA9IHRoaXMud2lkdGg7XG4gICAgdmFyIGggPSB0aGlzLmhlaWdodDtcbiAgICB0aGlzLnBpeGVscyA9IG5ldyBVaW50OEFycmF5KHcgKiBoICogMyk7XG4gICAgdmFyIGRhdGEgPSB0aGlzLmltYWdlO1xuICAgIHZhciBzcmNQb3MgPSAwO1xuICAgIHZhciBjb3VudCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB3OyBqKyspIHtcbiAgICAgICAgICAgIHRoaXMucGl4ZWxzW2NvdW50KytdID0gZGF0YVtzcmNQb3MrK107XG4gICAgICAgICAgICB0aGlzLnBpeGVsc1tjb3VudCsrXSA9IGRhdGFbc3JjUG9zKytdO1xuICAgICAgICAgICAgdGhpcy5waXhlbHNbY291bnQrK10gPSBkYXRhW3NyY1BvcysrXTtcbiAgICAgICAgICAgIHNyY1BvcysrO1xuICAgICAgICB9XG4gICAgfVxufTtcbi8qXG4gIFdyaXRlcyBHcmFwaGljIENvbnRyb2wgRXh0ZW5zaW9uXG4qL1xuR0lGRW5jb2Rlci5wcm90b3R5cGUud3JpdGVHcmFwaGljQ3RybEV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUoMHgyMSk7IC8vIGV4dGVuc2lvbiBpbnRyb2R1Y2VyXG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKDB4ZjkpOyAvLyBHQ0UgbGFiZWxcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUoNCk7IC8vIGRhdGEgYmxvY2sgc2l6ZVxuICAgIHZhciB0cmFuc3AsIGRpc3A7XG4gICAgaWYgKHRoaXMudHJhbnNwYXJlbnQgPT09IG51bGwpIHtcbiAgICAgICAgdHJhbnNwID0gMDtcbiAgICAgICAgZGlzcCA9IDA7IC8vIGRpc3Bvc2UgPSBubyBhY3Rpb25cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHRyYW5zcCA9IDE7XG4gICAgICAgIGRpc3AgPSAyOyAvLyBmb3JjZSBjbGVhciBpZiB1c2luZyB0cmFuc3BhcmVudCBjb2xvclxuICAgIH1cbiAgICBpZiAodGhpcy5kaXNwb3NlID49IDApIHtcbiAgICAgICAgZGlzcCA9IHRoaXMuZGlzcG9zZSAmIDc7IC8vIHVzZXIgb3ZlcnJpZGVcbiAgICB9XG4gICAgZGlzcCA8PD0gMjtcbiAgICAvLyBwYWNrZWQgZmllbGRzXG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKDAgfCAvLyAxOjMgcmVzZXJ2ZWRcbiAgICAgICAgZGlzcCB8IC8vIDQ6NiBkaXNwb3NhbFxuICAgICAgICAwIHwgLy8gNyB1c2VyIGlucHV0IC0gMCA9IG5vbmVcbiAgICAgICAgdHJhbnNwIC8vIDggdHJhbnNwYXJlbmN5IGZsYWdcbiAgICApO1xuICAgIHRoaXMud3JpdGVTaG9ydCh0aGlzLmRlbGF5KTsgLy8gZGVsYXkgeCAxLzEwMCBzZWNcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUodGhpcy50cmFuc0luZGV4KTsgLy8gdHJhbnNwYXJlbnQgY29sb3IgaW5kZXhcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUoMCk7IC8vIGJsb2NrIHRlcm1pbmF0b3Jcbn07XG4vKlxuICBXcml0ZXMgSW1hZ2UgRGVzY3JpcHRvclxuKi9cbkdJRkVuY29kZXIucHJvdG90eXBlLndyaXRlSW1hZ2VEZXNjID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMub3V0LndyaXRlQnl0ZSgweDJjKTsgLy8gaW1hZ2Ugc2VwYXJhdG9yXG4gICAgdGhpcy53cml0ZVNob3J0KDApOyAvLyBpbWFnZSBwb3NpdGlvbiB4LHkgPSAwLDBcbiAgICB0aGlzLndyaXRlU2hvcnQoMCk7XG4gICAgdGhpcy53cml0ZVNob3J0KHRoaXMud2lkdGgpOyAvLyBpbWFnZSBzaXplXG4gICAgdGhpcy53cml0ZVNob3J0KHRoaXMuaGVpZ2h0KTtcbiAgICAvLyBwYWNrZWQgZmllbGRzXG4gICAgaWYgKHRoaXMuZmlyc3RGcmFtZSB8fCB0aGlzLmdsb2JhbFBhbGV0dGUpIHtcbiAgICAgICAgLy8gbm8gTENUIC0gR0NUIGlzIHVzZWQgZm9yIGZpcnN0IChvciBvbmx5KSBmcmFtZVxuICAgICAgICB0aGlzLm91dC53cml0ZUJ5dGUoMCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBzcGVjaWZ5IG5vcm1hbCBMQ1RcbiAgICAgICAgdGhpcy5vdXQud3JpdGVCeXRlKDB4ODAgfCAvLyAxIGxvY2FsIGNvbG9yIHRhYmxlIDE9eWVzXG4gICAgICAgICAgICAwIHwgLy8gMiBpbnRlcmxhY2UgLSAwPW5vXG4gICAgICAgICAgICAwIHwgLy8gMyBzb3J0ZWQgLSAwPW5vXG4gICAgICAgICAgICAwIHwgLy8gNC01IHJlc2VydmVkXG4gICAgICAgICAgICB0aGlzLnBhbFNpemUgLy8gNi04IHNpemUgb2YgY29sb3IgdGFibGVcbiAgICAgICAgKTtcbiAgICB9XG59O1xuLypcbiAgV3JpdGVzIExvZ2ljYWwgU2NyZWVuIERlc2NyaXB0b3JcbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS53cml0ZUxTRCA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBsb2dpY2FsIHNjcmVlbiBzaXplXG4gICAgdGhpcy53cml0ZVNob3J0KHRoaXMud2lkdGgpO1xuICAgIHRoaXMud3JpdGVTaG9ydCh0aGlzLmhlaWdodCk7XG4gICAgLy8gcGFja2VkIGZpZWxkc1xuICAgIHRoaXMub3V0LndyaXRlQnl0ZSgweDgwIHwgLy8gMSA6IGdsb2JhbCBjb2xvciB0YWJsZSBmbGFnID0gMSAoZ2N0IHVzZWQpXG4gICAgICAgIDB4NzAgfCAvLyAyLTQgOiBjb2xvciByZXNvbHV0aW9uID0gN1xuICAgICAgICAweDAwIHwgLy8gNSA6IGdjdCBzb3J0IGZsYWcgPSAwXG4gICAgICAgIHRoaXMucGFsU2l6ZSAvLyA2LTggOiBnY3Qgc2l6ZVxuICAgICk7XG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKDApOyAvLyBiYWNrZ3JvdW5kIGNvbG9yIGluZGV4XG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKDApOyAvLyBwaXhlbCBhc3BlY3QgcmF0aW8gLSBhc3N1bWUgMToxXG59O1xuLypcbiAgV3JpdGVzIE5ldHNjYXBlIGFwcGxpY2F0aW9uIGV4dGVuc2lvbiB0byBkZWZpbmUgcmVwZWF0IGNvdW50LlxuKi9cbkdJRkVuY29kZXIucHJvdG90eXBlLndyaXRlTmV0c2NhcGVFeHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKDB4MjEpOyAvLyBleHRlbnNpb24gaW50cm9kdWNlclxuICAgIHRoaXMub3V0LndyaXRlQnl0ZSgweGZmKTsgLy8gYXBwIGV4dGVuc2lvbiBsYWJlbFxuICAgIHRoaXMub3V0LndyaXRlQnl0ZSgxMSk7IC8vIGJsb2NrIHNpemVcbiAgICB0aGlzLm91dC53cml0ZVVURkJ5dGVzKFwiTkVUU0NBUEUyLjBcIik7IC8vIGFwcCBpZCArIGF1dGggY29kZVxuICAgIHRoaXMub3V0LndyaXRlQnl0ZSgzKTsgLy8gc3ViLWJsb2NrIHNpemVcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUoMSk7IC8vIGxvb3Agc3ViLWJsb2NrIGlkXG4gICAgdGhpcy53cml0ZVNob3J0KHRoaXMucmVwZWF0KTsgLy8gbG9vcCBjb3VudCAoZXh0cmEgaXRlcmF0aW9ucywgMD1yZXBlYXQgZm9yZXZlcilcbiAgICB0aGlzLm91dC53cml0ZUJ5dGUoMCk7IC8vIGJsb2NrIHRlcm1pbmF0b3Jcbn07XG4vKlxuICBXcml0ZXMgY29sb3IgdGFibGVcbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS53cml0ZVBhbGV0dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXQud3JpdGVCeXRlcyh0aGlzLmNvbG9yVGFiKTtcbiAgICB2YXIgbiA9IDMgKiAyNTYgLSB0aGlzLmNvbG9yVGFiLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKylcbiAgICAgICAgdGhpcy5vdXQud3JpdGVCeXRlKDApO1xufTtcbkdJRkVuY29kZXIucHJvdG90eXBlLndyaXRlU2hvcnQgPSBmdW5jdGlvbiAocFZhbHVlKSB7XG4gICAgdGhpcy5vdXQud3JpdGVCeXRlKHBWYWx1ZSAmIDB4ZmYpO1xuICAgIHRoaXMub3V0LndyaXRlQnl0ZSgocFZhbHVlID4+IDgpICYgMHhmZik7XG59O1xuLypcbiAgRW5jb2RlcyBhbmQgd3JpdGVzIHBpeGVsIGRhdGFcbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS53cml0ZVBpeGVscyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZW5jID0gbmV3IExaV0VuY29kZXIodGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHRoaXMuaW5kZXhlZFBpeGVscywgdGhpcy5jb2xvckRlcHRoKTtcbiAgICBlbmMuZW5jb2RlKHRoaXMub3V0KTtcbn07XG4vKlxuICBSZXRyaWV2ZXMgdGhlIEdJRiBzdHJlYW1cbiovXG5HSUZFbmNvZGVyLnByb3RvdHlwZS5zdHJlYW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMub3V0O1xufTtcbm1vZHVsZS5leHBvcnRzID0gR0lGRW5jb2RlcjtcbiIsIlwidXNlIHN0cmljdFwiO1xuLypcbiAgTFpXRW5jb2Rlci5qc1xuXG4gIEF1dGhvcnNcbiAgS2V2aW4gV2VpbmVyIChvcmlnaW5hbCBKYXZhIHZlcnNpb24gLSBrd2VpbmVyQGZtc3dhcmUuY29tKVxuICBUaGliYXVsdCBJbWJlcnQgKEFTMyB2ZXJzaW9uIC0gYnl0ZWFycmF5Lm9yZylcbiAgSm9oYW4gTm9yZGJlcmcgKEpTIHZlcnNpb24gLSBjb2RlQGpvaGFuLW5vcmRiZXJnLmNvbSlcblxuICBBY2tub3dsZWRnZW1lbnRzXG4gIEdJRkNPTVBSLkMgLSBHSUYgSW1hZ2UgY29tcHJlc3Npb24gcm91dGluZXNcbiAgTGVtcGVsLVppdiBjb21wcmVzc2lvbiBiYXNlZCBvbiAnY29tcHJlc3MnLiBHSUYgbW9kaWZpY2F0aW9ucyBieVxuICBEYXZpZCBSb3dsZXkgKG1nYXJkaUB3YXRkY3N1LndhdGVybG9vLmVkdSlcbiAgR0lGIEltYWdlIGNvbXByZXNzaW9uIC0gbW9kaWZpZWQgJ2NvbXByZXNzJ1xuICBCYXNlZCBvbjogY29tcHJlc3MuYyAtIEZpbGUgY29tcHJlc3Npb24gYWxhIElFRUUgQ29tcHV0ZXIsIEp1bmUgMTk4NC5cbiAgQnkgQXV0aG9yczogU3BlbmNlciBXLiBUaG9tYXMgKGRlY3ZheCFoYXJwbyF1dGFoLWNzIXV0YWgtZ3IhdGhvbWFzKVxuICBKaW0gTWNLaWUgKGRlY3ZheCFtY3ZheCFqaW0pXG4gIFN0ZXZlIERhdmllcyAoZGVjdmF4IXZheDEzNSFwZXRzZCFwZW9yYSFzcmQpXG4gIEtlbiBUdXJrb3dza2kgKGRlY3ZheCFkZWN3cmwhdHVydGxldmF4IWtlbilcbiAgSmFtZXMgQS4gV29vZHMgKGRlY3ZheCFpaG5wNCFhbWVzIWphdylcbiAgSm9lIE9yb3N0IChkZWN2YXghdmF4MTM1IXBldHNkIWpvZSlcbiovXG52YXIgRU9GID0gLTE7XG52YXIgQklUUyA9IDEyO1xudmFyIEhTSVpFID0gNTAwMzsgLy8gODAlIG9jY3VwYW5jeVxudmFyIG1hc2tzID0gWzB4MDAwMCwgMHgwMDAxLCAweDAwMDMsIDB4MDAwNywgMHgwMDBGLCAweDAwMUYsXG4gICAgMHgwMDNGLCAweDAwN0YsIDB4MDBGRiwgMHgwMUZGLCAweDAzRkYsIDB4MDdGRixcbiAgICAweDBGRkYsIDB4MUZGRiwgMHgzRkZGLCAweDdGRkYsIDB4RkZGRl07XG5mdW5jdGlvbiBMWldFbmNvZGVyKHdpZHRoLCBoZWlnaHQsIHBpeGVscywgY29sb3JEZXB0aCkge1xuICAgIHZhciBpbml0Q29kZVNpemUgPSBNYXRoLm1heCgyLCBjb2xvckRlcHRoKTtcbiAgICB2YXIgYWNjdW0gPSBuZXcgVWludDhBcnJheSgyNTYpO1xuICAgIHZhciBodGFiID0gbmV3IEludDMyQXJyYXkoSFNJWkUpO1xuICAgIHZhciBjb2RldGFiID0gbmV3IEludDMyQXJyYXkoSFNJWkUpO1xuICAgIHZhciBjdXJfYWNjdW0sIGN1cl9iaXRzID0gMDtcbiAgICB2YXIgYV9jb3VudDtcbiAgICB2YXIgZnJlZV9lbnQgPSAwOyAvLyBmaXJzdCB1bnVzZWQgZW50cnlcbiAgICB2YXIgbWF4Y29kZTtcbiAgICAvLyBibG9jayBjb21wcmVzc2lvbiBwYXJhbWV0ZXJzIC0tIGFmdGVyIGFsbCBjb2RlcyBhcmUgdXNlZCB1cCxcbiAgICAvLyBhbmQgY29tcHJlc3Npb24gcmF0ZSBjaGFuZ2VzLCBzdGFydCBvdmVyLlxuICAgIHZhciBjbGVhcl9mbGcgPSBmYWxzZTtcbiAgICAvLyBBbGdvcml0aG06IHVzZSBvcGVuIGFkZHJlc3NpbmcgZG91YmxlIGhhc2hpbmcgKG5vIGNoYWluaW5nKSBvbiB0aGVcbiAgICAvLyBwcmVmaXggY29kZSAvIG5leHQgY2hhcmFjdGVyIGNvbWJpbmF0aW9uLiBXZSBkbyBhIHZhcmlhbnQgb2YgS251dGgnc1xuICAgIC8vIGFsZ29yaXRobSBEICh2b2wuIDMsIHNlYy4gNi40KSBhbG9uZyB3aXRoIEcuIEtub3R0J3MgcmVsYXRpdmVseS1wcmltZVxuICAgIC8vIHNlY29uZGFyeSBwcm9iZS4gSGVyZSwgdGhlIG1vZHVsYXIgZGl2aXNpb24gZmlyc3QgcHJvYmUgaXMgZ2l2ZXMgd2F5XG4gICAgLy8gdG8gYSBmYXN0ZXIgZXhjbHVzaXZlLW9yIG1hbmlwdWxhdGlvbi4gQWxzbyBkbyBibG9jayBjb21wcmVzc2lvbiB3aXRoXG4gICAgLy8gYW4gYWRhcHRpdmUgcmVzZXQsIHdoZXJlYnkgdGhlIGNvZGUgdGFibGUgaXMgY2xlYXJlZCB3aGVuIHRoZSBjb21wcmVzc2lvblxuICAgIC8vIHJhdGlvIGRlY3JlYXNlcywgYnV0IGFmdGVyIHRoZSB0YWJsZSBmaWxscy4gVGhlIHZhcmlhYmxlLWxlbmd0aCBvdXRwdXRcbiAgICAvLyBjb2RlcyBhcmUgcmUtc2l6ZWQgYXQgdGhpcyBwb2ludCwgYW5kIGEgc3BlY2lhbCBDTEVBUiBjb2RlIGlzIGdlbmVyYXRlZFxuICAgIC8vIGZvciB0aGUgZGVjb21wcmVzc29yLiBMYXRlIGFkZGl0aW9uOiBjb25zdHJ1Y3QgdGhlIHRhYmxlIGFjY29yZGluZyB0b1xuICAgIC8vIGZpbGUgc2l6ZSBmb3Igbm90aWNlYWJsZSBzcGVlZCBpbXByb3ZlbWVudCBvbiBzbWFsbCBmaWxlcy4gUGxlYXNlIGRpcmVjdFxuICAgIC8vIHF1ZXN0aW9ucyBhYm91dCB0aGlzIGltcGxlbWVudGF0aW9uIHRvIGFtZXMhamF3LlxuICAgIHZhciBnX2luaXRfYml0cywgQ2xlYXJDb2RlLCBFT0ZDb2RlO1xuICAgIHZhciByZW1haW5pbmcsIGN1clBpeGVsLCBuX2JpdHM7XG4gICAgLy8gQWRkIGEgY2hhcmFjdGVyIHRvIHRoZSBlbmQgb2YgdGhlIGN1cnJlbnQgcGFja2V0LCBhbmQgaWYgaXQgaXMgMjU0XG4gICAgLy8gY2hhcmFjdGVycywgZmx1c2ggdGhlIHBhY2tldCB0byBkaXNrLlxuICAgIGZ1bmN0aW9uIGNoYXJfb3V0KGMsIG91dHMpIHtcbiAgICAgICAgYWNjdW1bYV9jb3VudCsrXSA9IGM7XG4gICAgICAgIGlmIChhX2NvdW50ID49IDI1NClcbiAgICAgICAgICAgIGZsdXNoX2NoYXIob3V0cyk7XG4gICAgfVxuICAgIC8vIENsZWFyIG91dCB0aGUgaGFzaCB0YWJsZVxuICAgIC8vIHRhYmxlIGNsZWFyIGZvciBibG9jayBjb21wcmVzc1xuICAgIGZ1bmN0aW9uIGNsX2Jsb2NrKG91dHMpIHtcbiAgICAgICAgY2xfaGFzaChIU0laRSk7XG4gICAgICAgIGZyZWVfZW50ID0gQ2xlYXJDb2RlICsgMjtcbiAgICAgICAgY2xlYXJfZmxnID0gdHJ1ZTtcbiAgICAgICAgb3V0cHV0KENsZWFyQ29kZSwgb3V0cyk7XG4gICAgfVxuICAgIC8vIFJlc2V0IGNvZGUgdGFibGVcbiAgICBmdW5jdGlvbiBjbF9oYXNoKGhzaXplKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaHNpemU7ICsraSlcbiAgICAgICAgICAgIGh0YWJbaV0gPSAtMTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29tcHJlc3MoaW5pdF9iaXRzLCBvdXRzKSB7XG4gICAgICAgIHZhciBmY29kZSwgYywgaSwgZW50LCBkaXNwLCBoc2l6ZV9yZWcsIGhzaGlmdDtcbiAgICAgICAgLy8gU2V0IHVwIHRoZSBnbG9iYWxzOiBnX2luaXRfYml0cyAtIGluaXRpYWwgbnVtYmVyIG9mIGJpdHNcbiAgICAgICAgZ19pbml0X2JpdHMgPSBpbml0X2JpdHM7XG4gICAgICAgIC8vIFNldCB1cCB0aGUgbmVjZXNzYXJ5IHZhbHVlc1xuICAgICAgICBjbGVhcl9mbGcgPSBmYWxzZTtcbiAgICAgICAgbl9iaXRzID0gZ19pbml0X2JpdHM7XG4gICAgICAgIG1heGNvZGUgPSBNQVhDT0RFKG5fYml0cyk7XG4gICAgICAgIENsZWFyQ29kZSA9IDEgPDwgKGluaXRfYml0cyAtIDEpO1xuICAgICAgICBFT0ZDb2RlID0gQ2xlYXJDb2RlICsgMTtcbiAgICAgICAgZnJlZV9lbnQgPSBDbGVhckNvZGUgKyAyO1xuICAgICAgICBhX2NvdW50ID0gMDsgLy8gY2xlYXIgcGFja2V0XG4gICAgICAgIGVudCA9IG5leHRQaXhlbCgpO1xuICAgICAgICBoc2hpZnQgPSAwO1xuICAgICAgICBmb3IgKGZjb2RlID0gSFNJWkU7IGZjb2RlIDwgNjU1MzY7IGZjb2RlICo9IDIpXG4gICAgICAgICAgICArK2hzaGlmdDtcbiAgICAgICAgaHNoaWZ0ID0gOCAtIGhzaGlmdDsgLy8gc2V0IGhhc2ggY29kZSByYW5nZSBib3VuZFxuICAgICAgICBoc2l6ZV9yZWcgPSBIU0laRTtcbiAgICAgICAgY2xfaGFzaChoc2l6ZV9yZWcpOyAvLyBjbGVhciBoYXNoIHRhYmxlXG4gICAgICAgIG91dHB1dChDbGVhckNvZGUsIG91dHMpO1xuICAgICAgICBvdXRlcl9sb29wOiB3aGlsZSAoKGMgPSBuZXh0UGl4ZWwoKSkgIT0gRU9GKSB7XG4gICAgICAgICAgICBmY29kZSA9IChjIDw8IEJJVFMpICsgZW50O1xuICAgICAgICAgICAgaSA9IChjIDw8IGhzaGlmdCkgXiBlbnQ7IC8vIHhvciBoYXNoaW5nXG4gICAgICAgICAgICBpZiAoaHRhYltpXSA9PT0gZmNvZGUpIHtcbiAgICAgICAgICAgICAgICBlbnQgPSBjb2RldGFiW2ldO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaHRhYltpXSA+PSAwKSB7IC8vIG5vbi1lbXB0eSBzbG90XG4gICAgICAgICAgICAgICAgZGlzcCA9IGhzaXplX3JlZyAtIGk7IC8vIHNlY29uZGFyeSBoYXNoIChhZnRlciBHLiBLbm90dClcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMClcbiAgICAgICAgICAgICAgICAgICAgZGlzcCA9IDE7XG4gICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGkgLT0gZGlzcCkgPCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgaSArPSBoc2l6ZV9yZWc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChodGFiW2ldID09PSBmY29kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW50ID0gY29kZXRhYltpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlIG91dGVyX2xvb3A7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IHdoaWxlIChodGFiW2ldID49IDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0cHV0KGVudCwgb3V0cyk7XG4gICAgICAgICAgICBlbnQgPSBjO1xuICAgICAgICAgICAgaWYgKGZyZWVfZW50IDwgMSA8PCBCSVRTKSB7XG4gICAgICAgICAgICAgICAgY29kZXRhYltpXSA9IGZyZWVfZW50Kys7IC8vIGNvZGUgLT4gaGFzaHRhYmxlXG4gICAgICAgICAgICAgICAgaHRhYltpXSA9IGZjb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2xfYmxvY2sob3V0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUHV0IG91dCB0aGUgZmluYWwgY29kZS5cbiAgICAgICAgb3V0cHV0KGVudCwgb3V0cyk7XG4gICAgICAgIG91dHB1dChFT0ZDb2RlLCBvdXRzKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZW5jb2RlKG91dHMpIHtcbiAgICAgICAgb3V0cy53cml0ZUJ5dGUoaW5pdENvZGVTaXplKTsgLy8gd3JpdGUgXCJpbml0aWFsIGNvZGUgc2l6ZVwiIGJ5dGVcbiAgICAgICAgcmVtYWluaW5nID0gd2lkdGggKiBoZWlnaHQ7IC8vIHJlc2V0IG5hdmlnYXRpb24gdmFyaWFibGVzXG4gICAgICAgIGN1clBpeGVsID0gMDtcbiAgICAgICAgY29tcHJlc3MoaW5pdENvZGVTaXplICsgMSwgb3V0cyk7IC8vIGNvbXByZXNzIGFuZCB3cml0ZSB0aGUgcGl4ZWwgZGF0YVxuICAgICAgICBvdXRzLndyaXRlQnl0ZSgwKTsgLy8gd3JpdGUgYmxvY2sgdGVybWluYXRvclxuICAgIH1cbiAgICAvLyBGbHVzaCB0aGUgcGFja2V0IHRvIGRpc2ssIGFuZCByZXNldCB0aGUgYWNjdW11bGF0b3JcbiAgICBmdW5jdGlvbiBmbHVzaF9jaGFyKG91dHMpIHtcbiAgICAgICAgaWYgKGFfY291bnQgPiAwKSB7XG4gICAgICAgICAgICBvdXRzLndyaXRlQnl0ZShhX2NvdW50KTtcbiAgICAgICAgICAgIG91dHMud3JpdGVCeXRlcyhhY2N1bSwgMCwgYV9jb3VudCk7XG4gICAgICAgICAgICBhX2NvdW50ID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBNQVhDT0RFKG5fYml0cykge1xuICAgICAgICByZXR1cm4gKDEgPDwgbl9iaXRzKSAtIDE7XG4gICAgfVxuICAgIC8vIFJldHVybiB0aGUgbmV4dCBwaXhlbCBmcm9tIHRoZSBpbWFnZVxuICAgIGZ1bmN0aW9uIG5leHRQaXhlbCgpIHtcbiAgICAgICAgaWYgKHJlbWFpbmluZyA9PT0gMClcbiAgICAgICAgICAgIHJldHVybiBFT0Y7XG4gICAgICAgIC0tcmVtYWluaW5nO1xuICAgICAgICB2YXIgcGl4ID0gcGl4ZWxzW2N1clBpeGVsKytdO1xuICAgICAgICByZXR1cm4gcGl4ICYgMHhmZjtcbiAgICB9XG4gICAgZnVuY3Rpb24gb3V0cHV0KGNvZGUsIG91dHMpIHtcbiAgICAgICAgY3VyX2FjY3VtICY9IG1hc2tzW2N1cl9iaXRzXTtcbiAgICAgICAgaWYgKGN1cl9iaXRzID4gMClcbiAgICAgICAgICAgIGN1cl9hY2N1bSB8PSAoY29kZSA8PCBjdXJfYml0cyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIGN1cl9hY2N1bSA9IGNvZGU7XG4gICAgICAgIGN1cl9iaXRzICs9IG5fYml0cztcbiAgICAgICAgd2hpbGUgKGN1cl9iaXRzID49IDgpIHtcbiAgICAgICAgICAgIGNoYXJfb3V0KChjdXJfYWNjdW0gJiAweGZmKSwgb3V0cyk7XG4gICAgICAgICAgICBjdXJfYWNjdW0gPj49IDg7XG4gICAgICAgICAgICBjdXJfYml0cyAtPSA4O1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBuZXh0IGVudHJ5IGlzIGdvaW5nIHRvIGJlIHRvbyBiaWcgZm9yIHRoZSBjb2RlIHNpemUsXG4gICAgICAgIC8vIHRoZW4gaW5jcmVhc2UgaXQsIGlmIHBvc3NpYmxlLlxuICAgICAgICBpZiAoZnJlZV9lbnQgPiBtYXhjb2RlIHx8IGNsZWFyX2ZsZykge1xuICAgICAgICAgICAgaWYgKGNsZWFyX2ZsZykge1xuICAgICAgICAgICAgICAgIG1heGNvZGUgPSBNQVhDT0RFKG5fYml0cyA9IGdfaW5pdF9iaXRzKTtcbiAgICAgICAgICAgICAgICBjbGVhcl9mbGcgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICsrbl9iaXRzO1xuICAgICAgICAgICAgICAgIGlmIChuX2JpdHMgPT0gQklUUylcbiAgICAgICAgICAgICAgICAgICAgbWF4Y29kZSA9IDEgPDwgQklUUztcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIG1heGNvZGUgPSBNQVhDT0RFKG5fYml0cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvZGUgPT0gRU9GQ29kZSkge1xuICAgICAgICAgICAgLy8gQXQgRU9GLCB3cml0ZSB0aGUgcmVzdCBvZiB0aGUgYnVmZmVyLlxuICAgICAgICAgICAgd2hpbGUgKGN1cl9iaXRzID4gMCkge1xuICAgICAgICAgICAgICAgIGNoYXJfb3V0KChjdXJfYWNjdW0gJiAweGZmKSwgb3V0cyk7XG4gICAgICAgICAgICAgICAgY3VyX2FjY3VtID4+PSA4O1xuICAgICAgICAgICAgICAgIGN1cl9iaXRzIC09IDg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmbHVzaF9jaGFyKG91dHMpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuZW5jb2RlID0gZW5jb2RlO1xufVxubW9kdWxlLmV4cG9ydHMgPSBMWldFbmNvZGVyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKiBOZXVRdWFudCBOZXVyYWwtTmV0IFF1YW50aXphdGlvbiBBbGdvcml0aG1cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqIENvcHlyaWdodCAoYykgMTk5NCBBbnRob255IERla2tlclxuICpcbiAqIE5FVVFVQU5UIE5ldXJhbC1OZXQgcXVhbnRpemF0aW9uIGFsZ29yaXRobSBieSBBbnRob255IERla2tlciwgMTk5NC5cbiAqIFNlZSBcIktvaG9uZW4gbmV1cmFsIG5ldHdvcmtzIGZvciBvcHRpbWFsIGNvbG91ciBxdWFudGl6YXRpb25cIlxuICogaW4gXCJOZXR3b3JrOiBDb21wdXRhdGlvbiBpbiBOZXVyYWwgU3lzdGVtc1wiIFZvbC4gNSAoMTk5NCkgcHAgMzUxLTM2Ny5cbiAqIGZvciBhIGRpc2N1c3Npb24gb2YgdGhlIGFsZ29yaXRobS5cbiAqIFNlZSBhbHNvICBodHRwOi8vbWVtYmVycy5vemVtYWlsLmNvbS5hdS9+ZGVra2VyL05FVVFVQU5ULkhUTUxcbiAqXG4gKiBBbnkgcGFydHkgb2J0YWluaW5nIGEgY29weSBvZiB0aGVzZSBmaWxlcyBmcm9tIHRoZSBhdXRob3IsIGRpcmVjdGx5IG9yXG4gKiBpbmRpcmVjdGx5LCBpcyBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgYSBmdWxsIGFuZCB1bnJlc3RyaWN0ZWQgaXJyZXZvY2FibGUsXG4gKiB3b3JsZC13aWRlLCBwYWlkIHVwLCByb3lhbHR5LWZyZWUsIG5vbmV4Y2x1c2l2ZSByaWdodCBhbmQgbGljZW5zZSB0byBkZWFsXG4gKiBpbiB0aGlzIHNvZnR3YXJlIGFuZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgaW5jbHVkaW5nIHdpdGhvdXRcbiAqIGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsXG4gKiBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgd2hvIHJlY2VpdmVcbiAqIGNvcGllcyBmcm9tIGFueSBzdWNoIHBhcnR5IHRvIGRvIHNvLCB3aXRoIHRoZSBvbmx5IHJlcXVpcmVtZW50IGJlaW5nXG4gKiB0aGF0IHRoaXMgY29weXJpZ2h0IG5vdGljZSByZW1haW4gaW50YWN0LlxuICpcbiAqIChKYXZhU2NyaXB0IHBvcnQgMjAxMiBieSBKb2hhbiBOb3JkYmVyZylcbiAqL1xudmFyIG5jeWNsZXMgPSAxMDA7IC8vIG51bWJlciBvZiBsZWFybmluZyBjeWNsZXNcbnZhciBuZXRzaXplID0gMjU2OyAvLyBudW1iZXIgb2YgY29sb3JzIHVzZWRcbnZhciBtYXhuZXRwb3MgPSBuZXRzaXplIC0gMTtcbi8vIGRlZnMgZm9yIGZyZXEgYW5kIGJpYXNcbnZhciBuZXRiaWFzc2hpZnQgPSA0OyAvLyBiaWFzIGZvciBjb2xvdXIgdmFsdWVzXG52YXIgaW50Ymlhc3NoaWZ0ID0gMTY7IC8vIGJpYXMgZm9yIGZyYWN0aW9uc1xudmFyIGludGJpYXMgPSAoMSA8PCBpbnRiaWFzc2hpZnQpO1xudmFyIGdhbW1hc2hpZnQgPSAxMDtcbnZhciBnYW1tYSA9ICgxIDw8IGdhbW1hc2hpZnQpO1xudmFyIGJldGFzaGlmdCA9IDEwO1xudmFyIGJldGEgPSAoaW50YmlhcyA+PiBiZXRhc2hpZnQpOyAvKiBiZXRhID0gMS8xMDI0ICovXG52YXIgYmV0YWdhbW1hID0gKGludGJpYXMgPDwgKGdhbW1hc2hpZnQgLSBiZXRhc2hpZnQpKTtcbi8vIGRlZnMgZm9yIGRlY3JlYXNpbmcgcmFkaXVzIGZhY3RvclxudmFyIGluaXRyYWQgPSAobmV0c2l6ZSA+PiAzKTsgLy8gZm9yIDI1NiBjb2xzLCByYWRpdXMgc3RhcnRzXG52YXIgcmFkaXVzYmlhc3NoaWZ0ID0gNjsgLy8gYXQgMzIuMCBiaWFzZWQgYnkgNiBiaXRzXG52YXIgcmFkaXVzYmlhcyA9ICgxIDw8IHJhZGl1c2JpYXNzaGlmdCk7XG52YXIgaW5pdHJhZGl1cyA9IChpbml0cmFkICogcmFkaXVzYmlhcyk7IC8vYW5kIGRlY3JlYXNlcyBieSBhXG52YXIgcmFkaXVzZGVjID0gMzA7IC8vIGZhY3RvciBvZiAxLzMwIGVhY2ggY3ljbGVcbi8vIGRlZnMgZm9yIGRlY3JlYXNpbmcgYWxwaGEgZmFjdG9yXG52YXIgYWxwaGFiaWFzc2hpZnQgPSAxMDsgLy8gYWxwaGEgc3RhcnRzIGF0IDEuMFxudmFyIGluaXRhbHBoYSA9ICgxIDw8IGFscGhhYmlhc3NoaWZ0KTtcbnZhciBhbHBoYWRlYzsgLy8gYmlhc2VkIGJ5IDEwIGJpdHNcbi8qIHJhZGJpYXMgYW5kIGFscGhhcmFkYmlhcyB1c2VkIGZvciByYWRwb3dlciBjYWxjdWxhdGlvbiAqL1xudmFyIHJhZGJpYXNzaGlmdCA9IDg7XG52YXIgcmFkYmlhcyA9ICgxIDw8IHJhZGJpYXNzaGlmdCk7XG52YXIgYWxwaGFyYWRic2hpZnQgPSAoYWxwaGFiaWFzc2hpZnQgKyByYWRiaWFzc2hpZnQpO1xudmFyIGFscGhhcmFkYmlhcyA9ICgxIDw8IGFscGhhcmFkYnNoaWZ0KTtcbi8vIGZvdXIgcHJpbWVzIG5lYXIgNTAwIC0gYXNzdW1lIG5vIGltYWdlIGhhcyBhIGxlbmd0aCBzbyBsYXJnZSB0aGF0IGl0IGlzXG4vLyBkaXZpc2libGUgYnkgYWxsIGZvdXIgcHJpbWVzXG52YXIgcHJpbWUxID0gNDk5O1xudmFyIHByaW1lMiA9IDQ5MTtcbnZhciBwcmltZTMgPSA0ODc7XG52YXIgcHJpbWU0ID0gNTAzO1xudmFyIG1pbnBpY3R1cmVieXRlcyA9ICgzICogcHJpbWU0KTtcbi8qXG4gIENvbnN0cnVjdG9yOiBOZXVRdWFudFxuXG4gIEFyZ3VtZW50czpcblxuICBwaXhlbHMgLSBhcnJheSBvZiBwaXhlbHMgaW4gUkdCIGZvcm1hdFxuICBzYW1wbGVmYWMgLSBzYW1wbGluZyBmYWN0b3IgMSB0byAzMCB3aGVyZSBsb3dlciBpcyBiZXR0ZXIgcXVhbGl0eVxuXG4gID5cbiAgPiBwaXhlbHMgPSBbciwgZywgYiwgciwgZywgYiwgciwgZywgYiwgLi5dXG4gID5cbiovXG5mdW5jdGlvbiBOZXVRdWFudChwaXhlbHMsIHNhbXBsZWZhYykge1xuICAgIHZhciBuZXR3b3JrOyAvLyBpbnRbbmV0c2l6ZV1bNF1cbiAgICB2YXIgbmV0aW5kZXg7IC8vIGZvciBuZXR3b3JrIGxvb2t1cCAtIHJlYWxseSAyNTZcbiAgICAvLyBiaWFzIGFuZCBmcmVxIGFycmF5cyBmb3IgbGVhcm5pbmdcbiAgICB2YXIgYmlhcztcbiAgICB2YXIgZnJlcTtcbiAgICB2YXIgcmFkcG93ZXI7XG4gICAgLypcbiAgICAgIFByaXZhdGUgTWV0aG9kOiBpbml0XG4gIFxuICAgICAgc2V0cyB1cCBhcnJheXNcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIG5ldHdvcmsgPSBbXTtcbiAgICAgICAgbmV0aW5kZXggPSBuZXcgSW50MzJBcnJheSgyNTYpO1xuICAgICAgICBiaWFzID0gbmV3IEludDMyQXJyYXkobmV0c2l6ZSk7XG4gICAgICAgIGZyZXEgPSBuZXcgSW50MzJBcnJheShuZXRzaXplKTtcbiAgICAgICAgcmFkcG93ZXIgPSBuZXcgSW50MzJBcnJheShuZXRzaXplID4+IDMpO1xuICAgICAgICB2YXIgaSwgdjtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5ldHNpemU7IGkrKykge1xuICAgICAgICAgICAgdiA9IChpIDw8IChuZXRiaWFzc2hpZnQgKyA4KSkgLyBuZXRzaXplO1xuICAgICAgICAgICAgbmV0d29ya1tpXSA9IG5ldyBGbG9hdDY0QXJyYXkoW3YsIHYsIHYsIDBdKTtcbiAgICAgICAgICAgIC8vbmV0d29ya1tpXSA9IFt2LCB2LCB2LCAwXVxuICAgICAgICAgICAgZnJlcVtpXSA9IGludGJpYXMgLyBuZXRzaXplO1xuICAgICAgICAgICAgYmlhc1tpXSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLypcbiAgICAgIFByaXZhdGUgTWV0aG9kOiB1bmJpYXNuZXRcbiAgXG4gICAgICB1bmJpYXNlcyBuZXR3b3JrIHRvIGdpdmUgYnl0ZSB2YWx1ZXMgMC4uMjU1IGFuZCByZWNvcmQgcG9zaXRpb24gaSB0byBwcmVwYXJlIGZvciBzb3J0XG4gICAgKi9cbiAgICBmdW5jdGlvbiB1bmJpYXNuZXQoKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV0c2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBuZXR3b3JrW2ldWzBdID4+PSBuZXRiaWFzc2hpZnQ7XG4gICAgICAgICAgICBuZXR3b3JrW2ldWzFdID4+PSBuZXRiaWFzc2hpZnQ7XG4gICAgICAgICAgICBuZXR3b3JrW2ldWzJdID4+PSBuZXRiaWFzc2hpZnQ7XG4gICAgICAgICAgICBuZXR3b3JrW2ldWzNdID0gaTsgLy8gcmVjb3JkIGNvbG9yIG51bWJlclxuICAgICAgICB9XG4gICAgfVxuICAgIC8qXG4gICAgICBQcml2YXRlIE1ldGhvZDogYWx0ZXJzaW5nbGVcbiAgXG4gICAgICBtb3ZlcyBuZXVyb24gKmkqIHRvd2FyZHMgYmlhc2VkIChiLGcscikgYnkgZmFjdG9yICphbHBoYSpcbiAgICAqL1xuICAgIGZ1bmN0aW9uIGFsdGVyc2luZ2xlKGFscGhhLCBpLCBiLCBnLCByKSB7XG4gICAgICAgIG5ldHdvcmtbaV1bMF0gLT0gKGFscGhhICogKG5ldHdvcmtbaV1bMF0gLSBiKSkgLyBpbml0YWxwaGE7XG4gICAgICAgIG5ldHdvcmtbaV1bMV0gLT0gKGFscGhhICogKG5ldHdvcmtbaV1bMV0gLSBnKSkgLyBpbml0YWxwaGE7XG4gICAgICAgIG5ldHdvcmtbaV1bMl0gLT0gKGFscGhhICogKG5ldHdvcmtbaV1bMl0gLSByKSkgLyBpbml0YWxwaGE7XG4gICAgfVxuICAgIC8qXG4gICAgICBQcml2YXRlIE1ldGhvZDogYWx0ZXJuZWlnaFxuICBcbiAgICAgIG1vdmVzIG5ldXJvbnMgaW4gKnJhZGl1cyogYXJvdW5kIGluZGV4ICppKiB0b3dhcmRzIGJpYXNlZCAoYixnLHIpIGJ5IGZhY3RvciAqYWxwaGEqXG4gICAgKi9cbiAgICBmdW5jdGlvbiBhbHRlcm5laWdoKHJhZGl1cywgaSwgYiwgZywgcikge1xuICAgICAgICB2YXIgbG8gPSBNYXRoLmFicyhpIC0gcmFkaXVzKTtcbiAgICAgICAgdmFyIGhpID0gTWF0aC5taW4oaSArIHJhZGl1cywgbmV0c2l6ZSk7XG4gICAgICAgIHZhciBqID0gaSArIDE7XG4gICAgICAgIHZhciBrID0gaSAtIDE7XG4gICAgICAgIHZhciBtID0gMTtcbiAgICAgICAgdmFyIHAsIGE7XG4gICAgICAgIHdoaWxlICgoaiA8IGhpKSB8fCAoayA+IGxvKSkge1xuICAgICAgICAgICAgYSA9IHJhZHBvd2VyW20rK107XG4gICAgICAgICAgICBpZiAoaiA8IGhpKSB7XG4gICAgICAgICAgICAgICAgcCA9IG5ldHdvcmtbaisrXTtcbiAgICAgICAgICAgICAgICBwWzBdIC09IChhICogKHBbMF0gLSBiKSkgLyBhbHBoYXJhZGJpYXM7XG4gICAgICAgICAgICAgICAgcFsxXSAtPSAoYSAqIChwWzFdIC0gZykpIC8gYWxwaGFyYWRiaWFzO1xuICAgICAgICAgICAgICAgIHBbMl0gLT0gKGEgKiAocFsyXSAtIHIpKSAvIGFscGhhcmFkYmlhcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChrID4gbG8pIHtcbiAgICAgICAgICAgICAgICBwID0gbmV0d29ya1trLS1dO1xuICAgICAgICAgICAgICAgIHBbMF0gLT0gKGEgKiAocFswXSAtIGIpKSAvIGFscGhhcmFkYmlhcztcbiAgICAgICAgICAgICAgICBwWzFdIC09IChhICogKHBbMV0gLSBnKSkgLyBhbHBoYXJhZGJpYXM7XG4gICAgICAgICAgICAgICAgcFsyXSAtPSAoYSAqIChwWzJdIC0gcikpIC8gYWxwaGFyYWRiaWFzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qXG4gICAgICBQcml2YXRlIE1ldGhvZDogY29udGVzdFxuICBcbiAgICAgIHNlYXJjaGVzIGZvciBiaWFzZWQgQkdSIHZhbHVlc1xuICAgICovXG4gICAgZnVuY3Rpb24gY29udGVzdChiLCBnLCByKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAgZmluZHMgY2xvc2VzdCBuZXVyb24gKG1pbiBkaXN0KSBhbmQgdXBkYXRlcyBmcmVxXG4gICAgICAgICAgZmluZHMgYmVzdCBuZXVyb24gKG1pbiBkaXN0LWJpYXMpIGFuZCByZXR1cm5zIHBvc2l0aW9uXG4gICAgICAgICAgZm9yIGZyZXF1ZW50bHkgY2hvc2VuIG5ldXJvbnMsIGZyZXFbaV0gaXMgaGlnaCBhbmQgYmlhc1tpXSBpcyBuZWdhdGl2ZVxuICAgICAgICAgIGJpYXNbaV0gPSBnYW1tYSAqICgoMSAvIG5ldHNpemUpIC0gZnJlcVtpXSlcbiAgICAgICAgKi9cbiAgICAgICAgdmFyIGJlc3RkID0gfigxIDw8IDMxKTtcbiAgICAgICAgdmFyIGJlc3RiaWFzZCA9IGJlc3RkO1xuICAgICAgICB2YXIgYmVzdHBvcyA9IC0xO1xuICAgICAgICB2YXIgYmVzdGJpYXNwb3MgPSBiZXN0cG9zO1xuICAgICAgICB2YXIgaSwgbiwgZGlzdCwgYmlhc2Rpc3QsIGJldGFmcmVxO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbmV0c2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICBuID0gbmV0d29ya1tpXTtcbiAgICAgICAgICAgIGRpc3QgPSBNYXRoLmFicyhuWzBdIC0gYikgKyBNYXRoLmFicyhuWzFdIC0gZykgKyBNYXRoLmFicyhuWzJdIC0gcik7XG4gICAgICAgICAgICBpZiAoZGlzdCA8IGJlc3RkKSB7XG4gICAgICAgICAgICAgICAgYmVzdGQgPSBkaXN0O1xuICAgICAgICAgICAgICAgIGJlc3Rwb3MgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmlhc2Rpc3QgPSBkaXN0IC0gKChiaWFzW2ldKSA+PiAoaW50Ymlhc3NoaWZ0IC0gbmV0Ymlhc3NoaWZ0KSk7XG4gICAgICAgICAgICBpZiAoYmlhc2Rpc3QgPCBiZXN0Ymlhc2QpIHtcbiAgICAgICAgICAgICAgICBiZXN0Ymlhc2QgPSBiaWFzZGlzdDtcbiAgICAgICAgICAgICAgICBiZXN0Ymlhc3BvcyA9IGk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiZXRhZnJlcSA9IChmcmVxW2ldID4+IGJldGFzaGlmdCk7XG4gICAgICAgICAgICBmcmVxW2ldIC09IGJldGFmcmVxO1xuICAgICAgICAgICAgYmlhc1tpXSArPSAoYmV0YWZyZXEgPDwgZ2FtbWFzaGlmdCk7XG4gICAgICAgIH1cbiAgICAgICAgZnJlcVtiZXN0cG9zXSArPSBiZXRhO1xuICAgICAgICBiaWFzW2Jlc3Rwb3NdIC09IGJldGFnYW1tYTtcbiAgICAgICAgcmV0dXJuIGJlc3RiaWFzcG9zO1xuICAgIH1cbiAgICAvKlxuICAgICAgUHJpdmF0ZSBNZXRob2Q6IGlueGJ1aWxkXG4gIFxuICAgICAgc29ydHMgbmV0d29yayBhbmQgYnVpbGRzIG5ldGluZGV4WzAuLjI1NV1cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGlueGJ1aWxkKCkge1xuICAgICAgICB2YXIgaSwgaiwgcCwgcSwgc21hbGxwb3MsIHNtYWxsdmFsLCBwcmV2aW91c2NvbCA9IDAsIHN0YXJ0cG9zID0gMDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG5ldHNpemU7IGkrKykge1xuICAgICAgICAgICAgcCA9IG5ldHdvcmtbaV07XG4gICAgICAgICAgICBzbWFsbHBvcyA9IGk7XG4gICAgICAgICAgICBzbWFsbHZhbCA9IHBbMV07IC8vIGluZGV4IG9uIGdcbiAgICAgICAgICAgIC8vIGZpbmQgc21hbGxlc3QgaW4gaS4ubmV0c2l6ZS0xXG4gICAgICAgICAgICBmb3IgKGogPSBpICsgMTsgaiA8IG5ldHNpemU7IGorKykge1xuICAgICAgICAgICAgICAgIHEgPSBuZXR3b3JrW2pdO1xuICAgICAgICAgICAgICAgIGlmIChxWzFdIDwgc21hbGx2YWwpIHsgLy8gaW5kZXggb24gZ1xuICAgICAgICAgICAgICAgICAgICBzbWFsbHBvcyA9IGo7XG4gICAgICAgICAgICAgICAgICAgIHNtYWxsdmFsID0gcVsxXTsgLy8gaW5kZXggb24gZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHEgPSBuZXR3b3JrW3NtYWxscG9zXTtcbiAgICAgICAgICAgIC8vIHN3YXAgcCAoaSkgYW5kIHEgKHNtYWxscG9zKSBlbnRyaWVzXG4gICAgICAgICAgICBpZiAoaSAhPSBzbWFsbHBvcykge1xuICAgICAgICAgICAgICAgIGogPSBxWzBdO1xuICAgICAgICAgICAgICAgIHFbMF0gPSBwWzBdO1xuICAgICAgICAgICAgICAgIHBbMF0gPSBqO1xuICAgICAgICAgICAgICAgIGogPSBxWzFdO1xuICAgICAgICAgICAgICAgIHFbMV0gPSBwWzFdO1xuICAgICAgICAgICAgICAgIHBbMV0gPSBqO1xuICAgICAgICAgICAgICAgIGogPSBxWzJdO1xuICAgICAgICAgICAgICAgIHFbMl0gPSBwWzJdO1xuICAgICAgICAgICAgICAgIHBbMl0gPSBqO1xuICAgICAgICAgICAgICAgIGogPSBxWzNdO1xuICAgICAgICAgICAgICAgIHFbM10gPSBwWzNdO1xuICAgICAgICAgICAgICAgIHBbM10gPSBqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc21hbGx2YWwgZW50cnkgaXMgbm93IGluIHBvc2l0aW9uIGlcbiAgICAgICAgICAgIGlmIChzbWFsbHZhbCAhPSBwcmV2aW91c2NvbCkge1xuICAgICAgICAgICAgICAgIG5ldGluZGV4W3ByZXZpb3VzY29sXSA9IChzdGFydHBvcyArIGkpID4+IDE7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gcHJldmlvdXNjb2wgKyAxOyBqIDwgc21hbGx2YWw7IGorKylcbiAgICAgICAgICAgICAgICAgICAgbmV0aW5kZXhbal0gPSBpO1xuICAgICAgICAgICAgICAgIHByZXZpb3VzY29sID0gc21hbGx2YWw7XG4gICAgICAgICAgICAgICAgc3RhcnRwb3MgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIG5ldGluZGV4W3ByZXZpb3VzY29sXSA9IChzdGFydHBvcyArIG1heG5ldHBvcykgPj4gMTtcbiAgICAgICAgZm9yIChqID0gcHJldmlvdXNjb2wgKyAxOyBqIDwgMjU2OyBqKyspXG4gICAgICAgICAgICBuZXRpbmRleFtqXSA9IG1heG5ldHBvczsgLy8gcmVhbGx5IDI1NlxuICAgIH1cbiAgICAvKlxuICAgICAgUHJpdmF0ZSBNZXRob2Q6IGlueHNlYXJjaFxuICBcbiAgICAgIHNlYXJjaGVzIGZvciBCR1IgdmFsdWVzIDAuLjI1NSBhbmQgcmV0dXJucyBhIGNvbG9yIGluZGV4XG4gICAgKi9cbiAgICBmdW5jdGlvbiBpbnhzZWFyY2goYiwgZywgcikge1xuICAgICAgICB2YXIgYSwgcCwgZGlzdDtcbiAgICAgICAgdmFyIGJlc3RkID0gMTAwMDsgLy8gYmlnZ2VzdCBwb3NzaWJsZSBkaXN0IGlzIDI1NiozXG4gICAgICAgIHZhciBiZXN0ID0gLTE7XG4gICAgICAgIHZhciBpID0gbmV0aW5kZXhbZ107IC8vIGluZGV4IG9uIGdcbiAgICAgICAgdmFyIGogPSBpIC0gMTsgLy8gc3RhcnQgYXQgbmV0aW5kZXhbZ10gYW5kIHdvcmsgb3V0d2FyZHNcbiAgICAgICAgd2hpbGUgKChpIDwgbmV0c2l6ZSkgfHwgKGogPj0gMCkpIHtcbiAgICAgICAgICAgIGlmIChpIDwgbmV0c2l6ZSkge1xuICAgICAgICAgICAgICAgIHAgPSBuZXR3b3JrW2ldO1xuICAgICAgICAgICAgICAgIGRpc3QgPSBwWzFdIC0gZzsgLy8gaW54IGtleVxuICAgICAgICAgICAgICAgIGlmIChkaXN0ID49IGJlc3RkKVxuICAgICAgICAgICAgICAgICAgICBpID0gbmV0c2l6ZTsgLy8gc3RvcCBpdGVyXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3QgPCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdCA9IC1kaXN0O1xuICAgICAgICAgICAgICAgICAgICBhID0gcFswXSAtIGI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhIDwgMClcbiAgICAgICAgICAgICAgICAgICAgICAgIGEgPSAtYTtcbiAgICAgICAgICAgICAgICAgICAgZGlzdCArPSBhO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGlzdCA8IGJlc3RkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhID0gcFsyXSAtIHI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYSA8IDApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYSA9IC1hO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdCArPSBhO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3QgPCBiZXN0ZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RkID0gZGlzdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0ID0gcFszXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChqID49IDApIHtcbiAgICAgICAgICAgICAgICBwID0gbmV0d29ya1tqXTtcbiAgICAgICAgICAgICAgICBkaXN0ID0gZyAtIHBbMV07IC8vIGlueCBrZXkgLSByZXZlcnNlIGRpZlxuICAgICAgICAgICAgICAgIGlmIChkaXN0ID49IGJlc3RkKVxuICAgICAgICAgICAgICAgICAgICBqID0gLTE7IC8vIHN0b3AgaXRlclxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBqLS07XG4gICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgMClcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3QgPSAtZGlzdDtcbiAgICAgICAgICAgICAgICAgICAgYSA9IHBbMF0gLSBiO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYSA8IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBhID0gLWE7XG4gICAgICAgICAgICAgICAgICAgIGRpc3QgKz0gYTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRpc3QgPCBiZXN0ZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYSA9IHBbMl0gLSByO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGEgPCAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgPSAtYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3QgKz0gYTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkaXN0IDwgYmVzdGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZXN0ZCA9IGRpc3Q7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVzdCA9IHBbM107XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJlc3Q7XG4gICAgfVxuICAgIC8qXG4gICAgICBQcml2YXRlIE1ldGhvZDogbGVhcm5cbiAgXG4gICAgICBcIk1haW4gTGVhcm5pbmcgTG9vcFwiXG4gICAgKi9cbiAgICBmdW5jdGlvbiBsZWFybigpIHtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciBsZW5ndGhjb3VudCA9IHBpeGVscy5sZW5ndGg7XG4gICAgICAgIHZhciBhbHBoYWRlYyA9IDMwICsgKChzYW1wbGVmYWMgLSAxKSAvIDMpO1xuICAgICAgICB2YXIgc2FtcGxlcGl4ZWxzID0gbGVuZ3RoY291bnQgLyAoMyAqIHNhbXBsZWZhYyk7XG4gICAgICAgIHZhciBkZWx0YSA9IH5+KHNhbXBsZXBpeGVscyAvIG5jeWNsZXMpO1xuICAgICAgICB2YXIgYWxwaGEgPSBpbml0YWxwaGE7XG4gICAgICAgIHZhciByYWRpdXMgPSBpbml0cmFkaXVzO1xuICAgICAgICB2YXIgcmFkID0gcmFkaXVzID4+IHJhZGl1c2JpYXNzaGlmdDtcbiAgICAgICAgaWYgKHJhZCA8PSAxKVxuICAgICAgICAgICAgcmFkID0gMDtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHJhZDsgaSsrKVxuICAgICAgICAgICAgcmFkcG93ZXJbaV0gPSBhbHBoYSAqICgoKHJhZCAqIHJhZCAtIGkgKiBpKSAqIHJhZGJpYXMpIC8gKHJhZCAqIHJhZCkpO1xuICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgaWYgKGxlbmd0aGNvdW50IDwgbWlucGljdHVyZWJ5dGVzKSB7XG4gICAgICAgICAgICBzYW1wbGVmYWMgPSAxO1xuICAgICAgICAgICAgc3RlcCA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKGxlbmd0aGNvdW50ICUgcHJpbWUxKSAhPT0gMCkge1xuICAgICAgICAgICAgc3RlcCA9IDMgKiBwcmltZTE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKGxlbmd0aGNvdW50ICUgcHJpbWUyKSAhPT0gMCkge1xuICAgICAgICAgICAgc3RlcCA9IDMgKiBwcmltZTI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoKGxlbmd0aGNvdW50ICUgcHJpbWUzKSAhPT0gMCkge1xuICAgICAgICAgICAgc3RlcCA9IDMgKiBwcmltZTM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzdGVwID0gMyAqIHByaW1lNDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYiwgZywgciwgajtcbiAgICAgICAgdmFyIHBpeCA9IDA7IC8vIGN1cnJlbnQgcGl4ZWxcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHdoaWxlIChpIDwgc2FtcGxlcGl4ZWxzKSB7XG4gICAgICAgICAgICBiID0gKHBpeGVsc1twaXhdICYgMHhmZikgPDwgbmV0Ymlhc3NoaWZ0O1xuICAgICAgICAgICAgZyA9IChwaXhlbHNbcGl4ICsgMV0gJiAweGZmKSA8PCBuZXRiaWFzc2hpZnQ7XG4gICAgICAgICAgICByID0gKHBpeGVsc1twaXggKyAyXSAmIDB4ZmYpIDw8IG5ldGJpYXNzaGlmdDtcbiAgICAgICAgICAgIGogPSBjb250ZXN0KGIsIGcsIHIpO1xuICAgICAgICAgICAgYWx0ZXJzaW5nbGUoYWxwaGEsIGosIGIsIGcsIHIpO1xuICAgICAgICAgICAgaWYgKHJhZCAhPT0gMClcbiAgICAgICAgICAgICAgICBhbHRlcm5laWdoKHJhZCwgaiwgYiwgZywgcik7IC8vIGFsdGVyIG5laWdoYm91cnNcbiAgICAgICAgICAgIHBpeCArPSBzdGVwO1xuICAgICAgICAgICAgaWYgKHBpeCA+PSBsZW5ndGhjb3VudClcbiAgICAgICAgICAgICAgICBwaXggLT0gbGVuZ3RoY291bnQ7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgICAgICBpZiAoZGVsdGEgPT09IDApXG4gICAgICAgICAgICAgICAgZGVsdGEgPSAxO1xuICAgICAgICAgICAgaWYgKGkgJSBkZWx0YSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGFscGhhIC09IGFscGhhIC8gYWxwaGFkZWM7XG4gICAgICAgICAgICAgICAgcmFkaXVzIC09IHJhZGl1cyAvIHJhZGl1c2RlYztcbiAgICAgICAgICAgICAgICByYWQgPSByYWRpdXMgPj4gcmFkaXVzYmlhc3NoaWZ0O1xuICAgICAgICAgICAgICAgIGlmIChyYWQgPD0gMSlcbiAgICAgICAgICAgICAgICAgICAgcmFkID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgcmFkOyBqKyspXG4gICAgICAgICAgICAgICAgICAgIHJhZHBvd2VyW2pdID0gYWxwaGEgKiAoKChyYWQgKiByYWQgLSBqICogaikgKiByYWRiaWFzKSAvIChyYWQgKiByYWQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvKlxuICAgICAgTWV0aG9kOiBidWlsZENvbG9ybWFwXG4gIFxuICAgICAgMS4gaW5pdGlhbGl6ZXMgbmV0d29ya1xuICAgICAgMi4gdHJhaW5zIGl0XG4gICAgICAzLiByZW1vdmVzIG1pc2NvbmNlcHRpb25zXG4gICAgICA0LiBidWlsZHMgY29sb3JpbmRleFxuICAgICovXG4gICAgZnVuY3Rpb24gYnVpbGRDb2xvcm1hcCgpIHtcbiAgICAgICAgaW5pdCgpO1xuICAgICAgICBsZWFybigpO1xuICAgICAgICB1bmJpYXNuZXQoKTtcbiAgICAgICAgaW54YnVpbGQoKTtcbiAgICB9XG4gICAgdGhpcy5idWlsZENvbG9ybWFwID0gYnVpbGRDb2xvcm1hcDtcbiAgICAvKlxuICAgICAgTWV0aG9kOiBnZXRDb2xvcm1hcFxuICBcbiAgICAgIGJ1aWxkcyBjb2xvcm1hcCBmcm9tIHRoZSBpbmRleFxuICBcbiAgICAgIHJldHVybnMgYXJyYXkgaW4gdGhlIGZvcm1hdDpcbiAgXG4gICAgICA+XG4gICAgICA+IFtyLCBnLCBiLCByLCBnLCBiLCByLCBnLCBiLCAuLl1cbiAgICAgID5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGdldENvbG9ybWFwKCkge1xuICAgICAgICB2YXIgbWFwID0gW107XG4gICAgICAgIHZhciBpbmRleCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ldHNpemU7IGkrKylcbiAgICAgICAgICAgIGluZGV4W25ldHdvcmtbaV1bM11dID0gaTtcbiAgICAgICAgdmFyIGsgPSAwO1xuICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IG5ldHNpemU7IGwrKykge1xuICAgICAgICAgICAgdmFyIGogPSBpbmRleFtsXTtcbiAgICAgICAgICAgIG1hcFtrKytdID0gKG5ldHdvcmtbal1bMF0pO1xuICAgICAgICAgICAgbWFwW2srK10gPSAobmV0d29ya1tqXVsxXSk7XG4gICAgICAgICAgICBtYXBbaysrXSA9IChuZXR3b3JrW2pdWzJdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFwO1xuICAgIH1cbiAgICB0aGlzLmdldENvbG9ybWFwID0gZ2V0Q29sb3JtYXA7XG4gICAgLypcbiAgICAgIE1ldGhvZDogbG9va3VwUkdCXG4gIFxuICAgICAgbG9va3MgZm9yIHRoZSBjbG9zZXN0ICpyKiwgKmcqLCAqYiogY29sb3IgaW4gdGhlIG1hcCBhbmRcbiAgICAgIHJldHVybnMgaXRzIGluZGV4XG4gICAgKi9cbiAgICB0aGlzLmxvb2t1cFJHQiA9IGlueHNlYXJjaDtcbn1cbm1vZHVsZS5leHBvcnRzID0gTmV1UXVhbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogRGVpbnRlcmxhY2UgZnVuY3Rpb24gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vc2hhY2hhZi9qc2dpZlxuICovXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmRlaW50ZXJsYWNlID0gdm9pZCAwO1xuZXhwb3J0cy5kZWludGVybGFjZSA9IGZ1bmN0aW9uIChwaXhlbHMsIHdpZHRoKSB7XG4gICAgdmFyIG5ld1BpeGVscyA9IG5ldyBBcnJheShwaXhlbHMubGVuZ3RoKTtcbiAgICB2YXIgcm93cyA9IHBpeGVscy5sZW5ndGggLyB3aWR0aDtcbiAgICB2YXIgY3BSb3cgPSBmdW5jdGlvbiAodG9Sb3csIGZyb21Sb3cpIHtcbiAgICAgICAgdmFyIGZyb21QaXhlbHMgPSBwaXhlbHMuc2xpY2UoZnJvbVJvdyAqIHdpZHRoLCAoZnJvbVJvdyArIDEpICogd2lkdGgpO1xuICAgICAgICBuZXdQaXhlbHMuc3BsaWNlLmFwcGx5KG5ld1BpeGVscywgW3RvUm93ICogd2lkdGgsIHdpZHRoXS5jb25jYXQoZnJvbVBpeGVscykpO1xuICAgIH07XG4gICAgLy8gU2VlIGFwcGVuZGl4IEUuXG4gICAgdmFyIG9mZnNldHMgPSBbMCwgNCwgMiwgMV07XG4gICAgdmFyIHN0ZXBzID0gWzgsIDgsIDQsIDJdO1xuICAgIHZhciBmcm9tUm93ID0gMDtcbiAgICBmb3IgKHZhciBwYXNzID0gMDsgcGFzcyA8IDQ7IHBhc3MrKykge1xuICAgICAgICBmb3IgKHZhciB0b1JvdyA9IG9mZnNldHNbcGFzc107IHRvUm93IDwgcm93czsgdG9Sb3cgKz0gc3RlcHNbcGFzc10pIHtcbiAgICAgICAgICAgIGNwUm93KHRvUm93LCBmcm9tUm93KTtcbiAgICAgICAgICAgIGZyb21Sb3crKztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbmV3UGl4ZWxzO1xufTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9faW1wb3J0RGVmYXVsdCA9ICh0aGlzICYmIHRoaXMuX19pbXBvcnREZWZhdWx0KSB8fCBmdW5jdGlvbiAobW9kKSB7XG4gICAgcmV0dXJuIChtb2QgJiYgbW9kLl9fZXNNb2R1bGUpID8gbW9kIDogeyBcImRlZmF1bHRcIjogbW9kIH07XG59O1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5kZWNvbXByZXNzRnJhbWVzID0gZXhwb3J0cy5kZWNvbXByZXNzRnJhbWUgPSBleHBvcnRzLnBhcnNlR0lGID0gdm9pZCAwO1xudmFyIGdpZl8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJqcy1iaW5hcnktc2NoZW1hLXBhcnNlci9saWIvc2NoZW1hcy9naWZcIikpO1xudmFyIGpzX2JpbmFyeV9zY2hlbWFfcGFyc2VyXzEgPSByZXF1aXJlKFwianMtYmluYXJ5LXNjaGVtYS1wYXJzZXJcIik7XG52YXIgdWludDhfMSA9IHJlcXVpcmUoXCJqcy1iaW5hcnktc2NoZW1hLXBhcnNlci9saWIvcGFyc2Vycy91aW50OFwiKTtcbnZhciBkZWludGVybGFjZV8xID0gcmVxdWlyZShcIi4vZGVpbnRlcmxhY2VcIik7XG52YXIgbHp3XzEgPSByZXF1aXJlKFwiLi9sendcIik7XG5leHBvcnRzLnBhcnNlR0lGID0gZnVuY3Rpb24gKGFycmF5QnVmZmVyKSB7XG4gICAgdmFyIGJ5dGVEYXRhID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpO1xuICAgIHJldHVybiBqc19iaW5hcnlfc2NoZW1hX3BhcnNlcl8xLnBhcnNlKHVpbnQ4XzEuYnVpbGRTdHJlYW0oYnl0ZURhdGEpLCBnaWZfMS5kZWZhdWx0KTtcbn07XG52YXIgZ2VuZXJhdGVQYXRjaCA9IGZ1bmN0aW9uIChpbWFnZSkge1xuICAgIHZhciB0b3RhbFBpeGVscyA9IGltYWdlLnBpeGVscy5sZW5ndGg7XG4gICAgdmFyIHBhdGNoRGF0YSA9IG5ldyBVaW50OENsYW1wZWRBcnJheSh0b3RhbFBpeGVscyAqIDQpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxQaXhlbHM7IGkrKykge1xuICAgICAgICB2YXIgcG9zID0gaSAqIDQ7XG4gICAgICAgIHZhciBjb2xvckluZGV4ID0gaW1hZ2UucGl4ZWxzW2ldO1xuICAgICAgICB2YXIgY29sb3IgPSBpbWFnZS5jb2xvclRhYmxlW2NvbG9ySW5kZXhdO1xuICAgICAgICBwYXRjaERhdGFbcG9zXSA9IGNvbG9yWzBdO1xuICAgICAgICBwYXRjaERhdGFbcG9zICsgMV0gPSBjb2xvclsxXTtcbiAgICAgICAgcGF0Y2hEYXRhW3BvcyArIDJdID0gY29sb3JbMl07XG4gICAgICAgIHBhdGNoRGF0YVtwb3MgKyAzXSA9IGNvbG9ySW5kZXggIT09IGltYWdlLnRyYW5zcGFyZW50SW5kZXggPyAyNTUgOiAwO1xuICAgIH1cbiAgICByZXR1cm4gcGF0Y2hEYXRhO1xufTtcbmV4cG9ydHMuZGVjb21wcmVzc0ZyYW1lID0gZnVuY3Rpb24gKGZyYW1lLCBnY3QsIGJ1aWxkSW1hZ2VQYXRjaCkge1xuICAgIGlmICghZnJhbWUuaW1hZ2UpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdnaWYgZnJhbWUgZG9lcyBub3QgaGF2ZSBhc3NvY2lhdGVkIGltYWdlLicpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpbWFnZSA9IGZyYW1lLmltYWdlO1xuICAgIC8vIGdldCB0aGUgbnVtYmVyIG9mIHBpeGVsc1xuICAgIHZhciB0b3RhbFBpeGVscyA9IGltYWdlLmRlc2NyaXB0b3Iud2lkdGggKiBpbWFnZS5kZXNjcmlwdG9yLmhlaWdodDtcbiAgICAvLyBkbyBsencgZGVjb21wcmVzc2lvblxuICAgIHZhciBwaXhlbHMgPSBsendfMS5sencoaW1hZ2UuZGF0YS5taW5Db2RlU2l6ZSwgaW1hZ2UuZGF0YS5ibG9ja3MsIHRvdGFsUGl4ZWxzKTtcbiAgICAvLyBkZWFsIHdpdGggaW50ZXJsYWNpbmcgaWYgbmVjZXNzYXJ5XG4gICAgaWYgKGltYWdlLmRlc2NyaXB0b3IubGN0LmludGVybGFjZWQpIHtcbiAgICAgICAgcGl4ZWxzID0gZGVpbnRlcmxhY2VfMS5kZWludGVybGFjZShwaXhlbHMsIGltYWdlLmRlc2NyaXB0b3Iud2lkdGgpO1xuICAgIH1cbiAgICB2YXIgcmVzdWx0SW1hZ2UgPSB7XG4gICAgICAgIHBpeGVsczogcGl4ZWxzLFxuICAgICAgICBkaW1zOiB7XG4gICAgICAgICAgICB0b3A6IGZyYW1lLmltYWdlLmRlc2NyaXB0b3IudG9wLFxuICAgICAgICAgICAgbGVmdDogZnJhbWUuaW1hZ2UuZGVzY3JpcHRvci5sZWZ0LFxuICAgICAgICAgICAgd2lkdGg6IGZyYW1lLmltYWdlLmRlc2NyaXB0b3Iud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGZyYW1lLmltYWdlLmRlc2NyaXB0b3IuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9O1xuICAgIC8vIGNvbG9yIHRhYmxlXG4gICAgaWYgKGltYWdlLmRlc2NyaXB0b3IubGN0ICYmIGltYWdlLmRlc2NyaXB0b3IubGN0LmV4aXN0cykge1xuICAgICAgICByZXN1bHRJbWFnZS5jb2xvclRhYmxlID0gaW1hZ2UubGN0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmVzdWx0SW1hZ2UuY29sb3JUYWJsZSA9IGdjdDtcbiAgICB9XG4gICAgLy8gYWRkIHBlciBmcmFtZSByZWxldmFudCBnY2UgaW5mb3JtYXRpb25cbiAgICBpZiAoZnJhbWUuZ2NlKSB7XG4gICAgICAgIHJlc3VsdEltYWdlLmRlbGF5ID0gKGZyYW1lLmdjZS5kZWxheSB8fCAxMCkgKiAxMDsgLy8gY29udmVydCB0byBtc1xuICAgICAgICByZXN1bHRJbWFnZS5kaXNwb3NhbFR5cGUgPSBmcmFtZS5nY2UuZXh0cmFzLmRpc3Bvc2FsO1xuICAgICAgICAvLyB0cmFuc3BhcmVuY3lcbiAgICAgICAgaWYgKGZyYW1lLmdjZS5leHRyYXMudHJhbnNwYXJlbnRDb2xvckdpdmVuKSB7XG4gICAgICAgICAgICByZXN1bHRJbWFnZS50cmFuc3BhcmVudEluZGV4ID0gZnJhbWUuZ2NlLnRyYW5zcGFyZW50Q29sb3JJbmRleDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBjcmVhdGUgY2FudmFzIHVzYWJsZSBpbWFnZWRhdGEgaWYgZGVzaXJlZFxuICAgIGlmIChidWlsZEltYWdlUGF0Y2gpIHtcbiAgICAgICAgcmVzdWx0SW1hZ2UucGF0Y2ggPSBnZW5lcmF0ZVBhdGNoKHJlc3VsdEltYWdlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdEltYWdlO1xufTtcbmV4cG9ydHMuZGVjb21wcmVzc0ZyYW1lcyA9IGZ1bmN0aW9uIChwYXJzZWRHaWYsIGJ1aWxkSW1hZ2VQYXRjaGVzKSB7XG4gICAgcmV0dXJuIHBhcnNlZEdpZi5mcmFtZXNcbiAgICAgICAgLmZpbHRlcihmdW5jdGlvbiAoZikgeyByZXR1cm4gZi5pbWFnZTsgfSlcbiAgICAgICAgLm1hcChmdW5jdGlvbiAoZikgeyByZXR1cm4gZXhwb3J0cy5kZWNvbXByZXNzRnJhbWUoZiwgcGFyc2VkR2lmLmdjdCwgYnVpbGRJbWFnZVBhdGNoZXMpOyB9KTtcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogamF2YXNjcmlwdCBwb3J0IG9mIGphdmEgTFpXIGRlY29tcHJlc3Npb25cbiAqIE9yaWdpbmFsIGphdmEgYXV0aG9yIHVybDogaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vZGV2dW53aXJlZC80NDc5MjMxXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMubHp3ID0gdm9pZCAwO1xuZXhwb3J0cy5sencgPSBmdW5jdGlvbiAobWluQ29kZVNpemUsIGRhdGEsIHBpeGVsQ291bnQpIHtcbiAgICB2YXIgTUFYX1NUQUNLX1NJWkUgPSA0MDk2O1xuICAgIHZhciBudWxsQ29kZSA9IC0xO1xuICAgIHZhciBucGl4ID0gcGl4ZWxDb3VudDtcbiAgICB2YXIgYXZhaWxhYmxlLCBjbGVhciwgY29kZV9tYXNrLCBjb2RlX3NpemUsIGVuZF9vZl9pbmZvcm1hdGlvbiwgaW5fY29kZSwgb2xkX2NvZGUsIGJpdHMsIGNvZGUsIGksIGRhdHVtLCBkYXRhX3NpemUsIGZpcnN0LCB0b3AsIGJpLCBwaTtcbiAgICB2YXIgZHN0UGl4ZWxzID0gbmV3IEFycmF5KHBpeGVsQ291bnQpO1xuICAgIHZhciBwcmVmaXggPSBuZXcgQXJyYXkoTUFYX1NUQUNLX1NJWkUpO1xuICAgIHZhciBzdWZmaXggPSBuZXcgQXJyYXkoTUFYX1NUQUNLX1NJWkUpO1xuICAgIHZhciBwaXhlbFN0YWNrID0gbmV3IEFycmF5KE1BWF9TVEFDS19TSVpFICsgMSk7XG4gICAgLy8gSW5pdGlhbGl6ZSBHSUYgZGF0YSBzdHJlYW0gZGVjb2Rlci5cbiAgICBkYXRhX3NpemUgPSBtaW5Db2RlU2l6ZTtcbiAgICBjbGVhciA9IDEgPDwgZGF0YV9zaXplO1xuICAgIGVuZF9vZl9pbmZvcm1hdGlvbiA9IGNsZWFyICsgMTtcbiAgICBhdmFpbGFibGUgPSBjbGVhciArIDI7XG4gICAgb2xkX2NvZGUgPSBudWxsQ29kZTtcbiAgICBjb2RlX3NpemUgPSBkYXRhX3NpemUgKyAxO1xuICAgIGNvZGVfbWFzayA9ICgxIDw8IGNvZGVfc2l6ZSkgLSAxO1xuICAgIGZvciAoY29kZSA9IDA7IGNvZGUgPCBjbGVhcjsgY29kZSsrKSB7XG4gICAgICAgIHByZWZpeFtjb2RlXSA9IDA7XG4gICAgICAgIHN1ZmZpeFtjb2RlXSA9IGNvZGU7XG4gICAgfVxuICAgIC8vIERlY29kZSBHSUYgcGl4ZWwgc3RyZWFtLlxuICAgIHZhciBkYXR1bSwgYml0cywgY291bnQsIGZpcnN0LCB0b3AsIHBpLCBiaTtcbiAgICBkYXR1bSA9IGJpdHMgPSBjb3VudCA9IGZpcnN0ID0gdG9wID0gcGkgPSBiaSA9IDA7XG4gICAgZm9yIChpID0gMDsgaSA8IG5waXg7KSB7XG4gICAgICAgIGlmICh0b3AgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChiaXRzIDwgY29kZV9zaXplKSB7XG4gICAgICAgICAgICAgICAgLy8gZ2V0IHRoZSBuZXh0IGJ5dGVcbiAgICAgICAgICAgICAgICBkYXR1bSArPSBkYXRhW2JpXSA8PCBiaXRzO1xuICAgICAgICAgICAgICAgIGJpdHMgKz0gODtcbiAgICAgICAgICAgICAgICBiaSsrO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gR2V0IHRoZSBuZXh0IGNvZGUuXG4gICAgICAgICAgICBjb2RlID0gZGF0dW0gJiBjb2RlX21hc2s7XG4gICAgICAgICAgICBkYXR1bSA+Pj0gY29kZV9zaXplO1xuICAgICAgICAgICAgYml0cyAtPSBjb2RlX3NpemU7XG4gICAgICAgICAgICAvLyBJbnRlcnByZXQgdGhlIGNvZGVcbiAgICAgICAgICAgIGlmIChjb2RlID4gYXZhaWxhYmxlIHx8IGNvZGUgPT0gZW5kX29mX2luZm9ybWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY29kZSA9PSBjbGVhcikge1xuICAgICAgICAgICAgICAgIC8vIFJlc2V0IGRlY29kZXIuXG4gICAgICAgICAgICAgICAgY29kZV9zaXplID0gZGF0YV9zaXplICsgMTtcbiAgICAgICAgICAgICAgICBjb2RlX21hc2sgPSAoMSA8PCBjb2RlX3NpemUpIC0gMTtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGUgPSBjbGVhciArIDI7XG4gICAgICAgICAgICAgICAgb2xkX2NvZGUgPSBudWxsQ29kZTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvbGRfY29kZSA9PSBudWxsQ29kZSkge1xuICAgICAgICAgICAgICAgIHBpeGVsU3RhY2tbdG9wKytdID0gc3VmZml4W2NvZGVdO1xuICAgICAgICAgICAgICAgIG9sZF9jb2RlID0gY29kZTtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IGNvZGU7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbl9jb2RlID0gY29kZTtcbiAgICAgICAgICAgIGlmIChjb2RlID09IGF2YWlsYWJsZSkge1xuICAgICAgICAgICAgICAgIHBpeGVsU3RhY2tbdG9wKytdID0gZmlyc3Q7XG4gICAgICAgICAgICAgICAgY29kZSA9IG9sZF9jb2RlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGNvZGUgPiBjbGVhcikge1xuICAgICAgICAgICAgICAgIHBpeGVsU3RhY2tbdG9wKytdID0gc3VmZml4W2NvZGVdO1xuICAgICAgICAgICAgICAgIGNvZGUgPSBwcmVmaXhbY29kZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmaXJzdCA9IHN1ZmZpeFtjb2RlXSAmIDB4ZmY7XG4gICAgICAgICAgICBwaXhlbFN0YWNrW3RvcCsrXSA9IGZpcnN0O1xuICAgICAgICAgICAgLy8gYWRkIGEgbmV3IHN0cmluZyB0byB0aGUgdGFibGUsIGJ1dCBvbmx5IGlmIHNwYWNlIGlzIGF2YWlsYWJsZVxuICAgICAgICAgICAgLy8gaWYgbm90LCBqdXN0IGNvbnRpbnVlIHdpdGggY3VycmVudCB0YWJsZSB1bnRpbCBhIGNsZWFyIGNvZGUgaXMgZm91bmRcbiAgICAgICAgICAgIC8vIChkZWZlcnJlZCBjbGVhciBjb2RlIGltcGxlbWVudGF0aW9uIGFzIHBlciBHSUYgc3BlYylcbiAgICAgICAgICAgIGlmIChhdmFpbGFibGUgPCBNQVhfU1RBQ0tfU0laRSkge1xuICAgICAgICAgICAgICAgIHByZWZpeFthdmFpbGFibGVdID0gb2xkX2NvZGU7XG4gICAgICAgICAgICAgICAgc3VmZml4W2F2YWlsYWJsZV0gPSBmaXJzdDtcbiAgICAgICAgICAgICAgICBhdmFpbGFibGUrKztcbiAgICAgICAgICAgICAgICBpZiAoKGF2YWlsYWJsZSAmIGNvZGVfbWFzaykgPT09IDAgJiYgYXZhaWxhYmxlIDwgTUFYX1NUQUNLX1NJWkUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29kZV9zaXplKys7XG4gICAgICAgICAgICAgICAgICAgIGNvZGVfbWFzayArPSBhdmFpbGFibGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2xkX2NvZGUgPSBpbl9jb2RlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFBvcCBhIHBpeGVsIG9mZiB0aGUgcGl4ZWwgc3RhY2suXG4gICAgICAgIHRvcC0tO1xuICAgICAgICBkc3RQaXhlbHNbcGkrK10gPSBwaXhlbFN0YWNrW3RvcF07XG4gICAgICAgIGkrKztcbiAgICB9XG4gICAgZm9yIChpID0gcGk7IGkgPCBucGl4OyBpKyspIHtcbiAgICAgICAgZHN0UGl4ZWxzW2ldID0gMDsgLy8gY2xlYXIgbWlzc2luZyBwaXhlbHNcbiAgICB9XG4gICAgcmV0dXJuIGRzdFBpeGVscztcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2NyZWF0ZUJpbmRpbmcgPSAodGhpcyAmJiB0aGlzLl9fY3JlYXRlQmluZGluZykgfHwgKE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcbiAgICBvW2syXSA9IG1ba107XG59KSk7XG52YXIgX19leHBvcnRTdGFyID0gKHRoaXMgJiYgdGhpcy5fX2V4cG9ydFN0YXIpIHx8IGZ1bmN0aW9uKG0sIGV4cG9ydHMpIHtcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhZXhwb3J0cy5oYXNPd25Qcm9wZXJ0eShwKSkgX19jcmVhdGVCaW5kaW5nKGV4cG9ydHMsIG0sIHApO1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbl9fZXhwb3J0U3RhcihyZXF1aXJlKFwiLi9xcmNvZGVcIiksIGV4cG9ydHMpO1xudmFyIGF3ZXNvbWVfcXJfMSA9IHJlcXVpcmUoXCIuL2F3ZXNvbWUtcXJcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBd2Vzb21lUVJcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGF3ZXNvbWVfcXJfMS5Bd2Vzb21lUVI7IH0gfSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBRUkNvZGUgZm9yIEphdmFTY3JpcHRcbi8vXG4vLyBDb3B5cmlnaHQgKGMpIDIwMDkgS2F6dWhpa28gQXJhc2Vcbi8vIFJlLXdyaXR0ZW4gaW4gVHlwZVNjcmlwdCBieSBNYWtpdG8gPHN1bWltYWtpdG9AaG90bWFpbC5jb20+XG4vL1xuLy8gVVJMOiBodHRwOi8vd3d3LmQtcHJvamVjdC5jb20vXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOlxuLy8gICBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuLy9cbi8vIFRoZSB3b3JkIFwiUVIgQ29kZVwiIGlzIHJlZ2lzdGVyZWQgdHJhZGVtYXJrIG9mXG4vLyBERU5TTyBXQVZFIElOQ09SUE9SQVRFRFxuLy8gICBodHRwOi8vd3d3LmRlbnNvLXdhdmUuY29tL3FyY29kZS9mYXFwYXRlbnQtZS5odG1sXG4vL1xuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuUVJNYXRoID0gZXhwb3J0cy5RUlV0aWwgPSBleHBvcnRzLlFSTWFza1BhdHRlcm4gPSBleHBvcnRzLlFSRXJyb3JDb3JyZWN0TGV2ZWwgPSBleHBvcnRzLlFSQ29kZU1vZGVsID0gdm9pZCAwO1xuZnVuY3Rpb24gY2hlY2tRUlZlcnNpb24odmVyc2lvbiwgc1RleHQsIG5Db3JyZWN0TGV2ZWwpIHtcbiAgICB2YXIgbGVuZ3RoID0gX2dldFVURjhMZW5ndGgoc1RleHQpO1xuICAgIHZhciBpID0gdmVyc2lvbiAtIDE7XG4gICAgdmFyIG5MaW1pdCA9IDA7XG4gICAgc3dpdGNoIChuQ29ycmVjdExldmVsKSB7XG4gICAgICAgIGNhc2UgZXhwb3J0cy5RUkVycm9yQ29ycmVjdExldmVsLkw6XG4gICAgICAgICAgICBuTGltaXQgPSBRUkNvZGVMaW1pdExlbmd0aFtpXVswXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGV4cG9ydHMuUVJFcnJvckNvcnJlY3RMZXZlbC5NOlxuICAgICAgICAgICAgbkxpbWl0ID0gUVJDb2RlTGltaXRMZW5ndGhbaV1bMV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBleHBvcnRzLlFSRXJyb3JDb3JyZWN0TGV2ZWwuUTpcbiAgICAgICAgICAgIG5MaW1pdCA9IFFSQ29kZUxpbWl0TGVuZ3RoW2ldWzJdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZXhwb3J0cy5RUkVycm9yQ29ycmVjdExldmVsLkg6XG4gICAgICAgICAgICBuTGltaXQgPSBRUkNvZGVMaW1pdExlbmd0aFtpXVszXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICByZXR1cm4gbGVuZ3RoIDw9IG5MaW1pdDtcbn1cbmZ1bmN0aW9uIF9nZXRUeXBlTnVtYmVyKHNUZXh0LCBuQ29ycmVjdExldmVsKSB7XG4gICAgdmFyIG5UeXBlID0gMTtcbiAgICB2YXIgbGVuZ3RoID0gX2dldFVURjhMZW5ndGgoc1RleHQpO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBRUkNvZGVMaW1pdExlbmd0aC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgbkxpbWl0ID0gMDtcbiAgICAgICAgc3dpdGNoIChuQ29ycmVjdExldmVsKSB7XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuUVJFcnJvckNvcnJlY3RMZXZlbC5MOlxuICAgICAgICAgICAgICAgIG5MaW1pdCA9IFFSQ29kZUxpbWl0TGVuZ3RoW2ldWzBdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBleHBvcnRzLlFSRXJyb3JDb3JyZWN0TGV2ZWwuTTpcbiAgICAgICAgICAgICAgICBuTGltaXQgPSBRUkNvZGVMaW1pdExlbmd0aFtpXVsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5RUkVycm9yQ29ycmVjdExldmVsLlE6XG4gICAgICAgICAgICAgICAgbkxpbWl0ID0gUVJDb2RlTGltaXRMZW5ndGhbaV1bMl07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuUVJFcnJvckNvcnJlY3RMZXZlbC5IOlxuICAgICAgICAgICAgICAgIG5MaW1pdCA9IFFSQ29kZUxpbWl0TGVuZ3RoW2ldWzNdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsZW5ndGggPD0gbkxpbWl0KSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG5UeXBlKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKG5UeXBlID4gUVJDb2RlTGltaXRMZW5ndGgubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRvbyBsb25nIGRhdGFcIik7XG4gICAgfVxuICAgIHJldHVybiBuVHlwZTtcbn1cbmZ1bmN0aW9uIF9nZXRVVEY4TGVuZ3RoKHNUZXh0KSB7XG4gICAgdmFyIHJlcGxhY2VkVGV4dCA9IGVuY29kZVVSSShzVGV4dClcbiAgICAgICAgLnRvU3RyaW5nKClcbiAgICAgICAgLnJlcGxhY2UoL1xcJVswLTlhLWZBLUZdezJ9L2csIFwiYVwiKTtcbiAgICByZXR1cm4gcmVwbGFjZWRUZXh0Lmxlbmd0aCArIChyZXBsYWNlZFRleHQubGVuZ3RoICE9IE51bWJlcihzVGV4dCkgPyAzIDogMCk7XG59XG52YXIgUVI4Yml0Qnl0ZSA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBRUjhiaXRCeXRlKGRhdGEpIHtcbiAgICAgICAgdGhpcy5tb2RlID0gUVJNb2RlLk1PREVfOEJJVF9CWVRFO1xuICAgICAgICB0aGlzLnBhcnNlZERhdGEgPSBbXTtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdmFyIGJ5dGVBcnJheXMgPSBbXTtcbiAgICAgICAgLy8gQWRkZWQgdG8gc3VwcG9ydCBVVEYtOCBDaGFyYWN0ZXJzXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5kYXRhLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdmFyIGJ5dGVBcnJheSA9IFtdO1xuICAgICAgICAgICAgdmFyIGNvZGUgPSB0aGlzLmRhdGEuY2hhckNvZGVBdChpKTtcbiAgICAgICAgICAgIGlmIChjb2RlID4gMHgxMDAwMCkge1xuICAgICAgICAgICAgICAgIGJ5dGVBcnJheVswXSA9IDB4ZjAgfCAoKGNvZGUgJiAweDFjMDAwMCkgPj4+IDE4KTtcbiAgICAgICAgICAgICAgICBieXRlQXJyYXlbMV0gPSAweDgwIHwgKChjb2RlICYgMHgzZjAwMCkgPj4+IDEyKTtcbiAgICAgICAgICAgICAgICBieXRlQXJyYXlbMl0gPSAweDgwIHwgKChjb2RlICYgMHhmYzApID4+PiA2KTtcbiAgICAgICAgICAgICAgICBieXRlQXJyYXlbM10gPSAweDgwIHwgKGNvZGUgJiAweDNmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNvZGUgPiAweDgwMCkge1xuICAgICAgICAgICAgICAgIGJ5dGVBcnJheVswXSA9IDB4ZTAgfCAoKGNvZGUgJiAweGYwMDApID4+PiAxMik7XG4gICAgICAgICAgICAgICAgYnl0ZUFycmF5WzFdID0gMHg4MCB8ICgoY29kZSAmIDB4ZmMwKSA+Pj4gNik7XG4gICAgICAgICAgICAgICAgYnl0ZUFycmF5WzJdID0gMHg4MCB8IChjb2RlICYgMHgzZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjb2RlID4gMHg4MCkge1xuICAgICAgICAgICAgICAgIGJ5dGVBcnJheVswXSA9IDB4YzAgfCAoKGNvZGUgJiAweDdjMCkgPj4+IDYpO1xuICAgICAgICAgICAgICAgIGJ5dGVBcnJheVsxXSA9IDB4ODAgfCAoY29kZSAmIDB4M2YpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnl0ZUFycmF5WzBdID0gY29kZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJ5dGVBcnJheXMucHVzaChieXRlQXJyYXkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFyc2VkRGF0YSA9IEFycmF5LnByb3RvdHlwZS5jb25jYXQuYXBwbHkoW10sIGJ5dGVBcnJheXMpO1xuICAgICAgICBpZiAodGhpcy5wYXJzZWREYXRhLmxlbmd0aCAhPSB0aGlzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnBhcnNlZERhdGEudW5zaGlmdCgxOTEpO1xuICAgICAgICAgICAgdGhpcy5wYXJzZWREYXRhLnVuc2hpZnQoMTg3KTtcbiAgICAgICAgICAgIHRoaXMucGFyc2VkRGF0YS51bnNoaWZ0KDIzOSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgUVI4Yml0Qnl0ZS5wcm90b3R5cGUuZ2V0TGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJzZWREYXRhLmxlbmd0aDtcbiAgICB9O1xuICAgIFFSOGJpdEJ5dGUucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlcikge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMucGFyc2VkRGF0YS5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIGJ1ZmZlci5wdXQodGhpcy5wYXJzZWREYXRhW2ldLCA4KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIFFSOGJpdEJ5dGU7XG59KCkpO1xudmFyIFFSQ29kZU1vZGVsID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFFSQ29kZU1vZGVsKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsKSB7XG4gICAgICAgIGlmICh0eXBlTnVtYmVyID09PSB2b2lkIDApIHsgdHlwZU51bWJlciA9IC0xOyB9XG4gICAgICAgIGlmIChlcnJvckNvcnJlY3RMZXZlbCA9PT0gdm9pZCAwKSB7IGVycm9yQ29ycmVjdExldmVsID0gZXhwb3J0cy5RUkVycm9yQ29ycmVjdExldmVsLkw7IH1cbiAgICAgICAgdGhpcy5tb2R1bGVDb3VudCA9IDA7XG4gICAgICAgIHRoaXMuZGF0YUxpc3QgPSBbXTtcbiAgICAgICAgdGhpcy50eXBlTnVtYmVyID0gdHlwZU51bWJlcjtcbiAgICAgICAgdGhpcy5lcnJvckNvcnJlY3RMZXZlbCA9IGVycm9yQ29ycmVjdExldmVsO1xuICAgICAgICB0aGlzLm1vZHVsZUNvdW50ID0gMDtcbiAgICAgICAgdGhpcy5kYXRhTGlzdCA9IFtdO1xuICAgIH1cbiAgICBRUkNvZGVNb2RlbC5wcm90b3R5cGUuYWRkRGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGlmICh0aGlzLnR5cGVOdW1iZXIgPD0gMCkge1xuICAgICAgICAgICAgdGhpcy50eXBlTnVtYmVyID0gX2dldFR5cGVOdW1iZXIoZGF0YSwgdGhpcy5lcnJvckNvcnJlY3RMZXZlbCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodGhpcy50eXBlTnVtYmVyID4gNDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgUVIgdmVyc2lvbjogXCIgKyB0aGlzLnR5cGVOdW1iZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFjaGVja1FSVmVyc2lvbih0aGlzLnR5cGVOdW1iZXIsIGRhdGEsIHRoaXMuZXJyb3JDb3JyZWN0TGV2ZWwpKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiRGF0YSBpcyB0b28gbG9uZyBmb3IgUVIgdmVyc2lvbjogXCIgKyB0aGlzLnR5cGVOdW1iZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdEYXRhID0gbmV3IFFSOGJpdEJ5dGUoZGF0YSk7XG4gICAgICAgIHRoaXMuZGF0YUxpc3QucHVzaChuZXdEYXRhKTtcbiAgICAgICAgdGhpcy5kYXRhQ2FjaGUgPSB1bmRlZmluZWQ7XG4gICAgfTtcbiAgICBRUkNvZGVNb2RlbC5wcm90b3R5cGUuaXNEYXJrID0gZnVuY3Rpb24gKHJvdywgY29sKSB7XG4gICAgICAgIGlmIChyb3cgPCAwIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gcm93IHx8IGNvbCA8IDAgfHwgdGhpcy5tb2R1bGVDb3VudCA8PSBjb2wpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihyb3cgKyBcIixcIiArIGNvbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMubW9kdWxlc1tyb3ddW2NvbF07XG4gICAgfTtcbiAgICBRUkNvZGVNb2RlbC5wcm90b3R5cGUuZ2V0TW9kdWxlQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZHVsZUNvdW50O1xuICAgIH07XG4gICAgUVJDb2RlTW9kZWwucHJvdG90eXBlLm1ha2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMubWFrZUltcGwoZmFsc2UsIHRoaXMuZ2V0QmVzdE1hc2tQYXR0ZXJuKCkpO1xuICAgIH07XG4gICAgUVJDb2RlTW9kZWwucHJvdG90eXBlLm1ha2VJbXBsID0gZnVuY3Rpb24gKHRlc3QsIG1hc2tQYXR0ZXJuKSB7XG4gICAgICAgIHRoaXMubW9kdWxlQ291bnQgPSB0aGlzLnR5cGVOdW1iZXIgKiA0ICsgMTc7XG4gICAgICAgIHRoaXMubW9kdWxlcyA9IG5ldyBBcnJheSh0aGlzLm1vZHVsZUNvdW50KTtcbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgdGhpcy5tb2R1bGVDb3VudDsgcm93KyspIHtcbiAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3ddID0gbmV3IEFycmF5KHRoaXMubW9kdWxlQ291bnQpO1xuICAgICAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgdGhpcy5tb2R1bGVDb3VudDsgY29sKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93XVtjb2xdID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldHVwUG9zaXRpb25Qcm9iZVBhdHRlcm4oMCwgMCk7XG4gICAgICAgIHRoaXMuc2V0dXBQb3NpdGlvblByb2JlUGF0dGVybih0aGlzLm1vZHVsZUNvdW50IC0gNywgMCk7XG4gICAgICAgIHRoaXMuc2V0dXBQb3NpdGlvblByb2JlUGF0dGVybigwLCB0aGlzLm1vZHVsZUNvdW50IC0gNyk7XG4gICAgICAgIHRoaXMuc2V0dXBQb3NpdGlvbkFkanVzdFBhdHRlcm4oKTtcbiAgICAgICAgdGhpcy5zZXR1cFRpbWluZ1BhdHRlcm4oKTtcbiAgICAgICAgdGhpcy5zZXR1cFR5cGVJbmZvKHRlc3QsIG1hc2tQYXR0ZXJuKTtcbiAgICAgICAgaWYgKHRoaXMudHlwZU51bWJlciA+PSA3KSB7XG4gICAgICAgICAgICB0aGlzLnNldHVwVHlwZU51bWJlcih0ZXN0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5kYXRhQ2FjaGUgPT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5kYXRhQ2FjaGUgPSBRUkNvZGVNb2RlbC5jcmVhdGVEYXRhKHRoaXMudHlwZU51bWJlciwgdGhpcy5lcnJvckNvcnJlY3RMZXZlbCwgdGhpcy5kYXRhTGlzdCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXBEYXRhKHRoaXMuZGF0YUNhY2hlLCBtYXNrUGF0dGVybik7XG4gICAgfTtcbiAgICBRUkNvZGVNb2RlbC5wcm90b3R5cGUuc2V0dXBQb3NpdGlvblByb2JlUGF0dGVybiA9IGZ1bmN0aW9uIChyb3csIGNvbCkge1xuICAgICAgICBmb3IgKHZhciByID0gLTE7IHIgPD0gNzsgcisrKSB7XG4gICAgICAgICAgICBpZiAocm93ICsgciA8PSAtMSB8fCB0aGlzLm1vZHVsZUNvdW50IDw9IHJvdyArIHIpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBmb3IgKHZhciBjID0gLTE7IGMgPD0gNzsgYysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbCArIGMgPD0gLTEgfHwgdGhpcy5tb2R1bGVDb3VudCA8PSBjb2wgKyBjKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBpZiAoKDAgPD0gciAmJiByIDw9IDYgJiYgKGMgPT0gMCB8fCBjID09IDYpKSB8fFxuICAgICAgICAgICAgICAgICAgICAoMCA8PSBjICYmIGMgPD0gNiAmJiAociA9PSAwIHx8IHIgPT0gNikpIHx8XG4gICAgICAgICAgICAgICAgICAgICgyIDw9IHIgJiYgciA8PSA0ICYmIDIgPD0gYyAmJiBjIDw9IDQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY10gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFFSQ29kZU1vZGVsLnByb3RvdHlwZS5nZXRCZXN0TWFza1BhdHRlcm4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChOdW1iZXIuaXNJbnRlZ2VyKHRoaXMubWFza1BhdHRlcm4pICYmIE9iamVjdC52YWx1ZXMoZXhwb3J0cy5RUk1hc2tQYXR0ZXJuKS5pbmNsdWRlcyh0aGlzLm1hc2tQYXR0ZXJuKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFza1BhdHRlcm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1pbkxvc3RQb2ludCA9IDA7XG4gICAgICAgIHZhciBwYXR0ZXJuID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMubWFrZUltcGwodHJ1ZSwgaSk7XG4gICAgICAgICAgICB2YXIgbG9zdFBvaW50ID0gUVJVdGlsLmdldExvc3RQb2ludCh0aGlzKTtcbiAgICAgICAgICAgIGlmIChpID09IDAgfHwgbWluTG9zdFBvaW50ID4gbG9zdFBvaW50KSB7XG4gICAgICAgICAgICAgICAgbWluTG9zdFBvaW50ID0gbG9zdFBvaW50O1xuICAgICAgICAgICAgICAgIHBhdHRlcm4gPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwYXR0ZXJuO1xuICAgIH07XG4gICAgUVJDb2RlTW9kZWwucHJvdG90eXBlLnNldHVwVGltaW5nUGF0dGVybiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZm9yICh2YXIgciA9IDg7IHIgPCB0aGlzLm1vZHVsZUNvdW50IC0gODsgcisrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2R1bGVzW3JdWzZdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyXVs2XSA9IHIgJSAyID09IDA7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgYyA9IDg7IGMgPCB0aGlzLm1vZHVsZUNvdW50IC0gODsgYysrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2R1bGVzWzZdW2NdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubW9kdWxlc1s2XVtjXSA9IGMgJSAyID09IDA7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFFSQ29kZU1vZGVsLnByb3RvdHlwZS5zZXR1cFBvc2l0aW9uQWRqdXN0UGF0dGVybiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBvcyA9IFFSVXRpbC5nZXRQYXR0ZXJuUG9zaXRpb24odGhpcy50eXBlTnVtYmVyKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcG9zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvdyA9IHBvc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgY29sID0gcG9zW2pdO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZHVsZXNbcm93XVtjb2xdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIHIgPSAtMjsgciA8PSAyOyByKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYyA9IC0yOyBjIDw9IDI7IGMrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIgPT0gLTIgfHwgciA9PSAyIHx8IGMgPT0gLTIgfHwgYyA9PSAyIHx8IChyID09IDAgJiYgYyA9PSAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlc1tyb3cgKyByXVtjb2wgKyBjXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbcm93ICsgcl1bY29sICsgY10gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUVJDb2RlTW9kZWwucHJvdG90eXBlLnNldHVwVHlwZU51bWJlciA9IGZ1bmN0aW9uICh0ZXN0KSB7XG4gICAgICAgIHZhciBiaXRzID0gUVJVdGlsLmdldEJDSFR5cGVOdW1iZXIodGhpcy50eXBlTnVtYmVyKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxODsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbW9kID0gIXRlc3QgJiYgKChiaXRzID4+IGkpICYgMSkgPT0gMTtcbiAgICAgICAgICAgIHRoaXMubW9kdWxlc1tNYXRoLmZsb29yKGkgLyAzKV1bKGkgJSAzKSArIHRoaXMubW9kdWxlQ291bnQgLSA4IC0gM10gPSBtb2Q7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxODsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbW9kID0gIXRlc3QgJiYgKChiaXRzID4+IGkpICYgMSkgPT0gMTtcbiAgICAgICAgICAgIHRoaXMubW9kdWxlc1soaSAlIDMpICsgdGhpcy5tb2R1bGVDb3VudCAtIDggLSAzXVtNYXRoLmZsb29yKGkgLyAzKV0gPSBtb2Q7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFFSQ29kZU1vZGVsLnByb3RvdHlwZS5zZXR1cFR5cGVJbmZvID0gZnVuY3Rpb24gKHRlc3QsIG1hc2tQYXR0ZXJuKSB7XG4gICAgICAgIHZhciBkYXRhID0gKHRoaXMuZXJyb3JDb3JyZWN0TGV2ZWwgPDwgMykgfCBtYXNrUGF0dGVybjtcbiAgICAgICAgdmFyIGJpdHMgPSBRUlV0aWwuZ2V0QkNIVHlwZUluZm8oZGF0YSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTU7IGkrKykge1xuICAgICAgICAgICAgdmFyIG1vZCA9ICF0ZXN0ICYmICgoYml0cyA+PiBpKSAmIDEpID09IDE7XG4gICAgICAgICAgICBpZiAoaSA8IDYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbaV1bOF0gPSBtb2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpIDwgOCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlc1tpICsgMV1bOF0gPSBtb2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbdGhpcy5tb2R1bGVDb3VudCAtIDE1ICsgaV1bOF0gPSBtb2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxNTsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbW9kID0gIXRlc3QgJiYgKChiaXRzID4+IGkpICYgMSkgPT0gMTtcbiAgICAgICAgICAgIGlmIChpIDwgOCkge1xuICAgICAgICAgICAgICAgIHRoaXMubW9kdWxlc1s4XVt0aGlzLm1vZHVsZUNvdW50IC0gaSAtIDFdID0gbW9kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaSA8IDkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vZHVsZXNbOF1bMTUgLSBpIC0gMSArIDFdID0gbW9kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzWzhdWzE1IC0gaSAtIDFdID0gbW9kO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9kdWxlc1t0aGlzLm1vZHVsZUNvdW50IC0gOF1bOF0gPSAhdGVzdDtcbiAgICB9O1xuICAgIFFSQ29kZU1vZGVsLnByb3RvdHlwZS5tYXBEYXRhID0gZnVuY3Rpb24gKGRhdGEsIG1hc2tQYXR0ZXJuKSB7XG4gICAgICAgIHZhciBpbmMgPSAtMTtcbiAgICAgICAgdmFyIHJvdyA9IHRoaXMubW9kdWxlQ291bnQgLSAxO1xuICAgICAgICB2YXIgYml0SW5kZXggPSA3O1xuICAgICAgICB2YXIgYnl0ZUluZGV4ID0gMDtcbiAgICAgICAgZm9yICh2YXIgY29sID0gdGhpcy5tb2R1bGVDb3VudCAtIDE7IGNvbCA+IDA7IGNvbCAtPSAyKSB7XG4gICAgICAgICAgICBpZiAoY29sID09IDYpXG4gICAgICAgICAgICAgICAgY29sLS07XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGMgPSAwOyBjIDwgMjsgYysrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm1vZHVsZXNbcm93XVtjb2wgLSBjXSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGFyayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJ5dGVJbmRleCA8IGRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFyayA9ICgoZGF0YVtieXRlSW5kZXhdID4+PiBiaXRJbmRleCkgJiAxKSA9PSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1hc2sgPSBRUlV0aWwuZ2V0TWFzayhtYXNrUGF0dGVybiwgcm93LCBjb2wgLSBjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtYXNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGFyayA9ICFkYXJrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tb2R1bGVzW3Jvd11bY29sIC0gY10gPSBkYXJrO1xuICAgICAgICAgICAgICAgICAgICAgICAgYml0SW5kZXgtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiaXRJbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ5dGVJbmRleCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJpdEluZGV4ID0gNztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByb3cgKz0gaW5jO1xuICAgICAgICAgICAgICAgIGlmIChyb3cgPCAwIHx8IHRoaXMubW9kdWxlQ291bnQgPD0gcm93KSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyAtPSBpbmM7XG4gICAgICAgICAgICAgICAgICAgIGluYyA9IC1pbmM7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUVJDb2RlTW9kZWwuY3JlYXRlRGF0YSA9IGZ1bmN0aW9uICh0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCwgZGF0YUxpc3QpIHtcbiAgICAgICAgdmFyIHJzQmxvY2tzID0gUVJSU0Jsb2NrLmdldFJTQmxvY2tzKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsKTtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBRUkJpdEJ1ZmZlcigpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGFMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGRhdGFMaXN0W2ldO1xuICAgICAgICAgICAgYnVmZmVyLnB1dChkYXRhLm1vZGUsIDQpO1xuICAgICAgICAgICAgYnVmZmVyLnB1dChkYXRhLmdldExlbmd0aCgpLCBRUlV0aWwuZ2V0TGVuZ3RoSW5CaXRzKGRhdGEubW9kZSwgdHlwZU51bWJlcikpO1xuICAgICAgICAgICAgZGF0YS53cml0ZShidWZmZXIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0b3RhbERhdGFDb3VudCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcnNCbG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRvdGFsRGF0YUNvdW50ICs9IHJzQmxvY2tzW2ldLmRhdGFDb3VudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID4gdG90YWxEYXRhQ291bnQgKiA4KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjb2RlIGxlbmd0aCBvdmVyZmxvdy4gKFwiICsgYnVmZmVyLmdldExlbmd0aEluQml0cygpICsgXCI+XCIgKyB0b3RhbERhdGFDb3VudCAqIDggKyBcIilcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJ1ZmZlci5nZXRMZW5ndGhJbkJpdHMoKSArIDQgPD0gdG90YWxEYXRhQ291bnQgKiA4KSB7XG4gICAgICAgICAgICBidWZmZXIucHV0KDAsIDQpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCkgJSA4ICE9IDApIHtcbiAgICAgICAgICAgIGJ1ZmZlci5wdXRCaXQoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBpZiAoYnVmZmVyLmdldExlbmd0aEluQml0cygpID49IHRvdGFsRGF0YUNvdW50ICogOCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnVmZmVyLnB1dChRUkNvZGVNb2RlbC5QQUQwLCA4KTtcbiAgICAgICAgICAgIGlmIChidWZmZXIuZ2V0TGVuZ3RoSW5CaXRzKCkgPj0gdG90YWxEYXRhQ291bnQgKiA4KSB7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBidWZmZXIucHV0KFFSQ29kZU1vZGVsLlBBRDEsIDgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBRUkNvZGVNb2RlbC5jcmVhdGVCeXRlcyhidWZmZXIsIHJzQmxvY2tzKTtcbiAgICB9O1xuICAgIFFSQ29kZU1vZGVsLmNyZWF0ZUJ5dGVzID0gZnVuY3Rpb24gKGJ1ZmZlciwgcnNCbG9ja3MpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IDA7XG4gICAgICAgIHZhciBtYXhEY0NvdW50ID0gMDtcbiAgICAgICAgdmFyIG1heEVjQ291bnQgPSAwO1xuICAgICAgICB2YXIgZGNkYXRhID0gbmV3IEFycmF5KHJzQmxvY2tzLmxlbmd0aCk7XG4gICAgICAgIHZhciBlY2RhdGEgPSBuZXcgQXJyYXkocnNCbG9ja3MubGVuZ3RoKTtcbiAgICAgICAgZm9yICh2YXIgciA9IDA7IHIgPCByc0Jsb2Nrcy5sZW5ndGg7IHIrKykge1xuICAgICAgICAgICAgdmFyIGRjQ291bnQgPSByc0Jsb2Nrc1tyXS5kYXRhQ291bnQ7XG4gICAgICAgICAgICB2YXIgZWNDb3VudCA9IHJzQmxvY2tzW3JdLnRvdGFsQ291bnQgLSBkY0NvdW50O1xuICAgICAgICAgICAgbWF4RGNDb3VudCA9IE1hdGgubWF4KG1heERjQ291bnQsIGRjQ291bnQpO1xuICAgICAgICAgICAgbWF4RWNDb3VudCA9IE1hdGgubWF4KG1heEVjQ291bnQsIGVjQ291bnQpO1xuICAgICAgICAgICAgZGNkYXRhW3JdID0gbmV3IEFycmF5KGRjQ291bnQpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkY2RhdGFbcl0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBkY2RhdGFbcl1baV0gPSAweGZmICYgYnVmZmVyLmJ1ZmZlcltpICsgb2Zmc2V0XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9mZnNldCArPSBkY0NvdW50O1xuICAgICAgICAgICAgdmFyIHJzUG9seSA9IFFSVXRpbC5nZXRFcnJvckNvcnJlY3RQb2x5bm9taWFsKGVjQ291bnQpO1xuICAgICAgICAgICAgdmFyIHJhd1BvbHkgPSBuZXcgUVJQb2x5bm9taWFsKGRjZGF0YVtyXSwgcnNQb2x5LmdldExlbmd0aCgpIC0gMSk7XG4gICAgICAgICAgICB2YXIgbW9kUG9seSA9IHJhd1BvbHkubW9kKHJzUG9seSk7XG4gICAgICAgICAgICBlY2RhdGFbcl0gPSBuZXcgQXJyYXkocnNQb2x5LmdldExlbmd0aCgpIC0gMSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVjZGF0YVtyXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBtb2RJbmRleCA9IGkgKyBtb2RQb2x5LmdldExlbmd0aCgpIC0gZWNkYXRhW3JdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBlY2RhdGFbcl1baV0gPSBtb2RJbmRleCA+PSAwID8gbW9kUG9seS5nZXQobW9kSW5kZXgpIDogMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgdG90YWxDb2RlQ291bnQgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJzQmxvY2tzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0b3RhbENvZGVDb3VudCArPSByc0Jsb2Nrc1tpXS50b3RhbENvdW50O1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXRhID0gbmV3IEFycmF5KHRvdGFsQ29kZUNvdW50KTtcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXhEY0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgcnNCbG9ja3MubGVuZ3RoOyByKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IGRjZGF0YVtyXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtpbmRleCsrXSA9IGRjZGF0YVtyXVtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXhFY0NvdW50OyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHIgPSAwOyByIDwgcnNCbG9ja3MubGVuZ3RoOyByKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IGVjZGF0YVtyXS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgZGF0YVtpbmRleCsrXSA9IGVjZGF0YVtyXVtpXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfTtcbiAgICBRUkNvZGVNb2RlbC5QQUQwID0gMHhlYztcbiAgICBRUkNvZGVNb2RlbC5QQUQxID0gMHgxMTtcbiAgICByZXR1cm4gUVJDb2RlTW9kZWw7XG59KCkpO1xuZXhwb3J0cy5RUkNvZGVNb2RlbCA9IFFSQ29kZU1vZGVsO1xuZXhwb3J0cy5RUkVycm9yQ29ycmVjdExldmVsID0geyBMOiAxLCBNOiAwLCBROiAzLCBIOiAyIH07XG52YXIgUVJNb2RlID0geyBNT0RFX05VTUJFUjogMSA8PCAwLCBNT0RFX0FMUEhBX05VTTogMSA8PCAxLCBNT0RFXzhCSVRfQllURTogMSA8PCAyLCBNT0RFX0tBTkpJOiAxIDw8IDMgfTtcbmV4cG9ydHMuUVJNYXNrUGF0dGVybiA9IHtcbiAgICBQQVRURVJOMDAwOiAwLFxuICAgIFBBVFRFUk4wMDE6IDEsXG4gICAgUEFUVEVSTjAxMDogMixcbiAgICBQQVRURVJOMDExOiAzLFxuICAgIFBBVFRFUk4xMDA6IDQsXG4gICAgUEFUVEVSTjEwMTogNSxcbiAgICBQQVRURVJOMTEwOiA2LFxuICAgIFBBVFRFUk4xMTE6IDcsXG59O1xudmFyIFFSVXRpbCA9IC8qKiBAY2xhc3MgKi8gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBRUlV0aWwoKSB7XG4gICAgfVxuICAgIFFSVXRpbC5nZXRCQ0hUeXBlSW5mbyA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBkID0gZGF0YSA8PCAxMDtcbiAgICAgICAgd2hpbGUgKFFSVXRpbC5nZXRCQ0hEaWdpdChkKSAtIFFSVXRpbC5nZXRCQ0hEaWdpdChRUlV0aWwuRzE1KSA+PSAwKSB7XG4gICAgICAgICAgICBkIF49IFFSVXRpbC5HMTUgPDwgKFFSVXRpbC5nZXRCQ0hEaWdpdChkKSAtIFFSVXRpbC5nZXRCQ0hEaWdpdChRUlV0aWwuRzE1KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICgoZGF0YSA8PCAxMCkgfCBkKSBeIFFSVXRpbC5HMTVfTUFTSztcbiAgICB9O1xuICAgIFFSVXRpbC5nZXRCQ0hUeXBlTnVtYmVyID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgdmFyIGQgPSBkYXRhIDw8IDEyO1xuICAgICAgICB3aGlsZSAoUVJVdGlsLmdldEJDSERpZ2l0KGQpIC0gUVJVdGlsLmdldEJDSERpZ2l0KFFSVXRpbC5HMTgpID49IDApIHtcbiAgICAgICAgICAgIGQgXj0gUVJVdGlsLkcxOCA8PCAoUVJVdGlsLmdldEJDSERpZ2l0KGQpIC0gUVJVdGlsLmdldEJDSERpZ2l0KFFSVXRpbC5HMTgpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKGRhdGEgPDwgMTIpIHwgZDtcbiAgICB9O1xuICAgIFFSVXRpbC5nZXRCQ0hEaWdpdCA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBkaWdpdCA9IDA7XG4gICAgICAgIHdoaWxlIChkYXRhICE9IDApIHtcbiAgICAgICAgICAgIGRpZ2l0Kys7XG4gICAgICAgICAgICBkYXRhID4+Pj0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGlnaXQ7XG4gICAgfTtcbiAgICBRUlV0aWwuZ2V0UGF0dGVyblBvc2l0aW9uID0gZnVuY3Rpb24gKHR5cGVOdW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIFFSVXRpbC5QQVRURVJOX1BPU0lUSU9OX1RBQkxFW3R5cGVOdW1iZXIgLSAxXTtcbiAgICB9O1xuICAgIFFSVXRpbC5nZXRNYXNrID0gZnVuY3Rpb24gKG1hc2tQYXR0ZXJuLCBpLCBqKSB7XG4gICAgICAgIHN3aXRjaCAobWFza1BhdHRlcm4pIHtcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5RUk1hc2tQYXR0ZXJuLlBBVFRFUk4wMDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChpICsgaikgJSAyID09IDA7XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuUVJNYXNrUGF0dGVybi5QQVRURVJOMDAxOlxuICAgICAgICAgICAgICAgIHJldHVybiBpICUgMiA9PSAwO1xuICAgICAgICAgICAgY2FzZSBleHBvcnRzLlFSTWFza1BhdHRlcm4uUEFUVEVSTjAxMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gaiAlIDMgPT0gMDtcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5RUk1hc2tQYXR0ZXJuLlBBVFRFUk4wMTE6XG4gICAgICAgICAgICAgICAgcmV0dXJuIChpICsgaikgJSAzID09IDA7XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuUVJNYXNrUGF0dGVybi5QQVRURVJOMTAwOlxuICAgICAgICAgICAgICAgIHJldHVybiAoTWF0aC5mbG9vcihpIC8gMikgKyBNYXRoLmZsb29yKGogLyAzKSkgJSAyID09IDA7XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuUVJNYXNrUGF0dGVybi5QQVRURVJOMTAxOlxuICAgICAgICAgICAgICAgIHJldHVybiAoKGkgKiBqKSAlIDIpICsgKChpICogaikgJSAzKSA9PSAwO1xuICAgICAgICAgICAgY2FzZSBleHBvcnRzLlFSTWFza1BhdHRlcm4uUEFUVEVSTjExMDpcbiAgICAgICAgICAgICAgICByZXR1cm4gKCgoaSAqIGopICUgMikgKyAoKGkgKiBqKSAlIDMpKSAlIDIgPT0gMDtcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5RUk1hc2tQYXR0ZXJuLlBBVFRFUk4xMTE6XG4gICAgICAgICAgICAgICAgcmV0dXJuICgoKGkgKiBqKSAlIDMpICsgKChpICsgaikgJSAyKSkgJSAyID09IDA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImJhZCBtYXNrUGF0dGVybjpcIiArIG1hc2tQYXR0ZXJuKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUVJVdGlsLmdldEVycm9yQ29ycmVjdFBvbHlub21pYWwgPSBmdW5jdGlvbiAoZXJyb3JDb3JyZWN0TGVuZ3RoKSB7XG4gICAgICAgIHZhciBhID0gbmV3IFFSUG9seW5vbWlhbChbMV0sIDApO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVycm9yQ29ycmVjdExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhID0gYS5tdWx0aXBseShuZXcgUVJQb2x5bm9taWFsKFsxLCBRUk1hdGguZ2V4cChpKV0sIDApKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYTtcbiAgICB9O1xuICAgIFFSVXRpbC5nZXRMZW5ndGhJbkJpdHMgPSBmdW5jdGlvbiAobW9kZSwgdHlwZSkge1xuICAgICAgICBpZiAoMSA8PSB0eXBlICYmIHR5cGUgPCAxMCkge1xuICAgICAgICAgICAgc3dpdGNoIChtb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV9OVU1CRVI6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxMDtcbiAgICAgICAgICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX0FMUEhBX05VTTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDk7XG4gICAgICAgICAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV84QklUX0JZVEU6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA4O1xuICAgICAgICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfS0FOSkk6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA4O1xuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm1vZGU6XCIgKyBtb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlIDwgMjcpIHtcbiAgICAgICAgICAgIHN3aXRjaCAobW9kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfTlVNQkVSOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTI7XG4gICAgICAgICAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV9BTFBIQV9OVU06XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxMTtcbiAgICAgICAgICAgICAgICBjYXNlIFFSTW9kZS5NT0RFXzhCSVRfQllURTpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE2O1xuICAgICAgICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfS0FOSkk6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxMDtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJtb2RlOlwiICsgbW9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA8IDQxKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKG1vZGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX05VTUJFUjpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE0O1xuICAgICAgICAgICAgICAgIGNhc2UgUVJNb2RlLk1PREVfQUxQSEFfTlVNOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTM7XG4gICAgICAgICAgICAgICAgY2FzZSBRUk1vZGUuTU9ERV84QklUX0JZVEU6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxNjtcbiAgICAgICAgICAgICAgICBjYXNlIFFSTW9kZS5NT0RFX0tBTkpJOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTI7XG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibW9kZTpcIiArIG1vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHlwZTpcIiArIHR5cGUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBRUlV0aWwuZ2V0TG9zdFBvaW50ID0gZnVuY3Rpb24gKHFyQ29kZSkge1xuICAgICAgICB2YXIgbW9kdWxlQ291bnQgPSBxckNvZGUuZ2V0TW9kdWxlQ291bnQoKTtcbiAgICAgICAgdmFyIGxvc3RQb2ludCA9IDA7XG4gICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50OyByb3crKykge1xuICAgICAgICAgICAgZm9yICh2YXIgY29sID0gMDsgY29sIDwgbW9kdWxlQ291bnQ7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNhbWVDb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIGRhcmsgPSBxckNvZGUuaXNEYXJrKHJvdywgY29sKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gLTE7IHIgPD0gMTsgcisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgKyByIDwgMCB8fCBtb2R1bGVDb3VudCA8PSByb3cgKyByKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBjID0gLTE7IGMgPD0gMTsgYysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sICsgYyA8IDAgfHwgbW9kdWxlQ291bnQgPD0gY29sICsgYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIgPT0gMCAmJiBjID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXJrID09IHFyQ29kZS5pc0Rhcmsocm93ICsgciwgY29sICsgYykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzYW1lQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2FtZUNvdW50ID4gNSkge1xuICAgICAgICAgICAgICAgICAgICBsb3N0UG9pbnQgKz0gMyArIHNhbWVDb3VudCAtIDU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50IC0gMTsgcm93KyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGNvbCA9IDA7IGNvbCA8IG1vZHVsZUNvdW50IC0gMTsgY29sKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY291bnQgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChxckNvZGUuaXNEYXJrKHJvdywgY29sKSlcbiAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICBpZiAocXJDb2RlLmlzRGFyayhyb3cgKyAxLCBjb2wpKVxuICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgIGlmIChxckNvZGUuaXNEYXJrKHJvdywgY29sICsgMSkpXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgaWYgKHFyQ29kZS5pc0Rhcmsocm93ICsgMSwgY29sICsgMSkpXG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IDAgfHwgY291bnQgPT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBsb3N0UG9pbnQgKz0gMztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgcm93ID0gMDsgcm93IDwgbW9kdWxlQ291bnQ7IHJvdysrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudCAtIDY7IGNvbCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHFyQ29kZS5pc0Rhcmsocm93LCBjb2wpICYmXG4gICAgICAgICAgICAgICAgICAgICFxckNvZGUuaXNEYXJrKHJvdywgY29sICsgMSkgJiZcbiAgICAgICAgICAgICAgICAgICAgcXJDb2RlLmlzRGFyayhyb3csIGNvbCArIDIpICYmXG4gICAgICAgICAgICAgICAgICAgIHFyQ29kZS5pc0Rhcmsocm93LCBjb2wgKyAzKSAmJlxuICAgICAgICAgICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdywgY29sICsgNCkgJiZcbiAgICAgICAgICAgICAgICAgICAgIXFyQ29kZS5pc0Rhcmsocm93LCBjb2wgKyA1KSAmJlxuICAgICAgICAgICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdywgY29sICsgNikpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9zdFBvaW50ICs9IDQwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudDsgY29sKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50IC0gNjsgcm93KyspIHtcbiAgICAgICAgICAgICAgICBpZiAocXJDb2RlLmlzRGFyayhyb3csIGNvbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgIXFyQ29kZS5pc0Rhcmsocm93ICsgMSwgY29sKSAmJlxuICAgICAgICAgICAgICAgICAgICBxckNvZGUuaXNEYXJrKHJvdyArIDIsIGNvbCkgJiZcbiAgICAgICAgICAgICAgICAgICAgcXJDb2RlLmlzRGFyayhyb3cgKyAzLCBjb2wpICYmXG4gICAgICAgICAgICAgICAgICAgIHFyQ29kZS5pc0Rhcmsocm93ICsgNCwgY29sKSAmJlxuICAgICAgICAgICAgICAgICAgICAhcXJDb2RlLmlzRGFyayhyb3cgKyA1LCBjb2wpICYmXG4gICAgICAgICAgICAgICAgICAgIHFyQ29kZS5pc0Rhcmsocm93ICsgNiwgY29sKSkge1xuICAgICAgICAgICAgICAgICAgICBsb3N0UG9pbnQgKz0gNDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBkYXJrQ291bnQgPSAwO1xuICAgICAgICBmb3IgKHZhciBjb2wgPSAwOyBjb2wgPCBtb2R1bGVDb3VudDsgY29sKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIHJvdyA9IDA7IHJvdyA8IG1vZHVsZUNvdW50OyByb3crKykge1xuICAgICAgICAgICAgICAgIGlmIChxckNvZGUuaXNEYXJrKHJvdywgY29sKSkge1xuICAgICAgICAgICAgICAgICAgICBkYXJrQ291bnQrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJhdGlvID0gTWF0aC5hYnMoKDEwMCAqIGRhcmtDb3VudCkgLyBtb2R1bGVDb3VudCAvIG1vZHVsZUNvdW50IC0gNTApIC8gNTtcbiAgICAgICAgbG9zdFBvaW50ICs9IHJhdGlvICogMTA7XG4gICAgICAgIHJldHVybiBsb3N0UG9pbnQ7XG4gICAgfTtcbiAgICBRUlV0aWwuUEFUVEVSTl9QT1NJVElPTl9UQUJMRSA9IFtcbiAgICAgICAgW10sXG4gICAgICAgIFs2LCAxOF0sXG4gICAgICAgIFs2LCAyMl0sXG4gICAgICAgIFs2LCAyNl0sXG4gICAgICAgIFs2LCAzMF0sXG4gICAgICAgIFs2LCAzNF0sXG4gICAgICAgIFs2LCAyMiwgMzhdLFxuICAgICAgICBbNiwgMjQsIDQyXSxcbiAgICAgICAgWzYsIDI2LCA0Nl0sXG4gICAgICAgIFs2LCAyOCwgNTBdLFxuICAgICAgICBbNiwgMzAsIDU0XSxcbiAgICAgICAgWzYsIDMyLCA1OF0sXG4gICAgICAgIFs2LCAzNCwgNjJdLFxuICAgICAgICBbNiwgMjYsIDQ2LCA2Nl0sXG4gICAgICAgIFs2LCAyNiwgNDgsIDcwXSxcbiAgICAgICAgWzYsIDI2LCA1MCwgNzRdLFxuICAgICAgICBbNiwgMzAsIDU0LCA3OF0sXG4gICAgICAgIFs2LCAzMCwgNTYsIDgyXSxcbiAgICAgICAgWzYsIDMwLCA1OCwgODZdLFxuICAgICAgICBbNiwgMzQsIDYyLCA5MF0sXG4gICAgICAgIFs2LCAyOCwgNTAsIDcyLCA5NF0sXG4gICAgICAgIFs2LCAyNiwgNTAsIDc0LCA5OF0sXG4gICAgICAgIFs2LCAzMCwgNTQsIDc4LCAxMDJdLFxuICAgICAgICBbNiwgMjgsIDU0LCA4MCwgMTA2XSxcbiAgICAgICAgWzYsIDMyLCA1OCwgODQsIDExMF0sXG4gICAgICAgIFs2LCAzMCwgNTgsIDg2LCAxMTRdLFxuICAgICAgICBbNiwgMzQsIDYyLCA5MCwgMTE4XSxcbiAgICAgICAgWzYsIDI2LCA1MCwgNzQsIDk4LCAxMjJdLFxuICAgICAgICBbNiwgMzAsIDU0LCA3OCwgMTAyLCAxMjZdLFxuICAgICAgICBbNiwgMjYsIDUyLCA3OCwgMTA0LCAxMzBdLFxuICAgICAgICBbNiwgMzAsIDU2LCA4MiwgMTA4LCAxMzRdLFxuICAgICAgICBbNiwgMzQsIDYwLCA4NiwgMTEyLCAxMzhdLFxuICAgICAgICBbNiwgMzAsIDU4LCA4NiwgMTE0LCAxNDJdLFxuICAgICAgICBbNiwgMzQsIDYyLCA5MCwgMTE4LCAxNDZdLFxuICAgICAgICBbNiwgMzAsIDU0LCA3OCwgMTAyLCAxMjYsIDE1MF0sXG4gICAgICAgIFs2LCAyNCwgNTAsIDc2LCAxMDIsIDEyOCwgMTU0XSxcbiAgICAgICAgWzYsIDI4LCA1NCwgODAsIDEwNiwgMTMyLCAxNThdLFxuICAgICAgICBbNiwgMzIsIDU4LCA4NCwgMTEwLCAxMzYsIDE2Ml0sXG4gICAgICAgIFs2LCAyNiwgNTQsIDgyLCAxMTAsIDEzOCwgMTY2XSxcbiAgICAgICAgWzYsIDMwLCA1OCwgODYsIDExNCwgMTQyLCAxNzBdLFxuICAgIF07XG4gICAgUVJVdGlsLkcxNSA9ICgxIDw8IDEwKSB8ICgxIDw8IDgpIHwgKDEgPDwgNSkgfCAoMSA8PCA0KSB8ICgxIDw8IDIpIHwgKDEgPDwgMSkgfCAoMSA8PCAwKTtcbiAgICBRUlV0aWwuRzE4ID0gKDEgPDwgMTIpIHwgKDEgPDwgMTEpIHwgKDEgPDwgMTApIHwgKDEgPDwgOSkgfCAoMSA8PCA4KSB8ICgxIDw8IDUpIHwgKDEgPDwgMikgfCAoMSA8PCAwKTtcbiAgICBRUlV0aWwuRzE1X01BU0sgPSAoMSA8PCAxNCkgfCAoMSA8PCAxMikgfCAoMSA8PCAxMCkgfCAoMSA8PCA0KSB8ICgxIDw8IDEpO1xuICAgIHJldHVybiBRUlV0aWw7XG59KCkpO1xuZXhwb3J0cy5RUlV0aWwgPSBRUlV0aWw7XG52YXIgUVJNYXRoID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFFSTWF0aCgpIHtcbiAgICB9XG4gICAgUVJNYXRoLmdsb2cgPSBmdW5jdGlvbiAobikge1xuICAgICAgICBpZiAobiA8IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImdsb2coXCIgKyBuICsgXCIpXCIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBRUk1hdGguTE9HX1RBQkxFW25dO1xuICAgIH07XG4gICAgUVJNYXRoLmdleHAgPSBmdW5jdGlvbiAobikge1xuICAgICAgICB3aGlsZSAobiA8IDApIHtcbiAgICAgICAgICAgIG4gKz0gMjU1O1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChuID49IDI1Nikge1xuICAgICAgICAgICAgbiAtPSAyNTU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFFSTWF0aC5FWFBfVEFCTEVbbl07XG4gICAgfTtcbiAgICBRUk1hdGguRVhQX1RBQkxFID0gbmV3IEFycmF5KDI1Nik7XG4gICAgUVJNYXRoLkxPR19UQUJMRSA9IG5ldyBBcnJheSgyNTYpO1xuICAgIFFSTWF0aC5fY29uc3RydWN0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKykge1xuICAgICAgICAgICAgUVJNYXRoLkVYUF9UQUJMRVtpXSA9IDEgPDwgaTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gODsgaSA8IDI1NjsgaSsrKSB7XG4gICAgICAgICAgICBRUk1hdGguRVhQX1RBQkxFW2ldID1cbiAgICAgICAgICAgICAgICBRUk1hdGguRVhQX1RBQkxFW2kgLSA0XSBeIFFSTWF0aC5FWFBfVEFCTEVbaSAtIDVdIF4gUVJNYXRoLkVYUF9UQUJMRVtpIC0gNl0gXiBRUk1hdGguRVhQX1RBQkxFW2kgLSA4XTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NTsgaSsrKSB7XG4gICAgICAgICAgICBRUk1hdGguTE9HX1RBQkxFW1FSTWF0aC5FWFBfVEFCTEVbaV1dID0gaTtcbiAgICAgICAgfVxuICAgIH0pKCk7XG4gICAgcmV0dXJuIFFSTWF0aDtcbn0oKSk7XG5leHBvcnRzLlFSTWF0aCA9IFFSTWF0aDtcbnZhciBRUlBvbHlub21pYWwgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUVJQb2x5bm9taWFsKG51bSwgc2hpZnQpIHtcbiAgICAgICAgaWYgKG51bS5sZW5ndGggPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IobnVtLmxlbmd0aCArIFwiL1wiICsgc2hpZnQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvZmZzZXQgPSAwO1xuICAgICAgICB3aGlsZSAob2Zmc2V0IDwgbnVtLmxlbmd0aCAmJiBudW1bb2Zmc2V0XSA9PSAwKSB7XG4gICAgICAgICAgICBvZmZzZXQrKztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm51bSA9IG5ldyBBcnJheShudW0ubGVuZ3RoIC0gb2Zmc2V0ICsgc2hpZnQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bS5sZW5ndGggLSBvZmZzZXQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5udW1baV0gPSBudW1baSArIG9mZnNldF07XG4gICAgICAgIH1cbiAgICB9XG4gICAgUVJQb2x5bm9taWFsLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubnVtW2luZGV4XTtcbiAgICB9O1xuICAgIFFSUG9seW5vbWlhbC5wcm90b3R5cGUuZ2V0TGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5udW0ubGVuZ3RoO1xuICAgIH07XG4gICAgUVJQb2x5bm9taWFsLnByb3RvdHlwZS5tdWx0aXBseSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIHZhciBudW0gPSBuZXcgQXJyYXkodGhpcy5nZXRMZW5ndGgoKSArIGUuZ2V0TGVuZ3RoKCkgLSAxKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZS5nZXRMZW5ndGgoKTsgaisrKSB7XG4gICAgICAgICAgICAgICAgbnVtW2kgKyBqXSBePSBRUk1hdGguZ2V4cChRUk1hdGguZ2xvZyh0aGlzLmdldChpKSkgKyBRUk1hdGguZ2xvZyhlLmdldChqKSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUVJQb2x5bm9taWFsKG51bSwgMCk7XG4gICAgfTtcbiAgICBRUlBvbHlub21pYWwucHJvdG90eXBlLm1vZCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGlmICh0aGlzLmdldExlbmd0aCgpIC0gZS5nZXRMZW5ndGgoKSA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciByYXRpbyA9IFFSTWF0aC5nbG9nKHRoaXMuZ2V0KDApKSAtIFFSTWF0aC5nbG9nKGUuZ2V0KDApKTtcbiAgICAgICAgdmFyIG51bSA9IG5ldyBBcnJheSh0aGlzLmdldExlbmd0aCgpKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgICAgICAgIG51bVtpXSA9IHRoaXMuZ2V0KGkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZS5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAgICAgICBudW1baV0gXj0gUVJNYXRoLmdleHAoUVJNYXRoLmdsb2coZS5nZXQoaSkpICsgcmF0aW8pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUVJQb2x5bm9taWFsKG51bSwgMCkubW9kKGUpO1xuICAgIH07XG4gICAgcmV0dXJuIFFSUG9seW5vbWlhbDtcbn0oKSk7XG52YXIgUVJSU0Jsb2NrID0gLyoqIEBjbGFzcyAqLyAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFFSUlNCbG9jayh0b3RhbENvdW50LCBkYXRhQ291bnQpIHtcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gdG90YWxDb3VudDtcbiAgICAgICAgdGhpcy5kYXRhQ291bnQgPSBkYXRhQ291bnQ7XG4gICAgfVxuICAgIFFSUlNCbG9jay5nZXRSU0Jsb2NrcyA9IGZ1bmN0aW9uICh0eXBlTnVtYmVyLCBlcnJvckNvcnJlY3RMZXZlbCkge1xuICAgICAgICB2YXIgcnNCbG9jayA9IFFSUlNCbG9jay5nZXRSc0Jsb2NrVGFibGUodHlwZU51bWJlciwgZXJyb3JDb3JyZWN0TGV2ZWwpO1xuICAgICAgICBpZiAocnNCbG9jayA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImJhZCBycyBibG9jayBAIHR5cGVOdW1iZXI6XCIgKyB0eXBlTnVtYmVyICsgXCIvZXJyb3JDb3JyZWN0TGV2ZWw6XCIgKyBlcnJvckNvcnJlY3RMZXZlbCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlbmd0aCA9IHJzQmxvY2subGVuZ3RoIC8gMztcbiAgICAgICAgdmFyIGxpc3QgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNvdW50ID0gcnNCbG9ja1tpICogMyArIDBdO1xuICAgICAgICAgICAgdmFyIHRvdGFsQ291bnQgPSByc0Jsb2NrW2kgKiAzICsgMV07XG4gICAgICAgICAgICB2YXIgZGF0YUNvdW50ID0gcnNCbG9ja1tpICogMyArIDJdO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjb3VudDsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGlzdC5wdXNoKG5ldyBRUlJTQmxvY2sodG90YWxDb3VudCwgZGF0YUNvdW50KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfTtcbiAgICBRUlJTQmxvY2suZ2V0UnNCbG9ja1RhYmxlID0gZnVuY3Rpb24gKHR5cGVOdW1iZXIsIGVycm9yQ29ycmVjdExldmVsKSB7XG4gICAgICAgIHN3aXRjaCAoZXJyb3JDb3JyZWN0TGV2ZWwpIHtcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5RUkVycm9yQ29ycmVjdExldmVsLkw6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFFSUlNCbG9jay5SU19CTE9DS19UQUJMRVsodHlwZU51bWJlciAtIDEpICogNCArIDBdO1xuICAgICAgICAgICAgY2FzZSBleHBvcnRzLlFSRXJyb3JDb3JyZWN0TGV2ZWwuTTpcbiAgICAgICAgICAgICAgICByZXR1cm4gUVJSU0Jsb2NrLlJTX0JMT0NLX1RBQkxFWyh0eXBlTnVtYmVyIC0gMSkgKiA0ICsgMV07XG4gICAgICAgICAgICBjYXNlIGV4cG9ydHMuUVJFcnJvckNvcnJlY3RMZXZlbC5ROlxuICAgICAgICAgICAgICAgIHJldHVybiBRUlJTQmxvY2suUlNfQkxPQ0tfVEFCTEVbKHR5cGVOdW1iZXIgLSAxKSAqIDQgKyAyXTtcbiAgICAgICAgICAgIGNhc2UgZXhwb3J0cy5RUkVycm9yQ29ycmVjdExldmVsLkg6XG4gICAgICAgICAgICAgICAgcmV0dXJuIFFSUlNCbG9jay5SU19CTE9DS19UQUJMRVsodHlwZU51bWJlciAtIDEpICogNCArIDNdO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBRUlJTQmxvY2suUlNfQkxPQ0tfVEFCTEUgPSBbXG4gICAgICAgIFsxLCAyNiwgMTldLFxuICAgICAgICBbMSwgMjYsIDE2XSxcbiAgICAgICAgWzEsIDI2LCAxM10sXG4gICAgICAgIFsxLCAyNiwgOV0sXG4gICAgICAgIFsxLCA0NCwgMzRdLFxuICAgICAgICBbMSwgNDQsIDI4XSxcbiAgICAgICAgWzEsIDQ0LCAyMl0sXG4gICAgICAgIFsxLCA0NCwgMTZdLFxuICAgICAgICBbMSwgNzAsIDU1XSxcbiAgICAgICAgWzEsIDcwLCA0NF0sXG4gICAgICAgIFsyLCAzNSwgMTddLFxuICAgICAgICBbMiwgMzUsIDEzXSxcbiAgICAgICAgWzEsIDEwMCwgODBdLFxuICAgICAgICBbMiwgNTAsIDMyXSxcbiAgICAgICAgWzIsIDUwLCAyNF0sXG4gICAgICAgIFs0LCAyNSwgOV0sXG4gICAgICAgIFsxLCAxMzQsIDEwOF0sXG4gICAgICAgIFsyLCA2NywgNDNdLFxuICAgICAgICBbMiwgMzMsIDE1LCAyLCAzNCwgMTZdLFxuICAgICAgICBbMiwgMzMsIDExLCAyLCAzNCwgMTJdLFxuICAgICAgICBbMiwgODYsIDY4XSxcbiAgICAgICAgWzQsIDQzLCAyN10sXG4gICAgICAgIFs0LCA0MywgMTldLFxuICAgICAgICBbNCwgNDMsIDE1XSxcbiAgICAgICAgWzIsIDk4LCA3OF0sXG4gICAgICAgIFs0LCA0OSwgMzFdLFxuICAgICAgICBbMiwgMzIsIDE0LCA0LCAzMywgMTVdLFxuICAgICAgICBbNCwgMzksIDEzLCAxLCA0MCwgMTRdLFxuICAgICAgICBbMiwgMTIxLCA5N10sXG4gICAgICAgIFsyLCA2MCwgMzgsIDIsIDYxLCAzOV0sXG4gICAgICAgIFs0LCA0MCwgMTgsIDIsIDQxLCAxOV0sXG4gICAgICAgIFs0LCA0MCwgMTQsIDIsIDQxLCAxNV0sXG4gICAgICAgIFsyLCAxNDYsIDExNl0sXG4gICAgICAgIFszLCA1OCwgMzYsIDIsIDU5LCAzN10sXG4gICAgICAgIFs0LCAzNiwgMTYsIDQsIDM3LCAxN10sXG4gICAgICAgIFs0LCAzNiwgMTIsIDQsIDM3LCAxM10sXG4gICAgICAgIFsyLCA4NiwgNjgsIDIsIDg3LCA2OV0sXG4gICAgICAgIFs0LCA2OSwgNDMsIDEsIDcwLCA0NF0sXG4gICAgICAgIFs2LCA0MywgMTksIDIsIDQ0LCAyMF0sXG4gICAgICAgIFs2LCA0MywgMTUsIDIsIDQ0LCAxNl0sXG4gICAgICAgIFs0LCAxMDEsIDgxXSxcbiAgICAgICAgWzEsIDgwLCA1MCwgNCwgODEsIDUxXSxcbiAgICAgICAgWzQsIDUwLCAyMiwgNCwgNTEsIDIzXSxcbiAgICAgICAgWzMsIDM2LCAxMiwgOCwgMzcsIDEzXSxcbiAgICAgICAgWzIsIDExNiwgOTIsIDIsIDExNywgOTNdLFxuICAgICAgICBbNiwgNTgsIDM2LCAyLCA1OSwgMzddLFxuICAgICAgICBbNCwgNDYsIDIwLCA2LCA0NywgMjFdLFxuICAgICAgICBbNywgNDIsIDE0LCA0LCA0MywgMTVdLFxuICAgICAgICBbNCwgMTMzLCAxMDddLFxuICAgICAgICBbOCwgNTksIDM3LCAxLCA2MCwgMzhdLFxuICAgICAgICBbOCwgNDQsIDIwLCA0LCA0NSwgMjFdLFxuICAgICAgICBbMTIsIDMzLCAxMSwgNCwgMzQsIDEyXSxcbiAgICAgICAgWzMsIDE0NSwgMTE1LCAxLCAxNDYsIDExNl0sXG4gICAgICAgIFs0LCA2NCwgNDAsIDUsIDY1LCA0MV0sXG4gICAgICAgIFsxMSwgMzYsIDE2LCA1LCAzNywgMTddLFxuICAgICAgICBbMTEsIDM2LCAxMiwgNSwgMzcsIDEzXSxcbiAgICAgICAgWzUsIDEwOSwgODcsIDEsIDExMCwgODhdLFxuICAgICAgICBbNSwgNjUsIDQxLCA1LCA2NiwgNDJdLFxuICAgICAgICBbNSwgNTQsIDI0LCA3LCA1NSwgMjVdLFxuICAgICAgICBbMTEsIDM2LCAxMl0sXG4gICAgICAgIFs1LCAxMjIsIDk4LCAxLCAxMjMsIDk5XSxcbiAgICAgICAgWzcsIDczLCA0NSwgMywgNzQsIDQ2XSxcbiAgICAgICAgWzE1LCA0MywgMTksIDIsIDQ0LCAyMF0sXG4gICAgICAgIFszLCA0NSwgMTUsIDEzLCA0NiwgMTZdLFxuICAgICAgICBbMSwgMTM1LCAxMDcsIDUsIDEzNiwgMTA4XSxcbiAgICAgICAgWzEwLCA3NCwgNDYsIDEsIDc1LCA0N10sXG4gICAgICAgIFsxLCA1MCwgMjIsIDE1LCA1MSwgMjNdLFxuICAgICAgICBbMiwgNDIsIDE0LCAxNywgNDMsIDE1XSxcbiAgICAgICAgWzUsIDE1MCwgMTIwLCAxLCAxNTEsIDEyMV0sXG4gICAgICAgIFs5LCA2OSwgNDMsIDQsIDcwLCA0NF0sXG4gICAgICAgIFsxNywgNTAsIDIyLCAxLCA1MSwgMjNdLFxuICAgICAgICBbMiwgNDIsIDE0LCAxOSwgNDMsIDE1XSxcbiAgICAgICAgWzMsIDE0MSwgMTEzLCA0LCAxNDIsIDExNF0sXG4gICAgICAgIFszLCA3MCwgNDQsIDExLCA3MSwgNDVdLFxuICAgICAgICBbMTcsIDQ3LCAyMSwgNCwgNDgsIDIyXSxcbiAgICAgICAgWzksIDM5LCAxMywgMTYsIDQwLCAxNF0sXG4gICAgICAgIFszLCAxMzUsIDEwNywgNSwgMTM2LCAxMDhdLFxuICAgICAgICBbMywgNjcsIDQxLCAxMywgNjgsIDQyXSxcbiAgICAgICAgWzE1LCA1NCwgMjQsIDUsIDU1LCAyNV0sXG4gICAgICAgIFsxNSwgNDMsIDE1LCAxMCwgNDQsIDE2XSxcbiAgICAgICAgWzQsIDE0NCwgMTE2LCA0LCAxNDUsIDExN10sXG4gICAgICAgIFsxNywgNjgsIDQyXSxcbiAgICAgICAgWzE3LCA1MCwgMjIsIDYsIDUxLCAyM10sXG4gICAgICAgIFsxOSwgNDYsIDE2LCA2LCA0NywgMTddLFxuICAgICAgICBbMiwgMTM5LCAxMTEsIDcsIDE0MCwgMTEyXSxcbiAgICAgICAgWzE3LCA3NCwgNDZdLFxuICAgICAgICBbNywgNTQsIDI0LCAxNiwgNTUsIDI1XSxcbiAgICAgICAgWzM0LCAzNywgMTNdLFxuICAgICAgICBbNCwgMTUxLCAxMjEsIDUsIDE1MiwgMTIyXSxcbiAgICAgICAgWzQsIDc1LCA0NywgMTQsIDc2LCA0OF0sXG4gICAgICAgIFsxMSwgNTQsIDI0LCAxNCwgNTUsIDI1XSxcbiAgICAgICAgWzE2LCA0NSwgMTUsIDE0LCA0NiwgMTZdLFxuICAgICAgICBbNiwgMTQ3LCAxMTcsIDQsIDE0OCwgMTE4XSxcbiAgICAgICAgWzYsIDczLCA0NSwgMTQsIDc0LCA0Nl0sXG4gICAgICAgIFsxMSwgNTQsIDI0LCAxNiwgNTUsIDI1XSxcbiAgICAgICAgWzMwLCA0NiwgMTYsIDIsIDQ3LCAxN10sXG4gICAgICAgIFs4LCAxMzIsIDEwNiwgNCwgMTMzLCAxMDddLFxuICAgICAgICBbOCwgNzUsIDQ3LCAxMywgNzYsIDQ4XSxcbiAgICAgICAgWzcsIDU0LCAyNCwgMjIsIDU1LCAyNV0sXG4gICAgICAgIFsyMiwgNDUsIDE1LCAxMywgNDYsIDE2XSxcbiAgICAgICAgWzEwLCAxNDIsIDExNCwgMiwgMTQzLCAxMTVdLFxuICAgICAgICBbMTksIDc0LCA0NiwgNCwgNzUsIDQ3XSxcbiAgICAgICAgWzI4LCA1MCwgMjIsIDYsIDUxLCAyM10sXG4gICAgICAgIFszMywgNDYsIDE2LCA0LCA0NywgMTddLFxuICAgICAgICBbOCwgMTUyLCAxMjIsIDQsIDE1MywgMTIzXSxcbiAgICAgICAgWzIyLCA3MywgNDUsIDMsIDc0LCA0Nl0sXG4gICAgICAgIFs4LCA1MywgMjMsIDI2LCA1NCwgMjRdLFxuICAgICAgICBbMTIsIDQ1LCAxNSwgMjgsIDQ2LCAxNl0sXG4gICAgICAgIFszLCAxNDcsIDExNywgMTAsIDE0OCwgMTE4XSxcbiAgICAgICAgWzMsIDczLCA0NSwgMjMsIDc0LCA0Nl0sXG4gICAgICAgIFs0LCA1NCwgMjQsIDMxLCA1NSwgMjVdLFxuICAgICAgICBbMTEsIDQ1LCAxNSwgMzEsIDQ2LCAxNl0sXG4gICAgICAgIFs3LCAxNDYsIDExNiwgNywgMTQ3LCAxMTddLFxuICAgICAgICBbMjEsIDczLCA0NSwgNywgNzQsIDQ2XSxcbiAgICAgICAgWzEsIDUzLCAyMywgMzcsIDU0LCAyNF0sXG4gICAgICAgIFsxOSwgNDUsIDE1LCAyNiwgNDYsIDE2XSxcbiAgICAgICAgWzUsIDE0NSwgMTE1LCAxMCwgMTQ2LCAxMTZdLFxuICAgICAgICBbMTksIDc1LCA0NywgMTAsIDc2LCA0OF0sXG4gICAgICAgIFsxNSwgNTQsIDI0LCAyNSwgNTUsIDI1XSxcbiAgICAgICAgWzIzLCA0NSwgMTUsIDI1LCA0NiwgMTZdLFxuICAgICAgICBbMTMsIDE0NSwgMTE1LCAzLCAxNDYsIDExNl0sXG4gICAgICAgIFsyLCA3NCwgNDYsIDI5LCA3NSwgNDddLFxuICAgICAgICBbNDIsIDU0LCAyNCwgMSwgNTUsIDI1XSxcbiAgICAgICAgWzIzLCA0NSwgMTUsIDI4LCA0NiwgMTZdLFxuICAgICAgICBbMTcsIDE0NSwgMTE1XSxcbiAgICAgICAgWzEwLCA3NCwgNDYsIDIzLCA3NSwgNDddLFxuICAgICAgICBbMTAsIDU0LCAyNCwgMzUsIDU1LCAyNV0sXG4gICAgICAgIFsxOSwgNDUsIDE1LCAzNSwgNDYsIDE2XSxcbiAgICAgICAgWzE3LCAxNDUsIDExNSwgMSwgMTQ2LCAxMTZdLFxuICAgICAgICBbMTQsIDc0LCA0NiwgMjEsIDc1LCA0N10sXG4gICAgICAgIFsyOSwgNTQsIDI0LCAxOSwgNTUsIDI1XSxcbiAgICAgICAgWzExLCA0NSwgMTUsIDQ2LCA0NiwgMTZdLFxuICAgICAgICBbMTMsIDE0NSwgMTE1LCA2LCAxNDYsIDExNl0sXG4gICAgICAgIFsxNCwgNzQsIDQ2LCAyMywgNzUsIDQ3XSxcbiAgICAgICAgWzQ0LCA1NCwgMjQsIDcsIDU1LCAyNV0sXG4gICAgICAgIFs1OSwgNDYsIDE2LCAxLCA0NywgMTddLFxuICAgICAgICBbMTIsIDE1MSwgMTIxLCA3LCAxNTIsIDEyMl0sXG4gICAgICAgIFsxMiwgNzUsIDQ3LCAyNiwgNzYsIDQ4XSxcbiAgICAgICAgWzM5LCA1NCwgMjQsIDE0LCA1NSwgMjVdLFxuICAgICAgICBbMjIsIDQ1LCAxNSwgNDEsIDQ2LCAxNl0sXG4gICAgICAgIFs2LCAxNTEsIDEyMSwgMTQsIDE1MiwgMTIyXSxcbiAgICAgICAgWzYsIDc1LCA0NywgMzQsIDc2LCA0OF0sXG4gICAgICAgIFs0NiwgNTQsIDI0LCAxMCwgNTUsIDI1XSxcbiAgICAgICAgWzIsIDQ1LCAxNSwgNjQsIDQ2LCAxNl0sXG4gICAgICAgIFsxNywgMTUyLCAxMjIsIDQsIDE1MywgMTIzXSxcbiAgICAgICAgWzI5LCA3NCwgNDYsIDE0LCA3NSwgNDddLFxuICAgICAgICBbNDksIDU0LCAyNCwgMTAsIDU1LCAyNV0sXG4gICAgICAgIFsyNCwgNDUsIDE1LCA0NiwgNDYsIDE2XSxcbiAgICAgICAgWzQsIDE1MiwgMTIyLCAxOCwgMTUzLCAxMjNdLFxuICAgICAgICBbMTMsIDc0LCA0NiwgMzIsIDc1LCA0N10sXG4gICAgICAgIFs0OCwgNTQsIDI0LCAxNCwgNTUsIDI1XSxcbiAgICAgICAgWzQyLCA0NSwgMTUsIDMyLCA0NiwgMTZdLFxuICAgICAgICBbMjAsIDE0NywgMTE3LCA0LCAxNDgsIDExOF0sXG4gICAgICAgIFs0MCwgNzUsIDQ3LCA3LCA3NiwgNDhdLFxuICAgICAgICBbNDMsIDU0LCAyNCwgMjIsIDU1LCAyNV0sXG4gICAgICAgIFsxMCwgNDUsIDE1LCA2NywgNDYsIDE2XSxcbiAgICAgICAgWzE5LCAxNDgsIDExOCwgNiwgMTQ5LCAxMTldLFxuICAgICAgICBbMTgsIDc1LCA0NywgMzEsIDc2LCA0OF0sXG4gICAgICAgIFszNCwgNTQsIDI0LCAzNCwgNTUsIDI1XSxcbiAgICAgICAgWzIwLCA0NSwgMTUsIDYxLCA0NiwgMTZdLFxuICAgIF07XG4gICAgcmV0dXJuIFFSUlNCbG9jaztcbn0oKSk7XG52YXIgUVJCaXRCdWZmZXIgPSAvKiogQGNsYXNzICovIChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUVJCaXRCdWZmZXIoKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyID0gW107XG4gICAgICAgIHRoaXMubGVuZ3RoID0gMDtcbiAgICB9XG4gICAgUVJCaXRCdWZmZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICB2YXIgYnVmSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gOCk7XG4gICAgICAgIHJldHVybiAoKHRoaXMuYnVmZmVyW2J1ZkluZGV4XSA+Pj4gKDcgLSAoaW5kZXggJSA4KSkpICYgMSkgPT0gMTtcbiAgICB9O1xuICAgIFFSQml0QnVmZmVyLnByb3RvdHlwZS5wdXQgPSBmdW5jdGlvbiAobnVtLCBsZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wdXRCaXQoKChudW0gPj4+IChsZW5ndGggLSBpIC0gMSkpICYgMSkgPT0gMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFFSQml0QnVmZmVyLnByb3RvdHlwZS5nZXRMZW5ndGhJbkJpdHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgICB9O1xuICAgIFFSQml0QnVmZmVyLnByb3RvdHlwZS5wdXRCaXQgPSBmdW5jdGlvbiAoYml0KSB7XG4gICAgICAgIHZhciBidWZJbmRleCA9IE1hdGguZmxvb3IodGhpcy5sZW5ndGggLyA4KTtcbiAgICAgICAgaWYgKHRoaXMuYnVmZmVyLmxlbmd0aCA8PSBidWZJbmRleCkge1xuICAgICAgICAgICAgdGhpcy5idWZmZXIucHVzaCgwKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYml0KSB7XG4gICAgICAgICAgICB0aGlzLmJ1ZmZlcltidWZJbmRleF0gfD0gMHg4MCA+Pj4gdGhpcy5sZW5ndGggJSA4O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubGVuZ3RoKys7XG4gICAgfTtcbiAgICByZXR1cm4gUVJCaXRCdWZmZXI7XG59KCkpO1xudmFyIFFSQ29kZUxpbWl0TGVuZ3RoID0gW1xuICAgIFsxNywgMTQsIDExLCA3XSxcbiAgICBbMzIsIDI2LCAyMCwgMTRdLFxuICAgIFs1MywgNDIsIDMyLCAyNF0sXG4gICAgWzc4LCA2MiwgNDYsIDM0XSxcbiAgICBbMTA2LCA4NCwgNjAsIDQ0XSxcbiAgICBbMTM0LCAxMDYsIDc0LCA1OF0sXG4gICAgWzE1NCwgMTIyLCA4NiwgNjRdLFxuICAgIFsxOTIsIDE1MiwgMTA4LCA4NF0sXG4gICAgWzIzMCwgMTgwLCAxMzAsIDk4XSxcbiAgICBbMjcxLCAyMTMsIDE1MSwgMTE5XSxcbiAgICBbMzIxLCAyNTEsIDE3NywgMTM3XSxcbiAgICBbMzY3LCAyODcsIDIwMywgMTU1XSxcbiAgICBbNDI1LCAzMzEsIDI0MSwgMTc3XSxcbiAgICBbNDU4LCAzNjIsIDI1OCwgMTk0XSxcbiAgICBbNTIwLCA0MTIsIDI5MiwgMjIwXSxcbiAgICBbNTg2LCA0NTAsIDMyMiwgMjUwXSxcbiAgICBbNjQ0LCA1MDQsIDM2NCwgMjgwXSxcbiAgICBbNzE4LCA1NjAsIDM5NCwgMzEwXSxcbiAgICBbNzkyLCA2MjQsIDQ0MiwgMzM4XSxcbiAgICBbODU4LCA2NjYsIDQ4MiwgMzgyXSxcbiAgICBbOTI5LCA3MTEsIDUwOSwgNDAzXSxcbiAgICBbMTAwMywgNzc5LCA1NjUsIDQzOV0sXG4gICAgWzEwOTEsIDg1NywgNjExLCA0NjFdLFxuICAgIFsxMTcxLCA5MTEsIDY2MSwgNTExXSxcbiAgICBbMTI3MywgOTk3LCA3MTUsIDUzNV0sXG4gICAgWzEzNjcsIDEwNTksIDc1MSwgNTkzXSxcbiAgICBbMTQ2NSwgMTEyNSwgODA1LCA2MjVdLFxuICAgIFsxNTI4LCAxMTkwLCA4NjgsIDY1OF0sXG4gICAgWzE2MjgsIDEyNjQsIDkwOCwgNjk4XSxcbiAgICBbMTczMiwgMTM3MCwgOTgyLCA3NDJdLFxuICAgIFsxODQwLCAxNDUyLCAxMDMwLCA3OTBdLFxuICAgIFsxOTUyLCAxNTM4LCAxMTEyLCA4NDJdLFxuICAgIFsyMDY4LCAxNjI4LCAxMTY4LCA4OThdLFxuICAgIFsyMTg4LCAxNzIyLCAxMjI4LCA5NThdLFxuICAgIFsyMzAzLCAxODA5LCAxMjgzLCA5ODNdLFxuICAgIFsyNDMxLCAxOTExLCAxMzUxLCAxMDUxXSxcbiAgICBbMjU2MywgMTk4OSwgMTQyMywgMTA5M10sXG4gICAgWzI2OTksIDIwOTksIDE0OTksIDExMzldLFxuICAgIFsyODA5LCAyMjEzLCAxNTc5LCAxMjE5XSxcbiAgICBbMjk1MywgMjMzMSwgMTY2MywgMTI3M10sXG5dO1xuIiwiLyogZ2xvYmFscyBkb2N1bWVudCwgSW1hZ2VEYXRhICovXG5cbmNvbnN0IHBhcnNlRm9udCA9IHJlcXVpcmUoJy4vbGliL3BhcnNlLWZvbnQnKVxuXG5leHBvcnRzLnBhcnNlRm9udCA9IHBhcnNlRm9udFxuXG5leHBvcnRzLmNyZWF0ZUNhbnZhcyA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gIHJldHVybiBPYmplY3QuYXNzaWduKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpLCB7IHdpZHRoOiB3aWR0aCwgaGVpZ2h0OiBoZWlnaHQgfSlcbn1cblxuZXhwb3J0cy5jcmVhdGVJbWFnZURhdGEgPSBmdW5jdGlvbiAoYXJyYXksIHdpZHRoLCBoZWlnaHQpIHtcbiAgLy8gQnJvd3NlciBpbXBsZW1lbnRhdGlvbiBvZiBJbWFnZURhdGEgbG9va3MgYXQgdGhlIG51bWJlciBvZiBhcmd1bWVudHMgcGFzc2VkXG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIG5ldyBJbWFnZURhdGEoKVxuICAgIGNhc2UgMTogcmV0dXJuIG5ldyBJbWFnZURhdGEoYXJyYXkpXG4gICAgY2FzZSAyOiByZXR1cm4gbmV3IEltYWdlRGF0YShhcnJheSwgd2lkdGgpXG4gICAgZGVmYXVsdDogcmV0dXJuIG5ldyBJbWFnZURhdGEoYXJyYXksIHdpZHRoLCBoZWlnaHQpXG4gIH1cbn1cblxuZXhwb3J0cy5sb2FkSW1hZ2UgPSBmdW5jdGlvbiAoc3JjLCBvcHRpb25zKSB7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgY29uc3QgaW1hZ2UgPSBPYmplY3QuYXNzaWduKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpLCBvcHRpb25zKVxuXG4gICAgZnVuY3Rpb24gY2xlYW51cCAoKSB7XG4gICAgICBpbWFnZS5vbmxvYWQgPSBudWxsXG4gICAgICBpbWFnZS5vbmVycm9yID0gbnVsbFxuICAgIH1cblxuICAgIGltYWdlLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHsgY2xlYW51cCgpOyByZXNvbHZlKGltYWdlKSB9XG4gICAgaW1hZ2Uub25lcnJvciA9IGZ1bmN0aW9uICgpIHsgY2xlYW51cCgpOyByZWplY3QobmV3IEVycm9yKCdGYWlsZWQgdG8gbG9hZCB0aGUgaW1hZ2UgXCInICsgc3JjICsgJ1wiJykpIH1cblxuICAgIGltYWdlLnNyYyA9IHNyY1xuICB9KVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbi8qKlxuICogRm9udCBSZWdFeHAgaGVscGVycy5cbiAqL1xuXG5jb25zdCB3ZWlnaHRzID0gJ2JvbGR8Ym9sZGVyfGxpZ2h0ZXJ8WzEtOV0wMCdcbiAgLCBzdHlsZXMgPSAnaXRhbGljfG9ibGlxdWUnXG4gICwgdmFyaWFudHMgPSAnc21hbGwtY2FwcydcbiAgLCBzdHJldGNoZXMgPSAndWx0cmEtY29uZGVuc2VkfGV4dHJhLWNvbmRlbnNlZHxjb25kZW5zZWR8c2VtaS1jb25kZW5zZWR8c2VtaS1leHBhbmRlZHxleHBhbmRlZHxleHRyYS1leHBhbmRlZHx1bHRyYS1leHBhbmRlZCdcbiAgLCB1bml0cyA9ICdweHxwdHxwY3xpbnxjbXxtbXwlfGVtfGV4fGNofHJlbXxxJ1xuICAsIHN0cmluZyA9ICdcXCcoW15cXCddKylcXCd8XCIoW15cIl0rKVwifFtcXFxcd1xcXFxzLV0rJ1xuXG4vLyBbIFsgPOKAmGZvbnQtc3R5bGXigJk+IHx8IDxmb250LXZhcmlhbnQtY3NzMjE+IHx8IDzigJhmb250LXdlaWdodOKAmT4gfHwgPOKAmGZvbnQtc3RyZXRjaOKAmT4gXT9cbi8vICAgIDzigJhmb250LXNpemXigJk+IFsgLyA84oCYbGluZS1oZWlnaHTigJk+IF0/IDzigJhmb250LWZhbWlseeKAmT4gXVxuLy8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy1mb250cy0zLyNmb250LXByb3BcbmNvbnN0IHdlaWdodFJlID0gbmV3IFJlZ0V4cCgnKCcgKyB3ZWlnaHRzICsgJykgKycsICdpJylcbmNvbnN0IHN0eWxlUmUgPSBuZXcgUmVnRXhwKCcoJyArIHN0eWxlcyArICcpICsnLCAnaScpXG5jb25zdCB2YXJpYW50UmUgPSBuZXcgUmVnRXhwKCcoJyArIHZhcmlhbnRzICsgJykgKycsICdpJylcbmNvbnN0IHN0cmV0Y2hSZSA9IG5ldyBSZWdFeHAoJygnICsgc3RyZXRjaGVzICsgJykgKycsICdpJylcbmNvbnN0IHNpemVGYW1pbHlSZSA9IG5ldyBSZWdFeHAoXG4gICcoW1xcXFxkXFxcXC5dKykoJyArIHVuaXRzICsgJykgKidcbiAgKyAnKCg/OicgKyBzdHJpbmcgKyAnKSggKiwgKig/OicgKyBzdHJpbmcgKyAnKSkqKScpXG5cbi8qKlxuICogQ2FjaGUgZm9udCBwYXJzaW5nLlxuICovXG5cbmNvbnN0IGNhY2hlID0ge31cblxuY29uc3QgZGVmYXVsdEhlaWdodCA9IDE2IC8vIHB0LCBjb21tb24gYnJvd3NlciBkZWZhdWx0XG5cbi8qKlxuICogUGFyc2UgZm9udCBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9IFBhcnNlZCBmb250LiBgc2l6ZWAgaXMgaW4gZGV2aWNlIHVuaXRzLiBgdW5pdGAgaXMgdGhlIHVuaXRcbiAqICAgYXBwZWFyaW5nIGluIHRoZSBpbnB1dCBzdHJpbmcuXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIpIHtcbiAgLy8gQ2FjaGVkXG4gIGlmIChjYWNoZVtzdHJdKSByZXR1cm4gY2FjaGVbc3RyXVxuXG4gIC8vIFRyeSBmb3IgcmVxdWlyZWQgcHJvcGVydGllcyBmaXJzdC5cbiAgY29uc3Qgc2l6ZUZhbWlseSA9IHNpemVGYW1pbHlSZS5leGVjKHN0cilcbiAgaWYgKCFzaXplRmFtaWx5KSByZXR1cm4gLy8gaW52YWxpZFxuXG4gIC8vIERlZmF1bHQgdmFsdWVzIGFuZCByZXF1aXJlZCBwcm9wZXJ0aWVzXG4gIGNvbnN0IGZvbnQgPSB7XG4gICAgd2VpZ2h0OiAnbm9ybWFsJyxcbiAgICBzdHlsZTogJ25vcm1hbCcsXG4gICAgc3RyZXRjaDogJ25vcm1hbCcsXG4gICAgdmFyaWFudDogJ25vcm1hbCcsXG4gICAgc2l6ZTogcGFyc2VGbG9hdChzaXplRmFtaWx5WzFdKSxcbiAgICB1bml0OiBzaXplRmFtaWx5WzJdLFxuICAgIGZhbWlseTogc2l6ZUZhbWlseVszXS5yZXBsYWNlKC9bXCInXS9nLCAnJykucmVwbGFjZSgvICosICovZywgJywnKVxuICB9XG5cbiAgLy8gT3B0aW9uYWwsIHVub3JkZXJlZCBwcm9wZXJ0aWVzLlxuICBsZXQgd2VpZ2h0LCBzdHlsZSwgdmFyaWFudCwgc3RyZXRjaFxuICAvLyBTdG9wIHNlYXJjaCBhdCBgc2l6ZUZhbWlseS5pbmRleGBcbiAgbGV0IHN1YnN0ciA9IHN0ci5zdWJzdHJpbmcoMCwgc2l6ZUZhbWlseS5pbmRleClcbiAgaWYgKCh3ZWlnaHQgPSB3ZWlnaHRSZS5leGVjKHN1YnN0cikpKSBmb250LndlaWdodCA9IHdlaWdodFsxXVxuICBpZiAoKHN0eWxlID0gc3R5bGVSZS5leGVjKHN1YnN0cikpKSBmb250LnN0eWxlID0gc3R5bGVbMV1cbiAgaWYgKCh2YXJpYW50ID0gdmFyaWFudFJlLmV4ZWMoc3Vic3RyKSkpIGZvbnQudmFyaWFudCA9IHZhcmlhbnRbMV1cbiAgaWYgKChzdHJldGNoID0gc3RyZXRjaFJlLmV4ZWMoc3Vic3RyKSkpIGZvbnQuc3RyZXRjaCA9IHN0cmV0Y2hbMV1cblxuICAvLyBDb252ZXJ0IHRvIGRldmljZSB1bml0cy4gKGBmb250LnVuaXRgIGlzIHRoZSBvcmlnaW5hbCB1bml0KVxuICAvLyBUT0RPOiBjaCwgZXhcbiAgc3dpdGNoIChmb250LnVuaXQpIHtcbiAgICBjYXNlICdwdCc6XG4gICAgICBmb250LnNpemUgLz0gMC43NVxuICAgICAgYnJlYWtcbiAgICBjYXNlICdwYyc6XG4gICAgICBmb250LnNpemUgKj0gMTZcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnaW4nOlxuICAgICAgZm9udC5zaXplICo9IDk2XG4gICAgICBicmVha1xuICAgIGNhc2UgJ2NtJzpcbiAgICAgIGZvbnQuc2l6ZSAqPSA5Ni4wIC8gMi41NFxuICAgICAgYnJlYWtcbiAgICBjYXNlICdtbSc6XG4gICAgICBmb250LnNpemUgKj0gOTYuMCAvIDI1LjRcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnJSc6XG4gICAgICAvLyBUT0RPIGRpc2FibGVkIGJlY2F1c2UgZXhpc3RpbmcgdW5pdCB0ZXN0cyBhc3N1bWUgMTAwXG4gICAgICAvLyBmb250LnNpemUgKj0gZGVmYXVsdEhlaWdodCAvIDEwMCAvIDAuNzVcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAnZW0nOlxuICAgIGNhc2UgJ3JlbSc6XG4gICAgICBmb250LnNpemUgKj0gZGVmYXVsdEhlaWdodCAvIDAuNzVcbiAgICAgIGJyZWFrXG4gICAgY2FzZSAncSc6XG4gICAgICBmb250LnNpemUgKj0gOTYgLyAyNS40IC8gNFxuICAgICAgYnJlYWtcbiAgfVxuXG4gIHJldHVybiAoY2FjaGVbc3RyXSA9IGZvbnQpXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMubG9vcCA9IGV4cG9ydHMuY29uZGl0aW9uYWwgPSBleHBvcnRzLnBhcnNlID0gdm9pZCAwO1xuXG52YXIgcGFyc2UgPSBmdW5jdGlvbiBwYXJzZShzdHJlYW0sIHNjaGVtYSkge1xuICB2YXIgcmVzdWx0ID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgdmFyIHBhcmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogcmVzdWx0O1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHNjaGVtYSkpIHtcbiAgICBzY2hlbWEuZm9yRWFjaChmdW5jdGlvbiAocGFydFNjaGVtYSkge1xuICAgICAgcmV0dXJuIHBhcnNlKHN0cmVhbSwgcGFydFNjaGVtYSwgcmVzdWx0LCBwYXJlbnQpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzY2hlbWEgPT09ICdmdW5jdGlvbicpIHtcbiAgICBzY2hlbWEoc3RyZWFtLCByZXN1bHQsIHBhcmVudCwgcGFyc2UpO1xuICB9IGVsc2Uge1xuICAgIHZhciBrZXkgPSBPYmplY3Qua2V5cyhzY2hlbWEpWzBdO1xuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc2NoZW1hW2tleV0pKSB7XG4gICAgICBwYXJlbnRba2V5XSA9IHt9O1xuICAgICAgcGFyc2Uoc3RyZWFtLCBzY2hlbWFba2V5XSwgcmVzdWx0LCBwYXJlbnRba2V5XSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmVudFtrZXldID0gc2NoZW1hW2tleV0oc3RyZWFtLCByZXN1bHQsIHBhcmVudCwgcGFyc2UpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XG5cbnZhciBjb25kaXRpb25hbCA9IGZ1bmN0aW9uIGNvbmRpdGlvbmFsKHNjaGVtYSwgY29uZGl0aW9uRnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSwgcmVzdWx0LCBwYXJlbnQsIHBhcnNlKSB7XG4gICAgaWYgKGNvbmRpdGlvbkZ1bmMoc3RyZWFtLCByZXN1bHQsIHBhcmVudCkpIHtcbiAgICAgIHBhcnNlKHN0cmVhbSwgc2NoZW1hLCByZXN1bHQsIHBhcmVudCk7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0cy5jb25kaXRpb25hbCA9IGNvbmRpdGlvbmFsO1xuXG52YXIgbG9vcCA9IGZ1bmN0aW9uIGxvb3Aoc2NoZW1hLCBjb250aW51ZUZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHJlc3VsdCwgcGFyZW50LCBwYXJzZSkge1xuICAgIHZhciBhcnIgPSBbXTtcblxuICAgIHdoaWxlIChjb250aW51ZUZ1bmMoc3RyZWFtLCByZXN1bHQsIHBhcmVudCkpIHtcbiAgICAgIHZhciBuZXdQYXJlbnQgPSB7fTtcbiAgICAgIHBhcnNlKHN0cmVhbSwgc2NoZW1hLCByZXN1bHQsIG5ld1BhcmVudCk7XG4gICAgICBhcnIucHVzaChuZXdQYXJlbnQpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnI7XG4gIH07XG59O1xuXG5leHBvcnRzLmxvb3AgPSBsb29wOyIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5yZWFkQml0cyA9IGV4cG9ydHMucmVhZEFycmF5ID0gZXhwb3J0cy5yZWFkVW5zaWduZWQgPSBleHBvcnRzLnJlYWRTdHJpbmcgPSBleHBvcnRzLnBlZWtCeXRlcyA9IGV4cG9ydHMucmVhZEJ5dGVzID0gZXhwb3J0cy5wZWVrQnl0ZSA9IGV4cG9ydHMucmVhZEJ5dGUgPSBleHBvcnRzLmJ1aWxkU3RyZWFtID0gdm9pZCAwO1xuXG4vLyBEZWZhdWx0IHN0cmVhbSBhbmQgcGFyc2VycyBmb3IgVWludDhUeXBlZEFycmF5IGRhdGEgdHlwZVxudmFyIGJ1aWxkU3RyZWFtID0gZnVuY3Rpb24gYnVpbGRTdHJlYW0odWludDhEYXRhKSB7XG4gIHJldHVybiB7XG4gICAgZGF0YTogdWludDhEYXRhLFxuICAgIHBvczogMFxuICB9O1xufTtcblxuZXhwb3J0cy5idWlsZFN0cmVhbSA9IGJ1aWxkU3RyZWFtO1xuXG52YXIgcmVhZEJ5dGUgPSBmdW5jdGlvbiByZWFkQnl0ZSgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICByZXR1cm4gc3RyZWFtLmRhdGFbc3RyZWFtLnBvcysrXTtcbiAgfTtcbn07XG5cbmV4cG9ydHMucmVhZEJ5dGUgPSByZWFkQnl0ZTtcblxudmFyIHBlZWtCeXRlID0gZnVuY3Rpb24gcGVla0J5dGUoKSB7XG4gIHZhciBvZmZzZXQgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDA7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgcmV0dXJuIHN0cmVhbS5kYXRhW3N0cmVhbS5wb3MgKyBvZmZzZXRdO1xuICB9O1xufTtcblxuZXhwb3J0cy5wZWVrQnl0ZSA9IHBlZWtCeXRlO1xuXG52YXIgcmVhZEJ5dGVzID0gZnVuY3Rpb24gcmVhZEJ5dGVzKGxlbmd0aCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgIHJldHVybiBzdHJlYW0uZGF0YS5zdWJhcnJheShzdHJlYW0ucG9zLCBzdHJlYW0ucG9zICs9IGxlbmd0aCk7XG4gIH07XG59O1xuXG5leHBvcnRzLnJlYWRCeXRlcyA9IHJlYWRCeXRlcztcblxudmFyIHBlZWtCeXRlcyA9IGZ1bmN0aW9uIHBlZWtCeXRlcyhsZW5ndGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICByZXR1cm4gc3RyZWFtLmRhdGEuc3ViYXJyYXkoc3RyZWFtLnBvcywgc3RyZWFtLnBvcyArIGxlbmd0aCk7XG4gIH07XG59O1xuXG5leHBvcnRzLnBlZWtCeXRlcyA9IHBlZWtCeXRlcztcblxudmFyIHJlYWRTdHJpbmcgPSBmdW5jdGlvbiByZWFkU3RyaW5nKGxlbmd0aCkge1xuICByZXR1cm4gZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHJlYWRCeXRlcyhsZW5ndGgpKHN0cmVhbSkpLm1hcChmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHZhbHVlKTtcbiAgICB9KS5qb2luKCcnKTtcbiAgfTtcbn07XG5cbmV4cG9ydHMucmVhZFN0cmluZyA9IHJlYWRTdHJpbmc7XG5cbnZhciByZWFkVW5zaWduZWQgPSBmdW5jdGlvbiByZWFkVW5zaWduZWQobGl0dGxlRW5kaWFuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgdmFyIGJ5dGVzID0gcmVhZEJ5dGVzKDIpKHN0cmVhbSk7XG4gICAgcmV0dXJuIGxpdHRsZUVuZGlhbiA/IChieXRlc1sxXSA8PCA4KSArIGJ5dGVzWzBdIDogKGJ5dGVzWzBdIDw8IDgpICsgYnl0ZXNbMV07XG4gIH07XG59O1xuXG5leHBvcnRzLnJlYWRVbnNpZ25lZCA9IHJlYWRVbnNpZ25lZDtcblxudmFyIHJlYWRBcnJheSA9IGZ1bmN0aW9uIHJlYWRBcnJheShieXRlU2l6ZSwgdG90YWxPckZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0sIHJlc3VsdCwgcGFyZW50KSB7XG4gICAgdmFyIHRvdGFsID0gdHlwZW9mIHRvdGFsT3JGdW5jID09PSAnZnVuY3Rpb24nID8gdG90YWxPckZ1bmMoc3RyZWFtLCByZXN1bHQsIHBhcmVudCkgOiB0b3RhbE9yRnVuYztcbiAgICB2YXIgcGFyc2VyID0gcmVhZEJ5dGVzKGJ5dGVTaXplKTtcbiAgICB2YXIgYXJyID0gbmV3IEFycmF5KHRvdGFsKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWw7IGkrKykge1xuICAgICAgYXJyW2ldID0gcGFyc2VyKHN0cmVhbSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjtcbiAgfTtcbn07XG5cbmV4cG9ydHMucmVhZEFycmF5ID0gcmVhZEFycmF5O1xuXG52YXIgc3ViQml0c1RvdGFsID0gZnVuY3Rpb24gc3ViQml0c1RvdGFsKGJpdHMsIHN0YXJ0SW5kZXgsIGxlbmd0aCkge1xuICB2YXIgcmVzdWx0ID0gMDtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgcmVzdWx0ICs9IGJpdHNbc3RhcnRJbmRleCArIGldICYmIE1hdGgucG93KDIsIGxlbmd0aCAtIGkgLSAxKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG52YXIgcmVhZEJpdHMgPSBmdW5jdGlvbiByZWFkQml0cyhzY2hlbWEpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgICB2YXIgX2J5dGUgPSByZWFkQnl0ZSgpKHN0cmVhbSk7IC8vIGNvbnZlcnQgdGhlIGJ5dGUgdG8gYml0IGFycmF5XG5cblxuICAgIHZhciBiaXRzID0gbmV3IEFycmF5KDgpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgIGJpdHNbNyAtIGldID0gISEoX2J5dGUgJiAxIDw8IGkpO1xuICAgIH0gLy8gY29udmVydCB0aGUgYml0IGFycmF5IHRvIHZhbHVlcyBiYXNlZCBvbiB0aGUgc2NoZW1hXG5cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzY2hlbWEpLnJlZHVjZShmdW5jdGlvbiAocmVzLCBrZXkpIHtcbiAgICAgIHZhciBkZWYgPSBzY2hlbWFba2V5XTtcblxuICAgICAgaWYgKGRlZi5sZW5ndGgpIHtcbiAgICAgICAgcmVzW2tleV0gPSBzdWJCaXRzVG90YWwoYml0cywgZGVmLmluZGV4LCBkZWYubGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc1trZXldID0gYml0c1tkZWYuaW5kZXhdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzO1xuICAgIH0sIHt9KTtcbiAgfTtcbn07XG5cbmV4cG9ydHMucmVhZEJpdHMgPSByZWFkQml0czsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbXCJkZWZhdWx0XCJdID0gdm9pZCAwO1xuXG52YXIgXyA9IHJlcXVpcmUoXCIuLi9cIik7XG5cbnZhciBfdWludCA9IHJlcXVpcmUoXCIuLi9wYXJzZXJzL3VpbnQ4XCIpO1xuXG4vLyBhIHNldCBvZiAweDAwIHRlcm1pbmF0ZWQgc3ViYmxvY2tzXG52YXIgc3ViQmxvY2tzU2NoZW1hID0ge1xuICBibG9ja3M6IGZ1bmN0aW9uIGJsb2NrcyhzdHJlYW0pIHtcbiAgICB2YXIgdGVybWluYXRvciA9IDB4MDA7XG4gICAgdmFyIGNodW5rcyA9IFtdO1xuICAgIHZhciBzdHJlYW1TaXplID0gc3RyZWFtLmRhdGEubGVuZ3RoO1xuICAgIHZhciB0b3RhbCA9IDA7XG5cbiAgICBmb3IgKHZhciBzaXplID0gKDAsIF91aW50LnJlYWRCeXRlKSgpKHN0cmVhbSk7IHNpemUgIT09IHRlcm1pbmF0b3I7IHNpemUgPSAoMCwgX3VpbnQucmVhZEJ5dGUpKCkoc3RyZWFtKSkge1xuICAgICAgLy8gY2F0Y2ggY29ycnVwdGVkIGZpbGVzIHdpdGggbm8gdGVybWluYXRvclxuICAgICAgaWYgKHN0cmVhbS5wb3MgKyBzaXplID49IHN0cmVhbVNpemUpIHtcbiAgICAgICAgdmFyIGF2YWlsYWJsZVNpemUgPSBzdHJlYW1TaXplIC0gc3RyZWFtLnBvcztcbiAgICAgICAgY2h1bmtzLnB1c2goKDAsIF91aW50LnJlYWRCeXRlcykoYXZhaWxhYmxlU2l6ZSkoc3RyZWFtKSk7XG4gICAgICAgIHRvdGFsICs9IGF2YWlsYWJsZVNpemU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjaHVua3MucHVzaCgoMCwgX3VpbnQucmVhZEJ5dGVzKShzaXplKShzdHJlYW0pKTtcbiAgICAgIHRvdGFsICs9IHNpemU7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IG5ldyBVaW50OEFycmF5KHRvdGFsKTtcbiAgICB2YXIgb2Zmc2V0ID0gMDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2h1bmtzLmxlbmd0aDsgaSsrKSB7XG4gICAgICByZXN1bHQuc2V0KGNodW5rc1tpXSwgb2Zmc2V0KTtcbiAgICAgIG9mZnNldCArPSBjaHVua3NbaV0ubGVuZ3RoO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn07IC8vIGdsb2JhbCBjb250cm9sIGV4dGVuc2lvblxuXG52YXIgZ2NlU2NoZW1hID0gKDAsIF8uY29uZGl0aW9uYWwpKHtcbiAgZ2NlOiBbe1xuICAgIGNvZGVzOiAoMCwgX3VpbnQucmVhZEJ5dGVzKSgyKVxuICB9LCB7XG4gICAgYnl0ZVNpemU6ICgwLCBfdWludC5yZWFkQnl0ZSkoKVxuICB9LCB7XG4gICAgZXh0cmFzOiAoMCwgX3VpbnQucmVhZEJpdHMpKHtcbiAgICAgIGZ1dHVyZToge1xuICAgICAgICBpbmRleDogMCxcbiAgICAgICAgbGVuZ3RoOiAzXG4gICAgICB9LFxuICAgICAgZGlzcG9zYWw6IHtcbiAgICAgICAgaW5kZXg6IDMsXG4gICAgICAgIGxlbmd0aDogM1xuICAgICAgfSxcbiAgICAgIHVzZXJJbnB1dDoge1xuICAgICAgICBpbmRleDogNlxuICAgICAgfSxcbiAgICAgIHRyYW5zcGFyZW50Q29sb3JHaXZlbjoge1xuICAgICAgICBpbmRleDogN1xuICAgICAgfVxuICAgIH0pXG4gIH0sIHtcbiAgICBkZWxheTogKDAsIF91aW50LnJlYWRVbnNpZ25lZCkodHJ1ZSlcbiAgfSwge1xuICAgIHRyYW5zcGFyZW50Q29sb3JJbmRleDogKDAsIF91aW50LnJlYWRCeXRlKSgpXG4gIH0sIHtcbiAgICB0ZXJtaW5hdG9yOiAoMCwgX3VpbnQucmVhZEJ5dGUpKClcbiAgfV1cbn0sIGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgdmFyIGNvZGVzID0gKDAsIF91aW50LnBlZWtCeXRlcykoMikoc3RyZWFtKTtcbiAgcmV0dXJuIGNvZGVzWzBdID09PSAweDIxICYmIGNvZGVzWzFdID09PSAweGY5O1xufSk7IC8vIGltYWdlIHBpcGVsaW5lIGJsb2NrXG5cbnZhciBpbWFnZVNjaGVtYSA9ICgwLCBfLmNvbmRpdGlvbmFsKSh7XG4gIGltYWdlOiBbe1xuICAgIGNvZGU6ICgwLCBfdWludC5yZWFkQnl0ZSkoKVxuICB9LCB7XG4gICAgZGVzY3JpcHRvcjogW3tcbiAgICAgIGxlZnQ6ICgwLCBfdWludC5yZWFkVW5zaWduZWQpKHRydWUpXG4gICAgfSwge1xuICAgICAgdG9wOiAoMCwgX3VpbnQucmVhZFVuc2lnbmVkKSh0cnVlKVxuICAgIH0sIHtcbiAgICAgIHdpZHRoOiAoMCwgX3VpbnQucmVhZFVuc2lnbmVkKSh0cnVlKVxuICAgIH0sIHtcbiAgICAgIGhlaWdodDogKDAsIF91aW50LnJlYWRVbnNpZ25lZCkodHJ1ZSlcbiAgICB9LCB7XG4gICAgICBsY3Q6ICgwLCBfdWludC5yZWFkQml0cykoe1xuICAgICAgICBleGlzdHM6IHtcbiAgICAgICAgICBpbmRleDogMFxuICAgICAgICB9LFxuICAgICAgICBpbnRlcmxhY2VkOiB7XG4gICAgICAgICAgaW5kZXg6IDFcbiAgICAgICAgfSxcbiAgICAgICAgc29ydDoge1xuICAgICAgICAgIGluZGV4OiAyXG4gICAgICAgIH0sXG4gICAgICAgIGZ1dHVyZToge1xuICAgICAgICAgIGluZGV4OiAzLFxuICAgICAgICAgIGxlbmd0aDogMlxuICAgICAgICB9LFxuICAgICAgICBzaXplOiB7XG4gICAgICAgICAgaW5kZXg6IDUsXG4gICAgICAgICAgbGVuZ3RoOiAzXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfV1cbiAgfSwgKDAsIF8uY29uZGl0aW9uYWwpKHtcbiAgICBsY3Q6ICgwLCBfdWludC5yZWFkQXJyYXkpKDMsIGZ1bmN0aW9uIChzdHJlYW0sIHJlc3VsdCwgcGFyZW50KSB7XG4gICAgICByZXR1cm4gTWF0aC5wb3coMiwgcGFyZW50LmRlc2NyaXB0b3IubGN0LnNpemUgKyAxKTtcbiAgICB9KVxuICB9LCBmdW5jdGlvbiAoc3RyZWFtLCByZXN1bHQsIHBhcmVudCkge1xuICAgIHJldHVybiBwYXJlbnQuZGVzY3JpcHRvci5sY3QuZXhpc3RzO1xuICB9KSwge1xuICAgIGRhdGE6IFt7XG4gICAgICBtaW5Db2RlU2l6ZTogKDAsIF91aW50LnJlYWRCeXRlKSgpXG4gICAgfSwgc3ViQmxvY2tzU2NoZW1hXVxuICB9XVxufSwgZnVuY3Rpb24gKHN0cmVhbSkge1xuICByZXR1cm4gKDAsIF91aW50LnBlZWtCeXRlKSgpKHN0cmVhbSkgPT09IDB4MmM7XG59KTsgLy8gcGxhaW4gdGV4dCBibG9ja1xuXG52YXIgdGV4dFNjaGVtYSA9ICgwLCBfLmNvbmRpdGlvbmFsKSh7XG4gIHRleHQ6IFt7XG4gICAgY29kZXM6ICgwLCBfdWludC5yZWFkQnl0ZXMpKDIpXG4gIH0sIHtcbiAgICBibG9ja1NpemU6ICgwLCBfdWludC5yZWFkQnl0ZSkoKVxuICB9LCB7XG4gICAgcHJlRGF0YTogZnVuY3Rpb24gcHJlRGF0YShzdHJlYW0sIHJlc3VsdCwgcGFyZW50KSB7XG4gICAgICByZXR1cm4gKDAsIF91aW50LnJlYWRCeXRlcykocGFyZW50LnRleHQuYmxvY2tTaXplKShzdHJlYW0pO1xuICAgIH1cbiAgfSwgc3ViQmxvY2tzU2NoZW1hXVxufSwgZnVuY3Rpb24gKHN0cmVhbSkge1xuICB2YXIgY29kZXMgPSAoMCwgX3VpbnQucGVla0J5dGVzKSgyKShzdHJlYW0pO1xuICByZXR1cm4gY29kZXNbMF0gPT09IDB4MjEgJiYgY29kZXNbMV0gPT09IDB4MDE7XG59KTsgLy8gYXBwbGljYXRpb24gYmxvY2tcblxudmFyIGFwcGxpY2F0aW9uU2NoZW1hID0gKDAsIF8uY29uZGl0aW9uYWwpKHtcbiAgYXBwbGljYXRpb246IFt7XG4gICAgY29kZXM6ICgwLCBfdWludC5yZWFkQnl0ZXMpKDIpXG4gIH0sIHtcbiAgICBibG9ja1NpemU6ICgwLCBfdWludC5yZWFkQnl0ZSkoKVxuICB9LCB7XG4gICAgaWQ6IGZ1bmN0aW9uIGlkKHN0cmVhbSwgcmVzdWx0LCBwYXJlbnQpIHtcbiAgICAgIHJldHVybiAoMCwgX3VpbnQucmVhZFN0cmluZykocGFyZW50LmJsb2NrU2l6ZSkoc3RyZWFtKTtcbiAgICB9XG4gIH0sIHN1YkJsb2Nrc1NjaGVtYV1cbn0sIGZ1bmN0aW9uIChzdHJlYW0pIHtcbiAgdmFyIGNvZGVzID0gKDAsIF91aW50LnBlZWtCeXRlcykoMikoc3RyZWFtKTtcbiAgcmV0dXJuIGNvZGVzWzBdID09PSAweDIxICYmIGNvZGVzWzFdID09PSAweGZmO1xufSk7IC8vIGNvbW1lbnQgYmxvY2tcblxudmFyIGNvbW1lbnRTY2hlbWEgPSAoMCwgXy5jb25kaXRpb25hbCkoe1xuICBjb21tZW50OiBbe1xuICAgIGNvZGVzOiAoMCwgX3VpbnQucmVhZEJ5dGVzKSgyKVxuICB9LCBzdWJCbG9ja3NTY2hlbWFdXG59LCBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gIHZhciBjb2RlcyA9ICgwLCBfdWludC5wZWVrQnl0ZXMpKDIpKHN0cmVhbSk7XG4gIHJldHVybiBjb2Rlc1swXSA9PT0gMHgyMSAmJiBjb2Rlc1sxXSA9PT0gMHhmZTtcbn0pO1xudmFyIHNjaGVtYSA9IFt7XG4gIGhlYWRlcjogW3tcbiAgICBzaWduYXR1cmU6ICgwLCBfdWludC5yZWFkU3RyaW5nKSgzKVxuICB9LCB7XG4gICAgdmVyc2lvbjogKDAsIF91aW50LnJlYWRTdHJpbmcpKDMpXG4gIH1dXG59LCB7XG4gIGxzZDogW3tcbiAgICB3aWR0aDogKDAsIF91aW50LnJlYWRVbnNpZ25lZCkodHJ1ZSlcbiAgfSwge1xuICAgIGhlaWdodDogKDAsIF91aW50LnJlYWRVbnNpZ25lZCkodHJ1ZSlcbiAgfSwge1xuICAgIGdjdDogKDAsIF91aW50LnJlYWRCaXRzKSh7XG4gICAgICBleGlzdHM6IHtcbiAgICAgICAgaW5kZXg6IDBcbiAgICAgIH0sXG4gICAgICByZXNvbHV0aW9uOiB7XG4gICAgICAgIGluZGV4OiAxLFxuICAgICAgICBsZW5ndGg6IDNcbiAgICAgIH0sXG4gICAgICBzb3J0OiB7XG4gICAgICAgIGluZGV4OiA0XG4gICAgICB9LFxuICAgICAgc2l6ZToge1xuICAgICAgICBpbmRleDogNSxcbiAgICAgICAgbGVuZ3RoOiAzXG4gICAgICB9XG4gICAgfSlcbiAgfSwge1xuICAgIGJhY2tncm91bmRDb2xvckluZGV4OiAoMCwgX3VpbnQucmVhZEJ5dGUpKClcbiAgfSwge1xuICAgIHBpeGVsQXNwZWN0UmF0aW86ICgwLCBfdWludC5yZWFkQnl0ZSkoKVxuICB9XVxufSwgKDAsIF8uY29uZGl0aW9uYWwpKHtcbiAgZ2N0OiAoMCwgX3VpbnQucmVhZEFycmF5KSgzLCBmdW5jdGlvbiAoc3RyZWFtLCByZXN1bHQpIHtcbiAgICByZXR1cm4gTWF0aC5wb3coMiwgcmVzdWx0LmxzZC5nY3Quc2l6ZSArIDEpO1xuICB9KVxufSwgZnVuY3Rpb24gKHN0cmVhbSwgcmVzdWx0KSB7XG4gIHJldHVybiByZXN1bHQubHNkLmdjdC5leGlzdHM7XG59KSwgLy8gY29udGVudCBmcmFtZXNcbntcbiAgZnJhbWVzOiAoMCwgXy5sb29wKShbZ2NlU2NoZW1hLCBhcHBsaWNhdGlvblNjaGVtYSwgY29tbWVudFNjaGVtYSwgaW1hZ2VTY2hlbWEsIHRleHRTY2hlbWFdLCBmdW5jdGlvbiAoc3RyZWFtKSB7XG4gICAgdmFyIG5leHRDb2RlID0gKDAsIF91aW50LnBlZWtCeXRlKSgpKHN0cmVhbSk7IC8vIHJhdGhlciB0aGFuIGNoZWNrIGZvciBhIHRlcm1pbmF0b3IsIHdlIHNob3VsZCBjaGVjayBmb3IgdGhlIGV4aXN0ZW5jZVxuICAgIC8vIG9mIGFuIGV4dCBvciBpbWFnZSBibG9jayB0byBhdm9pZCBpbmZpbml0ZSBsb29wc1xuICAgIC8vdmFyIHRlcm1pbmF0b3IgPSAweDNCO1xuICAgIC8vcmV0dXJuIG5leHRDb2RlICE9PSB0ZXJtaW5hdG9yO1xuXG4gICAgcmV0dXJuIG5leHRDb2RlID09PSAweDIxIHx8IG5leHRDb2RlID09PSAweDJjO1xuICB9KVxufV07XG52YXIgX2RlZmF1bHQgPSBzY2hlbWE7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IF9kZWZhdWx0OyIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fYXdhaXRlciA9ICh0aGlzICYmIHRoaXMuX19hd2FpdGVyKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XG4gICAgcmV0dXJuIG5ldyAoUCB8fCAoUCA9IFByb21pc2UpKShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XG4gICAgICAgIGZ1bmN0aW9uIHN0ZXAocmVzdWx0KSB7IHJlc3VsdC5kb25lID8gcmVzb2x2ZShyZXN1bHQudmFsdWUpIDogYWRvcHQocmVzdWx0LnZhbHVlKS50aGVuKGZ1bGZpbGxlZCwgcmVqZWN0ZWQpOyB9XG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcbiAgICB9KTtcbn07XG52YXIgX19nZW5lcmF0b3IgPSAodGhpcyAmJiB0aGlzLl9fZ2VuZXJhdG9yKSB8fCBmdW5jdGlvbiAodGhpc0FyZywgYm9keSkge1xuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XG4gICAgcmV0dXJuIGcgPSB7IG5leHQ6IHZlcmIoMCksIFwidGhyb3dcIjogdmVyYigxKSwgXCJyZXR1cm5cIjogdmVyYigyKSB9LCB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgKGdbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpczsgfSksIGc7XG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xuICAgICAgICBpZiAoZikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IGV4ZWN1dGluZy5cIik7XG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xuICAgICAgICAgICAgaWYgKHkgPSAwLCB0KSBvcCA9IFtvcFswXSAmIDIsIHQudmFsdWVdO1xuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDogXy5sYWJlbCsrOyByZXR1cm4geyB2YWx1ZTogb3BbMV0sIGRvbmU6IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSA2ICYmIF8ubGFiZWwgPCB0WzFdKSB7IF8ubGFiZWwgPSB0WzFdOyB0ID0gb3A7IGJyZWFrOyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xuICAgICAgICAgICAgICAgICAgICBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHsgb3AgPSBbNiwgZV07IHkgPSAwOyB9IGZpbmFsbHkgeyBmID0gdCA9IDA7IH1cbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XG4gICAgfVxufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbnZhciBhd2Vzb21lX3FyXzEgPSByZXF1aXJlKFwiYXdlc29tZS1xclwiKTtcbnZhciBtYWlhcl9sb2dvXzEgPSByZXF1aXJlKFwiLi9tYWlhci1sb2dvXCIpO1xud2luZG93WydNYWlhclBheW1lbnRzJ10gPSB7XG4gICAgZ2VuZXJhdGVQYXltZW50c1FSOiBmdW5jdGlvbiAoX2EpIHtcbiAgICAgICAgdmFyIGF1dGhvcml6YXRpb25JZCA9IF9hLmF1dGhvcml6YXRpb25JZCwgY2F0ZWdvcnlIaW50ID0gX2EuY2F0ZWdvcnlIaW50LCBkZXNjcmlwdGlvbiA9IF9hLmRlc2NyaXB0aW9uLCBpY29uVXJsID0gX2EuaWNvblVybCwgX2IgPSBfYS5zaXplLCBzaXplID0gX2IgPT09IHZvaWQgMCA/IDI1NiA6IF9iLCBwYXltZW50UHJvY2Vzc29yQWRkcmVzcyA9IF9hLnBheW1lbnRQcm9jZXNzb3JBZGRyZXNzLCBfYyA9IF9hLnByb3RvY29sLCBwcm90b2NvbCA9IF9jID09PSB2b2lkIDAgPyAnbWFpYXI6JyA6IF9jLCB0b2tlbkFtb3VudCA9IF9hLnRva2VuQW1vdW50LCB0b2tlbklkZW50aWZpZXIgPSBfYS50b2tlbklkZW50aWZpZXI7XG4gICAgICAgIHJldHVybiBfX2F3YWl0ZXIodm9pZCAwLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBhcmFtcztcbiAgICAgICAgICAgIHJldHVybiBfX2dlbmVyYXRvcih0aGlzLCBmdW5jdGlvbiAoX2QpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IHBheW1lbnRQcm9jZXNzb3JBZGRyZXNzLFxuICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IHRva2VuQW1vdW50LFxuICAgICAgICAgICAgICAgICAgICBjYXRlZ29yeTogY2F0ZWdvcnlIaW50LFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb24sXG4gICAgICAgICAgICAgICAgICAgIGljb25Vcmw6IGljb25VcmwsXG4gICAgICAgICAgICAgICAgICAgIGlkOiBhdXRob3JpemF0aW9uSWQsXG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiB0b2tlbklkZW50aWZpZXJcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBbMiAvKnJldHVybiovLCBuZXcgYXdlc29tZV9xcl8xLkF3ZXNvbWVRUih7XG4gICAgICAgICAgICAgICAgICAgICAgICBsb2dvSW1hZ2U6IG1haWFyX2xvZ29fMS5NQUlBUl9MT0dPLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogc2l6ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHByb3RvY29sICsgJ3BheW1lbnQ/JyArIE9iamVjdC5rZXlzKHBhcmFtcykuZmlsdGVyKGZ1bmN0aW9uIChrKSB7IHJldHVybiBwYXJhbXNba107IH0pLm1hcChmdW5jdGlvbiAoaykgeyByZXR1cm4gayArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudChwYXJhbXNba10pOyB9KS5qb2luKCcmJylcbiAgICAgICAgICAgICAgICAgICAgfSkuZHJhdygpXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLk1BSUFSX0xPR08gPSB2b2lkIDA7XG5leHBvcnRzLk1BSUFSX0xPR08gPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBTFFBQUFDMENBTUFBQUFLRS9ZQUFBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFBRnpVa2RDQUs3T0hPa0FBQUNUVUV4VVJVZHdUQTB5c0JsRXdRMHlzQnBGd2dFZ25ocEZ3aGxFd2hoQ3dCVSt1eHBGd2hsRXdobEZ3Z0FnbmdVbG93UWxvd0FmblJFNHRRWW9wUk03dUFBZm5ScEZ3Z0VobndNam9RMHlzQXN3cmc4MXN4RTR0Z2NxcUJROXV4TTd1UWNwcGdrdHFobER3UVFsb2dVbnBBWW9wUmRBdmdRbW93c3ZyQWtzcVJoQ3dCWS92UW91cXdFZ25SSTZ0eEEzdEE0MHNRWW9wYzBsRGlBQUFBQVZkRkpPVXdEdy9QbnkrZmFBREFuMDhYa1FnZkNLY203eGt6RkdKNTRBQUFjZlNVUkJWSGphMWQySmN1STRFQWJnWm9iRWRyS1EyYzJZUUJJT2gzQUVjcnovMjYxa2cvR2hveVcxak1VRGtLKzYvbTZyS0VjTlVReUJmZUlJaHFHcDQyZ0lhV0JxWms0aERVdk56Undka2pvMzUrajBMa3JDTUNmUlhYcEdoNkkrbVU5b3BvNUR5RVpoUHFORHlIVnBMdEhwZmQvVlJRL1cwWDFYVjh3Vk5GTW5ZWmlyNkQ3UGtLVE1jeFBkMzI2TWErWTZ1cStUcjJGdW9QdlpqYlU4QzlEcC9UOXg3ODB0ZERyc203cHRicU9aT3VudjNKQ2gwOXMrcVdPQldZUk83L3FURUtGWmlPNVByc1ZtTWJvdk0wVFFnd3AwUDlReXN3ek4xRWxQczZGQXMyNU0ramZyZE9ocnErVjFWcUd2TzBOVVpoWDZtdDBvN1VFdCtucHF0Vm1OdnRZTTBaZzE2T3VjbmhKVm5oSG9hOHlRV0dmV29ydWZJWHF6SHQxMU4rcnlqRU4zcThhWU1lZ3Vad2pLakVKM3AwNzBlVWFqdTVvaFNETVMzWTA2UnBxeDZDNjZFVzFHby8ycmNUMW9odmJkalFabUEvUXZyMm9Uc3dIYWE2MFRkSjVOMGY3VXNaSFpETzFMYldnMlEyZVpseGxpbEdkVGRKWmxIeDVxYld3MlFXY2N2U0ZYbTVzTjBMbjVnMXlkR09iWkJKMmR6WnY1OE4va3VtWWpkRzdlYkE2UGRPcll4b3hGVjgySHd6MlYyczZNUkYvTWpIeVl6NGxxYmRHRGVIUzl6dlA1bkNZaHRtWVV1bVdlenhjRWFtc3pCaTB5TDl6VmlWMmVjZWhtbmd2ejRzdFJIZHViOVdoeG5SZGZYMjVxRjdNV0xUZS92RGlvN2ZPTVFFdk1DMjcrL3JaV3U1azFhRldkSGRTT1pqVmFiV2JvNTRHTk9uSEpzdzdkTmkvS2JCVG1aeHQxN0dwV29mVjFmclpSdTVzVmFKejU1OGRRVFdDV28xVnpvMnFlVG8zVXJqMm9RbWU2dVhFeEc2bEp6Q3EwTmhzL2hYbTZRNnNwc2lGRjQ3UEJQclBaYlBCZjBzbXNVNkd4UFhnMno0NG9OVkdkeFdoajgyNjNRNmpKekNLMGpmbTQwcXBwZWxDQ3RqSWZWem8xb2JtTmxwMzVSYk91YWw0dGxXcEtjd3R0VytmOWZyOThrS3NUc2p3TDBNYm0yYW5PKy8zcjYwcXFqa25ORGJUcGZLNloyVWVpSmpiWDBVNTFacCtsT0NHa2VXNmkzYzN2N3dJMXVibUtOczdHcm0xZXQ5WDA1Z3JhTnMvN3FubTkzamJVQ1hHZWEyaUtiSER6OXEybTltRXUwYTV6NDJKK2U2cW9ZeC9tTTVxdXpneDlVZnN4bjlER3oyNUZuZGxuY2xKNzZNRUxtbVJ1bEhWbTZNOWM3Y3Vjb3gzT0cyTHpKRmQ3TTNPMEpCdEdQZmhlTjA4K21kcFBudm43RUtESmhuR2Vjek5EZnc1dWZaa0hRRGpyM2lybXllOWYzc3czWUZybkhhck9YczBUSU85Qi8yYUdwbnVtZEdXZVFHaDVabi9oQ1pEbUdYNXVUSDVuZnMwTVRWOW5yMmIyaDk2QTd0bmRTVGE0ZVF1QjlTQTNyeUd3SHVUbWQ5aTRuamVlT2plL0EyMmV2ZmZnZHIxK1h3TGhHY24vck12cnZId0ZnMmYzZGV0OE1iOUNXSE1qTisrQjVNemZyWGtGTHI4VmRHNWU1bWFPRG1BK1AxWHJmRHpDd21UV0xhWFp5RG96cjQ0N29PbkJyTE04SDQrN0dZUTFOM2lkWnlkME1IT0QxM2syaFVEbVJxWE8weWtFbDQxcGpuYk1ScWR6SXpmL1FDam5qWE9lbWZrWmdwbDFaWjJmQzNSSWVXYm1iOUJrWTM5dDg3cHRadWp2Z0daZFlYNkJmdWRaVUdjV0RRaXNCN241Qy9vNW41WG1CWVExTjNKemdlNzFtZjlrL2lsNmtKdm5JREFmZTNTdTI5Zm5SbTdtNkg3bVdUU2ZUMmFHRG1wdTVPWURCRlBuaTNrRCtqcHZPemR2bFhYZWJLQ3Z2OWNwekIrZ214dmJhK1Y1THpYbjZINmUrZVhtRE5ROVdLL3pwemZ6cmJnSFo0MVpkemh3TTBQamYrZS8rZXZyeFlLN2FIeURybk9XQXI3T04zOUhubDdoR0VaeFBIN1FQbFBPNWdJdE5kZnJQUEwwc2t4K2JTMVRZM3FRbTNNMHFnZHpzeGYxNmFwZHB0WThVODVtampZeGUzZ0JyTHpVbUtreDJjalJxR2QzYVNaWFZ5NWlabXA1blE4WGN3cW1adUtYR21zWGRTZmpCMFNkT2RyVVRLb2UxaThYVDhZRGhEa0Z4TE83WVNic3h0WjExL0Y0b083QkV4cmZnK1Jxd1JYZFRLMDFwMkNhRGNKdUZGN2h6dFRpWjNkYVExdVlTZFNTQzl5WldsMW5qamJNTTVsYWVzRS9VOHQ3c0VEcnprZ2pULys2b2xoS2tFUURWWjA1MnJBSGlicFJ1Wklnamg1VjVoU1U1ajhqVC8rT3BibmFmeFE5S3N3Rld0YURhck9EV3J1T2dLbUZjK09DYnBxZmtHYnJia1FzZm1BSmtkVTVSOHZtaHQ1c3FVWXRxMkJxbVRtRnBZdlphb1lnbDVtd2I1YVlPZHFtQngxcVBZencvL29zTmpPMG05bTRHdzFXZ3NndmdyZWJHOVpxb3pVbTBpdjNuYzFHQ1RGY2N5TmJickIyTmh1b2paZmNTTlpJaU9hRzhVVitTTFhGRWlUeHdnNUJuUzB1SDBSTlBxdkZUY0xWS003WlFIZWo1U29oMFJJYUdqTkNiYjMrU0xEdVowdGoxdWJhWVdWVGU3RlMvY3h2Yjlhb25aWmp0VlpZT2ZjZ1N1MjQwS3U1TEl6T3JGQTdMM3hyckdVak5FdlZ3NGoyY2owb3pROHVlVmJPRUpLMWFiVlZnMldkeHdSbW9acG8xVnQxcVNPdFdaQVFzbFdBbGZXWlp6UFp4Y0VOTmVFaXdNdWlVbW96Lys1Yndya2htaUZBYnE3VmVoajV1TmdYK053WUUxOHFYYXJKMXkyZTFoeHo4d2pBeDNmN1dCRlpMSlNtbXh1dFdudFpJWnF2N3I0WmUxbGF3TlNlRm9qeUplbGpUNHNXUnBHdjlhRng5RDhVVDU0NldKRDI3d0FBQUFCSlJVNUVya0pnZ2c9PVwiO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==