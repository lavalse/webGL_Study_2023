
export function createBuffer(
  gl: WebGLRenderingContext,
  program: WebGLProgram
){

  //create vertex position arrary
  let vertices = new Float32Array([
    -0.5, -0.5, 0.0,
    -0.5, 0.5, 0.0,
    0.5, -0.5, 0.0,
    0.5, 0.5, 0.0
  ])
  const FSIZE = vertices.BYTES_PER_ELEMENT;

  let uvs = new Float32Array([
    0.0, 0.0,
    0.0, 1.0,
    1.0, 0.0,
    1.0, 1.0
  ])

  
  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  let a_position = gl.getAttribLocation(program, "a_position");
  gl.vertexAttribPointer(a_position, 3, gl.FLOAT, false, FSIZE*3, 0);
  gl.enableVertexAttribArray(a_position);

  const uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW);

  let a_uv = gl.getAttribLocation(program, "a_uv");
  gl.vertexAttribPointer(a_uv, 2, gl.FLOAT, false, FSIZE*2, 0);
  gl.enableVertexAttribArray(a_uv);
}