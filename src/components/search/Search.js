import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../ui/Spinner';
import { FETCH_STATES } from '../../constants';
import SearchBar from './SearchBar';
import TVShowList from './TvShowList';

const Search = ({ query, results, favourites, toggleFavourite, handleSubmit, handleChange, resetQuery }) => (
  <div className="container">
    <h1>Search</h1>
    <SearchBar onChange={handleChange} onSubmit={handleSubmit} query={query} resetQuery={resetQuery} />
    <div className="row" id="tv-show-list">
      <div className="col-md-12">
        <Spinner visible={results.fetchState === FETCH_STATES.PENDING} />
        <TVShowList
          favourites={favourites}
          fetchState={results.fetchState}
          query={query}
          shows={results.data}
          toggleFavourite={toggleFavourite}
        />
      </div>
    </div>
  </div>
);

Search.propTypes = {
  favourites: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  resetQuery: PropTypes.func.isRequired,
  results: PropTypes.shape({
    fetchState: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default Search;
