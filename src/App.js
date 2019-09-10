import React, { Component } from 'react';
import { Card, Button, Grid} from 'semantic-ui-react';
import derivatives from './ethereum/der_dex';
import NewOption from './options/NewOption';
import InteractOption from './options/InteractOption';

class App extends Component {
    state = {
        options: [],
        choosenOption: ''
    };

    componentWillMount() {
        this.loadBlockchainData();
    }

    async loadBlockchainData() {
        const options = await derivatives.methods.getOptions().call();
        this.setState({ options });
    }

    renderOptions = () => {
        const items = this.state.options.map(address => {
            return {
              header: address,
              description: (
                  <Button onClick={
                          (event, data) => this.setState({ choosenOption: data.children })
                        }>
                      {address}
                </Button>),
              fluid: true
          }
        });
        return <Card.Group items={items} />;
    }

    render() {
      return (
          <Grid>
            <Grid.Row>
              <Grid.Column width={10}>
                <h3>Open Campaigns</h3>

                { this.renderOptions() }
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                  <NewOption />
              </Grid.Column>
            </Grid.Row>
            {
                !!this.state.choosenOption && (
                    <Grid.Row>
                      <Grid.Column>
                          <InteractOption contract={this.state.choosenOption}/>
                      </Grid.Column>
                    </Grid.Row>
                )
            }
        </Grid>
      );
    }

}

export default App;
