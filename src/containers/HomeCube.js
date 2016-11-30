import React from 'react';
import { resolve } from '../styles';
import Cube from '../components/Cube';
import CubeStyles from '../components/Cube.less';
import { withRouter } from 'react-router';
import AssetManager from '../utils/AssetManager';
import SiteStyles from '../styles/Site.less';
/* eslint no-console: 0 */
/* eslint arrow-body-style: 0 */
/* eslint react/jsx-no-bind: 0 */
class Home extends React.Component {
  static displayName = 'Home';
  static propTypes = {
    classes: React.PropTypes.object,
    items: React.PropTypes.array,
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
  }
  startLoop = () => {
    const checkSound = this.sounds.orch.data.playing();
    if (!checkSound) {
      this.sounds.orch.data.play();
      this.sounds.orch.data.fade(0, 0.6, 3000);
    }
  };
  stopLoop = () => {
    this.sounds.orch.data.fade(0.6, 0, 6000);
    setTimeout(() => {
      this.sounds.orch.data.stop();
    }, 6000);
  };
  render() {
    const { classes } = this.props;
    const background = `home${5 + ~~(Math.random() * 6)}`;
    return (
      <div {...resolve(this.props, 'container', background)}>
        <div {...resolve(this.props, 'widget')}>
        <button className = {classes.homeButton} onClick = {() => { this.onClick('/'); }}>
          home
        </button>
        <Cube
          interactive
          initialX={-42}
          classes={CubeStyles}
        >
          <div className={CubeStyles.front}>J</div>
          <div className={CubeStyles.back}>pjkarlik@gmail.com</div>
          <div className={CubeStyles.right}>K</div>
          <div className={CubeStyles.left}>P</div>
          <div className={CubeStyles.top}>user interface architect</div>
          <div className={CubeStyles.bottom}>front-end developer</div>
        </Cube>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
