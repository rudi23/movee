import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import StarRating from 'react-star-rating-component';
import FavouriteIcon from '../favourites/favouriteIcon';
import HtmlSummary from '../ui/htmlSummary';

const renderCover = (show, isLinked = false) => (
  <div className="tv-show__cover">
    {
      isLinked === true ?
        (
          <Link to={`/show/${show.id}`}>
            <img src={show.image} alt={show.title} />
          </Link>
        ) : <img src={show.image} alt={show.title} />
    }
  </div>
);

const renderHeader = (show, isLinked = false) => (
  <h2 className="tv-show-info__title">
    {
      isLinked === true ?
        (
          <Link to={`/show/${show.id}`}>
            {show.title}
          </Link>
        ) : show.title
    }
  </h2>
);

const renderOfficialSite = officialSite => (
  officialSite ? (
    <p className="tv-show-info__item">
      <a target="_blank" href={officialSite}>Official site</a>
    </p>
  ) : null
);

const renderGenres = genres => (
  genres.length > 0 ? (
    <p className="tv-show-info__item">
      {genres.join(', ')}
    </p>
  ) : null
);

const renderStatus = (status) => {
  const className = `tv-show-info__status--${status.toLowerCase()}`;
  return (
    <p className="tv-show-info__item">
      Status: <span className={className}>{status}</span>
    </p>
  );
};

const TVShowInfo = ({
  show, isFavourite, toggleFavourite, isLinked,
}) => (
  <article className="tv-show">
    {renderCover(show, isLinked)}
    <div className="tv-show-info">
      <div className="tv-show-info__header">
        <FavouriteIcon
          isFavourite={isFavourite}
          toggleFavourite={toggleFavourite}
          tvShowId={show.id}
          className="tv-show-info__favourite"
        />
        {renderHeader(show, isLinked)}
      </div>

      <p className="tv-show-info__item">
        {show.runtime} min. | {show.type} | {show.premiered} | {show.language}
      </p>

      {renderGenres(show.genres)}
      {renderStatus(show.status)}

      <StarRating
        name="rate"
        value={show.rating}
        editing={false}
        renderStarIcon={(index, value) => <span className={index <= value ? 'fa fa-star' : 'fa fa-star-o'} />}
        renderStarIconHalf={() => <span className="fa fa-star-half-full" />}
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
  show: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
  isLinked: PropTypes.bool,
};

export default TVShowInfo;
