var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", 'three', "./view"], function (require, exports, THREE, View) {
    "use strict";
    var Scene = THREE.Scene;
    var WebGLRenderTarget = THREE.WebGLRenderTarget;
    var PerspectiveCamera = THREE.PerspectiveCamera;
    /**
     * Created by kevin.mayo on 2/13/2017.
     */
    var RenderView = (function (_super) {
        __extends(RenderView, _super);
        function RenderView() {
            _super.call(this);
            this.loaded = false;
            this.camera = new PerspectiveCamera(70, window.innerWidth, window.innerHeight);
            this.renderBuffer = new WebGLRenderTarget(200, 200, {
                minFilter: THREE.LinearFilter,
                magFilter: THREE.NearestFilter,
                format: THREE.RGBFormat
            });
            this.renderScene = new Scene();
        }
        RenderView.prototype.onResize = function (width, height) {
            _super.prototype.onResize.call(this, width, height);
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(width, height);
        };
        RenderView.prototype.draw = function (time) {
            _super.prototype.draw.call(this, time);
            this.renderer.clear();
            this.renderer.render(this.renderScene, this.camera, this.renderBuffer, true);
            this.renderer.render(this.scene, this.camera);
        };
        return RenderView;
    }(View));
    return RenderView;
});
//# sourceMappingURL=render_view.js.map