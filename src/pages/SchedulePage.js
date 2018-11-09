import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchSchedule, setCountryFilter, setChannelFilter } from '../redux/actions/scheduleActions';
import Schedule from '../components/schedule/Schedule';

class SchedulePage extends Component {
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
    const { schedule, fetchState, filter, favourites, toggleFavourite } = this.props;

    return (
      <Schedule
        channel={filter.channel}
        channelOptions={filter.channelOptions}
        country={filter.country}
        favourites={favourites}
        fetchState={fetchState}
        filterChannel={this.filterChannel}
        filterCountry={this.filterCountry}
        schedule={schedule}
        toggleFavourite={toggleFavourite}
      />
    );
  }
}

SchedulePage.propTypes = {
  favourites: PropTypes.object.isRequired,
  fetchSchedule: PropTypes.func.isRequired,
  fetchState: PropTypes.string,
  filter: PropTypes.object.isRequired,
  schedule: PropTypes.arrayOf(PropTypes.object).isRequired,
  setChannelFilter: PropTypes.func.isRequired,
  setCountryFilter: PropTypes.func.isRequired,
  toggleFavourite: PropTypes.func.isRequired,
};

SchedulePage.defaultProps = {
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

export const ConnectedSchedulePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(SchedulePage);

export default {
  component: ConnectedSchedulePage,
  loadData: store => store.dispatch(fetchSchedule()),
};
