import AccessRole from '../abis/AccessRole.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import React , {Component} from 'react';
import Web3 from 'web3'
import { auth } from '../firebase'
import { Redirect } from 'react-router-dom';

class Login extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
		  buffer:null,
		  imgHash:'QmZWjCioYu3j7ShgBentwprJ6ttDmjnVyKPUGL4QfVnL8P',
		  redirectAfterLogin: false
		};
	}
	
	firebaseSignIn = async (e) => {
		e.preventDefault();
		const email = document.getElementById("username").value;
		const password = document.getElementById("password").value;
		auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
			var user = userCredential.user;
			console.log("Berhasil");
			console.log(user);
			this.setState({ redirectAfterLogin: true });
		}).catch((error) => {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log("Gagal");
			console.log(errorCode);
			window.alert(errorMessage);
		});
	}
	
	render() {
		const redirect = this.state.redirectAfterLogin;
		console.log(this.state.user == null);
		if(redirect) {
			return <Redirect to="/home" />
		}
		else {
			return (
				
				<div>
					<h1 className="font-judul">User Login to Telemedicine System</h1>
					<div className="login-box">
						<form>
							<label className="font-judul" for="username">Username/E-mail</label><br/>
							<input type="text" id="username" name="username" ></input><br/><br/>
							
							<label className="font-judul" for="password">Password</label><br/>
							<input type="password" id="password" name="password" ></input><br/><br/>
							
							 <button className="btn btn-primary" type="submit" onClick={this.firebaseSignIn}>Login</button>
						</form>
					</div>
				</div>
			);
		}
	}
}
export default Login;