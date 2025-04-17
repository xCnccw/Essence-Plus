import "./chunk-BUSYA2B4.js";

// node_modules/vanta/src/helpers.js
Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};
function mobileCheck() {
  if (typeof navigator !== "undefined") {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 600;
  }
  return null;
}
function rn(start, end) {
  if (start == null) start = 0;
  if (end == null) end = 1;
  return start + Math.random() * (end - start);
}
function ri(start, end) {
  if (start == null) start = 0;
  if (end == null) end = 1;
  return Math.floor(start + Math.random() * (end - start + 1));
}
var q = (sel) => document.querySelector(sel);
var color2Hex = (color) => {
  if (typeof color == "number") {
    return "#" + ("00000" + color.toString(16)).slice(-6);
  } else return color;
};
function clearThree(obj) {
  while (obj.children && obj.children.length > 0) {
    clearThree(obj.children[0]);
    obj.remove(obj.children[0]);
  }
  if (obj.geometry) obj.geometry.dispose();
  if (obj.material) {
    Object.keys(obj.material).forEach((prop) => {
      if (!obj.material[prop]) return;
      if (obj.material[prop] !== null && typeof obj.material[prop].dispose === "function") {
        obj.material[prop].dispose();
      }
    });
    obj.material.dispose();
  }
}

