import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';
import style from './style.css';

class Chart extends React.Component {

  constructor() {
    super();
    this.state = { market: undefined };
  }

  render () {
    const { market } = this.state;
    if (!market) {
      return (
        <div>Loading...</div>
      );
    }
    return (
      <webview
        id="foo"
        src={`https://bittrex.com/market/MarketStandardChart?marketName=${market}`}
      />
    );
  }

  componentDidMount() {
    ipcRenderer.once('onMarket', (event, { market }) => {
      this.setState({ market });
    });
  }

}

ReactDOM.render(<Chart />, document.getElementById('container'));
