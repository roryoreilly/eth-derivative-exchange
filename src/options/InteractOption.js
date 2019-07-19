import React, { Component } from 'react';
import { Grid, Card, Button, Message } from 'semantic-ui-react';
import OptionAbi from '../ethereum/option';
import IERC20 from '../ethereum/ierc20';
import web3 from '../ethereum/web3';

class InteractOption extends Component {
  state = {
    errorMessage: '',
    loading: false,
    approved: false,
    option: null,
    erc20: null,
    daiAddress: '',
    ethAmount: 0,
    erc20Amount: new web3.utils.BN(0),
    erc20AmountUser: new web3.utils.BN(0)
  };

  componentWillMount() {
      this.loadBlockchainData();
  }

  componentWillUpdate() {
      this.loadBlockchainData();
  }

  async loadBlockchainData() {
      const option = OptionAbi(this.props.contract);
      const daiAddress = await option.methods.getDaiAddress().call();

      const erc20 = IERC20(daiAddress);
      const erc20Amount = await erc20.methods.balanceOf(this.props.contract).call();
      const accounts = await web3.eth.getAccounts();
      const erc20AmountUser = await erc20.methods.balanceOf(accounts[0]).call();

      let ethAmount = await web3.eth.getBalance(this.props.contract);
      ethAmount = await web3.utils.fromWei(ethAmount, "ether");
      this.setState({ option, erc20, daiAddress, ethAmount, erc20Amount, erc20AmountUser });
  }

  renderDetails = () => {
    const items = [
        {
          header: this.state.daiAddress,
          meta: 'ERC20 Token address',
          description: 'The address of the other contract',
          style: { overflowWrap: 'break-word' }
        },
        {
          header: this.state.ethAmount,
          meta: 'Ether Amount',
          description: 'Amount of wei in the contract',
          style: { overflowWrap: 'break-word' }
        },
        {
          header: this.state.erc20Amount.toString(),
          meta: 'ERC20 Amount',
          description: 'Balance of ERC20 token in the contract',
          style: { overflowWrap: 'break-word' }
        },
        {
          header: this.state.erc20AmountUser.toString(),
          meta: 'ERC20 Amount User',
          description: 'Balance of the users ERC20 token in the contract',
          style: { overflowWrap: 'break-word' }
        }
    ];

    return <Card.Group items={items} />;
  }

  onClickDepositEth = async () => {
      this.setState({ loading: true, errorMessage: '' });
      try {
        const accounts = await web3.eth.getAccounts();
        await this.state.option.methods.buyEth()
          .send({
            from: accounts[0],
            value: web3.utils.toWei("1", 'ether')
          });
        console.log("transaction done")
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
  }

  onClickDepositDai = async () => {
      this.setState({ loading: true, errorMessage: '' });
      try {
        const accounts = await web3.eth.getAccounts();
        await this.state.option.methods.buyDai("1")
            .send({
              from: accounts[0]
            });
        console.log("transaction done")
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({ loading: false });
  }

  approveDai = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        const status = await this.state.erc20.methods.approve(this.props.contract, "1")
            .send({
              from: accounts[0]
            });
            console.log(status);
      } catch (err) {
        this.setState({ errorMessage: err.message });
      }
      this.setState({approved: true});
  }

  renderContractCalls = () => {
    const items = [
        {
          header: 'Deposit Eth',
          description: (
              <Button loading={this.state.loading} onClick={
                      (event, data) => this.onClickDepositEth()
                    }>
                  1 eth
            </Button>)
        },
        {
          header: 'Deposit Dai',
          description: (
            <div>
              {
                  !this.state.approved &&
                <Button onClick={(event, data) => this.approveDai()}>
                    approve
                </Button>
              }
              <Button loading={this.state.loading}
                  onClick={(event, data) => this.onClickDepositDai()}>
                  1 dai
              </Button>
            </div>
          )
        }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
        <div>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                    <h3>Option info - {this.props.contract}</h3>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {this.renderDetails()}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <h3>Interact with contract</h3>
                {!!this.state.errorMessage && <Message error header="Oops!" content={this.state.errorMessage} /> }
                { this.renderContractCalls() }
              </Grid.Column>
            </Grid.Row>
            </Grid>
        </div>
    );
  }
}

export default InteractOption;
