import React from 'react';
import PropTypes from 'prop-types';
import TVShowListItem from '../tvShow/tvShowListItem';
import { FETCH_STATES } from '../constants';

const renderList = (shows, favourites, toggleFavourite) => shows.map(show =>
  <TVShowListItem
    key={show.id}
    isFavourite={favourites.includes(show.id)}
    toggleFavourite={toggleFavourite}
    {...show}
  />
);

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

FavouriteList.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchState: PropTypes.string,
  favourites: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default FavouriteList;
