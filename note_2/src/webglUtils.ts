 function createShader(gl: WebGLRenderingContext, type: GLenum, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
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


 function createProgram(gl: WebGLRenderingContext, vertexShader:WebGLShader, fragmentShader:WebGLShader): WebGLProgram|null{
  const program = <WebGLProgram>gl.createProgram();
  gl.attachShader(program,vertexShader);
  gl.attachShader(program,fragmentShader);
  gl.linkProgram(program);

  const linked = gl.getProgramParameter(program, gl.LINK_STATUS)
  if(linked){
    return program;
  }else{
    const error = gl.getProgramInfoLog(program);
    console.log("link program error:" + error);
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteBuffer(fragmentShader);
    return null
  }
}

export function initShaders(gl: WebGLRenderingContext, vertexSource:string, fragmentSource:string):WebGLProgram|null{

  const vertexShader = <WebGLShader>createShader (gl, gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = <WebGLShader>createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

  const program = createProgram(gl, vertexShader, fragmentShader);

  if(program){
    gl.useProgram(program);
    return program;
  }else{
    console.log("fail to init shaders");
    return false
  }
}