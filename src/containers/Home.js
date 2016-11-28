import React from 'react';
import { withRouter } from 'react-router';
import { resolve } from '../styles';
import AssetManager from '../utils/AssetManager';
import SiteStyles from '../styles/Site.less';

import RadialNav from '../components/RadialNav';
import RadialStyles from '../components/RadialNav.less';

class Home extends React.Component {
  static displayName = 'Home';
  static propTypes = {
    classes: React.PropTypes.object,
    router: React.PropTypes.shape({
      push: React.PropTypes.func.isRequired,
    }).isRequired,
    items: React.PropTypes.array,
    history: React.PropTypes.object,
  };

  static defaultProps = {
    classes: SiteStyles,
    items: [
      { name: 'dance', link: 'slickshot' },
      { name: 'cube', link: 'cube' },
      { name: 'home', link: '' },
    ],
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
    const { router } = this.props;
    router.push(path);
  }
  startLoop = () => {
    const checkSound = this.sounds.ambient1.data.playing();
    if (!checkSound) {
      this.sounds.ambient1.data.play();
      this.sounds.ambient1.data.fade(0, 0.5, 4000);
    }
  };
  stopLoop = () => {
    this.sounds.ambient1.data.fade(0.5, 0, 4000);
    setTimeout(() => {
      this.sounds.ambient1.data.stop();
    }, 4000);
  };

  render() {
    const { items } = this.props;
    const background = `home${3 + ~~(Math.random() * 3)}`;
    return (
      <div {...resolve(this.props, 'container', background)}>
        <div {...resolve(this.props, 'widget')}>
          <RadialNav items = {items} classes = {RadialStyles} clickHandler = {this.onClick} />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
