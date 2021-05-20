import React , {Component} from 'react';
import Web3 from 'web3'
import './App.css'
import Navbar from './components/Navbar'
import Upload from './abis/Upload.json'
//import { Route, IndexRoute } from 'react-router';


//export default (
  //<Route path="/" component={App}>
    //<IndexRoute component={Lastupload} />
    //<Route path="./component/Lastupload" component={Lastupload} />
  //</Route>
//);



const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })



class App extends Component  {

  toggleImage(){
    document.querySelector('#gambar').classList.toggle('hidden');
  }

  constructor(props) {
    super(props);
    this.state = {
      buffer:null,
      imgHash:'QmZWjCioYu3j7ShgBentwprJ6ttDmjnVyKPUGL4QfVnL8P',
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
     const networkData = Upload.networks[networkId]

     if(networkData)
     {
      const abi = Upload.abi
      const img = new  web3.eth.Contract(abi,networkData.address)
      this.setState({img})

      const imgHash = await img.methods.get().call()
      this.setState({imgHash})
     }
     else {
      window.alert('upload contract not deployed to the public network')
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
    console.log('Submitting the form');
    console.log(this.state.buffer)
    const fileupload = await ipfs.add(this.state.buffer)
    //console.log(fileupload.path)
    await this.state.img.methods.set(fileupload.path).send({from: this.state.account}).then(r =>{
      console.log('data being stored in the blockchain')
      this.setState({imgHash:fileupload.path})
    })


    //Step 2 is to store the fie onthe blockchian
  }


  render () {
    return (
      
      <div className="App">
        <Navbar account={this.state.account} />
        
        <br />
        <p></p>
        <h1> Upload your Image</h1>
        <p></p>
      <form  onSubmit={this.handleSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary" type="submit" id="inputGroupFileAddon03">Upload</button>
            </div>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="inputGroupFile03" 
              onChange={this.captureFile}
              aria-describedby="inputGroupFileAddon03" />
              <label className="custom-file-label" htmlFor="inputGroupFile03">Choose image file</label>
            </div>
          </div>

        <div className="container">
        <button onClick={() => this.toggleImage()} className="w-100 mb-10">Show/Hide</button>
        </div>
      <img src={`https://ipfs.io/ipfs/${this.state.imgHash}`} id="gambar" className="hidden w-100" />
      
      </form>
      </div>
      
    );
  }
  }
  export default App;