// node_modules/vanta/src/_base.js
var win = typeof window == "object";
var THREE = win && window.THREE || {};
if (win && !window.VANTA) window.VANTA = {};
var VANTA = win && window.VANTA || {};
VANTA.register = (name, Effect) => {
  return VANTA[name] = (opts) => new Effect(opts);
};
VANTA.version = "0.5.24";
var error = function() {
  Array.prototype.unshift.call(arguments, "[VANTA]");
  return console.error.apply(this, arguments);
};
VANTA.VantaBase = class VantaBase {
  constructor(userOptions = {}) {
    if (!win) return false;
    VANTA.current = this;
    this.windowMouseMoveWrapper = this.windowMouseMoveWrapper.bind(this);
    this.windowTouchWrapper = this.windowTouchWrapper.bind(this);
    this.windowGyroWrapper = this.windowGyroWrapper.bind(this);
    this.resize = this.resize.bind(this);
    this.animationLoop = this.animationLoop.bind(this);
    this.restart = this.restart.bind(this);
    const defaultOptions2 = typeof this.getDefaultOptions === "function" ? this.getDefaultOptions() : this.defaultOptions;
    this.options = Object.assign({
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1
    }, defaultOptions2);
    if (userOptions instanceof HTMLElement || typeof userOptions === "string") {
      userOptions = { el: userOptions };
    }
    Object.assign(this.options, userOptions);
    if (this.options.THREE) {
      THREE = this.options.THREE;
    }
    this.el = this.options.el;
    if (this.el == null) {
      error('Instance needs "el" param!');
    } else if (!(this.options.el instanceof HTMLElement)) {
      const selector = this.el;
      this.el = q(selector);
      if (!this.el) {
        error("Cannot find element", selector);
        return;
      }
    }
    this.prepareEl();
    this.initThree();
    this.setSize();
    try {
      this.init();
    } catch (e) {
      error("Init error", e);
      if (this.renderer && this.renderer.domElement) {
        this.el.removeChild(this.renderer.domElement);
      }
      if (this.options.backgroundColor) {
        console.log("[VANTA] Falling back to backgroundColor");
        this.el.style.background = color2Hex(this.options.backgroundColor);
      }
      return;
    }
    this.initMouse();
    this.resize();
    this.animationLoop();
    const ad = window.addEventListener;
    ad("resize", this.resize);
    window.requestAnimationFrame(this.resize);
    if (this.options.mouseControls) {
      ad("scroll", this.windowMouseMoveWrapper);
      ad("mousemove", this.windowMouseMoveWrapper);
    }
    if (this.options.touchControls) {
      ad("touchstart", this.windowTouchWrapper);
      ad("touchmove", this.windowTouchWrapper);
    }
    if (this.options.gyroControls) {
      ad("deviceorientation", this.windowGyroWrapper);
    }
  }
  setOptions(userOptions = {}) {
    Object.assign(this.options, userOptions);
    this.triggerMouseMove();
  }
  prepareEl() {
    let i, child;
    if (typeof Node !== "undefined" && Node.TEXT_NODE) {
      for (i = 0; i < this.el.childNodes.length; i++) {
        const n = this.el.childNodes[i];
        if (n.nodeType === Node.TEXT_NODE) {
          const s = document.createElement("span");
          s.textContent = n.textContent;
          n.parentElement.insertBefore(s, n);
          n.remove();
        }
      }
    }
    for (i = 0; i < this.el.children.length; i++) {
      child = this.el.children[i];
      if (getComputedStyle(child).position === "static") {
        child.style.position = "relative";
      }
      if (getComputedStyle(child).zIndex === "auto") {
        child.style.zIndex = 1;
      }
    }
    if (getComputedStyle(this.el).position === "static") {
      this.el.style.position = "relative";
    }
  }
  applyCanvasStyles(canvasEl, opts = {}) {
    Object.assign(canvasEl.style, {
      position: "absolute",
      zIndex: 0,
      top: 0,
      left: 0,
      background: ""
    });
    Object.assign(canvasEl.style, opts);
    canvasEl.classList.add("vanta-canvas");
  }
  initThree() {
    if (!THREE.WebGLRenderer) {
      console.warn("[VANTA] No THREE defined on window");
      return;
    }
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    this.el.appendChild(this.renderer.domElement);
    this.applyCanvasStyles(this.renderer.domElement);
    if (isNaN(this.options.backgroundAlpha)) {
      this.options.backgroundAlpha = 1;
    }
    this.scene = new THREE.Scene();
  }
  getCanvasElement() {
    if (this.renderer) {
      return this.renderer.domElement;
    }
    if (this.p5renderer) {
      return this.p5renderer.canvas;
    }
  }
  getCanvasRect() {
    const canvas = this.getCanvasElement();
    if (!canvas) return false;
    return canvas.getBoundingClientRect();
  }
  windowMouseMoveWrapper(e) {
    const rect = this.getCanvasRect();
    if (!rect) return false;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
      this.mouseX = x;
      this.mouseY = y;
      if (!this.options.mouseEase) this.triggerMouseMove(x, y);
    }
  }
  windowTouchWrapper(e) {
    const rect = this.getCanvasRect();
    if (!rect) return false;
    if (e.touches.length === 1) {
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
        this.mouseX = x;
        this.mouseY = y;
        if (!this.options.mouseEase) this.triggerMouseMove(x, y);
      }
    }
  }
  windowGyroWrapper(e) {
    const rect = this.getCanvasRect();
    if (!rect) return false;
    const x = Math.round(e.alpha * 2) - rect.left;
    const y = Math.round(e.beta * 2) - rect.top;
    if (x >= 0 && y >= 0 && x <= rect.width && y <= rect.height) {
      this.mouseX = x;
      this.mouseY = y;
      if (!this.options.mouseEase) this.triggerMouseMove(x, y);
    }
  }
  triggerMouseMove(x, y) {
    if (x === void 0 && y === void 0) {
      if (this.options.mouseEase) {
        x = this.mouseEaseX;
        y = this.mouseEaseY;
      } else {
        x = this.mouseX;
        y = this.mouseY;
      }
    }
    if (this.uniforms) {
      this.uniforms.iMouse.value.x = x / this.scale;
      this.uniforms.iMouse.value.y = y / this.scale;
    }
    const xNorm = x / this.width;
    const yNorm = y / this.height;
    typeof this.onMouseMove === "function" ? this.onMouseMove(xNorm, yNorm) : void 0;
  }
  setSize() {
    this.scale || (this.scale = 1);
    if (mobileCheck() && this.options.scaleMobile) {
      this.scale = this.options.scaleMobile;
    } else if (this.options.scale) {
      this.scale = this.options.scale;
    }
    this.width = Math.max(this.el.offsetWidth, this.options.minWidth);
    this.height = Math.max(this.el.offsetHeight, this.options.minHeight);
  }
  initMouse() {
    if (!this.mouseX && !this.mouseY || this.mouseX === this.options.minWidth / 2 && this.mouseY === this.options.minHeight / 2) {
      this.mouseX = this.width / 2;
      this.mouseY = this.height / 2;
      this.triggerMouseMove(this.mouseX, this.mouseY);
    }
  }
  resize() {
    this.setSize();
    if (this.camera) {
      this.camera.aspect = this.width / this.height;
      if (typeof this.camera.updateProjectionMatrix === "function") {
        this.camera.updateProjectionMatrix();
      }
    }
    if (this.renderer) {
      this.renderer.setSize(this.width, this.height);
      this.renderer.setPixelRatio(window.devicePixelRatio / this.scale);
    }
    typeof this.onResize === "function" ? this.onResize() : void 0;
  }
  isOnScreen() {
    const elHeight = this.el.offsetHeight;
    const elRect = this.el.getBoundingClientRect();
    const scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop;
    const offsetTop = elRect.top + scrollTop;
    const minScrollTop = offsetTop - window.innerHeight;
    const maxScrollTop = offsetTop + elHeight;
    return minScrollTop <= scrollTop && scrollTop <= maxScrollTop;
  }
  animationLoop() {
    this.t || (this.t = 0);
    this.t2 || (this.t2 = 0);
    const now = performance.now();
    if (this.prevNow) {
      let elapsedTime = (now - this.prevNow) / (1e3 / 60);
      elapsedTime = Math.max(0.2, Math.min(elapsedTime, 5));
      this.t += elapsedTime;
      this.t2 += (this.options.speed || 1) * elapsedTime;
      if (this.uniforms) {
        this.uniforms.iTime.value = this.t2 * 0.016667;
      }
    }
    this.prevNow = now;
    if (this.options.mouseEase) {
      this.mouseEaseX = this.mouseEaseX || this.mouseX || 0;
      this.mouseEaseY = this.mouseEaseY || this.mouseY || 0;
      if (Math.abs(this.mouseEaseX - this.mouseX) + Math.abs(this.mouseEaseY - this.mouseY) > 0.1) {
        this.mouseEaseX += (this.mouseX - this.mouseEaseX) * 0.05;
        this.mouseEaseY += (this.mouseY - this.mouseEaseY) * 0.05;
        this.triggerMouseMove(this.mouseEaseX, this.mouseEaseY);
      }
    }
    if (this.isOnScreen() || this.options.forceAnimate) {
      if (typeof this.onUpdate === "function") {
        this.onUpdate();
      }
      if (this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
        this.renderer.setClearColor(this.options.backgroundColor, this.options.backgroundAlpha);
      }
      if (this.fps && this.fps.update) this.fps.update();
      if (typeof this.afterRender === "function") this.afterRender();
    }
    return this.req = window.requestAnimationFrame(this.animationLoop);
  }
  // setupControls() {
  //   if (DEBUGMODE && THREE.OrbitControls) {
  //     this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
  //     Object.assign(this.controls, ORBITCONTROLS)
  //     return this.scene.add(new THREE.AxisHelper(100))
  //   }
  // }
  restart() {
    if (this.scene) {
      while (this.scene.children.length) {
        this.scene.remove(this.scene.children[0]);
      }
    }
    if (typeof this.onRestart === "function") {
      this.onRestart();
    }
    this.init();
  }
  init() {
    if (typeof this.onInit === "function") {
      this.onInit();
    }
  }
  destroy() {
    if (typeof this.onDestroy === "function") {
      this.onDestroy();
    }
    const rm = window.removeEventListener;
    rm("touchstart", this.windowTouchWrapper);
    rm("touchmove", this.windowTouchWrapper);
    rm("scroll", this.windowMouseMoveWrapper);
    rm("mousemove", this.windowMouseMoveWrapper);
    rm("deviceorientation", this.windowGyroWrapper);
    rm("resize", this.resize);
    window.cancelAnimationFrame(this.req);
    const scene = this.scene;
    if (scene && scene.children) {
      clearThree(scene);
    }
    if (this.renderer) {
      if (this.renderer.domElement) {
        this.el.removeChild(this.renderer.domElement);
      }
      this.renderer = null;
      this.scene = null;
    }
    if (VANTA.current === this) {
      VANTA.current = null;
    }
  }
};
var base_default = VANTA.VantaBase;

