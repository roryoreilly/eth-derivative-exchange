import web3 from './web3';
import DerivativeDex from './build/contracts/DerivativeDex.json';


const instance = new web3.eth.Contract(
  DerivativeDex.abi,
  '0x13968cD6f3b1c7F2A47adDF2023B92727C2408ce'
);

export default instance;
