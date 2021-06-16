import React, { Component } from 'react';
import telemedicine from '../telemedicine.jpg'


class Home extends Component {

  render() {
    return (
        
        <div>
          <p></p>
        <h1 className="font-judul"> Welcome to Telemedicine Center</h1><br/>
        <img src={telemedicine} id="telmed" className="w-50" />

        <p></p>

        </div>
    );
  }
}
export default Home;