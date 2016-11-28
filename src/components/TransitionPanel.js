import React from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';
import { resolve } from '../styles';
import Panel from './Panel';

export default class TransitionPanel extends React.Component {
  static displayName = 'TransitionPanel';
  static propTypes = {
    /* CSS Modules Object */
    classes: React.PropTypes.object,
    /* Objects to Render */
    items: React.PropTypes.object.isRequired,
    /* Callback Function for Navigation Bullets */
    addItem: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      selected: [0], // Set default slide to appear
    };
  }
  // Generate Panels that are Active //
  processPanels = (config) => {
    const { classes } = this.props;
    const { slides } = config;
    // loop though state to match up matching content items from props
    // I am doing this to ensure that the last item pushed into the array
    // will render on top of other Panels
    const panels = this.state.selected.map((index) => {
      const item = slides[index];
      return (
        <Panel
          key = {`panel_${index}`}
          config = {item}
          classes = {classes}
        />
      );
    });
    return panels;
  };
  processBullets = (config) => {
    const { classes } = this.props;
    const { slides } = config;
    const bullets = slides.map((item, index) => {
      const isOpen = this.state.selected.includes(index);
      return (
        <li key = {`key${index}`}>
          <a href="#"
            {...resolve(this.props, 'bullet', isOpen ? 'active' : '')}
            onClick = {(event) => {this.handleClick(event, index);}}
          >{index}</a>
        </li>
      );
    });
    return (
      <ul className={classes.bullets}>
       {bullets}
       <li key = {`addPanel`}>
         <a href="#" className = {classes.bullet} onClick = {(event) => {this.addItem(event);}}>+</a>
       </li>
      </ul>
    );
  };
  addItem = (event) => {
    event.stopPropagation();
    this.props.addItem();
  };
  handleClick = (event, index) => {
    event.stopPropagation();
    // Get current array of selected items //
    const newValue = this.state.selected;
    // See if it already exists //
    const doesExist = newValue.includes(index);
    if (doesExist) {
      newValue.splice(newValue.indexOf(index), 1); // If it does remove it from array
    } else {
      newValue.push(index); // If not push it into the array
    }
    this.setState({
      selected: newValue,
    });
  };
/* eslint react/jsx-no-bind: 0 */
// I have to do this cause of the ref and my linting rules
  render() {
    const { classes, items } = this.props;
    const slides = this.processPanels(items);
    const bullets = this.processBullets(items);
    return (
      <div className={classes.sideContainer} ref={(ref) => this.sideContainer = ref}>
      {bullets}
      <ReactTransitionGroup
        component="ul"
        className={classes.animateList}
      >
        {slides}
      </ReactTransitionGroup>
      </div>
    );
  }
}
