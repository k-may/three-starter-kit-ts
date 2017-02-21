var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "./common/view", "./common/shader_view"], function (require, exports, View, ShaderView) {
    "use strict";
    /**
     * Created by kev on 15-10-08.
     */
    var MainView = (function (_super) {
        __extends(MainView, _super);
        function MainView() {
            _super.call(this);
            document.body.appendChild(this.el);
            this.shaderView = new ShaderView();
            this.addChild(this.shaderView);
            //  this.renderView = new RenderView();
            //   this.addChild(renderView);
            var self = this;
            this.$window = $(window);
            this.$window.on('resize', function () {
                self.onResize(window.innerWidth, window.innerHeight);
            });
            this.onResize(window.innerWidth, window.innerHeight);
        }
        return MainView;
    }(View));
    return MainView;
});
//# sourceMappingURL=main_view.js.map