import React from 'react';
import PropTypes from 'prop-types';

function createMarkup(summary) {
  return { __html: summary };
}

const TVShowEpisodeListItem = (props) => {
  const { isFavourite, toggleFavourite } = props;
  const favImage = isFavourite ? 'star-filled' : 'star-unfilled';
  const favAlt = isFavourite ? 'Filled star' : 'Unfilled star';

  const onClick = tvShowId => (e) => {
    e.preventDefault();
    toggleFavourite(tvShowId);
  };

  return (
    <div className="episode">
      <div className="episode__star">
        <a tabIndex="-1" role="button" onClick={onClick(props.show.id)}>
          <img src={`/${favImage}.svg`} alt={`${favAlt}`} className="favourite-star" />
        </a>
      </div>
      <h3>{props.show.title}: {props.title}</h3>
      <h4>{props.airTime}</h4>
      <div dangerouslySetInnerHTML={props.summary !== null ? createMarkup(props.summary) : null} />
    </div>
  );
}

TVShowEpisodeListItem.propTypes = {
  title: PropTypes.string.isRequired,
  airTime: PropTypes.string.isRequired,
  show: PropTypes.object.isRequired,
  summary: PropTypes.string,
  isFavourite: PropTypes.bool.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default TVShowEpisodeListItem;
