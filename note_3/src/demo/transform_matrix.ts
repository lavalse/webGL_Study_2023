import { initShaders  } from '../components/webglUtils';
import { mat4 } from 'gl-matrix';

export function demo_2 (){
  let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("webGL_Demo_2") ;

  let gl: WebGLRenderingContext = <WebGLRenderingContext> canvas.getContext("webgl");
  
  //vertexShader, fragmentShader
  let vertexSource = `
  attribute vec2 a_position;
  attribute vec3 a_vertexColor;
  varying vec3 v_vertexColor;
  uniform mat4 u_tMatrix;
  uniform mat4 u_rMatrix;
  uniform mat4 u_sMatrix;

  void main(){
    mat4 modelMatrix = u_tMatrix * u_rMatrix * u_sMatrix;
    v_vertexColor = a_vertexColor;
    gl_Position = modelMatrix * vec4(a_position,0.0,1.0);
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
  
  const vertices = [
    //x,   y,   r,  g,   b
    -0.5, 0.0, 1.0, 0.0, 0.0,
    0.5,  0.0, 0.0, 1.0, 0.0,
    0.0,  0.8, 0.0, 0.0, 1.0
  ];
  
  
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

  

  let tMatrix = mat4.create();
  let rMatrix = mat4.create();
  let sMatrix = mat4.create();

  const u_tMatrix = gl.getUniformLocation(webGLProgram,"u_tMatrix");
  const u_rMatrix = gl.getUniformLocation(webGLProgram,"u_rMatrix");
  const u_sMatrix = gl.getUniformLocation(webGLProgram,"u_sMatrix");

  tick();
  let counter = 0;

  function tick(){
    requestAnimationFrame(tick);
    counter += 0.005;
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT); 

    mat4.rotate(rMatrix, rMatrix, 0.1/180*Math.PI, [0,0,1]);
    mat4.fromTranslation(tMatrix,[Math.sin(counter),-0.3,0.0])
    gl.uniformMatrix4fv(u_rMatrix, false, rMatrix);
    gl.uniformMatrix4fv(u_sMatrix, false, sMatrix);
    gl.uniformMatrix4fv(u_tMatrix, false, tMatrix);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3);
    gl.drawArrays(gl.POINTS,0,3)

    
  }

}