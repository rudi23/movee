import React from 'react';
import PropTypes from 'prop-types';
import ChannelListItem from './channelListItem';

const ChannelList = ({ channels }) => (
  <div>
    { channels.map(channel =>
      <ChannelListItem key={channel.id} {...channel} />
    ) }
  </div>
);

ChannelList.propTypes = {
  channels: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ChannelList;
