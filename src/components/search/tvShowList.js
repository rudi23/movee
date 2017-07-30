import React from 'react';
import PropTypes from 'prop-types';
import TVShowListItem from '../tvShow/tvShowListItem';
import { FETCH_STATES } from '../constants';

const renderList = (shows, favourites, toggleFavourite) => shows.map(show => (
  <TVShowListItem
    key={show.id}
    isFavourite={favourites.includes(show.id)}
    toggleFavourite={toggleFavourite}
    {...show}
  />
));

const TVShowList = ({ shows, fetchState, query, favourites, toggleFavourite }) => (
  <section>
    {(fetchState === FETCH_STATES.FAILED) ?
      <div>Sorry, an error occurred while searching.</div> : null}

    {(fetchState === FETCH_STATES.SUCCESS && !shows.length) ?
      <div>Sorry, we could not find anything that matches {query}.</div> : null}

    {(fetchState === FETCH_STATES.SUCCESS && shows.length) ?
      renderList(shows, favourites, toggleFavourite) : null}
  </section>
);

TVShowList.defaultProps = {
  fetchState: null,
  query: '',
};

TVShowList.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchState: PropTypes.string,
  query: PropTypes.string,
  favourites: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default TVShowList;
