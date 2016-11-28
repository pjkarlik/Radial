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
    name: React.PropTypes.string,
    id: React.PropTypes.number,
    grid: React.PropTypes.number,
    toggleSnap: React.PropTypes.bool,
    addItem: React.PropTypes.func.isRequired,
    removeItem: React.PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.draggable = {};
    this.state = {
      firstPull: false,
    };
    this.removeTimer = null;
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this);
    const bounding = el.getBoundingClientRect();
    const { container, toggleSnap } = this.props;
    this.setDragable(toggleSnap);
    TweenMax.fromTo(el, 0.6,
      { x: container.width / 2 - bounding.width / 2,
        y: container.height,
        background: `rgb(0, 255, 243)`,
        opacity: 0 },
      { x: container.width / 2 - bounding.width / 2,
        y: container.height / 2 - bounding.height / 2,
        background: `rgb(0, 255, 243)`,
        opacity: 1, ease: Bounce.easeOut });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.toggleSnap !== this.props.toggleSnap) {
      this.setDragable(nextProps.toggleSnap);
    }
  }

  setDragable = (toggleSnap) => {
    const { grid } = this.props;
    const el = ReactDOM.findDOMNode(this);
    this.draggable = Draggable.create(el, {
      type: 'x,y',
      edgeResistance: 0.65,
      onDragStart: this.addItem,
      onDragEnd: this.removeItem,
      onDrag: this.moveCheck,
      liveSnap: toggleSnap,
      snap: {
        x: (endValue) => { return Math.round(endValue / grid) * grid; },
        y: (endValue) => { return Math.round(endValue / grid) * grid; },
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
    TweenMax.fromTo(el, 0.6,
      { x: Math.round((container.width / 2 - bounding.width / 2) / grid) * grid,
        y: Math.round(container.height / grid) * grid,
        opacity: 0 },
      { x: Math.round((container.width / 2 - bounding.width / 2) / grid) * grid,
        y: Math.round((container.height / 2 - bounding.height / 2) / grid) * grid,
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

  removeItem = () => {
    const el = ReactDOM.findDOMNode(this);
    const bounding = el.getBoundingClientRect();
    if (bounding.top < 100) {
      this.props.removeItem();
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
