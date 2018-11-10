import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FETCH_STATES } from '../constants';
import Spinner from '../components/ui/Spinner';
import TVShow from '../components/tvShow/TvShow';
import { toggleFavourite } from '../redux/actions/favouritesActions';
import { fetchTvShowAllDetails } from '../redux/actions/tvShowActions';

class TVShowPage extends Component {
  componentDidMount() {
    const showId = parseInt(this.props.match.params.showId, 10);

    this.props.fetchTvShowAllDetails(showId);
  }

  renderShowContent() {
    const { match } = this.props;
    const isFavourite = this.props.favourites.has(parseInt(match.params.showId, 10));
    const { data: show, fetchState: showFetchState } = this.props.show;
    const { data: seasons, fetchState: seasonsFetchState } = this.props.show.seasons;

    if (showFetchState === FETCH_STATES.PENDING || showFetchState === null) {
      return <Spinner visible={showFetchState === FETCH_STATES.PENDING} />;
    }
    if (showFetchState === FETCH_STATES.FAILED) {
      return <div>Sorry, an error occurred while trying to access resource.</div>;
    }
    if (showFetchState === FETCH_STATES.SUCCESS && !show) {
      return <div>Sorry, we could not find searched show.</div>;
    }

    return (
      <TVShow
        isFavourite={isFavourite}
        match={this.props.match}
        seasons={seasons}
        seasonsFetchState={seasonsFetchState}
        show={show}
        toggleFavourite={this.props.toggleFavourite}
      />
    );
  }

  render() {
    return (
      <div className="container container-main">
        <h1>{this.props.show.data ? this.props.show.data.title : null}</h1>
        <div className="row">{this.renderShowContent()}</div>
      </div>
    );
  }
}

TVShowPage.propTypes = {
  favourites: PropTypes.object.isRequired,
  fetchTvShowAllDetails: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  show: PropTypes.shape({
    data: PropTypes.object,
    fetchState: PropTypes.string,
    seasons: PropTypes.shape({
      data: PropTypes.arrayOf(PropTypes.object),
      fetchState: PropTypes.string,
    }).isRequired,
  }).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  favourites: new Set(state.favourites),
  show: state.tvShow,
});

const mapDispatchToProps = {
  toggleFavourite,
  fetchTvShowAllDetails,
};

export const ConnectedTVShowPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(TVShowPage);

export default {
  component: ConnectedTVShowPage,
  loadData: (store, params) => store.dispatch(fetchTvShowAllDetails(params.showId)),
};
