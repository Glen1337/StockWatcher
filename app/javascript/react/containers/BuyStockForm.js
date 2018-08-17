import React, { Component } from 'react';
import InputField from '../components/InputField'

class BuyStockForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0,
      portfolio: 0,
      notes: '',
      portOptions: [],
      balance: 0,
    }
    this.handleNotesChange = this.handleNotesChange.bind(this);
    this.handlePortfolioChange = this.handlePortfolioChange.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
      fetch(`/api/v1/portfolios`, {credentials: 'same-origin'})
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
        this.setState({
          balance: body.user.balance,
        //  balance: body.portfolios[0].user.balance,
          portOptions: body.portfolios,
          portfolio: body.portfolios[0].id
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
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
    //dont go to top of screen when buy btn is clicked
    //window.scrollTo(0, 0);
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
    let portfolios = this.state.portOptions;
    let optionItems = portfolios.map((portfolio) => {
      return <option value={portfolio.id} key={portfolio.id}>{portfolio.name}</option>
    });

    return (
      <div>
        <div className="row">
          <div className="small-6 medium-6 large-6 columns">
            <h2>Add To A Portfolio</h2>
          </div>
          <div className="small-6 medium-6 large-6 columns">
            <h2>Purchase Power: {SignNumOutput(parseFloat(this.state.balance), '$')}</h2><br />
          </div>
        </div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Portfolio
            <select
            className="green-border"
             name='portfolio'
             value={this.state.portfolio}
             onChange={this.handlePortfolioChange}>
             {optionItems}
           </select>
         </label>
          <InputField
            label='Notes'
            name='notes'
            content={this.state.notes}
            handleChange={this.handleNotesChange}
          />
          <label>Quantity
            <input
            min='1'
            value='1'
            type='number'
            name='quantity'
            value={this.state.quantity}
            onChange={this.handleQuantityChange}
            />
          </label>
          <button className="button small" type='submit'>Add Stock</button>
        </form>
      </div>
    );
  }
}
export default BuyStockForm;
