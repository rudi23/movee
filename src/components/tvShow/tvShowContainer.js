import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import showRepository from '../../repository/tvShowRepository';
import { FETCH_STATES } from '../constants';
import Spinner from '../ui/spinner';
import TVShow from './tvShow';
import { toggleFavourite } from '../../redux/actions/favouritesActions';

class TVShowContainer extends Component {
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
  }

  componentDidMount() {
    const showId = parseInt(this.props.match.params.showId, 10);

    this.setState({ show: { fetchState: FETCH_STATES.PENDING, data: this.state.show.data } });
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

  renderShowContent = () => {
    const { match } = this.props;
    const isFavourite = this.props.favourites.has(parseInt(match.params.showId, 10));
    const { data: show = null, fetchState: showFetchState } = this.state.show;
    const { data: seasons = [], fetchState: seasonsFetchState } = this.state.seasons;

    if (showFetchState === FETCH_STATES.PENDING || showFetchState === null) {
      return <Spinner visible={showFetchState === FETCH_STATES.PENDING} />;
    } else if (showFetchState === FETCH_STATES.FAILED) {
      return <div>Sorry, an error occurred while trying to access resource.</div>;
    } else if (showFetchState === FETCH_STATES.SUCCESS && !show) {
      return <div>Sorry, we could not find searched show.</div>;
    }

    return (<TVShow
      match={this.props.match}
      seasons={seasons}
      seasonsFetchState={seasonsFetchState}
      show={show}
      isFavourite={isFavourite}
      toggleFavourite={this.props.toggleFavourite}
    />);
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

TVShowContainer.propTypes = {
  toggleFavourite: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  favourites: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  favourites: new Set(state.favourites),
});

const mapDispatchToProps = {
  toggleFavourite,
};

export default connect(mapStateToProps, mapDispatchToProps)(TVShowContainer);
