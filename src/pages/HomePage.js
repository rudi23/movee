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
    const { favourites, query, toggleFavourite: toggleFavouriteProp } = this.props;

    return (
      <Fragment>
        <Helmet>
          <title>Home page</title>
          <meta content="Home page" property="og:title" />
        </Helmet>
        <Home
          favourites={favourites}
          handleChange={this.typeSearchQuery}
          handleSubmit={this.submitSearch}
          query={query}
          resetQuery={this.resetQuery}
          toggleFavourite={toggleFavouriteProp}
        />
      </Fragment>
    );
  }
}

HomePage.propTypes = {
  clearQuery: PropTypes.func.isRequired,
  favourites: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
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
  component: connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage),
};
