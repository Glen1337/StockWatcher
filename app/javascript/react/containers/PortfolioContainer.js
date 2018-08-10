import React from 'react';
import PortfolioTile from '../components/PortfolioTile'
import PortfolioFormContainer from './PortfolioFormContainer'


class PortfolioContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      portfolios: []
    }
    this.addPortfolio = this.addPortfolio.bind(this);
    this.deletePortfolio = this.deletePortfolio.bind(this);

  }

  componentDidMount() {
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
        portfolios: body.portfolios
      })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  deletePortfolio(portfolioId){
    let payLoad = {id: portfolioId}
    fetch(`/api/v1/portfolios/${portfolioId}`,{
      credentials: 'same-origin',
      method: 'DELETE',
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
    .then(responseData => {
      this.setState({portfolios: responseData.portfolios})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addPortfolio(newPortfolio){
    fetch('/api/v1/portfolios/',{
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(newPortfolio),
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
    .then(responseData => {
      this.setState({portfolios: [...this.state.portfolios, responseData]})
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let portfolios = this.state.portfolios.map((portfolio) => {

      let handleDeleteClick = () => { this.deletePortfolio(portfolio.id) }

      return (
        <PortfolioTile
          key={portfolio.id}
          id={portfolio.id}
          name={portfolio.name}
          deleteClick={handleDeleteClick}
        />
      )
    })
    return(
      <div>
        <h1>Portfolios</h1>
        {portfolios}
        <h2>Create A New Portfolio</h2>
        <PortfolioFormContainer addPortfolio={this.addPortfolio} />
      </div>
    )
  }
}

export default PortfolioContainer;
