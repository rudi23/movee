import React from 'react';
import PropTypes from 'prop-types';
import { FETCH_STATES } from '../constants';
import TVShowInfo from '../tvShow/tvShowInfo';

const renderList = (shows, favourites, toggleFavourite) => shows.map(show => (
  <TVShowInfo
    key={show.id}
    isFavourite={favourites.includes(show.id)}
    toggleFavourite={toggleFavourite}
    show={show}
    isLinked
  />
));

const FavouriteList = ({ shows, fetchState, favourites, toggleFavourite }) => (
  <section>
    {(fetchState === FETCH_STATES.FAILED) ?
      <div>Sorry, an error occurred while retrieving favourites.</div> : null}

    {(fetchState === FETCH_STATES.SUCCESS && !shows.length) ?
      <div>You don not have any favourite tv shows.</div> : null}

    {(fetchState === FETCH_STATES.SUCCESS && shows.length) ?
      renderList(shows, favourites, toggleFavourite) : null}
  </section>
);

FavouriteList.defaultProps = {
  fetchState: null,
};

FavouriteList.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchState: PropTypes.string,
  favourites: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default FavouriteList;
