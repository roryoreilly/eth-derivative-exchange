import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import derivatives from '../ethereum/der_dex';
import web3 from '../ethereum/web3';

class NewOption extends Component {
  state = {
    errorMessage: '',
    loading: false,
    premium: 0,
    otherContract: '0xc26D16D51940583C4B9e619daf8750CDd0cAb19E'
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });
    try {
      const accounts = await web3.eth.getAccounts();
      await derivatives.methods
        .createOption(this.state.premium, this.state.otherContract)
        .send({
          from: accounts[0]
        });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
        <div>
            <h3>Create a Option contract type</h3>

            <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                <Form.Field>
                  <label>Premium</label>
                  <Input
                    label="wei"
                    labelPosition="right"
                    value={this.state.premium}
                    onChange={event =>
                      this.setState({ premium: event.target.value })}
                  />
                </Form.Field>

                <Form.Field>
                  <label>Other Contract</label>
                  <Input
                    label="contract address"
                    labelPosition="right"
                    value={this.state.otherContract}
                    onChange={event =>
                      this.setState({ otherContract: event.target.value })}
                  />
                </Form.Field>

              <Message error header="Oops!" content={this.state.errorMessage} />
              <Button loading={this.state.loading} primary>
                Create!
              </Button>
            </Form>
        </div>
    );
  }
}

export default NewOption;
