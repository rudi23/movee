import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import Menu from './layout/menu';
import Footer from './layout/footer';

const App = ({ route }) => (
  <div>
    <Menu />
    {renderRoutes(route.routes)}
    <Footer />
  </div>
);

App.propTypes = {
  route: PropTypes.object.isRequired,
};

export default {
  component: App,
  loadData: store => store.dispatch({ type: 'FETCH_FAVOURITES' }),
};
