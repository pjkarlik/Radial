import React from 'react';
import ReactDOM from 'react-dom';
import TweenMax, { Bounce } from 'gsap';
// import Draggable from 'gsap/src/uncompressed/utils/Draggable';
/**
  Comments here
*/
/* eslint no-console: 0 */
export default class Panel extends React.Component {
  static displayName = 'Panel';
  static propTypes = {
    classes: React.PropTypes.object,
    config: React.PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // const el = ReactDOM.findDOMNode(this);
    // Draggable.create(el, { type: 'x,y', edgeResistance: 0.65 });
  }

  componentWillEnter(callback) {
    const el = ReactDOM.findDOMNode(this);
    const bounding = el.getBoundingClientRect();
    TweenMax.fromTo(el, 0.6,
      { x: bounding.width, opacity: 0 },
      { x: 0, opacity: 1, ease: Bounce.easeOut, onComplete: callback });
  }

  componentWillLeave(callback) {
    const el = ReactDOM.findDOMNode(this);
    const bounding = el.getBoundingClientRect();
    TweenMax.fromTo(el, 0.6,
      { x: 0, opacity: 1 },
      { x: bounding.width, opacity: 0, ease: Bounce.easeOut, onComplete: callback });
  }

  componentDidLeave() {
    console.log('leave');
  }

  render() {
    const { classes, config } = this.props;
    return (
      <li className={classes.panelTrans}>
        <h4 className={classes.label}>{config.name}</h4>
        <div className={classes.frame}>{config.child}</div>
      </li>
    );
  }
}
