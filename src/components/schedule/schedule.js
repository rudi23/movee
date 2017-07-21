import React, { Component } from 'react';
import moment from 'moment';
import ChannelList from './channelList';
import scheduleRepository from '../../repository/scheduleRepository';

class Schedule extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      schedule: [],
      date: moment().format('YYYY-MM-DD'),
      country: 'US',
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
    scheduleRepository.findForDate(this.state.date, this.state.country)
      .then(schedule => this.setState({ schedule, loading: false }));
  }

  render() {
    return (
      <div id="schedule" className="row">
        <div className="col-12 col-md-12">
          <h1>Schedule for today</h1>
          <ChannelList channels={this.state.schedule} />
        </div>
      </div>
    );
  }
}

export default Schedule;
