import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
// import TVShowMenu from './TvShowMenu';
import TVShowInfo from './TvShowInfo';
import TVShowSeasons from './TvShowSeasons';

const TVShow = ({
  match, seasons, seasonsFetchState, show, isFavourite, toggleFavourite,
}) => (
  <div>
    <div className="col-md-12">
      {/*<TVShowMenu match={match} />*/}
    </div>

    <div className="col-md-12">
      <Route
        path={`${match.url}/seasons`}
        render={() => <TVShowSeasons seasons={seasons} fetchState={seasonsFetchState} />}
      />
      <Route
        exact
        path={match.url}
        render={() => (
          <TVShowInfo
            isFavourite={isFavourite}
            show={show}
            toggleFavourite={toggleFavourite}
          />
        )}
      />
    </div>
  </div>
);

TVShow.defaultProps = {
  seasons: [],
};

TVShow.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  seasons: PropTypes.arrayOf(PropTypes.object),
  seasonsFetchState: PropTypes.string.isRequired,
  show: PropTypes.object.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default TVShow;
