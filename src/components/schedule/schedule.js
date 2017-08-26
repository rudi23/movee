import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ScheduleChannels from './scheduleChannels';
import scheduleRepository from '../../repository/scheduleRepository';
import Spinner from '../ui/spinner';
import { FETCH_STATES } from '../constants';
import ScheduleFilter from './scheduleFilter';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchState: null,
      schedule: [],
      date: moment().format('YYYY-MM-DD'),
      country: 'US',
      channel: '',
      channels: [],
    };

    this.filterCountry = this.filterCountry.bind(this);
    this.filterChannel = this.filterChannel.bind(this);
  }

  componentDidMount() {
    this.fetchSchedule(this.state.country, this.state.channel);
  }

  fetchSchedule(country, channel) {
    const filterChannels = channel ? [channel] : [];

    this.setState({ fetchState: FETCH_STATES.PENDING });
    scheduleRepository.findForDate(this.state.date, country, filterChannels)
      .then(([schedule, channels]) =>
        this.setState({ schedule, channels, fetchState: FETCH_STATES.SUCCESS })
      )
      .catch(() => this.setState({ fetchState: FETCH_STATES.FAILED }));
  }

  filterCountry(event) {
    const country = event.target.value;
    const channel = '';
    this.fetchSchedule(country, channel);
    this.setState({ country, channel });
  }

  filterChannel(event) {
    const country = this.state.country;
    const channel = event.target.value;
    this.fetchSchedule(country, channel);
    this.setState({ channel });
  }

  render() {
    const { schedule, fetchState, country, channel, channels } = this.state;
    const { favourites, toggleFavourite } = this.props;

    return (
      <div id="schedule" className="row">
        <div className="col-12 col-md-12">
          <h1>Schedule for today</h1>
          <ScheduleFilter
            country={country}
            channel={channel}
            channels={channels}
            filterCountry={this.filterCountry}
            filterChannel={this.filterChannel}
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
  }
}

Schedule.propTypes = {
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default Schedule;
