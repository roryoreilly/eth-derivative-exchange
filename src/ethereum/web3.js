const Web3 = require("web3");
// const ganache = require('ganache-cli')

const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "balance can proof exercise gentle invite sphere stadium where whip rabbit coin";

let web3;

// if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
//   const ethereum = window.ethereum;
//   web3 = new Web3(ethereum, null, {transactionConfirmationBlocks: 1});
//   try {
//     ethereum.enable();
//   } catch(error) {
//     console.log(error);
//   }
// } else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
//   web3 = new Web3(window.web3.currentProvider, null, {transactionConfirmationBlocks: 1});
// } else {
  // const provider = ganache.provider();
  const provider = new HDWalletProvider(mnemonic, "http://localhost:7545");
  web3 = new Web3(provider, null, {transactionConfirmationBlocks: 1});
// }

export default web3;
