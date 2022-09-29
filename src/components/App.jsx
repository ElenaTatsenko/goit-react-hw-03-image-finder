import { Component } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//const KEY = "29216900-862a9e8f9f3ad454828049dde";


export default class App extends Component {
  state = {
    imageName: '',
  }
  handleFormSubmit = imageName => this.setState({ imageName });

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>
        <ToastContainer />
      
    </>
  );
  }
  
};
