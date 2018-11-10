import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import { toggleFavourite } from '../redux/actions/favouritesActions';
import Spinner from '../components/ui/Spinner';
import FavouriteList from '../components/favourites/FavouriteList';
import { FETCH_STATES } from '../constants';
import { fetchFavouriteShows } from '../redux/actions/favouriteShowsActions';
import RequireAuth from '../components/hoc/RequireAuth';

class FavouritesPage extends Component {
  componentDidMount() {
    this.props.fetchFavouriteShows(this.props.favourites);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual([...nextProps.favourites], [...this.props.favourites])) {
      this.props.fetchFavouriteShows(nextProps.favourites);
    }
  }

  render() {
    const { shows, favourites, toggleFavourite: toggleFavouriteProp } = this.props;
    return (
      <div className="container container-main">
        <h1>Favourites</h1>
        <div className="row" id="tv-show-list">
          <div className="col-md-12">
            <Spinner visible={shows.fetchState === FETCH_STATES.PENDING} />
            <FavouriteList
              favourites={favourites}
              fetchState={shows.fetchState}
              shows={shows.data}
              toggleFavourite={toggleFavouriteProp}
            />
          </div>
        </div>
      </div>
    );
  }
}

FavouritesPage.propTypes = {
  favourites: PropTypes.object.isRequired,
  fetchFavouriteShows: PropTypes.func.isRequired,
  shows: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    fetchState: PropTypes.string,
  }).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  favourites: new Set(state.favourites),
  shows: state.favouriteShows,
});

const mapDispatchToProps = {
  toggleFavourite,
  fetchFavouriteShows,
};

export default {
  component: connect(
    mapStateToProps,
    mapDispatchToProps
  )(RequireAuth(FavouritesPage)),
  loadData: store => store.dispatch(fetchFavouriteShows(store.getState().favourites)),
};
