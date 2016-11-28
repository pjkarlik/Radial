/* global process.env */
import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../redux/configureStore';

/* Navigation Component */
import AppStyles from './App.less';
import SiteStyles from '../styles/Site.less';
// Set up store and load data.
const store = configureStore();
export default class App extends React.Component {
  static displayName = 'App';
  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
        <Provider store={store}>
          <div className = {AppStyles.bodyContainer}>
            <div className = {SiteStyles.badge}>
              <h3>paul j karlik</h3>
              <p>ui architect &amp; creative technologist</p>
            </div>
            {this.props.children}
          </div>
        </Provider>
    );
  }
}
