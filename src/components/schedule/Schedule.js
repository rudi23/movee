import React from 'react';
import PropTypes from 'prop-types';
import Spinner from '../ui/Spinner';
import { FETCH_STATES } from '../../constants';
import ScheduleChannels from './ScheduleChannels';
import ScheduleFilter from './ScheduleFilter';

const Schedule = ({
  country,
  channel,
  channelOptions,
  filterCountry,
  filterChannel,
  fetchState,
  schedule,
  favourites,
  toggleFavourite,
}) => (
  <div className="row" id="schedule">
    <div className="col-12 col-md-12">
      <h1>Schedule for today</h1>
      <ScheduleFilter
        channel={channel}
        channelOptions={channelOptions}
        country={country}
        filterChannel={filterChannel}
        filterCountry={filterCountry}
      />
      <Spinner visible={fetchState === FETCH_STATES.PENDING} />
      <ScheduleChannels
        channels={schedule}
        favourites={favourites}
        fetchState={fetchState}
        toggleFavourite={toggleFavourite}
      />
    </div>
  </div>
);

Schedule.defaultProps = {
  channel: '',
  fetchState: null,
};

Schedule.propTypes = {
  channel: PropTypes.string,
  channelOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  country: PropTypes.string.isRequired,
  favourites: PropTypes.object.isRequired,
  fetchState: PropTypes.string,
  filterChannel: PropTypes.func.isRequired,
  filterCountry: PropTypes.func.isRequired,
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default Schedule;
