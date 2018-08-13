import React from 'react';
import InputField from '../components/InputField'
import LogoTile from '../tiles/LogoTile'
import StockFormContainer from './StockFormContainer'
import StatisticsPanel from './StatisticsPanel'
import BuyStockForm from './BuyStockForm'
import BackButton from '../components/BackButton'


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
      show: false,
      valid: null
    }
    this.handleBuyStock= this.handleBuyStock.bind(this);
    this.handleStockTickerChange = this.handleStockTickerChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.getDataForStockChart = this.getDataForStockChart.bind(this);
    this.handleNewStockData = this.handleNewStockData.bind(this)
  }

  getDataForStockChart(ticker){
    console.log("Chart data fetch in StockContainer");
    fetch(`https://api.iextrading.com/1.0/stock/${ticker}/chart/1y`)
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
    .catch(error => {this.setState({valid: false}); console.error(`Error in fetch: ${error.message}`)});
  }

  handleNewStockData(body) {
    let arrayOfArrays = []
    body.forEach(obj => {
      arrayOfArrays.push([obj["date"], obj["open"], obj["high"], obj["low"], obj["close"],obj["volume"]]);
    });
    this.setState({
      show: true,
      currentPrices: arrayOfArrays,
      valid: true
    });
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.currentPrices.length > 1 && this.state.show){
      let table, mapping, chart;
      // Clear container div
      this.refs.myInput.innerHTML = '';

      // Create whole chart
      chart = anychart.stock();

      //Top, right, bottom, left
      chart.padding(10, 10, 10, 65);

      let grouping = chart.grouping();
      grouping.minPixPerPoint(10);

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

      // Mapping for MFI
      let mfiMapping = table.mapAs({'high': 2, 'low': 3, 'close': 4, 'volume': 5});

      // Price plot
      let plot_1 = chart.plot(0);
      plot_1.xAxis().ticks(true).minorTicks(true);
      let candleSeries = plot_1.candlestick(mapping);
      candleSeries.name(this.state.stockTicker);
      // Change color of candlesticks
      candleSeries.risingFill("#60C03F");
      candleSeries.fallingFill("#CB2113");
      candleSeries.risingStroke("#115C09");
      candleSeries.fallingStroke("#7F0004");
      // Change crosshair, grid, and x-axis labels for first plot
      plot_1.yGrid().enabled(true);
      plot_1.crosshair().xStroke("#483d8b", 1.6, "round");
      plot_1.crosshair().yStroke("#483d8b", 1.6, "round");

      // Volume plot
      let plot_2 = chart.plot(1);
      // plot_2.title('Volume');
      plot_2.xAxis().ticks(true).minorTicks(true);
      plot_2.column(volMapping).name('Volume');
      plot_2.yMinorGrid().palette(["LightGrey", null]);
      plot_2.crosshair().xStroke("#483d8b", 1.6, "round");
      plot_2.crosshair().yStroke("#483d8b", 1.6, "round");

      // MFI plot
      let plot_3 = chart.plot(2);
      let mfiIndicator = plot_3.mfi(mfiMapping, 8 , "area").series()
      mfiIndicator.fill("#ffa500");
      mfiIndicator.stroke("2 green");
      plot_3.xAxis().ticks(true).minorTicks(true);

      // MACD plot
      let plot_4 = chart.plot(3);
      let macdIndicator = plot_4.macd(mapping, 12, 26, 9);
      plot_4.xAxis().ticks(true).minorTicks(true);

      macdIndicator.macdSeries().stroke('#bf360c');
      macdIndicator.signalSeries().stroke('#ff6d00');
      macdIndicator.histogramSeries().fill('#ffe082');

      // Stochastic plot
      let plot_5 = chart.plot(4);
      let stochastic = plot_5.stochastic(mapping, 24, "EMA", 10, "SMA", 5);
      plot_5.xAxis().ticks(true).minorTicks(true);
      let stochastic_k = stochastic.kSeries();
      stochastic_k.stroke("2 #ffa500");
      let stochastic_d = stochastic.dSeries();
      stochastic_d.stroke("2 #191970");


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
        notes: purchase.notes,
        quantity: purchase.quantity,
        portfolio: purchase.portfolio,
        ticker: this.state.stockTicker.toUpperCase(),
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
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    console.log("stock container render");
    let chartsTitle;
    let validitity =''
    let form;
    let pageHead = ''
    if (this.state.stockTicker){

    }
    if (this.state.valid === null){
      pageHead='';
    }else if (!this.state.valid){
      pageHead = <h1 className="alert-box alert">Invalid Ticker</h1>;
    }else{
      chartsTitle = <h2>Charts</h2>
      form = <BuyStockForm buyStock={this.handleBuyStock} />
      pageHead = <h1 className="green-title">{this.state.stockTicker}</h1>;
    }
    return(
      <div>
        <div className="row">
          <div className="small-centered medium-centered large-centered small-8 large-8 medium-8 columns">
            <h1 className="text-center">Research and Add a Stock</h1>
            <StockFormContainer changeTicker={this.handleStockTickerChange}/>
          </div>
        </div>
        <div className="row text-center">
          {pageHead}
        </div>
        <div className="row">
          <div className="small-9 medium-9 large-9 columns">
            <div className="row">
              {chartsTitle}
              <div id="container" ref="myInput" style={divStyle}></div>
            </div>
            <div className="row">
              <div className="small-8 medium-8 large-8 small-centered large-centered medium-centered columns">
                <br />
                {form}
                <br />
              </div>
            </div>
          </div>
          {/*}<div className="small-1 medium-1 large-1 columns"></div>*/}
          <div className="small-3 medium-3 large-3 columns">
            <h2>&nbsp;</h2>
            <div className="row text-center">
              <LogoTile ticker={this.state.stockTicker}/>
              <br />
            </div>
            <StatisticsPanel ticker={this.state.stockTicker} />
          </div>
        </div>
      </div>
    )
  }
}

export default StockContainer;
