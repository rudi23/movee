import React from 'react';
import PropTypes from 'prop-types';
import ScheduleEpisodes from './ScheduleEpisodes';

const ScheduleChannel = props => (
  <div className="schedule-channel">
    <h2 className="schedule-channel__name">{props.name}
      <span className="schedule-channel__country">{props.country.name}</span>
    </h2>
    <ScheduleEpisodes
      episodes={props.episodes}
      favourites={props.favourites}
      toggleFavourite={props.toggleFavourite}
    />
  </div>
);

ScheduleChannel.propTypes = {
  name: PropTypes.string.isRequired,
  country: PropTypes.object.isRequired,
  episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default ScheduleChannel;
