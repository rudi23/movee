import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './searchBar';
import TVShowList from './tvShowList';
import showRepository from '../../repository/tvShowRepository';
import Spinner from '../ui/spinner';
import { FETCH_STATES } from '../constants';
import { toggleFavourite } from '../../redux/actions/favouritesActions';
import { setQuery, clearQuery } from '../../redux/actions/searchActions';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchState: null,
      shows: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.query !== undefined) {
      const { query } = this.props.match.params;
      this.props.setQuery(query);
      showRepository.search(query)
        .then(shows => this.setState({ shows, fetchState: FETCH_STATES.SUCCESS }))
        .catch(() => this.setState({ fetchState: FETCH_STATES.FAILED }));
    }
  }

  handleChange(event) {
    this.props.setQuery(event.target.value);
    this.setState({ fetchState: null });
  }

  handleSubmit(event) {
    const query = this.props.query.trim();
    if (query && this.state.fetchState === null) {
      this.setState({ fetchState: FETCH_STATES.PENDING });
      showRepository.search(query)
        .then(shows => this.setState({ shows, fetchState: FETCH_STATES.SUCCESS }))
        .then(() => this.props.history.push(`/search/${query}`))
        .catch(() => this.setState({ fetchState: FETCH_STATES.FAILED }));
    }
    event.preventDefault();
  }

  resetQuery(event) {
    this.props.clearQuery();
    this.setState({ fetchState: null });
    event.preventDefault();
  }

  render() {
    const { shows, fetchState } = this.state;

    return (
      <div className="container">
        <h1>Search</h1>
        <SearchBar
          query={this.props.query}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          resetQuery={this.resetQuery}
        />
        <div id="tv-show-list" className="row">
          <div className="col-md-12">
            <Spinner visible={fetchState === FETCH_STATES.PENDING} />
            <TVShowList
              shows={shows}
              query={this.props.query}
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

Search.propTypes = {
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  clearQuery: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  favourites: new Set(state.favourites),
  query: state.search.query,
});

const mapDispatchToProps = {
  toggleFavourite,
  setQuery,
  clearQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
