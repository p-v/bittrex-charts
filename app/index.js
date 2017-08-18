import React from 'react';
import ReactDOM from 'react-dom';
import rp from 'request-promise';
import openChartWindow from './chart';

const MarketRow = (props) => {
  return (
    <div onClick={() => props.onMarketClick(props.marketName)}>
      {props.marketName}
    </div>
  );
}

class App extends React.Component {

  constructor() {
    super();
    this.state = { markets: [], error: null };
    this.fetchMarkets = this.fetchMarkets.bind(this);
    this.onMarketClick = this.onMarketClick.bind(this);
    this.fetchMarkets();
  }

  onMarketClick(marketName) {
    openChartWindow(marketName);
  }

  fetchMarkets() {
    rp('https://bittrex.com/api/v1.1/public/getmarkets')
    .then((htmlResponse) => {
      const jsonResponse = JSON.parse(htmlResponse);
      if (jsonResponse.success) {
        const markets = jsonResponse.result.map(res => res.MarketName);
        this.setState({ markets });
      } else {
        this.setState({ error: 'Error occurred while fetching markets' });
      }
    })
    .catch((error) => {
      this.setState({ error: 'Error occurred while fetching markets' });
    });
  }

  render () {
    const { markets, error } = this.state;
    if (error) {
      return (
        <div>
          {error}
        </div>
      );
    }
    const rows = markets && markets.length > 0 &&
      markets.map((market, index) => (<MarketRow key={index} marketName={market} onMarketClick={this.onMarketClick} />));
    return (
      <div>
        {rows}
      </div>
    );
  }
}

ReactDOM.render(<App/>,document.getElementById('app'))
