import web3 from './web3';
import DerivativeDex from './build/contracts/DerivativeDex.json';


const instance = new web3.eth.Contract(
  DerivativeDex.abi,
  '0x0A6A85237f10d9cAD4D24ae76B5D06EE4061d07B'
);

export default instance;
