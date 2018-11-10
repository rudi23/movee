import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toggleFavourite } from '../redux/actions/favouritesActions';
import { setQuery, clearQuery, fetchResults } from '../redux/actions/searchActions';
import Search from '../components/search/Search';

class SearchPage extends Component {
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
    const { favourites, query, results, toggleFavourite: toggleFavouriteProp } = this.props;
    return (
      <div className="container container-main">
        <h1>Search</h1>
        <Search
          favourites={favourites}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          query={query}
          resetQuery={this.resetQuery}
          results={results}
          toggleFavourite={toggleFavouriteProp}
        />
      </div>
    );
  }
}

SearchPage.propTypes = {
  clearQuery: PropTypes.func.isRequired,
  favourites: PropTypes.object.isRequired,
  fetchResults: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
  query: PropTypes.string.isRequired,
  results: PropTypes.shape({
    fetchState: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  setQuery: PropTypes.func.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
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

export default {
  component: connect(
    mapStateToProps,
    mapDispatchToProps
  )(SearchPage),
};
