import React from 'react';
import PropTypes from 'prop-types';
import { FETCH_STATES } from '../../constants';
import TVShowInfo from '../tvShow/TvShowInfo';

const renderList = (shows, favourites, toggleFavourite) => shows.map(show => (
  <TVShowInfo
    key={show.id}
    isFavourite={favourites.has(show.id)}
    toggleFavourite={toggleFavourite}
    show={show}
    isLinked
  />
));

const FavouriteList = ({
  shows, fetchState, favourites, toggleFavourite,
}) => {
  let content = null;

  if (fetchState === FETCH_STATES.FAILED) {
    content = <div>Sorry, an error occurred while retrieving favourites.</div>;
  } else if (fetchState === FETCH_STATES.SUCCESS && !shows.length) {
    content = <div>You do not have any favourite tv shows.</div>;
  } else if (fetchState === FETCH_STATES.SUCCESS && shows.length) {
    content = renderList(shows, favourites, toggleFavourite);
  }

  return <section>{content}</section>;
};

FavouriteList.defaultProps = {
  fetchState: null,
};

FavouriteList.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchState: PropTypes.string,
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default FavouriteList;
