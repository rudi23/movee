import React from 'react';
import PropTypes from 'prop-types';
import ScheduleChannels from './ScheduleChannels';
import Spinner from '../ui/Spinner';
import { FETCH_STATES } from '../../constants';
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
  <div id="schedule" className="row">
    <div className="col-12 col-md-12">
      <h1>Schedule for today</h1>
      <ScheduleFilter
        country={country}
        channel={channel}
        channelOptions={channelOptions}
        filterCountry={filterCountry}
        filterChannel={filterChannel}
      />
      <Spinner visible={fetchState === FETCH_STATES.PENDING} />
      <ScheduleChannels
        channels={schedule}
        fetchState={fetchState}
        favourites={favourites}
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
  country: PropTypes.string.isRequired,
  channel: PropTypes.string,
  channelOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  filterCountry: PropTypes.func.isRequired,
  filterChannel: PropTypes.func.isRequired,
  fetchState: PropTypes.string,
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default Schedule;
