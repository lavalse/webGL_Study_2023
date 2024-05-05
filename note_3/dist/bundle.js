/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.demo_1 = void 0;
var webglUtils_1 = __webpack_require__(2);
function demo_1() {
    var canvas = document.getElementById("webGL_Demo_1");
    var gl = canvas.getContext("webgl");
    //vertexShader, fragmentShader
    var vertexSource = "\n  attribute vec2 a_position;\n  attribute vec3 a_vertexColor;\n  varying vec3 v_vertexColor;\n  void main(){\n    v_vertexColor = a_vertexColor;\n    gl_Position = vec4(a_position,0.0,1.0);\n    gl_PointSize = 10.0;\n  }\n  ";
    var fragmentSource = "\n  precision mediump float;\n  varying vec3 v_vertexColor;\n  \n  void main(){\n    gl_FragColor = vec4(v_vertexColor,1.0);\n  }\n  ";
    var webGLProgram = (0, webglUtils_1.initShaders)(gl, vertexSource, fragmentSource);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    // const vertices = [
    //   -0.5,0.0,1.0,0.0,0.0,
    //   0.5,0.0,0.0,1.0,0.0,
    //   0.0,0.8,0.0,0.0,1.0
    // ];
    var vertices = [];
    var count = 10;
    for (var i = 0; i < count; i++) {
        var x = Math.random() * 2 - 1;
        var y = Math.random() * 2 - 1;
        var r = Math.random();
        var g = Math.random();
        var b = Math.random();
        vertices.push(x, y, r, g, b);
    }
    var vertices32 = new Float32Array(vertices);
    var FSIZE = vertices32.BYTES_PER_ELEMENT;
    //创建buffer，然后来使用buffer
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices32, gl.STATIC_DRAW);
    var a_position = gl.getAttribLocation(webGLProgram, "a_position");
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 5 * FSIZE, 0);
    var a_vertexColor = gl.getAttribLocation(webGLProgram, "a_vertexColor");
    gl.vertexAttribPointer(a_vertexColor, 3, gl.FLOAT, false, 5 * FSIZE, 2 * FSIZE);
    gl.enableVertexAttribArray(a_position);
    gl.enableVertexAttribArray(a_vertexColor);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, count);
}
exports.demo_1 = demo_1;


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.initShaders = void 0;
function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    if (!shader) {
        console.error("Unable to create shader.");
        return null;
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}
function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (linked) {
        return program;
    }
    else {
        var error = gl.getProgramInfoLog(program);
        console.log("link program error:" + error);
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteBuffer(fragmentShader);
        return null;
    }
}
function initShaders(gl, vertexSource, fragmentSource) {
    var vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    var fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
    var program = createProgram(gl, vertexShader, fragmentShader);
    if (program) {
        gl.useProgram(program);
        return program;
    }
    else {
        console.log("fail to init shaders");
        return false;
    }
}
exports.initShaders = initShaders;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.demo_2 = void 0;
var webglUtils_1 = __webpack_require__(2);
function demo_2() {
    var canvas = document.getElementById("webGL_Demo_2");
    var gl = canvas.getContext("webgl");
    //vertexShader, fragmentShader
    var vertexSource = "\n  attribute vec2 a_position;\n  attribute vec3 a_vertexColor;\n  varying vec3 v_vertexColor;\n  void main(){\n    v_vertexColor = a_vertexColor;\n    gl_Position = vec4(a_position,0.0,1.0);\n    gl_PointSize = 10.0;\n  }\n  ";
    var fragmentSource = "\n  precision mediump float;\n  varying vec3 v_vertexColor;\n  \n  void main(){\n    gl_FragColor = vec4(v_vertexColor,1.0);\n  }\n  ";
    var webGLProgram = (0, webglUtils_1.initShaders)(gl, vertexSource, fragmentSource);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    var vertices = [
        -0.5, 0.0, 1.0, 0.0, 0.0,
        0.5, 0.0, 0.0, 1.0, 0.0,
        0.0, 0.8, 0.0, 0.0, 1.0
    ];
    var vertices32 = new Float32Array(vertices);
    var FSIZE = vertices32.BYTES_PER_ELEMENT;
    //创建buffer，然后来使用buffer
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices32, gl.STATIC_DRAW);
    var a_position = gl.getAttribLocation(webGLProgram, "a_position");
    gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 5 * FSIZE, 0);
    var a_vertexColor = gl.getAttribLocation(webGLProgram, "a_vertexColor");
    gl.vertexAttribPointer(a_vertexColor, 3, gl.FLOAT, false, 5 * FSIZE, 2 * FSIZE);
    gl.enableVertexAttribArray(a_position);
    gl.enableVertexAttribArray(a_vertexColor);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
}
exports.demo_2 = demo_2;


/***/ })
/******/ 	]);
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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
var random_points_in_buffers_1 = __webpack_require__(1);
var transform_matrix_1 = __webpack_require__(3);
(0, random_points_in_buffers_1.demo_1)();
(0, transform_matrix_1.demo_2)();

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map