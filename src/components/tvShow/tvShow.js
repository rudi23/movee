import React, { Component } from 'react';
import PropTypes from 'prop-types';
import showRepository from '../../repository/tvShowRepository';

class TVShow extends Component {
  constructor() {
    super();
    this.state = {
      show: null,
    };
  }

  componentDidMount() {
    const { showId } = this.props.match.params;
    showRepository.findById(showId).then(show => this.setState({ show }));
  }

  renderShow() {
    const { show } = this.state;
    if (!show) {
      return <article className="tv-show" />;
    }

    return (
      <article className="tv-show">
        <img src={show.image} alt={show.title} />
        <div className="tv-show-info">
          <h3>{show.title}</h3>
          <h5>{show.language}, {show.premiered}</h5>
        </div>
      </article>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="row">
            { this.renderShow() }
          </div>
        </div>
      </div>
    );
  }
}

TVShow.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default TVShow;
