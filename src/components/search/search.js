import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './searchBar';
import TVShowList from './tvShowList';
import showRepository from '../../repository/tvShowRepository';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      query: '',
      shows: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (this.props.match.params.query !== undefined) {
      const { query } = this.props.match.params;
      this.setState({ query, loading: true });
      showRepository.search(query).then(shows => this.setState({ shows, loading: false }));
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.query === undefined) {
      this.setState({ query: '', shows: [] });
    }
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    const query = this.state.query.trim();
    if (query && this.state.query !== this.props.match.params.query) {
      this.setState({ loading: true });
      showRepository.search(query)
        .then(shows => this.setState({ shows, loading: false }))
        .then(() => this.props.history.push(`/search/${query}`));
    }
    event.preventDefault();
  }

  renderList() {
    const { query } = this.state;

    if (!this.state.shows.length
      && this.props.match.params.query === query
      && this.state.loading === false
    ) {
      return <div>Sorry, we could not find anything that matches {query}.</div>;
    }

    return (<TVShowList
      shows={this.state.shows}
      query={this.state.query}
      loading={this.state.loading}
      routerQuery={this.props.match.params.query}
    />);
  }

  render() {
    return (
      <div className="container">
        <h1>Search</h1>
        <SearchBar
          query={this.state.query}
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
        />
        <div id="tv-show-list" className="row">
          <div className="col-md-12">
            {this.renderList()}
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
