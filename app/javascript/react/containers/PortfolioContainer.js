import React from 'react';
import PortfolioTile from '../tiles/PortfolioTile'
import PortfolioFormContainer from './PortfolioFormContainer'
import BackButton from '../components/BackButton'

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
      } else if (response.status == 422){
        return response;
      }else{
          let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
          throw(error);
      }
    })
    .then(response => response.json())
    .then(responseData => {
      if (responseData.error) {
        // debugger;
        // n
        // set the errors in state
      } else {
        this.setState({portfolios: [...this.state.portfolios, responseData]})
      }
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    console.log("portfolio render")
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
      <div className="back row">
        <BackButton />
      </div>
        <div style={{height: '100vh'}} className="row">
          <div style={{margin: '0px'}} className= "row">
            <div className="columns small-12 medium-12 large-12">
              <h1 className="text-center"><u>Portfolios</u></h1><br /><br />
              {portfolios}
              <div className="row">
                <div className="columns small-6 medium-6 large-6 medium-centered large-centered small-centered">
                  <h2 className="text-center">Create A New Portfolio</h2>
                  <div className="text-left">
                    <PortfolioFormContainer addPortfolio={this.addPortfolio} />
                  </div>
                </div>
                <br />< br /><br /><br /><br /><br />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PortfolioContainer;
