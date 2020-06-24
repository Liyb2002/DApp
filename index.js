// src/index.js
const Web3 = require('web3');
const { setupLoader } = require('@openzeppelin/contract-loader');

async function main() {
  // Our code will go here
  // Set up web3 object, connected to the local development network

// Set up web3 object, connected to the local development network, and a contract loader
const web3 = new Web3('http://localhost:8545');
const loader = setupLoader({ provider: web3 }).web3;

// Set up a web3 contract, representing our deployed Box instance, using the contract loader
const address = '0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab';
const box = loader.fromArtifact('Box', address);
// Call the retrieve() function of the deployed Box contract
const value = await box.methods.retrieve().call();
console.log("Box value is", value);

// Retrieve accounts from the local node, we'll use the first one to send the transaction
const accounts = await web3.eth.getAccounts();

// Send a transaction to store() a new value in the Box
await box.methods.store(20)
  .send({ from: accounts[0], gas: 50000, gasPrice: 1e6 });

// Call the retrieve() function of the deployed Box contract
const Nvalue = await box.methods.retrieve().call();
console.log("Box value is", Nvalue);

}

main();