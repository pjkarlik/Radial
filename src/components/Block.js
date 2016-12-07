import CubeStyle from './Block.less';
import simplexNoise, { fastfloor } from './simplexNoise';
/** Block Element **/
export default class Cube {
  constructor(index, x, y, z, parent, grid, style) {
    this.index = index;
    this.y = y;
    this.x = x;
    this.z = z || 0;
    this.grid = grid;
    this.parent = parent;
    this.index = index;
    this.style = style || CubeStyle;
    this.createCube();
    this.updateCube(this.x, this.y, this.z);
  }

  createCube() {
    const back = document.createElement('div');
    back.className = this.style.back;
    const cube = document.createElement('div');
    cube.className = this.style.cube;
    cube.id = this.index;
    cube.setAttribute('style',
    `transform: translate3D(${this.x}px, ${this.y}px, ${this.z}px);`
    );
    cube.appendChild(back);
    this.parent.appendChild(cube);
  }

  updateCube(x, y, z) {
    this.tick += 15;
    const thisX = x / this.grid;
    const thisY = y / this.grid;
    const thisZ = z / this.grid;
    const noise = simplexNoise(thisX, thisY, thisZ);
    const myOpacity = fastfloor(255 * noise);
    const cube = document.getElementById(this.index);
    cube.setAttribute('style',
    `transform: translate3D(${this.x}px, ${this.y}px, ${this.z}px);` +
    `opacity:${myOpacity};`
    );
  }
}
