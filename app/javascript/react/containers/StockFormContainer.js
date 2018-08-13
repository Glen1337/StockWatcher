import React, { Component } from 'react';
import InputField from '../components/InputField'

class StockFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticker: ''
    }
    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({ticker: ''})
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formPayload = {ticker: this.state.ticker.toUpperCase()};
    this.props.changeTicker(formPayload);
    this.handleClearForm(event);
  }

  handleTickerChange(event) {
    this.setState({ ticker: event.target.value })
  }

  render() {
    return (
      <div className="row">
        <form onSubmit={this.handleFormSubmit}>
          <InputField
            label='Stock Symbol'
            name='ticker'
            content={this.state.ticker}
            handleChange={this.handleTickerChange}
          />
          <div className="small-4 medium-4 large-4 small-centered medium-centered large-centered text-center columns">
            <button className="button small" type='submit'>Get Stock Info</button>
          </div>
        </form>
      </div>
    );
  }
}

export default StockFormContainer;
