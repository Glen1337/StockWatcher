import React from 'react';
import InputField from '../components/InputField'

class StockContainer extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {

    return(
      <div>
        <h1>Research/Add a Stock</h1>
      </div>
    )
  }
}

export default StockContainer;


// import React, {Component} from 'react';
// import InputField from '../components/InputField'
//
// class FormContainer extends Component{
//   constructor(props){
//     super(props);
//
//     this.state = {
//       title: '',
//       releaseYear: '',
//       runtime: ''
//     }
//     this.handleTitleChange = this.handleTitleChange.bind(this);
//     this.handleRuntimeChange = this.handleRuntimeChange.bind(this);
//     this.handleReleaseYearChange = this.handleReleaseYearChange.bind(this);
//     this.handleClearForm = this.handleClearForm.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }
//
//   handleClearForm(event){
//     event.preventDefault();
//     this.setState({
//       title: '',
//       releaseYear: '',
//       runtime: ''
//     });
//   }
//
//   handleTitleChange(event) {
//     this.setState({title: event.target.value});
//   }
//
//   handleReleaseYearChange(event) {
//     this.setState({releaseYear: event.target.value});
//   }
//
//   handleRuntimeChange(event) {
//     this.setState({runtime: event.target.value});
//   }
//
//   handleSubmit(event){
//     event.preventDefault();
//     let body = {
//       title: this.state.title,
//       release_year: this.state.releaseYear,
//       runtime:this.state.runtime
//     }
//     this.props.addNewMovie(body)
//     this.handleClearForm(event);
//   }
//
//   render(){
//     return(
//       <form onSubmit={this.handleSubmit}>
//         <InputField
//           label='Name'
//           name='title'
//           content={this.state.title}
//           handleChange={this.handleTitleChange}
//         />
//         <InputField
//           label='Release Year'
//           name='releaseYear'
//           content={this.state.releaseYear}
//           handleChange={this.handleReleaseYearChange}
//         />
//         <InputField
//           label='Runtime'
//           name='runtime'
//           content={this.state.runtime}
//           handleChange={this.handleRuntimeChange}
//         />
//         <input type='submit' value='Submit'/>
//       </form>
//     )
//   }
// }

//export default FormContainer;
