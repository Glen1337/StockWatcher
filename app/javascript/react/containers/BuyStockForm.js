import React, { Component } from 'react';
import InputField from '../components/InputField'

class BuyStockForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      portfolio: ''
    }
    this.handlePortfolioChange = this.handlePortfolioChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps){

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ticker !== nextProps.ticker){
      console.log("Fundamentals fetch in FundamentalsPanel")
      fetch(`https://api.iextrading.com/1.0/stock/${nextProps.ticker}/stats`)
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
        this.setState({stats: body});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({quantity: 0, portfolio: ''})
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formPayload = {
      quantity: this.state.quantity,
      portfolio: this.state.portfolio
    };
    // bubble up passed-in handler
    this.props.buyStock(formPayload);
    this.handleClearForm(event);
  }

  handlePortfolioChange(event) {
    this.setState({portfolio: event.target.value })
  }

  handleQuantityChange(event) {
    this.setState({quantity: event.target.value })
  }

  render() {
    return (
      <form onSubmit={this.handleFormSubmit}>
        <InputField
          label='Portfolio'
          name='portfolio'
          content={this.state.portfolio}
          handleChange={this.handlePortfolioChange}
        />
        <InputField
          label='Quantity'
          name='quantity'
          content={this.state.quantity}
          handleChange={this.handleQuantityChange}
        />
        <input type='submit' value='Buy Stock'/>
      </form>
    );
  }
}

export default BuyStockForm;
