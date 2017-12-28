import React from 'react';
import PropTypes from 'prop-types';
import SearchBar from './searchBar';
import TVShowList from './tvShowList';
import Spinner from '../ui/spinner';
import { FETCH_STATES } from '../constants';

const Search = ({
  query,
  results,
  favourites,
  toggleFavourite,
  handleSubmit,
  handleChange,
  resetQuery,
}) => (
  <div className="container">
    <h1>Search</h1>
    <SearchBar
      query={query}
      onSubmit={handleSubmit}
      onChange={handleChange}
      resetQuery={resetQuery}
    />
    <div id="tv-show-list" className="row">
      <div className="col-md-12">
        <Spinner visible={results.fetchState === FETCH_STATES.PENDING} />
        <TVShowList
          shows={results.data}
          query={query}
          fetchState={results.fetchState}
          favourites={favourites}
          toggleFavourite={toggleFavourite}
        />
      </div>
    </div>
  </div>
);

Search.propTypes = {
  query: PropTypes.string.isRequired,
  results: PropTypes.shape({
    fetchState: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  resetQuery: PropTypes.func.isRequired,
};

export default Search;
