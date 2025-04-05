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
    const defaultOptions = typeof this.getDefaultOptions === "function" ? this.getDefaultOptions() : this.defaultOptions;
    this.options = Object.assign({
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1
    }, defaultOptions);
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

export {
  mobileCheck,
  rn,
  ri,
  VANTA,
  base_default
};
//# sourceMappingURL=chunk-BK5NEV6H.js.map
