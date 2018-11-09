import React from 'react';
import PropTypes from 'prop-types';
import ScheduleEpisodes from './ScheduleEpisodes';

const ScheduleChannel = ({ name, country, episodes, favourites, toggleFavourite }) => (
  <div className="schedule-channel">
    <h2 className="schedule-channel__name">
      {name}
      <span className="schedule-channel__country">{country.name}</span>
    </h2>
    <ScheduleEpisodes episodes={episodes} favourites={favourites} toggleFavourite={toggleFavourite} />
  </div>
);

ScheduleChannel.propTypes = {
  country: PropTypes.object.isRequired,
  episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
  favourites: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default ScheduleChannel;
