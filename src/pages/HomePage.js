import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { toggleFavourite } from '../redux/actions/favouritesActions';
import { setQuery, clearQuery } from '../redux/actions/searchActions';
import Home from '../components/home/Home';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.typeSearchQuery = this.typeSearchQuery.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.resetQuery = this.resetQuery.bind(this);
    this.props.clearQuery();
  }

  typeSearchQuery(event) {
    this.props.setQuery(event.target.value);
  }

  submitSearch(event) {
    const query = this.props.query.trim();
    if (query) {
      this.props.clearQuery();
      this.props.history.push(`/search/${query}`);
    }

    event.preventDefault();
  }

  resetQuery(event) {
    this.props.clearQuery();
    event.preventDefault();
  }

  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Home page</title>
          <meta property="og:title" content="Home page" />
        </Helmet>
        <Home
          query={this.props.query}
          favourites={this.props.favourites}
          toggleFavourite={this.props.toggleFavourite}
          handleChange={this.typeSearchQuery}
          handleSubmit={this.submitSearch}
          resetQuery={this.resetQuery}
        />
      </Fragment>
    );
  }
}

HomePage.propTypes = {
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

export default {
  component: connect(mapStateToProps, mapDispatchToProps)(HomePage),
};
