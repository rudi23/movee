import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Layout from './layout/layout';

const customHistory = createBrowserHistory();

const App = () => (
  <Router history={customHistory}>
    <Layout />
  </Router>
);

export default App;
