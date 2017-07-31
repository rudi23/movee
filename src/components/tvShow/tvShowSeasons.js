import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../ui/spinner';
import { FETCH_STATES } from '../constants';
import TVShowSeason from './tvShowSeason';

const TVShowSeasons = ({ seasons, fetchState }) => {
  if (fetchState === FETCH_STATES.PENDING) {
    return <Spinner visible={fetchState === FETCH_STATES.PENDING} />;
  }

  if (fetchState === FETCH_STATES.FAILED) {
    return <div>Sorry, an error occurred while trying to access resource.</div>;
  }

  if (fetchState === FETCH_STATES.SUCCESS && !seasons) {
    return <div>Sorry, we could not find searched show.</div>;
  }

  if (fetchState === FETCH_STATES.SUCCESS && seasons) {
    return (
      <div id="accordion" className="panel-group" role="tablist" aria-multiselectable="true">
        {seasons.map(season => <TVShowSeason key={season.id} season={season} />)}
      </div>
    );
  }

  return null;
};

TVShowSeasons.defaultProps = {
  fetchState: null,
  seasons: [],
};

TVShowSeasons.propTypes = {
  seasons: PropTypes.array,
  fetchState: PropTypes.string,
};

export default TVShowSeasons;
