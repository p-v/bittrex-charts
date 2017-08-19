import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer, remote } from 'electron';
import Style from './style.css';
import Sidebar, { sidebarActions } from './sidebar';
import PreloadScript from './preload.asitis.js';
import Loader from '../loader';
import '../app.global.css';

class Chart extends React.Component {

  constructor() {
    super();
    this.state = { market: undefined, showSidebar: false, loaderTimeoutReached: false };
    this.onSidebarMouseEnter = this.onSidebarMouseEnter.bind(this);
    this.onSidebarAction = this.onSidebarAction.bind(this);
  }

  onSidebarAction(action) {
    switch (action) {
      case sidebarActions.TOGGLE_NAVIGATION:
        this.webview.send("toggle_navigation");
        break;
      case sidebarActions.TOGGLE_TOOLBAR:
        this.webview.send("toggle_toolbar");
        
        break;
      default:
        break;
    }
  }

  onSidebarMouseEnter() {
    this.setState({ showSidebar: true });
  }

  render () {
    const { market, showSidebar, loaderTimeoutReached } = this.state;
    if (!market || !loaderTimeoutReached) {
      return (
        <div>
          <Loader />
        </div>
      );
    }
    return (
      <div>
        <div
          className={Style.sidebarTrigger}
          onMouseEnter={this.onSidebarMouseEnter}
        />
        <Sidebar
          showSidebar={showSidebar}
          onSidebarAction={this.onSidebarAction}
        />
        <webview
          ref={(view) => this.webview = view}
          className={Style.webview}
          src={`https://bittrex.com/market/MarketStandardChart?marketName=${market}`}
          preload={PreloadScript}
        />
      </div>
    );
  }

  componentDidMount() {
    ipcRenderer.once('onMarket', (event, { market }) => {
      this.setState({ market });
    });
    setTimeout(() => {
      this.setState({ loaderTimeoutReached: true });
    }, 1000);
  }

  componentDidUpdate() {
    if (this.webview && !this.webviewListenerAdded) {
      this.webviewListenerAdded = true;
      // Process the data from the webview
      this.webview.addEventListener('ipc-message', (event) => {
        const data = event.channel;
        if (data.type === 'click') {
          this.setState({ showSidebar: false });
        } else if (data.type === 'reset-title' && this.state.market) {
          const currentWindow = remote.getCurrentWindow();
          currentWindow.setTitle(this.state.market);
        }
      });
    }
  }

}

ReactDOM.render(<Chart />, document.getElementById('container'));
