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

document.getElementById("login").addEventListener("input", async (e)=>{
	let address = await e.target.value;
  	console.log(address);
	html = "";
	html += await contract.methods.balanceOf(address).call({from:address});
	document.getElementById('accountToken').innerHTML = html;
	getAdminToken();
});


const getUserToken = async function() {
	let address = await document.getElementById("account1").value;
	html = "";
	html += await contract.methods.balanceOf(address).call({from:address});
	document.getElementById('getToken').innerHTML = html;
	getAdminToken();
}


const earnToken = async function() {
	let address = await document.getElementById("login").value;
	let amountToGet = await document.getElementById("amountToGet").value;
	console.log(amountToGet)
	console.log(address)
	await contract.methods.buyToken(admin_address, amountToGet).send({from : address, gas:5000000, value:amountToGet * 5 * Math.pow(10, 14)});
	var userBalance = await contract.methods.balanceOf(address).call({from:address});
	document.getElementById('accountToken').text = userBalance;
	getAdminToken();
}

const transferToken = async function() {
	let address1 = await document.getElementById("login").value;
	let address2 = await document.getElementById("account2").value;
	let amountToSend = await document.getElementById("amountToSend").value;
	console.log(amountToSend)
	console.log(address1)
	console.log(address2)
	await contract.methods.transfer(address2, amountToSend).send({from : address1, gas:3000000}).catch(err=>{
	    // 1 $
	    console.error(err);
  	});
	let userBalance = await contract.methods.balanceOf(address1).call({from:address1});
	document.getElementById('accountToken').text = userBalance;
	getAdminToken();
	getUserToken();
}
