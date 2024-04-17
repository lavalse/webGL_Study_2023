console.log("webGL is ready");

main();

//结果发现为了帮助自己学习和开发，TS是现在就必须引入的技术！

function main(){

  //create shader function
let createShader = (gl, type, source) => {
  let shader = gl.createShader(type);
  gl.shaderSource(shader,source);
  gl.compileShader(shader);
  
  let compiled = gl.getShaderParameter(shader,gl.COMPILE_STATUS)
  if(compiled){
    return shader
  }else{
    let error = gl.getShaderInfoLog(shader);
    console.log("compile shaders error: "+ error);
    gl.deleteShader(shader);
    return null;
  }
}

//create program function
let createProgram = (gl, vertexShader, fragmentShader)=>{
  let program = gl.createProgram();
  gl.attachShader(program,vertexShader);
  gl.attachShader(program,fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);
}

  let canvas = document.createElement("canvas");
  document.querySelector("body").appendChild(canvas);
  let gl = canvas.getContext("webgl");

  //vertexShader, fragmentShader
  let vertexSource = `
    void main(){
      gl_Position = vec4(0.0,0.0,0.0,1.0);
      gl_PointSize = 10.0;
    }
  `
  let fragmentSource = `
    void main(){
      gl_FragColor = vec4(1.0,0.0,0.0,1.0);
    }
  `;

  let vertexShader = createShader(gl,gl.VERTEX_SHADER,vertexSource);
  let fragmentShader = createShader(gl,gl.FRAGMENT_SHADER,fragmentSource);

  createProgram(gl, vertexShader, fragmentShader);
  

  gl.clearColor(0.0,0.0,0.0,1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);

  
}