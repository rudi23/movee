import React from 'react';
import PropTypes from 'prop-types';
import TVShowListItem from './tvShowListItem';
import { FETCH_STATES } from '../constants';

const renderList = shows => shows.map(show =>
  <TVShowListItem key={show.id} {...show} />
);

const TVShowList = ({ shows, fetchState, query }) => (
  <section>
    {(fetchState === FETCH_STATES.FAILED) ?
      <div>Sorry, an error occurred while searching.</div> : null}

    {(fetchState === FETCH_STATES.SUCCESS && !shows.length) ?
      <div>Sorry, we could not find anything that matches {query}.</div> : null}

    {(fetchState === FETCH_STATES.SUCCESS && shows.length) ?
      renderList(shows) : null}
  </section>
);

TVShowList.propTypes = {
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchState: PropTypes.string,
  query: PropTypes.string,
};

export default TVShowList;
