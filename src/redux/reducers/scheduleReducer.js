import moment from 'moment';
import { FETCH_STATES } from './../../components/constants';
import scheduleConstants from './../constants/scheduleContants';

export const defaultState = {
  fetchState: null,
  data: [],
  filter: {
    date: moment().format('YYYY-MM-DD'),
    country: 'US',
    channel: null,
    channelOptions: [],
  },
};

export default (state = defaultState, action = {}) => {
  switch (action.type) {
    case scheduleConstants.FETCH_SCHEDULE_PENDING:
      return Object.assign({}, state, {
        fetchState: FETCH_STATES.PENDING,
        data: defaultState.data,
      });

    case scheduleConstants.FETCH_SCHEDULE_SUCCESS:
      return Object.assign({}, state, {
        fetchState: FETCH_STATES.SUCCESS,
        data: action.schedule,
        filter: Object.assign({}, state.filter, {
          channelOptions: action.channelOptions,
        }),
      });

    case scheduleConstants.FETCH_SCHEDULE_FAILED:
      return Object.assign({}, state, {
        fetchState: FETCH_STATES.FAILED,
        data: defaultState.data,
      });

    case scheduleConstants.SET_COUNTRY_FILTER:
      return Object.assign({}, state, {
        fetchState: defaultState.fetchState,
        data: defaultState.data,
        filter: Object.assign({}, state.filter, {
          country: action.country,
        }),
      });

    case scheduleConstants.SET_CHANNEL_FILTER:
      return Object.assign({}, state, {
        fetchState: defaultState.fetchState,
        data: defaultState.data,
        filter: Object.assign({}, state.filter, {
          channel: action.channel,
        }),
      });

    default:
      return state;
  }
};
