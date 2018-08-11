import React from 'react';

class LogoTile extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      ticker: '',
      stockUrl: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (this.props.ticker){
    if (this.props.ticker !== nextProps.ticker){
      console.log("logo tile fetch in LogoTile")
      fetch(`https://api.iextrading.com/1.0/stock/${nextProps.ticker}/logo`)
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
        this.setState({stockUrl: body.url});
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }
  }

  render(){
    let imgElement = null;
    if (this.state.stockUrl){
      imgElement = <img src={this.state.stockUrl} alt={this.state.ticker.concat(" logo")}/>
    }
    return(
      <div>
        {imgElement}
      </div>
    )
  }
}

export default LogoTile;
