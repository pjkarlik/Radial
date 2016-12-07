import React from 'react';
import { withRouter } from 'react-router';
import { resolve } from '../styles';

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
      { name: 'dance', link: 'dance' },
      { name: 'ismtk', link: 'ismtk' },
      { name: 'home', link: '' },
    ],
  };
  constructor(props) {
    super(props);
    this.background = ~~(Math.random() * 3);
  }
  onClick = (path) => {
    const { router } = this.props;
    router.push(path);
  }
  render() {
    const { items } = this.props;
    return (
      <div {...resolve(this.props, 'container', `home${this.background}`)}>
        <div {...resolve(this.props, 'widget')}>
          <RadialNav items = {items} mod = {this.background} classes = {RadialStyles} clickHandler = {this.onClick} />
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
