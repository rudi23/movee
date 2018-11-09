import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from '../search/SearchBar';
import { ConnectedSchedulePage as ScheduleContainer } from '../../pages/SchedulePage';

const Home = ({ query, favourites, toggleFavourite, handleChange, handleSubmit, resetQuery }) => (
  <div className="container">
    <h1>Home</h1>
    <SearchBar onChange={handleChange} onSubmit={handleSubmit} query={query} resetQuery={resetQuery} />
    <ScheduleContainer favourites={favourites} toggleFavourite={toggleFavourite} />
  </div>
);

Home.propTypes = {
  favourites: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  resetQuery: PropTypes.func.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default Home;
