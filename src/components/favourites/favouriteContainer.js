import React, { Component } from 'react';
import PropTypes from 'prop-types';
import showRepository from '../../repository/tvShowRepository';
import Spinner from '../ui/spinner';
import FavouriteList from './favouriteList';
import { FETCH_STATES } from '../constants';

class FavouriteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchState: null,
      shows: [],
    };
    this.fetchShows = this.fetchShows.bind(this);
  }

  componentWillMount() {
    this.fetchShows(this.props.favourites);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.favourites) !== JSON.stringify(this.props.favourites)) {
      this.fetchShows(nextProps.favourites);
    }
  }

  fetchShows(favourites) {
    this.setState({ fetchState: FETCH_STATES.PENDING });
    showRepository.findByIds(favourites)
      .then(shows => this.setState({ shows, fetchState: FETCH_STATES.SUCCESS }))
      .catch(() => this.setState({ fetchState: FETCH_STATES.FAILED }));
  }

  render() {
    const { shows, fetchState } = this.state;

    return (
      <div className="container">
        <h1>Favourites</h1>
        <div id="tv-show-list" className="row">
          <div className="col-md-12">
            <Spinner visible={fetchState === FETCH_STATES.PENDING} />
            <FavouriteList
              shows={shows}
              fetchState={fetchState}
              favourites={this.props.favourites}
              toggleFavourite={this.props.toggleFavourite}
            />
          </div>
        </div>
      </div>
    );
  }
}

FavouriteContainer.propTypes = {
  favourites: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default FavouriteContainer;