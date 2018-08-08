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
    this.handleNewStockData = this.handleNewStockData.bind(this)
  }

  handleClearForm(event){
    // event.preventDefault();
    this.setState({ stockTicker: '' });
  }

  handleStockTickerChange(event) {
    this.setState({stockTicker: event.target.value});
  }

  getDataForStockChart(event){
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

      // Price plot
      let plot_1 = chart.plot(0);
      plot_1.candlestick(mapping).name(this.state.stockTicker);

      plot_1.yGrid().enabled(true);
      // Change crosshair, grid, and x-axis labels for first plot
      plot_1.crosshair().xStroke("#483d8b", 1.6, "round");
      plot_1.crosshair().yStroke("#483d8b", 1.6, "round");

      let xAxis = plot_1.xAxis();
      xAxis.labels().position('right').anchor('left_center');
      xAxis.minorLabels().position('right').anchor('left_center');
      xAxis.background('#D2E5F6');
      xAxis.height(40);
      // Set the series type

      // Volume plot
      let plot_2 = chart.plot(1);
      plot_2.column(volMapping).name('Volume');

      plot_2.yMinorGrid().palette(["LightGrey", null]);
      // Set series type for volume chart
      plot_2.crosshair().xStroke("#483d8b", 1.6, "round");
      plot_2.crosshair().yStroke("#483d8b", 1.6, "round");

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

  handleSubmit(event){
    event.preventDefault();
    this.getDataForStockChart();
    // this.handleClearForm(event);
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
