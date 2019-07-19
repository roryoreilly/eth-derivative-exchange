import web3 from './web3';
import Option from './build/contracts/Option.json';


export default address => {
  return new web3.eth.Contract(Option.abi, address);
}
