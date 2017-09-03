import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import scheduleRepository from '../../repository/scheduleRepository';
import { FETCH_STATES } from '../constants';
import Schedule from './schedule';

class ScheduleContainer extends Component {
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
      <Schedule
        country={country}
        channel={channel}
        channels={channels}
        filterCountry={this.filterCountry}
        filterChannel={this.filterChannel}
        schedule={schedule}
        fetchState={fetchState}
        favourites={favourites}
        toggleFavourite={toggleFavourite}
      />
    );
  }
}

ScheduleContainer.propTypes = {
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default ScheduleContainer;
