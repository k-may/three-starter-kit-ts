import THREE = require('three');

import Scene = THREE.Scene;
import WebGLRenderTarget = THREE.WebGLRenderTarget;
import Camera = THREE.Camera;
import PerspectiveCamera = THREE.PerspectiveCamera;
import Renderer = THREE.Renderer;
import WebGLRenderer = THREE.WebGLRenderer;
import View = require("./view");
import ShaderData = require("../data/shader_data");
/**
 * Created by kevin.mayo on 2/13/2017.
 */


class RenderView extends View {

  renderBuffer: WebGLRenderTarget;
  renderScene: Scene;
  camera: Camera;
  canvas: HTMLCanvasElement;
  shaderData: ShaderData;
  loaded: boolean = false;
  renderer: WebGLRenderer;

  scene: Scene;

  constructor() {
    super();

    this.camera = new PerspectiveCamera(70, window.innerWidth, window.innerHeight);

    this.renderBuffer = new WebGLRenderTarget(200, 200, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBFormat
    });
    this.renderScene = new Scene();

  }

  onResize(width: number, height: number): void {
    super.onResize(width, height);

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);

  }


  draw(time: number): void {
    super.draw(time);

    this.renderer.clear();
    this.renderer.render(this.renderScene, this.camera, this.renderBuffer, true);

    this.renderer.render(this.scene, this.camera);
  }
}

export = RenderView;
