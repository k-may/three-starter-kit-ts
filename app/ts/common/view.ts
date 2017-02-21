/**
 * Created by kev on 15-10-08.
 */
interface IView {

    draw(time:number):void;
    addChild(view:IView);
    onResize(width?:number, height?:number) : void;
    setPos(x:number, y : number, z ?: number) : void;
}

class View implements IView {

    width:number;
    height:number;

    static PADDING_LEFT:number = 34;
    static PADDING_TOP:number = 100;
    static PADDING_RIGHT:number = 34;

    x:number;
    y:number;
    z:number;

    setPos(x:number, y:number, z?:number):void {
        this.x = x;
        this.y = y;
        this.z = z;
    }


    onResize(width:number, height:number):void {
        this.width = width;
        this.height = height;

        for (var i = 0; i < this.views.length; i++) {
            this.views[i].onResize(width, height);
        }
    }

    el:HTMLDivElement;
    parent:IView;
    views:IView[] = [];

    addChild(view:IView) {

        this.views.push(view);

        if (view instanceof View) {
            this.el.appendChild((<View>view).el);
        }
    }

    draw(time:number):void {
        this.views.forEach(view => {
            view.draw(time);
        })
    }

    constructor() {
        this.el = document.createElement("div");
    }
}
export = View;
