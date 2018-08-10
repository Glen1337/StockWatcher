import React from 'react';
import InputField from '../components/InputField'
import LogoTile from '../components/LogoTile'
import StockFormContainer from './StockFormContainer'
import FundamentalsPanel from './FundamentalsPanel'
import BuyStockForm from './BuyStockForm'


const divStyle = {
  // width: '100%'
  // height: '100%'
  // background-color: 'red'
};

class StockContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stockTicker: '',
      currentPrices: [],
      show: false
    }
    this.handleBuyStock= this.handleBuyStock.bind(this);
    this.handleStockTickerChange = this.handleStockTickerChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.getDataForStockChart = this.getDataForStockChart.bind(this);
    this.handleNewStockData = this.handleNewStockData.bind(this)
  }

  getDataForStockChart(ticker){
    console.log("Chart data fetch in StockContainer");
    fetch(`https://api.iextrading.com/1.0/stock/${ticker}/chart/3m`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(this.handleNewStockData)
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleNewStockData(body) {
    let arrayOfArrays = []
    body.forEach(obj => {
      arrayOfArrays.push([obj["date"], obj["open"], obj["high"], obj["low"], obj["close"],obj["volume"]]);
    });
    this.setState({
      show: true,
      currentPrices: arrayOfArrays
    });
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.currentPrices.length > 1 && this.state.show){
      let table, mapping, chart;
      // Clear container div
      this.refs.myInput.innerHTML = '';

      // Create whole chart
      chart = anychart.stock();

      // Make data table
      table = anychart.data.table();
      table.addData(this.state.currentPrices);

      // Mapping for price data
      mapping = table.mapAs();
      mapping.addField('open', 1, 'first');
      mapping.addField('high', 2, 'max');
      mapping.addField('low', 3, 'min');
      mapping.addField('close', 4, 'last');
      mapping.addField('value', 4, 'last');

      // Mapping for volume data
      let volMapping = table.mapAs({'value': 5});
      let mfiMapping = table.mapAs({'high': 2, 'low': 3, 'close': 4, 'volume': 5});

      // Price plot
      let plot_1 = chart.plot(0);
      let candleSeries = plot_1.candlestick(mapping);
      candleSeries.name(this.state.stockTicker);

      // Change color of candlesticks
      candleSeries.risingFill("#60C03F");
      candleSeries.fallingFill("#CB2113");
      candleSeries.risingStroke("#115C09");
      candleSeries.fallingStroke("#7F0004");


      plot_1.yGrid().enabled(true);
      // Change crosshair, grid, and x-axis labels for first plot
      plot_1.crosshair().xStroke("#483d8b", 1.6, "round");
      plot_1.crosshair().yStroke("#483d8b", 1.6, "round");

      // let xAxis = plot_1.xAxis();
      // xAxis.labels().position('right').anchor('left_center');
      // xAxis.minorLabels().position('right').anchor('left_center');
      // xAxis.background('#D2E5F6');
      // xAxis.height(40);


      // Volume plot
      let plot_2 = chart.plot(1);
      plot_2.column(volMapping).name('Volume');

      plot_2.yMinorGrid().palette(["LightGrey", null]);
      // Set series type for volume chart
      plot_2.crosshair().xStroke("#483d8b", 1.6, "round");
      plot_2.crosshair().yStroke("#483d8b", 1.6, "round");

      // MFI plot
      let plot_3 = chart.plot(2);
      let mfiIndicator = plot_3.mfi(mfiMapping).series()
      mfiIndicator.stroke("2 red");

      // MACD plot
      let plot_4 = chart.plot(3)
      let macdIndicator = plot_4.macd(mapping, 12, 26, 9);
      macdIndicator.macdSeries().stroke('#bf360c');
      macdIndicator.signalSeries().stroke('#ff6d00');
      macdIndicator.histogramSeries().fill('#ffe082');

      // let grouping = chart.grouping();
      // grouping.minPixPerPoint(1);
      // Chart title
      // state and prevState not working here
      // Draw whole chart
      chart.title(this.state.stockTicker);
      // chart.title(prevState.stockTicker);
      chart.container('container');

      chart.draw();
      this.setState({show: false})
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   if (this.state.show)
  // }

  // When 'get info' btn is clicked
  handleStockTickerChange(submission) {
    this.setState({stockTicker: submission.ticker});
    this.getDataForStockChart(submission.ticker);
  }

  handleBuyStock(purchase){
    //cost: this.state.currentPrices[this.state.currentPrices.length - 1],
    fetch(`https://api.iextrading.com/1.0/stock/${this.state.stockTicker}/quote`)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {

      let payLoad = {
        quantity: purchase.quantity,
        portfolio: purchase.portfolio,
        ticker: this.state.stockTicker,
        cost_basis: body.delayedPrice
      }

      fetch(`/api/v1/stock_holdings/`,{
          credentials: 'same-origin',
          method: 'POST',
          body: JSON.stringify(payLoad),
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(info => {debugger;})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  // handleSubmit(event){
  //   event.preventDefault();
  //   this.getDataForStockChart();
  //   // this.handleClearForm(event);
  // }

  render() {
    let chartsTitle;
    if (this.state.stockTicker){
      chartsTitle = <h2>Charts</h2>
    }
    return(
      <div>
        <h1>Research/Add a Stock</h1>
        <StockFormContainer
          changeTicker={this.handleStockTickerChange}
        />
        <LogoTile
          ticker={this.state.stockTicker}
        />
        <BuyStockForm
          buyStock={this.handleBuyStock}
        />
        <FundamentalsPanel
          ticker={this.state.stockTicker}
        />
        {chartsTitle}
        <div id="container" ref="myInput" style={divStyle}></div>

      </div>
    )
  }
}

export default StockContainer;
