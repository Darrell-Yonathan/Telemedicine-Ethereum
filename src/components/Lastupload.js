import { Route, IndexRoute } from 'react-router';
import React , {Component} from 'react';
import Web3 from 'web3'
import './App.css'
import Navbar from './Navbar'
import { render } from '@testing-library/react';

class Lastupload extends Component  {
//const upload = () =>  {
  render() { 
        return (
          <div className="Lastupload">
            <Navbar account={this.state.account} />
            <img className =" ml-auto mr-auto img-fluid" src={`https://ipfs.io/ipfs/${this.state.memeHash}`}  />
            <br />

          </div>
        );
  }
}
export default Lastupload;
