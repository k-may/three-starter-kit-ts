///<reference path="view.ts"/>
///<reference path="../data/shader_data.ts"/>
///<reference path="../../../typings/threejs/three.d.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
 * Created by kev on 15-09-30.
 */
var ShaderView = (function (_super) {
    __extends(ShaderView, _super);
    function ShaderView() {
        _super.call(this);
        this.loaded = false;
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
    ShaderView.prototype.createShaderData = function () {
        this.shaderData = new ShaderData("fragment");
    };
    ShaderView.prototype.onResize = function (width, height) {
        _super.prototype.onResize.call(this, width, height);
        this.renderer.setSize(width, height);
    };
    ShaderView.prototype.draw = function (time) {
        _super.prototype.draw.call(this, time);
        if (!this.loaded) {
            return;
        }
        this.shaderData.update(this.width, this.height);
        this.shaderData.render(this.renderer);
    };
    return ShaderView;
})(View);
//# sourceMappingURL=shader_view.js.map