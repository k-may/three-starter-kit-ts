///<reference path="main_view.ts"/>
///<reference path="../../typings/jquery/jquery.d.ts"/>
/**
 * Created by kev on 15-10-08.
 */
(function () {
    'use strict';
    var controller;
    var mainView;
    var config;
    var routes = [
        {}
    ];
    function init() {
        mainView = new MainView();
        $(document).ready(function () {
            draw(Date.now());
        });
    }
    function draw(time) {
        requestAnimationFrame(draw);
        mainView.draw(time);
    }
    init();
})();
//# sourceMappingURL=main.js.map