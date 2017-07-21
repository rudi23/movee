import React from 'react';
import PropTypes from 'prop-types';
import ChannelListItem from './channelListItem';
import { FETCH_STATES } from '../constants';

const renderList = channels => channels.map(channel =>
  <ChannelListItem key={channel.id} {...channel} />
);

const ChannelList = ({ channels, fetchState }) => (
  <div>
    {(fetchState === FETCH_STATES.FAILED) ?
      <div>Sorry, an error occurred while loading channels.</div> : null}

    {(fetchState === FETCH_STATES.SUCCESS && !channels.length) ?
      <div>No channels</div> : null}

    {(fetchState === FETCH_STATES.SUCCESS && channels.length) ?
      renderList(channels) : null}
  </div>
);

ChannelList.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object).isRequired,
  fetchState: PropTypes.string,
};

export default ChannelList;
