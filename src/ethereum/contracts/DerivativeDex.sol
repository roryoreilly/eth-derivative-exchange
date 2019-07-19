pragma solidity >=0.4.21 <0.6.0;

import './Option.sol';

contract DerivativeDex {
    event OptionCreated(
        address indexed _from,
        address indexed _contract
    );

    Option[] public options;

    function createOption(uint _premium, address _otherContract) public {
        Option newOption = new Option(msg.sender, _premium, _otherContract);
        emit OptionCreated(msg.sender, address(newOption));
        options.push(newOption);
    }

    function getOptions() public view returns (Option[] memory) {
        return options;
    }
}
