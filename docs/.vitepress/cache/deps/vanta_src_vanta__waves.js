import {
  VANTA,
  base_default,
  ri,
  rn
} from "./chunk-BK5NEV6H.js";

// node_modules/vanta/src/vanta.waves.js
var THREE = typeof window == "object" && window.THREE;
var defaultOptions = {
  color: 21896,
  shininess: 30,
  waveHeight: 15,
  waveSpeed: 1,
  zoom: 1
};
var Waves = class extends base_default {
  static initClass() {
    this.prototype.ww = 100;
    this.prototype.hh = 80;
    this.prototype.waveNoise = 4;
  }
  constructor(userOptions) {
    THREE = userOptions.THREE || THREE;
    super(userOptions);
  }
  getMaterial() {
    const options = {
      color: this.options.color,
      shininess: this.options.shininess,
      flatShading: true,
      side: THREE.DoubleSide
    };
    return new THREE.MeshPhongMaterial(options);
  }
  onInit() {
    let i, j;
    const CELLSIZE = 18;
    const material = this.getMaterial();
    const geometry = new THREE.BufferGeometry();
    this.gg = [];
    const points = [];
    for (i = 0; i <= this.ww; i++) {
      this.gg[i] = [];
      for (j = 0; j <= this.hh; j++) {
        const id = points.length;
        const newVertex = new THREE.Vector3(
          (i - this.ww * 0.5) * CELLSIZE,
          rn(0, this.waveNoise) - 10,
          (this.hh * 0.5 - j) * CELLSIZE
        );
        points.push(newVertex);
        this.gg[i][j] = id;
      }
    }
    geometry.setFromPoints(points);
    const indices = [];
    for (i = 1; i <= this.ww; i++) {
      for (j = 1; j <= this.hh; j++) {
        let face1, face2;
        const d = this.gg[i][j];
        const b = this.gg[i][j - 1];
        const c = this.gg[i - 1][j];
        const a = this.gg[i - 1][j - 1];
        if (ri(0, 1)) {
          face1 = [a, b, c];
          face2 = [b, c, d];
        } else {
          face1 = [a, b, d];
          face2 = [a, c, d];
        }
        indices.push(...face1, ...face2);
      }
    }
    geometry.setIndex(indices);
    this.plane = new THREE.Mesh(geometry, material);
    this.scene.add(this.plane);
    const ambience = new THREE.AmbientLight(16777215, 0.9);
    this.scene.add(ambience);
    const pointLight = new THREE.PointLight(16777215, 0.9);
    pointLight.position.set(-100, 250, -100);
    this.scene.add(pointLight);
    this.camera = new THREE.PerspectiveCamera(
      35,
      this.width / this.height,
      50,
      1e4
    );
    const xOffset = -10;
    const zOffset = -10;
    this.cameraPosition = new THREE.Vector3(250 + xOffset, 200, 400 + zOffset);
    this.cameraTarget = new THREE.Vector3(150 + xOffset, -30, 200 + zOffset);
    this.camera.position.copy(this.cameraPosition);
    this.scene.add(this.camera);
  }
  onUpdate() {
    let diff;
    this.plane.material.color.set(this.options.color);
    this.plane.material.shininess = this.options.shininess;
    this.camera.ox = this.cameraPosition.x / this.options.zoom;
    this.camera.oy = this.cameraPosition.y / this.options.zoom;
    this.camera.oz = this.cameraPosition.z / this.options.zoom;
    if (this.controls != null) {
      this.controls.update();
    }
    const c = this.camera;
    if (Math.abs(c.tx - c.position.x) > 0.01) {
      diff = c.tx - c.position.x;
      c.position.x += diff * 0.02;
    }
    if (Math.abs(c.ty - c.position.y) > 0.01) {
      diff = c.ty - c.position.y;
      c.position.y += diff * 0.02;
    }
    if (Math.abs(c.tz - c.position.z) > 0.01) {
      diff = c.tz - c.position.z;
      c.position.z += diff * 0.02;
    }
    c.lookAt(this.cameraTarget);
    this.oy = this.oy || {};
    for (let i = 0; i < this.plane.geometry.attributes.position.array.length; i += 3) {
      const v = {
        x: this.plane.geometry.attributes.position.array[i],
        y: this.plane.geometry.attributes.position.array[i + 1],
        z: this.plane.geometry.attributes.position.array[i + 2],
        oy: this.oy[i]
      };
      if (!v.oy) {
        this.oy[i] = v.y;
      } else {
        const s = this.options.waveSpeed;
        const crossChop = Math.sqrt(s) * Math.cos(-v.x - v.z * 0.7);
        const delta = Math.sin(s * this.t * 0.02 - s * v.x * 0.025 + s * v.z * 0.015 + crossChop);
        const trochoidDelta = Math.pow(delta + 1, 2) / 4;
        v.y = v.oy + trochoidDelta * this.options.waveHeight;
        this.plane.geometry.attributes.position.array[i + 1] = v.y;
      }
    }
    this.plane.geometry.attributes.position.setUsage(THREE.DynamicDrawUsage);
    this.plane.geometry.computeVertexNormals();
    this.plane.geometry.attributes.position.needsUpdate = true;
    if (this.wireframe) {
      this.wireframe.geometry.fromGeometry(this.plane.geometry);
      this.wireframe.geometry.computeFaceNormals();
    }
  }
  onMouseMove(x, y) {
    const c = this.camera;
    if (!c.oy) {
      c.oy = c.position.y;
      c.ox = c.position.x;
      c.oz = c.position.z;
    }
    c.tx = c.ox + (x - 0.5) * 100 / this.options.zoom;
    c.ty = c.oy + (y - 0.5) * -100 / this.options.zoom;
    return c.tz = c.oz + (x - 0.5) * -50 / this.options.zoom;
  }
};
Waves.prototype.defaultOptions = defaultOptions;
Waves.initClass();
var vanta_waves_default = VANTA.register("WAVES", Waves);
export {
  vanta_waves_default as default
};
//# sourceMappingURL=vanta_src_vanta__waves.js.map
