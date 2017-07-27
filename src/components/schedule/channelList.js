import React from 'react';
import PropTypes from 'prop-types';
import ChannelListItem from './channelListItem';
import { FETCH_STATES } from '../constants';

const renderList = (channels, favourites, toggleFavourite) => channels.map(channel =>
  <ChannelListItem
    key={channel.id}
    favourites={favourites}
    toggleFavourite={toggleFavourite}
    {...channel}
  />
);

const ChannelList = ({ channels, fetchState, favourites, toggleFavourite }) => (
  <div>
    {(fetchState === FETCH_STATES.FAILED) ?
      <div>Sorry, an error occurred while loading channels.</div> : null}

    {(fetchState === FETCH_STATES.SUCCESS && !channels.length) ?
      <div>No channels</div> : null}

    {(fetchState === FETCH_STATES.SUCCESS && channels.length) ?
      renderList(channels, favourites, toggleFavourite) : null}
  </div>
);

ChannelList.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchState: PropTypes.string,
  favourites: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default ChannelList;
