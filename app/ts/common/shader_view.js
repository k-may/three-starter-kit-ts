var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'three', "./view", "../data/shader_data"], function (require, exports, THREE, View, ShaderData) {
    "use strict";
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
            var self = this;
            this.shaderData.start().then(function () {
                self.loaded = true;
                self.onResize(self.width, self.height);
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
    }(View));
    return ShaderView;
});
//# sourceMappingURL=shader_view.js.map