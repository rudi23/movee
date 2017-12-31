import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../search/SearchBar';
import { ConnectedSchedulePage as ScheduleContainer } from '../../pages/SchedulePage';

const Home = ({
  query,
  favourites,
  toggleFavourite,
  handleChange,
  handleSubmit,
  resetQuery,
}) => (
  <div className="container">
    <h1>Home</h1>
    <SearchBar
      query={query}
      onChange={handleChange}
      onSubmit={handleSubmit}
      resetQuery={resetQuery}
    />
    <ScheduleContainer
      favourites={favourites}
      toggleFavourite={toggleFavourite}
    />
  </div>
);

Home.propTypes = {
  query: PropTypes.string.isRequired,
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  resetQuery: PropTypes.func.isRequired,
};

export default Home;
