import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { toggleFavourite } from '../../redux/actions/favouritesActions';
import Spinner from '../ui/spinner';
import FavouriteList from './favouriteList';
import { FETCH_STATES } from '../constants';
import { fetchFavouriteShows } from '../../redux/actions/favouriteShowsActions';

class FavouriteContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchState: null,
      shows: [],
    };
  }

  componentDidMount() {
    this.props.fetchFavouriteShows(this.props.favourites);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual([...nextProps.favourites], [...this.props.favourites])) {
      this.props.fetchFavouriteShows(nextProps.favourites);
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Favourites</h1>
        <div id="tv-show-list" className="row">
          <div className="col-md-12">
            <Spinner visible={this.props.fetchState === FETCH_STATES.PENDING} />
            <FavouriteList
              shows={this.props.shows}
              fetchState={this.props.fetchState}
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
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
  fetchFavouriteShows: PropTypes.func.isRequired,
  shows: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchState: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  favourites: new Set(state.favourites),
  shows: state.favouriteShows.shows,
  fetchState: state.favouriteShows.fetchState,
});

const mapDispatchToProps = {
  toggleFavourite,
  fetchFavouriteShows,
};

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteContainer);
