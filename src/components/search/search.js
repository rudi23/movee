import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './searchBar';
import TVShowList from './tvShowList';
import showRepository from '../../repository/tvShowRepository';
import Spinner from '../ui/spinner';
import { FETCH_STATES } from '../constants';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      fetchState: null,
      query: '',
      shows: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.match.params.query !== undefined) {
      const { query } = this.props.match.params;
      this.setState({ query, fetchState: FETCH_STATES.PENDING });
      showRepository.search(query)
        .then(shows => this.setState({ shows, fetchState: FETCH_STATES.SUCCESS }))
        .catch(() => this.setState({ fetchState: FETCH_STATES.FAILED }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.query === undefined) {
      this.setState({ query: '', shows: [] });
    }
  }

  handleChange(event) {
    this.setState({ query: event.target.value, fetchState: null });
  }

  handleSubmit(event) {
    const query = this.state.query.trim();
    if (query && this.state.fetchState === null) {
      this.setState({ fetchState: FETCH_STATES.PENDING });
      showRepository.search(query)
        .then(shows => this.setState({ shows, fetchState: FETCH_STATES.SUCCESS }))
        .then(() => this.props.history.push(`/search/${query}`))
        .catch(() => this.setState({ fetchState: FETCH_STATES.FAILED }));
    }
    event.preventDefault();
  }

  render() {
    const { query, shows, fetchState } = this.state;

    return (
      <div className="container">
        <h1>Search</h1>
        <SearchBar
          query={query}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
        <div id="tv-show-list" className="row">
          <div className="col-md-12">
            <Spinner visible={fetchState === FETCH_STATES.PENDING} />
            <TVShowList shows={shows} query={query} fetchState={fetchState} />
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Search;
