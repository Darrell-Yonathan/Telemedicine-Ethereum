import React , {Component} from 'react';
import Web3 from 'web3'
import './App.css'
import Navbar from './components/Navbar'
import Upload from './abis/Upload.json'
import Upload2 from './abis/Upload2.json'


const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

class App extends Component  {

  hideButton() {
    document.querySelector('#inputGroupFileAddon03').disabled = false;
  }
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
      //const abi = Upload.abi
      const abi2 = Upload2
      //const img = new  web3.eth.Contract(abi,networkData.address)
      const img2 = new  web3.eth.Contract(abi2,"0xd5ff0262dce4feeb6e6325ccae689d14489c182f")
      //this.setState({img})
      this.setState({img2})

      //const imgHash = await img.methods.get().call()
      await img2.methods.get('5').call({from:"0x3d400191029bff170ae3fbebb5c8c2269b664eb2"})
      .then (res => {
        
        res = JSON.parse(JSON.stringify(res))
        this.setState({imgHash:res[2],name:res[0]})
        this.setState({imgHash:res[3],deskripsi:res[1]})
        this.setState({imgHash:res[4],imgHash:res[2]})
        console.log(res[0])
        console.log(res[1])
      })
      //imgHash2 = JSON.stringify(imgHash2)
      //this.setState({imgHash})
     // this.setState({imgHash2})
      //console.log(imgHash2)
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
    var id = document.getElementById("fid").value;
    var nama = document.getElementById("fnama").value;
    var deskripsi = document.getElementById("fdeskripsi").value;


    var t0 = performance.now()
    //step1 is to 
    e.preventDefault();
    console.log('Submitting the form');
    console.log(this.state.buffer)
    const fileupload = await ipfs.add(this.state.buffer)
    //console.log(fileupload.path)
    await this.state.img2.methods.set(id,nama,deskripsi,fileupload.path).send({from: "0x3d400191029bff170ae3fbebb5c8c2269b664eb2"}).then(r =>{
      console.log('data being stored in the blockchain')
      //this.setState({imgHash:fileupload.path}) 

      var t1 = performance.now()
      console.log("Submit image time " + ((t1 - t0)/1000) + " seconds.")
      
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

      <label for="fid">ID Pasien</label><br/>
      <input type="text" id="fid" name="fid"></input><br/>
      <label for="fpasien">Nama Pasien</label><br/>
      <input type="text" id="fnama" name="fnama"></input><br/>
      <label for="fdeskripsi">Deskripsi</label><br/>
      <input type="text" id="fdeskripsi" name="fdeskripsi"></input><br/><br/>
      <label for="fupload">Upload your image</label><br/>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary" type="submit" id="inputGroupFileAddon03" disabled>Upload</button>
            </div>
            <div className="custom-file">
              <input type="file" className="custom-file-input" id="inputGroupFile03" onClick={() => this.hideButton()}
              onChange={this.captureFile}
              aria-describedby="inputGroupFileAddon0" />
              <label className="custom-file-label c-100" htmlFor="inputGroupFile04"></label>
            </div>
          </div>
      </form>
      <div className="container">
        <button onClick={() => this.toggleImage()} className="w-100 mb-10">Show/Hide</button>
        </div>
        {this.state.name}<br/>
        {this.state.deskripsi}<br/>
        {this.state.imgHash}
      <img src={`https://ipfs.io/ipfs/${this.state.imgHash}`} id="gambar" className="hidden w-100" />
      </div>
      
    );
  }
  }
  export default App;