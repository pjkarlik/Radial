import React from 'react';
import { resolve } from '../styles';
import ReactTransitionGroup from 'react-addons-transition-group';
import Puck from './Puck';

/* eslint no-console: 0 */
/* eslint react/jsx-no-bind: 0 */
/* eslint no-nested-ternary: 0 */

export default class DanceStep extends React.Component {
  static displayName = 'DanceStep';
  static propTypes = {
    classes: React.PropTypes.object,
    grid: React.PropTypes.number,
  };

  static defaultProps = {
    grid: 50,
  }

  constructor(props) {
    super(props);
    this.counter = 0;
    this.state = {
      playHead: 0,
      puckArray: [],
    };
  }

  componentDidMount() {
    this.addItem();
    this.countdown = setInterval(this.playHead, 2400);
  }

  componentWillUnmount() {
    clearInterval(this.countdown);
  }

  getContainerSize = () => {
    const width = ~~(document.documentElement.clientWidth, window.innerWidth || 0);
    const height = ~~(document.documentElement.clientHeight, window.innerHeight || 0);
    return {
      width,
      height,
    };
  }

  getDiscs = () => {
    const { classes, grid } = this.props;
    const { puckArray } = this.state;
    const container = this.getContainerSize();
    const discArray = puckArray.map((puck) => {
      const object = (
        <Puck
          key = {`disc${puck.id}`}
          classes = {classes}
          config = {puck}
          grid = {grid}
          container = {container}
          addItem = {this.addItem}
          setItem = {this.setItem}
          removeItem = {this.removeItem}
        />
      );
      return object;
    });
    return discArray;
  };

  setArray = (array) => {
    // Sort Array for Highest to lowest
    const puckSort = array.sort((a, b) => {
      const check = this.compare(a, b);
      return check;
    });
    this.setState({
      puckArray: puckSort,
    });
  }

  setItem = (config) => {
    const newArray = this.state.puckArray;
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].id === config.id) {
        newArray[i] = config;
      }
    }
    this.setArray(newArray);
  };

  addItem = () => {
    const newArray = this.state.puckArray;
    newArray.push({ x: 0, y: 0, id: this.counter });
    this.counter ++;
    this.setArray(newArray);
  };

  removeItem = (config) => {
    const newArray = this.state.puckArray;
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].id === config.id) {
        console.log(newArray[i]);
        newArray.splice(i, 1);
      }
    }
    this.setArray(newArray);
  };

  releaseDisc = () => {
    const newArray = [];
    this.setArray(newArray);
    setTimeout(() => {
      this.addItem();
    }, 0);
  };

  exportDisc = () => {
    console.log(this.state.puckArray);
  };

  playHead = () => {
    const { puckArray, playHead } = this.state;
    let head = playHead;
    head++;
    if (head > puckArray.length - 1) {
      head = 0;
    }
    this.setState({
      playHead: head,
    });
  }

  compare = (a, b) => {
    const result = (a.x < b.x) ? -1 : (a.x > b.x) ? 1 : 0;
    return result;
  };

  render() {
    const { classes, grid } = this.props;
    const { puckArray, playHead } = this.state;
    const discs = this.getDiscs();

    const puckItem = puckArray[playHead];
    const head = puckArray.length > 0 ? puckItem.y || 0 : 0;
    const headStyle = puckArray.length > 0 ? ~~(puckItem.x * grid) : 0;
    const background = `home${head}`;

    return (
      <div {...resolve(this.props, 'boundContainer', background)} ref={(ref) => this.boundContainer = ref}>
        <div className={classes.controls}>
          <button
            onClick = {this.releaseDisc}
            className = {classes.toggleLink}
          >
            release
          </button>
          <button
            onClick = {this.exportDisc}
            className = {classes.toggleLink}
          >
            export
          </button>
        </div>
        <ReactTransitionGroup
          component="div"
          className={classes.transitionContainer}
        >
          {discs}
          <div
            className={classes.playHead}
            style = {{ left: headStyle }}
          ></div>
        </ReactTransitionGroup>
      </div>
    );
  }
}