// node_modules/vanta/src/vanta.waves.js
var THREE2 = typeof window == "object" && window.THREE;
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
    THREE2 = userOptions.THREE || THREE2;
    super(userOptions);
  }
  getMaterial() {
    const options = {
      color: this.options.color,
      shininess: this.options.shininess,
      flatShading: true,
      side: THREE2.DoubleSide
    };
    return new THREE2.MeshPhongMaterial(options);
  }
  onInit() {
    let i, j;
    const CELLSIZE = 18;
    const material = this.getMaterial();
    const geometry = new THREE2.BufferGeometry();
    this.gg = [];
    const points = [];
    for (i = 0; i <= this.ww; i++) {
      this.gg[i] = [];
      for (j = 0; j <= this.hh; j++) {
        const id = points.length;
        const newVertex = new THREE2.Vector3(
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
    this.plane = new THREE2.Mesh(geometry, material);
    this.scene.add(this.plane);
    const ambience = new THREE2.AmbientLight(16777215, 0.9);
    this.scene.add(ambience);
    const pointLight = new THREE2.PointLight(16777215, 0.9);
    pointLight.position.set(-100, 250, -100);
    this.scene.add(pointLight);
    this.camera = new THREE2.PerspectiveCamera(
      35,
      this.width / this.height,
      50,
      1e4
    );
    const xOffset = -10;
    const zOffset = -10;
    this.cameraPosition = new THREE2.Vector3(250 + xOffset, 200, 400 + zOffset);
    this.cameraTarget = new THREE2.Vector3(150 + xOffset, -30, 200 + zOffset);
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
    this.plane.geometry.attributes.position.setUsage(THREE2.DynamicDrawUsage);
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
