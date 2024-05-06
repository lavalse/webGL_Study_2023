import { initShaders } from "../components/webglUtils";
import { createBuffer } from "../components/createBuffer";
import { initTexture } from "../components/initTexture";

export function demo_3 (){
  let canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("webGL_Demo_3") ;
  let gl: WebGLRenderingContext = <WebGLRenderingContext> canvas.getContext("webgl");

  let vertexShader: string = require("../shaders/vertexShader.vert.glsl")

  let fragmentShader: string = require('../shaders/fragmentShader.frag.glsl')

  let webGLProgram = <WebGLProgram> initShaders(gl, vertexShader, fragmentShader);

  createBuffer(gl,webGLProgram);

  initTexture(gl, webGLProgram);


}