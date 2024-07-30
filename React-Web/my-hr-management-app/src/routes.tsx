import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Employees from './pages/Employees';
import NotFound from './pages/NotFound';

const Routes: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/employees" component={Employees} />
      <Route component={NotFound} />
    </Switch>
  </Router>
);

export default Routes;
