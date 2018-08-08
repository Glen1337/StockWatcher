import React from 'react';
import InputField from '../components/InputField'

const divStyle = {
  // width: '100%',
  // height: '100%'
};

class StockContainer extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      stockTicker: '',
      currentPrices: [],
      show: false
    }
    this.handleStockTickerChange = this.handleStockTickerChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getDataForStockChart = this.getDataForStockChart.bind(this);
  }

  handleClearForm(event){
    // event.preventDefault();
    this.setState({ stockTicker: '' });
  }

  handleStockTickerChange(event) {
    this.setState({stockTicker: event.target.value});
  }

  getDataForStockChart(event){
    let arrayOfArrays = []
    fetch(`https://api.iextrading.com/1.0/stock/${this.state.stockTicker}/chart/3m`)
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
      body.forEach(obj => {
        arrayOfArrays.push([obj["date"], obj["open"], obj["high"], obj["low"], obj["close"],obj["volume"]]);
      });
      debugger;
      this.setState({
        // state undefined here
        stockTicker: this.state.stockTicker,
        show: true,
        currentPrices: arrayOfArrays
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
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

      // Price plot
      let plot_1 = chart.plot(0);

      // Volume plot
      let plot_2 = chart.plot(1);

      // Change crosshair, grid, and x-axis labels for first plot
      plot_1.yGrid().enabled(true);
      plot_1.crosshair().xStroke("#A9A9A9", 1.5, "10 5", "round");
      chart.plot(0).yGrid().stroke({dash: "5 25"});
      let xAxis = chart.plot(0).xAxis();
      xAxis.labels().position('right').anchor('left_center');
      xAxis.minorLabels().position('right').anchor('left_center');
      xAxis.background('#ADD8E6');
      xAxis.height(40);

      // Set series type for volume chart
      chart.plot(1).column(volMapping).name('Volume');

      // Set the series type
      chart.plot(0).candlestick(mapping).name('Company');
      // let grouping = chart.grouping();
      // grouping.minPixPerPoint(1);
      debugger;
      // Chart title
      // state and prevState not working here
      chart.title(this.state.stockTicker);
      chart.title(prevState.stockTicker);
      chart.container('container');

      chart.draw();
      this.setState({show: false})
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   if (this.state.show)
  // }

  handleSubmit(event){
    event.preventDefault();
    this.getDataForStockChart();
    this.handleClearForm(event);
  }

  render() {
    return(
      <div>
        <h1>Research/Add a Stock</h1>
        <form onSubmit={this.handleSubmit}>
          <InputField
            label='Stock Symbol'
            name='ticker'
            content={this.state.stockTicker}
            handleChange={this.handleStockTickerChange}
          />
          <input type='submit' value='Get Info'/>
        </form>
        <div id="container" ref="myInput" style={divStyle}></div>
      </div>
    )
  }
}

export default StockContainer;
