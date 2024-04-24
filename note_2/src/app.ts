import { initShaders  } from './webglUtils';

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("webGL") ;

let gl: WebGLRenderingContext = <WebGLRenderingContext> canvas.getContext("webgl");

//vertexShader, fragmentShader
let vertexSource = `
attribute vec2 a_position;
attribute float a_size;

void main(){
  gl_Position = vec4(a_position,0.0,1.0);
  gl_PointSize = a_size;
}
`;

let fragmentSource = `
void main(){
  gl_FragColor = vec4(1.0,0.0,0.0,1.0);
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

  const a_size = gl.getAttribLocation(webGLProgram, "a_size");
  gl.vertexAttrib1f(a_size, size);

  gl.drawArrays(gl.POINTS, 0, 1);
}
