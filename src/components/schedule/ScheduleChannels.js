import React from 'react';
import PropTypes from 'prop-types';
import { FETCH_STATES } from '../../constants';
import ScheduleChannel from './ScheduleChannel';

const renderList = (channels, favourites, toggleFavourite) =>
  channels.map(channel => (
    <ScheduleChannel favourites={favourites} key={channel.id} toggleFavourite={toggleFavourite} {...channel} />
  ));

const ScheduleChannels = ({ channels, fetchState, favourites, toggleFavourite }) => {
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
  favourites: PropTypes.object.isRequired,
  fetchState: PropTypes.string,
  toggleFavourite: PropTypes.func.isRequired,
};

export default ScheduleChannels;
