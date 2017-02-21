import * as THREE from 'three';
import View = require("./view");
import ShaderData = require("../data/shader_data");

/**
 * Created by kev on 15-09-30.
 */

class ShaderView extends View {

    canvas:HTMLCanvasElement;
    shaderData:ShaderData;
    loaded:boolean = false;
    renderer : THREE.Renderer;

    constructor() {
        super();

        this.renderer = new THREE.WebGLRenderer();

        this.canvas = this.renderer.domElement;
        this.el.setAttribute("class", "shader__cont");
        this.el.appendChild(this.canvas);

        this.createShaderData();

        var self = this;
        this.shaderData.start().then(function () {
            self.loaded = true;
            self.onResize(self.width, self.height);
        });
    }

    createShaderData():void {
        this.shaderData = new ShaderData("fragment");
    }

    onResize(width:number, height:number):void {
        super.onResize(width, height);
        this.renderer.setSize(width, height);
    }

    draw(time:number):void {
        super.draw(time);

        if (!this.loaded) {
            return;
        }

        this.shaderData.update(this.width, this.height);
        this.shaderData.render(this.renderer);
    }
}

export = ShaderView;
