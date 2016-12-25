import React from 'react';
import { resolve } from '../styles';
import { withRouter } from 'react-router';
import AssetManager from '../utils/AssetManager';

import SiteStyles from '../styles/Site.less';
import IsometricMap from '../components/IsometricMap';

/* eslint no-console: 0 */
/* eslint arrow-body-style: 0 */
/* eslint react/jsx-no-bind: 0 */
class Home extends React.Component {
  static displayName = 'Home';
  static propTypes = {
    classes: React.PropTypes.object,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,
  };
  static defaultProps = {
    classes: SiteStyles,
  };

  constructor(props) {
    super(props);
    this.assetManager = new AssetManager();
    this.assetManager.downloadAll();
    this.sounds = this.assetManager.assets;
    // this.background = ~~(Math.random() * 3);
  }
  componentDidMount() {
    this.isometric = new IsometricMap(this.container);
    setTimeout(() => {
      this.startLoop();
      setTimeout(() => {
        this.stopLoop();
      }, 28000);
    }, 400);
  }
  componentWillUnmount() {
    this.isometric.cancelAnimation();
    this.stopLoop();
  }

  onClick = (path) => {
    this.stopLoop();
    const { router } = this.props;
    router.push(path);
  };
  startLoop = () => {
    const checkSound = this.sounds.isoloop.data.playing();
    if (!checkSound) {
      this.sounds.isoloop.data.play();
      this.sounds.isoloop.data.fade(0, 0.4, 6000);
    }
  };
  stopLoop = () => {
    this.sounds.isoloop.data.fade(0.4, 0, 6000);
    setTimeout(() => {
      this.sounds.isoloop.data.stop();
    }, 6000);
  };

  render() {
    const { classes } = this.props;
    return (
      <div {...resolve(this.props, 'container', 'slowdrip')} ref={(c) => { this.container = c; }} >
        <button className = {classes.homeButton} onClick = {() => { this.onClick('/'); }}>
          home
        </button>
      </div>
    );
  }
}

export default withRouter(Home);
