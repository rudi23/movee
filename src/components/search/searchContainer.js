import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleFavourite } from '../../redux/actions/favouritesActions';
import { setQuery, clearQuery, fetchResults } from '../../redux/actions/searchActions';
import Search from './search';

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
  }

  componentDidMount() {
    if (this.props.match.params.query !== undefined) {
      const { query } = this.props.match.params;
      this.props.setQuery(query);
      this.props.fetchResults(query);
    }
  }

  handleChange(event) {
    this.props.setQuery(event.target.value);
  }

  handleSubmit(event) {
    const query = this.props.query.trim();
    if (query && this.props.results.fetchState === null) {
      this.props.fetchResults(query).then(() => this.props.history.push(`/search/${query}`));
    }
    event.preventDefault();
  }

  resetQuery(event) {
    this.props.clearQuery();
    event.preventDefault();
  }

  render() {
    return (
      <Search
        query={this.props.query}
        results={this.props.results}
        favourites={this.props.favourites}
        toggleFavourite={this.props.toggleFavourite}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
        resetQuery={this.resetQuery}
      />
    );
  }
}

SearchContainer.propTypes = {
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  query: PropTypes.string.isRequired,
  results: PropTypes.shape({
    fetchState: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  setQuery: PropTypes.func.isRequired,
  clearQuery: PropTypes.func.isRequired,
  fetchResults: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  favourites: new Set(state.favourites),
  query: state.search.query,
  results: state.search.results,
});

const mapDispatchToProps = {
  toggleFavourite,
  setQuery,
  clearQuery,
  fetchResults,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
