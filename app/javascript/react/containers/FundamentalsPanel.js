import React from 'react';

class FundamentalsPanel extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      ticker: '',
      stats: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ticker !== nextProps.ticker){
      console.log("fund. panel fetch");
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

  render() {
    // debugger;
    // for (var key in this.state.stats) {
    //   console.log(key, stats[key]);
    // }
     console.log(this.state.stats)

    return(
      <div>
        <h2>Fundamentals</h2>
      </div>
    )
  }
}

export default FundamentalsPanel;
