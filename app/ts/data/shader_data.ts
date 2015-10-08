///<reference path="../../../typings/underscore/underscore.d.ts"/>
///<reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
///<reference path="../../../typings/threejs/three.d.ts"/>

/**
 * Created by kev on 15-09-30.
 */

interface  IUniform {
    value : any;
    type: string
}

class UniformV2 implements IUniform {
    value:THREE.Vector2 = new THREE.Vector2();
    type:string = "v2";
}

class UniformF implements IUniform {
    value:number = 1.0;
    type:string = 'f';
}

class UniformT implements IUniform {
    value:THREE.Texture;
    type:string = 't';
}

class ShaderData {

    id:string;
    uniforms:any;

    scene:THREE.Scene;
    camera:THREE.Camera;
    mesh:THREE.Mesh;
    material:THREE.ShaderMaterial;

    fragmentId:string;
    vertexId:string;

    fragmentShader:string = "";
    vertexShader:string = "";
    ready:boolean = false;

    width:number = 0;
    height:number = 0;
    time:number = 0;

    constructor(fragmentId:string, vertexId?:string) {
        this.fragmentId = fragmentId;
        this.vertexId = vertexId !== undefined ? vertexId : "vertex";

        this.uniforms = {
            time: new UniformF(),
            resolution: new UniformV2(),
            mouse: new UniformV2()
        };
    }

    start():Promise<string> {
        var _this = this;
        return new Promise<string>(function (resolve, reject) {
            _this.loadShaders([_this.fragmentId, _this.vertexId]).then(function (arr) {
                _this.fragmentShader = arr[0];
                _this.vertexShader = arr[1];
                _this.createMaterial();
                resolve();
            });
        });
    }

    loadShaders(ids:string[]):Promise<string[]> {

        var promises = [];
        ids.forEach(id => {
           promises.push(this.loadShader(id));
        });
        return Promise.all(promises);
    }

    loadShader(id:string):Promise<string> {

        return new Promise(function (resolve, reject) {
            var src = 'glsl/' + id + '.glsl';
            var xhr = new XMLHttpRequest();

            xhr.addEventListener('load', function (e:any) {
                resolve(e.currentTarget.responseText);
            });

            xhr.open('GET', src);
            xhr.send();
        });
    }

    createMaterial():void {

        this.camera = new THREE.Camera();
        this.camera.position.z = 1;

        this.scene = new THREE.Scene();

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: this.vertexShader,
            fragmentShader: this.fragmentShader
        });
        this.material.needsUpdate = true;

        if (!this.mesh) {
            var geometry:THREE.PlaneGeometry = new THREE.PlaneGeometry(2, 2);
            geometry.dynamic = true;
            this.mesh = new THREE.Mesh(geometry);
        }

        this.mesh.material = this.material;
        this.scene.add(this.mesh);

        this.ready = true;
    }


    update(w:number, h:number, mx?:number, my?:number):void {
        this.uniforms.time.value = this.time += 0.05;
        this.uniforms.resolution.value.x = w;
        this.uniforms.resolution.value.y = h;

        if (mx && my) {
            this.uniforms.mouse.value.x = mx / w;
            this.uniforms.mouse.value.y = my / h;
        }

    }

    render(renderer:THREE.Renderer):void {
        renderer.render(this.scene, this.camera);
    }

}