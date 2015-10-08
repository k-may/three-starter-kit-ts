///<reference path="../../../typings/underscore/underscore.d.ts"/>
///<reference path="../../../typings/es6-promise/es6-promise.d.ts"/>
///<reference path="../../../typings/threejs/three.d.ts"/>
var UniformV2 = (function () {
    function UniformV2() {
        this.value = new THREE.Vector2();
        this.type = "v2";
    }
    return UniformV2;
})();
var UniformF = (function () {
    function UniformF() {
        this.value = 1.0;
        this.type = 'f';
    }
    return UniformF;
})();
var UniformT = (function () {
    function UniformT() {
        this.type = 't';
    }
    return UniformT;
})();
var ShaderData = (function () {
    function ShaderData(fragmentId, vertexId) {
        this.fragmentShader = "";
        this.vertexShader = "";
        this.ready = false;
        this.width = 0;
        this.height = 0;
        this.time = 0;
        this.fragmentId = fragmentId;
        this.vertexId = vertexId !== undefined ? vertexId : "vertex";
        this.uniforms = {
            time: new UniformF(),
            resolution: new UniformV2(),
            mouse: new UniformV2()
        };
    }
    ShaderData.prototype.start = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadShaders([_this.fragmentId, _this.vertexId]).then(function (arr) {
                _this.fragmentShader = arr[0];
                _this.vertexShader = arr[1];
                _this.createMaterial();
                resolve();
            });
        });
    };
    ShaderData.prototype.loadShaders = function (ids) {
        var _this = this;
        var promises = [];
        ids.forEach(function (id) {
            promises.push(_this.loadShader(id));
        });
        return Promise.all(promises);
    };
    ShaderData.prototype.loadShader = function (id) {
        return new Promise(function (resolve, reject) {
            var src = 'glsl/' + id + '.glsl';
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', function (e) {
                resolve(e.currentTarget.responseText);
            });
            xhr.open('GET', src);
            xhr.send();
        });
    };
    ShaderData.prototype.createMaterial = function () {
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
            var geometry = new THREE.PlaneGeometry(2, 2);
            geometry.dynamic = true;
            this.mesh = new THREE.Mesh(geometry);
        }
        this.mesh.material = this.material;
        this.scene.add(this.mesh);
        this.ready = true;
    };
    ShaderData.prototype.update = function (w, h, mx, my) {
        this.uniforms.time.value = this.time += 0.05;
        this.uniforms.resolution.value.x = w;
        this.uniforms.resolution.value.y = h;
        if (mx && my) {
            this.uniforms.mouse.value.x = mx / w;
            this.uniforms.mouse.value.y = my / h;
        }
    };
    ShaderData.prototype.render = function (renderer) {
        renderer.render(this.scene, this.camera);
    };
    return ShaderData;
})();
//# sourceMappingURL=shader_data.js.map