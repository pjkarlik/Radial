import React from 'react';
import ReactDOM from 'react-dom';
import TweenMax, { Bounce } from 'gsap';
import Draggable from 'gsap/src/uncompressed/utils/Draggable';
/**
  Comments here
*/
/* eslint no-console: 0 */
/* eslint arrow-body-style: 0 */
/* eslint react/jsx-no-bind: 0 */
export default class Disc extends React.Component {
  static displayName = 'Disc';
  static propTypes = {
    classes: React.PropTypes.object,
    container: React.PropTypes.object.isRequired,
    config: React.PropTypes.object,
    grid: React.PropTypes.number,
    addItem: React.PropTypes.func.isRequired,
    setItem: React.PropTypes.func.isRequired,
    removeItem: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.draggable = {};
    this.state = {
      firstPull: this.props.config.firstPull,
    };
    this.removeTimer = null;
  }

  componentDidMount() {
    const { grid, container, config } = this.props;
    const el = ReactDOM.findDOMNode(this);
    const bounding = el.getBoundingClientRect();
    const y = config.y * grid || ~~((container.height - bounding.height) / grid) * grid;
    const x = config.x * grid || 0;
    this.setDragable();
    TweenMax.fromTo(el, 0.6,
      { y,
        x,
        background: `hsl(${y * 0.5},100%,50%)`,
        opacity: 0 },
      { y,
        x,
        background: `hsl(${y * 0.5},100%,50%)`,
        opacity: 1, ease: Bounce.easeOut, onComplete: this.endCheck });
  }

  setDragable = () => {
    const { grid } = this.props;
    const el = ReactDOM.findDOMNode(this);
    this.draggable = Draggable.create(el, {
      type: 'x,y',
      edgeResistance: 0.65,
      onDragStart: this.addItem,
      onDragEnd: this.endCheck,
      onDrag: this.moveCheck,
      liveSnap: true,
      snap: {
        x: (endValue) => { return ~~(endValue / grid) * grid; },
        y: (endValue) => { return ~~(endValue / grid) * grid; },
      },
    });
  }

  setfirstPull = () => {
    this.setState({
      firstPull: true,
    });
  }

  componentWillEnter(callback) {
    const { grid } = this.props;
    const el = ReactDOM.findDOMNode(this);
    const bounding = el.getBoundingClientRect();
    const { container } = this.props;
    const y = ~~((container.height - bounding.height) / 2 / grid) * grid;
    TweenMax.fromTo(el, 0.6,
      {
        y: ~~((container.height - bounding.height) / grid) * grid,
        background: `hsl(${y * 0.5},100%,50%)`,
        opacity: 0 },
      {
        y,
        background: `hsl(${y * 0.5},100%,50%)`,
        opacity: 1, ease: Bounce.easeOut, onComplete: callback });
  }

  componentWillLeave(callback) {
    const el = ReactDOM.findDOMNode(this);
    const bounding = el.getBoundingClientRect();
    TweenMax.fromTo(el, 0.6,
      { y: el.top,
        opacity: 1 },
      { y: -bounding.height,
        opacity: 0, ease: Bounce.easeOut, onComplete: callback });
  }

  moveCheck = () => {
    const el = ReactDOM.findDOMNode(this);
    const bounding = el.getBoundingClientRect();
    this.inner.style.background = `hsl(${bounding.top * 0.5},100%,50%)`;
  }

  addItem = () => {
    if (!this.state.firstPull) {
      this.props.addItem();
      this.setfirstPull();
    }
  }

  endCheck = () => {
    const { config, grid } = this.props;
    const el = ReactDOM.findDOMNode(this);
    const bounding = el.getBoundingClientRect();
    const position = {
      y: ~~(bounding.top / bounding.height),
      x: ~~(bounding.left / bounding.width),
      id: config.id,
    };
    if (bounding.top < grid) {
      this.props.removeItem(config);
    } else {
      this.props.setItem(position);
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.disc}>
        <div className={classes.inner} ref={(ref) => this.inner = ref}/>
      </div>
    );
  }
}
