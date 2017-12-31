import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSchedule, setCountryFilter, setChannelFilter } from '../../redux/actions/scheduleActions';
import Schedule from './schedule';

class ScheduleContainer extends Component {
  constructor(props) {
    super(props);

    this.filterCountry = this.filterCountry.bind(this);
    this.filterChannel = this.filterChannel.bind(this);
  }

  componentDidMount() {
    this.props.fetchSchedule();
  }

  filterCountry(event) {
    this.props.setCountryFilter(event.target.value);
    this.props.setChannelFilter();
    this.props.fetchSchedule();
  }

  filterChannel(event) {
    this.props.setChannelFilter(event.target.value);
    this.props.fetchSchedule();
  }

  render() {
    const {
      schedule, fetchState, filter, favourites, toggleFavourite,
    } = this.props;

    return (
      <Schedule
        country={filter.country}
        channel={filter.channel}
        channelOptions={filter.channelOptions}
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
  fetchState: PropTypes.string,
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.object.isRequired,
  fetchSchedule: PropTypes.func.isRequired,
  setCountryFilter: PropTypes.func.isRequired,
  setChannelFilter: PropTypes.func.isRequired,
  favourites: PropTypes.object.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

ScheduleContainer.defaultProps = {
  fetchState: null,
};

const mapStateToProps = state => ({
  fetchState: state.schedule.fetchState,
  schedule: state.schedule.data,
  filter: state.schedule.filter,
});

const mapDispatchToProps = {
  fetchSchedule,
  setCountryFilter,
  setChannelFilter,
};

export const ConnectedScheduleContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScheduleContainer);

export default {
  component: ConnectedScheduleContainer,
  loadData: store => store.dispatch(fetchSchedule()),
};
