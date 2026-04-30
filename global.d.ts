declare module 'three' {
  export class Vector2 {
    constructor(x?: number, y?: number);
    x: number;
    y: number;
    set(x: number, y: number): this;
    copy(v: Vector2): this;
    lerp(v: Vector2, alpha: number): this;
  }
  export class Vector3 {
    constructor(x?: number, y?: number, z?: number);
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
  }
  export class Scene {
    add(object: any): void;
  }
  export class OrthographicCamera {
    constructor(left: number, right: number, top: number, bottom: number, near: number, far: number);
    position: Vector3;
  }
  export class WebGLRenderer {
    constructor(params?: any);
    domElement: HTMLCanvasElement;
    setPixelRatio(value: number): void;
    setSize(width: number, height: number, updateStyle?: boolean): void;
    getPixelRatio(): number;
    render(scene: Scene, camera: OrthographicCamera): void;
    dispose(): void;
  }
  export class PlaneGeometry {
    constructor(width?: number, height?: number);
    dispose(): void;
  }
  export class ShaderMaterial {
    constructor(params?: any);
    uniforms: any;
    dispose(): void;
  }
  export class Mesh {
    constructor(geometry: any, material: any);
  }
  export class Clock {
    getElapsedTime(): number;
  }
}

declare module 'react-dom/client';
