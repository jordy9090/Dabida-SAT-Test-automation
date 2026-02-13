// Gemini SAT PDF Exporter - Bundled Content Script
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/html2canvas/dist/html2canvas.js
  var require_html2canvas = __commonJS({
    "node_modules/html2canvas/dist/html2canvas.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.html2canvas = factory());
      })(exports, (function() {
        "use strict";
        var extendStatics = function(d, b) {
          extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
            d2.__proto__ = b2;
          } || function(d2, b2) {
            for (var p in b2) if (Object.prototype.hasOwnProperty.call(b2, p)) d2[p] = b2[p];
          };
          return extendStatics(d, b);
        };
        function __extends(d, b) {
          if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
          extendStatics(d, b);
          function __() {
            this.constructor = d;
          }
          d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        }
        var __assign = function() {
          __assign = Object.assign || function __assign2(t) {
            for (var s, i2 = 1, n = arguments.length; i2 < n; i2++) {
              s = arguments[i2];
              for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
          };
          return __assign.apply(this, arguments);
        };
        function __awaiter(thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P ? value : new P(function(resolve) {
              resolve(value);
            });
          }
          return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e2) {
                reject(e2);
              }
            }
            function rejected(value) {
              try {
                step(generator["throw"](value));
              } catch (e2) {
                reject(e2);
              }
            }
            function step(result) {
              result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
          });
        }
        function __generator(thisArg, body) {
          var _ = { label: 0, sent: function() {
            if (t[0] & 1) throw t[1];
            return t[1];
          }, trys: [], ops: [] }, f2, y, t, g;
          return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
            return this;
          }), g;
          function verb(n) {
            return function(v) {
              return step([n, v]);
            };
          }
          function step(op) {
            if (f2) throw new TypeError("Generator is already executing.");
            while (_) try {
              if (f2 = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
              if (y = 0, t) op = [op[0] & 2, t.value];
              switch (op[0]) {
                case 0:
                case 1:
                  t = op;
                  break;
                case 4:
                  _.label++;
                  return { value: op[1], done: false };
                case 5:
                  _.label++;
                  y = op[1];
                  op = [0];
                  continue;
                case 7:
                  op = _.ops.pop();
                  _.trys.pop();
                  continue;
                default:
                  if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                    _ = 0;
                    continue;
                  }
                  if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                    _.label = op[1];
                    break;
                  }
                  if (op[0] === 6 && _.label < t[1]) {
                    _.label = t[1];
                    t = op;
                    break;
                  }
                  if (t && _.label < t[2]) {
                    _.label = t[2];
                    _.ops.push(op);
                    break;
                  }
                  if (t[2]) _.ops.pop();
                  _.trys.pop();
                  continue;
              }
              op = body.call(thisArg, _);
            } catch (e2) {
              op = [6, e2];
              y = 0;
            } finally {
              f2 = t = 0;
            }
            if (op[0] & 5) throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
          }
        }
        function __spreadArray(to, from, pack2) {
          if (pack2 || arguments.length === 2) for (var i2 = 0, l = from.length, ar; i2 < l; i2++) {
            if (ar || !(i2 in from)) {
              if (!ar) ar = Array.prototype.slice.call(from, 0, i2);
              ar[i2] = from[i2];
            }
          }
          return to.concat(ar || from);
        }
        var Bounds = (
          /** @class */
          (function() {
            function Bounds2(left, top, width, height) {
              this.left = left;
              this.top = top;
              this.width = width;
              this.height = height;
            }
            Bounds2.prototype.add = function(x, y, w, h) {
              return new Bounds2(this.left + x, this.top + y, this.width + w, this.height + h);
            };
            Bounds2.fromClientRect = function(context, clientRect) {
              return new Bounds2(clientRect.left + context.windowBounds.left, clientRect.top + context.windowBounds.top, clientRect.width, clientRect.height);
            };
            Bounds2.fromDOMRectList = function(context, domRectList) {
              var domRect = Array.from(domRectList).find(function(rect) {
                return rect.width !== 0;
              });
              return domRect ? new Bounds2(domRect.left + context.windowBounds.left, domRect.top + context.windowBounds.top, domRect.width, domRect.height) : Bounds2.EMPTY;
            };
            Bounds2.EMPTY = new Bounds2(0, 0, 0, 0);
            return Bounds2;
          })()
        );
        var parseBounds = function(context, node) {
          return Bounds.fromClientRect(context, node.getBoundingClientRect());
        };
        var parseDocumentSize = function(document2) {
          var body = document2.body;
          var documentElement = document2.documentElement;
          if (!body || !documentElement) {
            throw new Error("Unable to get document size");
          }
          var width = Math.max(Math.max(body.scrollWidth, documentElement.scrollWidth), Math.max(body.offsetWidth, documentElement.offsetWidth), Math.max(body.clientWidth, documentElement.clientWidth));
          var height = Math.max(Math.max(body.scrollHeight, documentElement.scrollHeight), Math.max(body.offsetHeight, documentElement.offsetHeight), Math.max(body.clientHeight, documentElement.clientHeight));
          return new Bounds(0, 0, width, height);
        };
        var toCodePoints$1 = function(str) {
          var codePoints = [];
          var i2 = 0;
          var length = str.length;
          while (i2 < length) {
            var value = str.charCodeAt(i2++);
            if (value >= 55296 && value <= 56319 && i2 < length) {
              var extra = str.charCodeAt(i2++);
              if ((extra & 64512) === 56320) {
                codePoints.push(((value & 1023) << 10) + (extra & 1023) + 65536);
              } else {
                codePoints.push(value);
                i2--;
              }
            } else {
              codePoints.push(value);
            }
          }
          return codePoints;
        };
        var fromCodePoint$1 = function() {
          var codePoints = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            codePoints[_i] = arguments[_i];
          }
          if (String.fromCodePoint) {
            return String.fromCodePoint.apply(String, codePoints);
          }
          var length = codePoints.length;
          if (!length) {
            return "";
          }
          var codeUnits = [];
          var index = -1;
          var result = "";
          while (++index < length) {
            var codePoint = codePoints[index];
            if (codePoint <= 65535) {
              codeUnits.push(codePoint);
            } else {
              codePoint -= 65536;
              codeUnits.push((codePoint >> 10) + 55296, codePoint % 1024 + 56320);
            }
            if (index + 1 === length || codeUnits.length > 16384) {
              result += String.fromCharCode.apply(String, codeUnits);
              codeUnits.length = 0;
            }
          }
          return result;
        };
        var chars$2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var lookup$2 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
        for (var i$2 = 0; i$2 < chars$2.length; i$2++) {
          lookup$2[chars$2.charCodeAt(i$2)] = i$2;
        }
        var chars$1$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var lookup$1$1 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
        for (var i$1$1 = 0; i$1$1 < chars$1$1.length; i$1$1++) {
          lookup$1$1[chars$1$1.charCodeAt(i$1$1)] = i$1$1;
        }
        var decode$1 = function(base642) {
          var bufferLength = base642.length * 0.75, len = base642.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
          if (base642[base642.length - 1] === "=") {
            bufferLength--;
            if (base642[base642.length - 2] === "=") {
              bufferLength--;
            }
          }
          var buffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined" && typeof Uint8Array.prototype.slice !== "undefined" ? new ArrayBuffer(bufferLength) : new Array(bufferLength);
          var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
          for (i2 = 0; i2 < len; i2 += 4) {
            encoded1 = lookup$1$1[base642.charCodeAt(i2)];
            encoded2 = lookup$1$1[base642.charCodeAt(i2 + 1)];
            encoded3 = lookup$1$1[base642.charCodeAt(i2 + 2)];
            encoded4 = lookup$1$1[base642.charCodeAt(i2 + 3)];
            bytes[p++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
          }
          return buffer;
        };
        var polyUint16Array$1 = function(buffer) {
          var length = buffer.length;
          var bytes = [];
          for (var i2 = 0; i2 < length; i2 += 2) {
            bytes.push(buffer[i2 + 1] << 8 | buffer[i2]);
          }
          return bytes;
        };
        var polyUint32Array$1 = function(buffer) {
          var length = buffer.length;
          var bytes = [];
          for (var i2 = 0; i2 < length; i2 += 4) {
            bytes.push(buffer[i2 + 3] << 24 | buffer[i2 + 2] << 16 | buffer[i2 + 1] << 8 | buffer[i2]);
          }
          return bytes;
        };
        var UTRIE2_SHIFT_2$1 = 5;
        var UTRIE2_SHIFT_1$1 = 6 + 5;
        var UTRIE2_INDEX_SHIFT$1 = 2;
        var UTRIE2_SHIFT_1_2$1 = UTRIE2_SHIFT_1$1 - UTRIE2_SHIFT_2$1;
        var UTRIE2_LSCP_INDEX_2_OFFSET$1 = 65536 >> UTRIE2_SHIFT_2$1;
        var UTRIE2_DATA_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_2$1;
        var UTRIE2_DATA_MASK$1 = UTRIE2_DATA_BLOCK_LENGTH$1 - 1;
        var UTRIE2_LSCP_INDEX_2_LENGTH$1 = 1024 >> UTRIE2_SHIFT_2$1;
        var UTRIE2_INDEX_2_BMP_LENGTH$1 = UTRIE2_LSCP_INDEX_2_OFFSET$1 + UTRIE2_LSCP_INDEX_2_LENGTH$1;
        var UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 = UTRIE2_INDEX_2_BMP_LENGTH$1;
        var UTRIE2_UTF8_2B_INDEX_2_LENGTH$1 = 2048 >> 6;
        var UTRIE2_INDEX_1_OFFSET$1 = UTRIE2_UTF8_2B_INDEX_2_OFFSET$1 + UTRIE2_UTF8_2B_INDEX_2_LENGTH$1;
        var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 = 65536 >> UTRIE2_SHIFT_1$1;
        var UTRIE2_INDEX_2_BLOCK_LENGTH$1 = 1 << UTRIE2_SHIFT_1_2$1;
        var UTRIE2_INDEX_2_MASK$1 = UTRIE2_INDEX_2_BLOCK_LENGTH$1 - 1;
        var slice16$1 = function(view, start, end) {
          if (view.slice) {
            return view.slice(start, end);
          }
          return new Uint16Array(Array.prototype.slice.call(view, start, end));
        };
        var slice32$1 = function(view, start, end) {
          if (view.slice) {
            return view.slice(start, end);
          }
          return new Uint32Array(Array.prototype.slice.call(view, start, end));
        };
        var createTrieFromBase64$1 = function(base642, _byteLength) {
          var buffer = decode$1(base642);
          var view32 = Array.isArray(buffer) ? polyUint32Array$1(buffer) : new Uint32Array(buffer);
          var view16 = Array.isArray(buffer) ? polyUint16Array$1(buffer) : new Uint16Array(buffer);
          var headerLength = 24;
          var index = slice16$1(view16, headerLength / 2, view32[4] / 2);
          var data = view32[5] === 2 ? slice16$1(view16, (headerLength + view32[4]) / 2) : slice32$1(view32, Math.ceil((headerLength + view32[4]) / 4));
          return new Trie$1(view32[0], view32[1], view32[2], view32[3], index, data);
        };
        var Trie$1 = (
          /** @class */
          (function() {
            function Trie2(initialValue, errorValue, highStart, highValueIndex, index, data) {
              this.initialValue = initialValue;
              this.errorValue = errorValue;
              this.highStart = highStart;
              this.highValueIndex = highValueIndex;
              this.index = index;
              this.data = data;
            }
            Trie2.prototype.get = function(codePoint) {
              var ix;
              if (codePoint >= 0) {
                if (codePoint < 55296 || codePoint > 56319 && codePoint <= 65535) {
                  ix = this.index[codePoint >> UTRIE2_SHIFT_2$1];
                  ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
                  return this.data[ix];
                }
                if (codePoint <= 65535) {
                  ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET$1 + (codePoint - 55296 >> UTRIE2_SHIFT_2$1)];
                  ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
                  return this.data[ix];
                }
                if (codePoint < this.highStart) {
                  ix = UTRIE2_INDEX_1_OFFSET$1 - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH$1 + (codePoint >> UTRIE2_SHIFT_1$1);
                  ix = this.index[ix];
                  ix += codePoint >> UTRIE2_SHIFT_2$1 & UTRIE2_INDEX_2_MASK$1;
                  ix = this.index[ix];
                  ix = (ix << UTRIE2_INDEX_SHIFT$1) + (codePoint & UTRIE2_DATA_MASK$1);
                  return this.data[ix];
                }
                if (codePoint <= 1114111) {
                  return this.data[this.highValueIndex];
                }
              }
              return this.errorValue;
            };
            return Trie2;
          })()
        );
        var chars$3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var lookup$3 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
        for (var i$3 = 0; i$3 < chars$3.length; i$3++) {
          lookup$3[chars$3.charCodeAt(i$3)] = i$3;
        }
        var base64$1 = "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==";
        var LETTER_NUMBER_MODIFIER = 50;
        var BK = 1;
        var CR$1 = 2;
        var LF$1 = 3;
        var CM = 4;
        var NL = 5;
        var WJ = 7;
        var ZW = 8;
        var GL = 9;
        var SP = 10;
        var ZWJ$1 = 11;
        var B2 = 12;
        var BA = 13;
        var BB = 14;
        var HY = 15;
        var CB = 16;
        var CL = 17;
        var CP = 18;
        var EX = 19;
        var IN = 20;
        var NS = 21;
        var OP = 22;
        var QU = 23;
        var IS = 24;
        var NU = 25;
        var PO = 26;
        var PR = 27;
        var SY = 28;
        var AI = 29;
        var AL = 30;
        var CJ = 31;
        var EB = 32;
        var EM = 33;
        var H2 = 34;
        var H3 = 35;
        var HL = 36;
        var ID = 37;
        var JL = 38;
        var JV = 39;
        var JT = 40;
        var RI$1 = 41;
        var SA = 42;
        var XX = 43;
        var ea_OP = [9001, 65288];
        var BREAK_MANDATORY = "!";
        var BREAK_NOT_ALLOWED$1 = "\xD7";
        var BREAK_ALLOWED$1 = "\xF7";
        var UnicodeTrie$1 = createTrieFromBase64$1(base64$1);
        var ALPHABETICS = [AL, HL];
        var HARD_LINE_BREAKS = [BK, CR$1, LF$1, NL];
        var SPACE$1 = [SP, ZW];
        var PREFIX_POSTFIX = [PR, PO];
        var LINE_BREAKS = HARD_LINE_BREAKS.concat(SPACE$1);
        var KOREAN_SYLLABLE_BLOCK = [JL, JV, JT, H2, H3];
        var HYPHEN = [HY, BA];
        var codePointsToCharacterClasses = function(codePoints, lineBreak2) {
          if (lineBreak2 === void 0) {
            lineBreak2 = "strict";
          }
          var types = [];
          var indices = [];
          var categories = [];
          codePoints.forEach(function(codePoint, index) {
            var classType = UnicodeTrie$1.get(codePoint);
            if (classType > LETTER_NUMBER_MODIFIER) {
              categories.push(true);
              classType -= LETTER_NUMBER_MODIFIER;
            } else {
              categories.push(false);
            }
            if (["normal", "auto", "loose"].indexOf(lineBreak2) !== -1) {
              if ([8208, 8211, 12316, 12448].indexOf(codePoint) !== -1) {
                indices.push(index);
                return types.push(CB);
              }
            }
            if (classType === CM || classType === ZWJ$1) {
              if (index === 0) {
                indices.push(index);
                return types.push(AL);
              }
              var prev = types[index - 1];
              if (LINE_BREAKS.indexOf(prev) === -1) {
                indices.push(indices[index - 1]);
                return types.push(prev);
              }
              indices.push(index);
              return types.push(AL);
            }
            indices.push(index);
            if (classType === CJ) {
              return types.push(lineBreak2 === "strict" ? NS : ID);
            }
            if (classType === SA) {
              return types.push(AL);
            }
            if (classType === AI) {
              return types.push(AL);
            }
            if (classType === XX) {
              if (codePoint >= 131072 && codePoint <= 196605 || codePoint >= 196608 && codePoint <= 262141) {
                return types.push(ID);
              } else {
                return types.push(AL);
              }
            }
            types.push(classType);
          });
          return [indices, types, categories];
        };
        var isAdjacentWithSpaceIgnored = function(a2, b, currentIndex, classTypes) {
          var current = classTypes[currentIndex];
          if (Array.isArray(a2) ? a2.indexOf(current) !== -1 : a2 === current) {
            var i2 = currentIndex;
            while (i2 <= classTypes.length) {
              i2++;
              var next = classTypes[i2];
              if (next === b) {
                return true;
              }
              if (next !== SP) {
                break;
              }
            }
          }
          if (current === SP) {
            var i2 = currentIndex;
            while (i2 > 0) {
              i2--;
              var prev = classTypes[i2];
              if (Array.isArray(a2) ? a2.indexOf(prev) !== -1 : a2 === prev) {
                var n = currentIndex;
                while (n <= classTypes.length) {
                  n++;
                  var next = classTypes[n];
                  if (next === b) {
                    return true;
                  }
                  if (next !== SP) {
                    break;
                  }
                }
              }
              if (prev !== SP) {
                break;
              }
            }
          }
          return false;
        };
        var previousNonSpaceClassType = function(currentIndex, classTypes) {
          var i2 = currentIndex;
          while (i2 >= 0) {
            var type = classTypes[i2];
            if (type === SP) {
              i2--;
            } else {
              return type;
            }
          }
          return 0;
        };
        var _lineBreakAtIndex = function(codePoints, classTypes, indicies, index, forbiddenBreaks) {
          if (indicies[index] === 0) {
            return BREAK_NOT_ALLOWED$1;
          }
          var currentIndex = index - 1;
          if (Array.isArray(forbiddenBreaks) && forbiddenBreaks[currentIndex] === true) {
            return BREAK_NOT_ALLOWED$1;
          }
          var beforeIndex = currentIndex - 1;
          var afterIndex = currentIndex + 1;
          var current = classTypes[currentIndex];
          var before = beforeIndex >= 0 ? classTypes[beforeIndex] : 0;
          var next = classTypes[afterIndex];
          if (current === CR$1 && next === LF$1) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (HARD_LINE_BREAKS.indexOf(current) !== -1) {
            return BREAK_MANDATORY;
          }
          if (HARD_LINE_BREAKS.indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (SPACE$1.indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (previousNonSpaceClassType(currentIndex, classTypes) === ZW) {
            return BREAK_ALLOWED$1;
          }
          if (UnicodeTrie$1.get(codePoints[currentIndex]) === ZWJ$1) {
            return BREAK_NOT_ALLOWED$1;
          }
          if ((current === EB || current === EM) && UnicodeTrie$1.get(codePoints[afterIndex]) === ZWJ$1) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (current === WJ || next === WJ) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (current === GL) {
            return BREAK_NOT_ALLOWED$1;
          }
          if ([SP, BA, HY].indexOf(current) === -1 && next === GL) {
            return BREAK_NOT_ALLOWED$1;
          }
          if ([CL, CP, EX, IS, SY].indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (previousNonSpaceClassType(currentIndex, classTypes) === OP) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (isAdjacentWithSpaceIgnored(QU, OP, currentIndex, classTypes)) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (isAdjacentWithSpaceIgnored([CL, CP], NS, currentIndex, classTypes)) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (isAdjacentWithSpaceIgnored(B2, B2, currentIndex, classTypes)) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (current === SP) {
            return BREAK_ALLOWED$1;
          }
          if (current === QU || next === QU) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (next === CB || current === CB) {
            return BREAK_ALLOWED$1;
          }
          if ([BA, HY, NS].indexOf(next) !== -1 || current === BB) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (before === HL && HYPHEN.indexOf(current) !== -1) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (current === SY && next === HL) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (next === IN) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (ALPHABETICS.indexOf(next) !== -1 && current === NU || ALPHABETICS.indexOf(current) !== -1 && next === NU) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (current === PR && [ID, EB, EM].indexOf(next) !== -1 || [ID, EB, EM].indexOf(current) !== -1 && next === PO) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (ALPHABETICS.indexOf(current) !== -1 && PREFIX_POSTFIX.indexOf(next) !== -1 || PREFIX_POSTFIX.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (
            // (PR | PO) × ( OP | HY )? NU
            [PR, PO].indexOf(current) !== -1 && (next === NU || [OP, HY].indexOf(next) !== -1 && classTypes[afterIndex + 1] === NU) || // ( OP | HY ) × NU
            [OP, HY].indexOf(current) !== -1 && next === NU || // NU ×	(NU | SY | IS)
            current === NU && [NU, SY, IS].indexOf(next) !== -1
          ) {
            return BREAK_NOT_ALLOWED$1;
          }
          if ([NU, SY, IS, CL, CP].indexOf(next) !== -1) {
            var prevIndex = currentIndex;
            while (prevIndex >= 0) {
              var type = classTypes[prevIndex];
              if (type === NU) {
                return BREAK_NOT_ALLOWED$1;
              } else if ([SY, IS].indexOf(type) !== -1) {
                prevIndex--;
              } else {
                break;
              }
            }
          }
          if ([PR, PO].indexOf(next) !== -1) {
            var prevIndex = [CL, CP].indexOf(current) !== -1 ? beforeIndex : currentIndex;
            while (prevIndex >= 0) {
              var type = classTypes[prevIndex];
              if (type === NU) {
                return BREAK_NOT_ALLOWED$1;
              } else if ([SY, IS].indexOf(type) !== -1) {
                prevIndex--;
              } else {
                break;
              }
            }
          }
          if (JL === current && [JL, JV, H2, H3].indexOf(next) !== -1 || [JV, H2].indexOf(current) !== -1 && [JV, JT].indexOf(next) !== -1 || [JT, H3].indexOf(current) !== -1 && next === JT) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (KOREAN_SYLLABLE_BLOCK.indexOf(current) !== -1 && [IN, PO].indexOf(next) !== -1 || KOREAN_SYLLABLE_BLOCK.indexOf(next) !== -1 && current === PR) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (ALPHABETICS.indexOf(current) !== -1 && ALPHABETICS.indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (current === IS && ALPHABETICS.indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (ALPHABETICS.concat(NU).indexOf(current) !== -1 && next === OP && ea_OP.indexOf(codePoints[afterIndex]) === -1 || ALPHABETICS.concat(NU).indexOf(next) !== -1 && current === CP) {
            return BREAK_NOT_ALLOWED$1;
          }
          if (current === RI$1 && next === RI$1) {
            var i2 = indicies[currentIndex];
            var count = 1;
            while (i2 > 0) {
              i2--;
              if (classTypes[i2] === RI$1) {
                count++;
              } else {
                break;
              }
            }
            if (count % 2 !== 0) {
              return BREAK_NOT_ALLOWED$1;
            }
          }
          if (current === EB && next === EM) {
            return BREAK_NOT_ALLOWED$1;
          }
          return BREAK_ALLOWED$1;
        };
        var cssFormattedClasses = function(codePoints, options) {
          if (!options) {
            options = { lineBreak: "normal", wordBreak: "normal" };
          }
          var _a = codePointsToCharacterClasses(codePoints, options.lineBreak), indicies = _a[0], classTypes = _a[1], isLetterNumber = _a[2];
          if (options.wordBreak === "break-all" || options.wordBreak === "break-word") {
            classTypes = classTypes.map(function(type) {
              return [NU, AL, SA].indexOf(type) !== -1 ? ID : type;
            });
          }
          var forbiddenBreakpoints = options.wordBreak === "keep-all" ? isLetterNumber.map(function(letterNumber, i2) {
            return letterNumber && codePoints[i2] >= 19968 && codePoints[i2] <= 40959;
          }) : void 0;
          return [indicies, classTypes, forbiddenBreakpoints];
        };
        var Break = (
          /** @class */
          (function() {
            function Break2(codePoints, lineBreak2, start, end) {
              this.codePoints = codePoints;
              this.required = lineBreak2 === BREAK_MANDATORY;
              this.start = start;
              this.end = end;
            }
            Break2.prototype.slice = function() {
              return fromCodePoint$1.apply(void 0, this.codePoints.slice(this.start, this.end));
            };
            return Break2;
          })()
        );
        var LineBreaker = function(str, options) {
          var codePoints = toCodePoints$1(str);
          var _a = cssFormattedClasses(codePoints, options), indicies = _a[0], classTypes = _a[1], forbiddenBreakpoints = _a[2];
          var length = codePoints.length;
          var lastEnd = 0;
          var nextIndex = 0;
          return {
            next: function() {
              if (nextIndex >= length) {
                return { done: true, value: null };
              }
              var lineBreak2 = BREAK_NOT_ALLOWED$1;
              while (nextIndex < length && (lineBreak2 = _lineBreakAtIndex(codePoints, classTypes, indicies, ++nextIndex, forbiddenBreakpoints)) === BREAK_NOT_ALLOWED$1) {
              }
              if (lineBreak2 !== BREAK_NOT_ALLOWED$1 || nextIndex === length) {
                var value = new Break(codePoints, lineBreak2, lastEnd, nextIndex);
                lastEnd = nextIndex;
                return { value, done: false };
              }
              return { done: true, value: null };
            }
          };
        };
        var FLAG_UNRESTRICTED = 1 << 0;
        var FLAG_ID = 1 << 1;
        var FLAG_INTEGER = 1 << 2;
        var FLAG_NUMBER = 1 << 3;
        var LINE_FEED = 10;
        var SOLIDUS = 47;
        var REVERSE_SOLIDUS = 92;
        var CHARACTER_TABULATION = 9;
        var SPACE = 32;
        var QUOTATION_MARK = 34;
        var EQUALS_SIGN = 61;
        var NUMBER_SIGN = 35;
        var DOLLAR_SIGN = 36;
        var PERCENTAGE_SIGN = 37;
        var APOSTROPHE = 39;
        var LEFT_PARENTHESIS = 40;
        var RIGHT_PARENTHESIS = 41;
        var LOW_LINE = 95;
        var HYPHEN_MINUS = 45;
        var EXCLAMATION_MARK = 33;
        var LESS_THAN_SIGN = 60;
        var GREATER_THAN_SIGN = 62;
        var COMMERCIAL_AT = 64;
        var LEFT_SQUARE_BRACKET = 91;
        var RIGHT_SQUARE_BRACKET = 93;
        var CIRCUMFLEX_ACCENT = 61;
        var LEFT_CURLY_BRACKET = 123;
        var QUESTION_MARK = 63;
        var RIGHT_CURLY_BRACKET = 125;
        var VERTICAL_LINE = 124;
        var TILDE = 126;
        var CONTROL = 128;
        var REPLACEMENT_CHARACTER = 65533;
        var ASTERISK = 42;
        var PLUS_SIGN = 43;
        var COMMA = 44;
        var COLON = 58;
        var SEMICOLON = 59;
        var FULL_STOP = 46;
        var NULL = 0;
        var BACKSPACE = 8;
        var LINE_TABULATION = 11;
        var SHIFT_OUT = 14;
        var INFORMATION_SEPARATOR_ONE = 31;
        var DELETE = 127;
        var EOF = -1;
        var ZERO = 48;
        var a = 97;
        var e = 101;
        var f = 102;
        var u = 117;
        var z = 122;
        var A = 65;
        var E = 69;
        var F = 70;
        var U = 85;
        var Z = 90;
        var isDigit = function(codePoint) {
          return codePoint >= ZERO && codePoint <= 57;
        };
        var isSurrogateCodePoint = function(codePoint) {
          return codePoint >= 55296 && codePoint <= 57343;
        };
        var isHex = function(codePoint) {
          return isDigit(codePoint) || codePoint >= A && codePoint <= F || codePoint >= a && codePoint <= f;
        };
        var isLowerCaseLetter = function(codePoint) {
          return codePoint >= a && codePoint <= z;
        };
        var isUpperCaseLetter = function(codePoint) {
          return codePoint >= A && codePoint <= Z;
        };
        var isLetter = function(codePoint) {
          return isLowerCaseLetter(codePoint) || isUpperCaseLetter(codePoint);
        };
        var isNonASCIICodePoint = function(codePoint) {
          return codePoint >= CONTROL;
        };
        var isWhiteSpace = function(codePoint) {
          return codePoint === LINE_FEED || codePoint === CHARACTER_TABULATION || codePoint === SPACE;
        };
        var isNameStartCodePoint = function(codePoint) {
          return isLetter(codePoint) || isNonASCIICodePoint(codePoint) || codePoint === LOW_LINE;
        };
        var isNameCodePoint = function(codePoint) {
          return isNameStartCodePoint(codePoint) || isDigit(codePoint) || codePoint === HYPHEN_MINUS;
        };
        var isNonPrintableCodePoint = function(codePoint) {
          return codePoint >= NULL && codePoint <= BACKSPACE || codePoint === LINE_TABULATION || codePoint >= SHIFT_OUT && codePoint <= INFORMATION_SEPARATOR_ONE || codePoint === DELETE;
        };
        var isValidEscape = function(c1, c2) {
          if (c1 !== REVERSE_SOLIDUS) {
            return false;
          }
          return c2 !== LINE_FEED;
        };
        var isIdentifierStart = function(c1, c2, c3) {
          if (c1 === HYPHEN_MINUS) {
            return isNameStartCodePoint(c2) || isValidEscape(c2, c3);
          } else if (isNameStartCodePoint(c1)) {
            return true;
          } else if (c1 === REVERSE_SOLIDUS && isValidEscape(c1, c2)) {
            return true;
          }
          return false;
        };
        var isNumberStart = function(c1, c2, c3) {
          if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
            if (isDigit(c2)) {
              return true;
            }
            return c2 === FULL_STOP && isDigit(c3);
          }
          if (c1 === FULL_STOP) {
            return isDigit(c2);
          }
          return isDigit(c1);
        };
        var stringToNumber = function(codePoints) {
          var c = 0;
          var sign = 1;
          if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
            if (codePoints[c] === HYPHEN_MINUS) {
              sign = -1;
            }
            c++;
          }
          var integers = [];
          while (isDigit(codePoints[c])) {
            integers.push(codePoints[c++]);
          }
          var int = integers.length ? parseInt(fromCodePoint$1.apply(void 0, integers), 10) : 0;
          if (codePoints[c] === FULL_STOP) {
            c++;
          }
          var fraction = [];
          while (isDigit(codePoints[c])) {
            fraction.push(codePoints[c++]);
          }
          var fracd = fraction.length;
          var frac = fracd ? parseInt(fromCodePoint$1.apply(void 0, fraction), 10) : 0;
          if (codePoints[c] === E || codePoints[c] === e) {
            c++;
          }
          var expsign = 1;
          if (codePoints[c] === PLUS_SIGN || codePoints[c] === HYPHEN_MINUS) {
            if (codePoints[c] === HYPHEN_MINUS) {
              expsign = -1;
            }
            c++;
          }
          var exponent = [];
          while (isDigit(codePoints[c])) {
            exponent.push(codePoints[c++]);
          }
          var exp = exponent.length ? parseInt(fromCodePoint$1.apply(void 0, exponent), 10) : 0;
          return sign * (int + frac * Math.pow(10, -fracd)) * Math.pow(10, expsign * exp);
        };
        var LEFT_PARENTHESIS_TOKEN = {
          type: 2
          /* LEFT_PARENTHESIS_TOKEN */
        };
        var RIGHT_PARENTHESIS_TOKEN = {
          type: 3
          /* RIGHT_PARENTHESIS_TOKEN */
        };
        var COMMA_TOKEN = {
          type: 4
          /* COMMA_TOKEN */
        };
        var SUFFIX_MATCH_TOKEN = {
          type: 13
          /* SUFFIX_MATCH_TOKEN */
        };
        var PREFIX_MATCH_TOKEN = {
          type: 8
          /* PREFIX_MATCH_TOKEN */
        };
        var COLUMN_TOKEN = {
          type: 21
          /* COLUMN_TOKEN */
        };
        var DASH_MATCH_TOKEN = {
          type: 9
          /* DASH_MATCH_TOKEN */
        };
        var INCLUDE_MATCH_TOKEN = {
          type: 10
          /* INCLUDE_MATCH_TOKEN */
        };
        var LEFT_CURLY_BRACKET_TOKEN = {
          type: 11
          /* LEFT_CURLY_BRACKET_TOKEN */
        };
        var RIGHT_CURLY_BRACKET_TOKEN = {
          type: 12
          /* RIGHT_CURLY_BRACKET_TOKEN */
        };
        var SUBSTRING_MATCH_TOKEN = {
          type: 14
          /* SUBSTRING_MATCH_TOKEN */
        };
        var BAD_URL_TOKEN = {
          type: 23
          /* BAD_URL_TOKEN */
        };
        var BAD_STRING_TOKEN = {
          type: 1
          /* BAD_STRING_TOKEN */
        };
        var CDO_TOKEN = {
          type: 25
          /* CDO_TOKEN */
        };
        var CDC_TOKEN = {
          type: 24
          /* CDC_TOKEN */
        };
        var COLON_TOKEN = {
          type: 26
          /* COLON_TOKEN */
        };
        var SEMICOLON_TOKEN = {
          type: 27
          /* SEMICOLON_TOKEN */
        };
        var LEFT_SQUARE_BRACKET_TOKEN = {
          type: 28
          /* LEFT_SQUARE_BRACKET_TOKEN */
        };
        var RIGHT_SQUARE_BRACKET_TOKEN = {
          type: 29
          /* RIGHT_SQUARE_BRACKET_TOKEN */
        };
        var WHITESPACE_TOKEN = {
          type: 31
          /* WHITESPACE_TOKEN */
        };
        var EOF_TOKEN = {
          type: 32
          /* EOF_TOKEN */
        };
        var Tokenizer = (
          /** @class */
          (function() {
            function Tokenizer2() {
              this._value = [];
            }
            Tokenizer2.prototype.write = function(chunk) {
              this._value = this._value.concat(toCodePoints$1(chunk));
            };
            Tokenizer2.prototype.read = function() {
              var tokens = [];
              var token = this.consumeToken();
              while (token !== EOF_TOKEN) {
                tokens.push(token);
                token = this.consumeToken();
              }
              return tokens;
            };
            Tokenizer2.prototype.consumeToken = function() {
              var codePoint = this.consumeCodePoint();
              switch (codePoint) {
                case QUOTATION_MARK:
                  return this.consumeStringToken(QUOTATION_MARK);
                case NUMBER_SIGN:
                  var c1 = this.peekCodePoint(0);
                  var c2 = this.peekCodePoint(1);
                  var c3 = this.peekCodePoint(2);
                  if (isNameCodePoint(c1) || isValidEscape(c2, c3)) {
                    var flags = isIdentifierStart(c1, c2, c3) ? FLAG_ID : FLAG_UNRESTRICTED;
                    var value = this.consumeName();
                    return { type: 5, value, flags };
                  }
                  break;
                case DOLLAR_SIGN:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                    this.consumeCodePoint();
                    return SUFFIX_MATCH_TOKEN;
                  }
                  break;
                case APOSTROPHE:
                  return this.consumeStringToken(APOSTROPHE);
                case LEFT_PARENTHESIS:
                  return LEFT_PARENTHESIS_TOKEN;
                case RIGHT_PARENTHESIS:
                  return RIGHT_PARENTHESIS_TOKEN;
                case ASTERISK:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                    this.consumeCodePoint();
                    return SUBSTRING_MATCH_TOKEN;
                  }
                  break;
                case PLUS_SIGN:
                  if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
                    this.reconsumeCodePoint(codePoint);
                    return this.consumeNumericToken();
                  }
                  break;
                case COMMA:
                  return COMMA_TOKEN;
                case HYPHEN_MINUS:
                  var e1 = codePoint;
                  var e2 = this.peekCodePoint(0);
                  var e3 = this.peekCodePoint(1);
                  if (isNumberStart(e1, e2, e3)) {
                    this.reconsumeCodePoint(codePoint);
                    return this.consumeNumericToken();
                  }
                  if (isIdentifierStart(e1, e2, e3)) {
                    this.reconsumeCodePoint(codePoint);
                    return this.consumeIdentLikeToken();
                  }
                  if (e2 === HYPHEN_MINUS && e3 === GREATER_THAN_SIGN) {
                    this.consumeCodePoint();
                    this.consumeCodePoint();
                    return CDC_TOKEN;
                  }
                  break;
                case FULL_STOP:
                  if (isNumberStart(codePoint, this.peekCodePoint(0), this.peekCodePoint(1))) {
                    this.reconsumeCodePoint(codePoint);
                    return this.consumeNumericToken();
                  }
                  break;
                case SOLIDUS:
                  if (this.peekCodePoint(0) === ASTERISK) {
                    this.consumeCodePoint();
                    while (true) {
                      var c = this.consumeCodePoint();
                      if (c === ASTERISK) {
                        c = this.consumeCodePoint();
                        if (c === SOLIDUS) {
                          return this.consumeToken();
                        }
                      }
                      if (c === EOF) {
                        return this.consumeToken();
                      }
                    }
                  }
                  break;
                case COLON:
                  return COLON_TOKEN;
                case SEMICOLON:
                  return SEMICOLON_TOKEN;
                case LESS_THAN_SIGN:
                  if (this.peekCodePoint(0) === EXCLAMATION_MARK && this.peekCodePoint(1) === HYPHEN_MINUS && this.peekCodePoint(2) === HYPHEN_MINUS) {
                    this.consumeCodePoint();
                    this.consumeCodePoint();
                    return CDO_TOKEN;
                  }
                  break;
                case COMMERCIAL_AT:
                  var a1 = this.peekCodePoint(0);
                  var a2 = this.peekCodePoint(1);
                  var a3 = this.peekCodePoint(2);
                  if (isIdentifierStart(a1, a2, a3)) {
                    var value = this.consumeName();
                    return { type: 7, value };
                  }
                  break;
                case LEFT_SQUARE_BRACKET:
                  return LEFT_SQUARE_BRACKET_TOKEN;
                case REVERSE_SOLIDUS:
                  if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                    this.reconsumeCodePoint(codePoint);
                    return this.consumeIdentLikeToken();
                  }
                  break;
                case RIGHT_SQUARE_BRACKET:
                  return RIGHT_SQUARE_BRACKET_TOKEN;
                case CIRCUMFLEX_ACCENT:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                    this.consumeCodePoint();
                    return PREFIX_MATCH_TOKEN;
                  }
                  break;
                case LEFT_CURLY_BRACKET:
                  return LEFT_CURLY_BRACKET_TOKEN;
                case RIGHT_CURLY_BRACKET:
                  return RIGHT_CURLY_BRACKET_TOKEN;
                case u:
                case U:
                  var u1 = this.peekCodePoint(0);
                  var u2 = this.peekCodePoint(1);
                  if (u1 === PLUS_SIGN && (isHex(u2) || u2 === QUESTION_MARK)) {
                    this.consumeCodePoint();
                    this.consumeUnicodeRangeToken();
                  }
                  this.reconsumeCodePoint(codePoint);
                  return this.consumeIdentLikeToken();
                case VERTICAL_LINE:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                    this.consumeCodePoint();
                    return DASH_MATCH_TOKEN;
                  }
                  if (this.peekCodePoint(0) === VERTICAL_LINE) {
                    this.consumeCodePoint();
                    return COLUMN_TOKEN;
                  }
                  break;
                case TILDE:
                  if (this.peekCodePoint(0) === EQUALS_SIGN) {
                    this.consumeCodePoint();
                    return INCLUDE_MATCH_TOKEN;
                  }
                  break;
                case EOF:
                  return EOF_TOKEN;
              }
              if (isWhiteSpace(codePoint)) {
                this.consumeWhiteSpace();
                return WHITESPACE_TOKEN;
              }
              if (isDigit(codePoint)) {
                this.reconsumeCodePoint(codePoint);
                return this.consumeNumericToken();
              }
              if (isNameStartCodePoint(codePoint)) {
                this.reconsumeCodePoint(codePoint);
                return this.consumeIdentLikeToken();
              }
              return { type: 6, value: fromCodePoint$1(codePoint) };
            };
            Tokenizer2.prototype.consumeCodePoint = function() {
              var value = this._value.shift();
              return typeof value === "undefined" ? -1 : value;
            };
            Tokenizer2.prototype.reconsumeCodePoint = function(codePoint) {
              this._value.unshift(codePoint);
            };
            Tokenizer2.prototype.peekCodePoint = function(delta) {
              if (delta >= this._value.length) {
                return -1;
              }
              return this._value[delta];
            };
            Tokenizer2.prototype.consumeUnicodeRangeToken = function() {
              var digits = [];
              var codePoint = this.consumeCodePoint();
              while (isHex(codePoint) && digits.length < 6) {
                digits.push(codePoint);
                codePoint = this.consumeCodePoint();
              }
              var questionMarks = false;
              while (codePoint === QUESTION_MARK && digits.length < 6) {
                digits.push(codePoint);
                codePoint = this.consumeCodePoint();
                questionMarks = true;
              }
              if (questionMarks) {
                var start_1 = parseInt(fromCodePoint$1.apply(void 0, digits.map(function(digit) {
                  return digit === QUESTION_MARK ? ZERO : digit;
                })), 16);
                var end = parseInt(fromCodePoint$1.apply(void 0, digits.map(function(digit) {
                  return digit === QUESTION_MARK ? F : digit;
                })), 16);
                return { type: 30, start: start_1, end };
              }
              var start = parseInt(fromCodePoint$1.apply(void 0, digits), 16);
              if (this.peekCodePoint(0) === HYPHEN_MINUS && isHex(this.peekCodePoint(1))) {
                this.consumeCodePoint();
                codePoint = this.consumeCodePoint();
                var endDigits = [];
                while (isHex(codePoint) && endDigits.length < 6) {
                  endDigits.push(codePoint);
                  codePoint = this.consumeCodePoint();
                }
                var end = parseInt(fromCodePoint$1.apply(void 0, endDigits), 16);
                return { type: 30, start, end };
              } else {
                return { type: 30, start, end: start };
              }
            };
            Tokenizer2.prototype.consumeIdentLikeToken = function() {
              var value = this.consumeName();
              if (value.toLowerCase() === "url" && this.peekCodePoint(0) === LEFT_PARENTHESIS) {
                this.consumeCodePoint();
                return this.consumeUrlToken();
              } else if (this.peekCodePoint(0) === LEFT_PARENTHESIS) {
                this.consumeCodePoint();
                return { type: 19, value };
              }
              return { type: 20, value };
            };
            Tokenizer2.prototype.consumeUrlToken = function() {
              var value = [];
              this.consumeWhiteSpace();
              if (this.peekCodePoint(0) === EOF) {
                return { type: 22, value: "" };
              }
              var next = this.peekCodePoint(0);
              if (next === APOSTROPHE || next === QUOTATION_MARK) {
                var stringToken = this.consumeStringToken(this.consumeCodePoint());
                if (stringToken.type === 0) {
                  this.consumeWhiteSpace();
                  if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
                    this.consumeCodePoint();
                    return { type: 22, value: stringToken.value };
                  }
                }
                this.consumeBadUrlRemnants();
                return BAD_URL_TOKEN;
              }
              while (true) {
                var codePoint = this.consumeCodePoint();
                if (codePoint === EOF || codePoint === RIGHT_PARENTHESIS) {
                  return { type: 22, value: fromCodePoint$1.apply(void 0, value) };
                } else if (isWhiteSpace(codePoint)) {
                  this.consumeWhiteSpace();
                  if (this.peekCodePoint(0) === EOF || this.peekCodePoint(0) === RIGHT_PARENTHESIS) {
                    this.consumeCodePoint();
                    return { type: 22, value: fromCodePoint$1.apply(void 0, value) };
                  }
                  this.consumeBadUrlRemnants();
                  return BAD_URL_TOKEN;
                } else if (codePoint === QUOTATION_MARK || codePoint === APOSTROPHE || codePoint === LEFT_PARENTHESIS || isNonPrintableCodePoint(codePoint)) {
                  this.consumeBadUrlRemnants();
                  return BAD_URL_TOKEN;
                } else if (codePoint === REVERSE_SOLIDUS) {
                  if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                    value.push(this.consumeEscapedCodePoint());
                  } else {
                    this.consumeBadUrlRemnants();
                    return BAD_URL_TOKEN;
                  }
                } else {
                  value.push(codePoint);
                }
              }
            };
            Tokenizer2.prototype.consumeWhiteSpace = function() {
              while (isWhiteSpace(this.peekCodePoint(0))) {
                this.consumeCodePoint();
              }
            };
            Tokenizer2.prototype.consumeBadUrlRemnants = function() {
              while (true) {
                var codePoint = this.consumeCodePoint();
                if (codePoint === RIGHT_PARENTHESIS || codePoint === EOF) {
                  return;
                }
                if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                  this.consumeEscapedCodePoint();
                }
              }
            };
            Tokenizer2.prototype.consumeStringSlice = function(count) {
              var SLICE_STACK_SIZE = 5e4;
              var value = "";
              while (count > 0) {
                var amount = Math.min(SLICE_STACK_SIZE, count);
                value += fromCodePoint$1.apply(void 0, this._value.splice(0, amount));
                count -= amount;
              }
              this._value.shift();
              return value;
            };
            Tokenizer2.prototype.consumeStringToken = function(endingCodePoint) {
              var value = "";
              var i2 = 0;
              do {
                var codePoint = this._value[i2];
                if (codePoint === EOF || codePoint === void 0 || codePoint === endingCodePoint) {
                  value += this.consumeStringSlice(i2);
                  return { type: 0, value };
                }
                if (codePoint === LINE_FEED) {
                  this._value.splice(0, i2);
                  return BAD_STRING_TOKEN;
                }
                if (codePoint === REVERSE_SOLIDUS) {
                  var next = this._value[i2 + 1];
                  if (next !== EOF && next !== void 0) {
                    if (next === LINE_FEED) {
                      value += this.consumeStringSlice(i2);
                      i2 = -1;
                      this._value.shift();
                    } else if (isValidEscape(codePoint, next)) {
                      value += this.consumeStringSlice(i2);
                      value += fromCodePoint$1(this.consumeEscapedCodePoint());
                      i2 = -1;
                    }
                  }
                }
                i2++;
              } while (true);
            };
            Tokenizer2.prototype.consumeNumber = function() {
              var repr = [];
              var type = FLAG_INTEGER;
              var c1 = this.peekCodePoint(0);
              if (c1 === PLUS_SIGN || c1 === HYPHEN_MINUS) {
                repr.push(this.consumeCodePoint());
              }
              while (isDigit(this.peekCodePoint(0))) {
                repr.push(this.consumeCodePoint());
              }
              c1 = this.peekCodePoint(0);
              var c2 = this.peekCodePoint(1);
              if (c1 === FULL_STOP && isDigit(c2)) {
                repr.push(this.consumeCodePoint(), this.consumeCodePoint());
                type = FLAG_NUMBER;
                while (isDigit(this.peekCodePoint(0))) {
                  repr.push(this.consumeCodePoint());
                }
              }
              c1 = this.peekCodePoint(0);
              c2 = this.peekCodePoint(1);
              var c3 = this.peekCodePoint(2);
              if ((c1 === E || c1 === e) && ((c2 === PLUS_SIGN || c2 === HYPHEN_MINUS) && isDigit(c3) || isDigit(c2))) {
                repr.push(this.consumeCodePoint(), this.consumeCodePoint());
                type = FLAG_NUMBER;
                while (isDigit(this.peekCodePoint(0))) {
                  repr.push(this.consumeCodePoint());
                }
              }
              return [stringToNumber(repr), type];
            };
            Tokenizer2.prototype.consumeNumericToken = function() {
              var _a = this.consumeNumber(), number = _a[0], flags = _a[1];
              var c1 = this.peekCodePoint(0);
              var c2 = this.peekCodePoint(1);
              var c3 = this.peekCodePoint(2);
              if (isIdentifierStart(c1, c2, c3)) {
                var unit = this.consumeName();
                return { type: 15, number, flags, unit };
              }
              if (c1 === PERCENTAGE_SIGN) {
                this.consumeCodePoint();
                return { type: 16, number, flags };
              }
              return { type: 17, number, flags };
            };
            Tokenizer2.prototype.consumeEscapedCodePoint = function() {
              var codePoint = this.consumeCodePoint();
              if (isHex(codePoint)) {
                var hex = fromCodePoint$1(codePoint);
                while (isHex(this.peekCodePoint(0)) && hex.length < 6) {
                  hex += fromCodePoint$1(this.consumeCodePoint());
                }
                if (isWhiteSpace(this.peekCodePoint(0))) {
                  this.consumeCodePoint();
                }
                var hexCodePoint = parseInt(hex, 16);
                if (hexCodePoint === 0 || isSurrogateCodePoint(hexCodePoint) || hexCodePoint > 1114111) {
                  return REPLACEMENT_CHARACTER;
                }
                return hexCodePoint;
              }
              if (codePoint === EOF) {
                return REPLACEMENT_CHARACTER;
              }
              return codePoint;
            };
            Tokenizer2.prototype.consumeName = function() {
              var result = "";
              while (true) {
                var codePoint = this.consumeCodePoint();
                if (isNameCodePoint(codePoint)) {
                  result += fromCodePoint$1(codePoint);
                } else if (isValidEscape(codePoint, this.peekCodePoint(0))) {
                  result += fromCodePoint$1(this.consumeEscapedCodePoint());
                } else {
                  this.reconsumeCodePoint(codePoint);
                  return result;
                }
              }
            };
            return Tokenizer2;
          })()
        );
        var Parser = (
          /** @class */
          (function() {
            function Parser2(tokens) {
              this._tokens = tokens;
            }
            Parser2.create = function(value) {
              var tokenizer = new Tokenizer();
              tokenizer.write(value);
              return new Parser2(tokenizer.read());
            };
            Parser2.parseValue = function(value) {
              return Parser2.create(value).parseComponentValue();
            };
            Parser2.parseValues = function(value) {
              return Parser2.create(value).parseComponentValues();
            };
            Parser2.prototype.parseComponentValue = function() {
              var token = this.consumeToken();
              while (token.type === 31) {
                token = this.consumeToken();
              }
              if (token.type === 32) {
                throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
              }
              this.reconsumeToken(token);
              var value = this.consumeComponentValue();
              do {
                token = this.consumeToken();
              } while (token.type === 31);
              if (token.type === 32) {
                return value;
              }
              throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
            };
            Parser2.prototype.parseComponentValues = function() {
              var values = [];
              while (true) {
                var value = this.consumeComponentValue();
                if (value.type === 32) {
                  return values;
                }
                values.push(value);
                values.push();
              }
            };
            Parser2.prototype.consumeComponentValue = function() {
              var token = this.consumeToken();
              switch (token.type) {
                case 11:
                case 28:
                case 2:
                  return this.consumeSimpleBlock(token.type);
                case 19:
                  return this.consumeFunction(token);
              }
              return token;
            };
            Parser2.prototype.consumeSimpleBlock = function(type) {
              var block = { type, values: [] };
              var token = this.consumeToken();
              while (true) {
                if (token.type === 32 || isEndingTokenFor(token, type)) {
                  return block;
                }
                this.reconsumeToken(token);
                block.values.push(this.consumeComponentValue());
                token = this.consumeToken();
              }
            };
            Parser2.prototype.consumeFunction = function(functionToken) {
              var cssFunction = {
                name: functionToken.value,
                values: [],
                type: 18
                /* FUNCTION */
              };
              while (true) {
                var token = this.consumeToken();
                if (token.type === 32 || token.type === 3) {
                  return cssFunction;
                }
                this.reconsumeToken(token);
                cssFunction.values.push(this.consumeComponentValue());
              }
            };
            Parser2.prototype.consumeToken = function() {
              var token = this._tokens.shift();
              return typeof token === "undefined" ? EOF_TOKEN : token;
            };
            Parser2.prototype.reconsumeToken = function(token) {
              this._tokens.unshift(token);
            };
            return Parser2;
          })()
        );
        var isDimensionToken = function(token) {
          return token.type === 15;
        };
        var isNumberToken = function(token) {
          return token.type === 17;
        };
        var isIdentToken = function(token) {
          return token.type === 20;
        };
        var isStringToken = function(token) {
          return token.type === 0;
        };
        var isIdentWithValue = function(token, value) {
          return isIdentToken(token) && token.value === value;
        };
        var nonWhiteSpace = function(token) {
          return token.type !== 31;
        };
        var nonFunctionArgSeparator = function(token) {
          return token.type !== 31 && token.type !== 4;
        };
        var parseFunctionArgs = function(tokens) {
          var args = [];
          var arg = [];
          tokens.forEach(function(token) {
            if (token.type === 4) {
              if (arg.length === 0) {
                throw new Error("Error parsing function args, zero tokens for arg");
              }
              args.push(arg);
              arg = [];
              return;
            }
            if (token.type !== 31) {
              arg.push(token);
            }
          });
          if (arg.length) {
            args.push(arg);
          }
          return args;
        };
        var isEndingTokenFor = function(token, type) {
          if (type === 11 && token.type === 12) {
            return true;
          }
          if (type === 28 && token.type === 29) {
            return true;
          }
          return type === 2 && token.type === 3;
        };
        var isLength = function(token) {
          return token.type === 17 || token.type === 15;
        };
        var isLengthPercentage = function(token) {
          return token.type === 16 || isLength(token);
        };
        var parseLengthPercentageTuple = function(tokens) {
          return tokens.length > 1 ? [tokens[0], tokens[1]] : [tokens[0]];
        };
        var ZERO_LENGTH = {
          type: 17,
          number: 0,
          flags: FLAG_INTEGER
        };
        var FIFTY_PERCENT = {
          type: 16,
          number: 50,
          flags: FLAG_INTEGER
        };
        var HUNDRED_PERCENT = {
          type: 16,
          number: 100,
          flags: FLAG_INTEGER
        };
        var getAbsoluteValueForTuple = function(tuple, width, height) {
          var x = tuple[0], y = tuple[1];
          return [getAbsoluteValue(x, width), getAbsoluteValue(typeof y !== "undefined" ? y : x, height)];
        };
        var getAbsoluteValue = function(token, parent) {
          if (token.type === 16) {
            return token.number / 100 * parent;
          }
          if (isDimensionToken(token)) {
            switch (token.unit) {
              case "rem":
              case "em":
                return 16 * token.number;
              // TODO use correct font-size
              case "px":
              default:
                return token.number;
            }
          }
          return token.number;
        };
        var DEG = "deg";
        var GRAD = "grad";
        var RAD = "rad";
        var TURN = "turn";
        var angle = {
          name: "angle",
          parse: function(_context, value) {
            if (value.type === 15) {
              switch (value.unit) {
                case DEG:
                  return Math.PI * value.number / 180;
                case GRAD:
                  return Math.PI / 200 * value.number;
                case RAD:
                  return value.number;
                case TURN:
                  return Math.PI * 2 * value.number;
              }
            }
            throw new Error("Unsupported angle type");
          }
        };
        var isAngle = function(value) {
          if (value.type === 15) {
            if (value.unit === DEG || value.unit === GRAD || value.unit === RAD || value.unit === TURN) {
              return true;
            }
          }
          return false;
        };
        var parseNamedSide = function(tokens) {
          var sideOrCorner = tokens.filter(isIdentToken).map(function(ident) {
            return ident.value;
          }).join(" ");
          switch (sideOrCorner) {
            case "to bottom right":
            case "to right bottom":
            case "left top":
            case "top left":
              return [ZERO_LENGTH, ZERO_LENGTH];
            case "to top":
            case "bottom":
              return deg(0);
            case "to bottom left":
            case "to left bottom":
            case "right top":
            case "top right":
              return [ZERO_LENGTH, HUNDRED_PERCENT];
            case "to right":
            case "left":
              return deg(90);
            case "to top left":
            case "to left top":
            case "right bottom":
            case "bottom right":
              return [HUNDRED_PERCENT, HUNDRED_PERCENT];
            case "to bottom":
            case "top":
              return deg(180);
            case "to top right":
            case "to right top":
            case "left bottom":
            case "bottom left":
              return [HUNDRED_PERCENT, ZERO_LENGTH];
            case "to left":
            case "right":
              return deg(270);
          }
          return 0;
        };
        var deg = function(deg2) {
          return Math.PI * deg2 / 180;
        };
        var color$1 = {
          name: "color",
          parse: function(context, value) {
            if (value.type === 18) {
              var colorFunction = SUPPORTED_COLOR_FUNCTIONS[value.name];
              if (typeof colorFunction === "undefined") {
                throw new Error('Attempting to parse an unsupported color function "' + value.name + '"');
              }
              return colorFunction(context, value.values);
            }
            if (value.type === 5) {
              if (value.value.length === 3) {
                var r = value.value.substring(0, 1);
                var g = value.value.substring(1, 2);
                var b = value.value.substring(2, 3);
                return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), 1);
              }
              if (value.value.length === 4) {
                var r = value.value.substring(0, 1);
                var g = value.value.substring(1, 2);
                var b = value.value.substring(2, 3);
                var a2 = value.value.substring(3, 4);
                return pack(parseInt(r + r, 16), parseInt(g + g, 16), parseInt(b + b, 16), parseInt(a2 + a2, 16) / 255);
              }
              if (value.value.length === 6) {
                var r = value.value.substring(0, 2);
                var g = value.value.substring(2, 4);
                var b = value.value.substring(4, 6);
                return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), 1);
              }
              if (value.value.length === 8) {
                var r = value.value.substring(0, 2);
                var g = value.value.substring(2, 4);
                var b = value.value.substring(4, 6);
                var a2 = value.value.substring(6, 8);
                return pack(parseInt(r, 16), parseInt(g, 16), parseInt(b, 16), parseInt(a2, 16) / 255);
              }
            }
            if (value.type === 20) {
              var namedColor = COLORS[value.value.toUpperCase()];
              if (typeof namedColor !== "undefined") {
                return namedColor;
              }
            }
            return COLORS.TRANSPARENT;
          }
        };
        var isTransparent = function(color2) {
          return (255 & color2) === 0;
        };
        var asString = function(color2) {
          var alpha = 255 & color2;
          var blue = 255 & color2 >> 8;
          var green = 255 & color2 >> 16;
          var red = 255 & color2 >> 24;
          return alpha < 255 ? "rgba(" + red + "," + green + "," + blue + "," + alpha / 255 + ")" : "rgb(" + red + "," + green + "," + blue + ")";
        };
        var pack = function(r, g, b, a2) {
          return (r << 24 | g << 16 | b << 8 | Math.round(a2 * 255) << 0) >>> 0;
        };
        var getTokenColorValue = function(token, i2) {
          if (token.type === 17) {
            return token.number;
          }
          if (token.type === 16) {
            var max = i2 === 3 ? 1 : 255;
            return i2 === 3 ? token.number / 100 * max : Math.round(token.number / 100 * max);
          }
          return 0;
        };
        var rgb = function(_context, args) {
          var tokens = args.filter(nonFunctionArgSeparator);
          if (tokens.length === 3) {
            var _a = tokens.map(getTokenColorValue), r = _a[0], g = _a[1], b = _a[2];
            return pack(r, g, b, 1);
          }
          if (tokens.length === 4) {
            var _b = tokens.map(getTokenColorValue), r = _b[0], g = _b[1], b = _b[2], a2 = _b[3];
            return pack(r, g, b, a2);
          }
          return 0;
        };
        function hue2rgb(t1, t2, hue) {
          if (hue < 0) {
            hue += 1;
          }
          if (hue >= 1) {
            hue -= 1;
          }
          if (hue < 1 / 6) {
            return (t2 - t1) * hue * 6 + t1;
          } else if (hue < 1 / 2) {
            return t2;
          } else if (hue < 2 / 3) {
            return (t2 - t1) * 6 * (2 / 3 - hue) + t1;
          } else {
            return t1;
          }
        }
        var hsl = function(context, args) {
          var tokens = args.filter(nonFunctionArgSeparator);
          var hue = tokens[0], saturation = tokens[1], lightness = tokens[2], alpha = tokens[3];
          var h = (hue.type === 17 ? deg(hue.number) : angle.parse(context, hue)) / (Math.PI * 2);
          var s = isLengthPercentage(saturation) ? saturation.number / 100 : 0;
          var l = isLengthPercentage(lightness) ? lightness.number / 100 : 0;
          var a2 = typeof alpha !== "undefined" && isLengthPercentage(alpha) ? getAbsoluteValue(alpha, 1) : 1;
          if (s === 0) {
            return pack(l * 255, l * 255, l * 255, 1);
          }
          var t2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
          var t1 = l * 2 - t2;
          var r = hue2rgb(t1, t2, h + 1 / 3);
          var g = hue2rgb(t1, t2, h);
          var b = hue2rgb(t1, t2, h - 1 / 3);
          return pack(r * 255, g * 255, b * 255, a2);
        };
        var SUPPORTED_COLOR_FUNCTIONS = {
          hsl,
          hsla: hsl,
          rgb,
          rgba: rgb
        };
        var parseColor = function(context, value) {
          return color$1.parse(context, Parser.create(value).parseComponentValue());
        };
        var COLORS = {
          ALICEBLUE: 4042850303,
          ANTIQUEWHITE: 4209760255,
          AQUA: 16777215,
          AQUAMARINE: 2147472639,
          AZURE: 4043309055,
          BEIGE: 4126530815,
          BISQUE: 4293182719,
          BLACK: 255,
          BLANCHEDALMOND: 4293643775,
          BLUE: 65535,
          BLUEVIOLET: 2318131967,
          BROWN: 2771004159,
          BURLYWOOD: 3736635391,
          CADETBLUE: 1604231423,
          CHARTREUSE: 2147418367,
          CHOCOLATE: 3530104575,
          CORAL: 4286533887,
          CORNFLOWERBLUE: 1687547391,
          CORNSILK: 4294499583,
          CRIMSON: 3692313855,
          CYAN: 16777215,
          DARKBLUE: 35839,
          DARKCYAN: 9145343,
          DARKGOLDENROD: 3095837695,
          DARKGRAY: 2846468607,
          DARKGREEN: 6553855,
          DARKGREY: 2846468607,
          DARKKHAKI: 3182914559,
          DARKMAGENTA: 2332068863,
          DARKOLIVEGREEN: 1433087999,
          DARKORANGE: 4287365375,
          DARKORCHID: 2570243327,
          DARKRED: 2332033279,
          DARKSALMON: 3918953215,
          DARKSEAGREEN: 2411499519,
          DARKSLATEBLUE: 1211993087,
          DARKSLATEGRAY: 793726975,
          DARKSLATEGREY: 793726975,
          DARKTURQUOISE: 13554175,
          DARKVIOLET: 2483082239,
          DEEPPINK: 4279538687,
          DEEPSKYBLUE: 12582911,
          DIMGRAY: 1768516095,
          DIMGREY: 1768516095,
          DODGERBLUE: 512819199,
          FIREBRICK: 2988581631,
          FLORALWHITE: 4294635775,
          FORESTGREEN: 579543807,
          FUCHSIA: 4278255615,
          GAINSBORO: 3705462015,
          GHOSTWHITE: 4177068031,
          GOLD: 4292280575,
          GOLDENROD: 3668254975,
          GRAY: 2155905279,
          GREEN: 8388863,
          GREENYELLOW: 2919182335,
          GREY: 2155905279,
          HONEYDEW: 4043305215,
          HOTPINK: 4285117695,
          INDIANRED: 3445382399,
          INDIGO: 1258324735,
          IVORY: 4294963455,
          KHAKI: 4041641215,
          LAVENDER: 3873897215,
          LAVENDERBLUSH: 4293981695,
          LAWNGREEN: 2096890111,
          LEMONCHIFFON: 4294626815,
          LIGHTBLUE: 2916673279,
          LIGHTCORAL: 4034953471,
          LIGHTCYAN: 3774873599,
          LIGHTGOLDENRODYELLOW: 4210742015,
          LIGHTGRAY: 3553874943,
          LIGHTGREEN: 2431553791,
          LIGHTGREY: 3553874943,
          LIGHTPINK: 4290167295,
          LIGHTSALMON: 4288707327,
          LIGHTSEAGREEN: 548580095,
          LIGHTSKYBLUE: 2278488831,
          LIGHTSLATEGRAY: 2005441023,
          LIGHTSLATEGREY: 2005441023,
          LIGHTSTEELBLUE: 2965692159,
          LIGHTYELLOW: 4294959359,
          LIME: 16711935,
          LIMEGREEN: 852308735,
          LINEN: 4210091775,
          MAGENTA: 4278255615,
          MAROON: 2147483903,
          MEDIUMAQUAMARINE: 1724754687,
          MEDIUMBLUE: 52735,
          MEDIUMORCHID: 3126187007,
          MEDIUMPURPLE: 2473647103,
          MEDIUMSEAGREEN: 1018393087,
          MEDIUMSLATEBLUE: 2070474495,
          MEDIUMSPRINGGREEN: 16423679,
          MEDIUMTURQUOISE: 1221709055,
          MEDIUMVIOLETRED: 3340076543,
          MIDNIGHTBLUE: 421097727,
          MINTCREAM: 4127193855,
          MISTYROSE: 4293190143,
          MOCCASIN: 4293178879,
          NAVAJOWHITE: 4292783615,
          NAVY: 33023,
          OLDLACE: 4260751103,
          OLIVE: 2155872511,
          OLIVEDRAB: 1804477439,
          ORANGE: 4289003775,
          ORANGERED: 4282712319,
          ORCHID: 3664828159,
          PALEGOLDENROD: 4008225535,
          PALEGREEN: 2566625535,
          PALETURQUOISE: 2951671551,
          PALEVIOLETRED: 3681588223,
          PAPAYAWHIP: 4293907967,
          PEACHPUFF: 4292524543,
          PERU: 3448061951,
          PINK: 4290825215,
          PLUM: 3718307327,
          POWDERBLUE: 2967529215,
          PURPLE: 2147516671,
          REBECCAPURPLE: 1714657791,
          RED: 4278190335,
          ROSYBROWN: 3163525119,
          ROYALBLUE: 1097458175,
          SADDLEBROWN: 2336560127,
          SALMON: 4202722047,
          SANDYBROWN: 4104413439,
          SEAGREEN: 780883967,
          SEASHELL: 4294307583,
          SIENNA: 2689740287,
          SILVER: 3233857791,
          SKYBLUE: 2278484991,
          SLATEBLUE: 1784335871,
          SLATEGRAY: 1887473919,
          SLATEGREY: 1887473919,
          SNOW: 4294638335,
          SPRINGGREEN: 16744447,
          STEELBLUE: 1182971135,
          TAN: 3535047935,
          TEAL: 8421631,
          THISTLE: 3636451583,
          TOMATO: 4284696575,
          TRANSPARENT: 0,
          TURQUOISE: 1088475391,
          VIOLET: 4001558271,
          WHEAT: 4125012991,
          WHITE: 4294967295,
          WHITESMOKE: 4126537215,
          YELLOW: 4294902015,
          YELLOWGREEN: 2597139199
        };
        var backgroundClip = {
          name: "background-clip",
          initialValue: "border-box",
          prefix: false,
          type: 1,
          parse: function(_context, tokens) {
            return tokens.map(function(token) {
              if (isIdentToken(token)) {
                switch (token.value) {
                  case "padding-box":
                    return 1;
                  case "content-box":
                    return 2;
                }
              }
              return 0;
            });
          }
        };
        var backgroundColor = {
          name: "background-color",
          initialValue: "transparent",
          prefix: false,
          type: 3,
          format: "color"
        };
        var parseColorStop = function(context, args) {
          var color2 = color$1.parse(context, args[0]);
          var stop = args[1];
          return stop && isLengthPercentage(stop) ? { color: color2, stop } : { color: color2, stop: null };
        };
        var processColorStops = function(stops, lineLength) {
          var first = stops[0];
          var last = stops[stops.length - 1];
          if (first.stop === null) {
            first.stop = ZERO_LENGTH;
          }
          if (last.stop === null) {
            last.stop = HUNDRED_PERCENT;
          }
          var processStops = [];
          var previous = 0;
          for (var i2 = 0; i2 < stops.length; i2++) {
            var stop_1 = stops[i2].stop;
            if (stop_1 !== null) {
              var absoluteValue = getAbsoluteValue(stop_1, lineLength);
              if (absoluteValue > previous) {
                processStops.push(absoluteValue);
              } else {
                processStops.push(previous);
              }
              previous = absoluteValue;
            } else {
              processStops.push(null);
            }
          }
          var gapBegin = null;
          for (var i2 = 0; i2 < processStops.length; i2++) {
            var stop_2 = processStops[i2];
            if (stop_2 === null) {
              if (gapBegin === null) {
                gapBegin = i2;
              }
            } else if (gapBegin !== null) {
              var gapLength = i2 - gapBegin;
              var beforeGap = processStops[gapBegin - 1];
              var gapValue = (stop_2 - beforeGap) / (gapLength + 1);
              for (var g = 1; g <= gapLength; g++) {
                processStops[gapBegin + g - 1] = gapValue * g;
              }
              gapBegin = null;
            }
          }
          return stops.map(function(_a, i3) {
            var color2 = _a.color;
            return { color: color2, stop: Math.max(Math.min(1, processStops[i3] / lineLength), 0) };
          });
        };
        var getAngleFromCorner = function(corner, width, height) {
          var centerX = width / 2;
          var centerY = height / 2;
          var x = getAbsoluteValue(corner[0], width) - centerX;
          var y = centerY - getAbsoluteValue(corner[1], height);
          return (Math.atan2(y, x) + Math.PI * 2) % (Math.PI * 2);
        };
        var calculateGradientDirection = function(angle2, width, height) {
          var radian = typeof angle2 === "number" ? angle2 : getAngleFromCorner(angle2, width, height);
          var lineLength = Math.abs(width * Math.sin(radian)) + Math.abs(height * Math.cos(radian));
          var halfWidth = width / 2;
          var halfHeight = height / 2;
          var halfLineLength = lineLength / 2;
          var yDiff = Math.sin(radian - Math.PI / 2) * halfLineLength;
          var xDiff = Math.cos(radian - Math.PI / 2) * halfLineLength;
          return [lineLength, halfWidth - xDiff, halfWidth + xDiff, halfHeight - yDiff, halfHeight + yDiff];
        };
        var distance = function(a2, b) {
          return Math.sqrt(a2 * a2 + b * b);
        };
        var findCorner = function(width, height, x, y, closest) {
          var corners = [
            [0, 0],
            [0, height],
            [width, 0],
            [width, height]
          ];
          return corners.reduce(function(stat, corner) {
            var cx = corner[0], cy = corner[1];
            var d = distance(x - cx, y - cy);
            if (closest ? d < stat.optimumDistance : d > stat.optimumDistance) {
              return {
                optimumCorner: corner,
                optimumDistance: d
              };
            }
            return stat;
          }, {
            optimumDistance: closest ? Infinity : -Infinity,
            optimumCorner: null
          }).optimumCorner;
        };
        var calculateRadius = function(gradient, x, y, width, height) {
          var rx = 0;
          var ry = 0;
          switch (gradient.size) {
            case 0:
              if (gradient.shape === 0) {
                rx = ry = Math.min(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
              } else if (gradient.shape === 1) {
                rx = Math.min(Math.abs(x), Math.abs(x - width));
                ry = Math.min(Math.abs(y), Math.abs(y - height));
              }
              break;
            case 2:
              if (gradient.shape === 0) {
                rx = ry = Math.min(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
              } else if (gradient.shape === 1) {
                var c = Math.min(Math.abs(y), Math.abs(y - height)) / Math.min(Math.abs(x), Math.abs(x - width));
                var _a = findCorner(width, height, x, y, true), cx = _a[0], cy = _a[1];
                rx = distance(cx - x, (cy - y) / c);
                ry = c * rx;
              }
              break;
            case 1:
              if (gradient.shape === 0) {
                rx = ry = Math.max(Math.abs(x), Math.abs(x - width), Math.abs(y), Math.abs(y - height));
              } else if (gradient.shape === 1) {
                rx = Math.max(Math.abs(x), Math.abs(x - width));
                ry = Math.max(Math.abs(y), Math.abs(y - height));
              }
              break;
            case 3:
              if (gradient.shape === 0) {
                rx = ry = Math.max(distance(x, y), distance(x, y - height), distance(x - width, y), distance(x - width, y - height));
              } else if (gradient.shape === 1) {
                var c = Math.max(Math.abs(y), Math.abs(y - height)) / Math.max(Math.abs(x), Math.abs(x - width));
                var _b = findCorner(width, height, x, y, false), cx = _b[0], cy = _b[1];
                rx = distance(cx - x, (cy - y) / c);
                ry = c * rx;
              }
              break;
          }
          if (Array.isArray(gradient.size)) {
            rx = getAbsoluteValue(gradient.size[0], width);
            ry = gradient.size.length === 2 ? getAbsoluteValue(gradient.size[1], height) : rx;
          }
          return [rx, ry];
        };
        var linearGradient = function(context, tokens) {
          var angle$1 = deg(180);
          var stops = [];
          parseFunctionArgs(tokens).forEach(function(arg, i2) {
            if (i2 === 0) {
              var firstToken = arg[0];
              if (firstToken.type === 20 && firstToken.value === "to") {
                angle$1 = parseNamedSide(arg);
                return;
              } else if (isAngle(firstToken)) {
                angle$1 = angle.parse(context, firstToken);
                return;
              }
            }
            var colorStop = parseColorStop(context, arg);
            stops.push(colorStop);
          });
          return {
            angle: angle$1,
            stops,
            type: 1
            /* LINEAR_GRADIENT */
          };
        };
        var prefixLinearGradient = function(context, tokens) {
          var angle$1 = deg(180);
          var stops = [];
          parseFunctionArgs(tokens).forEach(function(arg, i2) {
            if (i2 === 0) {
              var firstToken = arg[0];
              if (firstToken.type === 20 && ["top", "left", "right", "bottom"].indexOf(firstToken.value) !== -1) {
                angle$1 = parseNamedSide(arg);
                return;
              } else if (isAngle(firstToken)) {
                angle$1 = (angle.parse(context, firstToken) + deg(270)) % deg(360);
                return;
              }
            }
            var colorStop = parseColorStop(context, arg);
            stops.push(colorStop);
          });
          return {
            angle: angle$1,
            stops,
            type: 1
            /* LINEAR_GRADIENT */
          };
        };
        var webkitGradient = function(context, tokens) {
          var angle2 = deg(180);
          var stops = [];
          var type = 1;
          var shape = 0;
          var size = 3;
          var position2 = [];
          parseFunctionArgs(tokens).forEach(function(arg, i2) {
            var firstToken = arg[0];
            if (i2 === 0) {
              if (isIdentToken(firstToken) && firstToken.value === "linear") {
                type = 1;
                return;
              } else if (isIdentToken(firstToken) && firstToken.value === "radial") {
                type = 2;
                return;
              }
            }
            if (firstToken.type === 18) {
              if (firstToken.name === "from") {
                var color2 = color$1.parse(context, firstToken.values[0]);
                stops.push({ stop: ZERO_LENGTH, color: color2 });
              } else if (firstToken.name === "to") {
                var color2 = color$1.parse(context, firstToken.values[0]);
                stops.push({ stop: HUNDRED_PERCENT, color: color2 });
              } else if (firstToken.name === "color-stop") {
                var values = firstToken.values.filter(nonFunctionArgSeparator);
                if (values.length === 2) {
                  var color2 = color$1.parse(context, values[1]);
                  var stop_1 = values[0];
                  if (isNumberToken(stop_1)) {
                    stops.push({
                      stop: { type: 16, number: stop_1.number * 100, flags: stop_1.flags },
                      color: color2
                    });
                  }
                }
              }
            }
          });
          return type === 1 ? {
            angle: (angle2 + deg(180)) % deg(360),
            stops,
            type
          } : { size, shape, stops, position: position2, type };
        };
        var CLOSEST_SIDE = "closest-side";
        var FARTHEST_SIDE = "farthest-side";
        var CLOSEST_CORNER = "closest-corner";
        var FARTHEST_CORNER = "farthest-corner";
        var CIRCLE = "circle";
        var ELLIPSE = "ellipse";
        var COVER = "cover";
        var CONTAIN = "contain";
        var radialGradient = function(context, tokens) {
          var shape = 0;
          var size = 3;
          var stops = [];
          var position2 = [];
          parseFunctionArgs(tokens).forEach(function(arg, i2) {
            var isColorStop = true;
            if (i2 === 0) {
              var isAtPosition_1 = false;
              isColorStop = arg.reduce(function(acc, token) {
                if (isAtPosition_1) {
                  if (isIdentToken(token)) {
                    switch (token.value) {
                      case "center":
                        position2.push(FIFTY_PERCENT);
                        return acc;
                      case "top":
                      case "left":
                        position2.push(ZERO_LENGTH);
                        return acc;
                      case "right":
                      case "bottom":
                        position2.push(HUNDRED_PERCENT);
                        return acc;
                    }
                  } else if (isLengthPercentage(token) || isLength(token)) {
                    position2.push(token);
                  }
                } else if (isIdentToken(token)) {
                  switch (token.value) {
                    case CIRCLE:
                      shape = 0;
                      return false;
                    case ELLIPSE:
                      shape = 1;
                      return false;
                    case "at":
                      isAtPosition_1 = true;
                      return false;
                    case CLOSEST_SIDE:
                      size = 0;
                      return false;
                    case COVER:
                    case FARTHEST_SIDE:
                      size = 1;
                      return false;
                    case CONTAIN:
                    case CLOSEST_CORNER:
                      size = 2;
                      return false;
                    case FARTHEST_CORNER:
                      size = 3;
                      return false;
                  }
                } else if (isLength(token) || isLengthPercentage(token)) {
                  if (!Array.isArray(size)) {
                    size = [];
                  }
                  size.push(token);
                  return false;
                }
                return acc;
              }, isColorStop);
            }
            if (isColorStop) {
              var colorStop = parseColorStop(context, arg);
              stops.push(colorStop);
            }
          });
          return {
            size,
            shape,
            stops,
            position: position2,
            type: 2
            /* RADIAL_GRADIENT */
          };
        };
        var prefixRadialGradient = function(context, tokens) {
          var shape = 0;
          var size = 3;
          var stops = [];
          var position2 = [];
          parseFunctionArgs(tokens).forEach(function(arg, i2) {
            var isColorStop = true;
            if (i2 === 0) {
              isColorStop = arg.reduce(function(acc, token) {
                if (isIdentToken(token)) {
                  switch (token.value) {
                    case "center":
                      position2.push(FIFTY_PERCENT);
                      return false;
                    case "top":
                    case "left":
                      position2.push(ZERO_LENGTH);
                      return false;
                    case "right":
                    case "bottom":
                      position2.push(HUNDRED_PERCENT);
                      return false;
                  }
                } else if (isLengthPercentage(token) || isLength(token)) {
                  position2.push(token);
                  return false;
                }
                return acc;
              }, isColorStop);
            } else if (i2 === 1) {
              isColorStop = arg.reduce(function(acc, token) {
                if (isIdentToken(token)) {
                  switch (token.value) {
                    case CIRCLE:
                      shape = 0;
                      return false;
                    case ELLIPSE:
                      shape = 1;
                      return false;
                    case CONTAIN:
                    case CLOSEST_SIDE:
                      size = 0;
                      return false;
                    case FARTHEST_SIDE:
                      size = 1;
                      return false;
                    case CLOSEST_CORNER:
                      size = 2;
                      return false;
                    case COVER:
                    case FARTHEST_CORNER:
                      size = 3;
                      return false;
                  }
                } else if (isLength(token) || isLengthPercentage(token)) {
                  if (!Array.isArray(size)) {
                    size = [];
                  }
                  size.push(token);
                  return false;
                }
                return acc;
              }, isColorStop);
            }
            if (isColorStop) {
              var colorStop = parseColorStop(context, arg);
              stops.push(colorStop);
            }
          });
          return {
            size,
            shape,
            stops,
            position: position2,
            type: 2
            /* RADIAL_GRADIENT */
          };
        };
        var isLinearGradient = function(background) {
          return background.type === 1;
        };
        var isRadialGradient = function(background) {
          return background.type === 2;
        };
        var image = {
          name: "image",
          parse: function(context, value) {
            if (value.type === 22) {
              var image_1 = {
                url: value.value,
                type: 0
                /* URL */
              };
              context.cache.addImage(value.value);
              return image_1;
            }
            if (value.type === 18) {
              var imageFunction = SUPPORTED_IMAGE_FUNCTIONS[value.name];
              if (typeof imageFunction === "undefined") {
                throw new Error('Attempting to parse an unsupported image function "' + value.name + '"');
              }
              return imageFunction(context, value.values);
            }
            throw new Error("Unsupported image type " + value.type);
          }
        };
        function isSupportedImage(value) {
          return !(value.type === 20 && value.value === "none") && (value.type !== 18 || !!SUPPORTED_IMAGE_FUNCTIONS[value.name]);
        }
        var SUPPORTED_IMAGE_FUNCTIONS = {
          "linear-gradient": linearGradient,
          "-moz-linear-gradient": prefixLinearGradient,
          "-ms-linear-gradient": prefixLinearGradient,
          "-o-linear-gradient": prefixLinearGradient,
          "-webkit-linear-gradient": prefixLinearGradient,
          "radial-gradient": radialGradient,
          "-moz-radial-gradient": prefixRadialGradient,
          "-ms-radial-gradient": prefixRadialGradient,
          "-o-radial-gradient": prefixRadialGradient,
          "-webkit-radial-gradient": prefixRadialGradient,
          "-webkit-gradient": webkitGradient
        };
        var backgroundImage = {
          name: "background-image",
          initialValue: "none",
          type: 1,
          prefix: false,
          parse: function(context, tokens) {
            if (tokens.length === 0) {
              return [];
            }
            var first = tokens[0];
            if (first.type === 20 && first.value === "none") {
              return [];
            }
            return tokens.filter(function(value) {
              return nonFunctionArgSeparator(value) && isSupportedImage(value);
            }).map(function(value) {
              return image.parse(context, value);
            });
          }
        };
        var backgroundOrigin = {
          name: "background-origin",
          initialValue: "border-box",
          prefix: false,
          type: 1,
          parse: function(_context, tokens) {
            return tokens.map(function(token) {
              if (isIdentToken(token)) {
                switch (token.value) {
                  case "padding-box":
                    return 1;
                  case "content-box":
                    return 2;
                }
              }
              return 0;
            });
          }
        };
        var backgroundPosition = {
          name: "background-position",
          initialValue: "0% 0%",
          type: 1,
          prefix: false,
          parse: function(_context, tokens) {
            return parseFunctionArgs(tokens).map(function(values) {
              return values.filter(isLengthPercentage);
            }).map(parseLengthPercentageTuple);
          }
        };
        var backgroundRepeat = {
          name: "background-repeat",
          initialValue: "repeat",
          prefix: false,
          type: 1,
          parse: function(_context, tokens) {
            return parseFunctionArgs(tokens).map(function(values) {
              return values.filter(isIdentToken).map(function(token) {
                return token.value;
              }).join(" ");
            }).map(parseBackgroundRepeat);
          }
        };
        var parseBackgroundRepeat = function(value) {
          switch (value) {
            case "no-repeat":
              return 1;
            case "repeat-x":
            case "repeat no-repeat":
              return 2;
            case "repeat-y":
            case "no-repeat repeat":
              return 3;
            case "repeat":
            default:
              return 0;
          }
        };
        var BACKGROUND_SIZE;
        (function(BACKGROUND_SIZE2) {
          BACKGROUND_SIZE2["AUTO"] = "auto";
          BACKGROUND_SIZE2["CONTAIN"] = "contain";
          BACKGROUND_SIZE2["COVER"] = "cover";
        })(BACKGROUND_SIZE || (BACKGROUND_SIZE = {}));
        var backgroundSize = {
          name: "background-size",
          initialValue: "0",
          prefix: false,
          type: 1,
          parse: function(_context, tokens) {
            return parseFunctionArgs(tokens).map(function(values) {
              return values.filter(isBackgroundSizeInfoToken);
            });
          }
        };
        var isBackgroundSizeInfoToken = function(value) {
          return isIdentToken(value) || isLengthPercentage(value);
        };
        var borderColorForSide = function(side) {
          return {
            name: "border-" + side + "-color",
            initialValue: "transparent",
            prefix: false,
            type: 3,
            format: "color"
          };
        };
        var borderTopColor = borderColorForSide("top");
        var borderRightColor = borderColorForSide("right");
        var borderBottomColor = borderColorForSide("bottom");
        var borderLeftColor = borderColorForSide("left");
        var borderRadiusForSide = function(side) {
          return {
            name: "border-radius-" + side,
            initialValue: "0 0",
            prefix: false,
            type: 1,
            parse: function(_context, tokens) {
              return parseLengthPercentageTuple(tokens.filter(isLengthPercentage));
            }
          };
        };
        var borderTopLeftRadius = borderRadiusForSide("top-left");
        var borderTopRightRadius = borderRadiusForSide("top-right");
        var borderBottomRightRadius = borderRadiusForSide("bottom-right");
        var borderBottomLeftRadius = borderRadiusForSide("bottom-left");
        var borderStyleForSide = function(side) {
          return {
            name: "border-" + side + "-style",
            initialValue: "solid",
            prefix: false,
            type: 2,
            parse: function(_context, style) {
              switch (style) {
                case "none":
                  return 0;
                case "dashed":
                  return 2;
                case "dotted":
                  return 3;
                case "double":
                  return 4;
              }
              return 1;
            }
          };
        };
        var borderTopStyle = borderStyleForSide("top");
        var borderRightStyle = borderStyleForSide("right");
        var borderBottomStyle = borderStyleForSide("bottom");
        var borderLeftStyle = borderStyleForSide("left");
        var borderWidthForSide = function(side) {
          return {
            name: "border-" + side + "-width",
            initialValue: "0",
            type: 0,
            prefix: false,
            parse: function(_context, token) {
              if (isDimensionToken(token)) {
                return token.number;
              }
              return 0;
            }
          };
        };
        var borderTopWidth = borderWidthForSide("top");
        var borderRightWidth = borderWidthForSide("right");
        var borderBottomWidth = borderWidthForSide("bottom");
        var borderLeftWidth = borderWidthForSide("left");
        var color = {
          name: "color",
          initialValue: "transparent",
          prefix: false,
          type: 3,
          format: "color"
        };
        var direction = {
          name: "direction",
          initialValue: "ltr",
          prefix: false,
          type: 2,
          parse: function(_context, direction2) {
            switch (direction2) {
              case "rtl":
                return 1;
              case "ltr":
              default:
                return 0;
            }
          }
        };
        var display = {
          name: "display",
          initialValue: "inline-block",
          prefix: false,
          type: 1,
          parse: function(_context, tokens) {
            return tokens.filter(isIdentToken).reduce(
              function(bit, token) {
                return bit | parseDisplayValue(token.value);
              },
              0
              /* NONE */
            );
          }
        };
        var parseDisplayValue = function(display2) {
          switch (display2) {
            case "block":
            case "-webkit-box":
              return 2;
            case "inline":
              return 4;
            case "run-in":
              return 8;
            case "flow":
              return 16;
            case "flow-root":
              return 32;
            case "table":
              return 64;
            case "flex":
            case "-webkit-flex":
              return 128;
            case "grid":
            case "-ms-grid":
              return 256;
            case "ruby":
              return 512;
            case "subgrid":
              return 1024;
            case "list-item":
              return 2048;
            case "table-row-group":
              return 4096;
            case "table-header-group":
              return 8192;
            case "table-footer-group":
              return 16384;
            case "table-row":
              return 32768;
            case "table-cell":
              return 65536;
            case "table-column-group":
              return 131072;
            case "table-column":
              return 262144;
            case "table-caption":
              return 524288;
            case "ruby-base":
              return 1048576;
            case "ruby-text":
              return 2097152;
            case "ruby-base-container":
              return 4194304;
            case "ruby-text-container":
              return 8388608;
            case "contents":
              return 16777216;
            case "inline-block":
              return 33554432;
            case "inline-list-item":
              return 67108864;
            case "inline-table":
              return 134217728;
            case "inline-flex":
              return 268435456;
            case "inline-grid":
              return 536870912;
          }
          return 0;
        };
        var float = {
          name: "float",
          initialValue: "none",
          prefix: false,
          type: 2,
          parse: function(_context, float2) {
            switch (float2) {
              case "left":
                return 1;
              case "right":
                return 2;
              case "inline-start":
                return 3;
              case "inline-end":
                return 4;
            }
            return 0;
          }
        };
        var letterSpacing = {
          name: "letter-spacing",
          initialValue: "0",
          prefix: false,
          type: 0,
          parse: function(_context, token) {
            if (token.type === 20 && token.value === "normal") {
              return 0;
            }
            if (token.type === 17) {
              return token.number;
            }
            if (token.type === 15) {
              return token.number;
            }
            return 0;
          }
        };
        var LINE_BREAK;
        (function(LINE_BREAK2) {
          LINE_BREAK2["NORMAL"] = "normal";
          LINE_BREAK2["STRICT"] = "strict";
        })(LINE_BREAK || (LINE_BREAK = {}));
        var lineBreak = {
          name: "line-break",
          initialValue: "normal",
          prefix: false,
          type: 2,
          parse: function(_context, lineBreak2) {
            switch (lineBreak2) {
              case "strict":
                return LINE_BREAK.STRICT;
              case "normal":
              default:
                return LINE_BREAK.NORMAL;
            }
          }
        };
        var lineHeight = {
          name: "line-height",
          initialValue: "normal",
          prefix: false,
          type: 4
          /* TOKEN_VALUE */
        };
        var computeLineHeight = function(token, fontSize2) {
          if (isIdentToken(token) && token.value === "normal") {
            return 1.2 * fontSize2;
          } else if (token.type === 17) {
            return fontSize2 * token.number;
          } else if (isLengthPercentage(token)) {
            return getAbsoluteValue(token, fontSize2);
          }
          return fontSize2;
        };
        var listStyleImage = {
          name: "list-style-image",
          initialValue: "none",
          type: 0,
          prefix: false,
          parse: function(context, token) {
            if (token.type === 20 && token.value === "none") {
              return null;
            }
            return image.parse(context, token);
          }
        };
        var listStylePosition = {
          name: "list-style-position",
          initialValue: "outside",
          prefix: false,
          type: 2,
          parse: function(_context, position2) {
            switch (position2) {
              case "inside":
                return 0;
              case "outside":
              default:
                return 1;
            }
          }
        };
        var listStyleType = {
          name: "list-style-type",
          initialValue: "none",
          prefix: false,
          type: 2,
          parse: function(_context, type) {
            switch (type) {
              case "disc":
                return 0;
              case "circle":
                return 1;
              case "square":
                return 2;
              case "decimal":
                return 3;
              case "cjk-decimal":
                return 4;
              case "decimal-leading-zero":
                return 5;
              case "lower-roman":
                return 6;
              case "upper-roman":
                return 7;
              case "lower-greek":
                return 8;
              case "lower-alpha":
                return 9;
              case "upper-alpha":
                return 10;
              case "arabic-indic":
                return 11;
              case "armenian":
                return 12;
              case "bengali":
                return 13;
              case "cambodian":
                return 14;
              case "cjk-earthly-branch":
                return 15;
              case "cjk-heavenly-stem":
                return 16;
              case "cjk-ideographic":
                return 17;
              case "devanagari":
                return 18;
              case "ethiopic-numeric":
                return 19;
              case "georgian":
                return 20;
              case "gujarati":
                return 21;
              case "gurmukhi":
                return 22;
              case "hebrew":
                return 22;
              case "hiragana":
                return 23;
              case "hiragana-iroha":
                return 24;
              case "japanese-formal":
                return 25;
              case "japanese-informal":
                return 26;
              case "kannada":
                return 27;
              case "katakana":
                return 28;
              case "katakana-iroha":
                return 29;
              case "khmer":
                return 30;
              case "korean-hangul-formal":
                return 31;
              case "korean-hanja-formal":
                return 32;
              case "korean-hanja-informal":
                return 33;
              case "lao":
                return 34;
              case "lower-armenian":
                return 35;
              case "malayalam":
                return 36;
              case "mongolian":
                return 37;
              case "myanmar":
                return 38;
              case "oriya":
                return 39;
              case "persian":
                return 40;
              case "simp-chinese-formal":
                return 41;
              case "simp-chinese-informal":
                return 42;
              case "tamil":
                return 43;
              case "telugu":
                return 44;
              case "thai":
                return 45;
              case "tibetan":
                return 46;
              case "trad-chinese-formal":
                return 47;
              case "trad-chinese-informal":
                return 48;
              case "upper-armenian":
                return 49;
              case "disclosure-open":
                return 50;
              case "disclosure-closed":
                return 51;
              case "none":
              default:
                return -1;
            }
          }
        };
        var marginForSide = function(side) {
          return {
            name: "margin-" + side,
            initialValue: "0",
            prefix: false,
            type: 4
            /* TOKEN_VALUE */
          };
        };
        var marginTop = marginForSide("top");
        var marginRight = marginForSide("right");
        var marginBottom = marginForSide("bottom");
        var marginLeft = marginForSide("left");
        var overflow = {
          name: "overflow",
          initialValue: "visible",
          prefix: false,
          type: 1,
          parse: function(_context, tokens) {
            return tokens.filter(isIdentToken).map(function(overflow2) {
              switch (overflow2.value) {
                case "hidden":
                  return 1;
                case "scroll":
                  return 2;
                case "clip":
                  return 3;
                case "auto":
                  return 4;
                case "visible":
                default:
                  return 0;
              }
            });
          }
        };
        var overflowWrap = {
          name: "overflow-wrap",
          initialValue: "normal",
          prefix: false,
          type: 2,
          parse: function(_context, overflow2) {
            switch (overflow2) {
              case "break-word":
                return "break-word";
              case "normal":
              default:
                return "normal";
            }
          }
        };
        var paddingForSide = function(side) {
          return {
            name: "padding-" + side,
            initialValue: "0",
            prefix: false,
            type: 3,
            format: "length-percentage"
          };
        };
        var paddingTop = paddingForSide("top");
        var paddingRight = paddingForSide("right");
        var paddingBottom = paddingForSide("bottom");
        var paddingLeft = paddingForSide("left");
        var textAlign = {
          name: "text-align",
          initialValue: "left",
          prefix: false,
          type: 2,
          parse: function(_context, textAlign2) {
            switch (textAlign2) {
              case "right":
                return 2;
              case "center":
              case "justify":
                return 1;
              case "left":
              default:
                return 0;
            }
          }
        };
        var position = {
          name: "position",
          initialValue: "static",
          prefix: false,
          type: 2,
          parse: function(_context, position2) {
            switch (position2) {
              case "relative":
                return 1;
              case "absolute":
                return 2;
              case "fixed":
                return 3;
              case "sticky":
                return 4;
            }
            return 0;
          }
        };
        var textShadow = {
          name: "text-shadow",
          initialValue: "none",
          type: 1,
          prefix: false,
          parse: function(context, tokens) {
            if (tokens.length === 1 && isIdentWithValue(tokens[0], "none")) {
              return [];
            }
            return parseFunctionArgs(tokens).map(function(values) {
              var shadow = {
                color: COLORS.TRANSPARENT,
                offsetX: ZERO_LENGTH,
                offsetY: ZERO_LENGTH,
                blur: ZERO_LENGTH
              };
              var c = 0;
              for (var i2 = 0; i2 < values.length; i2++) {
                var token = values[i2];
                if (isLength(token)) {
                  if (c === 0) {
                    shadow.offsetX = token;
                  } else if (c === 1) {
                    shadow.offsetY = token;
                  } else {
                    shadow.blur = token;
                  }
                  c++;
                } else {
                  shadow.color = color$1.parse(context, token);
                }
              }
              return shadow;
            });
          }
        };
        var textTransform = {
          name: "text-transform",
          initialValue: "none",
          prefix: false,
          type: 2,
          parse: function(_context, textTransform2) {
            switch (textTransform2) {
              case "uppercase":
                return 2;
              case "lowercase":
                return 1;
              case "capitalize":
                return 3;
            }
            return 0;
          }
        };
        var transform$1 = {
          name: "transform",
          initialValue: "none",
          prefix: true,
          type: 0,
          parse: function(_context, token) {
            if (token.type === 20 && token.value === "none") {
              return null;
            }
            if (token.type === 18) {
              var transformFunction = SUPPORTED_TRANSFORM_FUNCTIONS[token.name];
              if (typeof transformFunction === "undefined") {
                throw new Error('Attempting to parse an unsupported transform function "' + token.name + '"');
              }
              return transformFunction(token.values);
            }
            return null;
          }
        };
        var matrix = function(args) {
          var values = args.filter(function(arg) {
            return arg.type === 17;
          }).map(function(arg) {
            return arg.number;
          });
          return values.length === 6 ? values : null;
        };
        var matrix3d = function(args) {
          var values = args.filter(function(arg) {
            return arg.type === 17;
          }).map(function(arg) {
            return arg.number;
          });
          var a1 = values[0], b1 = values[1];
          values[2];
          values[3];
          var a2 = values[4], b2 = values[5];
          values[6];
          values[7];
          values[8];
          values[9];
          values[10];
          values[11];
          var a4 = values[12], b4 = values[13];
          values[14];
          values[15];
          return values.length === 16 ? [a1, b1, a2, b2, a4, b4] : null;
        };
        var SUPPORTED_TRANSFORM_FUNCTIONS = {
          matrix,
          matrix3d
        };
        var DEFAULT_VALUE = {
          type: 16,
          number: 50,
          flags: FLAG_INTEGER
        };
        var DEFAULT = [DEFAULT_VALUE, DEFAULT_VALUE];
        var transformOrigin = {
          name: "transform-origin",
          initialValue: "50% 50%",
          prefix: true,
          type: 1,
          parse: function(_context, tokens) {
            var origins = tokens.filter(isLengthPercentage);
            if (origins.length !== 2) {
              return DEFAULT;
            }
            return [origins[0], origins[1]];
          }
        };
        var visibility = {
          name: "visible",
          initialValue: "none",
          prefix: false,
          type: 2,
          parse: function(_context, visibility2) {
            switch (visibility2) {
              case "hidden":
                return 1;
              case "collapse":
                return 2;
              case "visible":
              default:
                return 0;
            }
          }
        };
        var WORD_BREAK;
        (function(WORD_BREAK2) {
          WORD_BREAK2["NORMAL"] = "normal";
          WORD_BREAK2["BREAK_ALL"] = "break-all";
          WORD_BREAK2["KEEP_ALL"] = "keep-all";
        })(WORD_BREAK || (WORD_BREAK = {}));
        var wordBreak = {
          name: "word-break",
          initialValue: "normal",
          prefix: false,
          type: 2,
          parse: function(_context, wordBreak2) {
            switch (wordBreak2) {
              case "break-all":
                return WORD_BREAK.BREAK_ALL;
              case "keep-all":
                return WORD_BREAK.KEEP_ALL;
              case "normal":
              default:
                return WORD_BREAK.NORMAL;
            }
          }
        };
        var zIndex = {
          name: "z-index",
          initialValue: "auto",
          prefix: false,
          type: 0,
          parse: function(_context, token) {
            if (token.type === 20) {
              return { auto: true, order: 0 };
            }
            if (isNumberToken(token)) {
              return { auto: false, order: token.number };
            }
            throw new Error("Invalid z-index number parsed");
          }
        };
        var time = {
          name: "time",
          parse: function(_context, value) {
            if (value.type === 15) {
              switch (value.unit.toLowerCase()) {
                case "s":
                  return 1e3 * value.number;
                case "ms":
                  return value.number;
              }
            }
            throw new Error("Unsupported time type");
          }
        };
        var opacity = {
          name: "opacity",
          initialValue: "1",
          type: 0,
          prefix: false,
          parse: function(_context, token) {
            if (isNumberToken(token)) {
              return token.number;
            }
            return 1;
          }
        };
        var textDecorationColor = {
          name: "text-decoration-color",
          initialValue: "transparent",
          prefix: false,
          type: 3,
          format: "color"
        };
        var textDecorationLine = {
          name: "text-decoration-line",
          initialValue: "none",
          prefix: false,
          type: 1,
          parse: function(_context, tokens) {
            return tokens.filter(isIdentToken).map(function(token) {
              switch (token.value) {
                case "underline":
                  return 1;
                case "overline":
                  return 2;
                case "line-through":
                  return 3;
                case "none":
                  return 4;
              }
              return 0;
            }).filter(function(line) {
              return line !== 0;
            });
          }
        };
        var fontFamily = {
          name: "font-family",
          initialValue: "",
          prefix: false,
          type: 1,
          parse: function(_context, tokens) {
            var accumulator = [];
            var results = [];
            tokens.forEach(function(token) {
              switch (token.type) {
                case 20:
                case 0:
                  accumulator.push(token.value);
                  break;
                case 17:
                  accumulator.push(token.number.toString());
                  break;
                case 4:
                  results.push(accumulator.join(" "));
                  accumulator.length = 0;
                  break;
              }
            });
            if (accumulator.length) {
              results.push(accumulator.join(" "));
            }
            return results.map(function(result) {
              return result.indexOf(" ") === -1 ? result : "'" + result + "'";
            });
          }
        };
        var fontSize = {
          name: "font-size",
          initialValue: "0",
          prefix: false,
          type: 3,
          format: "length"
        };
        var fontWeight = {
          name: "font-weight",
          initialValue: "normal",
          type: 0,
          prefix: false,
          parse: function(_context, token) {
            if (isNumberToken(token)) {
              return token.number;
            }
            if (isIdentToken(token)) {
              switch (token.value) {
                case "bold":
                  return 700;
                case "normal":
                default:
                  return 400;
              }
            }
            return 400;
          }
        };
        var fontVariant = {
          name: "font-variant",
          initialValue: "none",
          type: 1,
          prefix: false,
          parse: function(_context, tokens) {
            return tokens.filter(isIdentToken).map(function(token) {
              return token.value;
            });
          }
        };
        var fontStyle = {
          name: "font-style",
          initialValue: "normal",
          prefix: false,
          type: 2,
          parse: function(_context, overflow2) {
            switch (overflow2) {
              case "oblique":
                return "oblique";
              case "italic":
                return "italic";
              case "normal":
              default:
                return "normal";
            }
          }
        };
        var contains = function(bit, value) {
          return (bit & value) !== 0;
        };
        var content = {
          name: "content",
          initialValue: "none",
          type: 1,
          prefix: false,
          parse: function(_context, tokens) {
            if (tokens.length === 0) {
              return [];
            }
            var first = tokens[0];
            if (first.type === 20 && first.value === "none") {
              return [];
            }
            return tokens;
          }
        };
        var counterIncrement = {
          name: "counter-increment",
          initialValue: "none",
          prefix: true,
          type: 1,
          parse: function(_context, tokens) {
            if (tokens.length === 0) {
              return null;
            }
            var first = tokens[0];
            if (first.type === 20 && first.value === "none") {
              return null;
            }
            var increments = [];
            var filtered = tokens.filter(nonWhiteSpace);
            for (var i2 = 0; i2 < filtered.length; i2++) {
              var counter = filtered[i2];
              var next = filtered[i2 + 1];
              if (counter.type === 20) {
                var increment = next && isNumberToken(next) ? next.number : 1;
                increments.push({ counter: counter.value, increment });
              }
            }
            return increments;
          }
        };
        var counterReset = {
          name: "counter-reset",
          initialValue: "none",
          prefix: true,
          type: 1,
          parse: function(_context, tokens) {
            if (tokens.length === 0) {
              return [];
            }
            var resets = [];
            var filtered = tokens.filter(nonWhiteSpace);
            for (var i2 = 0; i2 < filtered.length; i2++) {
              var counter = filtered[i2];
              var next = filtered[i2 + 1];
              if (isIdentToken(counter) && counter.value !== "none") {
                var reset = next && isNumberToken(next) ? next.number : 0;
                resets.push({ counter: counter.value, reset });
              }
            }
            return resets;
          }
        };
        var duration = {
          name: "duration",
          initialValue: "0s",
          prefix: false,
          type: 1,
          parse: function(context, tokens) {
            return tokens.filter(isDimensionToken).map(function(token) {
              return time.parse(context, token);
            });
          }
        };
        var quotes = {
          name: "quotes",
          initialValue: "none",
          prefix: true,
          type: 1,
          parse: function(_context, tokens) {
            if (tokens.length === 0) {
              return null;
            }
            var first = tokens[0];
            if (first.type === 20 && first.value === "none") {
              return null;
            }
            var quotes2 = [];
            var filtered = tokens.filter(isStringToken);
            if (filtered.length % 2 !== 0) {
              return null;
            }
            for (var i2 = 0; i2 < filtered.length; i2 += 2) {
              var open_1 = filtered[i2].value;
              var close_1 = filtered[i2 + 1].value;
              quotes2.push({ open: open_1, close: close_1 });
            }
            return quotes2;
          }
        };
        var getQuote = function(quotes2, depth, open) {
          if (!quotes2) {
            return "";
          }
          var quote = quotes2[Math.min(depth, quotes2.length - 1)];
          if (!quote) {
            return "";
          }
          return open ? quote.open : quote.close;
        };
        var boxShadow = {
          name: "box-shadow",
          initialValue: "none",
          type: 1,
          prefix: false,
          parse: function(context, tokens) {
            if (tokens.length === 1 && isIdentWithValue(tokens[0], "none")) {
              return [];
            }
            return parseFunctionArgs(tokens).map(function(values) {
              var shadow = {
                color: 255,
                offsetX: ZERO_LENGTH,
                offsetY: ZERO_LENGTH,
                blur: ZERO_LENGTH,
                spread: ZERO_LENGTH,
                inset: false
              };
              var c = 0;
              for (var i2 = 0; i2 < values.length; i2++) {
                var token = values[i2];
                if (isIdentWithValue(token, "inset")) {
                  shadow.inset = true;
                } else if (isLength(token)) {
                  if (c === 0) {
                    shadow.offsetX = token;
                  } else if (c === 1) {
                    shadow.offsetY = token;
                  } else if (c === 2) {
                    shadow.blur = token;
                  } else {
                    shadow.spread = token;
                  }
                  c++;
                } else {
                  shadow.color = color$1.parse(context, token);
                }
              }
              return shadow;
            });
          }
        };
        var paintOrder = {
          name: "paint-order",
          initialValue: "normal",
          prefix: false,
          type: 1,
          parse: function(_context, tokens) {
            var DEFAULT_VALUE2 = [
              0,
              1,
              2
              /* MARKERS */
            ];
            var layers = [];
            tokens.filter(isIdentToken).forEach(function(token) {
              switch (token.value) {
                case "stroke":
                  layers.push(
                    1
                    /* STROKE */
                  );
                  break;
                case "fill":
                  layers.push(
                    0
                    /* FILL */
                  );
                  break;
                case "markers":
                  layers.push(
                    2
                    /* MARKERS */
                  );
                  break;
              }
            });
            DEFAULT_VALUE2.forEach(function(value) {
              if (layers.indexOf(value) === -1) {
                layers.push(value);
              }
            });
            return layers;
          }
        };
        var webkitTextStrokeColor = {
          name: "-webkit-text-stroke-color",
          initialValue: "currentcolor",
          prefix: false,
          type: 3,
          format: "color"
        };
        var webkitTextStrokeWidth = {
          name: "-webkit-text-stroke-width",
          initialValue: "0",
          type: 0,
          prefix: false,
          parse: function(_context, token) {
            if (isDimensionToken(token)) {
              return token.number;
            }
            return 0;
          }
        };
        var CSSParsedDeclaration = (
          /** @class */
          (function() {
            function CSSParsedDeclaration2(context, declaration) {
              var _a, _b;
              this.animationDuration = parse(context, duration, declaration.animationDuration);
              this.backgroundClip = parse(context, backgroundClip, declaration.backgroundClip);
              this.backgroundColor = parse(context, backgroundColor, declaration.backgroundColor);
              this.backgroundImage = parse(context, backgroundImage, declaration.backgroundImage);
              this.backgroundOrigin = parse(context, backgroundOrigin, declaration.backgroundOrigin);
              this.backgroundPosition = parse(context, backgroundPosition, declaration.backgroundPosition);
              this.backgroundRepeat = parse(context, backgroundRepeat, declaration.backgroundRepeat);
              this.backgroundSize = parse(context, backgroundSize, declaration.backgroundSize);
              this.borderTopColor = parse(context, borderTopColor, declaration.borderTopColor);
              this.borderRightColor = parse(context, borderRightColor, declaration.borderRightColor);
              this.borderBottomColor = parse(context, borderBottomColor, declaration.borderBottomColor);
              this.borderLeftColor = parse(context, borderLeftColor, declaration.borderLeftColor);
              this.borderTopLeftRadius = parse(context, borderTopLeftRadius, declaration.borderTopLeftRadius);
              this.borderTopRightRadius = parse(context, borderTopRightRadius, declaration.borderTopRightRadius);
              this.borderBottomRightRadius = parse(context, borderBottomRightRadius, declaration.borderBottomRightRadius);
              this.borderBottomLeftRadius = parse(context, borderBottomLeftRadius, declaration.borderBottomLeftRadius);
              this.borderTopStyle = parse(context, borderTopStyle, declaration.borderTopStyle);
              this.borderRightStyle = parse(context, borderRightStyle, declaration.borderRightStyle);
              this.borderBottomStyle = parse(context, borderBottomStyle, declaration.borderBottomStyle);
              this.borderLeftStyle = parse(context, borderLeftStyle, declaration.borderLeftStyle);
              this.borderTopWidth = parse(context, borderTopWidth, declaration.borderTopWidth);
              this.borderRightWidth = parse(context, borderRightWidth, declaration.borderRightWidth);
              this.borderBottomWidth = parse(context, borderBottomWidth, declaration.borderBottomWidth);
              this.borderLeftWidth = parse(context, borderLeftWidth, declaration.borderLeftWidth);
              this.boxShadow = parse(context, boxShadow, declaration.boxShadow);
              this.color = parse(context, color, declaration.color);
              this.direction = parse(context, direction, declaration.direction);
              this.display = parse(context, display, declaration.display);
              this.float = parse(context, float, declaration.cssFloat);
              this.fontFamily = parse(context, fontFamily, declaration.fontFamily);
              this.fontSize = parse(context, fontSize, declaration.fontSize);
              this.fontStyle = parse(context, fontStyle, declaration.fontStyle);
              this.fontVariant = parse(context, fontVariant, declaration.fontVariant);
              this.fontWeight = parse(context, fontWeight, declaration.fontWeight);
              this.letterSpacing = parse(context, letterSpacing, declaration.letterSpacing);
              this.lineBreak = parse(context, lineBreak, declaration.lineBreak);
              this.lineHeight = parse(context, lineHeight, declaration.lineHeight);
              this.listStyleImage = parse(context, listStyleImage, declaration.listStyleImage);
              this.listStylePosition = parse(context, listStylePosition, declaration.listStylePosition);
              this.listStyleType = parse(context, listStyleType, declaration.listStyleType);
              this.marginTop = parse(context, marginTop, declaration.marginTop);
              this.marginRight = parse(context, marginRight, declaration.marginRight);
              this.marginBottom = parse(context, marginBottom, declaration.marginBottom);
              this.marginLeft = parse(context, marginLeft, declaration.marginLeft);
              this.opacity = parse(context, opacity, declaration.opacity);
              var overflowTuple = parse(context, overflow, declaration.overflow);
              this.overflowX = overflowTuple[0];
              this.overflowY = overflowTuple[overflowTuple.length > 1 ? 1 : 0];
              this.overflowWrap = parse(context, overflowWrap, declaration.overflowWrap);
              this.paddingTop = parse(context, paddingTop, declaration.paddingTop);
              this.paddingRight = parse(context, paddingRight, declaration.paddingRight);
              this.paddingBottom = parse(context, paddingBottom, declaration.paddingBottom);
              this.paddingLeft = parse(context, paddingLeft, declaration.paddingLeft);
              this.paintOrder = parse(context, paintOrder, declaration.paintOrder);
              this.position = parse(context, position, declaration.position);
              this.textAlign = parse(context, textAlign, declaration.textAlign);
              this.textDecorationColor = parse(context, textDecorationColor, (_a = declaration.textDecorationColor) !== null && _a !== void 0 ? _a : declaration.color);
              this.textDecorationLine = parse(context, textDecorationLine, (_b = declaration.textDecorationLine) !== null && _b !== void 0 ? _b : declaration.textDecoration);
              this.textShadow = parse(context, textShadow, declaration.textShadow);
              this.textTransform = parse(context, textTransform, declaration.textTransform);
              this.transform = parse(context, transform$1, declaration.transform);
              this.transformOrigin = parse(context, transformOrigin, declaration.transformOrigin);
              this.visibility = parse(context, visibility, declaration.visibility);
              this.webkitTextStrokeColor = parse(context, webkitTextStrokeColor, declaration.webkitTextStrokeColor);
              this.webkitTextStrokeWidth = parse(context, webkitTextStrokeWidth, declaration.webkitTextStrokeWidth);
              this.wordBreak = parse(context, wordBreak, declaration.wordBreak);
              this.zIndex = parse(context, zIndex, declaration.zIndex);
            }
            CSSParsedDeclaration2.prototype.isVisible = function() {
              return this.display > 0 && this.opacity > 0 && this.visibility === 0;
            };
            CSSParsedDeclaration2.prototype.isTransparent = function() {
              return isTransparent(this.backgroundColor);
            };
            CSSParsedDeclaration2.prototype.isTransformed = function() {
              return this.transform !== null;
            };
            CSSParsedDeclaration2.prototype.isPositioned = function() {
              return this.position !== 0;
            };
            CSSParsedDeclaration2.prototype.isPositionedWithZIndex = function() {
              return this.isPositioned() && !this.zIndex.auto;
            };
            CSSParsedDeclaration2.prototype.isFloating = function() {
              return this.float !== 0;
            };
            CSSParsedDeclaration2.prototype.isInlineLevel = function() {
              return contains(
                this.display,
                4
                /* INLINE */
              ) || contains(
                this.display,
                33554432
                /* INLINE_BLOCK */
              ) || contains(
                this.display,
                268435456
                /* INLINE_FLEX */
              ) || contains(
                this.display,
                536870912
                /* INLINE_GRID */
              ) || contains(
                this.display,
                67108864
                /* INLINE_LIST_ITEM */
              ) || contains(
                this.display,
                134217728
                /* INLINE_TABLE */
              );
            };
            return CSSParsedDeclaration2;
          })()
        );
        var CSSParsedPseudoDeclaration = (
          /** @class */
          /* @__PURE__ */ (function() {
            function CSSParsedPseudoDeclaration2(context, declaration) {
              this.content = parse(context, content, declaration.content);
              this.quotes = parse(context, quotes, declaration.quotes);
            }
            return CSSParsedPseudoDeclaration2;
          })()
        );
        var CSSParsedCounterDeclaration = (
          /** @class */
          /* @__PURE__ */ (function() {
            function CSSParsedCounterDeclaration2(context, declaration) {
              this.counterIncrement = parse(context, counterIncrement, declaration.counterIncrement);
              this.counterReset = parse(context, counterReset, declaration.counterReset);
            }
            return CSSParsedCounterDeclaration2;
          })()
        );
        var parse = function(context, descriptor, style) {
          var tokenizer = new Tokenizer();
          var value = style !== null && typeof style !== "undefined" ? style.toString() : descriptor.initialValue;
          tokenizer.write(value);
          var parser = new Parser(tokenizer.read());
          switch (descriptor.type) {
            case 2:
              var token = parser.parseComponentValue();
              return descriptor.parse(context, isIdentToken(token) ? token.value : descriptor.initialValue);
            case 0:
              return descriptor.parse(context, parser.parseComponentValue());
            case 1:
              return descriptor.parse(context, parser.parseComponentValues());
            case 4:
              return parser.parseComponentValue();
            case 3:
              switch (descriptor.format) {
                case "angle":
                  return angle.parse(context, parser.parseComponentValue());
                case "color":
                  return color$1.parse(context, parser.parseComponentValue());
                case "image":
                  return image.parse(context, parser.parseComponentValue());
                case "length":
                  var length_1 = parser.parseComponentValue();
                  return isLength(length_1) ? length_1 : ZERO_LENGTH;
                case "length-percentage":
                  var value_1 = parser.parseComponentValue();
                  return isLengthPercentage(value_1) ? value_1 : ZERO_LENGTH;
                case "time":
                  return time.parse(context, parser.parseComponentValue());
              }
              break;
          }
        };
        var elementDebuggerAttribute = "data-html2canvas-debug";
        var getElementDebugType = function(element) {
          var attribute = element.getAttribute(elementDebuggerAttribute);
          switch (attribute) {
            case "all":
              return 1;
            case "clone":
              return 2;
            case "parse":
              return 3;
            case "render":
              return 4;
            default:
              return 0;
          }
        };
        var isDebugging = function(element, type) {
          var elementType = getElementDebugType(element);
          return elementType === 1 || type === elementType;
        };
        var ElementContainer = (
          /** @class */
          /* @__PURE__ */ (function() {
            function ElementContainer2(context, element) {
              this.context = context;
              this.textNodes = [];
              this.elements = [];
              this.flags = 0;
              if (isDebugging(
                element,
                3
                /* PARSE */
              )) {
                debugger;
              }
              this.styles = new CSSParsedDeclaration(context, window.getComputedStyle(element, null));
              if (isHTMLElementNode(element)) {
                if (this.styles.animationDuration.some(function(duration2) {
                  return duration2 > 0;
                })) {
                  element.style.animationDuration = "0s";
                }
                if (this.styles.transform !== null) {
                  element.style.transform = "none";
                }
              }
              this.bounds = parseBounds(this.context, element);
              if (isDebugging(
                element,
                4
                /* RENDER */
              )) {
                this.flags |= 16;
              }
            }
            return ElementContainer2;
          })()
        );
        var base64 = "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=";
        var chars$1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var lookup$1 = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
        for (var i$1 = 0; i$1 < chars$1.length; i$1++) {
          lookup$1[chars$1.charCodeAt(i$1)] = i$1;
        }
        var decode = function(base642) {
          var bufferLength = base642.length * 0.75, len = base642.length, i2, p = 0, encoded1, encoded2, encoded3, encoded4;
          if (base642[base642.length - 1] === "=") {
            bufferLength--;
            if (base642[base642.length - 2] === "=") {
              bufferLength--;
            }
          }
          var buffer = typeof ArrayBuffer !== "undefined" && typeof Uint8Array !== "undefined" && typeof Uint8Array.prototype.slice !== "undefined" ? new ArrayBuffer(bufferLength) : new Array(bufferLength);
          var bytes = Array.isArray(buffer) ? buffer : new Uint8Array(buffer);
          for (i2 = 0; i2 < len; i2 += 4) {
            encoded1 = lookup$1[base642.charCodeAt(i2)];
            encoded2 = lookup$1[base642.charCodeAt(i2 + 1)];
            encoded3 = lookup$1[base642.charCodeAt(i2 + 2)];
            encoded4 = lookup$1[base642.charCodeAt(i2 + 3)];
            bytes[p++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
          }
          return buffer;
        };
        var polyUint16Array = function(buffer) {
          var length = buffer.length;
          var bytes = [];
          for (var i2 = 0; i2 < length; i2 += 2) {
            bytes.push(buffer[i2 + 1] << 8 | buffer[i2]);
          }
          return bytes;
        };
        var polyUint32Array = function(buffer) {
          var length = buffer.length;
          var bytes = [];
          for (var i2 = 0; i2 < length; i2 += 4) {
            bytes.push(buffer[i2 + 3] << 24 | buffer[i2 + 2] << 16 | buffer[i2 + 1] << 8 | buffer[i2]);
          }
          return bytes;
        };
        var UTRIE2_SHIFT_2 = 5;
        var UTRIE2_SHIFT_1 = 6 + 5;
        var UTRIE2_INDEX_SHIFT = 2;
        var UTRIE2_SHIFT_1_2 = UTRIE2_SHIFT_1 - UTRIE2_SHIFT_2;
        var UTRIE2_LSCP_INDEX_2_OFFSET = 65536 >> UTRIE2_SHIFT_2;
        var UTRIE2_DATA_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_2;
        var UTRIE2_DATA_MASK = UTRIE2_DATA_BLOCK_LENGTH - 1;
        var UTRIE2_LSCP_INDEX_2_LENGTH = 1024 >> UTRIE2_SHIFT_2;
        var UTRIE2_INDEX_2_BMP_LENGTH = UTRIE2_LSCP_INDEX_2_OFFSET + UTRIE2_LSCP_INDEX_2_LENGTH;
        var UTRIE2_UTF8_2B_INDEX_2_OFFSET = UTRIE2_INDEX_2_BMP_LENGTH;
        var UTRIE2_UTF8_2B_INDEX_2_LENGTH = 2048 >> 6;
        var UTRIE2_INDEX_1_OFFSET = UTRIE2_UTF8_2B_INDEX_2_OFFSET + UTRIE2_UTF8_2B_INDEX_2_LENGTH;
        var UTRIE2_OMITTED_BMP_INDEX_1_LENGTH = 65536 >> UTRIE2_SHIFT_1;
        var UTRIE2_INDEX_2_BLOCK_LENGTH = 1 << UTRIE2_SHIFT_1_2;
        var UTRIE2_INDEX_2_MASK = UTRIE2_INDEX_2_BLOCK_LENGTH - 1;
        var slice16 = function(view, start, end) {
          if (view.slice) {
            return view.slice(start, end);
          }
          return new Uint16Array(Array.prototype.slice.call(view, start, end));
        };
        var slice32 = function(view, start, end) {
          if (view.slice) {
            return view.slice(start, end);
          }
          return new Uint32Array(Array.prototype.slice.call(view, start, end));
        };
        var createTrieFromBase64 = function(base642, _byteLength) {
          var buffer = decode(base642);
          var view32 = Array.isArray(buffer) ? polyUint32Array(buffer) : new Uint32Array(buffer);
          var view16 = Array.isArray(buffer) ? polyUint16Array(buffer) : new Uint16Array(buffer);
          var headerLength = 24;
          var index = slice16(view16, headerLength / 2, view32[4] / 2);
          var data = view32[5] === 2 ? slice16(view16, (headerLength + view32[4]) / 2) : slice32(view32, Math.ceil((headerLength + view32[4]) / 4));
          return new Trie(view32[0], view32[1], view32[2], view32[3], index, data);
        };
        var Trie = (
          /** @class */
          (function() {
            function Trie2(initialValue, errorValue, highStart, highValueIndex, index, data) {
              this.initialValue = initialValue;
              this.errorValue = errorValue;
              this.highStart = highStart;
              this.highValueIndex = highValueIndex;
              this.index = index;
              this.data = data;
            }
            Trie2.prototype.get = function(codePoint) {
              var ix;
              if (codePoint >= 0) {
                if (codePoint < 55296 || codePoint > 56319 && codePoint <= 65535) {
                  ix = this.index[codePoint >> UTRIE2_SHIFT_2];
                  ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                  return this.data[ix];
                }
                if (codePoint <= 65535) {
                  ix = this.index[UTRIE2_LSCP_INDEX_2_OFFSET + (codePoint - 55296 >> UTRIE2_SHIFT_2)];
                  ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                  return this.data[ix];
                }
                if (codePoint < this.highStart) {
                  ix = UTRIE2_INDEX_1_OFFSET - UTRIE2_OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> UTRIE2_SHIFT_1);
                  ix = this.index[ix];
                  ix += codePoint >> UTRIE2_SHIFT_2 & UTRIE2_INDEX_2_MASK;
                  ix = this.index[ix];
                  ix = (ix << UTRIE2_INDEX_SHIFT) + (codePoint & UTRIE2_DATA_MASK);
                  return this.data[ix];
                }
                if (codePoint <= 1114111) {
                  return this.data[this.highValueIndex];
                }
              }
              return this.errorValue;
            };
            return Trie2;
          })()
        );
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
        for (var i = 0; i < chars.length; i++) {
          lookup[chars.charCodeAt(i)] = i;
        }
        var Prepend = 1;
        var CR = 2;
        var LF = 3;
        var Control = 4;
        var Extend = 5;
        var SpacingMark = 7;
        var L = 8;
        var V = 9;
        var T = 10;
        var LV = 11;
        var LVT = 12;
        var ZWJ = 13;
        var Extended_Pictographic = 14;
        var RI = 15;
        var toCodePoints = function(str) {
          var codePoints = [];
          var i2 = 0;
          var length = str.length;
          while (i2 < length) {
            var value = str.charCodeAt(i2++);
            if (value >= 55296 && value <= 56319 && i2 < length) {
              var extra = str.charCodeAt(i2++);
              if ((extra & 64512) === 56320) {
                codePoints.push(((value & 1023) << 10) + (extra & 1023) + 65536);
              } else {
                codePoints.push(value);
                i2--;
              }
            } else {
              codePoints.push(value);
            }
          }
          return codePoints;
        };
        var fromCodePoint = function() {
          var codePoints = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            codePoints[_i] = arguments[_i];
          }
          if (String.fromCodePoint) {
            return String.fromCodePoint.apply(String, codePoints);
          }
          var length = codePoints.length;
          if (!length) {
            return "";
          }
          var codeUnits = [];
          var index = -1;
          var result = "";
          while (++index < length) {
            var codePoint = codePoints[index];
            if (codePoint <= 65535) {
              codeUnits.push(codePoint);
            } else {
              codePoint -= 65536;
              codeUnits.push((codePoint >> 10) + 55296, codePoint % 1024 + 56320);
            }
            if (index + 1 === length || codeUnits.length > 16384) {
              result += String.fromCharCode.apply(String, codeUnits);
              codeUnits.length = 0;
            }
          }
          return result;
        };
        var UnicodeTrie = createTrieFromBase64(base64);
        var BREAK_NOT_ALLOWED = "\xD7";
        var BREAK_ALLOWED = "\xF7";
        var codePointToClass = function(codePoint) {
          return UnicodeTrie.get(codePoint);
        };
        var _graphemeBreakAtIndex = function(_codePoints, classTypes, index) {
          var prevIndex = index - 2;
          var prev = classTypes[prevIndex];
          var current = classTypes[index - 1];
          var next = classTypes[index];
          if (current === CR && next === LF) {
            return BREAK_NOT_ALLOWED;
          }
          if (current === CR || current === LF || current === Control) {
            return BREAK_ALLOWED;
          }
          if (next === CR || next === LF || next === Control) {
            return BREAK_ALLOWED;
          }
          if (current === L && [L, V, LV, LVT].indexOf(next) !== -1) {
            return BREAK_NOT_ALLOWED;
          }
          if ((current === LV || current === V) && (next === V || next === T)) {
            return BREAK_NOT_ALLOWED;
          }
          if ((current === LVT || current === T) && next === T) {
            return BREAK_NOT_ALLOWED;
          }
          if (next === ZWJ || next === Extend) {
            return BREAK_NOT_ALLOWED;
          }
          if (next === SpacingMark) {
            return BREAK_NOT_ALLOWED;
          }
          if (current === Prepend) {
            return BREAK_NOT_ALLOWED;
          }
          if (current === ZWJ && next === Extended_Pictographic) {
            while (prev === Extend) {
              prev = classTypes[--prevIndex];
            }
            if (prev === Extended_Pictographic) {
              return BREAK_NOT_ALLOWED;
            }
          }
          if (current === RI && next === RI) {
            var countRI = 0;
            while (prev === RI) {
              countRI++;
              prev = classTypes[--prevIndex];
            }
            if (countRI % 2 === 0) {
              return BREAK_NOT_ALLOWED;
            }
          }
          return BREAK_ALLOWED;
        };
        var GraphemeBreaker = function(str) {
          var codePoints = toCodePoints(str);
          var length = codePoints.length;
          var index = 0;
          var lastEnd = 0;
          var classTypes = codePoints.map(codePointToClass);
          return {
            next: function() {
              if (index >= length) {
                return { done: true, value: null };
              }
              var graphemeBreak = BREAK_NOT_ALLOWED;
              while (index < length && (graphemeBreak = _graphemeBreakAtIndex(codePoints, classTypes, ++index)) === BREAK_NOT_ALLOWED) {
              }
              if (graphemeBreak !== BREAK_NOT_ALLOWED || index === length) {
                var value = fromCodePoint.apply(null, codePoints.slice(lastEnd, index));
                lastEnd = index;
                return { value, done: false };
              }
              return { done: true, value: null };
            }
          };
        };
        var splitGraphemes = function(str) {
          var breaker = GraphemeBreaker(str);
          var graphemes = [];
          var bk;
          while (!(bk = breaker.next()).done) {
            if (bk.value) {
              graphemes.push(bk.value.slice());
            }
          }
          return graphemes;
        };
        var testRangeBounds = function(document2) {
          var TEST_HEIGHT = 123;
          if (document2.createRange) {
            var range = document2.createRange();
            if (range.getBoundingClientRect) {
              var testElement = document2.createElement("boundtest");
              testElement.style.height = TEST_HEIGHT + "px";
              testElement.style.display = "block";
              document2.body.appendChild(testElement);
              range.selectNode(testElement);
              var rangeBounds = range.getBoundingClientRect();
              var rangeHeight = Math.round(rangeBounds.height);
              document2.body.removeChild(testElement);
              if (rangeHeight === TEST_HEIGHT) {
                return true;
              }
            }
          }
          return false;
        };
        var testIOSLineBreak = function(document2) {
          var testElement = document2.createElement("boundtest");
          testElement.style.width = "50px";
          testElement.style.display = "block";
          testElement.style.fontSize = "12px";
          testElement.style.letterSpacing = "0px";
          testElement.style.wordSpacing = "0px";
          document2.body.appendChild(testElement);
          var range = document2.createRange();
          testElement.innerHTML = typeof "".repeat === "function" ? "&#128104;".repeat(10) : "";
          var node = testElement.firstChild;
          var textList = toCodePoints$1(node.data).map(function(i2) {
            return fromCodePoint$1(i2);
          });
          var offset = 0;
          var prev = {};
          var supports = textList.every(function(text, i2) {
            range.setStart(node, offset);
            range.setEnd(node, offset + text.length);
            var rect = range.getBoundingClientRect();
            offset += text.length;
            var boundAhead = rect.x > prev.x || rect.y > prev.y;
            prev = rect;
            if (i2 === 0) {
              return true;
            }
            return boundAhead;
          });
          document2.body.removeChild(testElement);
          return supports;
        };
        var testCORS = function() {
          return typeof new Image().crossOrigin !== "undefined";
        };
        var testResponseType = function() {
          return typeof new XMLHttpRequest().responseType === "string";
        };
        var testSVG = function(document2) {
          var img = new Image();
          var canvas = document2.createElement("canvas");
          var ctx = canvas.getContext("2d");
          if (!ctx) {
            return false;
          }
          img.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
          try {
            ctx.drawImage(img, 0, 0);
            canvas.toDataURL();
          } catch (e2) {
            return false;
          }
          return true;
        };
        var isGreenPixel = function(data) {
          return data[0] === 0 && data[1] === 255 && data[2] === 0 && data[3] === 255;
        };
        var testForeignObject = function(document2) {
          var canvas = document2.createElement("canvas");
          var size = 100;
          canvas.width = size;
          canvas.height = size;
          var ctx = canvas.getContext("2d");
          if (!ctx) {
            return Promise.reject(false);
          }
          ctx.fillStyle = "rgb(0, 255, 0)";
          ctx.fillRect(0, 0, size, size);
          var img = new Image();
          var greenImageSrc = canvas.toDataURL();
          img.src = greenImageSrc;
          var svg = createForeignObjectSVG(size, size, 0, 0, img);
          ctx.fillStyle = "red";
          ctx.fillRect(0, 0, size, size);
          return loadSerializedSVG$1(svg).then(function(img2) {
            ctx.drawImage(img2, 0, 0);
            var data = ctx.getImageData(0, 0, size, size).data;
            ctx.fillStyle = "red";
            ctx.fillRect(0, 0, size, size);
            var node = document2.createElement("div");
            node.style.backgroundImage = "url(" + greenImageSrc + ")";
            node.style.height = size + "px";
            return isGreenPixel(data) ? loadSerializedSVG$1(createForeignObjectSVG(size, size, 0, 0, node)) : Promise.reject(false);
          }).then(function(img2) {
            ctx.drawImage(img2, 0, 0);
            return isGreenPixel(ctx.getImageData(0, 0, size, size).data);
          }).catch(function() {
            return false;
          });
        };
        var createForeignObjectSVG = function(width, height, x, y, node) {
          var xmlns = "http://www.w3.org/2000/svg";
          var svg = document.createElementNS(xmlns, "svg");
          var foreignObject = document.createElementNS(xmlns, "foreignObject");
          svg.setAttributeNS(null, "width", width.toString());
          svg.setAttributeNS(null, "height", height.toString());
          foreignObject.setAttributeNS(null, "width", "100%");
          foreignObject.setAttributeNS(null, "height", "100%");
          foreignObject.setAttributeNS(null, "x", x.toString());
          foreignObject.setAttributeNS(null, "y", y.toString());
          foreignObject.setAttributeNS(null, "externalResourcesRequired", "true");
          svg.appendChild(foreignObject);
          foreignObject.appendChild(node);
          return svg;
        };
        var loadSerializedSVG$1 = function(svg) {
          return new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() {
              return resolve(img);
            };
            img.onerror = reject;
            img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
          });
        };
        var FEATURES = {
          get SUPPORT_RANGE_BOUNDS() {
            var value = testRangeBounds(document);
            Object.defineProperty(FEATURES, "SUPPORT_RANGE_BOUNDS", { value });
            return value;
          },
          get SUPPORT_WORD_BREAKING() {
            var value = FEATURES.SUPPORT_RANGE_BOUNDS && testIOSLineBreak(document);
            Object.defineProperty(FEATURES, "SUPPORT_WORD_BREAKING", { value });
            return value;
          },
          get SUPPORT_SVG_DRAWING() {
            var value = testSVG(document);
            Object.defineProperty(FEATURES, "SUPPORT_SVG_DRAWING", { value });
            return value;
          },
          get SUPPORT_FOREIGNOBJECT_DRAWING() {
            var value = typeof Array.from === "function" && typeof window.fetch === "function" ? testForeignObject(document) : Promise.resolve(false);
            Object.defineProperty(FEATURES, "SUPPORT_FOREIGNOBJECT_DRAWING", { value });
            return value;
          },
          get SUPPORT_CORS_IMAGES() {
            var value = testCORS();
            Object.defineProperty(FEATURES, "SUPPORT_CORS_IMAGES", { value });
            return value;
          },
          get SUPPORT_RESPONSE_TYPE() {
            var value = testResponseType();
            Object.defineProperty(FEATURES, "SUPPORT_RESPONSE_TYPE", { value });
            return value;
          },
          get SUPPORT_CORS_XHR() {
            var value = "withCredentials" in new XMLHttpRequest();
            Object.defineProperty(FEATURES, "SUPPORT_CORS_XHR", { value });
            return value;
          },
          get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
            var value = !!(typeof Intl !== "undefined" && Intl.Segmenter);
            Object.defineProperty(FEATURES, "SUPPORT_NATIVE_TEXT_SEGMENTATION", { value });
            return value;
          }
        };
        var TextBounds = (
          /** @class */
          /* @__PURE__ */ (function() {
            function TextBounds2(text, bounds) {
              this.text = text;
              this.bounds = bounds;
            }
            return TextBounds2;
          })()
        );
        var parseTextBounds = function(context, value, styles, node) {
          var textList = breakText(value, styles);
          var textBounds = [];
          var offset = 0;
          textList.forEach(function(text) {
            if (styles.textDecorationLine.length || text.trim().length > 0) {
              if (FEATURES.SUPPORT_RANGE_BOUNDS) {
                var clientRects = createRange(node, offset, text.length).getClientRects();
                if (clientRects.length > 1) {
                  var subSegments = segmentGraphemes(text);
                  var subOffset_1 = 0;
                  subSegments.forEach(function(subSegment) {
                    textBounds.push(new TextBounds(subSegment, Bounds.fromDOMRectList(context, createRange(node, subOffset_1 + offset, subSegment.length).getClientRects())));
                    subOffset_1 += subSegment.length;
                  });
                } else {
                  textBounds.push(new TextBounds(text, Bounds.fromDOMRectList(context, clientRects)));
                }
              } else {
                var replacementNode = node.splitText(text.length);
                textBounds.push(new TextBounds(text, getWrapperBounds(context, node)));
                node = replacementNode;
              }
            } else if (!FEATURES.SUPPORT_RANGE_BOUNDS) {
              node = node.splitText(text.length);
            }
            offset += text.length;
          });
          return textBounds;
        };
        var getWrapperBounds = function(context, node) {
          var ownerDocument = node.ownerDocument;
          if (ownerDocument) {
            var wrapper = ownerDocument.createElement("html2canvaswrapper");
            wrapper.appendChild(node.cloneNode(true));
            var parentNode = node.parentNode;
            if (parentNode) {
              parentNode.replaceChild(wrapper, node);
              var bounds = parseBounds(context, wrapper);
              if (wrapper.firstChild) {
                parentNode.replaceChild(wrapper.firstChild, wrapper);
              }
              return bounds;
            }
          }
          return Bounds.EMPTY;
        };
        var createRange = function(node, offset, length) {
          var ownerDocument = node.ownerDocument;
          if (!ownerDocument) {
            throw new Error("Node has no owner document");
          }
          var range = ownerDocument.createRange();
          range.setStart(node, offset);
          range.setEnd(node, offset + length);
          return range;
        };
        var segmentGraphemes = function(value) {
          if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
            var segmenter = new Intl.Segmenter(void 0, { granularity: "grapheme" });
            return Array.from(segmenter.segment(value)).map(function(segment) {
              return segment.segment;
            });
          }
          return splitGraphemes(value);
        };
        var segmentWords = function(value, styles) {
          if (FEATURES.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
            var segmenter = new Intl.Segmenter(void 0, {
              granularity: "word"
            });
            return Array.from(segmenter.segment(value)).map(function(segment) {
              return segment.segment;
            });
          }
          return breakWords(value, styles);
        };
        var breakText = function(value, styles) {
          return styles.letterSpacing !== 0 ? segmentGraphemes(value) : segmentWords(value, styles);
        };
        var wordSeparators = [32, 160, 4961, 65792, 65793, 4153, 4241];
        var breakWords = function(str, styles) {
          var breaker = LineBreaker(str, {
            lineBreak: styles.lineBreak,
            wordBreak: styles.overflowWrap === "break-word" ? "break-word" : styles.wordBreak
          });
          var words = [];
          var bk;
          var _loop_1 = function() {
            if (bk.value) {
              var value = bk.value.slice();
              var codePoints = toCodePoints$1(value);
              var word_1 = "";
              codePoints.forEach(function(codePoint) {
                if (wordSeparators.indexOf(codePoint) === -1) {
                  word_1 += fromCodePoint$1(codePoint);
                } else {
                  if (word_1.length) {
                    words.push(word_1);
                  }
                  words.push(fromCodePoint$1(codePoint));
                  word_1 = "";
                }
              });
              if (word_1.length) {
                words.push(word_1);
              }
            }
          };
          while (!(bk = breaker.next()).done) {
            _loop_1();
          }
          return words;
        };
        var TextContainer = (
          /** @class */
          /* @__PURE__ */ (function() {
            function TextContainer2(context, node, styles) {
              this.text = transform(node.data, styles.textTransform);
              this.textBounds = parseTextBounds(context, this.text, styles, node);
            }
            return TextContainer2;
          })()
        );
        var transform = function(text, transform2) {
          switch (transform2) {
            case 1:
              return text.toLowerCase();
            case 3:
              return text.replace(CAPITALIZE, capitalize);
            case 2:
              return text.toUpperCase();
            default:
              return text;
          }
        };
        var CAPITALIZE = /(^|\s|:|-|\(|\))([a-z])/g;
        var capitalize = function(m, p1, p2) {
          if (m.length > 0) {
            return p1 + p2.toUpperCase();
          }
          return m;
        };
        var ImageElementContainer = (
          /** @class */
          (function(_super) {
            __extends(ImageElementContainer2, _super);
            function ImageElementContainer2(context, img) {
              var _this = _super.call(this, context, img) || this;
              _this.src = img.currentSrc || img.src;
              _this.intrinsicWidth = img.naturalWidth;
              _this.intrinsicHeight = img.naturalHeight;
              _this.context.cache.addImage(_this.src);
              return _this;
            }
            return ImageElementContainer2;
          })(ElementContainer)
        );
        var CanvasElementContainer = (
          /** @class */
          (function(_super) {
            __extends(CanvasElementContainer2, _super);
            function CanvasElementContainer2(context, canvas) {
              var _this = _super.call(this, context, canvas) || this;
              _this.canvas = canvas;
              _this.intrinsicWidth = canvas.width;
              _this.intrinsicHeight = canvas.height;
              return _this;
            }
            return CanvasElementContainer2;
          })(ElementContainer)
        );
        var SVGElementContainer = (
          /** @class */
          (function(_super) {
            __extends(SVGElementContainer2, _super);
            function SVGElementContainer2(context, img) {
              var _this = _super.call(this, context, img) || this;
              var s = new XMLSerializer();
              var bounds = parseBounds(context, img);
              img.setAttribute("width", bounds.width + "px");
              img.setAttribute("height", bounds.height + "px");
              _this.svg = "data:image/svg+xml," + encodeURIComponent(s.serializeToString(img));
              _this.intrinsicWidth = img.width.baseVal.value;
              _this.intrinsicHeight = img.height.baseVal.value;
              _this.context.cache.addImage(_this.svg);
              return _this;
            }
            return SVGElementContainer2;
          })(ElementContainer)
        );
        var LIElementContainer = (
          /** @class */
          (function(_super) {
            __extends(LIElementContainer2, _super);
            function LIElementContainer2(context, element) {
              var _this = _super.call(this, context, element) || this;
              _this.value = element.value;
              return _this;
            }
            return LIElementContainer2;
          })(ElementContainer)
        );
        var OLElementContainer = (
          /** @class */
          (function(_super) {
            __extends(OLElementContainer2, _super);
            function OLElementContainer2(context, element) {
              var _this = _super.call(this, context, element) || this;
              _this.start = element.start;
              _this.reversed = typeof element.reversed === "boolean" && element.reversed === true;
              return _this;
            }
            return OLElementContainer2;
          })(ElementContainer)
        );
        var CHECKBOX_BORDER_RADIUS = [
          {
            type: 15,
            flags: 0,
            unit: "px",
            number: 3
          }
        ];
        var RADIO_BORDER_RADIUS = [
          {
            type: 16,
            flags: 0,
            number: 50
          }
        ];
        var reformatInputBounds = function(bounds) {
          if (bounds.width > bounds.height) {
            return new Bounds(bounds.left + (bounds.width - bounds.height) / 2, bounds.top, bounds.height, bounds.height);
          } else if (bounds.width < bounds.height) {
            return new Bounds(bounds.left, bounds.top + (bounds.height - bounds.width) / 2, bounds.width, bounds.width);
          }
          return bounds;
        };
        var getInputValue = function(node) {
          var value = node.type === PASSWORD ? new Array(node.value.length + 1).join("\u2022") : node.value;
          return value.length === 0 ? node.placeholder || "" : value;
        };
        var CHECKBOX = "checkbox";
        var RADIO = "radio";
        var PASSWORD = "password";
        var INPUT_COLOR = 707406591;
        var InputElementContainer = (
          /** @class */
          (function(_super) {
            __extends(InputElementContainer2, _super);
            function InputElementContainer2(context, input) {
              var _this = _super.call(this, context, input) || this;
              _this.type = input.type.toLowerCase();
              _this.checked = input.checked;
              _this.value = getInputValue(input);
              if (_this.type === CHECKBOX || _this.type === RADIO) {
                _this.styles.backgroundColor = 3739148031;
                _this.styles.borderTopColor = _this.styles.borderRightColor = _this.styles.borderBottomColor = _this.styles.borderLeftColor = 2779096575;
                _this.styles.borderTopWidth = _this.styles.borderRightWidth = _this.styles.borderBottomWidth = _this.styles.borderLeftWidth = 1;
                _this.styles.borderTopStyle = _this.styles.borderRightStyle = _this.styles.borderBottomStyle = _this.styles.borderLeftStyle = 1;
                _this.styles.backgroundClip = [
                  0
                  /* BORDER_BOX */
                ];
                _this.styles.backgroundOrigin = [
                  0
                  /* BORDER_BOX */
                ];
                _this.bounds = reformatInputBounds(_this.bounds);
              }
              switch (_this.type) {
                case CHECKBOX:
                  _this.styles.borderTopRightRadius = _this.styles.borderTopLeftRadius = _this.styles.borderBottomRightRadius = _this.styles.borderBottomLeftRadius = CHECKBOX_BORDER_RADIUS;
                  break;
                case RADIO:
                  _this.styles.borderTopRightRadius = _this.styles.borderTopLeftRadius = _this.styles.borderBottomRightRadius = _this.styles.borderBottomLeftRadius = RADIO_BORDER_RADIUS;
                  break;
              }
              return _this;
            }
            return InputElementContainer2;
          })(ElementContainer)
        );
        var SelectElementContainer = (
          /** @class */
          (function(_super) {
            __extends(SelectElementContainer2, _super);
            function SelectElementContainer2(context, element) {
              var _this = _super.call(this, context, element) || this;
              var option = element.options[element.selectedIndex || 0];
              _this.value = option ? option.text || "" : "";
              return _this;
            }
            return SelectElementContainer2;
          })(ElementContainer)
        );
        var TextareaElementContainer = (
          /** @class */
          (function(_super) {
            __extends(TextareaElementContainer2, _super);
            function TextareaElementContainer2(context, element) {
              var _this = _super.call(this, context, element) || this;
              _this.value = element.value;
              return _this;
            }
            return TextareaElementContainer2;
          })(ElementContainer)
        );
        var IFrameElementContainer = (
          /** @class */
          (function(_super) {
            __extends(IFrameElementContainer2, _super);
            function IFrameElementContainer2(context, iframe) {
              var _this = _super.call(this, context, iframe) || this;
              _this.src = iframe.src;
              _this.width = parseInt(iframe.width, 10) || 0;
              _this.height = parseInt(iframe.height, 10) || 0;
              _this.backgroundColor = _this.styles.backgroundColor;
              try {
                if (iframe.contentWindow && iframe.contentWindow.document && iframe.contentWindow.document.documentElement) {
                  _this.tree = parseTree(context, iframe.contentWindow.document.documentElement);
                  var documentBackgroundColor = iframe.contentWindow.document.documentElement ? parseColor(context, getComputedStyle(iframe.contentWindow.document.documentElement).backgroundColor) : COLORS.TRANSPARENT;
                  var bodyBackgroundColor = iframe.contentWindow.document.body ? parseColor(context, getComputedStyle(iframe.contentWindow.document.body).backgroundColor) : COLORS.TRANSPARENT;
                  _this.backgroundColor = isTransparent(documentBackgroundColor) ? isTransparent(bodyBackgroundColor) ? _this.styles.backgroundColor : bodyBackgroundColor : documentBackgroundColor;
                }
              } catch (e2) {
              }
              return _this;
            }
            return IFrameElementContainer2;
          })(ElementContainer)
        );
        var LIST_OWNERS = ["OL", "UL", "MENU"];
        var parseNodeTree = function(context, node, parent, root) {
          for (var childNode = node.firstChild, nextNode = void 0; childNode; childNode = nextNode) {
            nextNode = childNode.nextSibling;
            if (isTextNode(childNode) && childNode.data.trim().length > 0) {
              parent.textNodes.push(new TextContainer(context, childNode, parent.styles));
            } else if (isElementNode(childNode)) {
              if (isSlotElement(childNode) && childNode.assignedNodes) {
                childNode.assignedNodes().forEach(function(childNode2) {
                  return parseNodeTree(context, childNode2, parent, root);
                });
              } else {
                var container = createContainer(context, childNode);
                if (container.styles.isVisible()) {
                  if (createsRealStackingContext(childNode, container, root)) {
                    container.flags |= 4;
                  } else if (createsStackingContext(container.styles)) {
                    container.flags |= 2;
                  }
                  if (LIST_OWNERS.indexOf(childNode.tagName) !== -1) {
                    container.flags |= 8;
                  }
                  parent.elements.push(container);
                  childNode.slot;
                  if (childNode.shadowRoot) {
                    parseNodeTree(context, childNode.shadowRoot, container, root);
                  } else if (!isTextareaElement(childNode) && !isSVGElement(childNode) && !isSelectElement(childNode)) {
                    parseNodeTree(context, childNode, container, root);
                  }
                }
              }
            }
          }
        };
        var createContainer = function(context, element) {
          if (isImageElement(element)) {
            return new ImageElementContainer(context, element);
          }
          if (isCanvasElement(element)) {
            return new CanvasElementContainer(context, element);
          }
          if (isSVGElement(element)) {
            return new SVGElementContainer(context, element);
          }
          if (isLIElement(element)) {
            return new LIElementContainer(context, element);
          }
          if (isOLElement(element)) {
            return new OLElementContainer(context, element);
          }
          if (isInputElement(element)) {
            return new InputElementContainer(context, element);
          }
          if (isSelectElement(element)) {
            return new SelectElementContainer(context, element);
          }
          if (isTextareaElement(element)) {
            return new TextareaElementContainer(context, element);
          }
          if (isIFrameElement(element)) {
            return new IFrameElementContainer(context, element);
          }
          return new ElementContainer(context, element);
        };
        var parseTree = function(context, element) {
          var container = createContainer(context, element);
          container.flags |= 4;
          parseNodeTree(context, element, container, container);
          return container;
        };
        var createsRealStackingContext = function(node, container, root) {
          return container.styles.isPositionedWithZIndex() || container.styles.opacity < 1 || container.styles.isTransformed() || isBodyElement(node) && root.styles.isTransparent();
        };
        var createsStackingContext = function(styles) {
          return styles.isPositioned() || styles.isFloating();
        };
        var isTextNode = function(node) {
          return node.nodeType === Node.TEXT_NODE;
        };
        var isElementNode = function(node) {
          return node.nodeType === Node.ELEMENT_NODE;
        };
        var isHTMLElementNode = function(node) {
          return isElementNode(node) && typeof node.style !== "undefined" && !isSVGElementNode(node);
        };
        var isSVGElementNode = function(element) {
          return typeof element.className === "object";
        };
        var isLIElement = function(node) {
          return node.tagName === "LI";
        };
        var isOLElement = function(node) {
          return node.tagName === "OL";
        };
        var isInputElement = function(node) {
          return node.tagName === "INPUT";
        };
        var isHTMLElement = function(node) {
          return node.tagName === "HTML";
        };
        var isSVGElement = function(node) {
          return node.tagName === "svg";
        };
        var isBodyElement = function(node) {
          return node.tagName === "BODY";
        };
        var isCanvasElement = function(node) {
          return node.tagName === "CANVAS";
        };
        var isVideoElement = function(node) {
          return node.tagName === "VIDEO";
        };
        var isImageElement = function(node) {
          return node.tagName === "IMG";
        };
        var isIFrameElement = function(node) {
          return node.tagName === "IFRAME";
        };
        var isStyleElement = function(node) {
          return node.tagName === "STYLE";
        };
        var isScriptElement = function(node) {
          return node.tagName === "SCRIPT";
        };
        var isTextareaElement = function(node) {
          return node.tagName === "TEXTAREA";
        };
        var isSelectElement = function(node) {
          return node.tagName === "SELECT";
        };
        var isSlotElement = function(node) {
          return node.tagName === "SLOT";
        };
        var isCustomElement = function(node) {
          return node.tagName.indexOf("-") > 0;
        };
        var CounterState = (
          /** @class */
          (function() {
            function CounterState2() {
              this.counters = {};
            }
            CounterState2.prototype.getCounterValue = function(name) {
              var counter = this.counters[name];
              if (counter && counter.length) {
                return counter[counter.length - 1];
              }
              return 1;
            };
            CounterState2.prototype.getCounterValues = function(name) {
              var counter = this.counters[name];
              return counter ? counter : [];
            };
            CounterState2.prototype.pop = function(counters) {
              var _this = this;
              counters.forEach(function(counter) {
                return _this.counters[counter].pop();
              });
            };
            CounterState2.prototype.parse = function(style) {
              var _this = this;
              var counterIncrement2 = style.counterIncrement;
              var counterReset2 = style.counterReset;
              var canReset = true;
              if (counterIncrement2 !== null) {
                counterIncrement2.forEach(function(entry) {
                  var counter = _this.counters[entry.counter];
                  if (counter && entry.increment !== 0) {
                    canReset = false;
                    if (!counter.length) {
                      counter.push(1);
                    }
                    counter[Math.max(0, counter.length - 1)] += entry.increment;
                  }
                });
              }
              var counterNames = [];
              if (canReset) {
                counterReset2.forEach(function(entry) {
                  var counter = _this.counters[entry.counter];
                  counterNames.push(entry.counter);
                  if (!counter) {
                    counter = _this.counters[entry.counter] = [];
                  }
                  counter.push(entry.reset);
                });
              }
              return counterNames;
            };
            return CounterState2;
          })()
        );
        var ROMAN_UPPER = {
          integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
          values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
        };
        var ARMENIAN = {
          integers: [
            9e3,
            8e3,
            7e3,
            6e3,
            5e3,
            4e3,
            3e3,
            2e3,
            1e3,
            900,
            800,
            700,
            600,
            500,
            400,
            300,
            200,
            100,
            90,
            80,
            70,
            60,
            50,
            40,
            30,
            20,
            10,
            9,
            8,
            7,
            6,
            5,
            4,
            3,
            2,
            1
          ],
          values: [
            "\u0554",
            "\u0553",
            "\u0552",
            "\u0551",
            "\u0550",
            "\u054F",
            "\u054E",
            "\u054D",
            "\u054C",
            "\u054B",
            "\u054A",
            "\u0549",
            "\u0548",
            "\u0547",
            "\u0546",
            "\u0545",
            "\u0544",
            "\u0543",
            "\u0542",
            "\u0541",
            "\u0540",
            "\u053F",
            "\u053E",
            "\u053D",
            "\u053C",
            "\u053B",
            "\u053A",
            "\u0539",
            "\u0538",
            "\u0537",
            "\u0536",
            "\u0535",
            "\u0534",
            "\u0533",
            "\u0532",
            "\u0531"
          ]
        };
        var HEBREW = {
          integers: [
            1e4,
            9e3,
            8e3,
            7e3,
            6e3,
            5e3,
            4e3,
            3e3,
            2e3,
            1e3,
            400,
            300,
            200,
            100,
            90,
            80,
            70,
            60,
            50,
            40,
            30,
            20,
            19,
            18,
            17,
            16,
            15,
            10,
            9,
            8,
            7,
            6,
            5,
            4,
            3,
            2,
            1
          ],
          values: [
            "\u05D9\u05F3",
            "\u05D8\u05F3",
            "\u05D7\u05F3",
            "\u05D6\u05F3",
            "\u05D5\u05F3",
            "\u05D4\u05F3",
            "\u05D3\u05F3",
            "\u05D2\u05F3",
            "\u05D1\u05F3",
            "\u05D0\u05F3",
            "\u05EA",
            "\u05E9",
            "\u05E8",
            "\u05E7",
            "\u05E6",
            "\u05E4",
            "\u05E2",
            "\u05E1",
            "\u05E0",
            "\u05DE",
            "\u05DC",
            "\u05DB",
            "\u05D9\u05D8",
            "\u05D9\u05D7",
            "\u05D9\u05D6",
            "\u05D8\u05D6",
            "\u05D8\u05D5",
            "\u05D9",
            "\u05D8",
            "\u05D7",
            "\u05D6",
            "\u05D5",
            "\u05D4",
            "\u05D3",
            "\u05D2",
            "\u05D1",
            "\u05D0"
          ]
        };
        var GEORGIAN = {
          integers: [
            1e4,
            9e3,
            8e3,
            7e3,
            6e3,
            5e3,
            4e3,
            3e3,
            2e3,
            1e3,
            900,
            800,
            700,
            600,
            500,
            400,
            300,
            200,
            100,
            90,
            80,
            70,
            60,
            50,
            40,
            30,
            20,
            10,
            9,
            8,
            7,
            6,
            5,
            4,
            3,
            2,
            1
          ],
          values: [
            "\u10F5",
            "\u10F0",
            "\u10EF",
            "\u10F4",
            "\u10EE",
            "\u10ED",
            "\u10EC",
            "\u10EB",
            "\u10EA",
            "\u10E9",
            "\u10E8",
            "\u10E7",
            "\u10E6",
            "\u10E5",
            "\u10E4",
            "\u10F3",
            "\u10E2",
            "\u10E1",
            "\u10E0",
            "\u10DF",
            "\u10DE",
            "\u10DD",
            "\u10F2",
            "\u10DC",
            "\u10DB",
            "\u10DA",
            "\u10D9",
            "\u10D8",
            "\u10D7",
            "\u10F1",
            "\u10D6",
            "\u10D5",
            "\u10D4",
            "\u10D3",
            "\u10D2",
            "\u10D1",
            "\u10D0"
          ]
        };
        var createAdditiveCounter = function(value, min, max, symbols, fallback, suffix) {
          if (value < min || value > max) {
            return createCounterText(value, fallback, suffix.length > 0);
          }
          return symbols.integers.reduce(function(string, integer, index) {
            while (value >= integer) {
              value -= integer;
              string += symbols.values[index];
            }
            return string;
          }, "") + suffix;
        };
        var createCounterStyleWithSymbolResolver = function(value, codePointRangeLength, isNumeric, resolver) {
          var string = "";
          do {
            if (!isNumeric) {
              value--;
            }
            string = resolver(value) + string;
            value /= codePointRangeLength;
          } while (value * codePointRangeLength >= codePointRangeLength);
          return string;
        };
        var createCounterStyleFromRange = function(value, codePointRangeStart, codePointRangeEnd, isNumeric, suffix) {
          var codePointRangeLength = codePointRangeEnd - codePointRangeStart + 1;
          return (value < 0 ? "-" : "") + (createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, isNumeric, function(codePoint) {
            return fromCodePoint$1(Math.floor(codePoint % codePointRangeLength) + codePointRangeStart);
          }) + suffix);
        };
        var createCounterStyleFromSymbols = function(value, symbols, suffix) {
          if (suffix === void 0) {
            suffix = ". ";
          }
          var codePointRangeLength = symbols.length;
          return createCounterStyleWithSymbolResolver(Math.abs(value), codePointRangeLength, false, function(codePoint) {
            return symbols[Math.floor(codePoint % codePointRangeLength)];
          }) + suffix;
        };
        var CJK_ZEROS = 1 << 0;
        var CJK_TEN_COEFFICIENTS = 1 << 1;
        var CJK_TEN_HIGH_COEFFICIENTS = 1 << 2;
        var CJK_HUNDRED_COEFFICIENTS = 1 << 3;
        var createCJKCounter = function(value, numbers, multipliers, negativeSign, suffix, flags) {
          if (value < -9999 || value > 9999) {
            return createCounterText(value, 4, suffix.length > 0);
          }
          var tmp = Math.abs(value);
          var string = suffix;
          if (tmp === 0) {
            return numbers[0] + string;
          }
          for (var digit = 0; tmp > 0 && digit <= 4; digit++) {
            var coefficient = tmp % 10;
            if (coefficient === 0 && contains(flags, CJK_ZEROS) && string !== "") {
              string = numbers[coefficient] + string;
            } else if (coefficient > 1 || coefficient === 1 && digit === 0 || coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_COEFFICIENTS) || coefficient === 1 && digit === 1 && contains(flags, CJK_TEN_HIGH_COEFFICIENTS) && value > 100 || coefficient === 1 && digit > 1 && contains(flags, CJK_HUNDRED_COEFFICIENTS)) {
              string = numbers[coefficient] + (digit > 0 ? multipliers[digit - 1] : "") + string;
            } else if (coefficient === 1 && digit > 0) {
              string = multipliers[digit - 1] + string;
            }
            tmp = Math.floor(tmp / 10);
          }
          return (value < 0 ? negativeSign : "") + string;
        };
        var CHINESE_INFORMAL_MULTIPLIERS = "\u5341\u767E\u5343\u842C";
        var CHINESE_FORMAL_MULTIPLIERS = "\u62FE\u4F70\u4EDF\u842C";
        var JAPANESE_NEGATIVE = "\u30DE\u30A4\u30CA\u30B9";
        var KOREAN_NEGATIVE = "\uB9C8\uC774\uB108\uC2A4";
        var createCounterText = function(value, type, appendSuffix) {
          var defaultSuffix = appendSuffix ? ". " : "";
          var cjkSuffix = appendSuffix ? "\u3001" : "";
          var koreanSuffix = appendSuffix ? ", " : "";
          var spaceSuffix = appendSuffix ? " " : "";
          switch (type) {
            case 0:
              return "\u2022" + spaceSuffix;
            case 1:
              return "\u25E6" + spaceSuffix;
            case 2:
              return "\u25FE" + spaceSuffix;
            case 5:
              var string = createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
              return string.length < 4 ? "0" + string : string;
            case 4:
              return createCounterStyleFromSymbols(value, "\u3007\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", cjkSuffix);
            case 6:
              return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, 3, defaultSuffix).toLowerCase();
            case 7:
              return createAdditiveCounter(value, 1, 3999, ROMAN_UPPER, 3, defaultSuffix);
            case 8:
              return createCounterStyleFromRange(value, 945, 969, false, defaultSuffix);
            case 9:
              return createCounterStyleFromRange(value, 97, 122, false, defaultSuffix);
            case 10:
              return createCounterStyleFromRange(value, 65, 90, false, defaultSuffix);
            case 11:
              return createCounterStyleFromRange(value, 1632, 1641, true, defaultSuffix);
            case 12:
            case 49:
              return createAdditiveCounter(value, 1, 9999, ARMENIAN, 3, defaultSuffix);
            case 35:
              return createAdditiveCounter(value, 1, 9999, ARMENIAN, 3, defaultSuffix).toLowerCase();
            case 13:
              return createCounterStyleFromRange(value, 2534, 2543, true, defaultSuffix);
            case 14:
            case 30:
              return createCounterStyleFromRange(value, 6112, 6121, true, defaultSuffix);
            case 15:
              return createCounterStyleFromSymbols(value, "\u5B50\u4E11\u5BC5\u536F\u8FB0\u5DF3\u5348\u672A\u7533\u9149\u620C\u4EA5", cjkSuffix);
            case 16:
              return createCounterStyleFromSymbols(value, "\u7532\u4E59\u4E19\u4E01\u620A\u5DF1\u5E9A\u8F9B\u58EC\u7678", cjkSuffix);
            case 17:
            case 48:
              return createCJKCounter(value, "\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", CHINESE_INFORMAL_MULTIPLIERS, "\u8CA0", cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
            case 47:
              return createCJKCounter(value, "\u96F6\u58F9\u8CB3\u53C3\u8086\u4F0D\u9678\u67D2\u634C\u7396", CHINESE_FORMAL_MULTIPLIERS, "\u8CA0", cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
            case 42:
              return createCJKCounter(value, "\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", CHINESE_INFORMAL_MULTIPLIERS, "\u8D1F", cjkSuffix, CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
            case 41:
              return createCJKCounter(value, "\u96F6\u58F9\u8D30\u53C1\u8086\u4F0D\u9646\u67D2\u634C\u7396", CHINESE_FORMAL_MULTIPLIERS, "\u8D1F", cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS | CJK_HUNDRED_COEFFICIENTS);
            case 26:
              return createCJKCounter(value, "\u3007\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", "\u5341\u767E\u5343\u4E07", JAPANESE_NEGATIVE, cjkSuffix, 0);
            case 25:
              return createCJKCounter(value, "\u96F6\u58F1\u5F10\u53C2\u56DB\u4F0D\u516D\u4E03\u516B\u4E5D", "\u62FE\u767E\u5343\u4E07", JAPANESE_NEGATIVE, cjkSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
            case 31:
              return createCJKCounter(value, "\uC601\uC77C\uC774\uC0BC\uC0AC\uC624\uC721\uCE60\uD314\uAD6C", "\uC2ED\uBC31\uCC9C\uB9CC", KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
            case 33:
              return createCJKCounter(value, "\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", "\u5341\u767E\u5343\u842C", KOREAN_NEGATIVE, koreanSuffix, 0);
            case 32:
              return createCJKCounter(value, "\u96F6\u58F9\u8CB3\u53C3\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", "\u62FE\u767E\u5343", KOREAN_NEGATIVE, koreanSuffix, CJK_ZEROS | CJK_TEN_COEFFICIENTS | CJK_TEN_HIGH_COEFFICIENTS);
            case 18:
              return createCounterStyleFromRange(value, 2406, 2415, true, defaultSuffix);
            case 20:
              return createAdditiveCounter(value, 1, 19999, GEORGIAN, 3, defaultSuffix);
            case 21:
              return createCounterStyleFromRange(value, 2790, 2799, true, defaultSuffix);
            case 22:
              return createCounterStyleFromRange(value, 2662, 2671, true, defaultSuffix);
            case 22:
              return createAdditiveCounter(value, 1, 10999, HEBREW, 3, defaultSuffix);
            case 23:
              return createCounterStyleFromSymbols(value, "\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066\u3068\u306A\u306B\u306C\u306D\u306E\u306F\u3072\u3075\u3078\u307B\u307E\u307F\u3080\u3081\u3082\u3084\u3086\u3088\u3089\u308A\u308B\u308C\u308D\u308F\u3090\u3091\u3092\u3093");
            case 24:
              return createCounterStyleFromSymbols(value, "\u3044\u308D\u306F\u306B\u307B\u3078\u3068\u3061\u308A\u306C\u308B\u3092\u308F\u304B\u3088\u305F\u308C\u305D\u3064\u306D\u306A\u3089\u3080\u3046\u3090\u306E\u304A\u304F\u3084\u307E\u3051\u3075\u3053\u3048\u3066\u3042\u3055\u304D\u3086\u3081\u307F\u3057\u3091\u3072\u3082\u305B\u3059");
            case 27:
              return createCounterStyleFromRange(value, 3302, 3311, true, defaultSuffix);
            case 28:
              return createCounterStyleFromSymbols(value, "\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F0\u30F1\u30F2\u30F3", cjkSuffix);
            case 29:
              return createCounterStyleFromSymbols(value, "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8\u30C1\u30EA\u30CC\u30EB\u30F2\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD\u30C4\u30CD\u30CA\u30E9\u30E0\u30A6\u30F0\u30CE\u30AA\u30AF\u30E4\u30DE\u30B1\u30D5\u30B3\u30A8\u30C6\u30A2\u30B5\u30AD\u30E6\u30E1\u30DF\u30B7\u30F1\u30D2\u30E2\u30BB\u30B9", cjkSuffix);
            case 34:
              return createCounterStyleFromRange(value, 3792, 3801, true, defaultSuffix);
            case 37:
              return createCounterStyleFromRange(value, 6160, 6169, true, defaultSuffix);
            case 38:
              return createCounterStyleFromRange(value, 4160, 4169, true, defaultSuffix);
            case 39:
              return createCounterStyleFromRange(value, 2918, 2927, true, defaultSuffix);
            case 40:
              return createCounterStyleFromRange(value, 1776, 1785, true, defaultSuffix);
            case 43:
              return createCounterStyleFromRange(value, 3046, 3055, true, defaultSuffix);
            case 44:
              return createCounterStyleFromRange(value, 3174, 3183, true, defaultSuffix);
            case 45:
              return createCounterStyleFromRange(value, 3664, 3673, true, defaultSuffix);
            case 46:
              return createCounterStyleFromRange(value, 3872, 3881, true, defaultSuffix);
            case 3:
            default:
              return createCounterStyleFromRange(value, 48, 57, true, defaultSuffix);
          }
        };
        var IGNORE_ATTRIBUTE = "data-html2canvas-ignore";
        var DocumentCloner = (
          /** @class */
          (function() {
            function DocumentCloner2(context, element, options) {
              this.context = context;
              this.options = options;
              this.scrolledElements = [];
              this.referenceElement = element;
              this.counters = new CounterState();
              this.quoteDepth = 0;
              if (!element.ownerDocument) {
                throw new Error("Cloned element does not have an owner document");
              }
              this.documentElement = this.cloneNode(element.ownerDocument.documentElement, false);
            }
            DocumentCloner2.prototype.toIFrame = function(ownerDocument, windowSize) {
              var _this = this;
              var iframe = createIFrameContainer(ownerDocument, windowSize);
              if (!iframe.contentWindow) {
                return Promise.reject("Unable to find iframe window");
              }
              var scrollX = ownerDocument.defaultView.pageXOffset;
              var scrollY = ownerDocument.defaultView.pageYOffset;
              var cloneWindow = iframe.contentWindow;
              var documentClone = cloneWindow.document;
              var iframeLoad = iframeLoader(iframe).then(function() {
                return __awaiter(_this, void 0, void 0, function() {
                  var onclone, referenceElement;
                  return __generator(this, function(_a) {
                    switch (_a.label) {
                      case 0:
                        this.scrolledElements.forEach(restoreNodeScroll);
                        if (cloneWindow) {
                          cloneWindow.scrollTo(windowSize.left, windowSize.top);
                          if (/(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (cloneWindow.scrollY !== windowSize.top || cloneWindow.scrollX !== windowSize.left)) {
                            this.context.logger.warn("Unable to restore scroll position for cloned document");
                            this.context.windowBounds = this.context.windowBounds.add(cloneWindow.scrollX - windowSize.left, cloneWindow.scrollY - windowSize.top, 0, 0);
                          }
                        }
                        onclone = this.options.onclone;
                        referenceElement = this.clonedReferenceElement;
                        if (typeof referenceElement === "undefined") {
                          return [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")];
                        }
                        if (!(documentClone.fonts && documentClone.fonts.ready)) return [3, 2];
                        return [4, documentClone.fonts.ready];
                      case 1:
                        _a.sent();
                        _a.label = 2;
                      case 2:
                        if (!/(AppleWebKit)/g.test(navigator.userAgent)) return [3, 4];
                        return [4, imagesReady(documentClone)];
                      case 3:
                        _a.sent();
                        _a.label = 4;
                      case 4:
                        if (typeof onclone === "function") {
                          return [2, Promise.resolve().then(function() {
                            return onclone(documentClone, referenceElement);
                          }).then(function() {
                            return iframe;
                          })];
                        }
                        return [2, iframe];
                    }
                  });
                });
              });
              documentClone.open();
              documentClone.write(serializeDoctype(document.doctype) + "<html></html>");
              restoreOwnerScroll(this.referenceElement.ownerDocument, scrollX, scrollY);
              documentClone.replaceChild(documentClone.adoptNode(this.documentElement), documentClone.documentElement);
              documentClone.close();
              return iframeLoad;
            };
            DocumentCloner2.prototype.createElementClone = function(node) {
              if (isDebugging(
                node,
                2
                /* CLONE */
              )) {
                debugger;
              }
              if (isCanvasElement(node)) {
                return this.createCanvasClone(node);
              }
              if (isVideoElement(node)) {
                return this.createVideoClone(node);
              }
              if (isStyleElement(node)) {
                return this.createStyleClone(node);
              }
              var clone = node.cloneNode(false);
              if (isImageElement(clone)) {
                if (isImageElement(node) && node.currentSrc && node.currentSrc !== node.src) {
                  clone.src = node.currentSrc;
                  clone.srcset = "";
                }
                if (clone.loading === "lazy") {
                  clone.loading = "eager";
                }
              }
              if (isCustomElement(clone)) {
                return this.createCustomElementClone(clone);
              }
              return clone;
            };
            DocumentCloner2.prototype.createCustomElementClone = function(node) {
              var clone = document.createElement("html2canvascustomelement");
              copyCSSStyles(node.style, clone);
              return clone;
            };
            DocumentCloner2.prototype.createStyleClone = function(node) {
              try {
                var sheet = node.sheet;
                if (sheet && sheet.cssRules) {
                  var css = [].slice.call(sheet.cssRules, 0).reduce(function(css2, rule) {
                    if (rule && typeof rule.cssText === "string") {
                      return css2 + rule.cssText;
                    }
                    return css2;
                  }, "");
                  var style = node.cloneNode(false);
                  style.textContent = css;
                  return style;
                }
              } catch (e2) {
                this.context.logger.error("Unable to access cssRules property", e2);
                if (e2.name !== "SecurityError") {
                  throw e2;
                }
              }
              return node.cloneNode(false);
            };
            DocumentCloner2.prototype.createCanvasClone = function(canvas) {
              var _a;
              if (this.options.inlineImages && canvas.ownerDocument) {
                var img = canvas.ownerDocument.createElement("img");
                try {
                  img.src = canvas.toDataURL();
                  return img;
                } catch (e2) {
                  this.context.logger.info("Unable to inline canvas contents, canvas is tainted", canvas);
                }
              }
              var clonedCanvas = canvas.cloneNode(false);
              try {
                clonedCanvas.width = canvas.width;
                clonedCanvas.height = canvas.height;
                var ctx = canvas.getContext("2d");
                var clonedCtx = clonedCanvas.getContext("2d");
                if (clonedCtx) {
                  if (!this.options.allowTaint && ctx) {
                    clonedCtx.putImageData(ctx.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
                  } else {
                    var gl = (_a = canvas.getContext("webgl2")) !== null && _a !== void 0 ? _a : canvas.getContext("webgl");
                    if (gl) {
                      var attribs = gl.getContextAttributes();
                      if ((attribs === null || attribs === void 0 ? void 0 : attribs.preserveDrawingBuffer) === false) {
                        this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false", canvas);
                      }
                    }
                    clonedCtx.drawImage(canvas, 0, 0);
                  }
                }
                return clonedCanvas;
              } catch (e2) {
                this.context.logger.info("Unable to clone canvas as it is tainted", canvas);
              }
              return clonedCanvas;
            };
            DocumentCloner2.prototype.createVideoClone = function(video) {
              var canvas = video.ownerDocument.createElement("canvas");
              canvas.width = video.offsetWidth;
              canvas.height = video.offsetHeight;
              var ctx = canvas.getContext("2d");
              try {
                if (ctx) {
                  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                  if (!this.options.allowTaint) {
                    ctx.getImageData(0, 0, canvas.width, canvas.height);
                  }
                }
                return canvas;
              } catch (e2) {
                this.context.logger.info("Unable to clone video as it is tainted", video);
              }
              var blankCanvas = video.ownerDocument.createElement("canvas");
              blankCanvas.width = video.offsetWidth;
              blankCanvas.height = video.offsetHeight;
              return blankCanvas;
            };
            DocumentCloner2.prototype.appendChildNode = function(clone, child, copyStyles) {
              if (!isElementNode(child) || !isScriptElement(child) && !child.hasAttribute(IGNORE_ATTRIBUTE) && (typeof this.options.ignoreElements !== "function" || !this.options.ignoreElements(child))) {
                if (!this.options.copyStyles || !isElementNode(child) || !isStyleElement(child)) {
                  clone.appendChild(this.cloneNode(child, copyStyles));
                }
              }
            };
            DocumentCloner2.prototype.cloneChildNodes = function(node, clone, copyStyles) {
              var _this = this;
              for (var child = node.shadowRoot ? node.shadowRoot.firstChild : node.firstChild; child; child = child.nextSibling) {
                if (isElementNode(child) && isSlotElement(child) && typeof child.assignedNodes === "function") {
                  var assignedNodes = child.assignedNodes();
                  if (assignedNodes.length) {
                    assignedNodes.forEach(function(assignedNode) {
                      return _this.appendChildNode(clone, assignedNode, copyStyles);
                    });
                  }
                } else {
                  this.appendChildNode(clone, child, copyStyles);
                }
              }
            };
            DocumentCloner2.prototype.cloneNode = function(node, copyStyles) {
              if (isTextNode(node)) {
                return document.createTextNode(node.data);
              }
              if (!node.ownerDocument) {
                return node.cloneNode(false);
              }
              var window2 = node.ownerDocument.defaultView;
              if (window2 && isElementNode(node) && (isHTMLElementNode(node) || isSVGElementNode(node))) {
                var clone = this.createElementClone(node);
                clone.style.transitionProperty = "none";
                var style = window2.getComputedStyle(node);
                var styleBefore = window2.getComputedStyle(node, ":before");
                var styleAfter = window2.getComputedStyle(node, ":after");
                if (this.referenceElement === node && isHTMLElementNode(clone)) {
                  this.clonedReferenceElement = clone;
                }
                if (isBodyElement(clone)) {
                  createPseudoHideStyles(clone);
                }
                var counters = this.counters.parse(new CSSParsedCounterDeclaration(this.context, style));
                var before = this.resolvePseudoContent(node, clone, styleBefore, PseudoElementType.BEFORE);
                if (isCustomElement(node)) {
                  copyStyles = true;
                }
                if (!isVideoElement(node)) {
                  this.cloneChildNodes(node, clone, copyStyles);
                }
                if (before) {
                  clone.insertBefore(before, clone.firstChild);
                }
                var after = this.resolvePseudoContent(node, clone, styleAfter, PseudoElementType.AFTER);
                if (after) {
                  clone.appendChild(after);
                }
                this.counters.pop(counters);
                if (style && (this.options.copyStyles || isSVGElementNode(node)) && !isIFrameElement(node) || copyStyles) {
                  copyCSSStyles(style, clone);
                }
                if (node.scrollTop !== 0 || node.scrollLeft !== 0) {
                  this.scrolledElements.push([clone, node.scrollLeft, node.scrollTop]);
                }
                if ((isTextareaElement(node) || isSelectElement(node)) && (isTextareaElement(clone) || isSelectElement(clone))) {
                  clone.value = node.value;
                }
                return clone;
              }
              return node.cloneNode(false);
            };
            DocumentCloner2.prototype.resolvePseudoContent = function(node, clone, style, pseudoElt) {
              var _this = this;
              if (!style) {
                return;
              }
              var value = style.content;
              var document2 = clone.ownerDocument;
              if (!document2 || !value || value === "none" || value === "-moz-alt-content" || style.display === "none") {
                return;
              }
              this.counters.parse(new CSSParsedCounterDeclaration(this.context, style));
              var declaration = new CSSParsedPseudoDeclaration(this.context, style);
              var anonymousReplacedElement = document2.createElement("html2canvaspseudoelement");
              copyCSSStyles(style, anonymousReplacedElement);
              declaration.content.forEach(function(token) {
                if (token.type === 0) {
                  anonymousReplacedElement.appendChild(document2.createTextNode(token.value));
                } else if (token.type === 22) {
                  var img = document2.createElement("img");
                  img.src = token.value;
                  img.style.opacity = "1";
                  anonymousReplacedElement.appendChild(img);
                } else if (token.type === 18) {
                  if (token.name === "attr") {
                    var attr = token.values.filter(isIdentToken);
                    if (attr.length) {
                      anonymousReplacedElement.appendChild(document2.createTextNode(node.getAttribute(attr[0].value) || ""));
                    }
                  } else if (token.name === "counter") {
                    var _a = token.values.filter(nonFunctionArgSeparator), counter = _a[0], counterStyle = _a[1];
                    if (counter && isIdentToken(counter)) {
                      var counterState = _this.counters.getCounterValue(counter.value);
                      var counterType = counterStyle && isIdentToken(counterStyle) ? listStyleType.parse(_this.context, counterStyle.value) : 3;
                      anonymousReplacedElement.appendChild(document2.createTextNode(createCounterText(counterState, counterType, false)));
                    }
                  } else if (token.name === "counters") {
                    var _b = token.values.filter(nonFunctionArgSeparator), counter = _b[0], delim = _b[1], counterStyle = _b[2];
                    if (counter && isIdentToken(counter)) {
                      var counterStates = _this.counters.getCounterValues(counter.value);
                      var counterType_1 = counterStyle && isIdentToken(counterStyle) ? listStyleType.parse(_this.context, counterStyle.value) : 3;
                      var separator = delim && delim.type === 0 ? delim.value : "";
                      var text = counterStates.map(function(value2) {
                        return createCounterText(value2, counterType_1, false);
                      }).join(separator);
                      anonymousReplacedElement.appendChild(document2.createTextNode(text));
                    }
                  } else ;
                } else if (token.type === 20) {
                  switch (token.value) {
                    case "open-quote":
                      anonymousReplacedElement.appendChild(document2.createTextNode(getQuote(declaration.quotes, _this.quoteDepth++, true)));
                      break;
                    case "close-quote":
                      anonymousReplacedElement.appendChild(document2.createTextNode(getQuote(declaration.quotes, --_this.quoteDepth, false)));
                      break;
                    default:
                      anonymousReplacedElement.appendChild(document2.createTextNode(token.value));
                  }
                }
              });
              anonymousReplacedElement.className = PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
              var newClassName = pseudoElt === PseudoElementType.BEFORE ? " " + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE : " " + PSEUDO_HIDE_ELEMENT_CLASS_AFTER;
              if (isSVGElementNode(clone)) {
                clone.className.baseValue += newClassName;
              } else {
                clone.className += newClassName;
              }
              return anonymousReplacedElement;
            };
            DocumentCloner2.destroy = function(container) {
              if (container.parentNode) {
                container.parentNode.removeChild(container);
                return true;
              }
              return false;
            };
            return DocumentCloner2;
          })()
        );
        var PseudoElementType;
        (function(PseudoElementType2) {
          PseudoElementType2[PseudoElementType2["BEFORE"] = 0] = "BEFORE";
          PseudoElementType2[PseudoElementType2["AFTER"] = 1] = "AFTER";
        })(PseudoElementType || (PseudoElementType = {}));
        var createIFrameContainer = function(ownerDocument, bounds) {
          var cloneIframeContainer = ownerDocument.createElement("iframe");
          cloneIframeContainer.className = "html2canvas-container";
          cloneIframeContainer.style.visibility = "hidden";
          cloneIframeContainer.style.position = "fixed";
          cloneIframeContainer.style.left = "-10000px";
          cloneIframeContainer.style.top = "0px";
          cloneIframeContainer.style.border = "0";
          cloneIframeContainer.width = bounds.width.toString();
          cloneIframeContainer.height = bounds.height.toString();
          cloneIframeContainer.scrolling = "no";
          cloneIframeContainer.setAttribute(IGNORE_ATTRIBUTE, "true");
          ownerDocument.body.appendChild(cloneIframeContainer);
          return cloneIframeContainer;
        };
        var imageReady = function(img) {
          return new Promise(function(resolve) {
            if (img.complete) {
              resolve();
              return;
            }
            if (!img.src) {
              resolve();
              return;
            }
            img.onload = resolve;
            img.onerror = resolve;
          });
        };
        var imagesReady = function(document2) {
          return Promise.all([].slice.call(document2.images, 0).map(imageReady));
        };
        var iframeLoader = function(iframe) {
          return new Promise(function(resolve, reject) {
            var cloneWindow = iframe.contentWindow;
            if (!cloneWindow) {
              return reject("No window assigned for iframe");
            }
            var documentClone = cloneWindow.document;
            cloneWindow.onload = iframe.onload = function() {
              cloneWindow.onload = iframe.onload = null;
              var interval = setInterval(function() {
                if (documentClone.body.childNodes.length > 0 && documentClone.readyState === "complete") {
                  clearInterval(interval);
                  resolve(iframe);
                }
              }, 50);
            };
          });
        };
        var ignoredStyleProperties = [
          "all",
          "d",
          "content"
          // Safari shows pseudoelements if content is set
        ];
        var copyCSSStyles = function(style, target) {
          for (var i2 = style.length - 1; i2 >= 0; i2--) {
            var property = style.item(i2);
            if (ignoredStyleProperties.indexOf(property) === -1) {
              target.style.setProperty(property, style.getPropertyValue(property));
            }
          }
          return target;
        };
        var serializeDoctype = function(doctype) {
          var str = "";
          if (doctype) {
            str += "<!DOCTYPE ";
            if (doctype.name) {
              str += doctype.name;
            }
            if (doctype.internalSubset) {
              str += doctype.internalSubset;
            }
            if (doctype.publicId) {
              str += '"' + doctype.publicId + '"';
            }
            if (doctype.systemId) {
              str += '"' + doctype.systemId + '"';
            }
            str += ">";
          }
          return str;
        };
        var restoreOwnerScroll = function(ownerDocument, x, y) {
          if (ownerDocument && ownerDocument.defaultView && (x !== ownerDocument.defaultView.pageXOffset || y !== ownerDocument.defaultView.pageYOffset)) {
            ownerDocument.defaultView.scrollTo(x, y);
          }
        };
        var restoreNodeScroll = function(_a) {
          var element = _a[0], x = _a[1], y = _a[2];
          element.scrollLeft = x;
          element.scrollTop = y;
        };
        var PSEUDO_BEFORE = ":before";
        var PSEUDO_AFTER = ":after";
        var PSEUDO_HIDE_ELEMENT_CLASS_BEFORE = "___html2canvas___pseudoelement_before";
        var PSEUDO_HIDE_ELEMENT_CLASS_AFTER = "___html2canvas___pseudoelement_after";
        var PSEUDO_HIDE_ELEMENT_STYLE = '{\n    content: "" !important;\n    display: none !important;\n}';
        var createPseudoHideStyles = function(body) {
          createStyles(body, "." + PSEUDO_HIDE_ELEMENT_CLASS_BEFORE + PSEUDO_BEFORE + PSEUDO_HIDE_ELEMENT_STYLE + "\n         ." + PSEUDO_HIDE_ELEMENT_CLASS_AFTER + PSEUDO_AFTER + PSEUDO_HIDE_ELEMENT_STYLE);
        };
        var createStyles = function(body, styles) {
          var document2 = body.ownerDocument;
          if (document2) {
            var style = document2.createElement("style");
            style.textContent = styles;
            body.appendChild(style);
          }
        };
        var CacheStorage = (
          /** @class */
          (function() {
            function CacheStorage2() {
            }
            CacheStorage2.getOrigin = function(url) {
              var link = CacheStorage2._link;
              if (!link) {
                return "about:blank";
              }
              link.href = url;
              link.href = link.href;
              return link.protocol + link.hostname + link.port;
            };
            CacheStorage2.isSameOrigin = function(src) {
              return CacheStorage2.getOrigin(src) === CacheStorage2._origin;
            };
            CacheStorage2.setContext = function(window2) {
              CacheStorage2._link = window2.document.createElement("a");
              CacheStorage2._origin = CacheStorage2.getOrigin(window2.location.href);
            };
            CacheStorage2._origin = "about:blank";
            return CacheStorage2;
          })()
        );
        var Cache = (
          /** @class */
          (function() {
            function Cache2(context, _options) {
              this.context = context;
              this._options = _options;
              this._cache = {};
            }
            Cache2.prototype.addImage = function(src) {
              var result = Promise.resolve();
              if (this.has(src)) {
                return result;
              }
              if (isBlobImage(src) || isRenderable(src)) {
                (this._cache[src] = this.loadImage(src)).catch(function() {
                });
                return result;
              }
              return result;
            };
            Cache2.prototype.match = function(src) {
              return this._cache[src];
            };
            Cache2.prototype.loadImage = function(key) {
              return __awaiter(this, void 0, void 0, function() {
                var isSameOrigin, useCORS, useProxy, src;
                var _this = this;
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      isSameOrigin = CacheStorage.isSameOrigin(key);
                      useCORS = !isInlineImage(key) && this._options.useCORS === true && FEATURES.SUPPORT_CORS_IMAGES && !isSameOrigin;
                      useProxy = !isInlineImage(key) && !isSameOrigin && !isBlobImage(key) && typeof this._options.proxy === "string" && FEATURES.SUPPORT_CORS_XHR && !useCORS;
                      if (!isSameOrigin && this._options.allowTaint === false && !isInlineImage(key) && !isBlobImage(key) && !useProxy && !useCORS) {
                        return [
                          2
                          /*return*/
                        ];
                      }
                      src = key;
                      if (!useProxy) return [3, 2];
                      return [4, this.proxy(src)];
                    case 1:
                      src = _a.sent();
                      _a.label = 2;
                    case 2:
                      this.context.logger.debug("Added image " + key.substring(0, 256));
                      return [4, new Promise(function(resolve, reject) {
                        var img = new Image();
                        img.onload = function() {
                          return resolve(img);
                        };
                        img.onerror = reject;
                        if (isInlineBase64Image(src) || useCORS) {
                          img.crossOrigin = "anonymous";
                        }
                        img.src = src;
                        if (img.complete === true) {
                          setTimeout(function() {
                            return resolve(img);
                          }, 500);
                        }
                        if (_this._options.imageTimeout > 0) {
                          setTimeout(function() {
                            return reject("Timed out (" + _this._options.imageTimeout + "ms) loading image");
                          }, _this._options.imageTimeout);
                        }
                      })];
                    case 3:
                      return [2, _a.sent()];
                  }
                });
              });
            };
            Cache2.prototype.has = function(key) {
              return typeof this._cache[key] !== "undefined";
            };
            Cache2.prototype.keys = function() {
              return Promise.resolve(Object.keys(this._cache));
            };
            Cache2.prototype.proxy = function(src) {
              var _this = this;
              var proxy = this._options.proxy;
              if (!proxy) {
                throw new Error("No proxy defined");
              }
              var key = src.substring(0, 256);
              return new Promise(function(resolve, reject) {
                var responseType = FEATURES.SUPPORT_RESPONSE_TYPE ? "blob" : "text";
                var xhr = new XMLHttpRequest();
                xhr.onload = function() {
                  if (xhr.status === 200) {
                    if (responseType === "text") {
                      resolve(xhr.response);
                    } else {
                      var reader_1 = new FileReader();
                      reader_1.addEventListener("load", function() {
                        return resolve(reader_1.result);
                      }, false);
                      reader_1.addEventListener("error", function(e2) {
                        return reject(e2);
                      }, false);
                      reader_1.readAsDataURL(xhr.response);
                    }
                  } else {
                    reject("Failed to proxy resource " + key + " with status code " + xhr.status);
                  }
                };
                xhr.onerror = reject;
                var queryString = proxy.indexOf("?") > -1 ? "&" : "?";
                xhr.open("GET", "" + proxy + queryString + "url=" + encodeURIComponent(src) + "&responseType=" + responseType);
                if (responseType !== "text" && xhr instanceof XMLHttpRequest) {
                  xhr.responseType = responseType;
                }
                if (_this._options.imageTimeout) {
                  var timeout_1 = _this._options.imageTimeout;
                  xhr.timeout = timeout_1;
                  xhr.ontimeout = function() {
                    return reject("Timed out (" + timeout_1 + "ms) proxying " + key);
                  };
                }
                xhr.send();
              });
            };
            return Cache2;
          })()
        );
        var INLINE_SVG = /^data:image\/svg\+xml/i;
        var INLINE_BASE64 = /^data:image\/.*;base64,/i;
        var INLINE_IMG = /^data:image\/.*/i;
        var isRenderable = function(src) {
          return FEATURES.SUPPORT_SVG_DRAWING || !isSVG(src);
        };
        var isInlineImage = function(src) {
          return INLINE_IMG.test(src);
        };
        var isInlineBase64Image = function(src) {
          return INLINE_BASE64.test(src);
        };
        var isBlobImage = function(src) {
          return src.substr(0, 4) === "blob";
        };
        var isSVG = function(src) {
          return src.substr(-3).toLowerCase() === "svg" || INLINE_SVG.test(src);
        };
        var Vector = (
          /** @class */
          (function() {
            function Vector2(x, y) {
              this.type = 0;
              this.x = x;
              this.y = y;
            }
            Vector2.prototype.add = function(deltaX, deltaY) {
              return new Vector2(this.x + deltaX, this.y + deltaY);
            };
            return Vector2;
          })()
        );
        var lerp = function(a2, b, t) {
          return new Vector(a2.x + (b.x - a2.x) * t, a2.y + (b.y - a2.y) * t);
        };
        var BezierCurve = (
          /** @class */
          (function() {
            function BezierCurve2(start, startControl, endControl, end) {
              this.type = 1;
              this.start = start;
              this.startControl = startControl;
              this.endControl = endControl;
              this.end = end;
            }
            BezierCurve2.prototype.subdivide = function(t, firstHalf) {
              var ab = lerp(this.start, this.startControl, t);
              var bc = lerp(this.startControl, this.endControl, t);
              var cd = lerp(this.endControl, this.end, t);
              var abbc = lerp(ab, bc, t);
              var bccd = lerp(bc, cd, t);
              var dest = lerp(abbc, bccd, t);
              return firstHalf ? new BezierCurve2(this.start, ab, abbc, dest) : new BezierCurve2(dest, bccd, cd, this.end);
            };
            BezierCurve2.prototype.add = function(deltaX, deltaY) {
              return new BezierCurve2(this.start.add(deltaX, deltaY), this.startControl.add(deltaX, deltaY), this.endControl.add(deltaX, deltaY), this.end.add(deltaX, deltaY));
            };
            BezierCurve2.prototype.reverse = function() {
              return new BezierCurve2(this.end, this.endControl, this.startControl, this.start);
            };
            return BezierCurve2;
          })()
        );
        var isBezierCurve = function(path) {
          return path.type === 1;
        };
        var BoundCurves = (
          /** @class */
          /* @__PURE__ */ (function() {
            function BoundCurves2(element) {
              var styles = element.styles;
              var bounds = element.bounds;
              var _a = getAbsoluteValueForTuple(styles.borderTopLeftRadius, bounds.width, bounds.height), tlh = _a[0], tlv = _a[1];
              var _b = getAbsoluteValueForTuple(styles.borderTopRightRadius, bounds.width, bounds.height), trh = _b[0], trv = _b[1];
              var _c = getAbsoluteValueForTuple(styles.borderBottomRightRadius, bounds.width, bounds.height), brh = _c[0], brv = _c[1];
              var _d = getAbsoluteValueForTuple(styles.borderBottomLeftRadius, bounds.width, bounds.height), blh = _d[0], blv = _d[1];
              var factors = [];
              factors.push((tlh + trh) / bounds.width);
              factors.push((blh + brh) / bounds.width);
              factors.push((tlv + blv) / bounds.height);
              factors.push((trv + brv) / bounds.height);
              var maxFactor = Math.max.apply(Math, factors);
              if (maxFactor > 1) {
                tlh /= maxFactor;
                tlv /= maxFactor;
                trh /= maxFactor;
                trv /= maxFactor;
                brh /= maxFactor;
                brv /= maxFactor;
                blh /= maxFactor;
                blv /= maxFactor;
              }
              var topWidth = bounds.width - trh;
              var rightHeight = bounds.height - brv;
              var bottomWidth = bounds.width - brh;
              var leftHeight = bounds.height - blv;
              var borderTopWidth2 = styles.borderTopWidth;
              var borderRightWidth2 = styles.borderRightWidth;
              var borderBottomWidth2 = styles.borderBottomWidth;
              var borderLeftWidth2 = styles.borderLeftWidth;
              var paddingTop2 = getAbsoluteValue(styles.paddingTop, element.bounds.width);
              var paddingRight2 = getAbsoluteValue(styles.paddingRight, element.bounds.width);
              var paddingBottom2 = getAbsoluteValue(styles.paddingBottom, element.bounds.width);
              var paddingLeft2 = getAbsoluteValue(styles.paddingLeft, element.bounds.width);
              this.topLeftBorderDoubleOuterBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 / 3, bounds.top + borderTopWidth2 / 3, tlh - borderLeftWidth2 / 3, tlv - borderTopWidth2 / 3, CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 / 3, bounds.top + borderTopWidth2 / 3);
              this.topRightBorderDoubleOuterBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth2 / 3, trh - borderRightWidth2 / 3, trv - borderTopWidth2 / 3, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 / 3, bounds.top + borderTopWidth2 / 3);
              this.bottomRightBorderDoubleOuterBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth2 / 3, brv - borderBottomWidth2 / 3, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 / 3, bounds.top + bounds.height - borderBottomWidth2 / 3);
              this.bottomLeftBorderDoubleOuterBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 / 3, bounds.top + leftHeight, blh - borderLeftWidth2 / 3, blv - borderBottomWidth2 / 3, CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 / 3, bounds.top + bounds.height - borderBottomWidth2 / 3);
              this.topLeftBorderDoubleInnerBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 * 2 / 3, bounds.top + borderTopWidth2 * 2 / 3, tlh - borderLeftWidth2 * 2 / 3, tlv - borderTopWidth2 * 2 / 3, CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 * 2 / 3, bounds.top + borderTopWidth2 * 2 / 3);
              this.topRightBorderDoubleInnerBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth2 * 2 / 3, trh - borderRightWidth2 * 2 / 3, trv - borderTopWidth2 * 2 / 3, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 * 2 / 3, bounds.top + borderTopWidth2 * 2 / 3);
              this.bottomRightBorderDoubleInnerBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth2 * 2 / 3, brv - borderBottomWidth2 * 2 / 3, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 * 2 / 3, bounds.top + bounds.height - borderBottomWidth2 * 2 / 3);
              this.bottomLeftBorderDoubleInnerBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 * 2 / 3, bounds.top + leftHeight, blh - borderLeftWidth2 * 2 / 3, blv - borderBottomWidth2 * 2 / 3, CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 * 2 / 3, bounds.top + bounds.height - borderBottomWidth2 * 2 / 3);
              this.topLeftBorderStroke = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 / 2, bounds.top + borderTopWidth2 / 2, tlh - borderLeftWidth2 / 2, tlv - borderTopWidth2 / 2, CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 / 2, bounds.top + borderTopWidth2 / 2);
              this.topRightBorderStroke = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top + borderTopWidth2 / 2, trh - borderRightWidth2 / 2, trv - borderTopWidth2 / 2, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 / 2, bounds.top + borderTopWidth2 / 2);
              this.bottomRightBorderStroke = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh - borderRightWidth2 / 2, brv - borderBottomWidth2 / 2, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2 / 2, bounds.top + bounds.height - borderBottomWidth2 / 2);
              this.bottomLeftBorderStroke = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 / 2, bounds.top + leftHeight, blh - borderLeftWidth2 / 2, blv - borderBottomWidth2 / 2, CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 / 2, bounds.top + bounds.height - borderBottomWidth2 / 2);
              this.topLeftBorderBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left, bounds.top, tlh, tlv, CORNER.TOP_LEFT) : new Vector(bounds.left, bounds.top);
              this.topRightBorderBox = trh > 0 || trv > 0 ? getCurvePoints(bounds.left + topWidth, bounds.top, trh, trv, CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width, bounds.top);
              this.bottomRightBorderBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + bottomWidth, bounds.top + rightHeight, brh, brv, CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width, bounds.top + bounds.height);
              this.bottomLeftBorderBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left, bounds.top + leftHeight, blh, blv, CORNER.BOTTOM_LEFT) : new Vector(bounds.left, bounds.top + bounds.height);
              this.topLeftPaddingBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2, bounds.top + borderTopWidth2, Math.max(0, tlh - borderLeftWidth2), Math.max(0, tlv - borderTopWidth2), CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2, bounds.top + borderTopWidth2);
              this.topRightPaddingBox = trh > 0 || trv > 0 ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width - borderRightWidth2), bounds.top + borderTopWidth2, topWidth > bounds.width + borderRightWidth2 ? 0 : Math.max(0, trh - borderRightWidth2), Math.max(0, trv - borderTopWidth2), CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2, bounds.top + borderTopWidth2);
              this.bottomRightPaddingBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - borderLeftWidth2), bounds.top + Math.min(rightHeight, bounds.height - borderBottomWidth2), Math.max(0, brh - borderRightWidth2), Math.max(0, brv - borderBottomWidth2), CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - borderRightWidth2, bounds.top + bounds.height - borderBottomWidth2);
              this.bottomLeftPaddingBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2, bounds.top + Math.min(leftHeight, bounds.height - borderBottomWidth2), Math.max(0, blh - borderLeftWidth2), Math.max(0, blv - borderBottomWidth2), CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2, bounds.top + bounds.height - borderBottomWidth2);
              this.topLeftContentBox = tlh > 0 || tlv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + borderTopWidth2 + paddingTop2, Math.max(0, tlh - (borderLeftWidth2 + paddingLeft2)), Math.max(0, tlv - (borderTopWidth2 + paddingTop2)), CORNER.TOP_LEFT) : new Vector(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + borderTopWidth2 + paddingTop2);
              this.topRightContentBox = trh > 0 || trv > 0 ? getCurvePoints(bounds.left + Math.min(topWidth, bounds.width + borderLeftWidth2 + paddingLeft2), bounds.top + borderTopWidth2 + paddingTop2, topWidth > bounds.width + borderLeftWidth2 + paddingLeft2 ? 0 : trh - borderLeftWidth2 + paddingLeft2, trv - (borderTopWidth2 + paddingTop2), CORNER.TOP_RIGHT) : new Vector(bounds.left + bounds.width - (borderRightWidth2 + paddingRight2), bounds.top + borderTopWidth2 + paddingTop2);
              this.bottomRightContentBox = brh > 0 || brv > 0 ? getCurvePoints(bounds.left + Math.min(bottomWidth, bounds.width - (borderLeftWidth2 + paddingLeft2)), bounds.top + Math.min(rightHeight, bounds.height + borderTopWidth2 + paddingTop2), Math.max(0, brh - (borderRightWidth2 + paddingRight2)), brv - (borderBottomWidth2 + paddingBottom2), CORNER.BOTTOM_RIGHT) : new Vector(bounds.left + bounds.width - (borderRightWidth2 + paddingRight2), bounds.top + bounds.height - (borderBottomWidth2 + paddingBottom2));
              this.bottomLeftContentBox = blh > 0 || blv > 0 ? getCurvePoints(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + leftHeight, Math.max(0, blh - (borderLeftWidth2 + paddingLeft2)), blv - (borderBottomWidth2 + paddingBottom2), CORNER.BOTTOM_LEFT) : new Vector(bounds.left + borderLeftWidth2 + paddingLeft2, bounds.top + bounds.height - (borderBottomWidth2 + paddingBottom2));
            }
            return BoundCurves2;
          })()
        );
        var CORNER;
        (function(CORNER2) {
          CORNER2[CORNER2["TOP_LEFT"] = 0] = "TOP_LEFT";
          CORNER2[CORNER2["TOP_RIGHT"] = 1] = "TOP_RIGHT";
          CORNER2[CORNER2["BOTTOM_RIGHT"] = 2] = "BOTTOM_RIGHT";
          CORNER2[CORNER2["BOTTOM_LEFT"] = 3] = "BOTTOM_LEFT";
        })(CORNER || (CORNER = {}));
        var getCurvePoints = function(x, y, r1, r2, position2) {
          var kappa = 4 * ((Math.sqrt(2) - 1) / 3);
          var ox = r1 * kappa;
          var oy = r2 * kappa;
          var xm = x + r1;
          var ym = y + r2;
          switch (position2) {
            case CORNER.TOP_LEFT:
              return new BezierCurve(new Vector(x, ym), new Vector(x, ym - oy), new Vector(xm - ox, y), new Vector(xm, y));
            case CORNER.TOP_RIGHT:
              return new BezierCurve(new Vector(x, y), new Vector(x + ox, y), new Vector(xm, ym - oy), new Vector(xm, ym));
            case CORNER.BOTTOM_RIGHT:
              return new BezierCurve(new Vector(xm, y), new Vector(xm, y + oy), new Vector(x + ox, ym), new Vector(x, ym));
            case CORNER.BOTTOM_LEFT:
            default:
              return new BezierCurve(new Vector(xm, ym), new Vector(xm - ox, ym), new Vector(x, y + oy), new Vector(x, y));
          }
        };
        var calculateBorderBoxPath = function(curves) {
          return [curves.topLeftBorderBox, curves.topRightBorderBox, curves.bottomRightBorderBox, curves.bottomLeftBorderBox];
        };
        var calculateContentBoxPath = function(curves) {
          return [
            curves.topLeftContentBox,
            curves.topRightContentBox,
            curves.bottomRightContentBox,
            curves.bottomLeftContentBox
          ];
        };
        var calculatePaddingBoxPath = function(curves) {
          return [
            curves.topLeftPaddingBox,
            curves.topRightPaddingBox,
            curves.bottomRightPaddingBox,
            curves.bottomLeftPaddingBox
          ];
        };
        var TransformEffect = (
          /** @class */
          /* @__PURE__ */ (function() {
            function TransformEffect2(offsetX, offsetY, matrix2) {
              this.offsetX = offsetX;
              this.offsetY = offsetY;
              this.matrix = matrix2;
              this.type = 0;
              this.target = 2 | 4;
            }
            return TransformEffect2;
          })()
        );
        var ClipEffect = (
          /** @class */
          /* @__PURE__ */ (function() {
            function ClipEffect2(path, target) {
              this.path = path;
              this.target = target;
              this.type = 1;
            }
            return ClipEffect2;
          })()
        );
        var OpacityEffect = (
          /** @class */
          /* @__PURE__ */ (function() {
            function OpacityEffect2(opacity2) {
              this.opacity = opacity2;
              this.type = 2;
              this.target = 2 | 4;
            }
            return OpacityEffect2;
          })()
        );
        var isTransformEffect = function(effect) {
          return effect.type === 0;
        };
        var isClipEffect = function(effect) {
          return effect.type === 1;
        };
        var isOpacityEffect = function(effect) {
          return effect.type === 2;
        };
        var equalPath = function(a2, b) {
          if (a2.length === b.length) {
            return a2.some(function(v, i2) {
              return v === b[i2];
            });
          }
          return false;
        };
        var transformPath = function(path, deltaX, deltaY, deltaW, deltaH) {
          return path.map(function(point, index) {
            switch (index) {
              case 0:
                return point.add(deltaX, deltaY);
              case 1:
                return point.add(deltaX + deltaW, deltaY);
              case 2:
                return point.add(deltaX + deltaW, deltaY + deltaH);
              case 3:
                return point.add(deltaX, deltaY + deltaH);
            }
            return point;
          });
        };
        var StackingContext = (
          /** @class */
          /* @__PURE__ */ (function() {
            function StackingContext2(container) {
              this.element = container;
              this.inlineLevel = [];
              this.nonInlineLevel = [];
              this.negativeZIndex = [];
              this.zeroOrAutoZIndexOrTransformedOrOpacity = [];
              this.positiveZIndex = [];
              this.nonPositionedFloats = [];
              this.nonPositionedInlineLevel = [];
            }
            return StackingContext2;
          })()
        );
        var ElementPaint = (
          /** @class */
          (function() {
            function ElementPaint2(container, parent) {
              this.container = container;
              this.parent = parent;
              this.effects = [];
              this.curves = new BoundCurves(this.container);
              if (this.container.styles.opacity < 1) {
                this.effects.push(new OpacityEffect(this.container.styles.opacity));
              }
              if (this.container.styles.transform !== null) {
                var offsetX = this.container.bounds.left + this.container.styles.transformOrigin[0].number;
                var offsetY = this.container.bounds.top + this.container.styles.transformOrigin[1].number;
                var matrix2 = this.container.styles.transform;
                this.effects.push(new TransformEffect(offsetX, offsetY, matrix2));
              }
              if (this.container.styles.overflowX !== 0) {
                var borderBox = calculateBorderBoxPath(this.curves);
                var paddingBox2 = calculatePaddingBoxPath(this.curves);
                if (equalPath(borderBox, paddingBox2)) {
                  this.effects.push(new ClipEffect(
                    borderBox,
                    2 | 4
                    /* CONTENT */
                  ));
                } else {
                  this.effects.push(new ClipEffect(
                    borderBox,
                    2
                    /* BACKGROUND_BORDERS */
                  ));
                  this.effects.push(new ClipEffect(
                    paddingBox2,
                    4
                    /* CONTENT */
                  ));
                }
              }
            }
            ElementPaint2.prototype.getEffects = function(target) {
              var inFlow = [
                2,
                3
                /* FIXED */
              ].indexOf(this.container.styles.position) === -1;
              var parent = this.parent;
              var effects = this.effects.slice(0);
              while (parent) {
                var croplessEffects = parent.effects.filter(function(effect) {
                  return !isClipEffect(effect);
                });
                if (inFlow || parent.container.styles.position !== 0 || !parent.parent) {
                  effects.unshift.apply(effects, croplessEffects);
                  inFlow = [
                    2,
                    3
                    /* FIXED */
                  ].indexOf(parent.container.styles.position) === -1;
                  if (parent.container.styles.overflowX !== 0) {
                    var borderBox = calculateBorderBoxPath(parent.curves);
                    var paddingBox2 = calculatePaddingBoxPath(parent.curves);
                    if (!equalPath(borderBox, paddingBox2)) {
                      effects.unshift(new ClipEffect(
                        paddingBox2,
                        2 | 4
                        /* CONTENT */
                      ));
                    }
                  }
                } else {
                  effects.unshift.apply(effects, croplessEffects);
                }
                parent = parent.parent;
              }
              return effects.filter(function(effect) {
                return contains(effect.target, target);
              });
            };
            return ElementPaint2;
          })()
        );
        var parseStackTree = function(parent, stackingContext, realStackingContext, listItems) {
          parent.container.elements.forEach(function(child) {
            var treatAsRealStackingContext = contains(
              child.flags,
              4
              /* CREATES_REAL_STACKING_CONTEXT */
            );
            var createsStackingContext2 = contains(
              child.flags,
              2
              /* CREATES_STACKING_CONTEXT */
            );
            var paintContainer = new ElementPaint(child, parent);
            if (contains(
              child.styles.display,
              2048
              /* LIST_ITEM */
            )) {
              listItems.push(paintContainer);
            }
            var listOwnerItems = contains(
              child.flags,
              8
              /* IS_LIST_OWNER */
            ) ? [] : listItems;
            if (treatAsRealStackingContext || createsStackingContext2) {
              var parentStack = treatAsRealStackingContext || child.styles.isPositioned() ? realStackingContext : stackingContext;
              var stack = new StackingContext(paintContainer);
              if (child.styles.isPositioned() || child.styles.opacity < 1 || child.styles.isTransformed()) {
                var order_1 = child.styles.zIndex.order;
                if (order_1 < 0) {
                  var index_1 = 0;
                  parentStack.negativeZIndex.some(function(current, i2) {
                    if (order_1 > current.element.container.styles.zIndex.order) {
                      index_1 = i2;
                      return false;
                    } else if (index_1 > 0) {
                      return true;
                    }
                    return false;
                  });
                  parentStack.negativeZIndex.splice(index_1, 0, stack);
                } else if (order_1 > 0) {
                  var index_2 = 0;
                  parentStack.positiveZIndex.some(function(current, i2) {
                    if (order_1 >= current.element.container.styles.zIndex.order) {
                      index_2 = i2 + 1;
                      return false;
                    } else if (index_2 > 0) {
                      return true;
                    }
                    return false;
                  });
                  parentStack.positiveZIndex.splice(index_2, 0, stack);
                } else {
                  parentStack.zeroOrAutoZIndexOrTransformedOrOpacity.push(stack);
                }
              } else {
                if (child.styles.isFloating()) {
                  parentStack.nonPositionedFloats.push(stack);
                } else {
                  parentStack.nonPositionedInlineLevel.push(stack);
                }
              }
              parseStackTree(paintContainer, stack, treatAsRealStackingContext ? stack : realStackingContext, listOwnerItems);
            } else {
              if (child.styles.isInlineLevel()) {
                stackingContext.inlineLevel.push(paintContainer);
              } else {
                stackingContext.nonInlineLevel.push(paintContainer);
              }
              parseStackTree(paintContainer, stackingContext, realStackingContext, listOwnerItems);
            }
            if (contains(
              child.flags,
              8
              /* IS_LIST_OWNER */
            )) {
              processListItems(child, listOwnerItems);
            }
          });
        };
        var processListItems = function(owner, elements) {
          var numbering = owner instanceof OLElementContainer ? owner.start : 1;
          var reversed = owner instanceof OLElementContainer ? owner.reversed : false;
          for (var i2 = 0; i2 < elements.length; i2++) {
            var item = elements[i2];
            if (item.container instanceof LIElementContainer && typeof item.container.value === "number" && item.container.value !== 0) {
              numbering = item.container.value;
            }
            item.listValue = createCounterText(numbering, item.container.styles.listStyleType, true);
            numbering += reversed ? -1 : 1;
          }
        };
        var parseStackingContexts = function(container) {
          var paintContainer = new ElementPaint(container, null);
          var root = new StackingContext(paintContainer);
          var listItems = [];
          parseStackTree(paintContainer, root, root, listItems);
          processListItems(paintContainer.container, listItems);
          return root;
        };
        var parsePathForBorder = function(curves, borderSide) {
          switch (borderSide) {
            case 0:
              return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftPaddingBox, curves.topRightBorderBox, curves.topRightPaddingBox);
            case 1:
              return createPathFromCurves(curves.topRightBorderBox, curves.topRightPaddingBox, curves.bottomRightBorderBox, curves.bottomRightPaddingBox);
            case 2:
              return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox);
            case 3:
            default:
              return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftPaddingBox, curves.topLeftBorderBox, curves.topLeftPaddingBox);
          }
        };
        var parsePathForBorderDoubleOuter = function(curves, borderSide) {
          switch (borderSide) {
            case 0:
              return createPathFromCurves(curves.topLeftBorderBox, curves.topLeftBorderDoubleOuterBox, curves.topRightBorderBox, curves.topRightBorderDoubleOuterBox);
            case 1:
              return createPathFromCurves(curves.topRightBorderBox, curves.topRightBorderDoubleOuterBox, curves.bottomRightBorderBox, curves.bottomRightBorderDoubleOuterBox);
            case 2:
              return createPathFromCurves(curves.bottomRightBorderBox, curves.bottomRightBorderDoubleOuterBox, curves.bottomLeftBorderBox, curves.bottomLeftBorderDoubleOuterBox);
            case 3:
            default:
              return createPathFromCurves(curves.bottomLeftBorderBox, curves.bottomLeftBorderDoubleOuterBox, curves.topLeftBorderBox, curves.topLeftBorderDoubleOuterBox);
          }
        };
        var parsePathForBorderDoubleInner = function(curves, borderSide) {
          switch (borderSide) {
            case 0:
              return createPathFromCurves(curves.topLeftBorderDoubleInnerBox, curves.topLeftPaddingBox, curves.topRightBorderDoubleInnerBox, curves.topRightPaddingBox);
            case 1:
              return createPathFromCurves(curves.topRightBorderDoubleInnerBox, curves.topRightPaddingBox, curves.bottomRightBorderDoubleInnerBox, curves.bottomRightPaddingBox);
            case 2:
              return createPathFromCurves(curves.bottomRightBorderDoubleInnerBox, curves.bottomRightPaddingBox, curves.bottomLeftBorderDoubleInnerBox, curves.bottomLeftPaddingBox);
            case 3:
            default:
              return createPathFromCurves(curves.bottomLeftBorderDoubleInnerBox, curves.bottomLeftPaddingBox, curves.topLeftBorderDoubleInnerBox, curves.topLeftPaddingBox);
          }
        };
        var parsePathForBorderStroke = function(curves, borderSide) {
          switch (borderSide) {
            case 0:
              return createStrokePathFromCurves(curves.topLeftBorderStroke, curves.topRightBorderStroke);
            case 1:
              return createStrokePathFromCurves(curves.topRightBorderStroke, curves.bottomRightBorderStroke);
            case 2:
              return createStrokePathFromCurves(curves.bottomRightBorderStroke, curves.bottomLeftBorderStroke);
            case 3:
            default:
              return createStrokePathFromCurves(curves.bottomLeftBorderStroke, curves.topLeftBorderStroke);
          }
        };
        var createStrokePathFromCurves = function(outer1, outer2) {
          var path = [];
          if (isBezierCurve(outer1)) {
            path.push(outer1.subdivide(0.5, false));
          } else {
            path.push(outer1);
          }
          if (isBezierCurve(outer2)) {
            path.push(outer2.subdivide(0.5, true));
          } else {
            path.push(outer2);
          }
          return path;
        };
        var createPathFromCurves = function(outer1, inner1, outer2, inner2) {
          var path = [];
          if (isBezierCurve(outer1)) {
            path.push(outer1.subdivide(0.5, false));
          } else {
            path.push(outer1);
          }
          if (isBezierCurve(outer2)) {
            path.push(outer2.subdivide(0.5, true));
          } else {
            path.push(outer2);
          }
          if (isBezierCurve(inner2)) {
            path.push(inner2.subdivide(0.5, true).reverse());
          } else {
            path.push(inner2);
          }
          if (isBezierCurve(inner1)) {
            path.push(inner1.subdivide(0.5, false).reverse());
          } else {
            path.push(inner1);
          }
          return path;
        };
        var paddingBox = function(element) {
          var bounds = element.bounds;
          var styles = element.styles;
          return bounds.add(styles.borderLeftWidth, styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth), -(styles.borderTopWidth + styles.borderBottomWidth));
        };
        var contentBox = function(element) {
          var styles = element.styles;
          var bounds = element.bounds;
          var paddingLeft2 = getAbsoluteValue(styles.paddingLeft, bounds.width);
          var paddingRight2 = getAbsoluteValue(styles.paddingRight, bounds.width);
          var paddingTop2 = getAbsoluteValue(styles.paddingTop, bounds.width);
          var paddingBottom2 = getAbsoluteValue(styles.paddingBottom, bounds.width);
          return bounds.add(paddingLeft2 + styles.borderLeftWidth, paddingTop2 + styles.borderTopWidth, -(styles.borderRightWidth + styles.borderLeftWidth + paddingLeft2 + paddingRight2), -(styles.borderTopWidth + styles.borderBottomWidth + paddingTop2 + paddingBottom2));
        };
        var calculateBackgroundPositioningArea = function(backgroundOrigin2, element) {
          if (backgroundOrigin2 === 0) {
            return element.bounds;
          }
          if (backgroundOrigin2 === 2) {
            return contentBox(element);
          }
          return paddingBox(element);
        };
        var calculateBackgroundPaintingArea = function(backgroundClip2, element) {
          if (backgroundClip2 === 0) {
            return element.bounds;
          }
          if (backgroundClip2 === 2) {
            return contentBox(element);
          }
          return paddingBox(element);
        };
        var calculateBackgroundRendering = function(container, index, intrinsicSize) {
          var backgroundPositioningArea = calculateBackgroundPositioningArea(getBackgroundValueForIndex(container.styles.backgroundOrigin, index), container);
          var backgroundPaintingArea = calculateBackgroundPaintingArea(getBackgroundValueForIndex(container.styles.backgroundClip, index), container);
          var backgroundImageSize = calculateBackgroundSize(getBackgroundValueForIndex(container.styles.backgroundSize, index), intrinsicSize, backgroundPositioningArea);
          var sizeWidth = backgroundImageSize[0], sizeHeight = backgroundImageSize[1];
          var position2 = getAbsoluteValueForTuple(getBackgroundValueForIndex(container.styles.backgroundPosition, index), backgroundPositioningArea.width - sizeWidth, backgroundPositioningArea.height - sizeHeight);
          var path = calculateBackgroundRepeatPath(getBackgroundValueForIndex(container.styles.backgroundRepeat, index), position2, backgroundImageSize, backgroundPositioningArea, backgroundPaintingArea);
          var offsetX = Math.round(backgroundPositioningArea.left + position2[0]);
          var offsetY = Math.round(backgroundPositioningArea.top + position2[1]);
          return [path, offsetX, offsetY, sizeWidth, sizeHeight];
        };
        var isAuto = function(token) {
          return isIdentToken(token) && token.value === BACKGROUND_SIZE.AUTO;
        };
        var hasIntrinsicValue = function(value) {
          return typeof value === "number";
        };
        var calculateBackgroundSize = function(size, _a, bounds) {
          var intrinsicWidth = _a[0], intrinsicHeight = _a[1], intrinsicProportion = _a[2];
          var first = size[0], second = size[1];
          if (!first) {
            return [0, 0];
          }
          if (isLengthPercentage(first) && second && isLengthPercentage(second)) {
            return [getAbsoluteValue(first, bounds.width), getAbsoluteValue(second, bounds.height)];
          }
          var hasIntrinsicProportion = hasIntrinsicValue(intrinsicProportion);
          if (isIdentToken(first) && (first.value === BACKGROUND_SIZE.CONTAIN || first.value === BACKGROUND_SIZE.COVER)) {
            if (hasIntrinsicValue(intrinsicProportion)) {
              var targetRatio = bounds.width / bounds.height;
              return targetRatio < intrinsicProportion !== (first.value === BACKGROUND_SIZE.COVER) ? [bounds.width, bounds.width / intrinsicProportion] : [bounds.height * intrinsicProportion, bounds.height];
            }
            return [bounds.width, bounds.height];
          }
          var hasIntrinsicWidth = hasIntrinsicValue(intrinsicWidth);
          var hasIntrinsicHeight = hasIntrinsicValue(intrinsicHeight);
          var hasIntrinsicDimensions = hasIntrinsicWidth || hasIntrinsicHeight;
          if (isAuto(first) && (!second || isAuto(second))) {
            if (hasIntrinsicWidth && hasIntrinsicHeight) {
              return [intrinsicWidth, intrinsicHeight];
            }
            if (!hasIntrinsicProportion && !hasIntrinsicDimensions) {
              return [bounds.width, bounds.height];
            }
            if (hasIntrinsicDimensions && hasIntrinsicProportion) {
              var width_1 = hasIntrinsicWidth ? intrinsicWidth : intrinsicHeight * intrinsicProportion;
              var height_1 = hasIntrinsicHeight ? intrinsicHeight : intrinsicWidth / intrinsicProportion;
              return [width_1, height_1];
            }
            var width_2 = hasIntrinsicWidth ? intrinsicWidth : bounds.width;
            var height_2 = hasIntrinsicHeight ? intrinsicHeight : bounds.height;
            return [width_2, height_2];
          }
          if (hasIntrinsicProportion) {
            var width_3 = 0;
            var height_3 = 0;
            if (isLengthPercentage(first)) {
              width_3 = getAbsoluteValue(first, bounds.width);
            } else if (isLengthPercentage(second)) {
              height_3 = getAbsoluteValue(second, bounds.height);
            }
            if (isAuto(first)) {
              width_3 = height_3 * intrinsicProportion;
            } else if (!second || isAuto(second)) {
              height_3 = width_3 / intrinsicProportion;
            }
            return [width_3, height_3];
          }
          var width = null;
          var height = null;
          if (isLengthPercentage(first)) {
            width = getAbsoluteValue(first, bounds.width);
          } else if (second && isLengthPercentage(second)) {
            height = getAbsoluteValue(second, bounds.height);
          }
          if (width !== null && (!second || isAuto(second))) {
            height = hasIntrinsicWidth && hasIntrinsicHeight ? width / intrinsicWidth * intrinsicHeight : bounds.height;
          }
          if (height !== null && isAuto(first)) {
            width = hasIntrinsicWidth && hasIntrinsicHeight ? height / intrinsicHeight * intrinsicWidth : bounds.width;
          }
          if (width !== null && height !== null) {
            return [width, height];
          }
          throw new Error("Unable to calculate background-size for element");
        };
        var getBackgroundValueForIndex = function(values, index) {
          var value = values[index];
          if (typeof value === "undefined") {
            return values[0];
          }
          return value;
        };
        var calculateBackgroundRepeatPath = function(repeat, _a, _b, backgroundPositioningArea, backgroundPaintingArea) {
          var x = _a[0], y = _a[1];
          var width = _b[0], height = _b[1];
          switch (repeat) {
            case 2:
              return [
                new Vector(Math.round(backgroundPositioningArea.left), Math.round(backgroundPositioningArea.top + y)),
                new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(backgroundPositioningArea.top + y)),
                new Vector(Math.round(backgroundPositioningArea.left + backgroundPositioningArea.width), Math.round(height + backgroundPositioningArea.top + y)),
                new Vector(Math.round(backgroundPositioningArea.left), Math.round(height + backgroundPositioningArea.top + y))
              ];
            case 3:
              return [
                new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top)),
                new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top)),
                new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top)),
                new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.height + backgroundPositioningArea.top))
              ];
            case 1:
              return [
                new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y)),
                new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y)),
                new Vector(Math.round(backgroundPositioningArea.left + x + width), Math.round(backgroundPositioningArea.top + y + height)),
                new Vector(Math.round(backgroundPositioningArea.left + x), Math.round(backgroundPositioningArea.top + y + height))
              ];
            default:
              return [
                new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.top)),
                new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.top)),
                new Vector(Math.round(backgroundPaintingArea.left + backgroundPaintingArea.width), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top)),
                new Vector(Math.round(backgroundPaintingArea.left), Math.round(backgroundPaintingArea.height + backgroundPaintingArea.top))
              ];
          }
        };
        var SMALL_IMAGE = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        var SAMPLE_TEXT = "Hidden Text";
        var FontMetrics = (
          /** @class */
          (function() {
            function FontMetrics2(document2) {
              this._data = {};
              this._document = document2;
            }
            FontMetrics2.prototype.parseMetrics = function(fontFamily2, fontSize2) {
              var container = this._document.createElement("div");
              var img = this._document.createElement("img");
              var span = this._document.createElement("span");
              var body = this._document.body;
              container.style.visibility = "hidden";
              container.style.fontFamily = fontFamily2;
              container.style.fontSize = fontSize2;
              container.style.margin = "0";
              container.style.padding = "0";
              container.style.whiteSpace = "nowrap";
              body.appendChild(container);
              img.src = SMALL_IMAGE;
              img.width = 1;
              img.height = 1;
              img.style.margin = "0";
              img.style.padding = "0";
              img.style.verticalAlign = "baseline";
              span.style.fontFamily = fontFamily2;
              span.style.fontSize = fontSize2;
              span.style.margin = "0";
              span.style.padding = "0";
              span.appendChild(this._document.createTextNode(SAMPLE_TEXT));
              container.appendChild(span);
              container.appendChild(img);
              var baseline = img.offsetTop - span.offsetTop + 2;
              container.removeChild(span);
              container.appendChild(this._document.createTextNode(SAMPLE_TEXT));
              container.style.lineHeight = "normal";
              img.style.verticalAlign = "super";
              var middle = img.offsetTop - container.offsetTop + 2;
              body.removeChild(container);
              return { baseline, middle };
            };
            FontMetrics2.prototype.getMetrics = function(fontFamily2, fontSize2) {
              var key = fontFamily2 + " " + fontSize2;
              if (typeof this._data[key] === "undefined") {
                this._data[key] = this.parseMetrics(fontFamily2, fontSize2);
              }
              return this._data[key];
            };
            return FontMetrics2;
          })()
        );
        var Renderer = (
          /** @class */
          /* @__PURE__ */ (function() {
            function Renderer2(context, options) {
              this.context = context;
              this.options = options;
            }
            return Renderer2;
          })()
        );
        var MASK_OFFSET = 1e4;
        var CanvasRenderer = (
          /** @class */
          (function(_super) {
            __extends(CanvasRenderer2, _super);
            function CanvasRenderer2(context, options) {
              var _this = _super.call(this, context, options) || this;
              _this._activeEffects = [];
              _this.canvas = options.canvas ? options.canvas : document.createElement("canvas");
              _this.ctx = _this.canvas.getContext("2d");
              if (!options.canvas) {
                _this.canvas.width = Math.floor(options.width * options.scale);
                _this.canvas.height = Math.floor(options.height * options.scale);
                _this.canvas.style.width = options.width + "px";
                _this.canvas.style.height = options.height + "px";
              }
              _this.fontMetrics = new FontMetrics(document);
              _this.ctx.scale(_this.options.scale, _this.options.scale);
              _this.ctx.translate(-options.x, -options.y);
              _this.ctx.textBaseline = "bottom";
              _this._activeEffects = [];
              _this.context.logger.debug("Canvas renderer initialized (" + options.width + "x" + options.height + ") with scale " + options.scale);
              return _this;
            }
            CanvasRenderer2.prototype.applyEffects = function(effects) {
              var _this = this;
              while (this._activeEffects.length) {
                this.popEffect();
              }
              effects.forEach(function(effect) {
                return _this.applyEffect(effect);
              });
            };
            CanvasRenderer2.prototype.applyEffect = function(effect) {
              this.ctx.save();
              if (isOpacityEffect(effect)) {
                this.ctx.globalAlpha = effect.opacity;
              }
              if (isTransformEffect(effect)) {
                this.ctx.translate(effect.offsetX, effect.offsetY);
                this.ctx.transform(effect.matrix[0], effect.matrix[1], effect.matrix[2], effect.matrix[3], effect.matrix[4], effect.matrix[5]);
                this.ctx.translate(-effect.offsetX, -effect.offsetY);
              }
              if (isClipEffect(effect)) {
                this.path(effect.path);
                this.ctx.clip();
              }
              this._activeEffects.push(effect);
            };
            CanvasRenderer2.prototype.popEffect = function() {
              this._activeEffects.pop();
              this.ctx.restore();
            };
            CanvasRenderer2.prototype.renderStack = function(stack) {
              return __awaiter(this, void 0, void 0, function() {
                var styles;
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      styles = stack.element.container.styles;
                      if (!styles.isVisible()) return [3, 2];
                      return [4, this.renderStackContent(stack)];
                    case 1:
                      _a.sent();
                      _a.label = 2;
                    case 2:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            };
            CanvasRenderer2.prototype.renderNode = function(paint) {
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      if (contains(
                        paint.container.flags,
                        16
                        /* DEBUG_RENDER */
                      )) {
                        debugger;
                      }
                      if (!paint.container.styles.isVisible()) return [3, 3];
                      return [4, this.renderNodeBackgroundAndBorders(paint)];
                    case 1:
                      _a.sent();
                      return [4, this.renderNodeContent(paint)];
                    case 2:
                      _a.sent();
                      _a.label = 3;
                    case 3:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            };
            CanvasRenderer2.prototype.renderTextWithLetterSpacing = function(text, letterSpacing2, baseline) {
              var _this = this;
              if (letterSpacing2 === 0) {
                this.ctx.fillText(text.text, text.bounds.left, text.bounds.top + baseline);
              } else {
                var letters = segmentGraphemes(text.text);
                letters.reduce(function(left, letter) {
                  _this.ctx.fillText(letter, left, text.bounds.top + baseline);
                  return left + _this.ctx.measureText(letter).width;
                }, text.bounds.left);
              }
            };
            CanvasRenderer2.prototype.createFontStyle = function(styles) {
              var fontVariant2 = styles.fontVariant.filter(function(variant) {
                return variant === "normal" || variant === "small-caps";
              }).join("");
              var fontFamily2 = fixIOSSystemFonts(styles.fontFamily).join(", ");
              var fontSize2 = isDimensionToken(styles.fontSize) ? "" + styles.fontSize.number + styles.fontSize.unit : styles.fontSize.number + "px";
              return [
                [styles.fontStyle, fontVariant2, styles.fontWeight, fontSize2, fontFamily2].join(" "),
                fontFamily2,
                fontSize2
              ];
            };
            CanvasRenderer2.prototype.renderTextNode = function(text, styles) {
              return __awaiter(this, void 0, void 0, function() {
                var _a, font, fontFamily2, fontSize2, _b, baseline, middle, paintOrder2;
                var _this = this;
                return __generator(this, function(_c) {
                  _a = this.createFontStyle(styles), font = _a[0], fontFamily2 = _a[1], fontSize2 = _a[2];
                  this.ctx.font = font;
                  this.ctx.direction = styles.direction === 1 ? "rtl" : "ltr";
                  this.ctx.textAlign = "left";
                  this.ctx.textBaseline = "alphabetic";
                  _b = this.fontMetrics.getMetrics(fontFamily2, fontSize2), baseline = _b.baseline, middle = _b.middle;
                  paintOrder2 = styles.paintOrder;
                  text.textBounds.forEach(function(text2) {
                    paintOrder2.forEach(function(paintOrderLayer) {
                      switch (paintOrderLayer) {
                        case 0:
                          _this.ctx.fillStyle = asString(styles.color);
                          _this.renderTextWithLetterSpacing(text2, styles.letterSpacing, baseline);
                          var textShadows = styles.textShadow;
                          if (textShadows.length && text2.text.trim().length) {
                            textShadows.slice(0).reverse().forEach(function(textShadow2) {
                              _this.ctx.shadowColor = asString(textShadow2.color);
                              _this.ctx.shadowOffsetX = textShadow2.offsetX.number * _this.options.scale;
                              _this.ctx.shadowOffsetY = textShadow2.offsetY.number * _this.options.scale;
                              _this.ctx.shadowBlur = textShadow2.blur.number;
                              _this.renderTextWithLetterSpacing(text2, styles.letterSpacing, baseline);
                            });
                            _this.ctx.shadowColor = "";
                            _this.ctx.shadowOffsetX = 0;
                            _this.ctx.shadowOffsetY = 0;
                            _this.ctx.shadowBlur = 0;
                          }
                          if (styles.textDecorationLine.length) {
                            _this.ctx.fillStyle = asString(styles.textDecorationColor || styles.color);
                            styles.textDecorationLine.forEach(function(textDecorationLine2) {
                              switch (textDecorationLine2) {
                                case 1:
                                  _this.ctx.fillRect(text2.bounds.left, Math.round(text2.bounds.top + baseline), text2.bounds.width, 1);
                                  break;
                                case 2:
                                  _this.ctx.fillRect(text2.bounds.left, Math.round(text2.bounds.top), text2.bounds.width, 1);
                                  break;
                                case 3:
                                  _this.ctx.fillRect(text2.bounds.left, Math.ceil(text2.bounds.top + middle), text2.bounds.width, 1);
                                  break;
                              }
                            });
                          }
                          break;
                        case 1:
                          if (styles.webkitTextStrokeWidth && text2.text.trim().length) {
                            _this.ctx.strokeStyle = asString(styles.webkitTextStrokeColor);
                            _this.ctx.lineWidth = styles.webkitTextStrokeWidth;
                            _this.ctx.lineJoin = !!window.chrome ? "miter" : "round";
                            _this.ctx.strokeText(text2.text, text2.bounds.left, text2.bounds.top + baseline);
                          }
                          _this.ctx.strokeStyle = "";
                          _this.ctx.lineWidth = 0;
                          _this.ctx.lineJoin = "miter";
                          break;
                      }
                    });
                  });
                  return [
                    2
                    /*return*/
                  ];
                });
              });
            };
            CanvasRenderer2.prototype.renderReplacedElement = function(container, curves, image2) {
              if (image2 && container.intrinsicWidth > 0 && container.intrinsicHeight > 0) {
                var box = contentBox(container);
                var path = calculatePaddingBoxPath(curves);
                this.path(path);
                this.ctx.save();
                this.ctx.clip();
                this.ctx.drawImage(image2, 0, 0, container.intrinsicWidth, container.intrinsicHeight, box.left, box.top, box.width, box.height);
                this.ctx.restore();
              }
            };
            CanvasRenderer2.prototype.renderNodeContent = function(paint) {
              return __awaiter(this, void 0, void 0, function() {
                var container, curves, styles, _i, _a, child, image2, image2, iframeRenderer, canvas, size, _b, fontFamily2, fontSize2, baseline, bounds, x, textBounds, img, image2, url, fontFamily2, bounds;
                return __generator(this, function(_c) {
                  switch (_c.label) {
                    case 0:
                      this.applyEffects(paint.getEffects(
                        4
                        /* CONTENT */
                      ));
                      container = paint.container;
                      curves = paint.curves;
                      styles = container.styles;
                      _i = 0, _a = container.textNodes;
                      _c.label = 1;
                    case 1:
                      if (!(_i < _a.length)) return [3, 4];
                      child = _a[_i];
                      return [4, this.renderTextNode(child, styles)];
                    case 2:
                      _c.sent();
                      _c.label = 3;
                    case 3:
                      _i++;
                      return [3, 1];
                    case 4:
                      if (!(container instanceof ImageElementContainer)) return [3, 8];
                      _c.label = 5;
                    case 5:
                      _c.trys.push([5, 7, , 8]);
                      return [4, this.context.cache.match(container.src)];
                    case 6:
                      image2 = _c.sent();
                      this.renderReplacedElement(container, curves, image2);
                      return [3, 8];
                    case 7:
                      _c.sent();
                      this.context.logger.error("Error loading image " + container.src);
                      return [3, 8];
                    case 8:
                      if (container instanceof CanvasElementContainer) {
                        this.renderReplacedElement(container, curves, container.canvas);
                      }
                      if (!(container instanceof SVGElementContainer)) return [3, 12];
                      _c.label = 9;
                    case 9:
                      _c.trys.push([9, 11, , 12]);
                      return [4, this.context.cache.match(container.svg)];
                    case 10:
                      image2 = _c.sent();
                      this.renderReplacedElement(container, curves, image2);
                      return [3, 12];
                    case 11:
                      _c.sent();
                      this.context.logger.error("Error loading svg " + container.svg.substring(0, 255));
                      return [3, 12];
                    case 12:
                      if (!(container instanceof IFrameElementContainer && container.tree)) return [3, 14];
                      iframeRenderer = new CanvasRenderer2(this.context, {
                        scale: this.options.scale,
                        backgroundColor: container.backgroundColor,
                        x: 0,
                        y: 0,
                        width: container.width,
                        height: container.height
                      });
                      return [4, iframeRenderer.render(container.tree)];
                    case 13:
                      canvas = _c.sent();
                      if (container.width && container.height) {
                        this.ctx.drawImage(canvas, 0, 0, container.width, container.height, container.bounds.left, container.bounds.top, container.bounds.width, container.bounds.height);
                      }
                      _c.label = 14;
                    case 14:
                      if (container instanceof InputElementContainer) {
                        size = Math.min(container.bounds.width, container.bounds.height);
                        if (container.type === CHECKBOX) {
                          if (container.checked) {
                            this.ctx.save();
                            this.path([
                              new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79),
                              new Vector(container.bounds.left + size * 0.16, container.bounds.top + size * 0.5549),
                              new Vector(container.bounds.left + size * 0.27347, container.bounds.top + size * 0.44071),
                              new Vector(container.bounds.left + size * 0.39694, container.bounds.top + size * 0.5649),
                              new Vector(container.bounds.left + size * 0.72983, container.bounds.top + size * 0.23),
                              new Vector(container.bounds.left + size * 0.84, container.bounds.top + size * 0.34085),
                              new Vector(container.bounds.left + size * 0.39363, container.bounds.top + size * 0.79)
                            ]);
                            this.ctx.fillStyle = asString(INPUT_COLOR);
                            this.ctx.fill();
                            this.ctx.restore();
                          }
                        } else if (container.type === RADIO) {
                          if (container.checked) {
                            this.ctx.save();
                            this.ctx.beginPath();
                            this.ctx.arc(container.bounds.left + size / 2, container.bounds.top + size / 2, size / 4, 0, Math.PI * 2, true);
                            this.ctx.fillStyle = asString(INPUT_COLOR);
                            this.ctx.fill();
                            this.ctx.restore();
                          }
                        }
                      }
                      if (isTextInputElement(container) && container.value.length) {
                        _b = this.createFontStyle(styles), fontFamily2 = _b[0], fontSize2 = _b[1];
                        baseline = this.fontMetrics.getMetrics(fontFamily2, fontSize2).baseline;
                        this.ctx.font = fontFamily2;
                        this.ctx.fillStyle = asString(styles.color);
                        this.ctx.textBaseline = "alphabetic";
                        this.ctx.textAlign = canvasTextAlign(container.styles.textAlign);
                        bounds = contentBox(container);
                        x = 0;
                        switch (container.styles.textAlign) {
                          case 1:
                            x += bounds.width / 2;
                            break;
                          case 2:
                            x += bounds.width;
                            break;
                        }
                        textBounds = bounds.add(x, 0, 0, -bounds.height / 2 + 1);
                        this.ctx.save();
                        this.path([
                          new Vector(bounds.left, bounds.top),
                          new Vector(bounds.left + bounds.width, bounds.top),
                          new Vector(bounds.left + bounds.width, bounds.top + bounds.height),
                          new Vector(bounds.left, bounds.top + bounds.height)
                        ]);
                        this.ctx.clip();
                        this.renderTextWithLetterSpacing(new TextBounds(container.value, textBounds), styles.letterSpacing, baseline);
                        this.ctx.restore();
                        this.ctx.textBaseline = "alphabetic";
                        this.ctx.textAlign = "left";
                      }
                      if (!contains(
                        container.styles.display,
                        2048
                        /* LIST_ITEM */
                      )) return [3, 20];
                      if (!(container.styles.listStyleImage !== null)) return [3, 19];
                      img = container.styles.listStyleImage;
                      if (!(img.type === 0)) return [3, 18];
                      image2 = void 0;
                      url = img.url;
                      _c.label = 15;
                    case 15:
                      _c.trys.push([15, 17, , 18]);
                      return [4, this.context.cache.match(url)];
                    case 16:
                      image2 = _c.sent();
                      this.ctx.drawImage(image2, container.bounds.left - (image2.width + 10), container.bounds.top);
                      return [3, 18];
                    case 17:
                      _c.sent();
                      this.context.logger.error("Error loading list-style-image " + url);
                      return [3, 18];
                    case 18:
                      return [3, 20];
                    case 19:
                      if (paint.listValue && container.styles.listStyleType !== -1) {
                        fontFamily2 = this.createFontStyle(styles)[0];
                        this.ctx.font = fontFamily2;
                        this.ctx.fillStyle = asString(styles.color);
                        this.ctx.textBaseline = "middle";
                        this.ctx.textAlign = "right";
                        bounds = new Bounds(container.bounds.left, container.bounds.top + getAbsoluteValue(container.styles.paddingTop, container.bounds.width), container.bounds.width, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 1);
                        this.renderTextWithLetterSpacing(new TextBounds(paint.listValue, bounds), styles.letterSpacing, computeLineHeight(styles.lineHeight, styles.fontSize.number) / 2 + 2);
                        this.ctx.textBaseline = "bottom";
                        this.ctx.textAlign = "left";
                      }
                      _c.label = 20;
                    case 20:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            };
            CanvasRenderer2.prototype.renderStackContent = function(stack) {
              return __awaiter(this, void 0, void 0, function() {
                var _i, _a, child, _b, _c, child, _d, _e, child, _f, _g, child, _h, _j, child, _k, _l, child, _m, _o, child;
                return __generator(this, function(_p) {
                  switch (_p.label) {
                    case 0:
                      if (contains(
                        stack.element.container.flags,
                        16
                        /* DEBUG_RENDER */
                      )) {
                        debugger;
                      }
                      return [4, this.renderNodeBackgroundAndBorders(stack.element)];
                    case 1:
                      _p.sent();
                      _i = 0, _a = stack.negativeZIndex;
                      _p.label = 2;
                    case 2:
                      if (!(_i < _a.length)) return [3, 5];
                      child = _a[_i];
                      return [4, this.renderStack(child)];
                    case 3:
                      _p.sent();
                      _p.label = 4;
                    case 4:
                      _i++;
                      return [3, 2];
                    case 5:
                      return [4, this.renderNodeContent(stack.element)];
                    case 6:
                      _p.sent();
                      _b = 0, _c = stack.nonInlineLevel;
                      _p.label = 7;
                    case 7:
                      if (!(_b < _c.length)) return [3, 10];
                      child = _c[_b];
                      return [4, this.renderNode(child)];
                    case 8:
                      _p.sent();
                      _p.label = 9;
                    case 9:
                      _b++;
                      return [3, 7];
                    case 10:
                      _d = 0, _e = stack.nonPositionedFloats;
                      _p.label = 11;
                    case 11:
                      if (!(_d < _e.length)) return [3, 14];
                      child = _e[_d];
                      return [4, this.renderStack(child)];
                    case 12:
                      _p.sent();
                      _p.label = 13;
                    case 13:
                      _d++;
                      return [3, 11];
                    case 14:
                      _f = 0, _g = stack.nonPositionedInlineLevel;
                      _p.label = 15;
                    case 15:
                      if (!(_f < _g.length)) return [3, 18];
                      child = _g[_f];
                      return [4, this.renderStack(child)];
                    case 16:
                      _p.sent();
                      _p.label = 17;
                    case 17:
                      _f++;
                      return [3, 15];
                    case 18:
                      _h = 0, _j = stack.inlineLevel;
                      _p.label = 19;
                    case 19:
                      if (!(_h < _j.length)) return [3, 22];
                      child = _j[_h];
                      return [4, this.renderNode(child)];
                    case 20:
                      _p.sent();
                      _p.label = 21;
                    case 21:
                      _h++;
                      return [3, 19];
                    case 22:
                      _k = 0, _l = stack.zeroOrAutoZIndexOrTransformedOrOpacity;
                      _p.label = 23;
                    case 23:
                      if (!(_k < _l.length)) return [3, 26];
                      child = _l[_k];
                      return [4, this.renderStack(child)];
                    case 24:
                      _p.sent();
                      _p.label = 25;
                    case 25:
                      _k++;
                      return [3, 23];
                    case 26:
                      _m = 0, _o = stack.positiveZIndex;
                      _p.label = 27;
                    case 27:
                      if (!(_m < _o.length)) return [3, 30];
                      child = _o[_m];
                      return [4, this.renderStack(child)];
                    case 28:
                      _p.sent();
                      _p.label = 29;
                    case 29:
                      _m++;
                      return [3, 27];
                    case 30:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            };
            CanvasRenderer2.prototype.mask = function(paths) {
              this.ctx.beginPath();
              this.ctx.moveTo(0, 0);
              this.ctx.lineTo(this.canvas.width, 0);
              this.ctx.lineTo(this.canvas.width, this.canvas.height);
              this.ctx.lineTo(0, this.canvas.height);
              this.ctx.lineTo(0, 0);
              this.formatPath(paths.slice(0).reverse());
              this.ctx.closePath();
            };
            CanvasRenderer2.prototype.path = function(paths) {
              this.ctx.beginPath();
              this.formatPath(paths);
              this.ctx.closePath();
            };
            CanvasRenderer2.prototype.formatPath = function(paths) {
              var _this = this;
              paths.forEach(function(point, index) {
                var start = isBezierCurve(point) ? point.start : point;
                if (index === 0) {
                  _this.ctx.moveTo(start.x, start.y);
                } else {
                  _this.ctx.lineTo(start.x, start.y);
                }
                if (isBezierCurve(point)) {
                  _this.ctx.bezierCurveTo(point.startControl.x, point.startControl.y, point.endControl.x, point.endControl.y, point.end.x, point.end.y);
                }
              });
            };
            CanvasRenderer2.prototype.renderRepeat = function(path, pattern, offsetX, offsetY) {
              this.path(path);
              this.ctx.fillStyle = pattern;
              this.ctx.translate(offsetX, offsetY);
              this.ctx.fill();
              this.ctx.translate(-offsetX, -offsetY);
            };
            CanvasRenderer2.prototype.resizeImage = function(image2, width, height) {
              var _a;
              if (image2.width === width && image2.height === height) {
                return image2;
              }
              var ownerDocument = (_a = this.canvas.ownerDocument) !== null && _a !== void 0 ? _a : document;
              var canvas = ownerDocument.createElement("canvas");
              canvas.width = Math.max(1, width);
              canvas.height = Math.max(1, height);
              var ctx = canvas.getContext("2d");
              ctx.drawImage(image2, 0, 0, image2.width, image2.height, 0, 0, width, height);
              return canvas;
            };
            CanvasRenderer2.prototype.renderBackgroundImage = function(container) {
              return __awaiter(this, void 0, void 0, function() {
                var index, _loop_1, this_1, _i, _a, backgroundImage2;
                return __generator(this, function(_b) {
                  switch (_b.label) {
                    case 0:
                      index = container.styles.backgroundImage.length - 1;
                      _loop_1 = function(backgroundImage3) {
                        var image2, url, _c, path, x, y, width, height, pattern, _d, path, x, y, width, height, _e, lineLength, x0, x1, y0, y1, canvas, ctx, gradient_1, pattern, _f, path, left, top_1, width, height, position2, x, y, _g, rx, ry, radialGradient_1, midX, midY, f2, invF;
                        return __generator(this, function(_h) {
                          switch (_h.label) {
                            case 0:
                              if (!(backgroundImage3.type === 0)) return [3, 5];
                              image2 = void 0;
                              url = backgroundImage3.url;
                              _h.label = 1;
                            case 1:
                              _h.trys.push([1, 3, , 4]);
                              return [4, this_1.context.cache.match(url)];
                            case 2:
                              image2 = _h.sent();
                              return [3, 4];
                            case 3:
                              _h.sent();
                              this_1.context.logger.error("Error loading background-image " + url);
                              return [3, 4];
                            case 4:
                              if (image2) {
                                _c = calculateBackgroundRendering(container, index, [
                                  image2.width,
                                  image2.height,
                                  image2.width / image2.height
                                ]), path = _c[0], x = _c[1], y = _c[2], width = _c[3], height = _c[4];
                                pattern = this_1.ctx.createPattern(this_1.resizeImage(image2, width, height), "repeat");
                                this_1.renderRepeat(path, pattern, x, y);
                              }
                              return [3, 6];
                            case 5:
                              if (isLinearGradient(backgroundImage3)) {
                                _d = calculateBackgroundRendering(container, index, [null, null, null]), path = _d[0], x = _d[1], y = _d[2], width = _d[3], height = _d[4];
                                _e = calculateGradientDirection(backgroundImage3.angle, width, height), lineLength = _e[0], x0 = _e[1], x1 = _e[2], y0 = _e[3], y1 = _e[4];
                                canvas = document.createElement("canvas");
                                canvas.width = width;
                                canvas.height = height;
                                ctx = canvas.getContext("2d");
                                gradient_1 = ctx.createLinearGradient(x0, y0, x1, y1);
                                processColorStops(backgroundImage3.stops, lineLength).forEach(function(colorStop) {
                                  return gradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                                });
                                ctx.fillStyle = gradient_1;
                                ctx.fillRect(0, 0, width, height);
                                if (width > 0 && height > 0) {
                                  pattern = this_1.ctx.createPattern(canvas, "repeat");
                                  this_1.renderRepeat(path, pattern, x, y);
                                }
                              } else if (isRadialGradient(backgroundImage3)) {
                                _f = calculateBackgroundRendering(container, index, [
                                  null,
                                  null,
                                  null
                                ]), path = _f[0], left = _f[1], top_1 = _f[2], width = _f[3], height = _f[4];
                                position2 = backgroundImage3.position.length === 0 ? [FIFTY_PERCENT] : backgroundImage3.position;
                                x = getAbsoluteValue(position2[0], width);
                                y = getAbsoluteValue(position2[position2.length - 1], height);
                                _g = calculateRadius(backgroundImage3, x, y, width, height), rx = _g[0], ry = _g[1];
                                if (rx > 0 && ry > 0) {
                                  radialGradient_1 = this_1.ctx.createRadialGradient(left + x, top_1 + y, 0, left + x, top_1 + y, rx);
                                  processColorStops(backgroundImage3.stops, rx * 2).forEach(function(colorStop) {
                                    return radialGradient_1.addColorStop(colorStop.stop, asString(colorStop.color));
                                  });
                                  this_1.path(path);
                                  this_1.ctx.fillStyle = radialGradient_1;
                                  if (rx !== ry) {
                                    midX = container.bounds.left + 0.5 * container.bounds.width;
                                    midY = container.bounds.top + 0.5 * container.bounds.height;
                                    f2 = ry / rx;
                                    invF = 1 / f2;
                                    this_1.ctx.save();
                                    this_1.ctx.translate(midX, midY);
                                    this_1.ctx.transform(1, 0, 0, f2, 0, 0);
                                    this_1.ctx.translate(-midX, -midY);
                                    this_1.ctx.fillRect(left, invF * (top_1 - midY) + midY, width, height * invF);
                                    this_1.ctx.restore();
                                  } else {
                                    this_1.ctx.fill();
                                  }
                                }
                              }
                              _h.label = 6;
                            case 6:
                              index--;
                              return [
                                2
                                /*return*/
                              ];
                          }
                        });
                      };
                      this_1 = this;
                      _i = 0, _a = container.styles.backgroundImage.slice(0).reverse();
                      _b.label = 1;
                    case 1:
                      if (!(_i < _a.length)) return [3, 4];
                      backgroundImage2 = _a[_i];
                      return [5, _loop_1(backgroundImage2)];
                    case 2:
                      _b.sent();
                      _b.label = 3;
                    case 3:
                      _i++;
                      return [3, 1];
                    case 4:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            };
            CanvasRenderer2.prototype.renderSolidBorder = function(color2, side, curvePoints) {
              return __awaiter(this, void 0, void 0, function() {
                return __generator(this, function(_a) {
                  this.path(parsePathForBorder(curvePoints, side));
                  this.ctx.fillStyle = asString(color2);
                  this.ctx.fill();
                  return [
                    2
                    /*return*/
                  ];
                });
              });
            };
            CanvasRenderer2.prototype.renderDoubleBorder = function(color2, width, side, curvePoints) {
              return __awaiter(this, void 0, void 0, function() {
                var outerPaths, innerPaths;
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      if (!(width < 3)) return [3, 2];
                      return [4, this.renderSolidBorder(color2, side, curvePoints)];
                    case 1:
                      _a.sent();
                      return [
                        2
                        /*return*/
                      ];
                    case 2:
                      outerPaths = parsePathForBorderDoubleOuter(curvePoints, side);
                      this.path(outerPaths);
                      this.ctx.fillStyle = asString(color2);
                      this.ctx.fill();
                      innerPaths = parsePathForBorderDoubleInner(curvePoints, side);
                      this.path(innerPaths);
                      this.ctx.fill();
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            };
            CanvasRenderer2.prototype.renderNodeBackgroundAndBorders = function(paint) {
              return __awaiter(this, void 0, void 0, function() {
                var styles, hasBackground, borders, backgroundPaintingArea, side, _i, borders_1, border;
                var _this = this;
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      this.applyEffects(paint.getEffects(
                        2
                        /* BACKGROUND_BORDERS */
                      ));
                      styles = paint.container.styles;
                      hasBackground = !isTransparent(styles.backgroundColor) || styles.backgroundImage.length;
                      borders = [
                        { style: styles.borderTopStyle, color: styles.borderTopColor, width: styles.borderTopWidth },
                        { style: styles.borderRightStyle, color: styles.borderRightColor, width: styles.borderRightWidth },
                        { style: styles.borderBottomStyle, color: styles.borderBottomColor, width: styles.borderBottomWidth },
                        { style: styles.borderLeftStyle, color: styles.borderLeftColor, width: styles.borderLeftWidth }
                      ];
                      backgroundPaintingArea = calculateBackgroundCurvedPaintingArea(getBackgroundValueForIndex(styles.backgroundClip, 0), paint.curves);
                      if (!(hasBackground || styles.boxShadow.length)) return [3, 2];
                      this.ctx.save();
                      this.path(backgroundPaintingArea);
                      this.ctx.clip();
                      if (!isTransparent(styles.backgroundColor)) {
                        this.ctx.fillStyle = asString(styles.backgroundColor);
                        this.ctx.fill();
                      }
                      return [4, this.renderBackgroundImage(paint.container)];
                    case 1:
                      _a.sent();
                      this.ctx.restore();
                      styles.boxShadow.slice(0).reverse().forEach(function(shadow) {
                        _this.ctx.save();
                        var borderBoxArea = calculateBorderBoxPath(paint.curves);
                        var maskOffset = shadow.inset ? 0 : MASK_OFFSET;
                        var shadowPaintingArea = transformPath(borderBoxArea, -maskOffset + (shadow.inset ? 1 : -1) * shadow.spread.number, (shadow.inset ? 1 : -1) * shadow.spread.number, shadow.spread.number * (shadow.inset ? -2 : 2), shadow.spread.number * (shadow.inset ? -2 : 2));
                        if (shadow.inset) {
                          _this.path(borderBoxArea);
                          _this.ctx.clip();
                          _this.mask(shadowPaintingArea);
                        } else {
                          _this.mask(borderBoxArea);
                          _this.ctx.clip();
                          _this.path(shadowPaintingArea);
                        }
                        _this.ctx.shadowOffsetX = shadow.offsetX.number + maskOffset;
                        _this.ctx.shadowOffsetY = shadow.offsetY.number;
                        _this.ctx.shadowColor = asString(shadow.color);
                        _this.ctx.shadowBlur = shadow.blur.number;
                        _this.ctx.fillStyle = shadow.inset ? asString(shadow.color) : "rgba(0,0,0,1)";
                        _this.ctx.fill();
                        _this.ctx.restore();
                      });
                      _a.label = 2;
                    case 2:
                      side = 0;
                      _i = 0, borders_1 = borders;
                      _a.label = 3;
                    case 3:
                      if (!(_i < borders_1.length)) return [3, 13];
                      border = borders_1[_i];
                      if (!(border.style !== 0 && !isTransparent(border.color) && border.width > 0)) return [3, 11];
                      if (!(border.style === 2)) return [3, 5];
                      return [4, this.renderDashedDottedBorder(
                        border.color,
                        border.width,
                        side,
                        paint.curves,
                        2
                        /* DASHED */
                      )];
                    case 4:
                      _a.sent();
                      return [3, 11];
                    case 5:
                      if (!(border.style === 3)) return [3, 7];
                      return [4, this.renderDashedDottedBorder(
                        border.color,
                        border.width,
                        side,
                        paint.curves,
                        3
                        /* DOTTED */
                      )];
                    case 6:
                      _a.sent();
                      return [3, 11];
                    case 7:
                      if (!(border.style === 4)) return [3, 9];
                      return [4, this.renderDoubleBorder(border.color, border.width, side, paint.curves)];
                    case 8:
                      _a.sent();
                      return [3, 11];
                    case 9:
                      return [4, this.renderSolidBorder(border.color, side, paint.curves)];
                    case 10:
                      _a.sent();
                      _a.label = 11;
                    case 11:
                      side++;
                      _a.label = 12;
                    case 12:
                      _i++;
                      return [3, 3];
                    case 13:
                      return [
                        2
                        /*return*/
                      ];
                  }
                });
              });
            };
            CanvasRenderer2.prototype.renderDashedDottedBorder = function(color2, width, side, curvePoints, style) {
              return __awaiter(this, void 0, void 0, function() {
                var strokePaths, boxPaths, startX, startY, endX, endY, length, dashLength, spaceLength, useLineDash, multiplier, numberOfDashes, minSpace, maxSpace, path1, path2, path1, path2;
                return __generator(this, function(_a) {
                  this.ctx.save();
                  strokePaths = parsePathForBorderStroke(curvePoints, side);
                  boxPaths = parsePathForBorder(curvePoints, side);
                  if (style === 2) {
                    this.path(boxPaths);
                    this.ctx.clip();
                  }
                  if (isBezierCurve(boxPaths[0])) {
                    startX = boxPaths[0].start.x;
                    startY = boxPaths[0].start.y;
                  } else {
                    startX = boxPaths[0].x;
                    startY = boxPaths[0].y;
                  }
                  if (isBezierCurve(boxPaths[1])) {
                    endX = boxPaths[1].end.x;
                    endY = boxPaths[1].end.y;
                  } else {
                    endX = boxPaths[1].x;
                    endY = boxPaths[1].y;
                  }
                  if (side === 0 || side === 2) {
                    length = Math.abs(startX - endX);
                  } else {
                    length = Math.abs(startY - endY);
                  }
                  this.ctx.beginPath();
                  if (style === 3) {
                    this.formatPath(strokePaths);
                  } else {
                    this.formatPath(boxPaths.slice(0, 2));
                  }
                  dashLength = width < 3 ? width * 3 : width * 2;
                  spaceLength = width < 3 ? width * 2 : width;
                  if (style === 3) {
                    dashLength = width;
                    spaceLength = width;
                  }
                  useLineDash = true;
                  if (length <= dashLength * 2) {
                    useLineDash = false;
                  } else if (length <= dashLength * 2 + spaceLength) {
                    multiplier = length / (2 * dashLength + spaceLength);
                    dashLength *= multiplier;
                    spaceLength *= multiplier;
                  } else {
                    numberOfDashes = Math.floor((length + spaceLength) / (dashLength + spaceLength));
                    minSpace = (length - numberOfDashes * dashLength) / (numberOfDashes - 1);
                    maxSpace = (length - (numberOfDashes + 1) * dashLength) / numberOfDashes;
                    spaceLength = maxSpace <= 0 || Math.abs(spaceLength - minSpace) < Math.abs(spaceLength - maxSpace) ? minSpace : maxSpace;
                  }
                  if (useLineDash) {
                    if (style === 3) {
                      this.ctx.setLineDash([0, dashLength + spaceLength]);
                    } else {
                      this.ctx.setLineDash([dashLength, spaceLength]);
                    }
                  }
                  if (style === 3) {
                    this.ctx.lineCap = "round";
                    this.ctx.lineWidth = width;
                  } else {
                    this.ctx.lineWidth = width * 2 + 1.1;
                  }
                  this.ctx.strokeStyle = asString(color2);
                  this.ctx.stroke();
                  this.ctx.setLineDash([]);
                  if (style === 2) {
                    if (isBezierCurve(boxPaths[0])) {
                      path1 = boxPaths[3];
                      path2 = boxPaths[0];
                      this.ctx.beginPath();
                      this.formatPath([new Vector(path1.end.x, path1.end.y), new Vector(path2.start.x, path2.start.y)]);
                      this.ctx.stroke();
                    }
                    if (isBezierCurve(boxPaths[1])) {
                      path1 = boxPaths[1];
                      path2 = boxPaths[2];
                      this.ctx.beginPath();
                      this.formatPath([new Vector(path1.end.x, path1.end.y), new Vector(path2.start.x, path2.start.y)]);
                      this.ctx.stroke();
                    }
                  }
                  this.ctx.restore();
                  return [
                    2
                    /*return*/
                  ];
                });
              });
            };
            CanvasRenderer2.prototype.render = function(element) {
              return __awaiter(this, void 0, void 0, function() {
                var stack;
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      if (this.options.backgroundColor) {
                        this.ctx.fillStyle = asString(this.options.backgroundColor);
                        this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height);
                      }
                      stack = parseStackingContexts(element);
                      return [4, this.renderStack(stack)];
                    case 1:
                      _a.sent();
                      this.applyEffects([]);
                      return [2, this.canvas];
                  }
                });
              });
            };
            return CanvasRenderer2;
          })(Renderer)
        );
        var isTextInputElement = function(container) {
          if (container instanceof TextareaElementContainer) {
            return true;
          } else if (container instanceof SelectElementContainer) {
            return true;
          } else if (container instanceof InputElementContainer && container.type !== RADIO && container.type !== CHECKBOX) {
            return true;
          }
          return false;
        };
        var calculateBackgroundCurvedPaintingArea = function(clip, curves) {
          switch (clip) {
            case 0:
              return calculateBorderBoxPath(curves);
            case 2:
              return calculateContentBoxPath(curves);
            case 1:
            default:
              return calculatePaddingBoxPath(curves);
          }
        };
        var canvasTextAlign = function(textAlign2) {
          switch (textAlign2) {
            case 1:
              return "center";
            case 2:
              return "right";
            case 0:
            default:
              return "left";
          }
        };
        var iOSBrokenFonts = ["-apple-system", "system-ui"];
        var fixIOSSystemFonts = function(fontFamilies) {
          return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent) ? fontFamilies.filter(function(fontFamily2) {
            return iOSBrokenFonts.indexOf(fontFamily2) === -1;
          }) : fontFamilies;
        };
        var ForeignObjectRenderer = (
          /** @class */
          (function(_super) {
            __extends(ForeignObjectRenderer2, _super);
            function ForeignObjectRenderer2(context, options) {
              var _this = _super.call(this, context, options) || this;
              _this.canvas = options.canvas ? options.canvas : document.createElement("canvas");
              _this.ctx = _this.canvas.getContext("2d");
              _this.options = options;
              _this.canvas.width = Math.floor(options.width * options.scale);
              _this.canvas.height = Math.floor(options.height * options.scale);
              _this.canvas.style.width = options.width + "px";
              _this.canvas.style.height = options.height + "px";
              _this.ctx.scale(_this.options.scale, _this.options.scale);
              _this.ctx.translate(-options.x, -options.y);
              _this.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + options.width + "x" + options.height + " at " + options.x + "," + options.y + ") with scale " + options.scale);
              return _this;
            }
            ForeignObjectRenderer2.prototype.render = function(element) {
              return __awaiter(this, void 0, void 0, function() {
                var svg, img;
                return __generator(this, function(_a) {
                  switch (_a.label) {
                    case 0:
                      svg = createForeignObjectSVG(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, element);
                      return [4, loadSerializedSVG(svg)];
                    case 1:
                      img = _a.sent();
                      if (this.options.backgroundColor) {
                        this.ctx.fillStyle = asString(this.options.backgroundColor);
                        this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale);
                      }
                      this.ctx.drawImage(img, -this.options.x * this.options.scale, -this.options.y * this.options.scale);
                      return [2, this.canvas];
                  }
                });
              });
            };
            return ForeignObjectRenderer2;
          })(Renderer)
        );
        var loadSerializedSVG = function(svg) {
          return new Promise(function(resolve, reject) {
            var img = new Image();
            img.onload = function() {
              resolve(img);
            };
            img.onerror = reject;
            img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(svg));
          });
        };
        var Logger = (
          /** @class */
          (function() {
            function Logger2(_a) {
              var id = _a.id, enabled = _a.enabled;
              this.id = id;
              this.enabled = enabled;
              this.start = Date.now();
            }
            Logger2.prototype.debug = function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              if (this.enabled) {
                if (typeof window !== "undefined" && window.console && typeof console.debug === "function") {
                  console.debug.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
                } else {
                  this.info.apply(this, args);
                }
              }
            };
            Logger2.prototype.getTime = function() {
              return Date.now() - this.start;
            };
            Logger2.prototype.info = function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              if (this.enabled) {
                if (typeof window !== "undefined" && window.console && typeof console.info === "function") {
                  console.info.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
                }
              }
            };
            Logger2.prototype.warn = function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              if (this.enabled) {
                if (typeof window !== "undefined" && window.console && typeof console.warn === "function") {
                  console.warn.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
                } else {
                  this.info.apply(this, args);
                }
              }
            };
            Logger2.prototype.error = function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              if (this.enabled) {
                if (typeof window !== "undefined" && window.console && typeof console.error === "function") {
                  console.error.apply(console, __spreadArray([this.id, this.getTime() + "ms"], args));
                } else {
                  this.info.apply(this, args);
                }
              }
            };
            Logger2.instances = {};
            return Logger2;
          })()
        );
        var Context = (
          /** @class */
          (function() {
            function Context2(options, windowBounds) {
              var _a;
              this.windowBounds = windowBounds;
              this.instanceName = "#" + Context2.instanceCount++;
              this.logger = new Logger({ id: this.instanceName, enabled: options.logging });
              this.cache = (_a = options.cache) !== null && _a !== void 0 ? _a : new Cache(this, options);
            }
            Context2.instanceCount = 1;
            return Context2;
          })()
        );
        var html2canvas2 = function(element, options) {
          if (options === void 0) {
            options = {};
          }
          return renderElement(element, options);
        };
        if (typeof window !== "undefined") {
          CacheStorage.setContext(window);
        }
        var renderElement = function(element, opts) {
          return __awaiter(void 0, void 0, void 0, function() {
            var ownerDocument, defaultView, resourceOptions, contextOptions, windowOptions, windowBounds, context, foreignObjectRendering, cloneOptions, documentCloner, clonedElement, container, _a, width, height, left, top, backgroundColor2, renderOptions, canvas, renderer, root, renderer;
            var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t;
            return __generator(this, function(_u) {
              switch (_u.label) {
                case 0:
                  if (!element || typeof element !== "object") {
                    return [2, Promise.reject("Invalid element provided as first argument")];
                  }
                  ownerDocument = element.ownerDocument;
                  if (!ownerDocument) {
                    throw new Error("Element is not attached to a Document");
                  }
                  defaultView = ownerDocument.defaultView;
                  if (!defaultView) {
                    throw new Error("Document is not attached to a Window");
                  }
                  resourceOptions = {
                    allowTaint: (_b = opts.allowTaint) !== null && _b !== void 0 ? _b : false,
                    imageTimeout: (_c = opts.imageTimeout) !== null && _c !== void 0 ? _c : 15e3,
                    proxy: opts.proxy,
                    useCORS: (_d = opts.useCORS) !== null && _d !== void 0 ? _d : false
                  };
                  contextOptions = __assign({ logging: (_e = opts.logging) !== null && _e !== void 0 ? _e : true, cache: opts.cache }, resourceOptions);
                  windowOptions = {
                    windowWidth: (_f = opts.windowWidth) !== null && _f !== void 0 ? _f : defaultView.innerWidth,
                    windowHeight: (_g = opts.windowHeight) !== null && _g !== void 0 ? _g : defaultView.innerHeight,
                    scrollX: (_h = opts.scrollX) !== null && _h !== void 0 ? _h : defaultView.pageXOffset,
                    scrollY: (_j = opts.scrollY) !== null && _j !== void 0 ? _j : defaultView.pageYOffset
                  };
                  windowBounds = new Bounds(windowOptions.scrollX, windowOptions.scrollY, windowOptions.windowWidth, windowOptions.windowHeight);
                  context = new Context(contextOptions, windowBounds);
                  foreignObjectRendering = (_k = opts.foreignObjectRendering) !== null && _k !== void 0 ? _k : false;
                  cloneOptions = {
                    allowTaint: (_l = opts.allowTaint) !== null && _l !== void 0 ? _l : false,
                    onclone: opts.onclone,
                    ignoreElements: opts.ignoreElements,
                    inlineImages: foreignObjectRendering,
                    copyStyles: foreignObjectRendering
                  };
                  context.logger.debug("Starting document clone with size " + windowBounds.width + "x" + windowBounds.height + " scrolled to " + -windowBounds.left + "," + -windowBounds.top);
                  documentCloner = new DocumentCloner(context, element, cloneOptions);
                  clonedElement = documentCloner.clonedReferenceElement;
                  if (!clonedElement) {
                    return [2, Promise.reject("Unable to find element in cloned iframe")];
                  }
                  return [4, documentCloner.toIFrame(ownerDocument, windowBounds)];
                case 1:
                  container = _u.sent();
                  _a = isBodyElement(clonedElement) || isHTMLElement(clonedElement) ? parseDocumentSize(clonedElement.ownerDocument) : parseBounds(context, clonedElement), width = _a.width, height = _a.height, left = _a.left, top = _a.top;
                  backgroundColor2 = parseBackgroundColor(context, clonedElement, opts.backgroundColor);
                  renderOptions = {
                    canvas: opts.canvas,
                    backgroundColor: backgroundColor2,
                    scale: (_o = (_m = opts.scale) !== null && _m !== void 0 ? _m : defaultView.devicePixelRatio) !== null && _o !== void 0 ? _o : 1,
                    x: ((_p = opts.x) !== null && _p !== void 0 ? _p : 0) + left,
                    y: ((_q = opts.y) !== null && _q !== void 0 ? _q : 0) + top,
                    width: (_r = opts.width) !== null && _r !== void 0 ? _r : Math.ceil(width),
                    height: (_s = opts.height) !== null && _s !== void 0 ? _s : Math.ceil(height)
                  };
                  if (!foreignObjectRendering) return [3, 3];
                  context.logger.debug("Document cloned, using foreign object rendering");
                  renderer = new ForeignObjectRenderer(context, renderOptions);
                  return [4, renderer.render(clonedElement)];
                case 2:
                  canvas = _u.sent();
                  return [3, 5];
                case 3:
                  context.logger.debug("Document cloned, element located at " + left + "," + top + " with size " + width + "x" + height + " using computed rendering");
                  context.logger.debug("Starting DOM parsing");
                  root = parseTree(context, clonedElement);
                  if (backgroundColor2 === root.styles.backgroundColor) {
                    root.styles.backgroundColor = COLORS.TRANSPARENT;
                  }
                  context.logger.debug("Starting renderer for element at " + renderOptions.x + "," + renderOptions.y + " with size " + renderOptions.width + "x" + renderOptions.height);
                  renderer = new CanvasRenderer(context, renderOptions);
                  return [4, renderer.render(root)];
                case 4:
                  canvas = _u.sent();
                  _u.label = 5;
                case 5:
                  if ((_t = opts.removeContainer) !== null && _t !== void 0 ? _t : true) {
                    if (!DocumentCloner.destroy(container)) {
                      context.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore");
                    }
                  }
                  context.logger.debug("Finished rendering");
                  return [2, canvas];
              }
            });
          });
        };
        var parseBackgroundColor = function(context, element, backgroundColorOverride) {
          var ownerDocument = element.ownerDocument;
          var documentBackgroundColor = ownerDocument.documentElement ? parseColor(context, getComputedStyle(ownerDocument.documentElement).backgroundColor) : COLORS.TRANSPARENT;
          var bodyBackgroundColor = ownerDocument.body ? parseColor(context, getComputedStyle(ownerDocument.body).backgroundColor) : COLORS.TRANSPARENT;
          var defaultBackgroundColor = typeof backgroundColorOverride === "string" ? parseColor(context, backgroundColorOverride) : backgroundColorOverride === null ? COLORS.TRANSPARENT : 4294967295;
          return element === ownerDocument.documentElement ? isTransparent(documentBackgroundColor) ? isTransparent(bodyBackgroundColor) ? defaultBackgroundColor : bodyBackgroundColor : documentBackgroundColor : defaultBackgroundColor;
        };
        return html2canvas2;
      }));
    }
  });

  // src/dom/deepQuery.js
  function deepQuerySelectorAll(selector, root = document) {
    const results = [];
    try {
      const normalResults = root.querySelectorAll(selector);
      results.push(...Array.from(normalResults));
      const allElements = root.querySelectorAll("*");
      for (const el of allElements) {
        if (el.shadowRoot) {
          const shadowResults = deepQuerySelectorAll(selector, el.shadowRoot);
          results.push(...shadowResults);
        }
        if (el.assignedNodes) {
          const assignedNodes = el.assignedNodes();
          for (const node of assignedNodes) {
            if (node.shadowRoot) {
              const assignedShadowResults = deepQuerySelectorAll(selector, node.shadowRoot);
              results.push(...assignedShadowResults);
            }
          }
        }
      }
    } catch (error) {
      console.warn("[SAT PDF Exporter] deepQuerySelectorAll \uC624\uB958:", error);
    }
    return results;
  }
  function isElementVisible(el) {
    if (!el) return false;
    try {
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    } catch (error) {
      return !!el.offsetParent;
    }
  }
  var init_deepQuery = __esm({
    "src/dom/deepQuery.js"() {
    }
  });

  // src/dom/query.js
  function findSatRoot() {
    const testIdRoot = document.querySelector('[data-testid*="sat"], [data-testid*="question"], [data-testid*="problem"]');
    if (testIdRoot) {
      console.log("[DIAG] satRoot found by data-testid:", testIdRoot.tagName, testIdRoot.className);
      return testIdRoot;
    }
    const progressElements = deepQuerySelectorAll('[class*="progress"], [aria-label*="progress"], [class*="indicator"]');
    const choicesElements = deepQuerySelectorAll('[role="radio"], [class*="choice"], [class*="option"], button[aria-label*="Choice"]');
    for (const progressEl of progressElements) {
      if (!isElementVisible(progressEl)) continue;
      const progressText = (progressEl.innerText || progressEl.textContent || "").trim();
      if (!/\d+\s*\/\s*\d+/.test(progressText)) continue;
      for (const choiceEl of choicesElements) {
        if (!isElementVisible(choiceEl)) continue;
        let commonAncestor = progressEl;
        while (commonAncestor && commonAncestor !== document.body) {
          if (commonAncestor.contains(choiceEl)) {
            const children = Array.from(commonAncestor.children);
            for (const child of children) {
              if (child.contains(progressEl) && child.contains(choiceEl)) {
                commonAncestor = child;
                break;
              }
            }
            const rect = commonAncestor.getBoundingClientRect();
            console.log("[DIAG] satRoot found by progress+choices:", {
              tag: commonAncestor.tagName,
              class: commonAncestor.className?.split(" ")[0] || "none",
              testid: commonAncestor.getAttribute("data-testid") || "none",
              rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
            });
            return commonAncestor;
          }
          commonAncestor = commonAncestor.parentElement;
        }
      }
    }
    const main = document.querySelector('main, [role="main"]');
    if (main) {
      const rect = main.getBoundingClientRect();
      console.log("[DIAG] satRoot found by main:", {
        tag: main.tagName,
        class: main.className?.split(" ")[0] || "none",
        testid: main.getAttribute("data-testid") || "none",
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
      });
      return main;
    }
    console.warn("[DIAG] satRoot not found, using body as fallback");
    return document.body;
  }
  function selectNextButton() {
    const allButtons = deepQuerySelectorAll('button, [role="button"], div[role="button"]');
    const satRoot = findSatRoot();
    console.log(`[SAT-DEBUG] selectNextButton: \uC804\uCCB4 \uD6C4\uBCF4 ${allButtons.length}\uAC1C, SAT root:`, satRoot ? satRoot.tagName : "null");
    const filteredCandidates = [];
    for (const btn of allButtons) {
      if (!isElementVisible(btn) || btn.disabled || btn.getAttribute("aria-disabled") === "true") continue;
      if (btn.tagName === "A") {
        const href = btn.getAttribute("href");
        if (href && (href.startsWith("http") || href !== "#" && !href.startsWith("javascript:"))) continue;
      }
      const headerNav = btn.closest('header, nav, [aria-label*="navigation"], [data-testid*="sidebar"], [class*="sidebar"], [class*="header"]');
      if (headerNav) {
        console.log("[SAT-DEBUG] header/nav/sidebar \uB0B4\uBD80 \uC694\uC18C \uC81C\uC678:", btn.tagName);
        continue;
      }
      if (!satRoot || !satRoot.contains(btn)) {
        console.log("[SAT-DEBUG] SAT root \uC678\uBD80 \uC694\uC18C \uC81C\uC678:", btn.tagName);
        continue;
      }
      const text = (btn.innerText || btn.textContent || "").trim();
      const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
      const dataTestId = (btn.getAttribute("data-test-id") || btn.getAttribute("data-testid") || "").trim();
      const hasNextText = text.includes("\uB2E4\uC74C") || text.toLowerCase().includes("next") || text.toLowerCase().includes("continue") || text.includes("\uACC4\uC18D");
      const hasNextAria = ariaLabel && (ariaLabel.includes("\uB2E4\uC74C") || ariaLabel.toLowerCase().includes("next") || ariaLabel.toLowerCase().includes("continue") || ariaLabel.toLowerCase().includes("\uACC4\uC18D"));
      const hasTestId = dataTestId && (dataTestId.includes("next") || dataTestId === "next-button" || dataTestId.includes("continue"));
      if (!hasNextText && !hasNextAria && !hasTestId) continue;
      const progressInParent = satRoot.innerText && satRoot.innerText.match(/\d+\s*\/\s*27/);
      const choicesInParent = satRoot.querySelector('[role="radio"], [class*="choice"]');
      const rect = btn.getBoundingClientRect();
      const satRootRect = satRoot.getBoundingClientRect();
      filteredCandidates.push({
        button: btn,
        dataTestId,
        hasTestId: dataTestId === "next-button",
        rect,
        area: rect.width * rect.height,
        distanceFromBottomRight: {
          x: satRootRect.right - rect.right,
          y: satRootRect.bottom - rect.bottom
        },
        hasProgressInParent: !!progressInParent,
        hasChoicesInParent: !!choicesInParent
      });
    }
    console.log(`[SAT-DEBUG] selectNextButton: \uD544\uD130\uB9C1 \uD6C4 ${filteredCandidates.length}\uAC1C \uD6C4\uBCF4`);
    if (filteredCandidates.length === 0) {
      console.warn("[SAT-DEBUG] selectNextButton: \uD544\uD130\uB9C1 \uD6C4 \uD6C4\uBCF4 \uC5C6\uC74C");
      return null;
    }
    const withTestId = filteredCandidates.filter((c) => c.hasTestId);
    if (withTestId.length > 0) {
      console.log('[SAT-DEBUG] selectNextButton: data-testid="next-button" \uD6C4\uBCF4 \uC120\uD0DD');
      return withTestId[0].button;
    }
    filteredCandidates.sort((a, b) => {
      if (Math.abs(a.area - b.area) > 1e3) {
        return b.area - a.area;
      }
      const distA = Math.sqrt(a.distanceFromBottomRight.x ** 2 + a.distanceFromBottomRight.y ** 2);
      const distB = Math.sqrt(b.distanceFromBottomRight.x ** 2 + b.distanceFromBottomRight.y ** 2);
      return distA - distB;
    });
    const selected = filteredCandidates[0];
    console.log("[SAT-DEBUG] selectNextButton: \uC120\uD0DD\uB41C \uBC84\uD2BC:", {
      dataTestId: selected.dataTestId,
      area: selected.area,
      distanceFromBottomRight: selected.distanceFromBottomRight
    });
    return selected.button;
  }
  function findNavigationButton2(type, ...keywords) {
    if (type === "next") {
      const allButtons = deepQuerySelectorAll('button, [role="button"], div[role="button"]');
      const candidates = [];
      const DEBUG = true;
      console.log(`[SAT] Next \uBC84\uD2BC \uAC80\uC0C9 \uC2DC\uC791 (\uD6C4\uBCF4: ${allButtons.length}\uAC1C)`);
      const satRoot = findSatRoot();
      console.log(`[SAT-DEBUG] SAT root \uCEE8\uD14C\uC774\uB108:`, satRoot ? satRoot.tagName + (satRoot.className ? "." + satRoot.className.split(" ")[0] : "") : "null");
      for (const btn of allButtons) {
        if (!isElementVisible(btn)) continue;
        if (btn.disabled || btn.getAttribute("aria-disabled") === "true") continue;
        if (btn.tagName === "A") {
          const href = btn.getAttribute("href");
          const target = btn.getAttribute("target");
          if (href && (href.startsWith("http") || target === "_blank" || target === "_new")) {
            if (DEBUG) console.log("[SAT-DEBUG] \uB124\uBE44\uAC8C\uC774\uC158 \uB9C1\uD06C \uC81C\uC678:", href);
            continue;
          }
        }
        if (btn.hasAttribute("href") && btn.getAttribute("href") !== "#" && !btn.getAttribute("href").startsWith("javascript:")) {
          continue;
        }
        if (btn.getAttribute("target") === "_blank" || btn.getAttribute("target") === "_new") {
          continue;
        }
        const text = (btn.innerText || btn.textContent || "").trim();
        const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
        const dataTestId = (btn.getAttribute("data-test-id") || btn.getAttribute("data-testid") || "").trim();
        const title = (btn.getAttribute("title") || "").trim();
        const role = btn.getAttribute("role") || "";
        const tabindex = btn.getAttribute("tabindex") || "";
        const className = (btn.className || "").toLowerCase();
        const combinedText = `${text} ${ariaLabel} ${dataTestId} ${title}`.toLowerCase();
        const hasNextAria = ariaLabel && (ariaLabel.includes("\uB2E4\uC74C") || ariaLabel.toLowerCase().includes("next") || ariaLabel.toLowerCase().includes("continue") || ariaLabel.toLowerCase().includes("\uACC4\uC18D"));
        const hasTestId = dataTestId && (dataTestId.includes("next") || dataTestId === "next-button" || dataTestId.includes("continue"));
        const hasNextText = text === "\uB2E4\uC74C" || text.toLowerCase() === "next" || text.includes("\uB2E4\uC74C") || text.toLowerCase().includes("next") || text.toLowerCase().includes("continue") || text.includes("\uACC4\uC18D");
        const hasNextClass = className.includes("next") || className.includes("side-step");
        let hasLabelText = false;
        const label = btn.querySelector(".mdc-button__label");
        if (label) {
          const labelText = (label.textContent || "").trim();
          if (labelText === "\uB2E4\uC74C" || labelText.toLowerCase() === "next" || labelText.includes("\uB2E4\uC74C") || labelText.toLowerCase().includes("next")) {
            hasLabelText = true;
          }
        }
        let score = 0;
        if (hasNextAria) score += 10;
        if (hasTestId) score += 8;
        if (hasNextText) score += 5;
        if (hasLabelText) score += 4;
        if (hasNextClass) score += 2;
        if (role === "button") score += 1;
        if (score > 0) {
          const rect = btn.getBoundingClientRect();
          const style = window.getComputedStyle(btn);
          const isVisible = style.display !== "none" && style.visibility !== "hidden" && parseFloat(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
          const satRootAncestor = btn.closest("[data-sat-root]");
          const mainAncestor = btn.closest('main, [role="main"]');
          const progressContainer = satRoot && satRoot.contains(btn) ? satRoot : null;
          const progressText = (satRoot ? satRoot.innerText || satRoot.textContent : "").match(/\d+\s*\/\s*27/);
          const hasProgressInContainer = !!progressText;
          const dataset = {};
          for (const key in btn.dataset) {
            dataset[key] = btn.dataset[key];
          }
          let cssPath = btn.tagName.toLowerCase();
          if (btn.id) cssPath += "#" + btn.id;
          if (btn.className) {
            const firstClass = btn.className.split(" ")[0];
            if (firstClass) cssPath += "." + firstClass;
          }
          const outerHTMLSlice = btn.outerHTML.substring(0, 200);
          const candidateInfo = {
            button: btn,
            score,
            text: text.substring(0, 30),
            ariaLabel: ariaLabel.substring(0, 30),
            dataTestId: dataTestId.substring(0, 30),
            // STEP 0: 상세 정보
            dataset,
            role,
            tabindex,
            disabled: btn.disabled,
            ariaDisabled: btn.getAttribute("aria-disabled"),
            boundingClientRect: {
              x: rect.x,
              y: rect.y,
              width: rect.width,
              height: rect.height
            },
            isVisible,
            cssPath,
            outerHTMLSlice,
            satRootAncestor: satRootAncestor ? "found" : "none",
            mainAncestor: mainAncestor ? "found" : "none",
            inSatRoot: satRoot && satRoot.contains(btn),
            hasProgressInContainer
          };
          candidates.push(candidateInfo);
        }
      }
      if (DEBUG && candidates.length > 0) {
        console.log(`[SAT-DEBUG] Next \uBC84\uD2BC \uD6C4\uBCF4 \uC804\uCCB4 \uBAA9\uB85D (${candidates.length}\uAC1C):`);
        candidates.forEach((c, idx) => {
          console.log(`[SAT-DEBUG] \uD6C4\uBCF4 #${idx + 1}:`, {
            score: c.score,
            text: c.text,
            dataTestId: c.dataTestId,
            ariaLabel: c.ariaLabel,
            dataset: c.dataset,
            role: c.role,
            tabindex: c.tabindex,
            disabled: c.disabled,
            ariaDisabled: c.ariaDisabled,
            boundingClientRect: c.boundingClientRect,
            isVisible: c.isVisible,
            cssPath: c.cssPath,
            satRootAncestor: c.satRootAncestor,
            mainAncestor: c.mainAncestor,
            inSatRoot: c.inSatRoot,
            hasProgressInContainer: c.hasProgressInContainer,
            outerHTMLSlice: c.outerHTMLSlice
          });
        });
      }
      if (candidates.length > 0) {
        candidates.sort((a, b) => {
          const aHasTestId = a.dataTestId === "next-button" || a.dataTestId.includes("next-button");
          const bHasTestId = b.dataTestId === "next-button" || b.dataTestId.includes("next-button");
          if (aHasTestId && !bHasTestId) return -1;
          if (!aHasTestId && bHasTestId) return 1;
          if (b.score !== a.score) return b.score - a.score;
          const aRect = a.boundingClientRect;
          const bRect = b.boundingClientRect;
          const aPos = aRect.x + aRect.y;
          const bPos = bRect.x + bRect.y;
          return bPos - aPos;
        });
        const bestMatch = candidates[0];
        console.log(`[SAT] Next \uBC84\uD2BC \uBC1C\uACAC (\uC810\uC218: ${bestMatch.score}, \uD6C4\uBCF4: ${candidates.length}\uAC1C)`);
        console.log(`[SAT] \uC120\uD0DD\uB41C \uBC84\uD2BC: text="${bestMatch.text}", aria-label="${bestMatch.ariaLabel}", data-testid="${bestMatch.dataTestId}"`);
        console.log(`[NEXT-DEBUG] \uC120\uD0DD\uB41C \uBC84\uD2BC \uC0C1\uC138:`, {
          index: 0,
          textContent: bestMatch.text,
          ariaLabel: bestMatch.ariaLabel,
          role: bestMatch.role,
          dataTestId: bestMatch.dataTestId,
          className: bestMatch.cssPath,
          boundingClientRect: bestMatch.boundingClientRect,
          isVisible: bestMatch.isVisible,
          outerHTML: bestMatch.outerHTMLSlice,
          timestamp: Date.now()
        });
        if (candidates.length > 1) {
          console.log("[SAT] Next \uBC84\uD2BC \uD6C4\uBCF4 (top 3):", candidates.slice(0, 3).map((c, idx) => ({
            index: idx,
            score: c.score,
            text: c.text,
            ariaLabel: c.ariaLabel,
            dataTestId: c.dataTestId,
            role: c.role,
            boundingClientRect: c.boundingClientRect,
            isVisible: c.isVisible,
            inSatRoot: c.inSatRoot,
            hasProgressInContainer: c.hasProgressInContainer,
            outerHTML: c.outerHTMLSlice.substring(0, 100)
          })));
        }
        return bestMatch.button;
      }
      console.warn("[SAT] Next \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uD6C4\uBCF4:", candidates.length);
      return null;
    }
    if (type === "submit") {
      const allButtons = deepQuerySelectorAll('button, [role="button"]');
      const candidates = [];
      console.log(`[SAT] Submit \uBC84\uD2BC \uAC80\uC0C9 \uC2DC\uC791 (\uD6C4\uBCF4: ${allButtons.length}\uAC1C)`);
      for (const btn of allButtons) {
        if (!isElementVisible(btn) || btn.disabled) continue;
        const text = (btn.innerText || btn.textContent || "").trim();
        const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
        const dataTestId = (btn.getAttribute("data-test-id") || btn.getAttribute("data-testid") || "").trim();
        const title = (btn.getAttribute("title") || "").trim();
        const className = (btn.className || "").toLowerCase();
        const hasSubmitAria = ariaLabel && (ariaLabel.includes("\uC81C\uCD9C") || ariaLabel.toLowerCase().includes("submit") || ariaLabel.toLowerCase().includes("confirm"));
        const hasTestId = dataTestId && (dataTestId.includes("submit") || dataTestId.includes("confirm") || dataTestId === "submit-button");
        const hasSubmitText = text === "\uC81C\uCD9C" || text.toLowerCase() === "submit" || text.includes("\uC81C\uCD9C") || text.toLowerCase().includes("submit") || text.includes("\uD655\uC778") || text.toLowerCase().includes("confirm");
        const hasSubmitClass = className.includes("submit") || className.includes("confirm-submit");
        let hasLabelText = false;
        const label = btn.querySelector(".mdc-button__label");
        if (label) {
          const labelText = (label.textContent || "").trim();
          if (labelText === "\uC81C\uCD9C" || labelText.toLowerCase() === "submit") {
            hasLabelText = true;
          }
        }
        let score = 0;
        if (hasSubmitAria) score += 10;
        if (hasTestId) score += 8;
        if (hasSubmitText) score += 5;
        if (hasLabelText) score += 4;
        if (hasSubmitClass) score += 2;
        const dialog = btn.closest('.confirm-submit-dialog, [role="dialog"]');
        if (dialog) score += 3;
        if (score > 0) {
          candidates.push({
            button: btn,
            score,
            text: text.substring(0, 30),
            ariaLabel: ariaLabel.substring(0, 30),
            dataTestId: dataTestId.substring(0, 30)
          });
        }
      }
      if (candidates.length > 0) {
        candidates.sort((a, b) => b.score - a.score);
        const bestMatch = candidates[0];
        console.log(`[SAT] Submit \uBC84\uD2BC \uBC1C\uACAC (\uC810\uC218: ${bestMatch.score}, \uD6C4\uBCF4: ${candidates.length}\uAC1C)`);
        console.log(`[SAT] \uC120\uD0DD\uB41C \uBC84\uD2BC: text="${bestMatch.text}", aria-label="${bestMatch.ariaLabel}", data-testid="${bestMatch.dataTestId}"`);
        if (candidates.length > 1) {
          console.log("[SAT] Submit \uBC84\uD2BC \uD6C4\uBCF4 (top 3):", candidates.slice(0, 3).map((c) => ({
            score: c.score,
            text: c.text,
            ariaLabel: c.ariaLabel
          })));
        }
        return bestMatch.button;
      }
      console.warn("[SAT] Submit \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uD6C4\uBCF4:", candidates.length);
      return null;
    }
    if (type === "first") {
      const allButtons = document.querySelectorAll("button");
      for (const btn of allButtons) {
        const text = (btn.innerText || btn.textContent || "").trim().toLowerCase();
        if (text.includes("\uCC98\uC74C") || text.includes("first") || text === "1") {
          if (!btn.disabled && btn.offsetParent !== null) {
            return btn;
          }
        }
      }
      return null;
    }
    return null;
  }
  var init_query = __esm({
    "src/dom/query.js"() {
      init_deepQuery();
    }
  });

  // src/dom/extract.js
  var extract_exports = {};
  __export(extract_exports, {
    checkIfGraded: () => checkIfGraded,
    detectCorrectAnswer: () => detectCorrectAnswer,
    detectCurrentSection: () => detectCurrentSection,
    extractAnswer: () => extractAnswer,
    extractAnswerFromGradedUI: () => extractAnswerFromGradedUI,
    extractByTextPattern: () => extractByTextPattern,
    extractChoices: () => extractChoices,
    extractCurrentProblem: () => extractCurrentProblem,
    extractExplanation: () => extractExplanation,
    extractExplanationAfterGrading: () => extractExplanationAfterGrading,
    extractFigures: () => extractFigures,
    extractMathSection: () => extractMathSection,
    extractReadingSection: () => extractReadingSection,
    extractSATData: () => extractSATData,
    extractText: () => extractText,
    findSatRoot: () => findSatRoot,
    getCurrentProblemNumber: () => getCurrentProblemNumber,
    getProgressState: () => getProgressState,
    getQuestionSignature: () => getQuestionSignature,
    isGraded: () => isGraded,
    isModuleStartScreen: () => isModuleStartScreen,
    isQuestionScreen: () => isQuestionScreen,
    waitForAnswerUIWithNextButtonCheck: () => waitForAnswerUIWithNextButtonCheck,
    waitForGrading: () => waitForGrading
  });
  function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
  async function extractImageFromImg(img) {
    try {
      const src = img.currentSrc || img.src;
      if (!src) return null;
      if (src.startsWith("data:")) {
        const rect = img.getBoundingClientRect();
        return {
          dataUrl: src,
          width: rect.width || img.naturalWidth || 100,
          height: rect.height || img.naturalHeight || 100
        };
      }
      if (src.startsWith("blob:") || src.startsWith("http://") || src.startsWith("https://")) {
        if (img.tagName === "IMG") {
          img.crossOrigin = "anonymous";
        }
        try {
          const response = await fetch(src);
          if (!response.ok) {
            console.warn(`[FIGURE] \uC774\uBBF8\uC9C0 fetch \uC2E4\uD328: ${src} (status: ${response.status})`);
            return null;
          }
          const blob = await response.blob();
          const dataUrl = await blobToDataURL(blob);
          const rect = img.getBoundingClientRect();
          return {
            dataUrl,
            width: rect.width || img.naturalWidth || 100,
            height: rect.height || img.naturalHeight || 100
          };
        } catch (fetchError) {
          console.warn(`[FIGURE] \uC774\uBBF8\uC9C0 fetch \uC624\uB958: ${src}`, fetchError);
          return null;
        }
      }
      return null;
    } catch (error) {
      console.warn("[FIGURE] extractImageFromImg \uC624\uB958:", error);
      return null;
    }
  }
  function extractImageFromCanvas(canvas) {
    try {
      const dataUrl = canvas.toDataURL("image/png");
      return {
        dataUrl,
        width: canvas.width || canvas.getBoundingClientRect().width,
        height: canvas.height || canvas.getBoundingClientRect().height
      };
    } catch (error) {
      console.warn("[FIGURE] extractImageFromCanvas \uC624\uB958 (tainted canvas \uAC00\uB2A5):", error);
      return null;
    }
  }
  async function extractImageFromSVG(svg) {
    try {
      const rect = svg.getBoundingClientRect();
      const width = rect.width || 100;
      const height = rect.height || 100;
      const svgString = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
      const svgUrl = URL.createObjectURL(svgBlob);
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          try {
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, width, height);
            const dataUrl = canvas.toDataURL("image/png");
            URL.revokeObjectURL(svgUrl);
            resolve({ dataUrl, width, height });
          } catch (error) {
            console.warn("[FIGURE] SVG canvas draw \uC624\uB958:", error);
            URL.revokeObjectURL(svgUrl);
            resolve(null);
          }
        };
        img.onerror = () => {
          console.warn("[FIGURE] SVG \uC774\uBBF8\uC9C0 \uB85C\uB4DC \uC2E4\uD328");
          URL.revokeObjectURL(svgUrl);
          resolve(null);
        };
        img.src = svgUrl;
      });
    } catch (error) {
      console.warn("[FIGURE] extractImageFromSVG \uC624\uB958:", error);
      return null;
    }
  }
  async function extractImageFromBackground(el) {
    try {
      const style = window.getComputedStyle(el);
      const bgImage = style.backgroundImage;
      if (!bgImage || bgImage === "none") return null;
      const match = bgImage.match(/url\(["']?([^"']+)["']?\)/);
      if (!match) return null;
      const url = match[1];
      if (url.startsWith("data:")) {
        const rect = el.getBoundingClientRect();
        return {
          dataUrl: url,
          width: rect.width,
          height: rect.height
        };
      }
      if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("blob:")) {
        try {
          const response = await fetch(url);
          if (!response.ok) return null;
          const blob = await response.blob();
          const dataUrl = await blobToDataURL(blob);
          const rect = el.getBoundingClientRect();
          return {
            dataUrl,
            width: rect.width,
            height: rect.height
          };
        } catch (error) {
          console.warn("[FIGURE] background-image fetch \uC624\uB958:", error);
          return null;
        }
      }
      return null;
    } catch (error) {
      console.warn("[FIGURE] extractImageFromBackground \uC624\uB958:", error);
      return null;
    }
  }
  async function extractImageWithHtml2Canvas(el) {
    try {
      let html2canvas2 = null;
      if (window.html2canvas) {
        html2canvas2 = window.html2canvas;
      } else if (window.jspdf && window.jspdf.html2canvas) {
        html2canvas2 = window.jspdf.html2canvas;
      } else {
        console.warn("[FIGURE] html2canvas\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4");
        return null;
      }
      const canvas = await html2canvas2(el, {
        backgroundColor: "#fff",
        scale: 2,
        // 해상도 향상
        useCORS: true,
        allowTaint: false,
        logging: false
      });
      const dataUrl = canvas.toDataURL("image/png");
      return {
        dataUrl,
        width: canvas.width,
        height: canvas.height
      };
    } catch (error) {
      console.warn("[FIGURE] html2canvas \uC624\uB958:", error);
      return null;
    }
  }
  function findFigureCandidates(satRoot) {
    const candidates = [];
    const MIN_SIZE = 60;
    const figureSelectors = [
      "figure",
      ".figure",
      '[data-testid*="figure"]',
      '[data-testid*="image"]',
      '[data-testid*="graph"]',
      '[data-testid*="chart"]',
      '[class*="figure"]',
      '[class*="image"]',
      '[class*="illustration"]',
      '[class*="diagram"]',
      '[class*="media"]'
    ];
    for (const selector of figureSelectors) {
      const elements = deepQuerySelectorAll(selector, satRoot);
      for (const el of elements) {
        if (!isElementVisible(el)) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width >= MIN_SIZE && rect.height >= MIN_SIZE) {
          if (!candidates.find((c) => c.element === el)) {
            candidates.push({ element: el, type: "container", selector });
          }
        }
      }
    }
    const imageSelectors = ["img", "svg", "canvas"];
    for (const selector of imageSelectors) {
      const elements = deepQuerySelectorAll(selector, satRoot);
      for (const el of elements) {
        if (!isElementVisible(el)) continue;
        const rect = el.getBoundingClientRect();
        if (rect.width >= MIN_SIZE && rect.height >= MIN_SIZE) {
          const parent = el.closest('[role="radio"], button, [class*="button"], [class*="icon"]');
          if (parent && (parent.getBoundingClientRect().width < 100 || parent.getBoundingClientRect().height < 100)) {
            continue;
          }
          if (!candidates.find((c) => c.element === el)) {
            candidates.push({ element: el, type: selector, selector });
          }
        }
      }
    }
    console.log(`[FIGURE] figure \uD6C4\uBCF4 \uBC1C\uACAC: ${candidates.length}\uAC1C`);
    candidates.forEach((candidate, idx) => {
      const rect = candidate.element.getBoundingClientRect();
      const tagName = candidate.element.tagName;
      const className = candidate.element.className ? candidate.element.className.substring(0, 50) : "";
      const src = candidate.element.src || candidate.element.getAttribute("src") || "";
      console.log(`[FIGURE] \uD6C4\uBCF4 ${idx + 1}: tagName=${tagName}, type=${candidate.type}, rect=(${rect.width.toFixed(0)}x${rect.height.toFixed(0)}), src=${src.substring(0, 50)}, className=${className}`);
    });
    return candidates;
  }
  async function convertFigureToImage(element) {
    const tagName = element.tagName.toLowerCase();
    if (tagName === "img") {
      const result = await extractImageFromImg(element);
      if (result) {
        console.log(`[FIGURE] <img> \uCD94\uCD9C \uC131\uACF5: ${result.width}x${result.height}`);
        return result;
      }
    }
    if (tagName === "canvas") {
      const result = extractImageFromCanvas(element);
      if (result) {
        console.log(`[FIGURE] <canvas> \uCD94\uCD9C \uC131\uACF5: ${result.width}x${result.height}`);
        return result;
      }
    }
    if (tagName === "svg") {
      const result = await extractImageFromSVG(element);
      if (result) {
        console.log(`[FIGURE] <svg> \uCD94\uCD9C \uC131\uACF5: ${result.width}x${result.height}`);
        return result;
      }
    }
    const bgResult = await extractImageFromBackground(element);
    if (bgResult) {
      console.log(`[FIGURE] background-image \uCD94\uCD9C \uC131\uACF5: ${bgResult.width}x${bgResult.height}`);
      return bgResult;
    }
    console.log(`[FIGURE] html2canvas \uD3F4\uBC31 \uC2DC\uB3C4: ${tagName}`);
    const html2canvasResult = await extractImageWithHtml2Canvas(element);
    if (html2canvasResult) {
      console.log(`[FIGURE] html2canvas \uCD94\uCD9C \uC131\uACF5: ${html2canvasResult.width}x${html2canvasResult.height}`);
      return html2canvasResult;
    }
    return null;
  }
  async function extractFigures(satRoot) {
    const figures = [];
    let html2canvasCount = 0;
    console.log(`[DEBUG STEP 2] extractFigures \uC9C4\uC785`);
    fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractFigures:entry", message: "DEBUG STEP 2: extractFigures \uC9C4\uC785", data: { satRootFound: !!satRoot }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
    });
    try {
      const imgCount = satRoot.querySelectorAll("img").length;
      const canvasCount = satRoot.querySelectorAll("canvas").length;
      const svgCount = satRoot.querySelectorAll("svg").length;
      const bgImageElements = Array.from(satRoot.querySelectorAll("*")).filter((el) => {
        try {
          const style = window.getComputedStyle(el);
          return style.backgroundImage && style.backgroundImage !== "none";
        } catch {
          return false;
        }
      }).length;
      console.log(`[DEBUG STEP 2] \uAE30\uBCF8 \uC140\uB809\uD130 \uACB0\uACFC: img=${imgCount}, canvas=${canvasCount}, svg=${svgCount}, background-image=${bgImageElements}`);
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractFigures:beforeFindCandidates", message: "DEBUG STEP 2: \uD6C4\uBCF4 \uD0D0\uC0C9 \uC804 \uAE30\uBCF8 \uC140\uB809\uD130 \uAC80\uC99D", data: { imgCount, canvasCount, svgCount, bgImageElements }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
      });
      const candidates = findFigureCandidates(satRoot);
      fetch("http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractFigures:afterFindCandidates", message: "math image extract: candidates count", data: { imgCount, canvasCount, svgCount, candidatesCount: candidates.length }, timestamp: Date.now(), hypothesisId: "H3" }) }).catch(() => {
      });
      console.log(`[DEBUG STEP 2] findFigureCandidates \uACB0\uACFC: ${candidates.length}\uAC1C \uD6C4\uBCF4`);
      const candidateDetails = candidates.map((c, idx) => {
        const rect = c.element.getBoundingClientRect();
        const style = window.getComputedStyle(c.element);
        return {
          idx: idx + 1,
          tagName: c.element.tagName,
          type: c.type,
          width: rect.width,
          height: rect.height,
          minSizeFilter: rect.width >= 80 && rect.height >= 80,
          backgroundImage: style.backgroundImage && style.backgroundImage !== "none" ? style.backgroundImage.substring(0, 100) : null,
          src: c.element.src || c.element.getAttribute("src") || ""
        };
      });
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractFigures:afterFindCandidates", message: "DEBUG STEP 2: \uD6C4\uBCF4 \uD0D0\uC0C9 \uACB0\uACFC", data: { candidatesCount: candidates.length, candidateDetails }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
      });
      for (const candidate of candidates) {
        try {
          const rect = candidate.element.getBoundingClientRect();
          console.log(`[DEBUG STEP 2] \uD6C4\uBCF4 \uBCC0\uD658 \uC2DC\uB3C4: ${candidate.element.tagName}, ${rect.width}x${rect.height}`);
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractFigures:beforeConvert", message: "DEBUG STEP 2: \uD6C4\uBCF4 \uBCC0\uD658 \uC2DC\uB3C4", data: { tagName: candidate.element.tagName, width: rect.width, height: rect.height, type: candidate.type }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
          });
          const imageData = await convertFigureToImage(candidate.element);
          console.log(`[DEBUG STEP 2] \uD6C4\uBCF4 \uBCC0\uD658 \uACB0\uACFC: ${imageData ? "\uC131\uACF5" : "\uC2E4\uD328"}`);
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractFigures:afterConvert", message: "DEBUG STEP 2: \uD6C4\uBCF4 \uBCC0\uD658 \uACB0\uACFC", data: { tagName: candidate.element.tagName, success: !!imageData, imageData: imageData ? { w: imageData.width, h: imageData.height, hasDataUrl: !!imageData.dataUrl } : null }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
          });
          if (imageData) {
            figures.push(imageData);
            if (candidate.type === "container" || candidate.type === "div" || candidate.type === "span") {
              html2canvasCount++;
            }
          }
        } catch (error) {
          console.warn(`[FIGURE] figure \uBCC0\uD658 \uC2E4\uD328 (\uACC4\uC18D \uC9C4\uD589):`, error);
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractFigures:convertError", message: "DEBUG STEP 2: \uD6C4\uBCF4 \uBCC0\uD658 \uC624\uB958", data: { tagName: candidate.element.tagName, errorMessage: error.message }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
          });
        }
      }
      fetch("http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractFigures:complete", message: "math image extract: figures result", data: { figuresLength: figures.length, html2canvasCount, candidatesCount: candidates.length }, timestamp: Date.now(), hypothesisId: "H4" }) }).catch(() => {
      });
      console.log(`[DEBUG STEP 2] extractFigures \uC644\uB8CC: ${figures.length}\uAC1C figure \uCD94\uCD9C`);
      console.log(`[FIGURE] \uCD1D ${figures.length}\uAC1C figure \uCD94\uCD9C \uC644\uB8CC (html2canvas \uC0AC\uC6A9: ${html2canvasCount}\uAC1C)`);
    } catch (error) {
      console.warn("[FIGURE] extractFigures \uC804\uCCB4 \uC624\uB958 (\uBE48 \uBC30\uC5F4 \uBC18\uD658):", error);
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractFigures:error", message: "DEBUG STEP 2: extractFigures \uC804\uCCB4 \uC624\uB958", data: { errorMessage: error.message, errorStack: error.stack }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
      });
    }
    return figures;
  }
  function isModuleStartScreen() {
    const searchRoot = document.body;
    const text = (searchRoot.innerText || searchRoot.textContent || "").trim();
    const textLower = text.toLowerCase();
    const btnLabels = ["\uBAA8\uB4C8 2 \uC2DC\uC791", "Module 2", "Start Module", "\uC2DC\uC791"];
    const buttons = searchRoot.querySelectorAll('button, [role="button"], a, .mat-mdc-button, .mdc-button');
    const hasModule2StartButton = Array.from(buttons).some((btn) => {
      const rect = btn.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return false;
      if (btn.disabled) return false;
      const btnText = (btn.innerText || btn.textContent || "").trim();
      return btnLabels.some((label) => btnText.includes(label) || btnText.includes("\uBAA8\uB4C8 2") && btnText.includes("\uC2DC\uC791"));
    });
    const hasNextModule2Phrase = text.includes("\uB2E4\uC74C: Reading and Writing \uBAA8\uB4C8 2") || textLower.includes("reading and writing") && textLower.includes("\uBAA8\uB4C8 2");
    const progress = getProgressState();
    const hasProgress = progress !== null && /\d+\s*\/\s*27/.test(progress);
    const hasChoices = !!(searchRoot.querySelector('[role="radio"]') || searchRoot.querySelector('button[aria-label*="Choice"]'));
    const noProgressNoChoices = !hasProgress && !hasChoices;
    const result = noProgressNoChoices && (hasModule2StartButton || hasNextModule2Phrase);
    if (result) {
      console.log("[SAT PDF Exporter] Module Start Screen \uAC10\uC9C0\uB428:", { hasModule2StartButton, hasNextModule2Phrase });
    }
    return result;
  }
  function isQuestionScreen() {
    const hasChoices = !!(document.querySelector('[role="radio"]') || document.querySelector('button[aria-label*="Choice"]') || document.querySelector('button[class*="choice"]') || document.querySelector('[class*="option"]'));
    const problemNum = getCurrentProblemNumber();
    const hasProblemNumber = problemNum > 0 && (problemNum <= 27 || problemNum <= 22);
    const progress = getProgressState();
    const hasProgress = progress !== null && (progress.includes("/27") || progress.includes("/22"));
    const bodyText = (document.body.innerText || "").toLowerCase();
    const hasQuestionPattern = bodyText.includes("which choice") || bodyText.includes("what") || bodyText.includes("based on") || bodyText.includes("\uBB38\uC81C") || /^\d+\./.test(bodyText);
    const hasSubjectiveInput = !!document.querySelector('input[placeholder*="\uC785\uB825"], input[placeholder*="\uC5EC\uAE30\uC5D0"], input[placeholder*="Enter"], textarea[placeholder*="\uC785\uB825"]');
    const result = hasChoices || hasProblemNumber && hasProgress || hasQuestionPattern || hasSubjectiveInput;
    console.log(`[SAT PDF Exporter] \uBB38\uC81C \uD654\uBA74 \uD310\uBCC4: choices=${hasChoices}, problemNum=${problemNum}, progress=${progress}, pattern=${hasQuestionPattern}, subjectiveInput=${hasSubjectiveInput} \u2192 ${result}`);
    fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:isQuestionScreen", message: "isQuestionScreen result", data: { hasChoices, problemNum, hasProblemNumber, progress, hasProgress, hasQuestionPattern, result, bodyTextPreview: bodyText.substring(0, 100) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "C" }) }).catch(() => {
    });
    return result;
  }
  function detectCurrentSection() {
    const bodyText = (document.body.innerText || document.body.textContent || "").toLowerCase();
    const readingKeywords = [
      "reading and writing",
      "reading",
      "passage",
      "text 1",
      "text 2",
      "which choice",
      "best states",
      "best expresses",
      "main purpose"
    ];
    const mathKeywords = [
      "math",
      "\uC218\uD559",
      "calculator",
      "equation",
      "solve for",
      "what is the value",
      "if x =",
      "graph"
    ];
    let readingScore = 0;
    let mathScore = 0;
    for (const keyword of readingKeywords) {
      if (bodyText.includes(keyword)) {
        readingScore++;
      }
    }
    for (const keyword of mathKeywords) {
      if (bodyText.includes(keyword)) {
        mathScore++;
      }
    }
    const sectionHeaders = document.querySelectorAll('h1, h2, h3, [class*="section"], [class*="title"]');
    for (const header of sectionHeaders) {
      const text = (header.innerText || header.textContent || "").toLowerCase();
      if (text.includes("reading") || text.includes("writing")) {
        readingScore += 2;
      }
      if (text.includes("math") || text.includes("\uC218\uD559")) {
        mathScore += 2;
      }
    }
    if (readingScore > mathScore && readingScore > 0) {
      console.log(`[SAT PDF Exporter] detected section: reading (score: ${readingScore} vs ${mathScore})`);
      return "reading";
    } else if (mathScore > readingScore && mathScore > 0) {
      console.log(`[SAT PDF Exporter] detected section: math (score: ${mathScore} vs ${readingScore})`);
      return "math";
    }
    console.warn(`[SAT PDF Exporter] \uC139\uC158 \uAC10\uC9C0 \uC2E4\uD328 (reading: ${readingScore}, math: ${mathScore}). unknown\uC73C\uB85C \uCC98\uB9AC`);
    return "unknown";
  }
  function extractChoices(container) {
    if (window !== window.top && !window.__SAT_IS_WORKER) {
      console.warn("[SAT-DEBUG] [extractChoices] Worker frame\uC774 \uC544\uB2CC iframe\uC5D0\uC11C \uC2E4\uD589 \uC2DC\uB3C4 - \uC2A4\uD0B5");
      return [];
    }
    const choices = [];
    const candidates = [];
    const radioElements = deepQuerySelectorAll('[role="radio"]', container);
    console.log(`[SAT-DEBUG] [extractChoices] Priority 1 (role="radio"): ${radioElements.length}\uAC1C \uBC1C\uACAC`);
    for (const el of radioElements) {
      if (!isElementVisible(el) || el.disabled) continue;
      const text = (el.innerText || el.textContent || "").trim();
      const ariaLabel = (el.getAttribute("aria-label") || "").trim();
      const ariaChecked = el.getAttribute("aria-checked");
      let choiceLetter = null;
      if (ariaLabel) {
        const match = ariaLabel.match(/choice\s*([A-D])/i) || ariaLabel.match(/^([A-D])[\.\)]?/i);
        if (match) choiceLetter = match[1].toUpperCase();
      }
      if (!choiceLetter) {
        const textMatch = text.match(/^([A-D])[\.\)]?\s*/);
        if (textMatch) choiceLetter = textMatch[1].toUpperCase();
      }
      if (!choiceLetter) {
        const testId = el.getAttribute("data-testid") || "";
        const testIdMatch = testId.match(/choice[_-]?([A-D])/i) || testId.match(/option[_-]?([A-D])/i);
        if (testIdMatch) choiceLetter = testIdMatch[1].toUpperCase();
      }
      if (!choiceLetter) {
        const existingLetters = candidates.map((c) => c.label).filter((l) => l >= "A" && l <= "D");
        const availableLetters = ["A", "B", "C", "D"].filter((l) => !existingLetters.includes(l));
        if (availableLetters.length > 0) {
          choiceLetter = availableLetters[0];
        }
      }
      if (choiceLetter && choiceLetter >= "A" && choiceLetter <= "D") {
        const choiceText = text.replace(/^[A-D][\.\)]\s*/, "").trim() || ariaLabel || "\uC120\uD0DD\uC9C0";
        if (!candidates.find((c) => c.label === choiceLetter && c.element === el)) {
          candidates.push({
            label: choiceLetter,
            text: choiceText,
            element: el,
            priority: 1,
            source: 'role="radio"'
          });
        }
      }
    }
    if (candidates.length < 4) {
      const radioInputs = deepQuerySelectorAll('input[type="radio"]', container);
      console.log(`[SAT-DEBUG] [extractChoices] Priority 2 (input[type="radio"]): ${radioInputs.length}\uAC1C \uBC1C\uACAC`);
      for (const input of radioInputs) {
        if (!isElementVisible(input) || input.disabled) continue;
        let labelEl = null;
        const inputId = input.getAttribute("id");
        if (inputId) {
          labelEl = container.querySelector(`label[for="${inputId}"]`);
        }
        if (!labelEl && input.parentElement && input.parentElement.tagName === "LABEL") {
          labelEl = input.parentElement;
        }
        const labelText = labelEl ? (labelEl.innerText || labelEl.textContent || "").trim() : "";
        const inputAriaLabel = input.getAttribute("aria-label") || "";
        const text = labelText || inputAriaLabel;
        let choiceLetter = null;
        const match = text.match(/^([A-D])[\.\)]?\s*/) || inputAriaLabel.match(/choice\s*([A-D])/i);
        if (match) {
          choiceLetter = match[1].toUpperCase();
        } else {
          const existingLetters = candidates.map((c) => c.label).filter((l) => l >= "A" && l <= "D");
          const availableLetters = ["A", "B", "C", "D"].filter((l) => !existingLetters.includes(l));
          if (availableLetters.length > 0) {
            choiceLetter = availableLetters[0];
          }
        }
        if (choiceLetter && choiceLetter >= "A" && choiceLetter <= "D") {
          const choiceText = text.replace(/^[A-D][\.\)]\s*/, "").trim() || "\uC120\uD0DD\uC9C0";
          const targetElement = labelEl || input;
          if (!candidates.find((c) => c.element === targetElement)) {
            candidates.push({
              label: choiceLetter,
              text: choiceText,
              element: targetElement,
              priority: 2,
              source: 'input[type="radio"] + label'
            });
          }
        }
      }
    }
    if (candidates.length < 4) {
      const ariaCheckedElements = deepQuerySelectorAll("[aria-checked], [aria-selected]", container);
      console.log(`[SAT-DEBUG] [extractChoices] Priority 3 (aria-checked/selected): ${ariaCheckedElements.length}\uAC1C \uBC1C\uACAC`);
      for (const el of ariaCheckedElements) {
        if (!isElementVisible(el) || el.disabled) continue;
        if (candidates.find((c) => c.element === el)) continue;
        const text = (el.innerText || el.textContent || "").trim();
        const ariaLabel = (el.getAttribute("aria-label") || "").trim();
        let choiceLetter = null;
        const match = text.match(/^([A-D])[\.\)]?\s*/) || ariaLabel.match(/choice\s*([A-D])/i) || ariaLabel.match(/^([A-D])[\.\)]?/i);
        if (match) {
          choiceLetter = match[1].toUpperCase();
        } else {
          const existingLetters = candidates.map((c) => c.label).filter((l) => l >= "A" && l <= "D");
          const availableLetters = ["A", "B", "C", "D"].filter((l) => !existingLetters.includes(l));
          if (availableLetters.length > 0) {
            choiceLetter = availableLetters[0];
          }
        }
        if (choiceLetter && choiceLetter >= "A" && choiceLetter <= "D") {
          const choiceText = text.replace(/^[A-D][\.\)]\s*/, "").trim() || ariaLabel || "\uC120\uD0DD\uC9C0";
          if (!candidates.find((c) => c.label === choiceLetter && c.element === el)) {
            candidates.push({
              label: choiceLetter,
              text: choiceText,
              element: el,
              priority: 3,
              source: "aria-checked/selected"
            });
          }
        }
      }
    }
    if (candidates.length < 4) {
      const optionElements = deepQuerySelectorAll('[role="option"]', container);
      console.log(`[SAT-DEBUG] [extractChoices] Priority 4 (role="option"): ${optionElements.length}\uAC1C \uBC1C\uACAC`);
      for (const el of optionElements) {
        if (!isElementVisible(el) || el.disabled) continue;
        if (candidates.find((c) => c.element === el)) continue;
        const text = (el.innerText || el.textContent || "").trim();
        const ariaLabel = (el.getAttribute("aria-label") || "").trim();
        let choiceLetter = null;
        const match = text.match(/^([A-D])[\.\)]?\s*/) || ariaLabel.match(/choice\s*([A-D])/i);
        if (match) {
          choiceLetter = match[1].toUpperCase();
        } else {
          const existingLetters = candidates.map((c) => c.label).filter((l) => l >= "A" && l <= "D");
          const availableLetters = ["A", "B", "C", "D"].filter((l) => !existingLetters.includes(l));
          if (availableLetters.length > 0) {
            choiceLetter = availableLetters[0];
          }
        }
        if (choiceLetter && choiceLetter >= "A" && choiceLetter <= "D") {
          const choiceText = text.replace(/^[A-D][\.\)]\s*/, "").trim() || ariaLabel || "\uC120\uD0DD\uC9C0";
          if (!candidates.find((c) => c.label === choiceLetter && c.element === el)) {
            candidates.push({
              label: choiceLetter,
              text: choiceText,
              element: el,
              priority: 4,
              source: 'role="option"'
            });
          }
        }
      }
    }
    candidates.sort((a, b) => {
      if (a.priority !== b.priority) return a.priority - b.priority;
      return a.label.localeCompare(b.label);
    });
    const seenLabels = /* @__PURE__ */ new Set();
    for (const candidate of candidates) {
      if (candidate.label >= "A" && candidate.label <= "D" && !seenLabels.has(candidate.label)) {
        choices.push({
          label: candidate.label,
          text: candidate.text
        });
        seenLabels.add(candidate.label);
      }
    }
    console.log(`[SAT-DEBUG] [extractChoices] \uCD1D \uD6C4\uBCF4: ${candidates.length}\uAC1C, \uCD94\uCD9C\uB41C \uC120\uD0DD\uC9C0: ${choices.length}\uAC1C`);
    if (candidates.length > 0) {
      const first5 = candidates.slice(0, 5).map((c) => ({
        label: c.label,
        text: c.text.substring(0, 30) + (c.text.length > 30 ? "..." : ""),
        source: c.source
      }));
      console.log(`[SAT-DEBUG] [extractChoices] \uCCAB 5\uAC1C \uD6C4\uBCF4:`, first5);
    }
    if (candidates.length < 4) {
      console.log(`[SAT-DEBUG] [extractChoices] Priority 5 (\uD14D\uC2A4\uD2B8 \uAE30\uBC18 \uD3F4\uBC31): \uD074\uB9AD \uAC00\uB2A5\uD55C \uC694\uC18C \uD0D0\uC0C9`);
      const allClickable = Array.from(container.querySelectorAll('button, [role="button"], [tabindex], [data-testid], div[onclick], span[onclick]'));
      console.log(`[SAT-DEBUG] [extractChoices] \uC804\uCCB4 \uD074\uB9AD \uAC00\uB2A5 \uC694\uC18C: ${allClickable.length}\uAC1C`);
      const visibleClickable = allClickable.filter((el) => {
        try {
          const r = el.getBoundingClientRect();
          if (r.width < 20 || r.height < 20) return false;
          if (r.bottom < 0 || r.top > window.innerHeight) return false;
          const style = window.getComputedStyle(el);
          if (style.visibility === "hidden" || style.display === "none" || style.opacity === "0") return false;
          return true;
        } catch (e) {
          return false;
        }
      });
      console.log(`[SAT-DEBUG] [extractChoices] \uD654\uBA74\uC5D0 \uBCF4\uC774\uB294 \uD074\uB9AD \uAC00\uB2A5 \uC694\uC18C: ${visibleClickable.length}\uAC1C`);
      for (const el of visibleClickable) {
        if (el.disabled) continue;
        if (candidates.find((c) => c.element === el)) continue;
        const text = (el.innerText || el.textContent || "").trim();
        const ariaLabel = (el.getAttribute("aria-label") || "").trim();
        const combinedText = (text + " " + ariaLabel).trim();
        let choiceLetter = null;
        const patterns = [
          /^(A|B|C|D)\b/i,
          /\b(A|B|C|D)\b/i,
          /^(A|B|C|D)[\.\)]\s*/i,
          /choice\s*(A|B|C|D)/i,
          /option\s*(A|B|C|D)/i,
          /선택지\s*(A|B|C|D)/i
        ];
        for (const pattern of patterns) {
          const match = combinedText.match(pattern);
          if (match) {
            choiceLetter = match[1].toUpperCase();
            break;
          }
        }
        if (choiceLetter && choiceLetter >= "A" && choiceLetter <= "D") {
          const existingLetters = candidates.map((c) => c.label).filter((l) => l >= "A" && l <= "D");
          if (!existingLetters.includes(choiceLetter)) {
            const choiceText = text.replace(/^(A|B|C|D)[\.\)]\s*/i, "").trim() || ariaLabel || "\uC120\uD0DD\uC9C0";
            candidates.push({
              label: choiceLetter,
              text: choiceText,
              element: el,
              priority: 5,
              source: "\uD14D\uC2A4\uD2B8 \uAE30\uBC18 \uD3F4\uBC31"
            });
            console.log(`[SAT-DEBUG] [extractChoices] \uD14D\uC2A4\uD2B8 \uAE30\uBC18 \uD6C4\uBCF4 \uBC1C\uACAC: ${choiceLetter} - ${choiceText.substring(0, 30)}`);
          }
        }
      }
      candidates.sort((a, b) => {
        if (a.priority !== b.priority) return a.priority - b.priority;
        return a.label.localeCompare(b.label);
      });
      choices.length = 0;
      const seenLabels2 = /* @__PURE__ */ new Set();
      for (const candidate of candidates) {
        if (candidate.label >= "A" && candidate.label <= "D" && !seenLabels2.has(candidate.label)) {
          choices.push({
            label: candidate.label,
            text: candidate.text,
            element: candidate.element,
            // ★ element 포함 (클릭에 필요)
            source: candidate.source || "unknown",
            priority: candidate.priority || 5
          });
          seenLabels2.add(candidate.label);
        }
      }
    }
    if (choices.length === 0) {
      console.warn("[SAT PDF Exporter] \uBAA8\uB4E0 \uBC29\uBC95\uC73C\uB85C \uC120\uD0DD\uC9C0\uB97C \uCC3E\uC9C0 \uBABB\uD568 - \uC21C\uC218 \uD14D\uC2A4\uD2B8 \uAE30\uBC18 \uD3F4\uBC31 \uC2DC\uB3C4");
      const allElements = Array.from(container.querySelectorAll('div, span, p, li, button, [role="button"], label')).filter((el) => {
        try {
          const r = el.getBoundingClientRect();
          return r.width >= 20 && r.height >= 20 && r.bottom >= 0 && r.top <= window.innerHeight;
        } catch {
          return false;
        }
      });
      allElements.sort((a, b) => a.getBoundingClientRect().width * a.getBoundingClientRect().height - b.getBoundingClientRect().width * b.getBoundingClientRect().height);
      const seenLabels2 = /* @__PURE__ */ new Set();
      for (const el of allElements) {
        const text = (el.innerText || el.textContent || "").trim();
        const m = text.match(/^([A-D])[\.\)]\s*([\s\S]+)$/);
        if (!m || m[1] < "A" || m[1] > "D" || seenLabels2.has(m[1]) || text.length > 500) continue;
        if (/[B-D][\.\)]/g.test(text.replace(m[0], ""))) continue;
        seenLabels2.add(m[1]);
        choices.push({
          label: m[1],
          text: m[2].trim().substring(0, 100),
          element: el,
          priority: 5,
          source: "\uD14D\uC2A4\uD2B8 \uAE30\uBC18 \uD3F4\uBC31"
        });
        console.log(`[SAT-DEBUG] [extractChoices] \uD14D\uC2A4\uD2B8 \uAE30\uBC18 \uD6C4\uBCF4 \uBC1C\uACAC: ${m[1]} - ${m[2].trim().substring(0, 30)}`);
        if (choices.length >= 4) break;
      }
      if (choices.length >= 2) {
        console.log(`[SAT-DEBUG] [extractChoices] \uD14D\uC2A4\uD2B8 \uAE30\uBC18 \uCD94\uCD9C \uC131\uACF5: ${choices.length}\uAC1C (element \uD3EC\uD568)`);
      }
    }
    return choices;
  }
  async function extractCurrentProblem(sectionType) {
    if (window !== window.top && !window.__SAT_IS_WORKER) {
      console.warn("[SAT-DEBUG] [extractCurrentProblem] Worker frame\uC774 \uC544\uB2CC iframe\uC5D0\uC11C \uC2E4\uD589 \uC2DC\uB3C4 - \uC2A4\uD0B5");
      fetch("http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractCurrentProblem:frameGuard", message: "math image extract: return null (frame guard)", data: { sectionType }, timestamp: Date.now(), hypothesisId: "H1" }) }).catch(() => {
      });
      return null;
    }
    await new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          resolve();
        });
      });
    });
    await new Promise((resolve) => setTimeout(resolve, 150));
    let problemNum = getCurrentProblemNumber();
    const progressState = getProgressState();
    if (!problemNum || problemNum <= 0) {
      if (progressState) {
        const progressMatch = progressState.match(/(\d+)\s*\/\s*\d+/);
        if (progressMatch) {
          problemNum = parseInt(progressMatch[1]);
          console.log(`[SAT-DEBUG] [extractCurrentProblem] problemNumber \uD3F4\uBC31 1: progress\uC5D0\uC11C \uD30C\uC2F1 \u2192 ${problemNum}`);
        }
      }
    }
    if (!problemNum || problemNum <= 0) {
      if (!window.__SAT_PROBLEM_COUNTER) {
        window.__SAT_PROBLEM_COUNTER = 0;
      }
      window.__SAT_PROBLEM_COUNTER++;
      problemNum = window.__SAT_PROBLEM_COUNTER;
      console.warn(`[SAT-DEBUG] [extractCurrentProblem] problemNumber \uD3F4\uBC31 2: \uC804\uC5ED \uCE74\uC6B4\uD130 \uC0AC\uC6A9 \u2192 ${problemNum}`);
    }
    problemNum = problemNum || 1;
    console.log(`[SAT-DEBUG] [extractCurrentProblem] \uCD5C\uC885 problemNumber: ${problemNum}`);
    let problemText = "";
    let passageText = "";
    const allTextElements = document.querySelectorAll("p, div, span, h1, h2, h3, h4, h5, h6");
    for (const el of allTextElements) {
      const text = (el.innerText || el.textContent || "").trim();
      if (text.match(new RegExp(`^${problemNum}\\.`)) || text.match(new RegExp(`^${problemNum}\\s+Text`))) {
        const parent = el.closest('[class*="container"], [class*="content"], [class*="question"], main, article');
        if (parent) {
          const fullText = (parent.innerText || parent.textContent || "").trim();
          const textMatch = fullText.match(/Text\s+\d+[^\n]*/g);
          if (textMatch) {
            passageText = textMatch.join("\n\n");
          }
          const questionMatch = fullText.match(new RegExp(`${problemNum}\\.\\s*([^A-D]+?)(?=[A-D]\\.|$)`, "s"));
          if (questionMatch) {
            problemText = questionMatch[1].trim();
          } else {
            problemText = fullText.split(/[A-D]\./)[0].trim();
          }
          break;
        }
      }
    }
    if (!problemText) {
      const bodyText = document.body.innerText || document.body.textContent;
      const problemMatch = bodyText.match(new RegExp(`${problemNum}\\.\\s*([\\s\\S]+?)(?=\\d+\\.|$)`, "i"));
      if (problemMatch) {
        problemText = problemMatch[1].trim();
        problemText = problemText.split(/[A-D][\.\)]\s*/)[0].trim();
      }
    }
    if (!problemText) {
      const passageNodes = Array.from(document.querySelectorAll("p, div, span")).filter((el) => {
        const text = (el.innerText || el.textContent || "").trim();
        return text.includes("Text") || text.length > 100;
      });
      for (const passageNode of passageNodes) {
        let nextSibling = passageNode.nextElementSibling;
        let attempts = 0;
        while (nextSibling && attempts < 5) {
          const text = (nextSibling.innerText || nextSibling.textContent || "").trim();
          if (text.length > 20 && text.length < 500 && !text.match(/^[A-D][\.\)]/)) {
            problemText = text;
            console.log(`[SAT-DEBUG] [extractCurrentProblem] question \uD3F4\uBC31: passage \uB2E4\uC74C \uC694\uC18C\uC5D0\uC11C \uBC1C\uACAC`);
            break;
          }
          nextSibling = nextSibling.nextElementSibling;
          attempts++;
        }
        if (problemText) break;
      }
      if (!problemText) {
        const choicesContainer = document.querySelector('[role="radio"], button[aria-label*="Choice"]');
        if (choicesContainer) {
          let parent = choicesContainer.parentElement;
          let attempts = 0;
          while (parent && attempts < 3) {
            const text = (parent.innerText || parent.textContent || "").trim();
            const beforeChoices = text.split(/[A-D][\.\)]/)[0].trim();
            if (beforeChoices.length > 20 && beforeChoices.length < 500) {
              problemText = beforeChoices;
              console.log(`[SAT-DEBUG] [extractCurrentProblem] question \uD3F4\uBC31: \uC120\uD0DD\uC9C0 \uC704\uCABD\uC5D0\uC11C \uBC1C\uACAC`);
              break;
            }
            parent = parent.parentElement;
            attempts++;
          }
        }
      }
      if (!problemText) {
        const headings = Array.from(document.querySelectorAll('[role="heading"], h1, h2, h3, h4, h5, h6, [class*="heading"], [class*="title"]'));
        for (const heading of headings) {
          const text = (heading.innerText || heading.textContent || "").trim();
          if (text.length > 10 && text.length < 300 && !text.match(/^[A-D][\.\)]/) && !text.match(/Text\s+\d+/)) {
            problemText = text;
            console.log(`[SAT-DEBUG] [extractCurrentProblem] question \uD3F4\uBC31: heading\uC5D0\uC11C \uBC1C\uACAC`);
            break;
          }
        }
      }
    }
    const choicesArray = extractChoices(document.body);
    const choices = {};
    for (const choice of choicesArray) {
      if (choice.label >= "A" && choice.label <= "D") {
        choices[choice.label] = choice.text;
      }
    }
    if (!problemText || problemText.trim().length === 0) {
      console.warn(`[SAT-DEBUG] [extractCurrentProblem] question \uD14D\uC2A4\uD2B8 \uCD94\uCD9C \uC2E4\uD328 - placeholder \uC0AC\uC6A9`);
      problemText = "[QUESTION_NOT_EXTRACTED]";
    }
    if (!passageText && !problemText) {
      console.warn(`[SAT-DEBUG] [extractCurrentProblem] passage\uC640 question \uBAA8\uB450 \uC5C6\uC74C - \uCD5C\uC18C\uD55C question\uC740 placeholder\uB85C \uC0DD\uC131`);
      problemText = "[QUESTION_NOT_EXTRACTED]";
    }
    console.log(`[DEBUG STEP 1] extractCurrentProblem: \uBB38\uC81C ${problemNum}\uC5D0\uC11C extractFigures \uD638\uCD9C \uC9C1\uC804`);
    fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractCurrentProblem:beforeExtractFigures", message: "DEBUG STEP 1: extractFigures \uD638\uCD9C \uC9C1\uC804", data: { problemNum, sectionType }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
    });
    let figures = [];
    try {
      const satRoot = findSatRoot();
      const satRootTag = satRoot ? satRoot.tagName : null;
      const satRootIsBody = satRoot === document.body;
      const imgInRoot = satRoot ? satRoot.querySelectorAll("img").length : 0;
      fetch("http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractCurrentProblem:satRootCheck", message: "math image extract: satRoot before extractFigures", data: { sectionType, problemNum, satRootFound: !!satRoot, satRootTag, satRootIsBody, imgInRoot }, timestamp: Date.now(), hypothesisId: "H2" }) }).catch(() => {
      });
      if (satRoot) {
        console.log(`[DEBUG STEP 1] extractFigures \uD638\uCD9C \uC2DC\uC791: \uBB38\uC81C ${problemNum}`);
        figures = await extractFigures(satRoot);
        console.log(`[DEBUG STEP 1] extractFigures \uC644\uB8CC: \uBB38\uC81C ${problemNum}, figures.length=${figures.length}`);
        fetch("http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractCurrentProblem:extractFiguresResult", message: "math image extract: after extractFigures", data: { sectionType, problemNum, figuresLength: figures.length }, timestamp: Date.now(), hypothesisId: "H3" }) }).catch(() => {
        });
        console.log(`[SAT-DEBUG] [extractCurrentProblem] \uBB38\uC81C ${problemNum}\uC5D0\uC11C ${figures.length}\uAC1C figure \uCD94\uCD9C \uC644\uB8CC`);
      } else {
        console.warn("[SAT-DEBUG] [extractCurrentProblem] satRoot\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC5B4 figure \uCD94\uCD9C \uC2A4\uD0B5");
        fetch("http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractCurrentProblem:satRootNotFound", message: "math image extract: satRoot null", data: { sectionType, problemNum }, timestamp: Date.now(), hypothesisId: "H2" }) }).catch(() => {
        });
      }
    } catch (error) {
      console.warn("[SAT-DEBUG] [extractCurrentProblem] figure \uCD94\uCD9C \uC624\uB958 (\uACC4\uC18D \uC9C4\uD589):", error);
      fetch("http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractCurrentProblem:extractFiguresError", message: "math image extract: extractFigures throw", data: { sectionType, problemNum, errorMessage: error.message }, timestamp: Date.now(), hypothesisId: "H4" }) }).catch(() => {
      });
      figures = [];
    }
    console.log(`[DEBUG STEP 3] extractCurrentProblem \uBC18\uD658 \uC9C1\uC804: \uBB38\uC81C ${problemNum}, figures.length=${figures.length}`);
    fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractCurrentProblem:beforeReturn", message: "DEBUG STEP 3: extractCurrentProblem \uBC18\uD658 \uC9C1\uC804 figures \uAC80\uC99D", data: { problemNum, figuresLength: figures.length, figures: figures.map((f) => ({ w: f.width, h: f.height, hasDataUrl: !!f.dataUrl })) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "C" }) }).catch(() => {
    });
    return {
      section: sectionType === "reading" ? "Reading and Writing" : "Math",
      module: 0,
      // 나중에 채워짐 (collectModuleProblems에서)
      problemNumber: problemNum,
      // 절대 undefined 아님 (위에서 보장)
      passage: passageText || null,
      question: problemText,
      // stem 대신 question 사용 (비어있으면 placeholder)
      choices,
      // {A: \"...\", B: \"...\", C: \"...\", D: \"...\"} 형태
      correctAnswer: "",
      // 나중에 채워짐 (detectCorrectAnswer에서)
      explanation: "",
      // 나중에 채워짐 (extractExplanationAfterGrading에서)
      figures
      // figure 이미지 배열
    };
  }
  function getProgressState() {
    if (window !== window.top && !window.__SAT_IS_WORKER) {
      console.warn("[SAT-DEBUG] [getProgressState] Worker frame\uC774 \uC544\uB2CC iframe\uC5D0\uC11C \uC2E4\uD589 - \uACBD\uACE0\uB9CC \uCD9C\uB825");
    }
    const satRoot = findSatRoot();
    if (!satRoot) {
      console.warn("[DIAG] satRoot not found, progress \uD310\uB3C5 \uC2E4\uD328");
      return null;
    }
    const satRootText = satRoot.innerText || satRoot.textContent || "";
    const progressRegex = /(\d+)\s*\/\s*(\d+)/g;
    const matches = satRootText.match(progressRegex);
    if (matches && matches.length > 0) {
      const matchCounts = {};
      matches.forEach((match) => {
        matchCounts[match] = (matchCounts[match] || 0) + 1;
      });
      const mostCommon = Object.keys(matchCounts).reduce(
        (a, b) => matchCounts[a] > matchCounts[b] ? a : b
      );
      const parts = mostCommon.split("/").map((s) => s.trim());
      const current = parseInt(parts[0]);
      const total = parseInt(parts[1]);
      if (current > 0 && current <= total && (total === 27 || total === 22)) {
        console.log(`[SAT PDF Exporter] Progress \uBC1C\uACAC (satRoot text regex): ${mostCommon}`);
        console.log(`[DIAG] progress text raw: "${satRootText.slice(0, 200)}"`);
        return mostCommon;
      }
    }
    const satRootProgressElements = satRoot.querySelectorAll('[class*="progress"], [aria-label*="progress"], [class*="indicator"]');
    for (const el of satRootProgressElements) {
      if (!isElementVisible(el)) continue;
      const text = (el.innerText || el.textContent || "").trim();
      const match = text.match(/(\d+)\s*\/\s*(\d+)/);
      if (match) {
        const current = parseInt(match[1]);
        const total = parseInt(match[2]);
        if (current > 0 && current <= total && (total === 27 || total === 22)) {
          console.log(`[SAT PDF Exporter] Progress \uBC1C\uACAC (satRoot selector): ${match[0]}`);
          return match[0];
        }
      }
    }
    console.error("[DIAG] Progress\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. satRoot snippet:", satRoot?.innerText?.slice(0, 500));
    return null;
  }
  function getCurrentProblemNumber() {
    const satRoot = findSatRoot();
    if (!satRoot) {
      console.warn("[DIAG] satRoot not found, problem number \uD310\uB3C5 \uC2E4\uD328");
      return 0;
    }
    const progressSelectors = [
      '[class*="progress"]',
      '[class*="indicator"]',
      '[aria-label*="progress"]',
      '[class*="slider"]',
      '[class*="step"]'
    ];
    for (const selector of progressSelectors) {
      const elements = satRoot.querySelectorAll(selector);
      for (const el of elements) {
        if (!isElementVisible(el)) continue;
        const text = (el.innerText || el.textContent || "").trim();
        const match2 = text.match(/\b(\d+)\s*\/\s*(27|22)\b/);
        if (match2) {
          const num = parseInt(match2[1]);
          const total = parseInt(match2[2]);
          if (num > 0 && num <= total) {
            console.log(`[SAT PDF Exporter] \uBB38\uC81C \uBC88\uD638 \uBC1C\uACAC (satRoot progress UI): ${num}/27 (raw: "${text}")`);
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:getCurrentProblemNumber:found1", message: "getCurrentProblemNumber found via progress UI", data: { num, text, method: "progressUI" }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
            });
            return num;
          }
        }
      }
    }
    const satRootText = satRoot.innerText || satRoot.textContent || "";
    const match = satRootText.match(/\b(\d+)\s*\/\s*(27|22)\b/);
    if (match) {
      const num = parseInt(match[1]);
      const total = parseInt(match[2]);
      if (num > 0 && num <= total) {
        console.log(`[SAT PDF Exporter] \uBB38\uC81C \uBC88\uD638 \uBC1C\uACAC (satRoot text): ${num}/27`);
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:getCurrentProblemNumber:found2", message: "getCurrentProblemNumber found via satRoot text", data: { num, method: "satRootText" }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
        });
        return num;
      }
    }
    const problemNumberElements = satRoot.querySelectorAll('[class*="question"], [class*="problem"], [class*="number"]');
    for (const el of problemNumberElements) {
      if (!isElementVisible(el)) continue;
      const text = (el.innerText || el.textContent || "").trim();
      const numMatch = text.match(/^(\d+)\./);
      if (numMatch) {
        const num = parseInt(numMatch[1]);
        if (num > 0 && num <= 27) {
          console.log(`[SAT PDF Exporter] \uBB38\uC81C \uBC88\uD638 \uBC1C\uACAC (satRoot \uD14D\uC2A4\uD2B8 \uD328\uD134): ${num}`);
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:getCurrentProblemNumber:found3", message: "getCurrentProblemNumber found via text pattern", data: { num, text, method: "textPattern" }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
          });
          return num;
        }
      }
    }
    console.warn("[SAT PDF Exporter] \uBB38\uC81C \uBC88\uD638\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uAE30\uBCF8\uAC12 1 \uC0AC\uC6A9");
    const defaultReturn = 1;
    fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:getCurrentProblemNumber:default", message: "getCurrentProblemNumber returning default 1", data: { satRootFound: !!satRoot, defaultReturn }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
    });
    return defaultReturn;
  }
  function getQuestionSignature() {
    const bodyText = (document.body.innerText || document.body.textContent || "").trim();
    let passageText = "";
    const passageSelectors = [
      '[class*="passage"]',
      '[class*="text"]',
      'div[class*="content"]',
      "p"
    ];
    for (const selector of passageSelectors) {
      const elements = document.querySelectorAll(selector);
      for (const el of elements) {
        const text = (el.innerText || el.textContent || "").trim();
        if (text.length > 100 && !text.match(/^\d+\./) && !text.match(/^[A-D][\.\)]/)) {
          passageText += text.substring(0, 200);
          break;
        }
      }
      if (passageText) break;
    }
    let questionText = "";
    const questionMatch = bodyText.match(/\d+\.\s*([^\n]+?)(?=[A-D][\.\)]|$)/);
    if (questionMatch) {
      questionText = questionMatch[1].substring(0, 150);
    }
    let choicesText = "";
    const choicesMatch = bodyText.match(/([A-D][\.\)]\s*[^\n]+)/g);
    if (choicesMatch && choicesMatch.length > 0) {
      choicesText = choicesMatch.slice(0, 2).join(" ").substring(0, 100);
    }
    const signature = (passageText + questionText + choicesText).trim();
    if (!signature) {
      return bodyText.substring(0, 200).replace(/\s+/g, " ");
    }
    let hash = 0;
    for (let i = 0; i < signature.length; i++) {
      const char = signature.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    const hashStr = Math.abs(hash).toString(36);
    console.log(`[SAT PDF Exporter] \uBB38\uC81C \uC2DC\uADF8\uB2C8\uCC98 \uC0DD\uC131: ${hashStr} (\uC9C0\uBB38: ${passageText ? "\uC788\uC74C" : "\uC5C6\uC74C"}, \uBB38\uC81C: ${questionText ? "\uC788\uC74C" : "\uC5C6\uC74C"})`);
    return hashStr;
  }
  function isGraded() {
    if (window !== window.top && !window.__SAT_IS_WORKER) {
      console.warn("[SAT-DEBUG] [isGraded] Worker frame\uC774 \uC544\uB2CC iframe\uC5D0\uC11C \uC2E4\uD589 - \uACBD\uACE0\uB9CC \uCD9C\uB825");
    }
    const satRoot = findSatRoot();
    if (!satRoot) {
      return false;
    }
    const hasAnsweredClass = !!satRoot.querySelector('[class*="answered-correct"], [class*="answered-incorrect"]');
    const hasCorrectAria = !!satRoot.querySelector('[aria-label*="Correct" i], [aria-label*="Incorrect" i], [aria-label*="\uC815\uB2F5"], [aria-label*="\uC624\uB2F5"]');
    const hasExplanation = !!satRoot.querySelector('[class*="explanation"], [class*="\uD574\uC124"], [class*="solution"]');
    const result = hasAnsweredClass || hasCorrectAria || hasExplanation;
    if (typeof window !== "undefined" && window.location) {
      const logData = {
        location: "extract.js:isGraded",
        message: "isGraded check",
        data: {
          hasAnsweredClass,
          hasCorrectAria,
          hasExplanation,
          result,
          satRootExists: !!satRoot
        },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "initial",
        hypothesisId: "A"
      };
      console.log("[DEBUG-LOG]", logData);
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData)
      }).catch((err) => console.warn("[DEBUG-LOG] HTTP log failed:", err));
    }
    return result;
  }
  async function waitForGrading(timeoutMs = 6e3) {
    console.log("[GRADING] \uCC44\uC810 \uB300\uAE30 \uC2DC\uC791 (\uC5C4\uACA9\uD55C \uC870\uAC74: \uC815\uB2F5 \uD45C\uC2DC \uD655\uC778)");
    const satRoot = findSatRoot();
    if (!satRoot) {
      console.error("[GRADING] satRoot not found, \uCC44\uC810 \uB300\uAE30 \uC2E4\uD328");
      if (typeof window !== "undefined" && window.location) {
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "extract.js:waitForGrading",
            message: "satRoot not found",
            data: {},
            timestamp: Date.now(),
            sessionId: "debug-session",
            runId: "initial",
            hypothesisId: "A"
          })
        }).catch(() => {
        });
      }
      return null;
    }
    return new Promise((resolve) => {
      const startTime = Date.now();
      let resolved = false;
      const checkGrading = () => {
        if (resolved) return;
        const progressState = getProgressState();
        const answeredCorrect = satRoot.querySelector('[class*="answered-correct"]');
        const answeredIncorrect = satRoot.querySelector('[class*="answered-incorrect"]');
        const correctAria = satRoot.querySelector('[aria-label*="Correct" i], [aria-label*="\uC815\uB2F5"]');
        const incorrectAria = satRoot.querySelector('[aria-label*="Incorrect" i], [aria-label*="\uC624\uB2F5"]');
        const explanation = satRoot.querySelector('[class*="explanation"], [class*="\uD574\uC124"], [class*="solution"]');
        const options = satRoot.querySelectorAll('[role="radio"], button[aria-label*="Choice"], [class*="option"], .mat-mdc-list-item');
        let foundCorrectOption = false;
        let foundIncorrectOption = false;
        for (const opt of options) {
          if (!isElementVisible(opt) || !satRoot.contains(opt)) continue;
          const className = opt.className || "";
          const ariaLabel = (opt.getAttribute("aria-label") || "").toLowerCase();
          if (/\banswered-correct\b/.test(className) || /\bcorrect\b/.test(className) || ariaLabel.includes("correct") || ariaLabel.includes("\uC815\uB2F5")) {
            foundCorrectOption = true;
          }
          if (/\banswered-incorrect\b/.test(className) || /\bincorrect\b/.test(className) || ariaLabel.includes("incorrect") || ariaLabel.includes("\uC624\uB2F5")) {
            foundIncorrectOption = true;
          }
        }
        const isGradedNow = !!(answeredCorrect || answeredIncorrect || correctAria || incorrectAria || explanation || foundCorrectOption || foundIncorrectOption);
        if (typeof window !== "undefined" && window.location && (Date.now() - startTime) % 400 < 80) {
          const logData = {
            location: "extract.js:waitForGrading:checkGrading",
            message: "grading check iteration",
            data: {
              progressState,
              answeredCorrect: !!answeredCorrect,
              answeredIncorrect: !!answeredIncorrect,
              correctAria: !!correctAria,
              incorrectAria: !!incorrectAria,
              explanation: !!explanation,
              foundCorrectOption,
              foundIncorrectOption,
              isGradedNow,
              optionsCount: options.length,
              elapsedMs: Date.now() - startTime,
              satRootTextSlice: (satRoot.innerText || "").substring(0, 400)
            },
            timestamp: Date.now(),
            sessionId: "debug-session",
            runId: "initial",
            hypothesisId: "A"
          };
          console.log("[DEBUG-LOG]", logData);
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(logData)
          }).catch((err) => console.warn("[DEBUG-LOG] HTTP log failed:", err));
        }
        if (isGradedNow) {
          resolved = true;
          const result = answeredCorrect || correctAria || foundCorrectOption ? "correct" : "incorrect";
          console.log(`[GRADING] \u2713 \uCC44\uC810 \uC644\uB8CC \uAC10\uC9C0: ${result}`);
          resolve(result);
          return;
        }
        if (Date.now() - startTime >= timeoutMs) {
          resolved = true;
          console.error(`[GRADING] \u2717 \uCC44\uC810 \uB300\uAE30 \uD0C0\uC784\uC544\uC6C3 (${timeoutMs}ms)`);
          console.error(`[DIAG] satRoot snippet:`, satRoot?.innerText?.slice(0, 500));
          if (typeof window !== "undefined" && window.location) {
            const logData = {
              location: "extract.js:waitForGrading:timeout",
              message: "grading timeout",
              data: {
                elapsedMs: Date.now() - startTime,
                satRootHTMLSlice: (satRoot.innerHTML || "").substring(0, 800),
                satRootTextSlice: (satRoot.innerText || "").substring(0, 400)
              },
              timestamp: Date.now(),
              sessionId: "debug-session",
              runId: "initial",
              hypothesisId: "A"
            };
            console.error("[DEBUG-LOG]", logData);
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(logData)
            }).catch((err) => console.warn("[DEBUG-LOG] HTTP log failed:", err));
          }
          resolve(null);
          return;
        }
        setTimeout(checkGrading, 20);
      };
      checkGrading();
    });
  }
  function detectCorrectAnswer() {
    console.log("[ANSWER] \uC815\uB2F5 \uCD94\uCD9C \uC911 (\uAC1C\uC120\uB41C \uB85C\uC9C1)...");
    if (window !== window.top && !window.__SAT_IS_WORKER) {
      console.warn("[SAT-DEBUG] [detectCorrectAnswer] Worker frame\uC774 \uC544\uB2CC iframe\uC5D0\uC11C \uC2E4\uD589 \uC2DC\uB3C4 - \uC2A4\uD0B5");
      return null;
    }
    const satRoot = findSatRoot();
    if (!satRoot) {
      console.error("[ANSWER] satRoot not found, \uC815\uB2F5 \uCD94\uCD9C \uC2E4\uD328");
      if (typeof window !== "undefined" && window.location) {
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "extract.js:detectCorrectAnswer",
            message: "satRoot not found",
            data: {},
            timestamp: Date.now(),
            sessionId: "debug-session",
            runId: "initial",
            hypothesisId: "B"
          })
        }).catch(() => {
        });
      }
      return null;
    }
    const explanationBlocks = satRoot.querySelectorAll('.explanation[class*="answered"], [class*="explanation"]');
    for (const block of explanationBlocks) {
      if (!isElementVisible(block)) continue;
      const optionTextContainer = block.querySelector(".option-text-container");
      if (!optionTextContainer) continue;
      const mathInline = optionTextContainer.querySelector("span.math-inline[data-math]");
      if (mathInline) {
        const latex = mathInline.getAttribute("data-math");
        if (latex && typeof latex === "string") {
          let readable = latex.replace(/\\frac\s*\{\s*([^}]+)\s*\}\s*\{\s*([^}]+)\s*\}/g, "$1/$2").replace(/\\sqrt\s*\{\s*([^}]+)\s*\}/g, "\u221A$1").replace(/\\sqrt\s*([^\s\{\\]+)/g, "\u221A$1").replace(/\\cdot/g, "\xB7").replace(/\\times/g, "\xD7").replace(/\\div/g, "\xF7").replace(/\\pm/g, "\xB1").replace(/\\text\s*\{\s*([^}]*)\s*\}/g, "$1").replace(/\\left|\\right/g, "").replace(/\\\(|\\\)/g, "").trim();
          if (readable.length > 0) {
            console.log(`[SAT PDF Exporter] Math \uC8FC\uAD00\uC2DD \uC815\uB2F5 \uBC1C\uACAC: ${readable} (LaTeX)`);
            return readable;
          }
        }
      }
      const anyMath = optionTextContainer.querySelector("[data-math]");
      if (anyMath) {
        const latex = anyMath.getAttribute("data-math");
        if (latex && typeof latex === "string") {
          let readable = latex.replace(/\\frac\s*\{\s*([^}]+)\s*\}\s*\{\s*([^}]+)\s*\}/g, "$1/$2").replace(/\\sqrt\s*\{\s*([^}]+)\s*\}/g, "\u221A$1").replace(/\\cdot/g, "\xB7").replace(/\\times/g, "\xD7").replace(/\\div/g, "\xF7").replace(/\\pm/g, "\xB1").replace(/\\text\s*\{\s*([^}]*)\s*\}/g, "$1").replace(/\\left|\\right/g, "").trim();
          if (readable.length > 0) {
            console.log(`[SAT PDF Exporter] Math \uC8FC\uAD00\uC2DD \uC815\uB2F5 \uBC1C\uACAC: ${readable} ([data-math])`);
            return readable;
          }
        }
      }
      const rawText = (optionTextContainer.innerText || optionTextContainer.textContent || "").trim();
      const cleaned = rawText.replace(/^(정답|오답|Correct|Incorrect)\s*/i, "").replace(/\s*(정답|오답|Correct|Incorrect)$/i, "").replace(/\s+/g, " ").trim();
      const numericMatch = cleaned.match(/^[\d\s\/\.\-\(\)\*]+$/);
      if (cleaned.length > 0 && cleaned.length <= 20 && (numericMatch || /^[\d\.]+\s*\/\s*[\d\.]+$/.test(cleaned))) {
        console.log(`[SAT PDF Exporter] Math \uC8FC\uAD00\uC2DD \uC815\uB2F5 \uBC1C\uACAC: ${cleaned} (\uD14D\uC2A4\uD2B8 \uD3F4\uBC31)`);
        return cleaned;
      }
    }
    const optionSelectors = [
      '[role="radio"]',
      'button[aria-label*="Choice"]',
      ".option",
      '[class*="option"]',
      ".mat-mdc-list-item"
    ];
    const candidates = [];
    for (const selector of optionSelectors) {
      const elements = satRoot.querySelectorAll(selector);
      for (const el of elements) {
        if (!isElementVisible(el) || !satRoot.contains(el)) continue;
        if (candidates.find((c) => c.element === el)) continue;
        candidates.push({ element: el, selector });
      }
    }
    const optionCandidates = [];
    for (let i = 0; i < candidates.length; i++) {
      const candidate = candidates[i];
      const el = candidate.element;
      const className = el.className || "";
      const ariaLabel = (el.getAttribute("aria-label") || "").trim();
      const dataTestId = (el.getAttribute("data-testid") || "").trim();
      const text = (el.innerText || el.textContent || "").trim();
      let choiceLetter = null;
      const ariaMatch = ariaLabel.match(/choice\s*([A-D])/i) || ariaLabel.match(/^([A-D])[\.\)]?/i);
      if (ariaMatch) {
        choiceLetter = ariaMatch[1].toUpperCase();
      }
      if (!choiceLetter) {
        const textMatch = text.match(/^([A-D])[\.\)]\s*/);
        if (textMatch) {
          choiceLetter = textMatch[1].toUpperCase();
        }
      }
      if (!choiceLetter) {
        const testIdMatch = dataTestId.match(/choice[_-]?([A-D])/i) || dataTestId.match(/option[_-]?([A-D])/i);
        if (testIdMatch) {
          choiceLetter = testIdMatch[1].toUpperCase();
        }
      }
      if (!choiceLetter && i < 4) {
        choiceLetter = String.fromCharCode(65 + i);
      }
      if (choiceLetter && choiceLetter >= "A" && choiceLetter <= "D") {
        optionCandidates.push({
          letter: choiceLetter,
          element: el,
          className,
          ariaLabel: ariaLabel.substring(0, 50),
          dataTestId: dataTestId.substring(0, 30),
          text: text.substring(0, 50),
          visible: isElementVisible(el),
          index: i
        });
      }
    }
    if (typeof window !== "undefined" && window.location) {
      const logData = {
        location: "extract.js:detectCorrectAnswer:afterCandidateCollection",
        message: "option candidates collected",
        data: {
          candidatesCount: optionCandidates.length,
          candidates: optionCandidates.map((c) => ({
            letter: c.letter,
            className: c.className.substring(0, 100),
            ariaLabel: c.ariaLabel,
            dataTestId: c.dataTestId,
            text: c.text,
            visible: c.visible,
            index: c.index
          })),
          satRootTextSlice: (satRoot.innerText || "").substring(0, 400)
        },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "initial",
        hypothesisId: "B"
      };
      console.log("[DEBUG-LOG]", logData);
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData)
      }).catch((err) => console.warn("[DEBUG-LOG] HTTP log failed:", err));
    }
    for (const candidate of optionCandidates) {
      const el = candidate.element;
      const className = el.className || "";
      const ariaLabel = (el.getAttribute("aria-label") || "").toLowerCase();
      const fullText = (el.innerText || el.textContent || "").toLowerCase();
      if (/\banswered-correct\b/.test(className) || /\bcorrect\b/.test(className)) {
        console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uBC1C\uACAC: ${candidate.letter} (className: answered-correct/correct)`);
        return candidate.letter;
      }
      if (ariaLabel.includes("correct") || ariaLabel.includes("\uC815\uB2F5")) {
        console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uBC1C\uACAC: ${candidate.letter} (aria-label: correct)`);
        return candidate.letter;
      }
      if (fullText.includes("\uC815\uB2F5\uC785\uB2C8\uB2E4") || fullText.includes("\uC815\uB2F5\uC785\uB2C8\uB2E4!") || fullText.includes("this is correct") || fullText.includes("correct!")) {
        console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uBC1C\uACAC: ${candidate.letter} (\uB0B4\uBD80 \uD14D\uC2A4\uD2B8: \uC815\uB2F5\uC785\uB2C8\uB2E4/Correct)`);
        return candidate.letter;
      }
      try {
        const style = window.getComputedStyle(el);
        const borderColor = style.borderColor || "";
        const backgroundColor = style.backgroundColor || "";
        const outlineColor = style.outlineColor || "";
        const isGreenBorder = borderColor.includes("76, 175, 80") || borderColor.includes("rgb(76, 175, 80)") || borderColor.includes("4caf50") || borderColor.includes("#4caf50");
        const isGreenBg = backgroundColor.includes("76, 175, 80") || backgroundColor.includes("rgb(76, 175, 80)") || backgroundColor.includes("4caf50") || backgroundColor.includes("#4caf50");
        const isGreenOutline = outlineColor.includes("76, 175, 80") || outlineColor.includes("rgb(76, 175, 80)") || outlineColor.includes("4caf50") || outlineColor.includes("#4caf50");
        if (isGreenBorder || isGreenBg || isGreenOutline) {
          console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uBC1C\uACAC: ${candidate.letter} (\uCD08\uB85D\uC0C9 \uD14C\uB450\uB9AC/\uBC30\uACBD)`);
          return candidate.letter;
        }
      } catch (e) {
      }
      const iconElements = el.querySelectorAll('svg, [class*="icon"], [class*="marker"], [class*="check"], [class*="correct"]');
      for (const icon of iconElements) {
        const iconTitle = (icon.getAttribute("title") || "").toLowerCase();
        const iconAriaLabel = (icon.getAttribute("aria-label") || "").toLowerCase();
        const iconText = (icon.textContent || "").toLowerCase();
        if (iconTitle.includes("correct") || iconAriaLabel.includes("correct") || iconTitle.includes("\uC815\uB2F5") || iconAriaLabel.includes("\uC815\uB2F5") || iconText.includes("\uC815\uB2F5") || iconText.includes("correct")) {
          console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uBC1C\uACAC: ${candidate.letter} (icon/marker)`);
          return candidate.letter;
        }
      }
    }
    for (const candidate of optionCandidates) {
      const el = candidate.element;
      const allText = (el.innerText || el.textContent || "").toLowerCase();
      if (allText.includes("\uC815\uB2F5\uC785\uB2C8\uB2E4") || allText.includes("\uC815\uB2F5\uC785\uB2C8\uB2E4!") || allText.includes("this is correct") || allText.includes("correct!")) {
        console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uBC1C\uACAC: ${candidate.letter} (\uC804\uCCB4 \uD14D\uC2A4\uD2B8\uC5D0\uC11C "\uC815\uB2F5\uC785\uB2C8\uB2E4" \uBC1C\uACAC)`);
        return candidate.letter;
      }
    }
    const explanationSelectors = [
      '[class*="explanation"]',
      '[class*="solution"]',
      '[class*="\uD574\uC124"]'
    ];
    for (const selector of explanationSelectors) {
      const explanationEl = satRoot.querySelector(selector);
      if (explanationEl && isElementVisible(explanationEl)) {
        const text = (explanationEl.innerText || explanationEl.textContent || "").trim();
        const match = text.match(/(?:Correct answer|정답|Answer)[:\s]*([A-D])/i);
        if (match) {
          const answer = match[1];
          console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uBC1C\uACAC: ${answer} (explanation \uD14D\uC2A4\uD2B8)`);
          return answer;
        }
      }
    }
    const allOptionsWithText = satRoot.querySelectorAll("*");
    for (const el of allOptionsWithText) {
      if (!isElementVisible(el)) continue;
      const text = (el.innerText || el.textContent || "").toLowerCase();
      if (text.includes("\uC815\uB2F5\uC785\uB2C8\uB2E4") || text.includes("this is correct")) {
        for (const candidate of optionCandidates) {
          if (candidate.element === el || candidate.element.contains(el) || el.contains(candidate.element)) {
            console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uBC1C\uACAC: ${candidate.letter} (satRoot \uC804\uCCB4 \uAC80\uC0C9\uC5D0\uC11C "\uC815\uB2F5\uC785\uB2C8\uB2E4" \uBC1C\uACAC)`);
            return candidate.letter;
          }
        }
      }
    }
    try {
      const selectedCandidates = optionCandidates.filter((c) => {
        try {
          const ariaChecked = c.element.getAttribute("aria-checked") || "";
          const ariaPressed = c.element.getAttribute("aria-pressed") || "";
          return ariaChecked.toLowerCase() === "true" || ariaPressed.toLowerCase() === "true";
        } catch {
          return false;
        }
      });
      if (selectedCandidates.length === 1) {
        const sel = selectedCandidates[0];
        console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uBC1C\uACAC: ${sel.letter} (aria-checked/pressed=true \uD3F4\uBC31)`);
        try {
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              location: "extract.js:detectCorrectAnswer:ariaCheckedFallback",
              message: "correct answer inferred from aria-checked/pressed",
              data: {
                answer: sel.letter,
                candidatesCount: optionCandidates.length
              },
              timestamp: Date.now(),
              runId: "answers-bug",
              hypothesisId: "H3"
            })
          }).catch(() => {
          });
        } catch {
        }
        return sel.letter;
      }
    } catch {
    }
    if (optionCandidates.length === 0) {
      const textOptionEls = Array.from(satRoot.querySelectorAll('div, span, p, li, button, [role="button"], label')).filter((el) => {
        try {
          const r = el.getBoundingClientRect();
          return r.width >= 20 && r.height >= 20 && isElementVisible(el) && satRoot.contains(el);
        } catch {
          return false;
        }
      });
      for (const el of textOptionEls) {
        const text = (el.innerText || el.textContent || "").trim();
        const m = text.match(/^([A-D])[\.\)]\s*/);
        if (!m || text.length > 500) continue;
        const letter = m[1];
        const lower = text.toLowerCase();
        if (lower.includes("\uC815\uB2F5\uC785\uB2C8\uB2E4") || lower.includes("this is correct") || /\bcorrect\b/.test(lower) || el.className && /\banswered-correct\b|\bcorrect\b/.test(String(el.className))) {
          console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uBC1C\uACAC: ${letter} (\uD14D\uC2A4\uD2B8 \uAE30\uBC18 \uD3F4\uBC31)`);
          return letter;
        }
      }
    }
    if (typeof window !== "undefined" && window.location) {
      const logData = {
        location: "extract.js:detectCorrectAnswer:failed",
        message: "correct answer not found",
        data: {
          candidatesCount: optionCandidates.length,
          candidates: optionCandidates.map((c) => ({
            letter: c.letter,
            className: c.className.substring(0, 100),
            ariaLabel: c.ariaLabel,
            visible: c.visible
          })),
          satRootHTMLSlice: (satRoot.innerHTML || "").substring(0, 800),
          satRootTextSlice: (satRoot.innerText || "").substring(0, 400)
        },
        timestamp: Date.now(),
        sessionId: "debug-session",
        runId: "initial",
        hypothesisId: "B"
      };
      console.error("[DEBUG-LOG]", logData);
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData)
      }).catch((err) => console.warn("[DEBUG-LOG] HTTP log failed:", err));
    }
    console.warn("[SAT PDF Exporter] \uC815\uB2F5\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4");
    return null;
  }
  function extractExplanationAfterGrading(correctAnswer = null, expectedProblemNumber = null) {
    console.log("[SAT PDF Exporter] Explanation \uCD94\uCD9C \uC911 (\uC815\uB2F5 \uC635\uC158 \uAE30\uC900)...", correctAnswer ? `\uC815\uB2F5: ${correctAnswer}` : "", expectedProblemNumber ? `\uC608\uC0C1 \uBB38\uC81C \uBC88\uD638: ${expectedProblemNumber}` : "");
    const currentProblemNum = getCurrentProblemNumber();
    const currentProgress = getProgressState();
    fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractExplanationAfterGrading:entry", message: "extractExplanationAfterGrading called", data: { correctAnswer, expectedProblemNumber, currentProblemNum, currentProgress, problemNumberMatch: expectedProblemNumber === currentProblemNum }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
    });
    if (expectedProblemNumber !== null && currentProblemNum !== expectedProblemNumber) {
      console.warn(`[SAT PDF Exporter] \u26A0\uFE0F \uBB38\uC81C \uBC88\uD638 \uBD88\uC77C\uCE58 \uAC10\uC9C0! \uC608\uC0C1: ${expectedProblemNumber}, \uD604\uC7AC DOM: ${currentProblemNum}. \uD574\uC124 \uCD94\uCD9C\uC740 \uACC4\uC18D \uC9C4\uD589\uD558\uC9C0\uB9CC \uC8FC\uC758\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4.`);
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractExplanationAfterGrading:problemNumberMismatch", message: "problem number mismatch detected", data: { expectedProblemNumber, currentProblemNum, currentProgress }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "C" }) }).catch(() => {
      });
    }
    if (window !== window.top && !window.__SAT_IS_WORKER) {
      console.warn("[SAT-DEBUG] [extractExplanationAfterGrading] Worker frame\uC774 \uC544\uB2CC iframe\uC5D0\uC11C \uC2E4\uD589 \uC2DC\uB3C4 - \uC2A4\uD0B5");
      return "";
    }
    const satRoot = findSatRoot();
    if (!satRoot) {
      console.warn("[SAT PDF Exporter] satRoot not found, Explanation \uCD94\uCD9C \uC2E4\uD328");
      return "";
    }
    const satRootProgress = getProgressState();
    const satRootProblemNum = getCurrentProblemNumber();
    fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractExplanationAfterGrading:satRootFound", message: "satRoot found, checking problem number", data: { satRootProgress, satRootProblemNum, currentProblemNum }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
    });
    if (!correctAnswer) {
      const explanationTextContainers = satRoot.querySelectorAll(
        '.explanation-text, [class*="explanation-text"]'
      );
      for (const container of explanationTextContainers) {
        if (!isElementVisible(container)) continue;
        const msgContent = container.querySelector('message-content, [id*="rationale"], .markdown');
        const el = msgContent || container;
        const text = (el.innerText || el.textContent || "").trim();
        if (text.length > 10) {
          const cleaned = text.replace(/\s+/g, " ").trim();
          console.log(`[SAT PDF Exporter] Math \uC8FC\uAD00\uC2DD \uD574\uC124 \uBC1C\uACAC (explanation-text): ${cleaned.substring(0, 50)}...`);
          return cleaned;
        }
      }
      const explanationBlocks = satRoot.querySelectorAll('.explanation[class*="answered"], [class*="explanation"]');
      for (const block of explanationBlocks) {
        const optionText = block.querySelector(".option-text-container");
        if (!optionText) continue;
        const rationale = block.querySelector('[id*="rationale"], .explanation-text, [class*="explanation-text"]');
        if (!rationale) continue;
        const text = (rationale.innerText || rationale.textContent || "").trim();
        if (text.length > 10) {
          const cleaned = text.replace(/\s+/g, " ").trim();
          console.log(`[SAT PDF Exporter] Math \uC8FC\uAD00\uC2DD \uD574\uC124 \uBC1C\uACAC (explanation \uBE14\uB85D): ${cleaned.substring(0, 50)}...`);
          return cleaned;
        }
      }
    }
    let correctOptionElement = null;
    if (correctAnswer) {
      const optionSelectors = [
        '[role="radio"]',
        'button[aria-label*="Choice"]',
        ".option",
        '[class*="option"]',
        ".mat-mdc-list-item"
      ];
      const candidates = [];
      for (const selector of optionSelectors) {
        const elements = satRoot.querySelectorAll(selector);
        for (const el of elements) {
          if (!isElementVisible(el) || !satRoot.contains(el)) continue;
          if (candidates.find((c) => c.element === el)) continue;
          candidates.push({ element: el, selector });
        }
      }
      console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uC635\uC158 \uC694\uC18C \uAC80\uC0C9 \uC2DC\uC791 (\uC815\uB2F5: ${correctAnswer}, \uD6C4\uBCF4: ${candidates.length}\uAC1C)`);
      for (const candidate of candidates) {
        const el = candidate.element;
        const text = (el.innerText || el.textContent || "").trim();
        const ariaLabel = (el.getAttribute("aria-label") || "").trim();
        let choiceLetter = null;
        const ariaMatch = ariaLabel.match(/choice\s*([A-D])/i) || ariaLabel.match(/^([A-D])[\.\)]?/i);
        if (ariaMatch) {
          choiceLetter = ariaMatch[1].toUpperCase();
        } else {
          const textMatch = text.match(/^([A-D])[\.\)]\s*/);
          if (textMatch) {
            choiceLetter = textMatch[1].toUpperCase();
          }
        }
        console.log(`[SAT PDF Exporter] \uC635\uC158 \uD6C4\uBCF4: letter=${choiceLetter}, text=${text.substring(0, 30)}..., ariaLabel=${ariaLabel.substring(0, 30)}...`);
        if (choiceLetter === correctAnswer) {
          const className = el.className || "";
          const fullText = text.toLowerCase();
          const hasCorrectClass = /\banswered-correct\b/.test(className) || /\bcorrect\b/.test(className);
          const hasCorrectAria = ariaLabel.toLowerCase().includes("correct") || ariaLabel.toLowerCase().includes("\uC815\uB2F5");
          const hasCorrectText = fullText.includes("\uC815\uB2F5\uC785\uB2C8\uB2E4") || fullText.includes("this is correct");
          console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uC635\uC158 \uB9E4\uCE6D \uD655\uC778: hasCorrectClass=${hasCorrectClass}, hasCorrectAria=${hasCorrectAria}, hasCorrectText=${hasCorrectText}`);
          if (hasCorrectClass || hasCorrectAria || hasCorrectText) {
            correctOptionElement = el;
            console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uC635\uC158 \uC694\uC18C \uBC1C\uACAC: ${correctAnswer}`);
            const optionProblemNum = getCurrentProblemNumber();
            const optionParentText = (el.parentElement?.innerText || "").substring(0, 200);
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractExplanationAfterGrading:correctOptionFound", message: "correct option element found", data: { correctAnswer, optionProblemNum, currentProblemNum, optionParentText: optionParentText.substring(0, 100) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
            });
            break;
          } else {
            console.warn(`[SAT PDF Exporter] \uC815\uB2F5 \uD45C\uC2DC\uAC00 \uC5C6\uC9C0\uB9CC letter \uC77C\uCE58: ${correctAnswer}, \uD3F4\uBC31\uC73C\uB85C \uC0AC\uC6A9`);
            correctOptionElement = el;
            const optionProblemNum = getCurrentProblemNumber();
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractExplanationAfterGrading:correctOptionFallback", message: "correct option found via fallback", data: { correctAnswer, optionProblemNum, currentProblemNum }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
            });
            break;
          }
        }
      }
      if (!correctOptionElement && correctAnswer) {
        const textOptionEls = Array.from(satRoot.querySelectorAll('div, span, p, li, button, [role="button"], label')).filter((el) => {
          try {
            const r = el.getBoundingClientRect();
            return r.width >= 20 && r.height >= 20 && isElementVisible(el) && satRoot.contains(el);
          } catch {
            return false;
          }
        });
        for (const el of textOptionEls) {
          const text = (el.innerText || el.textContent || "").trim();
          const m = text.match(/^([A-D])[\.\)]\s*/);
          if (!m || m[1] !== correctAnswer) continue;
          const lower = text.toLowerCase();
          if (lower.includes("\uC815\uB2F5\uC785\uB2C8\uB2E4") || lower.includes("this is correct") || /\bcorrect\b/.test(lower) || el.className && /\banswered-correct\b|\bcorrect\b/.test(String(el.className))) {
            correctOptionElement = el;
            console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uC635\uC158 \uC694\uC18C \uBC1C\uACAC (\uD14D\uC2A4\uD2B8 \uAE30\uBC18 \uD3F4\uBC31): ${correctAnswer}`);
            break;
          }
        }
      }
      if (!correctOptionElement) {
        console.warn(`[SAT PDF Exporter] \uC815\uB2F5 \uC635\uC158 \uC694\uC18C\uB97C \uCC3E\uC9C0 \uBABB\uD568 (\uC815\uB2F5: ${correctAnswer}, \uD6C4\uBCF4: ${candidates.length}\uAC1C)`);
      }
    }
    if (correctOptionElement) {
      const explanationSelectors2 = [
        '[class*="explanation"]',
        '[class*="solution"]',
        '[data-testid*="explanation"]',
        '[class*="hint"]',
        '[class*="reasoning"]',
        '[class*="\uD574\uC124"]'
      ];
      console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uC635\uC158 \uC694\uC18C\uC5D0\uC11C \uD574\uC124 \uAC80\uC0C9 \uC2DC\uC791 (\uC815\uB2F5: ${correctAnswer})`);
      for (const selector of explanationSelectors2) {
        const element = correctOptionElement.querySelector(selector);
        if (element && isElementVisible(element)) {
          const text = (element.innerText || element.textContent || "").trim();
          console.log(`[SAT PDF Exporter] \uD574\uC124 \uD6C4\uBCF4 \uBC1C\uACAC (\uC815\uB2F5 \uC635\uC158 \uB0B4\uBD80, ${selector}): ${text.substring(0, 100)}...`);
          if (text.length > 10) {
            let explanationText = text;
            const correctMatch = text.split(/정답입니다[!]?/i);
            const correctEngMatch = text.split(/this is correct[!]?/i);
            if (correctMatch.length > 1) {
              explanationText = correctMatch.slice(1).join(" ").trim();
            } else if (correctEngMatch.length > 1) {
              explanationText = correctEngMatch.slice(1).join(" ").trim();
            } else {
              explanationText = text;
            }
            explanationText = explanationText.replace(/^[A-D][\.\)]\s*[^\n]*/gm, "").trim();
            const cleaned = explanationText.replace(/\s+/g, " ").trim();
            if (cleaned.length > 10) {
              console.log(`[SAT PDF Exporter] Explanation \uBC1C\uACAC (\uC815\uB2F5 \uC635\uC158 \uB0B4\uBD80, ${selector}): ${cleaned.substring(0, 50)}...`);
              const explanationProblemNum = getCurrentProblemNumber();
              const explanationProgress = getProgressState();
              fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractExplanationAfterGrading:explanationFoundInside", message: "explanation found inside correct option", data: { correctAnswer, explanationProblemNum, explanationProgress, currentProblemNum, explanationPreview: cleaned.substring(0, 100), explanationLength: cleaned.length }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "C" }) }).catch(() => {
              });
              return cleaned;
            } else {
              console.warn(`[SAT PDF Exporter] \uD574\uC124 \uD14D\uC2A4\uD2B8\uAC00 \uB108\uBB34 \uC9E7\uC74C: ${cleaned.length}\uC790`);
            }
          }
        }
      }
      console.warn(`[SAT PDF Exporter] \uC815\uB2F5 \uC635\uC158 \uC694\uC18C\uC5D0\uC11C \uD574\uC124\uC744 \uCC3E\uC9C0 \uBABB\uD568 (\uC815\uB2F5: ${correctAnswer})`);
    } else {
      console.warn(`[SAT PDF Exporter] \uC815\uB2F5 \uC635\uC158 \uC694\uC18C\uB97C \uCC3E\uC9C0 \uBABB\uD568 (\uC815\uB2F5: ${correctAnswer})`);
    }
    console.log(`[SAT PDF Exporter] \uD3F4\uBC31: satRoot \uC804\uCCB4\uC5D0\uC11C \uD574\uC124 \uAC80\uC0C9 \uC2DC\uC791 (\uC815\uB2F5: ${correctAnswer || "\uC5C6\uC74C"})`);
    const explanationSelectors = [
      '[class*="explanation"]',
      '[class*="solution"]',
      '[data-testid*="explanation"]',
      '[class*="hint"]',
      '[class*="reasoning"]',
      '[class*="\uD574\uC124"]'
    ];
    let foundExplanations = [];
    for (const selector of explanationSelectors) {
      const elements = satRoot.querySelectorAll(selector);
      console.log(`[SAT PDF Exporter] \uD3F4\uBC31: ${selector}\uB85C ${elements.length}\uAC1C \uC694\uC18C \uBC1C\uACAC`);
      for (const element of elements) {
        if (!isElementVisible(element)) continue;
        const text = (element.innerText || element.textContent || "").trim();
        const textLower = text.toLowerCase();
        const isWrong = textLower.includes("\uC624\uB2F5") || textLower.includes("incorrect");
        const looksCorrect = textLower.includes("\uC815\uB2F5") || textLower.includes("correct");
        const longEnoughToBeExplanation = text.length > 40;
        if (text.length > 10 && !isWrong && (looksCorrect || longEnoughToBeExplanation)) {
          console.log(`[SAT PDF Exporter] \uD3F4\uBC31: \uD574\uC124 \uD6C4\uBCF4 \uBC1C\uACAC (${selector}): ${text.substring(0, 100)}...`);
          let explanationText = text;
          const correctMatch = text.split(/정답입니다[!]?/i);
          const correctEngMatch = text.split(/this is correct[!]?/i);
          if (correctMatch.length > 1) {
            explanationText = correctMatch.slice(1).join(" ").trim();
          } else if (correctEngMatch.length > 1) {
            explanationText = correctEngMatch.slice(1).join(" ").trim();
          }
          explanationText = explanationText.replace(/^[A-D][\.\)]\s*[^\n]*/gm, "").trim();
          const cleaned = explanationText.replace(/\s+/g, " ").trim();
          if (cleaned.length > 10) {
            foundExplanations.push({ selector, text: cleaned });
            console.log(`[SAT PDF Exporter] Explanation \uBC1C\uACAC (\uD3F4\uBC31, ${selector}): ${cleaned.substring(0, 50)}...`);
          }
        }
      }
    }
    if (foundExplanations.length > 0) {
      const explanationProblemNum = getCurrentProblemNumber();
      const explanationProgress = getProgressState();
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "extract.js:extractExplanationAfterGrading:explanationFoundFallback", message: "explanation found via fallback", data: { correctAnswer, explanationProblemNum, explanationProgress, currentProblemNum, foundCount: foundExplanations.length, explanationPreview: foundExplanations[0].text.substring(0, 100), explanationLength: foundExplanations[0].text.length }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
      });
      return foundExplanations[0].text;
    }
    const gradedBoxes = satRoot.querySelectorAll('[class*="correct"], [class*="incorrect"], [class*="\uC815\uB2F5"], [class*="\uC624\uB2F5"]');
    for (const box of gradedBoxes) {
      if (!isElementVisible(box)) continue;
      const parent = box.closest('[class*="container"], [class*="content"], [class*="card"]');
      if (parent && satRoot.contains(parent)) {
        const fullText = (parent.innerText || parent.textContent || "").trim();
        const explanationMatch = fullText.split(/정답입니다|This is correct|정답|Correct/i)[1];
        if (explanationMatch) {
          const explanation = explanationMatch.split(/[A-D][\.\)]/)[0].trim();
          if (explanation.length > 10) {
            const cleaned = explanation.replace(/\s+/g, " ").trim();
            console.log(`[SAT PDF Exporter] Explanation \uBC1C\uACAC (\uBC15\uC2A4 \uADFC\uCC98): ${cleaned.substring(0, 50)}...`);
            return cleaned;
          }
        }
      }
    }
    if (typeof window !== "undefined" && window.location) {
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: "extract.js:extractExplanationAfterGrading:notFound",
          message: "explanation not found",
          data: {
            satRootTextSlice: (satRoot.innerText || "").substring(0, 400),
            gradedBoxesCount: gradedBoxes.length
          },
          timestamp: Date.now(),
          sessionId: "debug-session",
          runId: "initial",
          hypothesisId: "C"
        })
      }).catch(() => {
      });
    }
    console.warn("[SAT PDF Exporter] Explanation\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4");
    return "";
  }
  function extractText(container, ...selectors) {
    for (const selector of selectors) {
      const element = container.querySelector(selector);
      if (element) {
        return element.innerText || element.textContent || "";
      }
    }
    return "";
  }
  function extractAnswer(container) {
    const answerSelectors = [
      '[class*="answer"]',
      '[class*="correct"]',
      '[class*="solution"]',
      "strong",
      "b"
    ];
    for (const selector of answerSelectors) {
      const elements = container.querySelectorAll(selector);
      for (const el of elements) {
        const text = (el.innerText || el.textContent || "").trim();
        if (/answer|정답|correct/i.test(text) && /[A-D]/.test(text)) {
          const match = text.match(/([A-D])/);
          if (match) return match[1];
        }
      }
    }
    return "";
  }
  function extractExplanation(container) {
    const explanationSelectors = [
      '[class*="explanation"]',
      '[class*="solution"]',
      '[class*="hint"]',
      '[class*="reasoning"]'
    ];
    for (const selector of explanationSelectors) {
      const element = container.querySelector(selector);
      if (element) {
        return element.innerText || element.textContent || "";
      }
    }
    return "";
  }
  function checkIfGraded() {
    const greenBoxes = document.querySelectorAll('[class*="correct"], [class*="\uC815\uB2F5"], [style*="green"], [style*="#4caf50"]');
    for (const box of greenBoxes) {
      const text = (box.innerText || box.textContent || "").trim();
      if ((text.includes("\uC815\uB2F5") || text.includes("Correct")) && /[A-D][\.\)]/.test(text)) {
        return true;
      }
    }
    const redBoxes = document.querySelectorAll('[class*="incorrect"], [class*="\uC624\uB2F5"], [style*="red"], [style*="#f44336"]');
    for (const box of redBoxes) {
      const text = (box.innerText || box.textContent || "").trim();
      if (text.includes("\uC624\uB2F5") || text.includes("Incorrect")) {
        return true;
      }
    }
    return false;
  }
  function extractByTextPattern(sectionType) {
    const problems = [];
    const bodyText = document.body.innerText || "";
    const problemPattern = /(?:^|\n)\s*(\d+)\.\s*(.+?)(?=\n\s*\d+\.|$)/gs;
    const matches = [...bodyText.matchAll(problemPattern)];
    matches.forEach((match, index) => {
      problems.push({
        number: parseInt(match[1]) || index + 1,
        type: sectionType,
        stem: match[2].trim(),
        choices: [],
        answer: "",
        explanation: ""
      });
    });
    return problems;
  }
  function extractReadingSection() {
    const problems = [];
    console.log("[SAT PDF Exporter] Reading \uC139\uC158 \uCD94\uCD9C \uC2DC\uC791");
    const problemNum = getCurrentProblemNumber();
    console.log(`[SAT PDF Exporter] \uD604\uC7AC \uBB38\uC81C \uBC88\uD638: ${problemNum}`);
    let problemText = "";
    let passageText = "";
    const allTextElements = document.querySelectorAll("p, div, span, h1, h2, h3, h4, h5, h6");
    for (const el of allTextElements) {
      const text = (el.innerText || el.textContent || "").trim();
      if (text.match(new RegExp(`^${problemNum}\\.`)) || text.match(new RegExp(`^${problemNum}\\s+Text`))) {
        const parent = el.closest('[class*="container"], [class*="content"], [class*="question"], main, article');
        if (parent) {
          const fullText = (parent.innerText || parent.textContent || "").trim();
          const textMatch = fullText.match(/Text\s+\d+[^\n]*/g);
          if (textMatch) {
            passageText = textMatch.join("\n\n");
          }
          const questionMatch = fullText.match(new RegExp(`${problemNum}\\.\\s*([^A-D]+?)(?=[A-D]\\.|$)`, "s"));
          if (questionMatch) {
            problemText = questionMatch[1].trim();
          } else {
            problemText = fullText.split(/[A-D]\./)[0].trim();
          }
          break;
        }
      }
    }
    if (!problemText) {
      const bodyText = document.body.innerText || document.body.textContent;
      const problemMatch = bodyText.match(new RegExp(`${problemNum}\\.\\s*([\\s\\S]+?)(?=\\d+\\.|$)`, "i"));
      if (problemMatch) {
        problemText = problemMatch[1].trim();
        problemText = problemText.split(/[A-D][\.\)]\s*/)[0].trim();
      }
    }
    const choices = extractChoices(document.body);
    const answer = extractAnswer(document.body);
    const explanation = extractExplanation(document.body);
    if (problemText) {
      problems.push({
        number: problemNum,
        type: "reading",
        stem: problemText,
        passage: passageText,
        choices,
        answer,
        explanation
      });
      console.log(`[SAT PDF Exporter] Reading \uBB38\uC81C ${problemNum} \uCD94\uCD9C \uC644\uB8CC:`, {
        stem: problemText.substring(0, 50) + "...",
        passage: passageText ? passageText.substring(0, 50) + "..." : "\uC5C6\uC74C",
        choicesCount: choices.length
      });
    } else {
      console.warn(`[SAT PDF Exporter] Reading \uBB38\uC81C ${problemNum} \uCD94\uCD9C \uC2E4\uD328 - \uD14D\uC2A4\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`);
    }
    return problems;
  }
  function extractMathSection() {
    const problems = [];
    console.log("[SAT PDF Exporter] Math \uC139\uC158 \uCD94\uCD9C \uC2DC\uC791");
    const problemNum = getCurrentProblemNumber();
    console.log(`[SAT PDF Exporter] \uD604\uC7AC \uBB38\uC81C \uBC88\uD638: ${problemNum}`);
    let problemText = "";
    const allTextElements = document.querySelectorAll("p, div, span, h1, h2, h3, h4, h5, h6");
    for (const el of allTextElements) {
      const text = (el.innerText || el.textContent || "").trim();
      if (text.match(new RegExp(`^${problemNum}\\.`))) {
        const parent = el.closest('[class*="container"], [class*="content"], [class*="question"], main, article');
        if (parent) {
          const fullText = (parent.innerText || parent.textContent || "").trim();
          const questionMatch = fullText.match(new RegExp(`${problemNum}\\.\\s*([^A-D]+?)(?=[A-D]\\.|$)`, "s"));
          if (questionMatch) {
            problemText = questionMatch[1].trim();
          } else {
            problemText = fullText.split(/[A-D]\./)[0].trim();
          }
          break;
        }
      }
    }
    if (!problemText) {
      const bodyText = document.body.innerText || document.body.textContent;
      const problemMatch = bodyText.match(new RegExp(`${problemNum}\\.\\s*([\\s\\S]+?)(?=\\d+\\.|$)`, "i"));
      if (problemMatch) {
        problemText = problemMatch[1].trim();
        problemText = problemText.split(/[A-D][\.\)]\s*/)[0].trim();
      }
    }
    const choices = extractChoices(document.body);
    const isGridIn = choices.length === 0;
    const answer = extractAnswer(document.body);
    const explanation = extractExplanation(document.body);
    if (problemText) {
      const problem = {
        number: problemNum,
        type: "math",
        stem: problemText,
        choices,
        answer,
        explanation,
        isGridIn
      };
      if (isGridIn) {
        const gridInAnswer = extractText(document.body, '[class*="answer"], [class*="grid"]');
        if (gridInAnswer) {
          problem.gridInAnswer = gridInAnswer;
        }
      }
      problems.push(problem);
      console.log(`[SAT PDF Exporter] Math \uBB38\uC81C ${problemNum} \uCD94\uCD9C \uC644\uB8CC:`, {
        stem: problemText.substring(0, 50) + "...",
        choicesCount: choices.length,
        isGridIn
      });
    } else {
      console.warn(`[SAT PDF Exporter] Math \uBB38\uC81C ${problemNum} \uCD94\uCD9C \uC2E4\uD328 - \uD14D\uC2A4\uD2B8\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4`);
    }
    return problems;
  }
  function extractSATData() {
    const data = {
      reading: [],
      math: [],
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    };
    try {
      const currentSection = detectCurrentSection();
      if (currentSection === "reading") {
        console.log("[SAT PDF Exporter] Reading \uC139\uC158\uC73C\uB85C \uAC10\uC9C0\uB428 - Reading\uB9CC \uCD94\uCD9C");
        const readingSection = extractReadingSection();
        if (readingSection.length > 0) {
          data.reading = readingSection;
        }
      } else if (currentSection === "math") {
        console.log("[SAT PDF Exporter] Math \uC139\uC158\uC73C\uB85C \uAC10\uC9C0\uB428 - Math\uB9CC \uCD94\uCD9C");
        const mathSection = extractMathSection();
        if (mathSection.length > 0) {
          data.math = mathSection;
        }
      } else {
        console.warn("[SAT PDF Exporter] \uC139\uC158 \uAC10\uC9C0 \uC2E4\uD328 - Reading\uACFC Math \uBAA8\uB450 \uC2DC\uB3C4 (\uBE44\uAD8C\uC7A5)");
        const readingSection = extractReadingSection();
        if (readingSection.length > 0) {
          data.reading = readingSection;
        }
        const mathSection = extractMathSection();
        if (mathSection.length > 0) {
          data.math = mathSection;
        }
      }
      return data;
    } catch (error) {
      console.error("[SAT PDF Exporter] \uB370\uC774\uD130 \uCD94\uCD9C \uC911 \uC624\uB958:", error);
      throw error;
    }
  }
  async function waitForAnswerUIWithNextButtonCheck() {
    let attempts = 0;
    const maxAttempts = 40;
    while (attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const greenBoxes = document.querySelectorAll("*");
      for (const box of greenBoxes) {
        if (!box.offsetParent) continue;
        const text = (box.innerText || box.textContent || "").trim();
        const style = window.getComputedStyle(box);
        const bgColor = style.backgroundColor;
        const borderColor = style.borderColor;
        const isGreen = bgColor.includes("rgb(76, 175, 80)") || bgColor.includes("#4caf50") || borderColor.includes("rgb(76, 175, 80)") || borderColor.includes("#4caf50") || (box.className || "").toLowerCase().includes("correct") || (box.className || "").toLowerCase().includes("\uC815\uB2F5");
        if (isGreen && (text.includes("\uC815\uB2F5") || text.includes("Correct") || text.includes("\uC815\uB2F5\uC785\uB2C8\uB2E4")) && /[A-D][\.\)]/.test(text)) {
          const answerMatch = text.match(/([A-D])[\.\)]/);
          if (answerMatch) {
            const answer = answerMatch[1];
            let explanation = "";
            const explanationElement = box.closest('[class*="container"], [class*="content"], [class*="explanation"]');
            if (explanationElement) {
              const fullText = (explanationElement.innerText || explanationElement.textContent || "").trim();
              const explanationMatch = fullText.split(new RegExp(`${answer}[.)]`))[1];
              if (explanationMatch) {
                explanation = explanationMatch.split(/[A-D][\.\)]/)[0].trim();
              }
            }
            const nextButton = findNavigationButton("next", "\uB2E4\uC74C", "next");
            if (nextButton && !nextButton.disabled) {
              console.log(`[SAT PDF Exporter] \uC815\uB2F5 UI \uBC1C\uACAC: ${answer}, next \uBC84\uD2BC \uD65C\uC131\uD654 \uD655\uC778`);
              return { answer, explanation };
            } else if (nextButton && nextButton.disabled) {
              console.log("[SAT PDF Exporter] \uC815\uB2F5\uC740 \uBC1C\uACAC\uD588\uC9C0\uB9CC next \uBC84\uD2BC\uC774 \uBE44\uD65C\uC131\uD654\uB428. \uD65C\uC131\uD654 \uB300\uAE30...");
              let buttonWaitAttempts = 0;
              while (buttonWaitAttempts < 10 && nextButton.disabled) {
                await new Promise((resolve) => setTimeout(resolve, 100));
                buttonWaitAttempts++;
              }
              if (!nextButton.disabled) {
                console.log(`[SAT PDF Exporter] next \uBC84\uD2BC \uD65C\uC131\uD654 \uD655\uC778. \uC815\uB2F5: ${answer}`);
                return { answer, explanation };
              }
            }
            console.log(`[SAT PDF Exporter] \uC815\uB2F5 UI \uBC1C\uACAC: ${answer} (next \uBC84\uD2BC \uD655\uC778 \uC2E4\uD328)`);
            return { answer, explanation };
          }
        }
      }
      const allText = document.body.innerText || "";
      if (allText.includes("\uC815\uB2F5") || allText.includes("Correct") || allText.includes("\uC815\uB2F5\uC785\uB2C8\uB2E4")) {
        const answerMatch = allText.match(/([A-D])[\.\)]\s*[^\n]*(?:정답|Correct)/);
        if (answerMatch) {
          const answer = answerMatch[1];
          console.log(`[SAT PDF Exporter] \uC815\uB2F5 \uD14D\uC2A4\uD2B8 \uBC1C\uACAC: ${answer}`);
          return { answer, explanation: "" };
        }
      }
      attempts++;
    }
    console.warn("[SAT PDF Exporter] \uC815\uB2F5 UI\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (\uD0C0\uC784\uC544\uC6C3)");
    return null;
  }
  function extractAnswerFromGradedUI() {
    const greenBoxes = document.querySelectorAll("*");
    for (const box of greenBoxes) {
      if (!box.offsetParent) continue;
      const text = (box.innerText || box.textContent || "").trim();
      const style = window.getComputedStyle(box);
      const bgColor = style.backgroundColor;
      const isGreen = bgColor.includes("rgb(76, 175, 80)") || bgColor.includes("#4caf50") || (box.className || "").toLowerCase().includes("correct") || (box.className || "").toLowerCase().includes("\uC815\uB2F5");
      if (isGreen && (text.includes("\uC815\uB2F5") || text.includes("Correct")) && /[A-D][\.\)]/.test(text)) {
        const answerMatch = text.match(/([A-D])[\.\)]/);
        if (answerMatch) {
          return { answer: answerMatch[1], explanation: "" };
        }
      }
    }
    return null;
  }
  var init_extract = __esm({
    "src/dom/extract.js"() {
      init_deepQuery();
      init_query();
      init_query();
    }
  });

  // content.js
  var import_html2canvas = __toESM(require_html2canvas());

  // src/config/constants.js
  var CONFIG = {
    // CSS 셀렉터
    selectors: {
      // 문제 화면 판별용
      choice: '[role="radio"], button[aria-label*="Choice"], button[class*="choice"], [class*="option"]',
      correct: '.correct, [aria-label*="Correct"], [aria-label*="\uC815\uB2F5"], [class*="correct"], [class*="\uC815\uB2F5"]',
      incorrect: '[class*="incorrect"], [class*="\uC624\uB2F5"]',
      // 버튼
      button: 'button, [role="button"]',
      // 문제 번호
      problemNumber: '[class*="problem"], [class*="question"], [data-problem-number]',
      // Progress 표시
      progress: '[class*="progress"], [aria-label*="progress"]'
    },
    // 타임아웃 설정 (밀리초) - 속도 최적화 (문제 스크랩 집중)
    timeouts: {
      elementWait: 80,
      // 요소 대기 간격
      maxElementWait: 2500,
      // 최대 요소 대기 시간
      screenTransition: 150,
      // 화면 전환 대기 (UI 반응 빠름)
      contentLoad: 150,
      // 콘텐츠 로드 대기
      gradingWait: 1e3,
      // 채점 완료 대기
      clickDelay: 120,
      // 클릭 후 대기
      scrollDelay: 150,
      // 스크롤 후 대기
      pdfDownloadDelay: 300,
      // PDF 다운로드 간격
      // 문제 생성 탭: 선지 선택 구간 대기 (너무 빨리 지나가는 것 방지, 특히 사진 있는 문제)
      beforeChoiceClick: 400,
      // 선지 클릭 전 대기 (문제/선지 인지 시간)
      beforeChoiceClickWithImage: 2800,
      // 이미지 있는 문제: 선지 클릭 전 2.8초 대기
      afterChoiceClick: 450,
      // 선지 클릭 후 제출 전 대기
      afterChoiceClickWithImage: 2800
      // 이미지 있는 문제: 선지 클릭 후 2.8초 대기
    },
    // 재시도 설정
    retries: {
      elementFind: 15,
      // 요소 찾기 재시도 횟수
      buttonClick: 3,
      // 버튼 클릭 재시도 횟수
      navigation: 30,
      // 네비게이션 재시도 횟수
      consecutiveFailures: 3
      // 최대 연속 실패 횟수
    },
    // 버튼 텍스트 (다국어 지원)
    buttonTexts: {
      open: ["\uC5F4\uAE30", "Open"],
      continue: ["\uACC4\uC18D", "Continue"],
      start: ["\uC2DC\uC791", "Start", "\uD14C\uC2A4\uD2B8 \uC2DC\uC791", "Start Test"],
      next: ["\uB2E4\uC74C", "Next"],
      submit: ["\uC81C\uCD9C", "Submit", "\uD655\uC778", "Confirm"],
      first: ["\uCC98\uC74C", "First", "1"]
    },
    // 문제 수집 설정
    collection: {
      maxIterations: 60,
      // 최대 반복 횟수
      maxProblems: 27,
      // Reading 모듈당 최대 문제 수
      mathMaxProblems: 22
      // Math 모듈당 최대 문제 수 (주관식 포함)
    },
    // Gemini 채팅 자동화 설정
    geminiChat: {
      inputSelectors: [
        '[data-testid*="input"]',
        '[data-testid*="textbox"]',
        '[role="textbox"]',
        '[role="combobox"]',
        '[contenteditable="true"]',
        'textarea[aria-label*="message"]',
        'textarea[aria-label*="prompt"]',
        'textarea[aria-label*="chat"]',
        'textarea[aria-label*="\uC785\uB825"]',
        'textarea[aria-label*="\uBB3C\uC5B4\uBCF4\uAE30"]',
        'textarea[aria-label*="ask"]',
        'textarea[placeholder*="message"]',
        'textarea[placeholder*="prompt"]',
        'textarea[placeholder*="chat"]',
        'textarea[placeholder*="\uC785\uB825"]',
        'textarea[placeholder*="\uBB3C\uC5B4\uBCF4\uAE30"]'
      ],
      submitSelectors: [
        'button[data-testid*="send"]',
        'button[data-testid*="submit"]',
        'button[aria-label*="send"]',
        'button[aria-label*="Send"]',
        'button[aria-label*="\uC804\uC1A1"]',
        'button[type="submit"]',
        'button[aria-label*="submit"]'
      ],
      message: "I want to take a full practice SAT TEST.",
      satUIWaitTimeout: 6e4
      // SAT UI 대기 타임아웃 (1분)
    },
    // Gemini SAT UI 진입 후 설정 단계 (geminiSetup.js)
    geminiSetup: {
      startButtonSelectors: [
        "section-overview glowing-card:first-child .section-button-container button",
        "glowing-card .section-button-container.ng-star-inserted button",
        "activity-set section-overview .glowing-card .section-button-container button"
      ],
      firstToggleSelectors: [
        'button[id^="mat-mdc-slide-toggle-"]',
        ".mdc-switch",
        "span.mdc-switch__handle-track",
        "span.mdc-switch__shadow"
      ],
      secondToggleSelectors: [
        'button[id^="mat-mdc-slide-toggle-"]',
        "span.mdc-switch__track"
      ],
      setupSequenceTimeout: 15e3
      // 설정 시퀀스 최대 대기 (15초)
    }
  };
  var TEMP_MODE = false;
  var TEMP_TARGET_NUMBERS = [1, 2, 3];

  // content.js
  init_deepQuery();

  // src/dom/wait.js
  init_deepQuery();
  async function waitForElement(selector, retries = CONFIG.retries.elementFind, interval = CONFIG.timeouts.elementWait) {
    for (let i = 0; i < retries; i++) {
      let element = null;
      if (typeof selector === "function") {
        element = selector();
      } else {
        element = document.querySelector(selector);
      }
      if (element && isElementVisible(element)) {
        return element;
      }
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, interval));
      }
    }
    return null;
  }
  async function waitForCondition(condition, maxWait = CONFIG.timeouts.maxElementWait, interval = CONFIG.timeouts.elementWait) {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWait) {
      if (condition()) {
        return true;
      }
      await new Promise((resolve) => setTimeout(resolve, interval));
    }
    return false;
  }
  function waitForContentLoad(delay = 1e3) {
    return new Promise((resolve) => {
      let observer;
      let timeout;
      const cleanup = () => {
        if (observer) observer.disconnect();
        if (timeout) clearTimeout(timeout);
      };
      timeout = setTimeout(() => {
        cleanup();
        resolve();
      }, delay);
      observer = new MutationObserver(() => {
        cleanup();
        setTimeout(resolve, 25);
      });
      if (document.body) {
        observer.observe(document.body, {
          childList: true,
          subtree: true
        });
      } else {
        const bodyObserver = new MutationObserver(() => {
          if (document.body) {
            observer.observe(document.body, {
              childList: true,
              subtree: true
            });
            bodyObserver.disconnect();
          }
        });
        bodyObserver.observe(document.documentElement, {
          childList: true,
          subtree: true
        });
      }
    });
  }
  async function forceClick(button, retries = 3) {
    if (!button) {
      return false;
    }
    if (button.tagName === "A") {
      const href = button.getAttribute("href");
      const target = button.getAttribute("target");
      if (href && (href.startsWith("http") || target === "_blank" || target === "_new")) {
        console.error("[SAT-DEBUG] \uC678\uBD80 \uB9C1\uD06C \uD074\uB9AD \uBC29\uC9C0:", href, target);
        return false;
      }
    }
    if (button.hasAttribute("href") && button.getAttribute("href") !== "#" && !button.getAttribute("href").startsWith("javascript:")) {
      console.error("[SAT-DEBUG] \uB124\uBE44\uAC8C\uC774\uC158 \uB9C1\uD06C \uD074\uB9AD \uBC29\uC9C0:", button.getAttribute("href"));
      return false;
    }
    if (button.getAttribute("target") === "_blank" || button.getAttribute("target") === "_new") {
      console.error("[SAT-DEBUG] \uC0C8 \uCC3D \uC5F4\uAE30 \uC18D\uC131 \uD074\uB9AD \uBC29\uC9C0");
      return false;
    }
    const currentUrl = window.location.href;
    for (let i = 0; i < retries; i++) {
      try {
        console.log(`[SAT-DEBUG] forceClick \uC2DC\uB3C4 ${i + 1}/${retries}`);
        button.scrollIntoView({ behavior: "smooth", block: "center" });
        await new Promise((resolve) => setTimeout(resolve, 150));
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const pointerDownEvent = new PointerEvent("pointerdown", {
          view: window,
          bubbles: true,
          cancelable: true,
          composed: true,
          pointerId: 1,
          pointerType: "mouse",
          clientX: centerX,
          clientY: centerY,
          button: 0,
          buttons: 1
        });
        button.dispatchEvent(pointerDownEvent);
        await new Promise((resolve) => setTimeout(resolve, 50));
        const mouseDownEvent = new MouseEvent("mousedown", {
          view: window,
          bubbles: true,
          cancelable: true,
          composed: true,
          buttons: 1,
          clientX: centerX,
          clientY: centerY
        });
        button.dispatchEvent(mouseDownEvent);
        await new Promise((resolve) => setTimeout(resolve, 50));
        if (button.focus) {
          button.focus();
          await new Promise((resolve) => setTimeout(resolve, 50));
        }
        const pointerUpEvent = new PointerEvent("pointerup", {
          view: window,
          bubbles: true,
          cancelable: true,
          composed: true,
          pointerId: 1,
          pointerType: "mouse",
          clientX: centerX,
          clientY: centerY,
          button: 0,
          buttons: 0
        });
        button.dispatchEvent(pointerUpEvent);
        await new Promise((resolve) => setTimeout(resolve, 50));
        const mouseUpEvent = new MouseEvent("mouseup", {
          view: window,
          bubbles: true,
          cancelable: true,
          composed: true,
          buttons: 0,
          clientX: centerX,
          clientY: centerY
        });
        button.dispatchEvent(mouseUpEvent);
        await new Promise((resolve) => setTimeout(resolve, 50));
        const clickEvent = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
          composed: true,
          buttons: 1,
          clientX: centerX,
          clientY: centerY
        });
        button.dispatchEvent(clickEvent);
        await new Promise((resolve) => setTimeout(resolve, 60));
        try {
          button.click();
        } catch (e) {
          console.warn("[SAT-DEBUG] button.click() \uC2E4\uD328 (\uC608\uC0C1\uB428):", e);
        }
        await new Promise((resolve) => setTimeout(resolve, 60));
        if (window.location.href !== currentUrl) {
          console.error("[SAT-DEBUG] URL\uC774 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4! \uB2E4\uB978 \uCC3D\uC73C\uB85C \uB118\uC5B4\uAC14\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.");
          window.history.back();
          await new Promise((resolve) => setTimeout(resolve, 500));
          return false;
        }
        console.log("[SAT-DEBUG] forceClick \uC131\uACF5");
        return true;
      } catch (error) {
        console.warn(`[SAT-DEBUG] forceClick \uC2E4\uD328 (${i + 1}/${retries}):`, error);
        if (i < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, 250));
        }
      }
    }
    return false;
  }
  async function safeClick(button, retries = CONFIG.retries.buttonClick) {
    if (!button || !isElementVisible(button)) {
      return false;
    }
    for (let i = 0; i < retries; i++) {
      try {
        button.scrollIntoView({ behavior: "smooth", block: "center" });
        await new Promise((resolve) => setTimeout(resolve, CONFIG.timeouts.scrollDelay));
        const mouseEvent = new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
          buttons: 1
        });
        button.dispatchEvent(mouseEvent);
        await new Promise((resolve) => setTimeout(resolve, CONFIG.timeouts.clickDelay));
        button.click();
        await new Promise((resolve) => setTimeout(resolve, CONFIG.timeouts.clickDelay));
        button.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, cancelable: true, buttons: 1 }));
        await new Promise((resolve) => setTimeout(resolve, 60));
        button.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, cancelable: true, buttons: 1 }));
        await new Promise((resolve) => setTimeout(resolve, 60));
        button.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
        return true;
      } catch (error) {
        console.warn(`[SAT PDF Exporter] \uBC84\uD2BC \uD074\uB9AD \uC7AC\uC2DC\uB3C4 ${i + 1}/${retries}:`, error);
        if (i < retries - 1) {
          await new Promise((resolve) => setTimeout(resolve, CONFIG.timeouts.clickDelay));
        }
      }
    }
    return false;
  }
  function showToast(message, type = "info") {
    const existingToast = document.getElementById("gemini-sat-toast");
    if (existingToast) {
      existingToast.remove();
    }
    const toast = document.createElement("div");
    toast.id = "gemini-sat-toast";
    toast.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 10001;
    background: ${type === "error" ? "#f44336" : type === "success" ? "#4caf50" : "#2196f3"};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 14px;
    max-width: 300px;
    animation: slideIn 0.3s ease;
  `;
    toast.textContent = message;
    if (!document.getElementById("gemini-sat-toast-styles")) {
      const style = document.createElement("style");
      style.id = "gemini-sat-toast-styles";
      style.textContent = `
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;
      document.head.appendChild(style);
    }
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = "slideOut 0.3s ease";
      setTimeout(() => {
        if (toast.parentNode) {
          toast.remove();
        }
      }, 300);
    }, 3e3);
  }

  // content.js
  init_extract();

  // src/dom/buttons.js
  init_deepQuery();
  init_extract();
  init_query();
  init_query();
  init_query();
  function readProgressNumber() {
    const progressState = getProgressState();
    if (!progressState) return null;
    const match = progressState.match(/(\d+)\s*\/\s*(\d+)/);
    if (match) {
      return parseInt(match[1]);
    }
    return null;
  }
  function findButtonByText(...labels) {
    const buttons = Array.from(deepQuerySelectorAll('button, [role="button"]'));
    return buttons.find((btn) => {
      if (!isElementVisible(btn) || btn.disabled) return false;
      if (btn.tagName === "A") {
        const href = btn.getAttribute("href");
        const target = btn.getAttribute("target");
        if (href && (href.startsWith("http") || target === "_blank" || target === "_new")) {
          console.warn("[SAT-DEBUG] \uC678\uBD80 \uB9C1\uD06C \uC81C\uC678:", href, target);
          return false;
        }
        if (href && href !== "#" && !href.startsWith("javascript:")) {
          console.warn("[SAT-DEBUG] \uB124\uBE44\uAC8C\uC774\uC158 \uB9C1\uD06C \uC81C\uC678:", href);
          return false;
        }
      }
      if (btn.hasAttribute("href") && btn.getAttribute("href") !== "#" && !btn.getAttribute("href").startsWith("javascript:")) {
        console.warn("[SAT-DEBUG] href \uC18D\uC131 \uC788\uB294 \uC694\uC18C \uC81C\uC678:", btn.getAttribute("href"));
        return false;
      }
      if (btn.getAttribute("target") === "_blank" || btn.getAttribute("target") === "_new") {
        console.warn("[SAT-DEBUG] \uC0C8 \uCC3D \uC5F4\uAE30 \uC18D\uC131 \uC788\uB294 \uC694\uC18C \uC81C\uC678");
        return false;
      }
      const text = (btn.innerText || btn.textContent || "").trim();
      const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
      return labels.some(
        (label) => text.includes(label) || ariaLabel.includes(label)
      );
    });
  }
  async function clickSubmitWithConfirmation(onAfterConfirmClick) {
    console.log("[SUBMIT] \uC81C\uCD9C \uBC84\uD2BC \uCC3E\uB294 \uC911...");
    const satRoot = findSatRoot();
    if (!satRoot) {
      console.error("[SUBMIT] satRoot not found, \uC81C\uCD9C \uBC84\uD2BC \uCC3E\uAE30 \uC2E4\uD328");
      return false;
    }
    const modalsFirst = document.querySelectorAll('[role="dialog"], [class*="modal"], [class*="dialog"], [class*="cdk-overlay-pane"]');
    for (const modal of modalsFirst) {
      if (!isElementVisible(modal)) continue;
      const modalButtons = modal.querySelectorAll('button, [role="button"]');
      for (const btn of modalButtons) {
        if (!isElementVisible(btn) || btn.disabled) continue;
        const text = (btn.innerText || btn.textContent || "").trim();
        const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
        if ((text === "\uC81C\uCD9C" || text.includes("Submit") || text === "\uD655\uC778") && !text.includes("\uCDE8\uC18C")) {
          console.log("[SUBMIT] \uC774\uBBF8 \uC5F4\uB9B0 \uD655\uC778 \uD31D\uC5C5\uC5D0\uC11C \uC81C\uCD9C \uBC84\uD2BC \uD074\uB9AD");
          btn.click();
          if (typeof onAfterConfirmClick === "function") {
            await onAfterConfirmClick();
          }
          await new Promise((resolve) => setTimeout(resolve, 250));
          return true;
        }
      }
    }
    const SUBMIT_KEYWORDS_KO = ["\uC81C\uCD9C", "\uC815\uB2F5", "\uD655\uC778", "\uCC44\uC810", "\uC815\uB2F5 \uD655\uC778", "\uC815\uB2F5\uD655\uC778", "\uCC44\uC810\uD558\uAE30", "\uC815\uB2F5\uBCF4\uAE30"];
    const SUBMIT_KEYWORDS_EN = ["submit", "check", "answer", "confirm", "check answer", "checkanswer", "show answer", "view answer"];
    await new Promise((resolve) => setTimeout(resolve, 15));
    const allButtons = Array.from(satRoot.querySelectorAll('button, [role="button"]'));
    console.log(`[SUBMIT] satRoot \uB0B4\uBD80 \uBC84\uD2BC: ${allButtons.length}\uAC1C`);
    const visibleButtons = allButtons.filter((b) => {
      if (!isElementVisible(b)) return false;
      if (b.disabled) return false;
      if (!satRoot.contains(b)) return false;
      return true;
    });
    console.log(`[DIAG] buttons visible:`, visibleButtons.slice(0, 5).map((b) => ({
      text: (b.innerText || b.textContent || "").trim().substring(0, 30),
      ariaLabel: b.getAttribute("aria-label") || "none",
      testid: b.getAttribute("data-testid") || "none",
      disabled: b.disabled
    })));
    const candidates = [];
    for (const btn of visibleButtons) {
      const text = (btn.innerText || btn.textContent || "").trim();
      const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
      const dataTestId = (btn.getAttribute("data-testid") || "").trim();
      const combined = (text + " " + ariaLabel).toLowerCase();
      let score = 0;
      for (const keyword of [...SUBMIT_KEYWORDS_KO, ...SUBMIT_KEYWORDS_EN]) {
        if (text.includes(keyword) || ariaLabel.includes(keyword)) {
          score += 5;
        }
        if (combined.includes(keyword.toLowerCase())) {
          score += 3;
        }
      }
      if (dataTestId && (dataTestId.includes("submit") || dataTestId.includes("check") || dataTestId.includes("confirm"))) {
        score += 8;
      }
      if (ariaLabel && (ariaLabel.includes("\uC81C\uCD9C") || ariaLabel.includes("submit") || ariaLabel.includes("check"))) {
        score += 6;
      }
      if (score > 0) {
        candidates.push({ button: btn, score, text, ariaLabel, dataTestId });
      }
    }
    candidates.sort((a, b) => b.score - a.score);
    if (candidates.length === 0) {
      console.error("[SUBMIT] \uC81C\uCD9C \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      console.error("[DIAG] satRoot snippet:", satRoot?.innerText?.slice(0, 500));
      return false;
    }
    const submitButton = candidates[0].button;
    console.log(`[SUBMIT] \uC81C\uCD9C \uBC84\uD2BC \uBC1C\uACAC: "${candidates[0].text}" (\uC810\uC218: ${candidates[0].score})`);
    console.log("[SUBMIT] \uC81C\uCD9C \uBC84\uD2BC \uD074\uB9AD");
    submitButton.scrollIntoView({ behavior: "smooth", block: "center" });
    await new Promise((resolve) => setTimeout(resolve, 10));
    submitButton.click();
    await waitForContentLoad(120);
    const maxWait = 40;
    for (let i = 0; i < maxWait; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30));
      const modals = document.querySelectorAll('[role="dialog"], [class*="modal"], [class*="dialog"]');
      let confirmSubmitButton = null;
      for (const modal of modals) {
        if (!isElementVisible(modal)) continue;
        const modalButtons = modal.querySelectorAll('button, [role="button"]');
        for (const btn of modalButtons) {
          if (!isElementVisible(btn) || btn.disabled) continue;
          const text = (btn.innerText || btn.textContent || "").trim();
          const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
          if (text.includes("\uC81C\uCD9C") || text.includes("Submit") || text.includes("\uD655\uC778") || ariaLabel.includes("\uC81C\uCD9C") || ariaLabel.includes("Submit") || ariaLabel.includes("\uD655\uC778")) {
            confirmSubmitButton = btn;
            break;
          }
        }
        if (confirmSubmitButton) break;
      }
      if (!confirmSubmitButton) {
        const satRootButtons = satRoot.querySelectorAll('button, [role="button"]');
        for (const btn of satRootButtons) {
          if (!isElementVisible(btn) || btn.disabled) continue;
          const text = (btn.innerText || btn.textContent || "").trim();
          if (text.includes("\uC81C\uCD9C") || text.includes("Submit") || text.includes("\uD655\uC778")) {
            confirmSubmitButton = btn;
            break;
          }
        }
      }
      if (confirmSubmitButton) {
        console.log("[SUBMIT] \uD655\uC778 \uD31D\uC5C5\uC5D0\uC11C \uC81C\uCD9C \uBC84\uD2BC \uD074\uB9AD");
        confirmSubmitButton.click();
        if (typeof onAfterConfirmClick === "function") {
          await onAfterConfirmClick();
        }
        await waitForContentLoad(150);
        return true;
      }
    }
    console.warn("[SUBMIT] \uD655\uC778 \uD31D\uC5C5\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. (\uD31D\uC5C5\uC774 \uC5C6\uC744 \uC218\uB3C4 \uC788\uC74C)");
    if (typeof onAfterConfirmClick === "function") {
      await onAfterConfirmClick();
    }
    return true;
  }
  async function clickNextButtonWithFallback(beforeProblemNum) {
    const callId = `next_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    let clickCount = 0;
    const MAX_CLICKS_PER_CALL = 2;
    console.log(`[NEXT-DEBUG] clickNextButtonWithFallback \uC2DC\uC791 callId=${callId}, beforeProblemNum=${beforeProblemNum}`);
    console.log("[SAT PDF Exporter] [DEBUG] Fail Stage: \uB2E4\uC74C \uBC84\uD2BC \uD074\uB9AD \uB2E8\uACC4 \uC2DC\uC791");
    const maxRetries = 3;
    let alternativeCandidates = [];
    for (let retry = 0; retry < maxRetries; retry++) {
      if (retry > 0) {
        console.log(`[SAT PDF Exporter] \uB2E4\uC74C \uBC84\uD2BC \uD074\uB9AD \uC7AC\uC2DC\uB3C4 ${retry}/${maxRetries}`);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
      const prevProgress = readProgressNumber();
      console.log(`[SAT-DEBUG] [STEP 2] \uD074\uB9AD \uC804 \uC9C4\uD589 \uC0C1\uD669: ${prevProgress}`);
      let nextButton = null;
      nextButton = selectNextButton();
      if (!nextButton) {
        nextButton = findNavigationButton2("next", "\uB2E4\uC74C", "next");
      }
      if (nextButton && alternativeCandidates.length === 0) {
        const allCandidates = [];
        const allButtons = deepQuerySelectorAll('button, [role="button"], div[role="button"]');
        for (const btn of allButtons) {
          if (!isElementVisible(btn) || btn.disabled) continue;
          const text = (btn.innerText || btn.textContent || "").trim();
          const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
          const dataTestId = (btn.getAttribute("data-testid") || "").trim();
          if ((text.includes("\uB2E4\uC74C") || text.toLowerCase().includes("next") || ariaLabel.includes("\uB2E4\uC74C") || ariaLabel.toLowerCase().includes("next") || dataTestId.includes("next")) && btn !== nextButton) {
            allCandidates.push(btn);
          }
        }
        alternativeCandidates = allCandidates.slice(0, 3);
        console.log(`[SAT-DEBUG] \uB300\uCCB4 \uD6C4\uBCF4 ${alternativeCandidates.length}\uAC1C \uC218\uC9D1`);
      }
      if (!nextButton) {
        const xpathSelectors = [
          "//span[text()='\uB2E4\uC74C']",
          "//span[text()='Next']",
          "//button[contains(text(), '\uB2E4\uC74C')]",
          "//button[contains(text(), 'Next')]"
        ];
        for (const xpath of xpathSelectors) {
          try {
            const result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            const element = result.singleNodeValue;
            if (element && (element.tagName === "BUTTON" || element.closest("button"))) {
              nextButton = element.tagName === "BUTTON" ? element : element.closest("button");
              if (nextButton && nextButton.offsetParent) {
                console.log(`[SAT PDF Exporter] \uB2E4\uC74C \uBC84\uD2BC \uBC1C\uACAC (XPath: ${xpath})`);
                break;
              }
            }
          } catch (e) {
          }
        }
      }
      if (!nextButton) {
        const classSelectors = [
          "button.mat-mdc-unelevated-button",
          'button[class*="next"]',
          'button[class*="Next"]',
          'button[aria-label*="next"]',
          'button[aria-label*="\uB2E4\uC74C"]'
        ];
        for (const selector of classSelectors) {
          const buttons = document.querySelectorAll(selector);
          for (const btn of buttons) {
            const text = (btn.innerText || btn.textContent || "").trim().toLowerCase();
            if ((text.includes("\uB2E4\uC74C") || text.includes("next")) && btn.offsetParent && !btn.disabled) {
              nextButton = btn;
              console.log(`[SAT PDF Exporter] \uB2E4\uC74C \uBC84\uD2BC \uBC1C\uACAC (\uD074\uB798\uC2A4: ${selector})`);
              break;
            }
          }
          if (nextButton) break;
        }
      }
      if (!nextButton) {
        const submitButton = findNavigationButton2("submit", "\uC81C\uCD9C", "submit");
        if (submitButton) {
          console.log("[SAT PDF Exporter] \uC81C\uCD9C \uBC84\uD2BC \uBC1C\uACAC - \uB9C8\uC9C0\uB9C9 \uBB38\uC81C\uC785\uB2C8\uB2E4.");
          return true;
        }
        console.warn(`[SAT PDF Exporter] [DEBUG] Fail Stage: \uB2E4\uC74C \uBC84\uD2BC \uD074\uB9AD \uB2E8\uACC4 - \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (\uC7AC\uC2DC\uB3C4 ${retry + 1}/${maxRetries})`);
        continue;
      }
      if (nextButton.disabled || nextButton.getAttribute("aria-disabled") === "true") {
        console.log("[SAT PDF Exporter] \uB2E4\uC74C \uBC84\uD2BC\uC774 \uBE44\uD65C\uC131\uD654\uB428. \uD65C\uC131\uD654 \uB300\uAE30...");
        let waitAttempts = 0;
        const maxWaitAttempts = 30;
        while (waitAttempts < maxWaitAttempts && (nextButton.disabled || nextButton.getAttribute("aria-disabled") === "true")) {
          await new Promise((resolve) => setTimeout(resolve, 30));
          waitAttempts++;
          if (waitAttempts % 5 === 0) {
            const refreshedButton = findNavigationButton2("next", "\uB2E4\uC74C", "next");
            if (refreshedButton && !refreshedButton.disabled) {
              nextButton = refreshedButton;
              break;
            }
          }
        }
        if (nextButton.disabled || nextButton.getAttribute("aria-disabled") === "true") {
          console.log("[SAT PDF Exporter] \uB2E4\uC74C \uBC84\uD2BC\uC774 \uACC4\uC18D \uBE44\uD65C\uC131\uD654\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.");
          const progressState = getProgressState();
          if (progressState && (progressState.match(/\d+\s*\/\s*27/) || progressState.match(/\d+\s*\/\s*22/)) && (progressState.includes("27") || progressState.includes("22"))) {
            console.log("[SAT PDF Exporter] \uB9C8\uC9C0\uB9C9 \uBB38\uC81C \uB3C4\uB2EC (progress:", progressState, ")");
            return true;
          }
          continue;
        }
      }
      const beforeSignature = getQuestionSignature();
      const beforeProgress = getProgressState();
      try {
        nextButton.scrollIntoView({ behavior: "smooth", block: "center" });
        await new Promise((resolve) => setTimeout(resolve, 30));
      } catch (e) {
        console.warn("[SAT-DEBUG] scrollIntoView \uC2E4\uD328, \uC804\uCCB4 \uC2A4\uD06C\uB864 \uC2DC\uB3C4:", e);
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((resolve) => setTimeout(resolve, 80));
        window.scrollTo(0, 0);
        await new Promise((resolve) => setTimeout(resolve, 80));
      }
      console.log(`[SAT-DEBUG] \uB2E4\uC74C \uBC84\uD2BC \uD074\uB9AD \uC2DC\uB3C4 (${beforeProblemNum} \u2192 \uB2E4\uC74C) callId=${callId}, clickCount=${clickCount}`);
      if (clickCount >= MAX_CLICKS_PER_CALL) {
        console.error(`[NEXT-DEBUG] \u2717 \uD074\uB9AD \uC911\uBCF5 \uBC29\uC9C0: callId=${callId}\uC5D0\uC11C \uC774\uBBF8 ${clickCount}\uBC88 \uD074\uB9AD\uD568 (\uCD5C\uB300 ${MAX_CLICKS_PER_CALL}\uBC88)`);
        console.warn(`[NEXT-DEBUG] \uD074\uB9AD \uD55C\uB3C4 \uB3C4\uB2EC\uB85C \uC774\uBC88 \uD638\uCD9C\uC744 \uC885\uB8CC\uD558\uACE0 \uC0C1\uC704 \uB8E8\uD504\uC5D0\uC11C \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4. callId=${callId}`);
        return false;
      }
      let clickPerformed = false;
      const clickTimestamp = Date.now();
      try {
        console.log(`[NEXT-DEBUG] \uD074\uB9AD \uC9C1\uC804 timestamp=${clickTimestamp}, callId=${callId}`);
        nextButton.click();
        clickCount++;
        clickPerformed = true;
        console.log(`[NEXT-DEBUG] \u2713 Next \uBC84\uD2BC \uD074\uB9AD \uC644\uB8CC: click() \uBA54\uC11C\uB4DC \uC0AC\uC6A9, callId=${callId}, clickCount=${clickCount}`);
        await new Promise((resolve) => setTimeout(resolve, 120));
      } catch (e) {
        console.warn("[SAT-DEBUG] click() \uBA54\uC11C\uB4DC \uC2E4\uD328, dispatchEvent \uD3F4\uBC31 \uC2DC\uB3C4:", e);
        clickPerformed = false;
      }
      let attempts = 0;
      const maxAttempts = 25;
      let success = false;
      let progressDelta = null;
      while (attempts < maxAttempts && !success && clickPerformed) {
        await new Promise((resolve) => setTimeout(resolve, 80));
        attempts++;
        const nextProgress = readProgressNumber();
        if (prevProgress !== null && nextProgress !== null) {
          progressDelta = nextProgress - prevProgress;
          console.log(`[SAT-DEBUG] [STEP 2] \uC9C4\uD589 \uC0C1\uD669 \uB378\uD0C0: ${prevProgress} \u2192 ${nextProgress} (\uB378\uD0C0: ${progressDelta})`);
          if (progressDelta !== 1) {
            console.error(`[SAT-DEBUG] [STEP 2] ERROR: \uC608\uC0C1\uCE58 \uBABB\uD55C \uC9C4\uD589 \uC0C1\uD669 \uC810\uD504! ${prevProgress} \u2192 ${nextProgress} (\uB378\uD0C0: ${progressDelta}, \uC608\uC0C1: +1)`);
            if (alternativeCandidates.length > 0 && retry === 0) {
              console.log(`[SAT-DEBUG] [STEP 2] \uB300\uCCB4 \uD6C4\uBCF4 \uC2DC\uB3C4 (${alternativeCandidates.length}\uAC1C)`);
              const altButton = alternativeCandidates[0];
              alternativeCandidates = alternativeCandidates.slice(1);
              try {
                altButton.scrollIntoView({ behavior: "smooth", block: "center" });
                await new Promise((resolve) => setTimeout(resolve, 120));
                altButton.click();
                await new Promise((resolve) => setTimeout(resolve, 80));
                const altNextProgress = readProgressNumber();
                if (altNextProgress !== null && prevProgress !== null) {
                  const altDelta = altNextProgress - prevProgress;
                  console.log(`[SAT-DEBUG] [STEP 2] \uB300\uCCB4 \uD6C4\uBCF4 \uACB0\uACFC: ${prevProgress} \u2192 ${altNextProgress} (\uB378\uD0C0: ${altDelta})`);
                  if (altDelta === 1) {
                    console.log(`[SAT-DEBUG] [STEP 2] \uB300\uCCB4 \uD6C4\uBCF4 \uC131\uACF5! \uB378\uD0C0 +1 \uD655\uC778`);
                    success = true;
                    break;
                  }
                }
              } catch (e) {
                console.warn(`[SAT-DEBUG] [STEP 2] \uB300\uCCB4 \uD6C4\uBCF4 \uD074\uB9AD \uC2E4\uD328:`, e);
              }
            }
            if (!success) {
              console.error(`[SAT-DEBUG] [STEP 2] \uC9C4\uD589 \uC0C1\uD669 \uC810\uD504\uAC00 \uACC4\uC18D\uB428. PDF \uC0DD\uC131\uC740 \uACC4\uC18D\uD558\uB418 \uACBD\uACE0 \uD45C\uC2DC \uD544\uC694.`);
              if (progressDelta > 0) {
                success = true;
                break;
              }
            }
          } else {
            success = true;
            console.log(`[SAT-DEBUG] [STEP 2] \uC131\uACF5: \uC9C4\uD589 \uC0C1\uD669 \uB378\uD0C0 +1 \uD655\uC778\uB428`);
            break;
          }
        }
        const afterProblemNum = getCurrentProblemNumber();
        if (afterProblemNum < beforeProblemNum && afterProblemNum > 0) {
          console.warn(`[SAT PDF Exporter] \uBB38\uC81C \uBC88\uD638\uAC00 \uAC10\uC18C\uD568: ${beforeProblemNum} \u2192 ${afterProblemNum} (detection bug \uC758\uC2EC)`);
          await new Promise((resolve) => setTimeout(resolve, 120));
          const retryProblemNum = getCurrentProblemNumber();
          if (retryProblemNum > afterProblemNum && retryProblemNum > beforeProblemNum) {
            success = true;
            console.log(`[SAT PDF Exporter] \uC7AC\uC2DC\uB3C4 \uD6C4 \uBB38\uC81C \uBC88\uD638 \uD655\uC778: ${beforeProblemNum} \u2192 ${retryProblemNum}`);
            break;
          }
          continue;
        }
        if (afterProblemNum === beforeProblemNum + 1) {
          success = true;
          console.log(`[SAT PDF Exporter] \u2713 \uBB38\uC81C \uBC88\uD638 \uC815\uD655\uD788 +1 \uC99D\uAC00 \uD655\uC778: ${beforeProblemNum} \u2192 ${afterProblemNum}`);
          console.log("[SAT PDF Exporter] [DEBUG] Fail Stage: \uB2E4\uC74C \uBC84\uD2BC \uD074\uB9AD \uB2E8\uACC4 - \uC131\uACF5");
          break;
        } else if (afterProblemNum > beforeProblemNum + 1) {
          const jumpSize = afterProblemNum - beforeProblemNum;
          console.error(`[BUG] \u2717 progress jumped ${beforeProblemNum}\u2192${afterProblemNum} (jump size: +${jumpSize}, expected: +1)`);
          console.error(`[BUG] \uBC29\uAE08 \uD074\uB9AD\uD55C \uBC84\uD2BC \uC815\uBCF4:`, {
            callId,
            clickTimestamp,
            clickCount,
            beforeProblemNum,
            afterProblemNum,
            jumpSize,
            selectedButton: nextButton ? {
              text: (nextButton.innerText || nextButton.textContent || "").trim(),
              ariaLabel: nextButton.getAttribute("aria-label"),
              dataTestId: nextButton.getAttribute("data-testid"),
              outerHTML: nextButton.outerHTML.substring(0, 200)
            } : null
          });
          throw new Error(`[BUG] Progress jump detected: ${beforeProblemNum} \u2192 ${afterProblemNum} (expected: ${beforeProblemNum + 1}). callId=${callId}`);
        } else if (afterProblemNum !== beforeProblemNum && afterProblemNum > beforeProblemNum) {
          console.warn(`[SAT PDF Exporter] \uBB38\uC81C \uBC88\uD638 \uBCC0\uACBD \uD655\uC778: ${beforeProblemNum} \u2192 ${afterProblemNum} (\uC815\uD655\uD788 +1 \uC544\uB2D8)`);
          if (typeof TEMP_MODE === "undefined" || !TEMP_MODE) {
            success = true;
            console.log("[SAT PDF Exporter] [DEBUG] Fail Stage: \uB2E4\uC74C \uBC84\uD2BC \uD074\uB9AD \uB2E8\uACC4 - \uC131\uACF5 (TEMP \uBAA8\uB4DC \uC544\uB2D8)");
            break;
          } else {
            console.warn(`[SAT PDF Exporter] TEMP \uBAA8\uB4DC: \uC815\uD655\uD788 +1\uC774 \uC544\uB2C8\uBBC0\uB85C \uC7AC\uC2DC\uB3C4`);
            continue;
          }
        }
        const afterProgress = getProgressState();
        if (afterProgress !== beforeProgress && afterProgress) {
          const beforeMatch = beforeProgress ? beforeProgress.match(/(\d+)\s*\/\s*(\d+)/) : null;
          const afterMatch = afterProgress.match(/(\d+)\s*\/\s*(\d+)/);
          if (beforeMatch && afterMatch) {
            const beforeNum = parseInt(beforeMatch[1]);
            const afterNum = parseInt(afterMatch[1]);
            if (afterNum > beforeNum) {
              success = true;
              console.log(`[SAT PDF Exporter] Progress \uBCC0\uACBD \uD655\uC778: ${beforeProgress} \u2192 ${afterProgress}`);
              console.log("[SAT PDF Exporter] [DEBUG] Fail Stage: \uB2E4\uC74C \uBC84\uD2BC \uD074\uB9AD \uB2E8\uACC4 - \uC131\uACF5 (Progress \uBCC0\uACBD)");
              break;
            }
          }
        }
        const afterSignature = getQuestionSignature();
        if (afterSignature !== beforeSignature && afterSignature.length > 0 && beforeSignature.length > 0) {
          success = true;
          console.log(`[SAT PDF Exporter] \uBB38\uC81C \uC2DC\uADF8\uB2C8\uCC98 \uBCC0\uACBD \uD655\uC778: ${beforeSignature.substring(0, 20)}... \u2192 ${afterSignature.substring(0, 20)}...`);
          console.log("[SAT PDF Exporter] [DEBUG] Fail Stage: \uB2E4\uC74C \uBC84\uD2BC \uD074\uB9AD \uB2E8\uACC4 - \uC131\uACF5 (\uC2DC\uADF8\uB2C8\uCC98 \uBCC0\uACBD)");
          break;
        }
        const currentNextButton = findNavigationButton2("next", "\uB2E4\uC74C", "next");
        if (currentNextButton && !currentNextButton.disabled && (nextButton.disabled || nextButton.getAttribute("aria-disabled") === "true")) {
          await new Promise((resolve) => setTimeout(resolve, 250));
          const finalProblemNum = getCurrentProblemNumber();
          if (finalProblemNum !== beforeProblemNum && finalProblemNum > beforeProblemNum) {
            success = true;
            console.log(`[SAT PDF Exporter] next \uBC84\uD2BC \uD65C\uC131\uD654 \uD6C4 \uBB38\uC81C \uBC88\uD638 \uBCC0\uACBD: ${beforeProblemNum} \u2192 ${finalProblemNum}`);
            console.log("[SAT PDF Exporter] [DEBUG] Fail Stage: \uB2E4\uC74C \uBC84\uD2BC \uD074\uB9AD \uB2E8\uACC4 - \uC131\uACF5 (\uBC84\uD2BC \uD65C\uC131\uD654)");
            break;
          }
        }
        attempts++;
      }
      if (success) {
        return true;
      }
      if (retry < maxRetries - 1) {
        console.warn(`[SAT PDF Exporter] [DEBUG] Fail Stage: \uB2E4\uC74C \uBC84\uD2BC \uD074\uB9AD \uB2E8\uACC4 - \uC7AC\uC2DC\uB3C4 \uC608\uC815 (${retry + 1}/${maxRetries})`);
      }
    }
    console.error("[SAT PDF Exporter] [DEBUG] Fail Stage: \uB2E4\uC74C \uBC84\uD2BC \uD074\uB9AD \uB2E8\uACC4 - \uCD5C\uC885 \uC2E4\uD328 (\uBAA8\uB4E0 \uD3F4\uBC31 \uC2DC\uB3C4 \uC644\uB8CC)");
    return false;
  }
  async function clickFirstChoice(sectionType = "reading") {
    console.log("[CHOICE] \uC120\uC9C0 \uD074\uB9AD \uB2E8\uACC4 \uC2DC\uC791");
    if (sectionType === "math") {
      console.log("[SAT-DEBUG] \uC218\uD559 \uC139\uC158 - \uC8FC\uAD00\uC2DD \uC785\uB825\uCC3D \uC6B0\uC120 \uD0D0\uC0C9");
      const combinedSel = 'input[type="number"], input[type="text"][inputmode="numeric"], input[type="text"][pattern*="[0-9]"], input[placeholder*="\uC785\uB825"], input[placeholder*="\uC5EC\uAE30\uC5D0"], input[placeholder*="Enter"], textarea[placeholder*="\uC785\uB825"], textarea[placeholder*="\uC5EC\uAE30\uC5D0"], input[type="text"], textarea';
      const allInputs = deepQuerySelectorAll(combinedSel, document.body);
      const numberInputs = allInputs.filter((inp) => {
        const plc = (inp.getAttribute("placeholder") || "").toLowerCase();
        const isChatInput = plc.includes("message") || plc.includes("chat") || plc.includes("\uBA54\uC2DC\uC9C0") || inp.closest('[class*="chat-input"], [class*="message-input"]');
        if (isChatInput) return false;
        return true;
      });
      for (const input of numberInputs) {
        if (!isElementVisible(input) || input.disabled) continue;
        console.log("[SAT-DEBUG] \uC218\uD559 \uC8FC\uAD00\uC2DD \uBB38\uC81C \uAC10\uC9C0 - \uC22B\uC790 \uC785\uB825");
        input.focus();
        await new Promise((resolve) => setTimeout(resolve, 100));
        input.value = "1";
        input.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
        await new Promise((resolve) => setTimeout(resolve, 30));
        if (input.value !== "1") {
          console.warn("[SAT-DEBUG] \uAC12\uC774 \uC548 \uB4E4\uC5B4\uAC10, \uC7AC\uC2DC\uB3C4");
          input.value = "1";
          input.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
          await new Promise((resolve) => setTimeout(resolve, 30));
        }
        input.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
        await new Promise((resolve) => setTimeout(resolve, 30));
        input.dispatchEvent(new Event("blur", { bubbles: true, cancelable: true }));
        await new Promise((resolve) => setTimeout(resolve, 30));
        input.dispatchEvent(new KeyboardEvent("keydown", { key: "1", bubbles: true, cancelable: true }));
        await new Promise((resolve) => setTimeout(resolve, 15));
        input.dispatchEvent(new KeyboardEvent("keyup", { key: "1", bubbles: true, cancelable: true }));
        await new Promise((resolve) => setTimeout(resolve, 15));
        console.log("[SAT-DEBUG] \uC218\uD559 \uC8FC\uAD00\uC2DD \uC785\uB825 \uC644\uB8CC: value =", input.value);
        return true;
      }
    }
    const { extractChoices: extractChoices2 } = await Promise.resolve().then(() => (init_extract(), extract_exports));
    console.log("[CHOICE] extractChoices() \uD638\uCD9C\uD558\uC5EC \uC120\uD0DD\uC9C0 \uD6C4\uBCF4 \uAC00\uC838\uC624\uAE30...");
    const extractedChoices = extractChoices2(document.body);
    console.log(`[CHOICE] extractChoices \uACB0\uACFC: ${extractedChoices.length}\uAC1C \uC120\uD0DD\uC9C0 \uBC1C\uACAC`);
    if (extractedChoices.length === 0) {
      console.error("[CHOICE] extractChoices\uAC00 \uC120\uD0DD\uC9C0\uB97C \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
      return false;
    }
    const candidates = extractedChoices.filter((choice) => {
      const el = choice.element;
      if (!el || !isElementVisible(el) || el.disabled) return false;
      const isTextFallback = choice.source === "\uD14D\uC2A4\uD2B8 \uAE30\uBC18 \uD3F4\uBC31" || choice.priority === 5;
      if (isTextFallback) {
        console.log(`[CHOICE] \uD14D\uC2A4\uD2B8 \uAE30\uBC18 \uD3F4\uBC31 \uD6C4\uBCF4 ${choice.label}: \uC120\uD0DD \uC5EC\uBD80 \uCCB4\uD06C \uC2A4\uD0B5 (\uBB34\uC870\uAC74 \uD074\uB9AD)`);
        return true;
      }
      const isSelected = el.getAttribute("aria-checked") === "true" || el.getAttribute("aria-selected") === "true" || (el.className || "").includes("selected") || (el.className || "").includes("checked");
      if (isSelected) {
        console.log(`[CHOICE] \uC120\uD0DD\uC9C0 ${choice.label}\uB294 \uC774\uBBF8 \uC120\uD0DD\uB428 (\uC2A4\uD0B5)`);
        return false;
      }
      return true;
    }).map((choice) => ({
      element: choice.element,
      letter: choice.label,
      text: choice.text,
      source: choice.source,
      isTextFallback: choice.source === "\uD14D\uC2A4\uD2B8 \uAE30\uBC18 \uD3F4\uBC31" || choice.priority === 5
    }));
    if (candidates.length === 0) {
      console.error("[CHOICE] \uC120\uD0DD\uC9C0 \uD6C4\uBCF4\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return false;
    }
    console.log(`[CHOICE] candidates count=${candidates.length}`);
    console.log(`[DIAG] choices candidates top5:`, candidates.slice(0, 5).map((c) => ({
      text: c.text.substring(0, 30),
      ariaChecked: c.element.getAttribute("aria-checked"),
      role: c.element.getAttribute("role"),
      rect: c.element.getBoundingClientRect()
    })));
    const clickTargets = candidates.map((candidate) => {
      const el = candidate.element;
      const clickableWrapper = el.closest('button, [role="radio"], [role="option"], label, div[onclick], div[tabindex]');
      const target = clickableWrapper || el;
      const hasOnclick = target.hasAttribute("onclick");
      const hasTabindex = target.getAttribute("tabindex") !== null && parseInt(target.getAttribute("tabindex")) >= 0;
      const hasAriaChecked = target.getAttribute("aria-checked") !== null || target.getAttribute("aria-selected") !== null;
      const isStandardClickable = hasOnclick || hasTabindex || hasAriaChecked || target.tagName === "BUTTON" || target.tagName === "LABEL";
      const isClickable = isStandardClickable || candidate.isTextFallback && el && el.offsetParent;
      return {
        element: target,
        original: el,
        letter: candidate.letter,
        text: candidate.text,
        isClickable
      };
    }).filter((c) => c.isClickable);
    if (clickTargets.length === 0) {
      console.error("[CHOICE] \uD074\uB9AD \uAC00\uB2A5\uD55C \uD0C0\uAC9F\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return false;
    }
    const firstChoice = clickTargets.find((c) => c.letter === "A") || clickTargets[0];
    const targetElement = firstChoice.element;
    console.log(`[CHOICE] picked candidate text="${firstChoice.text.substring(0, 30)}", letter=${firstChoice.letter}`);
    const beforeClass = targetElement.className;
    const beforeAriaDisabled = targetElement.getAttribute("aria-disabled");
    const beforeDisabled = targetElement.disabled;
    console.log(`[CHOICE] state before:`, {
      className: beforeClass,
      ariaDisabled: beforeAriaDisabled,
      disabled: beforeDisabled
    });
    try {
      targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
      await new Promise((resolve) => setTimeout(resolve, 30));
      targetElement.dispatchEvent(new PointerEvent("pointerdown", {
        bubbles: true,
        cancelable: true,
        pointerId: 1
      }));
      await new Promise((resolve) => setTimeout(resolve, 10));
      targetElement.dispatchEvent(new MouseEvent("mousedown", {
        bubbles: true,
        cancelable: true,
        buttons: 1
      }));
      await new Promise((resolve) => setTimeout(resolve, 10));
      targetElement.dispatchEvent(new MouseEvent("mouseup", {
        bubbles: true,
        cancelable: true,
        buttons: 1
      }));
      await new Promise((resolve) => setTimeout(resolve, 10));
      targetElement.click();
      await new Promise((resolve) => setTimeout(resolve, 25));
      const afterClass = targetElement.className;
      const afterAriaDisabled = targetElement.getAttribute("aria-disabled");
      const afterDisabled = targetElement.disabled;
      console.log(`[CHOICE] state after:`, {
        className: afterClass,
        ariaDisabled: afterAriaDisabled,
        disabled: afterDisabled
      });
      const classChanged = beforeClass !== afterClass;
      const graded = /answered-(correct|incorrect)/.test(afterClass);
      const disabledNow = afterClass.includes("mdc-list-item--disabled") || afterAriaDisabled === "true" || afterDisabled || afterClass.includes("disabled") && !beforeClass.includes("disabled");
      const clickSuccess = classChanged || graded || disabledNow;
      console.log(`[CHOICE] state changed? ${clickSuccess} (classChanged: ${classChanged}, graded: ${graded}, disabledNow: ${disabledNow})`);
      if (clickSuccess) {
        console.log(`[CHOICE] \u2713 \uD074\uB9AD \uC131\uACF5: \uC0C1\uD0DC \uBCC0\uD654 \uD655\uC778\uB428`);
        return true;
      } else {
        console.warn(`[CHOICE] \u2717 \uD074\uB9AD \uC2E4\uD328: \uC0C1\uD0DC \uBCC0\uD654 \uC5C6\uC74C. \uB2E4\uB978 \uD6C4\uBCF4 \uC2DC\uB3C4...`);
        for (let i = 1; i < Math.min(3, clickTargets.length); i++) {
          const nextTarget = clickTargets[i];
          console.log(`[CHOICE] \uC7AC\uC2DC\uB3C4 ${i}: ${nextTarget.letter} \uC120\uD0DD`);
          const retryBeforeClass = nextTarget.element.className;
          nextTarget.element.scrollIntoView({ behavior: "smooth", block: "center" });
          await new Promise((resolve) => setTimeout(resolve, 20));
          nextTarget.element.click();
          await new Promise((resolve) => setTimeout(resolve, 25));
          const retryAfterClass = nextTarget.element.className;
          const retryGraded = /answered-(correct|incorrect)/.test(retryAfterClass);
          const retryDisabled = retryAfterClass.includes("mdc-list-item--disabled") || nextTarget.element.getAttribute("aria-disabled") === "true" || nextTarget.element.disabled;
          if (retryBeforeClass !== retryAfterClass || retryGraded || retryDisabled) {
            console.log(`[CHOICE] \u2713 \uC7AC\uC2DC\uB3C4 \uC131\uACF5: ${nextTarget.letter}`);
            return true;
          }
        }
        console.error(`[CHOICE] \u2717 \uBAA8\uB4E0 \uD6C4\uBCF4 \uD074\uB9AD \uC2E4\uD328`);
        return false;
      }
    } catch (error) {
      console.error("[CHOICE] \uD074\uB9AD \uC911 \uC624\uB958:", error);
      return false;
    }
  }

  // src/flow/navigator.js
  init_deepQuery();
  init_extract();
  var SATNavigator = class {
    /**
     * 텍스트로 버튼 찾기 (다국어 지원)
     * @param {...string} labels - 찾을 버튼 텍스트들
     * @returns {Element|null} 찾은 버튼 요소
     */
    findButtonByText(...labels) {
      const buttons = Array.from(document.querySelectorAll(CONFIG.selectors.button));
      return buttons.find((btn) => {
        if (!btn.offsetParent || btn.disabled) return false;
        const text = (btn.innerText || btn.textContent || "").trim();
        const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
        return labels.some(
          (label) => text.includes(label) || ariaLabel.includes(label)
        );
      }) || null;
    }
    /**
     * '열기' 버튼 찾기 및 클릭
     * @returns {Promise<boolean>} 성공 여부
     */
    async clickOpenButton() {
      console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: \uC5F4\uAE30 \uBC84\uD2BC \uCC3E\uAE30 \uC2DC\uC791");
      const openButton = await waitForElement(() => {
        const allButtons = deepQuerySelectorAll(CONFIG.selectors.button + ", a, div[onclick], span[onclick]");
        for (const btn of allButtons) {
          try {
            if (!isElementVisible(btn) || btn.disabled) continue;
            const btnText = (btn.innerText || btn.textContent || "").trim();
            if (CONFIG.buttonTexts.open.some((text) => btnText.includes(text))) {
              console.log("[SAT-DEBUG] \uC5F4\uAE30 \uBC84\uD2BC \uBC1C\uACAC:", btnText);
              return btn;
            }
          } catch (e) {
            continue;
          }
        }
        return null;
      }, CONFIG.retries.elementFind);
      if (openButton) {
        console.log("[SATNavigator] \uC5F4\uAE30 \uBC84\uD2BC \uBC1C\uACAC, \uD074\uB9AD \uC2DC\uB3C4");
        return await safeClick(openButton);
      }
      console.warn("[SATNavigator] \uC5F4\uAE30 \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return false;
    }
    /**
     * '계속' 버튼 찾기 및 클릭 (Reading and Writing 섹션)
     * @returns {Promise<boolean>} 성공 여부
     */
    async clickContinueButton() {
      console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: \uACC4\uC18D \uBC84\uD2BC \uCC3E\uAE30 \uC2DC\uC791");
      const continueButton = await waitForElement(() => {
        const sectionCards = deepQuerySelectorAll("div, section, article");
        for (const card of sectionCards) {
          const cardText = (card.innerText || card.textContent || "").toLowerCase();
          const hasReading = cardText.includes("reading");
          const hasWriting = cardText.includes("writing");
          if (hasReading && hasWriting) {
            const buttons = deepQuerySelectorAll(CONFIG.selectors.button + ", div[onclick]", card);
            for (const btn of buttons) {
              try {
                if (!isElementVisible(btn) || btn.disabled) continue;
                if (btn.tagName === "A") {
                  const href = btn.getAttribute("href");
                  const target = btn.getAttribute("target");
                  if (href && (href.startsWith("http") || target === "_blank" || target === "_new")) {
                    continue;
                  }
                }
                if (btn.hasAttribute("href") && btn.getAttribute("href") !== "#" && !btn.getAttribute("href").startsWith("javascript:")) {
                  continue;
                }
                if (btn.getAttribute("target") === "_blank" || btn.getAttribute("target") === "_new") {
                  continue;
                }
                const btnText = (btn.innerText || btn.textContent || "").trim();
                if (CONFIG.buttonTexts.continue.some((text) => btnText.includes(text))) {
                  console.log("[SAT-DEBUG] \uACC4\uC18D \uBC84\uD2BC \uBC1C\uACAC:", btnText);
                  return btn;
                }
              } catch (e) {
                continue;
              }
            }
          }
        }
        return null;
      }, CONFIG.retries.elementFind);
      if (continueButton) {
        console.log("[SATNavigator] \uACC4\uC18D \uBC84\uD2BC \uBC1C\uACAC, \uD074\uB9AD \uC2DC\uB3C4");
        return await safeClick(continueButton);
      }
      console.warn("[SATNavigator] \uACC4\uC18D \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return false;
    }
    /**
     * 자동 진입 시퀀스 실행
     * @returns {Promise<boolean>} 성공 여부
     */
    async handleInitialNavigation() {
      console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: \uC790\uB3D9 \uC9C4\uC785 \uC2DC\uD000\uC2A4 \uC2DC\uC791");
      try {
        if (isQuestionScreen() || getProgressState() !== null) {
          console.log("[SAT-DEBUG] \uC774\uBBF8 \uBB38\uC81C \uD654\uBA74\uC5D0 \uC788\uC2B5\uB2C8\uB2E4.");
          return true;
        }
        console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: 1\uB2E8\uACC4 - \uC5F4\uAE30 \uBC84\uD2BC \uD074\uB9AD");
        showToast("\uC5F4\uAE30 \uBC84\uD2BC \uD074\uB9AD \uC911...", "info");
        const openClicked = await this.clickOpenButton();
        if (openClicked) {
          console.log("[SAT-DEBUG] \uC5F4\uAE30 \uBC84\uD2BC \uD074\uB9AD \uC131\uACF5 - \uD654\uBA74 \uC804\uD658 \uB300\uAE30");
          await waitForCondition(() => {
            const bodyText = (document.body.innerText || document.body.textContent || "").toLowerCase();
            const hasSectionScreen = bodyText.includes("reading") && bodyText.includes("writing");
            return hasSectionScreen;
          }, CONFIG.timeouts.screenTransition * 5);
          await new Promise((resolve) => setTimeout(resolve, CONFIG.timeouts.screenTransition));
          console.log("[SAT-DEBUG] \uD654\uBA74 \uC804\uD658 \uC644\uB8CC");
        } else {
          console.warn("[SAT-DEBUG] \uC5F4\uAE30 \uBC84\uD2BC \uD074\uB9AD \uC2E4\uD328");
        }
        console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: 2\uB2E8\uACC4 - \uACC4\uC18D \uBC84\uD2BC \uD074\uB9AD");
        showToast("Reading and Writing \uC139\uC158 \uACC4\uC18D \uBC84\uD2BC \uD074\uB9AD \uC911...", "info");
        await new Promise((resolve) => setTimeout(resolve, CONFIG.timeouts.screenTransition));
        let continueClicked = await this.clickContinueButton();
        if (!continueClicked) {
          console.log("[SAT-DEBUG] \uC77C\uBC18 \uD074\uB9AD \uC2E4\uD328, forceClick \uC2DC\uB3C4");
          const continueButton = await waitForElement(() => {
            const sectionCards = deepQuerySelectorAll("div, section, article");
            for (const card of sectionCards) {
              const cardText = (card.innerText || card.textContent || "").toLowerCase();
              if (cardText.includes("reading") && cardText.includes("writing")) {
                const buttons = deepQuerySelectorAll(CONFIG.selectors.button + ", a, div[onclick]", card);
                for (const btn of buttons) {
                  if (!isElementVisible(btn) || btn.disabled) continue;
                  const btnText = (btn.innerText || btn.textContent || "").trim();
                  if (CONFIG.buttonTexts.continue.some((text) => btnText.includes(text))) {
                    return btn;
                  }
                }
              }
            }
            return null;
          }, CONFIG.retries.elementFind);
          if (continueButton) {
            continueClicked = await forceClick(continueButton);
          }
        }
        if (continueClicked) {
          console.log("[SAT-DEBUG] \uACC4\uC18D \uBC84\uD2BC \uD074\uB9AD \uC131\uACF5 - \uBB38\uC81C \uD654\uBA74 \uB300\uAE30");
          const maxWait = 1e4;
          const startTime = Date.now();
          let problemScreenReady = false;
          while (Date.now() - startTime < maxWait && !problemScreenReady) {
            await new Promise((resolve) => setTimeout(resolve, 250));
            const progress = getProgressState();
            const isQuestion = isQuestionScreen();
            if (progress && progress.match(/\d+\s*\/\s*\d+/)) {
              problemScreenReady = true;
              console.log("[SAT-DEBUG] \uBB38\uC81C \uD654\uBA74 \uD655\uC778\uB428 (Progress):", progress);
              break;
            }
            if (isQuestion) {
              const problemNum = getCurrentProblemNumber();
              if (problemNum > 0) {
                problemScreenReady = true;
                console.log("[SAT-DEBUG] \uBB38\uC81C \uD654\uBA74 \uD655\uC778\uB428 (\uBB38\uC81C \uBC88\uD638):", problemNum);
                break;
              }
            }
          }
          if (!problemScreenReady) {
            console.warn("[SAT-DEBUG] \uBB38\uC81C \uD654\uBA74\uC774 10\uCD08 \uB0B4\uC5D0 \uB098\uD0C0\uB098\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
          }
          await new Promise((resolve) => setTimeout(resolve, CONFIG.timeouts.screenTransition));
        } else {
          console.warn("[SAT-DEBUG] \uACC4\uC18D \uBC84\uD2BC \uD074\uB9AD \uC2E4\uD328");
        }
        console.log("[SATNavigator] \uBB38\uC81C \uD654\uBA74 \uB85C\uB4DC \uB300\uAE30 \uC911...");
        showToast("\uBB38\uC81C \uD654\uBA74 \uB85C\uB4DC \uB300\uAE30 \uC911...", "info");
        await waitForCondition(() => {
          return isQuestionScreen() || getProgressState() !== null;
        }, CONFIG.timeouts.maxElementWait);
        console.log("[SATNavigator] \uD14C\uC2A4\uD2B8 \uC124\uC815 \uCC98\uB9AC \uC911...");
        showToast("\uD14C\uC2A4\uD2B8 \uC124\uC815 \uC911...", "info");
        await configureAndStartTest();
        console.log("[SATNavigator] ===== \uC790\uB3D9 \uC9C4\uC785 \uC2DC\uD000\uC2A4 \uC644\uB8CC =====");
        return true;
      } catch (error) {
        console.error("[SATNavigator] \uC790\uB3D9 \uC9C4\uC785 \uC2DC\uD000\uC2A4 \uC624\uB958:", error);
        throw error;
      }
    }
    /**
     * Math 섹션으로 이동
     * @returns {Promise<boolean>} 성공 여부
     */
    async navigateToMathSection() {
      const mathButtons = document.querySelectorAll('button, a, [role="button"], [class*="button"]');
      for (const button of mathButtons) {
        const text = (button.innerText || button.textContent || "").trim();
        const textLower = text.toLowerCase();
        const ariaLabel = (button.getAttribute("aria-label") || "").toLowerCase();
        if (textLower.includes("math") || textLower.includes("\uC218\uD559") || ariaLabel.includes("math") || ariaLabel.includes("\uC218\uD559")) {
          const parent = button.closest('[class*="card"], [class*="section"], [class*="module"]');
          if (parent) {
            const parentText = (parent.innerText || parent.textContent || "").toLowerCase();
            if (parentText.includes("math") || parentText.includes("\uC218\uD559")) {
              const startBtn = parent.querySelector('button, [role="button"]');
              if (startBtn) {
                const startText = (startBtn.innerText || startBtn.textContent || "").trim().toLowerCase();
                if (startText.includes("\uC2DC\uC791") || startText === "start" || startText.includes("start")) {
                  console.log("[SAT PDF Exporter] Math \uC139\uC158 \uC2DC\uC791 \uBC84\uD2BC \uD074\uB9AD");
                  startBtn.click();
                  await waitForContentLoad(800);
                  return true;
                }
              }
            }
          }
        }
      }
      const originalScroll = window.scrollY;
      window.scrollTo(0, document.body.scrollHeight);
      await waitForContentLoad(600);
      const scrolledMathButtons = document.querySelectorAll('button, a, [role="button"]');
      for (const button of scrolledMathButtons) {
        const text = (button.innerText || button.textContent || "").trim().toLowerCase();
        const parent = button.closest('[class*="card"], [class*="section"]');
        if (parent) {
          const parentText = (parent.innerText || parent.textContent || "").toLowerCase();
          if ((parentText.includes("math") || parentText.includes("\uC218\uD559")) && (text.includes("\uC2DC\uC791") || text === "start")) {
            console.log("[SAT PDF Exporter] Math \uC139\uC158 \uC2DC\uC791 \uBC84\uD2BC \uD074\uB9AD (\uC2A4\uD06C\uB864 \uD6C4)");
            button.click();
            await waitForContentLoad(800);
            return true;
          }
        }
      }
      console.log("[SAT PDF Exporter] Math \uC139\uC158\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      window.scrollTo(0, originalScroll);
      return false;
    }
  };
  async function configureAndStartTest() {
    console.log("[SAT PDF Exporter] \uD14C\uC2A4\uD2B8 \uC124\uC815 \uD654\uBA74 \uCC98\uB9AC \uC911...");
    const toggleSelectors = [
      'input[type="checkbox"]',
      '[role="switch"]',
      '[role="checkbox"]',
      'button[aria-label*="\uC815\uB2F5"]',
      'button[aria-label*="answer"]'
    ];
    let toggleFound = false;
    for (const selector of toggleSelectors) {
      const toggles = document.querySelectorAll(selector);
      for (const toggle of toggles) {
        const label = toggle.closest("label") || toggle.parentElement;
        const labelText = (label.innerText || label.textContent || "").toLowerCase();
        if (labelText.includes("\uC815\uB2F5 \uD45C\uC2DC") || labelText.includes("answer after") || labelText.includes("correct answer")) {
          const isChecked = toggle.checked || toggle.getAttribute("aria-checked") === "true" || toggle.classList.contains("checked");
          if (!isChecked) {
            console.log("[SAT PDF Exporter] \uAC01 \uB2F5\uBCC0 \uB2E4\uC74C\uC5D0 \uC815\uB2F5 \uD45C\uC2DC \uD1A0\uAE00 \uCF1C\uAE30");
            toggle.click();
            await new Promise((resolve) => setTimeout(resolve, 150));
            toggleFound = true;
          } else {
            console.log("[SAT PDF Exporter] \uAC01 \uB2F5\uBCC0 \uB2E4\uC74C\uC5D0 \uC815\uB2F5 \uD45C\uC2DC \uD1A0\uAE00 \uC774\uBBF8 \uCF1C\uC838 \uC788\uC74C");
            toggleFound = true;
          }
          break;
        }
      }
      if (toggleFound) break;
    }
    if (!toggleFound) {
      console.warn("[SAT PDF Exporter] \uAC01 \uB2F5\uBCC0 \uB2E4\uC74C\uC5D0 \uC815\uB2F5 \uD45C\uC2DC \uD1A0\uAE00\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    }
    const startTestButton = findButtonByText("\uD14C\uC2A4\uD2B8 \uC2DC\uC791", "Start Test", "\uC2DC\uC791", "Start");
    if (startTestButton) {
      console.log("[SAT PDF Exporter] \uD14C\uC2A4\uD2B8 \uC2DC\uC791 \uBC84\uD2BC \uD074\uB9AD");
      startTestButton.click();
      await waitForContentLoad(800);
      return true;
    } else {
      console.warn("[SAT PDF Exporter] \uD14C\uC2A4\uD2B8 \uC2DC\uC791 \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return false;
    }
  }
  async function clickSectionContinue(sectionName) {
    console.log(`[SAT PDF Exporter] ${sectionName} \uC139\uC158 \uACC4\uC18D \uBC84\uD2BC \uCC3E\uB294 \uC911...`);
    const sectionCards = document.querySelectorAll('[class*="card"], [class*="section"]');
    for (const card of sectionCards) {
      const cardText = (card.innerText || card.textContent || "").toLowerCase();
      if (cardText.includes(sectionName.toLowerCase())) {
        const continueButton2 = card.querySelector("button");
        if (continueButton2) {
          const buttonText = (continueButton2.innerText || continueButton2.textContent || "").trim();
          if (buttonText.includes("\uACC4\uC18D") || buttonText.includes("Continue") || buttonText.includes("Start")) {
            console.log(`[SAT PDF Exporter] ${sectionName} \uC139\uC158 \uACC4\uC18D \uBC84\uD2BC \uD074\uB9AD`);
            continueButton2.click();
            await waitForContentLoad(800);
            return true;
          }
        }
      }
    }
    const continueButton = findButtonByText("\uACC4\uC18D", "Continue", "Start", "\uC2DC\uC791");
    if (continueButton) {
      console.log(`[SAT PDF Exporter] ${sectionName} \uC139\uC158 \uACC4\uC18D \uBC84\uD2BC \uD074\uB9AD (\uD3F4\uBC31)`);
      continueButton.click();
      await waitForContentLoad(800);
      return true;
    }
    console.warn(`[SAT PDF Exporter] ${sectionName} \uC139\uC158 \uACC4\uC18D \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.`);
    return false;
  }
  async function startModule2() {
    console.log("[SAT PDF Exporter] startModule2: Module Start Screen \uCC98\uB9AC \uC2DC\uC791");
    const searchRoot = document.body;
    const labelSpans = searchRoot.querySelectorAll("span.mdc-button__label");
    let btn = null;
    let selectorUsed = "";
    for (const span of labelSpans) {
      const text = (span.innerText || span.textContent || "").trim();
      if (text.includes("\uBAA8\uB4C8 2") && text.includes("\uC2DC\uC791")) {
        btn = span.closest("button") || span.parentElement;
        if (btn && !btn.disabled) {
          selectorUsed = "span.mdc-button__label + closest(button)";
          console.log("[SAT PDF Exporter] Module 2 start screen detected. Button text:", text, "selector:", selectorUsed);
          break;
        }
      }
    }
    if (!btn) {
      const btnLabels = ["\uBAA8\uB4C8 2 \uC2DC\uC791", "Module 2", "Start Module", "\uC2DC\uC791"];
      const clickables = Array.from(searchRoot.querySelectorAll('button, [role="button"], a, .mat-mdc-button, .mdc-button'));
      for (const el of clickables) {
        const rect = el.getBoundingClientRect();
        if (rect.width === 0 && rect.height === 0) continue;
        if (el.disabled) continue;
        const text = (el.innerText || el.textContent || "").trim();
        const match = btnLabels.some((l) => text.includes(l) || text.includes("\uBAA8\uB4C8 2") && text.includes("\uC2DC\uC791"));
        if (match) {
          btn = el;
          selectorUsed = el.tagName + (el.getAttribute?.("role") ? `[role="${el.getAttribute("role")}"]` : "");
          console.log("[SAT PDF Exporter] Module 2 start screen detected. Button text:", text.substring(0, 50), "selector:", selectorUsed);
          break;
        }
      }
    }
    if (!btn) {
      console.warn('[SAT PDF Exporter] startModule2: "\uBAA8\uB4C8 2 \uC2DC\uC791" \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4');
      return false;
    }
    try {
      btn.scrollIntoView({ behavior: "smooth", block: "center" });
      await new Promise((resolve) => setTimeout(resolve, 150));
      let clicked = await safeClick(btn);
      if (!clicked) {
        console.log("[SAT PDF Exporter] startModule2: safeClick \uC2E4\uD328, forceClick \uC2DC\uB3C4");
        clicked = await forceClick(btn);
      }
      if (!clicked) {
        console.warn("[SAT PDF Exporter] startModule2: \uD074\uB9AD \uC2E4\uD328");
        return false;
      }
      console.log('[SAT PDF Exporter] startModule2: "\uBAA8\uB4C8 2 \uC2DC\uC791" \uBC84\uD2BC \uD074\uB9AD \uC644\uB8CC');
      const maxWait = 1e4;
      const interval = 200;
      const startTime = Date.now();
      while (Date.now() - startTime < maxWait) {
        await new Promise((resolve) => setTimeout(resolve, interval));
        const progress = getProgressState();
        const isQ1 = progress && /^1\s*\/\s*27/i.test(progress);
        const isQuestion = isQuestionScreen();
        if (isQ1 && isQuestion) {
          console.log("[SAT PDF Exporter] startModule2: Q1 \uD654\uBA74 \uD655\uC778\uB428 (progress:", progress, ")");
          return true;
        }
        if (progress && progress.match(/\d+\s*\/\s*27/)) {
          console.log("[SAT PDF Exporter] startModule2: Progress \uBC1C\uACAC, Q1 \uB300\uAE30 \uC911...", progress);
        }
      }
      console.warn("[SAT PDF Exporter] startModule2: Q1 \uD654\uBA74 \uB300\uAE30 \uD0C0\uC784\uC544\uC6C3. \uD604\uC7AC progress:", getProgressState());
      return false;
    } catch (err) {
      console.error("[SAT PDF Exporter] startModule2 \uC624\uB958:", err);
      return false;
    }
  }
  async function startNextModule() {
    console.log("[SAT PDF Exporter] \uB2E4\uC74C \uBAA8\uB4C8 \uC2DC\uC791 \uBC84\uD2BC \uCC3E\uB294 \uC911...");
    if (isModuleStartScreen()) {
      console.log("[SAT PDF Exporter] Module Start Screen \uAC10\uC9C0\uB428. startModule2() \uD638\uCD9C");
      const ok = await startModule2();
      if (ok) return true;
      console.warn("[SAT PDF Exporter] startModule2 \uC2E4\uD328, \uAE30\uC874 \uB85C\uC9C1\uC73C\uB85C \uD3F4\uBC31");
    }
    const initialBodyText = (document.body.innerText || document.body.textContent || "").toLowerCase();
    const initialIsQuestion = isQuestionScreen();
    const initialProgress = getProgressState();
    const initialHasModule2 = initialBodyText.includes("\uBAA8\uB4C8 2") || initialBodyText.includes("module 2") || initialBodyText.includes("reading and writing module 2");
    fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:entry", message: "startNextModule entry", data: { initialIsQuestion, initialProgress, initialHasModule2, bodyTextPreview: initialBodyText.substring(0, 200) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
    });
    const bodyText = (document.body.innerText || document.body.textContent || "").toLowerCase();
    const hasModule2StartScreen = bodyText.includes("\uBAA8\uB4C8 2") || bodyText.includes("module 2") || bodyText.includes("reading and writing module 2");
    const beforeWaitIsQuestion = isQuestionScreen();
    const beforeWaitProgress = getProgressState();
    fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:beforeWait", message: "before waiting for module 2 screen", data: { hasModule2StartScreen, beforeWaitIsQuestion, beforeWaitProgress, bodyTextPreview: bodyText.substring(0, 200) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
    });
    if (!hasModule2StartScreen && (isQuestionScreen() || getProgressState() !== null)) {
      console.log("[SAT PDF Exporter] Module 2 \uC2DC\uC791 \uD654\uBA74 \uB300\uAE30 \uC911...");
      const module2ScreenAppeared = await waitForCondition(() => {
        const currentBodyText = (document.body.innerText || document.body.textContent || "").toLowerCase();
        return currentBodyText.includes("\uBAA8\uB4C8 2") || currentBodyText.includes("module 2") || currentBodyText.includes("reading and writing module 2");
      }, CONFIG.timeouts.screenTransition * 5);
      const afterWaitIsQuestion = isQuestionScreen();
      const afterWaitProgress = getProgressState();
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:afterWait", message: "after waiting for module 2 screen", data: { module2ScreenAppeared, afterWaitIsQuestion, afterWaitProgress }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
      });
      if (!module2ScreenAppeared) {
        console.warn("[SAT PDF Exporter] Module 2 \uC2DC\uC791 \uD654\uBA74\uC774 \uB098\uD0C0\uB098\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
      }
    }
    const checkIsQuestion = isQuestionScreen();
    const checkProgress = getProgressState();
    const shouldSkip = hasModule2StartScreen && (checkIsQuestion || checkProgress !== null);
    fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:skipCheck", message: "checking if should skip button click", data: { hasModule2StartScreen, checkIsQuestion, checkProgress, shouldSkip }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "C" }) }).catch(() => {
    });
    if (shouldSkip) {
      console.log("[SAT PDF Exporter] \uC774\uBBF8 Module 2 \uBB38\uC81C \uD654\uBA74\uC785\uB2C8\uB2E4. Module 2 \uC2DC\uC791 \uBC84\uD2BC \uD074\uB9AD\uC744 \uC2A4\uD0B5\uD569\uB2C8\uB2E4.");
      console.log("[SAT PDF Exporter] \uD604\uC7AC \uC0C1\uD0DC:", {
        isQuestionScreen: checkIsQuestion,
        progressState: checkProgress
      });
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:skipReturn", message: "skipping button click and returning true", data: { checkIsQuestion, checkProgress }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "C" }) }).catch(() => {
      });
      return true;
    }
    console.log("[SAT PDF Exporter] \uBAA8\uB4C8 2 \uC2DC\uC791 \uD654\uBA74 \uB300\uAE30 \uC911...");
    let buttonFound = false;
    let button = null;
    for (let attempt = 0; attempt < 20; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 150));
      const clickables = deepQuerySelectorAll('a, button, [role="button"], div[role="button"], .mat-mdc-button, .mdc-button');
      for (const el of clickables) {
        if (!isElementVisible(el) || el.disabled) continue;
        const text = (el.innerText || el.textContent || "").trim();
        if (text.includes("\uBAA8\uB4C8 2") && text.includes("\uC2DC\uC791") || text === "\uBAA8\uB4C8 2 \uC2DC\uC791" || text.toLowerCase().includes("module 2")) {
          console.log("[SAT PDF Exporter] \uBAA8\uB4C8 2 \uC2DC\uC791 \uBC84\uD2BC \uBC1C\uACAC (\uD074\uB9AD \uAC00\uB2A5 \uC694\uC18C):", text.substring(0, 50));
          button = el;
          buttonFound = true;
          break;
        }
      }
      if (buttonFound) break;
      button = document.querySelector('button[data-test-id="glowing-card-start-button"]');
      if (button && isElementVisible(button) && !button.disabled) {
        const label = button.querySelector(".mdc-button__label");
        if (label) {
          const text = (label.textContent || "").trim();
          if (text.includes("\uBAA8\uB4C8 2") || text.includes("Module 2") || text.includes("\uC2DC\uC791")) {
            console.log("[SAT PDF Exporter] \uBAA8\uB4C8 2 \uC2DC\uC791 \uBC84\uD2BC \uBC1C\uACAC (data-test-id):", text);
            buttonFound = true;
            break;
          }
        }
      }
      const foundButton = findButtonByText("\uBAA8\uB4C8 2 \uC2DC\uC791", "Module 2", "\uC2DC\uC791", "Start");
      if (foundButton && isElementVisible(foundButton) && !foundButton.disabled) {
        const text = (foundButton.innerText || foundButton.textContent || "").trim();
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:findButtonByText", message: "findButtonByText result", data: { found: !!foundButton, text, visible: isElementVisible(foundButton), disabled: foundButton?.disabled }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
        });
        if (text.includes("\uBAA8\uB4C8 2 \uC2DC\uC791") || text === "\uBAA8\uB4C8 2 \uC2DC\uC791" || text.includes("\uBAA8\uB4C8 2") && text.includes("\uC2DC\uC791") || text.includes("Module 2") || text.includes("\uC2DC\uC791")) {
          console.log("[SAT PDF Exporter] \uBAA8\uB4C8 2 \uC2DC\uC791 \uBC84\uD2BC \uBC1C\uACAC (findButtonByText):", text);
          button = foundButton;
          buttonFound = true;
          break;
        }
      }
      const allButtons = deepQuerySelectorAll('button, [role="button"]');
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:searchAllButtons", message: "searching all buttons for module 2 start", data: { totalButtons: allButtons.length, attempt }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
      });
      for (const btn of allButtons) {
        if (!isElementVisible(btn) || btn.disabled) continue;
        const text = (btn.innerText || btn.textContent || "").trim();
        const ariaLabel = (btn.getAttribute("aria-label") || "").trim();
        const textLower = text.toLowerCase();
        const ariaLower = ariaLabel.toLowerCase();
        if (text.includes("\uBAA8\uB4C8") || text.includes("\uC2DC\uC791") || text.includes("module") || text.includes("start")) {
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:checkButton", message: "checking button text for module 2 start", data: { text, ariaLabel, textLower, ariaLower, visible: isElementVisible(btn), disabled: btn.disabled }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
          });
        }
        if (text === "\uBAA8\uB4C8 2 \uC2DC\uC791" || text.includes("\uBAA8\uB4C8 2 \uC2DC\uC791") || textLower.includes("\uBAA8\uB4C8 2") && textLower.includes("\uC2DC\uC791") || textLower.includes("module 2 start") || textLower.includes("\uC2DC\uC791") && (text.includes("2") || text.includes("\uBAA8\uB4C8")) || (ariaLower.includes("\uBAA8\uB4C8 2") || ariaLower.includes("module 2"))) {
          console.log("[SAT PDF Exporter] \uBAA8\uB4C8 2 \uC2DC\uC791 \uBC84\uD2BC \uBC1C\uACAC (\uC804\uCCB4 \uAC80\uC0C9):", text || ariaLabel);
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:buttonFound", message: "module 2 start button found in all buttons search", data: { text, ariaLabel }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
          });
          button = btn;
          buttonFound = true;
          break;
        }
      }
      if (buttonFound) break;
    }
    if (!buttonFound || !button) {
      console.warn("[SAT PDF Exporter] \uBAA8\uB4C8 2 \uC2DC\uC791 \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC7AC\uC2DC\uB3C4...");
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:lastAttempt", message: "last attempt to find module 2 start button", data: { buttonFound, button: !!button }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
      });
      const allButtons = document.querySelectorAll('button, [role="button"]');
      for (const btn of allButtons) {
        if (!isElementVisible(btn) || btn.disabled) continue;
        const text = (btn.innerText || btn.textContent || "").trim();
        const textLower = text.toLowerCase();
        if (text.includes("\uBAA8\uB4C8") || text.includes("\uC2DC\uC791") || text.includes("module") || text.includes("start")) {
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:lastAttemptCheck", message: "checking button in last attempt", data: { text, textLower, visible: isElementVisible(btn), disabled: btn.disabled }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
          });
        }
        if (text === "\uBAA8\uB4C8 2 \uC2DC\uC791" || text.includes("\uBAA8\uB4C8 2 \uC2DC\uC791") || textLower.includes("\uBAA8\uB4C8 2") && textLower.includes("\uC2DC\uC791") || textLower.includes("module 2 start") || textLower.includes("\uC2DC\uC791") && (text.includes("2") || text.includes("\uBAA8\uB4C8"))) {
          button = btn;
          buttonFound = true;
          console.log("[SAT PDF Exporter] \uBAA8\uB4C8 2 \uC2DC\uC791 \uBC84\uD2BC \uBC1C\uACAC (\uB9C8\uC9C0\uB9C9 \uC2DC\uB3C4):", text);
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:lastAttemptFound", message: "module 2 start button found in last attempt", data: { text }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
          });
          break;
        }
      }
    }
    if (buttonFound && button) {
      console.log("[SAT PDF Exporter] \uBAA8\uB4C8 2 \uC2DC\uC791 \uBC84\uD2BC \uD074\uB9AD \uC2DC\uB3C4...");
      const buttonText = (button.innerText || button.textContent || "").trim();
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:beforeClick", message: "before clicking module 2 start button", data: { buttonText, buttonVisible: isElementVisible(button), buttonDisabled: button.disabled }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
      });
      try {
        button.scrollIntoView({ behavior: "smooth", block: "center" });
        await new Promise((resolve) => setTimeout(resolve, 150));
        const clicked = await safeClick(button);
        if (!clicked) {
          console.log("[SAT PDF Exporter] safeClick \uC2E4\uD328, forceClick \uC2DC\uB3C4...");
          await forceClick(button);
        }
        console.log("[SAT PDF Exporter] \uBAA8\uB4C8 2 \uC2DC\uC791 \uBC84\uD2BC \uD074\uB9AD \uC644\uB8CC");
        const afterClickIsQuestion = isQuestionScreen();
        const afterClickProgress = getProgressState();
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:afterClick", message: "after clicking module 2 start button", data: { afterClickIsQuestion, afterClickProgress }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
        });
        await waitForContentLoad(800);
        await new Promise((resolve) => setTimeout(resolve, 250));
        console.log("[SAT PDF Exporter] \uBAA8\uB4C8 2 \uC2DC\uC791 \uC644\uB8CC, \uCCAB \uBB38\uC81C \uD655\uC778 \uC911...");
        const finalIsQuestion = isQuestionScreen();
        const finalProgress = getProgressState();
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:finalCheck", message: "final check after module 2 start", data: { finalIsQuestion, finalProgress }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
        });
        return true;
      } catch (error) {
        console.error("[SAT PDF Exporter] \uBAA8\uB4C8 2 \uC2DC\uC791 \uBC84\uD2BC \uD074\uB9AD \uC624\uB958:", error);
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:clickError", message: "error clicking module 2 start button", data: { error: error.message }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
        });
        return false;
      }
    }
    const fallbackIsQuestion = isQuestionScreen();
    const fallbackProgress = getProgressState();
    fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:fallbackCheck", message: "fallback check if question screen exists", data: { fallbackIsQuestion, fallbackProgress, buttonFound }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
    });
    if (fallbackIsQuestion || fallbackProgress !== null) {
      console.log("[SAT PDF Exporter] Module 2 \uC2DC\uC791 \uBC84\uD2BC\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC9C0\uB9CC, \uC774\uBBF8 \uBB38\uC81C \uD654\uBA74\uC785\uB2C8\uB2E4. \uC131\uACF5\uC73C\uB85C \uAC04\uC8FC\uD569\uB2C8\uB2E4.");
      return true;
    }
    console.error("[SAT PDF Exporter] \uB2E4\uC74C \uBAA8\uB4C8 \uC2DC\uC791 \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
    fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "navigator.js:startNextModule:failed", message: "failed to find module 2 start button", data: { buttonFound, fallbackIsQuestion, fallbackProgress }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
    });
    return false;
  }

  // src/flow/stateManager.js
  init_extract();
  var SectionStateManager = class {
    constructor() {
      this.currentSection = null;
      this.currentModule = null;
      this.expectedOrder = [
        { section: "READING_WRITING", module: 1 },
        { section: "READING_WRITING", module: 2 },
        { section: "MATH", module: 1 },
        { section: "MATH", module: 2 }
      ];
      this.currentStepIndex = 0;
    }
    /**
     * 현재 섹션 설정
     * @param {string} section - 'READING_WRITING' | 'MATH'
     * @throws {Error} 잘못된 섹션 전환 시도 시
     */
    setCurrentSection(section) {
      if (section !== "READING_WRITING" && section !== "MATH") {
        throw new Error(`\uC798\uBABB\uB41C \uC139\uC158: ${section}`);
      }
      const expectedStep = this.expectedOrder[this.currentStepIndex];
      if (expectedStep.section !== section) {
        const errorMsg = `\uC139\uC158 \uC21C\uC11C \uC624\uB958! \uD604\uC7AC \uB2E8\uACC4: ${expectedStep.section} Module ${expectedStep.module}, \uC2DC\uB3C4\uD55C \uC139\uC158: ${section}`;
        console.error(`[SectionStateManager] ${errorMsg}`);
        throw new Error(errorMsg);
      }
      this.currentSection = section;
      console.log(`[SectionStateManager] \uC139\uC158 \uC124\uC815: ${section}`);
    }
    /**
     * 현재 모듈 설정 (유연화: 에러 대신 UI와 동기화)
     * @param {number} module - 1 | 2
     */
    setCurrentModule(module) {
      if (module !== 1 && module !== 2) {
        console.warn(`[SAT-DEBUG] \uC798\uBABB\uB41C \uBAA8\uB4C8: ${module}, \uAE30\uBCF8\uAC12 1\uB85C \uC124\uC815`);
        module = 1;
      }
      const expectedStep = this.expectedOrder[this.currentStepIndex];
      if (expectedStep.module !== module) {
        console.warn(`[SAT-DEBUG] \uBAA8\uB4C8 \uC21C\uC11C \uBD88\uC77C\uCE58 \uAC10\uC9C0: \uC608\uC0C1=${expectedStep.module}, \uC2DC\uB3C4=${module}`);
        console.log("[SAT-DEBUG] UI\uC640 \uB3D9\uAE30\uD654 \uC2DC\uC791...");
        const progress = getProgressState();
        const problemNum = getCurrentProblemNumber();
        const detectedSection = this.detectSectionFromScreen();
        console.log("[SAT-DEBUG] \uD604\uC7AC \uD654\uBA74 \uC0C1\uD0DC:", {
          progress,
          problemNum,
          detectedSection,
          expectedStep
        });
        if (detectedSection) {
          this.currentSection = detectedSection;
          console.log(`[SAT-DEBUG] \uC139\uC158\uC744 UI \uC0C1\uD0DC\uB85C \uC5C5\uB370\uC774\uD2B8: ${detectedSection}`);
        }
        if (problemNum > 0 && problemNum <= 27) {
          this.currentModule = 1;
          console.log(`[SAT-DEBUG] \uBAA8\uB4C8\uC744 UI \uC0C1\uD0DC\uB85C \uC5C5\uB370\uC774\uD2B8: Module 1 (\uBB38\uC81C \uBC88\uD638: ${problemNum})`);
        } else if (problemNum > 27) {
          this.currentModule = 2;
          console.log(`[SAT-DEBUG] \uBAA8\uB4C8\uC744 UI \uC0C1\uD0DC\uB85C \uC5C5\uB370\uC774\uD2B8: Module 2 (\uBB38\uC81C \uBC88\uD638: ${problemNum})`);
        } else {
          this.currentModule = module;
          console.log(`[SAT-DEBUG] \uBAA8\uB4C8\uC744 \uC2DC\uB3C4\uD55C \uAC12\uC73C\uB85C \uC124\uC815: Module ${module}`);
        }
      } else {
        this.currentModule = module;
        console.log(`[SectionStateManager] \uBAA8\uB4C8 \uC124\uC815: ${module}`);
      }
    }
    /**
     * UI와 상태 동기화 (현재 화면의 텍스트를 분석해서 자동으로 맞춤)
     */
    syncWithUI() {
      console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: UI\uC640 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC2DC\uC791");
      const detectedSection = this.detectSectionFromScreen();
      const progress = getProgressState();
      const problemNum = getCurrentProblemNumber();
      if (detectedSection) {
        this.currentSection = detectedSection;
        console.log(`[SAT-DEBUG] \uC139\uC158 \uB3D9\uAE30\uD654: ${detectedSection}`);
      }
      if (problemNum > 0 && problemNum <= 27) {
        this.currentModule = 1;
        console.log(`[SAT-DEBUG] \uBAA8\uB4C8 \uB3D9\uAE30\uD654: Module 1 (\uBB38\uC81C \uBC88\uD638: ${problemNum})`);
      } else if (problemNum > 27) {
        this.currentModule = 2;
        console.log(`[SAT-DEBUG] \uBAA8\uB4C8 \uB3D9\uAE30\uD654: Module 2 (\uBB38\uC81C \uBC88\uD638: ${problemNum})`);
      } else if (progress) {
        const match = progress.match(/(\d+)\s*\/\s*(\d+)/);
        if (match) {
          const current = parseInt(match[1]);
          if (current <= 27) {
            this.currentModule = 1;
            console.log(`[SAT-DEBUG] \uBAA8\uB4C8 \uB3D9\uAE30\uD654: Module 1 (Progress: ${progress})`);
          } else {
            this.currentModule = 2;
            console.log(`[SAT-DEBUG] \uBAA8\uB4C8 \uB3D9\uAE30\uD654: Module 2 (Progress: ${progress})`);
          }
        }
      }
      for (let i = 0; i < this.expectedOrder.length; i++) {
        const step = this.expectedOrder[i];
        if (step.section === this.currentSection && step.module === this.currentModule) {
          this.currentStepIndex = i;
          console.log(`[SAT-DEBUG] StepIndex \uB3D9\uAE30\uD654: ${i} (${step.section} Module ${step.module})`);
          break;
        }
      }
      console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: UI\uC640 \uC0C1\uD0DC \uB3D9\uAE30\uD654 \uC644\uB8CC", {
        section: this.currentSection,
        module: this.currentModule,
        stepIndex: this.currentStepIndex
      });
    }
    /**
     * 현재 단계 완료 처리 및 다음 단계로 이동
     * @returns {Object|null} 다음 단계 정보 또는 null (모든 단계 완료)
     */
    completeCurrentStep() {
      if (this.currentStepIndex >= this.expectedOrder.length - 1) {
        console.log("[SectionStateManager] \uBAA8\uB4E0 \uB2E8\uACC4 \uC644\uB8CC!");
        return null;
      }
      this.currentStepIndex++;
      const nextStep = this.expectedOrder[this.currentStepIndex];
      console.log(`[SectionStateManager] \uB2E4\uC74C \uB2E8\uACC4: ${nextStep.section} Module ${nextStep.module}`);
      return nextStep;
    }
    /**
     * 현재 단계 정보 가져오기
     * @returns {Object} 현재 단계 정보
     */
    getCurrentStep() {
      return this.expectedOrder[this.currentStepIndex];
    }
    /**
     * 섹션 Guard: 현재 섹션이 지정된 섹션인지 확인
     * @param {string} expectedSection - 예상 섹션
     * @returns {boolean} 일치 여부
     */
    isCurrentSection(expectedSection) {
      return this.currentSection === expectedSection;
    }
    /**
     * 화면에서 섹션 감지 및 검증
     * @returns {string|null} 감지된 섹션 또는 null
     */
    detectSectionFromScreen() {
      const bodyText = (document.body.innerText || document.body.textContent || "").toLowerCase();
      const hasReading = bodyText.includes("reading");
      const hasWriting = bodyText.includes("writing");
      const hasMath = bodyText.includes("math") || bodyText.includes("\uC218\uD559");
      if (hasReading && hasWriting && !hasMath) {
        return "READING_WRITING";
      }
      if (hasMath && (!hasReading || !hasWriting)) {
        return "MATH";
      }
      return null;
    }
    /**
     * 섹션 Guard: 잘못된 섹션으로의 전환 차단
     * @param {string} attemptedSection - 시도하려는 섹션
     * @throws {Error} Guard 위반 시
     */
    guardSectionTransition(attemptedSection) {
      const detectedSection = this.detectSectionFromScreen();
      if (this.currentSection === "READING_WRITING" && attemptedSection === "MATH") {
        if (detectedSection === "READING_WRITING") {
          const errorMsg = "Reading and Writing \uC139\uC158\uC774 \uC544\uC9C1 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. Math\uB85C \uC804\uD658\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.";
          console.error(`[SectionStateManager] ${errorMsg}`);
          throw new Error(errorMsg);
        }
      }
    }
  };

  // src/flow/moduleRunner.js
  init_deepQuery();
  init_extract();
  function currentProblemHasImage() {
    const root = findSatRoot();
    if (!root) return false;
    return !!root.querySelector('img, figure, [class*="figure"], [class*="image"], [data-testid*="figure"], [data-testid*="image"]');
  }
  async function collectModuleProblems(allData, sectionType, moduleName) {
    console.log(`[FLOW] collectModuleProblems start: ${sectionType} ${moduleName}`);
    const moduleNumber = moduleName === "Module 1" ? 1 : 2;
    const targetArray = sectionType === "reading" ? allData.reading : allData.math;
    if (sectionType === "reading" && moduleNumber === 2) {
      const progress = getProgressState();
      const isQ1 = progress && /^1\s*\/\s*27/i.test(progress);
      if (isModuleStartScreen()) {
        console.error("[FLOW] ABORT: Module 2 \uC218\uC9D1 \uC2DC\uC791 \uBD88\uAC00 - Module Start Screen\uC774 \uC544\uC9C1 \uCC98\uB9AC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. startModule2()\uB97C \uBA3C\uC800 \uD638\uCD9C\uD558\uC138\uC694.");
        return 0;
      }
      if (!isQ1 && !isQuestionScreen()) {
        console.error("[FLOW] ABORT: Module 2 \uC218\uC9D1 \uC2DC\uC791 \uBD88\uAC00 - progress=1/27 \uB610\uB294 Q1 \uD654\uBA74\uC774 \uD544\uC694\uD569\uB2C8\uB2E4. current progress:", progress);
        return 0;
      }
    }
    const moduleProblemsBefore = targetArray.filter((p) => p.module === moduleNumber).length;
    console.log(`[FLOW] ${moduleName} \uC2DC\uC791 \uC804 \uC218\uC9D1\uB41C \uBB38\uC81C \uC218: ${moduleProblemsBefore}\uAC1C (\uC804\uCCB4: ${targetArray.length}\uAC1C)`);
    const maxProblems = TEMP_MODE ? TEMP_TARGET_NUMBERS.length : sectionType === "math" ? CONFIG.collection.mathMaxProblems ?? 22 : CONFIG.collection.maxProblems;
    const targetNumbers = TEMP_MODE ? new Set(TEMP_TARGET_NUMBERS) : null;
    const collectedNumbers = /* @__PURE__ */ new Set();
    if (TEMP_MODE) {
      console.log(`[TEMP] TEMP \uBAA8\uB4DC \uD65C\uC131\uD654: \uC815\uD655\uD788 ${TEMP_TARGET_NUMBERS.join(", ")}\uBC88 \uBB38\uC81C\uB9CC \uC218\uC9D1\uD569\uB2C8\uB2E4.`);
    } else {
      console.log(`[FLOW] \uC218\uC9D1 \uC2DC\uC791: ${moduleName}, \uCD5C\uB300 ${maxProblems}\uAC1C \uBB38\uC81C (\uD604\uC7AC \uBAA8\uB4C8: ${moduleProblemsBefore}\uAC1C)`);
    }
    const seenSignatures = /* @__PURE__ */ new Set();
    let consecutiveDuplicates = 0;
    const maxConsecutiveDuplicates = 3;
    let consecutiveExtractFailures = 0;
    const maxExtractRetries = 5;
    let lastProgressState = null;
    while ((TEMP_MODE ? collectedNumbers.size < targetNumbers.size : targetArray.filter((p) => p.module === moduleNumber).length < maxProblems) && (moduleNumber === 2 ? true : consecutiveDuplicates < maxConsecutiveDuplicates)) {
      const isQuestion = isQuestionScreen();
      const progressState = getProgressState();
      const bodyText = (document.body.innerText || document.body.textContent || "").substring(0, 200);
      if (lastProgressState === null) {
        lastProgressState = progressState;
      }
      if (lastProgressState === null) {
        lastProgressState = progressState;
      }
      const moduleProblemsCount = targetArray.filter((p) => p.module === moduleNumber).length;
      const loopCondition = TEMP_MODE ? collectedNumbers.size < targetNumbers.size : moduleProblemsCount < maxProblems;
      const allProblems = targetArray.map((p) => ({ module: p.module, problemNumber: p.problemNumber }));
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:loopStart", message: "collectModuleProblems loop start", data: { targetArrayLength: targetArray.length, moduleProblemsCount, maxProblems, loopCondition, consecutiveDuplicates, maxConsecutiveDuplicates, isQuestion, progressState, bodyText, moduleName, moduleNumber, allProblems }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "F" }) }).catch(() => {
      });
      if (!isQuestion) {
        console.warn(`[FLOW] \uBB38\uC81C \uD654\uBA74\uC774 \uC544\uB2D9\uB2C8\uB2E4. \uB300\uAE30 \uC911...`);
        await waitForCondition(() => isQuestionScreen(), CONFIG.timeouts.screenTransition);
        if (!isQuestionScreen()) {
          console.warn(`[FLOW] \uBB38\uC81C \uD654\uBA74\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC218\uC9D1 \uC885\uB8CC.`);
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:questionScreenNotFound", message: "question screen not found, breaking", data: { targetArrayLength: targetArray.length, bodyText: (document.body.innerText || "").substring(0, 200) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "C" }) }).catch(() => {
          });
          break;
        }
      }
      let currentProblemNum = getCurrentProblemNumber();
      const progressStateCheck = getProgressState();
      if (!currentProblemNum || currentProblemNum <= 0) {
        if (progressStateCheck) {
          const progressMatch = progressStateCheck.match(/(\d+)\s*\/\s*\d+/);
          if (progressMatch) {
            currentProblemNum = parseInt(progressMatch[1]);
            console.log(`[FLOW] \uBB38\uC81C \uBC88\uD638\uB97C Progress\uC5D0\uC11C \uCD94\uCD9C: ${currentProblemNum}`);
          }
        }
      }
      await new Promise((resolve) => setTimeout(resolve, 120));
      const retryProblemNum = getCurrentProblemNumber();
      if (retryProblemNum > 0 && retryProblemNum !== currentProblemNum) {
        console.log(`[FLOW] \uBB38\uC81C \uBC88\uD638 \uC7AC\uD655\uC778: ${currentProblemNum} \u2192 ${retryProblemNum}`);
        currentProblemNum = retryProblemNum;
      }
      console.log(`[FLOW] \uD604\uC7AC \uBB38\uC81C: ${currentProblemNum}, Progress: ${progressStateCheck}`);
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:problemNumberCheck", message: "problem number check", data: { currentProblemNum, progressState: progressStateCheck, targetArrayLength: targetArray.length, isQuestionScreen: isQuestionScreen(), bodyText: (document.body.innerText || "").substring(0, 200) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
      });
      if (TEMP_MODE && targetNumbers) {
        if (!currentProblemNum || currentProblemNum <= 0) {
          console.error(`[TEMP] \u2717 \uBB38\uC81C \uBC88\uD638\uB97C \uC77D\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4 (${currentProblemNum}). \uB2E4\uC74C\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.`);
          const beforeProblemNum2 = 0;
          const moved = await clickNextButtonWithFallback(beforeProblemNum2);
          if (!moved) {
            console.warn(`[FLOW] \uB2E4\uC74C \uBB38\uC81C\uB85C \uC774\uB3D9 \uC2E4\uD328. \uC218\uC9D1 \uC885\uB8CC.`);
            break;
          }
          await waitForContentLoad(CONFIG.timeouts.screenTransition);
          continue;
        }
        if (!targetNumbers.has(currentProblemNum)) {
          console.error(`[TEMP] \u2717 \uBB38\uC81C \uBC88\uD638 ${currentProblemNum}\uB294 \uC218\uC9D1 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4! \uB2E4\uC74C\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.`);
          console.error(`[TEMP] \uC218\uC9D1 \uB300\uC0C1: ${Array.from(targetNumbers).join(", ")}, \uC774\uBBF8 \uC218\uC9D1: ${Array.from(collectedNumbers).join(", ")}`);
          const beforeProblemNum2 = currentProblemNum;
          const moved = await clickNextButtonWithFallback(beforeProblemNum2);
          if (!moved) {
            console.warn(`[FLOW] \uB2E4\uC74C \uBB38\uC81C\uB85C \uC774\uB3D9 \uC2E4\uD328. \uC218\uC9D1 \uC885\uB8CC.`);
            break;
          }
          await waitForContentLoad(CONFIG.timeouts.screenTransition);
          continue;
        }
      }
      const baseSignature = getQuestionSignature();
      const signature = moduleNumber === 2 ? `${moduleNumber}-${currentProblemNum}-${baseSignature}` : baseSignature;
      const beforeProgressState = getProgressState();
      const beforeProblemNum = getCurrentProblemNumber();
      if (moduleNumber === 2 && beforeProgressState !== lastProgressState) {
        lastProgressState = beforeProgressState;
      }
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:signatureCheck", message: "checking problem signature for duplicates", data: { baseSignature, signature, moduleNumber, currentProblemNum, beforeProblemNum, seenSignatures: Array.from(seenSignatures), consecutiveDuplicates, isDuplicate: seenSignatures.has(signature), beforeProgressState, lastProgressState }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "J" }) }).catch(() => {
      });
      if (seenSignatures.has(signature)) {
        console.warn(`[FLOW] \uC911\uBCF5 \uBB38\uC81C \uAC10\uC9C0: ${signature} (\uBAA8\uB4C8: ${moduleNumber}, \uBB38\uC81C: ${currentProblemNum})`);
        consecutiveDuplicates++;
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:duplicateDetected", message: "duplicate problem detected, incrementing consecutiveDuplicates", data: { signature, moduleNumber, currentProblemNum, consecutiveDuplicates, maxConsecutiveDuplicates, reason: "signature already seen", beforeProgressState, lastProgressState }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "J" }) }).catch(() => {
        });
        if (moduleNumber === 2) {
          const currentProgressState = getProgressState();
          const currentProblemNumFromProgress = getCurrentProblemNumber();
          if (lastProgressState !== currentProgressState && currentProblemNumFromProgress > 0) {
            console.log(`[FLOW] Module 2: progress \uBCC0\uD654 \uAC10\uC9C0 (${lastProgressState} \u2192 ${currentProgressState}), consecutiveDuplicates \uB9AC\uC14B`);
            consecutiveDuplicates = 0;
            lastProgressState = currentProgressState;
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:module2ProgressChange", message: "Module 2: progress changed, resetting consecutiveDuplicates", data: { lastProgressState, currentProgressState, currentProblemNumFromProgress, consecutiveDuplicates: 0, moduleNumber }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "J" }) }).catch(() => {
            });
            seenSignatures.add(signature);
            continue;
          }
        }
        if (consecutiveDuplicates >= maxConsecutiveDuplicates) {
          console.warn(`[FLOW] \uC5F0\uC18D \uC911\uBCF5 ${maxConsecutiveDuplicates}\uD68C. \uC218\uC9D1 \uC885\uB8CC.`);
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:breakConsecutiveDuplicates", message: "BREAK: consecutive duplicates exceeded", data: { reason: "consecutiveDuplicatesExceeded", currentProblemNum, moduleProblemsCount: targetArray.filter((p) => p.module === moduleNumber).length, consecutiveDuplicates, maxConsecutiveDuplicates, progressState: getProgressState(), isQuestion: isQuestionScreen(), signature, moduleNumber, lastProgressState }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "J" }) }).catch(() => {
          });
          break;
        }
      } else {
        consecutiveDuplicates = 0;
        seenSignatures.add(signature);
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:newSignature", message: "new signature detected, resetting consecutiveDuplicates", data: { signature, moduleNumber, currentProblemNum, consecutiveDuplicates: 0 }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "J" }) }).catch(() => {
        });
      }
      if (TEMP_MODE && collectedNumbers.has(currentProblemNum)) {
        console.log(`[TEMP] \uBB38\uC81C \uBC88\uD638 ${currentProblemNum}\uB294 \uC774\uBBF8 \uC218\uC9D1\uD588\uC2B5\uB2C8\uB2E4. \uB2E4\uC74C\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.`);
        const beforeProblemNum2 = currentProblemNum;
        const moved = await clickNextButtonWithFallback(beforeProblemNum2);
        if (!moved) {
          console.warn(`[FLOW] \uB2E4\uC74C \uBB38\uC81C\uB85C \uC774\uB3D9 \uC2E4\uD328. \uC218\uC9D1 \uC885\uB8CC.`);
          break;
        }
        await waitForContentLoad(CONFIG.timeouts.screenTransition);
        continue;
      }
      const alreadyGraded = isGraded();
      const isLastProblem = currentProblemNum === maxProblems;
      let problem = null;
      if (isLastProblem && !alreadyGraded) {
        console.log(`[FLOW] 27\uBC88 \uBB38\uC81C \uAC10\uC9C0: \uC81C\uCD9C \uC804\uC5D0 \uBB38\uC81C \uCD94\uCD9C \uC911...`);
        const beforeExtractProblemNum = getCurrentProblemNumber();
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:extract27BeforeSubmit", message: "extracting problem 27 before submit", data: { currentProblemNum, maxProblems, beforeExtractProblemNum }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "I" }) }).catch(() => {
        });
        problem = await extractCurrentProblem(sectionType);
        if (problem) {
          problem.problemNumber = currentProblemNum;
          console.log(`[FLOW] 27\uBC88 \uBB38\uC81C \uBC88\uD638 \uAC15\uC81C \uC124\uC815: ${currentProblemNum} (extractCurrentProblem \uACB0\uACFC: ${problem.problemNumber})`);
        }
        const afterExtractProblemNum = getCurrentProblemNumber();
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:extract27BeforeSubmitDone", message: "extracted problem 27 before submit", data: { problemNumber: problem?.problemNumber, currentProblemNum, beforeExtractProblemNum, afterExtractProblemNum }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "I" }) }).catch(() => {
        });
      }
      let correctAnswer = null;
      let explanation = "";
      if (!alreadyGraded) {
        const hasImage = currentProblemHasImage();
        const beforeMs = hasImage ? CONFIG.timeouts.beforeChoiceClickWithImage : CONFIG.timeouts.beforeChoiceClick;
        console.log(`[FLOW] \uC120\uC9C0 \uD074\uB9AD \uC804 \uB300\uAE30 ${beforeMs}ms${hasImage ? " (\uC774\uBBF8\uC9C0 \uC788\uC74C)" : ""}...`);
        await new Promise((resolve) => setTimeout(resolve, beforeMs));
        console.log(`[FLOW] \uC120\uD0DD\uC9C0 \uD074\uB9AD \uC911...`);
        const clicked = await clickFirstChoice(sectionType);
        if (!clicked) {
          console.warn(`[FLOW] \uC120\uD0DD\uC9C0 \uD074\uB9AD \uC2E4\uD328. \uB2E4\uC74C \uBB38\uC81C\uB85C \uC774\uB3D9 \uC2DC\uB3C4.`);
        } else {
          console.log(`[FLOW] \u2713 \uC120\uD0DD\uC9C0 \uD074\uB9AD \uC131\uACF5`);
          const afterMs = hasImage ? CONFIG.timeouts.afterChoiceClickWithImage : CONFIG.timeouts.afterChoiceClick;
          console.log(`[FLOW] \uC120\uC9C0 \uD074\uB9AD \uD6C4 \uC81C\uCD9C \uC804 \uB300\uAE30 ${afterMs}ms${hasImage ? " (\uC774\uBBF8\uC9C0 \uC788\uC74C)" : ""}...`);
          await new Promise((resolve) => setTimeout(resolve, afterMs));
        }
        if (isLastProblem && clicked) {
          console.log(`[FLOW] 27\uBC88: \uC81C\uCD9C \uC804\uC5D0 \uC815\uB2F5 \uCD94\uCD9C (\uD654\uBA74 \uC804\uD658 \uC804)...`);
          await new Promise((resolve) => setTimeout(resolve, 120));
          correctAnswer = detectCorrectAnswer();
          explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || "";
          if (correctAnswer) {
            console.log(`[FLOW] \u2713 27\uBC88 \uBB38\uC81C \uC815\uB2F5 \uCD94\uCD9C \uC131\uACF5 (\uC81C\uCD9C \uC804): ${correctAnswer}`);
          }
        }
        console.log(`[FLOW] \uC81C\uCD9C \uBC84\uD2BC \uD074\uB9AD \uC911...`);
        const onAfterConfirm = isLastProblem ? async () => {
          console.log("[FLOW] 27\uBC88: \uD655\uC778 \uD074\uB9AD \uC9C1\uD6C4 \uC815\uB2F5 \uD3F4\uB9C1 \uC2DC\uC791...");
          const deadline = Date.now() + 3e3;
          while (Date.now() < deadline && !correctAnswer) {
            const polled = detectCorrectAnswer();
            if (polled) {
              correctAnswer = polled;
              explanation = extractExplanationAfterGrading(polled, currentProblemNum) || "";
              console.log(`[FLOW] 27\uBC88: \uD655\uC778 \uC9C1\uD6C4 \uC815\uB2F5 \uD655\uBCF4 \u2192 ${polled}`);
              fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:lastProblemOnConfirm", message: "27 answer captured in onAfterConfirm", data: { currentProblemNum, polled }, timestamp: Date.now(), runId: "run1", hypothesisId: "K" }) }).catch(() => {
              });
              break;
            }
            await new Promise((resolve) => setTimeout(resolve, 50));
          }
        } : void 0;
        const submitted = await clickSubmitWithConfirmation(onAfterConfirm);
        if (!submitted) {
          console.warn(`[FLOW] \uC81C\uCD9C \uC2E4\uD328. \uB2E4\uC74C \uBB38\uC81C\uB85C \uC774\uB3D9 \uC2DC\uB3C4.`);
        } else {
          console.log(`[FLOW] \u2713 \uC81C\uCD9C \uC131\uACF5`);
        }
        console.log(`[FLOW] \uCC44\uC810 \uB300\uAE30 \uC911...`);
        let gradingResult = !!correctAnswer;
        if (!gradingResult) {
          gradingResult = await waitForGrading(1500);
        }
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:afterGrading", message: "after grading wait", data: { gradingResult, isLastProblem, currentProblemNum }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "I" }) }).catch(() => {
        });
        if (!gradingResult) {
          console.warn(`[FLOW] \uCC44\uC810 \uC644\uB8CC \uB300\uAE30 \uC2E4\uD328. \uB2E4\uC74C \uBB38\uC81C\uB85C \uC774\uB3D9 \uC2DC\uB3C4.`);
          if (isLastProblem) {
            console.log(`[FLOW] 27\uBC88 \uBB38\uC81C: \uCC44\uC810 \uB300\uAE30 \uC2E4\uD328\uD588\uC9C0\uB9CC \uC815\uB2F5 \uCD94\uCD9C \uC2DC\uB3C4...`);
            await new Promise((resolve) => setTimeout(resolve, 50));
            correctAnswer = detectCorrectAnswer();
            explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || "";
            if (correctAnswer) {
              console.log(`[FLOW] \u2713 27\uBC88 \uBB38\uC81C \uC815\uB2F5 \uCD94\uCD9C \uC131\uACF5 (\uCC44\uC810 \uB300\uAE30 \uC2E4\uD328 \uD6C4): ${correctAnswer}`);
            }
          }
        } else {
          console.log(`[FLOW] \u2713 \uCC44\uC810 \uC644\uB8CC`);
          console.log(`[FLOW] \uC815\uB2F5 \uD45C\uC2DC DOM \uBC18\uC601 \uB300\uAE30 \uC911...`);
          await new Promise((resolve) => setTimeout(resolve, 120));
          let retryCount = 0;
          let answerMarkingFound = false;
          while (retryCount < 5) {
            const satRoot = findSatRoot();
            if (satRoot) {
              const hasAnswerMarking = satRoot.querySelector('[class*="answered-correct"], [class*="answered-incorrect"], [aria-label*="Correct" i], [aria-label*="Incorrect" i]');
              if (hasAnswerMarking) {
                console.log(`[FLOW] \u2713 \uC815\uB2F5 \uD45C\uC2DC \uD655\uC778\uB428 (\uC7AC\uC2DC\uB3C4 ${retryCount + 1}/5)`);
                answerMarkingFound = true;
                break;
              }
            }
            await new Promise((resolve) => setTimeout(resolve, 120));
            retryCount++;
          }
          if (answerMarkingFound) {
            console.log(`[FLOW] \uC815\uB2F5 \uCD94\uCD9C \uC2DC\uB3C4 \uC911 (\uCC44\uC810 \uC9C1\uD6C4)...`);
            const beforeExtractProblemNum = getCurrentProblemNumber();
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:beforeExtract", message: "before extracting answer and explanation", data: { currentProblemNum, beforeExtractProblemNum }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
            });
            correctAnswer = detectCorrectAnswer();
            const beforeExplanationProblemNum = getCurrentProblemNumber();
            explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || "";
            const afterExtractProblemNum = getCurrentProblemNumber();
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:afterExtract", message: "after extracting answer and explanation", data: { currentProblemNum, afterExtractProblemNum, beforeExplanationProblemNum, correctAnswer, explanationLength: explanation.length, explanationPreview: explanation.substring(0, 100) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
            });
            if (correctAnswer) {
              console.log(`[FLOW] \u2713 \uC815\uB2F5 \uCD94\uCD9C \uC131\uACF5: ${correctAnswer}`);
            } else {
              console.warn(`[FLOW] \u2717 \uC815\uB2F5 \uCD94\uCD9C \uC2E4\uD328 (\uCC44\uC810 \uC9C1\uD6C4 \uC2DC\uB3C4)`);
              await new Promise((resolve) => setTimeout(resolve, 120));
              const retryProblemNum2 = getCurrentProblemNumber();
              fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:retryExtract", message: "retrying answer extraction", data: { currentProblemNum, retryProblemNum: retryProblemNum2 }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
              });
              correctAnswer = detectCorrectAnswer();
              const beforeRetryExplanationProblemNum = getCurrentProblemNumber();
              explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || "";
              const afterRetryProblemNum = getCurrentProblemNumber();
              fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:afterRetryExtract", message: "after retry extraction", data: { currentProblemNum, afterRetryProblemNum, beforeRetryExplanationProblemNum, correctAnswer, explanationLength: explanation.length, explanationPreview: explanation.substring(0, 100) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
              });
              if (correctAnswer) {
                console.log(`[FLOW] \u2713 \uC815\uB2F5 \uCD94\uCD9C \uC131\uACF5 (\uC7AC\uC2DC\uB3C4): ${correctAnswer}`);
              }
            }
          }
        }
      } else {
        console.log(`[FLOW] \uC774\uBBF8 \uCC44\uC810\uB41C \uC0C1\uD0DC\uC785\uB2C8\uB2E4.`);
        correctAnswer = detectCorrectAnswer();
        const beforeAlreadyGradedExplanationProblemNum = getCurrentProblemNumber();
        explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || "";
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:alreadyGradedExtract", message: "extracting from already graded state", data: { currentProblemNum, beforeAlreadyGradedExplanationProblemNum, correctAnswer, explanationLength: explanation.length, explanationPreview: explanation.substring(0, 100) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
        });
        if (!correctAnswer && moduleNumber === 2 && currentProblemNum === 1) {
          console.log(`[FLOW] \uBAA8\uB4C8 2 \uBB38\uC81C 1: \uC774\uBBF8 \uCC44\uC810 \uD310\uBCC4\uD588\uC73C\uB098 \uC815\uB2F5 \uC5C6\uC74C. \uC120\uD0DD\uC9C0 \uD074\uB9AD \uACBD\uB85C \uC7AC\uC2DC\uB3C4...`);
          const retryClicked = await clickFirstChoice(sectionType);
          if (retryClicked) {
            await new Promise((resolve) => setTimeout(resolve, 120));
            correctAnswer = detectCorrectAnswer();
            explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || "";
            if (correctAnswer) {
              console.log(`[FLOW] \u2713 \uBAA8\uB4C8 2 \uBB38\uC81C 1 \uC815\uB2F5 \uCD94\uCD9C \uC131\uACF5 (\uC7AC\uC2DC\uB3C4): ${correctAnswer}`);
            }
          }
        }
      }
      let problemExtracted = false;
      if (!problem) {
        console.log(`[FLOW] \uBB38\uC81C \uCD94\uCD9C \uC911...`);
        fetch("http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:beforeExtractCurrentProblem", message: "math image extract debug: before extract", data: { sectionType, currentProblemNum, isLastProblem }, timestamp: Date.now(), hypothesisId: "H5" }) }).catch(() => {
        });
        problem = await extractCurrentProblem(sectionType);
        fetch("http://127.0.0.1:7245/ingest/4830a523-40c3-4932-aa61-ce8aa2b3d853", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:afterExtractCurrentProblem", message: "math image extract debug: after extract", data: { sectionType, currentProblemNum, problemNull: problem === null, figuresLength: problem?.figures?.length ?? "n/a" }, timestamp: Date.now(), hypothesisId: "H1" }) }).catch(() => {
        });
      } else {
        console.log(`[FLOW] 27\uBC88 \uBB38\uC81C\uB294 \uC774\uBBF8 \uCD94\uCD9C\uD588\uC2B5\uB2C8\uB2E4.`);
        if (isLastProblem && !correctAnswer) {
          console.log(`[FLOW] 27\uBC88 \uBB38\uC81C: \uC815\uB2F5 \uCD94\uCD9C \uC7AC\uC2DC\uB3C4 \uC911...`);
          await new Promise((resolve) => setTimeout(resolve, 50));
          correctAnswer = detectCorrectAnswer();
          explanation = extractExplanationAfterGrading(correctAnswer, currentProblemNum) || "";
          if (correctAnswer) {
            console.log(`[FLOW] \u2713 27\uBC88 \uBB38\uC81C \uC815\uB2F5 \uCD94\uCD9C \uC131\uACF5: ${correctAnswer}`);
          }
        }
      }
      if (problem) {
        consecutiveExtractFailures = 0;
        if (!problem.problemNumber || problem.problemNumber <= 0) {
          if (currentProblemNum > 0) {
            problem.problemNumber = currentProblemNum;
            console.log(`[SAT-DEBUG] [collectModuleProblems] problemNumber\uC744 currentProblemNum\uC73C\uB85C \uC124\uC815: ${currentProblemNum}`);
          } else {
            const progressState2 = getProgressState();
            if (progressState2) {
              const progressMatch = progressState2.match(/(\d+)\s*\/\s*\d+/);
              if (progressMatch) {
                problem.problemNumber = parseInt(progressMatch[1]);
                console.log(`[SAT-DEBUG] [collectModuleProblems] problemNumber\uC744 Progress\uC5D0\uC11C \uCD94\uCD9C: ${problem.problemNumber}`);
              }
            }
            if (!problem.problemNumber || problem.problemNumber <= 0) {
              problem.problemNumber = targetArray.length + 1;
              console.warn(`[SAT-DEBUG] [collectModuleProblems] problemNumber \uCD5C\uD6C4 \uD3F4\uBC31: index \uAE30\uBC18 \u2192 ${problem.problemNumber}`);
            }
          }
        }
        let finalProblemNum = problem.problemNumber || currentProblemNum;
        if (isLastProblem && finalProblemNum !== currentProblemNum) {
          console.warn(`[FLOW] 27\uBC88 \uBB38\uC81C \uBC88\uD638 \uC624\uC778\uC2DD \uAC10\uC9C0: ${finalProblemNum} \u2192 ${currentProblemNum}\uB85C \uAC15\uC81C \uC218\uC815`);
          finalProblemNum = currentProblemNum;
          problem.problemNumber = currentProblemNum;
        }
        console.log(`[FLOW] \uCD94\uCD9C\uB41C \uBB38\uC81C \uBC88\uD638: ${finalProblemNum} (currentProblemNum: ${currentProblemNum}, problem.problemNumber: ${problem.problemNumber})`);
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:finalProblemNum", message: "final problem number check", data: { finalProblemNum, currentProblemNum, problemProblemNumber: problem.problemNumber, isLastProblem }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "I" }) }).catch(() => {
        });
        if (TEMP_MODE && targetNumbers && !targetNumbers.has(finalProblemNum)) {
          console.warn(`[TEMP] \u2717 \uBB38\uC81C \uBC88\uD638 ${finalProblemNum}\uB294 \uC218\uC9D1 \uB300\uC0C1\uC774 \uC544\uB2D9\uB2C8\uB2E4. \uC218\uC9D1\uD558\uC9C0 \uC54A\uACE0 \uB2E4\uC74C\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.`);
          console.warn(`[TEMP] \uC218\uC9D1 \uB300\uC0C1: ${Array.from(targetNumbers).join(", ")}, \uC774\uBBF8 \uC218\uC9D1: ${Array.from(collectedNumbers).join(", ")}`);
          const beforeProblemNum2 = finalProblemNum > 0 ? finalProblemNum : currentProblemNum;
          const moved = await clickNextButtonWithFallback(beforeProblemNum2);
          if (!moved) {
            console.warn(`[FLOW] \uB2E4\uC74C \uBB38\uC81C\uB85C \uC774\uB3D9 \uC2E4\uD328. \uC218\uC9D1 \uC885\uB8CC.`);
            break;
          }
          await waitForContentLoad(CONFIG.timeouts.screenTransition);
          continue;
        }
        if (TEMP_MODE && collectedNumbers.has(finalProblemNum)) {
          console.warn(`[TEMP] \u2717 \uBB38\uC81C \uBC88\uD638 ${finalProblemNum}\uB294 \uC774\uBBF8 \uC218\uC9D1\uD588\uC2B5\uB2C8\uB2E4. \uC218\uC9D1\uD558\uC9C0 \uC54A\uACE0 \uB2E4\uC74C\uC73C\uB85C \uC774\uB3D9\uD569\uB2C8\uB2E4.`);
          const beforeProblemNum2 = finalProblemNum;
          const moved = await clickNextButtonWithFallback(beforeProblemNum2);
          if (!moved) {
            console.warn(`[FLOW] \uB2E4\uC74C \uBB38\uC81C\uB85C \uC774\uB3D9 \uC2E4\uD328. \uC218\uC9D1 \uC885\uB8CC.`);
            break;
          }
          await waitForContentLoad(CONFIG.timeouts.screenTransition);
          continue;
        }
        problem.module = moduleNumber;
        console.log(`[DEBUG STEP 3] collectModuleProblems: \uBB38\uC81C ${finalProblemNum} push \uC9C1\uC804, problem.figures=${problem.figures ? problem.figures.length : "undefined"}`);
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:beforePush", message: "DEBUG STEP 3: collectModuleProblems\uC5D0\uC11C problem.figures \uAC80\uC99D", data: { finalProblemNum, hasFigures: !!problem.figures, figuresLength: problem.figures ? problem.figures.length : 0, figures: problem.figures ? problem.figures.map((f) => ({ w: f.width, h: f.height, hasDataUrl: !!f.dataUrl })) : null }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "C" }) }).catch(() => {
        });
        targetArray.push(problem);
        problemExtracted = true;
        if (TEMP_MODE && finalProblemNum > 0) {
          collectedNumbers.add(finalProblemNum);
          console.log(`[TEMP] \u2713 \uBB38\uC81C \uBC88\uD638 ${finalProblemNum} \uC218\uC9D1 \uC644\uB8CC`);
        }
        const collectedCount = targetArray.length;
        const moduleCollectedCount = targetArray.filter((p) => p.module === moduleNumber).length;
        console.log(`[FLOW] \uBB38\uC81C ${collectedCount} \uC218\uC9D1 \uC644\uB8CC: ${finalProblemNum} (\uD604\uC7AC \uBAA8\uB4C8: ${moduleCollectedCount}\uAC1C)`);
        const shouldBreakFor27 = !TEMP_MODE && finalProblemNum === maxProblems && moduleCollectedCount >= maxProblems;
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:afterPush", message: "after pushing problem to array", data: { collectedCount, moduleCollectedCount, finalProblemNum, maxProblems, shouldBreakFor27, TEMP_MODE, moduleNumber }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "G" }) }).catch(() => {
        });
        if (!TEMP_MODE && shouldBreakFor27) {
          console.log("[FLOW] 27\uBC88 \uBB38\uC81C \uC218\uC9D1 \uC644\uB8CC - \uC815\uB2F5/\uD574\uC124 \uD560\uB2F9 \uD6C4 \uB8E8\uD504 \uC885\uB8CC \uC608\uC815");
        }
        if (TEMP_MODE) {
          console.log(`[TEMP] \uC218\uC9D1\uB41C \uBB38\uC81C \uBC88\uD638: ${Array.from(collectedNumbers).sort((a, b) => a - b).join(", ")}`);
          if (collectedNumbers.size >= targetNumbers.size) {
            console.log(`[TEMP] \uBAA8\uB4E0 \uB300\uC0C1 \uBB38\uC81C \uC218\uC9D1 \uC644\uB8CC (${Array.from(collectedNumbers).sort((a, b) => a - b).join(", ")}). \uC989\uC2DC \uC885\uB8CC\uD569\uB2C8\uB2E4.`);
            return collectedCount;
          }
        }
      } else {
        console.warn(`[FLOW] \uBB38\uC81C \uCD94\uCD9C \uC2E4\uD328. \uB2E4\uC74C \uBB38\uC81C\uB85C \uB118\uC5B4\uAC00\uC9C0 \uC54A\uACE0 \uC7AC\uC2DC\uB3C4\uD569\uB2C8\uB2E4.`);
      }
      if (!problem) {
        consecutiveExtractFailures++;
        if (consecutiveExtractFailures >= maxExtractRetries) {
          console.warn(`[FLOW] \uBB38\uC81C \uCD94\uCD9C \uC5F0\uC18D ${maxExtractRetries}\uD68C \uC2E4\uD328. \uC218\uC9D1 \uC885\uB8CC.`);
          break;
        }
        console.log(`[FLOW] \uCD94\uCD9C \uC7AC\uC2DC\uB3C4 \uB300\uAE30 \uD6C4 \uAC19\uC740 \uBB38\uC81C \uB2E4\uC2DC \uC2DC\uB3C4 (${consecutiveExtractFailures}/${maxExtractRetries})...`);
        await new Promise((resolve) => setTimeout(resolve, 800));
        continue;
      }
      if (problemExtracted && problem) {
        const assignmentProblemNum = problem.problemNumber || currentProblemNum;
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:beforeAssignment", message: "before assigning answer and explanation", data: { assignmentProblemNum, currentProblemNum, correctAnswer, explanationLength: explanation.length, explanationPreview: explanation.substring(0, 100) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
        });
        if (correctAnswer) {
          problem.correctAnswer = correctAnswer;
          problem.explanation = explanation || "";
          console.log(`[FLOW] \uC815\uB2F5/\uD574\uC124 \uD560\uB2F9 \uC644\uB8CC: ${correctAnswer} (\uBB38\uC81C \uBC88\uD638: ${problem.problemNumber || currentProblemNum})`);
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:afterAssignment", message: "after assigning answer and explanation", data: { assignmentProblemNum, currentProblemNum, correctAnswer, explanationLength: problem.explanation.length, explanationPreview: problem.explanation.substring(0, 100) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
          });
        } else {
          const retryProblemNum2 = problem.problemNumber || currentProblemNum;
          console.warn(`[FLOW] \uC815\uB2F5 \uCD94\uCD9C \uC2E4\uD328. \uC7AC\uC2DC\uB3C4 \uC911... (\uBB38\uC81C \uBC88\uD638: ${retryProblemNum2})`);
          const retryAnswer = detectCorrectAnswer();
          const retryExplanation = extractExplanationAfterGrading(retryAnswer, retryProblemNum2) || "";
          if (retryAnswer) {
            problem.correctAnswer = retryAnswer;
            problem.explanation = retryExplanation;
            console.log(`[FLOW] \u2713 \uC815\uB2F5 \uCD94\uCD9C \uC131\uACF5 (\uC7AC\uC2DC\uB3C4): ${retryAnswer}`);
            const retryAssignmentProblemNum = problem.problemNumber || currentProblemNum;
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:afterRetryAssignment", message: "after retry assignment", data: { retryAssignmentProblemNum, currentProblemNum, retryAnswer, explanationLength: problem.explanation.length, explanationPreview: problem.explanation.substring(0, 100) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
            });
          } else {
            problem.correctAnswer = "";
            problem.explanation = retryExplanation || "";
            console.warn(`[FLOW] \u2717 \uC815\uB2F5 \uCD94\uCD9C \uCD5C\uC885 \uC2E4\uD328 (\uBB38\uC81C \uBC88\uD638: ${problem.problemNumber || currentProblemNum})`);
          }
        }
      }
      if (!TEMP_MODE && problemExtracted && problem && problem.problemNumber === maxProblems) {
        const moduleCollectedCountAfterAssign = targetArray.filter((p) => p.module === moduleNumber).length;
        if (moduleCollectedCountAfterAssign >= maxProblems) {
          console.log(`[FLOW] 27\uBC88 \uBB38\uC81C \uC815\uB2F5/\uD574\uC124 \uD560\uB2F9 \uC644\uB8CC \uD6C4 \uB8E8\uD504 \uC885\uB8CC (\uBAA8\uB4C8 ${moduleNumber}, \uC218\uC9D1 \uAC1C\uC218: ${moduleCollectedCountAfterAssign})`);
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:breakFor27AfterAssign", message: "breaking loop after assigning problem 27", data: { moduleNumber, moduleCollectedCount: moduleCollectedCountAfterAssign, problemNumber: problem.problemNumber }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "G" }) }).catch(() => {
          });
          break;
        }
      }
      if (TEMP_MODE && collectedNumbers.size >= targetNumbers.size) {
        console.log(`[TEMP] \uBAA8\uB4E0 \uB300\uC0C1 \uBB38\uC81C \uC218\uC9D1 \uC644\uB8CC. \uB2E4\uC74C \uBB38\uC81C\uB85C \uC774\uB3D9\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.`);
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:tempModeComplete", message: "TEMP mode complete, breaking loop", data: { collectedNumbers: Array.from(collectedNumbers), targetNumbers: Array.from(targetNumbers || []) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "F" }) }).catch(() => {
        });
        break;
      }
      const problemNumBeforeNext = getCurrentProblemNumber();
      console.log(`[FLOW] \uB2E4\uC74C \uBB38\uC81C\uB85C \uC774\uB3D9 \uC911... (\uD604\uC7AC: ${problemNumBeforeNext})`);
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:beforeNext", message: "before moving to next problem", data: { problemNumBeforeNext, currentProblemNum, collectedNumbers: Array.from(collectedNumbers), targetArrayLength: targetArray.length, maxProblems, TEMP_MODE }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "F" }) }).catch(() => {
      });
      let nextAttempts = 0;
      const maxNextAttempts = 5;
      let correctNext = false;
      let afterProblemNum = problemNumBeforeNext;
      while (!correctNext && nextAttempts < maxNextAttempts) {
        nextAttempts++;
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:clickNextAttempt", message: "attempting to click next button", data: { problemNumBeforeNext, nextAttempts, maxNextAttempts }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "F" }) }).catch(() => {
        });
        const moved = await clickNextButtonWithFallback(problemNumBeforeNext);
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:afterClickNext", message: "after clicking next button", data: { problemNumBeforeNext, moved, nextAttempts }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "F" }) }).catch(() => {
        });
        if (!moved) {
          console.warn(`[FLOW] \uB2E4\uC74C \uBB38\uC81C\uB85C \uC774\uB3D9 \uC2E4\uD328 (\uC2DC\uB3C4 ${nextAttempts}/${maxNextAttempts}). \uC218\uC9D1 \uC885\uB8CC.`);
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:nextFailed", message: "next button click failed", data: { problemNumBeforeNext, nextAttempts, maxNextAttempts }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "F" }) }).catch(() => {
          });
          break;
        }
        await waitForContentLoad(CONFIG.timeouts.screenTransition);
        await new Promise((resolve) => setTimeout(resolve, 120));
        afterProblemNum = getCurrentProblemNumber();
        const afterProgress = getProgressState();
        if (afterProgress) {
          const progressMatch = afterProgress.match(/(\d+)\s*\/\s*\d+/);
          if (progressMatch) {
            const progressNum = parseInt(progressMatch[1]);
            if (progressNum > 0 && (progressNum !== afterProblemNum || afterProblemNum <= 0)) {
              console.log(`[FLOW] \uBB38\uC81C \uBC88\uD638\uB97C Progress\uC5D0\uC11C \uC7AC\uD655\uC778: ${afterProblemNum} \u2192 ${progressNum}`);
              afterProblemNum = progressNum;
            }
          }
        }
        console.log(`[FLOW] Next \uD074\uB9AD \uD6C4 \uBB38\uC81C \uBC88\uD638: ${problemNumBeforeNext} \u2192 ${afterProblemNum}`);
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:afterNextCheck", message: "checking problem number after next click", data: { problemNumBeforeNext, afterProblemNum, expectedNext: problemNumBeforeNext + 1, correctNext: afterProblemNum === problemNumBeforeNext + 1, moduleNumber }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "F" }) }).catch(() => {
        });
        if (afterProblemNum === problemNumBeforeNext + 1) {
          correctNext = true;
          console.log(`[FLOW] \u2713 \uC815\uD655\uD788 +1 \uC99D\uAC00 \uD655\uC778: ${problemNumBeforeNext} \u2192 ${afterProblemNum}`);
          if (moduleNumber === 2) {
            const newProgressState = getProgressState();
            console.log(`[FLOW] Module 2: progress \uC99D\uAC00 \uD655\uC778 (${lastProgressState} \u2192 ${newProgressState}), consecutiveDuplicates \uB9AC\uC14B`);
            consecutiveDuplicates = 0;
            lastProgressState = newProgressState;
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:module2ProgressReset", message: "Module 2: progress increased, resetting consecutiveDuplicates", data: { problemNumBeforeNext, afterProblemNum, consecutiveDuplicates: 0, moduleNumber, lastProgressState, newProgressState }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "J" }) }).catch(() => {
            });
          }
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:nextSuccess", message: "successfully moved to next problem", data: { problemNumBeforeNext, afterProblemNum, moduleNumber, consecutiveDuplicates }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "F" }) }).catch(() => {
          });
          break;
        } else if (afterProblemNum > problemNumBeforeNext + 1) {
          console.error(`[FLOW] \u2717 \uC810\uD504 \uD0D0\uC9C0! ${problemNumBeforeNext} \u2192 ${afterProblemNum} (\uC608\uC0C1: ${problemNumBeforeNext + 1})`);
          if (TEMP_MODE && targetNumbers) {
            const missedNumbers = [];
            for (let num = problemNumBeforeNext + 1; num < afterProblemNum; num++) {
              if (targetNumbers.has(num) && !collectedNumbers.has(num)) {
                missedNumbers.push(num);
              }
            }
            if (missedNumbers.length > 0) {
              console.warn(`[TEMP] \uB193\uCE5C \uBB38\uC81C \uBC88\uD638: ${missedNumbers.join(", ")}`);
              const previousButton = findNavigationButton2("previous", "\uC774\uC804", "prev", "back");
              if (previousButton && !previousButton.disabled) {
                const jumpSize = afterProblemNum - problemNumBeforeNext;
                console.log(`[TEMP] Previous \uBC84\uD2BC \uBC1C\uACAC. ${jumpSize - 1}\uBC88 \uB418\uB3CC\uB9AC\uAE30 \uC2DC\uB3C4...`);
                for (let i = 0; i < jumpSize - 1; i++) {
                  previousButton.click();
                  await new Promise((resolve) => setTimeout(resolve, 50));
                  await waitForContentLoad(CONFIG.timeouts.screenTransition);
                }
                const afterBackNum = getCurrentProblemNumber();
                console.log(`[TEMP] \uB418\uB3CC\uB9AC\uAE30 \uD6C4 \uBB38\uC81C \uBC88\uD638: ${afterProblemNum} \u2192 ${afterBackNum}`);
                if (afterBackNum === problemNumBeforeNext + 1) {
                  correctNext = true;
                  console.log(`[TEMP] \u2713 \uB418\uB3CC\uB9AC\uAE30 \uC131\uACF5! \uC815\uD655\uD788 ${problemNumBeforeNext + 1}\uBC88 \uBB38\uC81C\uB85C \uC774\uB3D9`);
                  break;
                } else {
                  console.warn(`[TEMP] \uB418\uB3CC\uB9AC\uAE30 \uC2E4\uD328. \uB2E4\uC2DC Next \uD074\uB9AD \uC2DC\uB3C4...`);
                  continue;
                }
              } else {
                console.warn(`[TEMP] Previous \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC7AC\uC2DC\uB3C4...`);
                continue;
              }
            }
          } else {
            console.warn(`[FLOW] \uC810\uD504 \uBC1C\uC0DD. \uC7AC\uC2DC\uB3C4 ${nextAttempts}/${maxNextAttempts}...`);
            continue;
          }
        } else if (afterProblemNum <= problemNumBeforeNext) {
          console.warn(`[FLOW] \uBB38\uC81C \uBC88\uD638\uAC00 \uC99D\uAC00\uD558\uC9C0 \uC54A\uC74C: ${problemNumBeforeNext} \u2192 ${afterProblemNum}. \uC7AC\uC2DC\uB3C4...`);
          await new Promise((resolve) => setTimeout(resolve, 120));
          continue;
        }
      }
      if (!correctNext) {
        console.error(`[FLOW] Next \uD074\uB9AD \uC2E4\uD328: \uC815\uD655\uD788 +1 \uC99D\uAC00\uD558\uC9C0 \uBABB\uD568 (\uC2DC\uB3C4 ${nextAttempts}\uD68C). \uC218\uC9D1 \uC885\uB8CC.`);
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:nextFailed", message: "next button click failed, breaking loop", data: { problemNumBeforeNext, afterProblemNum, nextAttempts, targetArrayLength: targetArray.length }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "H" }) }).catch(() => {
        });
        break;
      }
      if (!TEMP_MODE && afterProblemNum === maxProblems) {
        const lastProblem = targetArray[targetArray.length - 1];
        const has27 = lastProblem && lastProblem.problemNumber === maxProblems;
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "moduleRunner.js:check27AfterNext", message: "checking if problem 27 collected after next click", data: { afterProblemNum, maxProblems, has27, lastProblemNumber: lastProblem?.problemNumber, targetArrayLength: targetArray.length }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "G" }) }).catch(() => {
        });
        if (has27) {
          console.log(`[FLOW] 27\uBC88 \uBB38\uC81C \uC218\uC9D1 \uC644\uB8CC \uD655\uC778. \uB8E8\uD504 \uC885\uB8CC \uC900\uBE44 \uC911...`);
        }
      }
    }
    const finalCount = targetArray.length;
    const moduleFinalCount = targetArray.filter((p) => p.module === moduleNumber).length;
    const moduleCollectedProblemNumbers = targetArray.filter((p) => p.module === moduleNumber).map((p) => p.problemNumber).filter((n) => n > 0).sort((a, b) => a - b);
    console.log(`[FLOW] collectModuleProblems \uC644\uB8CC: ${moduleName} ${moduleFinalCount}\uAC1C \uC218\uC9D1 (\uC804\uCCB4: ${finalCount}\uAC1C)`);
    try {
      const missingAnswers = targetArray.filter((p) => p.module === moduleNumber).filter((p) => !p.correctAnswer && !p.answer && !p.isGridIn);
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: "moduleRunner.js:missingAnswersSummary",
          message: "collectModuleProblems missing answers summary",
          data: {
            sectionType,
            moduleName,
            moduleNumber,
            moduleFinalCount,
            missingCount: missingAnswers.length,
            missingProblemNumbers: missingAnswers.map((p) => p.problemNumber || 0).filter((n) => n > 0).sort((a, b) => a - b)
          },
          timestamp: Date.now(),
          runId: "answers-bug",
          hypothesisId: "H2"
        })
      }).catch(() => {
      });
    } catch {
    }
    if (!TEMP_MODE && moduleFinalCount > 0) {
      console.log(`[FLOW] ${moduleName} \uC218\uC9D1\uB41C \uBB38\uC81C \uBC88\uD638: ${moduleCollectedProblemNumbers.join(", ")}`);
      if (moduleFinalCount < maxProblems) {
        console.warn(`[FLOW] \uACBD\uACE0: ${moduleName} \uC608\uC0C1 \uBB38\uC81C \uC218(${maxProblems})\uBCF4\uB2E4 \uC801\uAC8C \uC218\uC9D1\uB428 (${moduleFinalCount}\uAC1C)`);
      }
      if (!moduleCollectedProblemNumbers.includes(maxProblems)) {
        console.warn(`[FLOW] \uACBD\uACE0: ${moduleName} ${maxProblems}\uBC88 \uBB38\uC81C\uAC00 \uC218\uC9D1\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4!`);
      }
    }
    return moduleFinalCount;
  }

  // src/flow/scraper.js
  init_extract();
  var SATScraper = class {
    constructor() {
      this.navigator = new SATNavigator();
      this.stateManager = new SectionStateManager();
    }
    /**
     * 현재 문제 번호 가져오기
     * @returns {number} 문제 번호 (없으면 0)
     */
    getCurrentProblemNumber() {
      return getCurrentProblemNumber();
    }
    /**
     * Progress 상태 가져오기
     * @returns {string|null} Progress 상태 (예: "3/27")
     */
    getProgressState() {
      return getProgressState();
    }
    /**
     * 문제 화면인지 확인
     * @returns {boolean} 문제 화면 여부
     */
    isQuestionScreen() {
      return isQuestionScreen();
    }
    /**
     * 모듈 완료 검증 (완화된 조건)
     * @param {string} sectionType - 'reading' | 'math'
     * @param {number} moduleNumber - 1 | 2
     * @param {number} collectedCount - 수집된 문제 수
     * @param {string} progressState - Progress 상태
     * @returns {boolean} 완료 여부
     */
    isModuleComplete(sectionType, moduleNumber, collectedCount, progressState) {
      const expectedCount = sectionType === "math" ? CONFIG.collection.mathMaxProblems ?? 22 : CONFIG.collection.maxProblems;
      const hasEnoughProblems = collectedCount >= expectedCount - 2;
      let isProgressComplete = false;
      if (progressState && progressState.includes(`/${expectedCount}`)) {
        const match = progressState.match(/(\d+)\s*\/\s*(\d+)/);
        if (match) {
          const current = parseInt(match[1]);
          const total = parseInt(match[2]);
          isProgressComplete = current === total && total === expectedCount;
        }
      }
      const allButtons = document.querySelectorAll('button, [role="button"]');
      const hasNextButton = Array.from(allButtons).some((btn) => {
        if (!btn.offsetParent) return false;
        const text = (btn.innerText || btn.textContent || "").trim().toLowerCase();
        return text.includes("\uB2E4\uC74C") || text.includes("next");
      });
      const isNextGone = !hasNextButton;
      const submitButton = findNavigationButton2("submit", "\uC81C\uCD9C", "submit");
      const hasSubmitButton = !!submitButton && submitButton.offsetParent;
      const isComplete = (isNextGone || hasSubmitButton) && (hasEnoughProblems || isProgressComplete);
      console.log(`[SATScraper] \uBAA8\uB4C8 \uC644\uB8CC \uAC80\uC99D (${sectionType} Module ${moduleNumber}):`, {
        collectedCount,
        expectedCount,
        hasEnoughProblems,
        isProgressComplete,
        isNextGone,
        hasSubmitButton,
        isComplete
      });
      return isComplete;
    }
    /**
     * 모듈 완료 후 화면 전환 대기
     * @param {string} sectionType - 'reading' | 'math'
     * @param {number} moduleNumber - 1 | 2
     * @returns {Promise<boolean>} 전환 완료 여부
     */
    async waitForModuleTransition(sectionType, moduleNumber) {
      console.log(`[SAT] waitForModuleTransition \uC2DC\uC791: sectionType=${sectionType}, moduleNumber=${moduleNumber}`);
      console.log(`[SATScraper] \uBAA8\uB4C8 \uC804\uD658 \uB300\uAE30 (${sectionType} Module ${moduleNumber} \u2192 ${moduleNumber === 1 ? 2 : "\uB2E4\uC74C \uC139\uC158"})`);
      if (moduleNumber === 1) {
        return await waitForCondition(() => {
          const submitButton = findNavigationButton2("submit", "\uC81C\uCD9C", "submit");
          if (submitButton) {
            console.log("[SAT] Submit \uBC84\uD2BC \uBC1C\uACAC (Module 1 \uC644\uB8CC \uB300\uAE30 \uC911)");
            return false;
          }
          const bodyText = (document.body.innerText || "").toLowerCase();
          const hasModule2Button = bodyText.includes("module 2") || bodyText.includes("\uBAA8\uB4C8 2") || findButtonByText("\uBAA8\uB4C8 2", "Module 2", "\uC2DC\uC791", "Start");
          if (hasModule2Button) {
            console.log("[SAT] Module 2 \uC2DC\uC791 \uBC84\uD2BC \uBC1C\uACAC");
            return true;
          }
          return false;
        }, CONFIG.timeouts.screenTransition * 8);
      }
      if (moduleNumber === 2 && sectionType === "reading") {
        return await waitForCondition(() => {
          const submitButton = findNavigationButton2("submit", "\uC81C\uCD9C", "submit");
          if (submitButton) {
            console.log("[SAT] Submit \uBC84\uD2BC \uBC1C\uACAC (Module 2 \uC644\uB8CC \uB300\uAE30 \uC911)");
            return false;
          }
          const bodyText = (document.body.innerText || "").toLowerCase();
          const hasReadingWriting = bodyText.includes("reading") && bodyText.includes("writing");
          const hasMathSection = bodyText.includes("math") || bodyText.includes("\uC218\uD559");
          if (!hasReadingWriting && hasMathSection) {
            console.log("[SAT] Math \uC139\uC158 \uC548\uB0B4 \uD654\uBA74 \uBC1C\uACAC");
            return true;
          }
          return false;
        }, CONFIG.timeouts.screenTransition * 8);
      }
      return true;
    }
    /**
     * 모든 문제 수집 (엄격한 순차 실행)
     * @returns {Promise<Object>} 수집된 문제 데이터
     */
    async collectAllProblems() {
      console.log("[SCRAPER] collectAllProblems start");
      const allData = {
        reading: [],
        math: [],
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      };
      console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: \uC804\uCCB4 \uBB38\uC81C \uC218\uC9D1 \uC2DC\uC791 (\uC5C4\uACA9\uD55C \uC21C\uCC28 \uC2E4\uD589)");
      this.stateManager.syncWithUI();
      console.log("[SAT-DEBUG] \uC0C1\uD0DC \uAD00\uB9AC\uC790\uC640 UI \uB3D9\uAE30\uD654 \uC644\uB8CC");
      try {
        const step1 = this.stateManager.getCurrentStep();
        console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: STEP 1 - Reading and Writing Module 1 \uC2DC\uC791");
        this.stateManager.setCurrentSection("READING_WRITING");
        this.stateManager.setCurrentModule(1);
        showToast("Reading and Writing Module 1 \uC218\uC9D1 \uC911...", "info");
        const rwModule1Count = await this.collectModuleWithValidation(allData, "reading", "Module 1", 1);
        if (rwModule1Count < CONFIG.collection.maxProblems) {
          console.warn(`[SAT-DEBUG] Reading and Writing Module 1 \uBB38\uC81C \uC218 \uBD80\uC871: ${rwModule1Count}/${CONFIG.collection.maxProblems}`);
          showToast(`\uACBD\uACE0: Reading Module 1 \uC218\uC9D1 \uBD80\uC871 (${rwModule1Count}/${CONFIG.collection.maxProblems})`, "info");
        }
        console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: STEP 1 \uC644\uB8CC - Reading Module 1:", rwModule1Count, "\uAC1C \uC218\uC9D1");
        console.log("[SAT-DEBUG] Reading Module 1 \uC218\uC9D1 \uC644\uB8CC. \uC81C\uCD9C \uBC84\uD2BC \uD074\uB9AD \uC911...");
        showToast("Reading Module 1 \uC644\uB8CC. \uC81C\uCD9C \uBC84\uD2BC \uD074\uB9AD \uC911...", "info");
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "scraper.js:beforeModule1Submit", message: "before module 1 submit", data: { rwModule1Count, isQuestionScreen: isQuestionScreen(), progressState: getProgressState(), bodyText: (document.body.innerText || "").substring(0, 200) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
        });
        const module1Submitted = await clickSubmitWithConfirmation();
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "scraper.js:afterModule1Submit", message: "after module 1 submit", data: { module1Submitted, isQuestionScreen: isQuestionScreen(), progressState: getProgressState(), bodyText: (document.body.innerText || "").substring(0, 200) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
        });
        if (module1Submitted) {
          console.log("[SAT-DEBUG] Reading Module 1 \uC81C\uCD9C \uC644\uB8CC. \uD654\uBA74 \uC804\uD658 \uB300\uAE30 \uC911...");
          await waitForContentLoad(CONFIG.timeouts.screenTransition);
          console.log("[SAT-DEBUG] Module 2 \uC2DC\uC791 \uD654\uBA74 \uB300\uAE30 \uC911...");
          const module2ScreenReady2 = await waitForCondition(() => {
            const bodyText2 = (document.body.innerText || document.body.textContent || "").toLowerCase();
            const hasModule2Text = bodyText2.includes("\uBAA8\uB4C8 2") || bodyText2.includes("module 2") || bodyText2.includes("reading and writing module 2");
            const hasStartButton = findButtonByText("\uBAA8\uB4C8 2 \uC2DC\uC791", "Module 2", "\uC2DC\uC791", "Start");
            return hasModule2Text || !!hasStartButton;
          }, CONFIG.timeouts.screenTransition * 4);
          if (module2ScreenReady2) {
            console.log("[SAT-DEBUG] Module 2 \uC2DC\uC791 \uD654\uBA74 \uD655\uC778\uB428");
          } else {
            console.warn("[SAT-DEBUG] Module 2 \uC2DC\uC791 \uD654\uBA74\uC774 \uB098\uD0C0\uB098\uC9C0 \uC54A\uC558\uC9C0\uB9CC \uACC4\uC18D \uC9C4\uD589\uD569\uB2C8\uB2E4.");
          }
          await new Promise((resolve) => setTimeout(resolve, 400));
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "scraper.js:afterModule1SubmitWait", message: "after module 1 submit wait", data: { isQuestionScreen: isQuestionScreen(), progressState: getProgressState(), bodyText: (document.body.innerText || "").substring(0, 200), hasModule2Text: (document.body.innerText || "").toLowerCase().includes("\uBAA8\uB4C8 2"), module2ScreenReady: module2ScreenReady2 }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "B" }) }).catch(() => {
          });
        } else {
          console.warn("[SAT-DEBUG] Reading Module 1 \uC81C\uCD9C \uC2E4\uD328 \uB610\uB294 \uC81C\uCD9C \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "scraper.js:module1SubmitFailed", message: "module 1 submit failed", data: { isQuestionScreen: isQuestionScreen(), progressState: getProgressState(), bodyText: (document.body.innerText || "").substring(0, 200) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
          });
          console.log("[SAT-DEBUG] \uC81C\uCD9C \uBC84\uD2BC\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC9C0\uB9CC Module 2 \uC2DC\uC791 \uD654\uBA74 \uD655\uC778 \uC911...");
          await new Promise((resolve) => setTimeout(resolve, 350));
          const bodyTextAfterWait = (document.body.innerText || document.body.textContent || "").toLowerCase();
          const hasModule2AfterWait = bodyTextAfterWait.includes("\uBAA8\uB4C8 2") || bodyTextAfterWait.includes("module 2") || bodyTextAfterWait.includes("reading and writing module 2");
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "scraper.js:module1SubmitFailedCheck", message: "checking module 2 screen after submit failed", data: { hasModule2AfterWait, bodyTextPreview: bodyTextAfterWait.substring(0, 200) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "A" }) }).catch(() => {
          });
          if (hasModule2AfterWait) {
            console.log("[SAT-DEBUG] Module 2 \uC2DC\uC791 \uD654\uBA74\uC774 \uB098\uD0C0\uB0AC\uC2B5\uB2C8\uB2E4. \uC81C\uCD9C\uC774 \uC131\uACF5\uD55C \uAC83\uC73C\uB85C \uAC04\uC8FC\uD558\uACE0 \uACC4\uC18D \uC9C4\uD589\uD569\uB2C8\uB2E4.");
          } else {
            console.warn("[SAT-DEBUG] Module 2 \uC2DC\uC791 \uD654\uBA74\uC774 \uB098\uD0C0\uB098\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uACC4\uC18D \uC9C4\uD589\uC744 \uC2DC\uB3C4\uD569\uB2C8\uB2E4.");
          }
        }
        const step2 = this.stateManager.getCurrentStep();
        console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: STEP 2 - Reading and Writing Module 2 \uC2DC\uC791");
        this.stateManager.guardSectionTransition("READING_WRITING");
        this.stateManager.setCurrentModule(2);
        showToast("Reading and Writing Module 2 \uC2DC\uC791 \uC911...", "info");
        console.log("[SAT-DEBUG] \uBAA8\uB4C8 2 \uC2DC\uC791 \uD654\uBA74 \uB300\uAE30 \uC911...");
        const module2ScreenReady = await waitForCondition(() => {
          const bodyText2 = (document.body.innerText || document.body.textContent || "").toLowerCase();
          const hasModule2Text = bodyText2.includes("\uBAA8\uB4C8 2") || bodyText2.includes("module 2");
          const hasStartButton = findButtonByText("\uBAA8\uB4C8 2 \uC2DC\uC791", "Module 2", "\uC2DC\uC791", "Start");
          const isReady = hasModule2Text || !!hasStartButton;
          if (isReady) {
            console.log("[SAT-DEBUG] \uBAA8\uB4C8 2 \uC2DC\uC791 \uD654\uBA74 \uD655\uC778\uB428");
          }
          return isReady;
        }, CONFIG.timeouts.screenTransition * 6);
        if (!module2ScreenReady) {
          console.warn("[SAT-DEBUG] \uBAA8\uB4C8 2 \uC2DC\uC791 \uD654\uBA74\uC774 \uB098\uD0C0\uB098\uC9C0 \uC54A\uC558\uC9C0\uB9CC \uACC4\uC18D \uC9C4\uD589\uD569\uB2C8\uB2E4.");
        }
        await new Promise((resolve) => setTimeout(resolve, 300));
        console.log("[SAT-DEBUG] \uBAA8\uB4C8 2 \uC2DC\uC791 \uBC84\uD2BC \uD074\uB9AD \uC2DC\uB3C4...");
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "scraper.js:beforeStartModule2", message: "before start module 2", data: { module2ScreenReady, isQuestionScreen: isQuestionScreen(), progressState: getProgressState(), bodyText: (document.body.innerText || "").substring(0, 200) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
        });
        const module2Started = await startNextModule();
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "scraper.js:afterStartModule2", message: "after start module 2", data: { module2Started, isQuestionScreen: isQuestionScreen(), progressState: getProgressState(), bodyText: (document.body.innerText || "").substring(0, 200) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
        });
        if (!module2Started) {
          console.warn("[SAT-DEBUG] Reading and Writing Module 2 \uC2DC\uC791 \uC2E4\uD328");
          console.warn("[SAT-DEBUG] (\uC790\uB3D9 \uC9C4\uD589) Module 2 \uC2DC\uC791 \uC2E4\uD328 \uC0C1\uD0DC\uC9C0\uB9CC \uACC4\uC18D \uC9C4\uD589\uC744 \uC2DC\uB3C4\uD569\uB2C8\uB2E4.");
          showToast("\uACBD\uACE0: Reading Module 2 \uC2DC\uC791 \uC2E4\uD328(\uC790\uB3D9 \uC9C4\uD589)", "info");
        }
        if (isModuleStartScreen()) {
          console.log("[SAT-DEBUG] Module Start Screen\uC774 \uB0A8\uC544\uC788\uC74C. startModule2 \uC7AC\uC2DC\uB3C4");
          await startModule2();
        }
        const q1Ready = await waitForCondition(() => {
          const progress = getProgressState();
          const isQ1 = progress && /^1\s*\/\s*27/i.test(progress);
          return isQ1 && isQuestionScreen();
        }, CONFIG.timeouts.screenTransition * 4);
        if (!q1Ready) {
          const progress = getProgressState();
          console.error("[SATScraper] ABORT: Module 2 \uC218\uC9D1 \uC804 Q1 \uD654\uBA74 \uD655\uC778 \uC2E4\uD328. progress:", progress, "isQuestionScreen:", isQuestionScreen());
          showToast("\uACBD\uACE0: Module 2 Q1 \uD654\uBA74 \uD655\uC778 \uC2E4\uD328", "info");
        }
        await waitForCondition(() => {
          return isQuestionScreen() || getProgressState() !== null;
        }, CONFIG.timeouts.screenTransition * 4);
        const finalProgress = getProgressState();
        const isQ1Final = finalProgress && /^1\s*\/\s*27/i.test(finalProgress);
        if (!isQ1Final && !isQuestionScreen()) {
          console.error("[SATScraper] ABORT: progress=1/27 \uC5C6\uC774 Module 2 \uC218\uC9D1\uC744 \uC2DC\uC791\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. current progress:", finalProgress);
          showToast("\uACBD\uACE0: Module 2 Q1 \uD655\uC778 \uD544\uC694 (\uC218\uB3D9\uC73C\uB85C \uBAA8\uB4C8 2 \uC2DC\uC791 \uD6C4 \uC7AC\uC2DC\uB3C4)", "info");
        }
        showToast("Reading and Writing Module 2 \uC218\uC9D1 \uC911...", "info");
        const rwModule2Count = await this.collectModuleWithValidation(allData, "reading", "Module 2", 2);
        if (rwModule2Count < CONFIG.collection.maxProblems) {
          console.warn(`[SAT-DEBUG] Reading and Writing Module 2 \uBB38\uC81C \uC218 \uBD80\uC871: ${rwModule2Count}/${CONFIG.collection.maxProblems}`);
          console.warn("[SAT-DEBUG] (\uC790\uB3D9 \uC9C4\uD589) Module 2 \uC218\uC9D1\uC774 \uB35C \uB418\uC5C8\uC9C0\uB9CC \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC9C4\uD589\uD569\uB2C8\uB2E4.");
          showToast(`\uACBD\uACE0: Reading Module 2 \uC218\uC9D1 \uBD80\uC871 (${rwModule2Count}/${CONFIG.collection.maxProblems})`, "info");
        }
        const totalReadingCount = allData.reading.length;
        if (totalReadingCount < CONFIG.collection.maxProblems * 2) {
          console.warn(`[SAT-DEBUG] Reading \uC139\uC158 \uC804\uCCB4 \uBB38\uC81C \uC218 \uBD80\uC871: ${totalReadingCount}/${CONFIG.collection.maxProblems * 2}`);
          console.warn("[SAT-DEBUG] (\uC790\uB3D9 \uC9C4\uD589) Reading \uC804\uCCB4 \uC218\uC9D1\uC774 \uB35C \uB418\uC5C8\uC9C0\uB9CC Math \uC139\uC158 \uC9C4\uD589\uC744 \uC2DC\uB3C4\uD569\uB2C8\uB2E4.");
          showToast(`\uACBD\uACE0: Reading \uC804\uCCB4 \uC218\uC9D1 \uBD80\uC871 (${totalReadingCount}/${CONFIG.collection.maxProblems * 2})`, "info");
        }
        console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: STEP 2 \uC644\uB8CC - Reading Module 2:", rwModule2Count, "\uAC1C \uC218\uC9D1 (\uC804\uCCB4:", totalReadingCount, "\uAC1C)");
        console.log("[SAT-DEBUG] Reading Module 2 \uC218\uC9D1 \uC644\uB8CC. \uC81C\uCD9C \uBC84\uD2BC \uD074\uB9AD \uC911...");
        showToast("Reading Module 2 \uC644\uB8CC. \uC81C\uCD9C \uBC84\uD2BC \uD074\uB9AD \uC911...", "info");
        const module2Submitted = await clickSubmitWithConfirmation();
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "scraper.js:afterModule2Submit", message: "after module 2 submit", data: { module2Submitted, totalReadingCount: allData.reading.length, bodyText: (document.body.innerText || "").substring(0, 300) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "M2" }) }).catch(() => {
        });
        if (module2Submitted) {
          console.log("[SAT-DEBUG] Reading Module 2 \uC81C\uCD9C \uC644\uB8CC. Math \uC139\uC158\uC73C\uB85C \uC9C4\uD589\uD569\uB2C8\uB2E4.");
          await waitForContentLoad(CONFIG.timeouts.screenTransition);
        } else {
          console.warn("[SAT-DEBUG] Reading Module 2 \uC81C\uCD9C \uC2E4\uD328 \uB610\uB294 \uC81C\uCD9C \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. Math \uC139\uC158 \uC9C4\uD589\uC744 \uC2DC\uB3C4\uD569\uB2C8\uB2E4.");
        }
        console.log("[SAT-DEBUG] Reading Module 2 \uC81C\uCD9C \uC644\uB8CC. Math \uC139\uC158\uC73C\uB85C \uC9C4\uD589\uD569\uB2C8\uB2E4.");
        console.log(`[SAT-DEBUG] \uC218\uC9D1\uB41C \uBB38\uC81C: Reading Module 1 - ${rwModule1Count}\uAC1C, Reading Module 2 - ${rwModule2Count}\uAC1C (\uC804\uCCB4: ${totalReadingCount}\uAC1C)`);
        console.log(`[SAT-DEBUG] \uD604\uC7AC\uAE4C\uC9C0 \uC218\uC9D1 \uB370\uC774\uD130: Reading ${allData.reading.length}\uAC1C, Math ${allData.math.length}\uAC1C`);
        this.stateManager.completeCurrentStep();
        this.stateManager.completeCurrentStep();
        const step3 = this.stateManager.getCurrentStep();
        console.log("[SAT-DEBUG] \uD604\uC7AC \uB2E8\uACC4: STEP 3 - Math Module 1 \uC2DC\uC791 (Reading \uC139\uC158 \uC644\uB8CC \uD655\uC778\uB428)");
        const detectedSection = this.stateManager.detectSectionFromScreen();
        if (detectedSection === "READING_WRITING") {
          console.warn("[SATScraper] Reading and Writing \uC139\uC158\uC774 \uC544\uC9C1 \uC644\uB8CC\uB418\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.");
          console.warn("[SATScraper] (\uC790\uB3D9 \uC9C4\uD589) \uACC4\uC18D \uC9C4\uD589\uC744 \uC2DC\uB3C4\uD569\uB2C8\uB2E4.");
          showToast("\uACBD\uACE0: Reading and Writing \uBBF8\uC644\uB8CC(\uC790\uB3D9 \uC9C4\uD589)", "info");
        }
        console.log("[SATScraper] \uC218\uD559 \uC139\uC158 \uC9C4\uC785 \uC804 \uAC80\uC99D \uC2DC\uC791...");
        if (allData.reading.length < CONFIG.collection.maxProblems * 2) {
          const rwIncompleteMsg = `Reading and Writing \uC139\uC158 \uBBF8\uC644\uB8CC: ${allData.reading.length}/${CONFIG.collection.maxProblems * 2} \uBB38\uC81C\uB9CC \uC218\uC9D1\uB428`;
          console.warn(`[SATScraper] ${rwIncompleteMsg}`);
          showToast(`\uACBD\uACE0: ${rwIncompleteMsg} (\uC218\uD559 \uC139\uC158 \uC9C4\uC785\uC740 \uACC4\uC18D \uC2DC\uB3C4)`, "info");
        }
        const bodyText = (document.body.innerText || document.body.textContent || "").toLowerCase();
        const hasMathText = bodyText.includes("math") || bodyText.includes("\uC218\uD559") || bodyText.includes("mathematics") || bodyText.includes("\uC218\uD559 \uC139\uC158");
        let mathStartButton = findButtonByText("\uC2DC\uC791", "Start", "\uACC4\uC18D", "Continue", "Math", "\uC218\uD559");
        let mathSectionButton = findButtonByText("Math", "\uC218\uD559", "Mathematics");
        let hasMathButton = !!(mathStartButton || mathSectionButton);
        const allButtons = document.querySelectorAll('button, [role="button"]');
        let hasMathStartText = false;
        for (const btn of allButtons) {
          const btnText = (btn.innerText || btn.textContent || "").toLowerCase();
          if (btnText.includes("math") || btnText.includes("\uC218\uD559") || btnText.includes("start math") || btnText.includes("\uC218\uD559 \uC2DC\uC791")) {
            hasMathStartText = true;
            console.log("[SATScraper] \uC218\uD559 \uC2DC\uC791 \uBC84\uD2BC \uBC1C\uACAC:", btnText);
            break;
          }
        }
        if (!hasMathText && !hasMathButton && !hasMathStartText) {
          const errorMsg = `\uC218\uD559 \uC139\uC158 \uC9C4\uC785 \uC870\uAC74 \uBBF8\uCDA9\uC871: \uD654\uBA74\uC5D0 \uC218\uD559 \uAD00\uB828 \uD14D\uC2A4\uD2B8\uB098 \uBC84\uD2BC\uC774 \uC5C6\uC2B5\uB2C8\uB2E4. Reading and Writing \uC139\uC158\uC774 \uC644\uC804\uD788 \uC644\uB8CC\uB418\uC5C8\uB294\uC9C0 \uD655\uC778\uD574\uC8FC\uC138\uC694.`;
          console.warn(`[SATScraper] ${errorMsg}`);
          console.warn("[SATScraper] (\uC790\uB3D9 \uC9C4\uD589) \uACBD\uACE0 \uBC1C\uC0DD\uC774\uC9C0\uB9CC \uACC4\uC18D \uC9C4\uD589\uC744 \uC2DC\uB3C4\uD569\uB2C8\uB2E4.");
          showToast(`\uACBD\uACE0: ${errorMsg}`, "info");
        }
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "scraper.js:beforeMathSection", message: "before math section entry", data: { hasMathText, hasMathButton, hasMathStartText, readingProblems: allData.reading.length, bodyText: (document.body.innerText || "").substring(0, 300) }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "MATH" }) }).catch(() => {
        });
        console.log("[SATScraper] \uC218\uD559 \uC139\uC158 \uC9C4\uC785 \uC870\uAC74 \uCDA9\uC871 \uD655\uC778(\uCD08\uAE30 \uD0D0\uC0C9 \uAE30\uC900):", {
          hasMathText,
          hasMathButton,
          hasMathStartText,
          readingProblems: allData.reading.length
        });
        this.stateManager.setCurrentSection("MATH");
        this.stateManager.setCurrentModule(1);
        showToast("Math \uC139\uC158 \uC2DC\uC791 \uC911...", "info");
        if (mathStartButton) {
          console.log("[SATScraper] Math \uC2DC\uC791 \uBC84\uD2BC \uD074\uB9AD");
          await safeClick(mathStartButton);
          await waitForContentLoad(CONFIG.timeouts.screenTransition);
        } else if (mathSectionButton) {
          console.log("[SATScraper] Math \uC139\uC158 \uBC84\uD2BC \uD074\uB9AD");
          await safeClick(mathSectionButton);
          await waitForContentLoad(CONFIG.timeouts.screenTransition);
        } else {
          let explicitMathButton = null;
          const sectionCards = document.querySelectorAll('glowing-card.section-card, .section-card, section-overview [class*="section-card"]');
          for (const card of sectionCards) {
            const cardText = (card.innerText || card.textContent || "").toLowerCase();
            if (cardText.includes("math") || cardText.includes("\uC218\uD559")) {
              const btn = card.querySelector("div.section-button-container button, .section-button-container button, button");
              if (btn) {
                explicitMathButton = btn;
                break;
              }
            }
          }
          if (!explicitMathButton) {
            const allSectionButtons = document.querySelectorAll("section-overview glowing-card.section-card button, .section-overview .section-card button");
            for (const btn of allSectionButtons) {
              const card = btn.closest("glowing-card, .section-card");
              if (card && ((card.innerText || "").toLowerCase().includes("math") || (card.innerText || "").toLowerCase().includes("\uC218\uD559"))) {
                explicitMathButton = btn;
                break;
              }
            }
          }
          fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "scraper.js:mathButtonSearch", message: "math button search", data: { explicitMathButtonFound: !!explicitMathButton, sectionCardCount: sectionCards.length, glowingCardCount: document.querySelectorAll("glowing-card.section-card").length }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "MATH" }) }).catch(() => {
          });
          if (explicitMathButton) {
            console.log("[SATScraper] CSS \uC140\uB809\uD130 \uAE30\uBC18 Math \uC2DC\uC791 \uBC84\uD2BC \uBC1C\uACAC. \uD074\uB9AD \uC2DC\uB3C4...", explicitMathButton);
            await safeClick(explicitMathButton);
            await waitForContentLoad(CONFIG.timeouts.screenTransition);
          } else {
            const mathStarted = await clickSectionContinue("Math");
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "scraper.js:afterClickSectionContinue", message: "after clickSectionContinue Math", data: { mathStarted }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "MATH" }) }).catch(() => {
            });
            if (!mathStarted) {
              console.warn("[SATScraper] Math \uC139\uC158 \uC2DC\uC791 \uC2E4\uD328: \uC2DC\uC791 \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4");
              console.warn("[SATScraper] (\uC790\uB3D9 \uC9C4\uD589) Math \uC139\uC158 \uC2DC\uC791 \uC2E4\uD328\uC9C0\uB9CC \uACC4\uC18D \uC9C4\uD589\uC744 \uC2DC\uB3C4\uD569\uB2C8\uB2E4.");
              showToast("\uACBD\uACE0: Math \uC139\uC158 \uC2DC\uC791 \uC2E4\uD328(\uC790\uB3D9 \uC9C4\uD589)", "info");
            }
          }
        }
        await configureAndStartTest();
        await waitForCondition(() => {
          return isQuestionScreen() || getProgressState() !== null;
        }, CONFIG.timeouts.screenTransition * 6);
        const mathExpected = CONFIG.collection.mathMaxProblems ?? 22;
        showToast("Math Module 1 \uC218\uC9D1 \uC911...", "info");
        const mathModule1Count = await this.collectModuleWithValidation(allData, "math", "Module 1", 1);
        if (mathModule1Count < mathExpected) {
          console.warn(`[SATScraper] Math Module 1 \uBB38\uC81C \uC218 \uBD80\uC871: ${mathModule1Count}/${mathExpected}`);
          console.warn("[SATScraper] (\uC790\uB3D9 \uC9C4\uD589) Math Module 1 \uC218\uC9D1 \uBD80\uC871\uC774\uC9C0\uB9CC \uB2E4\uC74C \uB2E8\uACC4\uB85C \uC9C4\uD589\uD569\uB2C8\uB2E4.");
          showToast(`\uACBD\uACE0: Math Module 1 \uC218\uC9D1 \uBD80\uC871 (${mathModule1Count}/${mathExpected})`, "info");
        }
        console.log("[SATScraper] Math Module 1 \uC218\uC9D1 \uC644\uB8CC. \uC81C\uCD9C \uBC84\uD2BC \uD074\uB9AD \uC911...");
        showToast("Math Module 1 \uC644\uB8CC. \uC81C\uCD9C \uBC84\uD2BC \uD074\uB9AD \uC911...", "info");
        const mathModule1Submitted = await clickSubmitWithConfirmation();
        if (mathModule1Submitted) {
          console.log("[SATScraper] Math Module 1 \uC81C\uCD9C \uC644\uB8CC.");
        } else {
          console.warn("[SATScraper] Math Module 1 \uC81C\uCD9C \uC2E4\uD328 \uB610\uB294 \uC81C\uCD9C \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        }
        await this.waitForModuleTransition("math", 1);
        this.stateManager.completeCurrentStep();
        const step4 = this.stateManager.getCurrentStep();
        console.log(`[SATScraper] STEP 4: ${step4.section} Module ${step4.module} \uC2DC\uC791`);
        this.stateManager.setCurrentModule(2);
        showToast("Math Module 2 \uC2DC\uC791 \uC911...", "info");
        await new Promise((resolve) => setTimeout(resolve, CONFIG.timeouts.screenTransition));
        const mathModule2Started = await startNextModule();
        if (!mathModule2Started) {
          console.warn("[SATScraper] Math Module 2 \uC2DC\uC791 \uC2E4\uD328");
          console.warn("[SATScraper] (\uC790\uB3D9 \uC9C4\uD589) Math Module 2 \uC2DC\uC791 \uC2E4\uD328 \uC0C1\uD0DC\uC9C0\uB9CC \uACC4\uC18D \uC9C4\uD589\uC744 \uC2DC\uB3C4\uD569\uB2C8\uB2E4.");
          showToast("\uACBD\uACE0: Math Module 2 \uC2DC\uC791 \uC2E4\uD328(\uC790\uB3D9 \uC9C4\uD589)", "info");
        }
        await waitForCondition(() => {
          return isQuestionScreen() || getProgressState() !== null;
        }, CONFIG.timeouts.screenTransition * 6);
        showToast("Math Module 2 \uC218\uC9D1 \uC911...", "info");
        const mathModule2Count = await this.collectModuleWithValidation(allData, "math", "Module 2", 2);
        if (mathModule2Count < mathExpected) {
          console.warn(`[SATScraper] Math Module 2 \uBB38\uC81C \uC218 \uBD80\uC871: ${mathModule2Count}/${mathExpected}`);
          console.warn("[SATScraper] (\uC790\uB3D9 \uC9C4\uD589) Math Module 2 \uC218\uC9D1 \uBD80\uC871\uC774\uC9C0\uB9CC \uB9C8\uBB34\uB9AC \uC9C4\uD589\uD569\uB2C8\uB2E4.");
          showToast(`\uACBD\uACE0: Math Module 2 \uC218\uC9D1 \uBD80\uC871 (${mathModule2Count}/${mathExpected})`, "info");
        }
        this.stateManager.completeCurrentStep();
        console.log(`[SATScraper] ===== \uC804\uCCB4 \uC218\uC9D1 \uC644\uB8CC =====`);
        console.log(`[SATScraper] Reading: ${allData.reading.length}\uAC1C, Math: ${allData.math.length}\uAC1C`);
        return allData;
      } catch (error) {
        console.error("[SATScraper] \uC804\uCCB4 \uC218\uC9D1 \uC911 \uC624\uB958:", error);
        console.error(`[SATScraper] \uD604\uC7AC \uC0C1\uD0DC: ${this.stateManager.currentSection} Module ${this.stateManager.currentModule}`);
        throw error;
      }
    }
    /**
     * 모듈 문제 수집 (검증 포함)
     * @param {Object} allData - 전체 데이터 객체
     * @param {string} sectionType - 'reading' | 'math'
     * @param {string} moduleName - 'Module 1' | 'Module 2'
     * @param {number} moduleNumber - 1 | 2
     * @returns {Promise<number>} 수집된 문제 수
     */
    async collectModuleWithValidation(allData, sectionType, moduleName, moduleNumber) {
      console.log(`[SATScraper] ${moduleName} \uC218\uC9D1 \uC2DC\uC791 (\uAC80\uC99D \uD3EC\uD568)`);
      await collectModuleProblems(allData, sectionType, moduleName);
      const collectedProblems = sectionType === "reading" ? allData.reading : allData.math;
      const moduleProblems = collectedProblems.filter((p) => p.module === moduleNumber);
      const count = moduleProblems.length;
      console.log(`[SATScraper] ${moduleName} \uC218\uC9D1 \uC644\uB8CC: ${count}\uAC1C`);
      if (TEMP_MODE) {
        console.log(`[TEMP] TEMP \uBAA8\uB4DC: \uC644\uB8CC \uAC80\uC99D \uC2A4\uD0B5`);
        return count;
      }
      const progressState = getProgressState();
      const isComplete = this.isModuleComplete(sectionType, moduleNumber, count, progressState);
      const expectedForSection = sectionType === "math" ? CONFIG.collection.mathMaxProblems ?? 22 : CONFIG.collection.maxProblems;
      if (!isComplete && count < expectedForSection) {
        console.warn(`[SATScraper] ${moduleName} \uC644\uB8CC \uC870\uAC74 \uBBF8\uCDA9\uC871: ${count}/${expectedForSection}`);
      }
      return count;
    }
  };

  // src/pdf/pdfGenerator.js
  function getJSPDF() {
    try {
      if (window.jspdf && window.jspdf.jsPDF) {
        console.log("[SAT PDF Exporter] window.jspdf.jsPDF \uC0AC\uC6A9");
        return window.jspdf.jsPDF;
      }
      if (window.jsPDF) {
        console.log("[SAT PDF Exporter] window.jsPDF \uC0AC\uC6A9");
        return window.jsPDF;
      }
      if (typeof jspdf !== "undefined" && jspdf.jsPDF) {
        console.log("[SAT PDF Exporter] jspdf.jsPDF \uC0AC\uC6A9");
        return jspdf.jsPDF;
      }
      console.error("[SAT PDF Exporter] jsPDF\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. manifest.json\uC5D0\uC11C jspdf.umd.min.js\uAC00 \uBA3C\uC800 \uB85C\uB4DC\uB418\uC5C8\uB294\uC9C0 \uD655\uC778\uD558\uC138\uC694.");
      throw new Error("jsPDF not found. Check if jspdf.umd.min.js is loaded in manifest.json");
    } catch (error) {
      if (error.message && error.message.includes("Extension context invalidated")) {
        console.error("[SAT PDF Exporter] Extension context invalidated - jsPDF \uC811\uADFC \uC2E4\uD328");
        showToast("\uD655\uC7A5 \uD504\uB85C\uADF8\uB7A8\uC774 \uC7AC\uB85C\uB4DC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uACE0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.", "error");
        throw error;
      }
      throw error;
    }
  }
  function addProblemsSectionToPDF(doc, sectionName, problems, startY, maxWidth, margin, pageHeight, lineHeight, sectionSpacing) {
    let yPosition = startY;
    doc.setFontSize(14);
    doc.setFont(void 0, "bold");
    doc.setTextColor(0, 0, 0);
    if (yPosition + lineHeight * 3 > pageHeight - 20) {
      doc.addPage();
      yPosition = margin;
    }
    doc.text(`${sectionName} Section`, margin, yPosition);
    yPosition += lineHeight * 1.5;
    problems.forEach((problem, index) => {
      const debugLabel = problem.problemNumber || problem.number || index + 1;
      console.log(`[DEBUG STEP 4] PDFGenerator \uBB38\uC81C \uB8E8\uD504 \uC2DC\uC791: \uBB38\uC81C ${debugLabel}, problem.figures=${problem.figures ? problem.figures.length : "undefined"}`);
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "pdfGenerator.js:addProblemsSectionToPDF:loopStart", message: "DEBUG STEP 4: PDFGenerator \uBB38\uC81C \uB8E8\uD504 \uC2DC\uC791", data: { problemLabel: debugLabel, index, hasFigures: !!problem.figures, figuresLength: problem.figures ? problem.figures.length : 0, figures: problem.figures ? problem.figures.map((f) => ({ w: f.width, h: f.height, hasDataUrl: !!f.dataUrl })) : null }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
      });
      if (yPosition + lineHeight * 10 > pageHeight - 20) {
        doc.addPage();
        yPosition = margin;
      }
      doc.setFontSize(12);
      doc.setFont(void 0, "bold");
      let problemLabel;
      if (problem.problemNumber && problem.problemNumber > 0) {
        problemLabel = problem.problemNumber;
        console.log(`[PDF] \uBB38\uC81C \uBC88\uD638 \uC0AC\uC6A9: ${problemLabel} (problem.problemNumber)`);
      } else if (problem.number && problem.number > 0) {
        problemLabel = problem.number;
        console.log(`[PDF] \uBB38\uC81C \uBC88\uD638 \uC0AC\uC6A9: ${problemLabel} (problem.number)`);
      } else {
        problemLabel = index + 1;
        console.warn(`[PDF] \uBB38\uC81C \uBC88\uD638\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC5B4 index \uC0AC\uC6A9: ${problemLabel} (index: ${index})`);
      }
      doc.text(`Problem ${problemLabel}`, margin, yPosition);
      yPosition += lineHeight;
      doc.setFontSize(10);
      doc.setFont(void 0, "normal");
      if (problem.passage) {
        const passageLines = doc.splitTextToSize(problem.passage, maxWidth);
        passageLines.forEach((line) => {
          if (yPosition + lineHeight > pageHeight - 20) {
            doc.addPage();
            yPosition = margin;
          }
          doc.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
        yPosition += lineHeight * 0.5;
      }
      let questionText = problem.question || problem.stem || "[QUESTION_NOT_EXTRACTED]";
      if (questionText && questionText.trim().length > 0) {
        const questionLines = doc.splitTextToSize(questionText, maxWidth);
        questionLines.forEach((line) => {
          if (yPosition + lineHeight > pageHeight - 20) {
            doc.addPage();
            yPosition = margin;
          }
          doc.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
        yPosition += lineHeight * 0.5;
      } else {
        doc.setFontSize(10);
        doc.setFont(void 0, "italic");
        doc.setTextColor(128, 128, 128);
        doc.text("[QUESTION_NOT_EXTRACTED]", margin, yPosition);
        yPosition += lineHeight;
        doc.setTextColor(0, 0, 0);
        yPosition += lineHeight * 0.5;
      }
      console.log(`[DEBUG STEP 4] figures \uBE14\uB85D \uCCB4\uD06C: \uBB38\uC81C ${problemLabel}, figures \uC874\uC7AC=${!!problem.figures}, \uBC30\uC5F4=${Array.isArray(problem.figures)}, \uAE38\uC774=${problem.figures ? problem.figures.length : 0}`);
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "pdfGenerator.js:addProblemsSectionToPDF:figuresCheck", message: "DEBUG STEP 4: figures \uBE14\uB85D \uCCB4\uD06C", data: { problemLabel, hasFigures: !!problem.figures, isArray: Array.isArray(problem.figures), figuresLength: problem.figures ? problem.figures.length : 0 }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
      });
      if (problem.figures && Array.isArray(problem.figures) && problem.figures.length > 0) {
        console.log(`[DEBUG STEP 4] figures \uBE14\uB85D \uC9C4\uC785: \uBB38\uC81C ${problemLabel}, ${problem.figures.length}\uAC1C figure`);
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "pdfGenerator.js:addProblemsSectionToPDF:figuresBlockEnter", message: "DEBUG STEP 4: figures \uBE14\uB85D \uC9C4\uC785", data: { problemLabel, figuresLength: problem.figures.length }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "D" }) }).catch(() => {
        });
        console.log(`[PDF] \uBB38\uC81C ${problem.problemNumber || problem.number || index + 1}\uC5D0 ${problem.figures.length}\uAC1C figure \uC0BD\uC785 \uC2DC\uC791`);
        for (let figIdx = 0; figIdx < problem.figures.length; figIdx++) {
          const figure = problem.figures[figIdx];
          try {
            console.log(`[DEBUG STEP 5] addImage \uD638\uCD9C \uC9C1\uC804: \uBB38\uC81C ${problemLabel}, figure ${figIdx + 1}/${problem.figures.length}`);
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "pdfGenerator.js:addProblemsSectionToPDF:beforeAddImage", message: "DEBUG STEP 5: addImage \uD638\uCD9C \uC9C1\uC804", data: { problemLabel, figIdx: figIdx + 1, totalFigures: problem.figures.length, figureWidth: figure.width, figureHeight: figure.height, hasDataUrl: !!figure.dataUrl, dataUrlLength: figure.dataUrl ? figure.dataUrl.length : 0 }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
            });
            const maxImageWidth = maxWidth;
            const imgWidth = figure.width || 100;
            const imgHeight = figure.height || 100;
            let displayWidth = Math.min(maxImageWidth, imgWidth);
            const aspectRatio = imgHeight / imgWidth;
            let displayHeight = displayWidth * aspectRatio;
            if (displayHeight > pageHeight - yPosition - 30) {
              displayHeight = pageHeight - yPosition - 30;
              displayWidth = displayHeight / aspectRatio;
            }
            if (yPosition + displayHeight > pageHeight - 20) {
              doc.addPage();
              yPosition = margin;
              if (displayHeight > pageHeight - yPosition - 30) {
                displayHeight = pageHeight - yPosition - 30;
                displayWidth = displayHeight / aspectRatio;
              }
            }
            console.log(`[PDF] figure ${figIdx + 1} \uC0BD\uC785: x=${margin}, y=${yPosition.toFixed(1)}, w=${displayWidth.toFixed(1)}, h=${displayHeight.toFixed(1)}`);
            console.log(`[DEBUG STEP 5] addImage \uD638\uCD9C: x=${margin}, y=${yPosition.toFixed(1)}, w=${displayWidth.toFixed(1)}, h=${displayHeight.toFixed(1)}`);
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "pdfGenerator.js:addProblemsSectionToPDF:addImageCall", message: "DEBUG STEP 5: addImage \uD638\uCD9C", data: { problemLabel, figIdx: figIdx + 1, x: margin, y: yPosition, w: displayWidth, h: displayHeight, dataUrlLength: figure.dataUrl ? figure.dataUrl.length : 0 }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
            });
            doc.addImage(figure.dataUrl, "PNG", margin, yPosition, displayWidth, displayHeight);
            console.log(`[DEBUG STEP 5] addImage \uD638\uCD9C \uC644\uB8CC: \uBB38\uC81C ${problemLabel}, figure ${figIdx + 1}`);
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "pdfGenerator.js:addProblemsSectionToPDF:addImageComplete", message: "DEBUG STEP 5: addImage \uD638\uCD9C \uC644\uB8CC", data: { problemLabel, figIdx: figIdx + 1 }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
            });
            yPosition += displayHeight + lineHeight * 0.5;
          } catch (error) {
            console.warn(`[PDF] figure ${figIdx + 1} \uC0BD\uC785 \uC2E4\uD328 (\uACC4\uC18D \uC9C4\uD589):`, error);
            console.error(`[DEBUG STEP 5] addImage \uC624\uB958: \uBB38\uC81C ${problemLabel}, figure ${figIdx + 1}`, error);
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "pdfGenerator.js:addProblemsSectionToPDF:addImageError", message: "DEBUG STEP 5: addImage \uC624\uB958", data: { problemLabel, figIdx: figIdx + 1, errorMessage: error.message, errorStack: error.stack }, timestamp: Date.now(), sessionId: "debug-session", runId: "run1", hypothesisId: "E" }) }).catch(() => {
            });
          }
        }
        console.log(`[PDF] \uBB38\uC81C ${problem.problemNumber || problem.number || index + 1} figure \uC0BD\uC785 \uC644\uB8CC`);
      }
      if (problem.choices) {
        if (Array.isArray(problem.choices) && problem.choices.length > 0) {
          problem.choices.forEach((choice) => {
            if (yPosition + lineHeight > pageHeight - 20) {
              doc.addPage();
              yPosition = margin;
            }
            const choiceText = `${choice.label}. ${choice.text}`;
            const choiceLines = doc.splitTextToSize(choiceText, maxWidth - 10);
            choiceLines.forEach((line) => {
              if (yPosition + lineHeight > pageHeight - 20) {
                doc.addPage();
                yPosition = margin;
              }
              doc.text(line, margin + 5, yPosition);
              yPosition += lineHeight;
            });
          });
        } else if (typeof problem.choices === "object" && !Array.isArray(problem.choices)) {
          const choiceLabels = ["A", "B", "C", "D"];
          for (const label of choiceLabels) {
            if (problem.choices[label]) {
              if (yPosition + lineHeight > pageHeight - 20) {
                doc.addPage();
                yPosition = margin;
              }
              const choiceText = `${label}. ${problem.choices[label]}`;
              const choiceLines = doc.splitTextToSize(choiceText, maxWidth - 10);
              choiceLines.forEach((line) => {
                if (yPosition + lineHeight > pageHeight - 20) {
                  doc.addPage();
                  yPosition = margin;
                }
                doc.text(line, margin + 5, yPosition);
                yPosition += lineHeight;
              });
            }
          }
        }
      } else if (problem.isGridIn) {
        if (yPosition + lineHeight > pageHeight - 20) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text("Grid-in Problem", margin + 5, yPosition);
        yPosition += lineHeight;
        if (problem.gridInAnswer) {
          doc.text(`Answer: ${problem.gridInAnswer}`, margin + 5, yPosition);
          yPosition += lineHeight;
        }
      }
      yPosition += sectionSpacing;
    });
    return yPosition;
  }
  function addAnswersSectionToPDF(doc, sectionName, problems, startY, maxWidth, margin, pageHeight, lineHeight, sectionSpacing) {
    let yPosition = startY;
    doc.setFontSize(14);
    doc.setFont(void 0, "bold");
    doc.setTextColor(0, 0, 0);
    if (yPosition + lineHeight * 3 > pageHeight - 20) {
      doc.addPage();
      yPosition = margin;
    }
    doc.text(`${sectionName} Section - Answers`, margin, yPosition);
    yPosition += lineHeight * 1.5;
    problems.forEach((problem) => {
      try {
        const problemIndex2 = problems.indexOf(problem);
        const problemLabelForLog = problem && typeof problem.problemNumber === "number" && problem.problemNumber > 0 ? problem.problemNumber : problem && typeof problem.number === "number" && problem.number > 0 ? problem.number : problemIndex2 + 1;
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: "pdfGenerator.js:addAnswersSectionToPDF:problemEntry",
            message: "Answers PDF problem entry",
            data: {
              sectionName,
              problemIndex: problemIndex2,
              problemLabel: problemLabelForLog,
              hasCorrectAnswer: !!(problem && problem.correctAnswer),
              correctAnswer: problem && problem.correctAnswer ? String(problem.correctAnswer) : null,
              hasAnswerField: !!(problem && problem.answer),
              answerField: problem && problem.answer ? String(problem.answer) : null
            },
            timestamp: Date.now(),
            runId: "answers-bug",
            hypothesisId: "H1"
          })
        }).catch(() => {
        });
      } catch {
      }
      if (yPosition + lineHeight * 5 > pageHeight - 20) {
        doc.addPage();
        yPosition = margin;
      }
      doc.setFontSize(12);
      doc.setFont(void 0, "bold");
      const problemIndex = problems.indexOf(problem);
      let problemLabel;
      if (problem.problemNumber && problem.problemNumber > 0) {
        problemLabel = problem.problemNumber;
        console.log(`[PDF] \uC815\uB2F5\uC9C0 \uBB38\uC81C \uBC88\uD638 \uC0AC\uC6A9: ${problemLabel} (problem.problemNumber)`);
      } else if (problem.number && problem.number > 0) {
        problemLabel = problem.number;
        console.log(`[PDF] \uC815\uB2F5\uC9C0 \uBB38\uC81C \uBC88\uD638 \uC0AC\uC6A9: ${problemLabel} (problem.number)`);
      } else {
        problemLabel = problemIndex + 1;
        console.warn(`[PDF] \uC815\uB2F5\uC9C0 \uBB38\uC81C \uBC88\uD638\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC5B4 index \uC0AC\uC6A9: ${problemLabel} (index: ${problemIndex})`);
      }
      doc.text(`Problem ${problemLabel}`, margin, yPosition);
      yPosition += lineHeight;
      doc.setFontSize(10);
      doc.setFont(void 0, "normal");
      if (problem.correctAnswer) {
        doc.setFont(void 0, "bold");
        let answerText = "";
        if (problem.choices && typeof problem.choices === "object") {
          if (problem.choices[problem.correctAnswer]) {
            answerText = problem.choices[problem.correctAnswer];
          }
        } else if (Array.isArray(problem.choices)) {
          const choice = problem.choices.find((c) => c.label === problem.correctAnswer);
          if (choice) {
            answerText = choice.text;
          }
        }
        if (answerText && answerText.trim().length > 0) {
          const answerDisplay = `Answer: ${problem.correctAnswer} (${answerText.trim()})`;
          const answerLines = doc.splitTextToSize(answerDisplay, maxWidth);
          answerLines.forEach((line) => {
            if (yPosition + lineHeight > pageHeight - 20) {
              doc.addPage();
              yPosition = margin;
              doc.setFont(void 0, "bold");
            }
            doc.text(line, margin, yPosition);
            yPosition += lineHeight;
          });
        } else {
          doc.text(`Answer: ${problem.correctAnswer}`, margin, yPosition);
          yPosition += lineHeight;
        }
        doc.setFont(void 0, "normal");
      } else if (problem.answer) {
        doc.setFont(void 0, "bold");
        let answerText = "";
        if (problem.choices && typeof problem.choices === "object") {
          if (problem.choices[problem.answer]) {
            answerText = problem.choices[problem.answer];
          }
        } else if (Array.isArray(problem.choices)) {
          const choice = problem.choices.find((c) => c.label === problem.answer);
          if (choice) {
            answerText = choice.text;
          }
        }
        if (answerText && answerText.trim().length > 0) {
          const answerDisplay = `Answer: ${problem.answer} (${answerText.trim()})`;
          const answerLines = doc.splitTextToSize(answerDisplay, maxWidth);
          answerLines.forEach((line) => {
            if (yPosition + lineHeight > pageHeight - 20) {
              doc.addPage();
              yPosition = margin;
              doc.setFont(void 0, "bold");
            }
            doc.text(line, margin, yPosition);
            yPosition += lineHeight;
          });
        } else {
          doc.text(`Answer: ${problem.answer}`, margin, yPosition);
          yPosition += lineHeight;
        }
        doc.setFont(void 0, "normal");
      } else if (problem.isGridIn && problem.gridInAnswer) {
        doc.setFont(void 0, "bold");
        doc.text(`Answer: ${problem.gridInAnswer}`, margin, yPosition);
        doc.setFont(void 0, "normal");
        yPosition += lineHeight;
      } else {
        doc.setFont(void 0, "italic");
        doc.setTextColor(128, 128, 128);
        doc.text(`Answer: [NOT_EXTRACTED]`, margin, yPosition);
        doc.setTextColor(0, 0, 0);
        yPosition += lineHeight;
      }
      yPosition += lineHeight * 0.5;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(80, 80, 80);
      if (problem.explanation && problem.explanation.trim().length > 0) {
        const explanationText = `Explanation: ${problem.explanation}`;
        const explanationLines = doc.splitTextToSize(explanationText, maxWidth);
        explanationLines.forEach((line) => {
          if (yPosition + lineHeight > pageHeight - 20) {
            doc.addPage();
            yPosition = margin;
            doc.setTextColor(80, 80, 80);
            doc.setFont("helvetica", "normal");
          }
          doc.text(line, margin, yPosition);
          yPosition += lineHeight;
        });
      } else {
        doc.setFont("helvetica", "italic");
        doc.setTextColor(128, 128, 128);
        doc.text("Explanation: [NOT_EXTRACTED]", margin, yPosition);
        yPosition += lineHeight;
      }
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      yPosition += sectionSpacing;
    });
    return yPosition;
  }
  function generateProblemsPDF(data) {
    try {
      const jsPDF = getJSPDF();
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      let yPosition = margin;
      const lineHeight = 7;
      const sectionSpacing = 10;
      doc.setFontSize(16);
      doc.setFont(void 0, "bold");
      doc.text("SAT Practice Problems", margin, yPosition);
      yPosition += lineHeight * 1.5;
      doc.setFontSize(10);
      doc.setFont(void 0, "normal");
      const dateStr = new Date(data.timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      doc.text(`Generated: ${dateStr}`, margin, yPosition);
      yPosition += lineHeight * 2;
      if (data.reading && data.reading.length > 0) {
        yPosition = addProblemsSectionToPDF(doc, "Reading", data.reading, yPosition, maxWidth, margin, pageHeight, lineHeight, sectionSpacing);
      }
      if (data.math && data.math.length > 0) {
        yPosition = addProblemsSectionToPDF(doc, "Math", data.math, yPosition, maxWidth, margin, pageHeight, lineHeight, sectionSpacing);
      }
      const footerY = pageHeight - 15;
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text("Generated by Our Service (Powered by Gemini)", pageWidth / 2, footerY, {
        align: "center"
      });
      return doc;
    } catch (error) {
      console.error("[SAT PDF Exporter] \uBB38\uC81C\uC9C0 PDF \uC0DD\uC131 \uC624\uB958:", error);
      if (error.message && error.message.includes("Extension context invalidated")) {
        throw new Error("Extension context invalidated during PDF generation");
      }
      throw error;
    }
  }
  function generateAnswersPDF(data) {
    try {
      const jsPDF = getJSPDF();
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - 2 * margin;
      let yPosition = margin;
      const lineHeight = 7;
      const sectionSpacing = 10;
      doc.setFontSize(16);
      doc.setFont(void 0, "bold");
      doc.text("SAT Practice Answers", margin, yPosition);
      yPosition += lineHeight * 1.5;
      doc.setFontSize(10);
      doc.setFont(void 0, "normal");
      const dateStr = new Date(data.timestamp).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
      doc.text(`Generated: ${dateStr}`, margin, yPosition);
      yPosition += lineHeight * 2;
      if (data.reading && data.reading.length > 0) {
        yPosition = addAnswersSectionToPDF(doc, "Reading", data.reading, yPosition, maxWidth, margin, pageHeight, lineHeight, sectionSpacing);
      }
      if (data.math && data.math.length > 0) {
        yPosition = addAnswersSectionToPDF(doc, "Math", data.math, yPosition, maxWidth, margin, pageHeight, lineHeight, sectionSpacing);
      }
      const footerY = pageHeight - 15;
      doc.setFontSize(8);
      doc.setTextColor(128, 128, 128);
      doc.text("Generated by Our Service (Powered by Gemini)", pageWidth / 2, footerY, {
        align: "center"
      });
      return doc;
    } catch (error) {
      console.error("[SAT PDF Exporter] \uC815\uB2F5\uC9C0 PDF \uC0DD\uC131 \uC624\uB958:", error);
      if (error.message && error.message.includes("Extension context invalidated")) {
        throw new Error("Extension context invalidated during PDF generation");
      }
      throw error;
    }
  }
  var PDFGenerator = class {
    /**
     * 문제지 PDF 생성
     * @param {Object} data - 문제 데이터
     * @returns {Object} jsPDF 문서 객체
     */
    generateProblemsPDF(data) {
      return generateProblemsPDF(data);
    }
    /**
     * 정답지 PDF 생성
     * @param {Object} data - 문제 데이터
     * @returns {Object} jsPDF 문서 객체
     */
    generateAnswersPDF(data) {
      return generateAnswersPDF(data);
    }
    /**
     * PDF 다운로드
     * @param {Object} problemDoc - 문제지 PDF 문서
     * @param {Object} answerDoc - 정답지 PDF 문서
     * @returns {Promise<void>}
     */
    async downloadPDFs(problemDoc, answerDoc, options = {}) {
      try {
        const dateStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
        const copyIndex = Number.isInteger(options.copyIndex) ? options.copyIndex : 1;
        const totalCopies = Number.isInteger(options.totalCopies) ? options.totalCopies : 1;
        const copySuffix = totalCopies > 1 ? `_Set${String(copyIndex).padStart(2, "0")}` : "";
        const problemFileName = `SAT_Problems_${dateStr}${copySuffix}.pdf`;
        const answerFileName = `SAT_Answers_${dateStr}${copySuffix}.pdf`;
        console.log(`[PDFGenerator] \uBB38\uC81C\uC9C0 PDF \uC800\uC7A5: ${problemFileName}`);
        problemDoc.save(problemFileName);
        await new Promise((resolve) => setTimeout(resolve, CONFIG.timeouts.pdfDownloadDelay));
        console.log(`[PDFGenerator] \uC815\uB2F5\uC9C0 PDF \uC800\uC7A5: ${answerFileName}`);
        answerDoc.save(answerFileName);
      } catch (error) {
        console.error("[PDFGenerator] PDF \uB2E4\uC6B4\uB85C\uB4DC \uC624\uB958:", error);
        throw error;
      }
    }
  };

  // src/frame/workerFrame.js
  init_extract();
  function looksLikeSatQuestionUI() {
    try {
      const text = (document.body?.innerText || document.body?.textContent || "").slice(0, 5e3).toLowerCase();
      const hasProgress = /\b\d+\s*\/\s*\d+\b/.test(text) || /question\s*\d+/i.test(text);
      const buttons = Array.from(document.querySelectorAll('button, [role="button"]'));
      const hasNextish = buttons.some((b) => {
        const btnText = ((b.innerText || "") + " " + (b.getAttribute("aria-label") || "")).toLowerCase();
        return /next|다음|continue|계속|submit|제출/i.test(btnText);
      });
      const hasChoiceish = buttons.filter((b) => {
        const t = ((b.innerText || "") + " " + (b.getAttribute("aria-label") || "")).trim();
        return /^[A-D]\b/.test(t) || /\bA\b|\bB\b|\bC\b|\bD\b/.test(t) || /choice\s*[A-D]/i.test(t);
      }).length >= 2;
      const result = hasProgress && (hasNextish || hasChoiceish);
      if (result) {
        console.log("[SAT FRAME] \uBB38\uC81C UI \uAC10\uC9C0\uB428:", {
          href: window.location.href,
          isTop: window === window.top,
          bodyTextLen: text.length,
          buttons: buttons.length,
          hasProgress,
          hasNextish,
          hasChoiceish
        });
      }
      return result;
    } catch (e) {
      console.warn("[SAT FRAME] looksLikeSatQuestionUI \uC624\uB958:", e);
      return false;
    }
  }
  async function findWorkerFrame() {
    return new Promise((resolve) => {
      const probeId = `probe_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      let done = false;
      const timeout = setTimeout(() => {
        if (!done) {
          console.warn("[SAT FRAME] Worker \uD504\uB808\uC784 \uCC3E\uAE30 \uD0C0\uC784\uC544\uC6C3 (2.5\uCD08)");
          window.removeEventListener("message", onMsg);
          resolve(null);
        }
      }, 2500);
      function onMsg(ev) {
        if (ev?.data?.type === "SAT_PROBE_RESULT" && ev.data.probeId === probeId) {
          if (!done) {
            done = true;
            clearTimeout(timeout);
            window.removeEventListener("message", onMsg);
            console.log("[SAT WORKER] \uC120\uCD9C\uB428:", ev.data);
            resolve(ev.data);
          }
        }
      }
      window.addEventListener("message", onMsg);
      const targetOrigin = location.origin;
      let sentCount = 0;
      for (let i = 0; i < window.frames.length; i++) {
        try {
          const frame = window.frames[i];
          if (frame.location && frame.location.origin === targetOrigin) {
            frame.postMessage({ type: "SAT_PROBE", probeId }, targetOrigin);
            sentCount++;
          }
        } catch (e) {
        }
      }
      if (sentCount === 0) {
        window.postMessage({ type: "SAT_PROBE", probeId }, targetOrigin);
      }
      console.log("[FRAME] probe sent to frames", {
        frameCount: window.frames.length,
        sentCount,
        probeId
      });
    });
  }
  function setupFrameMessageListener() {
    console.log("[FRAME] initFrameMessaging/setupFrameMessageListener called", {
      top: window === window.top,
      href: window.location.href,
      frameCount: window.frames.length
    });
    window.addEventListener("message", async (ev) => {
      const msg = ev?.data;
      if (!msg || typeof msg !== "object") return;
      if (msg.type === "SAT_PROBE") {
        console.log(`[FRAME] probe received top? ${window === window.top} href: ${window.location.href}`);
        const ok = looksLikeSatQuestionUI();
        console.log(`[FRAME] probe result: ${ok ? "looks like SAT UI" : "not SAT UI"}`);
        if (ok) {
          const bodyTextLen2 = (document.body?.innerText || "").length;
          const buttons2 = document.querySelectorAll('button, [role="button"]').length;
          window.postMessage({
            type: "SAT_PROBE_RESULT",
            probeId: msg.probeId,
            ok: true,
            href: window.location.href,
            title: document.title,
            isTop: window === window.top,
            bodyTextLen: bodyTextLen2,
            buttons: buttons2
          }, "*");
          console.log(`[FRAME] probe result sent (ok=true, bodyTextLen=${bodyTextLen2}, buttons=${buttons2})`);
        } else {
          console.log(`[FRAME] probe result: not SAT UI, skipping response`);
        }
        return;
      }
      if (msg.type === "SAT_START") {
        console.log(`[FRAME] SAT_START received top? ${window === window.top} href: ${window.location.href}`);
        if (!looksLikeSatQuestionUI()) {
          console.log("[FRAME] SAT_START ignored: not SAT UI");
          return;
        }
        console.log("[FRAME] SAT_START received (worker frame)");
        window.__SAT_WORKER_READY = true;
        window.__SAT_IS_WORKER = true;
        (async () => {
          try {
            console.log("[SAT WORKER] ===== Worker \uD504\uB808\uC784\uC5D0\uC11C \uC218\uC9D1 \uC2DC\uC791 =====");
            if (!window.__SAT_APP) {
              if (typeof SATApp !== "undefined") {
                window.__SAT_APP = new SATApp();
              } else {
                console.error("[SAT WORKER] SATApp \uD074\uB798\uC2A4\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
                return;
              }
            }
            if (!isQuestionScreen() && getProgressState() === null) {
              console.log("[SAT WORKER] \uC790\uB3D9 \uC9C4\uC785 \uC2DC\uD000\uC2A4 \uC2DC\uC791");
              await window.__SAT_APP.navigator.handleInitialNavigation();
            }
            console.log("[SAT WORKER] \uBB38\uC81C \uC218\uC9D1 \uC2DC\uC791");
            const allData = await window.__SAT_APP.scraper.collectAllProblems();
            console.log("[SAT WORKER] \uBB38\uC81C \uC218\uC9D1 \uC644\uB8CC:", {
              reading: allData.reading.length,
              math: allData.math.length
            });
            window.postMessage({
              type: "SAT_COLLECTION_COMPLETE",
              data: allData,
              href: window.location.href
            }, "*");
          } catch (error) {
            console.error("[SAT WORKER] \uC218\uC9D1 \uC624\uB958:", error);
            window.postMessage({
              type: "SAT_COLLECTION_ERROR",
              error: error.message,
              href: window.location.href
            }, "*");
          }
        })();
        return;
      }
    });
    const bodyTextLen = (document.body?.innerText || document.body?.textContent || "").length;
    const buttons = document.querySelectorAll('button, [role="button"]').length;
    console.log("[SAT FRAME] \uD504\uB808\uC784 \uB85C\uB4DC:", {
      href: window.location.href,
      top: window === window.top,
      bodyTextLen,
      buttons
    });
  }

  // src/flow/geminiChat.js
  init_deepQuery();
  init_extract();
  function isGeminiChatPage() {
    try {
      if (!window.location.href.includes("gemini.google.com")) {
        return false;
      }
      if (looksLikeSatQuestionUI() || isQuestionScreen() || getProgressState() !== null) {
        return false;
      }
      const allInputs = deepQuerySelectorAll('textarea, input[type="text"], [contenteditable="true"]');
      const inputsWithAttrs = allInputs.map((el) => {
        const placeholder = (el.getAttribute("placeholder") || "").toLowerCase();
        const ariaLabel = (el.getAttribute("aria-label") || "").toLowerCase();
        const title = (el.getAttribute("title") || "").toLowerCase();
        const text = (el.innerText || "").slice(0, 80).toLowerCase();
        return { visible: isElementVisible(el), placeholder, ariaLabel, title, text };
      });
      const hasInput = allInputs.some((el) => {
        if (!isElementVisible(el)) return false;
        const placeholder = (el.getAttribute("placeholder") || "").toLowerCase();
        const ariaLabel = (el.getAttribute("aria-label") || "").toLowerCase();
        const title = (el.getAttribute("title") || "").toLowerCase();
        const text = (el.innerText || "").slice(0, 80).toLowerCase();
        return placeholder.includes("message") || placeholder.includes("prompt") || placeholder.includes("chat") || placeholder.includes("\uC785\uB825") || placeholder.includes("\uBB3C\uC5B4\uBCF4\uAE30") || placeholder.includes("ask") || ariaLabel.includes("message") || ariaLabel.includes("prompt") || ariaLabel.includes("chat") || ariaLabel.includes("\uC785\uB825") || ariaLabel.includes("\uD504\uB86C\uD504\uD2B8") || ariaLabel.includes("\uBB3C\uC5B4\uBCF4\uAE30") || ariaLabel.includes("ask") || title.includes("message") || title.includes("prompt") || title.includes("chat") || title.includes("\uD504\uB86C\uD504\uD2B8") || text.includes("\uBB3C\uC5B4\uBCF4\uAE30") || text.includes("ask");
      });
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "geminiChat.js:isGeminiChatPage", message: "isGeminiChatPage result", data: { hasInput, inputCount: allInputs.length, sampleAttrs: inputsWithAttrs.slice(0, 3) }, timestamp: Date.now(), runId: "run1", hypothesisId: "D" }) }).catch(() => {
      });
      return hasInput;
    } catch (error) {
      console.warn("[GeminiChat] isGeminiChatPage \uC624\uB958:", error);
      return false;
    }
  }
  function isSATTestPage() {
    try {
      return looksLikeSatQuestionUI() || isQuestionScreen() || getProgressState() !== null;
    } catch (error) {
      console.warn("[GeminiChat] isSATTestPage \uC624\uB958:", error);
      return false;
    }
  }
  var GeminiChatAutomator = class {
    constructor() {
      this.isProcessing = false;
    }
    /**
     * 채팅 입력창 찾기 (우선순위: data-testid/role → aria-label/placeholder → 전체 스캔)
     * @returns {Promise<HTMLElement|null>}
     */
    async findChatInput() {
      console.log("[GeminiChat] \uC785\uB825\uCC3D \uCC3E\uAE30 \uC2DC\uC791...");
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "geminiChat.js:findChatInput:entry", message: "findChatInput entry", data: {}, timestamp: Date.now(), runId: "run1", hypothesisId: "B" }) }).catch(() => {
      });
      for (const selector of CONFIG.geminiChat.inputSelectors.slice(0, 4)) {
        const elements = deepQuerySelectorAll(selector);
        for (const el of elements) {
          if (isElementVisible(el) && !el.disabled && !el.readOnly) {
            console.log("[GeminiChat] \uC785\uB825\uCC3D \uBC1C\uACAC (1\uC21C\uC704):", selector, el);
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "geminiChat.js:findChatInput:found1", message: "input found tier1", data: { selector, tagName: el.tagName, hasValue: !!el.value, contentEditable: el.contentEditable }, timestamp: Date.now(), runId: "run1", hypothesisId: "B" }) }).catch(() => {
            });
            return el;
          }
        }
      }
      for (const selector of CONFIG.geminiChat.inputSelectors.slice(4)) {
        const elements = deepQuerySelectorAll(selector);
        for (const el of elements) {
          const isEditable = el.contentEditable === "true" || !el.disabled && el.readOnly !== true;
          if (isElementVisible(el) && isEditable) {
            const placeholder = (el.getAttribute("placeholder") || "").toLowerCase();
            const ariaLabel = (el.getAttribute("aria-label") || "").toLowerCase();
            const title = (el.getAttribute("title") || "").toLowerCase();
            const matches = placeholder.includes("message") || placeholder.includes("prompt") || placeholder.includes("chat") || placeholder.includes("\uC785\uB825") || placeholder.includes("\uBB3C\uC5B4\uBCF4\uAE30") || placeholder.includes("ask") || ariaLabel.includes("message") || ariaLabel.includes("prompt") || ariaLabel.includes("chat") || ariaLabel.includes("\uC785\uB825") || ariaLabel.includes("\uBB3C\uC5B4\uBCF4\uAE30") || ariaLabel.includes("ask") || title.includes("message") || title.includes("prompt") || title.includes("chat") || title.includes("\uBB3C\uC5B4\uBCF4\uAE30");
            if (matches) {
              console.log("[GeminiChat] \uC785\uB825\uCC3D \uBC1C\uACAC (2\uC21C\uC704):", selector, el);
              return el;
            }
          }
        }
      }
      const allInputs = deepQuerySelectorAll('textarea, input[type="text"], [contenteditable="true"]');
      for (const el of allInputs) {
        if (isElementVisible(el) && (el.disabled === false || el.disabled === void 0) && el.readOnly !== true) {
          const rect = el.getBoundingClientRect();
          if (rect.bottom > window.innerHeight * 0.5) {
            console.log("[GeminiChat] \uC785\uB825\uCC3D \uBC1C\uACAC (3\uC21C\uC704 - \uC804\uCCB4 \uC2A4\uCE94):", el);
            fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "geminiChat.js:findChatInput:found3", message: "input found tier3", data: { tagName: el.tagName, contentEditable: el.contentEditable, rectBottom: rect.bottom, innerHeight: window.innerHeight }, timestamp: Date.now(), runId: "run1", hypothesisId: "B" }) }).catch(() => {
            });
            return el;
          }
        }
      }
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "geminiChat.js:findChatInput:notFound", message: "input not found", data: { allInputsCount: allInputs.length }, timestamp: Date.now(), runId: "run1", hypothesisId: "B" }) }).catch(() => {
      });
      console.warn("[GeminiChat] \uC785\uB825\uCC3D\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      return null;
    }
    /**
     * 메시지 입력 및 전송
     * @param {string} message - 입력할 메시지
     * @returns {Promise<boolean>} 성공 여부
     */
    async typeMessage(message) {
      console.log("[GeminiChat] \uBA54\uC2DC\uC9C0 \uC785\uB825 \uC2DC\uC791:", message);
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "geminiChat.js:typeMessage:entry", message: "typeMessage entry", data: { messageLen: message?.length }, timestamp: Date.now(), runId: "run1", hypothesisId: "C" }) }).catch(() => {
      });
      const input = await this.findChatInput();
      if (!input) {
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "geminiChat.js:typeMessage:inputNull", message: "findChatInput returned null", data: {}, timestamp: Date.now(), runId: "run1", hypothesisId: "B" }) }).catch(() => {
        });
        throw new Error("\uCC44\uD305 \uC785\uB825\uCC3D\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
      }
      fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "geminiChat.js:typeMessage:inputFound", message: "input found for typing", data: { tagName: input.tagName, contentEditable: input.contentEditable, hasValueProp: !!("value" in input) }, timestamp: Date.now(), runId: "run1", hypothesisId: "C" }) }).catch(() => {
      });
      try {
        input.focus();
        await new Promise((resolve) => setTimeout(resolve, 120));
        if (input.value) {
          input.value = "";
          input.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
        }
        if (input.contentEditable === "true") {
          input.textContent = "";
          input.innerHTML = "";
          input.dispatchEvent(new InputEvent("input", { bubbles: true, cancelable: true, inputType: "deleteContentForward" }));
        }
        if (input.contentEditable === "true") {
          input.textContent = message;
          input.innerText = message;
          input.dispatchEvent(new InputEvent("input", { bubbles: true, cancelable: true, inputType: "insertText", data: message }));
        } else {
          input.value = message;
          input.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
          input.dispatchEvent(new Event("change", { bubbles: true, cancelable: true }));
        }
        const textarea = input.tagName === "TEXTAREA" ? input : null;
        if (textarea) {
          textarea.value = message;
          textarea.dispatchEvent(new Event("input", { bubbles: true, cancelable: true }));
        }
        await new Promise((resolve) => setTimeout(resolve, 200));
        const afterValue = input.contentEditable === "true" ? input.textContent || input.innerText : input.value;
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "geminiChat.js:typeMessage:afterSet", message: "value after set", data: { afterValue: afterValue?.slice(0, 50), expectedMatch: afterValue?.includes("SAT") }, timestamp: Date.now(), runId: "run1", hypothesisId: "C" }) }).catch(() => {
        });
        const submitButton = await this.findSubmitButton();
        if (submitButton) {
          console.log("[GeminiChat] \uC804\uC1A1 \uBC84\uD2BC \uD074\uB9AD");
          await safeClick(submitButton);
          await waitForContentLoad(1e3);
          return true;
        } else {
          console.log("[GeminiChat] \uC804\uC1A1 \uBC84\uD2BC\uC744 \uCC3E\uC9C0 \uBABB\uD568. Enter \uD0A4 \uC2DC\uBBAC\uB808\uC774\uC158");
          input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", code: "Enter", keyCode: 13, bubbles: true, cancelable: true }));
          input.dispatchEvent(new KeyboardEvent("keyup", { key: "Enter", code: "Enter", keyCode: 13, bubbles: true, cancelable: true }));
          await waitForContentLoad(1e3);
          return true;
        }
      } catch (error) {
        console.error("[GeminiChat] \uBA54\uC2DC\uC9C0 \uC785\uB825 \uC624\uB958:", error);
        throw error;
      }
    }
    /**
     * 전송 버튼 찾기
     * @returns {Promise<HTMLElement|null>}
     */
    async findSubmitButton() {
      for (const selector of CONFIG.geminiChat.submitSelectors) {
        const buttons = deepQuerySelectorAll(selector);
        for (const btn of buttons) {
          if (isElementVisible(btn) && !btn.disabled) {
            return btn;
          }
        }
      }
      return null;
    }
    /**
     * SAT UI가 나타날 때까지 대기
     * @returns {Promise<boolean>} SAT UI 감지 성공 여부
     */
    async waitForSATUI() {
      console.log("[GeminiChat] SAT UI \uB300\uAE30 \uC2DC\uC791...");
      showToast("SAT \uD14C\uC2A4\uD2B8 \uD654\uBA74\uC774 \uB098\uD0C0\uB0A0 \uB54C\uAE4C\uC9C0 \uB300\uAE30 \uC911...", "info");
      const startTime = Date.now();
      const timeout = CONFIG.geminiChat.satUIWaitTimeout;
      console.log("[GeminiChat] \uCD08\uAE30 15\uCD08 \uB300\uAE30 \uC911...");
      await new Promise((resolve) => setTimeout(resolve, 15e3));
      while (Date.now() - startTime < timeout) {
        if (looksLikeSatQuestionUI()) {
          console.log("[GeminiChat] SAT UI \uAC10\uC9C0\uB428 (looksLikeSatQuestionUI)");
          return true;
        }
        if (isQuestionScreen()) {
          console.log("[GeminiChat] SAT UI \uAC10\uC9C0\uB428 (isQuestionScreen)");
          return true;
        }
        if (getProgressState() !== null) {
          console.log("[GeminiChat] SAT UI \uAC10\uC9C0\uB428 (getProgressState)");
          return true;
        }
        const bodyTextRaw = document.body?.innerText || document.body?.textContent || "";
        const bodyText = bodyTextRaw.toLowerCase();
        if (bodyText.includes("conversation was created with a gem that has been deleted") || bodyText.includes("create a new gem") || bodyText.includes("deleted gem")) {
          throw new Error("\uD604\uC7AC \uB300\uD654\uAC00 \uC0AD\uC81C\uB41C Gem\uC5D0 \uC5F0\uACB0\uB418\uC5B4 SAT \uD14C\uC2A4\uD2B8\uB97C \uC2DC\uC791\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. Gemini\uC5D0\uC11C \uC0C8 \uC77C\uBC18 \uCC44\uD305\uC744 \uC5F4\uAC70\uB098 \uC0C8 Gem\uC744 \uB9CC\uB4E0 \uB4A4 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.");
        }
        if (bodyText.includes("reading") && bodyText.includes("writing")) {
          console.log("[GeminiChat] SAT UI \uAC10\uC9C0\uB428 (Reading/Writing \uD14D\uC2A4\uD2B8)");
          return true;
        }
        if (bodyText.includes("math") && (bodyText.includes("module") || bodyText.includes("section"))) {
          console.log("[GeminiChat] SAT UI \uAC10\uC9C0\uB428 (Math \uC139\uC158 \uD14D\uC2A4\uD2B8)");
          return true;
        }
        if (Date.now() - startTime >= timeout) break;
        await new Promise((resolve) => setTimeout(resolve, 4e3));
      }
      console.warn("[GeminiChat] SAT UI \uB300\uAE30 \uD0C0\uC784\uC544\uC6C3");
      return false;
    }
    /**
     * 전체 자동화 플로우 실행
     * @param {SATApp} satApp - SATApp 인스턴스
     * @returns {Promise<boolean>} 성공 여부
     */
    async triggerSATFlow(satApp) {
      if (this.isProcessing) {
        console.log("[GeminiChat] \uC774\uBBF8 \uCC98\uB9AC \uC911\uC785\uB2C8\uB2E4.");
        return false;
      }
      try {
        this.isProcessing = true;
        console.log("[GeminiChat] ===== \uC790\uB3D9\uD654 \uD50C\uB85C\uC6B0 \uC2DC\uC791 =====");
        showToast("\uBA54\uC2DC\uC9C0 \uC785\uB825 \uC911...", "info");
        await this.typeMessage(CONFIG.geminiChat.message);
        console.log("[GeminiChat] \uBA54\uC2DC\uC9C0 \uC804\uC1A1 \uC644\uB8CC");
        const satUIDetected = await this.waitForSATUI();
        if (!satUIDetected) {
          throw new Error("SAT \uD14C\uC2A4\uD2B8 \uD654\uBA74\uC774 \uB098\uD0C0\uB098\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uD0C0\uC784\uC544\uC6C3\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
        }
        console.log("[GeminiChat] SAT UI \uC9C4\uC785 \uC644\uB8CC");
        showToast("SAT \uD14C\uC2A4\uD2B8 \uD654\uBA74 \uC9C4\uC785 \uC644\uB8CC!", "success");
        try {
          if (window.satApp && typeof window.satApp.init === "function") {
            console.log("[GeminiChat] SATApp.init \uC7AC\uD638\uCD9C\uB85C Export \uBC84\uD2BC \uC0DD\uC131 \uC2DC\uB3C4");
            window.satApp.init();
          } else if (window.__SAT_APP && typeof window.__SAT_APP.init === "function") {
            console.log("[GeminiChat] __SAT_APP.init \uC7AC\uD638\uCD9C\uB85C Export \uBC84\uD2BC \uC0DD\uC131 \uC2DC\uB3C4");
            window.__SAT_APP.init();
          }
        } catch (e) {
          console.warn("[GeminiChat] SATApp \uC7AC\uCD08\uAE30\uD654 \uC911 \uC624\uB958:", e);
        }
        console.log("[GeminiChat] \uAE30\uC874 \uC790\uB3D9\uD654 \uB85C\uC9C1 \uC2DC\uC791...");
        showToast("SAT \uD14C\uC2A4\uD2B8 \uC790\uB3D9\uD654 \uC2DC\uC791...", "info");
        const exportButton = document.getElementById("gemini-sat-pdf-export-btn");
        if (exportButton && satApp) {
          console.log("[GeminiChat] Export to PDF \uBC84\uD2BC \uC790\uB3D9 \uD074\uB9AD");
          showToast("PDF \uC0DD\uC131 \uC2DC\uC791...", "info");
          await satApp.handleExportClick(exportButton);
          return true;
        } else {
          console.log("[GeminiChat] Export \uBC84\uD2BC \uB300\uAE30 \uC911...");
          const button = await waitForElement(() => {
            return document.getElementById("gemini-sat-pdf-export-btn");
          }, 30, 1e3);
          if (button && satApp) {
            console.log("[GeminiChat] Export to PDF \uBC84\uD2BC \uBC1C\uACAC, \uC790\uB3D9 \uD074\uB9AD");
            showToast("PDF \uC0DD\uC131 \uC2DC\uC791...", "info");
            await satApp.handleExportClick(button);
            return true;
          } else {
            throw new Error("Export to PDF \uBC84\uD2BC\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
          }
        }
      } catch (error) {
        console.error("[GeminiChat] \uC790\uB3D9\uD654 \uD50C\uB85C\uC6B0 \uC624\uB958:", error);
        showToast(`\uC790\uB3D9\uD654 \uC911 \uC624\uB958: ${error.message}`, "error");
        throw error;
      } finally {
        this.isProcessing = false;
      }
    }
  };

  // src/flow/geminiSetup.js
  init_deepQuery();
  async function clickStartButton() {
    console.log("[GeminiSetup] \uC2DC\uC791 \uBC84\uD2BC \uD074\uB9AD \uC2DC\uB3C4...");
    try {
      const directButton = document.querySelector(
        "#app-root > main > side-navigation-v2 > mat-sidenav-container > mat-sidenav-content > div > div.content-container > chat-window > immersive-panel > learning-immersive-panel > div > div > activity-set > section-overview > div > div > glowing-card:nth-child(1) > div > div > div.glowing-card-content > div.section-button-container.ng-star-inserted > button"
      );
      if (directButton) {
        console.log("[GeminiSetup] \uC2DC\uC791 \uBC84\uD2BC \uBC1C\uACAC (\uC815\uD655 \uC140\uB809\uD130)");
        const clicked = await safeClick(directButton);
        if (clicked) {
          await new Promise((resolve) => setTimeout(resolve, 600));
          return true;
        }
      }
    } catch (e) {
      console.warn("[GeminiSetup] \uC2DC\uC791 \uBC84\uD2BC \uC9C1\uC811 \uC140\uB809\uD130 \uC2E4\uD328:", e);
    }
    const selectors = CONFIG.geminiSetup?.startButtonSelectors ?? [
      // 정확한 경로 (사용자 제공)
      "#app-root section-overview glowing-card:nth-child(1) .section-button-container button",
      "section-overview glowing-card:first-child .section-button-container button",
      "glowing-card .section-button-container.ng-star-inserted button",
      "activity-set section-overview .glowing-card .section-button-container button",
      // 텍스트 기반 폴백
      "button:has(span.mat-mdc-button-touch-target)"
    ];
    for (const selector of selectors) {
      try {
        const elements = deepQuerySelectorAll(selector);
        for (const el of elements) {
          const text = (el.innerText || el.textContent || "").trim().toLowerCase();
          if (text.includes("\uC2DC\uC791") || text.includes("start")) {
            console.log("[GeminiSetup] \uC2DC\uC791 \uBC84\uD2BC \uBC1C\uACAC:", selector);
            const clicked = await safeClick(el);
            if (clicked) {
              await new Promise((resolve) => setTimeout(resolve, 600));
              return true;
            }
          }
        }
      } catch (e) {
        console.warn("[GeminiSetup] \uC2DC\uC791 \uBC84\uD2BC \uC140\uB809\uD130 \uC2E4\uD328:", selector, e);
      }
    }
    const touchTargets = deepQuerySelectorAll(
      ".glowing-card .section-button-container button span.mat-mdc-button-touch-target"
    );
    const touchTarget = touchTargets[0];
    if (touchTarget) {
      const button = touchTarget.closest("button");
      if (button && await safeClick(button)) {
        await new Promise((resolve) => setTimeout(resolve, 600));
        return true;
      }
    }
    console.warn("[GeminiSetup] \uC2DC\uC791 \uBC84\uD2BC\uC744 \uCC3E\uC9C0 \uBABB\uD568");
    return false;
  }
  async function clickFirstToggle() {
    console.log("[GeminiSetup] \uCCAB \uBC88\uC9F8 \uD1A0\uAE00 \uD074\uB9AD \uC2DC\uB3C4...");
    const selectors = CONFIG.geminiSetup?.firstToggleSelectors ?? [
      'button[id^="mat-mdc-slide-toggle-"]',
      ".mdc-switch",
      "span.mdc-switch__handle-track",
      "span.mdc-switch__shadow"
    ];
    for (const selector of selectors) {
      try {
        const elements = deepQuerySelectorAll(selector);
        const el = elements[0];
        if (el) {
          const clickTarget = el.tagName === "BUTTON" ? el : el.closest("button") || el;
          console.log("[GeminiSetup] \uCCAB \uBC88\uC9F8 \uD1A0\uAE00 \uBC1C\uACAC:", selector);
          const clicked = await safeClick(clickTarget);
          if (clicked) {
            await new Promise((resolve) => setTimeout(resolve, 400));
            return true;
          }
        }
      } catch (e) {
        console.warn("[GeminiSetup] \uCCAB \uBC88\uC9F8 \uD1A0\uAE00 \uC140\uB809\uD130 \uC2E4\uD328:", selector, e);
      }
    }
    console.warn("[GeminiSetup] \uCCAB \uBC88\uC9F8 \uD1A0\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD568");
    return false;
  }
  async function clickSecondToggle() {
    console.log("[GeminiSetup] \uB450 \uBC88\uC9F8 \uD1A0\uAE00 \uD074\uB9AD \uC2DC\uB3C4...");
    const toggles = [];
    for (const selector of ['button[id^="mat-mdc-slide-toggle-"]', ".mdc-switch"]) {
      const elements = deepQuerySelectorAll(selector);
      toggles.push(...elements);
    }
    if (toggles.length < 2) {
      console.log("[GeminiSetup] \uD1A0\uAE00\uC774 1\uAC1C\uC774\uBBC0\uB85C \uB450 \uBC88\uC9F8 \uD1A0\uAE00 \uD074\uB9AD\uC744 \uC2A4\uD0B5\uD569\uB2C8\uB2E4.");
      return true;
    }
    const second = toggles[1];
    const clickTarget = second.tagName === "BUTTON" ? second : second.closest("button") || second;
    const clicked = await safeClick(clickTarget);
    if (clicked) {
      await new Promise((resolve) => setTimeout(resolve, 400));
      return true;
    }
    console.warn("[GeminiSetup] \uB450 \uBC88\uC9F8 \uD1A0\uAE00\uC744 \uCC3E\uC9C0 \uBABB\uD568");
    return false;
  }
  async function runSetupSequence() {
    console.log("[GeminiSetup] ===== \uC124\uC815 \uC2DC\uD000\uC2A4 \uC2DC\uC791 =====");
    showToast("SAT \uC124\uC815 \uBC84\uD2BC \uD074\uB9AD \uC911...", "info");
    const timeout = CONFIG.geminiSetup?.setupSequenceTimeout ?? 15e3;
    let startButtonDone = false;
    const startTime = Date.now();
    while (Date.now() - startTime < timeout && !startButtonDone) {
      startButtonDone = await clickStartButton();
      if (!startButtonDone) {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }
    if (!startButtonDone) {
      console.warn("[GeminiSetup] \uC2DC\uC791 \uBC84\uD2BC \uD074\uB9AD \uC2E4\uD328 (\uACC4\uC18D \uC9C4\uD589)");
    } else {
      showToast("\uC2DC\uC791 \uBC84\uD2BC \uD074\uB9AD \uC644\uB8CC. \uD1A0\uAE00 \uC124\uC815 \uC911...", "info");
    }
    await new Promise((resolve) => setTimeout(resolve, 800));
    let firstToggleDone = false;
    const toggleStartTime = Date.now();
    while (Date.now() - toggleStartTime < timeout && !firstToggleDone) {
      firstToggleDone = await clickFirstToggle();
      if (!firstToggleDone) {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }
    if (!firstToggleDone) {
      console.warn("[GeminiSetup] \uCCAB \uBC88\uC9F8 \uD1A0\uAE00 \uD074\uB9AD \uC2E4\uD328 (\uACC4\uC18D \uC9C4\uD589)");
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
    let secondToggleDone = false;
    const secondToggleStartTime = Date.now();
    while (Date.now() - secondToggleStartTime < timeout && !secondToggleDone) {
      secondToggleDone = await clickSecondToggle();
      if (!secondToggleDone) {
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }
    if (!secondToggleDone) {
      console.warn("[GeminiSetup] \uB450 \uBC88\uC9F8 \uD1A0\uAE00 \uD074\uB9AD \uC2E4\uD328 (\uACC4\uC18D \uC9C4\uD589)");
    }
    console.log("[GeminiSetup] ===== \uC124\uC815 \uC2DC\uD000\uC2A4 \uC644\uB8CC =====");
    return startButtonDone || firstToggleDone || secondToggleDone;
  }

  // src/entry/content.entry.js
  var SATApp2 = class {
    constructor() {
      this.navigator = new SATNavigator();
      this.scraper = new SATScraper();
      this.pdfGenerator = new PDFGenerator();
      this.isProcessing = false;
    }
    /**
     * Export 버튼 생성 및 이벤트 바인딩
     */
    init() {
      console.log("[BOOT] about to create export button", "top?", window === window.top);
      if (typeof chrome !== "undefined" && chrome.runtime && !chrome.runtime.id) {
        console.warn("[SATApp] Extension context invalidated - \uBC84\uD2BC \uC0DD\uC131 \uC2A4\uD0B5");
        showToast("\uD655\uC7A5 \uD504\uB85C\uADF8\uB7A8\uC774 \uC7AC\uB85C\uB4DC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD574\uC8FC\uC138\uC694.", "error");
        return;
      }
      try {
        if (!document.body) {
          console.log("[SATApp] document.body\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. 100ms \uD6C4 \uC7AC\uC2DC\uB3C4...");
          setTimeout(() => this.init(), 100);
          return;
        }
        const isChatPage = isGeminiChatPage();
        const isSATPage = isSATTestPage();
        console.log("[SATApp] \uD398\uC774\uC9C0 \uD0C0\uC785 \uAC10\uC9C0:", { isChatPage, isSATPage });
        if (isChatPage && !isSATPage) {
          const existingStartBtn = document.getElementById("gemini-sat-start-btn");
          if (existingStartBtn) {
            existingStartBtn.remove();
          }
          const existingExportBtn = document.getElementById("gemini-sat-pdf-export-btn");
          if (existingExportBtn) {
            console.log("[SATApp] Export \uBC84\uD2BC\uC774 \uC774\uBBF8 \uC874\uC7AC\uD569\uB2C8\uB2E4.");
            existingExportBtn.style.display = "block";
            existingExportBtn.style.visibility = "visible";
            existingExportBtn.style.opacity = "1";
            existingExportBtn.style.zIndex = "2147483647";
            return;
          }
          console.log("[SATApp] Export to PDF \uBC84\uD2BC \uC0DD\uC131 (\uCC44\uD305 \uD398\uC774\uC9C0)...");
          const button = this.createExportButton();
          document.body.appendChild(button);
          console.log("[BOOT] exportButtonInserted (chat page)", button.id);
          return;
        } else if (isSATPage || !isChatPage) {
          const existingStartBtn = document.getElementById("gemini-sat-start-btn");
          if (existingStartBtn) {
            existingStartBtn.remove();
          }
          const existingBtn = document.getElementById("gemini-sat-pdf-export-btn");
          if (existingBtn) {
            console.log("[SATApp] \uBC84\uD2BC\uC774 \uC774\uBBF8 \uC874\uC7AC\uD569\uB2C8\uB2E4.");
            existingBtn.style.display = "block";
            existingBtn.style.visibility = "visible";
            existingBtn.style.opacity = "1";
            existingBtn.style.zIndex = "2147483647";
            console.log("[BOOT] buttonInserted (existing)", existingBtn.id, "visible?", window.getComputedStyle(existingBtn).display !== "none");
            return;
          }
          console.log("[SATApp] \uBC84\uD2BC \uC0DD\uC131 \uC2DC\uC791...");
          const button = this.createExportButton();
          document.body.appendChild(button);
          console.log("[BOOT] buttonInserted", button.id, "top?", window === window.top, "ownerDocument:", button.ownerDocument === document);
          const computedStyle = window.getComputedStyle(button);
          const rect = button.getBoundingClientRect();
          const isVisible = computedStyle.display !== "none" && computedStyle.visibility !== "hidden" && computedStyle.opacity !== "0" && rect.width > 0 && rect.height > 0;
          console.log("[BOOT] buttonVisible?", isVisible, {
            display: computedStyle.display,
            visibility: computedStyle.visibility,
            opacity: computedStyle.opacity,
            zIndex: computedStyle.zIndex,
            position: computedStyle.position,
            rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
          });
          console.log("[SATApp] \uBC84\uD2BC\uC774 \uC0DD\uC131\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC704\uCE58:", {
            top: button.style.top,
            right: button.style.right,
            zIndex: button.style.zIndex,
            display: computedStyle.display,
            visibility: computedStyle.visibility,
            opacity: computedStyle.opacity
          });
        }
      } catch (error) {
        console.error("[SATApp] \uBC84\uD2BC \uC0DD\uC131 \uC911 \uC624\uB958 (\uC2A4\uD06C\uB9BD\uD2B8\uB294 \uACC4\uC18D \uC2E4\uD589):", error);
      }
    }
    /**
     * Start SAT Test 버튼 생성
     * @returns {HTMLElement} 버튼 요소
     */
    createStartButton() {
      const button = document.createElement("button");
      button.id = "gemini-sat-start-btn";
      button.className = "gemini-sat-start-btn";
      button.textContent = "Start SAT Test";
      button.type = "button";
      button.style.cssText = `
      position: fixed !important;
      top: 20px !important;
      right: 20px !important;
      z-index: 2147483647 !important;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
      color: white !important;
      border: none !important;
      padding: 12px 24px !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
      transform: none !important;
      clip: auto !important;
      clip-path: none !important;
    `;
      button.setAttribute("style", button.style.cssText);
      button.addEventListener("click", (event) => {
        console.log("[CLICK] start button clicked", {
          isTrusted: event.isTrusted,
          top: window === window.top,
          location: location.href,
          timestamp: Date.now()
        });
        this.handleStartClick(button);
      });
      return button;
    }
    /**
     * Start 버튼 클릭 핸들러
     * @param {HTMLElement} button - 클릭된 버튼 요소
     */
    async handleStartClick(button) {
      console.log("[FLOW] handleStartClick entered", {
        isProcessing: this.isProcessing,
        top: window === window.top
      });
      if (this.isProcessing) {
        console.log("[FLOW] \uC774\uBBF8 \uCC98\uB9AC \uC911\uC785\uB2C8\uB2E4. \uC2A4\uD0B5.");
        return;
      }
      try {
        this.isProcessing = true;
        console.log("[SATApp] ===== Start SAT Test \uBC84\uD2BC \uD074\uB9AD\uB428 =====");
        button.disabled = true;
        button.classList.add("loading");
        button.textContent = "Starting...";
        const chatAutomator = new GeminiChatAutomator();
        showToast("SAT \uD14C\uC2A4\uD2B8 \uC790\uB3D9\uD654 \uC2DC\uC791...", "info");
        await chatAutomator.triggerSATFlow(this);
        button.textContent = "\u2713 Started!";
        setTimeout(() => {
          button.textContent = "Start SAT Test";
          button.disabled = false;
          button.classList.remove("loading");
          this.isProcessing = false;
        }, 2e3);
      } catch (error) {
        console.error("[ERROR] handleStartClick failed:", error);
        showToast(`\uC790\uB3D9\uD654 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4: ${error.message}`, "error");
        button.disabled = false;
        button.classList.remove("loading");
        button.textContent = "Start SAT Test";
        this.isProcessing = false;
      }
    }
    /**
     * Export 버튼 생성
     * @returns {HTMLElement} 버튼 요소
     */
    createExportButton() {
      const button = document.createElement("button");
      button.id = "gemini-sat-pdf-export-btn";
      button.className = "gemini-sat-pdf-export-btn";
      button.textContent = "Export to PDF";
      button.type = "button";
      button.style.cssText = `
      position: fixed !important;
      top: 20px !important;
      right: 20px !important;
      z-index: 2147483647 !important;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
      color: white !important;
      border: none !important;
      padding: 12px 24px !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      border-radius: 8px !important;
      font-size: 14px !important;
      font-weight: 600 !important;
      cursor: pointer !important;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif !important;
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
      pointer-events: auto !important;
      transform: none !important;
      clip: auto !important;
      clip-path: none !important;
    `;
      button.setAttribute("style", button.style.cssText);
      button.addEventListener("click", (event) => {
        console.log("[CLICK] export button clicked", {
          isTrusted: event.isTrusted,
          top: window === window.top,
          location: location.href,
          timestamp: Date.now()
        });
        console.trace("[TRACE] export click stack");
        this.handleExportClick(button);
      });
      return button;
    }
    /**
     * 생성할 PDF 세트 수를 사용자에게 입력받음
     * @returns {number|null} 유효한 세트 수 또는 취소(null)
     */
    promptExportSetCount() {
      const input = window.prompt("\uBB38\uC81C\uC9C0/\uD574\uC124\uC9C0 \uC138\uD2B8\uB97C \uBA87 \uAC1C \uC0DD\uC131\uD560\uAE4C\uC694?\n(1 \uC774\uC0C1\uC758 \uC815\uC218\uB97C \uC785\uB825\uD558\uC138\uC694)", "1");
      if (input === null) {
        return null;
      }
      const count = Number.parseInt(input.trim(), 10);
      if (!Number.isInteger(count) || count < 1) {
        throw new Error("\uC0DD\uC131 \uAC1C\uC218\uB294 1 \uC774\uC0C1\uC758 \uC815\uC218\uC5EC\uC57C \uD569\uB2C8\uB2E4.");
      }
      return count;
    }
    /**
     * Export 버튼 클릭 핸들러
     * @param {HTMLElement} button - 클릭된 버튼 요소
     */
    async handleExportClick(button) {
      console.log("[FLOW] handleExportClick entered", {
        isProcessing: this.isProcessing,
        top: window === window.top,
        hasApp: !!window.__SAT_APP,
        hasClass: !!window.SATApp
      });
      if (this.isProcessing) {
        console.log("[FLOW] \uC774\uBBF8 \uCC98\uB9AC \uC911\uC785\uB2C8\uB2E4. \uC2A4\uD0B5.");
        return;
      }
      const app = window.__SAT_APP || window.satApp || this;
      if (!app) {
        console.error("[ERROR] SATApp \uC778\uC2A4\uD134\uC2A4 missing");
        showToast("\uC571 \uC778\uC2A4\uD134\uC2A4\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD574\uC8FC\uC138\uC694.", "error");
        return;
      }
      try {
        this.isProcessing = true;
        console.log("[SATApp] ===== Export to PDF \uBC84\uD2BC \uD074\uB9AD\uB428 =====");
        console.log("[SATApp] \uD604\uC7AC \uD504\uB808\uC784:", window.location.href, "top?", window === window.top);
        const exportSetCount = this.promptExportSetCount();
        if (exportSetCount === null) {
          showToast("PDF \uC0DD\uC131\uC774 \uCDE8\uC18C\uB418\uC5C8\uC2B5\uB2C8\uB2E4.", "info");
          this.isProcessing = false;
          return;
        }
        button.disabled = true;
        button.classList.add("loading");
        button.textContent = "";
        const isChat = isGeminiChatPage();
        const isSAT = isSATTestPage();
        fetch("http://127.0.0.1:7243/ingest/aca9102a-5cac-4fa2-952a-4d856789ea5d", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location: "content.entry.js:handleExportClick:chatCheck", message: "handleExportClick chat block check", data: { isChat, isSAT, willEnterChatBlock: isChat && !isSAT, url: location.href }, timestamp: Date.now(), runId: "run1", hypothesisId: "A" }) }).catch(() => {
        });
        if (isChat && !isSAT) {
          showToast("SAT \uD14C\uC2A4\uD2B8 \uC694\uCCAD \uBA54\uC2DC\uC9C0 \uC785\uB825 \uC911...", "info");
          const automator = new GeminiChatAutomator();
          await automator.typeMessage(CONFIG.geminiChat.message);
          console.log("[SATApp] \uBA54\uC2DC\uC9C0 \uC804\uC1A1 \uC644\uB8CC, SAT UI \uB300\uAE30 \uC911...");
          showToast("SAT \uD14C\uC2A4\uD2B8 \uD654\uBA74\uC774 \uB098\uD0C0\uB0A0 \uB54C\uAE4C\uC9C0 \uB300\uAE30 \uC911...", "info");
          const satUIDetected = await automator.waitForSATUI();
          if (!satUIDetected) {
            throw new Error("SAT \uD14C\uC2A4\uD2B8 \uD654\uBA74\uC774 \uB098\uD0C0\uB098\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uD0C0\uC784\uC544\uC6C3\uB418\uC5C8\uC2B5\uB2C8\uB2E4.");
          }
          console.log("[SATApp] SAT UI \uC9C4\uC785 \uC644\uB8CC, \uB2E4\uC74C \uB2E8\uACC4 \uC9C4\uD589");
          showToast("SAT \uD14C\uC2A4\uD2B8 \uD654\uBA74 \uC9C4\uC785 \uC644\uB8CC!", "success");
          try {
            if (typeof app.init === "function") app.init();
          } catch (e) {
            console.warn("[SATApp] init \uC7AC\uD638\uCD9C \uC911 \uC624\uB958:", e);
          }
          await new Promise((resolve) => setTimeout(resolve, 600));
        }
        try {
          console.log("[SATApp] Export \uC804 \uC124\uC815 \uC2DC\uD000\uC2A4 \uC2E4\uD589 \uC2DC\uB3C4");
          await runSetupSequence();
        } catch (setupError) {
          console.warn("[SATApp] \uC124\uC815 \uC2DC\uD000\uC2A4 \uC2E4\uD589 \uC911 \uC624\uB958 (\uACC4\uC18D \uC9C4\uD589):", setupError);
        }
        console.log("[FRAME] selectWorkerFrame start");
        showToast("\uBB38\uC81C \uD654\uBA74 \uD504\uB808\uC784 \uCC3E\uB294 \uC911...", "info");
        console.log("[SATApp] Worker \uD504\uB808\uC784 \uCC3E\uAE30 \uC2DC\uC791");
        const worker = await findWorkerFrame();
        console.log("[FRAME] selectWorkerFrame result:", worker ? "found" : "not found", {
          frameCount: window.frames.length,
          top: window === window.top
        });
        let allData = null;
        if (!worker) {
          if (looksLikeSatQuestionUI()) {
            console.log("[SATApp] \uD604\uC7AC \uD504\uB808\uC784\uC774 \uBB38\uC81C UI\uC785\uB2C8\uB2E4. \uC774 \uD504\uB808\uC784\uC5D0\uC11C \uC791\uC5C5\uD569\uB2C8\uB2E4.");
            window.__SAT_IS_WORKER = true;
            console.log("[SATApp] \uC790\uB3D9 \uC9C4\uC785 \uC2DC\uD000\uC2A4 \uC2DC\uC791");
            showToast("\uC790\uB3D9 \uC9C4\uC785 \uC2DC\uD000\uC2A4 \uC2E4\uD589 \uC911...", "info");
            await this.navigator.handleInitialNavigation();
            console.log("[SATApp] \uC790\uB3D9 \uC9C4\uC785 \uC2DC\uD000\uC2A4 \uC644\uB8CC");
            showToast("\uBAA8\uB4E0 \uBB38\uC81C\uB97C \uC218\uC9D1\uD558\uB294 \uC911...", "info");
            console.log("[SATApp] \uBB38\uC81C \uC218\uC9D1 \uC2DC\uC791 (\uD604\uC7AC \uD504\uB808\uC784:", window.location.href, ")");
            allData = await this.scraper.collectAllProblems();
          } else {
            console.warn("[SATApp] Worker \uD504\uB808\uC784\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uD504\uB808\uC784\uC5D0\uC11C \uC2DC\uB3C4\uD569\uB2C8\uB2E4.");
            showToast("\uBB38\uC81C \uD654\uBA74 \uD504\uB808\uC784\uC744 \uCC3E\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uD504\uB808\uC784\uC5D0\uC11C \uC2DC\uB3C4\uD569\uB2C8\uB2E4.", "error");
            console.log("[SATApp] \uC790\uB3D9 \uC9C4\uC785 \uC2DC\uD000\uC2A4 \uC2DC\uC791");
            showToast("\uC790\uB3D9 \uC9C4\uC785 \uC2DC\uD000\uC2A4 \uC2E4\uD589 \uC911...", "info");
            await this.navigator.handleInitialNavigation();
            console.log("[SATApp] \uC790\uB3D9 \uC9C4\uC785 \uC2DC\uD000\uC2A4 \uC644\uB8CC");
            console.log("[FLOW] start scraper called (current frame fallback)");
            showToast("\uBAA8\uB4E0 \uBB38\uC81C\uB97C \uC218\uC9D1\uD558\uB294 \uC911...", "info");
            console.log("[SATApp] \uBB38\uC81C \uC218\uC9D1 \uC2DC\uC791 (\uD604\uC7AC \uD504\uB808\uC784:", window.location.href, ")");
            allData = await this.scraper.collectAllProblems();
          }
        } else {
          console.log("[SATApp] Worker \uD504\uB808\uC784 \uBC1C\uACAC:", worker.href);
          showToast("\uBB38\uC81C \uD654\uBA74 \uD504\uB808\uC784 \uBC1C\uACAC! \uC791\uC5C5 \uC2DC\uC791...", "success");
          console.log("[FRAME] SAT_START sent", { workerHref: worker.href, top: window === window.top });
          window.postMessage({ type: "SAT_START", workerHref: worker.href }, "*");
          allData = await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              window.removeEventListener("message", onMsg);
              reject(new Error("Worker \uD504\uB808\uC784\uC5D0\uC11C \uC218\uC9D1 \uC644\uB8CC \uBA54\uC2DC\uC9C0\uB97C \uBC1B\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4 (\uD0C0\uC784\uC544\uC6C3 5\uBD84)"));
            }, 5 * 60 * 1e3);
            function onMsg(ev) {
              if (ev?.data?.type === "SAT_COLLECTION_COMPLETE") {
                clearTimeout(timeout);
                window.removeEventListener("message", onMsg);
                console.log("[SATApp] Worker \uD504\uB808\uC784\uC5D0\uC11C \uC218\uC9D1 \uC644\uB8CC \uBA54\uC2DC\uC9C0 \uC218\uC2E0");
                resolve(ev.data.data);
              } else if (ev?.data?.type === "SAT_COLLECTION_ERROR") {
                clearTimeout(timeout);
                window.removeEventListener("message", onMsg);
                console.error("[SATApp] Worker \uD504\uB808\uC784\uC5D0\uC11C \uC218\uC9D1 \uC624\uB958:", ev.data.error);
                reject(new Error(ev.data.error));
              }
            }
            window.addEventListener("message", onMsg);
          });
        }
        console.log("[SATApp] \uBB38\uC81C \uC218\uC9D1 \uC644\uB8CC:", {
          reading: allData.reading.length,
          math: allData.math.length
        });
        if ((!allData.reading || allData.reading.length === 0) && (!allData.math || allData.math.length === 0)) {
          throw new Error("\uCD94\uCD9C\uD560 SAT \uBB38\uC81C\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.");
        }
        const totalProblems = allData.reading.length + allData.math.length;
        showToast(`${totalProblems}\uAC1C\uC758 \uBB38\uC81C\uB97C \uC218\uC9D1\uD588\uC2B5\uB2C8\uB2E4. PDF ${exportSetCount}\uC138\uD2B8 \uC0DD\uC131 \uC911...`, "info");
        for (let i = 1; i <= exportSetCount; i += 1) {
          showToast(`\uBB38\uC81C\uC9C0 PDF \uC0DD\uC131 \uC911... (${i}/${exportSetCount})`, "info");
          const problemDoc = this.pdfGenerator.generateProblemsPDF(allData);
          showToast(`\uD574\uC124\uC9C0 PDF \uC0DD\uC131 \uC911... (${i}/${exportSetCount})`, "info");
          const answerDoc = this.pdfGenerator.generateAnswersPDF(allData);
          await this.pdfGenerator.downloadPDFs(problemDoc, answerDoc, {
            copyIndex: i,
            totalCopies: exportSetCount
          });
        }
        showToast(`PDF ${exportSetCount}\uC138\uD2B8\uAC00 \uC131\uACF5\uC801\uC73C\uB85C \uC0DD\uC131\uB418\uC5C8\uC2B5\uB2C8\uB2E4!`, "success");
        button.textContent = "\u2713 Exported!";
        setTimeout(() => {
          button.textContent = "Export to PDF";
          button.disabled = false;
          button.classList.remove("loading");
          this.isProcessing = false;
        }, 2e3);
      } catch (error) {
        console.error("[ERROR] handleExportClick failed:", error);
        console.error("[ERROR] error.stack:", error.stack);
        console.error("[SATApp] PDF \uC0DD\uC131 \uC624\uB958:", error);
        let errorMessage = error.message || "\uC54C \uC218 \uC5C6\uB294 \uC624\uB958";
        if (error.message && error.message.includes("Extension context invalidated")) {
          errorMessage = "\uD655\uC7A5 \uD504\uB85C\uADF8\uB7A8\uC774 \uC7AC\uB85C\uB4DC\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD398\uC774\uC9C0\uB97C \uC0C8\uB85C\uACE0\uCE68\uD558\uACE0 \uB2E4\uC2DC \uC2DC\uB3C4\uD574\uC8FC\uC138\uC694.";
        }
        showToast(`PDF \uC0DD\uC131 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4: ${errorMessage}`, "error");
        button.disabled = false;
        button.classList.remove("loading");
        button.textContent = "Export to PDF";
        this.isProcessing = false;
      }
    }
  };
  function initButtonSafely() {
    try {
      console.log("[BOOT] initButtonSafely called", "top?", window === window.top);
      if (typeof chrome !== "undefined" && chrome.runtime && !chrome.runtime.id) {
        console.warn("[SAT-DEBUG] Extension context invalidated - \uBC84\uD2BC \uC0DD\uC131 \uC2A4\uD0B5");
        return;
      }
      if (!document.body) {
        console.log("[SAT-DEBUG] document.body\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. 100ms \uD6C4 \uC7AC\uC2DC\uB3C4...");
        setTimeout(() => initButtonSafely(), 100);
        return;
      }
      const isChatPage = isGeminiChatPage();
      const isSATPage = isSATTestPage();
      if (isChatPage && !isSATPage) {
        const existingExportBtn = document.getElementById("gemini-sat-pdf-export-btn");
        if (existingExportBtn) {
          console.log("[BOOT] exportButtonInserted (existing, chat page)", existingExportBtn.id);
          existingExportBtn.style.display = "block";
          existingExportBtn.style.visibility = "visible";
          existingExportBtn.style.opacity = "1";
          existingExportBtn.style.zIndex = "2147483647";
          return;
        }
      } else {
        const existingBtn = document.getElementById("gemini-sat-pdf-export-btn");
        if (existingBtn) {
          console.log("[BOOT] buttonInserted (existing)", existingBtn.id, "visible?", window.getComputedStyle(existingBtn).display !== "none");
          existingBtn.style.display = "block";
          existingBtn.style.visibility = "visible";
          existingBtn.style.opacity = "1";
          existingBtn.style.zIndex = "2147483647";
          return;
        }
      }
      console.log("[BOOT] about to create button (initButtonSafely)");
      const app = window.satApp || new SATApp2();
      window.satApp = app;
      app.init();
      console.log("[BOOT] initButtonSafely completed");
    } catch (error) {
      console.error("[BOOT] initButtonSafely error:", error);
      setTimeout(() => initButtonSafely(), 1e3);
    }
  }

  // content.js
  window.html2canvas = import_html2canvas.default;
  var BUILD_TS = Date.now();
  console.log("[BOOT] dist/content.js loaded BUILD_TS=" + BUILD_TS, location.href, "top?", window === window.top);
  window.__SAT_BOOT_TS__ = BUILD_TS;
  window.__SAT_BUILD_TS__ = BUILD_TS;
  (function() {
    "use strict";
    setupFrameMessageListener();
    console.log("[BOOT] creating SATApp instance", "top?", window === window.top);
    const app = new SATApp2();
    window.satApp = app;
    window.__SAT_APP = app;
    window.SATApp = SATApp2;
    window.PDFGenerator = PDFGenerator;
    console.log("[BOOT] calling initButtonSafely", "top?", window === window.top);
    initButtonSafely();
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => {
        console.log("[SAT PDF Exporter] DOMContentLoaded - \uBC84\uD2BC \uC0DD\uC131");
        app.init();
      });
    }
    const zombieButtonObserver = new MutationObserver(() => {
      try {
        if (typeof chrome !== "undefined" && chrome.runtime && !chrome.runtime.id) {
          return;
        }
        const button = document.getElementById("gemini-sat-pdf-export-btn");
        if (!button && document.body) {
          console.log("[SAT-DEBUG] [Zombie Button] \uBC84\uD2BC\uC774 \uC0AC\uB77C\uC9D0 \uAC10\uC9C0 - \uC989\uC2DC \uBD80\uD65C (0.5\uCD08 \uB0B4)");
          setTimeout(() => {
            try {
              initButtonSafely();
            } catch (error) {
              console.error("[SAT-DEBUG] [Zombie Button] \uBC84\uD2BC \uC7AC\uC0DD\uC131 \uC2E4\uD328:", error);
            }
          }, 500);
        } else if (button) {
          const computedStyle = window.getComputedStyle(button);
          if (computedStyle.display === "none" || computedStyle.visibility === "hidden" || computedStyle.opacity === "0") {
            console.log("[SAT PDF Exporter] [Zombie Button] \uBC84\uD2BC\uC774 \uC228\uACA8\uC838 \uC788\uC74C - \uC2A4\uD0C0\uC77C \uAC15\uC81C \uC801\uC6A9");
            button.style.display = "block";
            button.style.visibility = "visible";
            button.style.opacity = "1";
            button.style.zIndex = "2147483647";
          }
        }
      } catch (error) {
        console.error("[SAT PDF Exporter] [Zombie Button] \uC624\uB958 (\uC2A4\uD06C\uB9BD\uD2B8\uB294 \uACC4\uC18D \uC2E4\uD589):", error);
      }
    });
    if (document.documentElement) {
      zombieButtonObserver.observe(document.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"]
      });
      console.log("[SAT PDF Exporter] [Zombie Button] document.documentElement \uB808\uBCA8 \uAD00\uCC30 \uC2DC\uC791");
    }
    const observer = new MutationObserver((mutations) => {
      try {
        if (typeof chrome !== "undefined" && chrome.runtime && !chrome.runtime.id) {
          return;
        }
        const button = document.getElementById("gemini-sat-pdf-export-btn");
        if (!button && document.body) {
          console.log("[SAT PDF Exporter] \uBC84\uD2BC\uC774 \uC5C6\uC5B4\uC11C \uC7AC\uC0DD\uC131\uD569\uB2C8\uB2E4.");
          app.init();
        }
      } catch (error) {
        console.error("[SAT PDF Exporter] Observer \uC624\uB958:", error);
      }
    });
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    } else {
      const bodyObserver = new MutationObserver(() => {
        if (document.body) {
          observer.observe(document.body, {
            childList: true,
            subtree: true
          });
          bodyObserver.disconnect();
        }
      });
      bodyObserver.observe(document.documentElement, {
        childList: true,
        subtree: true
      });
    }
    setInterval(() => {
      try {
        if (typeof chrome !== "undefined" && chrome.runtime && !chrome.runtime.id) {
          console.warn("[SAT PDF Exporter] Extension context invalidated - \uC8FC\uAE30\uC801 \uD655\uC778 \uC2A4\uD0B5");
          return;
        }
        const button = document.getElementById("gemini-sat-pdf-export-btn");
        if (!button && document.body) {
          console.log("[SAT PDF Exporter] \uC8FC\uAE30\uC801 \uD655\uC778 - \uBC84\uD2BC \uC7AC\uC0DD\uC131");
          app.init();
        } else if (button) {
          const computedStyle = window.getComputedStyle(button);
          if (computedStyle.display === "none" || computedStyle.visibility === "hidden" || computedStyle.opacity === "0") {
            console.log("[SAT PDF Exporter] \uBC84\uD2BC\uC774 \uC228\uACA8\uC838 \uC788\uC74C - \uC2A4\uD0C0\uC77C \uAC15\uC81C \uC801\uC6A9");
            button.style.display = "block";
            button.style.visibility = "visible";
            button.style.opacity = "1";
            button.style.zIndex = "2147483647";
          }
        }
      } catch (error) {
        console.error("[SAT PDF Exporter] \uC8FC\uAE30\uC801 \uD655\uC778 \uC624\uB958 (\uC2A4\uD06C\uB9BD\uD2B8\uB294 \uACC4\uC18D \uC2E4\uD589):", error);
      }
    }, 2e3);
  })();
})();
/*! Bundled license information:

html2canvas/dist/html2canvas.js:
  (*!
   * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
   * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
   * Released under MIT License
   *)
  (*! *****************************************************************************
      Copyright (c) Microsoft Corporation.
  
      Permission to use, copy, modify, and/or distribute this software for any
      purpose with or without fee is hereby granted.
  
      THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
      REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
      AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
      INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
      LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
      OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
      PERFORMANCE OF THIS SOFTWARE.
      ***************************************************************************** *)
*/
//# sourceMappingURL=content.js.map
