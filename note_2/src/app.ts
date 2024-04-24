import { initShaders  } from './webglUtils';

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("webGL") ;

let gl: WebGLRenderingContext = <WebGLRenderingContext> canvas.getContext("webgl");

//vertexShader, fragmentShader
let vertexSource = `
attribute vec2 a_position;
uniform float u_size;
varying vec2 v_position;

void main(){
  v_position = a_position;
  gl_Position = vec4(a_position,0.0,1.0);
  gl_PointSize = u_size;
}
`;

let fragmentSource = `
precision mediump float;
uniform vec3 u_color;
varying vec2 v_position;

void main(){
  gl_FragColor = vec4(u_color.x,v_position,1.0);
}
`;

const webGLProgram = <WebGLProgram>initShaders(gl,vertexSource,fragmentSource);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

let x = 0;
let y = 0;
let r = 0.5;
let n = 1000;
let size = 0;
for(let i=0; i<n; i++){
  r = i/n;
  x = Math.sin(i) * r;
  y = Math.cos(i) * r;
  size = i / n * 8;
  const a_position = gl.getAttribLocation(webGLProgram, "a_position");
  gl.vertexAttrib2f(a_position, x, y);

  const u_size = gl.getUniformLocation(webGLProgram, "u_size");
  gl.uniform1f(u_size, size);

  const u_color = gl.getUniformLocation(webGLProgram,"u_color");
  gl.uniform3f(u_color,1.0,0.0,0.0);

  gl.drawArrays(gl.POINTS, 0, 1);
}
