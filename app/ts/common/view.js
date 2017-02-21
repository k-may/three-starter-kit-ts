define(["require", "exports"], function (require, exports) {
    "use strict";
    var View = (function () {
        function View() {
            this.views = [];
            this.el = document.createElement("div");
        }
        View.prototype.setPos = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        };
        View.prototype.onResize = function (width, height) {
            this.width = width;
            this.height = height;
            for (var i = 0; i < this.views.length; i++) {
                this.views[i].onResize(width, height);
            }
        };
        View.prototype.addChild = function (view) {
            this.views.push(view);
            if (view instanceof View) {
                this.el.appendChild(view.el);
            }
        };
        View.prototype.draw = function (time) {
            this.views.forEach(function (view) {
                view.draw(time);
            });
        };
        View.PADDING_LEFT = 34;
        View.PADDING_TOP = 100;
        View.PADDING_RIGHT = 34;
        return View;
    }());
    return View;
});
//# sourceMappingURL=view.js.map