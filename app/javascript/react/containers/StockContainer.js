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
      valid: null,
      errors: []
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
    .then(body => {
      // this.setState({stockTicker: ticker})
      this.handleNewStockData(body, ticker)
    })
    .catch(error => {this.setState({valid: false}); console.error(`Error in fetch: ${error.message}`)});
  }

  handleNewStockData(body, ticker) {
    let arrayOfArrays = []
    body.forEach(obj => {
      arrayOfArrays.push([obj["date"], obj["open"], obj["high"], obj["low"], obj["close"],obj["volume"]]);
    });
    this.setState({
      show: true,
      currentPrices: arrayOfArrays,
      stockTicker: ticker,
      valid: true
    });
  }

  componentDidUpdate(prevProps, prevState){
    if (this.state.currentPrices.length > 1 && this.state.show){

      // Refactor: at the end of chart generating function,
      // iterate through this array of charts and do things to each array
      let plotArray = [];

      let crosshairColor = '#ca68ff';
      let table, mapping, chart;
      // Clear container div
      this.refs.myInput.innerHTML = '';

      // Create whole chart
      chart = anychart.stock();
      anychart.theme('darkGlamour');


      //Top, right, bottom, left
      chart.padding(10, 10, 10, 75);

      // Chart grouping
      let grouping = chart.grouping();
      grouping.maxVisiblePoints(170);

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
      candleSeries.name('Stock price');
      // Change color of candlesticks
      candleSeries.risingFill("#60C03F");
      candleSeries.fallingFill("#CB2113");
      candleSeries.risingStroke("#115C09", 2);
      candleSeries.fallingStroke("#7F0004", 2);
      // Change crosshair, grid, and x-axis labels for first plot
      plot_1.yGrid().enabled(true);
      plot_1.crosshair().xStroke(crosshairColor, 1.6, "round");
      plot_1.crosshair().yStroke(crosshairColor, 1.6, "round");
      plot_1.xAxis().minorTicks().stroke("#808080");

      // plot_1.legend().title(true);
      // plot_1.legend().title().orientation('top').align('left');
      // plot_1.legend().titleFormat(function(){return("Price")});
      // plot_1.legend().titleSeparator(true);

      //EMA 100 on candlestick chart
      let ema15 = plot_1.ema(mapping, 10).series();
      ema15.stroke('2 blue');

      let ema50 = plot_1.ema(mapping, 40).series();
      ema50.stroke('2 purple');

      plot_1.title('Candlestick');
      let title = plot_1.title();
      title.fontWeight(900);

      // plot_1.yAxis().labels().fontColor('black')
      // plot_1.xAxis().labels().fontColor('black')
      // plot_1.yAxis().labels().fontWeight(700)
      // plot_1.xAxis().labels().fontWeight(700)

      // Volume plot
      let plot_2 = chart.plot(1);
      plot_2.title('Volume');
      plot_2.title().fontWeight(900);
      plot_2.xAxis().ticks(true).minorTicks(true);
      plot_2.column(volMapping).name('Volume');
      plot_2.yMinorGrid().palette(["LightGrey", null]);
      plot_2.crosshair().xStroke(crosshairColor, 1.6, "round");
      plot_2.crosshair().yStroke(crosshairColor, 1.6, "round");
      plot_2.xAxis().minorTicks().stroke("#808080");

      // MFI plot
      let plot_3 = chart.plot(2);
      plot_3.title('Money Flow Index');
      plot_3.title().fontWeight(900)
      let mfiIndicator = plot_3.mfi(mfiMapping, 8 , "area").series()
      mfiIndicator.fill("#ffa500");
      mfiIndicator.stroke("2 green");
      plot_3.yGrid().enabled(true);
      plot_3.xAxis().ticks(true).minorTicks(true);
      plot_3.crosshair().xStroke(crosshairColor, 2, "round");
      plot_3.crosshair().yStroke(crosshairColor, 2, "round");
      plot_3.xAxis().minorTicks().stroke("#808080");

      // MACD plot
      let plot_4 = chart.plot(3);
      plot_4.title('MACD');
      plot_4.title().fontWeight(900);
      let macdIndicator = plot_4.macd(mapping, 12, 26, 9);
      plot_4.xAxis().ticks(true).minorTicks(true);
      plot_4.crosshair().xStroke(crosshairColor, 1.6, "round");
      plot_4.crosshair().yStroke(crosshairColor, 1.6, "round");
      plot_4.yGrid().enabled(true);
      plot_4.yGrid().stroke({color: "#808080", dash: "12 5"});
      plot_4.xAxis().minorTicks().stroke("#808080");

      macdIndicator.macdSeries().stroke('#bf360c', 2);
      macdIndicator.signalSeries().stroke('#ff6d00', 2);
      macdIndicator.histogramSeries().fill('#ffe082');

      // Stochastic plot
      let plot_5 = chart.plot(4);
      plot_5.title().fontWeight(900)
      let stochastic = plot_5.stochastic(mapping, 24, "EMA", 10, "SMA", 5);
      plot_5.title('Full Stochastic');
      plot_5.crosshair().xStroke(crosshairColor, 2, "round");
      plot_5.crosshair().yStroke(crosshairColor, 2, "round");
      plot_5.xAxis().ticks(true).minorTicks(true);

      let stochastic_k = stochastic.kSeries();
      stochastic_k.stroke("2 #ffa500");
      let stochastic_d = stochastic.dSeries();
      stochastic_d.stroke("2 #191970");

      plot_5.xAxis().minorTicks().stroke("#808080");
      //plot_5.xAxis().ticks().stroke("#808080");

      //plot_5.xAxis().minorTicks().stroke('gray');
      //plot_5.xAxis().ticks().stroke('gray');

      plot_5.yGrid().enabled(true);
      plot_5.yGrid().stroke('#808080');
      // plot_5.yGrid().stroke({color: '#808080', dash: "12 5"});
      // var xAxis = plot_5.xAxis();
      // xAxis.stroke("black");
      // var xLabels = xAxis.labels();
      // xLabels.fontColor("black");
      // xLabels.fontWeight(700);
      // xLabels.height(30);
      // xLabels.vAlign("middle");
      //
      // let grouping = chart.grouping();
      // grouping.minPixPerPoint(1);
      // Chart title
      // state and prevState not working here

      chart.scroller().column(mapping);

      // access labels
      let labels = chart.scroller().xAxis().labels();
      let minorLabels = chart.scroller().xAxis().minorLabels();
      minorLabels.fontColor('#808080');
      labels.fontColor('#808080');

      // set major labels text format
      labels.format(function () {
        return "'" + anychart.format.dateTime(this.tickValue, "yyyy");
      });

      // set labels color
      labels.fontColor('#000000');

      // set minor labels text format
      minorLabels.format(function (){
        return anychart.format.dateTime(this.tickValue, 'MMM, dd');
      });

      // set minor labels font
      minorLabels.fontColor('#000000');
      minorLabels.fontSize(9);

      // Draw whole chart
      chart.title(this.state.stockTicker);
      chart.title().fontSize(18);
      chart.title().fontWeight(900);

      // set the fill color
  // chart.xScroller().fill("#33CC33");
  //
  // // set the selected fill color
  // chart.xScroller().selectedFill("#339966");
  // background settings
  // background settings

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
            debugger;
            let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(responseData => {
          debugger;
          if (responseData.error) {
            debugger;
              this.setState({errors: responseData.error});
              // set errors in state
          } else {
            debugger;
            this.setState({errors: []});
            //good, clear errors in state
          }
        })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    console.log("stock container render");
    let chartsTitle;
    let validitity =''
    let form;
    let pageHead = ''
    let errorList;
    let errorDiv;

    if(this.state.errors.length > 0){
      errorList = this.state.errors.map(error => {
        return <div key={error}>{error}</div>
      });
      errorDiv = <div className="alert-box alert">{errorList}</div>
    }

    //if (this.state.stockTicker){}
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
        <div className="medium-centered small-centered large-centered columns small-6 medium-6 large-6 row text-center">
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
                <br /><br />
                {form}
                {errorDiv}
                <br />
              </div>
            </div>
          </div>
          <div className="small-3 medium-3 large-3 columns">
            <h2>&nbsp;</h2>
            <div className="row text-center">
              <LogoTile ticker={this.state.stockTicker}/><br />
            </div>
            <StatisticsPanel ticker={this.state.stockTicker} /><br />
          </div>
        </div>
      </div>
    )
  }
}

export default StockContainer;
