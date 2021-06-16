import Navbar from './Navbar'
import Upload1 from '../abis/Upload.json'
import Upload2 from '../abis/Upload2.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import React , {Component} from 'react';
import Web3 from 'web3'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

class getData extends Component  {

  hideButton() {
    document.querySelector('#inputGroupFileAddon03').disabled = false;
  }
  toggleImage(){
    document.querySelector('#hash').classList.toggle('hidden');
  }

  toggleLoading(){
    document.querySelectorAll('#loading')[0].style.display = "block";
  }

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
    //load accounts
     const accounts = await web3.eth.getAccounts()
     console.log(accounts[0])
     this.setState({account:accounts[0]}) 
     
     const networkId = await web3.eth.net.getId() 
     const networkData = Upload1.networks[networkId]
     var load = document.getElementById('cid').value;
    
     console.log(this.state.cid)
     if(networkData)
     {
      //const abi = Upload.abi
      const abi2 = Upload2
      console.log(load)
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

  handleGet = async (e) => {
    e.preventDefault();
    const web3=window.web3;
    const abi2 = Upload2
    const img2 = new web3.eth.Contract(abi2,"0xd5ff0262dce4feeb6e6325ccae689d14489c182f")
    var load = document.getElementById('cid').value;
    // var t0 = performance.now()
    console.time("get");
      await img2.methods.get(load).call({from:this.state.account})
      .then (res => {
    
        res = JSON.parse(JSON.stringify(res))
        this.setState({imgHash:res[2],name:res[0]})
        this.setState({imgHash:res[3],deskripsi:res[1]})
        this.setState({imgHash:res[4],imgHashing:res[2]})
      })
  
      if (this.state.imgHashing == ""){
        window.alert("Id (" + load +") not found")
      }
      else if (load == ""){
        window.alert("Please insert id")
      }
      else{
      // var t1 = performance.now()
      console.timeEnd("get")
      // console.log("Get data from id (" + load + ") time: " + ((t1 - t0)/1000) + " seconds.")
      window.alert("Checking id :" + load)
      }
    }

    render () {
        return (
    
          <div className="App" id="upload">
           
            <div class="loader" id="loading"></div>
            <br />
            
          <div className="container" id="checkid">
          <h1 className="font-judul"> Check your Data</h1>
          <label className="font-property" for="cid">Cek ID Pasien</label><br/>
          <input type="text" id="cid" name="cid" ></input><br/><br/>
          <button className= "button" type="submit" id="inputGroupFileAddon03" onClick={this.handleGet} >Cek ID</button><br/><br/>
          
    
          <label className="font-property" for="cname">Nama Pasien :  </label> <br/>
          <div className="square" align="center">
          {this.state.name}
          </div>
          <br/>
    
          <label className="font-property" for="cdesc">Deskripsi Penyakit :</label><br/>
          <div className="square-plus" align="center">
          {this.state.deskripsi}
          </div>
          <br/>
    
    
          <button onClick={() => this.toggleImage()} className="w-50 mb-5 font-property button1">Show/Hide Image Hash</button><br/>
          {/* <img src={`https://ipfs.io/ipfs/${this.state.imgHashing}`} id="gambar" className="hidden w-100" /><br/><br/> */}
          <div className="hidden square w-100" align="center" id="hash">
          {this.state.imgHashing}
          </div>
          </div>
          </div>
          
        );
      }

}
export default getData;