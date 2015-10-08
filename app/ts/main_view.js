///<reference path="common/view.ts"/>
///<reference path="common/shader_view.ts"/>
///<reference path="../../typings/jquery/jquery.d.ts"/>
/**
 * Created by kev on 15-10-08.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        _super.call(this);
        document.body.appendChild(this.el);
        this.shaderView = new ShaderView();
        this.addChild(this.shaderView);
        var _this = this;
        this.$window = $(window);
        this.$window.on('resize', function () {
            _this.onResize(window.innerWidth, window.innerHeight);
        });
        this.onResize(window.innerWidth, window.innerHeight);
    }
    return MainView;
})(View);
//# sourceMappingURL=main_view.js.map