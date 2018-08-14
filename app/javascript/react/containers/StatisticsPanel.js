import React from 'react';
import Statistic from '../components/Statistic'

class StatisticsPanel extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      ticker: '',
      stats: ''
    }
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

  render() {
    let listClass="";
    let title;
    let statsList = [];
    let count = 0;
    for (const [key, value] of Object.entries(this.state.stats)) {
      count++;
      let val = value;
      if (typeof(value) == "number"){ val = NumOutput(value); }
      statsList.push(
        <Statistic
          statKey={unCamel(key)}
          statValue={val}
          key={count}
        />
      );
    }
    if (statsList.length > 0) {
      listClass = "pricing-table green-border"
      title = <li className="title">Statistics</li>
    }
    return(
      <div>
        <ul className={listClass}>
          {title}
          {statsList}
        </ul>
      </div>
    )
  }
}

export default StatisticsPanel;
