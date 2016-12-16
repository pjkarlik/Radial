import Cube from './Block';
import CubeStyle from './Block.less';
import Mouse from './Mouse';
import getBrowserDimensions from '../utils/getBrowserDimensions';
import simplexNoise from './simplexNoise';

/** Parent Render Class */
export default class Render {
  constructor(element) {
    this.grid = 10;
    this.rows = this.grid;
    this.cols = this.grid;
    this.z = 1;
    this.time = 0;
    this.angle = 45;
    this.rotation = 65;
    this.cubes = [];
    this.element = element;
    this.mouse = new Mouse();
    this.browserRect = getBrowserDimensions(window, document);
    this.perspective = this.createPerspective();
    window.addEventListener('mousemove', this.changeAngle);
    this.generateField();
    this.renderLoop();
  }

  createPerspective = () => {
    const perspective = document.createElement('div');
    perspective.className = CubeStyle.map;
    perspective.id = 'map';
    this.element.appendChild(perspective);
    return perspective;
  };

  generateField = () => {
    // Generate Cube Field //
    let counter = 0;
    const size = parseInt(CubeStyle.size, 10);
    const centerX = (size * this.grid) / 2;
    const centerY = (size * this.grid) / 2;
    const centerZ = (size * this.grid) / 2;
    for (let r = 0; r < this.z; r++) {
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          const cube = new Cube(counter,
            centerX - (x * size), centerY - (y * size), centerZ - (r * size), this.perspective, 100, CubeStyle);
          this.cubes.push(cube);
          counter ++;
        }
      }
    }
  };
  changeAngle = () => {
    const mouse = this.mouse.pointer();
    const normalize = {
      ang: ~~(this.browserRect.browserWidth / 2 - mouse.x) * 0.1,
      rot: ~~(this.browserRect.browserHeight / 2 - mouse.y) * 0.1,
    };
    this.rotation += (normalize.rot * 0.005);
    this.angle += (normalize.ang * 0.005);
    document.getElementById('map').setAttribute('style',
      `transform: translate(-50%, -50%) rotateX(${this.rotation}deg) rotateZ(${this.angle}deg)`);
  };
  renderLoop = () => {
    // Loop though Simplex Noise //
    let counter = 0;
    const size = parseInt(CubeStyle.size, 10);
    this.time += 0.02;
    for (let r = 0; r < this.z; r++) {
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          const cube = this.cubes[counter];
          const noise =
            simplexNoise((x) / this.grid, (y + this.time) / this.grid,
            (r) / this.grid);
          const myOpacity = Math.abs(~~(255 * noise) * 0.02);
          const stylecube = document.getElementById(cube.index);
          stylecube.setAttribute('style',
          `transform: translate3D(${(x * size)}px, ${(y * size)}px, ${(r * size)}px);` +
          `opacity:${myOpacity};`
          );

          counter ++;
        }
      }
    }
    window.requestAnimationFrame(this.renderLoop);
  };
}
