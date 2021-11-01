import React , {Component} from 'react';
import Web3 from 'web3'
import './App.css'
import Navbar from './components/Navbar'
import Upload1 from './abis/Upload.json'
import Upload2 from './abis/Upload2.json'
import home from './components/Home'
import send from './components/Send'
import getData from './components/getData'
import roleTest from './components/roleTest'
import login from './components/Login'
import logout from './components/Logout'
import { auth } from './firebase'
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

function AuthenticatedRoute({component: Component, authenticated, ...rest}) {
	return (
		<Route {...rest}
		render={(props) => authenticated === true
			? <Component {...props} {...rest} />
			: <Redirect to='/login' /> } />
	)
}

class App extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      buffer:null,
      imgHash:'QmZWjCioYu3j7ShgBentwprJ6ttDmjnVyKPUGL4QfVnL8P',
      account:'',
	  user: null,
	  isVerified: false,
      cid:''
    };
	// auth.onAuthStateChanged(function(user) {
    // this.state ={ user: user };
	// });
  }

  async componentDidMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
	auth.onAuthStateChanged(userAuth => {
      this.setState({ user:userAuth })
	  if(this.state.user != null){
	  this.setState({isVerified: true})
	  } else {
		  this.setState({isVerified: false})
	  }
	  console.log("User logged in:");
	  console.log(this.state.user != null);
	  console.log(this.state.isVerified);
  	//  console.log("User logged in:");
  	//  console.log(this.state.user != null);
  	//  console.log(userAuth);
     });
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
    //load accounts
     const accounts = await web3.eth.getAccounts()
     console.log(accounts[0])
     this.setState({account:accounts[0]}) 
     
     const networkId = await web3.eth.net.getId() 
     const networkData = Upload1.networks[networkId]
    
     console.log(this.state.cid)
     if(networkData)
     {
      //const abi = Upload.abi
      const abi2 = Upload2
      //const img = new  web3.eth.Contract(abi,networkData.address)
      const img2 = new  web3.eth.Contract(abi2,"0xd5ff0262dce4feeb6e6325ccae689d14489c182f")
      //this.setState({img})
      this.setState({img2})
      //const imgHash = await img.methods.get().call()
      // await img2.methods.get('5').call({from:"0x3d400191029bff170ae3fbebb5c8c2269b664eb2"})
      // .then (res => {
  
      //   res = JSON.parse(JSON.stringify(res))
      //   this.setState({imgHash:res[2],name:res[0]})
      //   this.setState({imgHash:res[3],deskripsi:res[1]})
      //   this.setState({imgHash:res[4],imgHashing:res[2]})
      //   console.log(res[0])
      //   console.log(res[1])
      // })
     }
     else {
      window.alert('upload contract not deployed to the public network')
     }
  }
  
  render () {
    return (
		
    <Router>
      <div className="App" id="upload">
       
        <Navbar account={this.state.account} verified={this.state.isVerified}/>
        <div className="loader" id="loading"></div>
        <br />
  
          <Switch>
              <Route exact path='/'> <Redirect to="/login" /> </ Route>
			  { this.state.isVerified &&
			  <Route path='/home' component={home} />
			  }
			  { this.state.isVerified &&
              <Route path='/send' component={send} />
			  }
			  { this.state.isVerified &&
              <Route path='/getData' component={getData} /> 
			  }
			  { this.state.isVerified &&
			  <Route path='/roleTest' component={roleTest} />
			  }
			  { !this.state.isVerified &&
			  <Route path='/login' component={login} />
			  }
			  <Route path='/logout' component={logout}/>
          </Switch>
        </div>
        
      </Router>
     
      
      
    );
  }
  }
  export default App;