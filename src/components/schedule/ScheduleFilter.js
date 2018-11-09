import React from 'react';
import PropTypes from 'prop-types';

const ScheduleFilter = ({ channel, country, channelOptions, filterChannel, filterCountry }) => (
  <div className="schedule-filter">
    <form className="form-inline">
      <div className="form-group">
        <label className="sr-only" htmlFor="schedule-filter-country">
          Country
        </label>
        <select className="form-control" id="schedule-filter-country" onChange={filterCountry} value={country}>
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
        <label className="sr-only" htmlFor="schedule-filter-channel">
          Channel
        </label>
        <select className="form-control" id="schedule-filter-channel" onChange={filterChannel} value={channel}>
          <option value="">All channels</option>
          {channelOptions.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>
    </form>
  </div>
);

ScheduleFilter.defaultProps = {
  channel: '',
  channelOptions: [],
  country: 'US',
};

ScheduleFilter.propTypes = {
  channel: PropTypes.string,
  channelOptions: PropTypes.arrayOf(PropTypes.string),
  country: PropTypes.string,
  filterChannel: PropTypes.func.isRequired,
  filterCountry: PropTypes.func.isRequired,
};

export default ScheduleFilter;
