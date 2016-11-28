import React from 'react';
import { resolve } from '../styles';
import { withRouter } from 'react-router';
import AssetManager from '../utils/AssetManager';

import SiteStyles from '../styles/Site.less';
import SlickShot from '../components/SlickShot';
import SlickShotStyles from '../components/SlickShot.less';
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
  }
  componentDidMount() {
    setTimeout(() => {
      this.startLoop();
    }, 400);
  }
  componentWillUnmount() {
    setTimeout(() => {
      this.stopLoop();
    }, 400);
  }

  onClick = (path) => {
    this.stopLoop();
    const { router } = this.props;
    router.push(path);
  };
  startLoop = () => {
    const checkSound = this.sounds.drums.data.playing();
    if (!checkSound) {
      this.sounds.drums.data.play();
      this.sounds.drums.data.fade(0, 0.3, 3000);
    }
  };
  stopLoop = () => {
    this.sounds.drums.data.fade(0.3, 0, 6000);
    setTimeout(() => {
      this.sounds.drums.data.stop();
    }, 6000);
  };

  render() {
    const { classes } = this.props;
    // Get Grid Size based on LESS values - used for Snapping to grid //
    const grid = parseInt(SlickShotStyles.gridSize, 10);
    return (
      <div {...resolve(this.props, 'container')}>
        <SlickShot classes = {SlickShotStyles} grid = {grid} />
        <button className = {classes.homeButton} onClick = {() => { this.onClick('/'); }}>
          home
        </button>
      </div>
    );
  }
}

export default withRouter(Home);
