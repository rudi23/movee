import React, { Component } from 'react';
import PropTypes from 'prop-types';
import showRepository from '../../repository/tvShowRepository';
import Spinner from '../ui/spinner';
import { FETCH_STATES } from '../constants';

class TVShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchState: null,
      show: null,
    };

    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    const showId = parseInt(this.props.match.params.showId, 10);
    this.setState({ fetchState: FETCH_STATES.PENDING });
    showRepository.findById(showId)
      .then(show => this.setState({ show, fetchState: FETCH_STATES.SUCCESS }))
      .catch((err) => {
        const fetchState = (err.message === 'Not Found') ? FETCH_STATES.SUCCESS : FETCH_STATES.FAILED;
        this.setState({ fetchState });
      });
  }

  onClick = tvShowId => (e) => {
    e.preventDefault();
    this.props.toggleFavourite(tvShowId);
  };

  renderShow() {
    const { show, fetchState } = this.state;
    const { isFavourite } = this.props;
    const favImage = isFavourite ? 'star-filled' : 'star-unfilled';
    const favAlt = isFavourite ? 'Filled star' : 'Unfilled star';

    if (fetchState === FETCH_STATES.FAILED) {
      return <div>Sorry, an error occurred while trying to access resource.</div>;
    }

    if (fetchState === FETCH_STATES.SUCCESS && !show) {
      return <div>Sorry, we could not find searched show.</div>;
    }

    if (fetchState === FETCH_STATES.SUCCESS && show) {
      return (
        <article className="tv-show">
          <div className="tv-show__cover">
            <img src={show.image} alt={show.title} />
          </div>
          <div className="tv-show-info">
            <h3>{show.title}</h3>
            <h5>{show.language}, {show.premiered}</h5>
            <a tabIndex="-1" role="button" onClick={this.onClick(show.id)}>
              <img src={`/${favImage}.svg`} alt={`${favAlt}`} className="favourite-star" />
            </a>
          </div>
        </article>
      );
    }

    return null;
  }

  render() {
    return (
      <div id="tv-show-container" className="row">
        <div className="col-md-8 col-md-offset-2">
          <div className="row">
            <Spinner visible={this.state.fetchState === FETCH_STATES.PENDING} />
            {this.renderShow()}
          </div>
        </div>
      </div>
    );
  }
}

TVShow.propTypes = {
  isFavourite: PropTypes.bool.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }).isRequired,
};

export default TVShow;
