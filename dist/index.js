(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["PIPTester"] = factory();
	else
		root["PIPTester"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ray = __webpack_require__(1);

var _ray2 = _interopRequireDefault(_ray);

var _webgl = __webpack_require__(2);

var _webgl2 = _interopRequireDefault(_webgl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TESTERS = {
  ray: _ray2.default,
  webgl: _webgl2.default
};

var PIPTester = function () {
  function PIPTester(opts) {
    _classCallCheck(this, PIPTester);

    this.opts = opts;
    this.points = opts.points || [];
    this.mode = opts.mode || 'webgl';
    this.boundingRect = {
      xMin: 0,
      xMax: 0,
      yMin: 0,
      yMax: 0
    };

    this._setBoundingRect();
    var TESTER = TESTERS[this.mode];
    if (TESTER) {
      var modeOpts = opts[this.mode] || {};
      this.tester = new TESTER(_extends({
        points: this.points,
        boundingRect: this.boundingRect
      }, modeOpts));
    }
  }

  _createClass(PIPTester, [{
    key: '_setBoundingRect',
    value: function _setBoundingRect() {
      var _this = this;

      this.points.forEach(function (point) {
        if (point.x < _this.boundingRect.xMin) {
          _this.boundingRect.xMin = point.x;
        } else if (point.x > _this.boundingRect.xMax) {
          _this.boundingRect.xMax = point.x;
        }

        if (point.y < _this.boundingRect.yMin) {
          _this.boundingRect.yMin = point.y;
        } else if (point.y > _this.boundingRect.yMax) {
          _this.boundingRect.yMax = point.y;
        }
      });
    }
  }, {
    key: 'boundingRectTest',
    value: function boundingRectTest(point) {
      var _boundingRect = this.boundingRect,
          xMin = _boundingRect.xMin,
          xMax = _boundingRect.xMax,
          yMin = _boundingRect.yMin,
          yMax = _boundingRect.yMax;

      return !(point.x < xMin || point.x > xMax || point.y < yMin || point.y > yMax);
    }
  }, {
    key: 'test',
    value: function test(point) {
      if (!this.boundingRectTest(point)) {
        return false;
      }

      if (this.tester) {
        return this.tester.test(point);
      }

      return true;
    }
  }]);

  return PIPTester;
}();

exports.default = PIPTester;
module.exports = exports['default'];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RayCastingTester = function () {
  function RayCastingTester(opts) {
    _classCallCheck(this, RayCastingTester);

    this.points = opts.points;
    this.boundingRect = opts.boundingRect;
    this.epsilon = opts.e || 1.0;
    this.sides = [];

    this._createSides();
  }

  _createClass(RayCastingTester, [{
    key: "test",
    value: function test(point) {
      var _this = this;

      var startPoint = {
        x: this.boundingRect.xMin - this.epsilon,
        y: point.y
      };
      var testRay = this._createSide(startPoint, point);

      var intersections = 0;
      this.sides.forEach(function (side) {
        if (_this._isIntersect(testRay, side)) {
          intersections = intersections + 1;
        }
      });

      return (intersections & 1) === 1;
    }
  }, {
    key: "_createSides",
    value: function _createSides() {
      var len = this.points.length;
      for (var i = 0; i < len; i++) {
        var startPoint = this.points[i];
        var endPoint = this.points[(i + 1) % len];
        var side = this._createSide(startPoint, endPoint);
        this.sides.push(side);
      }
    }
  }, {
    key: "_createSide",
    value: function _createSide(sp, ep) {
      var a = ep.y - sp.y;
      var b = sp.x - ep.x;
      var c = ep.x * sp.y - sp.x * ep.y;
      return { sp: sp, ep: ep, a: a, b: b, c: c };
    }
  }, {
    key: "_isIntersect",
    value: function _isIntersect(s1, s2) {
      var NO = 0;
      var YES = 1;
      var COLLINEAR = 2;
      var d1 = void 0;
      var d2 = void 0;

      d1 = s1.a * s2.sp.x + s1.b * s2.sp.y + s1.c;
      d2 = s1.a * s2.ep.x + s1.b * s2.ep.y + s1.c;

      if (d1 > 0 && d2 > 0) {
        return NO;
      }
      if (d1 < 0 && d2 < 0) {
        return NO;
      }

      d1 = s2.a * s1.sp.x + s2.b * s1.sp.y + s2.c;
      d2 = s2.a * s1.ep.x + s2.b * s1.ep.y + s2.c;
      if (d1 > 0 && d2 > 0) {
        return NO;
      }
      if (d1 < 0 && d2 < 0) {
        return NO;
      }

      if (s1.a * s2.b - s2.a * s1.b < 0.00001) {
        return COLLINEAR;
      }

      return YES;
    }
  }]);

  return RayCastingTester;
}();

exports.default = RayCastingTester;
module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _utils = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var VSHADER_SOURCE = 'attribute vec4 a_Position;\n' + 'void main() {\n' + ' gl_Position = a_Position;\n' + '}\n';

var FSHADER_SOURCE = 'void main() {\n' + ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + '}\n';

function webGLWarn(msg) {
  (0, _utils.warn)('WebGL tester:' + msg);
}

var WebGLTester = function () {
  function WebGLTester(opts) {
    _classCallCheck(this, WebGLTester);

    this.points = opts.points;
    this.boundingRect = opts.boundingRect;
    this.vertices = [];

    if (this.points.length < 3) {
      webGLWarn('make sure to provide 3 points at least.');
      return;
    }

    this.width = this.boundingRect.xMax - this.boundingRect.xMin;
    this.height = this.boundingRect.yMax - this.boundingRect.yMin;

    this._createVertices();
    this._init();
  }

  _createClass(WebGLTester, [{
    key: 'test',
    value: function test(point) {
      if (!this.gl) {
        webGLWarn('Failed to test.');
        return;
      }

      var gl = this.gl;
      var nP = this._clipWithBoundingRect(point);

      var y = this.height - nP.y;
      var pixels = new Uint8Array(4);
      gl.readPixels(nP.x, y, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

      return pixels[0] === 255;
    }
  }, {
    key: '_init',
    value: function _init() {
      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;

      var gl = (0, _utils.getWebGLContext)(canvas, {
        preserveDrawingBuffer: true
      });
      if (!gl) {
        return;
      }

      if (!(0, _utils.initShaders)(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        return;
      }

      this.gl = gl;

      this._initVertexBuffers();

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      this._draw();
    }
  }, {
    key: '_draw',
    value: function _draw() {
      var gl = this.gl;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, this.points.length);
    }
  }, {
    key: '_initVertexBuffers',
    value: function _initVertexBuffers() {
      var gl = this.gl;
      var vertices = new Float32Array(this.vertices);
      var n = vertices.length / 2;

      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        return -1;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
      var aPosition = gl.getAttribLocation(gl.program, 'a_Position');
      gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(aPosition);

      return n;
    }
  }, {
    key: '_createVertices',
    value: function _createVertices() {
      var _this = this;

      this.points.forEach(function (point) {
        var temp = _this._normalize(_this._clipWithBoundingRect(point));
        _this.vertices.push(temp.x);
        _this.vertices.push(temp.y);
      });
    }
  }, {
    key: '_clipWithBoundingRect',
    value: function _clipWithBoundingRect(point) {
      var _boundingRect = this.boundingRect,
          xMin = _boundingRect.xMin,
          yMin = _boundingRect.yMin;

      return {
        x: point.x - xMin,
        y: point.y - yMin
      };
    }
  }, {
    key: '_normalize',
    value: function _normalize(point) {
      var halfWidth = this.width / 2;
      var halfHeight = this.height / 2;
      return {
        x: (point.x - halfWidth) / halfWidth,
        y: (halfHeight - point.y) / halfHeight
      };
    }
  }]);

  return WebGLTester;
}();

exports.default = WebGLTester;
module.exports = exports['default'];

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.warn = warn;
exports.setupWebGL = setupWebGL;
exports.initShaders = initShaders;
exports.createProgram = createProgram;
exports.loadShader = loadShader;
exports.getWebGLContext = getWebGLContext;
function warn(msg) {
  window.console.log(msg);
}

function setupWebGL(canvas, attribs, onError) {
  onError = onError || warn;

  if (canvas.addEventListener) {
    canvas.addEventListener('webglcontextcreationerror', function (event) {
      onError(event.statusMessage);
    }, false);
  }
  var context = create3DContext(canvas, attribs);
  if (!context) {
    if (!window.WebGLRenderingContext) {
      onError('');
    } else {
      onError('');
    }
  }

  return context;
}

function create3DContext(canvas, attribs) {
  var names = ['webgl', 'experimental-webgl', 'webkit-3d', 'moz-webgl'];
  var context = null;
  for (var i = 0; i < names.length; ++i) {
    try {
      context = canvas.getContext(names[i], attribs);
    } catch (e) {}
    if (context) {
      break;
    }
  }

  return context;
}

function initShaders(gl, vshader, fshader) {
  var program = createProgram(gl, vshader, fshader);
  if (!program) {
    warn('Failed to create program');
    return false;
  }

  gl.useProgram(program);
  gl.program = program;

  return true;
}

function createProgram(gl, vshader, fshader) {
  var vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  var fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  var program = gl.createProgram();
  if (!program) {
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  gl.linkProgram(program);

  var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    var error = gl.getProgramInfoLog(program);
    warn('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }

  return program;
}

function loadShader(gl, type, source) {
  var shader = gl.createShader(type);
  if (shader == null) {
    warn('unable to create shader');
    return null;
  }

  gl.shaderSource(shader, source);

  gl.compileShader(shader);

  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    warn('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function getWebGLContext(canvas, attribs, debug) {
  var gl = setupWebGL(canvas, attribs);
  if (!gl) {
    return null;
  }

  return gl;
}

/***/ })
/******/ ]);
});