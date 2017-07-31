import React from 'react';
import PropTypes from 'prop-types';

const TVShowInfo = ({ show, isFavourite, onClick }) => {
  const favImage = isFavourite ? 'star-filled' : 'star-unfilled';
  const favAlt = isFavourite ? 'Filled star' : 'Unfilled star';

  return (
    <article className="tv-show">
      <div className="tv-show__cover">
        <img src={show.image} alt={show.title} />
      </div>
      <div className="tv-show-info">
        <h2 className="tv-show-info__header">{show.title}</h2>
        <h3 className="tv-show-info__premiered">{show.language}, {show.premiered}</h3>
        <a tabIndex="-1" role="button" onClick={onClick(show.id)}>
          <img src={`/${favImage}.svg`} alt={`${favAlt}`} className="favourite-star" />
        </a>
      </div>
    </article>
  );
};

TVShowInfo.propTypes = {
  isFavourite: PropTypes.bool.isRequired,
  show: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default TVShowInfo;
