import View = require("./common/view");
import ShaderView = require("./common/shader_view");
import RenderView = require("./common/render_view");

/**
 * Created by kev on 15-10-08.
 */


class MainView extends View{

    shaderView:ShaderView;
    renderView:RenderView;
    $window:any;

    constructor(){
        super();

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

}

export = MainView;
