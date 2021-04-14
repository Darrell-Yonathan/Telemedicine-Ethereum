import React , {Component} from 'react';
import Web3 from 'web3'
import './App.css'
import Navbar from './components/Navbar'
import Meme from './abis/Meme.json'


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })



class App extends Component  {


  constructor(props) {
    super(props);
    this.state = {
      buffer:null,
      memeHash:'QmZWjCioYu3j7ShgBentwprJ6ttDmjnVyKPUGL4QfVnL8P',
      account:''
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
    //load accounts
     const accounts = await web3.eth.getAccounts()
     console.log(accounts[0])
     this.setState({account:accounts[0]}) 
     
     const networkId = await web3.eth.net.getId() 
     const networkData = Meme.networks[networkId]

     if(networkData)
     {
      const abi = Meme.abi
      const meme = new  web3.eth.Contract(abi,networkData.address )
      this.setState({meme})

      const memeHash = await meme.methods.get().call()
      this.setState({memeHash})
     }
     else {
      window.alert('meme contract not deployed to the public network')
     }


     
  }

  captureFile = (e) =>{
    e.preventDefault();
    //Process File for IPFS
    console.log(e.target.files[0])
    const file = e.target.files[0]
    //helps in converting the file into a buffer and a buffer is what we need at this instant
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = () =>{
      this.setState({buffer:Buffer(reader.result)})
    }
  }


  //https://ipfs.io/ipfs/QmYbggFBJWPa8NpEc1wQneHdYFoLnqwqq49NyoCmBZKSFm
  handleSubmit = async (e)=>{
    //step1 is to 
    e.preventDefault();
    console.log('Submittig the form');
    console.log(this.state.buffer)
    const fileupload = await ipfs.add(this.state.buffer)
    console.log(fileupload.path)
    await this.state.meme.methods.set(fileupload.path).send({from: this.state.account}).then(r =>{
      console.log('data being stored in the blockchian')
      this.setState({memeHash:fileupload.path})
    })


    //Step 2 is to store the fie onthe blockchian
  }



render () {
  return (
    <div className="App">
      <Navbar account={this.state.account} />
      <img className =" ml-auto mr-auto img-fluid" src={`https://ipfs.io/ipfs/${this.state.memeHash}`}  />
      <br />
      <p></p>
      <h1> IPFS Images Upload</h1>
      <p></p>
    <form  onSubmit={this.handleSubmit}>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <button className="btn btn-outline-secondary" type="submit" id="inputGroupFileAddon03">Button</button>
          </div>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="inputGroupFile03" 
            onChange={this.captureFile}
            aria-describedby="inputGroupFileAddon03" />
            <label className="custom-file-label" htmlFor="inputGroupFile03">Choose file</label>
          </div>
        </div>


    </form>
    </div>
  );
}

  
}

export default App;
