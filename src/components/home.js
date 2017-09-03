import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SearchBar from './search/searchBar';
import Schedule from './schedule/schedule';
import { toggleFavourite } from '../redux/actions/favouritesActions';
import { setQuery, clearQuery } from '../redux/actions/searchActions';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
    this.props.clearQuery();
  }

  handleChange(event) {
    this.props.setQuery(event.target.value);
  }

  handleSubmit(event) {
    const query = this.props.query.trim();
    if (query) {
      this.props.clearQuery();
      this.props.history.push(`/search/${query}`);
    }

    event.preventDefault();
  }

  resetQuery(event) {
    this.props.clearQuery();
    this.setState({ fetchState: null });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <SearchBar
          query={this.props.query}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          resetQuery={this.resetQuery}
        />
        <Schedule
          favourites={this.props.favourites}
          toggleFavourite={this.props.toggleFavourite}
        />
      </div>
    );
  }
}

Home.propTypes = {
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
