import { initShaders  } from './webglUtils';

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("webGL") ;

let gl: WebGLRenderingContext = <WebGLRenderingContext> canvas.getContext("webgl");

//vertexShader, fragmentShader
let vertexSource = `
attribute vec2 a_position;
attribute vec3 a_vertexColor;
varying vec3 v_vertexColor;
void main(){
  v_vertexColor = a_vertexColor;
  gl_Position = vec4(a_position,0.0,1.0);
  gl_PointSize = 10.0;
}
`;

let fragmentSource = `
precision mediump float;
varying vec3 v_vertexColor;

void main(){
  gl_FragColor = vec4(v_vertexColor,1.0);
}
`;

const webGLProgram = <WebGLProgram>initShaders(gl,vertexSource,fragmentSource);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

// const vertices = [
//   -0.5,0.0,1.0,0.0,0.0,
//   0.5,0.0,0.0,1.0,0.0,
//   0.0,0.8,0.0,0.0,1.0
// ];

let vertices: number[] = [];
const count = 10;

for(let i=0; i< count; i++){
  let x = Math.random() * 2 - 1;
  let y = Math.random() * 2 - 1;
  let r = Math.random();
  let g = Math.random();
  let b = Math.random();

  vertices.push(x,y,r,g,b);
}

const vertices32 = new Float32Array(vertices);

const FSIZE = vertices32.BYTES_PER_ELEMENT;

//创建buffer，然后来使用buffer

const buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

gl.bufferData(gl.ARRAY_BUFFER, vertices32, gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(webGLProgram,"a_position");

gl.vertexAttribPointer(
  a_position,
  2,
  gl.FLOAT,
  false,
  5 * FSIZE,
  0
);

const a_vertexColor = gl.getAttribLocation(webGLProgram,"a_vertexColor");

gl.vertexAttribPointer(
  a_vertexColor,
  3,
  gl.FLOAT,
  false,
  5 * FSIZE,
  2 * FSIZE
);

gl.enableVertexAttribArray(a_position);
gl.enableVertexAttribArray(a_vertexColor);

gl.drawArrays(gl.TRIANGLE_STRIP, 0, count);

