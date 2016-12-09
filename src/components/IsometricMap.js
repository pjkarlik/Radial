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
    this.axisY = 0;
    this.axisX = 0;
    this.angle = 45;
    this.rotation = 65;
    this.cubes = [];
    this.element = element;
    this.mouse = new Mouse();
    this.browserRect = getBrowserDimensions(window, document);
    this.perspective = this.createPerspective();
    this.renderLoop = this.renderLoop.bind(this);
    this.generateField = this.generateField.bind(this);
    this.changeAngle = this.changeAngle.bind(this);
    window.addEventListener('mousemove', this.changeAngle);
    this.generateField();
    this.renderLoop();
  }

  createPerspective() {
    const perspective = document.createElement('div');
    perspective.className = CubeStyle.map;
    perspective.id = 'map';
    this.element.appendChild(perspective);
    return perspective;
  }

  generateField() {
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
  }
  changeAngle() {
    const mouse = this.mouse.pointer();
    const normalize = {
      ang: ~~(this.browserRect.browserWidth / 2 - mouse.x),
      rot: ~~(this.browserRect.browserHeight / 2 - mouse.y),
    };
    this.rotation += (normalize.rot * 0.01);
    this.angle += (normalize.ang * 0.01);
    document.getElementById('map').setAttribute('style',
      `transform: rotateX(${this.rotation}deg) rotateZ(${this.angle}deg)`);
  }
  renderLoop() {
    // Loop though Simplex Noise //
    let counter = 0;
    const size = parseInt(CubeStyle.size, 10) / 2;
    this.time += 0.8;
    for (let r = 0; r < this.z; r++) {
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
          const cube = this.cubes[counter];
          console.log(cube.index);
          const noise =
            simplexNoise((x * size) / this.grid, ((y * size) + this.time) / this.grid, (r * size) / this.grid);
          const myOpacity = Math.abs(~~(255 * noise) * 0.03);
          const stylecube = document.getElementById(cube.index);
          stylecube.setAttribute('style',
          `transform: translate3D(${(x * size)}px, ${(y * size)}px, ${(r * size)}px);` +
          `opacity:${myOpacity};`
          );

          counter ++;
        }
      }
    }
    // window.requestAnimationFrame(this.renderLoop);
  }
}
