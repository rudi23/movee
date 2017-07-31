import React from 'react';
import PropTypes from 'prop-types';

const FavouriteIcon = ({ isFavourite, toggleFavourite, tvShowId, className }) => {
  const favClassName = isFavourite ? 'filled' : 'unfilled';
  const onClick = (e) => {
    e.preventDefault();
    toggleFavourite(tvShowId);
  };

  return (
    <div className={className}>
      <a tabIndex="-1" role="button" onClick={onClick}>
        <i className={`fa fa-2x favourite-icon favourite-icon--${favClassName}`} />
      </a>
    </div>
  );
};

FavouriteIcon.defaultProps = {
  className: null,
};

FavouriteIcon.propTypes = {
  className: PropTypes.string,
  isFavourite: PropTypes.bool.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
  tvShowId: PropTypes.number.isRequired,
};

export default FavouriteIcon;
