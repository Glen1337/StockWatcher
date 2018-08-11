import React, { Component } from 'react';
import InputField from '../components/InputField'

class BuyStockForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      portfolio: '',
      notes: ''
    }
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handlePortfolioChange = this.handlePortfolioChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleClearForm(event) {
    event.preventDefault();
    this.setState({quantity: 0, portfolio: '', notes: ''})
  }

  handleFormSubmit(event) {
    event.preventDefault();
    let formPayload = {
      notes: this.state.notes,
      quantity: this.state.quantity,
      portfolio: this.state.portfolio
    };
    this.props.buyStock(formPayload);
    this.handleClearForm(event);
    window.scrollTo(0, 0);
  }

  handlePortfolioChange(event) {
    this.setState({portfolio: event.target.value })
  }

  handleQuantityChange(event) {
    this.setState({quantity: event.target.value })
  }

  handleNotesChange(event){
    this.setState({notes: event.target.value})
  }

  render() {
    return (
      <div>
        <h2>Buy This Stock</h2>
        <form onSubmit={this.handleFormSubmit}>
          <InputField
            label='Portfolio'
            name='portfolio'
            content={this.state.portfolio}
            handleChange={this.handlePortfolioChange}
          />
          <InputField
            label='Notes'
            name='notes'
            content={this.state.notes}
            handleChange={this.handleNotesChange}
          />
          <label>Quantity
            <input
            min='1'
            type='number'
            name='quantity'
            value={this.state.quantity}
            onChange={this.handleQuantityChange}
            />
          </label>
          <input type='submit' value='Buy Stock'/>
        </form>
      </div>
    );
  }
}

export default BuyStockForm;
