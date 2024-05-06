export function draw(gl:WebGLRenderingContext){

  //draw content
  gl.clearColor(0.0,0.0,0.0,1.0);
  gl.clear(gl.COLOR_BUFFER_BIT); 
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

}