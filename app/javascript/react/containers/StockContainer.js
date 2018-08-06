import React from 'react';
import InputField from '../components/InputField'

class StockContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stockTicker: ''
    }
    this.handleStockTickerChange = this.handleStockTickerChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClearForm(event){
    event.preventDefault();
    this.setState({
      stockTicker: ''
    });
  }

  handleStockTickerChange(event) {
    this.setState({stockTicker: event.target.value});
  }

  handleSubmit(event){
    event.preventDefault();

    let body = {
      symbol: this.state.stockTicker
    }
    console.log("Getting stock data for: " + body.symbol)
    this.handleClearForm(event);
  }

  componentDidMount() {
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
      </div>
    )
  }
}

export default StockContainer;
