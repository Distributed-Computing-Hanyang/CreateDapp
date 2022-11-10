var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));
web3.eth.handleRevert = true;
const contract_address = "";
const abi = [
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
	}
];

const admin_address = "";

let contract = new web3.eth.Contract(abi, contract_address);

$(document).ready(function() {
	startDapp();
})

var startDapp = async function() {
	getAdminToken();
}

var getAdminToken = async function() {
	var adminBalance = await contract.methods.balanceOf(admin_address).call({from:admin_address});
	$('#adminToken').text(adminBalance);
}

document.getElementById("login").addEventListener("change", async (e)=>{
	var address = await e.target.value;
  console.log(address);
	html = "";
	html += await contract.methods.balanceOf(address).call({from:address});
	document.getElementById('accountToken').innerHTML = html;
	getAdminToken();
});


var getUserToken = async function() {
	var address = await document.getElementById("account1").value;
	html = "";
	html += await contract.methods.balanceOf(address).call({from:address});
	document.getElementById('getToken').innerHTML = html;
	getAdminToken();
}


var earnToken = async function() {
	var address = await document.getElementById("login").value;
	var getAmount = await document.getElementById("getAmount").value;
	console.log(getAmount)
	console.log(address)
	await contract.methods.buyToken(admin_address, getAmount).send({from : address, gas:5000000, value:getAmount * 5 * Math.pow(10, 14)});
	var userBalance = await contract.methods.balanceOf(address).call({from:address});
	$('#accountToken').text(userBalance);
	getAdminToken();
}

var transferToken = async function() {
	var address1 = await document.getElementById("login").value;
	var address2 = await document.getElementById("account2").value;
	var sendAmount = await document.getElementById("sendAmount").value;
	console.log(sendAmount)
	console.log(address1)
	console.log(address2)
	await contract.methods.transfer(address2, sendAmount).send({from : address1, gas:3000000}).catch(err=>{
    // 1 $
    console.error(err);
  });
	var userBalance = await contract.methods.balanceOf(address1).call({from:address1});
	$('#accountToken').text(userBalance);
	getAdminToken();
	getUserToken();
}
