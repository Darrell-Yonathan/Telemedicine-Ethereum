import React , {Component} from 'react';
import logo from './logo.svg';
import './App.css'
import Navbar from './components/Navbar'
import {ipfs} from './ipfs'


//altermnative approach of using ipfs


class App extends Component  {


  constructor(props) {
    super(props);
    this.state = {
      buffer:null
    };
  }

  // this method is called whenever a file is uploaded
  // gets uploaded file and converts it to appropriate format for IPFS
  // stores the file in this component's state
  captureFile = (event) => {
    event.preventDefault();

    const file = event.target.files[0]; // access file from user input
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file); // convert file to array for buffer
    // after reader finishes, initialise buffer and store in component state
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) });

      console.log('buffer', this.state.buffer); // console should log uint8array...
    }
  }

  onSubmit = async (event) => {
    event.preventDefault(); // prevents browser from refreshing or getting a new page on click
    console.log("on submit...");

    // post file to IPFS, get the IPFS hash and store it in contract
    ipfs.files.add(this.state.buffer, async (error, result) => {
      if (error) {
        console.log('ERR', error)
      } else {
        const ipfsHash = result[0].hash // base58 encoded multihash
        console.log(ipfsHash)
        ipfs.files.get(ipfsHash, (error, files) => {
          console.log(files)
        })
      }})
  

  }
render () {
  return (
    <div className="App">
      <Navbar />
      <img className =" ml-auto mr-auto img-fluid" src="https://www.insidehighered.com/sites/default/server_files/media/iStock-892082986.jpg "  />
      <br />
      <p></p>
      <h1> IPFS Images Upload</h1>
      <p></p>
    <form  onSubmit={this.onSubmit}>
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
