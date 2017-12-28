import React from 'react';
import PropTypes from 'prop-types';

const FavouriteIcon = ({
  isFavourite, toggleFavourite, tvShowId, className,
}) => {
  const favClassName = isFavourite ? 'filled' : 'unfilled';
  const onClick = (e) => {
    toggleFavourite(tvShowId);
    e.preventDefault();
  };

  return (
    <div className={className}>
      <button tabIndex="0" className="favourite-btn" onClick={onClick} onKeyPress={onClick}>
        <i className={`fa fa-2x favourite-icon favourite-icon--${favClassName}`} />
      </button>
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
