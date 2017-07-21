import React, { Component } from 'react';
import moment from 'moment';
import ChannelList from './channelList';
import scheduleRepository from '../../repository/scheduleRepository';
import Spinner from '../ui/spinner';
import { FETCH_STATES } from '../constants';

class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      fetchState: null,
      schedule: [],
      date: moment().format('YYYY-MM-DD'),
      country: 'US',
    };
  }

  componentWillMount() {
    this.setState({ fetchState: FETCH_STATES.PENDING });
    scheduleRepository.findForDate(this.state.date, this.state.country)
      .then(schedule => this.setState({ schedule, fetchState: FETCH_STATES.SUCCESS }))
      .catch(() => this.setState({ fetchState: FETCH_STATES.FAILED }));
  }

  render() {
    const { fetchState, schedule } = this.state;

    return (
      <div id="schedule" className="row">
        <div className="col-12 col-md-12">
          <h1>Schedule for today</h1>
          <Spinner visible={fetchState === FETCH_STATES.PENDING} />
          <ChannelList channels={schedule} fetchState={this.state.fetchState} />
        </div>
      </div>
    );
  }
}

export default Schedule;
