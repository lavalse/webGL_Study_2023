import { createShader  } from './createShader';

let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("webGL") ;

let gl: WebGLRenderingContext = <WebGLRenderingContext> canvas.getContext("webgl");

//vertexShader, fragmentShader
let vertexSource = `
void main(){
  gl_Position = vec4(0.0,0.0,0.0,1.0);
  gl_PointSize = 10.0;
}
`;

let fragmentSource = `
void main(){
  gl_FragColor = vec4(1.0,0.0,0.0,1.0);
}
`;

let vertexShader = createShader(gl,gl.VERTEX_SHADER,vertexSource);
let fragmentShader = createShader(gl,gl.FRAGMENT_SHADER,fragmentSource);

gl.clearColor(0.0,0.0,0.0,1.0);
gl.clear(gl.COLOR_BUFFER_BIT);

gl.drawArrays(gl.POINTS, 0, 1);