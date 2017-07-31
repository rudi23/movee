import React from 'react';
import PropTypes from 'prop-types';
import TVShowEpisodes from './tvShowEpisodes';

const TVShowSeason = ({ season }) => {
  const expanded = season.number === 1;

  return (
    <div className="panel panel-default">
      <div className="panel-heading" role="tab" id={`heading${season.number}`}>
        <h2 className="panel-title tv-show-season__title">
          <a
            role="button"
            data-toggle="collapse"
            data-parent="#accordion"
            href={`#season${season.number}`}
            aria-expanded={expanded ? 'true' : 'false'}
            aria-controls={`season${season.number}`}
          >
            Season {season.number}: {season.name} ({season.premiereDate} - {season.endDate})
          </a>
        </h2>
      </div>

      <div
        id={`season${season.number}`}
        className={`panel-collapse collapse ${expanded ? 'in' : ''}`}
        role="tabpanel"
        aria-labelledby={`#heading${season.number}`}
      >
        <TVShowEpisodes episodes={season.episodes} />
      </div>
    </div>
  );
};

TVShowSeason.propTypes = {
  season: PropTypes.object.isRequired,
};

export default TVShowSeason;
