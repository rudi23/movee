import React from 'react';
import PropTypes from 'prop-types';
import { FETCH_STATES } from '../constants';
import TVShowInfo from '../tvShow/tvShowInfo';

const renderList = (shows, favourites, toggleFavourite) => shows.map(show => (
  <TVShowInfo
    key={show.id}
    isFavourite={favourites.has(show.id)}
    toggleFavourite={toggleFavourite}
    show={show}
    isLinked
  />
));

const TVShowList = ({ shows, fetchState, query, favourites, toggleFavourite }) => {
  let content = null;

  if (fetchState === FETCH_STATES.FAILED) {
    content = <div>Sorry, an error occurred while searching.</div>;
  } else if (fetchState === FETCH_STATES.SUCCESS && !shows.length) {
    content = <div>Sorry, we could not find anything that matches {query}.</div>;
  } else if (fetchState === FETCH_STATES.SUCCESS && shows.length) {
    content = renderList(shows, favourites, toggleFavourite);
  }

  return <section>{content}</section>;
};

TVShowList.defaultProps = {
  fetchState: null,
  query: '',
};

TVShowList.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchState: PropTypes.string,
  query: PropTypes.string,
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default TVShowList;
