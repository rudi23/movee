import React from 'react';
import PropTypes from 'prop-types';
import TVShowEpisodeListItem from './tvShowEpisodeListItem';

const TVShowEpisodeList = ({ episodes }) => (
  <div className="episodes">
    { episodes.map(episode =>
      <TVShowEpisodeListItem key={episode.id} {...episode} />
    ) }
  </div>
);

TVShowEpisodeList.propTypes = {
  episodes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TVShowEpisodeList;
