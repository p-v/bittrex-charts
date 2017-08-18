import React from 'react';
import ReactDOM from 'react-dom';
import rp from 'request-promise';
import openChartWindow from './chart';
import Loader from './loader';
import './app.global.css';
import Style from './style.css';

const MarketRow = (props) => {
  return (
    <div
      onClick={() => props.onMarketClick(props.marketName)}
      className={Style.market}
    >
      {props.marketName}
    </div>
  );
}

class App extends React.Component {

  constructor() {
    super();
    this.state = { markets: [], error: null, search: '' };
    this.fetchMarkets = this.fetchMarkets.bind(this);
    this.onMarketClick = this.onMarketClick.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.fetchMarkets();
  }

  onSearchChange(event) {
    this.setState({ search: event.target.value });
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

  render() {
    const { markets, error, search } = this.state;
    if (error) {
      return (
        <div>
          {error}
        </div>
      );
    }
    if (!markets || markets.length === 0) {
      return (
        <div className={Style.loader}>
          <Loader />
          <div className={Style.marketLoader}>Loading Markets...</div>
        </div>
      );
    }
    const rows = markets && markets.length > 0 &&
      markets.filter(market => market.toLowerCase().indexOf(search.toLowerCase()) !== -1).map((market, index) => {
        return (
          <MarketRow
            key={market}
            marketName={market}
            onMarketClick={this.onMarketClick}
          />
        )
    });
    return (
      <div>
        <div className={Style.header}>
          <h2 className={Style.header}>Markets</h2>
          <input
            type="text"
            onChange={this.onSearchChange}
            placeholder="Search Market"
          />
        </div>
        <div className={Style.content}>
          {rows}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App/>,document.getElementById('app'))
