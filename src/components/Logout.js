import AccessRole from '../abis/AccessRole.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import React , {Component} from 'react';
import Web3 from 'web3'
import { auth } from '../firebase'
import { Redirect } from 'react-router-dom';

class Logout extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
		  buffer:null,
		  imgHash:'QmZWjCioYu3j7ShgBentwprJ6ttDmjnVyKPUGL4QfVnL8P',
		  logoutSuccess:false
		};
	}
	
	firebaseSignOut = async(e) => {
		auth.signOut()
		this.setState({logoutSuccess: true})
	}
	
	render() {
		if (this.state.logoutSuccess) {
			return <Redirect to="/login" />
		} else {
			return (
			<div>
			<h5>You will be signed out.</h5><h5> Click 'Sign Out' as confirmation.</h5>
			<button onClick={this.firebaseSignOut}>Sign Out</button><br/><br/>
			</div>
			)
		}
	}
}
export default Logout;