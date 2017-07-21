import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const TVShowListItem = ({ id, image, title, language, premiered }) => (
  <article className="tv-show">
    <Link to={`/show/${id}`}>
      <img src={image} alt={title} />
    </Link>
    <div className="tv-show-info">
      <h3><Link to={`/show/${id}`}>{title}</Link></h3>
      <h4>{language}, {premiered}</h4>
    </div>
  </article>
);

TVShowListItem.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  premiered: PropTypes.string.isRequired,
};

export default TVShowListItem;
