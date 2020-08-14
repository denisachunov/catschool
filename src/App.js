import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Counter from './features/counter/Counter';
import Alphabet from './features/alphabet/Alphabet';
import Home from './features/Home';
import './App.scss';

export default () => (
  <div className="App">
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/abc" component={Alphabet} />
        <Route path="/math" component={Counter} />
      </Switch>
    </Router>
  </div>
);