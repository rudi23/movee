import React from 'react';
import PropTypes from 'prop-types';
import 'rc-collapse/assets/index.css';
import Collapse, { Panel } from 'rc-collapse';
import Spinner from '../ui/Spinner';
import { FETCH_STATES } from '../../constants';
import TVShowEpisodes from './TvShowEpisodes';

const TVShowSeasons = ({ seasons, fetchState }) => {
  if (fetchState === FETCH_STATES.PENDING || fetchState === null) {
    return <Spinner visible={fetchState === FETCH_STATES.PENDING} />;
  } else if (fetchState === FETCH_STATES.FAILED) {
    return <div>Sorry, an error occurred while trying to access resource.</div>;
  } else if (fetchState === FETCH_STATES.SUCCESS && !seasons) {
    return <div>Sorry, we could not find searched show.</div>;
  }

  return (
    <Collapse defaultActiveKey={`${seasons[0].id}`} accordion>
      {seasons.map((season) => {
        const title = `Season ${season.number}: ${season.name} (${season.premiereDate} - ${season.endDate})`;

        return (
          <Panel header={title} key={season.id}>
            <TVShowEpisodes episodes={season.episodes} />
          </Panel>
        );
      })}
    </Collapse>
  );
};

TVShowSeasons.defaultProps = {
  fetchState: null,
  seasons: [],
};

TVShowSeasons.propTypes = {
  seasons: PropTypes.array,
  fetchState: PropTypes.string,
};

export default TVShowSeasons;
