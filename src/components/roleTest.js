import Upload1 from '../abis/Upload.json'
import Upload2 from '../abis/Upload2.json'
import AccessRole from '../abis/AccessRole.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import React , {Component} from 'react';
import Web3 from 'web3'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

class roleTest extends Component	{
	constructor(props) {
		super(props);
		this.state = {
			buffer:null,
			imgHash:'QmZWjCioYu3j7ShgBentwprJ6ttDmjnVyKPUGL4QfVnL8P',
			account:'',
			verifiedRole:'',
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
		// var load = document.getElementById('cid').value;
		
		console.log(this.state.cid)
		if(networkData)
		{
			const abi2 = Upload2
			//console.log(load)
			const img2 = new  web3.eth.Contract(abi2,"0xd5ff0262dce4feeb6e6325ccae689d14489c182f")
			this.setState({img2})
		}
		else {
			window.alert('upload contract not deployed to the public network')
		}
	}
	
	handleRole = async (e) => {
		e.preventDefault();
		const web3=window.web3;
		const abi3 = AccessRole
		const role = new web3.eth.Contract(abi3, "0x3b0DdAAF635e1e596C1ff2028352E475243D718E")
		console.log("Checking your Role ...")
		console.time("rolecheck");
		try{
			await role.methods.checkUploaderRole().call({from:this.state.account})
			console.log("Successful: You Are An Uploader");
			this.setState ({ verifiedRole: "uploader" })
		} catch (e) {
			try {
				await role.methods.checkDoctorRole().call({from:this.state.account})
				console.log("Successful: You Are A Doctor");
				this.setState ({ verifiedRole: "doctor" })
			} catch (e) {
				this.setState ({ verifiedRole: "NaN" })
				console.log("Error: Empty Role")
			}
		}
		console.timeEnd("rolecheck");
	}
	
	render() {
		return(
			<div>
				<h1 className="font-judul">Check your User Role</h1>
				<h3>Click 'Check your Role' to see your role.</h3>
				<button className= "button" onClick={this.handleRole} > Check your Role</button>
				<div className="role-text-box">
				<h4>your role: {this.state.verifiedRole}</h4>
				</div>
			</div>
		);
	}
	
}
export default roleTest;