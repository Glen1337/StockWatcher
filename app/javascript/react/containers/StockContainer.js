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

  getDataForStockChart(){
    let arrayOfArrays = []
    fetch(`https://api.iextrading.com/1.0/stock/${this.state.stockTicker}/chart/1y`)
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
        arrayOfArrays.push([obj["date"], obj["open"], obj["high"], obj["low"], obj["close"]]);
      });
      this.setState({
        show: true,
        currentPrices: arrayOfArrays
      });
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  componentDidUpdate(prevProps, prevState){
    var table, mapping, chart;

    if (this.state.currentPrices.length > 1 && this.state.show){
      debugger;
      this.refs.myInput.innerHTML = '';
      // node = this.myRef.current
      debugger;
      table = anychart.data.table();
      table.addData(this.state.currentPrices);

      mapping = table.mapAs();
      mapping.addField('open', 1, 'first');
      mapping.addField('high', 2, 'max');
      mapping.addField('low', 3, 'min');
      mapping.addField('close', 4, 'last');
      mapping.addField('value', 4, 'last');

      chart = anychart.stock();

      chart.plot(0).ohlc(mapping).name('Stock Chart');
      chart.title('AnyStock Demo');
      debugger;
      chart.container('container');
      debugger;
      chart.draw();
      this.setState({show: false})
      this.handleClearForm(event);
    }
  }
  // shouldComponentUpdate(nextProps, nextState){
  //   if (this.state.show)
  // }

  handleSubmit(event){
    event.preventDefault();
    this.getDataForStockChart();

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
