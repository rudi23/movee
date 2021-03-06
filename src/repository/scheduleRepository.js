import moment from 'moment';
import transformer from '../transformer/scheduleTransformer';
import fetchJson from './fetchJson';

const API_BASE_URL = 'http://api.tvmaze.com';

const scheduleRepository = {
  findForDate: (date, country = 'US', channel = '') => {
    const isoDate = date || moment().format('YYYY-MM-DD');
    const filterChannels = channel !== '' ? [channel] : [];

    return fetchJson(`${API_BASE_URL}/schedule?country=${country}&date=${isoDate}`)
      .then(transformer.transform)
      .then(schedule => {
        const channelOptions = schedule.map(ch => ch.name);
        const filteredSchedule =
          filterChannels.length > 0 ? schedule.filter(ch => filterChannels.includes(ch.name)) : schedule;

        return [filteredSchedule, channelOptions];
      });
  },
};

export default scheduleRepository;
