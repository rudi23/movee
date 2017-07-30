import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ChannelList from './channelList';
import scheduleRepository from '../../repository/scheduleRepository';
import Spinner from '../ui/spinner';
import { FETCH_STATES } from '../constants';

class Schedule extends Component {
  constructor(props) {
    super(props);
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
    const { favourites, toggleFavourite } = this.props;

    return (
      <div id="schedule" className="row">
        <div className="col-12 col-md-12">
          <h1>Schedule for today</h1>
          <Spinner visible={fetchState === FETCH_STATES.PENDING} />
          <ChannelList
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
  favourites: PropTypes.arrayOf(PropTypes.number).isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

export default Schedule;
