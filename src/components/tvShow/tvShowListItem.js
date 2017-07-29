import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TVShowListItem = (props) => {
  const { isFavourite, toggleFavourite } = props;
  const favImage = isFavourite ? 'star-filled' : 'star-unfilled';
  const favAlt = isFavourite ? 'Filled star' : 'Unfilled star';

  const onClick = tvShowId => (e) => {
    e.preventDefault();
    toggleFavourite(tvShowId);
  };

  return (
    <article className="tv-show">
      <Link to={`/show/${props.id}`}>
        <img src={props.image} alt={props.title} className="tv-show__cover" />
      </Link>
      <div className="tv-show-info">
        <h3><Link to={`/show/${props.id}`}>{props.title}</Link></h3>
        <h4>{props.language}, {props.premiered}</h4>
        <a tabIndex="-1" role="button" onClick={onClick(props.id)}>
          <img src={`/${favImage}.svg`} alt={`${favAlt}`} className="favourite-star" />
        </a>
      </div>
    </article>
  );
};

TVShowListItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  premiered: PropTypes.string.isRequired,
  isFavourite: PropTypes.bool.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default TVShowListItem;
