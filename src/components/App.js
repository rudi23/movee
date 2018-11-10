import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';
import { fetchCurrentUser } from '../redux/actions/authActions';
import Menu from './layout/Menu';
import Footer from './layout/Footer';

const App = ({ route }) => (
  <Fragment>
    <header>
      <Menu />
    </header>
    {renderRoutes(route.routes)}
    <Footer />
  </Fragment>
);

App.propTypes = {
  route: PropTypes.object.isRequired,
};

export default {
  component: App,
  loadData: store => Promise.all([store.dispatch({ type: 'FETCH_FAVOURITES' }), store.dispatch(fetchCurrentUser())]),
};
