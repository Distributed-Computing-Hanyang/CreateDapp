const web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.handleRevert = true;

const admin_address = "";
const contract_address = "";
const abi = [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "admin",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "buyToken",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "eth",
				"type": "uint256"
			}
		],
		"name": "etherTransfer",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "INITIAL_SUPPLY",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let contract = new web3.eth.Contract(abi, contract_address);

document.addEventListener("DOMContentLoaded", () => {
  startDapp();
});

const startDapp = async function() {
	getAdminToken();
}

const getAdminToken = async function() {
	let adminBalance = await contract.methods.balanceOf(admin_address).call({from:admin_address});
	document.getElementById('adminToken').text = adminBalance;
}

document.getElementById("currentUser").addEventListener("input", async (e)=>{
	let currentUser = await e.target.value;
	console.log(currentUser);
	getUserToken(currentUser);
});

const getUserToken = async (address) => {
	let userBalance = await contract.methods.balanceOf(address).call({from:address});
	document.getElementById('userToken').text = userBalance;
}

const getAccountToken = async function() {
	let anotherAccount = await document.getElementById("anotherAccount").value;
	let accountBalance = await contract.methods.balanceOf(anotherAccount).call({from:anotherAccount});
	document.getElementById('accountToken').text = accountBalance;
}


const earnToken = async function() {
	let currentUser = await document.getElementById("currentUser").value;
	let amountToEarn = await document.getElementById("amountToEarn").value;
	console.log(amountToEarn)
	console.log(currentUser)
	await contract.methods.buyToken(admin_address, amountToEarn).send({from : currentUser, gas:5000000, value:amountToEarn * 5 * Math.pow(10, 14)}); // about 1 $
	getUserToken(currentUser);
	getAdminToken();
}

const transferToken = async function() {
	let currentUser = await document.getElementById("currentUser").value;
	let accountToSend = await document.getElementById("accountToSend").value;
	let amountToSend = await document.getElementById("amountToSend").value;
	console.log(amountToSend)
	console.log(currentUser)
	console.log(accountToSend)
	await contract.methods.transfer(accountToSend, amountToSend).send({from : currentUser, gas:3000000}).catch(err=>{
	    console.error(err);
  	});
	getUserToken(currentUser);
	getAdminToken();
	getAccountToken();
}
