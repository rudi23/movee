import React from 'react';
import PropTypes from 'prop-types';

const ScheduleFilter = ({ channel, country, channelOptions, filterChannel, filterCountry }) => (
  <div className="schedule-filter">
    <form className="form-inline">
      <div className="form-group">
        <label className="sr-only" htmlFor="schedule-filter-country">Country</label>
        <select
          className="form-control"
          id="schedule-filter-country"
          value={country}
          onChange={filterCountry}
        >
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="GB">Great Britain</option>
          <option value="BR">Brazil</option>
          <option value="AU">Australia</option>
          <option value="NZ">New Zealand</option>
          <option value="JP">Japan</option>
          <option value="CN">China</option>
          <option value="IN">India</option>
          <option value="HK">Hong Kong</option>
          <option value="KR">South Korea</option>
          <option value="TR">Turkey</option>
        </select>
      </div>

      <div className="form-group">
        <label className="sr-only" htmlFor="schedule-filter-channel">Channel</label>
        <select
          className="form-control"
          id="schedule-filter-channel"
          value={channel}
          onChange={filterChannel}
        >
          <option value="">All channels</option>
          {channelOptions.map(name => <option key={name} value={name}>{name}</option>)}
        </select>
      </div>
    </form>
  </div>
);

ScheduleFilter.defaultProps = {
  country: 'US',
  channel: '',
  channelOptions: [],
};

ScheduleFilter.propTypes = {
  country: PropTypes.string,
  channel: PropTypes.string,
  channelOptions: PropTypes.arrayOf(PropTypes.string),
  filterCountry: PropTypes.func.isRequired,
  filterChannel: PropTypes.func.isRequired,
};

export default ScheduleFilter;
