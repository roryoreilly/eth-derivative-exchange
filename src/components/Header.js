import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from '../App';

export default () => {
  return (
    <Router>
        <Menu style={{ marginTop: '10px' }}>
          <Link to="/">
            <a className="item">Home</a>
          </Link>

          <Menu.Menu position="right">
            <Link to="/contracts">
              <a className="item">Contracts</a>
            </Link>
          </Menu.Menu>
        </Menu>

        <Switch>
          <Route exact path="/" component={App} />
          <Route exact path="/contracts" component={App} />
        </Switch>
      </Router>
  );
};
