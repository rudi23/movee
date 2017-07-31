import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import showRepository from '../../repository/tvShowRepository';
import { FETCH_STATES } from '../constants';
import TVShowMenu from './tvShowMenu';
import TVShowInfo from './tvShowInfo';
import Spinner from '../ui/spinner';
import TVShowSeasons from './tvShowSeasons';

class TVShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: {
        fetchState: null,
        data: null,
      },
      seasons: {
        fetchState: null,
        data: null,
      },
    };

    this.toggleFavourite = this.toggleFavourite.bind(this);
  }

  componentWillMount() {
    const showId = parseInt(this.props.match.params.showId, 10);

    this.setState({ show: { fetchState: FETCH_STATES.PENDING } });
    showRepository.findById(showId)
      .then(data => this.setState({ show: { data, fetchState: FETCH_STATES.SUCCESS } }))
      .catch((err) => {
        const fetchState = (err.message === 'Not Found') ? FETCH_STATES.SUCCESS : FETCH_STATES.FAILED;
        this.setState({ show: { fetchState } });
      });

    this.setState({ seasons: { fetchState: FETCH_STATES.PENDING } });
    showRepository.findSeasonsWithEpisodes(showId)
      .then(data => this.setState({ seasons: { data, fetchState: FETCH_STATES.SUCCESS } }))
      .catch((err) => {
        const fetchState = (err.message === 'Not Found') ? FETCH_STATES.SUCCESS : FETCH_STATES.FAILED;
        this.setState({ seasons: { fetchState } });
      });
  }

  toggleFavourite = tvShowId => (e) => {
    e.preventDefault();
    this.props.toggleFavourite(tvShowId);
  };

  renderShowContent = () => {
    const { isFavourite, match } = this.props;
    const { data: show = null, fetchState: showFetchState } = this.state.show;
    const { data: seasons = [], fetchState: seasonsFetchState } = this.state.seasons;

    if (showFetchState === FETCH_STATES.PENDING) {
      return <Spinner visible={showFetchState === FETCH_STATES.PENDING} />;
    }

    if (showFetchState === FETCH_STATES.FAILED) {
      return <div>Sorry, an error occurred while trying to access resource.</div>;
    }

    if (showFetchState === FETCH_STATES.SUCCESS && !show) {
      return <div>Sorry, we could not find searched show.</div>;
    }

    return (
      <div>
        <div className="col-md-12">
          <TVShowMenu match={this.props.match} />
        </div>

        <div className="col-md-12">
          <Route
            path={`${match.url}/seasons`}
            render={() => (
              <TVShowSeasons
                seasons={seasons}
                fetchState={seasonsFetchState}
              />
            )}
          />
          <Route
            exact
            path={match.url}
            render={() => (
              <TVShowInfo
                isFavourite={isFavourite}
                show={show}
                onClick={this.toggleFavourite}
              />
            )}
          />
        </div>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <h1>{this.state.show.data ? this.state.show.data.title : null}</h1>
        <div className="row">
          {this.renderShowContent()}
        </div>
      </div>
    );
  }
}

TVShow.propTypes = {
  isFavourite: PropTypes.bool.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default TVShow;
