import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import IssuesList from './Pages/IssuesList';

class Routes extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={IssuesList} />
            <Redirect to="/error" />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default Routes;
