import React from 'react';
import InputField from '../components/InputField'

class PortfolioFormContainer extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: ''
    }
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event){
    this.setState({name: event.target.value});
  }

  handleClearForm(event){
    event.preventDefault();
    this.setState({name: ''});
  }

  handleSubmit(event){
    event.preventDefault();
    let newPortfolio = {
      name: this.state.name,
    }
    console.log("Payload: " + newPortfolio.name)
    this.props.addPortfolio(newPortfolio);
    this.handleClearForm(event);
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <InputField
          label='Portfolio Name'
          content={this.state.name}
          handleChange={this.handleChangeName}
        />
        <input type= 'submit' value='Submit'/>
      </form>
    );
  }
}

export default PortfolioFormContainer;
