import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FETCH_STATES } from '../constants';
import Spinner from '../ui/spinner';
import TVShow from './tvShow';
import { toggleFavourite } from '../../redux/actions/favouritesActions';
import { fetchTvShowAllDetails } from '../../redux/actions/tvShowActions';

class TVShowContainer extends Component {
  componentDidMount() {
    const showId = parseInt(this.props.match.params.showId, 10);

    this.props.fetchTvShowAllDetails(showId);
  }

  renderShowContent = () => {
    const { match } = this.props;
    const isFavourite = this.props.favourites.has(parseInt(match.params.showId, 10));
    const { data: show, fetchState: showFetchState } = this.props.show;
    const { data: seasons, fetchState: seasonsFetchState } = this.props.show.seasons;

    if (showFetchState === FETCH_STATES.PENDING || showFetchState === null) {
      return <Spinner visible={showFetchState === FETCH_STATES.PENDING} />;
    } else if (showFetchState === FETCH_STATES.FAILED) {
      return <div>Sorry, an error occurred while trying to access resource.</div>;
    } else if (showFetchState === FETCH_STATES.SUCCESS && !show) {
      return <div>Sorry, we could not find searched show.</div>;
    }

    return (
      <TVShow
        match={this.props.match}
        show={show}
        seasonsFetchState={seasonsFetchState}
        seasons={seasons}
        isFavourite={isFavourite}
        toggleFavourite={this.props.toggleFavourite}
      />
    );
  };

  render() {
    return (
      <div className="container">
        <h1>{this.props.show.data ? this.props.show.data.title : null}</h1>
        <div className="row">
          {this.renderShowContent()}
        </div>
      </div>
    );
  }
}

TVShowContainer.propTypes = {
  toggleFavourite: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  favourites: PropTypes.object.isRequired,
  fetchTvShowAllDetails: PropTypes.func.isRequired,
  show: PropTypes.shape({
    data: PropTypes.object,
    fetchState: PropTypes.string,
    seasons: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
      fetchState: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  favourites: new Set(state.favourites),
  show: state.tvShow,
});

const mapDispatchToProps = {
  toggleFavourite,
  fetchTvShowAllDetails,
};

export const ConnectedTVShowContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TVShowContainer);

export default {
  component: ConnectedTVShowContainer,
  loadData: (store, params) => store.dispatch(fetchTvShowAllDetails(params.showId)),
};
