import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import HtmlSummary from '../ui/htmlSummary';
import FavouriteIcon from '../favourites/favouriteIcon';

const ScheduleEpisode = (props) => {
  const { isFavourite, toggleFavourite } = props;

  return (
    <div className="schedule-episode">
      <div className="tv-show-info__header">
        <FavouriteIcon
          isFavourite={isFavourite}
          toggleFavourite={toggleFavourite}
          tvShowId={props.show.id}
          className="tv-show-info__favourite"
        />
        <h2 className="tv-show-info__title">
          <Link to={`/show/${props.show.id}`}>
            {props.show.title}: {props.title}
          </Link>
        </h2>
      </div>
      <p className="schedule-episode__airtime">{props.airTime}</p>
      <HtmlSummary summary={props.summary} />
    </div>
  );
};

ScheduleEpisode.defaultProps = {
  summary: null,
};

ScheduleEpisode.propTypes = {
  title: PropTypes.string.isRequired,
  airTime: PropTypes.string.isRequired,
  show: PropTypes.object.isRequired,
  summary: PropTypes.string,
  isFavourite: PropTypes.bool.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default ScheduleEpisode;
