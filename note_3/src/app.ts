import { initShaders  } from './webglUtils';

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("webGL") ;

let gl: WebGLRenderingContext = <WebGLRenderingContext> canvas.getContext("webgl");

//vertexShader, fragmentShader
let vertexSource = `
attribute vec2 a_position;

void main(){
  gl_Position = vec4(a_position,0.0,1.0);
  gl_PointSize = 10.0;
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

const vertices = [
  -0.5,0.0,
  0.5,0.0,
  0.5,0.5
];

const vertices32 = new Float32Array(vertices);

const buffer = gl.createBuffer();

gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

gl.bufferData(gl.ARRAY_BUFFER, vertices32, gl.STATIC_DRAW);

const a_position = gl.getAttribLocation(webGLProgram,"a_position");
gl.vertexAttribPointer(
  a_position,
  2,
  gl.FLOAT,
  false,
  0,
  0
);

gl.enableVertexAttribArray(a_position);

gl.drawArrays(gl.TRIANGLES, 0, 3);

