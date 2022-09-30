import { Component } from "react";
import  { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchItems } from '../services/api'

import Searchbar from "./Searchbar/Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery"
import { Button } from "./Button/Button"
//import { Loader } from "./Loader/Loader"
//import { ErrorView } from "./ErrorView/ErrorView";
//import { PendingView } from "./PendingView/PendingView";



export default class App extends Component {
  state = {
    items: {
      hits: [],
      totalHits: '',
      total: '',
    },
    imageName: '',
    loading: false,
    page: 1,
    perPage: 12,
    isLoadMore: true,
    error: null
  }
  handleFormSubmit = imageName => this.setState({ imageName });

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page, perPage } = this.state
    const prevName = prevState.imageName;
    const nextName = imageName;


    if (prevName !== nextName ||
      prevState.page !== this.state.page) {
    
      this.setState({ loading: true, error: null})

       fetchItems(imageName, page, perPage)
        .then(({ hits, totalHits, total }) => {
          this.setState(prevState => ({
            items: {
              hits: [...prevState.items.hits, ...hits],
              totalHits,
              total,
            },
            loading: false,
          
          }));
                


        const totalPages = Math.ceil(totalHits / perPage);
          
        if (hits.length !== 0 && page === 1 ) {
          toast.success(`Founded ${totalHits} images`);
          this.setState({isLoadMore: true,})
        }

        if (page === totalPages) {
          toast.info("The End!");
          this.setState({isLoadMore: false,})
        }


          if (totalHits === 0) {
            return Promise.reject(new Error(`Nothing was found according to your request ${imageName}. Try another query!`))
          }
        })
        .catch(error => {
          this.setState({ error })
          Promise.reject(new Error(`${error.message}`))
          toast.error(` We can't find a "${imageName}"! `);
        })
    }
  }

  loadMore = () => { this.setState(prevState => ({ page: prevState.page + 1 }));
  };


  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit}></Searchbar>

        {this.state.items.hits.length !== 0 && <>
          <ImageGallery items={this.state.items.hits} />
          {this.state.isLoadMore && <Button onClick={this.loadMore} />}
        </>}
        
       <ToastContainer />
    </>
  );
  }
  
};
 //{ this.state.items.hits.length === 0 && !this.state.isLoading && <PendingView />}
//      {this.state.isLoading && <Loader />}
 //     {this.state.error && <ErrorView errorName={this.state.error.message} />}
 //       
      