import React , {Component} from 'react';
import Web3 from 'web3'
import './App.css'
import Navbar from './components/Navbar'
import Upload from './abis/Upload.json'
import home from './components/Home'
import send from './components/Send'
import getData from './components/getData'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })


class App extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      buffer:null,
      imgHash:'QmZWjCioYu3j7ShgBentwprJ6ttDmjnVyKPUGL4QfVnL8P',
      account:'',
      cid:''
    };
  }

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async loadBlockchainData() {
    const web3=window.web3 ;

     const accounts = await web3.eth.getAccounts()
     console.log(accounts[0])
     this.setState({account:accounts[0]}) 
     
     const networkId = await web3.eth.net.getId() 

    
     console.log(this.state.cid)

      const abi2 = Upload

      const img2 = new  web3.eth.Contract(abi2,"0xd5ff0262dce4feeb6e6325ccae689d14489c182f")

      this.setState({img2})

  }


  render () {
    return (
    <Router>
      <div className="App" id="upload">
       
        <Navbar account={this.state.account} />
        <div className="loader" id="loading"></div>
        <br />
  
          <Switch>
              <Route exact path='/' component={home} />
              <Route path='/send' component={send} />
              <Route path='/getData' component={getData} />
          </Switch>
        </div>
        
      </Router>
     
      
      
    );
  }
  }
  export default App;