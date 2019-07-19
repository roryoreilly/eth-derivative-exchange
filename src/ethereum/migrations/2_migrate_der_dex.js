const DerivativeDex = artifacts.require("DerivativeDex");

module.exports = function(deployer) {
  deployer.deploy(DerivativeDex);
};
