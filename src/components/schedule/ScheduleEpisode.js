import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HtmlSummary from '../ui/HtmlSummary';
import FavouriteIcon from '../favourites/FavouriteIcon';

const ScheduleEpisode = ({ airTime, isFavourite, toggleFavourite, show, summary, title }) => (
  <div className="schedule-episode">
    <div className="tv-show-info__header">
      <FavouriteIcon
        className="tv-show-info__favourite"
        isFavourite={isFavourite}
        toggleFavourite={toggleFavourite}
        tvShowId={show.id}
      />
      <h2 className="tv-show-info__title">
        <Link to={`/show/${show.id}`}>
          {show.title}: {title}
        </Link>
      </h2>
    </div>
    <p className="schedule-episode__airtime">{airTime}</p>
    <HtmlSummary summary={summary} />
  </div>
);

ScheduleEpisode.defaultProps = {
  summary: null,
};

ScheduleEpisode.propTypes = {
  airTime: PropTypes.string.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  show: PropTypes.object.isRequired,
  summary: PropTypes.string,
  title: PropTypes.string.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default ScheduleEpisode;
