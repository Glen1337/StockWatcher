import React from 'react';

class LogoTile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      ticker: '',
      stockUrl: ''
    }

  }

  componentDidMount() {
    debugger;
    if (this.state.ticker){
      fetch(`https://api.iextrading.com/1.0/stock/${this.state.ticker}/logo`)
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
        debugger;
        this.setState({
          ticker: body
        })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  render(){
    debugger;
    return(
      <div>
        <img src={this.state.stockUrl} alt={this.state.ticker.concat(" logo")}/>
      </div>
    )
  }
}

export default LogoTile;
