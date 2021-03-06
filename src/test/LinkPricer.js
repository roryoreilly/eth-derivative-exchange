const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = "balance can proof exercise gentle invite sphere stadium where whip rabbit coin";
const provider = new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/48a82209b10c4aac9c8b0e31b0c86279`);
const compiledLinkPricer = require('../ethereum/build/contracts/LinkPricer.json');

let web3 = new Web3(provider, null, {transactionConfirmationBlocks: 1});


let accounts;
let linkPricer;

runContract = async () => {
  console.log("Begin");
  accounts = await web3.eth.getAccounts();

  linkPricer = await new web3.eth.Contract(
  compiledLinkPricer.abi,
  '0x12C0332EEbf31ffe32eb10F89C641fB631B25722'
  );

  let usdPriceBefore = await linkPricer.methods.getUsdPrice().call({from: accounts[0]});
  console.log(usdPriceBefore.toString());
  linkPricer.methods.requestEthereumPrice("USD")
    .send({
      from: accounts[0]
  }).on("transactionHash", hash => {
    console.log("Hash: " + hash)
  }).on('receipt', async (receipt) => {
    console.log("Receipt: " + receipt);
    usdPriceBefore = await linkPricer.methods.getUsdPrice().call({from: accounts[0]});
    console.log(usdPriceBefore.toString());
  });


};

runContract();
