import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import Style from './style.css';
import Sidebar, { sidebarActions } from './siderbar';
import PreloadScript from './preload.asitis.js';

class Chart extends React.Component {

  constructor() {
    super();
    this.state = { market: undefined, showSidebar: false };
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
    const { market, showSidebar } = this.state;
    if (!market) {
      return (
        <div>Loading...</div>
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
  }

  componentDidUpdate() {
    if (!this.webviewListenerAdded) {
      this.webviewListenerAdded = true;

      console.log('attach message listener');
      // Process the data from the webview
      this.webview.addEventListener('ipc-message', () => {
        this.setState({ showSidebar: false });
      });
    }
  }

}

ReactDOM.render(<Chart />, document.getElementById('container'));
