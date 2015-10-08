///<reference path="common/view.ts"/>
///<reference path="common/shader_view.ts"/>
///<reference path="../../typings/jquery/jquery.d.ts"/>
/**
 * Created by kev on 15-10-08.
 */

class MainView extends View{

    shaderView:ShaderView;
    $window:any;

    constructor(){
        super();

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

}