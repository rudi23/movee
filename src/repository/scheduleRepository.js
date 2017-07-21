import moment from 'moment';
import fetchJson from './fetchJson';
import transformer from '../transformer/scheduleTransformer';

const API_BASE_URL = 'http://api.tvmaze.com';

const scheduleRepository = {
  findForDate: (date, country = 'US') => {
    const isoDate = date || moment().format('YYYY-MM-DD');

    return fetchJson(`${API_BASE_URL}/schedule?country=${country}&date=${isoDate}`).then(transformer.transform);
  },
};

export default scheduleRepository;
