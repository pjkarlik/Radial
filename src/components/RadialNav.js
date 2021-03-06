import React from 'react';
import { resolve } from '../styles';
import AssetManager from '../utils/AssetManager';

export default class Navigation extends React.Component {
  static displayName = 'Navigation';
  static propTypes={
    classes: React.PropTypes.object,
    mod: React.PropTypes.number,
    items: React.PropTypes.array,
    clickHandler: React.PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.assetManager = new AssetManager();
    this.assetManager.downloadAll();
    this.sounds = this.assetManager.assets;
    this.state = {
      menu: false,
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.startLoop('loop');
    }, 1000);
  }
  componentWillUnmount() {
    this.stopLoop('loop');
    const { mod } = this.props;
    const playClip = this.sounds[`theme${mod}action`];
    playClip.data.fade(0.4, 0, 500);
    if (this.state.menu) {
      setTimeout(() => {
        playClip.data.stop();
      }, 500);
    }
  }
  getPosition = (index) => {
    const { items, classes } = this.props;
    const { menu } = this.state;
    const size = classes.buttonSize;
    const steps = 360 / items.length;
    const top = menu ? `${Math.sin(steps * index * Math.PI / 180) * (size * 2.25) + size / 2}px` : '50%';
    const left = menu ? `${Math.cos(steps * index * Math.PI / 180) * (size * 2.25) + size / 2}px` : '50%';
    return {
      top,
      left,
    };
  };

  menuToggle = (event) => {
    event.preventDefault();
    const path = event.target.getAttribute('href') || null;
    if (path) {
      setTimeout(() => this.props.clickHandler(path), 500);
    }
    setTimeout(() => {
      const { mod } = this.props;
      if (this.state.menu) {
        this.assetManager.assets[`theme${mod}open`].data.play();
        this.startLoop('action');
      } else {
        this.assetManager.assets[`theme${mod}close`].data.play();
        this.stopLoop('action');
      }
    }, 3);
    this.setState({
      menu: !this.state.menu,
    });
  };

  handleHover = (event) => {
    event.preventDefault();
    const { mod } = this.props;
    setTimeout(() => this.assetManager.assets[`theme${mod}hover`].data.play(), 3);
  };
  startLoop = (type) => {
    const { mod } = this.props;
    const playClip = this.sounds[`theme${mod}${type}`];
    const checkSound = false;
    if (!checkSound) {
      playClip.data.play();
      playClip.data.fade(0, 0.4, 3000);
    }
  };
  stopLoop = (type) => {
    const { mod } = this.props;
    const playClip = this.sounds[`theme${mod}${type}`];
    playClip.data.fade(0.4, 0, 3000);
    setTimeout(() => {
      playClip.data.stop();
    }, 3000);
  };
  render() {
    const { items, classes, mod } = this.props;
    const themeClasses = `theme${mod}`;
    const { menu } = this.state;

    const navigation = items.map((item, index) => {
      const position = this.getPosition(index);
      const inlineStyle = {
        ...position,
        transitionDelay: `${index * 50}ms`,
      };
      const link = (
        <a href={`/${item.link}`}
          onClick = {this.menuToggle}
          onMouseEnter = {this.handleHover}
          key = {`link${index}`}
          {...resolve(this.props, 'button', themeClasses, menu ? 'open' : null)}
          style = {inlineStyle}
        >
          {item.name}
        </a>
      );
      return link;
    });

    return (
      <div className={classes.wrapper}>
        <button
          {...resolve(this.props, 'circle', themeClasses, menu ? 'open' : null)}
          onClick = {this.menuToggle}
        >
          <span>
            {this.state.menu ? 'close' : 'open' }
          </span>
        </button>
        {navigation}
      </div>
    );
  }
}
