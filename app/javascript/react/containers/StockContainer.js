import React from 'react';

class StockContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      stock: ''
    }
    //this bindings
  }

    componentDidMount() {

    }

  //methods
  render() {

    return(
      <div>
        <h1>Research/Add a Stock</h1>
      </div>
    )
  }
}

export default StockContainer;
