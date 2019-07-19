pragma solidity >=0.4.21 <0.6.0;

import 'openzeppelin-solidity/contracts/math/SafeMath.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';

contract Option {
  using SafeMath for uint256;

  event DepositedEth(address indexed payee, uint256 weiAmount);
  event WithdrawnEth(address indexed payee, uint256 weiAmount);
  event DepositedDai(address indexed payee, uint256 weiAmount);
  event WithdrawnDai(address indexed payee, uint256 weiAmount);

  address private creator;
  IERC20 private daiAddress;
  uint private premium;
  mapping(address => uint) balancesEth;
  mapping(address => uint) balancesDai;

  constructor(address _creator, uint _premium, address _otherContract) public {
    creator = _creator;
    premium = _premium;
    daiAddress = IERC20(_otherContract);
  }

  function buyEth() public payable {
      address user = msg.sender;
      balancesEth[user] = balancesEth[user].add(msg.value);
      emit DepositedEth(user, msg.value);
  }

  function sellEth(uint256 amount) public {
      address payable user = msg.sender;
      balancesEth[user] = balancesEth[user].sub(amount);
      user.transfer(amount);
      emit WithdrawnEth(user, amount);
  }

  function buyDai(uint256 amount) public {
      address user = msg.sender;
      require(daiAddress.transferFrom(user, address(this), amount));
      balancesDai[user] = balancesDai[user].add(amount);
      emit DepositedDai(user, amount);
  }

  function sellDai(uint256 amount) public {
      address user = msg.sender;
      balancesDai[user] = balancesDai[user].sub(amount);
      require(daiAddress.transfer(user, amount));
      emit WithdrawnDai(user, amount);
  }

  function getDaiAddress() public returns(address){
      return address(daiAddress);
  }

  function getPremium() public returns(uint256) {
      return premium;
  }

}
