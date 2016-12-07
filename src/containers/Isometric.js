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
  }
  componentDidMount() {
    const demo = new IsometricMap(this.container);

    setTimeout(() => {
      this.startLoop();
    }, 400);
    return demo;
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
    const checkSound = this.sounds.egyptloop.data.playing();
    if (!checkSound) {
      this.sounds.egyptloop.data.play();
      this.sounds.egyptloop.data.fade(0, 0.7, 3000);
    }
  };
  stopLoop = () => {
    this.sounds.egyptloop.data.fade(0.7, 0, 6000);
    setTimeout(() => {
      this.sounds.egyptloop.data.stop();
    }, 6000);
  };

  render() {
    return (
      <div {...resolve(this.props, 'container')} ref={(c) => { this.container = c; }} >
      </div>
    );
  }
}

export default withRouter(Home);
