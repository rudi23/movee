import React from 'react';
import PropTypes from 'prop-types';
import ScheduleChannel from './ScheduleChannel';
import { FETCH_STATES } from '../../constants';

const renderList = (channels, favourites, toggleFavourite) => channels.map(channel => (
  <ScheduleChannel
    key={channel.id}
    favourites={favourites}
    toggleFavourite={toggleFavourite}
    {...channel}
  />
));

const ScheduleChannels = ({
  channels, fetchState, favourites, toggleFavourite,
}) => {
  let content = null;

  if (fetchState === FETCH_STATES.FAILED) {
    content = <div>Sorry, an error occurred while loading channels.</div>;
  } else if (fetchState === FETCH_STATES.SUCCESS && !channels.length) {
    content = <div>No channels</div>;
  } else if (fetchState === FETCH_STATES.SUCCESS && channels.length) {
    content = renderList(channels, favourites, toggleFavourite);
  }

  return <div>{content}</div>;
};

ScheduleChannels.defaultProps = {
  fetchState: null,
};

ScheduleChannels.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchState: PropTypes.string,
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default ScheduleChannels;
