import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './search/searchBar';
import Schedule from './schedule/schedule';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ query: event.target.value });
  }

  handleSubmit(event) {
    const query = this.state.query.trim();
    if (query) {
      this.setState({ query: '' });
      this.props.history.push(`/search/${query}`);
    }

    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <SearchBar
          query={this.state.query}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
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
  favourites: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Home;
