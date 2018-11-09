import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StarRating from 'react-star-rating-component';
import FavouriteIcon from '../favourites/FavouriteIcon';
import HtmlSummary from '../ui/HtmlSummary';

const renderCover = (show, isLinked = false) => (
  <div className="tv-show__cover">
    {isLinked === true ? (
      <Link to={`/show/${show.id}`}>
        <img alt={show.title} src={show.image} />
      </Link>
    ) : (
      <img alt={show.title} src={show.image} />
    )}
  </div>
);

const renderHeader = (show, isLinked = false) => (
  <h2 className="tv-show-info__title">
    {isLinked === true ? <Link to={`/show/${show.id}`}>{show.title}</Link> : show.title}
  </h2>
);

const renderOfficialSite = officialSite =>
  officialSite ? (
    <p className="tv-show-info__item">
      <a href={officialSite} rel="noopener noreferrer" target="_blank">
        Official site
      </a>
    </p>
  ) : null;

const renderGenres = genres => (genres.length > 0 ? <p className="tv-show-info__item">{genres.join(', ')}</p> : null);

const renderStatus = status => {
  const className = `tv-show-info__status--${status.toLowerCase()}`;
  return (
    <p className="tv-show-info__item">
      Status: <span className={className}>{status}</span>
    </p>
  );
};

const TVShowInfo = ({ show, isFavourite, toggleFavourite, isLinked }) => (
  <article className="tv-show">
    {renderCover(show, isLinked)}
    <div className="tv-show-info">
      <div className="tv-show-info__header">
        <FavouriteIcon
          className="tv-show-info__favourite"
          isFavourite={isFavourite}
          toggleFavourite={toggleFavourite}
          tvShowId={show.id}
        />
        {renderHeader(show, isLinked)}
      </div>

      <p className="tv-show-info__item">
        {show.runtime} min. | {show.type} | {show.premiered} | {show.language}
      </p>

      {renderGenres(show.genres)}
      {renderStatus(show.status)}

      <StarRating
        editing={false}
        name="rate"
        renderStarIcon={(index, value) => <span className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />}
        renderStarIconHalf={() => <span className="fa fa-star-half-full" />}
        value={show.rating}
      />

      {renderOfficialSite(show.officialSite)}
    </div>
    <HtmlSummary className="tv-show__summary" summary={show.summary} />
  </article>
);

TVShowInfo.defaultProps = {
  isLinked: false,
};

TVShowInfo.propTypes = {
  isFavourite: PropTypes.bool.isRequired,
  isLinked: PropTypes.bool,
  show: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default TVShowInfo;
