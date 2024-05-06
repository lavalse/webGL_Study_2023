import img from "../source/cat_512x512.jpg"
import { draw } from "./drawContent";

export function initTexture(gl:WebGLRenderingContext, program:WebGLProgram){

  let texture = gl.createTexture();
  let u_sampler = gl.getUniformLocation(program, "u_sampler");

  let image = new Image()
  image.src = img;

  image.onload = function(){
    console.log("image loaded");

    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

    gl.uniform1i(u_sampler, 0);

    draw(gl);

  }

}