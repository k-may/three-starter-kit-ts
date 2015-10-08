///<reference path="view.ts"/>
///<reference path="../data/shader_data.ts"/>
///<reference path="../../../typings/threejs/three.d.ts"/>

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

        var _this = this;
        this.shaderData.start().then(function () {
            _this.loaded = true;
            _this.onResize(_this.width, _this.height);
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